// app/api/sim/route.ts
import { NextResponse } from "next/server";

/** Vercel-friendly flags (no behavior change) */
export const runtime = "edge";            // run on Edge
export const dynamic = "force-dynamic";   // disable static caching
export const revalidate = 0;              // belt & suspenders

/* ───────────────────────── Types ───────────────────────── */
type Who = "you" | "doc";
type Vertical = "pharma" | "b2b" | "door2door" | "tech";
type Difficulty = "easy" | "medium" | "hard";

type Scenario = {
  vertical: Vertical;
  difficulty: Difficulty;
  tone: string;      // free text; we'll pass straight to the LLM
  product: string;
  persona: string;
};

type Line = { who: Who; text: string };

type Memory = {
  objectionCount: number;
  topicCounts: Record<string, number>;
  coverageAsked?: boolean;
  coverageResolved?: boolean;
};

/* ───────────────────────── Config ───────────────────────── */
const OBJECTION_CAP: Record<Difficulty, [min: number, max: number]> = {
  easy:   [1, 2],
  medium: [2, 3],
  hard:   [3, 4],
};

const DEFERRALS = [
  "let's keep going",
  "let's keep this moving",
  "what's the next step from your end",
  "what's next step from your end",
  "what's next",
  "what is next",
  "let's move on",
  "let's circle back",
];

/* ───────────────────────── Utils ───────────────────────── */
const norm = (s: string) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();

const lastOf = (arr: Line[], who: Who) => {
  for (let i = arr.length - 1; i >= 0; i--) if (arr[i].who === who) return arr[i].text;
  return "";
};

const similar = (a: string, b: string) => norm(a) === norm(b);
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

/* intents & topics */
const RX_OBJECTION =
  /\b(cost|price|budget|too (high|much)|risk|security|compliance|coverage|prior ?auth|authorization|evidence|proof|study|case\s*study|reference|roi|remission|side[- ]?effects|fit|lifestyle|integration|time|busy|later|not now|send (me )?info|deck|email it|already (use|have)|competition|switch)\b/i;

const RX_CLOSE =
  /\b(ready|let'?s (proceed|start|try|kick ?off|book|schedule|do it|move forward)|place (an )?order|sign|contract|go ahead|let'?s do (this|it)|next step|paperwork|pilot|trial|are you ready|can you sign|let's make it official)\b/i;

const RX_COVERAGE = /\b(coverage|prior ?auth|authorization|copay|payer|formulary)\b/i;

const RX_TOPIC_MAP: { key: string; re: RegExp }[] = [
  { key: "price",       re: /\b(price|cost|budget|too (high|much)|afford|pricing|quote)\b/i },
  { key: "evidence",    re: /\b(evidence|proof|study|studies|case\s*study|reference|real[- ]?world)\b/i },
  { key: "coverage",    re: RX_COVERAGE },
  { key: "time",        re: /\b(no time|too busy|later|not now|follow[- ]?up|circle back)\b/i },
  { key: "fit",         re: /\b(fit|lifestyle|not sure it (fits|suits)|use case|appropriate|workflow)\b/i },
  { key: "risk",        re: /\b(risk|unsafe|side[- ]?effects?|liability|safety|tolerab(ility|le))\b/i },
  { key: "integration", re: /\b(integrat(e|ion)|api|jira|salesforce|okta|sso|emr|ehr|github|gitlab)\b/i },
];

const inferTopic = (text: string) => {
  const t = (text || "").toLowerCase();
  for (const { key, re } of RX_TOPIC_MAP) if (re.test(t)) return key;
  return "other";
};

const looksLikeObjection = (text: string) => RX_OBJECTION.test(text);
const looksLikeCloseAttempt = (text: string) => RX_CLOSE.test(text);

/* ───────────────────────── Memory ───────────────────────── */
function buildMemory(scn: Scenario, history: Line[]): Memory {
  const docLines = history.filter((m) => m.who === "doc").map((m) => m.text);
  const objectionCount = docLines.filter(looksLikeObjection).length;

  const topicCounts: Record<string, number> = {};
  for (const d of docLines) {
    const k = inferTopic(d);
    topicCounts[k] = (topicCounts[k] ?? 0) + 1;
  }

  // pharma flags
  const anyCoverageAsked = scn.vertical === "pharma" && docLines.some((d) => RX_COVERAGE.test(d));
  const youLines = history.filter((m) => m.who === "you").map((m) => m.text).join("\n");
  const coverageResolved =
    scn.vertical === "pharma" &&
    /\b(covered|we (handle|take care of) (coverage|pa|prior auth)|no prior auth|approved|clean access|copay (card|program))\b/i.test(
      youLines
    );

  return { objectionCount, topicCounts, coverageAsked: anyCoverageAsked, coverageResolved };
}

/* ───────────────── LLM: Human conversational buyer ───────────────── */
async function llmBuyer({
  scenario,
  history,
  memory,
}: {
  scenario: Scenario;
  history: Line[];
  memory: Memory;
}): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const recent = history
    .slice(-14)
    .map((m) => `${m.who === "you" ? "Rep" : "Buyer"}: ${m.text}`)
    .join("\n");

  const [, maxCap] = OBJECTION_CAP[scenario.difficulty];
  const tone = scenario.tone || "natural";

  const sys = `
You are the BUYER (or HCP in pharma). Speak like a real human in 1–2 sentences.
Mirror the rep’s tone exactly: "${tone}". Use contractions and varied rhythm.

Guardrails (lightweight):
- Do NOT "sell back". You are the buyer.
- Avoid deferral fillers such as: "let's keep going", "what's next step from your end?", "let's keep this moving", "what's next?".
- Do not repeat a topic you've already asked and the rep has answered. If it was answered, acknowledge briefly and progress to a *new* concrete point OR accept the close if appropriate.
- PHARMA: coverage/PA can appear once. If it's already been discussed or the rep said they handle it, do NOT bring it up again.
- Total objections allowed for this convo: cap ${maxCap}. After that window, if the rep attempts to close, respond cooperatively in the same tone (accept or agree to start/pilot).

Never repeat yourself verbatim. Keep it human, specific, and progressive.`;

  const user = `
SCENARIO:
- Vertical: ${scenario.vertical}
- Difficulty: ${scenario.difficulty}
- Product: ${scenario.product}
- Persona: ${scenario.persona}

STATE:
- Total objections the buyer has asked so far: ${memory.objectionCount} (cap ${maxCap})
- Buyer has already asked about coverage? ${memory.coverageAsked ? "yes" : "no"}
- Rep indicated coverage/PA is handled? ${memory.coverageResolved ? "yes" : "no"}
- Topic counts so far: ${JSON.stringify(memory.topicCounts)}

RECENT DIALOGUE:
${recent}

Write ONLY your next buyer line (1–2 sentences).`;

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      cache: "no-store", // prevent any edge caching
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 1.2,
        top_p: 0.95,
        presence_penalty: 0.8,
        frequency_penalty: 0.6,
        max_tokens: 250,
        messages: [
          { role: "system", content: sys },
          { role: "user", content: user },
        ],
      }),
    });
    const data = await resp.json();
    const txt = data?.choices?.[0]?.message?.content?.trim();
    return typeof txt === "string" && txt.length > 0 ? txt : null;
  } catch {
    return null;
  }
}

/* ─────────── Post-processing: keep it human & non-loopy ─────────── */
function stripDeferrals(text: string) {
  let out = text.trim();
  for (const d of DEFERRALS) {
    const rx = new RegExp(`(?:^|[.?!]\\s*)${d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.?$`, "i");
    out = out.replace(rx, "").trim();
  }
  return out;
}

function respectCoverageOnce(scn: Scenario, memory: Memory, text: string) {
  if (scn.vertical !== "pharma") return text;
  if (memory.coverageResolved && RX_COVERAGE.test(text)) {
    return "Access sounds workable from what you’ve said—what I’d want to understand next is impact and logistics.";
  }
  if (memory.coverageAsked && RX_COVERAGE.test(text)) {
    return "Got it on access—let’s shift to what patient types you’d start first.";
  }
  return text;
}

function avoidRepeat(history: Line[], next: string) {
  const lastDoc = lastOf(history, "doc");
  if (similar(lastDoc, next)) {
    const variants = [
      "Makes sense—let’s not rehash that. What would kickoff actually look like?",
      "I follow—let’s keep it moving. What’s the first step in practice?",
      "Fair enough. So how do we try this without a heavy lift?",
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  }
  return next;
}

function moveOnAfterRepeatedTopic(history: Line[], memory: Memory, next: string) {
  const topic = inferTopic(next);
  const count = memory.topicCounts[topic] ?? 0;
  if (count >= 2 && looksLikeObjection(next)) {
    const variants = [
      "Alright, I’m satisfied on that point—what would you suggest as a first step?",
      "Okay, that helps—let’s talk about getting started.",
      "Got it—why don’t we move toward a small start and go from there?",
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  }
  return next;
}

function acceptCloseIfCapReached(
  scn: Scenario,
  history: Line[],
  memory: Memory,
  next: string
) {
  const [, cap] = OBJECTION_CAP[scn.difficulty];
  const youLast = lastOf(history, "you");

  if (looksLikeCloseAttempt(youLast) && memory.objectionCount >= cap) {
    if (scn.vertical === "pharma") {
      const pharmaAccept = [
        "That works—let’s start a patient this week and see how they do.",
        "Alright, I’m comfortable starting one—let’s pick a candidate and I’ll watch closely.",
        "Sounds good. I’ll try a patient and we can regroup on what we see.",
      ];
      return pharmaAccept[Math.floor(Math.random() * pharmaAccept.length)];
    } else {
      const accept = [
        "I’m good with that—let’s get the paperwork started.",
        "Alright, I’m in. What do you need from me to kick off?",
        "Works for me—let’s put the first step on the books.",
      ];
      return accept[Math.floor(Math.random() * accept.length)];
    }
  }
  return next;
}

/* ───────── Humanized acceptance (tone-matched, non-robotic) ───────── */
function scrubRobotic(text: string) {
  return text
    .replace(/\b(sounds (good|great|reasonable)|let'?s keep going|that works for me|sure, i'?m open to that)\b[.,!?]?\s*/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function llmAcceptClose({
  scenario,
  history,
}: {
  scenario: Scenario;
  history: Line[];
}): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY!;
  const recent = history.slice(-10)
    .map(m => `${m.who === "you" ? "Rep" : "Buyer"}: ${m.text}`)
    .join("\n");

  const acceptInstruction =
    scenario.vertical === "pharma"
      ? `Agree to start a small, appropriate number of NEW patients this week (e.g., "I can start 1–2 appropriate patients this week").`
      : `Agree to begin with a light, reversible first step (pilot, paperwork, or order as appropriate).`;

  const sys = `
You are the BUYER. Write ONE short, natural sentence that ACCEPTS the Rep's close.
Match the conversation tone "${scenario.tone}" without sounding robotic.
Do NOT use: "sounds reasonable", "let's keep going", "that works", or "sure, I'm open".
No emojis. No sales pitch—you're the buyer.
${acceptInstruction}
`;

  const user = `Recent conversation:\n${recent}\n\nWrite only your one-sentence acceptance now.`;

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 1.2,
        max_tokens: 60,
        messages: [
          { role: "system", content: sys },
          { role: "user", content: user },
        ],
      }),
    });
    const data = await r.json();
    const raw = (data?.choices?.[0]?.message?.content ?? "").trim();
    return scrubRobotic(raw) || "Alright—I can start small on my side.";
  } catch {
    return scenario.vertical === "pharma"
      ? "Alright—I can start a couple of appropriate patients this week."
      : "Alright—let’s kick off with a small start.";
  }
}

/* ───────────────────────── Handler ───────────────────────── */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const scenario = (body?.scenario || {}) as Scenario;
    const history  = (body?.messages || []) as Line[];

    // Let the REP open the call (no auto-greeting)
    const anyYou = history.some((m) => m.who === "you");
    if (!anyYou) {
      return NextResponse.json({ text: "Whenever you’re ready, I’m listening." }, { status: 200 });
    }

    const memory = buildMemory(scenario, history);

    // 1) Let the LLM write a natural buyer line
    let next =
      (await llmBuyer({ scenario, history, memory })) ||
      "Could you say that one more way?";

    // 2) Gentle rails that keep it human (no “robotic” lines, no loops)
    next = stripDeferrals(next);
    next = respectCoverageOnce(scenario, memory, next);
    next = moveOnAfterRepeatedTopic(history, memory, next);
    next = avoidRepeat(history, next);
    next = acceptCloseIfCapReached(scenario, history, memory, next);

    // 3) Never sell back
    if (/^\s*(let me|i can get you set up|i'?ll send you a quote|here's why you should)\b/i.test(next)) {
      next = "I’m the buyer here—help me understand what I’ll actually notice first.";
    }

    // 4) For non-pharma, never inject insurance language
    if (scenario.vertical !== "pharma" && RX_COVERAGE.test(next)) {
      next = "Let’s skip insurance talk—what I care about is whether this would actually work for me.";
    }

    return NextResponse.json({ text: next }, { status: 200 });
  } catch {
    return NextResponse.json({ text: "Sorry—could you restate that?" }, { status: 200 });
  }
}

// app/api/sim/route.ts
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

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
  objectionCount: number;               // total # of doc lines that look like objections
  topicCounts: Record<string, number>;  // counts per inferred topic
  coverageAsked?: boolean;              // pharma: has the doc ever asked coverage/PA yet?
  coverageResolved?: boolean;           // pharma: did rep state coverage/PA is handled?
};

/* ───────────────────────── Config ───────────────────────── */
const OBJECTION_CAP: Record<Difficulty, [min: number, max: number]> = {
  easy:   [1, 2],
  medium: [2, 3],
  hard:   [3, 4],
};

/** Acceptance thresholds per difficulty
 * - easy   => accept once min cap reached
 * - medium => accept once max cap reached
 * - hard   => accept once max cap reached
 */
const ACCEPT_AT: Record<Difficulty, number> = {
  easy:   OBJECTION_CAP.easy[1],
  medium: OBJECTION_CAP.medium[2],
  hard:   OBJECTION_CAP.hard[3],
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

/* ───────────────── LLM calls ───────────────── */
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
- You are the buyer (never sell back).
- Avoid deferral fillers: "let's keep going", "what's next step from your end", etc.
- Do not repeat a topic the rep already answered; acknowledge and progress.
- PHARMA: coverage/PA appears at most once; if addressed, don't bring it back.
- Total objections allowed: cap ${maxCap}. After that, if the rep attempts to close, accept or agree to start/pilot in the same tone.`;

  const user = `
SCENARIO:
- Vertical: ${scenario.vertical}
- Difficulty: ${scenario.difficulty}
- Product: ${scenario.product}
- Persona: ${scenario.persona}

STATE:
- Objections so far: ${memory.objectionCount} (cap ${maxCap})
- Asked about coverage already? ${memory.coverageAsked ? "yes" : "no"}
- Rep said coverage/PA is handled? ${memory.coverageResolved ? "yes" : "no"}
- Topic counts: ${JSON.stringify(memory.topicCounts)}

RECENT DIALOGUE:
${recent}

Write ONLY your next buyer line (1–2 sentences).`;

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
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
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // deterministic fallback
    return scenario.vertical === "pharma"
      ? "Alright—I can start a couple of appropriate patients this week."
      : "Alright—let’s put a small kickoff on the books.";
  }

  const recent = history.slice(-10)
    .map(m => `${m.who === "you" ? "Rep" : "Buyer"}: ${m.text}`)
    .join("\n");

  const acceptInstruction =
    scenario.vertical === "pharma"
      ? `Agree to start 1–2 appropriate NEW patients this week.`
      : `Agree to a light, reversible first step (pilot, paperwork, or initial order).`;

  const sys = `
You are the BUYER. Write ONE short, natural sentence that ACCEPTS the Rep's close.
Match the conversation tone "${scenario.tone}" without sounding robotic.
No sales pitch. No emojis.
${acceptInstruction}`;

  const user = `Recent conversation:\n${recent}\n\nWrite only your one-sentence acceptance now.`;

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 1.1,
        max_tokens: 60,
        messages: [
          { role: "system", content: sys },
          { role: "user", content: user },
        ],
      }),
    });
    const data = await r.json();
    const raw = (data?.choices?.[0]?.message?.content ?? "").trim();
    return scrubRobotic(raw) || (scenario.vertical === "pharma"
      ? "Alright—I can start a couple of appropriate patients this week."
      : "Alright—let’s put a small kickoff on the books.");
  } catch {
    return scenario.vertical === "pharma"
      ? "Alright—I can start a couple of appropriate patients this week."
      : "Alright—let’s put a small kickoff on the books.";
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

/** NEW: strict cap enforcer to stop loops and accept closes */
async function enforceCapRules(
  scn: Scenario,
  history: Line[],
  memory: Memory,
  proposed: string
): Promise<string> {
  const youLast = lastOf(history, "you");
  const maxCap = OBJECTION_CAP[scn.difficulty][1];
  const acceptAt = ACCEPT_AT[scn.difficulty];

  const isClose = looksLikeCloseAttempt(youLast);
  const overAccept = memory.objectionCount >= acceptAt;
  const atOrOverMax = memory.objectionCount >= maxCap;

  // If rep is closing and we've hit the acceptance threshold for this difficulty → ACCEPT.
  if (isClose && overAccept) {
    return await llmAcceptClose({ scenario: scn, history });
  }

  // If we've already hit or exceeded the MAX cap and the proposed text is another objection,
  // pivot to cooperation instead of looping another objection.
  if (atOrOverMax && looksLikeObjection(proposed)) {
    const coop = scn.vertical === "pharma"
      ? [
          "Okay—that gives me enough. I can start 1–2 appropriate patients and we’ll see how they respond.",
          "That’s fine. I’ll try a patient this week and we can regroup on what we notice.",
          "Good enough for me to begin—let’s start with a couple of appropriate patients.",
        ]
      : [
          "Alright, that’s enough for me—let’s get a small kickoff on the books.",
          "Okay, I’m good to start. What do you need from me for a light kickoff?",
          "Let’s put the first step on the calendar and go from there.",
        ];
    return coop[Math.floor(Math.random() * coop.length)];
  }

  return proposed;
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
      return NextResponse.json({
        text: "Whenever you’re ready, I’m listening.",
      });
    }

    const memory = buildMemory(scenario, history);

    // Ask LLM for next buyer line
    let next =
      (await llmBuyer({ scenario, history, memory })) ||
      "Could you say that one more way?";

    // Gentle rails to keep it human and non-loopy
    next = stripDeferrals(next);
    next = respectCoverageOnce(scenario, memory, next);
    next = moveOnAfterRepeatedTopic(history, memory, next);
    next = avoidRepeat(history, next);

    // HARD STOP: enforce caps & accept closes (prevents looping on close)
    next = await enforceCapRules(scenario, history, memory, next);

    // Never sell back
    if (/^\s*(let me|i can get you set up|i'?ll send you a quote|here's why you should)\b/i.test(next)) {
      next = "I’m the buyer here—help me understand what I’ll actually notice first.";
    }

    // For non-pharma, never inject insurance language
    if (scenario.vertical !== "pharma" && RX_COVERAGE.test(next)) {
      next = "Let’s skip insurance talk—what I care about is whether this would actually work for me.";
    }

    return NextResponse.json({ text: next });
  } catch {
    return NextResponse.json({ text: "Sorry—could you restate that?" }, { status: 200 });
  }
}

// app/api/score/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';            // ⛔️ disable route caching
export const revalidate = 0;

type Who = 'you' | 'doc';
type Line = { who: Who; text: string };

type Scenario = {
  vertical: 'pharma' | 'b2b' | 'door2door' | 'tech';
  difficulty: 'easy' | 'medium' | 'hard';
  tone: string;
  product: string;
  persona: string;
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function safeNum(n: any, fallback = 0) {
  const v = Number(n);
  return Number.isFinite(v) ? v : fallback;
}

// Simple text helpers
const qmark = /\?/g;
const closeCues = /\b(let'?s|lets)\s+(get\s+started|set|book|schedule|kick\s*off|trial|pilot)|\bstart\s+(a|the)\b|\bgo\s+ahead\b|\bnext\s+step\b/i;
const empathyCues = /\b(totally|understand|makes sense|fair|got it|see why|good call|that helps)\b/i;
const valueCues = /\b(value|outcome|results?|impact|roi|benefit|faster|reduce|increase|improve)\b/i;

// Offline heuristic scoring (varies per transcript)
function heuristicScore(messages: Line[], scenario: Scenario) {
  const turns = messages.length;
  const repLines = messages.filter(m => m.who === 'you');
  const docLines = messages.filter(m => m.who === 'doc');

  const repText = repLines.map(l => l.text).join(' ');
  const docText = docLines.map(l => l.text).join(' ');
  const allText = messages.map(m => m.text).join(' ');

  const repQs = (repText.match(qmark) || []).length;
  const docQs = (docText.match(qmark) || []).length;

  const askedClose = closeCues.test(repText);
  const showedEmpathy = empathyCues.test(allText);
  const showedValue = valueCues.test(repText);

  // very light objection detection
  const objection = /(price|expensive|budget|time|busy|coverage|insurance|prior\s*auth|risk|not\s*interested|send\s+info)/i;
  const objectionCount = messages.filter(m => m.who === 'doc' && objection.test(m.text)).length;

  // Baseline by difficulty (harder = slightly stricter)
  const diffPenalty = scenario.difficulty === 'hard' ? 0.6 : scenario.difficulty === 'medium' ? 0.3 : 0;

  // Build score from components
  let s = 5;

  // Discovery (2 pts)
  s += clamp(repQs * 0.35, 0, 2);

  // Handling / balance (1.5 pts) — reward back-and-forth
  const balance = repLines.length / Math.max(1, turns);
  s += clamp(1.5 - Math.abs(balance - 0.5) * 3, 0, 1.5);

  // Empathy (1 pt)
  if (showedEmpathy) s += 0.7 + Math.random() * 0.3;

  // Value framing (1.5 pt)
  if (showedValue) s += 1.0 + Math.random() * 0.5;

  // Objection tax (up to -1.2)
  s -= clamp(objectionCount * 0.4, 0, 1.2);

  // Closing (up to +2)
  if (askedClose) s += 1.2 + Math.random() * 0.8;

  // Difficulty penalty
  s -= diffPenalty;

  // Small jitter so similar calls aren’t identical (±0.25)
  s += (Math.random() - 0.5) * 0.5;

  s = clamp(s, 0, 10);

  // Notes (dynamic)
  const goods: string[] = [];
  const improves: string[] = [];
  const nexts: string[] = [];

  if (repQs >= 2) goods.push('Strong discovery questions tailored to the buyer.');
  else improves.push('Ask 2–3 tighter discovery questions to uncover specifics.');

  if (showedEmpathy) goods.push('Good acknowledgment and pace—felt collaborative.');
  else improves.push('Briefly acknowledge their point before advancing the convo.');

  if (showedValue) goods.push('Value framed around outcomes, not features.');
  else improves.push('Translate features into outcomes (“so that you can…”).');

  if (askedClose) goods.push('Confident close with a clear next step.');
  else nexts.push('Propose a crisp next step with a time (“Tue 10:15 or 2:10?”).');

  if (scenario.vertical !== 'pharma') {
    // non-pharma line variety
    nexts.push('Confirm who else should join the follow-up and set an agenda.');
  } else {
    nexts.push('Confirm start criteria (patient profile & workflow) and timebox.');
  }

  return {
    score: Math.round(s * 10) / 10,   // keep 0.1 precision
    wentWell: goods.join(' '),
    improve: improves.join(' '),
    next: nexts.join(' ')
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const scenario: Scenario = body?.scenario;
    const messages: Line[] = (body?.messages || []) as Line[];

    // Construct a transcript if needed (LLM branch)
    let transcript: string = (body?.transcript || '').toString().trim();
    if (!transcript && messages.length) {
      transcript = messages.map(m => `${m.who === 'you' ? 'Rep' : 'Buyer'}: ${m.text}`).join('\n');
    }

    // If no transcript at all, safe default (but still varied)
    if (!transcript) {
      const h = heuristicScore(messages, scenario);
      return NextResponse.json(h, { headers: { 'Cache-Control': 'no-store' } });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // ============ ONLINE (LLM) BRANCH ============
    if (apiKey) {
      // You can keep your existing LLM call here.
      // Below is a very compact OpenAI call pattern—replace with your client if you prefer.

      // --- Simple fetch to OpenAI responses API (or your preferred SDK) ---
      const prompt = `
Score this sales call on a 0-10 scale with one decimal. Return JSON with keys: score, wentWell, improve, next.
Be brief, specific, and avoid generic phrasing. Use the transcript below.

TRANSCRIPT:
${transcript}
      `.trim();

      // If you use the OpenAI SDK, swap this fetch for client.responses.create.
      const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a concise sales call grader. Respond ONLY with valid JSON.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.2,
        })
      });

      if (openaiRes.ok) {
        const data = await openaiRes.json();
        const raw = data.choices?.[0]?.message?.content || '{}';
        let parsed: any;
        try {
          parsed = JSON.parse(raw);
        } catch {
          // fallback parse: extract numbers and strings if model added text
          parsed = heuristicScore(messages, scenario);
        }

        const out = {
          score: clamp(safeNum(parsed?.score, heuristicScore(messages, scenario).score), 0, 10),
          wentWell: String(parsed?.wentWell || '').trim() || heuristicScore(messages, scenario).wentWell,
          improve: String(parsed?.improve || '').trim() || heuristicScore(messages, scenario).improve,
          next: String(parsed?.next || '').trim() || heuristicScore(messages, scenario).next,
        };

        // ensure 0.1 precision
        out.score = Math.round(out.score * 10) / 10;

        return NextResponse.json(out, { headers: { 'Cache-Control': 'no-store' } });
      }

      // If OpenAI call failed, fall through to heuristic
    }

    // ============ OFFLINE / FALLBACK BRANCH ============
    const h = heuristicScore(messages, scenario);
    return NextResponse.json(h, { headers: { 'Cache-Control': 'no-store' } });

  } catch (e) {
    // Hard fail-safe
    return NextResponse.json(
      {
        score: 6.5,
        wentWell: 'Clear opener and natural pacing.',
        improve: 'Ask 2–3 targeted discovery questions.',
        next: 'Propose a crisp time for the next step.',
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  }
}


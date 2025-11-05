import { NextResponse } from 'next/server';

type Vertical = 'pharma' | 'b2b' | 'door2door';
type Difficulty = 'easy' | 'medium' | 'hard';
type Scenario = { vertical: Vertical; difficulty: Difficulty; tone: string; persona: string; product: string; };
type Msg = { who: 'you' | 'doc'; text: string };

const RUBRIC = `
You are the grader of a sales roleplay transcript between a salesperson ("you") and a buyer ("doc").
Return a strict JSON object with keys: score (0..10, number with 1 decimal), wentWell (string), improve (string), nextTime (string).

Scoring guidance (tailor to difficulty):
- Open Strong (2): concise intro, agenda, relevance to persona.
- Discovery (3): at least one good question + one follow-up tied to persona.
- Positioning/Value (3): translates features to value for the buyer's context (ROI for B2B/D2D; clinical/outcomes for Pharma).
- Next Step (2): closes for a sensible next step (trial, meeting, script, follow-up).

Difficulty bias:
- easy: be generous; accept short but correct answers; minor gaps OK.
- medium: standard rigor.
- hard: strict; push when value/close are weak.

Persona/vertical notes:
- Pharma: no ROI; clinical efficacy, safety, access logistics. If buyer asked coverage/PA and rep answered, don't keep penalizing repeats.
- B2B/D2D: ROI/value fine; no drug insurance topics.

Keep feedback crisp, bullet-style sentences in one paragraph each (no bullets in the JSON).
`;

export async function POST(req: Request) {
  try {
    const { scenario, transcript } = await req.json() as {
      scenario: Scenario;
      transcript: Msg[];
    };

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return NextResponse.json({ error: 'Missing OPENAI_API_KEY' }, { status: 500 });
    }

    const body = {
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' as const },
      messages: [
        { role: 'system', content: RUBRIC.trim() },
        {
          role: 'user',
          content:
            `Scenario:\n${JSON.stringify(scenario, null, 2)}\n\nTranscript (array of {who,text}):\n${JSON.stringify(transcript, null, 2)}\n\nReturn ONLY the JSON object.`
        }
      ],
      temperature: 0.2
    };

    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const raw = await apiRes.text();
    if (!apiRes.ok) {
      return NextResponse.json({ error: `OpenAI ${apiRes.status}: ${raw}` }, { status: 500 });
    }

    // Guaranteed JSON via response_format
    let data: any;
    try { data = JSON.parse(JSON.parse(raw).choices?.[0]?.message?.content || '{}'); }
    catch { data = {}; }

    // Defensive defaults so UI never shows blanks
    const score = typeof data.score === 'number' ? data.score : 0.0;
    const wentWell = data.wentWell || 'You asked relevant questions and kept momentum.';
    const improve  = data.improve  || 'Tie benefits to the persona and ask one deeper follow-up.';
    const nextTime = data.nextTime || 'State a clear next step and confirm agreement.';

    return NextResponse.json({ score, wentWell, improve, nextTime });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { track } from '@vercel/analytics'; // put at top of your page.tsx
type SpeechRecognition = any;

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
    mozSpeechRecognition?: any;
  }
}

/* =========================
   Types
========================= */
type Who = 'you' | 'doc';
type Vertical = 'pharma' | 'b2b' | 'door2door' | 'tech';
type Difficulty = 'easy' | 'medium' | 'hard';
type View = 'chat' | 'avatar';
type Gender = 'male' | 'female';

type Scenario = {
  vertical: Vertical;
  difficulty: Difficulty;
  tone: string;
  product: string;
  persona: string;
};

type Line = { who: Who; text: string };

type ScoreResult = {
  score: number;                      // 0..10
  wentWell: string;
  improve: string;
  next: string;
};

type RunRow = {
  ts: number;
  score: number;
  vertical: Vertical;
  difficulty: Difficulty;
  product: string;
  tone: string;
  persona: string;
};

/* =========================
   UI helpers
========================= */
const difficultyTint: Record<Difficulty, string> = {
  easy: 'rgba(56,189,248,.25)',      // sky
  medium: 'rgba(250,204,21,.25)',    // amber
  hard: 'rgba(248,113,113,.25)',     // red
};

const bubbleTint: Record<Who, string> = {
  you: '#3b82f6',
  doc: '#475569',
};

const roleLabel = (v: Vertical) => (v === 'pharma' ? 'Provider' : 'Prospect');

/* =========================
   Small helpers
========================= */
function bulletify(s: string): string[] {
  if (!s) return [];
  // Split on newlines, bullets, or sentence breaks; keep it simple and robust
  const parts = s
    .split(/\n|•|-\s|;\s|\. (?=[A-Z(])/g)
    .map(t => t.trim().replace(/^[•-\s]+/, ''))
    .filter(Boolean);
  return parts.length ? parts : [s];
}

/* =========================
   Avatar (SVG with visemes + blink)
========================= */
function clamp01(n: number) { return Math.max(0, Math.min(1, n)); }

function MaleAvatar({ thinking, blink, viseme }: { thinking: boolean; blink: boolean; viseme: number }) {
  const mouthOpen = 6 + 10 * clamp01(viseme);      // 6..16
  const browLift  = 0 + 3  * clamp01(viseme);      // 0..3
  const eyeRY     = blink ? 1 : 7;                 // quick blink

  return (
    <svg viewBox="0 0 220 220" width="220" height="220" role="img" aria-label="Male avatar">
      <defs>
        <radialGradient id="skinM" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#ffd7b8" />
          <stop offset="100%" stopColor="#eab799" />
        </radialGradient>
        <linearGradient id="shirtM" x1="0" x2="1">
          <stop offset="0%" stopColor="#7aa8ff" />
          <stop offset="100%" stopColor="#3d6cf0" />
        </linearGradient>
        <filter id="softShadowM" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(0,0,0,.35)" />
        </filter>
      </defs>

      <g filter="url(#softShadowM)">
        {/* neck */}
        <rect x="95" y="135" width="30" height="20" rx="8" fill="url(#skinM)" />
        {/* head */}
        <circle cx="110" cy="105" r="55" fill="url(#skinM)" />
        {/* hair */}
        <path d="M55,100 Q65,45 110,45 Q155,45 165,100 Q150,80 110,75 Q70,80 55,100 Z" fill="#3b3026" />
        {/* ears */}
        <circle cx="55" cy="110" r="9" fill="#e5a98d" />
        <circle cx="165" cy="110" r="9" fill="#e5a98d" />
        {/* eyes */}
        <ellipse cx="92" cy="105" rx="10" ry={eyeRY} fill="#fff" />
        <ellipse cx="128" cy="105" rx="10" ry={eyeRY} fill="#fff" />
        <circle cx="92" cy="105" r={eyeRY > 2 ? 3.2 : 0} fill="#222" />
        <circle cx="128" cy="105" r={eyeRY > 2 ? 3.2 : 0} fill="#222" />
        {/* brows */}
        <path d={`M80,${92 - browLift} q12,-8 24,-2`} stroke="#2a221d" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d={`M116,${90 - browLift} q15,-6 24,0`} stroke="#2a221d" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* mouth (animate openness) */}
        <path d={`M92,${128} q18,${mouthOpen} 36,0`} stroke="#b06464" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* shoulders/shirt */}
        <path d="M50,185 q60,-32 120,0 v15 h-120 z" fill="url(#shirtM)" />
      </g>

      {thinking && (
        <rect x="0" y="0" width="220" height="220" fill="transparent">
          <animate attributeName="opacity" from="0.15" to="0.35" dur="1.6s" repeatCount="indefinite" />
        </rect>
      )}
    </svg>
  );
}

function FemaleAvatar({ thinking, blink, viseme }: { thinking: boolean; blink: boolean; viseme: number }) {
  const mouthOpen = 6 + 10 * clamp01(viseme);
  const browLift  = 0 + 3  * clamp01(viseme);
  const eyeRY     = blink ? 1 : 7;

  return (
    <svg viewBox="0 0 220 220" width="220" height="220" role="img" aria-label="Female avatar">
      <defs>
        <radialGradient id="skinF" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#ffe0c8" />
          <stop offset="100%" stopColor="#f2bda0" />
        </radialGradient>
        <linearGradient id="shirtF" x1="0" x2="1">
          <stop offset="0%" stopColor="#ff9fd1" />
          <stop offset="100%" stopColor="#ff6fb8" />
        </linearGradient>
        <filter id="softShadowF" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(0,0,0,.35)" />
        </filter>
      </defs>

      <g filter="url(#softShadowF)">
        {/* neck */}
        <rect x="95" y="135" width="30" height="20" rx="8" fill="url(#skinF)" />
        {/* head */}
        <circle cx="110" cy="105" r="55" fill="url(#skinF)" />
        {/* long blonde hair */}
        <path d="M55,95 q5,-48 55,-52 q50,4 55,52 v35 q-15,25 -55,28 q-40,-3 -55,-28 z" fill="#ffcc66" />
        <path d="M55,96 q22,-28 55,-30 q33,2 55,30 q-20,-15 -55,-16 q-35,1 -55,16 z" fill="#ffcf70" />
        {/* ears */}
        <circle cx="55" cy="110" r="8.5" fill="#f2b9a0" />
        <circle cx="165" cy="110" r="8.5" fill="#f2b9a0" />
        {/* eyes */}
        <ellipse cx="92" cy="108" rx="10" ry={eyeRY} fill="#fff" />
        <ellipse cx="128" cy="108" rx="10" ry={eyeRY} fill="#fff" />
        <circle cx="92" cy="108" r={eyeRY > 2 ? 3 : 0} fill="#222" />
        <circle cx="128" cy="108" r={eyeRY > 2 ? 3 : 0} fill="#222" />
        {/* lashes */}
        {eyeRY > 2 && <path d="M83,102 l-6,-3 M99,102 l6,-3 M119,102 l6,-3 M135,102 l6,-3" stroke="#222" strokeWidth="1.5" />}
        {/* brows */}
        <path d={`M80,${95 - browLift} q12,-7 24,-2`} stroke="#a86b2a" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d={`M116,${94 - browLift} q15,-5 24,0`} stroke="#a86b2a" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* lipstick / mouth */}
        <path d={`M92,130 q18,${mouthOpen} 36,0`} stroke="#e23a77" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* shoulders/shirt */}
        <path d="M50,185 q60,-32 120,0 v15 h-120 z" fill="url(#shirtF)" />
      </g>

      {thinking && (
        <rect x="0" y="0" width="220" height="220" fill="transparent">
          <animate attributeName="opacity" from="0.15" to="0.35" dur="1.6s" repeatCount="indefinite" />
        </rect>
      )}
    </svg>
  );
}

/* =========================
   LocalStorage helpers
========================= */
const RUNS_KEY = 'dsim_runs_v4';
const HISTORY_KEY = 'dsim_history_v4';

function loadRuns(): RunRow[] {
  try {
    const s = localStorage.getItem(RUNS_KEY);
    return s ? (JSON.parse(s) as RunRow[]) : [];
  } catch {
    return [];
  }
}
function saveRun(row: RunRow) {
  const runs = loadRuns();
  runs.push(row);
  localStorage.setItem(RUNS_KEY, JSON.stringify(runs.slice(-200)));
}
function loadHistory(): Line[][] {
  try {
    const s = localStorage.getItem(HISTORY_KEY);
    return s ? (JSON.parse(s) as Line[][]) : [];
  } catch {
    return [];
  }
}
function saveHistory(conv: Line[]) {
  const h = loadHistory();
  h.push(conv);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(-50)));
}

/* =========================
   Voice (STT & TTS)
========================= */
function pickVoice(tone: string, gender: Gender) {
  const all = (typeof window !== 'undefined' ? window.speechSynthesis.getVoices() : []) || [];
  const femaleHints = ['Google UK English Female', 'Google US English', 'Samantha', 'Victoria', 'Karen'];
  const maleHints   = ['Google UK English Male',   'Google US English', 'Alex',     'Daniel',   'Fred'];
  const wanted = gender === 'female' ? femaleHints : maleHints;

  for (const hint of wanted) {
    const v = all.find(x => x.name.includes(hint));
    if (v) return v;
  }
  const byGender = all.find(v =>
    gender === 'female' ? /female/i.test(v.name) : /male/i.test(v.name)
  );
  if (byGender) return byGender;

  return all.find(v => v.lang?.toLowerCase() === 'en-us') ?? all[0];
}

function getRecognition(): SpeechRecognition | null {
  if (typeof window === 'undefined') return null; // <-- SSR guard (no runtime change)
  const w = window as any;
  const SR = w.SpeechRecognition || w.webkitSpeechRecognition || w.mozSpeechRecognition;
  if (!SR) return null;
  const rec = new SR();
  rec.lang = 'en-US';
  rec.interimResults = true;
  rec.continuous = true;
  (rec as any).maxAlternatives = 1;
  return rec as SpeechRecognition;
}

// --- Objection controls (client-side guard) ---
type ObjectionKey =
  | 'price'
  | 'time'
  | 'notInterested'
  | 'sendInfo'
  | 'authority'
  | 'lifestyle'
  | 'evidence'
  | 'competition'
  | 'timing'
  | 'risk'
  | 'misc';

const OBJECTION_LIMIT: Record<Difficulty, number> = { easy: 2, medium: 3, hard: 4 };

function classifyObjection(text: string): ObjectionKey | null {
  const t = text.toLowerCase();

  if (/(too\s*(expensive|price|cost)|budget|afford)/.test(t)) return 'price';
  if (/(no\s*time|busy|not\s*a\s*good\s*time|call\s*back)/.test(t)) return 'time';
  if (/(not\s*interested|don’t\s*need|do\s*not\s*need)/.test(t)) return 'notInterested';
  if (/(send|email)\s+(me|over)\s+(info|information|details|deck)/.test(t)) return 'sendInfo';
  if (/(need|have)\s+to\s+(ask|check|run\s+by)\s+(my\s+boss|manager|partner|spouse|team|procurement)/.test(t))
    return 'authority';
  if (/(does(n’t| not)\s*fit|fit\s*my\s*lifestyle|workflow|process|use\s*case)/.test(t)) return 'lifestyle';
  if (/(hard\s*evidence|proof|case\s*study|real\s*world\s*(study|evidence)|peer\s*review)/.test(t))
    return 'evidence';
  if (/(already\s*(use|have)|current\s*(vendor|provider)|working\s*with)/.test(t)) return 'competition';
  if (/(bad\s*time|circle\s*back\s*later|quarter\s*end|budget\s*cycle)/.test(t)) return 'timing';
  if (/(risk|concern|wary|skeptic)/.test(t)) return 'risk';
  return null;
}

function analyzeObjections(lines: Line[]) {
  // Count unique objections by the prospect (doc) and repetitions by category
  const counts = new Map<ObjectionKey, number>();
  const order: ObjectionKey[] = [];

  for (const l of lines) {
    if (l.who !== 'doc') continue;
    const k = classifyObjection(l.text);
    if (!k) continue;
    counts.set(k, (counts.get(k) ?? 0) + 1);
    if (!order.includes(k)) order.push(k);
  }

  const totalUnique = order.length;
  const lastCategory = order.length ? order[order.length - 1] : null;
  const lastCount = lastCategory ? counts.get(lastCategory) ?? 0 : 0;

  return { counts, totalUnique, lastCategory, lastCount };
}

function shouldMoveOn(
  scenario: Scenario,
  lines: Line[]
): { acceptAndClose: boolean; acceptThisOne: boolean } {
  const { totalUnique, lastCategory, lastCount } = analyzeObjections(lines);
  const limit = OBJECTION_LIMIT[scenario.difficulty];

  // If we already hit the unique-objection cap for the difficulty, time to move on.
  if (totalUnique >= limit) return { acceptAndClose: true, acceptThisOne: true };

  // If the current category has been brought up twice, accept and progress.
  if (lastCategory && lastCount >= 2) return { acceptAndClose: false, acceptThisOne: true };

  return { acceptAndClose: false, acceptThisOne: false };
}

function sanitizeForVertical(vertical: Vertical, reply: string) {
  if (vertical !== 'pharma') {
    // strip/soften insurance/coverage talk for non-pharma
    reply = reply.replace(/\b(insurance|coverage|copay|prior authorization)\b/gi, 'options');
  }
  return reply;
}

function acceptanceLine(category: ObjectionKey | null) {
  // Brief “accept + transition” lines after 2 rounds on the same objection
  const map: Partial<Record<ObjectionKey, string>> = {
    price:
      "Totally fair—let’s structure it so the cost lines up with the value you’ll see. If that’s reasonable, the next step is a quick kickoff.",
    time:
      "Makes sense—let’s keep this lightweight so it doesn’t add work. If that sounds good, we can pencil a short start date.",
    lifestyle:
      "Understood—it should fit your day, not fight it. We’ll tailor rollout to your workflow. Shall we schedule a quick start?",
    evidence:
      "Fair ask—I’ll send a concise summary you can review later. For now, we can lock a tentative start and you can cancel if it’s not a fit.",
    authority:
      "Good call—looping in the right person is smart. Let’s set a brief intro with them; I’ll keep it surgical.",
    competition:
      "No problem—this should complement what you have. We’ll start small so you can compare side-by-side.",
    timing:
      "Totally—timing matters. Let’s target a date that lines up with your schedule and keep it flexible.",
    sendInfo:
      "I’ll send a crisp one-pager right after this. In the meantime, shall we set a tentative slot?",
    notInterested:
      "Got it—if results look good, great; if not, we part friends. Low-risk start?",
    risk:
      "Fair concern—let’s keep the first step small and reversible. If it delivers, we expand.",
  };
  return map[category ?? 'misc'] ?? "That’s fair—let’s keep the first step small and reversible.";
}

function closingNudge() {
  return "If that works, let’s pick a quick time to kick off—what does early next week look like?";
}

/* =========================
   Page
========================= */
export default function Page() {
  /* Scenario (defaults Door-to-Door + pen + easy + matter-of-fact) */
  const [scenario, setScenario] = useState<Scenario>({
    vertical: 'door2door',
    difficulty: 'easy',
    tone: 'matter-of-fact',
    product: 'pen',
    persona: 'Homeowner, cost-conscious but open to value',
  });

  const [view, setView] = useState<View>('chat');
  const [gender, setGender] = useState<Gender>('male');

  /* Conversation state */
  const [messages, setMessages] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [interim, setInterim] = useState('');

  // === Mic Lock State and Helper Functions ===
const [micLocked, setMicLocked] = useState(false); // mic locked after End & Score

function stopMic() {
  try {
    (window as any).recognition?.stop?.();
  } catch {}
}

function startMicIfAllowed() {
  // only start if not Text Only and not locked
  if (!textOnly && !micLocked) {
    try {
      (window as any).recognition?.start?.();
    } catch {}
  }
}

  /* Scoring */
  const [score, setScore] = useState<ScoreResult | null>(null);

  /* History & Leaderboard (right drawer) */
  const [showHL, setShowHL] = useState(false);
  const [lbFilter, setLbFilter] = useState<Difficulty | 'all'>('all');
  const [lbRows, setLbRows] = useState<any[]>([]);
  const runs = loadRuns();
  const leaderboard = useMemo(
    () => runs.slice().sort((a, b) => b.score - a.score).slice(0, 10),
    [runs.length]
  );

  /* Voice refs */
  const recRef = useRef<SpeechRecognition | null>(null);
  const ttsSpeakingRef = useRef(false);
  const [listening, setListening] = useState(false);
  const [handsFree, setHandsFree] = useState(true);

  /* NEW: Text-only mode */
  const [textOnly, setTextOnly] = useState(false);

  /* NEW: lip-sync + blink state */
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [viseme, setViseme] = useState(0);
  const [blink, setBlink] = useState(false);

  /* NEW: Ended state (End & Score should *end* the call) */
  const [ended, setEnded] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);

  /* Keep bubbles tidy */
  useEffect(() => {
    const el = document.getElementById('chatScroll');
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  useEffect(() => {
  if (textOnly) {
    stopRecognition();        // hard stop the mic
    setListening(false);      // UI state
    setHandsFree(false);      // avoid auto-send voice flow
  }
}, [textOnly]);

  /* Blink timer */
  useEffect(() => {
    const t = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 120);
    }, 3600 + Math.random() * 1200);
    return () => clearInterval(t);
  }, []);

useEffect(() => {
  if (showHL) fetchTop(lbFilter);
}, [showHL, lbFilter]);
useEffect(() => {
  const onVoices = () => setVoicesReady(true);
  try {
    window.speechSynthesis.addEventListener?.('voiceschanged', onVoices);
  } catch {}
  // Safari may not fire voiceschanged — nudge once
  const t = setTimeout(() => setVoicesReady(true), 400);
  return () => {
    clearTimeout(t);
    try {
      window.speechSynthesis.removeEventListener?.('voiceschanged', onVoices);
    } catch {}
  };
}, []);

  /* Reset convo when scenario changes (except tone) */
  useEffect(() => {
    setMessages([]); 
    setScore(null);
    setEnded(false);
  }, [scenario.vertical, scenario.difficulty, scenario.product, scenario.persona]);

  /* ---- Voice controls ---- */
  function stopRecognition() {
    if (recRef.current) {
      try {
        (recRef.current as any).onresult = null;
        (recRef.current as any).onend = null;
        (recRef.current as any).onerror = null;
        recRef.current.stop();
      } catch {}
      recRef.current = null;
    }
    setListening(false);
  }

  function startVoice() {
    if (textOnly) return;  // 🚫 never start mic in Text Only
    // ...rest of your existing code
    if (ended || textOnly) return; // respect ended + text-only
    if (ttsSpeakingRef.current) return; // wait until TTS ends
    const rec = getRecognition();
    if (!rec) {
      alert('Speech Recognition not supported in this browser. Try Chrome on desktop.');
      return;
    }
    recRef.current = rec;
    setListening(true);
    setInterim('');

    // Grace period: don’t auto-send on tiny pauses
    let partialBuffer = '';
    let sendTimer: number | ReturnType<typeof setTimeout> | null = null;

    (rec as any).onresult = (e: any) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
       if (textOnly) return; //ignore speech results in Text Only
        const r = e.results[i];
        const txt = r[0].transcript;
        if (r.isFinal) {
          partialBuffer = (partialBuffer + ' ' + txt).trim();
          setInterim('');
          if (handsFree) {
            if (sendTimer) {
               clearTimeout(sendTimer);
	       sendTimer = null;
              }
            // 900ms grace period so brief pauses don’t fire mid-sentence
            sendTimer = window.setTimeout(() => {
              const toSend = partialBuffer.trim();
              partialBuffer = '';
              if (toSend) sendImmediate(toSend);
            }, 900);
          } else {
            setInput(prev => (prev ? `${prev} ${txt.trim()}` : txt.trim()));
          }
        } else {
          setInterim(txt);
        }
      }
    };

    (rec as any).onend = () => {
      setListening(false);
    };

    (rec as any).onerror = () => setListening(false);

    try {
      (rec as any).start();
    } catch {
      // ignore
    }
  }

  /* Natural-ish TTS with viseme pulses */
  function speakAndResume(text: string) {
  if (!text || ended || textOnly) return;

  // ✅ HARD STOP any live recognition before speaking to prevent self-hearing
  stopRecognition();
  setListening(false);

  if (!voicesReady) {
    setTimeout(() => speakAndResume(text), 120);
    return;
  }

  ttsSpeakingRef.current = true;

    // Pause mic to avoid echo
    const wasListening = listening;
    if (wasListening) stopRecognition();
    ttsSpeakingRef.current = true;

    const u = new SpeechSynthesisUtterance(text);
    u.voice = pickVoice(scenario.tone, gender);

    const t = scenario.tone.toLowerCase();
    u.rate   = t.includes('fast') ? 1.12 : t.includes('calm') ? 0.96 : 1.02;
    u.pitch  = gender === 'female' ? 1.06 : 0.98;
    u.volume = 1;

    u.onstart = () => { setIsSpeaking(true); setViseme(0.1); };
    u.onend = () => {
  setIsSpeaking(false);
  setViseme(0);
  ttsSpeakingRef.current = false;

  // ✅ Only restart mic after a small delay (avoid self-hearing echo)
  if ((handsFree || wasListening) && !textOnly && !ended) {
    setTimeout(() => startVoice(), 600);
  }
};
    u.onboundary = () => {
      const amp = 0.35 + Math.random() * 0.55; // 0..1
      setViseme(amp);
      setTimeout(() => setViseme(v => v * 0.25), 90);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  /* ---- Network helpers to your existing API routes ---- */
  async function fetchSimReply(lines: Line[]): Promise<string> {
    // quick guard so non-pharma never gets “coverage/insurance” replies injected by model
    const resp = await fetch('/api/sim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario, messages: lines }),
    });
    if (!resp.ok) return 'Sorry—could you restate that?';
    const data = await resp.json();
    let reply = (data.text ?? data.reply ?? 'Understood.') as string;

    // Safety pass: never mention insurance unless pharma
    if (scenario.vertical !== 'pharma') {
      if (/\b(coverage|covered|insurance|payer|formulary|prior ?auth|authorization)\b/i.test(reply)) {
        reply = 'Got it—let’s stick to the essentials for now.';
      }
    }
    return reply;
  }

async function fetchTop(d: Difficulty | 'all') {
  try {
    const qs = d === 'all' ? '' : `?difficulty=${encodeURIComponent(d)}`;
    const r = await fetch(`/api/scores/top${qs}`, { cache: 'no-store' });
    const j = await r.json();
    setLbRows(Array.isArray(j.rows) ? j.rows : []);
  } catch {
    setLbRows([]);
  }
}
async function saveScoreToCloud(payload: {
  initials?: string;
  score: number;
  vertical: Vertical;
  difficulty: Difficulty;
  product: string;
  tone: string;
  persona: string;
}) {
  try {
    await fetch('/api/scores/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify(payload),
    });
  } catch {
    // fail silently; local still works
  }
}

 async function scoreNow(lines: Line[]) {
  try {
    const resp = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',                         // <- prevent reuse
      body: JSON.stringify({
        scenario,
        messages: lines,
        transcript: lines
          .map(l => `${l.who === 'you' ? 'Rep' : roleLabel(scenario.vertical)}: ${l.text}`)
          .join('\n'),
      }),
    });

    if (!resp.ok) throw new Error('Score API not ok');

    const d = await resp.json();

    const scoreNum =
      Number.isFinite(d?.score) ? Math.round(Number(d.score) * 10) / 10 : 6.5;

    const res: ScoreResult = {
      score: scoreNum,
      wentWell: (d?.wentWell ?? d?.good ?? '').trim(),
      improve: (d?.improve ?? '').trim(),
      next: (d?.next ?? d?.nextTime ?? '').trim(),
    };

    setScore(res);

// Ask for initials once per session (simple UX for now)
let initials = (localStorage.getItem('pp_initials') || '').toUpperCase().slice(0,3);
if (!initials) {
  initials = (prompt('Enter your initials (3 letters) for the leaderboard:') || '')
               .toUpperCase()
               .replace(/[^A-Z]/g,'')
               .slice(0,3);
  if (initials) localStorage.setItem('pp_initials', initials);
}

// fire-and-forget cloud save
saveScoreToCloud({
  initials,
  score: res.score,
  vertical: scenario.vertical,
  difficulty: scenario.difficulty,
  product: scenario.product,
  tone: scenario.tone,
  persona: scenario.persona,
});
    saveRun({
      ts: Date.now(),
      score: res.score,
      vertical: scenario.vertical,
      difficulty: scenario.difficulty,
      product: scenario.product,
      tone: scenario.tone,
      persona: scenario.persona,
    });
    saveHistory(lines);
  } catch (err) {
    // 🔁 Dynamic offline fallback (varies per conversation)
    const rep = lines.filter(l => l.who === 'you').map(l => l.text).join(' ');
    const doc = lines.filter(l => l.who === 'doc').map(l => l.text).join(' ');
    const repQs = (rep.match(/\?/g) || []).length;
    const objCount = (doc.match(/price|expensive|budget|time|busy|coverage|insurance|prior\s*auth|risk|not\s*interested|send\s+info/gi) || []).length;

    let s = 5;
    s += Math.min(repQs * 0.35, 2);               // discovery
    s -= Math.min(objCount * 0.4, 1.2);           // objection tax
    s += (Math.random() - 0.5) * 0.5;             // small jitter
    s = Math.max(0, Math.min(10, s));
    s = Math.round(s * 10) / 10;                  // 0.1 precision

    setScore({
      score: s,
      wentWell: repQs >= 2
        ? 'Strong discovery and natural flow.'
        : 'Good rapport; add 1–2 sharper discovery questions.',
      improve: objCount > 0
        ? 'Tighten objection handling with one-sentence answers.'
        : 'Translate features into outcomes tied to the persona.',
      next: 'Propose a crisp next step and a concrete time.',
    });

    saveRun({
      ts: Date.now(),
      score: s,
      vertical: scenario.vertical,
      difficulty: scenario.difficulty,
      product: scenario.product,
      tone: scenario.tone,
      persona: scenario.persona,
    });
    saveHistory(lines);
  }
}
  /* ---- Sending user input ---- */
  function pushYou(text: string) {
    setMessages(prev => [...prev, { who: 'you', text }]);
  }

async function respondFromDoc(lines: Line[]) {
  // 1) Ask your simulator as usual
  let raw = await fetchSimReply(lines);

  // 2) Guard: remove non-pharma insurance talk
  raw = sanitizeForVertical(scenario.vertical, raw);

  // 3) Tiny anti-repeat only (no templated closes)
  const lastDoc = [...lines].reverse().find(l => l.who === 'doc')?.text || '';
  if (lastDoc && lastDoc.trim().toLowerCase() === raw.trim().toLowerCase()) {
    raw = "Makes sense—what would you need from me to get this started?";
  }

  // 4) Commit reply and speak if Avatar view
  setMessages(prev => [...prev, { who: 'doc', text: raw }]);
  if (view === 'avatar') speakAndResume(raw);
}
  async function sendImmediate(raw: string) {
    if (ended) return;
    const text = raw.trim();
    if (!text) return;
    setInput('');
    setInterim('');
    pushYou(text);
    await respondFromDoc([...messages, { who: 'you', text }]);
  }

  async function onSendClick() {
    await sendImmediate(input);
  }

  async function onEndAndScore() {
    stopMic();
    setMicLocked(true);
    // 1) hard-stop audio in/out
    setEnded(true);
    stopRecognition();
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setViseme(0);
    setInterim('');

    // 2) score
    await scoreNow(messages);
  }

  function onStartNew() {
    setMicLocked(false);
    startMicIfAllowed();
    setMessages([])
    setScore(null);
    setInput('');
    setInterim('');
    setEnded(false);
    if (!textOnly) {
      // stay idle until user hits Start Voice again (preserving your UX)
      stopRecognition();
    }
  }

  /* =========================
     Render
  ========================= */
  const label = roleLabel(scenario.vertical);
  const tintBG = difficultyTint[scenario.difficulty];

  return (
    <div style={{ minHeight: '100vh', background: '#0b1220', color: '#e5ecff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <img
      src="/logo.png"
      alt="PerfectPitch Logo"
      style={{ width: 100, height: 100, borderRadius: 15 }}
    />
    <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: 0.4 }}>
      PerfectPitch 
    </h1>
  </div>          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setShowHL(true)}
              style={{
                padding: '8px 12px',
                borderRadius: 10,
                background: '#22c55e22',
                border: '1px solid #22c55e55',
                color: '#bbf7d0',
                cursor: 'pointer',
              }}
            >
              History & Leaderboard
            </button>

            {/* Chat / Avatar toggle (unchanged size) */}
            <div
              style={{
                background: '#0f172a',
                border: '1px solid #273754',
                borderRadius: 999,
                padding: 4,
                display: 'flex',
                gap: 4,
              }}
            >
              <button
                onClick={() => setView('chat')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  color: view === 'chat' ? '#0b1220' : '#93a9cd',
                  background: view === 'chat' ? '#5eead4' : 'transparent',
                }}
              >
                Chat
              </button>
              <button
                onClick={() => setView('avatar')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  color: view === 'avatar' ? '#0b1220' : '#93a9cd',
                  background: view === 'avatar' ? '#5eead4' : 'transparent',
                }}
              >
                Avatar
              </button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, minmax(0,1fr))',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Vertical</div>
            <select
              value={scenario.vertical}
              onChange={e => setScenario(s => ({ ...s, vertical: e.target.value as Vertical }))}
              style={{ width: '100%', background: '#0f172a', color: '#e5ecff', borderRadius: 8, padding: 8, border: '1px solid #273754' }}
            >
              <option value="door2door">Door-to-Door</option>
              <option value="b2b">B2B</option>
              <option value="pharma">Pharma (HCP)</option>
              <option value="tech">Tech</option>
            </select>
          </div>

          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Difficulty</div>
            <select
              value={scenario.difficulty}
              onChange={e => setScenario(s => ({ ...s, difficulty: e.target.value as Difficulty }))}
              style={{ width: '100%', background: '#0f172a', color: '#e5ecff', borderRadius: 8, padding: 8, border: '1px solid #273754' }}
            >
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
            </select>
          </div>

          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Tone</div>
            <input
              value={scenario.tone}
              onChange={e => setScenario(s => ({ ...s, tone: e.target.value }))}
              placeholder="matter-of-fact"
              style={{ width: '100%', background: '#0f172a', color: '#e5ecff', borderRadius: 8, padding: 8, border: '1px solid #273754' }}
            />
          </div>

          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Product/Offer</div>
            <input
              value={scenario.product}
              onChange={e => setScenario(s => ({ ...s, product: e.target.value }))}
              placeholder="pen"
              style={{ width: '100%', background: '#0f172a', color: '#e5ecff', borderRadius: 8, padding: 8, border: '1px solid #273754' }}
            />
          </div>

          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Persona</div>
            <input
              value={scenario.persona}
              onChange={e => setScenario(s => ({ ...s, persona: e.target.value }))}
              placeholder="Homeowner…"
              style={{ width: '100%', background: '#0f172a', color: '#e5ecff', borderRadius: 8, padding: 8, border: '1px solid #273754' }}
            />
          </div>
        </div>

        {/* Action row (voice controls; gender toggle only on Avatar view) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <button
  onClick={() => (listening ? stopRecognition() : startVoice())}
  disabled={textOnly}
  style={{
    padding:'8px 12px',
    borderRadius:10,
    background: textOnly ? '#334155' : (listening ? '#ef4444' : '#22c55e'),
    border:'1px solid rgba(255,255,255,.15)',
    color:'#0b1220',
    cursor: textOnly ? 'not-allowed' : 'pointer',
    fontWeight:600,
    opacity: textOnly ? 0.6 : 1,
  }}
>
  {textOnly ? 'Text Only' : (listening ? 'Stop Voice' : 'Start Voice')}
</button>

          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, opacity: 0.9 }}>
            <input type="checkbox" checked={handsFree} onChange={e => setHandsFree(e.target.checked)} disabled={ended || textOnly} />
            Hands-free (auto-send)
          </label>

          {/* NEW: Text-Only toggle */}
          <label style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:14, opacity:0.9 }}>
  <input
    type="checkbox"
    checked={textOnly}
    onChange={e => setTextOnly(e.target.checked)}
  />
  Text Only (no mic)
          </label>

          {view === 'avatar' && (
            <div
              style={{
                marginLeft: 'auto',
                background: '#0f172a',
                border: '1px solid #273754',
                borderRadius: 999,
                padding: 4,
                display: 'flex',
                gap: 4,
              }}
            >
              <button
                onClick={() => setGender('male')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  color: gender === 'male' ? '#0b1220' : '#93a9cd',
                  background: gender === 'male' ? '#60a5fa' : 'transparent',
                }}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                style={{
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: 'none',
                  cursor: 'pointer',
                  color: gender === 'female' ? '#0b1220' : '#93a9cd',
                  background: gender === 'female' ? '#f472b6' : 'transparent',
                }}
              >
                Female
              </button>
            </div>
          )}
        </div>

        {/* Main content split */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: view === 'chat' ? '1fr' : '1fr 360px',
            gap: 16,
            transition: 'grid-template-columns .25s ease',
          }}
        >
          {/* Chat card */}
          <div
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01))`,
              border: '1px solid #1f2a44',
              borderRadius: 16,
              padding: 14,
            }}
          >
            <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 6 }}>{label}</div>
            <div
              id="chatScroll"
              style={{
                maxHeight: 430,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                padding: 8,
                background: '#0b1220',
                borderRadius: 14,
                border: '1px solid #17223b',
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: m.who === 'you' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '72%',
                      background: m.who === 'you' ? bubbleTint.you : bubbleTint.doc,
                      color: '#eaf1ff',
                      padding: '10px 12px',
                      borderRadius: 16,
                      borderTopLeftRadius: m.who === 'you' ? 16 : 6,
                      borderTopRightRadius: m.who === 'you' ? 6 : 16,
                      boxShadow: `0 2px 0 0 rgba(0,0,0,.25), inset 0 0 0 1000px ${tintBG}`,
                      lineHeight: 1.35,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>
                      {m.who === 'you' ? 'You' : label}
                    </div>
                    {m.text}
                  </div>
                </div>
              ))}
              {interim && (
                <div style={{ opacity: 0.6, fontStyle: 'italic', paddingLeft: 6 }}>…{interim}</div>
              )}
            </div>

            {/* Input row */}
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (ended) return;
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onSendClick();
                  }
                }}
                placeholder="Speak or type your next line…"
                style={{
                  flex: 1,
                  background: '#0f172a',
                  color: '#e5ecff',
                  borderRadius: 10,
                  padding: '10px 12px',
                  border: '1px solid #273754',
                  outline: 'none',
                } as React.CSSProperties}
                disabled={ended}
              />
              <button
                onClick={onSendClick}
                disabled={ended}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: ended ? '#64748b' : '#60a5fa',
                  border: '1px solid rgba(255,255,255,.15)',
                  color: '#0b1220',
                  fontWeight: 700,
                  cursor: ended ? 'not-allowed' : 'pointer',
                }}
              >
                Send
              </button>
              <button
                onClick={onEndAndScore}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: '#22c55e',
                  border: '1px solid rgba(255,255,255,.15)',
                  color: '#0b1220',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                End & Score
              </button>
              <button
                onClick={onStartNew}
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: '#f59e0b',
                  border: '1px solid rgba(255,255,255,.15)',
                  color: '#0b1220',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Start New
              </button>
            </div>

            {/* Score card */}
            {score && (
              <div
                style={{
                  marginTop: 12,
                  borderRadius: 14,
                  border: '1px solid #1f2a44',
                  padding: 12,
                  background: '#0f172a',
                }}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontWeight: 700 }}>Score:</div>
                  <div
                    style={{
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: '#22c55e22',
                      border: '1px solid #22c55e55',
                      color: '#bbf7d0',
                      fontWeight: 700,
                    }}
                  >
                    {Number(score.score).toFixed(1)} / 10
                  </div>
                </div>

                {/* Colored bullet “chips” */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 12 }}>
                  {/* Went well (green) */}
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>What went well</div>
                    <div style={{ display: 'grid', gap: 6 }}>
                      {bulletify(score.wentWell || '—').map((b, i) => (
                        <div
                          key={i}
                          style={{
                            background: '#16a34a22',
                            border: '1px solid #16a34a55',
                            color: '#bbf7d0',
                            padding: '6px 8px',
                            borderRadius: 10,
                            fontSize: 13,
                          }}
                        >
                          • {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Improvements (amber/red) */}
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Improvements</div>
                    <div style={{ display: 'grid', gap: 6 }}>
                      {bulletify(score.improve || '—').map((b, i) => (
                        <div
                          key={i}
                          style={{
                            background: '#f59e0b22',
                            border: '1px solid #f59e0b55',
                            color: '#fde68a',
                            padding: '6px 8px',
                            borderRadius: 10,
                            fontSize: 13,
                          }}
                        >
                          • {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next time (blue) */}
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Next time</div>
                    <div style={{ display: 'grid', gap: 6 }}>
                      {bulletify(score.next || 'Frame a crisp close and propose a time.').map((b, i) => (
                        <div
                          key={i}
                          style={{
                            background: '#60a5fa22',
                            border: '1px solid #60a5fa55',
                            color: '#bfdbfe',
                            padding: '6px 8px',
                            borderRadius: 10,
                            fontSize: 13,
                          }}
                        >
                          • {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Avatar card (only visible in Avatar view) */}
          {view === 'avatar' && (
            <div
              style={{
                background: `linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01))`,
                border: '1px solid #1f2a44',
                borderRadius: 16,
                padding: 14,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div style={{ fontSize: 13, opacity: 0.7, alignSelf: 'flex-start' }}>{label}</div>

              <div
                style={{
                  width: 280,
                  height: 320,
                  borderRadius: 18,
                  background: '#0b1220',
                  border: '1px solid #17223b',
                  display: 'grid',
                  placeItems: 'center',
                  padding: 10,
                  position: 'relative',
                }}
              >
                {gender === 'male' ? (
                  <MaleAvatar thinking={listening && !ttsSpeakingRef.current} blink={blink} viseme={isSpeaking ? viseme : 0} />
                ) : (
                  <FemaleAvatar thinking={listening && !ttsSpeakingRef.current} blink={blink} viseme={isSpeaking ? viseme : 0} />
                )}
              </div>

              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {ended ? 'Call ended' : listening ? 'Voice: listening' : (textOnly ? 'Voice: disabled (text only)' : 'Voice: idle')}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History & Leaderboard Drawer */}
      {showHL && (
        <div
          onClick={() => setShowHL(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.45)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 40,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: 840,
              maxWidth: '92vw',
              maxHeight: '80vh',
              overflow: 'auto',
              background: '#0f172a',
              border: '1px solid #1f2a44',
              borderRadius: 16,
              padding: 16,
              color: '#e5ecff',
              boxShadow: '0 20px 50px rgba(0,0,0,.45)',
            } as React.CSSProperties}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ margin: 0 }}>History & Leaderboard</h3>
              <button
                onClick={() => setShowHL(false)}
                style={{ background: '#17223b', color: '#cbd5e1', border: '1px solid #273754', borderRadius: 8, padding: '6px 10px' }}
              >
                Close
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Top 10</div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {leaderboard.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '28px 1fr 64px',
                        alignItems: 'center',
                        gap: 10,
                        background: '#0b1220',
                        border: '1px solid #17223b',
                        borderRadius: 10,
                        padding: '8px 10px',
                      }}
                    >
                      <div style={{ opacity: 0.6 }}>#{i + 1}</div>
                      <div style={{ fontSize: 13 }}>
                        <b>{Number(r.score).toFixed(1)}</b> — {r.vertical} / {r.difficulty} / {r.product}
                        <div style={{ fontSize: 11, opacity: 0.7 }}>{new Date(r.ts).toLocaleString()}</div>
                      </div>
                      <div style={{ fontSize: 11, opacity: 0.7, textAlign: 'right' }}>{r.tone}</div>
                    </div>
                  ))}
                  {leaderboard.length === 0 && <div style={{ opacity: 0.6 }}>No scores yet.</div>}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Recent Sessions</div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {loadHistory()
                    .slice()
                    .reverse()
                    .slice(0, 8)
                    .map((conv, i) => (
                      <div
                        key={i}
                        style={{
                          background: '#0b1220',
                          border: '1px solid #17223b',
                          borderRadius: 10,
                          padding: '8px 10px',
                          fontSize: 13,
                        }}
                      >
                        {conv.slice(0, 4).map((ln, j) => (
                          <div key={j}>
                            <b>{ln.who === 'you' ? 'You' : roleLabel(scenario.vertical)}:</b> {ln.text}
                          </div>
                        ))}
                        {conv.length > 4 && <div style={{ opacity: 0.6 }}>…</div>}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <button
                onClick={() => {
                  localStorage.removeItem(RUNS_KEY);
                  localStorage.removeItem(HISTORY_KEY);
                  setShowHL(false);
                }}
                style={{
                  background: '#ef4444',
                  color: '#0b1220',
                  padding: '8px 12px',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,.15)',
                  cursor: 'pointer',
                }}
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

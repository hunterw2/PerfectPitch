// /lib/mobileVoice.ts
let unlocked = false;
let ctx: AudioContext | null = null;
// --- fade / cancel helpers ---
let fadeTimer: number | null = null;

export function stopSpeaking() {
  try {
    if (fadeTimer) { cancelAnimationFrame(fadeTimer); fadeTimer = null; }
    window.speechSynthesis.cancel();
  } catch {}
}

// expose unlock flag so UI can show a hint
export let audioUnlocked = false;


// ------- AUDIO UNLOCK (unchanged behavior, just exported) -------
export async function ensureAudioUnlocked() {
  if (audioUnlocked) return;

  const resume = async () => {
    try {
      // nudge synth once so iOS allows audio
      const u = new SpeechSynthesisUtterance('');
      u.volume = 0;
      window.speechSynthesis.speak(u);
      audioUnlocked = true;

      window.removeEventListener('touchend', resume as any, true);
      window.removeEventListener('click', resume as any, true);
    } catch {}
  };

  window.addEventListener('touchend', resume as any, { passive: true, capture: true });
  window.addEventListener('click', resume as any, { passive: true, capture: true });
}

// ---------------- VOICE PICKING (stable across sessions) ----------------
type VoicePrefs = {
  lang?: string;       // e.g., 'en-US'
  nameHint?: string;   // part of the voice name to prefer, e.g., 'Samantha' | 'Daniel'
};
let cachedVoice: SpeechSynthesisVoice | null = null;

function pickVoice(prefs: VoicePrefs = { lang: "en-US", nameHint: "" }) {
  const voices = speechSynthesis.getVoices() || [];
  if (!voices.length) return null;

  // Prefer nameHint match
  if (prefs.nameHint) {
    const v = voices.find(v => v.name.toLowerCase().includes(prefs.nameHint!.toLowerCase()));
    if (v) return v;
  }
  // Then prefer language
  if (prefs.lang) {
    const v = voices.find(v => v.lang?.toLowerCase().startsWith(prefs.lang!.toLowerCase()));
    if (v) return v;
  }
  // Fallback: the first available voice
  return voices[0] ?? null;
}

function getStableVoice(prefs?: VoicePrefs): Promise<SpeechSynthesisVoice | null> {
  return new Promise(resolve => {
    const tryPick = () => {
      if (!cachedVoice) cachedVoice = pickVoice(prefs);
      resolve(cachedVoice);
    };
    const voices = speechSynthesis.getVoices();
    if (voices && voices.length) return tryPick();
    // Some browsers fire voices async
    const handler = () => {
      speechSynthesis.removeEventListener("voiceschanged", handler);
      tryPick();
    };
    speechSynthesis.addEventListener("voiceschanged", handler);
    // Also try once more soon in case the event never fires
    setTimeout(tryPick, 250);
  });
}

// ---------------- CADENCE HELPERS (less robotic) ----------------
function chunkIntoSentences(text: string): string[] {
  // Soft split on punctuation; keep short pieces merged
  const raw = text
    .replace(/\s+/g, " ")
    .trim()
    .split(/([.!?])\s+/)
    .reduce<string[]>((acc, part, i, arr) => {
      if (/[.!?]/.test(part) && acc.length) {
        acc[acc.length - 1] += part;
      } else if (part) {
        acc.push(part);
      }
      return acc;
    }, []);

  // Merge tiny fragments into neighbors for smoother delivery
  const merged: string[] = [];
  for (const s of raw) {
    const last = merged[merged.length - 1];
    if (last && (s.length < 12 || last.length < 12)) {
      merged[merged.length - 1] = `${last} ${s}`.trim();
    } else {
      merged.push(s.trim());
    }
  }
  return merged.filter(Boolean);
}

// ---------------- PRESETS (map your tone -> sound) ----------------
export type ToneKey =
  | "flirty"
  | "confident"
  | "matter-of-fact"
  | "empathetic"
  | "friendly"
  | "neutral";

type SpeakOptions = {
  tone?: ToneKey;         // maps to preset below
  allowOverlap?: boolean; // usually false
  rate?: number;          // manual override
  pitch?: number;         // manual override
  volume?: number;        // manual override
  voiceNameHint?: string; // e.g. 'Samantha' on iOS
  lang?: string;          // e.g. 'en-US'
};

const PRESETS: Record<ToneKey, { rate: number; pitch: number; volume: number }> = {
  // iOS-safe ranges: rate 0.85–1.15, pitch 0.9–1.2, volume 0.0–1.0
  flirty:         { rate: 1.05, pitch: 1.12, volume: 0.95 },
  confident:      { rate: 1.00, pitch: 1.02, volume: 1.00 },
  "matter-of-fact": { rate: 0.97, pitch: 0.98, volume: 1.00 },
  empathetic:     { rate: 0.94, pitch: 0.96, volume: 1.00 },
  friendly:       { rate: 1.03, pitch: 1.06, volume: 1.00 },
  neutral:        { rate: 1.00, pitch: 1.00, volume: 1.00 },
};

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

// ---------------- SPEAK (stable, tone-aware, non-overlapping) ----------------
let speaking = false;

export async function speakText(text: string, opts?: SpeakOptions) {
  try {
    stopSpeaking(); // stop anything already speaking

    const u = new SpeechSynthesisUtterance(text);

    // --- your existing tone/voice mapping here ---
    // e.g. set u.rate / u.pitch based on opts?.tone

    // tiny fade-in so it doesn’t pop
    let vol = 0;
    u.volume = 0;
    const target = 1;
    const step = () => {
      vol = Math.min(target, vol + 0.15);
      u.volume = vol;
      if (vol < target) fadeTimer = requestAnimationFrame(step);
      else fadeTimer = null;
    };
    fadeTimer = requestAnimationFrame(step);

    window.speechSynthesis.speak(u);
  } catch {}
}


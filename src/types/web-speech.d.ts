// src/types/web-speech.d.ts

// Minimal ambient typings so TS won't fail in CI builds.
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
    mozSpeechRecognition?: any;
  }
}

// Use a forgiving alias so refs like useRef<SpeechRecognition|null> compile.
type SpeechRecognition = any;

export {};

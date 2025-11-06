// types/speech.d.ts
// Minimal Web Speech declarations so TypeScript/Vercel can compile.

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult?: (e: any) => void;
  onerror?: (e: any) => void;
  onend?: (e: any) => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
    mozSpeechRecognition?: new () => SpeechRecognition;
  }
}

export {};


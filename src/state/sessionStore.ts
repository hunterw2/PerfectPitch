import { ObjectionState, ScoreState } from "@/types/objections";

export type SessionState = {
  score: ScoreState;
  currentObjection: ObjectionState | null;
  setCurrentObjection: (o: ObjectionState | null) => void;
  addDeduction: (n: number) => void;
};

// Example init:
export const initialScore: ScoreState = { total: 100, deductions: 0 };


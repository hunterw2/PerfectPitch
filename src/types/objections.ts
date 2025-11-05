export type RubricResult = {
  metrics: boolean;
  tracking: boolean;
  contingency: boolean;
  reassurance: boolean;
  qualityScore: number; // 0..1
};

export type ObjectionState = {
  id: string;
  retryCount: number;       // how many times prospect re-asked
  maxRetries: number;       // e.g., 2
  accepted: boolean;
  lastRubric?: RubricResult;
};

export type ScoreState = {
  total: number;            // 0..100 running score
  deductions: number;       // penalties added along the way
};


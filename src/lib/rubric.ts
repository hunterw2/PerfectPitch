import { RubricResult } from "@/types/objections";

const METRICS = [/(\d+%)/i, /week\s*\d/i, /\btargets?\b/i, /\bKPI(s)?\b/i];
const TRACKING = [/\binspection(s)?\b/i, /\btrap(s)?\b/i, /\blog(s)?\b/i, /\bcompare\b/i, /\bbaseline\b/i];
const CONTINGENCY = [/\b(if\b.*(not|met)|re-?service|no charge|adjust)\b/i];
const REASSURANCE = [/\bguarantee\b/i, /\bproof\b/i, /\bverif(i(ed|y))?\b/i, /\bfollow-?up\b/i, /\baccountability\b/i];

const checkAny = (arr: RegExp[], txt: string) => arr.some(rx => rx.test(txt));

export function evaluateObjectionResponse(userText: string): RubricResult {
  const metrics = checkAny(METRICS, userText);
  const tracking = checkAny(TRACKING, userText);
  const contingency = checkAny(CONTINGENCY, userText);
  const reassurance = checkAny(REASSURANCE, userText);
  const qualityScore = (+metrics + +tracking + +contingency + +reassurance) / 4;
  return { metrics, tracking, contingency, reassurance, qualityScore };
}

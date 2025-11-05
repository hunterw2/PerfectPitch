import { handleObjectionTurn } from "@/lib/objectionEngine";
import { initialScore } from "@/state/sessionStore";

const [score, setScore] = useState(initialScore);
const [currentObjection, setCurrentObjection] = useState<ObjectionState | null>(null);

async function onUserSend(userText: string) {
  // 1) If we’re currently in an objection sequence, handle it
  if (currentObjection) {
    const result = handleObjectionTurn(userText, currentObjection, score);

    setScore({ ...result.score });
    setCurrentObjection(result.objection.accepted ? null : result.objection);

    if (!result.proceed && result.nextPrompt) {
      // Prospect re-asks with coaching
      pushProspectMessage(result.nextPrompt); // your function that adds an AI/prospect bubble
      return;
    }

    if (result.tip) {
      showToast(`Moving on. Note: ${result.tip}`); // optional coaching
    }

    // objection accepted; continue to next dialogue node:
    advanceScenario(); // your existing function to move the conversation
    return;
  }

  // 2) Normal path: send userText to model, inspect the reply
  const prospectReply = await getProspectReply(userText); // your LLM call

  // If your classifier or prompt tags this as a “metrics objection”, start the flow:
  if (prospectReply.tag === "METRICS_OBJECTION") {
    setCurrentObjection({
      id: "metrics-clarity",
      retryCount: 0,
      maxRetries: 2,
      accepted: false
    });
  }

  pushProspectMessage(prospectReply.text);
}


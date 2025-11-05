type Session = {
  id: string;
  messages: { who: 'you' | 'doc'; text: string }[];
  scenario: any;
  updatedAt: number;
};

const sessions = new Map<string, Session>();

export function getSession(id: string): Session | undefined {
  return sessions.get(id);
}

export function saveSession(id: string, data: Session) {
  data.updatedAt = Date.now();
  sessions.set(id, data);
}

export function clearOldSessions(maxAgeMs = 1000 * 60 * 60) {
  const cutoff = Date.now() - maxAgeMs;
  for (const [id, s] of sessions.entries()) {
    if (s.updatedAt < cutoff) sessions.delete(id);
  }
}

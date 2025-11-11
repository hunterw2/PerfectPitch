import { NextRequest, NextResponse } from 'next/server';

type Difficulty = 'easy' | 'medium' | 'hard';
type Row = {
  ts: number;
  score: number;
  vertical: 'pharma' | 'b2b' | 'door2door' | 'tech';
  difficulty: Difficulty;
  product: string;
  tone: string;
  persona: string;
  initials?: string;
};

/**
 * Attempts to load the Vercel KV client, but won't crash build if it's not installed.
 */
async function getKV(): Promise<any | null> {
  try {
    // @vercel/kv must be in dependencies to actually use KV
    const mod = await import('@vercel/kv');
    return mod.kv;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const difficulty = (searchParams.get('difficulty') as Difficulty | null) ?? null;
    const limit = Math.min(Number(searchParams.get('limit') || 10), 50);

    // keys this route understands (works with either a global list or difficulty-specific)
    const baseKey = 'pp:scores:v1';
    const key = difficulty ? `${baseKey}:${difficulty}` : baseKey;

    const kv = await getKV();
    let rows: Row[] = [];

    if (kv) {
      // Try sorted-set first (highest scores first)
      try {
        // zrange with REV is supported; fall back if not
        // @ts-ignore – different KV providers expose similar API via @vercel/kv
        const z = await kv.zrange<Row>(key, 0, limit - 1, { rev: true, withScores: false });
        if (Array.isArray(z) && z.length) {
          rows = z.map((item: any) => (typeof item === 'string' ? JSON.parse(item) : item)).slice(0, limit);
        }
      } catch {
        // ignore and try list
      }

      // If no data came back, try a list (lpush of JSON strings)
      if (rows.length === 0) {
        try {
          // lrange returns newest-first if you used LPUSH; reverse to show highest/most recent if you want
          const l = await kv.lrange<string>(key, 0, limit - 1);
          rows = (l || [])
            .map(s => {
              try { return JSON.parse(s) as Row; } catch { return null; }
            })
            .filter(Boolean) as Row[];

          // If you want consistent ordering by score desc:
          rows.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
        } catch {
          // ignore; rows stays []
        }
      }
    }

    // Always respond, even if KV is missing — the UI already handles no rows.
    return NextResponse.json({ rows: rows.slice(0, limit) });
  } catch (err) {
    // Never crash deploys; return safe empty payload with a hint
    return NextResponse.json(
      { rows: [], error: 'scores_top_failed', detail: (err as Error)?.message ?? 'unknown' },
      { status: 200 }
    );
  }
}


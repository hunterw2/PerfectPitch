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

// ---- local fallback store for environments without KV ----
let localCache: Row[] = [];

/**
 * Safe mock getKV() that never imports anything
 */
async function getKV(): Promise<null> {
  return null; // bypass actual module so build never looks for it
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const difficulty = (searchParams.get('difficulty') as Difficulty | null) ?? null;
    const limit = Math.min(Number(searchParams.get('limit') || 10), 50);

    // We don't actually connect to KV unless it's set up; fall back to cache
    let rows: Row[] = localCache;

    // Optionally filter by difficulty
    if (difficulty) {
      rows = rows.filter(r => r.difficulty === difficulty);
    }

    // Sort by score descending
    rows = rows.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, limit);

    return NextResponse.json({ rows });
  } catch (err) {
    return NextResponse.json(
      { rows: [], error: 'scores_top_failed', detail: (err as Error)?.message ?? 'unknown' },
      { status: 200 }
    );
  }
}


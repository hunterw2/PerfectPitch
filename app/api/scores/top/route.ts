import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

// GET: fetch top scores filtered by difficulty
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const difficulty = searchParams.get('difficulty') || 'easy'; // default fallback

    // Each difficulty gets its own leaderboard key
    const key = `perfectpitch:scores:${difficulty}`;

    const scores = await kv.zrange(key, 0, 20, { rev: true });
    return NextResponse.json({ scores });
  } catch (error) {
    console.error('Error fetching scores:', error);
    return NextResponse.json({ error: 'Failed to fetch scores' }, { status: 500 });
  }
}

// POST: save score with difficulty category
export async function POST(req: Request) {
  try {
    const { initials, score, difficulty = 'easy' } = await req.json();
    if (!initials || typeof score !== 'number') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const key = `perfectpitch:scores:${difficulty}`;
    await kv.zadd(key, {
      score,
      member: JSON.stringify({ initials, score, difficulty, date: Date.now() }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding score:', error);
    return NextResponse.json({ error: 'Failed to add score' }, { status: 500 });
  }
}


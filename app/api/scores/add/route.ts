import { NextResponse } from "next/server";

const URL   = process.env.KV_REST_API_URL!;
const TOKEN = process.env.KV_REST_API_TOKEN!;
const HEAD  = { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" };

type Body = {
  initials?: string;
  score: number;
  vertical: "pharma"|"b2b"|"door2door"|"tech";
  difficulty: "easy"|"medium"|"hard";
  product: string;
  tone: string;
  persona: string;
  ts?: number;
};

async function kv(cmd: any[]) {
  const r = await fetch(URL, { method:"POST", headers:HEAD, body: JSON.stringify({ cmd }) });
  if (!r.ok) throw new Error("KV error");
  return r.json();
}

export async function POST(req: Request) {
  try {
    const b = (await req.json()) as Body;
    const row = { ...b, ts: b.ts ?? Date.now(), initials: (b.initials||"").slice(0,4).toUpperCase() };

    const allKey  = "pp:scores:v1";
    const diffKey = `pp:scores:v1:${row.difficulty}`;
    const recent  = "pp:recent:v1";
    const member  = JSON.stringify(row);

    await Promise.all([
      kv(["ZADD", allKey,  String(row.score), member]),
      kv(["ZADD", diffKey, String(row.score), member]),
      kv(["LPUSH", recent, member]),
      kv(["LTRIM", recent, "0", "1000"]),
    ]);

    return NextResponse.json({ ok:true });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error:e?.message||"fail" }, { status:500 });
  }
}


import { NextResponse } from "next/server";

const URL   = process.env.KV_REST_API_URL!;
const TOKEN = process.env.KV_REST_API_TOKEN!;
const HEAD  = { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" };

async function kv(cmd: any[]) {
  const r = await fetch(URL, { method:"POST", headers:HEAD, body: JSON.stringify({ cmd }) });
  if (!r.ok) throw new Error("KV error");
  return r.json();
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url ?? '', process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com');
    const difficulty = searchParams.get("difficulty") as "easy"|"medium"|"hard"|null;
    const limit = Math.min(Number(searchParams.get("limit")||10), 50);
    const key = difficulty ? `pp:scores:v1:${difficulty}` : "pp:scores:v1";

    const { result } = await kv(["ZREVRANGE", key, "0", String(limit-1)]);
    const rows = (result as string[]).map(s => JSON.parse(s));
    return NextResponse.json({ rows });
  } catch (e:any) {
    return NextResponse.json({ rows:[], error:e?.message||"fail" }, { status:500 });
  }
}


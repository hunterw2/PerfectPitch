// app/api/did/status/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const apiKey = process.env.DID_API_KEY!;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing DID_API_KEY" }, { status: 500 });
    }
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const r = await fetch(`https://api.d-id.com/talks/${id}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey + ":").toString("base64")}`,
      },
      cache: "no-store",
    });

    const json = await r.json();
    if (!r.ok) {
      return NextResponse.json({ error: json?.error || "status failed" }, { status: r.status });
    }

    // Typical shape: { status: "created"|"processing"|"done"|"error", result_url?: "...", error?: {...} }
    return NextResponse.json({
      status: json.status,
      result_url: json.result_url || json.result_url_mp4 || json?.result?.url || null,
      error: json.error ?? null,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "server error" }, { status: 500 });
  }
}


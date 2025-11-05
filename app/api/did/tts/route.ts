// app/api/did/tts/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const DID_API_KEY = process.env.DID_API_KEY;
    if (!DID_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing DID_API_KEY in .env.local" }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    const { text, voice_id } = await req.json();

    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "text is required" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    // Optional: allow caller to pick a D-ID voice; fallback to your env default
    const voice = voice_id || process.env.DID_VOICE_ID || "en-US-Journey-D";

    // --- D-ID TTS call ---
    // This uses D-ID’s TTS endpoint that returns audio/mpeg (MP3).
    // If your account uses a slightly different path, just update `ttsUrl`.
    const ttsUrl = `https://api.d-id.com/v1/tts`;

    const upstream = await fetch(ttsUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${Buffer.from(DID_API_KEY + ":").toString("base64")}`,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        voice_id: voice,
        // You can pass optional prosody params if your plan supports it:
        // speaking_rate: 1.0,
        // pitch: 0,
        // style: "conversational"
      }),
    });

    if (!upstream.ok) {
      const err = await safeText(upstream);
      return new Response(
        JSON.stringify({ error: "D-ID TTS failed", details: err }),
        { status: 502, headers: { "content-type": "application/json" } }
      );
    }

    // Stream raw MP3 bytes back to the browser
    const arrayBuf = await upstream.arrayBuffer();
    return new Response(Buffer.from(arrayBuf), {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: "Proxy error", details: e?.message || String(e) }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}

async function safeText(res: Response) {
  try {
    return await res.text();
  } catch {
    return "<no error body>";
  }
}


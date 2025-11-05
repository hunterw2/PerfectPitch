import { NextResponse } from "next/server";

const DID_API = "https://api.d-id.com/v1/talks";

export async function POST(req: Request) {
  try {
    const { gender = "male", text = "", tone = "matter-of-fact" } = await req.json();

    if (!process.env.DID_API_KEY) {
      return NextResponse.json({ error: "Missing DID_API_KEY" }, { status: 500 });
    }

    const avatarUrl =
      gender === "female"
        ? process.env.NEXT_PUBLIC_AVATAR_IMAGE_URL_FEMALE
        : process.env.NEXT_PUBLIC_AVATAR_IMAGE_URL_MALE;

    // 1) create the talk
    const create = await fetch(DID_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // D-ID uses Basic with the key itself
        Authorization: `Basic ${process.env.DID_API_KEY}`,
      },
      body: JSON.stringify({
        source_url: avatarUrl,
        // simple text script; you can pass SSML if you’d like
        script: { type: "text", input: text },
        // optional: nudge speaking style from your tone
        config: { stitch: true },
      }),
    });

    const created = await create.json();
    if (!create.ok) {
      return NextResponse.json({ error: created?.error || "D-ID create failed" }, { status: 500 });
    }

    const id = created?.id;
    if (!id) return NextResponse.json({ error: "No id from D-ID" }, { status: 500 });

    // 2) poll until ready
    let url = "";
    for (let i = 0; i < 25; i++) {
      await new Promise((r) => setTimeout(r, 900));
      const statusRes = await fetch(`${DID_API}/${id}`, {
        headers: { Authorization: `Basic ${process.env.DID_API_KEY}` },
      });
      const status = await statusRes.json();
      if (status?.status === "done") {
        // different SDKs expose slightly different fields; cover common ones
        url = status.result_url || status.result?.url || status.output_url || status?.urls?.[0] || "";
        break;
      }
      if (status?.status === "error") {
        return NextResponse.json({ error: status?.error || "Generation error" }, { status: 500 });
      }
    }

    if (!url) return NextResponse.json({ error: "Timed out waiting for video" }, { status: 504 });
    return NextResponse.json({ url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Avatar error" }, { status: 500 });
  }
}


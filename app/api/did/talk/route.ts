import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, imageUrl, voiceId } = await req.json();
    const apiKey = process.env.DID_API_KEY!;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing DID_API_KEY' }, { status: 500 });
    }

    // Create the D-ID "talk" job
    const body = {
      source_url: imageUrl, // your male.jpg or female.jpg
      script: {
        type: 'text',
        input: text,
        provider: {
          type: 'microsoft',
          voice_id: voiceId || process.env.DID_VOICE_ID || 'en-US-Journey-D',
        },
      },
      config: {
        stitch: true,
        driver_expressions: {
          expressions: [{ expression: 'neutral', start_time: 0, intensity: 0.2 }],
        },
      },
    };

    const talkResp = await fetch('https://api.d-id.com/talks', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const talkData = await talkResp.json();
    if (!talkResp.ok) {
      return NextResponse.json({ error: talkData.error || 'D-ID talk creation failed' }, { status: talkResp.status });
    }

    return NextResponse.json({ id: talkData.id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}


import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY as string;
const GROQ_MODEL = (process.env.GROQ_MODEL as string) || "llama-3.1-8b-instant"; // supported default

export async function POST(req: NextRequest) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Server misconfiguration: GROQ_API_KEY is not set.' },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    if (!message) {
      return NextResponse.json(
        { error: 'Invalid request: "message" is required.' },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are the FarmGebeya in-app help assistant. Be concise, friendly, and actionable. Provide step-by-step guidance when needed. If a task seems unsafe or requires configuration (like API keys), explain what to do. Project context: Next.js app with login and register pages, a searchable country select in the login modal, a top search bar with a Help icon, and this right-side Help sidebar using /api/ask."
          },
          { role: "user", content: message }
        ],
      }),
      signal: controller.signal,
    }).catch((err) => {
      if ((err as Error).name === 'AbortError') {
        return new Response(JSON.stringify({ error: 'Upstream request timed out.' }), { status: 504 });
      }
      throw err;
    });
    clearTimeout(timeout);

    const data = await response.json();

    if (!response.ok) {
      // Common: 401 Unauthorized if the API key is missing/invalid
      const reason = data?.error || data;
      return NextResponse.json(
        { error: `Upstream error (${response.status}): ${typeof reason === 'string' ? reason : JSON.stringify(reason)}` },
        { status: response.status }
      );
    }

    const reply = data.choices[0]?.message?.content || "No reply found.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * AKT chatbot — proxies the visitor's message to the n8n webhook and returns
 * its reply as the assistant message. Proxied server-side (not from the
 * browser) to avoid CORS. Override the URL with CHATBOT_WEBHOOK_URL.
 */
const WEBHOOK_URL =
  process.env.CHATBOT_WEBHOOK_URL ||
  "https://primary-production-6722.up.railway.app/webhook/aktservices-chatbot";

// AI replies can take a while; don't hang forever.
const TIMEOUT_MS = 60_000;

type Msg = { role: "user" | "assistant"; content: string };

/** Pull a reply string out of whatever shape the webhook returns. */
function extractReply(payload: unknown): string | null {
  if (payload == null) return null;
  if (typeof payload === "string") return payload.trim() || null;

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const r = extractReply(item);
      if (r) return r;
    }
    return null;
  }

  if (typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    // Common n8n / AI-agent reply fields, in priority order.
    for (const key of ["output", "reply", "text", "answer", "response", "message", "content"]) {
      const v = obj[key];
      if (typeof v === "string" && v.trim()) return v.trim();
    }
    // Dig into wrappers — but NOT `body`, which is the request the n8n webhook
    // echoes back when no real reply has been produced yet.
    for (const key of ["data", "json", "result"]) {
      const v = obj[key];
      if (v && typeof v === "object") {
        const nested = extractReply(v);
        if (nested) return nested;
      }
    }
  }
  return null;
}

/** True when the webhook just echoed our request (n8n default "immediate" response). */
function isRequestEcho(payload: unknown): boolean {
  const first = Array.isArray(payload) ? payload[0] : payload;
  return (
    !!first &&
    typeof first === "object" &&
    "webhookUrl" in (first as Record<string, unknown>) &&
    "executionMode" in (first as Record<string, unknown>)
  );
}

export async function POST(req: Request) {
  let body: { messages?: Msg[]; sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ reply: "Invalid request." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const lastUser =
    [...messages].reverse().find((m) => m.role === "user")?.content?.trim() || "";

  if (!lastUser) {
    return NextResponse.json({ reply: "Please type a message." }, { status: 400 });
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Send the message under several common keys so the n8n flow can read
      // whichever it expects, plus the full history + a session id for memory.
      body: JSON.stringify({
        message: lastUser,
        chatInput: lastUser,
        sessionId: body.sessionId,
        messages,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("chatbot webhook error:", res.status, errText.slice(0, 300));
      return NextResponse.json(
        { reply: "Sorry, I couldn't reach the assistant right now. Please try again." },
        { status: 502 },
      );
    }

    const text = await res.text();
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      /* webhook returned plain text */
    }

    // The n8n flow isn't returning an AI reply yet (it echoed the request).
    if (parsed != null && isRequestEcho(parsed)) {
      console.warn("chatbot webhook echoed the request — finish the n8n flow + 'Respond to Webhook'.");
      return NextResponse.json({
        reply: "The assistant isn't fully set up yet. Please try again shortly.",
      });
    }

    // Only fall back to raw text when the response WASN'T JSON (avoid dumping JSON).
    const reply = parsed != null ? extractReply(parsed) : text.trim() || null;
    return NextResponse.json({
      reply: reply || "I didn't catch a response — please try again.",
    });
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      return NextResponse.json(
        { reply: "That took too long to respond. Please try again." },
        { status: 504 },
      );
    }
    console.error("chatbot proxy error:", err);
    return NextResponse.json({ reply: "Connection error. Please try again." }, { status: 500 });
  }
}

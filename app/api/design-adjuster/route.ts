import { NextResponse } from "next/server";
import { logToolUsage } from "@/lib/usage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Design Adjuster — forwards the photo + brushed mask + instructions to the
 * processing webhook (n8n on Railway) and returns the processed image.
 *
 * Proxied server-side (not from the browser) to avoid CORS. Request scheme
 * matches the webhook:  { image, mask, instructions }  — image/mask are raw
 * base64 (no data: prefix).
 *
 * The webhook responds with an OpenAI-style payload (wrapped in an array):
 *   [ { created, background, data: [ { b64_json: "<base64 png>" } ] } ]
 */
const WEBHOOK_URL =
  process.env.DESIGN_ADJUSTER_WEBHOOK_URL ||
  "https://primary-production-6722.up.railway.app/webhook/design-adjuster";

// Allow long-running image generation, but don't hang forever.
const TIMEOUT_MS = 120_000;

/** Strip a "data:image/...;base64," prefix → raw base64. */
function toBase64(dataUrl?: string): string {
  if (!dataUrl) return "";
  if (!dataUrl.startsWith("data:")) return dataUrl;
  const comma = dataUrl.indexOf(",");
  return comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
}

/** Turn a string into a usable <img> src (data URL, http URL, or bare base64). */
function normalizeImageString(s: string): string | null {
  const v = s.trim();
  if (!v) return null;
  if (v.startsWith("data:image")) return v;
  if (/^https?:\/\//.test(v)) return v;
  if (/^[A-Za-z0-9+/=\s]+$/.test(v) && v.length > 100) {
    return `data:image/png;base64,${v.replace(/\s+/g, "")}`;
  }
  return null;
}

/** Find an output image anywhere in the webhook's response (array/object/string). */
function extractImage(payload: unknown): string | null {
  if (payload == null) return null;
  if (typeof payload === "string") return normalizeImageString(payload);

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const found = extractImage(item);
      if (found) return found;
    }
    return null;
  }

  if (typeof payload !== "object") return null;
  const obj = payload as Record<string, unknown>;

  const asPng = (b: string) => (b.startsWith("data:") ? b : `data:image/png;base64,${b}`);

  // The webhook's "Respond to Webhook" node returns { "b64": "<base64 png>" }.
  if (typeof obj.b64 === "string") return asPng(obj.b64);
  if (typeof obj.b64_json === "string") return asPng(obj.b64_json);

  // OpenAI image shape: { data: [ { b64_json | b64 | url | image } ] }
  if (Array.isArray(obj.data)) {
    for (const entry of obj.data) {
      if (entry && typeof entry === "object") {
        const e = entry as Record<string, unknown>;
        if (typeof e.b64_json === "string") return asPng(e.b64_json);
        if (typeof e.b64 === "string") return asPng(e.b64);
        if (typeof e.url === "string") return normalizeImageString(e.url);
        if (typeof e.image === "string") return normalizeImageString(e.image);
      }
    }
  }

  for (const key of ["image", "output", "result", "url"] as const) {
    const v = obj[key];
    if (typeof v === "string") {
      const n = normalizeImageString(v);
      if (n) return n;
    }
  }

  // Nested object (e.g. { data: { ... } })
  if (obj.data && typeof obj.data === "object" && !Array.isArray(obj.data)) {
    return extractImage(obj.data);
  }
  return null;
}

export async function POST(req: Request) {
  let body: { image?: string; mask?: string; prompt?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.image || !body.prompt?.trim()) {
    return NextResponse.json(
      { error: "An image and design instructions are required." },
      { status: 400 },
    );
  }

  const payload = {
    image: toBase64(body.image),
    mask: toBase64(body.mask),
    instructions: body.prompt.trim(),
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("design-adjuster webhook error:", res.status, errText.slice(0, 500));
      const snippet = errText.trim().slice(0, 200);
      return NextResponse.json(
        {
          error: `Webhook returned ${res.status} ${res.statusText}.${
            snippet ? ` Response: ${snippet}` : " (empty body)"
          }`,
        },
        { status: 502 },
      );
    }

    const contentType = res.headers.get("content-type") || "";

    // Binary image response.
    if (contentType.startsWith("image/")) {
      const buf = Buffer.from(await res.arrayBuffer());
      await logToolUsage("Design Adjuster");
      return NextResponse.json({
        image: `data:${contentType};base64,${buf.toString("base64")}`,
      });
    }

    // Text/JSON — parse and dig out the output image (handles b64_json, arrays, urls).
    const text = await res.text();
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      /* not JSON */
    }

    const out = parsed != null ? extractImage(parsed) : normalizeImageString(text);
    if (out) {
      await logToolUsage("Design Adjuster");
      return NextResponse.json({ image: out });
    }

    // No image found — surface what the webhook actually returned so we can see why.
    console.error("design-adjuster: no image in response. Body:", text.slice(0, 800));
    return NextResponse.json({
      message: `No image in webhook response. It returned: ${
        text.trim().slice(0, 250) || "(empty body)"
      }`,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      return NextResponse.json(
        { error: "The image service took too long to respond. Please try again." },
        { status: 504 },
      );
    }
    console.error("design-adjuster proxy error:", err);
    return NextResponse.json(
      { error: "Couldn't reach the image service. Please try again." },
      { status: 502 },
    );
  }
}

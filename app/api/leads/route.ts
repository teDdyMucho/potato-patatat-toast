import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cap = (s: unknown, n: number) => (typeof s === "string" ? s.trim().slice(0, n) : "");

const WEBHOOK_URL =
  "https://primary-production-6722.up.railway.app/webhook/ghl-savecontact-aktservices-bookconsultation";

// Per-tool automation webhooks fired when a lead unlocks that tool's sample
// on /ai-tools (see app/ai-tools/page.tsx). Keyed server-side by slug — the
// client only ever sends the slug, never a URL, so it can't be used to POST
// arbitrary lead data to an attacker-controlled endpoint.
const TOOL_WEBHOOKS: Record<string, string> = {
  "retell-ai": "https://primary-production-6722.up.railway.app/webhook/callretell-aktservices",
  "nurturing-ghl": "https://primary-production-6722.up.railway.app/webhook/nurturingsequence-aktservices",
  "outreach-ghl": "https://primary-production-6722.up.railway.app/webhook/outreach-aktservices",
};

/**
 * POST /api/leads — PUBLIC.
 * 1. Validates required fields.
 * 2. Saves the lead to public.leads via the save_lead() Supabase function.
 * 3. Fires the GHL webhook (non-blocking — webhook failure never blocks the user).
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const firstName = cap(body.firstName, 100);
  const lastName  = cap(body.lastName, 100);
  const name      = `${firstName} ${lastName}`.trim() || cap(body.name, 200);
  const email     = cap(body.email, 200);
  const message   = cap(body.message, 5000);

  if (!firstName || !email || !message) {
    return NextResponse.json(
      { error: "First name, email, and message are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const company     = cap(body.company, 200) || null;
  const phone       = cap(body.phone, 60)    || null;
  const need        = cap(body.need, 120)    || null;
  const contactTime = cap(body.contactTime, 200) || null;
  const userId      = typeof body.userId === "string" && body.userId ? body.userId : null;
  const toolSlug    = cap(body.toolSlug, 60) || null;

  let leadId: string | null = null;

  // ── 1. Save to Supabase via save_lead() function ──────────────────────────
  try {
    const admin = createSupabaseAdminClient();

    const { data, error } = await admin.rpc("save_lead", {
      p_first_name:   firstName,
      p_last_name:    lastName,
      p_email:        email,
      p_message:      message,
      p_company:      company,
      p_phone:        phone,
      p_need:         need,
      p_contact_time: contactTime,
      p_user_id:      userId,
      p_source:       "contact_form",
    });

    if (error) {
      console.warn("save_lead RPC failed, falling back to direct insert:", error.message);
      const { error: insertError } = await admin.from("leads").insert({
        name, first_name: firstName, last_name: lastName,
        email, message, company, phone, need,
        contact_time: contactTime,
        user_id: userId,
        source: "contact_form",
      });
      if (insertError) {
        console.error("lead insert error:", insertError.message);
        return NextResponse.json({ error: "Couldn't save your message." }, { status: 500 });
      }
    } else {
      leadId = data as string;
    }
  } catch (err) {
    console.error("lead submit error:", err);
    return NextResponse.json({ error: "Couldn't save your message." }, { status: 500 });
  }

  // ── 2. Fire GHL webhook (non-blocking) ────────────────────────────────────
  const webhookPayload = {
    lead_id:      leadId,
    user_id:      userId,
    first_name:   firstName,
    last_name:    lastName,
    name,
    email,
    phone,
    company,
    need,
    message,
    contact_time: contactTime,
    source:       "contact_form",
    site:         "aktservices.org",
    submitted_at: new Date().toISOString(),
  };

  fetch(WEBHOOK_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(webhookPayload),
  }).catch((err) => console.error("GHL webhook error:", err.message));

  // ── 3. Fire the tool-specific automation webhook, if this came from an
  //       /ai-tools sample unlock (non-blocking) ────────────────────────────
  const toolWebhookUrl = toolSlug ? TOOL_WEBHOOKS[toolSlug] : null;
  if (toolWebhookUrl) {
    fetch(toolWebhookUrl, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ ...webhookPayload, tool_slug: toolSlug }),
    }).catch((err) => console.error(`Tool webhook error (${toolSlug}):`, err.message));
  }

  return NextResponse.json({ ok: true, lead_id: leadId });
}

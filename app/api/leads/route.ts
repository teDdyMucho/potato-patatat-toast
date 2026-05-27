import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cap = (s: unknown, n: number) => (typeof s === "string" ? s.trim().slice(0, n) : "");

/**
 * POST /api/leads — PUBLIC. Persists a contact-form / "Book Call" submission to
 * `public.leads` (service-role). Validates required fields; everything else is
 * optional and length-capped.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

  const name = cap(body.name, 200);
  const email = cap(body.email, 200);
  const message = cap(body.message, 5000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  try {
    const admin = createSupabaseAdminClient();
    const { error } = await admin.from("leads").insert({
      name,
      email,
      message,
      company: cap(body.company, 200) || null,
      phone: cap(body.phone, 60) || null,
      need: cap(body.need, 120) || null,
      contact_time: cap(body.contactTime, 200) || null,
    });
    if (error) {
      console.error("lead insert error:", error.message);
      return NextResponse.json({ error: "Couldn't save your message." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("lead submit error (is SUPABASE_SERVICE_ROLE_KEY set?):", err);
    return NextResponse.json({ error: "Couldn't save your message." }, { status: 500 });
  }
}

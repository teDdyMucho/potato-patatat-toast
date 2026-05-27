import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { LEAD_COLUMNS, rowToLead, type LeadRow } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/admin/leads — all leads, newest first. Admin-only. */
export async function GET() {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("leads")
    .select(LEAD_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leads: (data as LeadRow[]).map(rowToLead) });
}

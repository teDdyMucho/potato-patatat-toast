import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { LEAD_COLUMNS, rowToLead, type LeadRow } from "@/lib/leads";
import type { LeadStatus } from "@/lib/types/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES: LeadStatus[] = ["new", "contacted", "closed"];

/** PATCH /api/admin/leads/:id — update status and/or notes. Admin-only. */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const body = (await request.json().catch(() => ({}))) as {
    status?: LeadStatus;
    notes?: string;
  };

  const patch: Record<string, unknown> = {};
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    patch.status = body.status;
  }
  if (body.notes !== undefined) patch.notes = String(body.notes).slice(0, 5000);

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("leads")
    .update(patch)
    .eq("id", id)
    .select(LEAD_COLUMNS)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ lead: rowToLead(data as LeadRow) });
}

/** DELETE /api/admin/leads/:id — remove a lead. Admin-only. */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("leads").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

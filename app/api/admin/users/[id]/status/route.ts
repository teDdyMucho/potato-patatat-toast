import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { AdminStatus } from "@/lib/types/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Long ban window used to represent "suspended" in Supabase Auth (~100 years).
const BAN_DURATION = "876000h";

/**
 * POST /api/admin/users/:id/status  body: { status: "active" | "suspended" }
 * Suspends or reactivates a user. Updates `profiles.status` AND bans/unbans the
 * account in Supabase Auth so a suspended user actually can't log in.
 * Admin-only. You cannot suspend yourself.
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const { status } = (await request.json().catch(() => ({}))) as { status?: AdminStatus };
  if (status !== "active" && status !== "suspended") {
    return NextResponse.json(
      { error: "status must be 'active' or 'suspended'" },
      { status: 400 },
    );
  }

  if (params.id === guard.userId && status === "suspended") {
    return NextResponse.json({ error: "You can't suspend yourself." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  // 1) Reflect it in profiles (drives the admin UI + the layout guard).
  const { error: profileErr } = await admin
    .from("users")
    .update({ status })
    .eq("id", params.id);
  if (profileErr) {
    return NextResponse.json({ error: profileErr.message }, { status: 500 });
  }

  // 2) Enforce it at the auth layer (block / restore login).
  const { error: authErr } = await admin.auth.admin.updateUserById(params.id, {
    ban_duration: status === "suspended" ? BAN_DURATION : "none",
  });
  if (authErr) {
    return NextResponse.json({ error: authErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { AdminRole } from "@/lib/types/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/admin/users/:id/role  body: { role: "user" | "admin" }
 * Promote or demote a user. Admin-only. You cannot demote yourself (prevents
 * locking the last admin out).
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const { role } = (await request.json().catch(() => ({}))) as { role?: AdminRole };
  if (role !== "user" && role !== "admin") {
    return NextResponse.json({ error: "role must be 'user' or 'admin'" }, { status: 400 });
  }

  if (id === guard.userId && role !== "admin") {
    return NextResponse.json(
      { error: "You can't remove your own admin access." },
      { status: 400 },
    );
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("users")
    .update({ role })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { AdminRole, AdminStatus, AdminUser } from "@/lib/types/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/users — list every registered user with role + status.
 * Service-role (auth.admin.listUsers) for the auth data, merged with the
 * `profiles` table for role/status. Admin-only.
 */
export async function GET() {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const admin = createSupabaseAdminClient();

  // Auth users (paginated; pull up to 1000 — fine until we add real pagination).
  const { data: list, error: listErr } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (listErr) {
    return NextResponse.json({ error: listErr.message }, { status: 500 });
  }

  // Role/status from profiles, keyed by user id.
  const { data: profiles } = await admin
    .from("users")
    .select("id, role, status");
  const byId = new Map(
    (profiles ?? []).map((p) => [p.id as string, p as { role: AdminRole; status: AdminStatus }]),
  );

  const users: AdminUser[] = list.users.map((u) => {
    const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
    const profile = byId.get(u.id);
    return {
      id: u.id,
      email: u.email ?? "",
      name:
        (meta.full_name as string) ||
        (meta.name as string) ||
        (u.email ? u.email.split("@")[0] : "—"),
      role: profile?.role ?? "user",
      status: profile?.status ?? "active",
      provider: u.app_metadata?.provider ?? "email",
      createdAt: u.created_at,
      lastSignInAt: u.last_sign_in_at ?? null,
    };
  });

  // Newest first.
  users.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return NextResponse.json({ users });
}

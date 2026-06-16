import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Server-side admin gate. Reads the session from request cookies, then looks up
 * the user's role in `public.profiles` (the user can read their own row via
 * RLS — no service key needed here).
 *
 * Used by `app/admin/layout.tsx` (to render/redirect) and by every
 * `app/api/admin/*` route (defense in depth — never trust the client).
 */
export type AdminCheck =
  | { status: "ok"; userId: string; email: string }
  | { status: "unauthenticated" }
  | { status: "forbidden"; email: string };

export async function checkAdmin(): Promise<AdminCheck> {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { status: "unauthenticated" };

  const { data: profile } = await supabase
    .from("users")
    .select("role, status")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin" || profile?.status === "suspended") {
    return { status: "forbidden", email: user.email ?? "" };
  }

  return { status: "ok", userId: user.id, email: user.email ?? "" };
}

/**
 * Guard for `app/api/admin/*` route handlers. On success returns the admin's
 * own user id; on failure returns a ready-to-send 401/403 JSON response.
 *
 *   const guard = await requireAdminApi();
 *   if (!guard.ok) return guard.response;
 *   // ...use guard.userId
 */
export async function requireAdminApi(): Promise<
  { ok: true; userId: string } | { ok: false; response: NextResponse }
> {
  const check = await checkAdmin();
  if (check.status === "ok") return { ok: true, userId: check.userId };
  const code = check.status === "unauthenticated" ? 401 : 403;
  return {
    ok: false,
    response: NextResponse.json({ error: check.status }, { status: code }),
  };
}

/**
 * Server-side staff gate. Allows both 'staff' and 'admin' roles through.
 */
export async function checkStaff(): Promise<AdminCheck> {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { status: "unauthenticated" };

  const { data: profile } = await supabase
    .from("users")
    .select("role, status")
    .eq("id", user.id)
    .single();

  if (!["admin", "staff"].includes(profile?.role ?? "") || profile?.status === "suspended") {
    return { status: "forbidden", email: user.email ?? "" };
  }

  return { status: "ok", userId: user.id, email: user.email ?? "" };
}

export async function requireStaffApi(): Promise<
  { ok: true; userId: string } | { ok: false; response: NextResponse }
> {
  const check = await checkStaff();
  if (check.status === "ok") return { ok: true, userId: check.userId };
  const code = check.status === "unauthenticated" ? 401 : 403;
  return {
    ok: false,
    response: NextResponse.json({ error: check.status }, { status: code }),
  };
}

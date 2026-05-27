import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Record one tool run in `public.tool_usage`. Call from a tool's API route
 * after the run succeeds.
 *
 * Fail-safe by design: resolves the current user from request cookies (may be
 * anonymous) and inserts via the service-role client. ANY error — missing
 * service key, missing table, network — is swallowed and logged, so usage
 * tracking can never break the actual tool. `await` it before responding so the
 * insert isn't cut off in a serverless environment.
 */
export async function logToolUsage(tool: string): Promise<void> {
  try {
    let userId: string | null = null;
    let userEmail: string | null = null;
    try {
      const supabase = createSupabaseServerClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      userId = user?.id ?? null;
      userEmail = user?.email ?? null;
    } catch {
      // No session / cookies unavailable — log as anonymous.
    }

    const admin = createSupabaseAdminClient();
    await admin.from("tool_usage").insert({ tool, user_id: userId, user_email: userEmail });
  } catch (err) {
    console.error("logToolUsage failed (non-fatal):", err);
  }
}

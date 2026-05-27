import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — SERVER ONLY.
 *
 * Bypasses Row Level Security, so it can list every user and write `role` /
 * `status` on `public.profiles`. NEVER import this module into a client
 * component or any file that runs in the browser — it reads the service-role
 * secret. Use it only from `app/api/admin/*` route handlers and server
 * components.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY (Dashboard → Project Settings → API →
 * service_role secret). Never expose this key to the browser.
 */
export function createSupabaseAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase admin client not configured: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

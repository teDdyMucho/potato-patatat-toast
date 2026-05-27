import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client (anon key) bound to the request's cookies.
 * Used by the OAuth callback route to exchange the auth code and persist the
 * session cookie.
 */
export function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (toSet) => {
          try {
            toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Can throw when called from a context where cookies are read-only;
            // safe to ignore — the middleware/route response handles persistence.
          }
        },
      },
    },
  );
}

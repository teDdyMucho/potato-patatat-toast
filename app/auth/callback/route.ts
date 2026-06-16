import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * OAuth callback for "Continue with Google".
 * Supabase redirects here with a `code`; we exchange it for a session (stored
 * in cookies) and send the user on to their destination.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next") || "/ai-tools";
  const next =
    nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/ai-tools";

  if (code) {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();
        if (profile?.role === "admin") {
          return NextResponse.redirect(`${origin}/admin`);
        }
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("oauth exchange error:", error);
  }

  return NextResponse.redirect(`${origin}/login?error=oauth`);
}

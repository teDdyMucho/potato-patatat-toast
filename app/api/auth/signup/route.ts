import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { name, email, password, accountType, businessName, websiteUrl, businessCategory } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  const { data, error } = await admin.auth.admin.createUser({
    email: email.trim().toLowerCase(),
    password,
    email_confirm: true, // skip verification email
    user_metadata: {
      full_name: name.trim(),
      account_type: accountType ?? "individual",
      ...(accountType === "business" && {
        business_name: businessName?.trim() || null,
        website_url: websiteUrl?.trim() || null,
        business_category: businessCategory?.trim() || null,
      }),
    },
  });

  if (error) {
    const isDuplicate =
      error.message.toLowerCase().includes("already registered") ||
      error.message.toLowerCase().includes("already been registered") ||
      (error as { status?: number }).status === 422;
    return NextResponse.json(
      { error: isDuplicate ? "An account with that email already exists." : error.message },
      { status: isDuplicate ? 409 : 500 },
    );
  }

  return NextResponse.json({ userId: data.user.id });
}

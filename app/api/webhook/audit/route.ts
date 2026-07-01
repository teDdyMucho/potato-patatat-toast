import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Accept single object or array
  const records = Array.isArray(body) ? body : [body];

  const admin = createSupabaseAdminClient();
  const saved = [];

  for (const record of records) {
    const {
      website_url, business_name, industry, business_category,
      business_description, services_offered, location, service_area,
      phone, email, contact_page_url, social_links, owner_research,
      google_business_profile, search_visibility, lead_qualification,
      sources,
    } = record;

    // Match to a user by website_url stored in user_metadata
    const { data: usersData } = await admin.auth.admin.listUsers({ perPage: 1000 });
    const matchedUser = usersData?.users.find(
      (u) => u.user_metadata?.website_url?.toLowerCase() === website_url?.toLowerCase(),
    );

    const { data, error } = await admin
      .from("business_audits")
      .upsert(
        {
          user_id: matchedUser?.id ?? null,
          website_url,
          business_name,
          industry,
          business_category,
          business_description,
          services_offered: Array.isArray(services_offered) ? services_offered : [],
          location,
          service_area,
          phone,
          email,
          contact_page_url,
          social_links: social_links ?? {},
          owner_research: owner_research ?? {},
          google_business_profile: google_business_profile ?? {},
          search_visibility: search_visibility ?? {},
          lead_qualification: lead_qualification ?? {},
          sources: Array.isArray(sources) ? sources : [],
        },
        { onConflict: "website_url" },
      )
      .select()
      .single();

    if (!error) saved.push(data);
    else console.error("audit upsert error:", error.message);
  }

  return NextResponse.json({ saved: saved.length });
}

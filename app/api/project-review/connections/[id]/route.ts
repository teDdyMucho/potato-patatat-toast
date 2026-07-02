import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { label, role } = await req.json();

  if (!label?.trim() || !["worker", "client"].includes(role)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  const { data: conn } = await admin
    .from("project_review_connections")
    .select("id, worker_id, client_email")
    .eq("id", id)
    .single();

  if (!conn) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const isWorker = conn.worker_id === user.id;
  const isClient = conn.client_email === user.email;

  if ((role === "worker" && !isWorker) || (role === "client" && !isClient)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const field = role === "worker" ? "worker_label" : "client_label";

  const { data, error } = await admin
    .from("project_review_connections")
    .update({ [field]: label.trim() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  return NextResponse.json({ connection: data });
}

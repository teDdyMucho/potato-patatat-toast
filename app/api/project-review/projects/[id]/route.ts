import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function DELETE(
  _req: NextRequest,
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

  const admin = createSupabaseAdminClient();

  // Verify the caller is the worker who owns this project
  const { data: project, error: pError } = await admin
    .from("project_review_projects")
    .select("id, worker_id, file_url")
    .eq("id", id)
    .single();

  if (pError || !project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (project.worker_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Delete storage files
  if (project.file_url) {
    try {
      const files = JSON.parse(project.file_url) as Array<{ url: string }>;
      const supabaseBase = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
      const storagePrefix = `${supabaseBase}/storage/v1/object/public/project-files/`;
      const paths = files
        .map((f) => f.url.replace(storagePrefix, ""))
        .filter((p) => p && !p.startsWith("http"));
      if (paths.length > 0) {
        await admin.storage.from("project-files").remove(paths);
      }
    } catch {
      // Continue even if storage cleanup fails
    }
  }

  const { error } = await admin
    .from("project_review_projects")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

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

  const { status, feedback } = await req.json();

  if (!["approved", "declined"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  // Verify this project belongs to a connection where the caller is the client
  const { data: project, error: pError } = await admin
    .from("project_review_projects")
    .select("id, connection_id")
    .eq("id", id)
    .single();

  if (pError || !project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const { data: conn, error: cError } = await admin
    .from("project_review_connections")
    .select("client_email")
    .eq("id", project.connection_id)
    .single();

  if (cError || !conn || conn.client_email !== user.email) {
    return NextResponse.json(
      { error: "Not authorized to review this project" },
      { status: 403 },
    );
  }

  const { data, error } = await admin
    .from("project_review_projects")
    .update({
      status,
      client_feedback: feedback?.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Update project error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }

  return NextResponse.json({ project: data });
}

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const connectionId = req.nextUrl.searchParams.get("connectionId");
  if (!connectionId) return NextResponse.json({ error: "connectionId required" }, { status: 400 });

  const admin = createSupabaseAdminClient();

  // Verify caller is a participant of this connection
  const { data: conn } = await admin
    .from("project_review_connections")
    .select("worker_id, client_id")
    .eq("id", connectionId)
    .single();

  if (!conn || (conn.worker_id !== user.id && conn.client_id !== user.id)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Get all project IDs for this connection
  const { data: projects } = await admin
    .from("project_review_projects")
    .select("id")
    .eq("connection_id", connectionId);

  const projectIds = (projects ?? []).map((p: { id: string }) => p.id);
  if (projectIds.length === 0) return NextResponse.json({ replies: [] });

  const { data: replies } = await admin
    .from("project_feedback_replies")
    .select("*")
    .in("project_id", projectIds)
    .order("created_at", { ascending: true });

  return NextResponse.json({ replies: replies ?? [] });
}

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { projectId, message, senderRole } = body as {
    projectId?: string;
    message?: string;
    senderRole?: string;
  };

  if (!projectId || !message?.trim() || !["worker", "client"].includes(senderRole ?? "")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  // Verify project exists and get its connection
  const { data: project } = await admin
    .from("project_review_projects")
    .select("connection_id")
    .eq("id", projectId)
    .single();

  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  const { data: conn } = await admin
    .from("project_review_connections")
    .select("worker_id, client_id")
    .eq("id", project.connection_id)
    .single();

  if (!conn) return NextResponse.json({ error: "Connection not found" }, { status: 404 });

  const isWorker = conn.worker_id === user.id;
  const isClient = conn.client_id === user.id;

  if (!isWorker && !isClient) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (senderRole === "worker" && !isWorker) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (senderRole === "client" && !isClient) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { data: reply, error } = await admin
    .from("project_feedback_replies")
    .insert({
      project_id: projectId,
      user_id: user.id,
      user_email: user.email!,
      sender_role: senderRole,
      message: message.trim(),
    })
    .select()
    .single();

  if (error) {
    console.error("Insert reply error:", error);
    return NextResponse.json({ error: "Failed to post reply" }, { status: 500 });
  }

  return NextResponse.json({ reply });
}

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  // Verify the caller is authenticated
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use the admin client to bypass RLS — we do our own auth checks above
  const admin = createSupabaseAdminClient();

  // Get the caller's role so we know whether to include the staff-wide queue
  const { data: callerProfile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  const callerRole = (callerProfile?.role as string) ?? "user";

  const [workerRes, clientRes] = await Promise.all([
    admin
      .from("project_review_connections")
      .select("*")
      .eq("worker_id", user.id)
      .order("created_at", { ascending: false }),
    admin
      .from("project_review_connections")
      .select("*")
      .eq("client_email", user.email)
      .order("created_at", { ascending: false }),
  ]);

  const workerConns = workerRes.data ?? [];
  const clientConns = clientRes.data ?? [];

  // For regular users: also fetch ALL connections from staff/admin workers so
  // they can see every staff member's submissions in the review queue.
  let staffConns: unknown[] = [];
  if (!["staff", "admin"].includes(callerRole)) {
    const { data: staffProfiles } = await admin
      .from("profiles")
      .select("id")
      .in("role", ["staff", "admin"]);
    const staffIds = (staffProfiles ?? []).map((p: { id: string }) => p.id);
    if (staffIds.length > 0) {
      const { data: staffConnData } = await admin
        .from("project_review_connections")
        .select("*")
        .in("worker_id", staffIds)
        .order("created_at", { ascending: false });
      staffConns = staffConnData ?? [];
    }
  }

  // Gather all connection IDs so we can fetch their projects in one query
  const seenIds = new Set<string>();
  const allIds: string[] = [];
  for (const conns of [workerConns, clientConns, staffConns]) {
    for (const c of conns as { id: string }[]) {
      if (!seenIds.has(c.id)) { seenIds.add(c.id); allIds.push(c.id); }
    }
  }

  const projectsByConn: Record<string, unknown[]> = {};

  if (allIds.length > 0) {
    const { data: projects } = await admin
      .from("project_review_projects")
      .select("*")
      .in("connection_id", allIds)
      .order("created_at", { ascending: false });

    for (const p of projects ?? []) {
      const row = p as { connection_id: string };
      if (!projectsByConn[row.connection_id]) {
        projectsByConn[row.connection_id] = [];
      }
      projectsByConn[row.connection_id].push(p);
    }
  }

  const attachProjects = (conns: unknown[]) =>
    conns.map((c) => {
      const conn = c as { id: string };
      return { ...conn, projects: projectsByConn[conn.id] ?? [] };
    });

  return NextResponse.json({
    workerConnections: attachProjects(workerConns),
    clientConnections: attachProjects(clientConns),
    staffConnections: attachProjects(staffConns),
  });
}

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { clientEmail } = await req.json();

  if (!clientEmail || !String(clientEmail).includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const normalised = String(clientEmail).toLowerCase().trim();

  if (normalised === user.email?.toLowerCase()) {
    return NextResponse.json({ error: "You cannot connect with yourself" }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  // Verify the client email belongs to an existing account
  const { data: usersData } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const clientUser = usersData?.users.find(
    (u) => u.email?.toLowerCase() === normalised,
  );

  if (!clientUser) {
    return NextResponse.json(
      { error: "No account found with that email address" },
      { status: 404 },
    );
  }

  const { data, error } = await admin
    .from("project_review_connections")
    .insert({
      worker_id: user.id,
      worker_email: user.email,
      client_email: normalised,
      client_id: clientUser.id,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Already connected with this client" },
        { status: 409 },
      );
    }
    console.error("Insert connection error:", error);
    return NextResponse.json({ error: "Failed to create connection" }, { status: 500 });
  }

  return NextResponse.json({ connection: { ...data, projects: [] } });
}

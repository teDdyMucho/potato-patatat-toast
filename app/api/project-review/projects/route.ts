import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const connectionId = formData.get("connectionId") as string;
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || null;
  const fileCount = parseInt((formData.get("fileCount") as string) || "0", 10);

  if (!connectionId || !title?.trim()) {
    return NextResponse.json(
      { error: "Connection ID and title are required" },
      { status: 400 },
    );
  }

  const admin = createSupabaseAdminClient();

  // Verify the connection belongs to this worker
  const { data: connection, error: connError } = await admin
    .from("project_review_connections")
    .select("id")
    .eq("id", connectionId)
    .eq("worker_id", user.id)
    .single();

  if (connError || !connection) {
    return NextResponse.json({ error: "Connection not found" }, { status: 404 });
  }

  // Upload each file and collect results
  const uploadedFiles: Array<{ url: string; name: string; type: string }> = [];

  for (let i = 0; i < fileCount; i++) {
    const file = formData.get(`file_${i}`) as File | null;
    if (!file || file.size === 0) continue;

    const ext = file.name.split(".").pop() ?? "bin";
    const filePath = `${user.id}/${connectionId}/${Date.now()}_${i}.${ext}`;
    const buffer = await file.arrayBuffer();

    const { error: uploadError } = await admin.storage
      .from("project-files")
      .upload(filePath, buffer, { contentType: file.type, upsert: false });

    if (!uploadError) {
      const { data: urlData } = admin.storage
        .from("project-files")
        .getPublicUrl(filePath);
      uploadedFiles.push({ url: urlData.publicUrl, name: file.name, type: file.type });
    } else {
      console.error(`File ${i} upload failed:`, uploadError.message);
    }
  }

  // Store files as a JSON array in file_url; keep file_name as comma-joined names for quick display
  const { data, error } = await admin
    .from("project_review_projects")
    .insert({
      connection_id: connectionId,
      worker_id: user.id,
      title: title.trim(),
      description: description?.trim() || null,
      file_url: uploadedFiles.length > 0 ? JSON.stringify(uploadedFiles) : null,
      file_name: uploadedFiles.map((f) => f.name).join(", ") || null,
      file_type: uploadedFiles.map((f) => f.type).join(", ") || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Insert project error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }

  return NextResponse.json({ project: data });
}

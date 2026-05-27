import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "blog-images";
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

/**
 * POST /api/admin/blog/upload  (multipart/form-data, field "file")
 * Uploads a cover image to the public `blog-images` Storage bucket and returns
 * its public URL. Admin-only.
 */
export async function POST(request: Request) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart/form-data." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Unsupported type. Use JPG, PNG, WebP, GIF, or AVIF." },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image is too large (max 5 MB)." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  // Make sure the bucket exists (no-op if SQL already created it).
  try {
    await admin.storage.createBucket(BUCKET, { public: true });
  } catch {
    // already exists — ignore
  }

  const ext = EXT[file.type] ?? "bin";
  const path = `covers/${crypto.randomUUID()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error: upErr } = await admin.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: false });
  if (upErr) {
    return NextResponse.json({ error: upErr.message }, { status: 500 });
  }

  const { data } = admin.storage.from(BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}

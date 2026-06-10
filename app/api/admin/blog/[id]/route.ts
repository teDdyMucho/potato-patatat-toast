import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { BLOG_COLUMNS, rowToPost, slugify, type BlogRow } from "@/lib/blog";
import type { BlogPostInput } from "@/lib/types/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** PATCH /api/admin/blog/:id — update a post. Admin-only. */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const body = (await request.json().catch(() => ({}))) as Partial<BlogPostInput>;

  const patch: Record<string, unknown> = {};
  if (body.title !== undefined) patch.title = body.title.trim();
  if (body.slug !== undefined) patch.slug = slugify(body.slug);
  if (body.excerpt !== undefined) patch.excerpt = body.excerpt.trim();
  if (body.content !== undefined) patch.content = body.content;
  if (body.category !== undefined) patch.category = body.category.trim();
  if (body.tags !== undefined) patch.tags = body.tags;
  if (body.readTime !== undefined) patch.read_time = body.readTime.trim();
  if (body.imageUrl !== undefined) patch.image_url = body.imageUrl?.trim() || null;
  if (body.url !== undefined) patch.url = body.url?.trim() || null;
  if (body.featured !== undefined) patch.featured = body.featured;
  if (body.published !== undefined) patch.published = body.published;
  if (body.publishedAt !== undefined) patch.published_at = body.publishedAt;

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("blog_posts")
    .update(patch)
    .eq("id", params.id)
    .select(BLOG_COLUMNS)
    .single();

  if (error) {
    const msg = error.code === "23505" ? "A post with that slug already exists." : error.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  return NextResponse.json({ post: rowToPost(data as BlogRow) });
}

/** DELETE /api/admin/blog/:id — remove a post. Admin-only. */
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("blog_posts").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

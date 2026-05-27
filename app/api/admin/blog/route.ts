import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { BLOG_COLUMNS, rowToPost, slugify, type BlogRow } from "@/lib/blog";
import type { BlogPostInput } from "@/lib/types/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/admin/blog — every post (incl. drafts). Admin-only. */
export async function GET() {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("blog_posts")
    .select(BLOG_COLUMNS)
    .order("published_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: (data as BlogRow[]).map(rowToPost) });
}

/** POST /api/admin/blog — create a post. Admin-only. */
export async function POST(request: Request) {
  const guard = await requireAdminApi();
  if (!guard.ok) return guard.response;

  const body = (await request.json().catch(() => ({}))) as Partial<BlogPostInput>;
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const slug = (body.slug?.trim() ? slugify(body.slug) : slugify(body.title)) || `post-${Date.now()}`;

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("blog_posts")
    .insert({
      slug,
      title: body.title.trim(),
      excerpt: body.excerpt?.trim() ?? "",
      content: body.content ?? "",
      category: body.category?.trim() ?? "",
      tags: body.tags ?? [],
      read_time: body.readTime?.trim() ?? "",
      image_url: body.imageUrl?.trim() || null,
      featured: !!body.featured,
      published: body.published ?? true,
      published_at: body.publishedAt || new Date().toISOString(),
    })
    .select(BLOG_COLUMNS)
    .single();

  if (error) {
    const msg = error.code === "23505" ? "A post with that slug already exists." : error.message;
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  return NextResponse.json({ post: rowToPost(data as BlogRow) });
}

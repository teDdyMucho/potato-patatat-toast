import type { BlogPost } from "@/lib/types/admin";

/** Raw shape of a public.blog_posts row. */
export type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[] | null;
  read_time: string;
  image_url: string | null;
  url: string | null;
  featured: boolean;
  published: boolean;
  published_at: string;
  updated_at: string;
};

export const BLOG_COLUMNS =
  "id, slug, title, excerpt, content, category, tags, read_time, image_url, url, featured, published, published_at, updated_at";

export function rowToPost(r: BlogRow): BlogPost {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content ?? "",
    category: r.category,
    tags: r.tags ?? [],
    readTime: r.read_time,
    imageUrl: r.image_url ?? null,
    url: r.url ?? null,
    featured: r.featured,
    published: r.published,
    publishedAt: r.published_at,
    updatedAt: r.updated_at,
  };
}

/** "My Post Title!" → "my-post-title" */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

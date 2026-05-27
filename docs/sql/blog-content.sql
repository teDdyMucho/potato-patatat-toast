-- ============================================================================
-- Blog article body: add a `content` column.
-- Run once in the Supabase SQL editor (after blog-posts.sql). Idempotent.
-- Holds the full post body shown on /blog/<slug>. See docs/ADMIN_PAGE.md.
-- ============================================================================

alter table public.blog_posts
  add column if not exists content text not null default '';

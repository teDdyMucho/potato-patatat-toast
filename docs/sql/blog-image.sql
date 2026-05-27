-- ============================================================================
-- Blog cover images: add image_url column + a public Storage bucket.
-- Run once in the Supabase SQL editor (after blog-posts.sql). Idempotent.
-- See docs/ADMIN_PAGE.md.
-- ============================================================================

-- 1. Cover image URL on each post.
alter table public.blog_posts
  add column if not exists image_url text;

-- 2. Public storage bucket for uploaded cover images.
--    public = true  → anyone can read the files via the public URL.
--    Writes happen only via the service-role key on the server (upload route),
--    which bypasses Storage RLS, so no extra object policies are needed.
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

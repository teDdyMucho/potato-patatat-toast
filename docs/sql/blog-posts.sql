-- ============================================================================
-- Content management: blog_posts table
-- Run once in the Supabase SQL editor. Idempotent.
--
-- Backs the admin Blog manager (/admin/content/blog) and the public /blog page.
-- Published posts are world-readable (anon key) so the public page can render
-- them; all writes go through the service-role key on the server. Drafts
-- (published = false) are never exposed to the public.
-- See docs/ADMIN_PAGE.md.
-- ============================================================================

create table if not exists public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  excerpt      text not null default '',
  content      text not null default '',
  category     text not null default '',
  tags         text[] not null default '{}',
  read_time    text not null default '',
  image_url    text,
  featured     boolean not null default false,
  published    boolean not null default true,
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists blog_posts_published_idx on public.blog_posts (published, published_at desc);

-- keep updated_at fresh on every write
create or replace function public.touch_blog_posts_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.touch_blog_posts_updated_at();

-- RLS: anyone may read PUBLISHED posts; writes are service-role only.
alter table public.blog_posts enable row level security;

drop policy if exists "blog_posts_select_published" on public.blog_posts;
create policy "blog_posts_select_published"
  on public.blog_posts for select
  using (published = true);

-- Seed the current static posts (no-op if they already exist).
insert into public.blog_posts (slug, title, excerpt, category, tags, read_time, featured, published_at)
values
  ('gohighlevel-real-estate-automation',
   'How We Set Up GoHighLevel Automation for a 7-Figure Real Estate Firm',
   'A step-by-step breakdown of how AKT deployed GoHighLevel CRM + AI follow-up sequences that cut client response time by 80% — and the exact workflow structure we used.',
   'AI & Automation', array['GoHighLevel','Automation'], '8 min read', true, '2026-05-18'),
  ('vapi-vs-retell-ai',
   'VAPI vs Retell AI: Which AI Voice Agent Is Right for Your Business in 2026?',
   'We''ve deployed both at scale. Here''s our unfiltered comparison based on real client deployments — pricing, call quality, integration capabilities, and who each one is best suited for.',
   'AI & Automation', array['VAPI','Retell AI'], '11 min read', false, '2026-05-12'),
  ('filipino-va-hiring-process',
   'Why Filipino VAs Outperform: The AKT Hiring & Training Process',
   'Inside AKT''s proprietary VA onboarding system — how we select, assess, and deploy elite Filipino talent for global businesses, and why the Philippines remains the world''s best VA source.',
   'VA Industry', array['Filipino VAs','Operations'], '7 min read', false, '2026-05-05'),
  ('closebot-ai-guide',
   'What Is CloseBot AI? A Complete Guide to AI-Powered Sales Automation',
   'CloseBot is transforming how SMBs handle sales conversations. Here''s everything you need to know — what it does, how to set it up, and why AKT uses it for client lead pipelines.',
   'AI & Automation', array['CloseBot','Sales AI'], '9 min read', false, '2026-04-28'),
  ('gohighlevel-virtual-assistant-setup',
   'How to Set Up GoHighLevel with a Virtual Assistant: The Complete Guide',
   'One of the most-asked questions we get: can a VA manage GoHighLevel? Yes — here''s how to set up GHL, train your VA, and build a system that runs without you.',
   'Business Growth', array['GoHighLevel','Filipino VAs'], '6 min read', false, '2026-04-21'),
  ('claude-ai-for-business',
   'Claude AI for Business: How to Use Anthropic''s Claude in Your Operations',
   'Claude AI is the most capable business AI model available today. Here''s how AKT uses Claude to build automation workflows, content systems, and AI agents for SMB clients worldwide.',
   'AI & Automation', array['Claude AI','Anthropic'], '10 min read', false, '2026-04-14')
on conflict (slug) do nothing;

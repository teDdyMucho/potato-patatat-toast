-- ============================================================================
-- Contact / leads: leads table
-- Run once in the Supabase SQL editor. Idempotent.
--
-- Stores contact-form / "Book Call" submissions. The public form submits via
-- the server route POST /api/leads (service-role), and the admin inbox at
-- /admin/leads reads/updates them. See docs/ADMIN_PAGE.md.
-- ============================================================================

create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  company      text,
  email        text not null,
  phone        text,
  need         text,
  message      text not null default '',
  contact_time text,
  status       text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  notes        text not null default '',
  created_at   timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);

-- RLS on with NO policies: all access goes through the service-role key on the
-- server (the submit route + the admin inbox), which bypasses RLS. The browser
-- can never read or write leads directly.
alter table public.leads enable row level security;

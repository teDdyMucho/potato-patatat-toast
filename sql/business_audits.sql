-- Business audits table (stores scraper output per business)
create table if not exists public.business_audits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  website_url text unique not null,
  business_name text,
  industry text,
  business_category text,
  business_description text,
  services_offered text[] default '{}',
  location text,
  service_area text,
  phone text,
  email text,
  contact_page_url text,
  social_links jsonb default '{}',
  owner_research jsonb default '{}',
  google_business_profile jsonb default '{}',
  search_visibility jsonb default '{}',
  lead_qualification jsonb default '{}',
  sources text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for user lookup
create index if not exists business_audits_user_id_idx on public.business_audits(user_id);
create index if not exists business_audits_website_url_idx on public.business_audits(website_url);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists business_audits_updated_at on public.business_audits;
create trigger business_audits_updated_at
  before update on public.business_audits
  for each row execute function public.set_updated_at();

-- RLS: users can only read their own audit
alter table public.business_audits enable row level security;

create policy "users read own audit"
  on public.business_audits for select
  using (auth.uid() = user_id);

-- Webhook API route uses service role key (bypasses RLS) for inserts/upserts

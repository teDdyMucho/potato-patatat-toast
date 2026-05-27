-- ============================================================================
-- Admin / roles: profiles table
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
-- Safe to re-run: every statement is idempotent.
--
-- Backs the admin dashboard's access gating. Each auth.users row gets a
-- matching public.profiles row with a `role` ('user' by default, 'admin' for
-- staff). The admin area checks `role = 'admin'`.
-- See docs/ADMIN_PAGE.md  and docs/AUTH.md.
-- ============================================================================

-- 1. Table -------------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text,
  role       text not null default 'user' check (role in ('user', 'admin')),
  status     text not null default 'active' check (status in ('active', 'suspended')),
  created_at timestamptz not null default now()
);

-- 2. Row Level Security ------------------------------------------------------
alter table public.profiles enable row level security;

-- Users may read ONLY their own profile row (so the client can learn its role).
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

-- NOTE: no INSERT/UPDATE/DELETE policies for normal users on purpose.
-- Writes to `role`/`status` happen only via the service-role key on the server
-- (admin API routes), which bypasses RLS. This prevents users from promoting
-- themselves to admin.

-- 3. Auto-create a profile when a new auth user is created -------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4. Backfill profiles for users that already exist --------------------------
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

-- 5. Seed the first admin ----------------------------------------------------
-- Replace the email if needed, then run.
update public.profiles
set role = 'admin'
where email = 'gwapitos.2025@gmail.com';

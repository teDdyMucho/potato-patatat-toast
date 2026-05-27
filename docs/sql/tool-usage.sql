-- ============================================================================
-- AI tool usage logging: tool_usage table
-- Run once in the Supabase SQL editor. Idempotent.
--
-- One row per tool run, written server-side (service role) from the tool's API
-- route. Powers the admin "AI tool usage" dashboard (/admin/usage).
-- See docs/ADMIN_PAGE.md.
-- ============================================================================

create table if not exists public.tool_usage (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users (id) on delete set null,
  user_email text,
  tool       text not null,
  created_at timestamptz not null default now()
);

create index if not exists tool_usage_created_at_idx on public.tool_usage (created_at desc);
create index if not exists tool_usage_tool_idx        on public.tool_usage (tool);
create index if not exists tool_usage_user_idx        on public.tool_usage (user_id);

-- RLS on, with NO policies on purpose: reads/writes happen only via the
-- service-role key on the server (logging + the admin dashboard), which
-- bypasses RLS. The browser can never read or write this table directly.
alter table public.tool_usage enable row level security;

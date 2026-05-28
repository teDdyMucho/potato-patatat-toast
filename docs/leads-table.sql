-- ============================================================
-- AKT Virtual Assistance Services — Leads Table
-- Run this in: Supabase Dashboard → SQL Editor
--
-- Safe to run on an existing table — uses ALTER ... IF NOT EXISTS
-- so it adds only what's missing without destroying existing data.
-- ============================================================

-- 1. CREATE TABLE (if it doesn't exist yet)
CREATE TABLE IF NOT EXISTS public.leads (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text        NOT NULL,
  email        text        NOT NULL,
  message      text        NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- 2. ADD MISSING COLUMNS (safe on existing tables)
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS user_id      uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS first_name   text,
  ADD COLUMN IF NOT EXISTS last_name    text,
  ADD COLUMN IF NOT EXISTS company      text,
  ADD COLUMN IF NOT EXISTS phone        text,
  ADD COLUMN IF NOT EXISTS need         text,
  ADD COLUMN IF NOT EXISTS contact_time text,
  ADD COLUMN IF NOT EXISTS status       text        NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS source       text        NOT NULL DEFAULT 'contact_form',
  ADD COLUMN IF NOT EXISTS updated_at   timestamptz NOT NULL DEFAULT now();

-- 3. ADD STATUS CONSTRAINT (only if not already added)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'leads_status_check' AND conrelid = 'public.leads'::regclass
  ) THEN
    ALTER TABLE public.leads
      ADD CONSTRAINT leads_status_check
      CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost'));
  END IF;
END $$;

-- 4. AUTO-UPDATE updated_at TRIGGER
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS leads_set_updated_at ON public.leads;
CREATE TRIGGER leads_set_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 5. INDEXES
CREATE INDEX IF NOT EXISTS leads_email_idx      ON public.leads (email);
CREATE INDEX IF NOT EXISTS leads_status_idx     ON public.leads (status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_user_id_idx    ON public.leads (user_id) WHERE user_id IS NOT NULL;

-- 6. ROW LEVEL SECURITY
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own leads" ON public.leads;
CREATE POLICY "Users can view their own leads"
  ON public.leads FOR SELECT
  USING (auth.uid() = user_id);

-- 7. SUPABASE FUNCTION — save_lead()
-- Drop the old overload that used p_name (different signature = different function)
DROP FUNCTION IF EXISTS public.save_lead(text,text,text,text,text,text,text,uuid,text);

CREATE OR REPLACE FUNCTION public.save_lead(
  p_first_name    text,
  p_last_name     text,
  p_email         text,
  p_message       text,
  p_company       text        DEFAULT NULL,
  p_phone         text        DEFAULT NULL,
  p_need          text        DEFAULT NULL,
  p_contact_time  text        DEFAULT NULL,
  p_user_id       uuid        DEFAULT NULL,
  p_source        text        DEFAULT 'contact_form'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_lead_id  uuid;
  v_fullname text;
BEGIN
  v_fullname := trim(coalesce(p_first_name, '') || ' ' || coalesce(p_last_name, ''));

  INSERT INTO public.leads (
    name, first_name, last_name,
    email, message, company, phone,
    need, contact_time, user_id, source
  ) VALUES (
    NULLIF(v_fullname, ''),
    NULLIF(trim(coalesce(p_first_name, '')), ''),
    NULLIF(trim(coalesce(p_last_name, '')), ''),
    p_email,
    p_message,
    NULLIF(trim(coalesce(p_company, '')), ''),
    NULLIF(trim(coalesce(p_phone, '')), ''),
    NULLIF(trim(coalesce(p_need, '')), ''),
    NULLIF(trim(coalesce(p_contact_time, '')), ''),
    p_user_id,
    p_source
  )
  RETURNING id INTO v_lead_id;

  RETURN v_lead_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.save_lead TO service_role;

-- ============================================================
-- DONE. Verify with:
--   SELECT id, first_name, last_name, email, need, status, created_at
--   FROM public.leads ORDER BY created_at DESC LIMIT 10;
-- ============================================================

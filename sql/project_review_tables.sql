-- ============================================================================
-- Project Review: connections + projects tables
-- Run this in the Supabase SQL editor BEFORE project_feedback_replies.sql
-- Safe to re-run: idempotent.
-- ============================================================================

-- 1. Connections ---------------------------------------------------------------
-- A "connection" links one worker (staff/admin) to one client (regular user).
CREATE TABLE IF NOT EXISTS public.project_review_connections (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  worker_email text,
  client_email text        NOT NULL,
  client_id    uuid        REFERENCES auth.users(id) ON DELETE SET NULL,
  worker_label text,
  client_label text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (worker_id, client_email)
);

CREATE INDEX IF NOT EXISTS idx_prc_worker_id    ON public.project_review_connections(worker_id);
CREATE INDEX IF NOT EXISTS idx_prc_client_email ON public.project_review_connections(client_email);

ALTER TABLE public.project_review_connections ENABLE ROW LEVEL SECURITY;

-- Workers and clients can read their own connections (API routes use service key, but kept for safety)
DROP POLICY IF EXISTS "connection participants can view" ON public.project_review_connections;
CREATE POLICY "connection participants can view"
  ON public.project_review_connections FOR SELECT
  USING (worker_id = auth.uid() OR client_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- 2. Projects ------------------------------------------------------------------
-- A project is a work submission from a worker to a client within a connection.
CREATE TABLE IF NOT EXISTS public.project_review_projects (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id   uuid        NOT NULL REFERENCES public.project_review_connections(id) ON DELETE CASCADE,
  worker_id       uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title           text        NOT NULL,
  description     text,
  -- JSON array of { url, name, type } objects (multiple file support)
  file_url        text,
  file_name       text,
  file_type       text,
  status          text        NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending', 'approved', 'declined')),
  client_feedback text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_prp_connection_id ON public.project_review_projects(connection_id);
CREATE INDEX IF NOT EXISTS idx_prp_worker_id     ON public.project_review_projects(worker_id);
CREATE INDEX IF NOT EXISTS idx_prp_status        ON public.project_review_projects(status);

ALTER TABLE public.project_review_projects ENABLE ROW LEVEL SECURITY;

-- Project participants can view projects in their connections
DROP POLICY IF EXISTS "project participants can view" ON public.project_review_projects;
CREATE POLICY "project participants can view"
  ON public.project_review_projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.project_review_connections prc
      WHERE prc.id = connection_id
        AND (prc.worker_id = auth.uid()
          OR prc.client_email = (SELECT email FROM auth.users WHERE id = auth.uid()))
    )
  );

-- 3. Storage bucket ------------------------------------------------------------
-- Run this separately if the bucket doesn't exist yet:
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('project-files', 'project-files', true)
-- ON CONFLICT (id) DO NOTHING;

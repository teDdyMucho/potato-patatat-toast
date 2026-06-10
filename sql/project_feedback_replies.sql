-- Run this in the Supabase SQL editor

CREATE TABLE public.project_feedback_replies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES public.project_review_projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  sender_role text NOT NULL CHECK (sender_role IN ('worker', 'client')),
  message text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_pfr_project_id ON public.project_feedback_replies(project_id);
CREATE INDEX idx_pfr_created_at ON public.project_feedback_replies(created_at);

ALTER TABLE public.project_feedback_replies ENABLE ROW LEVEL SECURITY;

-- Both worker and client of a project can read its replies
CREATE POLICY "project participants can view replies"
  ON public.project_feedback_replies
  FOR SELECT
  USING (
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1
      FROM public.project_review_projects prp
      JOIN public.project_review_connections prc ON prc.id = prp.connection_id
      WHERE prp.id = project_id
        AND (prc.worker_id = auth.uid() OR prc.client_id = auth.uid())
    )
  );

-- Users can only insert their own replies and only if they are a participant
CREATE POLICY "project participants can insert replies"
  ON public.project_feedback_replies
  FOR INSERT
  WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1
      FROM public.project_review_projects prp
      JOIN public.project_review_connections prc ON prc.id = prp.connection_id
      WHERE prp.id = project_id
        AND (prc.worker_id = auth.uid() OR prc.client_id = auth.uid())
    )
  );

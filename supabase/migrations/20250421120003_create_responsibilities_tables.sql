-- Responsibilities, subtasks, assignees

CREATE TABLE IF NOT EXISTS public.responsibilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES public.organisatie_groups (id) ON DELETE CASCADE,
  title text NOT NULL,
  description_md text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_responsibilities_group ON public.responsibilities (group_id);

CREATE TABLE IF NOT EXISTS public.responsibility_subtasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  responsibility_id uuid NOT NULL REFERENCES public.responsibilities (id) ON DELETE CASCADE,
  title text NOT NULL,
  body_md text,
  sort_order integer NOT NULL DEFAULT 0,
  done boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_responsibility_subtasks_parent ON public.responsibility_subtasks (responsibility_id);

CREATE TABLE IF NOT EXISTS public.responsibility_assignees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  responsibility_id uuid NOT NULL REFERENCES public.responsibilities (id) ON DELETE CASCADE,
  person_id uuid NOT NULL REFERENCES public.people (id) ON DELETE CASCADE,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT responsibility_assignees_unique UNIQUE (responsibility_id, person_id)
);

CREATE INDEX IF NOT EXISTS idx_responsibility_assignees_person ON public.responsibility_assignees (person_id);

DROP TRIGGER IF EXISTS responsibilities_set_updated_at ON public.responsibilities;
CREATE TRIGGER responsibilities_set_updated_at
  BEFORE UPDATE ON public.responsibilities
  FOR EACH ROW
  EXECUTE PROCEDURE public.set_updated_at();

DROP TRIGGER IF EXISTS responsibility_subtasks_set_updated_at ON public.responsibility_subtasks;
CREATE TRIGGER responsibility_subtasks_set_updated_at
  BEFORE UPDATE ON public.responsibility_subtasks
  FOR EACH ROW
  EXECUTE PROCEDURE public.set_updated_at();

ALTER TABLE public.responsibilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responsibility_subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responsibility_assignees ENABLE ROW LEVEL SECURITY;

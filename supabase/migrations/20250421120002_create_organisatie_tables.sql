-- Sections, groups, memberships

CREATE TABLE IF NOT EXISTS public.organisatie_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  heading text NOT NULL,
  preface text,
  sort_order integer NOT NULL DEFAULT 0,
  CONSTRAINT organisatie_sections_slug_key UNIQUE (slug)
);

CREATE TABLE IF NOT EXISTS public.organisatie_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES public.organisatie_sections (id) ON DELETE CASCADE,
  slug text NOT NULL,
  title text NOT NULL,
  description_md text NOT NULL DEFAULT '',
  icon_key text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT organisatie_groups_slug_key UNIQUE (slug)
);

CREATE INDEX IF NOT EXISTS idx_organisatie_groups_section ON public.organisatie_groups (section_id);

CREATE TABLE IF NOT EXISTS public.group_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES public.organisatie_groups (id) ON DELETE CASCADE,
  person_id uuid NOT NULL REFERENCES public.people (id) ON DELETE CASCADE,
  role_label text NOT NULL,
  note text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_group_memberships_group ON public.group_memberships (group_id);
CREATE INDEX IF NOT EXISTS idx_group_memberships_person ON public.group_memberships (person_id);

DROP TRIGGER IF EXISTS organisatie_groups_set_updated_at ON public.organisatie_groups;
CREATE TRIGGER organisatie_groups_set_updated_at
  BEFORE UPDATE ON public.organisatie_groups
  FOR EACH ROW
  EXECUTE PROCEDURE public.set_updated_at();

ALTER TABLE public.organisatie_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organisatie_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_memberships ENABLE ROW LEVEL SECURITY;

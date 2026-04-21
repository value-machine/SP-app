-- People: single source of truth for humans; optional link to auth.users
-- Idempotent: safe on fresh DB and re-run

CREATE TABLE IF NOT EXISTS public.people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text,
  phone text,
  photo_url text,
  notes text,
  user_id uuid UNIQUE REFERENCES auth.users (id) ON DELETE SET NULL,
  is_admin boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_people_user_id ON public.people (user_id)
WHERE user_id IS NOT NULL;

-- updated_at maintenance
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS people_set_updated_at ON public.people;
CREATE TRIGGER people_set_updated_at
  BEFORE UPDATE ON public.people
  FOR EACH ROW
  EXECUTE PROCEDURE public.set_updated_at();

-- Auto-create people row when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_name text;
BEGIN
  v_name := COALESCE(
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'name',
    split_part(NEW.email, '@', 1),
    'User'
  );
  INSERT INTO public.people (user_id, full_name, email)
  VALUES (NEW.id, v_name, NEW.email)
  ON CONFLICT (user_id) DO UPDATE
    SET email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.people.full_name),
        updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_people ON auth.users;
CREATE TRIGGER on_auth_user_created_people
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_auth_user();

-- Clear user_id when auth account is deleted
CREATE OR REPLACE FUNCTION public.handle_auth_user_deleted_people()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.people
  SET user_id = NULL,
      updated_at = now()
  WHERE user_id = OLD.id;
  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_deleted_people ON auth.users;
CREATE TRIGGER on_auth_user_deleted_people
  BEFORE DELETE ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_auth_user_deleted_people();

ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;

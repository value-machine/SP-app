-- RLS: public read; writes only for people where user_id = auth.uid() and is_admin
-- Uses (select auth.uid()) per project rules

ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;

-- People
DROP POLICY IF EXISTS "people_select_all" ON public.people;
CREATE POLICY "people_select_all" ON public.people FOR SELECT USING (true);

DROP POLICY IF EXISTS "people_insert_admin" ON public.people;
CREATE POLICY "people_insert_admin" ON public.people FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "people_update_admin" ON public.people;
CREATE POLICY "people_update_admin" ON public.people FOR UPDATE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
) WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "people_delete_admin" ON public.people;
CREATE POLICY "people_delete_admin" ON public.people FOR DELETE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

-- Organisatie sections
DROP POLICY IF EXISTS "organisatie_sections_select_all" ON public.organisatie_sections;
CREATE POLICY "organisatie_sections_select_all" ON public.organisatie_sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "organisatie_sections_insert_admin" ON public.organisatie_sections;
CREATE POLICY "organisatie_sections_insert_admin" ON public.organisatie_sections FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "organisatie_sections_update_admin" ON public.organisatie_sections;
CREATE POLICY "organisatie_sections_update_admin" ON public.organisatie_sections FOR UPDATE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
) WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "organisatie_sections_delete_admin" ON public.organisatie_sections;
CREATE POLICY "organisatie_sections_delete_admin" ON public.organisatie_sections FOR DELETE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

-- Organisatie groups
DROP POLICY IF EXISTS "organisatie_groups_select_all" ON public.organisatie_groups;
CREATE POLICY "organisatie_groups_select_all" ON public.organisatie_groups FOR SELECT USING (true);

DROP POLICY IF EXISTS "organisatie_groups_insert_admin" ON public.organisatie_groups;
CREATE POLICY "organisatie_groups_insert_admin" ON public.organisatie_groups FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "organisatie_groups_update_admin" ON public.organisatie_groups;
CREATE POLICY "organisatie_groups_update_admin" ON public.organisatie_groups FOR UPDATE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
) WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "organisatie_groups_delete_admin" ON public.organisatie_groups;
CREATE POLICY "organisatie_groups_delete_admin" ON public.organisatie_groups FOR DELETE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

-- Group memberships
DROP POLICY IF EXISTS "group_memberships_select_all" ON public.group_memberships;
CREATE POLICY "group_memberships_select_all" ON public.group_memberships FOR SELECT USING (true);

DROP POLICY IF EXISTS "group_memberships_insert_admin" ON public.group_memberships;
CREATE POLICY "group_memberships_insert_admin" ON public.group_memberships FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "group_memberships_update_admin" ON public.group_memberships;
CREATE POLICY "group_memberships_update_admin" ON public.group_memberships FOR UPDATE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
) WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "group_memberships_delete_admin" ON public.group_memberships;
CREATE POLICY "group_memberships_delete_admin" ON public.group_memberships FOR DELETE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

-- Responsibilities
DROP POLICY IF EXISTS "responsibilities_select_all" ON public.responsibilities;
CREATE POLICY "responsibilities_select_all" ON public.responsibilities FOR SELECT USING (true);

DROP POLICY IF EXISTS "responsibilities_insert_admin" ON public.responsibilities;
CREATE POLICY "responsibilities_insert_admin" ON public.responsibilities FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "responsibilities_update_admin" ON public.responsibilities;
CREATE POLICY "responsibilities_update_admin" ON public.responsibilities FOR UPDATE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
) WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "responsibilities_delete_admin" ON public.responsibilities;
CREATE POLICY "responsibilities_delete_admin" ON public.responsibilities FOR DELETE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

-- Subtasks
DROP POLICY IF EXISTS "responsibility_subtasks_select_all" ON public.responsibility_subtasks;
CREATE POLICY "responsibility_subtasks_select_all" ON public.responsibility_subtasks FOR SELECT USING (true);

DROP POLICY IF EXISTS "responsibility_subtasks_insert_admin" ON public.responsibility_subtasks;
CREATE POLICY "responsibility_subtasks_insert_admin" ON public.responsibility_subtasks FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "responsibility_subtasks_update_admin" ON public.responsibility_subtasks;
CREATE POLICY "responsibility_subtasks_update_admin" ON public.responsibility_subtasks FOR UPDATE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
) WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "responsibility_subtasks_delete_admin" ON public.responsibility_subtasks;
CREATE POLICY "responsibility_subtasks_delete_admin" ON public.responsibility_subtasks FOR DELETE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

-- Assignees
DROP POLICY IF EXISTS "responsibility_assignees_select_all" ON public.responsibility_assignees;
CREATE POLICY "responsibility_assignees_select_all" ON public.responsibility_assignees FOR SELECT USING (true);

DROP POLICY IF EXISTS "responsibility_assignees_insert_admin" ON public.responsibility_assignees;
CREATE POLICY "responsibility_assignees_insert_admin" ON public.responsibility_assignees FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "responsibility_assignees_update_admin" ON public.responsibility_assignees;
CREATE POLICY "responsibility_assignees_update_admin" ON public.responsibility_assignees FOR UPDATE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
) WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

DROP POLICY IF EXISTS "responsibility_assignees_delete_admin" ON public.responsibility_assignees;
CREATE POLICY "responsibility_assignees_delete_admin" ON public.responsibility_assignees FOR DELETE USING (
  EXISTS (
    SELECT 1
    FROM public.people adm
    WHERE adm.user_id = (select auth.uid())
      AND adm.is_admin IS TRUE
  )
);

-- Grants for API roles (Supabase)
GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON TABLE public.people TO anon, authenticated;
GRANT SELECT ON TABLE public.organisatie_sections TO anon, authenticated;
GRANT SELECT ON TABLE public.organisatie_groups TO anon, authenticated;
GRANT SELECT ON TABLE public.group_memberships TO anon, authenticated;
GRANT SELECT ON TABLE public.responsibilities TO anon, authenticated;
GRANT SELECT ON TABLE public.responsibility_subtasks TO anon, authenticated;
GRANT SELECT ON TABLE public.responsibility_assignees TO anon, authenticated;

GRANT INSERT, UPDATE, DELETE ON TABLE public.people TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.organisatie_sections TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.organisatie_groups TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.group_memberships TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.responsibilities TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.responsibility_subtasks TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.responsibility_assignees TO authenticated;

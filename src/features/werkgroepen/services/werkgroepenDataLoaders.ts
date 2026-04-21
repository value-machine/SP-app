import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/shared/types/database.types";

type GroupRow = Database["public"]["Tables"]["organisatie_groups"]["Row"];
type MembershipRow = Database["public"]["Tables"]["group_memberships"]["Row"];
type PeopleShort = Pick<
  Database["public"]["Tables"]["people"]["Row"],
  "id" | "full_name" | "email" | "phone"
>;
type ResponsibilityRow = Database["public"]["Tables"]["responsibilities"]["Row"];
type SectionRow = Database["public"]["Tables"]["organisatie_sections"]["Row"];
type SubtaskRow = Database["public"]["Tables"]["responsibility_subtasks"]["Row"];
type AssigneeRow = Database["public"]["Tables"]["responsibility_assignees"]["Row"];

export type WerkgroepenCoreRows = {
  sectionRows: SectionRow[];
  groupRows: GroupRow[];
  membershipRows: MembershipRow[];
};

export const loadWerkgroepenCoreRows = async (
  supabase: SupabaseClient<Database>
): Promise<WerkgroepenCoreRows> => {
  const [sec, grp, mem] = await Promise.all([
    supabase.from("organisatie_sections").select("*").order("sort_order", { ascending: true }),
    supabase.from("organisatie_groups").select("*").order("sort_order", { ascending: true }),
    supabase.from("group_memberships").select("*").order("sort_order", { ascending: true }),
  ]);
  if (sec.error) {
    throw new Error(sec.error.message);
  }
  if (grp.error) {
    throw new Error(grp.error.message);
  }
  if (mem.error) {
    throw new Error(mem.error.message);
  }
  return {
    sectionRows: (sec.data ?? []) as SectionRow[],
    groupRows: (grp.data ?? []) as GroupRow[],
    membershipRows: (mem.data ?? []) as MembershipRow[],
  };
};

export const loadPeopleByIds = async (
  supabase: SupabaseClient<Database>,
  ids: string[]
): Promise<PeopleShort[]> => {
  if (ids.length === 0) {
    return [];
  }
  const { data, error } = await supabase
    .from("people")
    .select("id, full_name, email, phone")
    .in("id", ids);
  if (error) {
    throw new Error(error.message);
  }
  return (data ?? []) as PeopleShort[];
};

export const loadResponsibilityRowsForGroups = async (
  supabase: SupabaseClient<Database>,
  groupIds: string[]
): Promise<ResponsibilityRow[]> => {
  if (groupIds.length === 0) {
    return [];
  }
  const { data, error } = await supabase
    .from("responsibilities")
    .select("*")
    .in("group_id", groupIds)
    .order("sort_order", { ascending: true });
  if (error) {
    throw new Error(error.message);
  }
  return (data ?? []) as ResponsibilityRow[];
};

export type SubtasksAndAssignees = {
  subtaskRows: SubtaskRow[];
  assigneeRows: AssigneeRow[];
};

export const loadSubtasksAndAssignees = async (
  supabase: SupabaseClient<Database>,
  responsibilityIds: string[]
): Promise<SubtasksAndAssignees> => {
  if (responsibilityIds.length === 0) {
    return { subtaskRows: [], assigneeRows: [] };
  }
  const [subRes, asgRes] = await Promise.all([
    supabase
      .from("responsibility_subtasks")
      .select("*")
      .in("responsibility_id", responsibilityIds)
      .order("sort_order", { ascending: true }),
    supabase
      .from("responsibility_assignees")
      .select("*")
      .in("responsibility_id", responsibilityIds),
  ]);
  if (subRes.error) {
    throw new Error(subRes.error.message);
  }
  if (asgRes.error) {
    throw new Error(asgRes.error.message);
  }
  return {
    subtaskRows: (subRes.data ?? []) as SubtaskRow[],
    assigneeRows: (asgRes.data ?? []) as AssigneeRow[],
  };
};

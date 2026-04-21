import { getSupabase } from "@shared/services/supabaseService";
import {
  loadPeopleByIds,
  loadResponsibilityRowsForGroups,
  loadSubtasksAndAssignees,
  loadWerkgroepenCoreRows,
} from "@/features/werkgroepen/services/werkgroepenDataLoaders";
import {
  buildPeopleMap,
  buildResponsibilitiesByGroup,
  shapeSection,
  type ShapePageContext,
} from "@/features/werkgroepen/services/werkgroepenShapeHelpers";
import type { WerkgroepenStaticData } from "@/features/werkgroepen/types/werkgroepen.types";

/**
 * Loads werkgroepen page content from Supabase (sections, groups, members, responsibilities).
 */
export const fetchWerkgroepenPageData = async (): Promise<WerkgroepenStaticData> => {
  const supabase = getSupabase();
  const core = await loadWerkgroepenCoreRows(supabase);
  const groupIds = core.groupRows.map((g) => g.id);
  const membershipPersonIds = core.membershipRows.map((m) => m.person_id);

  const responsibilityRows = await loadResponsibilityRowsForGroups(supabase, groupIds);
  const responsibilityIds = responsibilityRows.map((r) => r.id);
  const { subtaskRows, assigneeRows } = await loadSubtasksAndAssignees(supabase, responsibilityIds);

  const assigneePersonIds = assigneeRows.map((a) => a.person_id);
  const allPersonIds = [...new Set([...membershipPersonIds, ...assigneePersonIds])];
  const peopleRows = await loadPeopleByIds(supabase, allPersonIds);

  const peopleById = buildPeopleMap(peopleRows);
  const responsibilitiesByGroup = buildResponsibilitiesByGroup({
    groupIds,
    responsibilities: responsibilityRows,
    subtasks: subtaskRows,
    assignees: assigneeRows,
    peopleById,
  });

  const ctx: ShapePageContext = {
    groups: core.groupRows,
    memberships: core.membershipRows,
    peopleById,
    responsibilitiesByGroup,
  };

  const shapedSections = core.sectionRows.map((s) => shapeSection(s, ctx));
  return { sections: shapedSections };
};

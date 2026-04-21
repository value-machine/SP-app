import type { Database } from "@/shared/types/database.types";
import {
  CONTACT_PLACEHOLDER,
  type OrganisatieGroep,
  type OrganisatieIconKey,
  type OrganisatieLid,
  type OrganisatieResponsibility,
  type OrganisatieResponsibilityAssignee,
  type OrganisatieResponsibilitySubtask,
  type OrganisatieSection,
} from "@/features/werkgroepen/types/werkgroepen.types";

type GroupRow = Database["public"]["Tables"]["organisatie_groups"]["Row"];
type MembershipRow = Database["public"]["Tables"]["group_memberships"]["Row"];
type PeopleRow = Database["public"]["Tables"]["people"]["Row"];
type PeopleShort = Pick<PeopleRow, "id" | "full_name" | "email" | "phone">;
type ResponsibilityRow = Database["public"]["Tables"]["responsibilities"]["Row"];
type SectionRow = Database["public"]["Tables"]["organisatie_sections"]["Row"];
type SubtaskRow = Database["public"]["Tables"]["responsibility_subtasks"]["Row"];
type AssigneeRow = Database["public"]["Tables"]["responsibility_assignees"]["Row"];

const ICON_KEYS: ReadonlySet<string> = new Set([
  "bestuur",
  "kerngroep",
  "externeCommunicatie",
  "ledencommunicatie",
  "samenkomen",
  "actie",
  "massalijn",
  "campagne",
  "programma",
]);

const parseIconKey = (key: string): OrganisatieIconKey => {
  if (ICON_KEYS.has(key)) {
    return key as OrganisatieIconKey;
  }
  return "bestuur";
};

const toOrganisatieLid = (
  person: Pick<PeopleShort, "full_name" | "email" | "phone">,
  membership: Pick<MembershipRow, "role_label" | "note">
): OrganisatieLid => ({
  name: person.full_name,
  email: person.email ?? CONTACT_PLACEHOLDER,
  phone: person.phone ?? CONTACT_PLACEHOLDER,
  roleLabel: membership.role_label,
  ...(membership.note ? { note: membership.note } : {}),
});

export const buildPeopleMap = (rows: PeopleShort[]): Map<string, PeopleShort> =>
  new Map(rows.map((p) => [p.id, p]));

const membershipsForGroup = (groupId: string, memberships: MembershipRow[]): MembershipRow[] =>
  memberships.filter((m) => m.group_id === groupId).sort((a, b) => a.sort_order - b.sort_order);

const membersForGroup = (
  groupId: string,
  memberships: MembershipRow[],
  peopleById: Map<string, PeopleShort>
): OrganisatieLid[] => {
  const list = membershipsForGroup(groupId, memberships);
  return list
    .map((m) => {
      const person = peopleById.get(m.person_id);
      if (!person) {
        return null;
      }
      return toOrganisatieLid(person, m);
    })
    .filter((x): x is OrganisatieLid => x !== null);
};

const mapSubtask = (row: SubtaskRow): OrganisatieResponsibilitySubtask => ({
  id: row.id,
  title: row.title,
  bodyMd: row.body_md,
  sortOrder: row.sort_order,
  done: row.done,
});

const mapAssignee = (
  row: AssigneeRow,
  peopleById: Map<string, PeopleShort>
): OrganisatieResponsibilityAssignee | null => {
  const person = peopleById.get(row.person_id);
  if (!person) {
    return null;
  }
  return {
    personId: person.id,
    fullName: person.full_name,
    ...(row.note ? { note: row.note } : {}),
  };
};

const indexSubtasksByResponsibility = (subtasks: SubtaskRow[]): Map<string, SubtaskRow[]> => {
  const subByResp = new Map<string, SubtaskRow[]>();
  for (const st of subtasks) {
    const list = subByResp.get(st.responsibility_id) ?? [];
    list.push(st);
    subByResp.set(st.responsibility_id, list);
  }
  for (const [, list] of subByResp) {
    list.sort((a, b) => a.sort_order - b.sort_order);
  }
  return subByResp;
};

const indexAssigneesByResponsibility = (assignees: AssigneeRow[]): Map<string, AssigneeRow[]> => {
  const asgByResp = new Map<string, AssigneeRow[]>();
  for (const a of assignees) {
    const list = asgByResp.get(a.responsibility_id) ?? [];
    list.push(a);
    asgByResp.set(a.responsibility_id, list);
  }
  return asgByResp;
};

export type ResponsibilitiesBuildInput = {
  groupIds: string[];
  responsibilities: ResponsibilityRow[];
  subtasks: SubtaskRow[];
  assignees: AssigneeRow[];
  peopleById: Map<string, PeopleShort>;
};

type OneRespInput = {
  row: ResponsibilityRow;
  subByResp: Map<string, SubtaskRow[]>;
  asgByResp: Map<string, AssigneeRow[]>;
  peopleById: Map<string, PeopleShort>;
};

const oneResponsibility = (input: OneRespInput): OrganisatieResponsibility => {
  const { row, subByResp, asgByResp, peopleById } = input;
  const stList = (subByResp.get(row.id) ?? []).map(mapSubtask);
  const asgList = (asgByResp.get(row.id) ?? [])
    .map((aRow) => mapAssignee(aRow, peopleById))
    .filter((x): x is OrganisatieResponsibilityAssignee => x !== null);
  return {
    id: row.id,
    title: row.title,
    descriptionMd: row.description_md,
    sortOrder: row.sort_order,
    subtasks: stList,
    assignees: asgList,
  };
};

export const buildResponsibilitiesByGroup = (
  input: ResponsibilitiesBuildInput
): Map<string, OrganisatieResponsibility[]> => {
  const subByResp = indexSubtasksByResponsibility(input.subtasks);
  const asgByResp = indexAssigneesByResponsibility(input.assignees);
  const groupIdSet = new Set(input.groupIds);
  const byGroup = new Map<string, OrganisatieResponsibility[]>();
  const relevant = input.responsibilities
    .filter((r) => r.group_id && groupIdSet.has(r.group_id))
    .sort((a, b) => a.sort_order - b.sort_order);

  for (const r of relevant) {
    const gid = r.group_id as string;
    const item = oneResponsibility({
      row: r,
      subByResp,
      asgByResp,
      peopleById: input.peopleById,
    });
    const existing = byGroup.get(gid) ?? [];
    existing.push(item);
    byGroup.set(gid, existing);
  }
  return byGroup;
};

export type ShapePageContext = {
  groups: GroupRow[];
  memberships: MembershipRow[];
  peopleById: Map<string, PeopleShort>;
  responsibilitiesByGroup: Map<string, OrganisatieResponsibility[]>;
};

const shapeGroup = (row: GroupRow, ctx: ShapePageContext): OrganisatieGroep => ({
  id: row.slug,
  title: row.title,
  description: row.description_md,
  iconKey: parseIconKey(row.icon_key),
  members: membersForGroup(row.id, ctx.memberships, ctx.peopleById),
  responsibilities: ctx.responsibilitiesByGroup.get(row.id) ?? [],
});

export const shapeSection = (section: SectionRow, ctx: ShapePageContext): OrganisatieSection => {
  const sectionGroups = ctx.groups
    .filter((g) => g.section_id === section.id)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((g) => shapeGroup(g, ctx));

  return {
    id: section.slug,
    heading: section.heading,
    ...(section.preface ? { preface: section.preface } : {}),
    groups: sectionGroups,
  };
};

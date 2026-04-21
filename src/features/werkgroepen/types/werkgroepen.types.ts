/** Placeholder voor e-mail en telefoon tot echte gegevens bekend zijn */
export const CONTACT_PLACEHOLDER = "Nog te vullen";

export type OrganisatieIconKey =
  | "bestuur"
  | "kerngroep"
  | "externeCommunicatie"
  | "ledencommunicatie"
  | "samenkomen"
  | "actie"
  | "massalijn"
  | "campagne"
  | "programma";

export interface OrganisatieLid {
  name: string;
  email: string;
  phone: string;
  roleLabel: string;
  note?: string;
}

export interface OrganisatieResponsibilitySubtask {
  id: string;
  title: string;
  bodyMd: string | null;
  sortOrder: number;
  done: boolean;
}

export interface OrganisatieResponsibilityAssignee {
  personId: string;
  fullName: string;
  note?: string;
}

export interface OrganisatieResponsibility {
  id: string;
  title: string;
  descriptionMd: string;
  sortOrder: number;
  subtasks: OrganisatieResponsibilitySubtask[];
  assignees: OrganisatieResponsibilityAssignee[];
}

export interface OrganisatieGroep {
  id: string;
  title: string;
  /** Markdown (rich text) */
  description: string;
  members: OrganisatieLid[];
  iconKey: OrganisatieIconKey;
  responsibilities: OrganisatieResponsibility[];
}

export interface OrganisatieSection {
  id: string;
  heading: string;
  /** Optional text shown under the section heading (e.g. “Wat is een werkgroep?”) */
  preface?: string;
  groups: OrganisatieGroep[];
}

export interface WerkgroepenStaticData {
  sections: OrganisatieSection[];
}

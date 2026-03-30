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

export interface OrganisatieGroep {
  id: string;
  title: string;
  description: string;
  members: OrganisatieLid[];
  iconKey: OrganisatieIconKey;
  extraBulletPoints?: string[];
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

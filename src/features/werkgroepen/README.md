# Werkgroepen-feature

Publiek overzicht van bestuur, kerngroep, werkgroepen en tijdelijke commissies. Data komt uit **Supabase** (`organisatie_*`, `people`, `responsibilities`, enz.).

## Purpose

- Route: `/werkgroepen` (zie [`src/pages/Werkgroepen/WerkgroepenPage.tsx`](../../pages/Werkgroepen/WerkgroepenPage.tsx))
- Toont titel, icoon, **markdown**-beschrijving, **verantwoordelijkheden** (met optionele subtasks en assignees), en leden (naam, rol, e-mail, telefoon, opmerking)

## Structure

| Layer | Path | Purpose |
|-------|------|---------|
| Types | `types/werkgroepen.types.ts` | `OrganisatieGroep`, `OrganisatieLid`, `OrganisatieResponsibility`, secties |
| API keys | `api/keys.ts` | TanStack Query keys |
| Data | `services/werkgroepenService.ts` | `fetchWerkgroepenPageData()` — Supabase reads + shaping |
| Hooks | `hooks/useWerkgroepenQuery.ts` | `useWerkgroepenQuery()` |
| Components | `components/` | `WerkgroepenPageContent`, accordions, leden-tabel, `ResponsibilitiesList`, iconen |
| Markdown | [`src/components/common/MarkdownContent.tsx`](../../components/common/MarkdownContent.tsx) | Rendert `description` / `descriptionMd` als markdown |

## Database

Zie `supabase/migrations/` — o.a. `organisatie_sections`, `organisatie_groups`, `group_memberships`, `people`, `responsibilities`, `responsibility_subtasks`, `responsibility_assignees`. Seed in `20250421120005_seed_werkgroepen_content.sql`.

Content beheren: Supabase Dashboard of (later) admin-UI. Profielen voor ingelogde gebruikers staan in `public.people` (`user_id` → `auth.users`).

## Iconen

Mapping van `iconKey` naar MUI-icons staat in [`components/OrganisatieIcon.tsx`](components/OrganisatieIcon.tsx).

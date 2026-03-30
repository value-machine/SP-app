# Werkgroepen-feature

Publiek overzicht van bestuur, kerngroep, werkgroepen en tijdelijke commissies (statische content).

## Purpose

- Route: `/werkgroepen` (zie [`src/pages/Werkgroepen/WerkgroepenPage.tsx`](../../pages/Werkgroepen/WerkgroepenPage.tsx))
- Toont titel, icoon, beschrijving en leden (naam, rol, e-mail, telefoon, opmerking) met placeholders waar geen gegevens zijn ingevuld

## Structure

| Layer | Path | Purpose |
|-------|------|---------|
| Types | `types/werkgroepen.types.ts` | `OrganisatieGroep`, `OrganisatieLid`, secties |
| Data | `services/werkgroepenStaticData.ts` | `getWerkgroepenStaticData()` |
| Constants | `types/werkgroepen.types.ts` | `CONTACT_PLACEHOLDER` |
| Hooks | `hooks/useWerkgroepenData.ts` | `useWerkgroepenData()` — memoized statische data |
| Components | `components/` | `WerkgroepenPageContent`, accordions, leden-tabel, iconen |

## Content wijzigen

Alle teksten en leden staan in [`services/werkgroepenStaticData.ts`](services/werkgroepenStaticData.ts). Vervang `Nog te vullen` door echte e-mail/telefoon wanneer beschikbaar; `mailto:` en `tel:` links worden automatisch actief als het patroon klopt.

## Iconen

Mapping van `iconKey` naar MUI-icons staat in [`components/OrganisatieIcon.tsx`](components/OrganisatieIcon.tsx).

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { OrganisatieGroepAccordion } from "@/features/werkgroepen/components/OrganisatieGroepAccordion";
import type { WerkgroepenStaticData } from "@/features/werkgroepen/types/werkgroepen.types";

export interface WerkgroepenPageContentProps {
  data: WerkgroepenStaticData;
}

const MEMBERS_EMPTY_DEFAULT = "Geen leden opgegeven.";

export const WerkgroepenPageContent = ({ data }: WerkgroepenPageContentProps) => {
  return (
    <Box component="article">
      <Typography variant="h3" component="h1" gutterBottom>
        Werkgroepen en organisatie
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Overzicht van bestuur, kerngroep, werkgroepen en tijdelijke commissies van SP Utrecht.
      </Typography>

      {data.sections.map((section) => (
        <Box key={section.id} sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {section.heading}
          </Typography>
          {section.preface ? (
            <Typography variant="body2" component="div" sx={{ whiteSpace: "pre-line", mb: 2 }}>
              {section.preface}
            </Typography>
          ) : null}
          {section.groups.map((group) => (
            <OrganisatieGroepAccordion
              key={group.id}
              group={group}
              membersEmptyLabel={
                section.id === "kerngroep"
                  ? "Nog geen leden opgegeven (samenstelling door het bestuur)."
                  : MEMBERS_EMPTY_DEFAULT
              }
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

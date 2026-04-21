import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

import { MarkdownContent } from "@/components/common/MarkdownContent";
import { OrganisatieIcon } from "@/features/werkgroepen/components/OrganisatieIcon";
import { ResponsibilitiesList } from "@/features/werkgroepen/components/ResponsibilitiesList";
import { WerkgroepenMembersTable } from "@/features/werkgroepen/components/WerkgroepenMembersTable";
import type { OrganisatieGroep } from "@/features/werkgroepen/types/werkgroepen.types";

export interface OrganisatieGroepAccordionProps {
  group: OrganisatieGroep;
  membersEmptyLabel?: string;
}

export const OrganisatieGroepAccordion = ({
  group,
  membersEmptyLabel = "Geen leden opgegeven.",
}: OrganisatieGroepAccordionProps) => {
  return (
    <Accordion disableGutters variant="outlined" sx={{ mb: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon aria-hidden />}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <OrganisatieIcon iconKey={group.iconKey} fontSize="small" color="primary" />
          <Typography component="span" variant="subtitle1">
            {group.title}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: group.responsibilities.length > 0 ? 1 : 0 }}>
          <MarkdownContent markdown={group.description} />
        </Box>
        <ResponsibilitiesList responsibilities={group.responsibilities} groupSlug={group.id} />
        <WerkgroepenMembersTable members={group.members} emptyLabel={membersEmptyLabel} />
      </AccordionDetails>
    </Accordion>
  );
};

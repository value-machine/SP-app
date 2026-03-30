import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

import { OrganisatieIcon } from "@/features/werkgroepen/components/OrganisatieIcon";
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
        <Typography
          variant="body2"
          component="div"
          sx={{ whiteSpace: "pre-line", mb: group.extraBulletPoints?.length ? 2 : 0 }}
        >
          {group.description}
        </Typography>
        {group.extraBulletPoints && group.extraBulletPoints.length > 0 ? (
          <>
            <Typography variant="subtitle2" gutterBottom>
              Overige taken
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, m: 0, mb: 2 }}>
              {group.extraBulletPoints.map((item, index) => (
                <Typography
                  key={`${group.id}-extra-${index}`}
                  component="li"
                  variant="body2"
                  sx={{ mb: 0.5 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </>
        ) : null}
        <WerkgroepenMembersTable members={group.members} emptyLabel={membersEmptyLabel} />
      </AccordionDetails>
    </Accordion>
  );
};

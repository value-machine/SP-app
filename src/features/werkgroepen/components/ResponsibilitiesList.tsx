import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import { MarkdownContent } from "@/components/common/MarkdownContent";
import type { OrganisatieResponsibility } from "@/features/werkgroepen/types/werkgroepen.types";

export interface ResponsibilitiesListProps {
  responsibilities: OrganisatieResponsibility[];
  groupSlug: string;
}

export const ResponsibilitiesList = ({
  responsibilities,
  groupSlug,
}: ResponsibilitiesListProps) => {
  if (responsibilities.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Verantwoordelijkheden
      </Typography>
      <Box component="ul" sx={{ pl: 2.5, m: 0, listStyleType: "disc" }}>
        {responsibilities.map((r) => (
          <Box component="li" key={`${groupSlug}-resp-${r.id}`} sx={{ mb: 1.5 }}>
            <Typography
              variant="body2"
              component="span"
              sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}
            >
              {r.title}
            </Typography>
            {r.descriptionMd.trim().length > 0 ? (
              <Box sx={{ mt: 0.5 }}>
                <MarkdownContent markdown={r.descriptionMd} />
              </Box>
            ) : null}
            {r.assignees.length > 0 ? (
              <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 0.5 }}>
                Toegewezen:{" "}
                {r.assignees
                  .map((a) => (a.note ? `${a.fullName} (${a.note})` : a.fullName))
                  .join(", ")}
              </Typography>
            ) : null}
            {r.subtasks.length > 0 ? (
              <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 0 }}>
                {r.subtasks.map((st) => (
                  <Box
                    component="li"
                    key={st.id}
                    sx={{ display: "flex", alignItems: "flex-start" }}
                  >
                    <Checkbox
                      checked={st.done}
                      disabled
                      size="small"
                      sx={{ p: 0, mr: 0.5, mt: -0.25 }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2">{st.title}</Typography>
                      {st.bodyMd && st.bodyMd.trim().length > 0 ? (
                        <Box sx={{ pl: 0, mt: 0.25 }}>
                          <MarkdownContent markdown={st.bodyMd} />
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : null}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

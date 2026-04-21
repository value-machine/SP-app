import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import { OrganisatieGroepAccordion } from "@/features/werkgroepen/components/OrganisatieGroepAccordion";
import type { WerkgroepenStaticData } from "@/features/werkgroepen/types/werkgroepen.types";

export interface WerkgroepenPageContentProps {
  supabaseConfigured: boolean;
  isLoading: boolean;
  error: Error | null;
  data: WerkgroepenStaticData | undefined;
}

const MEMBERS_EMPTY_DEFAULT = "Geen leden opgegeven.";

export const WerkgroepenPageContent = ({
  supabaseConfigured,
  isLoading,
  error,
  data,
}: WerkgroepenPageContentProps) => {
  if (!supabaseConfigured) {
    return (
      <Box component="article">
        <Typography variant="h3" component="h1" gutterBottom>
          Werkgroepen en organisatie
        </Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          Supabase is niet geconfigureerd. Stel <code>VITE_SUPABASE_URL</code> en{" "}
          <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> in en herstart de app.
        </Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box component="article" sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress aria-label="Laden" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box component="article">
        <Typography variant="h3" component="h1" gutterBottom>
          Werkgroepen en organisatie
        </Typography>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error.message}
        </Alert>
      </Box>
    );
  }

  if (!data || data.sections.length === 0) {
    return (
      <Box component="article">
        <Typography variant="h3" component="h1" gutterBottom>
          Werkgroepen en organisatie
        </Typography>
        <Alert severity="warning" sx={{ mt: 2 }}>
          Geen organisatiegegevens gevonden. Voer de database-migraties uit en controleer de
          seed-data.
        </Alert>
      </Box>
    );
  }

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

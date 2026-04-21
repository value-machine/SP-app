import { Container } from "@mui/material";

import { WerkgroepenPageContent } from "@/features/werkgroepen/components/WerkgroepenPageContent";
import { useWerkgroepenQuery } from "@/features/werkgroepen/hooks/useWerkgroepenQuery";
import { isSupabaseConfigured } from "@shared/services/supabaseService";

export const WerkgroepenPage = () => {
  const { data, isPending, isError, error } = useWerkgroepenQuery();
  const configured = isSupabaseConfigured();

  return (
    <Container maxWidth="lg">
      <WerkgroepenPageContent
        supabaseConfigured={configured}
        isLoading={configured && isPending}
        error={
          isError && error instanceof Error ? error : isError ? new Error("Onbekende fout") : null
        }
        data={data}
      />
    </Container>
  );
};

import { Container } from "@mui/material";

import { WerkgroepenPageContent } from "@/features/werkgroepen/components/WerkgroepenPageContent";
import { useWerkgroepenData } from "@/features/werkgroepen/hooks/useWerkgroepenData";

export const WerkgroepenPage = () => {
  const data = useWerkgroepenData();

  return (
    <Container maxWidth="lg">
      <WerkgroepenPageContent data={data} />
    </Container>
  );
};

import { useMemo } from "react";

import { getWerkgroepenStaticData } from "@/features/werkgroepen/services/werkgroepenStaticData";
import type { WerkgroepenStaticData } from "@/features/werkgroepen/types/werkgroepen.types";

export const useWerkgroepenData = (): WerkgroepenStaticData => {
  return useMemo(() => getWerkgroepenStaticData(), []);
};

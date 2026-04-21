import { useQuery } from "@tanstack/react-query";

import { werkgroepenKeys } from "@/features/werkgroepen/api/keys";
import { fetchWerkgroepenPageData } from "@/features/werkgroepen/services/werkgroepenService";
import { isSupabaseConfigured } from "@shared/services/supabaseService";

/**
 * Loads werkgroepen / organisatie content from Supabase (TanStack Query).
 */
export const useWerkgroepenQuery = () => {
  const enabled = isSupabaseConfigured();

  return useQuery({
    queryKey: werkgroepenKeys.pageData(),
    queryFn: fetchWerkgroepenPageData,
    enabled,
  });
};

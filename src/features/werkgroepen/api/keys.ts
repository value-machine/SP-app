/**
 * TanStack Query keys for werkgroepen / organisatie content.
 */

export const werkgroepenKeys = {
  all: ["werkgroepen"] as const,
  pageData: () => [...werkgroepenKeys.all, "pageData"] as const,
} as const;

/**
 * Build an absolute URL that respects the Vite `base` (e.g. `/SP-app/` on GitHub Pages).
 *
 * Used for Supabase redirect URLs (`emailRedirectTo`, `resetPasswordForEmail` `redirectTo`)
 * so confirmation / reset links land on the correct deployed path instead of the bare origin.
 *
 * @param path - app-relative path without a leading slash (e.g. `"update-password"`, `""`)
 * @returns absolute URL like `https://example.com/SP-app/update-password`
 */
export const buildAppUrl = (path = ""): string => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const baseUrl = import.meta.env.BASE_URL || "/";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${origin}${normalizedBase}${normalizedPath}`;
};

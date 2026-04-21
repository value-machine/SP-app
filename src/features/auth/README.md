# Auth Feature

User authentication and session management via Supabase (email + password only).

## Purpose

- Email/password login and sign-up
- Forgot-password + password-reset flow
- Anonymous sessions for guests (so public RLS reads continue to work)
- Session persistence and auth state subscription
- Profile menu state and handlers
- Post-login redirect handling

## Structure

| Layer | Path | Purpose |
|-------|------|---------|
| Hooks | `hooks/` | `useAuth`, `useAuthSession`, `useAuthStateSubscription`, `useAuthRedirect`, `useUpdatePasswordSession`, `useUserProfile` / `useUserProfileQuery`, `useProfileMenuState`, `useProfileMenuHandlers` |
| Services | `services/` | `authService`, `authCallbackService`, `userProfileService` – auth + `public.people` profile by `user_id` |
| Components | `components/` | `AuthPageShell`, `LoginForm`, `SignupForm`, `ForgotPasswordForm`, `UpdatePasswordForm` |
| Types | `types/` | `User`, `LoginCredentials`, `SignUpCredentials`, `AuthState` |

**TanStack Query:** `useUserProfileQuery` is the primary hook for user profile data (caching, deduplication). `useUserProfile` is a thin wrapper for backward compatibility.

## Main API

### `useAuth()` / `useAuthContext()`

Returns: `{ user, loading, error, login, signUp, logout, resetPassword, updatePassword }`

- Requires Supabase configured (`isSupabaseConfigured()`). If not, `loading` becomes `false` and handlers no-op.
- Session is initialized on mount and kept in sync via `useAuthStateSubscription`.
- `resetPassword(email)` / `updatePassword(newPassword)` return `{ ok: boolean }`; the error (if any) is also surfaced on `error`.

### `authService`

- `login(credentials)` / `signUp(credentials)` / `logout()` – password auth
- `resetPasswordForEmail(email)` – sends a reset link that lands on `/update-password`
- `updatePassword(newPassword)` – changes the password for the current session (recovery or normal)
- `signInAnonymously()` – used to keep public RLS reads working for guests
- `exchangeCodeForSession(code)` – used by `/auth/callback` for the optional email-confirmation PKCE flow
- Filters anonymous users via `supabaseUserToUser()` so they don't show up as "logged in"

## Routes owned by this feature

| Path | Page | Notes |
|------|------|-------|
| `/login` | `LoginPage` | Redirects to `/` if already signed in |
| `/signup` | `SignupPage` | Public sign-up (no email confirmation required) |
| `/forgot-password` | `ForgotPasswordPage` | Sends password-reset email |
| `/update-password` | `UpdatePasswordPage` | Consumes the recovery link, shows the new-password form |
| `/auth/callback` | `AuthCallbackPage` | PKCE `?code=` exchange for optional email-confirmation |

## Supabase Dashboard configuration (one-time)

1. **Authentication → Providers → Email**: enable Email provider; set _Confirm email_ to **off** (current app assumption); allow new user signups.
2. **Authentication → Providers → Google / SAML**: disabled.
3. **Authentication → URL Configuration → Redirect URLs**: add every deployed origin + Vite base combination used. For this project (Vite `base = "/SP-app/"` in production):
   - `http://localhost:5173/`
   - `http://localhost:5173/auth/callback`
   - `http://localhost:5173/update-password`
   - `https://value-machine.github.io/SP-app/`
   - `https://value-machine.github.io/SP-app/auth/callback`
   - `https://value-machine.github.io/SP-app/update-password`
4. **Authentication → URL Configuration → Site URL**: `https://value-machine.github.io/SP-app/`.

Redirect URLs are constructed client-side by `@utils/appUrl#buildAppUrl`, which prefixes `import.meta.env.BASE_URL` so the app respects the Vite base when deployed under a subpath.

## Dependencies

- `@shared/services/supabaseService` – Supabase client, `isSupabaseConfigured`
- `@shared/utils/userUtils` – `supabaseUserToUser`
- `@utils/redirectUtils` – post-login redirect path storage

## Related

- `src/pages/*` – thin pages that render the forms inside `AuthPageShell`
- `src/shared/context/AuthContext.tsx` – provider wrapping `useAuth`

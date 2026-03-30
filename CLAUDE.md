# Project Rules

This file is the authoritative guide for Claude when working on this codebase. All rules are always active. Database rules also apply in `supabase/` and cloud-function rules in `supabase/functions/` and `cloud-functions/`.

---

## Branch Protection (Read First)

**Never develop on `main`.** Before editing any code file, verify the current branch.

- `experimental` → all code changes allowed (primary development branch)
- `feature/*` → all code changes allowed
- `main` → **BLOCKED**. Stop immediately. Say: "You are on `main`. Switch first: `git checkout experimental`"
- Exception only when user explicitly says "emergency fix on main" AND confirms twice.

Safe to edit on any branch (after user confirmation): documentation files, `CLAUDE.md`, README files.

---

## Architecture

### Code Placement Layers (import direction is downward only)

```
pages → components → hooks → services → utils → types
```

**Component rule:** JSX + event handlers + local UI state only. Zero data fetching, zero business logic.
**Hook rule:** Logic requiring React lifecycle (`useEffect`, `useState`, `useContext`).
**Service/util rule:** Logic NOT requiring React lifecycle → plain `.ts` file.
**One-way rule:** Components import hooks; hooks never import components.

### Directory Structure

```
src/
├── assets/
├── components/common/    # "Dumb" UI only — no business logic
├── features/[name]/
│   ├── README.md         # Required for active features
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── context/
│   └── store/
├── shared/
│   ├── hooks/            # useAuth, useLayout, useLocalStorage
│   ├── services/
│   ├── utils/
│   ├── types/
│   ├── context/
│   └── theme/
├── layouts/
├── pages/                # Routing + feature composition only; NO barrel index.ts
├── routes/
├── store/
├── config/
└── lib/
```

`components/common/` = presentation-only, zero business logic.
`shared/` = reusable cross-feature logic. Not to be confused with `components/common/`.

Backend:
- Supabase Edge Functions: `supabase/functions/<name>/index.ts`; shared: `supabase/functions/_shared/`
- Other cloud functions: `cloud-functions/<service-name>/`

### Path Aliases (always use `@/` — never relative `../` imports)

| Alias | Resolves to |
|-------|-------------|
| `@/components/*` | `src/components/*` |
| `@/pages/*` | `src/pages/*` |
| `@/hooks/*` | `src/shared/hooks/*` |
| `@/services/*` | `src/shared/services/*` |
| `@/utils/*` | `src/shared/utils/*` |
| `@/types/*` | `src/shared/types/*` |
| `@/config/*` | `src/config/*` |
| `@/context/*` | `src/shared/context/*` |
| `@/theme/*` | `src/shared/theme/*` |
| `@/routes/*` | `src/routes/*` |
| `@/lib/*` | `src/lib/*` |
| `@/ai-capabilities/*` | `src/ai-capabilities/*` |

### Layer Import Table

| Layer | Can import from | Cannot import from |
|-------|----------------|--------------------|
| `pages` | components, hooks, services, utils, types, routes, config | — |
| `components` | hooks, services, utils, types, config | pages, routes |
| `hooks` | services, utils, types | pages, routes, components |
| `services` | utils, types, config | pages, routes, components, hooks, **features** |
| `utils` | types | everything else |
| `types` | nothing | everything |

ESLint error `boundaries/element-types` = you're importing from a forbidden layer. Fix: move code to correct layer, create a bridging hook, or extract shared logic.

### Folder Rule

If a folder exceeds 10 files, break it into sub-folders.

### Architecture Rules Are Immutable

Do not modify architecture rules without explicit user consent. Violations mean the **code** is wrong, not the rules. When violations are detected: report them, suggest fixing the code, explain why.

### Documentation Locations

- `ARCHITECTURE.md` and `CHANGELOG.md` → project root (not `documentation/`)
- Feature docs → `src/features/*/README.md` (required when feature code changes)
- Deep docs → `src/features/*/docs/*.md` (optional, only with explicit user approval)
- Temp planning → `documentation/jobs/temp_job_<name>/`

---

## Code Style

### Critical Rules (no exceptions)

- **Double quotes** always (`"` not `'`)
- **Path aliases** always (`@/` prefix) — violations are errors
- **TypeScript strict mode** required (`strict: true`)
- **Arrow functions** always use parens: `(x) => x`
- **Equality**: `===` never `==`
- **Variables**: `const`/`let` never `var`
- **No `any`**: explicit types required
- **Complexity**: cyclomatic ≤ 10, cognitive ≤ 15, function ≤ 100 lines, nesting ≤ 4, params ≤ 5

### Naming

- Variables/functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/interfaces: `PascalCase`
- Components: `TodoItem.tsx`
- Hooks: `useTodos.ts`
- Services: `todoService.ts`
- Types: `todo.types.ts`

### Imports

Group: external → internal (`@/`). Within each group, alphabetical. Type imports last: `import type {...}`.
Remove unused imports (they are errors). Prefix unused vars with `_` to suppress warnings.

### Line endings: LF (`\n`) always. Never CRLF.

### Styling scope — always ask the user before applying a styling change:

- Design token change (color, typography) → Global Theme (`src/shared/theme/defaultTheme.ts`)
- Component variant → Theme Component Override
- Layout/spacing for one instance → `sx` prop
- Never use `sx` for colors/visual styling

### Complexity reduction

- Extract helper functions for complex logic
- Use early returns to reduce nesting
- Replace nested conditionals with guard clauses
- Use options objects instead of many params
- See `.claude/commands/optimize.md` for refactoring workflow

### Services: pure functions only (no React hooks)

```typescript
export const fetchData = async (id: string): Promise<User | null> => {
  // no hooks here
};
```

---

## Testing

### Coverage

- 80%+ on critical paths
- Test all public APIs and exported functions
- Test edge cases and error conditions

### What to test

Business logic, user interactions, error handling, integration points between modules.

### What NOT to test

Third-party library internals, trivial getters/setters, implementation details (test behavior).

### File structure

Mirror source structure. Name: `[component].test.ts` or `[component].spec.ts`.

### Naming pattern

`"should [expected behavior] when [condition]"`

### Edge Functions testing

No staging environment — Edge Functions deploy once and affect both `experimental` and `main`.
Manual testing only. Test thoroughly before deploy. Include release validation before `experimental` → `main` when Edge Function behavior changed.

---

## Security

### Database verification

**NEVER** assume database structures. Always verify schema before writing queries.

### Authentication & Authorization

- Never store passwords in plain text
- Use principle of least privilege
- Validate authorization at the API boundary — never trust client-side checks

### RLS Policies (Supabase)

**Always use subquery syntax:**
```sql
-- ✅ GOOD (cached, evaluated once per query)
(select auth.uid()) = user_id

-- ❌ BAD (re-evaluated per row)
auth.uid() = user_id
```

Never create multiple permissive policies for the same role/action — combine with OR logic.
Never use `FOR ALL` when you have `FOR SELECT` — split into separate operation policies.

RLS checklist before creating/modifying policies:
- [ ] `(select auth.uid())` not `auth.uid()`
- [ ] No multiple permissive policies for same role/action
- [ ] No `FOR ALL` when `FOR SELECT` exists

### Input validation

- Validate and sanitize all user inputs
- Use parameterized queries / prepared statements
- Never concatenate user input into SQL

### Secrets

- Never commit secrets to version control
- Use environment variables
- Never log passwords, tokens, or PII

### Environment variables

- Client-side: `VITE_*` prefix, access via `import.meta.env.VITE_*`
- Supabase: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Edge Functions: set via Supabase Dashboard → Project Settings → Edge Functions → Secrets
- Never commit `.env` files with real values

---

## Workflow

### Commit format

`[VERSION] type: Feature/Change Title`

- Version number first: `[3.19.0] feat: User Profile Settings`
- Commit body is **required** — must describe what changed
- Commit message must match changelog entry
- Reference issue numbers when applicable

### Semantic versioning

- `feat:` → MINOR bump
- `fix:` / `perf:` → PATCH bump
- `docs:` / `style:` / `refactor:` / `test:` / `chore:` → no bump
- MAJOR bump requires explicit user confirmation

### Changelog (Keep-a-Changelog format)

Always update `CHANGELOG.md` before committing user-facing changes. Sections: Added, Changed, Deprecated, Removed, Fixed, Security, Documentation, Tests, Performance.

Required: user-facing features, bug fixes, docs. Optional: internal refactoring, dependency updates.

### Version synchronization

Both `package.json` (`version` field) and `CHANGELOG.md` must use the same version number.

### Pull requests

- `feature/*` → `experimental` (development)
- `experimental` → `main` (release, squash merge preferred)
- Never push directly to `main`
- Wait for required CI checks before merging

### Protected files — STOP and ASK user before modifying any of these:

`.gitignore`, `.gitattributes`, `projectStructure.config.cjs`, `.eslintrc.json`, `eslint.config.js`, `.dependency-cruiser.cjs`, `.prettierrc.*`, `.editorconfig`, `tsconfig*.json`, `.husky/**`, `.github/workflows/**`, `CLAUDE.md`, `.claude/commands/**`

### Agent behaviors

- Never claim success without user test — only the user decides if implementation is successful
- **Reductive strategy**: Try to achieve results by removing/simplifying code first; only add code when simplification fails or user permits
- When in doubt about anything, ask rather than assume

### Commit/push workflow

1. After completing changes: summarize + ask "Are you ready to commit?"
2. `finish` command: cleanup → changelog → version → `git add` + `git commit` (local only, never pushes)
3. `push` command: verify clean tree → fetch → check freshness → confirm → push

### Windows / shell notes

- Shell: `bash` (Claude Code runs bash, not PowerShell)
- If running commands that might hang, check exit codes

### Server restarts

Explicitly mention when a restart is required, especially after env var changes, dependency changes, vite config changes, path alias changes.

---

## Debugging

### Reductive strategy

When fixing bugs: try removing/simplifying code first. Prefer a sequence of small targeted tests. Reduce scope — start from the smallest testable piece.

### Test planning

For every test, define BEFORE running it:
- What you conclude if it FAILS
- What you conclude if it SUCCEEDS
- Next step for each outcome

When instructing the user to test something, **always provide explicit next steps for BOTH success AND failure**.

### Scientific Method Debugging

See `.claude/commands/debug.md` for the full process.

Core principle: the user does NOT edit code. The user only performs actions in the app, filters/copies console logs, or performs dashboard actions.

### API troubleshooting

For request errors: log method, URL, query params, headers (excluding auth), body (redacted).
For data issues: log full raw response (tokens and PII redacted).

### Logging

- Do not remove debugging logs until user confirms they're no longer needed
- Production: use conditional `if (import.meta.env.VITE_DEBUG_API) { console.log(...) }`

---

## File Placement Validation

**Before creating any file or folder**, validate:

1. Check `projectStructure.config.cjs` for allowed locations
2. Validate against architecture rules (layers, naming)
3. Confirm placement matches whitelist

| File type | Location |
|-----------|----------|
| Page component `.tsx` | `src/pages/<Name>/<Name>Page.tsx` (named, NOT `index.tsx`) |
| Reusable component | `src/components/common/` or `src/features/*/components/` |
| Hook/service/util `.ts` | `src/shared/{hooks\|services\|utils}/` or `src/features/*/{hooks\|services}/` |
| Types | `src/shared/types/` or `src/features/*/types/` |
| Edge Function | `supabase/functions/<name>/index.ts` |
| Cloud Function | `cloud-functions/<name>/` |
| Feature docs | `src/features/*/README.md` |
| Migrations | `supabase/migrations/` |
| Temp planning | `documentation/jobs/temp_job_<name>/` |

Barrel files (`index.ts`) NOT allowed in `pages/`. Use direct imports.
Run `pnpm validate:structure` to validate file placements.

---

## Database Migrations (Supabase/PostgreSQL)

Migrations must be safe for both fresh database resets and incremental updates. All migrations must be idempotent.

### Safe patterns (always use these)

```sql
CREATE OR REPLACE FUNCTION    -- safe to re-run
DROP IF EXISTS                -- safe if object doesn't exist
ADD COLUMN IF NOT EXISTS      -- safe if column already exists
CREATE INDEX IF NOT EXISTS    -- safe if index exists
ON CONFLICT DO NOTHING        -- safe for data migrations
ALTER TYPE ... ADD VALUE IF NOT EXISTS
```

### Unsafe patterns (never use)

```sql
CREATE FUNCTION               -- without OR REPLACE
DROP                          -- without IF EXISTS
ADD COLUMN                    -- without IF NOT EXISTS
RAISE EXCEPTION               -- in validation blocks (use RAISE NOTICE)
```

### Validation migrations must be optional

On fresh databases, tables may be empty. Use `RAISE NOTICE` not `RAISE EXCEPTION` for validation checks.

### Migration file naming

Format: `YYYYMMDDHHMMSS_description.sql` — snake_case, descriptive.

### Before committing a migration

- [ ] Uses `IF EXISTS` / `IF NOT EXISTS` / `OR REPLACE` everywhere applicable
- [ ] Validation migrations skip gracefully on fresh database
- [ ] Data migrations handle empty tables
- [ ] No `RAISE EXCEPTION` in validation blocks
- [ ] Function dependencies exist in earlier migrations
- [ ] Tested on fresh database (`supabase db reset`)
- [ ] Tested incrementally on existing database

---

## Edge / Cloud Functions

### Default: prefer frontend logic

Use Edge Functions ONLY when:
1. Security-critical (logic must never be client-side)
2. Server-only secrets required (API keys, payment processing)
3. System events (auth lifecycle)

Do NOT use Edge Functions for: data aggregation, user-initiated operations, data transformations, notification logic. These should be frontend with atomic Supabase operations.

### Deployment model (critical context)

`experimental` and `main` share ONE Supabase project. Edge Functions deploy ONCE and affect BOTH branches. Bugs in Edge Functions impact the entire app. They are more fragile than frontend code.

### Decision framework

Before adding an Edge Function, ask:
1. Must this be server-side for security? No → use frontend
2. Does this require server-side credentials? No → use frontend
3. Can I test this safely on `experimental` first? Yes → prefer frontend
4. What if this fails — does it block critical operations? → consider error handling in frontend

### Organization

Group functions by **business capability**, not technical similarity.

```
supabase/functions/
├── gamma-generate/   # Presentation generation (requires server API key)
├── tool-execute/     # Unified tool execution endpoint
└── _shared/          # Shared utilities
```

Existing functions in this project: `gamma-generate`, `gamma-status`, `tool-execute`, `migrate-base64-files`.

---

## Project-Specific

### Environment variables in use

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_OPENROUTER_API_KEY`
- `VITE_ELEVENLABS_API_KEY`
- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID` (Firebase Hosting only)
- `GAMMA_API_KEY` (Edge Function secret, set in Supabase Dashboard)

### Architecture consistency

The app is **frontend-heavy**: direct API calls to OpenRouter, direct Supabase writes, client-side routing, TanStack Query for data fetching. Maintain this consistency — don't introduce Edge Functions for operations that fit the frontend pattern.

---

## Slash Commands (`.claude/commands/`)

| Command | Purpose |
|---------|---------|
| `/finish` | Cleanup, changelog, version bump, commit (local only) |
| `/push` | Push already-committed work to remote |
| `/debug` | Scientific Method Debugging workflow |
| `/plan` | Create a development plan document |
| `/implement` | Execute a plan phase by phase |
| `/validate` | Validate a plan or implementation against rules |
| `/feature` | Systematic engineering process for new features |
| `/check` | Pre-implementation completeness gate |
| `/check-simple` | Lightweight feature check |
| `/review` | Score a component against quality rubric |
| `/optimize` | Systematic code optimization (4 levels) |
| `/prime` | Load project context at start of session |
| `/learn` | Extract lessons and sharpen rules from recent changes |
| `/start` | Guide first-time setup through README flow |
| `/stepback` | Pause and reconsider approach |
| `/quick-piv` | Small scoped change in one pass |

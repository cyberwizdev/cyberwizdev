# AI Workflow Rules: CyberWizDev

## Repository Inspection Before Editing

### Always First Steps

1. **Read `context/agents.md`** for current agent instructions and project conventions
2. **Check `package.json`** scripts and dependency versions before running commands
3. **Inspect the relevant directory** — `app/` for pages/routes, `components/` for UI, `lib/` for logic
4. **Look for existing similar implementations** — model new code after existing patterns
5. **Check Prisma schema** (`prisma/schema.prisma`) if database changes are involved

### Directory Navigation Priority

| Priority | Directory | Purpose |
| -------- | -------- | -------- |
| 1 | `app/` | Next.js App Router pages and API routes |
| 2 | `components/ui/` | shadcn/ui components (primary UI pattern) |
| 3 | `components/admin/` | Admin-specific components |
| 4 | `lib/` | Server actions and utilities |
| 5 | `hooks/` | Custom React hooks |
| 6 | `prisma/` | Database schema changes |

## How to Determine Where New Code Belongs

### Rule 1: Feature-Driven Placement

- **Public feature** → `app/(main)/` or `components/ui/`
- **Admin feature** → `app/(admin)/` or `components/admin/`
- **API endpoint** → `app/api/` with corresponding method handler
- **Server action** → `lib/actions/` or inline in component with `"use server"`
- **Database model change** → `prisma/schema.prisma` + `prisma generate`

### Rule 2: Pattern Matching

- If `app/api/contact/route.ts` exists with POST handler → new contact features go there
- If `components/ui/button.tsx` exists → new button variants follow same pattern
- If `lib/actions/contact.ts` exists → new actions import and extend it
- If `components/admin/Sidebar.tsx` exists → new admin nav items follow same structure

### Rule 3: Layer Separation

- **UI only**: Add to `components/ui/` or `components/admin/`
- **UI + data**: Add API route `app/api/` + server action in `lib/`
- **UI + DB**: Add API route + Prisma schema update + server action
- **Full feature**: May span multiple layers; ensure all are updated consistently

## Reusing Existing Components/Utilities

### Before Creating New

1. **Search for existing equivalents**:
   - `components/ui/` — "Do I need a new component or can I modify existing?"
   - `lib/actions/` — "Is there an existing server action for this?"
   - `app/api/` — "Is there already an API route for this feature?"

2. **Extend existing rather than recreate**:
   - Add a new variant to an existing shadcn/ui component
   - Modify an existing API route's POST handler
   - Import and use an existing utility function from `lib/`

3. **If no exact match exists**:
   - Check `components.json` to see if the component can be generated via `pnpm dlx shadcn-ui@latest add <name>`
   - For unique components, follow the existing coding standards from `context/coding-standards.md`

## Preserving Architecture

### Do's

- **Keep Server/Client boundary**: Server Components for data, Client Components for interactivity
- **Maintain Tailwind CSS v4 patterns**: Utility-first classes; `tailwind-merge` for conditional styling
- **Preserve shadcn/ui structure**: Generated via CLI; don't manually recreate component patterns
- **Keep Next-auth v5 auth patterns**: Don't switch to custom auth; extend existing Next-auth config
- **Maintain Prisma types**: After schema changes, always run `prisma generate` to update types

### Don'ts

- **Don't mix App Router and Pages Router** unnecessarily: Pick one pattern per feature
- **Don't bypass Radix UI primitives**: shadcn/ui components use Radix under the hood
- **Don't add `any` types** to avoid TypeScript errors; fix the root cause instead
- **Don't create new API routes** without also considering the corresponding server action or client call

## Testing Changes

### When Modifying Business Logic

1. **Check for existing tests** — if test files exist in the project, run them before and after changes
2. **Manual verification** — start the dev server (`npm run dev`) and test the feature end-to-end
3. **API route validation** — hit the endpoint with `curl` or Postman; verify JSON response format
4. **Form validation** — ensure Zod schemas validate correctly; test both valid and invalid inputs
5. **No breaking changes** — if modifying an existing API, ensure existing clients still work

### Test Patterns to Follow

- **Zod schema tests**: `.safeParse()` for valid/invalid cases
- **API route tests**: Response status and body shape verification
- **Component tests**: If test framework exists, render and user-event interactions

### When No Test Suite Exists

- **Manual QP**: Start `npm run dev`, use the feature, verify no console errors
- **Visual regression**: Check UI looks correct across breakpoints (sm, md, lg, xl)
- **Database integrity**: Verify Prisma records created/updated correctly

## Handling Migrations

### Prisma Schema Changes

1. **Modify `prisma/schema.prisma`** first — add new models or fields
2. **Run migration**: `npx prisma migrate dev --name <name>`
3. **Generate client**: `npx prisma generate`
4. **Update dependent code**: Run TypeScript compiler; fix any type errors
5. **Test the change**: Verify the feature works with the new schema

### Never Do These

- Modify `node_modules/@prisma/client` directly — always regenerate
- Commit `prisma/migrations/` changes without running `prisma migrate`
- Skip `prisma generate` after schema changes — types will be stale

## Handling Environment Variables

### Detection and Documentation

1. **Check `.env` and `.env.example`** for variable names and purpose
2. **Never infer or guess values** — documented in `context/environment-setup.md`
3. **If a variable is missing**:
   - Check if the feature using it is actually required by the codebase
   - Look at `auth.config.ts`, `next.config.js` for references
   - Document as "present in codebase but value not inspected"

### Adding New Environment Variables

1. **Add to `.env`** (create if doesn't exist; add to `.gitignore` if new)
2. **Update documentation** in `context/environment-setup.md`
3. **If used in code**: Check `lib/`, `auth.config.ts`, or `next.config.js` for the pattern
4. **Never commit actual values** — keep `.env` values out of version control

## Updating Documentation

### When Code Changes Affect Architecture

1. **Update `context/architecture.md`** if major component/data flow changes
2. **Update `context/tech-stack.md`** if new framework/library is introduced
3. **Update `context/coding-standards.md`** if new conventions are adopted
4. **Update `context/project-overview.md`** if major features are added/changed
5. **Always regenerate/review `context/agents.md`** if workflow patterns change

### General Rule

- If an AI agent would need updated context to work effectively, update the context files
- Document changes even if minor — future agents depend on accurate documentation
- Do not overwrite existing context without reflecting the current state

## Reviewing Changes Before Finishing

### Pre-Commit Checklist

- [ ] **TypeScript compilation**: `npx tsc --noEmit` passes with no new errors
- [ ] **ESLint**: `npm run lint` passes (or new warnings are justified)
- [ ] **Prisma client**: `npx prisma generate` run after schema changes; types updated
- [ ] **Context documentation**: If architecture changed, update relevant `context/` files
- [ ] **No secrets exposed**: Verify `.env` values or database strings not in documentation
- [ ] **All modified files reviewed**: Run git diff to confirm intended changes only
- [ ] **Existing tests pass**: If test suite exists, `npm test` or equivalent passes

### Code Review Standards

- Small, focused changes are preferred over large unrelated refactors
- Each change should serve a clear purpose (feature bug fix, docs update)
- If touching multiple layers (UI + API + DB), ensure all are consistent
- When in doubt, ask for clarification rather than guessing at the correct pattern
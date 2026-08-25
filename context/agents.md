# Agent Instructions for CyberWizDev

## Codebase Inspection

Before making any changes:

1. **Read the context files** in `context/` for the latest project state
2. **Check `package.json`** for dependencies and scripts
3. **Review the Prisma schema** in `prisma/schema.prisma` for data models
4. **Inspect `app/` directory** to understand the Next.js structure (App Router vs Pages Router)
5. **Check `components/`** for UI component patterns (shadcn/ui, Radix UI)
6. **Look at existing API routes** in `app/api/` for patterns and conventions

## Modification Guidelines

- **Follow existing patterns**: If a feature already exists (e.g., a new API route, component, or page), model your implementation after the existing code
- **Component creation**: Use shadcn/ui component patterns when adding new UI. Import from `@/components/ui/` and use Tailwind CSS classes
- **API routes**: Follow the pattern in `app/api/` - each route should handle its method (GET, POST, etc.) with proper error handling
- **Database changes**: Always update Prisma schema first, then run `prisma generate`; do not modify `node_modules/@prisma/client` directly
- **Type safety**: TypeScript is strict; ensure types are correct and avoid `any` unless necessary

## File Structure Conventions

- Pages: `app/` (App Router) or `pages/` (Pages Router)
- Components: `components/ui/`, `components/admin/`, `components/reusable/`
- Utilities: `lib/` (server actions, utils)
- Hooks: `hooks/`
- API routes: `app/api/`
- Prisma schema: `prisma/schema.prisma`

## Important Conventions

- **Tailwind CSS v4**: Use utility-first classes; `tailwind-merge` for conditional class joining
- **shadcn/ui**: Components are configured in `components.json`; new components should follow the same generation pattern
- **Next-auth v5**: Authentication uses Next-auth 5.0.0-beta.29; review `auth.config.ts` and `auth.ts` for patterns
- **Socket.io**: Real-time features use Socket.io 4.8.1; both server (`app/api/chat/route.ts`) and client sides exist
- **Error handling**: Errors are typically propagated with descriptive messages; check `lib/actions/` for server action patterns

## Testing Expectations

- Look for test files in the repo; if a test suite exists, follow its patterns
- When modifying business logic, ensure existing tests still pass
- Prefer unit tests over integration tests when possible; but this project may have limited test coverage

## When to Ask for Clarification

- If an existing pattern is unclear or seems inconsistent
- When adding a feature that could span multiple layers (UI + API + DB + auth)
- If the intended behavior differs from what the code seems to suggest
- Before making breaking changes to established APIs or component APIs

## Preservation Rules

- Do not overwrite existing `context/` files without updating them to reflect the new state
- **After any code change that affects architecture, tech stack, or conventions: update the relevant `context/*.md` files** (e.g., `architecture.md` for data flow changes, `tech-stack.md` for new frameworks, `coding-standards.md` for new conventions)
- Do not delete or rename existing files unless explicitly needed; move them to `context/` if appropriate
- Maintain backward compatibility in API routes and component APIs when possible
- Preserve the Tailwind CSS v4 and shadcn/ui patterns already in use
- Run `npm run lint` after changes; fix all warnings before finishing
- If Prisma schema was modified, run `npx prisma generate` and verify types are updated

## Documentation Updates

- If an AI agent would need updated context to work effectively, update the context files
- Document changes even if minor — future agents depend on accurate documentation
- When in doubt, follow the review checklist in `context/ai-workflow-rules.md`
# CyberWizDev: Context & Skills Reference

*Auto-generated: August 25, 2026. Read at start of every agent session.*

## Project Context Files (always load first)

| File | Purpose |
| ---- | ------- |
| `context/agents.md` | Agent instructions, modification patterns, when to ask for clarification |
| `context/project-overview.md` | Project purpose, features, user flows, integrations |
| `context/architecture.md` | Full-stack architecture, data flows, component boundaries |
| `context/tech-stack.md` | Detected languages, frameworks, databases, UI libraries |
| `context/coding-standards.md` | Naming conventions, component patterns, API patterns |
| `context/file-structure.md` | Directory purposes, navigation priority |
| `context/environment-setup.md` | Dev commands, env var names (not values), database setup |
| `context/ai-workflow-rules.md` | Workflow rules, code placement, testing, migration patterns |
| `context/recommended-skills.md` | Priority table, installed skills, task descriptions |

## Installed AI Agent Skills

| Skill | Source | Installs | How to Use |
| ----- | ------ | -------- | --------- |
| `web-design-guidelines` | `vercel-labs/agent-skills@web-design-guidelines` | 573K | Use for UI creation, Tailwind CSS v4 patterns, shadcn/ui consistency |
| `webapp-testing` | `anthropics/skills@webapp-testing` | 140.7K | Use for Zod validation, API route testing, server action verification |
| `prisma-client-api` | `prisma/skills@prisma-client-api` | 233.9K | Use for Prisma schema changes, migrations, database queries |
| `frontend-design` *(pre-existing)* | `anthropics/skills` | — | Visual design principles, typography, color systems |
| `find-skills` *(pre-existing)* | `vercel-labs/skills` | — | Discover/install additional skills via `npx skills find <query>` |

## Quick-Start Commands

```bash
# 1. Load context (agent should read these files at session start)
#    - context/agents.md
#    - context/recommended-skills.md

# 2. Install new skills (as needed)
npx skills find <query>      # Search for skills
npx skills add <owner/repo@skill> -g -y  # Install skill globally

# 3. Reference project tech stack
#    - Next.js 15, TypeScript 5.2, Tailwind CSS v4
#    - Prisma ORM + MySQL, shadcn/ui, Radix UI
#    - Next-auth v5, Socket.io 4.8.1, Zod, Nodemailer

# 4. Development workflow
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint check
npm run create-admin  # Create admin user

# 5. When modifying code:
#    - Follow patterns in context/coding-standards.md
#    - Model after existing code in app/, components/, lib/
#    - Update Prisma schema first, then: npx prisma generate
#    - Run npm run lint to check for regressions
```

## Skill Usage Guidelines

| When to Invoke | Skill | Tasks |
| ------------- | ----- | ----- |
| Creating new pages/components | `web-design-guidelines` | UI design, Tailwind patterns, shadcn/ui consistency |
| Modifying business logic/forms | `webapp-testing` | Zod validation, API testing, server action verification |
| Prisma schema changes | `prisma-client-api` | Schema modification, migrations, query troubleshooting |
| General skill discovery | `find-skills` | `npx skills find <query>` to search ecosystem |

## Important Notes

- **Never** commit actual `.env` values — env var names only are documented in `context/environment-setup.md`
- **Always** run `npx prisma generate` after Prisma schema changes
- **Follow** the modification guidelines in `context/agents.md` before making any changes
- **Prefer extending** existing components/APIs over creating new ones (per `context/ai-workflow-rules.md`)
- **All 9 context files** should be loaded at the start of every agent session for consistent behavior

---
*This file serves as a quick-start reference. For detailed documentation, refer to the individual `context/*.md` files.*
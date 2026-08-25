# Recommended AI Agent Skills: CyberWizDev

This project has a tailored set of recommended AI-agent skills based on the actual codebase analysis.

| Skill | Why It Is Relevant | Priority | Recommended Usage |
| ----- | ------------------ | -------- | ----------------- |
| **UI/Design** | Frontend-heavy application with shadcn/ui component library, Tailwind CSS v4, and rich interactive pages | High | Use when creating/refining interfaces, adding new pages, or improving existing UI components |
| **Accessibility** | User-facing web application with forms, navigation, and chat interface — a11y is critical for public-facing sections | Medium | Use during UI review, when adding new components, or refining existing ones for screen reader support |
| **Testing** | Business logic exists (form validation, API routes, server actions); moderate quality expectation | High | Use when modifying business logic, adding API endpoints, or changing database models |
| **Backend/API** | Next.js API routes, Socket.io real-time chat, Prisma database operations, Nodemailer email sending | High | Use when adding/ modifying API routes, real-time features, or database operations |
| **Database** | MySQL via Prisma ORM with models for User, Contact, Newsletter, Chat, Subscriptions | Medium | Use when schema changes are needed, migrations, or data queries |
| **Security** | Authentication (Next-auth v5), input validation (Zod), email sending (Nodemailer) — public-facing app requires basic security review | Medium | Use when adding auth providers, modifying validation, or reviewing email handling |
| **DevOps/Deployment** | Next.js build pipeline, environment variables, Prisma migrations | Low | Use when deploying, configuring environment, or setting up CI/CD |
| **Performance** | Real-time chat, image carousels, responsive design — could benefit from optimization review | Low | Use when profiling load times, optimizing queries, or improving render performance |

## Skill Details

### 1. UI/Design

- **Purpose**: Assist with creating and refining the user interface, which is the primary touchpoint for this agency portfolio site
- **Why this project needs it**: The project has over 60 shadcn/ui components, Tailwind CSS v4 styling, and multiple page types (public + admin). New features need to match the existing design system.
- **When to use**: Creating new pages, adding components, refining layouts, responsive design adjustments, design system consistency checks
- **Tasks it handles**: New component creation, layout refinements, color/typography consistency, responsive breakup verification, shadcn/ui component generation
- **Required or optional**: Required (frontend is the main user interface)

### 2. Accessibility

- **Purpose**: Ensure the user-facing website is accessible to all users, including those with disabilities
- **Why this project needs it**: Public-facing forms, contact pages, navigation, and chat interface need proper a11y implementation (semantic HTML, screen reader labels, color contrast)
- **When to use**: Adding new components, reviewing existing UI, implementing forms, chat interface improvements
- **Tasks it handles**: Adding aria-labels, color contrast checks, keyboard navigation verification, form label association, focus visible states
- **Required or optional**: Medium (critical for public sections, optional for admin-only areas)

### 3. Testing

- **Purpose**: Validate business logic changes and prevent regressions
- **Why this project needs it**: Form validation (Zod), API routes, server actions, and Prisma operations all have logic that can break with changes
- **When to use**: Modifying business logic, adding API endpoints, changing database models, updating forms
- **Tasks it handles**: Zod schema validation, API route response testing, server action output verification, Prisma query correctness
- **Required or optional**: Required (business logic changes always need verification)

### 4. Backend/API

- **Purpose**: Assist with server-side development: API routes, real-time features, authentication, and database operations
- **Why this project needs it**: Next.js API routes (`app/`), Socket.io chat, Next-auth authentication, Prisma database operations, Nodemailer email sending
- **When to use**: Adding API routes, modifying chat functionality, adding auth providers, database schema changes
- **Tasks it handles**: API route creation/ modification, Socket.io event handling, Next-auth config, Prisma migrations, Nodemailer setup
- **Required or optional**: Required (backend features are essential for functionality)

### 5. Database

- **Purpose**: Assist with Prisma schema changes, MySQL operations, and data modeling
- **Why this project needs it**: Prisma ORM is the primary data layer with 6+ models (User, Contact, NewsletterSubscription, Newsletter, ChatMessage, ChatSession)
- **When to use**: Schema changes, migrations, complex queries, data seeding, studio operations
- **Tasks it handles**: Prisma schema modification, migration generation, Prisma Client type issues, studio UI usage
- **Required or optional**: Medium (only needed for schema/db changes)

### 6. Security

- **Purpose**: Review authentication, input validation, and handle secrets safely
- **Why this project needs it**: Next-auth v5 auth, Zod validation, Nodemailer SMTP, contact form submissions — all require security awareness
- **When to use**: Adding auth providers, modifying validation schemas, reviewing email handling, checking for injection vulnerabilities
- **Tasks it handles**: Next-auth provider config, Zod schema security, XSS prevention in inputs, secret management review
- **Required or optional**: Medium (public-facing app needs basic security review)

### 7. DevOps/Deployment

- **Purpose**: Assist with Next.js builds, environment configuration, and deployment pipeline
- **Why this project needs it**: `next build`, `prisma migrate`, environment variable management, and the `create-admin` script
- **When to use**: Deploying to production, configuring environment variables, setting up migrations
- **Tasks it handles**: `next build` troubleshooting, environment variable setup, Prisma migration commands, `create-admin` script usage
- **Required or optional**: Optional (only needed for deployment workflows)

### 8. Performance

- **Purpose**: Profile and optimize application performance
- **Why this project needs it**: Real-time chat, image carousels, portfolio gallery, and responsive design could benefit from optimization
- **When to use**: Load time profiling, query optimization, bundle size concerns
- **Tasks it handles**: Next.js performance profiling, Prisma query optimization, image optimization, bundle analysis
- **Required or optional**: Optional (useful for specific performance concerns)

## Installation / Configuration

AI agent skills have been installed via the [Skills CLI](https://skills.sh/) (`npx skills`). Skills are installed globally in `~\.agents\skills/`.

### Installed Skills (from this session)

| Skill | Source | Installed | Purpose |
| ----- | ------ | --------- | ------- |
| `web-design-guidelines` | `vercel-labs/agent-skills@web-design-guidelines` (573K installs) | ✓ | UI design patterns, Tailwind CSS v4 conventions, shadcn/ui best practices |
| `webapp-testing` | `anthropics/skills@webapp-testing` (140.7K installs) | ✓ | Zod schema validation, API route testing, server action verification |
| `prisma-client-api` | `prisma/skills@prisma-client-api` (233.9K installs) | ✓ | Prisma schema operations, migrations, database queries |

### Previously Installed Skills (before this session)

| Skill | Source | Installed | Purpose |
| ----- | ------ | --------- | ------- |
| `frontend-design` | `anthropics/skills` | ✓ | Visual design principles, typography, color systems |
| `find-skills` | `vercel-labs/skills` | ✓ | Discovery and installation of additional agent skills |

### Skill Usage Guidelines

**When to use installed skills:**

- **`web-design-guidelines`**: Use when creating/refining interfaces, adding new pages, verifying Tailwind CSS v4 patterns, or ensuring shadcn/ui component consistency
- **`webapp-testing`**: Use when modifying business logic, adding API endpoints, changing database models, or verifying Zod schema validation
- **`prisma-client-api`**: Use when making Prisma schema changes, writing migrations, performing database queries, or troubleshooting Prisma types

**How skills integrate with context files:**

- Agents should load all `context/*.md` files at the start of each session
- The `context/agents.md` workflow rules govern when and how to apply skill guidance
- `context/recommended-skills.md` provides the priority table and task descriptions
- Skill installation is tracked; new skills can be discovered via `npx skills find <query>`

### Additional Skills (to install later as needed)

The following recommended skills from `context/recommended-skills.md` do not yet have dedicated skills installed but can be invoked via the `find-skills` mechanism:

- **Accessibility** - Search with `npx skills find accessibility`
- **Security** - Search with `npx skills find security`
- **DevOps/Deployment** - Search with `npx skills find deployment`
- **Performance** - Search with `npx skills find performance`

To install any of these, run: `npx skills add <owner/repo@skill> -g -y`

### Skill Installation Commands (for future use)

| Skill Category | Example Install Command |
| ------------- | --------------------- |
| Accessibility | `npx skills add anthropics/skills@accessibility -g -y` |
| Security | `npx skills add anthropics/skills@security -g -y` |
| DevOps/Deployment | `npx skills add vercel-labs/agent-skills@deployment -g -y` |
| Performance | `npx skills add vercel-labs/agent-skills@performance -g -y` |
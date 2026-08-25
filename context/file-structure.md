# File Structure: CyberWizDev

## Root Directory

The project root contains configuration and entry-point files, with key directories for source code and assets.

### Key Files

- **`package.json`**: Project metadata, dependencies, and npm scripts
- **`tsconfig.json`**: TypeScript configuration with path aliases `@/*` → `./*`
- **`next.config.js`**: Next.js 15 configuration (App Router, image optimization)
- **`postcss.config.mjs`**: Tailwind CSS v4 configuration with `@tailwindcss/postcss` plugin
- **`eslint.config.json`**: ESLint rules extending `next/core-web-vitals`
- **`tsx`**: TypeScript execution tool (devDependency)
- **`context/`**: This directory — project context documentation for AI agents
- **`.env`, `.env.example`**: Environment variable configuration (values not committed)
- **`.gitignore`**: Git ignore rules (excludes `node_modules`, build outputs, temp files)

## `app/` Directory — Next.js 15 App Router

The primary source directory using the App Router pattern (Next.js 13+).

### `app/(main)/` — Public-Facing Pages

- **Purpose**: Marketing and informational pages accessible to all visitors
- **Pages included**:
  - `about/` — Agency about page
  - `contact/` — Contact form page
  - `portfolio/` — Project gallery showcase
  - `services/` — Services offered by the agency
  - `docs/` — Documentation or resource pages
  - `loading.tsx` — Loading skeletons for transitions
  - `page.tsx` — Homepage or default route

### `app/(admin)/` — Admin Dashboard

- **Purpose**: Authenticated area for agency staff management
- **Protected by**: Next-auth role-based access (admin role required)
- **Pages included**:
  - `login/` — Admin authentication page
  - `contacts/` — View and manage form submissions
  - `subscribers/` — Manage newsletter subscribers
  - `newsletter/` — Create and send email campaigns
  - `chat/` — Real-time chat interface
  - `page.tsx` — Dashboard homepage

### `app/api/` — API Routes

- **Purpose**: Server-side endpoints for data operations and real-time features
- **Organization**: Route handlers grouped by feature
- **Endpoints include**:
  - `chat/route.ts` — Socket.io real-time messaging
  - `contacts/route.ts` — Contact form submission API
  - `newsletter/route.ts` — Newsletter subscription and send API
  - `subscribers/route.ts` — Subscriber management API
  - Additional route handlers for admin operations

### `app/layout.tsx` — Root Layout

- **Purpose**: Global metadata, `NextThemes` provider, font configuration
- **Contains**:
  - `<html>` and `<body>` structure
  - `NextThemes` for dark/light mode switching
  - Meta tags and SEO metadata
  - Global `globals.css` import

### `app/loading.tsx` — Route Loading Skeletons

- **Purpose**: UI shown during server component loading
- **Displays**: Skeleton patterns matching expected component structure

### `app/globals.css` — Global Styles

- **Purpose**: Tailwind CSS v4 base styles and custom utilities
- **Imports**: `@tailwindcss/postcss` directives (`@tailwind base`, `components`, `utilities`)
- **Configures**: Custom color variables, responsive breakpoints, dark mode styles

## `components/` Directory — UI Component Library

### `components/ui/` — shadcn/ui Components

- **Purpose**: 40+ reusable UI components built on Radix UI + Tailwind CSS
- **Pattern**: Generated via `pnpm dlx shadcn-ui@latest add <component>`
- **Examples**: button, card, input, select, checkbox, radio-group, switch, toggle-group, slider, textarea, alert, alert-dialog, badge, collapsible, dropdown-menu, separator, sheet, tabs, toast, toaster, progress, skeleton, spinner, avatar, badge, collapsible, context-menu, drawer, hover-card, label, loader, togglegroup, divider, aspect-ratio, breadcrumb, menubar, pill, stepper
- **Also includes**: accordion, card, table, calendar, carousel, chart (recharts), context-menu, separator, stepper
- **Configuration**: `components.json` enables RSC and CSS variables

### `components/admin/` — Admin-Specific Components

- **Purpose**: Dashboard and admin-area UI elements
- **Components**: header, sidebar, newsletter-editor, and admin-focused widgets
- **Pattern**: Tailwind styling with shadcn/ui base components
- **Dependencies**: Radix UI primitives, Sonner toasts, Embla Carousel

### `components/reusable/` — General Reusable Components

- **Purpose**: Non-UI reusable components used across the app
- **Components**: Spinner (generic loading spinner)
- **Pattern**: Small, focused components without UI styling requirements

### `components/hero.tsx`, `components/header.tsx`, `components/footer.tsx`

- **Purpose**: Page-level layout components used across multiple pages
- **Pattern**: Composed of shadcn/ui components + Tailwind utilities

## `lib/` Directory — Server-Side Logic

- **Purpose**: Server-side utilities, actions, and helpers
- **Key Files**:
  - **Server actions**: Business logic for contact forms, newsletter, etc.
  - **Utilities**: Date formatting, validation helpers, format functions
  - **Prisma client**: Configured and exported from this directory
- **Path alias**: `@/lib/*` resolves to this directory

## `hooks/` Directory — Custom React Hooks

- **Purpose**: Extracted component logic for reuse
- **Common patterns**: `useAuth`, `useDebounce`, `useSearchParams`, `useTheme`
- **Naming**: camelCase with `use` prefix

## `prisma/` Directory — Database ORM

- **Purpose**: Prisma schema, migrations, and generator configuration
- **Key Files**:
  - `schema.prisma`: Database model definitions (User, Contact, NewsletterSubscription, ChatMessage, ChatSession, etc.)
  - `schema.prisma` (migrations folder): Version-controlled database migrations
  - `prisma.config.ts` or similar: Generator configuration
- **Generated**: `node_modules/.prisma/client/` — auto-generated Prisma Client
- **CLI**: `prisma generate`, `prisma migrate`, `prisma studio`

## `email/` Directory — Email Templates

- **Purpose**: Nodemailer template utilities for email sending
- **Contains**: HTML email templates for newsletters and contact form notifications
- **Used by**: `Nodemailer` SMTP configuration in `lib/` or API routes

## `hooks/` Directory — (Note: May overlap with `app/hooks`)

- **Custom hooks** for client-side logic extraction
- **Examples**: Hooks for auth, form state, debounce, theme management

## `public/` Directory — Static Assets

- **Purpose**: Unprocessed static files served as-is
- **Contents**:
  - **Images**: Hero images, portfolio screenshots, icons
  - **Favicons**: Browser tabs and bookmark icons
  - **Manifest**: PWA manifest configuration
  - **Robots.txt**: Search engine indexing rules
  - **Humans.txt**: Attribution and contact info

## `scripts/` Directory — Development Scripts

- **Purpose**: Helper scripts for common development tasks
- **Key scripts** (from `package.json`):
  - `create-admin`: Script to create admin user account
  - Any one-off data migration or seeding scripts

## `package.json` and Configuration

- **Dependencies**: Production dependencies only (no devDependencies listed in visible config)
- **Scripts**: `dev`, `build`, `start`, `lint`, `create-admin`, `postinstall`
- **Postinstall**: Runs `prisma generate` to set up Prisma Client

## `tsconfig.json` Configuration

- **Path aliases**: `@/` → `./` (enables `@/components`, `@/lib`, `@/hooks`, etc.)
- **Compiler options**: Strict mode, ES2024 targets, JSX detection
- **Module resolution**: Node16/NodeNext compatible for Next.js 15

## `context/` Directory — AI Agent Documentation

- **Purpose**: Project context files for AI coding assistants
- **Contains**: `agents.md`, `project-overview.md`, `architecture.md`, `tech-stack.md`, `coding-standards.md`, `file-structure.md`, `environment-setup.md`, `ai-workflow-rules.md`, `recommended-skills.md`
- **Never committed to application code**; documentation only
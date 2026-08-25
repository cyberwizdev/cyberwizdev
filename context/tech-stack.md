# Technology Stack: CyberWizDev

## Languages

- **TypeScript**: 5.2.2 (primary language, strict mode)
- **JavaScript**: 18.2 (React, Next.js internals)

## Runtime

- **Node.js**: Latest compatible version for Next.js 15 and dependencies
- **Browsers**: Modern ES2024 support via Next.js compilation

## Frameworks

- **Next.js 15**: Latest stable; App Router + Pages Router hybrid
  - `^15.5.2` as specified in package.json
  - App Router as default; `pages/` directory for legacy routes
  - `images: { unoptimized: true }` in next.config.js

## UI Libraries

- **shadcn/ui**: 40+ component library configured via `components.json`
  - Tailwind style: default with CSS variables enabled
  - RSC (React Server Components) enabled
- **Radix UI**: Uncontrolled component primitives (20+ components)
  - Accordion, Dialog, Dropdown Menu, Menubar, Popover, Scroll Area, Separator, Slider, Sheet, Tabs, Toast, Toggle Group
- **Lucide-react**: Icon set (default in shadcn/ui components)
- **Embla Carousel**: Carousel component for image sliders
- **Sonner**: Toast notifications (1.7.4)

## CSS/Styling System

- **Tailwind CSS v4**: `^4.1.13` - Utility-first CSS framework
  - Configured via `postcss.config.mjs` with `@tailwindcss/postcss` plugin
  - `components.json` enables CSS variables mode
  - `tailwind-merge` v2.5.2 for conditional class joining
  - Custom color palette: neutral gray scale with primary accent

## Database

- **MySQL**: Via Prisma ORM
  - `^6.15.0` as specified in package.json
  - Connection managed through Prisma Client
  - Schema in `prisma/schema.prisma`

## ORM/Query Library

- **Prisma ORM**: `^6.15.0` - Type-safe database client
  - Auto-generated Prisma Client at build time
  - Supports MySQL, migrations, and raw SQL if needed
  - Used in Server Components, API routes, and server actions

## Authentication

- **Next-auth v5**: `^5.0.0-beta.29` - Authentication for Next.js
  - JWT-based sessions
  - Role-based access (user/admin)
  - Configurable providers (Google, email, etc. in `auth.config.ts`)

## Rich Text Editing

- **Tiptap v3**: `^3.6.1` - Rich text editor framework
  - `@tiptap/react` for React integration
  - `@tiptap/starter-kit` with basic marks and paragraphs
  - Used in admin content creation areas

## Real-Time Communication

- **Socket.io**: `^4.8.1` - Real-time bidirectional event-based communication
  - Server: `app/api/chat/route.ts`
  - Client: Socket.io client integration
  - Also uses `ws` v8.18.3 as WebSocket server

## Email Sending

- **Nodemailer**: `^6.10.1` - SMTP email sending library
  - Newsletter campaigns
  - Contact form submission notifications

## Date/Time Handling

- **date-fns**: `^3.6.0` - Date utility library
  - Date formatting, comparison, and manipulation

## Validation

- **Zod**: `^3.24.1` - Type-first schema declaration and validation
  - Used for schema validation in forms and API routes
  - Integrates with TypeScript for end-to-end type safety

## Build Tools

- **Next.js build**: `next build` - Production build optimization
  - Static exports, image optimization, CSS extraction
- **ESLint**: `next lint` - Linting with Next.js core web vitals rules
- **TypeScript**: `tsc` type checking via `tsconfig.json`
- **Tsc**: Path aliases `@/*` mapping to `./*`

## Package Manager

- **npm**: Default package manager (scripts in package.json)
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
  - `lint`: `next lint`
  - `postinstall`: `prisma generate`
  - `create-admin`: Admin user creation script

## Third-Party Integrations

- **Google OAuth** (potentially): Configured in `auth.config.ts` if providers are active
- **SMTP Server**: For Nodemailer email sending (service-specific credentials)
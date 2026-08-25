# Architecture Documentation: CyberWizDev

## Overview

The project follows a **full-stack Next.js 15** architecture with a hybrid App Router + Pages Router pattern. The application is divided into public-facing pages and an admin dashboard, both sharing the same codebase but with different authentication and data access patterns.

## Frontend Architecture

### App Router Structure (`app/`)

- **`app/(main)/`**: Public-facing pages (about, contact, portfolio, services, docs)
- **`app/(admin)/`**: Admin dashboard with authenticated routes
- **`app/layout.tsx`**: Root layout with metadata, `NextThemes` for dark/mode support
- **`app/loading.tsx`**: Loading skeletons for route transitions
- **`app/globals.css`**: Global Tailwind CSS v4 styles

### Key Frontend Patterns

- **Server Components** (default): Data fetching via Prisma directly in components
- **Client Components**: Marked with `"use client"` for interactivity (chat, forms, editor)
- **Next-themes**: System preference-based dark/light mode switching
- **shadcn/ui components**: All UI built on Radix UI primitives + Tailwind CSS
- **Tailwind CSS v4**: Utility-first styling; `tailwind-merge` for conditional classes

### Pages Router Legacy (`pages/`)

- Contains legacy API routes and pages
- Some API routes still in use; new development prefers App Router

## Backend Architecture

### Server-Side Logic (`lib/`)

- **Server actions**: Business logic encapsulated in `lib/actions/`
- **Utilities**: Helper functions for validation, formatting, etc.
- **Prisma client**: Database operations via `@prisma/client`

### API Routes (`app/api/`)

- **Chat endpoints**: Socket.io integration for real-time messaging
- **Contact form**: POST submissions to `prisma.Contact` model
- **Newsletter**: Subscription management and email sending via Nodemailer
- **Admin routes**: Protected routes for dashboard data (contacts, subscribers)

### Real-Time Communication

- **Socket.io v4.8.1**: Bi-directional real-time client-server communication
- **Chat messages**: Persisted in Prisma `ChatMessage` model
- **Chat sessions**: Managed via `ChatSession` model
- Both server (`app/api/chat/route.ts`) and client sockets exist

## Database Architecture

### Prisma ORM (`prisma/`)

- **MySQL** as the database backend
- **Schema**: Defines `User`, `Contact`, `NewsletterSubscription`, `Newsletter`, `ChatMessage`, `ChatSession`, and auth models
- **Migrations**: Managed via Prisma migrate workflow
- **Read/write**: Server Components use Prisma client directly; API routes use server actions or direct Prisma calls

### Database Models (Key Ones)

- `User`: Extended by Next-auth; includes role (user/admin)
- `Contact`: Form submissions from public contact form
- `NewsletterSubscription`: Email subscriptions for marketing
- `Newsletter`: Email campaign data and status
- `ChatMessage`: Individual chat messages with session links
- `ChatSession`: Chat session tracking

## Authentication & Authorization

### Next-auth v5 (`auth.config.ts`, `auth.ts`)

- **JWT-based sessions**: Stateless token management
- **Role-based access**: `role` field on User model distinguishes `user` vs `admin`
- **Protected routes**: Admin dashboard routes under `app/(admin)/` require authentication
- **Middleware**: Potential Next.js middleware for route protection (not fully implemented everywhere)

### Session Management

- Tokens stored in HTTP-only cookies or localStorage
- Refresh token flow handled by Next-auth internally
- Admin middleware checks `session.user.role === 'admin'`

## External Services

### Email Service (Nodemailer)

- **SMTP**: Transactional emails and newsletter sends
- **Newsletter campaigns**: Admin-initiated sends to subscriber list
- **Contact form notifications**: Emails sent when users submit the contact form

### DNS/Hosting

- Deployed at cyberwizdev.com.ng (specific platform not inspected in detail)

## State Management

- **React state**: Local component state for forms, modals, UI interactions
- **Socket.io state**: Real-time chat messages and sessions shared via Socket.io server
- **URL state**: Next.js navigation and query parameters
- **Theme state**: `next-themes` for dark/light mode preference

## File/Storage Systems

- **Public assets**: `public/` directory for static files (images, favicons)
- **No user uploads**: No file storage system beyond database records
- **Email templates**: `email/` directory with Nodemailer template utilities

## Communication Between Components

### Client ↔ Server

- **Server Components**: Direct Prisma calls; no prop drilling needed
- **API Routes**: Explicit HTTP requests (GET/POST) via fetch or form submission
- **Server actions**: Direct function calls from client components (`server action` attribute)

### Server ↔ Database

- **Prisma Client**: Type-safe database queries and mutations
- **Batch operations**: Where possible for performance

### Server ↔ External Services

- **Nodemailer**: SMTP email sending (fire-and-forget or awaited)
- **Socket.io**: Real-time message broadcasting to connected clients

## Architectural Boundaries

1. **Public vs Admin**: Separate directory structures (`app/(main)` vs `app/(admin)`) with different auth requirements
2. **Server vs Client**: Clear boundary; Server Components for data fetching, Client Components for interactivity
3. **API vs Direct**: API routes as the boundary for external consume; internal use prefers server actions
4. **Auth checkpoints**: Next-auth session verification at route middleware or component level
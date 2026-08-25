# Project Overview: CyberWizDev

## What the Project Does

CyberWizDev is a web development agency portfolio website (cyberwizdev.com.ng) showcasing custom software development, web design, and mobile app solutions. It serves as a marketing platform and lead generation tool for the agency.

## Main Purpose

- Display agency portfolio and case studies
- Generate client inquiries via contact forms
- Manage newsletter subscriptions
- Provide real-time chat support
- Display services and expertise

## Major Features

### Public-Facing Features

- **Portfolio gallery**: Display of past projects and case studies
- **Services page**: Overview of web development, design, and mobile app services
- **Contact form**: Lead capture form submissions stored in database
- **Newsletter subscription**: Email sign-up for updates and marketing
- **About page**: Agency information and team details

### Admin/Dashboard Features

- **Admin login**: Authentication via Next-auth with role-based access
- **Contact management**: View and respond to form submissions
- **Newsletter management**: Create and send email campaigns
- **Subscriber list**: Manage newsletter subscribers
- **Real-time chat**: Socket.io-powered chat interface for client support

### Technical Features

- **Real-time chat**: Socket.io integration for live messaging
- **Email sending**: Nodemailer for newsletter campaigns and contact form notifications
- **Rich text editing**: Tiptap editor for content creation
- **Responsive design**: Mobile-first layout using Tailwind CSS v4
- **Dark mode**: Next-themes support for light/dark theme switching

## Target Users

- Potential clients exploring the agency's services
- Existing clients seeking support via chat
- Subscribers receiving newsletter updates
- Agency staff managing contacts and newsletters

## Main Application Flows

### visitorFlow

1. User lands on homepage or enters via portfolio/services pages
2. Explores agency capabilities and past work
3. Submits contact form or newsletter sign-up
4. Receives confirmation (email or on-page)
5. May engage with real-time chat if available

### adminFlow

1. Admin navigates to `/admin` login page
2. Authenticates with credentials (Next-auth)
3. Gains access to dashboard with role-based permissions
4. Views and manages contacts, subscribers, and newsletters
5. Sends email campaigns via Nodemailer
6. Engages with users via real-time chat

### newsletterFlow

1. User submits email via newsletter form
2. Subscription recorded in Prisma database
3. Subscriber added to list for future campaigns
4. Admin can trigger email sends via dashboard
5. Nodemailer sends emails to subscriber list

## Important Business Logic

- **Role-based access**: Users have `user` or `admin` roles; admin-only routes protected by Next-auth middleware
- **Contact form submissions**: Stored in Prisma `Contact` model; admins can view and respond
- **Newsletter subscriptions**: Managed via `NewsletterSubscription` model; emails sent via Nodemailer
- **Chat persistence**: Chat messages stored in Prisma `ChatMessage` model; sessions via `ChatSession`
- **Authentication**: Next-auth 5.0-beta with JWT; Google/oAuth providers may be configured

## Major Integrations

- **Prisma ORM**: MySQL database for all data (contacts, subscribers, users, chat, newsletters)
- **Next-auth v5**: Authentication and session management
- **Socket.io**: Real-time bi-directional communication for chat
- **Nodemailer**: Email sending for newsletters and contact form notifications
- **shadcn/ui**: UI component library built on Radix UI and Tailwind CSS
- **Tiptap**: Rich text editor for content management
- **Recharts**: Data visualization for portfolio/stats display
- **Embla Carousel**: Image carousel for portfolio display

## High-Level Request/Data Flow

```
Browser --> Next.js App Router (Server Components)
    |
    +--> API Routes (app/api/): 
    |    +--> Chat: Socket.io real-time handling
    |    +--> Contacts: POST form submission -> Prisma -> MySQL
    |    +--> Newsletter: POST subscription -> Prisma -> MySQL
    |    +--> Admin: GET/POST dashboard data -> Prisma -> MySQL
    |
    +--> UI Components (shadcn/ui + Tailwind CSS)
    |
    +--> Prisma Client --> MySQL Database
    |
    +--> Nodemailer -> SMTP Server (email sending)
    |
    +--> Socket.io Server -> Connected Clients (chat)
```
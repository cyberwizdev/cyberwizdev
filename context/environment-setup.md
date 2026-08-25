# Environment Setup: CyberWizDev

## Required Runtime

- **Node.js**: Latest LTS version (compatible with Next.js 15, TypeScript 5.2)
  - Version managers: `nvm`, `fnm`, or `asdf` recommended for version switching
  - Minimum recommended: Node 18+ for modern JavaScript features and Next.js 15

## Package Manager

- **npm** (default): Version bundled with Node.js
  - All scripts in `package.json` use npm
  - `pnpm` or `yarn` may work but are not configured
- **Postinstall**: `prisma generate` runs automatically after `npm install`

## Installation Commands

```bash
# 1. Clone the repository
git clone <repository-url>
cd cyberwizdev

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Copy .env.example if it exists, or create .env
cp .env.example .env  # If .env.example exists

# 4. Install Prisma client
npx prisma generate

# 5. Set up the database
# - Create a MySQL database
# - Update DATABASE_URL in .env if needed
# - Run migrations: npx prisma migrate dev --init
# - Or run: npx prisma migrate reset (caution: destructive)

# 6. Start the development server
npm run dev
```

## Development Commands

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start Next.js development server (`next dev`) with hot reloading |
| `npm run build` | Create production build (`next build`) |
| `npm run start` | Start production server (`next start`) |
| `npm run lint` | Run ESLint (`next lint`) to check for code issues |
| `npm run create-admin` | Create default admin user (script defined in package.json) |

## Build Commands

- `npm run build`: Production build with optimization
  - Output: `.next/` directory with compiled assets
  - Includes: TypeScript checking, CSS extraction, image optimization
  - Prerequisite: `npm run lint` should pass first

## Test Commands

- `npm run lint`: ESLint checking (primary test/dev command)
- Check for additional test scripts in `package.json` if present
- No formal test framework (Jest/Vitest) configuration detected in current setup
- If tests exist, they may be run via `npm test` or direct test runner commands

## Lint Commands

- `npm run lint`: ESLint with Next.js core web vitals rules
- Config: `eslint.config.json` extends `next/core-web-vitals`
- Disabled rules: `react/unescaped-entities` disabled (per ESLint config)
- Recommended: Run before commits; fix all warnings before pushing

## Formatting Commands

- No dedicated formatting tool detected (e.g., Prettier)
- ESLint may handle some formatting; check `.eslintrc` or `eslint.config.json`
- If Prettier is installed, run `npx prettier --write <files>` manually

## Environment Variables

### Detected Variables (names and purpose only, values not shown)

| Variable | Purpose |
| -------- | -------- |
| `DATABASE_URL` | MySQL connection string for Prisma ORM (e.g., `mysql://user:pass@host:port/db`) |
| `NEXTAUTH_URL` | Next-auth callback URL (domain for OAuth callbacks) |
| `NEXTAUTH_SECRET` | Secret key for JWT session signing (Next-auth v5) |
| `EMAIL_HOST` | SMTP host for Nodemailer (e.g., `smtp.gmail.com`) |
| `EMAIL_PORT` | SMTP port (e.g., `587` for TLS, `465` for SSL) |
| `EMAIL_USER` | SMTP username for authentication |
| `EMAIL_PASSWORD` | SMTP password or app-specific token |
| `EMAIL_FROM` | Default sender email address for newsletters/contact forms |

### How to Obtain

- **DATABASE_URL**: From MySQL database host; include password, port, and database name
- **NEXTAUTH_URL**: The production/domain URL where the app is running (e.g., `https://cyberwizdev.com.ng`)
- **NEXTAUTH_SECRET**: Random secure string (32+ characters); generate with `openssl rand -hex 32`
- **EMAIL\***: From SMTP service account (SendGrid, Mailgun, Gmail, etc.)
- Values must be kept secret; never commit actual values to version control

### `.env.example` (If Present)

- May exist at root with placeholder values (e.g., `DATABASE_URL=mysql://user:pass@localhost/cyberwizdev`)
- **Never copy actual values** from example into committed code
- Use only as reference for required variable names

## Configuration Files

- **`next.config.js`**: Next.js configuration; may need adjustment for custom domains, image domains, or environment variable prefixes
- **`postcss.config.mjs`**: Tailwind CSS v4 config; typically no changes needed
- **`tsconfig.json`**: TypeScript paths already configured; adjust only for new directory structures
- **`prisma/schema.prisma`**: Database schema; modify to add/remove models, then run `prisma generate`
- **`components.json`**: shadcn/ui configuration; used by the `shadcn-ui` CLI for adding components

## Database Setup

1. **Create MySQL database**: `CREATE DATABASE cyberwizdev;`
2. **Update `.env`**: Set `DATABASE_URL` to connection string
3. **Run migrations** (if not using reset):
   ```bash
   npx prisma migrate dev --name init
   # Or for existing projects:
   npx prisma migrate make <migration_name>
   npx prisma migrate deploy
   ```
4. **Generate Prisma Client**: `npx prisma generate`
5. **Seed initial data** (if needed): Use `prisma studio` or custom seed scripts
6. **Verify connection**: `npx prisma studio` opens browser UI at `http://localhost:5555`

## External Services

### SMTP Email Service

- Required for newsletter sends and contact form notifications
- Configure `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASSWORD` in `.env`
- Nodemailer configuration may use well-known services (Gmail, SendGrid, Mailgun) or custom SMTP

### OAuth Providers (If Configured)

- Google OAuth or other providers configured in `auth.config.ts`
- Requires CLIENT_ID and CLIENT_SECRET environment variables
- Callback URLs must match `NEXTAUTH_URL` settings

## Migration/Seed Commands

```bash
# Create a new migration
npx prisma migrate dev --name <descriptive_name>

# Apply pending migrations
npx prisma migrate deploy

# Open Prisma Studio (visual DB browser)
npx prisma studio

# Generate Prisma Client after schema changes
npx prisma generate
```
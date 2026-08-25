# Coding Standards: CyberWizDev

## Naming Conventions

### File Naming

- **Components**: PascalCase `.tsx` (e.g., `Button.tsx`, `Input.tsx`)
- **Utility files**: camelCase `.ts` (e.g., `utils.ts`, `validation.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`, `useDebounce.ts`)
- **API routes**: `route.ts` within `app/api/` directories
- **Test files**: `__tests__` or `.test.ts/.test.tsx` suffix

### Component Naming

- **shadcn/ui components**: Follow existing naming (e.g., `ui/button.tsx`, `ui/input.tsx`)
- **Admin components**: `components/admin/` prefix (e.g., `Sidebar.tsx`, `NewsletterEditor.tsx`)
- **Reusable components**: `components/reusable/` for shared non-UI elements
- **Page components**: `app/(main)/Page.tsx` or `app/(admin)/Page.tsx`

### Function Naming

- **camelCase** for all functions
- **Verbs for actions**: `fetchContacts()`, `sendNewsletter()`, `handleSubmit()`
- **Booleans prefixed with "is", "has", "can"**: `isAuthenticated`, `hasUnreadMessages`
- **Server actions**: Named descriptively (e.g., `createContact`, `subscribeNewsletter`)

### Variable Naming

- **camelCase** for all variables
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_ATTEMPTS`, `PAGE_SIZE`)
- **Loop counters**: `i`, `j`, `index` are acceptable
- **Object keys**: camelCase matching API/db schemas

## Type Conventions

- **TypeScript strict mode**: Enabled in `tsconfig.json`
- **Explicit types**: Prefer annotated types over inference when complex
- **Avoid `any`**: Use specific types or generic placeholders
- **Zod schemas**: Used for runtime validation; types inferred automatically
- **Prisma types**: `@prisma/client` types used for database operations

## Import Organization

- **Third-party imports**: From `node_modules` (e.g., `react`, `next`, `zod`)
- **Project-internal imports**: Using path aliases `@/` mapped to `./` (from `components.json`)
  - `@/components/ui/*` for UI components
  - `@/lib/*` for utilities and server actions
  - `@/hooks/*` for custom hooks
  - `@/app/*` for page/route components
- **Sorted imports**: External libs first, then project aliases, then CSS/Tailwind
- **No relative path "../.."**: Always use `@/` aliases when possible

## Component Structure

### shadcn/ui Component Pattern

```
ComponentName/
  ComponentName.tsx   - Main component with Tailwind styling
  ComponentName.tsx   - (Optional) Variant styles
```

- **Always use `cn` from `class-variance-authority` or `tailwind-merge`** for conditional class joining
- **Use Radix UI primitives** under the hood (never bypass them)
- **Example pattern** from existing code:

```tsx
import { cn } from "@/lib/utils";

export interface ButtonProps {
  variant?: "default" | "secondary" | "destructive";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export const Button = ({
  variant = "default",
  size = "default",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      variants[variant],
      sizes[size],
      className
    )} {...props} />
  );
};
```

### Form Components

- Use `zod` for validation schema definition
- Connect forms via `react-hook-form` or native HTML forms
- Error messages displayed using Tailwind utility classes and shadcn/ui `FormField` pattern

## API Patterns

### Route Handlers (`app/api/`)

- **GET**: Return data (JSON or redirect)
- **POST**: Create resources; return success status or created object
- **PUT/PATCH**: Update resources
- **DELETE**: Remove resources
- **Error handling**: Use `NextResponse.json()` with appropriate status codes
- **Validation**: Zod schemas validated before business logic

### Response Format

```typescript
// Success
NextResponse.json({ success: true, data }, { status: 200 })

// Error
NextResponse.json({ success: false, error: "Message" }, { status: 400 })
```

## Error Handling

### Global Error Handling

- **Next.js error boundaries**: `error.tsx` in route directories
- **API error responses**: JSON with `success: false` and error message
- **500 errors**: Stack traces in development; generic message in production

### Component-Level

- **Try/catch** in server actions and API routes
- **User-friendly messages**: Avoid exposing stack traces to end users
- **Loading states**: `Skeleton` or `Spinner` components during async operations

## Validation

- **Zod schemas** for all input validation (forms, API bodies)
- **Server-side only**: Validation runs on server; client validation is UX-only
- **Schema reuse**: Zod schemas often inferred to TypeScript types via `.parse()` or `.safeParse()`

## State Management

- **Local component state**: `useState` for form values, toggles, modals
- **URL state**: `useSearchParams` for filter/ pagination state
- **Socket.io state**: Real-time data via Socket.io server events
- **Theme state**: `next-themes` `useTheme` hook for dark/light mode
- **Global state**: Minimal; prefer context or URL state over global stores

## Styling Conventions

- **Tailwind CSS v4 utility classes**: Primary styling approach
- **Custom CSS**: Only when Tailwind cannot achieve the effect; kept minimal
- **CSS variables**: Used for colors, spacing, and typography (per `components.json` config)
- **Responsive**: `sm`, `md`, `lg`, `xl`, `2xl` breakpoints used consistently
- **Dark mode**: `dark:` variants enabled via `next-themes` and Tailwind config
- **Component styling**: shadcn/ui components use `cn()` for variant classes

## Comments/Documentation Conventions

- **JSDoc** for functions and exported APIs
- **Component docstrings**: Brief description of purpose and props
- **No block comments** for code explanation; use descriptive variable/function names instead
- **TODO comments**: `// TODO: description` format when needed
- **Markdown documentation**: Kept in `context/` directory; not embedded in code

## Testing Conventions

- **Test placement**: `__tests__` directories or `.test`/`.test.tsx` files
- **Unit tests**: Individual functions and utilities (`lib/` actions, validation)
- **Integration tests**: API routes and component interactions (if test suite exists)
- **Test framework**: Whatever is configured; look for Jest, Vitest, or similar config
- **Mocking**: Prisma client mocked in tests that don't hit the database
- **Coverage**: Aim for business logic coverage; UI component logic tested separately
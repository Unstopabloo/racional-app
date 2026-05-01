# Racional App

## Commands
- `pnpm dev` — Dev server
- `pnpm build` — Production build
- `pnpm test` — Run tests with Vitest
- `pnpm lint` — ESLint
- `pnpm format` — Prettier

## Architecture
- React 19 SPA with TanStack Router (file-based routing)
- TanStack Query for server state management
- Tailwind CSS v4 + shadcn/ui components
- Zod for validation
- Path alias: `@/*` → `./src/*`

## Core Layer Convention
Each feature module lives in `src/core/{feature}/` with this structure:
- `{feature}.domain.ts` — Zod schemas, types, enums, validation
- `{feature}.infrastructure.ts` — API calls, DTO transformers
- `{feature}.use-case.ts` — Business logic, orchestration
- `{feature}.queries.ts` — TanStack Query options factories
- `{feature}.query-keys.ts` — Query key hierarchy
- `{feature}.mutations.ts` — TanStack mutation hooks, cache invalidation

## Component Convention
- Compound component pattern: component.tsx + component.context.tsx
- UI primitives in `src/components/ui/` (shadcn)
- Feature components in `src/components/{feature}/`
- No barrel files (no index.ts re-exports)

## Route Convention
- File-based routing in `src/routes/`
- `routeTree.gen.ts` is auto-generated — DO NOT EDIT
- Routes mount components, no rendering logic in route files
- Router context provides `queryClient` for TanStack Query integration

## Code Style
- Code in English
- ESLint + Prettier for formatting
- Single quotes, no semicolons, trailing commas

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start dev server (Express + Vite HMR) on port 5000
npm run build            # Build frontend (Vite → dist/public)
npm run build:server     # Bundle server (tsx script/build.ts → dist/index.cjs)
npm run start            # Run production build
npm run check            # TypeScript type check (no emit)

npm run db:push          # Apply Prisma schema to DB (no migration file)
npm run db:generate      # Regenerate Prisma client after schema changes
npm run db:studio        # Open Prisma Studio at localhost:5555
npm run db:seed:practice # Seed practice catalog
npm run db:seed:question:material-chem  # Seed material chemistry question set

npm run docker:db        # Start only PostgreSQL + pgAdmin (dev)
npm run docker:db:stop   # Stop DB containers
```

### First-time setup

```bash
npm run docker:db        # Start Postgres (localhost:5432, pgAdmin at localhost:5050)
npx prisma generate
npx prisma db push
npm run db:seed:practice
npm run dev
```

Copy `.env.example` → `.env`. Required vars: `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `SESSION_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`.

---

## Architecture

### Monorepo layout

Single repo with three code zones sharing one `package.json`:

| Path | Role |
|------|------|
| `client/` | React SPA (Vite, rooted at `client/`) |
| `server/` | Express API + serves the built SPA in production |
| `shared/` | Types and Zod schemas imported by both sides |

**Path aliases** (vite + tsconfig): `@` → `client/src`, `@shared` → `shared/`.

### Request lifecycle

In **dev**, `npm run dev` runs only the Express server (`tsx server/index.ts`). Vite runs as middleware inside Express (`server/vite.ts` → `setupVite`), so both API and HMR go through port 5000.

In **production**, `server/static.ts` (`serveStatic`) serves `dist/public`; the server bundle is `dist/index.cjs`.

### Auth — two parallel systems

There are **two auth systems** that coexist:

1. **Passport/session** (`server/auth.ts`) — `POST /api/register`, `POST /api/login`, `POST /api/logout`, `GET /api/user`. Uses `express-session` + `passport-local`. Password hashing via Node `crypto.scrypt`.

2. **JWT** (`server/routes/authRoutes.ts` → `server/controllers/authController.ts`) — `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`, `GET /api/auth/me`. Issues short-lived access tokens (15 min) + HttpOnly cookie refresh tokens.

The **frontend exclusively uses the JWT system** (`client/src/lib/api.ts`, `useAuth` hook). The access token is stored in **module-level memory** (not localStorage), refreshed automatically every 10 min via `setInterval` in `useAuth`. All protected API calls attach `Authorization: Bearer <token>`.

The `authenticate` middleware (`server/middleware/authMiddleware.ts`) validates the JWT Bearer token and attaches `req.user: JwtPayload` (contains `userId`).

### Practice system

The practice feature is the core product domain:

- **Catalog** is seeded from `server/services/practiceCatalog.ts` and synced on first service call via `syncPracticeCatalog()` (runs once per process via a module-level promise).
- **`PracticeQuestionSet`** stores question content as JSON blobs (`stem: Json`, `questions: Json`). The stem is an array of typed content blocks (text, equation, image, table, code, video — validated by `stemBlockSchema` in `practiceRoutes.ts`). Questions are MCQ with `correctOptionIndex`.
- **Progress** is tracked per `(userId, subcategoryId, questionKey)` in `PracticeQuestionProgress`.
- **Practice session flow**: `Practice` → `PracticeCategory` → `PracticeSetup` → `PracticeConfirm` → `PracticeSession` (routes: `/dashboard/practice/:category/:subcategory/setup|confirm|session`).

### Frontend state

- Routing: **wouter** (not React Router).
- Server state: **TanStack Query** (`client/src/lib/queryClient.ts`).
- Forms: **react-hook-form** + **zod** resolvers.
- UI: **shadcn/ui** (Radix primitives + Tailwind). Component config in `components.json`.
- Dashboard pages hide the global `Navbar`/`Footer` (checked via `location.startsWith("/dashboard")` in `App.tsx`).

### Payments

Stripe integration: `server/routes/paymentRoutes.ts`, `server/controllers/paymentController.ts`, `server/controllers/webhookController.ts`. Stripe webhook receives raw body (`express.raw`) registered before the JSON middleware in `server/index.ts`.

### Shared models

`shared/models/auth.ts` and `shared/models/practice.ts` hold TypeScript types used by both server and client. `shared/schema.ts` holds Zod schemas for API input validation.

### Database

Prisma with PostgreSQL. Schema at `prisma/schema.prisma`. Key models: `User`, `Subscription`, `Payment`, `PracticeCategory`, `PracticeSubcategory`, `PracticeQuestionSet`, `PracticeQuestionProgress`. After schema changes run `npx prisma generate` then `npx prisma db push` (dev) or generate a migration (prod).

---

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **Healthcare-Educate** (1584 symbols, 2636 relationships, 113 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/Healthcare-Educate/context` | Codebase overview, check index freshness |
| `gitnexus://repo/Healthcare-Educate/clusters` | All functional areas |
| `gitnexus://repo/Healthcare-Educate/processes` | All execution flows |
| `gitnexus://repo/Healthcare-Educate/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->

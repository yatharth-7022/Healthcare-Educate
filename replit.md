# SmashMed - Healthcare Education Platform

## Overview

SmashMed is a professional healthcare education platform targeting graduate-entry medicine aspirants (GAMSAT) in Australia. The application is a full-stack web platform built with a React frontend and Express backend, featuring a clean, minimal, and premium SaaS landing page design. The platform includes user authentication, newsletter subscription functionality, and is styled to feel trustworthy, academically serious, and professional.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/`
- Reusable UI components in `client/src/components/ui/`
- Layout components in `client/src/components/layout/`
- Custom hooks in `client/src/hooks/`
- Path aliases configured: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend Architecture
- **Framework**: Express 5 with TypeScript
- **Runtime**: Node.js with tsx for development
- **Database ORM**: Prisma Client
- **Authentication**: Passport.js with local strategy and session-based auth
- **Session Storage**: Express sessions with memory store (development)

The backend follows a modular structure:
- `server/index.ts` - Application entry point and middleware setup
- `server/routes.ts` - API route definitions
- `server/auth.ts` - Authentication configuration with Passport.js
- `server/db.ts` - Prisma client initialization
- `server/vite.ts` - Vite dev server integration
- `server/static.ts` - Static file serving for production

### Shared Code
- `shared/schema.ts` - Zod validation schemas for API inputs
- `shared/routes.ts` - Type-safe API route definitions
- `shared/models/` - Drizzle ORM models (for session/user storage)

### Data Storage
- **Primary Database**: PostgreSQL via Prisma ORM
- **Schema Location**: `prisma/schema.prisma`
- **Connection**: Uses `DATABASE_URL` environment variable
- **Alternative**: Drizzle ORM models exist in `shared/models/auth.ts` for session management

### Authentication Flow
- Password hashing using scrypt with random salt
- Session-based authentication with Passport.js local strategy
- Protected routes check authentication status via `/api/auth/user`
- Login/logout endpoints handle session creation and destruction

### Design System
- Custom color palette with warm ivory background (#FAF8F4)
- Premium lavender/purple accent colors (#674EA7, #B4A7D6)
- Typography: Source Sans 3 for headings, IBM Plex Sans for body
- CSS variables defined in `client/src/index.css`
- Tailwind config extended with custom fonts and colors

## External Dependencies

### Database
- **PostgreSQL**: Primary database (connection via `DATABASE_URL` environment variable)
- **Prisma**: ORM for database operations with schema at `prisma/schema.prisma`

### Authentication
- **Passport.js**: Authentication middleware with local strategy
- **express-session**: Session management

### UI/Frontend Libraries
- **Radix UI**: Accessible component primitives (accordion, dialog, dropdown, tabs, etc.)
- **Framer Motion**: Animation library
- **TanStack React Query**: Server state management
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Build & Development
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server bundling for production
- **TypeScript**: Type checking across the codebase

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret for session signing (optional, has fallback)
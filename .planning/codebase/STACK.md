# Technology Stack

**Analysis Date:** 2026-04-25

## Languages

**Primary:**
- TypeScript 5.x - All application code and type definitions.
- SQL - Supabase/PostgreSQL schema and migrations.

**Secondary:**
- JavaScript/MJS - Configuration files (Next.js, ESLint, PostCSS).

## Runtime

**Environment:**
- Node.js (Version not explicitly specified in package.json, but using Next.js 16/React 19).
- Browser environment for client components.

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present.

## Frameworks

**Core:**
- Next.js 16.2.3 - Full-stack framework with App Router.
- React 19.2.4 - UI library.

**UI & Styling:**
- Material UI 9.0.0 - Primary component library.
- Tailwind CSS 4 - Utility-first styling.
- Emotion - CSS-in-JS engine for MUI.

**Testing:**
- None identified (no test runner in package.json).

**Build/Dev:**
- TypeScript 5.x - Static typing.
- PostCSS - For Tailwind processing.

## Key Dependencies

**Critical:**
- Supabase (@supabase/supabase-js, @supabase/ssr) - Backend-as-a-Service for DB, Auth, and Storage.
- Framer Motion 12.38.0 - High-performance animations.
- Lenis 1.3.21 - Smooth scrolling integration.
- React Hook Form 7.72.1 - Form state management.
- Zod 4.3.6 - Schema validation.

**Infrastructure:**
- @vercel/analytics & @vercel/speed-insights - Performance monitoring.
- Next-themes - Theme management (dark/light mode).

## Configuration

**Environment:**
- `.env.local` - Local environment variables (Supabase keys, etc.).

**Build:**
- `next.config.ts` - Next.js configuration.
- `tsconfig.json` - TypeScript configuration.
- `eslint.config.mjs` - ESLint configuration.

## Platform Requirements

**Development:**
- Windows/macOS/Linux with Node.js installed.
- Supabase project access.

**Production:**
- Optimized for Vercel deployment (includes Vercel-specific analytics).

---

*Stack analysis: 2026-04-25*
*Update after major dependency changes*

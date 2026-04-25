# Architecture Overview

**Analysis Date:** 2026-04-25

## System Pattern

The codebase follows the **Next.js App Router** architecture, leveraging React Server Components (RSC) for data fetching and Client Components for interactivity.

### Core Architectural Decisions

1.  **Internationalization (i18n):**
    - URL-based localization using dynamic routes: `app/[lang]`.
    - Dictionaries stored in `app/[lang]/dictionaries/` as JSON files.
    - Supported languages: `en-CA`, `fr-CA`, `ar-SA`, `tr-TR`, `ur-PK`.

2.  **Resilient Data Fetching:**
    - A "fallback-first" or "fallback-capable" strategy is used.
    - `lib/supabase/resilient.ts` handles fetching from Supabase with automatic fallbacks to local JSON files in `lib/supabase/fallback/` if the database is unavailable.

3.  **Hybrid Styling System:**
    - Uses **Material UI (MUI)** for structural components and complex UI elements.
    - Uses **Tailwind CSS** for layout, spacing, and rapid utility-based styling.
    - Theme synchronization across server and client to prevent hydration mismatches.

4.  **Provider Pattern:**
    - Heavy use of context providers in `components/providers/` to manage cross-cutting concerns:
        - `AuthProvider`: Supabase authentication state.
        - `MuiProvider`: Material UI theme and caching.
        - `ThemeProvider`: Next-themes integration.
        - `SmoothScrollProvider`: Lenis scrolling logic.

## Component Strategy

- **Domain-Driven Organization:** Components are grouped by feature (e.g., `about`, `blog`, `home`, `projects`) rather than just technical type.
- **Shared UI:** Generic reusable components are in `components/ui/` or `components/shared/`.
- **Page Clients:** Large interactive pages often use a "PageClient" pattern (e.g., `ProjectsPageClient.tsx`) to separate server logic from heavy client interactivity.

## Data Layer

- **Supabase Proxy:** `lib/supabase/proxy.ts` suggests a middleware or proxy layer for data requests.
- **SQL Schema:** Managed in `lib/db/schema.sql`, reflecting the database structure in Supabase.

---

*Architecture analysis: 2026-04-25*

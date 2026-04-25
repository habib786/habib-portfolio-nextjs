# External Integrations

**Analysis Date:** 2026-04-25

## Primary Services

### Supabase
- **Purpose:** Database (PostgreSQL), Authentication, and Storage.
- **Type:** Backend-as-a-Service (BaaS).
- **Client Implementation:**
  - `lib/supabase/client.ts`: Client-side access.
  - `lib/supabase/server.ts`: Server-side access (Server Components/Actions).
  - `lib/supabase/resilient.ts`: Wrapper for robust data fetching with fallbacks.
- **Data Flow:** Fetches content (blog posts, projects, settings) with JSON fallbacks in `lib/supabase/fallback/`.

### Vercel
- **Purpose:** Deployment and Monitoring.
- **Tools:**
  - Analytics (`@vercel/analytics`).
  - Speed Insights (`@vercel/speed-insights`).

## Library Integrations

### Material UI (MUI)
- **Integration:** Custom theme provided via `MuiProvider` in `components/providers/MuiProvider.tsx`.
- **Theming:** `lib/mui-theme.ts` defines the visual language.
- **Interoperability:** Used alongside Tailwind CSS.

### Lenis
- **Purpose:** Smooth scrolling.
- **Integration:** `SmoothScrollProvider` wrapping application layout.

## API & Webhooks

- **Rate Limiting:** `rate-limiter-flexible` used in `lib/rate-limit.ts` for protecting server-side logic.
- **Image Loading:** Custom loader in `lib/image-loader.ts`.

---

*Integration analysis: 2026-04-25*

# Coding Conventions

**Analysis Date:** 2026-04-25

## Code Style

- **Naming:**
  - Components: `PascalCase` (e.g., `HeroSection.tsx`).
  - Files: `PascalCase` for components, `kebab-case` for utilities/configs.
  - Functions/Variables: `camelCase`.
- **TypeScript:** Strict typing preferred. Interfaces/Types often centralized in `lib/types/index.ts`.

## Component Patterns

- **Functional Components:** Always use functional components with standard React hooks.
- **"use client" Directive:** Strictly applied to components requiring interactivity or browser APIs.
- **Domain Organization:** Components must be placed in their respective domain folder in `components/` if they are specific to a feature.

## Styling

- **Tailwind CSS:** Preferred for layout, responsive design, and simple utility styling.
- **MUI (Material UI):** Used for complex components (Grid, Inputs, Icons) and theming.
- **Framer Motion:** Standard for all entrance/scroll animations.

## Data Fetching

- **Server First:** Fetch data in Server Components where possible.
- **Resiliency:** Use the resilient fetching pattern from `lib/supabase/resilient.ts` to ensure the UI doesn't break if the database is down.
- **Localization:** Always pass the `lang` prop to components that need localized strings from dictionaries.

---

*Conventions analysis: 2026-04-25*

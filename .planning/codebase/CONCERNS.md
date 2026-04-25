# Technical Concerns

**Analysis Date:** 2026-04-25

## Critical Risks

1.  **Hydration Mismatches:**
    - Frequent issues with MUI and Next.js App Router hydration.
    - Localization logic sometimes causes server/client text mismatches.
2.  **No Automated Tests:**
    - Lack of testing suite makes refactoring risky.
    - Regressions in localization or data fetching fallbacks are hard to catch.

## Technical Debt

- **Mixed Styling Libraries:**
    - Using both MUI/Emotion and Tailwind CSS 4 increases CSS bundle size and adds complexity to the styling mental model.
- **Complexity of Data Fetching:**
    - The Supabase + Fallback JSON pattern adds significant boilerplate and maintenance overhead for every new data-driven feature.

## Observations

- **Version Oddities:** `package.json` lists Next.js `16.2.3` and React `19.2.4`, which may be experimental or bleeding-edge versions (Next.js is currently at 15 as of late 2024). This may lead to undocumented bugs or compatibility issues with libraries like MUI.
- **Missing nvmrc:** No Node version specified, which can lead to "it works on my machine" issues.

---

*Concerns analysis: 2026-04-25*

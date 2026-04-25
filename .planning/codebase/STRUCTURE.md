# Project Structure

**Analysis Date:** 2026-04-25

## Directory Map

```text
/
├── app/                  # Next.js App Router (Routes & Layouts)
│   └── [lang]/           # Localized route segment
│       ├── (portfolio)/  # Grouped portfolio routes (blog, contact, etc.)
│       ├── dictionaries/ # Localization JSON files
│       └── layout.tsx    # Root layout
├── components/           # React Components
│   ├── about/            # About page specific components
│   ├── animations/       # Reusable animation wrappers
│   ├── blog/             # Blog feature components
│   ├── home/             # Homepage sections
│   ├── layout/           # Global UI (Navbar, Footer, Logo)
│   ├── projects/         # Project display components
│   ├── providers/        # Context Providers (MUI, Auth, Theme)
│   ├── shared/           # Cross-page UI elements
│   └── ui/               # Atomic design components (Buttons, etc.)
├── lib/                  # Core Business Logic & Utils
│   ├── db/               # SQL schemas
│   ├── hooks/            # Custom React hooks
│   ├── supabase/         # Supabase client, queries, and fallbacks
│   ├── types/            # TypeScript interfaces/types
│   └── utils.ts          # Global utility functions
├── public/               # Static assets (images, fonts)
├── scripts/              # Build/Utility scripts
└── config files          # package.json, tsconfig.json, next.config.ts, etc.
```

## Key File Patterns

- **Routes:** `app/[lang]/(portfolio)/[page]/page.tsx`
- **Page Clients:** `[PageName]PageClient.tsx` for complex client-side pages.
- **Fallback Data:** `lib/supabase/fallback/[feature].json`
- **Themes:** `lib/mui-theme.ts`

---

*Structure analysis: 2026-04-25*

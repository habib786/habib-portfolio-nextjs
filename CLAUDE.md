@AGENTS.md

# Software Quality Assurance (SQA) Task List

## 1. High Priority (Critical Functionality & Performance)
- [ ] **Sitemap Dynamic Rendering Error:** `app/sitemap.ts` uses Next.js dynamic cookies via Supabase API route handlers (`@supabase/ssr`) throws `DYNAMIC_SERVER_USAGE` error during static generation phase (`next build`).
  *Fix:* Cache API calls or use server-side data fetching that bypasses request context cookie requirement during build time.
- [ ] **Next.js Dev Server Port Conflict:** `next dev` frequently encounters "Port 3000 is in use" error (e.g. process 37416). Implement `taskkill` or process cleanup scripts or override port if active.
- [ ] **LCP Optimization:**
  *Mobile:* 5.7s (Critical). *Desktop:* 1.1s (Good).
  *Fix:* Optimize LCP image loading (priority attribute), reduce server response time, minimize render-blocking resources.

## 2. High/Medium Priority (SEO & Core Vitals)
- [ ] **Missing `robots.txt`:** Root project missing `app/robots.ts` or `public/robots.txt` for SEO crawl directing.
- [ ] **Image Optimization:** Review large asset references (`/opengraph-image.png`). Ensure modern formats (WebP/AVIF) via Next.js `<Image />` component.
- [ ] **Sitemap Page Redirect:** `/sitemap` page links to `/sitemap.xml`. Ensure renders cleanly or rely on `sitemap.xml`.

## 3. Medium Priority (UI / Component Issues)
- [ ] **Linting Setup:** `lint` script missing from `package.json`. Ensure `next lint` executes cleanly without `eslint` errors.

## 4. Low Priority (Code Cleanliness)
- [ ] **Code Minification:** Strip trailing comments/whitespace from high-traffic components (`Navbar.tsx`, `HeroSection.tsx`).
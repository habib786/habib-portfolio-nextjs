# Software Quality Assurance (SQA) Task List

## 1. High Priority (Critical Functionality & Performance)
- [ ] **Sitemap Dynamic Rendering Error:** The `app/sitemap.ts` file attempts to use Next.js dynamic cookies via Supabase API route handlers (`@supabase/ssr`) which throws a `DYNAMIC_SERVER_USAGE` error during the static generation phase (`next build`).  
      *Fix:* Ensure `sitemap.ts` caches API calls or uses server-side data fetching that bypasses the request context cookie requirement during build time. This is causing standard `next build` processes to output warnings/errors during static generation.
- [ ] **Next.js Dev Server Port Conflict:** Running `next dev` frequently encounters a "Port 3000 is in use" error (e.g. by process 37416 in prior runs). Ensure `taskkill` or process cleanup scripts are implemented securely or port is overridden if active.

## 2. High/Medium Priority (SEO & Core Vitals)
- [ ] **Missing `robots.txt`:** The root project is missing a `app/robots.ts` or `public/robots.txt` file which is essential for SEO crawl directing.
- [ ] **Image Optimization:** Review all large asset references (like `/opengraph-image.png`). Ensure they use proper modern formats (WebP/AVIF) via Next.js `<Image />` component.
- [ ] **Sitemap Page Redirect / Clean up:** The explicit `/sitemap` page provides a link to `/sitemap.xml`. Ensure this renders cleanly or just strictly rely on `sitemap.xml`.

## 3. Medium Priority (UI / Component Issues)
- [ ] **Linting Setup:** The `lint` script command was missing from `package.json` and a `lint` directory error occurred in run attempt. Ensure `next lint` executes cleanly without `eslint` errors.

## 4. Low Priority (General Code Cleanliness - Caveman Mode tasks)
- [ ] **Code Minification / Comment Stripping:** Go through core high-traffic components (`Navbar.tsx`, `HeroSection.tsx`) and strip trailing comments/white-spaces to adhere to the compressed mode requirements.

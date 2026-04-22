# Software Quality Assurance (SQA) Task List

## 1. High Priority (Critical Performance & Core Vitals)
- [ ] **LCP Optimization:** 
      *Mobile: 5.7s (Critical). Desktop: 1.1s (Good).*
      *Fix:* Optimize LCP image loading (priority attribute), reduce server response time, and minimize render-blocking resources.
- [ ] **Main-thread Work & TBT:**
      *Mobile: 630ms TBT / 6.5s Main-thread. Desktop: 70ms TBT / 2.9s Main-thread.*
      *Fix:* Reduce JavaScript execution time, eliminate long tasks (19 found on mobile), and remove unused JS (134 KiB).
- [ ] **Sitemap Dynamic Rendering Error:** Resolved `DYNAMIC_SERVER_USAGE` in `sitemap.ts`.
- [ ] **Next.js Dev Server Port Conflict:** Implement process cleanup for Port 3000 conflicts.

## 2. High/Medium Priority (Accessibility & SEO)
- [x] **Accessible Names:** Added `aria-label` to social icons, buttons, and logo links in `Navbar`, `Footer`, and `AnimatedLogo`. (Fixes Mobile/Desktop audit).
- [x] **Heading Hierarchy:** Corrected heading sequence (H1 -> H2 -> H3) in `HeroSection`, `ExperienceTimeline`, and `ProjectsSection`.
- [x] **Image Dimensional Fix:** Resolved Next.js Image prop conflicts (fill vs width/height) across all hero and project components.
- [ ] **Color Contrast:** Background and foreground colors do not have sufficient contrast.
- [x] **Viewport Scalability:** `[user-scalable="no"]` was used. Removed `maximumScale: 1` in `layout.tsx`.
- [x] **Missing `robots.txt`:** Verified `public/robots.txt` exists and is correctly configured.

## 3. Medium Priority (Best Practices & UI)
- [ ] **Legacy JavaScript:** Eliminate legacy JS patterns to save ~14 KiB.
- [ ] **Non-composited Animations:** Resolve non-composited animated elements.
- [ ] **Forced Reflow:** Resolve layout thrashing identified in both audits.
- [ ] **Efficient Cache Lifetimes:** Optimize cache headers for static assets.
- [ ] **Linting Setup:** Fix missing `lint` script and execution errors.

## 4. Low Priority (General Code Cleanliness - Caveman Mode)
- [x] **Code Minification:** Strip trailing comments and whitespace in core components (`Navbar.tsx`, `HeroSection.tsx`).
- [ ] **Sitemap Page Redirect:** Clean up the `/sitemap` vs `/sitemap.xml` redundancy.

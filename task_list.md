# Project Audit & SQA Task List

## 🛡️ Security & Best Practices
- [ ] Add `rel="noopener noreferrer"` to all external links in `Footer.tsx` and `Navbar.tsx`.
- [ ] Update `mailto` link in `Footer.tsx` to use the correct domain/email.
- [ ] Ensure all API routes (if any) have proper rate limiting or protection.

## 🔍 SEO & Metadata
- [ ] Create a `manifest.json` file in `public/` for PWA support.
- [ ] Generate multiple favicon sizes (16x16, 32x32) and link them in `layout.tsx`.
- [ ] Add `apple-touch-icon.png` for iOS users.
- [ ] Review `robots.txt` to ensure it allows crawling of all public routes.
- [ ] Verify Open Graph (`og-image.png`) dimensions and appearance on social platforms.
- [ ] Add `Twitter:site` and `Twitter:creator` tag consistency in `layout.tsx`.

## 🎨 UI & UX Improvements
- [ ] Fix placeholder resource/legal links in `Footer.tsx`.
- [ ] Improve `LoadingFallback` in `layout.tsx` with a more "premium" skeleton or branding.
- [ ] Fix potential layout shift in `Navbar` during language switching or loading state.
- [ ] Resolve CSS filter issue in `ServicesSection` (icons are hidden/tricked into white). Use native SVGs where possible.
- [ ] Add smooth transition to the `Dark Mode` / `Light Mode` switch to prevent "flash" of white.
- [ ] Standardize `getLocalizedHref` usage across all components (`ServicesSection`, `ProjectsSection`, etc.).

## 🚀 Performance & Page Load
- [ ] Optimize `HeroSection` scroll listener; use `useRef` instead of `useState` for the container ref to avoid unnecessary re-renders.
- [ ] Implement `priority` loading for below-the-fold hero images if necessary (already set for some).
- [ ] Check bundle size of `@fortawesome` icons; consider using a lighter alternative or specific imports (already using specific imports mostly).
- [ ] Audit `Google Fonts` loading strategy in `layout.tsx` (using `next/font/google`, which is good).

## 🛠️ Component & Logic Refactoring
- [ ] Refactor `middleware.ts` to be more descriptive (rename `proxy` if not actual proxying).
- [ ] Update `Navbar` and `Footer` to use the dynamic `locales` array from `dictionaries.ts` instead of hardcoded strings.
- [ ] Implement a more robust `getLocale` detection in `middleware.ts` (currently very simple).
- [ ] Fix `iconMap` in `ExperienceEducationSection` to handle missing icons gracefully (show a default icon instead of nothing).

## 🌍 Localization
- [ ] Fully externalize all hardcoded strings (e.g., "My Expert Services" in `ServicesSection.tsx`, "TECH STACK" in `TechStackSection.tsx`) into translation `.json` files.
- [ ] Verify that all strings in `HeroSection`, `ServicesSection`, etc. are fully localized in `.json` dictionaries.
- [ ] Check RTL alignment for all sections, especially `TechStack` and `ProjectsGrid`.
- [ ] Ensure that `slug` based pages (`/blog/[slug]`) correctly handle language-specific slugs.

## 🐛 Bug Fixes
- [ ] Fix `suppressHydrationWarning` on `html` and `body` in `layout.tsx` by resolving the actual hydration mismatches (likely from `ThemeProvider`).
- [ ] Check for mobile clipping in the `staggered` projects grid.
- [ ] Verify `SmoothScrollProvider` doesn't break header anchor links (`#contact-form`).

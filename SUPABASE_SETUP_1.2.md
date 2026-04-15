# Supabase Database Setup — v1.2 (Missing Seed Data)

This script adds the **seed data** for tables that were created in `SUPABASE_SETUP.md` but left empty.
Run this **after** you have already run the original script.

> ⚠️ **Note:** Two sections also include a **bug fix** for `ProjectsSection.tsx` and `FeaturedProjects.tsx`
> which were querying incorrect table names. Those are patched in-code (see below), not via SQL.

---

## 🛠️ SQL Seed Script

Go to your [Supabase Dashboard](https://app.supabase.com/) → SQL Editor → New Query, then paste and run:

```sql
-- ============================================================
-- 1. PORTFOLIO SERVICES
-- (Powers: ServicesSection.tsx)
-- ============================================================
INSERT INTO portfolio_services (number_id, title, description, icon_url, order_index)
VALUES
  ('01.', 'FULL-STACK WEB & MOBILE DEVELOPMENT',
   'End-to-end development of robust web applications and cross-platform native mobile apps that scale perfectly.',
   'https://cdn-icons-png.flaticon.com/128/1055/1055687.png', 1),
  ('02.', 'UI/UX DESIGN & WEB DESIGN',
   'Creating intuitive, engaging, and aesthetically pleasing user interfaces holding strong UX principles.',
   'https://cdn-icons-png.flaticon.com/128/1253/1253756.png', 2),
  ('03.', 'SERVERLESS ARCHITECTURE & CLOUD SOLUTIONS',
   'Designing and deploying scalable, cost-effective infrastructure using modern cloud services and serverless setups.',
   'https://cdn-icons-png.flaticon.com/128/2920/2920251.png', 3)
ON CONFLICT DO NOTHING;


-- ============================================================
-- 2. PORTFOLIO EDUCATION
-- (Powers: ExperienceSection.tsx – left column)
-- ============================================================
INSERT INTO portfolio_education (year_range, title, subtitle, order_index)
VALUES
  ('2016-2018', 'AL HYAT M A NAKH CHITRAL', 'Intermediate', 1),
  ('2018-2022', 'UOL UNIVERSITY LAHORE', 'Bachelor of Computer Science', 2)
ON CONFLICT DO NOTHING;


-- ============================================================
-- 3. PORTFOLIO EXPERIENCE
-- (Powers: ExperienceSection.tsx – right column)
-- ============================================================
INSERT INTO portfolio_experience (year_range, title, company, description, order_index)
VALUES
  ('2023-2024', 'FULL STACK DEVELOPER', 'SOLEL NEB INDIA',
   'Implemented secure user authentication with JWT payloads, architected microservices backend, integrating modern React frontends. Proficient in delivering responsive user interfaces using tailored CSS frameworks and agile methodologies.',
   1),
  ('2024-Present', 'FULL STACK DEVELOPER', 'CYBEK OMER SAUDIA',
   'Developing enterprise solutions with Next.js wrappers, API architectures and AWS cloud services deployments. Focusing on improving application security and load delivery mechanisms for scaling operations globally across Middle-Eastern markets.',
   2)
ON CONFLICT DO NOTHING;


-- ============================================================
-- 4. PORTFOLIO CLIENTS (Marquee / Trusted-by section)
-- (Powers: ClientsSection.tsx → ClientsMarquee.tsx)
-- ============================================================
INSERT INTO portfolio_clients (name, logo_type, logo_content, color_class, order_index)
VALUES
  ('nawazon',    'text', 'N', 'text-gray-600',   1),
  ('ARKAN',      'text', '▲', 'text-gray-700',   2),
  ('BEACH YOU',  'text', 'B', 'text-emerald-700', 3),
  ('PILATUS VIP','text', 'P', 'text-blue-900',    4)
ON CONFLICT DO NOTHING;


-- ============================================================
-- 5. PORTFOLIO TECH STACK
-- (Powers: TechStackSection.tsx)
-- ============================================================
INSERT INTO portfolio_tech_stack (name, proficiency, icon_src, order_index)
VALUES
  ('Node.js', 77,
   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 1),
  ('Angular',  64,
   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', 2),
  ('React',    90,
   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 3),
  ('MongoDB',  88,
   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', 4),
  ('AWS',      80,
   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', 5),
  ('Docker',   62,
   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 6)
ON CONFLICT DO NOTHING;


-- ============================================================
-- 6. PROJECTS
-- (Powers: ProjectsSection.tsx and FeaturedProjects.tsx)
-- NOTE: ProjectsSection.tsx was querying 'portfolio_projects' (wrong).
--       The correct table is 'projects'. A code fix is applied separately.
-- ============================================================
INSERT INTO projects (title, slug, category, description, cover_image, technologies, github_url, live_url, featured, language, grid_class, order_index)
VALUES
  ('Sales Al Jomaih', 'sales-al-jomaih', 'WEB APP',
   'Enterprise sales management platform built for the Al Jomaih group.',
   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
   ARRAY['Next.js','TypeScript','Supabase'],
   NULL, NULL, true, 'en-CA',
   'md:col-span-1 md:row-span-2', 1),

  ('Brand Identity', 'brand-identity', 'DESIGN',
   'Complete brand identity design system for a modern startup.',
   'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
   ARRAY['Figma','Illustrator','Branding'],
   NULL, NULL, true, 'en-CA',
   'md:col-span-1 md:row-span-1', 2),

  ('Choco Delivery', 'choco-delivery', 'UI/UX DESIGN',
   'End-to-end UI/UX design for a premium chocolate delivery service.',
   'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
   ARRAY['Figma','React','Tailwind CSS'],
   NULL, NULL, false, 'en-CA',
   'md:col-span-1 md:row-span-1', 3),

  ('Tours Platform', 'tours-platform', 'WEB APP',
   'Full-featured travel and tours booking platform with real-time availability.',
   'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
   ARRAY['Next.js','Node.js','PostgreSQL','Stripe'],
   NULL, NULL, false, 'en-CA',
   'md:col-span-1 md:row-span-1', 4),

  ('AI-Powered Resume Builder', 'ai-resume-builder', 'SaaS',
   'An intelligent resume builder that uses AI to optimize content and design for ATS systems.',
   NULL,
   ARRAY['Next.js','TypeScript','OpenAI','Supabase'],
   'https://github.com/habibfarooq/resume-builder',
   'https://resume.habibfarooq.com',
   true, 'en-CA',
   'md:col-span-1 md:row-span-1', 5),

  ('E-Commerce Analytics Dashboard', 'ecommerce-analytics', 'Analytics',
   'Real-time analytics dashboard for e-commerce businesses with predictive insights.',
   NULL,
   ARRAY['React','Node.js','PostgreSQL','D3.js','Redis'],
   'https://github.com/habibfarooq/ecommerce-analytics',
   'https://analytics.demo.com',
   true, 'en-CA',
   'md:col-span-1 md:row-span-1', 6)
ON CONFLICT (slug) DO NOTHING;


-- ============================================================
-- 7. BLOG POSTS  (sample starter posts)
-- (Powers: BlogPreview.tsx — currently hardcoded, fix is in-code)
-- ============================================================
INSERT INTO blog_posts (title, slug, excerpt, content, author, published_at, is_published, language)
VALUES
  ('Building Scalable Next.js Applications with TypeScript',
   'building-scalable-nextjs-applications-with-typescript',
   'Learn how to architect and build scalable Next.js applications using TypeScript, proper folder structure, and best practices.',
   'Full article content goes here...', 'Habib Farooq',
   '2024-03-15 00:00:00+00', true, 'en-CA'),

  ('Mastering React Performance Optimization',
   'mastering-react-performance-optimization',
   'Advanced techniques for optimizing React applications including memoization, code splitting, and virtualization.',
   'Full article content goes here...', 'Habib Farooq',
   '2024-02-28 00:00:00+00', true, 'en-CA'),

  ('Implementing Authentication in Next.js with Supabase',
   'implementing-authentication-in-nextjs-with-supabase',
   'A comprehensive guide to implementing secure authentication in Next.js applications using Supabase Auth.',
   'Full article content goes here...', 'Habib Farooq',
   '2024-02-10 00:00:00+00', true, 'en-CA'),

  ('The Future of AI in Web Development',
   'future-of-ai-in-web-development',
   'Exploring how artificial intelligence is transforming web development and what developers need to know.',
   'Full article content goes here...', 'Habib Farooq',
   '2024-01-22 00:00:00+00', true, 'en-CA')
ON CONFLICT (slug) DO NOTHING;


-- ============================================================
-- 8. HERO / PROFILE STATS (extends the settings table)
-- (Powers: HeroSection.tsx – experience/projects/clients counters)
-- ============================================================
INSERT INTO settings (key, value)
VALUES
  ('stat_experience', '"7+"'),
  ('stat_projects',   '"70+"'),
  ('stat_clients',    '"30+"'),
  ('profile_image',   '"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60"')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
```

---

## 🐛 Code Bugs Found (applied automatically)

The following **table name mismatches** were found in the codebase and need to be fixed in code:

| File | Bug | Fix |
|------|-----|-----|
| `components/home/ProjectsSection.tsx` | Queries `portfolio_projects` (doesn't exist) | Change to `projects` |
| `components/home/FeaturedProjects.tsx` | Uses **100% hardcoded** mock data — never queries Supabase | Needs Supabase integration |
| `components/home/BlogPreview.tsx` | Uses **100% hardcoded** mock data — never queries Supabase | Needs Supabase integration |
| `components/home/SkillsSection.tsx` | Uses **100% hardcoded** data, no Supabase query | Needs Supabase integration |

> These are patched in the codebase directly alongside this SQL file.

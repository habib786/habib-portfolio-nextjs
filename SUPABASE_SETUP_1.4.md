# Supabase Setup v1.4 - Multilingual Dynamic Data Fix

Problem: dynamic Supabase content mostly English only.

This SQL adds proper language support for dynamic tables, backfills current rows, and gives commands to update translated text.

Run in Supabase SQL Editor.

## 1) Schema Patch (add `language` + translation-safe uniqueness)

```sql
BEGIN;

-- Ensure language list exists
INSERT INTO languages (code, name, is_default, is_active)
VALUES
  ('en-CA', 'English (Canada)', true, true),
  ('fr-CA', 'French (Canada)', false, true),
  ('ar-SA', 'Arabic (Saudi Arabia)', false, true),
  ('ur-PK', 'Urdu (Pakistan)', false, true),
  ('tr-TR', 'Turkish (Turkey)', false, true)
ON CONFLICT (code) DO UPDATE
SET is_active = true;

-- Add language columns to legacy dynamic tables
ALTER TABLE portfolio_services
  ADD COLUMN IF NOT EXISTS language TEXT REFERENCES languages(code) DEFAULT 'en-CA';

ALTER TABLE portfolio_education
  ADD COLUMN IF NOT EXISTS language TEXT REFERENCES languages(code) DEFAULT 'en-CA';

ALTER TABLE portfolio_experience
  ADD COLUMN IF NOT EXISTS language TEXT REFERENCES languages(code) DEFAULT 'en-CA';

ALTER TABLE portfolio_clients
  ADD COLUMN IF NOT EXISTS language TEXT REFERENCES languages(code) DEFAULT 'en-CA';

ALTER TABLE portfolio_tech_stack
  ADD COLUMN IF NOT EXISTS language TEXT REFERENCES languages(code) DEFAULT 'en-CA';

ALTER TABLE IF EXISTS portfolio_testimonials
  ADD COLUMN IF NOT EXISTS language TEXT REFERENCES languages(code) DEFAULT 'en-CA';

-- Backfill nulls
UPDATE portfolio_services      SET language = 'en-CA' WHERE language IS NULL;
UPDATE portfolio_education     SET language = 'en-CA' WHERE language IS NULL;
UPDATE portfolio_experience    SET language = 'en-CA' WHERE language IS NULL;
UPDATE portfolio_clients       SET language = 'en-CA' WHERE language IS NULL;
UPDATE portfolio_tech_stack    SET language = 'en-CA' WHERE language IS NULL;
DO $$
BEGIN
  IF to_regclass('public.portfolio_testimonials') IS NOT NULL THEN
    EXECUTE 'UPDATE portfolio_testimonials SET language = ''en-CA'' WHERE language IS NULL';
  END IF;
END $$;

-- Remove old global uniqueness if it blocks per-language duplicates
ALTER TABLE projects   DROP CONSTRAINT IF EXISTS projects_slug_key;
ALTER TABLE blog_posts DROP CONSTRAINT IF EXISTS blog_posts_slug_key;
ALTER TABLE pages      DROP CONSTRAINT IF EXISTS pages_slug_key;

-- Add composite uniqueness (same slug allowed per language)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'projects_slug_language_uk'
  ) THEN
    CREATE UNIQUE INDEX projects_slug_language_uk ON projects (slug, language);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'blog_posts_slug_language_uk'
  ) THEN
    CREATE UNIQUE INDEX blog_posts_slug_language_uk ON blog_posts (slug, language);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname = 'public' AND indexname = 'pages_slug_language_uk'
  ) THEN
    CREATE UNIQUE INDEX pages_slug_language_uk ON pages (slug, language);
  END IF;
END $$;

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_menu_items_language             ON menu_items(language);
CREATE INDEX IF NOT EXISTS idx_projects_language               ON projects(language);
CREATE INDEX IF NOT EXISTS idx_blog_posts_language             ON blog_posts(language);
CREATE INDEX IF NOT EXISTS idx_pages_language                  ON pages(language);
CREATE INDEX IF NOT EXISTS idx_portfolio_services_language     ON portfolio_services(language);
CREATE INDEX IF NOT EXISTS idx_portfolio_education_language    ON portfolio_education(language);
CREATE INDEX IF NOT EXISTS idx_portfolio_experience_language   ON portfolio_experience(language);
CREATE INDEX IF NOT EXISTS idx_portfolio_clients_language      ON portfolio_clients(language);
CREATE INDEX IF NOT EXISTS idx_portfolio_tech_stack_language   ON portfolio_tech_stack(language);
DO $$
BEGIN
  IF to_regclass('public.portfolio_testimonials') IS NOT NULL THEN
    EXECUTE 'CREATE INDEX IF NOT EXISTS idx_portfolio_testimonials_language ON portfolio_testimonials(language)';
  END IF;
END $$;

COMMIT;
```

## 2) Clone current English rows into other languages (starter rows)

This copies all `en-CA` rows to `fr-CA`, `ar-SA`, `ur-PK`, `tr-TR`.
Then you edit translated text per language.

```sql
BEGIN;

-- Menu
INSERT INTO menu_items (title, url, "order", language, icon, parent_id, is_external)
SELECT m.title, m.url, m."order", l.code, m.icon, m.parent_id, m.is_external
FROM menu_items m
CROSS JOIN (VALUES ('fr-CA'), ('ar-SA'), ('ur-PK'), ('tr-TR')) AS l(code)
WHERE m.language = 'en-CA'
  AND NOT EXISTS (
    SELECT 1 FROM menu_items x
    WHERE x.url = m.url AND x."order" = m."order" AND x.language = l.code
  );

-- Projects
INSERT INTO projects (title, slug, category, description, content, cover_image, technologies, github_url, live_url, featured, language, grid_class, order_index)
SELECT p.title, p.slug, p.category, p.description, p.content, p.cover_image, p.technologies, p.github_url, p.live_url, p.featured, l.code, p.grid_class, p.order_index
FROM projects p
CROSS JOIN (VALUES ('fr-CA'), ('ar-SA'), ('ur-PK'), ('tr-TR')) AS l(code)
WHERE p.language = 'en-CA'
  AND NOT EXISTS (
    SELECT 1 FROM projects x
    WHERE x.slug = p.slug AND x.language = l.code
  );

-- Blog
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, author, published_at, is_published, language)
SELECT b.title, b.slug, b.excerpt, b.content, b.cover_image, b.author, b.published_at, b.is_published, l.code
FROM blog_posts b
CROSS JOIN (VALUES ('fr-CA'), ('ar-SA'), ('ur-PK'), ('tr-TR')) AS l(code)
WHERE b.language = 'en-CA'
  AND NOT EXISTS (
    SELECT 1 FROM blog_posts x
    WHERE x.slug = b.slug AND x.language = l.code
  );

-- Services
INSERT INTO portfolio_services (number_id, title, description, icon_url, order_index, language)
SELECT s.number_id, s.title, s.description, s.icon_url, s.order_index, l.code
FROM portfolio_services s
CROSS JOIN (VALUES ('fr-CA'), ('ar-SA'), ('ur-PK'), ('tr-TR')) AS l(code)
WHERE s.language = 'en-CA'
  AND NOT EXISTS (
    SELECT 1 FROM portfolio_services x
    WHERE x.number_id = s.number_id AND x.language = l.code
  );

-- Education
INSERT INTO portfolio_education (year_range, title, subtitle, order_index, language)
SELECT e.year_range, e.title, e.subtitle, e.order_index, l.code
FROM portfolio_education e
CROSS JOIN (VALUES ('fr-CA'), ('ar-SA'), ('ur-PK'), ('tr-TR')) AS l(code)
WHERE e.language = 'en-CA'
  AND NOT EXISTS (
    SELECT 1 FROM portfolio_education x
    WHERE x.year_range = e.year_range AND x.order_index = e.order_index AND x.language = l.code
  );

-- Experience
INSERT INTO portfolio_experience (year_range, title, company, description, order_index, language)
SELECT e.year_range, e.title, e.company, e.description, e.order_index, l.code
FROM portfolio_experience e
CROSS JOIN (VALUES ('fr-CA'), ('ar-SA'), ('ur-PK'), ('tr-TR')) AS l(code)
WHERE e.language = 'en-CA'
  AND NOT EXISTS (
    SELECT 1 FROM portfolio_experience x
    WHERE x.year_range = e.year_range AND x.order_index = e.order_index AND x.language = l.code
  );

-- Clients
INSERT INTO portfolio_clients (name, logo_type, logo_content, color_class, order_index, language)
SELECT c.name, c.logo_type, c.logo_content, c.color_class, c.order_index, l.code
FROM portfolio_clients c
CROSS JOIN (VALUES ('fr-CA'), ('ar-SA'), ('ur-PK'), ('tr-TR')) AS l(code)
WHERE c.language = 'en-CA'
  AND NOT EXISTS (
    SELECT 1 FROM portfolio_clients x
    WHERE x.name = c.name AND x.order_index = c.order_index AND x.language = l.code
  );

-- Tech stack
INSERT INTO portfolio_tech_stack (name, proficiency, icon_src, order_index, language)
SELECT t.name, t.proficiency, t.icon_src, t.order_index, l.code
FROM portfolio_tech_stack t
CROSS JOIN (VALUES ('fr-CA'), ('ar-SA'), ('ur-PK'), ('tr-TR')) AS l(code)
WHERE t.language = 'en-CA'
  AND NOT EXISTS (
    SELECT 1 FROM portfolio_tech_stack x
    WHERE x.name = t.name AND x.order_index = t.order_index AND x.language = l.code
  );

-- Testimonials (optional, runs only if table exists)
DO $$
BEGIN
  IF to_regclass('public.portfolio_testimonials') IS NOT NULL THEN
    EXECUTE $q$
      INSERT INTO portfolio_testimonials (name, role, quote, avatar_url, is_active, order_index, language)
      SELECT t.name, t.role, t.quote, t.avatar_url, t.is_active, t.order_index, l.code
      FROM portfolio_testimonials t
      CROSS JOIN (VALUES ('fr-CA'), ('ar-SA'), ('ur-PK'), ('tr-TR')) AS l(code)
      WHERE t.language = 'en-CA'
        AND NOT EXISTS (
          SELECT 1 FROM portfolio_testimonials x
          WHERE x.name = t.name AND x.order_index = t.order_index AND x.language = l.code
        )
    $q$;
  END IF;
END $$;

COMMIT;
```

## 3) Translate text rows (examples)

Replace values with your own translations.

```sql
-- Example: French menu
UPDATE menu_items
SET title = CASE url
  WHEN '/' THEN 'Accueil'
  WHEN '/experience' THEN 'Experience'
  WHEN '/projects' THEN 'Projets'
  WHEN '/blog' THEN 'Blog'
  WHEN '/about' THEN 'A propos'
  WHEN '/contact' THEN 'Contact'
  ELSE title
END
WHERE language = 'fr-CA';

-- Example: Arabic service titles
UPDATE portfolio_services
SET title = CASE number_id
  WHEN '01.' THEN 'Tatwir Web wa Mobile Mutakamil'
  WHEN '02.' THEN 'Tasmim Wajihat wa Tajribat Mustakhdim'
  WHEN '03.' THEN 'Hulul Sahabiyah wa Serverless'
  ELSE title
END
WHERE language = 'ar-SA';

-- Example: Urdu profile strings in settings (still global table)
-- Keep as plain JSON strings because app reads current shape.
INSERT INTO settings (key, value) VALUES
  ('profile_role_ur-PK', to_jsonb('Full Stack Web Developer (Urdu text here)'::text)),
  ('site_title_ur-PK', to_jsonb('Habib Farooq Portfolio (Urdu text here)'::text))
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
```

## 4) Quick checks

```sql
-- Counts by language
SELECT 'menu_items' AS table_name, language, COUNT(*) FROM menu_items GROUP BY language
UNION ALL
SELECT 'projects', language, COUNT(*) FROM projects GROUP BY language
UNION ALL
SELECT 'blog_posts', language, COUNT(*) FROM blog_posts GROUP BY language
UNION ALL
SELECT 'portfolio_services', language, COUNT(*) FROM portfolio_services GROUP BY language
UNION ALL
SELECT 'portfolio_education', language, COUNT(*) FROM portfolio_education GROUP BY language
UNION ALL
SELECT 'portfolio_experience', language, COUNT(*) FROM portfolio_experience GROUP BY language
UNION ALL
SELECT 'portfolio_clients', language, COUNT(*) FROM portfolio_clients GROUP BY language
UNION ALL
SELECT 'portfolio_tech_stack', language, COUNT(*) FROM portfolio_tech_stack GROUP BY language
-- UNION ALL
-- SELECT 'portfolio_testimonials', language, COUNT(*) FROM portfolio_testimonials GROUP BY language
ORDER BY table_name, language;
```

If `portfolio_testimonials` table not present, remove that last `UNION ALL` line before running.

## Important

DB side now ready for multilingual rows.
App queries must also filter by current locale (`.eq('language', activeLocale)`) for each dynamic table.


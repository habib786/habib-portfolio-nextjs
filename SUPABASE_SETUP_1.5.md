# Supabase Setup v1.5 - Navigation Update (Services Page)

Problem: New Services page added to app but missing from dynamic Supabase menu.

This SQL adds the "Services" link to the `menu_items` table for all supported languages.

Run in Supabase SQL Editor.

## 1) Prepare Table & Add Services

```sql
-- 1) Add Unique Constraint if missing (fixes ON CONFLICT error)
CREATE UNIQUE INDEX IF NOT EXISTS menu_items_url_lang_idx ON menu_items (url, language);

BEGIN;

-- Insert Services menu item for English
INSERT INTO menu_items (title, url, "order", language, is_external)
VALUES ('Services', '/services', 2, 'en-CA', false)
ON CONFLICT (url, language) DO UPDATE SET "order" = 2;

-- Insert for other languages
INSERT INTO menu_items (title, url, "order", language, is_external)
VALUES 
  ('Services', '/services', 2, 'fr-CA', false),
  ('Services', '/services', 2, 'ar-SA', false),
  ('Services', '/services', 2, 'ur-PK', false),
  ('Services', '/services', 2, 'tr-TR', false)
ON CONFLICT (url, language) DO UPDATE SET "order" = 2;

-- Re-order other items to make room for Services at index 2 (between Home and Experience)
UPDATE menu_items 
SET "order" = "order" + 1 
WHERE "order" >= 2 AND url != '/services';

COMMIT;
```

## 2) Update Localization (Optional)

Run these if you want the "Services" menu title translated:

```sql
UPDATE menu_items SET title = 'Services' WHERE url = '/services' AND language = 'fr-CA';
UPDATE menu_items SET title = 'Khidamat' WHERE url = '/services' AND language = 'ar-SA';
UPDATE menu_items SET title = 'Khidmaat' WHERE url = '/services' AND language = 'ur-PK';
UPDATE menu_items SET title = 'Hizmetler' WHERE url = '/services' AND language = 'tr-TR';
```

## 3) Verify

```sql
SELECT title, url, "order", language FROM menu_items ORDER BY language, "order";
```

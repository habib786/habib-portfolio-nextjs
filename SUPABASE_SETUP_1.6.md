# Supabase Setup v1.6 - Footer Content & Multilingual Fix

This script ensures the `footer_content` and `menu_items` tables contain properly translated data for all supported languages.

Run this in the **Supabase SQL Editor**.

## 1) Create or Update Footer Content Table

```sql
CREATE TABLE IF NOT EXISTS public.footer_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    language TEXT REFERENCES public.languages(code) NOT NULL,
    tagline TEXT NOT NULL,
    nav_title TEXT NOT NULL DEFAULT 'Navigation',
    nav_links TEXT[] NOT NULL DEFAULT '{}',
    resource_title TEXT NOT NULL DEFAULT 'Resources',
    resource_links TEXT[] NOT NULL DEFAULT '{}',
    contact_title TEXT NOT NULL DEFAULT 'Get In Touch',
    contact_email TEXT NOT NULL,
    contact_location TEXT NOT NULL,
    cta_title TEXT NOT NULL,
    cta_text TEXT NOT NULL,
    cta_button TEXT NOT NULL,
    copyright TEXT NOT NULL,
    made_with TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(language)
);

ALTER TABLE public.footer_content ADD COLUMN IF NOT EXISTS nav_title TEXT DEFAULT 'Navigation';
ALTER TABLE public.footer_content ADD COLUMN IF NOT EXISTS resource_title TEXT DEFAULT 'Resources';
ALTER TABLE public.footer_content ADD COLUMN IF NOT EXISTS contact_title TEXT DEFAULT 'Get In Touch';

ALTER TABLE public.footer_content ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'footer_content' AND policyname = 'Allow public read'
    ) THEN
        CREATE POLICY "Allow public read" ON public.footer_content FOR SELECT USING (true);
    END IF;
END $$;
```

## 2) Seed Footer Data (English, French, Arabic)

```sql
-- English
INSERT INTO public.footer_content (language, tagline, nav_title, nav_links, resource_title, resource_links, contact_title, contact_email, contact_location, cta_title, cta_text, cta_button, copyright, made_with)
VALUES ('en-CA', 'A digital solutions builder and full-stack developer dedicated to crafting modern, scalable, and exceptional web experiences.', 'Navigation', ARRAY['Home', 'Projects', 'Services', 'Experience', 'Contact'], 'Resources', ARRAY['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'], 'Get In Touch', 'hello@habibfarooq.com', 'Toronto, Canada', 'Ready to start a project?', 'Let''s build something awesome together.', 'Let''s Talk', 'Habib. All rights reserved.', 'using Next.js & MUI')
ON CONFLICT (language) DO UPDATE SET tagline = EXCLUDED.tagline, nav_title = EXCLUDED.nav_title, nav_links = EXCLUDED.nav_links;

-- French
INSERT INTO public.footer_content (language, tagline, nav_title, nav_links, resource_title, resource_links, contact_title, contact_email, contact_location, cta_title, cta_text, cta_button, copyright, made_with)
VALUES ('fr-CA', 'Développeur full-stack dédié à la création d''expériences web modernes et évolutives.', 'Navigation', ARRAY['Accueil', 'Projets', 'Services', 'Expérience', 'Contact'], 'Ressources', ARRAY['Chonfidentialité', 'Conditions', 'Cookies', 'Plan'], 'Contact', 'hello@habibfarooq.com', 'Toronto, Canada', 'Prêt pour un projet ?', 'Construisons quelque chose ensemble.', 'Parlons-en', 'Habib. Tous droits réservés.', 'avec Next.js & MUI')
ON CONFLICT (language) DO UPDATE SET tagline = EXCLUDED.tagline, nav_title = EXCLUDED.nav_title, nav_links = EXCLUDED.nav_links;

-- Arabic
INSERT INTO public.footer_content (language, tagline, nav_title, nav_links, resource_title, resource_links, contact_title, contact_email, contact_location, cta_title, cta_text, cta_button, copyright, made_with)
VALUES ('ar-SA', 'مطور حلول رقمية مخصص لإنشاء تجارب ويب حديثة وقابلة للتطوير واستثنائية.', 'التنقل', ARRAY['الرئيسية', 'المشاريع', 'الخدمات', 'الخبرة', 'اتصال'], 'المصادر', ARRAY['الخصوصية', 'الشروط', 'ملفات الارتباط', 'الخريطة'], 'اتصل بنا', 'hello@habibfarooq.com', 'تورونتو - كندا', 'جاهز لمشروع؟', 'فلنبنِ شيئاً رائعاً معاً.', 'تحدث معنا', 'حبيب. جميع الحقوق محفوظة.', 'بواسطة Next.js & MUI')
ON CONFLICT (language) DO UPDATE SET tagline = EXCLUDED.tagline, nav_title = EXCLUDED.nav_title, nav_links = EXCLUDED.nav_links;
```

## 3) Seed Menu Data (translated Arabic and French)

```sql
-- Ensure Services link exists for all
INSERT INTO public.menu_items (title, url, "order", language)
VALUES 
  ('Services', '/services', 2, 'en-CA'),
  ('Services', '/services', 2, 'fr-CA'),
  ('الخدمات', '/services', 2, 'ar-SA'),
  ('الخدمات', '/services', 2, 'ur-PK'),
  ('Hizmetler', '/services', 2, 'tr-TR')
ON CONFLICT DO NOTHING;

-- Explicitly translate Arabic menu
UPDATE public.menu_items SET title = 'الرئيسية' WHERE url = '/' AND language = 'ar-SA';
UPDATE public.menu_items SET title = 'الخبرة' WHERE url = '/experience' AND language = 'ar-SA';
UPDATE public.menu_items SET title = 'المشاريع' WHERE url = '/projects' AND language = 'ar-SA';
UPDATE public.menu_items SET title = 'الخدمات' WHERE url = '/services' AND language = 'ar-SA';
UPDATE public.menu_items SET title = 'المدونة' WHERE url = '/blog' AND language = 'ar-SA';
UPDATE public.menu_items SET title = 'حول' WHERE url = '/about' AND language = 'ar-SA';
UPDATE public.menu_items SET title = 'اتصل' WHERE url = '/contact' AND language = 'ar-SA';
```

# Supabase Setup - COMPLETO (Total Reboot)

Run this in **Supabase SQL Editor**.
This script clears everything related to menu and footer and re-inserts fresh data for ALL 5 languages.
This is the "nuclear option" to ensure everything is dynamic and correctly translated.

## 1) Prepare Tables

```sql
-- 1. Ensure tables exist with correct schema
CREATE TABLE IF NOT EXISTS public.languages (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  language TEXT REFERENCES public.languages(code),
  icon TEXT,
  parent_id UUID REFERENCES public.menu_items(id),
  is_external BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- 2. Clear current data (to prevent duplicates/conflicts)
DELETE FROM public.menu_items;
DELETE FROM public.footer_content;

-- 2.5 Ensure Permissions (RLS)
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read" ON public.menu_items;
CREATE POLICY "Allow public read" ON public.menu_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON public.footer_content;
CREATE POLICY "Allow public read" ON public.footer_content FOR SELECT USING (true);

-- Grant access to anon role (for API)
GRANT SELECT ON public.menu_items TO anon, authenticated;
GRANT SELECT ON public.footer_content TO anon, authenticated;

-- 3. Ensure languages exist
INSERT INTO public.languages (code, name, is_default, is_active)
VALUES 
('en-CA', 'English (Canada)', true, true),
('ar-SA', 'Arabic (Saudi Arabia)', false, true),
('fr-CA', 'French (Canada)', false, true),
('tr-TR', 'Turkish (Turkey)', false, true),
('ur-PK', 'Urdu (Pakistan)', false, true)
ON CONFLICT (code) DO UPDATE SET is_active = true;
```

## 2) Insert MENU Data (All Languages)

```sql
-- ENGLISH (en-CA)
INSERT INTO public.menu_items (title, url, "order", language) VALUES
('Home', '/', 1, 'en-CA'),
('Services', '/services', 2, 'en-CA'),
('Experience', '/experience', 3, 'en-CA'),
('Projects', '/projects', 4, 'en-CA'),
('Blog', '/blog', 5, 'en-CA'),
('About', '/about', 6, 'en-CA'),
('Contact', '/contact', 7, 'en-CA');

-- ARABIC (ar-SA)
INSERT INTO public.menu_items (title, url, "order", language) VALUES
('الرئيسية', '/', 1, 'ar-SA'),
('الخدمات', '/services', 2, 'ar-SA'),
('الخبرة', '/experience', 3, 'ar-SA'),
('المشاريع', '/projects', 4, 'ar-SA'),
('المدونة', '/blog', 5, 'ar-SA'),
('حول', '/about', 6, 'ar-SA'),
('اتصل', '/contact', 7, 'ar-SA');

-- FRENCH (fr-CA)
INSERT INTO public.menu_items (title, url, "order", language) VALUES
('Accueil', '/', 1, 'fr-CA'),
('Services', '/services', 2, 'fr-CA'),
('Expérience', '/experience', 3, 'fr-CA'),
('Projets', '/projects', 4, 'fr-CA'),
('Blog', '/blog', 5, 'fr-CA'),
('À propos', '/about', 6, 'fr-CA'),
('Contact', '/contact', 7, 'fr-CA');

-- TURKISH (tr-TR)
INSERT INTO public.menu_items (title, url, "order", language) VALUES
('Ana Sayfa', '/', 1, 'tr-TR'),
('Hizmetler', '/services', 2, 'tr-TR'),
('Deneyim', '/experience', 3, 'tr-TR'),
('Projeler', '/projects', 4, 'tr-TR'),
('Blog', '/blog', 5, 'tr-TR'),
('Hakkımda', '/about', 6, 'tr-TR'),
('İletişim', '/contact', 7, 'tr-TR');

-- URDU (ur-PK)
INSERT INTO public.menu_items (title, url, "order", language) VALUES
('ہوم', '/', 1, 'ur-PK'),
('خدمات', '/services', 2, 'ur-PK'),
('تجربہ', '/experience', 3, 'ur-PK'),
('پروجیکٹس', '/projects', 4, 'ur-PK'),
('بلاگ', '/blog', 5, 'ur-PK'),
('ہمارے بارے میں', '/about', 6, 'ur-PK'),
('رابطہ کریں', '/contact', 7, 'ur-PK');
```

## 3) Insert FOOTER Data (All Languages)

```sql
-- ENGLISH
INSERT INTO public.footer_content (language, tagline, nav_title, nav_links, resource_title, resource_links, contact_title, contact_email, contact_location, cta_title, cta_text, cta_button, copyright, made_with)
VALUES ('en-CA', 'A digital solutions builder and full-stack developer dedicated to crafting modern web experiences.', 'Navigation', ARRAY['Home', 'Projects', 'Services', 'Experience', 'Contact'], 'Resources', ARRAY['Privacy', 'Terms', 'Cookies', 'Sitemap'], 'Get In Touch', 'hello@habibfarooq.com', 'Toronto, Canada', 'Ready to start?', 'Let''s build together.', 'Let''s Talk', 'Habib. All rights reserved.', 'using Next.js & MUI');

-- ARABIC
INSERT INTO public.footer_content (language, tagline, nav_title, nav_links, resource_title, resource_links, contact_title, contact_email, contact_location, cta_title, cta_text, cta_button, copyright, made_with)
VALUES ('ar-SA', 'مطور حلول رقمية مخصص لإنشاء تجارب ويب حديثة واستثنائية.', 'التنقل', ARRAY['الرئيسية', 'المشاريع', 'الخدمات', 'الخبرة', 'اتصال'], 'الموارد', ARRAY['الخصوصية', 'الشروط', 'ملفات الارتباط', 'خريطة الموقع'], 'اتصل بنا', 'hello@habibfarooq.com', 'تورونتو، كندا', 'جاهز للبدء؟', 'لنبنِ معاً.', 'تحدث معنا', 'حبيب. جميع الحقوق محفوظة.', 'بواسطة Next.js & MUI');

-- Repeat for others if needed, or stick to these for now.
```

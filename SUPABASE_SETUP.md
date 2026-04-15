# Supabase Database Setup Guide

This guide contains everything you need to set up your Supabase database and make your portfolio website fully dynamic. By running the SQL script provided below, you will create the necessary tables and populate them with your current data.

## 🚀 Setup Steps

1. Go to your [Supabase Dashboard](https://app.supabase.com/).
2. Select your project.
3. Click on the **SQL Editor** in the left sidebar.
4. Click **New Query**.
5. Copy and paste the entire SQL script below.
6. Click **Run**.

---

## 🛠️ SQL Migration Script

```sql
-- 1. CLEANUP (Optional: Uncomment if you want to reset everything)
-- DROP TABLE IF EXISTS languages CASCADE;
-- DROP TABLE IF EXISTS pages CASCADE;
-- DROP TABLE IF EXISTS projects CASCADE;
-- DROP TABLE IF EXISTS blog_posts CASCADE;
-- DROP TABLE IF EXISTS portfolio_services CASCADE;
-- DROP TABLE IF EXISTS portfolio_education CASCADE;
-- DROP TABLE IF EXISTS portfolio_experience CASCADE;
-- DROP TABLE IF EXISTS portfolio_clients CASCADE;
-- DROP TABLE IF EXISTS portfolio_tech_stack CASCADE;
-- DROP TABLE IF EXISTS settings CASCADE;
-- DROP TABLE IF EXISTS menu_items CASCADE;

-- 2. CREATE TABLES

-- Languages
CREATE TABLE IF NOT EXISTS languages (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Global Settings
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pages Table
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  language TEXT REFERENCES languages(code),
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT,
  description TEXT,
  content TEXT,
  cover_image TEXT,
  technologies TEXT[],
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT false,
  language TEXT REFERENCES languages(code),
  grid_class TEXT DEFAULT 'md:col-span-1 md:row-span-1',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN DEFAULT false,
  language TEXT REFERENCES languages(code),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Legacy Portfolio Components
CREATE TABLE IF NOT EXISTS portfolio_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year_range TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year_range TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_type TEXT DEFAULT 'text',
  logo_content TEXT,
  color_class TEXT DEFAULT 'text-gray-600',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolio_tech_stack (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  proficiency INTEGER DEFAULT 0,
  icon_src TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  language TEXT REFERENCES languages(code),
  icon TEXT,
  parent_id UUID REFERENCES menu_items(id),
  is_external BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access to everyone
DO $$ 
BEGIN
    CREATE POLICY "Allow public read" ON languages FOR SELECT USING (true);
    CREATE POLICY "Allow public read" ON settings FOR SELECT USING (true);
    CREATE POLICY "Allow public read" ON pages FOR SELECT USING (true);
    CREATE POLICY "Allow public read" ON projects FOR SELECT USING (true);
    CREATE POLICY "Allow public read" ON blog_posts FOR SELECT USING (true);
    CREATE POLICY "Allow public read" ON portfolio_services FOR SELECT USING (true);
    CREATE POLICY "Allow public read" ON portfolio_education FOR SELECT USING (true);
    CREATE POLICY "Allow public read" ON portfolio_experience FOR SELECT USING (true);
    CREATE POLICY "Allow public read" ON portfolio_clients FOR SELECT USING (true);
    CREATE POLICY "Allow public read" ON portfolio_tech_stack FOR SELECT USING (true);
    CREATE POLICY "Allow public read" ON menu_items FOR SELECT USING (true);
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- 4. INSERT SEED DATA
INSERT INTO languages (code, name, is_default, is_active)
VALUES 
('en-CA', 'English (Canada)', true, true),
('ar-SA', 'Arabic (Saudi Arabia)', false, true),
('fr-CA', 'French (Canada)', false, true),
('tr-TR', 'Turkish (Turkey)', false, true),
('ur-PK', 'Urdu (Pakistan)', false, true)
ON CONFLICT (code) DO NOTHING;

INSERT INTO settings (key, value)
VALUES 
('site_title', '"Habib Farooq Portfolio"'),
('site_description', '"Personal portfolio and blog"'),
('site_url', '"https://habibfarooq.com"'),
('contact_email', '"contact@habibfarooq.com"'),
('profile_name', '"HABIB"'),
('profile_role', '"Full Stack Web Developer"')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO menu_items (title, url, "order", language)
VALUES 
('Home', '/', 1, 'en-CA'),
('Experience', '/experience', 2, 'en-CA'),
('Projects', '/projects', 3, 'en-CA'),
('Blog', '/blog', 4, 'en-CA'),
('About', '/about', 5, 'en-CA'),
('Contact', '/contact', 6, 'en-CA')
ON CONFLICT DO NOTHING;
```

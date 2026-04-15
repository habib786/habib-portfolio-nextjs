-- Updated Supabase Database Schema for Habib Farooq Portfolio
-- This schema aligns with the React.js admin dashboard

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create languages table
CREATE TABLE IF NOT EXISTS languages (
  code VARCHAR(2) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content JSONB NOT NULL DEFAULT '{}',
  meta_title VARCHAR(255),
  meta_description TEXT,
  is_published BOOLEAN DEFAULT true,
  language VARCHAR(2) REFERENCES languages(code) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "order" INTEGER DEFAULT 0
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  icon VARCHAR(50),
  "order" INTEGER NOT NULL DEFAULT 0,
  parent_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  is_external BOOLEAN DEFAULT false,
  language VARCHAR(2) REFERENCES languages(code) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key VARCHAR(100) NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table (existing table, keep structure)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image VARCHAR(255),
  author VARCHAR(100),
  published_at TIMESTAMP WITH TIME ZONE,
  is_published BOOLEAN DEFAULT false,
  language VARCHAR(2) REFERENCES languages(code) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table (existing table, keep structure)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  cover_image VARCHAR(255),
  technologies TEXT[],
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  featured BOOLEAN DEFAULT false,
  language VARCHAR(2) REFERENCES languages(code) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON languages FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON pages FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON settings FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);

-- Insert default languages
INSERT INTO languages (code, name, is_default, is_active) VALUES
  ('en', 'English', true, true),
  ('fr', 'French', false, true),
  ('es', 'Spanish', false, true),
  ('ar', 'Arabic', false, true),
  ('en-CA', 'Canadian English', false, true),
  ('fr-CA', 'Canadian French', false, true),
  ('tr', 'Turkish', false, true),
  ('ur-PK', 'Pakistani Urdu', false, true)
ON CONFLICT (code) DO NOTHING;

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('site_title', '"Habib Farooq Portfolio"'),
  ('site_description', '"Personal portfolio and blog"'),
  ('site_url', '"https://habibfarooq.com"'),
  ('contact_email', '"contact@habibfarooq.com"'),
  ('maintenance_mode', 'false'),
  ('enable_comments', 'true'),
  ('enable_analytics', 'true'),
  ('analytics_id', '""')
ON CONFLICT (key) DO NOTHING;

-- Insert default pages
INSERT INTO pages (title, slug, content, language, "order") VALUES
  ('Home', 'home', '{"sections": []}', 'en', 1),
  ('About', 'about', '{"sections": []}', 'en', 2),
  ('Projects', 'projects', '{"sections": []}', 'en', 3),
  ('Blog', 'blog', '{"sections": []}', 'en', 4),
  ('Contact', 'contact', '{"sections": []}', 'en', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert default menu items
INSERT INTO menu_items (title, url, icon, "order", language) VALUES
  ('Home', '/', 'home', 1, 'en'),
  ('About', '/about', 'person', 2, 'en'),
  ('Projects', '/projects', 'work', 3, 'en'),
  ('Blog', '/blog', 'article', 4, 'en'),
  ('Contact', '/contact', 'mail', 5, 'en')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pages_language ON pages(language);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_published ON pages(is_published);
CREATE INDEX IF NOT EXISTS idx_menu_items_language ON menu_items(language);
CREATE INDEX IF NOT EXISTS idx_menu_items_parent ON menu_items(parent_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_order ON menu_items("order");
CREATE INDEX IF NOT EXISTS idx_blog_posts_language ON blog_posts(language);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_language ON projects(language);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
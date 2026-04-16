# Supabase Database Setup v1.3 (Dynamic Content)

Paste this in **Supabase SQL Editor** and run once.
This adds missing tables/columns so portfolio content can be DB-driven.

```sql
-- =========================
-- 0) Extensions + helpers
-- =========================
create extension if not exists "uuid-ossp";

create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =========================
-- 1) Core table upgrades
-- =========================
alter table if exists public.projects
  add column if not exists category text,
  add column if not exists grid_class text,
  add column if not exists order_index integer default 0;

alter table if exists public.blog_posts
  add column if not exists tags text[] default '{}',
  add column if not exists views integer default 0,
  add column if not exists read_time integer default 6,
  add column if not exists category text default 'General',
  add column if not exists author_bio text,
  add column if not exists author_image text;

create index if not exists idx_projects_order_index on public.projects(order_index);
create index if not exists idx_blog_posts_views on public.blog_posts(views desc);
create index if not exists idx_blog_posts_tags on public.blog_posts using gin(tags);
create index if not exists idx_blog_posts_category on public.blog_posts(category);

-- =========================
-- 2) Dynamic portfolio tables
-- =========================
alter table if exists public.portfolio_services
  add column if not exists icon_url text,
  add column if not exists icon_emoji text;

alter table if exists public.portfolio_services 
  alter column icon_url drop not null,
  alter column icon_emoji drop not null;

create table if not exists public.portfolio_services (
  id uuid primary key default uuid_generate_v4(),
  number_id text not null,
  title text not null,
  description text not null,
  icon_url text,
  icon_emoji text,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_type text not null default 'text',
  logo_content text,
  color_class text,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_tech_stack (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  proficiency integer not null default 0,
  icon_src text,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_education (
  id uuid primary key default uuid_generate_v4(),
  year_range text not null,
  title text not null,
  subtitle text,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_experience (
  id uuid primary key default uuid_generate_v4(),
  year_range text not null,
  title text not null,
  company text,
  description text,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text,
  quote text not null,
  avatar_url text,
  is_active boolean not null default true,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================
-- 3) Triggers
-- =========================
drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at before update on public.projects
for each row execute function public.update_updated_at_column();

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts;
create trigger trg_blog_posts_updated_at before update on public.blog_posts
for each row execute function public.update_updated_at_column();

drop trigger if exists trg_portfolio_services_updated_at on public.portfolio_services;
create trigger trg_portfolio_services_updated_at before update on public.portfolio_services
for each row execute function public.update_updated_at_column();

drop trigger if exists trg_portfolio_clients_updated_at on public.portfolio_clients;
create trigger trg_portfolio_clients_updated_at before update on public.portfolio_clients
for each row execute function public.update_updated_at_column();

drop trigger if exists trg_portfolio_tech_stack_updated_at on public.portfolio_tech_stack;
create trigger trg_portfolio_tech_stack_updated_at before update on public.portfolio_tech_stack
for each row execute function public.update_updated_at_column();

drop trigger if exists trg_portfolio_education_updated_at on public.portfolio_education;
create trigger trg_portfolio_education_updated_at before update on public.portfolio_education
for each row execute function public.update_updated_at_column();

drop trigger if exists trg_portfolio_experience_updated_at on public.portfolio_experience;
create trigger trg_portfolio_experience_updated_at before update on public.portfolio_experience
for each row execute function public.update_updated_at_column();

drop trigger if exists trg_portfolio_testimonials_updated_at on public.portfolio_testimonials;
create trigger trg_portfolio_testimonials_updated_at before update on public.portfolio_testimonials
for each row execute function public.update_updated_at_column();

-- =========================
-- 4) RLS read policies
-- =========================
alter table public.portfolio_services enable row level security;
alter table public.portfolio_clients enable row level security;
alter table public.portfolio_tech_stack enable row level security;
alter table public.portfolio_education enable row level security;
alter table public.portfolio_experience enable row level security;
alter table public.portfolio_testimonials enable row level security;

drop policy if exists "public read portfolio_services" on public.portfolio_services;
create policy "public read portfolio_services" on public.portfolio_services
for select using (true);

drop policy if exists "public read portfolio_clients" on public.portfolio_clients;
create policy "public read portfolio_clients" on public.portfolio_clients
for select using (true);

drop policy if exists "public read portfolio_tech_stack" on public.portfolio_tech_stack;
create policy "public read portfolio_tech_stack" on public.portfolio_tech_stack
for select using (true);

drop policy if exists "public read portfolio_education" on public.portfolio_education;
create policy "public read portfolio_education" on public.portfolio_education
for select using (true);

drop policy if exists "public read portfolio_experience" on public.portfolio_experience;
create policy "public read portfolio_experience" on public.portfolio_experience
for select using (true);

drop policy if exists "public read portfolio_testimonials" on public.portfolio_testimonials;
create policy "public read portfolio_testimonials" on public.portfolio_testimonials
for select using (true);

-- =========================
-- 5) Seed starter data
-- =========================
insert into public.portfolio_services (number_id, title, description, icon_emoji, order_index)
values
('01.', 'FULL-STACK WEB & MOBILE DEVELOPMENT', 'Build scalable web/mobile systems.', 'code', 1),
('02.', 'UI/UX DESIGN & DEVELOPMENT', 'Design user-centered, high-conversion interfaces.', 'design', 2),
('03.', 'SERVERLESS & CLOUD SOLUTIONS', 'Deploy resilient cloud-native architecture.', 'cloud', 3)
on conflict do nothing;

insert into public.portfolio_testimonials (name, role, quote, avatar_url, is_active, order_index)
values
('Client A', 'CEO', 'Delivered quality work fast and clean.', 'https://i.pravatar.cc/150?u=client-a', true, 1),
('Client B', 'Founder', 'Strong engineering and communication.', 'https://i.pravatar.cc/150?u=client-b', true, 2),
('Client C', 'CTO', 'Reliable execution across full stack.', 'https://i.pravatar.cc/150?u=client-c', true, 3)
on conflict do nothing;

update public.blog_posts
set category = coalesce(category, 'General'),
    tags = coalesce(tags, '{}'),
    views = coalesce(views, 0),
    read_time = coalesce(read_time, 6);

update public.projects
set order_index = coalesce(order_index, 0),
    category = coalesce(category, 'PROJECT'),
    grid_class = coalesce(grid_class, 'col-span-1 row-span-1');
```

## Notes
- This is additive and safe for existing data.
- If policy names already exist in your DB, drop old policy first or rename these.
- After running, restart app so schema cache refreshes.


<!--  -->
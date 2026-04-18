# Supabase Update 1.7 - Add Icon Column to Education and Experience

Run this SQL to add the `icon` column to the `portfolio_education` and `portfolio_experience` tables:

```sql
-- Add icon column to portfolio_education
ALTER TABLE portfolio_education 
ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'faGraduationCap';

-- Add icon column to portfolio_experience
ALTER TABLE portfolio_experience 
ADD COLUMN IF NOT EXISTS icon TEXT DEFAULT 'faBriefcase';
```

# Fix Testimonials Database

Run this SQL in Supabase SQL Editor to add the missing `language` column.

```sql
-- 1) Add the language column
ALTER TABLE IF EXISTS public.portfolio_testimonials 
ADD COLUMN IF NOT EXISTS language TEXT REFERENCES public.languages(code) DEFAULT 'en-CA';

-- 2) Update existing rows to default language
UPDATE public.portfolio_testimonials SET language = 'en-CA' WHERE language IS NULL;

-- 3) Create index for performance
CREATE INDEX IF NOT EXISTS idx_portfolio_testimonials_language ON public.portfolio_testimonials(language);

-- 4) Clone English testimonials to other languages if they don't exist
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.portfolio_testimonials WHERE language = 'en-CA') THEN
    INSERT INTO public.portfolio_testimonials (name, role, quote, avatar_url, is_active, order_index, language)
    SELECT t.name, t.role, t.quote, t.avatar_url, t.is_active, t.order_index, l.code
    FROM public.portfolio_testimonials t
    CROSS JOIN (VALUES ('fr-CA'), ('ar-SA'), ('ur-PK'), ('tr-TR')) AS l(code)
    WHERE t.language = 'en-CA'
      AND NOT EXISTS (
        SELECT 1 FROM public.portfolio_testimonials x
        WHERE x.name = t.name AND x.order_index = t.order_index AND x.language = l.code
      );
  END IF;
END $$;
```

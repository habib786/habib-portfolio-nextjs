# Graph Report - .  (2026-04-26)

## Corpus Check
- 136 files · ~133,926 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 249 nodes · 267 edges · 14 communities detected
- Extraction: 73% EXTRACTED · 27% INFERRED · 0% AMBIGUOUS · INFERRED: 73 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]

## God Nodes (most connected - your core abstractions)
1. `Error()` - 35 edges
2. `createClient()` - 16 edges
3. `getSupabaseClient()` - 12 edges
4. `generateMetadata()` - 10 edges
5. `GET()` - 8 edges
6. `getLocale()` - 6 edges
7. `fetchMenu()` - 6 edges
8. `getSettings()` - 6 edges
9. `getSiteMetadata()` - 6 edges
10. `POST()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `BlogPage()` --calls--> `getBlogPosts()`  [INFERRED]
  C:\Projects\habib-portfolio\habib-portfolio-nextjs\app\[lang]\(portfolio)\blog\page.tsx → C:\Projects\habib-portfolio\habib-portfolio-nextjs\lib\supabase\queries.ts
- `ProjectsPage()` --calls--> `getProjects()`  [INFERRED]
  C:\Projects\habib-portfolio\habib-portfolio-nextjs\app\[lang]\(portfolio)\projects\page.tsx → C:\Projects\habib-portfolio\habib-portfolio-nextjs\lib\supabase\queries.ts
- `getLocale()` --calls--> `GET()`  [INFERRED]
  C:\Projects\habib-portfolio\habib-portfolio-nextjs\proxy.ts → C:\Projects\habib-portfolio\habib-portfolio-nextjs\app\api\migrate\route.ts
- `GET()` --calls--> `createClient()`  [INFERRED]
  C:\Projects\habib-portfolio\habib-portfolio-nextjs\app\api\migrate\route.ts → C:\Projects\habib-portfolio\habib-portfolio-nextjs\lib\supabase\server.ts
- `GET()` --calls--> `Error()`  [INFERRED]
  C:\Projects\habib-portfolio\habib-portfolio-nextjs\app\api\migrate\route.ts → C:\Projects\habib-portfolio\habib-portfolio-nextjs\app\[lang]\(portfolio)\error.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.14
Nodes (22): runMigration(), check(), checkSettings(), Error(), generateMetadata(), getAnonSupabaseClient(), getBlogPostBySlug(), getBlogPosts() (+14 more)

### Community 1 - "Community 1"
Cohesion: 0.1
Nodes (12): fetchData(), loadServices(), fetchData(), loadTestimonials(), createSupabaseClient(), fetchData(), fetchPosts(), ClientsSection() (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (6): mapProject(), BlogPage(), generateMetadata(), mapPost(), ProjectsPage(), sanitizeImageUrl()

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (3): formatDate(), formatDateTime(), getDefaultLocale()

### Community 4 - "Community 4"
Cohesion: 0.21
Nodes (6): RootLayout(), cleanExpiredEntries(), createRateLimitMiddleware(), DELETE(), GET(), POST()

### Community 5 - "Community 5"
Cohesion: 0.26
Nodes (8): hasLocale(), fetchFooterContent(), getFooterContentFromSupabase(), getLocale(), normalizeLocale(), parseAcceptLanguage(), proxy(), redirectToLocalizedPath()

### Community 6 - "Community 6"
Cohesion: 0.25
Nodes (4): handleSubmit(), validateForm(), test(), isValidEmail()

### Community 7 - "Community 7"
Cohesion: 0.25
Nodes (5): AboutPage(), fetchData(), fetchTechStack(), getDictionary(), sanitizeImageUrl()

### Community 8 - "Community 8"
Cohesion: 0.43
Nodes (4): fetchMenu(), flattenMenu(), getMenuFromSupabase(), getSocialLinks()

### Community 9 - "Community 9"
Cohesion: 0.4
Nodes (3): handleClose(), handleLanguageChange(), loadLanguages()

### Community 10 - "Community 10"
Cohesion: 0.67
Nodes (5): isRetryableError(), resilientQuery(), resilientQueryArray(), resilientQuerySingle(), withTimeout()

### Community 11 - "Community 11"
Cohesion: 0.4
Nodes (2): useTheme(), ThemeCookieSync()

### Community 12 - "Community 12"
Cohesion: 0.7
Nodes (4): createAnonClient(), getAnonKey(), getUrl(), validateEnv()

### Community 13 - "Community 13"
Cohesion: 0.67
Nodes (2): fetchData(), fetchProjects()

## Knowledge Gaps
- **Thin community `Community 11`** (5 nodes): `ThemeConfigProvider.tsx`, `ThemeCookieSync.tsx`, `ThemeConfigProvider()`, `useTheme()`, `ThemeCookieSync()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (4 nodes): `ProjectsSection.tsx`, `fetchData()`, `fetchProjects()`, `getDictionary()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Error()` connect `Community 0` to `Community 1`, `Community 4`, `Community 5`, `Community 6`, `Community 7`, `Community 8`, `Community 9`, `Community 13`?**
  _High betweenness centrality (0.214) - this node is a cross-community bridge._
- **Why does `handleSubmit()` connect `Community 6` to `Community 0`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `createClient()` connect `Community 1` to `Community 0`, `Community 4`, `Community 7`, `Community 9`, `Community 12`, `Community 13`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Are the 33 inferred relationships involving `Error()` (e.g. with `GET()` and `POST()`) actually correct?**
  _`Error()` has 33 INFERRED edges - model-reasoned connections that need verification._
- **Are the 15 inferred relationships involving `createClient()` (e.g. with `GET()` and `POST()`) actually correct?**
  _`createClient()` has 15 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `generateMetadata()` (e.g. with `getSettings()` and `getBlogPostBySlug()`) actually correct?**
  _`generateMetadata()` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `GET()` (e.g. with `getLocale()` and `createRateLimitMiddleware()`) actually correct?**
  _`GET()` has 5 INFERRED edges - model-reasoned connections that need verification._
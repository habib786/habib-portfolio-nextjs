import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Box, Container, Grid } from '@mui/material'
import BlogPostContent from '@/components/blog/BlogPostContent'
import BlogPostSidebar from '@/components/blog/BlogPostSidebar'
import ArticleHero from '@/components/blog/ArticleHero'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/supabase/queries'

interface BlogPostPageProps {
  params: Promise<{ lang: string; slug: string }>
}

const DEFAULT_AUTHOR_BIO =
  'Full Stack Developer and AI Engineer focused on production-grade web applications.'

function mapPost(raw: any) {
  const tags = Array.isArray(raw?.tags) ? raw.tags : []
  const publishedAt = raw?.published_at || raw?.created_at || new Date().toISOString()

  return {
    id: raw?.id ?? 0,
    title: raw?.title ?? 'Untitled',
    slug: raw?.slug ?? '',
    excerpt: raw?.excerpt ?? '',
    content: raw?.content ?? '',
    featuredImage: raw?.cover_image ?? '',
    author: raw?.author ?? 'Habib Farooq',
    tags,
    published: Boolean(raw?.is_published),
    publishedAt,
    views: Number(raw?.views ?? 0),
    readTime: Number(raw?.read_time ?? 6),
    category: raw?.category ?? 'General',
    authorBio: raw?.author_bio ?? DEFAULT_AUTHOR_BIO,
    authorImage: raw?.author_image ?? '/api/placeholder/100/100',
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const rawPost = await getBlogPostBySlug(slug, lang)

  if (!rawPost) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const post = mapPost(rawPost)

return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params
  const rawPost = await getBlogPostBySlug(slug, lang)

  if (!rawPost) {
    notFound()
  }

  const post = mapPost(rawPost)
  const relatedRaw = await getBlogPosts(lang, 5)
  const related = (relatedRaw || [])
    .filter((item: any) => item.slug !== slug)
    .slice(0, 3)
    .map(mapPost)

  return (
    <Box sx={{ bgcolor: 'var(--background)', minHeight: '100vh', pb: { xs: 10, md: 20 } }}>
      <ArticleHero post={post} />

      <Container maxWidth="xl" sx={{ mt: { xs: -8, md: -12 }, position: 'relative', zIndex: 10 }}>
        <Box
          sx={{
            bgcolor: 'var(--background)',
            p: { xs: 4, md: 8 },
            borderRadius: '5px',
            boxShadow: '0 60px 120px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)',
            backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,1), rgba(248,250,252,1))',
          }}
        >
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <BlogPostContent post={post as any} />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <BlogPostSidebar post={post as any} relatedPosts={related as any} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

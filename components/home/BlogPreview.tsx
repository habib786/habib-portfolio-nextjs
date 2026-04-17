'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Eye, ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatDate, calculateReadTime } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const defaultBlogPosts = [
  {
    id: '1',
    title: 'Building Scalable Next.js Applications with TypeScript',
    slug: 'building-scalable-nextjs-applications-with-typescript',
    excerpt: 'Learn how to architect and build scalable Next.js applications using TypeScript, proper folder structure, and best practices.',
    author: 'Habib Farooq',
    published_at: '2024-03-15',
    is_published: true,
  },
  {
    id: '2',
    title: 'Mastering React Performance Optimization',
    slug: 'mastering-react-performance-optimization',
    excerpt: 'Advanced techniques for optimizing React applications including memoization, code splitting, and virtualization.',
    author: 'Habib Farooq',
    published_at: '2024-02-28',
    is_published: true,
  },
  {
    id: '3',
    title: 'Implementing Authentication in Next.js with Supabase',
    slug: 'implementing-authentication-in-nextjs-with-supabase',
    excerpt: 'A comprehensive guide to implementing secure authentication in Next.js applications using Supabase Auth.',
    author: 'Habib Farooq',
    published_at: '2024-02-10',
    is_published: true,
  },
  {
    id: '4',
    title: 'The Future of AI in Web Development',
    slug: 'future-of-ai-in-web-development',
    excerpt: 'Exploring how artificial intelligence is transforming web development and what developers need to know.',
    author: 'Habib Farooq',
    published_at: '2024-01-22',
    is_published: true,
  },
]

const popularTags = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'AI', 'Web Development',
  'Performance', 'Security', 'Database', 'Cloud', 'DevOps', 'Tutorial'
]

import { usePathname } from 'next/navigation'
import { Chip, Box, TextField, Stack, Typography } from '@mui/material'

export default function BlogPreview() {
  const pathname = usePathname()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [blogPosts, setBlogPosts] = useState<any[]>(defaultBlogPosts)

  useEffect(() => {
    async function fetchData(lang: string) {
      const supabase = createClient()
      if (!supabase) return []

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .eq('language', lang)
        .order('published_at', { ascending: false })
        .limit(4)

      if (error) throw error
      return data || []
    }

    async function fetchPosts() {
      try {
        const localeMatch = pathname.match(/^\/([a-z]{2}-[A-Z]{2})/);
        const currentLanguage = localeMatch ? localeMatch[1] : 'en-CA';

        let data = await fetchData(currentLanguage)

        // Fallback to en-CA
        if (data.length === 0 && currentLanguage !== 'en-CA') {
          data = await fetchData('en-CA')
        }

        if (data && data.length > 0) {
          setBlogPosts(data)
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err)
      }
    }
    fetchPosts()
  }, [pathname])

  const filteredPosts = selectedTag
    ? blogPosts.filter(post => (post.tags || []).includes(selectedTag))
    : blogPosts


  return (
    <Box sx={{ width: '100%', py: 4 }}>
      {/* Tags Filter */}
      <Stack direction="row" spacing={1} sx={{ mb: 6, gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Chip
          label="All Posts"
          onClick={() => setSelectedTag(null)}
          color={!selectedTag ? "primary" : "default"}
          variant={!selectedTag ? "filled" : "outlined"}
          sx={{ borderRadius: 1, fontWeight: 500 }}
        />
        {popularTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => setSelectedTag(tag)}
            color={selectedTag === tag ? "primary" : "default"}
            variant={selectedTag === tag ? "filled" : "outlined"}
            sx={{ borderRadius: 1, fontWeight: 500 }}
          />
        ))}
      </Stack>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="group relative overflow-hidden rounded-[5px] border bg-card shadow-sm hover:shadow-lg transition-all"
          >
            {/* Featured Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-muted-foreground/30" />
              </div>
              
              {/* Tags overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                {(post.tags || []).slice(0, 2).map((tag: string) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.9)', color: 'text.primary', border: 'none' }}
                  />
                ))}
              </div>
              
              {/* Stats overlay - views not in schema by default */}
              {post.views && (
                <div className="absolute bottom-4 right-4 flex items-center space-x-3 text-sm text-background/90">
                  <div className="flex items-center space-x-1 backdrop-blur-sm bg-white/20 px-2 py-1 rounded-full">
                    <Eye className="h-3 w-3" />
                    <span>{Number(post.views).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              {/* Meta Information */}
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.published_at}>
                      {formatDate(post.published_at)}
                    </time>
                  </div>
                  {post.read_time && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.read_time} min read</span>
                    </div>
                  )}
                </div>
                <span className="font-medium">{post.author}</span>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
                  {(post.tags || []).map((tag: string) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      onClick={() => setSelectedTag(tag)}
                      sx={{ cursor: 'pointer', borderRadius: 1 }}
                    />
                  ))}
                </Stack>
              </div>

              {/* Read More Button */}
              <Button variant="ghost" size="sm" className="w-full group/btn" asChild>
                <Link href={`/blog/${post.slug}`}>
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center pt-8">
        <Button size="lg" asChild>
          <Link href="/blog">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Newsletter Signup */}
      <Box sx={{ mt: 10, pt: 8, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ maxWidth: 'sm', mx: 'auto', textAlign: 'center' }}>
          <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '50%', bgcolor: 'primary.lighter', color: 'primary.main', mb: 3 }}>
            <BookOpen size={32} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Stay Updated</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Subscribe to my newsletter to get notified about new articles, tutorials, and insights.
          </Typography>
          
          <Box component="form" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, maxWidth: 460, mx: 'auto' }}>
            <TextField
              placeholder="Enter your email"
              type="email"
              required
              fullWidth
              size="medium"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
            />
            <Button type="submit" size="lg" sx={{ height: 56, px: 4 }}>
              Subscribe
            </Button>
          </Box>
          <Typography variant="caption"  color="text.secondary" sx={{ mt: 3 }}>
            No spam. Unsubscribe at any time.
          </Typography>
        </Box>
      </Box>
    </Box>

  )
}
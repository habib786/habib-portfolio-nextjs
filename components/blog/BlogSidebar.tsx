'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TrendingUp, Clock, BookOpen, Tag, Users, Mail, ChevronDown } from 'lucide-react'
import { Box, Typography, Button, TextField, Card, CardContent, Chip, Stack, Accordion, AccordionSummary, AccordionDetails, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

// Mock data - will be replaced with Supabase data
const fallbackPopularPosts = [
  {
    id: 1,
    title: 'The Future of AI in Web Development',
    slug: 'future-of-ai-in-web-development',
    views: 2103,
  },
  {
    id: 2,
    title: 'TypeScript Best Practices for Large Applications',
    slug: 'typescript-best-practices-for-large-applications',
    views: 1789,
  },
  {
    id: 3,
    title: 'Implementing Authentication in Next.js with Supabase',
    slug: 'implementing-authentication-in-nextjs-with-supabase',
    views: 1567,
  },
  {
    id: 4,
    title: 'Building Scalable Next.js Applications',
    slug: 'building-scalable-nextjs-applications-with-typescript',
    views: 1245,
  },
  {
    id: 5,
    title: 'Building Real-time Applications with WebSockets',
    slug: 'building-real-time-applications-with-websockets',
    views: 1342,
  },
]

const fallbackPopularTags = [
  { name: 'Next.js', count: 12 },
  { name: 'React', count: 18 },
  { name: 'TypeScript', count: 15 },
  { name: 'AI', count: 8 },
  { name: 'Web Development', count: 22 },
  { name: 'Security', count: 7 },
  { name: 'Performance', count: 9 },
  { name: 'Tutorial', count: 14 },
  { name: 'JavaScript', count: 20 },
  { name: 'Supabase', count: 6 },
]

const fallbackCategories = [
  { name: 'Web Development', count: 25, color: '#3b82f6' },
  { name: 'AI & Machine Learning', count: 8, color: '#a855f7' },
  { name: 'Security', count: 7, color: '#ef4444' },
  { name: 'Performance', count: 9, color: '#22c55e' },
  { name: 'Tutorials', count: 14, color: '#eab308' },
  { name: 'Career', count: 5, color: '#6366f1' },
]

export default function BlogSidebar() {
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [popularPosts, setPopularPosts] = useState(fallbackPopularPosts)
  const [popularTags, setPopularTags] = useState(fallbackPopularTags)
  const [categories, setCategories] = useState(fallbackCategories)

  useEffect(() => {
    async function loadSidebarData() {
      try {
        const supabase = createClient()
        if (!supabase) return

        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false })
          .limit(100)

        if (error || !data || data.length === 0) return

        const mappedPosts = data
          .map((post: any) => ({
            id: post.id,
            title: post.title,
            slug: post.slug,
            views: Number(post.views || 0),
          }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 5)

        const tagCount = new Map<string, number>()
        const categoryCount = new Map<string, number>()

        data.forEach((post: any) => {
          const tags = Array.isArray(post.tags) ? post.tags : []
          tags.forEach((tag: string) => {
            tagCount.set(tag, (tagCount.get(tag) || 0) + 1)
          })

          const category = post.category || 'General'
          categoryCount.set(category, (categoryCount.get(category) || 0) + 1)
        })

        const mappedTags = Array.from(tagCount.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)

        const palette = ['#3b82f6', '#a855f7', '#ef4444', '#22c55e', '#eab308', '#6366f1']
        const mappedCategories = Array.from(categoryCount.entries()).map(([name, count], index) => ({
          name,
          count,
          color: palette[index % palette.length],
        }))

        if (mappedPosts.length > 0) setPopularPosts(mappedPosts as any)
        if (mappedTags.length > 0) setPopularTags(mappedTags as any)
        if (mappedCategories.length > 0) setCategories(mappedCategories as any)
      } catch (error) {
        console.error('Failed to load blog sidebar data:', error)
      }
    }

    loadSidebarData()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic
    console.log('Subscribing email:', email)
    setEmail('')
    // Show success message
  }

  const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* About Card */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants}>
        <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[2], '&:hover': { boxShadow: theme.shadows[4] }, transition: 'all 0.3s' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'primary.main', color: 'primary.contrastText', display: 'flex' }}>
                <BookOpen size={24} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>About the Blog</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Welcome to my blog where I share insights, tutorials, and experiences 
              about web development, AI, and modern technology.
            </Typography>
            <Stack direction="row" spacing={3} color="text.secondary">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Users size={16} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>1,000+ readers</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BookOpen size={16} />
                <Typography variant="caption" sx={{ fontWeight: 600 }}>50+ articles</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>

      {/* Popular Posts */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.1 }}>
        <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[2], '&:hover': { boxShadow: theme.shadows[4] }, transition: 'all 0.3s' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'primary.main', color: 'primary.contrastText', display: 'flex' }}>
                <TrendingUp size={24} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Popular Posts</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {popularPosts.map((post, index) => (
                <Box 
                  key={post.id} 
                  component={Link} 
                  href={`/blog/${post.slug}`}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 2, 
                    p: 1.5, 
                    borderRadius: 2, 
                    textDecoration: 'none',
                    color: 'text.primary',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      '& .post-title': { color: 'primary.main' }
                    }
                  }}
                >
                  <Box sx={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', bgcolor: 'action.selected', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {index + 1}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography 
                      variant="subtitle2" 
                      className="post-title"
                      sx={{ fontWeight: 600, mb: 0.5, transition: 'color 0.2s' }}
                    >
                      {post.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                      <Clock size={12} />
                      <Typography variant="caption">{post.views.toLocaleString()} views</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Categories */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.2 }}>
        <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[2], '&:hover': { boxShadow: theme.shadows[4] }, transition: 'all 0.3s' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'primary.main', color: 'primary.contrastText', display: 'flex' }}>
                <Tag size={24} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Categories</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {categories.map((category) => (
                <Box
                  key={category.name}
                  component={Link}
                  href={`/blog?category=${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: 2,
                    textDecoration: 'none',
                    color: 'text.primary',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      '& .cat-name': { color: 'primary.main' }
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: category.color }} />
                    <Typography variant="body2" className="cat-name" sx={{ fontWeight: 500, transition: 'color 0.2s' }}>
                      {category.name}
                    </Typography>
                  </Box>
                  <Chip size="small" label={category.count} sx={{ height: 24, fontSize: '0.75rem', fontWeight: 600 }} />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Popular Tags */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.3 }}>
        <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[2], '&:hover': { boxShadow: theme.shadows[4] }, transition: 'all 0.3s' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Popular Tags</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {popularTags.map((tag) => (
                <Chip
                  key={tag.name}
                  component={Link}
                  href={`/blog?tag=${tag.name.toLowerCase()}`}
                  label={
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box component="span">#{tag.name}</Box>
                      <Box component="span" sx={{ opacity: 0.7, fontSize: '0.7rem' }}>({tag.count})</Box>
                    </Box>
                  }
                  clickable
                  variant="outlined"
                  sx={{ 
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'translateY(-2px)'
                    }
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Newsletter Subscription */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.4 }}>
        <Card 
          sx={{ 
            borderRadius: 3, 
            background: 'linear-gradient(135deg, #106A5A 0%, #0d594b 100%)',
            color: 'white',
            boxShadow: theme.shadows[4]
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.2)', display: 'flex' }}>
                <Mail size={24} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Newsletter</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
              Subscribe to get notified about new articles, tutorials, and exclusive content.
            </Typography>
            <form onSubmit={handleSubscribe}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      borderRadius: 2,
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.6)' },
                      '&.Mui-focused fieldset': { borderColor: '#FACC15' },
                    },
                    '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.6)', opacity: 1 }
                  }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#106A5A', 
                    fontWeight: 'bold',
                    py: 1.5,
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </form>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.7, textAlign: 'center' }}>
              No spam. Unsubscribe at any time.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>

      {/* Archive */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.5 }}>
        <Card sx={{ borderRadius: 3, boxShadow: theme.shadows[2], '&:hover': { boxShadow: theme.shadows[4] }, transition: 'all 0.3s' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Archive</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['2024', '2023', '2022', '2021'].map((year) => (
                <Accordion 
                  key={year} 
                  disableGutters 
                  elevation={0}
                  sx={{ 
                    bgcolor: 'transparent',
                    '&:before': { display: 'none' },
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '8px !important',
                    overflow: 'hidden'
                  }}
                >
                  <AccordionSummary 
                    expandIcon={<ChevronDown size={20} />}
                    sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                      <Typography sx={{ fontWeight: 500 }}>{year}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>12 articles</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0, px: 2, pb: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {['January', 'February', 'March', 'April'].map((month) => (
                        <Box
                          key={month}
                          component={Link}
                          href={`/blog?year=${year}&month=${month.toLowerCase()}`}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            p: 1,
                            borderRadius: 1,
                            textDecoration: 'none',
                            color: 'text.primary',
                            '&:hover': { bgcolor: 'action.hover', color: 'primary.main' }
                          }}
                        >
                          <Typography variant="body2">{month}</Typography>
                          <Typography variant="body2" color="text.secondary">3</Typography>
                        </Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}

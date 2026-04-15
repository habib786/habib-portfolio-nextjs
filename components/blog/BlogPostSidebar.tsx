'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, Clock, BookOpen, Tag, Calendar, Eye, Mail, ChevronDown } from 'lucide-react'
import {
  Box, Typography, Button, TextField, Card, CardContent,
  Chip, Stack, Accordion, AccordionSummary, AccordionDetails, useTheme
} from '@mui/material'
import { motion } from 'framer-motion'

interface BlogPostSidebarProps {
  post: {
    id: number
    title: string
    slug: string
    tags: string[]
    category: string
    publishedAt: string
    views: number
    readTime: number
  }
  relatedPosts?: Array<{
    id: number | string
    title: string
    slug: string
    excerpt?: string
    category?: string
    readTime?: number
  }>
}

// Mock data - will be replaced with Supabase data
const fallbackRelatedPosts = [
  {
    id: 2,
    title: 'Mastering React Performance Optimization',
    slug: 'mastering-react-performance-optimization',
    excerpt: 'Advanced techniques for optimizing React applications.',
    category: 'Web Development',
    readTime: 12,
  },
  {
    id: 3,
    title: 'Implementing Authentication in Next.js with Supabase',
    slug: 'implementing-authentication-in-nextjs-with-supabase',
    excerpt: 'A comprehensive guide to secure authentication.',
    category: 'Security',
    readTime: 10,
  },
  {
    id: 5,
    title: 'TypeScript Best Practices for Large Applications',
    slug: 'typescript-best-practices-for-large-applications',
    excerpt: 'Essential TypeScript patterns and practices.',
    category: 'Web Development',
    readTime: 11,
  },
]

const tableOfContents = [
  { id: 'why-scalability-matters', title: 'Why Scalability Matters', level: 2 },
  { id: 'project-structure', title: 'Project Structure', level: 2 },
  { id: 'typescript-best-practices', title: 'TypeScript Best Practices', level: 2 },
  { id: 'performance-optimization', title: 'Performance Optimization', level: 2 },
  { id: 'state-management', title: 'State Management', level: 2 },
  { id: 'testing-strategy', title: 'Testing Strategy', level: 2 },
  { id: 'deployment-and-monitoring', title: 'Deployment and Monitoring', level: 2 },
  { id: 'conclusion', title: 'Conclusion', level: 2 },
  { id: 'next-steps', title: 'Next Steps', level: 3 },
]

const cardVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function BlogPostSidebar({ post, relatedPosts }: BlogPostSidebarProps) {
  const theme = useTheme()
  const [activeSection, setActiveSection] = useState<string>('')
  const [email, setEmail] = useState('')

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Subscribing:', email)
    setEmail('')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Table of Contents */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants}>
        <Card
          sx={{
            borderRadius: '5px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid var(--border)',
            '&:hover': { boxShadow: '0 8px 30px rgba(16,106,90,0.12)' },
            transition: 'all 0.3s',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1, borderRadius: '5px', bgcolor: 'var(--primary)', color: 'white', display: 'flex' }}>
                <BookOpen size={20} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Table of Contents</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {tableOfContents.map(item => (
                <Box
                  key={item.id}
                  component="button"
                  onClick={() => handleScrollToSection(item.id)}
                  sx={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    pl: `${(item.level - 1) * 16 + 12}px`,
                    pr: 1.5,
                    py: 1,
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: activeSection === item.id ? 700 : 500,
                    bgcolor: activeSection === item.id ? 'var(--primary)' : 'transparent',
                    color: activeSection === item.id ? 'white' : 'var(--muted-foreground)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: activeSection === item.id ? 'var(--primary)' : 'rgba(16,106,90,0.06)',
                      color: activeSection === item.id ? 'white' : 'var(--primary)',
                    },
                  }}
                >
                  {item.title}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Article Stats */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.1 }}>
        <Card
          sx={{
            borderRadius: '5px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid var(--border)',
            '&:hover': { boxShadow: '0 8px 30px rgba(16,106,90,0.12)' },
            transition: 'all 0.3s',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Article Stats</Typography>
            <Stack spacing={2}>
              {[
                {
                  icon: <Calendar size={16} />,
                  label: 'Published',
                  value: new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                },
                { icon: <Clock size={16} />, label: 'Reading Time', value: `${post.readTime} minutes` },
                { icon: <Eye size={16} />, label: 'Views', value: post.views.toLocaleString() },
                { icon: <Tag size={16} />, label: 'Category', value: post.category },
              ].map(stat => (
                <Box
                  key={stat.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 1,
                    borderBottom: '1px solid var(--border)',
                    '&:last-child': { borderBottom: 'none', pb: 0 },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'var(--muted-foreground)' }}>
                    {stat.icon}
                    <Typography variant="body2">{stat.label}</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </motion.div>

      {/* Related Articles */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.2 }}>
        <Card
          sx={{
            borderRadius: '5px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid var(--border)',
            '&:hover': { boxShadow: '0 8px 30px rgba(16,106,90,0.12)' },
            transition: 'all 0.3s',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ p: 1, borderRadius: '5px', bgcolor: 'var(--primary)', color: 'white', display: 'flex' }}>
                <TrendingUp size={20} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Related Articles</Typography>
            </Box>
            <Stack spacing={2}>
              {(relatedPosts?.length ? relatedPosts : fallbackRelatedPosts).map(relatedPost => (
                <Box
                  key={relatedPost.id}
                  component={Link}
                  href={`/blog/${relatedPost.slug}`}
                  sx={{
                    display: 'block',
                    p: 2,
                    borderRadius: '5px',
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                    color: 'var(--foreground)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      borderColor: 'var(--primary)',
                      boxShadow: '0 8px 20px rgba(16,106,90,0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip
                      label={relatedPost.category}
                      size="small"
                      sx={{ bgcolor: 'rgba(16,106,90,0.08)', color: 'var(--primary)', fontWeight: 700, borderRadius: '5px', fontSize: '0.7rem' }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--muted-foreground)' }}>
                      <Clock size={12} />
                      <Typography variant="caption">{relatedPost.readTime ?? 6} min</Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {relatedPost.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {relatedPost.excerpt}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </motion.div>

      {/* Popular Tags */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.3 }}>
        <Card
          sx={{
            borderRadius: '5px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid var(--border)',
            '&:hover': { boxShadow: '0 8px 30px rgba(16,106,90,0.12)' },
            transition: 'all 0.3s',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Tags</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {post.tags.map(tag => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  component={Link}
                  href={`/blog?tag=${tag.toLowerCase()}`}
                  clickable
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: '5px',
                    fontWeight: 600,
                    '&:hover': { bgcolor: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' },
                    transition: 'all 0.25s',
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Newsletter */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.4 }}>
        <Card
          sx={{
            borderRadius: '5px',
            background: 'linear-gradient(135deg, var(--primary) 0%, #0d594b 100%)',
            color: 'white',
            boxShadow: '0 20px 40px rgba(16,106,90,0.25)',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box sx={{ p: 1, borderRadius: '5px', bgcolor: 'rgba(255,255,255,0.2)', display: 'flex' }}>
                <Mail size={20} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Stay Updated</Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.7 }}>
              Get notified about new articles, tutorials, and exclusive content.
            </Typography>
            <form onSubmit={handleSubscribe}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      borderRadius: '5px',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.6)' },
                      '&.Mui-focused fieldset': { borderColor: '#FACC15' },
                    },
                    '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.6)', opacity: 1 },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#FACC15',
                    color: 'black',
                    fontWeight: 800,
                    py: 1.5,
                    borderRadius: '5px',
                    letterSpacing: 1,
                    '&:hover': { bgcolor: 'white' },
                  }}
                >
                  Subscribe
                </Button>
              </Stack>
            </form>
            <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.7, textAlign: 'center' }}>
              No spam. Unsubscribe at any time.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>

      {/* Share Buttons */}
      <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.5 }}>
        <Card
          sx={{
            borderRadius: '5px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid var(--border)',
            '&:hover': { boxShadow: '0 8px 30px rgba(16,106,90,0.12)' },
            transition: 'all 0.3s',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Share This Article</Typography>
            <Stack spacing={1.5}>
              {[
                {
                  label: 'Share on Twitter / X',
                  color: '#1DA1F2',
                  onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank'),
                },
                {
                  label: 'Share on LinkedIn',
                  color: '#0077B5',
                  onClick: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank'),
                },
                {
                  label: 'Copy Link',
                  color: 'var(--primary)',
                  onClick: () => {
                    navigator.clipboard.writeText(window.location.href)
                    alert('Link copied to clipboard!')
                  },
                },
              ].map(btn => (
                <Button
                  key={btn.label}
                  variant="outlined"
                  fullWidth
                  onClick={btn.onClick}
                  sx={{
                    borderRadius: '5px',
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                    fontWeight: 600,
                    justifyContent: 'flex-start',
                    px: 2,
                    '&:hover': { borderColor: btn.color, color: btn.color, bgcolor: 'transparent' },
                    transition: 'all 0.25s',
                  }}
                >
                  {btn.label}
                </Button>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  )
}

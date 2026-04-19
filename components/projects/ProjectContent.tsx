'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Share2, Bookmark, Code, ExternalLink, Star } from 'lucide-react'
import { Box, Typography, Chip, Stack, IconButton, Button } from '@mui/material'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ProjectContentProps {
  project: {
    id: number
    title: string
    slug: string
    excerpt: string
    content: string
    thumbnail: string
    category: string
    technologies: string[]
    liveUrl?: string
    repoUrl?: string
    tags: string[]
    createdAt: string
    views: number
  }
}

export default function ProjectContent({ project }: ProjectContentProps) {
  const pathname = usePathname()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [starCount, setStarCount] = useState(128)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: project.title, text: project.excerpt, url: window.location.href })
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleStar = () => {
    setStarCount((prev) => prev + 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Chip
          label={project.category}
          size="small"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 600,
            mb: 2,
          }}
        />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
          {project.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
          {project.excerpt}
        </Typography>
      </Box>

      <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}>
        {project.technologies.map((tech) => (
          <Chip key={tech} label={tech} variant="outlined" size="small" />
        ))}
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button
          component={Link}
          variant="contained"
          startIcon={<ExternalLink />}
          href={project.liveUrl || '#'}
          target={project.liveUrl ? "_blank" : undefined}
          rel={project.liveUrl ? "noopener noreferrer" : undefined}
          disabled={!project.liveUrl}
        >
          Live Demo
        </Button>
        <Button
          component={Link}
          variant="outlined"
          startIcon={<Code />}
          href={project.repoUrl || '#'}
          target={project.repoUrl ? "_blank" : undefined}
          rel={project.repoUrl ? "noopener noreferrer" : undefined}
          disabled={!project.repoUrl}
        >
          View Code
        </Button>
        <IconButton onClick={handleShare} aria-label="share">
          <Share2 />
        </IconButton>
        <IconButton onClick={() => setIsBookmarked(!isBookmarked)} aria-label="bookmark">
          <Bookmark fill={isBookmarked ? 'currentColor' : 'none'} />
        </IconButton>
        <IconButton onClick={handleStar} aria-label="star">
          <Star fill={starCount > 128 ? 'currentColor' : 'none'} />
        </IconButton>
        <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
          {starCount}
        </Typography>
      </Stack>

      <Box sx={{ 
        '& h1': { fontSize: '2rem', fontWeight: 700, mt: 4, mb: 2 },
        '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 4, mb: 2 },
        '& h3': { fontSize: '1.25rem', fontWeight: 600, mt: 3, mb: 2 },
        '& p': { fontSize: '1rem', lineHeight: 1.8, mb: 2 },
        '& ul, & ol': { pl: 3, mb: 2 },
        '& li': { mb: 1 },
        '& code': { 
          bgcolor: '#1e1e1e', 
          color: '#d4d4d4', 
          px: 1, 
          py: 0.5, 
          borderRadius: 1,
          fontSize: '0.875rem',
        },
        '& pre': { mb: 3 },
        '& a': { color: 'primary.main', textDecoration: 'underline' },
        '& img': { maxWidth: '100%', borderRadius: 2 },
      }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              const inline = !match
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {project.content}
        </ReactMarkdown>
      </Box>
    </motion.div>
  )
}
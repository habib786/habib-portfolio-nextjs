'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Box, Container, Typography, Chip, Stack } from '@mui/material'
import { Clock, Eye, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ArticleHeroProps {
  post: {
    title: string
    category: string
    author: string
    publishedAt: string
    views: number
    readTime: number
    featuredImage?: string
  }
}

export default function ArticleHero({ post }: ArticleHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 150])
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <Box
      ref={containerRef}
      sx={{
        bgcolor: 'var(--primary)',
        position: 'relative',
        pt: { xs: 12, md: 18 },
        pb: { xs: 22, md: 30 },
        overflow: 'hidden',
        color: 'white',
      }}
    >
      {/* Wavy SVG Decor with Parallax */}
      <motion.div 
        style={{ y: yBg, opacity: 0.1, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1440 1000" fill="none" preserveAspectRatio="none">
          <path d="M0 600C400 500 800 700 1200 600C1400 550 1440 600 1440 600V1000H0V600Z" fill="white" fillOpacity="0.05" />
          <path d="M-100 700C300 550 800 850 1300 700C1500 640 1600 700 1600 700V1000H-100V700Z" fill="white" fillOpacity="0.03" />
          <path d="M0 200 Q 360 400 720 200 T 1440 200" stroke="white" strokeWidth="1" strokeDasharray="20 20" opacity="0.2" />
        </svg>
      </motion.div>

      {/* Featured image blurred background overlay with Parallax */}
      {post.featuredImage && (
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, 100]),
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage: `url(${post.featuredImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08,
            filter: 'blur(4px)',
          }}
        />
      )}

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          style={{ y: yContent, opacity: opacityFade }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
          {/* Category badge */}
          <Box sx={{ mb: 3 }}>
            <Chip
              label={post.category}
              sx={{
                bgcolor: '#FACC15',
                color: 'black',
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                height: 32,
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
              lineHeight: 1.1,
              mb: 1,
              textShadow: '0 10px 30px rgba(0,0,0,0.25)',
              maxWidth: 900,
            }}
          >
            {post.title}
          </Typography>

          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 220 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ height: 10, marginLeft: '2px', marginBottom: '32px' }}
          >
            <svg width="100%" height="100%" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
              <path d="M2 10C2 10 21.0544 2 59.8665 2C98.6787 2 118 10 118 10" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Meta */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} useFlexGap sx={{ color: 'rgba(255,255,255,0.8)', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
               <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '10px',
                  bgcolor: '#FACC15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'black',
                  fontWeight: 900,
                  fontSize: '0.9rem',
                }}
              >
                {post.author.charAt(0)}
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{post.author}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Calendar size={15} />
              <Typography variant="body2">{formatDate(post.publishedAt)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Clock size={15} />
              <Typography variant="body2">{post.readTime} min read</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Eye size={15} />
              <Typography variant="body2">{post.views.toLocaleString()} views</Typography>
            </Box>
          </Stack>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  )
}

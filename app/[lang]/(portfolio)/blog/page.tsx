'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Box, Container, Typography, Grid, Stack } from '@mui/material'
import Link from 'next/link'
import BlogGrid from '@/components/blog/BlogGrid'
import BlogSidebar from '@/components/blog/BlogSidebar'
import WavyHeroBackground from '@/components/shared/WavyHeroBackground'
import AnimatedWaveSeparator from '@/components/shared/AnimatedWaveSeparator'
import ElevatedContentCard from '@/components/shared/ElevatedContentCard'
import { useProfileImage } from '@/lib/hooks/useProfileImage'
import AnimatedSquigglyLine from '@/components/animations/AnimatedSquigglyLine'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60'

export default function BlogPage() {
  const profileImage = useProfileImage()
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE
  }

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -80])
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <Box sx={{ bgcolor: 'var(--background)', minHeight: '100vh', pb: { xs: 10, md: 20 } }}>
      {/* ── Hero Header ── */}
      <Box
        ref={heroRef}
        sx={{
          bgcolor: 'var(--primary)',
          position: 'relative',
          pt: { xs: 12, md: 20 },
          pb: { xs: 20, md: 30 },
          overflow: 'hidden',
          color: 'white',
        }}
      >
        {/* Wavy SVG Background Decor */}
        <WavyHeroBackground animated={false} />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container sx={{ alignItems: 'center' }} spacing={{ xs: 6, md: 4 }}>
            {/* Left: Animated Title */}
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: '3.5rem', sm: '4.5rem', md: '5.5rem' },
                      lineHeight: 1,
                      textTransform: 'uppercase',
                      mb: 2,
                      textShadow: '0 20px 40px rgba(0,0,0,0.2)',
                      fontFamily: 'inherit',
                    }}
                  >
                    BLOG &amp;
                    <br />
                    ARTICLES
                  </Typography>
                  <AnimatedSquigglyLine width="100%" delay={0.3} />

                </Box>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 4, color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 560 }}
                  >
                    Sharing knowledge, insights, and experiences about web development,
                    artificial intelligence, and modern technology.
                  </Typography>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Right: Portrait — Squircle Shape */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, position: 'relative' }}>
              <motion.div style={{ y: yImage, scale: scaleImage, opacity: opacityHero, position: 'relative' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.2, type: 'spring' }}
                  style={{ position: 'relative', width: 380, height: 380 }}
                >
                  <motion.div
                    animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'relative', width: '100%', height: '100%' }}
                  >
                    {/* Background Yellow Squircle */}
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        bottom: -15, 
                        left: '50%', 
                        transform: 'translateX(-50%)', 
                        width: '105%', 
                        height: '105%', 
                        bgcolor: '#FACC15', 
                        borderRadius: '30%',
                        zIndex: 0 
                      }} 
                    />
                    {/* Image Container */}
                    <Box 
                      sx={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '100%', 
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        borderRadius: '30%',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                      }}
                    >
                      <img 
                        src={profileImage}
                        alt="Habib"
                        onError={handleImgError}
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'top'
                        }}
                      />
                    </Box>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        <AnimatedWaveSeparator />
      </Box>

      {/* ── Main Content Area (overlapping card) ── */}
      <Container maxWidth="xl" sx={{ mt: { xs: -10, md: -15 }, position: 'relative', zIndex: 10 }}>
        <ElevatedContentCard>
          {/* Section Label */}
          <Stack spacing={1} sx={{ mb: { xs: 6, md: 10 } }}>
            <Typography
              variant="body2"
              sx={{ color: 'var(--primary)', fontWeight: 900, letterSpacing: 3, textTransform: 'uppercase', fontSize: '0.8rem' }}
            >
              Insights &amp; Tutorials
            </Typography>
            <Box sx={{ position: 'relative', width: 'fit-content' }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: 3,
                  color: 'var(--foreground)',
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  lineHeight: 1.2,
                  mb: 1
                }}
              >
                LATEST.<br />ARTICLES.<br />IDEAS.
              </Typography>


            </Box>

          </Stack>

          {/* Grid: Blog + Sidebar */}
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <BlogGrid />
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <BlogSidebar />
              </motion.div>
            </Grid>
          </Grid>
        </ElevatedContentCard>
      </Container>

      {/* ── CTA Section ── */}
      <Box sx={{ mt: { xs: 15, md: 25 }, mb: 10 }}>
        <Container maxWidth="lg" sx={{ overflow: 'visible' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 10, md: 0 },
              overflow: 'visible',
              pr: { md: 12 }, /* room for rotated diamond corners */
            }}
          >
            {/* Text Oval */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ zIndex: 2 }}
            >
              <Box
                sx={{
                  width: { xs: 320, md: 500 },
                  height: { xs: 320, md: 500 },
                  borderRadius: '50%',
                  bgcolor: 'white',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  p: { xs: 6, md: 10 },
                  boxShadow: '0 40px 80px rgba(0,0,0,0.05)',
                  mr: { md: -10 },
                }}
              >
                <Stack spacing={4} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                  <Typography
                    variant="body2"
                    sx={{ color: 'var(--primary)', fontWeight: 900, letterSpacing: 3, textTransform: 'uppercase', fontSize: '0.8rem' }}
                  >
                    Have a project in mind?
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      color: 'var(--foreground)',
                      lineHeight: 1,
                      fontSize: { xs: '1.8rem', md: '3rem' },
                      letterSpacing: -1,
                    }}
                  >
                    LET'S TALK<br />ABOUT YOUR<br />PROJECT
                  </Typography>
                  <Link href="/contact#contact-form" style={{ textDecoration: 'none' }}>
                    <Box
                      sx={{
                        bgcolor: 'var(--primary)',
                        color: 'white',
                        px: 8,
                        py: 2.5,
                        borderRadius: '50px',
                        fontWeight: 900,
                        fontSize: '0.9rem',
                        letterSpacing: 3,
                        '&:hover': {
                          bgcolor: 'black',
                          transform: 'translateY(-5px) scale(1.02)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        },
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 15px 30px rgba(16,106,90,0.4)',
                      }}
                    >
                      LET'S TALK →
                    </Box>
                  </Link>
                </Stack>
              </Box>
            </motion.div>

            {/* Portrait — Diamond Shape CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, type: 'spring' }}
              style={{ zIndex: 1, position: 'relative', width: 340, height: 340, marginLeft: '-40px', flexShrink: 0 }}
            >
              <motion.div
                animate={{ filter: ['drop-shadow(0 0 0px rgba(250,204,21,0))', 'drop-shadow(0 0 40px rgba(250,204,21,0.6))', 'drop-shadow(0 0 0px rgba(250,204,21,0))'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '100%', position: 'relative' }}
              >
                {/* Yellow back layer — slightly larger, offset down */}
                <Box sx={{
                  position: 'absolute',
                  inset: '-8px',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  bgcolor: '#FACC15',
                  zIndex: 0,
                  transform: 'translateY(10px)',
                }} />
                {/* Image diamond — clip-path keeps it in its layout box, no overflow clipping */}
                <Box sx={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  overflow: 'hidden',
                  zIndex: 1,
                }}>
                  <img 
                    src={profileImage}
                    alt="Habib"
                    onError={handleImgError}
                    style={{ 
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                    }}
                  />
                </Box>
              </motion.div>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

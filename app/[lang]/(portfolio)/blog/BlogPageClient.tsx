'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Box, Container, Typography, Grid, Stack } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import BlogGrid from '@/components/blog/BlogGrid'
import BlogSidebar from '@/components/blog/BlogSidebar'
import WavyHeroBackground from '@/components/shared/WavyHeroBackground'
import AnimatedWaveSeparator from '@/components/shared/AnimatedWaveSeparator'
import ElevatedContentCard from '@/components/shared/ElevatedContentCard'
import { useProfileImage } from '@/lib/hooks/useProfileImage'
import AnimatedSquigglyLine from '@/components/animations/AnimatedSquigglyLine'
import BlogCTASection from '@/components/blog/BlogCTASection'

export default function BlogPageClient() {
  const [imgError, setImgError] = useState(false)
  const profileImage = useProfileImage()
  const handleImgError = () => setImgError(true)

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
                      <AnimatePresence mode="wait">
                        {imgError ? (
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              bgcolor: '#e5e5e5',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography sx={{ color: '#999' }}>Image</Typography>
                          </Box>
                        ) : (
                          <Image 
                            src={profileImage}
                            alt="Habib"
                            fill
                            className="object-cover"
                            onError={handleImgError}
                          />
                        )}
                      </AnimatePresence>
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
      <BlogCTASection profileImage={profileImage} />
    </Box>
  )
}

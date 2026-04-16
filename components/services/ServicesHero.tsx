'use client'

import React, { useRef } from 'react'
import { Box, Container, Typography, Grid, Paper } from '@mui/material'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import WavyHeroBackground from '@/components/shared/WavyHeroBackground'
import AnimatedSquigglyLine from '@/components/animations/AnimatedSquigglyLine'
import AnimatedWaveSeparator from '@/components/shared/AnimatedWaveSeparator'

export default function ServicesHero({ profileImage }: { profileImage: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  
  // Advanced Animations - Drift, Rotate, Scale
  const rotateImg = useTransform(scrollYProgress, [0, 1], [0, 20])
  const driftX = useTransform(scrollYProgress, [0, 1], [0, 60])
  const driftY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <Box
      ref={containerRef}
      sx={{
        bgcolor: 'primary.main',
        backgroundImage: 'linear-gradient(to bottom, #106A5A, #0d594b)',
        position: 'relative',
        pt: { xs: 15, md: 22 },
        pb: { xs: 15, md: 25 },
        overflow: 'hidden',
        color: 'white',
      }}
    >
      <WavyHeroBackground />
      
      {/* Background Decorative Blob */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          {/* Left Side: Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div style={{ y: yText, opacity: opacityText }}>
              <Typography
                variant="overline"
                sx={{ 
                  fontWeight: 700, 
                  letterSpacing: 3, 
                  color: 'secondary.main', 
                  mb: 2, 
                  display: 'block' 
                }}
              >
                Expert Solutions
              </Typography>
              
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '3rem', md: '5rem' },
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                    textShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  }}
                >
                  My Expert<br />Services
                </Typography>
                <AnimatedSquigglyLine width="100%" delay={0.3} color="#FACC15" />
              </Box>
              
              <Typography
                variant="body1"
                sx={{ 
                  maxWidth: 500, 
                  opacity: 0.8, 
                  fontWeight: 400, 
                  lineHeight: 1.6,
                  fontSize: '1.25rem'
                }}
              >
                Tailored digital excellence from concept to final deployment. I solve complex problems with elegant code.
              </Typography>
            </motion.div>
          </Grid>

          {/* Right Side: Simple & Bold Picture Card */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              
              {/* Geometric Decor - Rotating Ring */}
              <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 style={{
                   position: 'absolute',
                   top: '-15%',
                   left: '-15%',
                   width: '130%',
                   height: '130%',
                   border: '1px dashed rgba(255,255,255,0.2)',
                   borderRadius: '50%',
                   zIndex: 1
                 }}
              />

              <motion.div
                style={{ 
                  rotate: rotateImg,
                  x: driftX,
                  y: driftY,
                  scale: scaleImg,
                  zIndex: 2
                } as any}
              >
                <Paper
                  elevation={24}
                  sx={{
                    position: 'relative',
                    width: { xs: 280, md: 420 },
                    height: { xs: 320, md: 480 },
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '8px solid rgba(255,255,255,0.1)',
                    bgcolor: 'rgba(255,255,255,0.05)',
                    boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 60px 120px rgba(0,0,0,0.6)',
                    }
                  }}
                >
                  <Image
                    src={profileImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60'} 
                    alt="Service Hero Picture"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 280px, 420px"
                    priority
                  />
                  
                  {/* Glassmorphism Overlays */}
                  <Box sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    padding: '8px 16px',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    zIndex: 3
                  }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'secondary.main', textTransform: 'uppercase', letterSpacing: 1 }}>
                      Top Rated
                    </Typography>
                  </Box>

                  {/* Floating element inside the card */}
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 4,
                    background: 'linear-gradient(to top, rgba(16,106,90,0.8), transparent)',
                    zIndex: 2
                  }}>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: 'white', mb: 0.5 }}>
                      Innovation Driven
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                      Building tomorrow, today.
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>

              {/* Secondary Floating Card */}
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  x: [0, -10, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                }}
                style={{
                  position: 'absolute',
                  bottom: '-10%',
                  right: '-15%',
                  width: '180px',
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  zIndex: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 900, textTransform: 'uppercase' }}>
                  Live Status
                </Typography>
                <Typography variant="body2" sx={{ color: 'black', fontWeight: 800 }}>
                  Available for Hire
                </Typography>
              </motion.div>

            </Box>
          </Grid>
        </Grid>
      </Container>
      <AnimatedWaveSeparator />
    </Box>
  )
}

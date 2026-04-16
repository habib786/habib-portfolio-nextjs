'use client'

import { Box, Container, Typography, Grid } from '@mui/material'
import ExperienceEducationSection from '@/components/experience/ExperienceEducationSection'
import { motion } from 'framer-motion'
import WavyHeroBackground from '@/components/shared/WavyHeroBackground'
import AnimatedWaveSeparator from '@/components/shared/AnimatedWaveSeparator'
import { useProfileImage } from '@/lib/hooks/useProfileImage'
import AnimatedSquigglyLine from '@/components/animations/AnimatedSquigglyLine'

export default function ExperiencePage() {
  const profileImage = useProfileImage()

  return (
    <Box sx={{ bgcolor: 'var(--background)', minHeight: '100vh', pb: { xs: 10, md: 20 } }}>
      {/* ── Hero Header ── */}
      <Box
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
        <WavyHeroBackground />

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
                    MY<br />JOURNEY
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
                    A timeline of my professional experience and academic background, showcasing the evolution of my skills and career in software engineering.
                  </Typography>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Right: Arch Floating Portrait */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, position: 'relative' }}>
               <motion.div
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                 style={{ position: 'relative' }}
               >
                 {/* Decorative background arch shape */}
                 <motion.div
                   animate={{ y: [-15, 15, -15], rotate: [-1, 1, -1] }}
                   transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                   style={{
                     position: 'absolute',
                     top: -20,
                     right: { xs: -10, md: -30 } as any,
                     width: '100%',
                     height: '100%',
                     border: '4px solid #FACC15',
                     borderRadius: '240px 240px 20px 20px',
                     zIndex: 0,
                     opacity: 0.8,
                   }}
                 />

                 {/* Foreground Image Container */}
                 <motion.div
                   animate={{ y: [15, -15, 15] }}
                   transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                 >
                   <Box sx={{ 
                      width: { xs: 280, md: 400 }, 
                      height: { xs: 360, md: 540 }, 
                      bgcolor: 'rgba(255, 255, 255, 0.05)', 
                      backdropFilter: 'blur(10px)',
                      borderRadius: '240px 240px 20px 20px',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      zIndex: 1,
                   }}>
                      <motion.img 
                         src={profileImage} 
                         alt="Habib" 
                         whileHover={{ scale: 1.1, y: -10 }}
                         transition={{ duration: 0.5, ease: "easeOut" }}
                         style={{ 
                           width: '100%', 
                           height: '100%', 
                           objectFit: 'cover',
                           objectPosition: 'top',
                           transform: 'scale(1.05)' // Extra zoom slightly over container
                         }} 
                      />
                   </Box>
                 </motion.div>
                 
                 {/* Floating accents */}
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                   style={{
                     position: 'absolute',
                     top: '10%',
                     left: '-10%',
                     zIndex: 2,
                   }}
                 >
                   <Box sx={{ width: 40, height: 40, border: '4px solid white', borderRadius: '50%', opacity: 0.5 }} />
                 </motion.div>

                 <motion.div
                   animate={{ rotate: -360 }}
                   transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                   style={{
                     position: 'absolute',
                     bottom: '20%',
                     right: '-15%',
                     zIndex: 2,
                   }}
                 >
                   <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                     <path d="M50 0L61 39L100 50L61 61L50 100L39 61L0 50L39 39L50 0Z" fill="#FACC15" opacity="0.6"/>
                   </svg>
                 </motion.div>

               </motion.div>
            </Grid>
          </Grid>
        </Container>
        <AnimatedWaveSeparator />
      </Box>

      {/* Main Content Area */}
      <Box sx={{ mt: { xs: -10, md: -15 }, position: 'relative', zIndex: 10 }}>
        <ExperienceEducationSection />
      </Box>
    </Box>
  )
}

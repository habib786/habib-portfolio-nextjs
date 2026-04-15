'use client'

import React, { useRef } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AboutBanner() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Parallax layers at different speeds
  const yBackground = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const yCode = useTransform(scrollYProgress, [0, 1], [-30, 80])
  const xMarquee = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])
  const scaleOverlay = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05])
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6])

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        height: { xs: 320, md: 440 },
        bgcolor: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Code Background — slower parallax */}
      <motion.div
        style={{ y: yCode }}
        className="absolute inset-0 font-mono text-[0.75rem] text-[#00ff00] p-6 select-none pointer-events-none whitespace-pre-wrap overflow-hidden"
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.28 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2 }}
      >
        {`import React from 'react'
import { motion } from 'framer-motion'

export default function Future() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <motion.h1 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-white text-4xl font-bold"
      >
        Building the future, one line of code at a time.
      </motion.h1>
    </div>
  )
}

// SEO Best Practices
export const metadata = {
  title: 'Future',
  description: 'Developing high-quality applications'
}

/* 
   The code is the poetry of the modern age.
   Every character matters.
   Every logic counts.
*/

function optimize(code) {
  return code.map(line => line.trim()).filter(line => line.length > 0)
}

console.log('Optimizing the future...')
import React from 'react'
import { motion } from 'framer-motion'

export default function Future() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <motion.h1 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-white text-4xl font-bold"
      >
        Building the future, one line of code at a time.
      </motion.h1>
    </div>
  )
}`}
      </motion.div>

      {/* Gradient scanline overlay — subtle scale parallax */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          scale: scaleOverlay as any
        }}
      />

      {/* Left-right gradient overlay */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.45), rgba(0,0,0,0.9))',
          y: yBackground as any
        }}
      />

      {/* Scrolling marquee text behind main headline */}
      <motion.div
        style={{ x: xMarquee }}
        aria-hidden
        className="absolute bottom-6 whitespace-nowrap select-none pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <Typography sx={{
          fontSize: { xs: '4rem', md: '7rem' },
          fontWeight: 900,
          color: 'rgba(255,255,255,0.04)',
          letterSpacing: 16,
          textTransform: 'uppercase',
          userSelect: 'none'
        }}>
          CODE &nbsp; BUILD &nbsp; DEPLOY &nbsp; CODE &nbsp; BUILD &nbsp; DEPLOY &nbsp; CODE &nbsp; BUILD
        </Typography>
      </motion.div>

      {/* Central headline */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
        >
          {/* Word-by-word reveal */}
          {['BUILDING', 'THE', 'FUTURE,', 'ONE', 'LINE', 'OF', 'CODE', 'AT', 'A', 'TIME.'].map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              style={{ display: 'inline-block', marginRight: '0.35em' }}
            >
              <Typography
                component="span"
                sx={{
                  color: 'white',
                  fontWeight: 900,
                  fontSize: { xs: '1.8rem', md: '3.5rem' },
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  lineHeight: 1.2,
                  display: 'inline',
                }}
              >
                {word}
              </Typography>
            </motion.span>
          ))}
        </motion.div>

        {/* Animated yellow cursor blink */}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{ display: 'inline-block', marginLeft: 4, verticalAlign: 'middle' }}
        >
          <Box sx={{ width: 4, height: { xs: 28, md: 48 }, bgcolor: '#FACC15', borderRadius: 1 }} />
        </motion.div>
      </Container>
    </Box>
  )
}

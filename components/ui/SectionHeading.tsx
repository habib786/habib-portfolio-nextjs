'use client'

import React from 'react'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  color?: string
  underlineColor?: string
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  sx?: any
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  color = 'inherit',
  underlineColor = '#FACC15',
  variant = 'h4',
  sx = {}
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  const isRight = align === 'right'

  return (
    <Box sx={{ 
      mb: 6, 
      textAlign: align,
      display: 'flex',
      flexDirection: 'column',
      alignItems: isCenter ? 'center' : isRight ? 'flex-end' : 'flex-start',
      ...sx 
    }}>
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        <Typography 
          variant={variant} 
          component="h2" 
          sx={{ 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: { xs: 1, md: 2 },
            color,
            mb: 1.5,
            fontSize: {
              xs: variant === 'h4' ? '1.5rem' : undefined,
              sm: variant === 'h4' ? '1.75rem' : undefined,
              md: variant === 'h4' ? '2.125rem' : undefined,
            }
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ 
          position: 'absolute', 
          bottom: -12, 
          left: 0, 
          width: '100%', 
          height: 24,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          <motion.div 
            initial={{ x: '-100%' }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{ width: '100%', height: '100%' }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 24" fill="none" preserveAspectRatio="none">
              {/* Main brush stroke arc - deeper curve */}
              <path 
                d="M1 20C15 4 85 4 99 20" 
                stroke={underlineColor} 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))' }}
              />
              {/* Subtle second stroke for more natural brush effect */}
              <path 
                d="M5 16C25 8 75 8 95 16" 
                stroke={underlineColor} 
                strokeWidth="2" 
                strokeLinecap="round" 
                opacity="0.5"
              />
            </svg>
          </motion.div>
        </Box>

      </Box>

      {subtitle && (
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ 
            mt: 3, 
            maxWidth: isCenter ? 800 : 640, 
            lineHeight: 1.8,
            fontSize: '1rem',
            opacity: 0.9
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}

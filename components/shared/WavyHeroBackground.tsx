'use client'

import { Box } from '@mui/material'
import { motion } from 'framer-motion'

type WavyHeroBackgroundProps = {
  animated?: boolean
}

export default function WavyHeroBackground({ animated = true }: WavyHeroBackgroundProps) {
  return (
    <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none', zIndex: 0 }}>
      <svg width="100%" height="100%" viewBox="0 0 1440 1000" fill="none" preserveAspectRatio="none">
        <path d="M0 600C400 500 800 700 1200 600C1400 550 1440 600 1440 600V1000H0V600Z" fill="white" fillOpacity="0.05" />
        <path d="M-100 700C300 550 800 850 1300 700C1500 640 1600 700 1600 700V1000H-100V700Z" fill="white" fillOpacity="0.03" />

        {animated ? (
          <>
            <motion.path
              animate={{ strokeDashoffset: [-40, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              d="M0 200 Q 360 400 720 200 T 1440 200"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="20 20"
              opacity="0.2"
            />
            <motion.path
              animate={{ strokeDashoffset: [20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              d="M0 300 Q 360 500 720 300 T 1440 300"
              stroke="white"
              strokeWidth="0.5"
              strokeDasharray="10 10"
              opacity="0.1"
            />
          </>
        ) : (
          <>
            <path d="M0 200 Q 360 400 720 200 T 1440 200" stroke="white" strokeWidth="1" strokeDasharray="20 20" opacity="0.2" />
            <path d="M0 300 Q 360 500 720 300 T 1440 300" stroke="white" strokeWidth="0.5" strokeDasharray="10 10" opacity="0.1" />
          </>
        )}
      </svg>
    </Box>
  )
}

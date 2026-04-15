'use client'

import Link from 'next/link'
import { Box, Container, Typography } from '@mui/material'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <Box 
      sx={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        pt: 10
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 900, 
              fontSize: { xs: '6rem', md: '8rem' },
              color: 'primary.main',
              lineHeight: 1,
              mb: 2,
              WebkitTextStroke: '2px var(--primary)',
              WebkitTextFillColor: 'transparent',
              opacity: 0.5
            }}
          >
            404
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ fontWeight: 800, mb: 3, textTransform: 'uppercase' }}
          >
            Oops! Page Not Found
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 6, maxWidth: 400, mx: 'auto' }}
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          
          <Link href="/" passHref legacyBehavior>
            <Button 
              variant="default" 
              size="lg"
              sx={{ px: 6, py: 2, borderRadius: 1, fontWeight: 800 }}
            >
              RETURN HOME
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Box>
  )
}

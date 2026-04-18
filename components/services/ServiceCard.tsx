'use client'

import React from 'react'
import { Box, Typography, Stack, Card, Grid, Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import NextLink from 'next/link'
import { motion } from 'framer-motion'

interface ServiceCardProps {
  id: string
  title: string
  description: string
  icon?: string
  features?: string[]
  showQuoteButton?: boolean
  index: number
  lang?: string
}

export default function ServiceCard({
  id,
  title,
  description,
  icon,
  features,
  showQuoteButton = false,
  index,
  lang
}: ServiceCardProps) {
  return (
    <Card sx={{ 
      p: 5, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 2,
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
      transition: 'all 0.4s ease',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-10px)',
        borderColor: 'primary.main',
        boxShadow: '0 20px 60px rgba(16,106,90,0.1)'
      }
    }}>
      <Stack spacing={3} sx={{ height: '100%', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 900, color: 'primary.main', opacity: 0.1, lineHeight: 1 }}>
            {id}
          </Typography>
          {icon && (
            <Box sx={{ fontSize: '2.5rem' }}>{icon}</Box>
          )}
        </Box>
        
        <Typography variant="h4" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {title}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7, flexGrow: 1 }}>
          {description}
        </Typography>
        
        {features && features.length > 0 && (
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              {features.map((feature, fIdx) => (
                <Grid size={{ xs: 12, sm: 6 }} key={fIdx}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#106A5A', fontSize: 16 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{feature}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {showQuoteButton && (
          <Box sx={{ pt: 2 }}>
            <NextLink href="/contact#contact-form" style={{ textDecoration: 'none' }}>
              <Button
                variant="text"
                color="primary"
                endIcon={<FontAwesomeIcon icon={faArrowRight} />}
                sx={{ 
                  fontWeight: 700, 
                  px: 0, 
                  '&:hover': { bgcolor: 'transparent', transform: 'translateX(10px)' }, 
                  transition: 'all 0.3s', 
                  textDecoration: 'none' 
                }}
              >
                Get a Quote
              </Button>
            </NextLink>
          </Box>
        )}
      </Stack>
    </Card>
  )
}

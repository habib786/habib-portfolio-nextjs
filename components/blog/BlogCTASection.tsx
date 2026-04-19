'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Box, Container, Typography, Stack } from '@mui/material'

interface BlogCTASectionProps {
  profileImage: string
}

const defaultDict = {
  blog: {
    cta: {
      haveProject: 'Have a project in mind?',
      letsTalk: "LET'S TALK",
      aboutProject: 'ABOUT YOUR PROJECT',
    },
  },
}

export default function BlogCTASection({ profileImage }: BlogCTASectionProps) {
  const params = useParams()
  const lang = (params?.lang as string) || 'en-CA'
  const [imgError, setImgError] = useState(false)
  const [dict, setDict] = useState(defaultDict)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    getDictionary(lang).then(setDict).catch(() => setDict(defaultDict))
  }, [lang])

  const handleImgError = () => setImgError(true)

  if (!mounted) {
    return <Box sx={{ height: 600 }} />
  }

  return (
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
            pr: { md: 12 },
          }}
        >
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
                  {dict?.blog?.cta?.haveProject}
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
                  {dict?.blog?.cta?.letsTalk}<br />{dict?.blog?.cta?.aboutProject}
                </Typography>
                <Link href={`/${lang}/contact#contact-form`} style={{ textDecoration: 'none' }}>
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
                    {dict?.blog?.cta?.letsTalk} →
                  </Box>
                </Link>
              </Stack>
            </Box>
          </motion.div>

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
              <Box sx={{
                position: 'absolute',
                inset: '-8px',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                bgcolor: '#FACC15',
                zIndex: 0,
                transform: 'translateY(10px)',
              }} />
              <Box sx={{
                position: 'absolute',
                inset: 0,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                overflow: 'hidden',
                zIndex: 1,
              }}>
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
                    <motion.img 
                      key={profileImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
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
                  )}
                </AnimatePresence>
              </Box>
            </motion.div>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

async function getDictionary(locale: string) {
  const dictionaries = {
    'en-CA': () => import('@/app/[lang]/dictionaries/en-CA.json').then((module) => module.default),
    'ar-SA': () => import('@/app/[lang]/dictionaries/ar-SA.json').then((module) => module.default),
    'fr-CA': () => import('@/app/[lang]/dictionaries/fr-CA.json').then((module) => module.default),
    'tr-TR': () => import('@/app/[lang]/dictionaries/tr-TR.json').then((module) => module.default),
    'ur-PK': () => import('@/app/[lang]/dictionaries/ur-PK.json').then((module) => module.default),
  }
  if (locale in dictionaries) {
    return dictionaries[locale as keyof typeof dictionaries]()
  }
  return defaultDict
}
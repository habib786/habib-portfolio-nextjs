'use client'

import { useState, useEffect, useMemo } from 'react'
import NextLink from 'next/link'
import { AnimatedLogo } from './AnimatedLogo'
import LanguageSelector from './LanguageSelector'
import { usePathname } from 'next/navigation'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faMapMarkerAlt, faHeart, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Container, Typography, Link as MuiLink, IconButton, Divider, Stack, Grid, Button } from '@mui/material'
import { createClient } from '@/lib/supabase/client'

type FooterContent = {
  tagline: string
  navLinks: string[]
  navTitle: string
  resourceLinks: string[]
  resourceTitle: string
  contactEmail: string
  contactLocation: string
  contactTitle: string
  ctaTitle: string
  ctaText: string
  ctaButton: string
  copyright: string
  made_with: string
}


async function getFooterContentFromSupabase(supabase: any, language?: string) {
  const { data, error } = await supabase
    .from('footer_content')
    .select('*')
    .eq('language', language)
    .maybeSingle()
  
  if (error) {
    if (!error.message?.includes('schema cache') && error.code !== '42P01') {
      console.warn('Notice: Using default footer content (Supabase table not found or unavailable).')
    }
    return null
  }
  
  return data
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    async function fetchFooterContent() {
      try {
        const segments = pathname.split('/').filter(Boolean)
        const currentLanguage = ['en-CA', 'fr-CA', 'ar-SA', 'ur-PK', 'tr-TR'].includes(segments[0]) 
          ? segments[0] 
          : 'en-CA'
        
        if (supabase) {
          const content = await getFooterContentFromSupabase(supabase, currentLanguage)
          if (content) {
            setFooterContent({
              tagline: content.tagline || '',
              navLinks: content.nav_links || [],
              navTitle: content.nav_title || 'Navigation',
              resourceLinks: content.resource_links || [],
              resourceTitle: content.resource_title || 'Resources',
              contactEmail: content.contact_email || '',
              contactLocation: content.contact_location || '',
              contactTitle: content.contact_title || 'Get In Touch',
              ctaTitle: content.cta_title || '',
              ctaText: content.cta_text || '',
              ctaButton: content.cta_button || '',
              copyright: content.copyright || '',
              made_with: content.made_with || '',
            })
          } else {
            setFooterContent(null)
          }
        }
      } catch (error) {
        console.error('Error fetching footer:', error)
        setFooterContent(null)
      } finally {
        setLoading(false)
      }
    }

    fetchFooterContent()
  }, [pathname, supabase])

  const getLocalizedHref = (href: string) => {
    if (href.startsWith('http')) return href;
    const segments = pathname.split('/');
    const currentLocale = segments[1];
    const isLocale = ['en-CA', 'fr-CA', 'ar-SA', 'ur-PK', 'tr-TR'].includes(currentLocale);
    
    if (isLocale) {
      return `/${currentLocale}${href === '/' ? '' : href}`;
    }
    return href;
  };

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', pt: { xs: 8, md: 12 }, pb: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} sx={{ mb: 8 }}>
          {/* Brand & Tagline */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <NextLink href="/" style={{ textDecoration: 'none' }}>
                <Box sx={{ color: 'secondary.main' }}>
                  <AnimatedLogo />
                </Box>
              </NextLink>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
              {loading ? '...' : footerContent?.tagline}
            </Typography>
            <Stack direction="row" spacing={2}>
              <NextLink href="https://linkedin.com/in/habibfarooq" target="_blank" style={{ textDecoration: 'none' }}>
                <IconButton 
                  sx={{ 
                    color: 'text.primary', 
                    bgcolor: 'rgba(0,0,0,0.03)',
                    '&:hover': { color: 'primary.main', bgcolor: 'rgba(16, 106, 90, 0.05)', transform: 'translateY(-3px)' },
                    transition: 'all 0.3s'
                  }}
                  size="medium"
                >
                  <FontAwesomeIcon icon={faLinkedin} style={{ width: 18, height: 18 }} />
                </IconButton>
              </NextLink>
              <NextLink href="https://github.com/habibfarooq" target="_blank" style={{ textDecoration: 'none' }}>
                <IconButton 
                  sx={{ 
                    color: 'text.primary', 
                    bgcolor: 'rgba(0,0,0,0.03)',
                    '&:hover': { color: 'primary.main', bgcolor: 'rgba(16, 106, 90, 0.05)', transform: 'translateY(-3px)' },
                    transition: 'all 0.3s'
                  }}
                  size="medium"
                >
                  <FontAwesomeIcon icon={faGithub} style={{ width: 18, height: 18 }} />
                </IconButton>
              </NextLink>
              <NextLink href="mailto:contact@habib.com" style={{ textDecoration: 'none' }}>
                <IconButton 
                  sx={{ 
                    color: 'text.primary', 
                    bgcolor: 'rgba(0,0,0,0.03)',
                    '&:hover': { color: 'primary.main', bgcolor: 'rgba(16, 106, 90, 0.05)', transform: 'translateY(-3px)' },
                    transition: 'all 0.3s'
                  }}
                  size="medium"
                >
                  <FontAwesomeIcon icon={faEnvelope} style={{ width: 18, height: 18 }} />
                </IconButton>
              </NextLink>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 700, mb: 3, letterSpacing: 1, textTransform: 'uppercase' }}>
              {loading ? '...' : footerContent?.navTitle}
            </Typography>
            <Stack spacing={2}>
              {!loading && footerContent?.navLinks.map((item: string) => (
                <NextLink
                  key={item}
                  href={getLocalizedHref(item === 'Home' ? '/' : `/${item.toLowerCase()}`)}
                  style={{ textDecoration: 'none' }}
                >
                  <MuiLink
                    component="span"
                    sx={{ 
                      color: 'text.secondary', 
                      typography: 'body2', 
                      textDecoration: 'none', 
                      display: 'inline-block',
                      width: 'fit-content',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: 0,
                        height: '1px',
                        bottom: -2,
                        left: 0,
                        bgcolor: 'primary.main',
                        transition: 'width 0.3s ease'
                      },
                      '&:hover': { 
                        color: 'primary.main',
                        '&::after': { width: '100%' }
                      },
                      transition: 'color 0.2s'
                    }}
                  >
                    {item}
                  </MuiLink>
                </NextLink>
              ))}
            </Stack>
          </Grid>

          {/* Legal / Resources */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 700, mb: 3, letterSpacing: 1, textTransform: 'uppercase' }}>
              {loading ? '...' : footerContent?.resourceTitle}
            </Typography>
            <Stack spacing={2}>
              {!loading && footerContent?.resourceLinks.map((item: string) => (
                <MuiLink
                  key={item}
                  sx={{ 
                    color: 'text.secondary', 
                    typography: 'body2', 
                    textDecoration: 'none', 
                    display: 'inline-block',
                    width: 'fit-content',
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s'
                  }}
                >
                  {item}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 700, mb: 3, letterSpacing: 1, textTransform: 'uppercase' }}>
              {loading ? '...' : footerContent?.contactTitle}
            </Typography>
            <Stack spacing={2.5} sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ color: '#106A5A', marginTop: '4px', width: 16 }} />
                <Typography variant="body2" color="text.secondary">
                  {loading ? '...' : footerContent?.contactEmail}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#106A5A', marginTop: '4px', width: 16 }} />
                <Typography variant="body2" color="text.secondary">
                  {loading ? '...' : footerContent?.contactLocation}
                </Typography>
              </Box>
            </Stack>
            
            <Box sx={{ p: 3, bgcolor: 'rgba(16, 106, 90, 0.05)', borderRadius: 1, border: '1px solid', borderColor: 'rgba(16, 106, 90, 0.1)' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>{loading ? '...' : footerContent?.ctaTitle}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>{loading ? '...' : footerContent?.ctaText}</Typography>
              <NextLink href="/contact" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  disabled={loading || !footerContent}
                  endIcon={<FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 12 }} />}
                  sx={{ 
                    borderRadius: 1, 
                    textTransform: 'none', 
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': { boxShadow: '0 4px 12px rgba(16, 106, 90, 0.2)' }
                  }}
                >
                  {loading ? '...' : footerContent?.ctaButton}
                </Button>
              </NextLink>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 4, borderColor: 'divider' }} />

        {/* Bottom Bar */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            © {currentYear} {loading ? '...' : footerContent?.copyright}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LanguageSelector />
            <Typography variant="caption" sx={{ color: 'text.disabled', display: 'flex', alignItems: 'center', gap: 1 }}>
              Made with <FontAwesomeIcon icon={faHeart} style={{ color: '#ef4444' }} /> {loading ? '...' : footerContent?.made_with}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
'use client'

import NextLink from 'next/link'
import { AnimatedLogo } from './AnimatedLogo'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faMapMarkerAlt, faHeart, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Container, Typography, Link as MuiLink, IconButton, Divider, Stack, Grid, Button } from '@mui/material'

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
              A digital solutions builder and full-stack developer dedicated to crafting modern, scalable, and exceptional web experiences. Let's create something truly remarkable together.
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton 
                component={NextLink} 
                href="https://linkedin.com/in/habibfarooq" 
                target="_blank"
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
              <IconButton 
                component={NextLink} 
                href="https://github.com/habibfarooq" 
                target="_blank"
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
              <IconButton 
                component={NextLink} 
                href="mailto:contact@habib.com" 
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
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 700, mb: 3, letterSpacing: 1, textTransform: 'uppercase' }}>
              Navigation
            </Typography>
            <Stack spacing={2}>
              {['Home', 'Projects', 'Services', 'Experience', 'Contact'].map((item) => (
                <MuiLink
                  key={item}
                  component={NextLink}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
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
              ))}
            </Stack>
          </Grid>

          {/* Legal / Resources */}
          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 700, mb: 3, letterSpacing: 1, textTransform: 'uppercase' }}>
              Resources
            </Typography>
            <Stack spacing={2}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((item) => (
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
              Get In Touch
            </Typography>
            <Stack spacing={2.5} sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ color: '#106A5A', marginTop: '4px', width: 16 }} />
                <Typography variant="body2" color="text.secondary">
                  hello@habibfarooq.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#106A5A', marginTop: '4px', width: 16 }} />
                <Typography variant="body2" color="text.secondary">
                  Toronto, Canada<br/>
                  Available for remote work worldwide
                </Typography>
              </Box>
            </Stack>
            
            <Box sx={{ p: 3, bgcolor: 'rgba(16, 106, 90, 0.05)', borderRadius: 1, border: '1px solid', borderColor: 'rgba(16, 106, 90, 0.1)' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Ready to start a project?</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>Let's build something awesome together.</Typography>
              <Button 
                variant="contained" 
                color="primary" 
                component={NextLink} 
                href="/contact" 
                endIcon={<FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 12 }} />}
                sx={{ 
                  borderRadius: 1, 
                  textTransform: 'none', 
                  fontWeight: 600,
                  boxShadow: 'none',
                  '&:hover': { boxShadow: '0 4px 12px rgba(16, 106, 90, 0.2)' }
                }}
              >
                Let's Talk
              </Button>
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
            © {currentYear} Habib Farooq. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', display: 'flex', alignItems: 'center', gap: 1 }}>
            Made with <FontAwesomeIcon icon={faHeart} style={{ color: '#ef4444' }} /> using Next.js & MUI
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}
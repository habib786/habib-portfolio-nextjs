import React from 'react'
import { Box, Container, Typography, Grid, Button, Stack, Card } from '@mui/material'
import { createClient } from '@/lib/supabase/server'
import SectionHeading from '@/components/ui/SectionHeading'
import WavyHeroBackground from '@/components/shared/WavyHeroBackground'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import NextLink from 'next/link'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import AnimatedSquigglyLine from '@/components/animations/AnimatedSquigglyLine'

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const supabase = await createClient()

  let services = []
  if (supabase) {
    const { data } = await supabase.from('portfolio_services').select('*').order('order_index', { ascending: true })
    if (data && data.length > 0) {
      services = data
    }
  }

  const defaultServices = [
    {
      number_id: '01',
      title: 'Full-Stack Web Development',
      description: 'Building scalable, high-performance web applications using modern technologies like React, Next.js, and Node.js.',
      features: ['Custom Web Applications', 'API Integration', 'Cloud Deployment', 'Performance Optimization']
    },
    {
      number_id: '02',
      title: 'Mobile App Development',
      description: 'Crafting cross-platform mobile experiences that feel native and perform beautifully on both iOS and Android.',
      features: ['Cross-platform Apps', 'Intuitive UI/UX', 'App Store Submission', 'Offline Functionality']
    },
    {
      number_id: '03',
      title: 'UI/UX Design',
      description: 'Designing user-centric interfaces that are not only visually stunning but also highly functional and intuitive.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Interactive Design']
    },
    {
      number_id: '04',
      title: 'Cloud Solutions',
      description: 'Architecting robust cloud-native applications and managing infrastructure for maximum reliability.',
      features: ['Serverless Architecture', 'Database Migration', 'CI/CD Pipelines', 'Security Audits']
    }
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 15 }}>
      {/* ── Hero Section ── */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          backgroundImage: 'linear-gradient(to bottom, #106A5A, #0d594b)',
          position: 'relative',
          pt: { xs: 15, md: 25 },
          pb: { xs: 15, md: 25 },
          overflow: 'hidden',
          color: 'white',
        }}
      >
        <WavyHeroBackground />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography
              variant="overline"
              sx={{ fontWeight: 700, letterSpacing: 3, color: 'secondary.main', mb: 2, display: 'block' }}
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
              variant="h6"
              sx={{ maxWidth: 700, mx: 'auto', opacity: 0.8, fontWeight: 400, lineHeight: 1.6 }}
            >
              I provide a wide range of digital services tailored to your business needs, from concept to deployment and beyond.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── Services Detail Section ── */}
      <Container maxWidth="lg" sx={{ mt: -10, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4}>
          {displayServices.map((service, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <ScrollReveal direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 0.1}>
                <Card sx={{ 
                  p: 5, 
                  height: '100%',
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    borderColor: 'primary.main',
                    boxShadow: '0 20px 60px rgba(16,106,90,0.1)'
                  }
                }}>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 900, color: 'primary.main', opacity: 0.1, lineHeight: 1 }}>
                        {service.number_id || `0${index + 1}`}
                      </Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                      {service.description}
                    </Typography>
                    
                    {service.features && (
                      <Box sx={{ pt: 2 }}>
                        <Grid container spacing={2}>
                          {service.features.map((feature: string, fIdx: number) => (
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

                    <Box sx={{ pt: 2 }}>
                      <NextLink href="/contact" style={{ textDecoration: 'none' }}>
                        <Button
                          variant="text"
                          color="primary"
                          endIcon={<FontAwesomeIcon icon={faArrowRight} />}
                          sx={{ fontWeight: 700, px: 0, '&:hover': { bgcolor: 'transparent', transform: 'translateX(10px)' }, transition: 'all 0.3s', textDecoration: 'none' }}
                        >
                          Get a Quote
                        </Button>
                      </NextLink>
                    </Box>
                  </Stack>
                </Card>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── Contact CTA ── */}
      <Container maxWidth="md" sx={{ mt: 15 }}>
        <ScrollReveal direction="up">
          <Box sx={{ 
            p: { xs: 5, md: 8 }, 
            bgcolor: 'primary.main', 
            borderRadius: 2, 
            color: 'white', 
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(250,204,21,0.1) 0%, transparent 70%)' }} />
            
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>
              Ready to start your next project?
            </Typography>
            <Typography variant="h6" sx={{ mb: 6, opacity: 0.9, fontWeight: 400 }}>
              Let's create something exceptional together. I'm currently available for new projects and collaborations.
            </Typography>
            <NextLink href="/contact" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ 
                  px: 6, 
                  py: 2, 
                  borderRadius: 1, 
                  fontWeight: 800, 
                  fontSize: '1rem',
                  color: 'black',
                  textDecoration: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: '0 15px 40px rgba(0,0,0,0.2)' }
                }}
              >
                Contact Me Now
              </Button>
            </NextLink>
          </Box>
        </ScrollReveal>
      </Container>
    </Box>
  )
}

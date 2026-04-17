import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { Box, Container, Typography, Card, CardContent, Avatar, Grid, Button } from '@mui/material'
import NextLink from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'


export default async function ServicesSection({ lang }: { lang?: string }) {
  const supabase = await createClient()
  const activeLang = lang || 'en-CA'

  let dbServices = []
  if (supabase) {
    const { data } = await supabase
      .from('portfolio_services')
      .select('*')
      .eq('language', activeLang)
      .order('order_index', { ascending: true })
    
    if (data && data.length > 0) {
      dbServices = data
    } else if (activeLang !== 'en-CA') {
      // Fallback to English if current language is empty
      const { data: fallbackData } = await supabase
        .from('portfolio_services')
        .select('*')
        .eq('language', 'en-CA')
        .order('order_index', { ascending: true })
      if (fallbackData) dbServices = fallbackData
    }
  }

  const defaultServices = [
    {
      id: '01.',
      icon: 'https://cdn-icons-png.flaticon.com/128/1055/1055687.png',
      title: 'FULL-STACK WEB & MOBILE DEVELOPMENT',
      description: 'End-to-end development of robust web applications and cross-platform native mobile apps that scale perfectly.'
    },
    {
      id: '02.',
      icon: 'https://cdn-icons-png.flaticon.com/128/1253/1253756.png',
      title: 'UI/UX DESIGN & WEB DESIGN',
      description: 'Creating intuitive, engaging, and aesthetically pleasing user interfaces holding strong UX principles.'
    },
    {
      id: '03.',
      icon: 'https://cdn-icons-png.flaticon.com/128/2920/2920251.png',
      title: 'SERVERLESS ARCHITECTURE & CLOUD SOLUTIONS',
      description: 'Designing and deploying scalable, cost-effective infrastructure using modern cloud services and serverless setups.'
    }
  ]

  const displayServices = dbServices.length > 0 ? dbServices.map(s => ({
    id: s.number_id,
    icon: s.icon_url,
    title: s.title,
    description: s.description
  })) : defaultServices

  return (
    <Box component="section" sx={{ py: 15, bgcolor: 'background.default', position: 'relative' }}>
      <Container maxWidth="lg">
        <SectionHeading 
          title="My Expert Services"
          align="center"
          variant="h3"
        />


        <Grid container spacing={5}>
          {displayServices.map((service, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card sx={{ 
                height: '100%', 
                p: { xs: 4, md: 5 }, 
                position: 'relative', 
                overflow: 'hidden',
                borderRadius: 1,
                bgcolor: 'background.paper',
                backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 8px 32px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.1)',
                transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(16, 106, 90, 0.1) 0%, transparent 50%)',
                  opacity: 0,
                  transition: 'opacity 0.5s ease',
                  zIndex: 0,
                  pointerEvents: 'none'
                },
                '&:hover': {
                  transform: 'translateY(-10px) scale(1.02)',
                  boxShadow: '0 30px 60px rgba(16,106,90,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
                  borderColor: 'rgba(16,106,90,0.3)',
                  '&::before': { opacity: 1 },
                  '& .service-number': { color: 'primary.main', opacity: 0.15, transform: 'scale(1.1) translate(-10px, -10px)' }
                }
              }}>
                {/* Watermark Number */}
                <Typography 
                  className="service-number"
                  sx={{ 
                    position: 'absolute', 
                    top: 20, 
                    insetInlineEnd: 20, 
                    color: 'divider', 
                    fontWeight: 900, 
                    fontSize: 80, 
                    lineHeight: 1,
                    userSelect: 'none',
                    zIndex: 0,
                    transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                    opacity: 0.5
                  }}
                >
                  {service.id.replace('.', '')}
                </Typography>

                <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Avatar 
                    src={service.icon} 
                    alt={service.title} 
                    sx={{ 
                      width: 72, 
                      height: 72, 
                      bgcolor: 'transparent', 
                      background: 'linear-gradient(135deg, rgba(16, 106, 90, 0.2) 0%, rgba(16, 106, 90, 0.05) 100%)',
                      border: '1px solid rgba(16, 106, 90, 0.2)',
                      p: 2.5,
                      borderRadius: 1,
                      mb: 4,
                      boxShadow: '0 8px 16px rgba(16, 106, 90, 0.1), inset 0 2px 4px rgba(255,255,255,0.05)',
                      img: { objectFit: 'contain', filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }
                    }} 
                  />
                  
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 800, mb: 1, fontSize: '0.9rem', letterSpacing: 1 }}>
                    SERVICE {service.id}
                  </Typography>

                  <Typography variant="h5" component="h3" sx={{ fontWeight: 900, mb: 3, pe: 2, lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {service.title}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ 
                    borderInlineStart: '3px solid', 
                    borderColor: 'secondary.main', 
                    ps: 3,
                    lineHeight: 1.8,
                    fontSize: '0.95rem'
                  }}>
                    {service.description}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <NextLink href={lang ? `/${lang}/services` : '/services'} style={{ textDecoration: 'none' }}>
            <Button
              component="span"
              variant="outlined"
              size="large"
              sx={{
                px: 6,
                py: 2,
                borderRadius: 1,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontSize: '0.9rem',
                borderWidth: 2,
                textDecoration: 'none',
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: 'primary.main',
                  color: 'white'
                }
              }}
            >
              Explore More Services
            </Button>
          </NextLink>
        </Box>
      </Container>
    </Box>
  )
}

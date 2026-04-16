import { Metadata } from 'next'
import { Box, Container, Typography, Grid } from '@mui/material'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import ExperienceEducationSection from '@/components/experience/ExperienceEducationSection'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Contact - Habib Farooq',
  description: 'Get in touch with Habib Farooq for project inquiries, collaborations, or just to say hello.',
}

import ContactHero from '@/components/contact/ContactHero'

export default async function ContactPage() {
  // Fetch profile image from Supabase
  const supabase = await createClient()
  let profileImage = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60'

  if (supabase) {
    const { data: settingsData } = await supabase.from('settings').select('*')
    if (settingsData) {
      const profileImg = settingsData.find((s: any) => s.key === 'profile_image')?.value
      if (profileImg) {
        profileImage = profileImg
      }
    }
  }

  return (
    <Box sx={{ minHeight: 'screen', pb: 10, bgcolor: 'var(--background)' }}>
      {/* Hero Section */}
      <ContactHero profileImage={profileImage} />


      {/* Experience Timeline Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <ExperienceEducationSection />
      </Box>

      {/* Contact Form Section */}
      <Container maxWidth="lg">
        <Grid container spacing={8} sx={{ alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <ScrollReveal direction="left">
              <Box sx={{ mb: 6 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
                  Let's Build Something <br />
                  <span style={{ color: '#106A5A' }}>Amazing Together</span>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
                  Have a specific inquiry or just want to chat? Fill out the form, and I'll get back to you within 24 hours.
                </Typography>
              </Box>
              <ContactInfo />
            </ScrollReveal>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <ScrollReveal direction="right">
              <Box 
                sx={{ 
                  p: { xs: 3, md: 5 }, 
                  bgcolor: 'background.paper', 
                  borderRadius: 4, 
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                }}
              >
                <ContactForm />
              </Box>
            </ScrollReveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

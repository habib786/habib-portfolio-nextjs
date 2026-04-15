'use client'

import Link from 'next/link'
import { Mail, MessageSquare, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import ContactForm from '@/components/contact/ContactForm'
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Avatar, 
  Stack, 
  Divider,
  Card,
  CardContent
} from '@mui/material'

export default function ContactCTA() {

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@habibfarooq.com',
      href: 'mailto:contact@habibfarooq.com',
      description: 'Send me an email anytime',
    },
    {
      icon: MessageSquare,
      title: 'LinkedIn',
      value: 'linkedin.com/in/habibfarooq',
      href: 'https://linkedin.com/in/habibfarooq',
      description: 'Connect professionally',
    },
  ]

  return (
    <Box component="section" sx={{ py: 12, bgcolor: 'background.default', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background gradients */}
      <Box sx={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        background: 'linear-gradient(135deg, rgba(16, 106, 90, 0.05) 0%, rgba(250, 204, 21, 0.05) 100%)',
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 800 }}>
            Let&apos;s Work Together
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
            Have a project in mind? Looking for a developer? Feel free to reach out.
            I&apos;m always open to discussing new opportunities.
          </Typography>
        </Box>

        <Grid container spacing={8}>
          {/* Contact Form */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper elevation={4} sx={{ p: { xs: 4, md: 6 }, borderRadius: 1 }}>
              <Stack direction="row" spacing={3} sx={{ mb: 6, alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.light', width: 56, height: 56 }}>
                  <Send size={24} />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>Send a Message</Typography>
                  <Typography variant="body2" color="text.secondary">I&apos;ll get back to you within 24 hours</Typography>
                </Box>
              </Stack>

              <Box sx={{ mt: 2 }}>
                <ContactForm />
              </Box>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Get in Touch</Typography>
                <Typography color="text.secondary">
                  Whether you have a question about a project, want to discuss a 
                  potential collaboration, or just want to say hello, I&apos;d love 
                  to hear from you.
                </Typography>
              </Box>

              <Stack spacing={3}>
                {contactMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <Card key={method.title} variant="outlined" sx={{ borderRadius: 1, transition: 'all 0.2s', '&:hover': { boxShadow: 2, borderColor: 'primary.main' } }}>
                      <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                        <Avatar sx={{ bgcolor: 'primary.50', color: 'primary.main' }}>
                          <Icon size={20} />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{method.title}</Typography>
                          <Link href={method.href} style={{ textDecoration: 'none' }}>
                            <Typography color="primary" sx={{ fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>
                              {method.value}
                            </Typography>
                          </Link>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                            {method.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  )
                })}
              </Stack>

              <Paper variant="outlined" sx={{ p: 4, borderRadius: 1, bgcolor: 'transparent' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 3 }}>Availability</Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Response Time</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Within 24 hours</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Working Hours</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Mon - Fri, 9AM - 6PM EST</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Project Types</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Web Apps, SaaS, AI</Typography>
                  </Box>
                </Stack>
              </Paper>

              <Card sx={{ 
                p: 1, 
                borderRadius: 1, 
                background: 'linear-gradient(135deg, #106A5A 0%, #1a8e79 100%)', 
                color: 'white',
                boxShadow: 8
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Ready to Start?</Typography>
                  <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                    Let&apos;s schedule a call to discuss your project requirements in detail.
                  </Typography>
                  <Button
                    variant="link"
                    size="lg"
                    fullWidth
                    sx={{ bgcolor: 'white', color: '#106A5A', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }, py: 1.5, borderRadius: 1 }}
                    component={Link}
                    href="/schedule"
                  >
                    Schedule a Call
                  </Button>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
import React from 'react'
import { notFound } from 'next/navigation'
import { Box, Typography } from '@mui/material'
import { getDictionary, hasLocale } from '../../dictionaries'
import AboutHero from '@/components/about/AboutHero'
import AboutBio from '@/components/about/AboutBio'
import AboutServices from '@/components/about/AboutServices'
import AboutBanner from '@/components/about/AboutBanner'
import AboutTestimonials from '@/components/about/AboutTestimonials'
import { createClient } from '@/lib/supabase/server'
import { Pacifico } from 'next/font/google'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

const fancyFont = Pacifico({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  if (!hasLocale(lang)) {
    notFound()
  }

  const dict = await getDictionary(lang)
  
  // Fetch profile image from settings if available
  let profileImage = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60'
  const supabase = await createClient()
  if (supabase) {
    const { data } = await supabase.from('settings').select('*')
    if (data) {
      const settings: any = {}
      data.forEach(item => {
        if (item.key && item.value) {
          settings[item.key] = item.value
        }
      })
      if (settings.profile_image && typeof settings.profile_image === 'string' && settings.profile_image.trim()) {
        profileImage = settings.profile_image.replace(/^["']+|["']+$/g, '').trim()
      }
    }
  }

  return (
    <Box className="flex flex-col min-h-screen overflow-hidden">
      <AboutHero profileImage={profileImage} />
      
      <ScrollReveal>
        <AboutBio />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <AboutServices />
      </ScrollReveal>

      <ScrollReveal>
        <AboutBanner />
      </ScrollReveal>

      <ScrollReveal direction="left">
        <AboutTestimonials />
      </ScrollReveal>
    </Box>
  )
}

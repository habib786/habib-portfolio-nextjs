import React from 'react'
import { notFound } from 'next/navigation'
import { Box, Typography } from '@mui/material'
import { getDictionary, hasLocale } from '../../dictionaries'
import AboutHero from '@/components/about/AboutHero'
import AboutBio from '@/components/about/AboutBio'
import ServicesSection from '@/components/home/ServicesSection'
import AboutBanner from '@/components/about/AboutBanner'
import AboutTestimonials from '@/components/about/AboutTestimonials'
import { createClient } from '@/lib/supabase/server'
import { cleanValue } from '@/lib/utils'
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
      const profileImg = settings[`profile_image_${lang}`] || settings['profile_image']
      if (profileImg && typeof profileImg === 'string' && profileImg.trim()) {
        profileImage = cleanValue(profileImg)
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
        <ServicesSection lang={lang} />
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

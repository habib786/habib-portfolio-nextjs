'use client'

import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { Box, Container, Typography, Grid, Card } from '@mui/material'
import { motion, useScroll, useTransform } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

const defaultServices = [
  {
    id: '01',
    title: 'FULL-STACK WEB & MOBILE DEVELOPMENT',
    description: 'Developing high-quality, scalable web and mobile applications using modern technologies.',
    icon: '💻'
  },
  {
    id: '02',
    title: 'UI/UX DESIGN & DEVELOPMENT',
    description: 'Creating user-centered designs that are both functional and visually appealing.',
    icon: '🎨'
  },
  {
    id: '03',
    title: 'SERVERLESS ARCHITECTURE & CLOUD SOLUTIONS',
    description: 'Leveraging cloud technologies to build scalable and cost-effective solutions.',
    icon: '☁️'
  },
  {
    id: '04',
    title: 'E-COMMERCE PLATFORM DEVELOPMENT',
    description: 'Building robust and secure e-commerce platforms to help businesses grow.',
    icon: '🛒'
  },
  {
    id: '05',
    title: 'DATABASE MANAGEMENT & ANALYTICS',
    description: 'Optimizing and managing data to provide valuable insights for decision-making.',
    icon: '📊'
  },
  {
    id: '06',
    title: 'API INTEGRATION & TECHNICAL CONSULTING',
    description: 'Expert advice and integration of APIs to enhance application functionality.',
    icon: '🔌'
  }
]

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
    }
  })
}

import { usePathname } from 'next/navigation'
import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '@/components/services/ServiceCard'

export default function AboutServices() {
  const pathname = usePathname()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [services, setServices] = useState(defaultServices)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const gridY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const decorScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

  useEffect(() => {
    async function fetchData(lang: string) {
      const supabase = createClient()
      if (!supabase) return []
      const { data, error } = await supabase
        .from('portfolio_services')
        .select('*')
        .eq('language', lang)
        .order('order_index', { ascending: true })
      if (error) throw error
      return data || []
    }

    async function loadServices() {
      try {
        const localeMatch = pathname.match(/^\/([a-z]{2}-[A-Z]{2})/);
        const currentLanguage = localeMatch ? localeMatch[1] : 'en-CA';

        let data = await fetchData(currentLanguage)

        // Fallback to en-CA
        if (data.length === 0 && currentLanguage !== 'en-CA') {
          data = await fetchData('en-CA')
        }

        if (data && data.length > 0) {
          setServices(
            data.map((item: any, index: number) => ({
              id: item.number_id || String(item.order_index) || String(index + 1).padStart(2, '0'),
              title: item.title,
              description: item.description,
              icon: item.icon_emoji || '💻',
            }))
          )
        }
      } catch (error) {
        console.error('Failed to load about services:', error)
      }
    }

    loadServices()
  }, [pathname])

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{ py: 12, bgcolor: '#f8f9fa', position: 'relative', overflow: 'hidden' }}
    >
      {/* Drifting decorative circle */}
      <motion.div
        style={{ scale: decorScale }}
        aria-hidden
        className="absolute -top-16 right-[10%] w-72 h-72 rounded-full pointer-events-none"
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,106,90,0.07) 0%, transparent 70%)',
          border: '1px solid rgba(16,106,90,0.08)'
        }} />
      </motion.div>

      <motion.div
        style={{ scale: decorScale }}
        aria-hidden
        className="absolute bottom-0 left-[5%] w-48 h-48 rounded-full pointer-events-none"
      >
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(250,204,21,0.1) 0%, transparent 70%)',
        }} />
      </motion.div>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading 
          title="MY SERVICES"
          subtitle="I offer a wide range of services to help you build and scale your products. Our team is dedicated to providing high-quality solutions tailored to your needs."
          align="center"
          variant="h3"
          sx={{ mb: 10 }}
        />


        {/* Cards with parallax + stagger */}
        <motion.div style={{ y: gridY }}>
          <Grid container spacing={4}>
            {services.map((service, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <motion.div
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                >
                  <ServiceCard
                    id={service.id}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    index={i}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  )
}

"use client"

import React, { useRef } from 'react'
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faBriefcase, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'next/navigation'

const isRtlLang = (lang: string) => lang === 'ar-SA' || lang === 'ur-PK'

export interface TimelineEvent {
  id: number | string
  type: 'education' | 'experience'
  title: string
  subtitle: string
  organization: string
  date: string
  description?: string
  icon?: any
}

export const timelineData: TimelineEvent[] = [
  {
    id: 1,
    type: 'education',
    title: 'Intermediate',
    subtitle: 'AL HYAT M A NAKH CHITRAL',
    organization: 'AL HYAT M A NAKH CHITRAL',
    date: '2016-2018',
    icon: faGraduationCap
  },
  {
    id: 2,
    type: 'education',
    title: 'Bachelor of Computer Science',
    subtitle: 'UOL UNIVERSITY LAHORE',
    organization: 'UOL UNIVERSITY LAHORE',
    date: '2018-2022',
    icon: faGraduationCap
  },
  {
    id: 3,
    type: 'experience',
    title: 'FULL STACK DEVELOPER',
    subtitle: 'SOLEL NEB INDIA',
    organization: 'SOLEL NEB INDIA',
    date: '2023-2024',
    description: 'Implemented secure user authentication with JWT payloads, architected microservices backend, integrating modern React frontends. Proficient in delivering responsive user interfaces using tailored CSS frameworks and agile methodologies.',
    icon: faBriefcase
  },
  {
    id: 4,
    type: 'experience',
    title: 'FULL STACK DEVELOPER',
    subtitle: 'Freelance / Open Source',
    organization: 'Remote',
    date: '2024-PRESENT',
    description: 'Architecting high-performance web applications and contributing to the global developer community. Focusing on scalable infrastructure and premium UX/UI designs.',
    icon: faBriefcase
  }
]

function TimelineItem({ event, index, isEven, isMobile, scrollYProgress, isRtl }: { event: TimelineEvent, index: number, isEven: boolean, isMobile: boolean, scrollYProgress: any, isRtl: boolean }) {
  // Parallax effect: items move vertically at slightly different speeds
  const yOffset = useTransform(scrollYProgress, [0, 1], [index * 30, index * -30])

  const isEdu = event.type === 'education'
  const themeColor = isEdu ? '#FACC15' : '#106A5A'
  const themeBg = isEdu ? 'rgba(250, 204, 21, 0.1)' : 'rgba(16, 106, 90, 0.1)'

  const isAlternate = isRtl ? !isEven : isEven
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: isAlternate ? 'flex-start' : 'flex-end',
        mb: { xs: 4, md: 6 },
        position: 'relative',
        width: '100%'
      }}
    >
      {/* Card Container */}
      <Box 
        sx={{ 
          width: { xs: 'calc(100% - 70px)', md: '42%' },
          ml: { xs: '70px', md: isAlternate ? 0 : 'auto' },
          mr: { xs: 0, md: isAlternate ? 'auto' : 0 }
        }}
      >
        <motion.div
          style={{ y: 0 }}
          initial={{ opacity: 0, x: isAlternate ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: 'spring', damping: 20 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 6,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'rgba(0,0,0,0.05)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                bgcolor: themeColor,
              },
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              '&:hover': {
                transform: 'scale(1.02) translateX(0)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.08)',
                borderColor: 'rgba(16, 106, 90, 0.2)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
              <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: themeBg, display: 'flex' }}>
                <FontAwesomeIcon icon={faCalendar} style={{ color: themeColor, fontSize: '0.8rem' }} />
              </Box>
              <Typography variant="caption" sx={{ color: themeColor, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                {event.date}
              </Typography>
            </Box>
            
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 900, 
                mb: 1, 
                color: 'text.primary',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
                lineHeight: 1.2,
                textTransform: 'uppercase'
              }}
            >
              {event.title}
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'primary.main', 
                fontWeight: 700, 
                mb: 3,
                textTransform: 'uppercase',
                letterSpacing: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {event.subtitle}
            </Typography>

            {event.description && (
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '0.95rem' }}>
                {event.description}
              </Typography>
            )}
          </Paper>
        </motion.div>
      </Box>

      {/* Timeline Icon */}
      <Box 
        sx={{ 
          position: 'absolute', 
          left: { xs: isRtl ? 'auto' : '20px', md: '50%' },
          right: { xs: isRtl ? '20px' : 'auto', md: 'auto' },
          transform: 'translateX(-50%)',
          zIndex: 1,
          top: 40
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          <Box 
            sx={{ 
              width: { xs: 40, md: 56 }, 
              height: { xs: 40, md: 56 }, 
              borderRadius: '50%', 
              bgcolor: 'white', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '3px solid',
              borderColor: themeColor,
              color: themeColor,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              zIndex: 2,
              position: 'relative'
            }}
          >
            <FontAwesomeIcon icon={event.icon} style={{ fontSize: isMobile ? '1rem' : '1.4rem' }} />
          </Box>
        </motion.div>
        
        {/* Animated connection line extension or small dots */}
        <Box 
          sx={{ 
            width: 12, 
            height: 12, 
            borderRadius: '50%', 
            border: '3px solid', 
            borderColor: themeColor,
            bgcolor: 'white',
            position: 'absolute',
            bottom: -30,
            left: '50%',
            transform: 'translateX(-50%)'
          }} 
        />
      </Box>
    </Box>
  )
}

export default function ExperienceTimeline({ data, lang: propLang }: { data?: TimelineEvent[], lang?: string }) {
  const params = useParams()
  const lang = propLang || (params?.lang as string) || 'en-CA'
  const isRtl = isRtlLang(lang)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const containerRef = useRef<HTMLDivElement>(null)
  
  const displayData = data || timelineData
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <Box ref={containerRef} sx={{ py: 10, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 12, px: { md: 10 } }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Box sx={{ position: 'relative', width: 'fit-content' }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 900, 
                  color: 'text.primary', 
                  fontSize: { xs: '1.2rem', md: '2.5rem' },
                  letterSpacing: 2,
                  mb: 1
                }}
              >
                EDUCATION
              </Typography>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100.5%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ height: 12, position: 'absolute', bottom: -8, left: 0 }}
              >
                <svg width="100%" height="100%" viewBox="0 0 100 12" fill="none" preserveAspectRatio="none">
                  <path d="M1 10C15 2 85 2 99 10" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </motion.div>

            </Box>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Box sx={{ position: 'relative', width: 'fit-content' }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 900, 
                  color: 'text.primary', 
                  fontSize: { xs: '1.2rem', md: '2.5rem' },
                  letterSpacing: 2,
                  textAlign: isRtl ? 'left' : 'right',
                  mb: 1
                }}
              >
                EXPERIENCE
              </Typography>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100.5%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ height: 12, position: 'absolute', bottom: -8, left: 0 }}
              >
                <svg width="100%" height="100%" viewBox="0 0 100 12" fill="none" preserveAspectRatio="none">
                  <path d="M1 10C15 2 85 2 99 10" stroke="#106A5A" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </motion.div>

            </Box>
          </motion.div>
        </Box>


        {/* Timeline Line */}
        <Box sx={{ position: 'relative', minHeight: '400px' }}>
          {/* Vertical Center Line */}
          <Box 
            sx={{ 
              position: 'absolute', 
              left: { xs: '20px', md: '50%' }, 
              transform: { md: 'translateX(-50%)' },
              top: 0,
              bottom: 0,
              width: '2px',
              bgcolor: 'rgba(16, 106, 90, 0.1)',
              zIndex: 0,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, transparent, rgba(16, 106, 90, 0.5) 20%, rgba(16, 106, 90, 0.5) 80%, transparent)'
              }
            }} 
          />

          {displayData.map((event, index) => {
            const isEven = index % 2 === 0
            // Assign icons based on type if missing
            const icon = event.icon || (event.type === 'education' ? faGraduationCap : faBriefcase)
            const eventWithIcon = { ...event, icon }
            return <TimelineItem key={event.id} event={eventWithIcon} index={index} isEven={isEven} isMobile={isMobile} scrollYProgress={scrollYProgress} isRtl={isRtl} />
          })}
        </Box>
      </Box>
    </Box>
  )
}

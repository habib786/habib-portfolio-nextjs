'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Box, Container, Typography, Card, CardContent, Avatar, Tooltip } from '@mui/material'
import { usePathname } from 'next/navigation'
import SectionHeading from '@/components/ui/SectionHeading'

const defaultTechStack = [
  { name: 'Node.js', percent: 77, iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Angular', percent: 64, iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'React', percent: 90, iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'MongoDB', percent: 88, iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'AWS', percent: 80, iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Docker', percent: 62, iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
]


export default function TechStackSection() {
  const pathname = usePathname()
  const [techStack, setTechStack] = useState<any[]>(defaultTechStack)
  const [mounted, setMounted] = useState(false)
  const [container, setContainer] = useState<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: container ? { current: container } : undefined,
    offset: ["start end", "end start"]
  })

  useEffect(() => {
    async function fetchData(lang: string) {
      const supabase = createClient()
      if (!supabase) return []
      
      const { data, error } = await supabase
        .from('portfolio_tech_stack')
        .select('*')
        .eq('language', lang)
        .order('order_index', { ascending: true })

      if (error) throw error
      return data || []
    }

    async function fetchTechStack() {
      try {
        const localeMatch = pathname.match(/^\/([a-z]{2}-[A-Z]{2})/);
        const currentLanguage = localeMatch ? localeMatch[1] : 'en-CA';

        let data = await fetchData(currentLanguage)

        // Fallback to en-CA if no data for current language
        if (data.length === 0 && currentLanguage !== 'en-CA') {
          data = await fetchData('en-CA')
        }

        if (data && data.length > 0) {
          setTechStack(data.map(item => ({
            name: item.name,
            percent: item.proficiency,
            iconSrc: item.icon_src
          })))
        }
      } catch (err) {
        console.error('Error fetching tech stack:', err)
      }
    }
    fetchTechStack()
  }, [pathname])

  return (
    <Box component="section" ref={setContainer} sx={{ position: 'relative', bgcolor: 'background.default', pt: { xs: 8, md: 12 }, pb: 8, mt: 4, overflow: 'hidden' }}>
      <Container maxWidth="md">
        <SectionHeading 
          title="TECH STACK"
          align="center"
          sx={{ mb: 8 }}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 2.5, sm: 4 } }}>

          {techStack.map((tech, i) => (
            <TechItem key={i} tech={tech} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

function TechItem({ tech, index, scrollYProgress }: { tech: any, index: number, scrollYProgress: any }) {
  // Each item moves at a slightly different speed based on its index
  const y = useTransform(scrollYProgress, [0, 1], [0, (index % 3 + 1) * -30])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <motion.div style={{ y, opacity }}>
      <Tooltip title={`${tech.name}: ${tech.percent}% Proficiency`} arrow>
        <Box sx={{ 
          width: { xs: 100, sm: 130 }, 
          p: 3, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 1,
          bgcolor: 'background.paper',
          boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
          border: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': { 
            transform: 'translateY(-8px)', 
            boxShadow: '0 12px 25px rgba(0,0,0,0.05)',
            borderColor: 'primary.light',
            '& .tech-progress': { width: '100%' }
          }
        }}>
          <Avatar 
            src={tech.iconSrc} 
            alt={tech.name} 
            sx={{ 
              width: 54, 
              height: 54, 
              mb: 2, 
              p: 0.5, 
              bgcolor: 'transparent', 
              borderRadius: 0, 
              transition: 'transform 0.3s',
              '& img': { objectFit: 'contain' },
              '&:hover img': { transform: 'scale(1.1)' }
            }} 
          />
          <Typography variant="caption" sx={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: 'text.secondary', textAlign: 'center', mb: 1 }}>
            {tech.name}
          </Typography>
          
          <Box sx={{ width: '100%', height: 3, bgcolor: 'divider', borderRadius: 1, position: 'relative' }}>
             <Box className="tech-progress" sx={{ 
               position: 'absolute', 
               left: 0, 
               top: 0, 
               height: '100%', 
               width: `${tech.percent}%`, 
               bgcolor: 'secondary.main', 
               borderRadius: 1,
               transition: 'width 0.5s ease-out'
             }} />
          </Box>
        </Box>
      </Tooltip>
    </motion.div>
  )
}





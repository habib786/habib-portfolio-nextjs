'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Container, Typography, Stack, Grid } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import WavyHeroBackground from '@/components/shared/WavyHeroBackground'
import AnimatedWaveSeparator from '@/components/shared/AnimatedWaveSeparator'
import { useProfileImage } from '@/lib/hooks/useProfileImage'
import AnimatedSquigglyLine from '@/components/animations/AnimatedSquigglyLine'

const defaultProjects = [
  {
    id: 1,
    title: 'ALIA ALYAL',
    category: 'WEB APP',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    gridClass: 'col-span-1 row-span-2'
  },
  {
    id: 2,
    title: 'CACHOU',
    category: 'WEB APP',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    gridClass: 'col-span-1 row-span-1'
  },
  {
    id: 3,
    title: 'VOUJI CHOCOLATE',
    category: 'UI/UX DESIGN',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    gridClass: 'col-span-1 row-span-2'
  },
  {
    id: 4,
    title: 'NATA',
    category: 'BRANDING',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    gridClass: 'col-span-1 row-span-1'
  },
  {
    id: 5,
    title: 'FLY HIGHLIGHTS',
    category: 'MOBILE APP',
    image: 'https://images.unsplash.com/photo-1512413316925-fd4b9a78a529?w=800&q=80',
    gridClass: 'col-span-1 row-span-1'
  },
  {
    id: 6,
    title: 'TEAM',
    category: 'DESIGN',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    gridClass: 'col-span-1 row-span-1'
  }
]

export default function ProjectsPageClient() {
  const [projects, setProjects] = useState<any[]>([])
  const profileImage = useProfileImage()

  useEffect(() => {
    async function fetchData() {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        if (!supabase) {
          setProjects(defaultProjects)
          return
        }

        const { data: projectsData } = await supabase
          .from('projects')
          .select('*')
          .order('order_index', { ascending: true })

        if (projectsData && projectsData.length > 0) {
          setProjects(projectsData.map(p => ({
            id: p.id,
            title: p.title,
            category: p.category || 'PROJECT',
            image: p.cover_image || p.image_url,
            slug: p.slug,
            gridClass: p.grid_class || 'col-span-1 row-span-1'
          })))
        } else {
          setProjects(defaultProjects)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setProjects(defaultProjects)
      }
    }
    fetchData()
  }, [])

  return (
    <Box sx={{ bgcolor: 'var(--background)', minHeight: '100vh', pb: { xs: 10, md: 20 } }}>
      {/* Header Section */}
      <Box sx={{ 
        bgcolor: 'var(--primary)', 
        position: 'relative', 
        pt: { xs: 12, md: 20 }, 
        pb: { xs: 20, md: 30 }, 
        overflow: 'hidden',
        color: 'white'
      }}>
        <WavyHeroBackground />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container sx={{ alignItems: 'center' }} spacing={{ xs: 6, md: 4 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Box sx={{ position: 'relative', width: 'fit-content' }}>
                  <Typography variant="h1" sx={{ 
                    fontWeight: 900, 
                    fontSize: { xs: '3.5rem', sm: '4.5rem', md: '5.5rem' },
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    mb: 2,
                    textShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    fontFamily: 'inherit',
                  }}>
                    MY<br />WORK
                  </Typography>
                  <AnimatedSquigglyLine width="100%" delay={0.3} />
                </Box>
                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                  <Box sx={{ 
                    px: 2, 
                    py: 0.5, 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    borderRadius: 1,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                      {projects.length} PROJECTS
                    </Typography>
                  </Box>
                </Stack>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: 250, md: 350 },
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                  }}
                >
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  ) : null}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        <AnimatedWaveSeparator />
      </Box>

      {/* Projects Grid Section */}
      <Container maxWidth="xl" sx={{ mt: { xs: 8, md: 12 } }}>
        <Box sx={{ px: { md: 4 } }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.15 }}
                className={`relative ${index % 2 === 1 ? 'md:translate-y-48' : ''}`}
              >
                <Link href={`/projects/${project.slug}`}>
                  <Box sx={{ 
                    position: 'relative', 
                    height: { xs: 280, md: 400 },
                    borderRadius: '10px', 
                    overflow: 'hidden',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-20px) scale(1.02)',
                      boxShadow: '0 50px 100px rgba(16,106,90,0.2)',
                    }
                  }}>
                    <Image 
                      src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'} 
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority={index < 2}
                    />
                    <Box sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'rgba(16,106,90,0.3)',
                      backdropFilter: 'blur(8px)',
                      opacity: 0,
                      transition: 'all 0.5s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        opacity: 1
                      }
                    }}>
                      <Typography variant="h4" sx={{ color: 'white', fontWeight: 900, textTransform: 'uppercase' }}>
                        {project.title}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </motion.div>
            ))}
          </div>
        </Box>
      </Container>
    </Box>
  )
}
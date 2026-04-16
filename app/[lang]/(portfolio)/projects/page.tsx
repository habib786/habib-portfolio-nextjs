'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Container, Typography, Stack, Grid } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import WavyHeroBackground from '@/components/shared/WavyHeroBackground'
import AnimatedWaveSeparator from '@/components/shared/AnimatedWaveSeparator'
import ElevatedContentCard from '@/components/shared/ElevatedContentCard'
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

export default function ProjectsPage() {
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
        {/* Dynamic Wavy Background Decor – animated */}
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
                    fontFamily: 'inherit'
                  }}>
                    PROJECTS
                  </Typography>
                  <AnimatedSquigglyLine width="100%" delay={0.3} />

                </Box>

              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, position: 'relative' }}>
               <motion.div
                 initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                 animate={{ opacity: 1, scale: 1, rotate: 0 }}
                 transition={{ duration: 1.2, delay: 0.2, type: "spring", stiffness: 100 }}
                 style={{ position: 'relative' }}
               >
                 {/* Premium Yellow Circle Portrait */}
                 <Box sx={{ 
                    width: { xs: 280, md: 480 }, 
                    height: { xs: 280, md: 480 }, 
                    bgcolor: '#FACC15', 
                    borderRadius: '50%',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
                    border: '12px solid rgba(255,255,255,0.1)'
                 }}>
                    <img 
                       src={profileImage} 
                       alt="Habib" 
                       style={{ 
                         width: '100%', 
                         height: '100%', 
                         objectFit: 'cover',
                         objectPosition: 'top',
                         transform: 'scale(1.1)'
                       }} 
                    />
                 </Box>
                 
                 {/* Decorative orbits – animated */}
                 {/* Outer dashed ring: clockwise rotation + marching dots */}
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                   style={{
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     x: '-50%',
                     y: '-50%',
                     width: '140%',
                     height: '140%',
                     zIndex: -1,
                     opacity: 0.25,
                   }}
                 >
                   <svg width="100%" height="100%" viewBox="0 0 800 800" fill="none">
                     <motion.circle 
                       animate={{ strokeDashoffset: [-40, 0] }}
                       transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                       cx="400" cy="400" r="350" stroke="white" strokeWidth="1.5" strokeDasharray="20 20" 
                     />
                   </svg>
                 </motion.div>

                 {/* Inner thin ring: counter-clockwise rotation + marching dots */}
                 <motion.div
                   animate={{ rotate: -360 }}
                   transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                   style={{
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     x: '-50%',
                     y: '-50%',
                     width: '120%',
                     height: '120%',
                     zIndex: -1,
                     opacity: 0.15,
                   }}
                 >
                   <svg width="100%" height="100%" viewBox="0 0 800 800" fill="none">
                     <motion.circle 
                       animate={{ strokeDashoffset: [24, 0] }}
                       transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                       cx="400" cy="400" r="350" stroke="white" strokeWidth="0.8" strokeDasharray="6 18" 
                     />
                   </svg>
                 </motion.div>
               </motion.div>
            </Grid>
          </Grid>
        </Container>
        <AnimatedWaveSeparator />
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="xl" sx={{ mt: { xs: -10, md: -15 }, position: 'relative', zIndex: 10 }}>
        <ElevatedContentCard padding={{ xs: 5, md: 12 }}>
          <Stack spacing={4} sx={{ mb: { xs: 10, md: 15 } }}>
            <Box sx={{ position: 'relative', width: 'fit-content' }}>
              <Typography variant="h4" sx={{ 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  letterSpacing: 4,
                  color: 'var(--foreground)',
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  lineHeight: 1.2,
                  mb: 1
              }}>
                CREATIVE.<br />PROFESSIONAL.<br />ETHICAL.
              </Typography>


            </Box>

            <Typography variant="body1" sx={{ 
                fontSize: { xs: '1.1rem', md: '1.25rem' }, 
                lineHeight: 1.9, 
                color: 'var(--muted-foreground)', 
                maxWidth: 900,
                fontWeight: 500,
                opacity: 0.9
            }}>
              My projects aim to create innovative solutions and use a combination of art and technical excellence. 
              I am dedicated to delivering high quality, professional results that meet and exceed performance metrics 
              and user expectations.
            </Typography>
          </Stack>

          {/* Staggered Masonry Grid */}
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
                  <Box sx={{ 
                    position: 'relative', 
                    borderRadius: '10px', 
                    overflow: 'hidden',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-20px) scale(1.02)',
                      boxShadow: '0 50px 100px rgba(16,106,90,0.2)',
                    },
                    '&:hover img': {
                      transform: 'scale(1.1) rotate(1deg)',
                    },
                    '&:hover .project-overlay': {
                      opacity: 1
                    }
                  }}>
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      width={1000}
                      height={1250}
                      className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-1000 ease-out"
                      priority={index < 2}
                    />
                    
                    {/* Hover Interaction Layer */}
                    <Box className="project-overlay" sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'rgba(16,106,90,0.3)',
                      backdropFilter: 'blur(8px)',
                      opacity: 0,
                      transition: 'all 0.5s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3
                    }}>
                       <Link href={`/projects/${project.slug || project.id || project.title.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                         <Box sx={{ 
                           bgcolor: 'white', 
                           color: 'var(--primary)', 
                           px: 6, 
                           py: 2, 
                           borderRadius: '5px',
                           fontWeight: 900,
                           textTransform: 'uppercase',
                           letterSpacing: 2,
                           boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                           '&:hover': { transform: 'scale(1.05)', bgcolor: '#FACC15', color: 'black' },
                           transition: 'all 0.3s'
                         }}>
                           Explore Project
                         </Box>
                       </Link>
                    </Box>

                    {/* Iconic Black Label */}
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: 60, 
                      left: -20, 
                      bgcolor: 'black', 
                      color: 'white',
                      px: { xs: 4, md: 6 },
                      py: 2.5,
                      fontWeight: 950,
                      fontSize: { xs: '0.8rem', md: '1rem' },
                      letterSpacing: 4,
                      textTransform: 'uppercase',
                      zIndex: 10,
                      boxShadow: '20px 20px 40px rgba(0,0,0,0.4)',
                      transform: 'rotate(-3deg)',
                      borderRight: '6px solid #FACC15',
                      pointerEvents: 'none'
                    }}>
                      {project.title}
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </div>
            {/* Height compensation for the staggered layout */}
            <Box sx={{ height: { xs: 50, md: 300 } }} />
          </Box>
        </ElevatedContentCard>
      </Container>

      {/* GET IN TOUCH / CTA Section */}
      <Box sx={{ mt: { xs: 15, md: 25 }, mb: 10 }}>
        <Container maxWidth="lg">
           <Box sx={{ 
             display: 'flex', 
             flexDirection: { xs: 'column', md: 'row' },
             alignItems: 'center', 
             justifyContent: 'center',
             gap: { xs: 10, md: 0 }
           }}>
              {/* Text Oval Container */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ zIndex: 2 }}
              >
                <Box sx={{ 
                  width: { xs: 340, md: 550 }, 
                  height: { xs: 340, md: 550 }, 
                  borderRadius: '50%',
                  bgcolor: 'white',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  p: { xs: 6, md: 10 },
                  boxShadow: '0 40px 80px rgba(0,0,0,0.05)',
                  mr: { md: -10 }
                }}>
                  <Stack spacing={4} sx={{ alignItems: 'center' }}>
                     <Typography variant="body2" sx={{ color: 'var(--primary)', fontWeight: 900, letterSpacing: 3, textTransform: 'uppercase', fontSize: '0.8rem' }}>
                       Want to build something?
                     </Typography>
                     <Typography variant="h2" sx={{ 
                       fontWeight: 900, 
                       color: 'var(--foreground)', 
                       lineHeight: 1,
                       fontSize: { xs: '2rem', md: '3.5rem' },
                       letterSpacing: -1
                     }}>
                       LET'S TALK<br />ABOUT YOUR<br />PROJECT
                     </Typography>
                     <Link href="/contact" style={{ textDecoration: 'none' }}>
                        <Box sx={{ 
                          bgcolor: 'var(--primary)', 
                          color: 'white', 
                          px: 10, 
                          py: 2.5, 
                          borderRadius: '50px',
                          fontWeight: 900,
                          fontSize: '0.9rem',
                          letterSpacing: 3,
                          '&:hover': { 
                            bgcolor: 'black',
                            transform: 'translateY(-5px) scale(1.02)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                          },
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          boxShadow: '0 15px 30px rgba(16,106,90,0.4)'
                        }}>
                          LET'S TALK →
                        </Box>
                     </Link>
                  </Stack>
                </Box>
              </motion.div>

              {/* Portrait Yellow Circle Container */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ zIndex: 1 }}
              >
                <Box sx={{ 
                  width: { xs: 340, md: 550 }, 
                  height: { xs: 340, md: 550 }, 
                  borderRadius: '50%',
                  bgcolor: '#FACC15',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  position: 'relative',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  ml: { md: -2 }
                }}>
                   <img 
                      src={profileImage} 
                      alt="Habib" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        objectPosition: 'top'
                      }} 
                   />
                </Box>
              </motion.div>
           </Box>
        </Container>
      </Box>
    </Box>
  )
}

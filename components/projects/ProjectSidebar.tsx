'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, ExternalLink, Code, Calendar, Eye, Tag, Star } from 'lucide-react'
import {
  Box, Typography, Card, CardContent,
  Chip, Stack, Button
} from '@mui/material'
import { motion } from 'framer-motion'
import { MappedProject, RelatedProject } from '@/lib/types'

interface ProjectSidebarProps {
  project: Pick<MappedProject, 'id' | 'title' | 'slug' | 'category' | 'technologies' | 'liveUrl' | 'repoUrl' | 'createdAt' | 'views'>
  relatedProjects?: RelatedProject[]
}

const cardVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function ProjectSidebar({ project, relatedProjects }: ProjectSidebarProps) {
  const [starCount, setStarCount] = useState(128)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <motion.div initial="hidden" animate="visible" variants={cardVariants}>
        <Card
          sx={{
            borderRadius: '5px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid var(--border)',
            '&:hover': { boxShadow: '0 8px 30px rgba(16,106,90,0.12)' },
            transition: 'all 0.3s',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Project Stats</Typography>
            <Stack spacing={2}>
              {[
                { icon: <Calendar size={16} />, label: 'Created', value: new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) },
                { icon: <Eye size={16} />, label: 'Views', value: project.views.toLocaleString() },
                { icon: <Tag size={16} />, label: 'Category', value: project.category },
              ].map((stat) => (
                <Box key={stat.label} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ color: 'var(--primary)' }}>{stat.icon}</Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{stat.value}</Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </motion.div>

      {project.liveUrl && (
        <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.1 }}>
          <Card
            sx={{
              borderRadius: '5px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid var(--border)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Live Demo</Typography>
              <Button
                component={Link}
                fullWidth
                variant="contained"
                startIcon={<ExternalLink />}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Live Project
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {project.repoUrl && (
        <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.2 }}>
          <Card
            sx={{
              borderRadius: '5px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid var(--border)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Source Code</Typography>
              <Button
                component={Link}
                fullWidth
                variant="outlined"
                startIcon={<Code />}
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Repository
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {relatedProjects && relatedProjects.length > 0 && (
        <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.3 }}>
          <Card
            sx={{
              borderRadius: '5px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid var(--border)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Related Projects</Typography>
              <Stack spacing={2}>
                {relatedProjects.map((rel) => (
                  <Box
                    key={rel.id}
                    component={Link}
                    href={`/projects/${rel.slug}`}
                    sx={{
                      display: 'block',
                      p: 2,
                      borderRadius: '5px',
                      border: '1px solid var(--border)',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'var(--primary)',
                        bgcolor: 'rgba(16,106,90,0.04)',
                      },
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {rel.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {rel.category}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </Box>
  )
}
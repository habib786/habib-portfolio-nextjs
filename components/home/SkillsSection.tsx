'use client'

import { useState } from 'react'
import { Code, Database, Server, Palette, Terminal, Cloud } from 'lucide-react'

const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: Palette,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'JavaScript (ES6+)', level: 94 },
      { name: 'HTML5/CSS3', level: 96 },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: Server,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'Express.js', level: 86 },
      { name: 'REST APIs', level: 90 },
      { name: 'GraphQL', level: 82 },
      { name: 'Authentication', level: 87 },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'PostgreSQL', level: 84 },
      { name: 'MongoDB', level: 82 },
      { name: 'Redis', level: 78 },
      { name: 'Supabase', level: 86 },
      { name: 'Prisma', level: 83 },
      { name: 'SQL', level: 85 },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    icon: Cloud,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'CI/CD', level: 82 },
      { name: 'Git', level: 90 },
      { name: 'Linux', level: 85 },
      { name: 'Nginx', level: 78 },
    ],
  },
  {
    id: 'tools',
    name: 'Tools & Others',
    icon: Terminal,
    color: 'from-yellow-500 to-amber-500',
    skills: [
      { name: 'GitHub', level: 92 },
      { name: 'VS Code', level: 94 },
      { name: 'Figma', level: 76 },
      { name: 'Jest', level: 82 },
      { name: 'Webpack', level: 79 },
      { name: 'Postman', level: 88 },
    ],
  },
  {
    id: 'ai',
    name: 'AI & ML',
    icon: Code,
    color: 'from-indigo-500 to-purple-500',
    skills: [
      { name: 'OpenAI API', level: 83 },
      { name: 'TensorFlow', level: 75 },
      { name: 'PyTorch', level: 72 },
      { name: 'LangChain', level: 78 },
      { name: 'Computer Vision', level: 70 },
      { name: 'NLP', level: 76 },
    ],
  },
]

import { Tabs, Tab, Box, Typography, LinearProgress, Stack, Paper, Grid } from '@mui/material'

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('frontend')

  const activeCategoryData = skillCategories.find(cat => cat.id === activeCategory)

  return (
    <Box sx={{ width: '100%', py: 2 }}>
      {/* Category Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 6 }}>
        <Tabs 
          value={activeCategory} 
          onChange={(_, val) => setActiveCategory(val)}
          centered
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            }
          }}
        >
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <Tab 
                key={category.id}
                value={category.id}
                icon={<Icon size={18} />}
                iconPosition="start"
                label={category.name}
                sx={{ 
                  fontWeight: 600,
                  minHeight: 64,
                  textTransform: 'none',
                  px: 3
                }}
              />
            )
          })}
        </Tabs>
      </Box>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {activeCategoryData?.skills.map((skill) => (
          <Paper
            key={skill.name}
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 1, 
              border: '1px solid', 
              borderColor: 'divider',
              '&:hover': { boxShadow: 4, borderColor: 'primary.light' },
              transition: 'all 0.3s'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{skill.name}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }} color="primary">
                {skill.level}%
              </Typography>
            </Box>
            
            {/* Progress Bar */}
            <Box sx={{ width: '100%', mb: 1.5 }}>
              <LinearProgress 
                variant="determinate" 
                value={skill.level} 
                sx={{ 
                  height: 10, 
                  borderRadius: 1,
                  bgcolor: 'action.hover',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 1,
                    backgroundImage: `linear-gradient(to right, ${activeCategoryData.color.split(' ')[0].replace('from-', '').replace('-', '.')}, ${activeCategoryData.color.split(' ')[2].replace('to-', '').replace('-', '.')})`,
                  }
                }}
              />
            </Box>
            
            {/* Proficiency Level */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">Beginner</Typography>
              <Typography variant="caption" color="text.secondary">Advanced</Typography>
              <Typography variant="caption" color="text.secondary">Expert</Typography>
            </Box>
          </Paper>
        ))}
      </div>

      {/* Legend */}
      <Box sx={{ mt: 10, pt: 8, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
          <Typography variant="subtitle2" align="center" sx={{ fontWeight: 700, mb: 4 }}>
            Proficiency Levels
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ h: 6, mb: 1, borderRadius: 1, bgcolor: 'grey.300', width: '100%' }} />
                <Typography variant="caption" color="text.secondary">Beginner (0-40%)</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ h: 6, mb: 1, borderRadius: 1, bgcolor: 'primary.light', width: '100%' }} />
                <Typography variant="caption" color="text.secondary">Intermediate (41-70%)</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ h: 6, mb: 1, borderRadius: 1, bgcolor: 'secondary.main', width: '100%' }} />
                <Typography variant="caption" color="text.secondary">Advanced (71-90%)</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ h: 6, mb: 1, borderRadius: 1, bgcolor: 'success.main', width: '100%' }} />
                <Typography variant="caption" color="text.secondary">Expert (91-100%)</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>

  )
}
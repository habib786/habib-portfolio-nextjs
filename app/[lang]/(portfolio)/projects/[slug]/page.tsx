import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Box, Container, Grid } from '@mui/material'
import ProjectContent from '@/components/projects/ProjectContent'
import ProjectSidebar from '@/components/projects/ProjectSidebar'
import ProjectHero from '@/components/projects/ProjectHero'
import { getProjectBySlug, getProjects } from '@/lib/supabase/queries'

interface ProjectPageProps {
  params: Promise<{ lang: string; slug: string }>
}

function mapProject(raw: any) {
  const tags = Array.isArray(raw?.tags) ? raw.tags : []
  const createdAt = raw?.created_at || new Date().toISOString()

  return {
    id: raw?.id ?? 0,
    title: raw?.title ?? 'Untitled',
    slug: raw?.slug ?? '',
    excerpt: raw?.excerpt ?? '',
    content: raw?.content ?? '',
    thumbnail: raw?.thumbnail ?? raw?.cover_image ?? '',
    category: raw?.category ?? '',
    technologies: raw?.technologies ?? [],
    liveUrl: raw?.live_url ?? '',
    repoUrl: raw?.repo_url ?? '',
    featured: Boolean(raw?.featured),
    tags,
    createdAt,
    views: Number(raw?.views ?? 0),
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const rawProject = await getProjectBySlug(slug, lang)

  if (!rawProject) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    }
  }

  const project = mapProject(rawProject)

  return {
    title: project.title,
    description: project.excerpt,
    keywords: project.tags,
    openGraph: {
      type: 'website',
      title: project.title,
      description: project.excerpt,
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.excerpt,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params
  const rawProject = await getProjectBySlug(slug, lang)

  if (!rawProject) {
    notFound()
  }

  const project = mapProject(rawProject)
  const relatedRaw = await getProjects(lang, false)
  const related = (relatedRaw || [])
    .filter((item: any) => item.slug !== slug)
    .slice(0, 3)
    .map(mapProject)

  return (
    <Box sx={{ bgcolor: 'var(--background)', minHeight: '100vh', pb: { xs: 10, md: 20 } }}>
      <ProjectHero project={project} />

      <Container maxWidth="xl" sx={{ mt: { xs: -8, md: -12 }, position: 'relative', zIndex: 10 }}>
        <Box
          sx={{
            bgcolor: 'var(--background)',
            p: { xs: 4, md: 8 },
            borderRadius: '5px',
            boxShadow: '0 60px 120px rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)',
            backgroundImage: 'linear-gradient(to bottom right, rgba(255,255,255,1), rgba(248,250,252,1))',
          }}
        >
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <ProjectContent project={project as any} />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <ProjectSidebar project={project as any} relatedProjects={related as any} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
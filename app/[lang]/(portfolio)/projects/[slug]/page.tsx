import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Box, Container, Grid } from '@mui/material'
import ProjectContent from '@/components/projects/ProjectContent'
import ProjectSidebar from '@/components/projects/ProjectSidebar'
import ProjectHero from '@/components/projects/ProjectHero'
import { getProjectBySlug, getProjects } from '@/lib/supabase/queries'
import { MappedProject, RelatedProject } from '@/lib/types'

export const revalidate = 3600

interface ProjectPageProps {
  params: Promise<{ lang: string; slug: string }>
}

function mapProject(raw: Record<string, unknown> | null): MappedProject {
  if (!raw) {
    return {
      id: 0,
      title: 'Untitled',
      slug: '',
      excerpt: '',
      content: '',
      thumbnail: '',
      category: '',
      technologies: [],
      liveUrl: '',
      repoUrl: '',
      featured: false,
      tags: [],
      createdAt: new Date().toISOString(),
      views: 0,
    }
  }

  const tags = Array.isArray(raw.tags) ? raw.tags as string[] : []
  const createdAt = raw.created_at as string || new Date().toISOString()

  return {
    id: (raw.id as number | string) ?? 0,
    title: (raw.title as string) ?? 'Untitled',
    slug: (raw.slug as string) ?? '',
    excerpt: (raw.excerpt as string) ?? (raw.description as string) ?? '',
    content: (raw.content as string) ?? '',
    thumbnail: (raw.thumbnail as string) ?? (raw.cover_image as string) ?? '',
    category: (raw.category as string) ?? '',
    technologies: (raw.technologies as string[]) ?? [],
    liveUrl: (raw.live_url as string) ?? (raw.liveUrl as string) ?? '',
    repoUrl: (raw.repo_url as string) ?? (raw.github_url as string) ?? '',
    featured: Boolean(raw.featured),
    tags,
    createdAt,
    views: Number(raw.views ?? 0),
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
  const related: RelatedProject[] = (relatedRaw || [])
    .filter((item): item is Record<string, unknown> => item?.slug !== slug)
    .slice(0, 3)
    .map((item): RelatedProject => mapProject(item as Record<string, unknown>))

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
              <ProjectContent project={project} />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <ProjectSidebar project={project} relatedProjects={related} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
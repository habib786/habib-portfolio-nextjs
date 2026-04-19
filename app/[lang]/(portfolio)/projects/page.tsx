import { Metadata } from 'next'
import { getSettings } from '@/lib/supabase/queries'
import ProjectsPageClient from './ProjectsPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const projectsMetaTitle = settings?.projects_meta_title ?? null
  const projectsMetaDesc = settings?.projects_meta_description ?? null
  return {
    title: typeof projectsMetaTitle === 'string' ? projectsMetaTitle : 'Projects',
    description: typeof projectsMetaDesc === 'string' ? projectsMetaDesc : 'Explore my portfolio of web applications, mobile apps, and technical projects.',
  }
}

export default function ProjectsPage() {
  return <ProjectsPageClient />
}
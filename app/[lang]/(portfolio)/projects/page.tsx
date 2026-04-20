import { Metadata } from 'next'
import { getSettings } from '@/lib/supabase/queries'
import ProjectsPageClient from './ProjectsPageClient'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const settings = await getSettings(lang)
  const projectsMetaTitle = settings?.projects_meta_title ?? null
  const projectsMetaDesc = settings?.projects_meta_description ?? null
  return {
    title: typeof projectsMetaTitle === 'string' ? projectsMetaTitle : 'Projects',
    description: typeof projectsMetaDesc === 'string' ? projectsMetaDesc : 'Explore my portfolio of web applications, mobile apps, and technical projects.',
  }
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return <ProjectsPageClient lang={lang} />
}
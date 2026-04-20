import { Metadata } from 'next'
import { getSettings } from '@/lib/supabase/queries'
import BlogPageClient from './BlogPageClient'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  const blogMetaTitle = settings?.blog_meta_title ?? null
  const blogMetaDesc = settings?.blog_meta_description ?? null
  return {
    title: typeof blogMetaTitle === 'string' ? blogMetaTitle : 'Blog',
    description: typeof blogMetaDesc === 'string' ? blogMetaDesc : 'Read my thoughts on web development, programming, and technology.',
  }
}

export default function BlogPage() {
  return <BlogPageClient />
}

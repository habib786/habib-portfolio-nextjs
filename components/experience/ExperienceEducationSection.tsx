'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import ExperienceTimeline, { TimelineEvent } from '@/components/experience/ExperienceTimeline'
import { createClient } from '@/lib/supabase/client'
import { Container } from '@mui/material'
import ElevatedContentCard from '@/components/shared/ElevatedContentCard'

export default function ExperienceEducationSection() {
  const pathname = usePathname()
  const [timelineData, setTimelineData] = useState<TimelineEvent[] | undefined>(undefined)

  useEffect(() => {
    let active = true

    async function fetchData(lang: string) {
      const supabase = createClient()
      if (!supabase) return { edu: [], exp: [] }

      const { data: eduData } = await supabase
        .from('portfolio_education')
        .select('*')
        .eq('language', lang)
        .order('order_index', { ascending: true })

      const { data: expData } = await supabase
        .from('portfolio_experience')
        .select('*')
        .eq('language', lang)
        .order('order_index', { ascending: true })

      return { edu: eduData || [], exp: expData || [] }
    }

    async function loadTimelineData() {
      try {
        // Detect locale: match /en-CA/, /fr-CA/, etc. at start of pathname
        const localeMatch = pathname.match(/^\/([a-z]{2}-[A-Z]{2})/);
        const currentLanguage = localeMatch ? localeMatch[1] : 'en-CA';

        let { edu: eduData, exp: expData } = await fetchData(currentLanguage)

        // Fallback to en-CA if current language is empty
        if (eduData.length === 0 && expData.length === 0 && currentLanguage !== 'en-CA') {
          const fallback = await fetchData('en-CA')
          eduData = fallback.edu
          expData = fallback.exp
        }

        if (!active) return

        if (eduData.length > 0 || expData.length > 0) {
          const mappedEdu: TimelineEvent[] = eduData.map((e: any) => ({
            id: `edu-${e.id}`,
            type: 'education',
            title: e.title,
            subtitle: e.subtitle,
            organization: e.subtitle,
            date: e.year_range,
          }))

          const mappedExp: TimelineEvent[] = expData.map((e: any) => ({
            id: `exp-${e.id}`,
            type: 'experience',
            title: e.title,
            subtitle: e.company || '',
            organization: e.company || '',
            date: e.year_range,
            description: e.description,
          }))

          setTimelineData([...mappedEdu, ...mappedExp])
        }
      } catch (err) {
        console.error('Error loading timeline data:', err)
      }
    }

    loadTimelineData()
    return () => {
      active = false
    }
  }, [pathname])

  return (
    <Container maxWidth="xl" sx={{ minHeight: '400px' }}>
      <ElevatedContentCard>
        <ExperienceTimeline data={timelineData} />
      </ElevatedContentCard>
    </Container>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import ExperienceTimeline, { TimelineEvent, timelineData as fallbackTimelineData } from '@/components/experience/ExperienceTimeline'
import { createClient } from '@/lib/supabase/client'
import { Container } from '@mui/material'
import ElevatedContentCard from '@/components/shared/ElevatedContentCard'
import { faGraduationCap, faBriefcase, faLaptopCode, faAward, faCertificate, faBuilding } from '@fortawesome/free-solid-svg-icons'

const iconMap: Record<string, any> = {
  faGraduationCap,
  faBriefcase,
  faLaptopCode,
  faAward,
  faCertificate,
  faBuilding
}

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

        // Fallback to en-CA if current language is empty per entity
        if (eduData.length === 0 && currentLanguage !== 'en-CA') {
          const fallback = await fetchData('en-CA')
          eduData = fallback.edu
        }
        if (expData.length === 0 && currentLanguage !== 'en-CA') {
          const fallback = await fetchData('en-CA')
          expData = fallback.exp
        }

        if (!active) return

        let mappedEdu: TimelineEvent[] = []
        let mappedExp: TimelineEvent[] = []

        if (eduData.length > 0) {
          mappedEdu = eduData.map((e: any) => ({
            id: `edu-${e.id}`,
            type: 'education',
            title: e.title,
            subtitle: e.subtitle,
            organization: e.subtitle,
            date: e.year_range,
            icon: e.icon ? iconMap[e.icon] : undefined
          }))
        } else {
          // Hardcoded fallback if nothing in DB
          mappedEdu = fallbackTimelineData.filter(e => e.type === 'education')
        }

        if (expData.length > 0) {
          mappedExp = expData.map((e: any) => ({
            id: `exp-${e.id}`,
            type: 'experience',
            title: e.title,
            subtitle: e.company || '',
            organization: e.company || '',
            date: e.year_range,
            description: e.description,
            icon: e.icon ? iconMap[e.icon] : undefined
          }))
        } else {
          // Hardcoded fallback if nothing in DB
          mappedExp = fallbackTimelineData.filter(e => e.type === 'experience')
        }

        setTimelineData([...mappedEdu, ...mappedExp])
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

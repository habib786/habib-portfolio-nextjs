'use client'

import { useEffect, useState } from 'react'
import ExperienceTimeline, { TimelineEvent } from '@/components/experience/ExperienceTimeline'
import { createClient } from '@/lib/supabase/client'

export default function ExperienceEducationSection() {
  const [timelineData, setTimelineData] = useState<TimelineEvent[] | undefined>(undefined)

  useEffect(() => {
    let active = true

    async function loadTimelineData() {
      try {
        const supabase = createClient()
        if (!supabase) return

        const { data: eduData } = await supabase
          .from('portfolio_education')
          .select('*')
          .order('order_index', { ascending: true })

        const { data: expData } = await supabase
          .from('portfolio_experience')
          .select('*')
          .order('order_index', { ascending: true })

        if (!active) return

        if ((eduData && eduData.length > 0) || (expData && expData.length > 0)) {
          const mappedEdu: TimelineEvent[] = (eduData || []).map((e) => ({
            id: `edu-${e.id}`,
            type: 'education',
            title: e.title,
            subtitle: e.subtitle,
            organization: e.subtitle,
            date: e.year_range,
          }))

          const mappedExp: TimelineEvent[] = (expData || []).map((e) => ({
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
      } catch {
        // Keep default timeline fallback from ExperienceTimeline.
      }
    }

    loadTimelineData()
    return () => {
      active = false
    }
  }, [])

  return <ExperienceTimeline data={timelineData} />
}

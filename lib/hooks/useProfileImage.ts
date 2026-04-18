'use client'

import { useEffect, useState } from 'react'

type UseProfileImageOptions = {
  defaultImage?: string
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60'

function preloadImage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve(url)
    img.onerror = () => reject(new Error('Image failed to load'))
    img.src = url
  })
}

export function useProfileImage(options: UseProfileImageOptions = {}) {
  const { defaultImage = FALLBACK_IMAGE } = options
  const [profileImage, setProfileImage] = useState(defaultImage)

  useEffect(() => {
    async function fetchProfileImage() {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        if (!supabase) return

        const { data } = await supabase.from('settings').select('*')
        if (!data) return

const profileImg = data.find((item: any) => item.key === 'profile_image')?.value
        if (typeof profileImg === 'string' && profileImg.trim()) {
          const cleanedUrl = profileImg.replace(/^["']+|["']+$/g, '').trim()
          await preloadImage(cleanedUrl)
          setProfileImage(cleanedUrl)
        }
      } catch {
        // Keep default image on any fetch / load failure.
      }
    }

    fetchProfileImage()
  }, [])

  return profileImage
}


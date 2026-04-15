'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    muted: string
    mutedForeground: string
    border: string
    card: string
    cardForeground: string
    destructive: string
  }
  fonts: {
    heading: string
    body: string
  }
  spacing: {
    containerMaxWidth: string
    sectionPadding: string
  }
  borderRadius: string
  animations: {
    enabled: boolean
    speed: string
  }
}

interface SiteSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  logo: string
  favicon: string
  socialLinks: {
    twitter?: string
    linkedin?: string
    github?: string
    instagram?: string
  }
  analytics: {
    googleAnalyticsId: string
    googleSearchConsole: string
    hotjarId: string
    facebookPixel: string
  }
}

interface ThemeContextType {
  theme: ThemeConfig
  setTheme: (theme: ThemeConfig) => void
  siteSettings: SiteSettings
  setSiteSettings: (settings: SiteSettings) => void
  resetTheme: () => void
}

const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#10b981',
    background: '#ffffff',
    foreground: '#171717',
    muted: '#f3f4f6',
    mutedForeground: '#6b7280',
    border: '#e5e7eb',
    card: '#ffffff',
    cardForeground: '#171717',
    destructive: '#ef4444',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  spacing: {
    containerMaxWidth: '1280px',
    sectionPadding: '4rem',
  },
  borderRadius: '5px',
  animations: {
    enabled: true,
    speed: 'normal',
  },
}

const defaultSiteSettings: SiteSettings = {
  siteName: 'Habib Farooq',
  siteDescription: 'Portfolio website',
  siteUrl: 'https://habibfarooq.com',
  logo: '',
  favicon: '',
  socialLinks: {
    twitter: '',
    linkedin: '',
    github: '',
    instagram: '',
  },
  analytics: {
    googleAnalyticsId: '',
    googleSearchConsole: '',
    hotjarId: '',
    facebookPixel: '',
  },
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeConfigProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeConfig>(defaultTheme)
  const [siteSettings, setSiteSettingsState] = useState<SiteSettings>(defaultSiteSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    const savedSettings = localStorage.getItem('portfolio-settings')
    
    if (savedTheme) {
      try {
        setThemeState(JSON.parse(savedTheme))
      } catch (e) {
        console.error('Failed to parse saved theme')
      }
    }
    
    if (savedSettings) {
      try {
        setSiteSettingsState(JSON.parse(savedSettings))
      } catch (e) {
        console.error('Failed to parse saved settings')
      }
    }
    
    setIsLoaded(true)
  }, [])

  const setTheme = (newTheme: ThemeConfig) => {
    setThemeState(newTheme)
    localStorage.setItem('portfolio-theme', JSON.stringify(newTheme))
    
    Object.entries(newTheme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value)
    })
  }

  const setSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettingsState(newSettings)
    localStorage.setItem('portfolio-settings', JSON.stringify(newSettings))
  }

  const resetTheme = () => {
    setTheme(defaultTheme)
    localStorage.removeItem('portfolio-theme')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, siteSettings, setSiteSettings, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export { ThemeConfigProvider as ThemeProvider }
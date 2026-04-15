'use client'

import { useState, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { usePathname, useRouter } from 'next/navigation'
import { Menu as MuiMenu, MenuItem, Fade } from '@mui/material'
import { createClient } from '@/lib/supabase/client'

type LocaleItem = {
  code: string
  name: string
  flag: string
}

const defaultLanguages: LocaleItem[] = [
  { code: 'en-CA', name: 'English (CA)', flag: 'CA' },
  { code: 'fr-CA', name: 'Francais (CA)', flag: 'CA' },
  { code: 'ar-SA', name: 'Arabic', flag: 'SA' },
  { code: 'ur-PK', name: 'Urdu', flag: 'PK' },
  { code: 'tr-TR', name: 'Turkish', flag: 'TR' },
]

export default function LanguageSelector() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [languages, setLanguages] = useState<LocaleItem[]>(defaultLanguages)
  const [currentLang, setCurrentLang] = useState<LocaleItem>(defaultLanguages[0])
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isOpen = Boolean(anchorEl)

  useEffect(() => {
    async function loadLanguages() {
      try {
        const supabase = createClient()
        if (!supabase) return

        const { data, error } = await supabase
          .from('languages')
          .select('code,name,is_active')
          .eq('is_active', true)
          .order('code')

        if (error || !data || data.length === 0) return

        setLanguages(
          data.map((item: any) => ({
            code: item.code,
            name: item.name,
            flag: item.code.split('-')[1] || 'GL',
          }))
        )
      } catch (error) {
        console.error('Failed to load languages:', error)
      }
    }

    loadLanguages()
  }, [])

  useEffect(() => {
    setMounted(true)
    const segments = pathname.split('/')
    const foundCode = segments[1]
    const lang = languages.find((l) => l.code === foundCode)
    if (lang) {
      setCurrentLang(lang)
    }
  }, [pathname, languages])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (lang: LocaleItem) => {
    setCurrentLang(lang)
    handleClose()

    const segments = pathname.split('/')
    const hasLocale = languages.some((l) => l.code === segments[1])
    if (hasLocale) {
      segments[1] = lang.code
    } else {
      segments.splice(1, 0, lang.code)
    }

    const newPath = segments.join('/') || '/'
    router.push(newPath)
  }

  if (!mounted) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 rounded-[5px] px-3 hover:bg-white/10 hover:text-white"
          aria-label="Language"
          sx={{
            color: 'white',
            fontWeight: 700,
            opacity: 0.8,
            '&:hover': { opacity: 1 },
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            letterSpacing: 1.5,
          }}
          endIcon={<ChevronDown className="h-4 w-4 transition-transform" />}
        >
          <Globe className="h-4 w-4" />
          <span>{currentLang.name}</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        id="language-button"
        aria-controls={isOpen ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
        className="flex items-center gap-1.5 rounded-[5px] px-3 hover:bg-white/10 hover:text-white"
        sx={{
          color: 'white',
          fontWeight: 700,
          opacity: 0.8,
          '&:hover': { opacity: 1 },
          textTransform: 'uppercase',
          fontSize: '0.85rem',
          letterSpacing: 1.5,
        }}
        endIcon={<ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      >
        <Globe className="h-4 w-4" />
        <span>{currentLang.name}</span>
      </Button>

      <MuiMenu
        id="language-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        slots={{ transition: Fade }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              borderRadius: 1,
              minWidth: 180,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              border: '1px solid',
              borderColor: 'divider',
            },
          },
          list: {
            'aria-labelledby': 'language-button',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang)}
            selected={currentLang.code === lang.code}
            sx={{
              display: 'flex',
              gap: 1.5,
              py: 1,
              px: 2,
              fontSize: '0.875rem',
              '&.Mui-selected': {
                fontWeight: 600,
              },
            }}
          >
            <Globe className="h-4 w-4" />
            <span>{lang.name}</span>
          </MenuItem>
        ))}
      </MuiMenu>
    </div>
  )
}

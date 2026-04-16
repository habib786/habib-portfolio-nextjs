'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { usePathname, useRouter } from 'next/navigation'
import { Menu as MuiMenu, MenuItem, Fade, Box } from '@mui/material'
import { createClient } from '@/lib/supabase/client'

type LocaleItem = {
  code: string
  name: string
  country_code: string
}

const defaultLanguages: LocaleItem[] = [
  { code: 'en-CA', name: 'English (CA)', country_code: 'CA' },
  { code: 'fr-CA', name: 'Francais (CA)', country_code: 'CA' },
  { code: 'ar-SA', name: 'Arabic', country_code: 'SA' },
  { code: 'ur-PK', name: 'Urdu', country_code: 'PK' },
  { code: 'tr-TR', name: 'Turkish', country_code: 'TR' },
]

// Flag Icon Component using SVG
const FlagIcon = ({ countryCode, size = 18 }: { countryCode: string; size?: number }) => {
  const code = countryCode.toLowerCase();
  return (
    <Box
      component="img"
      src={`https://flagcdn.com/${code}.svg`}
      alt={countryCode}
      sx={{
        width: size,
        height: 'auto',
        borderRadius: '2px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        display: 'block',
        objectFit: 'cover'
      }}
    />
  );
};

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
          .select('code, name, country_code, is_active')
          .eq('is_active', true)
          .order('code')

        if (error || !data || data.length === 0) return

        setLanguages(
          data.map((item: any) => ({
            code: item.code,
            name: item.name,
            country_code: item.country_code || item.code.split('-')[1] || 'CA',
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
          aria-label="Language"
          sx={{
            color: '#106A5A',
            fontWeight: 700,
            opacity: 1,
            border: '1px solid rgba(16, 106, 90, 0.3)',
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            letterSpacing: 1.5,
            bgcolor: 'rgba(255,255,255,0.95)',
            '&:hover': { 
              bgcolor: 'rgba(255,255,255,1)',
              borderColor: 'rgba(16, 106, 90, 0.6)'
            }
          }}
          startIcon={<FlagIcon countryCode={currentLang.country_code} />}
          endIcon={<ChevronDown className="h-4 w-4 transition-transform" />}
        >
          <span style={{ color: '#106A5A' }}>{currentLang.name.split(' ')[0]}</span>
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
        sx={{
          color: '#106A5A',
          fontWeight: 700,
          opacity: 1,
          border: '1px solid rgba(16, 106, 90, 0.3)',
          textTransform: 'uppercase',
          fontSize: '0.85rem',
          letterSpacing: 1.5,
          minWidth: 100,
          bgcolor: 'rgba(255,255,255,0.95)',
          '&:hover': { 
            bgcolor: 'rgba(255,255,255,1)',
            borderColor: 'rgba(16, 106, 90, 0.6)'
          }
        }}
        startIcon={<FlagIcon countryCode={currentLang.country_code} />}
        endIcon={<ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      >
        <span style={{ color: '#106A5A' }}>{currentLang.name.split(' ')[0]}</span>
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
              overflow: 'hidden'
            },
          },
          list: {
            'aria-labelledby': 'language-button',
            sx: { py: 0 }
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
              gap: 2,
              py: 1.5,
              px: 2,
              fontSize: '0.875rem',
              '&.Mui-selected': {
                bgcolor: 'rgba(16, 106, 90, 0.08)',
                fontWeight: 600,
                '&:hover': { bgcolor: 'rgba(16, 106, 90, 0.12)' }
              },
            }}
          >
            <FlagIcon countryCode={lang.country_code} size={20} />
            <span>{lang.name}</span>
          </MenuItem>
        ))}
      </MuiMenu>
    </div>
  )
}


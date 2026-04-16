'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatedLogo } from './AnimatedLogo'
import { Menu, X } from 'lucide-react'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@/components/ui/Button'
import { IconButton, Box, Toolbar, AppBar, Container, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { createClient } from '@/lib/supabase/client'
import type { MenuItem } from '@/lib/types'
import LanguageSelector from './LanguageSelector'


async function getMenuFromSupabase(supabase: any, language?: string) {
  try {
    let query = supabase
      .from('menu_items')
      .select('*')
      .order('order', { ascending: true });

    if (language) {
      query = query.eq('language', language.trim());
    }

    const { data, error } = await query;
    if (error) {
      console.error('Database query error:', error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error('Supabase catch error:', e);
    return [];
  }
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [navItems, setNavItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  const supabase = useMemo(() => createClient(), [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        // Robust locale detection: match strings like /ar-SA/ or /en-CA at start
        const localeMatch = pathname.match(/^\/([a-z]{2}-[A-Z]{2})/);
        const currentLanguage = localeMatch ? localeMatch[1] : 'en-CA';
        
        if (!supabase) {
          console.warn('Supabase client missing');
          return;
        }

        // 1. Try language
        let menuData = await getMenuFromSupabase(supabase, currentLanguage);
        
        // 2. Try English if empty
        if ((!menuData || menuData.length === 0) && currentLanguage !== 'en-CA') {
          menuData = await getMenuFromSupabase(supabase, 'en-CA');
        }
        
        // 3. Final safety: If STILL empty, use absolute minimal internal items
        if (!menuData || menuData.length === 0) {
          const minimalItems = ['Home', 'Projects', 'Contact'].map((title, i) => ({
            id: `minimal-${i}`,
            title,
            url: title === 'Home' ? '/' : `/${title.toLowerCase()}`,
            order: i,
            language: 'en-CA',
            created_at: '',
            updated_at: '',
            icon: null,
            parent_id: null,
            is_external: false
          }));
          setNavItems(minimalItems);
        } else {
          setNavItems(flattenMenu(menuData));
        }
      } catch (error) {
        console.error('Critical Navbar Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [pathname, supabase]);

  // Helper function to flatten hierarchical menu
  const flattenMenu = (items: any[]): MenuItem[] => {
    const result: MenuItem[] = [];
    items.forEach(item => {
      result.push({ ...item });
      if (item.children && Array.isArray(item.children)) {
        result.push(...flattenMenu(item.children));
      }
    });
    return result;
  };

  // Filter out only root-level menu items for main navigation
  const rootNavItems = navItems.filter(item => !item.parent_id);

  // Helper to get localized href
  const getLocalizedHref = (href: string) => {
    if (href.startsWith('http')) return href;
    const segments = pathname.split('/');
    const currentLocale = segments[1];
    const isLocale = ['en-CA', 'fr-CA', 'ar-SA', 'ur-PK', 'tr-TR'].includes(currentLocale);
    
    if (isLocale) {
      return `/${currentLocale}${href === '/' ? '' : href}`;
    }
    return href;
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.main', backgroundImage: 'linear-gradient(to right, #106A5A, #0d594b)', boxShadow: 0, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 72, display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: { xs: 'auto', md: '25%' } }}>
            <Link href={getLocalizedHref('/')} onClick={closeMenu} style={{ textDecoration: 'none' }}>
              <Box sx={{ color: 'secondary.main' }}>
                <AnimatedLogo />
              </Box>
            </Link>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: 5 }}>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Box key={i} sx={{ width: 60, height: 16, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }} />
              ))
            ) : (
              rootNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={getLocalizedHref(item.url)}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: pathname === getLocalizedHref(item.url) ? 'secondary.main' : 'white',
                      opacity: pathname === getLocalizedHref(item.url) ? 1 : 0.8,
                      '&:hover': { color: 'secondary.main', opacity: 1 },
                      transition: 'all 0.2s',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: pathname === getLocalizedHref(item.url) ? '100%' : '0%',
                        height: 2,
                        bgcolor: 'secondary.main',
                        transition: 'width 0.3s ease'
                      },
                      '&:hover::after': {
                        width: '100%'
                      }
                    }}
                  >
                    {item.title}
                  </Typography>
                </Link>
              ))
            )}
          </Box>

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', width: { xs: 'auto', md: '25%' }, justifyContent: 'flex-end', gap: 1.5 }}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <LanguageSelector />
            </Box>
            <IconButton 
              component={Link} 
              href="https://linkedin.com" 
              target="_blank" 
              sx={{ 
                color: 'white', 
                bgcolor: 'rgba(255,255,255,0.05)',
                '&:hover': { bgcolor: 'secondary.main', color: 'black', transform: 'rotate(10deg)' },
                transition: 'all 0.3s',
                width: 36,
                height: 36
              }}
            >
              <FontAwesomeIcon icon={faLinkedin} style={{ width: 18, height: 18 }} />
            </IconButton>
            
            <IconButton 
              component={Link} 
              href="https://github.com" 
              target="_blank" 
              sx={{ 
                color: 'white', 
                bgcolor: 'rgba(255,255,255,0.05)',
                '&:hover': { bgcolor: 'secondary.main', color: 'black', transform: 'rotate(-10deg)' },
                transition: 'all 0.3s',
                width: 36,
                height: 36
              }}
            >
              <FontAwesomeIcon icon={faGithub} style={{ width: 18, height: 18 }} />
            </IconButton>

            {/* Mobile menu button */}
            <IconButton
              sx={{ display: { md: 'none' }, color: 'white' }}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={closeMenu}
        PaperProps={{
          sx: { bgcolor: 'primary.main', backgroundImage: 'linear-gradient(to bottom, #106A5A, #0d594b)', color: 'white', pt: 8 }
        }}
      >
        <List sx={{ px: 2, pb: 4 }}>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <ListItem key={i}>
                <Box sx={{ width: '100%', height: 40, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }} />
              </ListItem>
            ))
          ) : (
            rootNavItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton 
                  component={Link} 
                  href={getLocalizedHref(item.url)} 
                  onClick={closeMenu}
                  sx={{ 
                    bgcolor: pathname === getLocalizedHref(item.url) ? 'rgba(255,255,255,0.1)' : 'transparent',
                    borderRadius: 1,
                    mb: 1,
                    '&:hover': { bgcolor: 'rgba(250, 204, 21, 0.1)' }
                  }}
                >
                  <ListItemText 
                    primary={item.title} 
                    primaryTypographyProps={{ 
                      fontWeight: 700, 
                      letterSpacing: 2, 
                      textTransform: 'uppercase',
                      color: pathname === getLocalizedHref(item.url) ? 'secondary.main' : 'white'
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            ))
          )}
          <Box sx={{ px: 2, mt: 2 }}>
            <LanguageSelector />
          </Box>
        </List>
      </Drawer>
    </AppBar>
  )
}
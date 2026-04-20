import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales } from './app/[lang]/dictionaries'

const defaultLocale = 'en-CA'

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  // Simple locale detection based on accept-language header
  // For a more robust solution, use @formatjs/intl-localematcher and negotiator
  const preferredLocales = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim())
  
  for (const preferred of preferredLocales) {
    if (locales.includes(preferred as any)) {
      return preferred
    }
    // Check if the base language matches (e.g., 'en' matches 'en-CA')
    const base = preferred.split('-')[0]
    const found = locales.find(l => l.startsWith(base))
    if (found) return found
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  return proxy(request)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Handle bare language paths: /en -> /en-CA, /fr -> /fr-CA
  const pathSegments = pathname.split('/').filter(Boolean)
  if (pathSegments.length === 1) {
    const bareLang = pathSegments[0]
    const mappedLocale = locales.find(l => l.startsWith(bareLang))
    if (mappedLocale) {
      return NextResponse.redirect(new URL(`/${mappedLocale}`, request.url))
    }
  }

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
}

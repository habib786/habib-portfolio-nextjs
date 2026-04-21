import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { hasLocale, locales, type Locale } from './app/[lang]/dictionaries'

const defaultLocale: Locale = 'en-CA'

function normalizeLocale(input: string) {
  // Accept-Language + cookies sometimes use underscores, casing variations.
  // Normalize into BCP47-ish: ll-CC (language lowercase, region uppercase).
  const raw = input.trim().replace(/_/g, '-')
  if (!raw) return null

  const parts = raw.split('-').filter(Boolean)
  if (parts.length === 0) return null

  const language = parts[0].toLowerCase()
  const region = parts[1] ? parts[1].toUpperCase() : undefined

  return region ? `${language}-${region}` : language
}

const baseLocaleMap: Record<string, Locale> = (() => {
  const map: Partial<Record<string, Locale>> = {}

  for (const l of locales) {
    const base = l.split('-')[0].toLowerCase()
    // Prefer defaultLocale for its base when available.
    if (map[base] && l !== defaultLocale) continue
    map[base] = l
  }

  return map as Record<string, Locale>
})()

function getLocale(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameLocale) return pathnameLocale

  // URL override: `?lang=fr-CA` or `?lang=fr` (base language mapped).
  const urlLang = request.nextUrl.searchParams.get('lang')
  if (urlLang) {
    const normalized = normalizeLocale(urlLang)
    if (normalized) {
      if (hasLocale(normalized)) return normalized
      const base = normalized.split('-')[0]
      const mapped = baseLocaleMap[base]
      if (mapped) return mapped
    }
  }

  // Header override (useful for reverse proxy / edge config).
  for (const headerName of ['x-locale', 'x-lang'] as const) {
    const headerValue = request.headers.get(headerName)
    if (!headerValue) continue

    const normalized = normalizeLocale(headerValue)
    if (!normalized) continue

    if (hasLocale(normalized)) return normalized

    const base = normalized.split('-')[0]
    const mapped = baseLocaleMap[base]
    if (mapped) return mapped
  }

  // Cookies (support both custom `locale` and common `NEXT_LOCALE`).
  for (const cookieName of ['locale', 'NEXT_LOCALE'] as const) {
    const cookieValue = request.cookies.get(cookieName)?.value
    if (!cookieValue) continue

    const normalized = normalizeLocale(cookieValue)
    if (!normalized) continue

    if (hasLocale(normalized)) return normalized

    const base = normalized.split('-')[0]
    const mapped = baseLocaleMap[base]
    if (mapped) return mapped
  }

  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  const preferredLocales = parseAcceptLanguage(acceptLanguage)

  for (const { locale, quality } of preferredLocales) {
    if (quality <= 0) continue
    if (locale === '*') continue

    const normalized = normalizeLocale(locale)
    if (!normalized) continue

    if (hasLocale(normalized)) return normalized

    const base = normalized.split('-')[0]
    const mapped = baseLocaleMap[base]
    if (mapped) return mapped
  }

  return defaultLocale
}

function parseAcceptLanguage(header: string): Array<{ locale: string; quality: number }> {
  return header
    .split(',')
    .map((item, index) => {
      const [localePart, ...params] = item.trim().split(';').map((s) => s.trim())
      let quality = 1

      for (const p of params) {
        const m = /^q=([0-9.]+)$/i.exec(p)
        if (!m) continue
        const q = Number.parseFloat(m[1])
        if (Number.isFinite(q)) quality = Math.max(0, Math.min(1, q))
      }

      return { locale: localePart, quality, index }
    })
    .filter((x) => x.locale.length > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)
    .map(({ locale, quality }) => ({ locale, quality }))
}

export function proxy(request: NextRequest) {
  return redirectToLocalizedPath(request)
}

export function redirectToLocalizedPath(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Handle bare language paths: /en -> /en-CA, /fr -> /fr-CA
  const pathSegments = pathname.split('/').filter(Boolean)
  if (pathSegments.length === 1) {
    const bareLang = normalizeLocale(pathSegments[0] ?? '')
    const mappedLocale = bareLang ? baseLocaleMap[bareLang.split('-')[0]] : undefined
    if (mappedLocale) {
      return NextResponse.redirect(new URL(`/${mappedLocale}`, request.url))
    }
  }

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
}

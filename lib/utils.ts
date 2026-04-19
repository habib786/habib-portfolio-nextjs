import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, locale?: string) {
  const currentLocale = locale ?? getDefaultLocale()
  return new Date(date).toLocaleDateString(currentLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(date: string | Date, locale?: string) {
  const currentLocale = locale ?? getDefaultLocale()
  return new Date(date).toLocaleDateString(currentLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getDefaultLocale() {
  if (typeof navigator !== 'undefined') return navigator.language || 'en-US'
  return 'en-US'
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function calculateReadTime(content: string) {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const SUPPORTED_LOCALES = ['en-CA', 'fr-CA', 'ar-SA', 'ur-PK', 'tr-TR']

export function getLocalizedHref(href: string, pathname: string): string {
  if (href.startsWith('http')) return href
  const segments = pathname.split('/')
  const currentLocale = segments[1]
  const isLocale = SUPPORTED_LOCALES.includes(currentLocale)
  
  if (isLocale) {
    return `/${currentLocale}${href === '/' ? '' : href}`
  }
  return href
}

export function cleanValue(val: any): any {
  if (typeof val === 'string') {
    return val.replace(/^["']+|["']+$/g, '').trim()
  }
  return val
}
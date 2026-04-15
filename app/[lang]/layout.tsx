import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ThemeConfigProvider } from '@/components/providers/ThemeConfigProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { MuiProvider } from '@/components/providers/MuiProvider'
import { getSiteMetadata } from '@/lib/supabase/queries'
import { Suspense } from 'react'
import { locales } from './dictionaries'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

// Generate metadata dynamically from Supabase
export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteMetadata = await getSiteMetadata();
    
    // Safely construct the base URL
    let baseUrl: URL;
    try {
      const rawUrl = siteMetadata.url || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const urlString = rawUrl.trim();
      baseUrl = new URL(urlString.startsWith('http') ? urlString : `https://${urlString}`);
    } catch (e) {
      baseUrl = new URL('http://localhost:3000');
    }
    
    // Ensure OG URL is absolute
    const safeOgUrl = siteMetadata.url?.trim() || baseUrl.toString();
    const finalOgUrl = safeOgUrl.startsWith('http') ? safeOgUrl : `${baseUrl.origin}${safeOgUrl.startsWith('/') ? '' : '/'}${safeOgUrl}`;
    
    return {
      metadataBase: baseUrl,
      title: siteMetadata.title,
      description: siteMetadata.description,
      keywords: ['Full Stack Developer', 'AI Engineer', 'React', 'Next.js', 'TypeScript', 'Python', 'Machine Learning'],
      authors: [{ name: 'Habib Farooq' }],
      creator: 'Habib Farooq',
      publisher: 'Habib Farooq',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: finalOgUrl,
        title: siteMetadata.title,
        description: siteMetadata.description,
        siteName: 'Habib Farooq Portfolio',
        images: [
          {
            url: '/og-image.png',
            width: 1200,
            height: 630,
            alt: 'Habib Farooq Portfolio',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: siteMetadata.title,
        description: siteMetadata.description,
        images: ['/og-image.png'],
        creator: '@habibfarooq',
      },
    };
  } catch (error) {
    console.error('Error fetching site metadata:', error);
    
    return {
      metadataBase: new URL('http://localhost:3000'),
      title: 'Habib Farooq - Full Stack Developer & AI Engineer',
      description: 'Portfolio of Habib Farooq, a Full Stack Developer and AI Engineer specializing in modern web technologies, AI solutions, and scalable applications.',
      keywords: ['Full Stack Developer', 'AI Engineer', 'React', 'Next.js', 'TypeScript', 'Python', 'Machine Learning'],
      authors: [{ name: 'Habib Farooq' }],
      creator: 'Habib Farooq',
      publisher: 'Habib Farooq',
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://habibfarooq.com',
        title: 'Habib Farooq - Full Stack Developer & AI Engineer',
        description: 'Portfolio of Habib Farooq, a Full Stack Developer and AI Engineer',
        siteName: 'Habib Farooq Portfolio',
        images: [
          {
            url: '/og-image.png',
            width: 1200,
            height: 630,
            alt: 'Habib Farooq Portfolio',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Habib Farooq - Full Stack Developer & AI Engineer',
        description: 'Portfolio of Habib Farooq, a Full Stack Developer and AI Engineer',
        images: ['/og-image.png'],
        creator: '@habibfarooq',
      },
    };
  }
}

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const dynamic = 'force-dynamic'

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const isRtl = lang === 'ar-SA' || lang === 'ur-PK'
  
  return (
    <html lang={lang} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MuiProvider>
            <ThemeConfigProvider>
              <SmoothScrollProvider>
                <Suspense fallback={<LoadingFallback />}>
                  <AuthProvider>
                    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
                      {/* Global Parallax Background Decor */}
                      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#106A5A]/5 rounded-full blur-[100px] z-[-1] pointer-events-none" />
                      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FACC15]/5 rounded-full blur-[100px] z-[-1] pointer-events-none" />
                      
                      <main className="flex-1 relative z-10">{children}</main>
                    </div>
                  </AuthProvider>
                </Suspense>
              </SmoothScrollProvider>
            </ThemeConfigProvider>
          </MuiProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
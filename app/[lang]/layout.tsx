import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import '../globals.css'

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ThemeConfigProvider } from '@/components/providers/ThemeConfigProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { MuiProvider } from '@/components/providers/MuiProvider'
import { getSiteMetadata } from '@/lib/supabase/queries'
import { Suspense } from 'react'
import { Box, Skeleton } from '@mui/material'
import { locales } from './dictionaries'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

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
      const prodUrl = process.env.NEXT_PUBLIC_SITE_URL_PROD;
      baseUrl = new URL(prodUrl ? `https://${prodUrl}` : 'http://localhost:3000');
    }
    
    // Ensure OG URL is absolute
    const safeOgUrl = siteMetadata.url?.trim() || baseUrl.toString();
    const finalOgUrl = safeOgUrl.startsWith('http') ? safeOgUrl : `${baseUrl.origin}${safeOgUrl.startsWith('/') ? '' : '/'}${safeOgUrl}`;
    
    return {
      metadataBase: baseUrl,
      title: siteMetadata.title,
      description: siteMetadata.description,
      keywords: siteMetadata.keywords,
      authors: [{ name: 'Habib Farooq' }],
      creator: 'Habib Farooq',
      publisher: 'Habib Farooq',
      icons: {
        icon: '/favicon.svg',
        apple: '/favicon.svg',
        shortcut: '/favicon.svg',
      },
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
        siteName: 'Habib',
        images: [
          {
            url: '/og-image.png',
            width: 1200,
            height: 630,
            alt: 'Habib',
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
      alternates: {
        canonical: finalOgUrl,
        languages: {
          'en-CA': `${baseUrl.origin}/en-CA`,
          'ar-SA': `${baseUrl.origin}/ar-SA`,
          'fr-CA': `${baseUrl.origin}/fr-CA`,
          'tr-TR': `${baseUrl.origin}/tr-TR`,
          'ur-PK': `${baseUrl.origin}/ur-PK`,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching site metadata:', error);
    
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL_PROD ? `https://${process.env.NEXT_PUBLIC_SITE_URL_PROD}` : 'http://localhost:3000'),
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
        siteName: 'Habib',
        images: [
          {
            url: '/og-image.png',
            width: 1200,
            height: 630,
            alt: 'Habib',
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
      alternates: {
        canonical: 'https://habibfarooq.com',
        languages: {
          'en-CA': 'https://habibfarooq.com/en-CA',
          'ar-SA': 'https://habibfarooq.com/ar-SA',
          'fr-CA': 'https://habibfarooq.com/fr-CA',
          'tr-TR': 'https://habibfarooq.com/tr-TR',
          'ur-PK': 'https://habibfarooq.com/ur-PK',
        },
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



function LoadingFallback() {
  return (
    <Box className="min-h-screen flex flex-col items-center justify-center" sx={{ gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {[0, 1, 2].map((i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={14}
            height={14}
            animation="pulse"
            sx={{
              bgcolor: 'rgba(120, 120, 120, 0.2)',
              animationDelay: `${i * 150}ms`,
              borderRadius: '50%',
            }}
          />
        ))}
      </Box>
      <Skeleton
        variant="text"
        width={120}
        height={20}
        sx={{ bgcolor: 'rgba(120, 120, 120, 0.15)' }}
      />
    </Box>
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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
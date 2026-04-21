import type { Metadata } from "next";
import { Outfit, Vazirmatn } from "next/font/google";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { cookies } from "next/headers";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeConfigProvider } from "@/components/providers/ThemeConfigProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { MuiProvider } from "@/components/providers/MuiProvider";
import { ThemeCookieSync } from "@/components/providers/ThemeCookieSync";
import { LoadingFallback } from "@/components/providers/LoadingFallback";
import { getSiteMetadata } from "@/lib/supabase/queries";
import { Suspense } from "react";
import { locales } from "./dictionaries";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  preload: true,
  variable: "--font-outfit",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial"],
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  preload: true,
  variable: "--font-vazirmatn",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Generate metadata dynamically from Supabase
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  try {
    const { lang } = await params;
    const siteMetadata = await getSiteMetadata(lang);

    // Safely construct the base URL
    let baseUrl: URL;
    try {
      const rawUrl =
        siteMetadata.url ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "http://localhost:3000";
      const urlString = rawUrl.trim();
      baseUrl = new URL(
        urlString.startsWith("http") ? urlString : `https://${urlString}`,
      );
    } catch (e) {
      const prodUrl = process.env.NEXT_PUBLIC_SITE_URL_PROD;
      baseUrl = new URL(
        prodUrl ? `https://${prodUrl}` : "http://localhost:3000",
      );
    }

    // Ensure OG URL is absolute
    const safeOgUrl = siteMetadata.url?.trim() || baseUrl.toString();
    const finalOgUrl = safeOgUrl.startsWith("http")
      ? safeOgUrl
      : `${baseUrl.origin}${safeOgUrl.startsWith("/") ? "" : "/"}${safeOgUrl}`;

    return {
      metadataBase: baseUrl,
      title: siteMetadata.title,
      description: siteMetadata.description,
      keywords: siteMetadata.keywords,
      authors: [{ name: "Habib Farooq" }],
      creator: "Habib Farooq",
      publisher: "Habib Farooq",
      icons: {
        icon: [
          { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
          { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
          { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
        ],
        apple: [
          { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
        shortcut: ["/favicon-16x16.png", "/favicon-32x32.png"],
        other: [
          { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
          { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        type: "website",
        locale: "en_US",
        url: finalOgUrl,
        title: siteMetadata.title,
        description: siteMetadata.description,
        siteName: "Habib",
      },
      twitter: {
        card: "summary_large_image",
        site: "@habibfarooq",
        title: siteMetadata.title,
        description: siteMetadata.description,
        creator: "@habibfarooq",
      },
      manifest: "/manifest.json",
      alternates: {
        canonical: finalOgUrl,
        languages: {
          "en-CA": `${baseUrl.origin}/en-CA`,
          "ar-SA": `${baseUrl.origin}/ar-SA`,
          "fr-CA": `${baseUrl.origin}/fr-CA`,
          "tr-TR": `${baseUrl.origin}/tr-TR`,
          "ur-PK": `${baseUrl.origin}/ur-PK`,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching site metadata:", error);

    return {
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL_PROD
          ? `https://${process.env.NEXT_PUBLIC_SITE_URL_PROD}`
          : "http://localhost:3000",
      ),
      title: "Habib Farooq - Full Stack Developer & AI Engineer",
      description:
        "Portfolio of Habib Farooq, a Full Stack Developer and AI Engineer specializing in modern web technologies, AI solutions, and scalable applications.",
      keywords: [
        "Full Stack Developer",
        "AI Engineer",
        "React",
        "Next.js",
        "TypeScript",
        "Python",
        "Machine Learning",
      ],
      authors: [{ name: "Habib Farooq" }],
      creator: "Habib Farooq",
      publisher: "Habib Farooq",
      icons: {
        icon: [
          { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
          { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
          { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
        ],
        apple: [
          { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
        shortcut: ["/favicon-16x16.png", "/favicon-32x32.png"],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://habibfarooq.com",
        title: "Habib Farooq - Full Stack Developer & AI Engineer",
        description:
          "Portfolio of Habib Farooq, a Full Stack Developer and AI Engineer",
        siteName: "Habib",
        images: [
          {
            url: "/opengraph-image",
            width: 1200,
            height: 630,
            alt: "Habib",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@habibfarooq",
        title: "Habib Farooq - Full Stack Developer & AI Engineer",
        description:
          "Portfolio of Habib Farooq, a Full Stack Developer and AI Engineer",
        images: ["/opengraph-image"],
        creator: "@habibfarooq",
      },
      manifest: "/manifest.json",
      alternates: {
        canonical: "https://habibfarooq.com",
        languages: {
          "en-CA": "https://habibfarooq.com/en-CA",
          "ar-SA": "https://habibfarooq.com/ar-SA",
          "fr-CA": "https://habibfarooq.com/fr-CA",
          "tr-TR": "https://habibfarooq.com/tr-TR",
          "ur-PK": "https://habibfarooq.com/ur-PK",
        },
      },
    };
  }
}

// Viewport configuration
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isRtl = lang === "ar-SA" || lang === "ur-PK";
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value;
  const initialTheme: "light" | "dark" =
    cookieTheme === "dark" ? "dark" : "light";

  const fontClassName = isRtl ? vazirmatn.className : outfit.className;
  const fontVariable = isRtl ? vazirmatn.variable : outfit.variable;

  return (
    <html
      lang={lang}
      dir={isRtl ? "rtl" : "ltr"}
      className={initialTheme === "dark" ? "dark" : undefined}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content={initialTheme} />
      </head>
      <body
        suppressHydrationWarning
        className={`${fontClassName} ${fontVariable} antialiased`}
        style={
          {
            "--font-primary": isRtl
              ? "var(--font-vazirmatn)"
              : "var(--font-outfit)",
          } as React.CSSProperties
        }
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={initialTheme}
          enableSystem={false}
          storageKey="theme"
          // disableTransitionOnChange removed for smooth theme transitions
        >
          <ThemeCookieSync />
          <MuiProvider>
            <ThemeConfigProvider>
              <SmoothScrollProvider>
                <Suspense fallback={<LoadingFallback />}>
                  <AuthProvider>
                    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
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
  );
}

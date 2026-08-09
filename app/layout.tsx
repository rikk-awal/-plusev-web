import type { Metadata, Viewport } from "next";
import { Syne, Figtree, JetBrains_Mono, Instrument_Serif, Titillium_Web } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import Provider from "@/components/provider";
import { ClarityInit } from "@/components/clarity-init";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/lib/types";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
});

const titilliumWeb = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://plusev.in"),
  title: {
    default: "PlusEV | Institutional-Grade Quant Trading Technology",
    template: "%s | PlusEV",
  },
  description:
    "Making institutional-grade quantitative trading technology accessible and affordable. AI-powered trading infrastructure built specifically for Indian markets.",
  keywords: [
    "quantitative trading",
    "algo trading India",
    "backtesting platform",
    "quant trading software",
    "trading automation India",
    "prop trading technology",
    "AI trading signals",
    "risk management trading",
  ],
  authors: [{ name: "PlusEV AI Quant Trading Private Limited", url: "https://plusev.in" }],
  creator: "PlusEV",
  publisher: "PlusEV",
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
    siteName: "PlusEV",
    title: "PlusEV | Institutional-Grade Quant Trading Technology",
    description:
      "Making institutional-grade quantitative trading technology accessible and affordable for Indian markets.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "PlusEV" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlusEV | Institutional-Grade Quant Trading Technology",
    description: "AI-powered trading infrastructure built for Indian markets.",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#02263c",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://plusev.in/#organization",
  name: "PlusEV AI Quant Trading Private Limited",
  url: "https://plusev.in",
  email: "plusev.blr@gmail.com",
  description:
    "Making institutional-grade quantitative trading technology accessible and affordable. AI-powered trading infrastructure built for Indian markets.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: siteSettings } = await sanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${syne.variable} ${figtree.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} ${titilliumWeb.variable} antialiased`}>
        <ClarityInit />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SanityLive />
        <Provider siteSettings={siteSettings}>{children}</Provider>
        {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      </body>
    </html>
  );
}

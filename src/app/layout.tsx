import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import AppProviders from "@/components/AppProviders";
import GoogleTagManager, { GoogleTagManagerNoscript } from '@/components/GoogleTagManager';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { SEO } from '@/constants/theme';
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO.siteUrl),
  title: SEO.defaultTitle,
  description: SEO.defaultDescription,
  keywords: SEO.keywords,
  authors: [{ name: SEO.siteName }],
  creator: SEO.siteName,
  publisher: SEO.siteName,
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
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
  openGraph: {
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    url: SEO.siteUrl,
    type: "website",
    locale: "ar_SA",
    siteName: SEO.siteName,
    images: [
      {
        url: SEO.ogImagePath,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: SEO.defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [SEO.ogImagePath],
  },
  alternates: {
    canonical: SEO.siteUrl,
  },
  category: 'Transportation',
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO.siteName,
    url: SEO.siteUrl,
    logo: `${SEO.siteUrl}${SEO.logoPath}`,
    description: SEO.defaultDescription,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SEO.contact.phone,
        contactType: "customer service",
        availableLanguage: ["Arabic", "English"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressLocality: SEO.contact.address,
    },
    sameAs: [
      SEO.social.twitter ? `https://twitter.com/${SEO.social.twitter}` : null,
      SEO.social.facebook ? `https://facebook.com/${SEO.social.facebook}` : null,
      SEO.social.instagram ? `https://instagram.com/${SEO.social.instagram}` : null,
    ].filter(Boolean),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO.siteName,
    url: SEO.siteUrl,
    inLanguage: ["ar", "en"],
  };

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="emotion-insertion-point" content="" />
        <meta name="google-site-verification" content="SJCwkBWfbHB2rVkhSR9h1CxZg8mxVt0yCyKxXkJ1ExU" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#52A4C1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Event Force" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${outfit.className}`} suppressHydrationWarning={true}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          suppressHydrationWarning
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          suppressHydrationWarning
        />
        <GoogleTagManagerNoscript />
        <GoogleTagManager />
        <AppProviders>{children}</AppProviders>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

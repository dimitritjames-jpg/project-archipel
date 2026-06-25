import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { env } from "@/lib/env";
import { serializeJsonLd } from "@/lib/utils";
import { RouteChrome } from "@/components/layout/route-chrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = env.NEXT_PUBLIC_SITE_URL;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "VibeVI",
  alternateName: "Find Your Island Vibe",
  description:
    "Beach mornings, boat days, local plates, waterfront nights, ferry checks, cruise-day moves, and island businesses across the U.S. Virgin Islands.",
  inLanguage: "en-US",
  publisher: { "@id": `${siteUrl}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "VibeVI",
  slogan: "Find Your Island Vibe",
  url: siteUrl,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VibeVI - Find Your Island Vibe",
    template: "%s | VibeVI",
  },
  description:
    "Find beaches, boats, bites, nightlife, ferry checks, cruise-day moves, and local businesses across St. Thomas, St. Croix, St. John, and Water Island.",
  keywords: [
    "US Virgin Islands",
    "St. Thomas things to do",
    "St. John ferry schedule",
    "St. Croix restaurants",
    "USVI beaches",
    "USVI charters",
  ],
  applicationName: "VibeVI",
  authors: [{ name: "VibeVI" }],
  creator: "VibeVI",
  publisher: "VibeVI",
  icons: {
    icon: [{ url: "/vibevi-icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/vibevi-icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "VibeVI",
    title: "VibeVI - Find Your Island Vibe",
    description:
      "Beach mornings, boat days, local plates, ferry checks, cruise-day moves, and waterfront nights across the U.S. Virgin Islands.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "VibeVI - Find Your Island Vibe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeVI - Find Your Island Vibe",
    description:
      "Beaches, boats, bites, ferry checks, cruise-day moves, and local businesses across the U.S. Virgin Islands.",
    images: [
      {
        url: "/twitter-image",
        alt: "VibeVI - Find Your Island Vibe",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd([websiteJsonLd, organizationJsonLd]),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <RouteChrome>{children}</RouteChrome>
      </body>
    </html>
  );
}

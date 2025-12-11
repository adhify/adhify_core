import '@/styles/globals.css';

import { GeistSans } from 'geist/font/sans';

import { TRPCReactProvider } from '@/trpc/react';
import { Toaster } from 'sonner';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Adhify – Deploy Apps & Databases Seamlessly | Nepal's First Developer PaaS",
  description:
    'Adhify is a modern platform for developers and teams to deploy apps, APIs, and databases with ease. Built on Coolify, powered by Next.js & Supabase, offering a Vercel-like deployment experience with affordable pricing for Nepal.',
  keywords: [
    'Adhify',
    'PaaS Nepal',
    'Coolify Nepal',
    'Deploy apps Nepal',
    'Supabase hosting Nepal',
    'Next.js hosting Nepal',
    'Vercel alternative Nepal',
    'DevOps Nepal',
    'App deployment platform',
    'Affordable cloud Nepal',
    'coolify based platform',
    'student hosting platform',
  ],
  metadataBase: new URL('https://adhify.com'),
  alternates: {
    canonical: 'https://adhify.com',
  },
  openGraph: {
    title: 'Adhify – Deploy Apps & Databases Seamlessly',
    description:
      'A modern, Vercel-like deployment platform built for developers, startups, and students in Nepal. Deploy apps & databases easily with Coolify, Next.js, Docker, and Supabase.',
    url: 'https://adhify.com',
    siteName: 'Adhify',
    images: [
      {
        url: '/adhify_logo.png',
        width: 1200,
        height: 630,
        alt: 'Adhify Platform Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adhify – Deploy Apps & Databases Seamlessly',
    description:
      'Modern cloud deployment platform for developers & students in Nepal. Deploy apps, APIs, and databases with ease.',
    images: ['/adhify_logo.png'],
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
  category: 'technology',
  icons: [{ rel: 'icon', url: '/adhify_logo.png' }],
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Adhify',
              url: 'https://adhify.com',
              logo: 'https://adhify.com/adhify_logo.png',
              description: 'Adhify is a modern deployment platform for developers, startups, and students in Nepal.',
            }),
          }}
        />
      </head>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster richColors />
        <footer className="bg-gray-900 px-4 py-4 text-center text-gray-400 w-full fixed bottom-0 left-0">
          <p>&copy; {new Date().getFullYear()} Adhify Devworks. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}

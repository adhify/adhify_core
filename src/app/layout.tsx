import '@/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import Link from 'next/link';
import { Globe, Mail, Linkedin } from 'lucide-react';

import { TRPCReactProvider } from '@/trpc/react';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Adhify',
  description: 'Deploy your applications with zero configuration',
  keywords: ['Next.js', 'Supabase', 'Deployment', 'Zero Configuration'],
  icons: [{ rel: 'icon', url: '/adhify_logo.png' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
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

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SiteFooter from '@/components/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import { ClerkProvider } from '@clerk/nextjs';

import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Concept Explorer',
  description: 'Sophisticated Learning, Simplified',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <SiteHeader />
          {children}
          <Toaster />
          <SiteFooter />
        </body>
      </html>
    </ClerkProvider>
  );
}

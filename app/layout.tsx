import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import './globals.css';
import Providers from './providers';
import SiteShell from '@/components/layout/SiteShell';

export const metadata: Metadata = {
  title: {
    default: 'Darul Safar | Premium Travel & Pilgrimage for Ethiopian Travelers',
    template: '%s | Darul Safar'
  },
  description:
    'Darul Safar helps Ethiopian travelers with premium pilgrimage planning, global ticketing, visa services, and modern travel tools with a refined digital experience.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Suspense fallback={<div className="min-h-screen bg-[#F5F5F7]" />}>
            <SiteShell>{children}</SiteShell>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}

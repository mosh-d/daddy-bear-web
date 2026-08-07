import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { colors } from '@/design-system/tokens';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://daddybear.ng';
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Daddy Bear — A film about fathers who show up',
    template: '%s — Daddy Bear',
  },
  description:
    'Daddy Bear is a film, a brand and a mission: celebrating fathers who show up. Follow the production and join the list.',
  openGraph: {
    title: 'Daddy Bear — A film about fathers who show up',
    description:
      'Daddy Bear is a film, a brand and a mission: celebrating fathers who show up. Follow the production and join the list.',
    url: SITE_URL,
    siteName: 'Daddy Bear',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daddy Bear — A film about fathers who show up',
    description:
      'Daddy Bear is a film, a brand and a mission: celebrating fathers who show up.',
  },
};

export const viewport = {
  themeColor: colors.navy900,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-cream-50 font-body text-ink antialiased">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        {PLAUSIBLE_DOMAIN ? (
          <Script
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}

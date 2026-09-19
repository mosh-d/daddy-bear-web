import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { colors } from '@/design-system/tokens';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Analytics } from '@/components/Analytics';
import { SITE_URL } from '@/lib/site';

// The display face is only ever set upright at 600 (headings) or italic at
// 400 (the one supporting line under a hero title), so each loads as a
// single static weight rather than a full variable font. Only the upright
// face is preloaded; browsers fetch the italic only on pages that use it.
// See design-system/02-typography.md.
const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  weight: '600',
  style: 'normal',
});

const frauncesItalic = Fraunces({
  variable: '--font-display-italic',
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  preload: false,
});

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
});

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
    <html lang="en" className={`${fraunces.variable} ${frauncesItalic.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-cream-50 font-body text-ink antialiased">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

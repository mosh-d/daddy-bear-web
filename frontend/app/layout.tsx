import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { colors } from '@/design-system/tokens';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Analytics } from '@/components/Analytics';
import { SHARE_IMAGE_ALT, SITE_URL } from '@/lib/site';

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
    'A Nigerian family drama set in Abuja. Follow the production, find a screening, and join the list.',
  openGraph: {
    title: 'Daddy Bear — A film about fathers who show up',
    description:
      'A Nigerian family drama set in Abuja. Follow the production, find a screening, and join the list.',
    url: SITE_URL,
    siteName: 'Daddy Bear',
    type: 'website',
    // The picture shown when a link is shared, on WhatsApp above all.
    // Replace public/og.png with Cardinal's key art when it arrives.
    images: [{ url: '/og.png', width: 1200, height: 630, alt: SHARE_IMAGE_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daddy Bear — A film about fathers who show up',
    description:
      'A Nigerian family drama set in Abuja. Follow the production, find a screening, and join the list.',
    images: ['/og.png'],
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

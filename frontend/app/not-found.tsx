import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';

export const metadata: Metadata = { title: 'Page not found' };

// Exported as out/404.html, which Cloudflare Pages serves for any unknown path.
export default function NotFound() {
  return (
    <Section tone="ember" eyebrow="Page not found" image={{ src: '/heroes/not-found.webp', position: 'center 30%' }}>
      <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
        This page didn&apos;t show up.
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90">
        The link may be old, or the page may have moved. Everything else is still here.
      </p>
      <div className="mt-8">
        <Button href="/" tone="onDark" showArrow>
          Back to the home page
        </Button>
      </div>
    </Section>
  );
}

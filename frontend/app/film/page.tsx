import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { PRINCIPAL_PHOTOGRAPHY_START_LABEL } from '@/lib/production-dates';

export const metadata: Metadata = {
  title: 'The Film',
  description:
    'Daddy Bear — trailer, synopsis and cast, updated as they become available through post-production.',
};

export default function FilmPage() {
  return (
    <>
      <Section tone="navy" eyebrow="The Film">
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          A story about fathers who show up.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90">
          Principal photography begins {PRINCIPAL_PHOTOGRAPHY_START_LABEL}. The trailer, full
          synopsis and cast will land here as post-production delivers them — the Journal is the
          fastest way to watch that happen in real time.
        </p>
        <div className="mt-8">
          <Button href="/journal" tone="onNavy" showArrow>
            Follow production updates
          </Button>
        </div>
      </Section>

      <Section tone="cream" eyebrow="Synopsis">
        <Card className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Coming soon
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink/80">
            The full synopsis is being finalized alongside the production. Check back here, or join
            the list on the home page to hear the moment it&apos;s ready.
          </p>
        </Card>
      </Section>

      <Section tone="cream-alt" eyebrow="Cast">
        <Card className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Announced closer to release
          </p>
          <p className="mt-2 text-base leading-relaxed text-ink/80">
            We&apos;ll introduce the cast here as the world of the film comes together. Follow the
            Journal for behind-the-scenes updates in the meantime.
          </p>
        </Card>
      </Section>
    </>
  );
}

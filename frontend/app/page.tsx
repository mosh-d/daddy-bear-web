import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Countdown } from '@/components/Countdown';
import { NewsletterForm } from '@/components/NewsletterForm';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { JournalCard } from '@/components/JournalCard';
import { getJournalEntries } from '@/lib/journal';
import {
  PRINCIPAL_PHOTOGRAPHY_START_ISO,
  PRINCIPAL_PHOTOGRAPHY_START_LABEL,
} from '@/lib/production-dates';

const PILLARS = [
  {
    title: 'The film',
    body: 'A story about fathers who show up — in production now, in cinemas soon. The trailer and cast land on The Film page as post-production delivers them.',
  },
  {
    title: 'The mission',
    body: 'Three women, a grant, and a mission to celebrate the fathers who don’t make headlines. Read the full story on About & Mission.',
  },
  {
    title: 'The community',
    body: 'Screenings, gifts and a growing list of people who believe fathers who show up deserve to be celebrated. Join before the doors open.',
  },
];

export default async function HomePage() {
  const entries = (await getJournalEntries()).slice(0, 3);

  return (
    <>
      <Section tone="navy" eyebrow="Cardinal Productions presents">
        <h1 className="max-w-3xl font-display text-4xl font-semibold sm:text-5xl md:text-6xl">
          Daddy Bear
        </h1>
        <p className="mt-4 max-w-2xl font-display text-xl italic text-cream-100 sm:text-2xl">
          A film about fathers who show up.
        </p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90">
          Daddy Bear is a film, a brand and a mission. Principal photography begins{' '}
          {PRINCIPAL_PHOTOGRAPHY_START_LABEL} — join the list now and follow every step of the
          production, from the first day on set to opening night.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="#join" tone="onNavy" showArrow>
            Join the journey
          </Button>
          <Button href="/journal" variant="secondary" tone="onNavy">
            Follow the shoot
          </Button>
        </div>
      </Section>

      <Section tone="cream" eyebrow="Countdown to production" className="py-12 sm:py-16">
        <div className="mx-auto max-w-md sm:mx-0">
          <Countdown
            target={PRINCIPAL_PHOTOGRAPHY_START_ISO}
            arrivedMessage="Cameras are rolling. Follow it all in the Journal."
          />
          <p className="mt-4 text-center text-sm text-ink/70 sm:text-left">
            Principal photography begins {PRINCIPAL_PHOTOGRAPHY_START_LABEL}.
          </p>
        </div>
      </Section>

      <Section tone="cream-alt" eyebrow="What Daddy Bear is">
        <h2 className="max-w-2xl font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
          One film. One mission. One growing community.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Card key={pillar.title}>
              <h3 className="font-display text-lg font-semibold text-navy-900">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{pillar.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {entries.length > 0 ? (
        <Section tone="cream" eyebrow="From the set">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
              Follow the shoot
            </h2>
            <Button href="/journal" variant="ghost">
              All journal entries
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <JournalCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section id="join" tone="navy" eyebrow="Join the journey">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Be first to know.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-100/90">
              The newsletter and our WhatsApp channel are how we share screenings, gifts and news
              from the shoot first — before social media. It&apos;s also the only list Cardinal
              Productions owns outright, so it&apos;s never going away.
            </p>
            <div className="mt-6">
              <WhatsAppCTA tone="onNavy" />
            </div>
          </div>
          <NewsletterForm tone="onNavy" />
        </div>
      </Section>
    </>
  );
}

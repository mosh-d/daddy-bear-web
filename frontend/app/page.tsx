import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { NewsletterForm } from '@/components/NewsletterForm';
import { NextScreening } from '@/components/NextScreening';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { JournalCard } from '@/components/JournalCard';
import { homeCta, homeHero } from '@/content/home';
import { todayInLagos } from '@/lib/dates';
import { getJournalPosts } from '@/lib/journal';
import { screenings } from '@/lib/screenings';

const PILLARS = [
  {
    title: 'The film',
    body: 'A story about fathers who show up. The trailer, synopsis and cast land on The Film page as post-production delivers them.',
  },
  {
    title: 'The mission',
    body: 'Three women, a grant, and a mission to celebrate the fathers who don’t make headlines. Read the full story on About & Mission.',
  },
  {
    title: 'The community',
    body: 'Screenings in cinemas, mosques, schools and community centres, and a growing list of people who believe fathers who show up deserve to be celebrated.',
  },
];

export default function HomePage() {
  const posts = getJournalPosts().slice(0, 3);
  const upcoming = screenings.filter((s) => s.status === 'upcoming');

  return (
    <>
      <Section tone="navy" eyebrow={homeHero.eyebrow}>
        <h1 className="max-w-3xl font-display text-4xl font-semibold sm:text-5xl md:text-6xl">{homeHero.title}</h1>
        <p className="mt-4 max-w-2xl font-display-italic text-xl italic text-cream-100 sm:text-2xl">{homeHero.tagline}</p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90">{homeHero.paragraph}</p>
        <div className="mt-8">
          <Button href={homeCta.href} external={homeCta.external} tone="onNavy" showArrow>
            {homeCta.label}
          </Button>
        </div>
      </Section>

      <Section tone="cream" eyebrow="What Daddy Bear is">
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

      <Section tone="cream-alt" eyebrow="Next screening">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">Watch it together.</h2>
          <Button href="/screenings" variant="ghost">
            All screenings
          </Button>
        </div>
        <NextScreening screenings={upcoming} buildDay={todayInLagos()} />
      </Section>

      {posts.length > 0 ? (
        <Section tone="cream" eyebrow="From the set">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">Follow the story</h2>
            <Button href="/journal" variant="ghost">
              All journal entries
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section id="join" tone="navy" eyebrow="Join the journey" className="scroll-mt-16">
        <div className="grid gap-10 sm:grid-cols-2 sm:items-start">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Be first to know.</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-100/90">
              The newsletter and our WhatsApp channel are how we share screenings, gifts and news from
              the production first, before social media. It&apos;s also the only list Cardinal
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

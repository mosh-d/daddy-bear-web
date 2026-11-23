import Image from 'next/image';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { NextScreening } from '@/components/NextScreening';
import { JournalCard } from '@/components/JournalCard';
import { homeCta, homeHero } from '@/content/home';
import { todayInLagos } from '@/lib/dates';
import { getJournalPosts } from '@/lib/journal';
import { screenings } from '@/lib/screenings';

const PILLARS = [
  {
    title: 'The film',
    body: 'A widowed father learning to raise his two daughters through grief, work and everyday family life. Meet the cast on The Film page.',
  },
  {
    title: 'The mission',
    body: 'Love is shown not only through provision, but through presence, care and asking for help. Read the full story on About & Mission.',
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
      <Section tone="ember" eyebrow={homeHero.eyebrow} eyebrowIcon="clapper" image={{ src: '/heroes/home.webp', position: 'center 35%' }}>
        <h1 className="max-w-3xl">
          {/* The wordmark is the title: gold on Ember, an approved pairing. */}
          <Image
            src="/brand/wordmark-gold.png"
            alt={homeHero.title}
            width={1024}
            height={128}
            preload
            className="h-auto w-full max-w-[18rem] sm:max-w-md md:max-w-lg"
          />
        </h1>
        <p className="mt-4 max-w-2xl font-display-italic text-xl italic text-cream-100 sm:text-2xl">{homeHero.tagline}</p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90">{homeHero.paragraph}</p>
        <div className="mt-8">
          <Button href={homeCta.href} external={homeCta.external} tone="onDark" showArrow>
            {homeCta.label}
          </Button>
        </div>
      </Section>

      <Section tone="cream" eyebrow="What Daddy Bear is">
        <h2 className="max-w-2xl font-display text-2xl font-semibold text-ink sm:text-3xl">
          One film. One mission. One growing community.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Card key={pillar.title}>
              <h3 className="font-display text-lg font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{pillar.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="cream-alt" eyebrow="Next screening" eyebrowIcon="ticket">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Watch it together.</h2>
          <Button href="/screenings" variant="ghost">
            All screenings
          </Button>
        </div>
        <NextScreening screenings={upcoming} buildDay={todayInLagos()} />
      </Section>

      {posts.length > 0 ? (
        <Section tone="cream" eyebrow="From the set" eyebrowIcon="camera">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Follow the story</h2>
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

    </>
  );
}

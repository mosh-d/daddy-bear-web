import type { Metadata } from 'next';
import Image from 'next/image';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Figure } from '@/components/Figure';
import { VideoEmbed } from '@/components/VideoEmbed';
import { film } from '@/content/film';
import { formatDate } from '@/lib/dates';

export const metadata: Metadata = {
  title: 'The Film',
  description: 'Daddy Bear: the synopsis, cast and credits of a Nigerian family drama about a widowed father raising his two daughters.',
};

function ComingSoon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Card className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">{label}</p>
      <p className="mt-2 text-base leading-relaxed text-ink/80">{children}</p>
    </Card>
  );
}

export default function FilmPage() {
  const { world } = film;
  const hasWorld = world.paragraphs.length > 0 || world.images.length > 0;
  const castPhotos = film.cast.some((member) => member.photo);
  const billing = [
    ...(film.cast.length > 0
      ? [{ role: 'Starring', names: film.cast.map((member) => `${member.name} as ${member.role}`) }]
      : []),
    ...film.credits,
  ];

  return (
    <>
      <Section tone="navy" eyebrow="The Film" image={{ src: '/heroes/film.webp', position: 'center 30%' }}>
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">{film.logline}</h1>
        {film.releaseDate ? (
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            <time dateTime={film.releaseDate}>{formatDate(film.releaseDate)}</time>
          </p>
        ) : null}
        <p className="mt-4 max-w-xl text-base leading-relaxed text-cream-100/90">{film.intro}</p>
        <div className="mt-8">
          <Button href="/screenings" tone="onNavy" showArrow>
            Find a screening
          </Button>
        </div>
      </Section>

      <Section tone="cream" eyebrow="Trailer">
        <div className="max-w-3xl">
          {film.trailerUrl ? (
            <VideoEmbed url={film.trailerUrl} title="Daddy Bear: official trailer" />
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-card bg-navy-900 px-6 text-center">
              <p className="text-sm text-cream-100/80">
                The trailer lands here first. Join the list to be told the moment it&apos;s out.
              </p>
            </div>
          )}
        </div>
      </Section>

      <Section tone="cream-alt" eyebrow="Synopsis">
        {film.synopsis.length > 0 ? (
          <div className="max-w-prose space-y-4 text-base leading-relaxed text-ink/90">
            {film.synopsis.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <ComingSoon label="Coming soon">
            The full synopsis is being finalised alongside post-production. Check back here, or join the
            list to hear the moment it&apos;s ready.
          </ComingSoon>
        )}
      </Section>

      <Section tone="cream" eyebrow="Cast & credits">
        {castPhotos ? (
          <div className="mb-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {film.cast.map((member) => (
              <div key={member.name}>
                <div className="relative aspect-4/5 overflow-hidden rounded-card bg-navy-700">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <p className="mt-3 font-display text-lg font-semibold text-navy-900">{member.name}</p>
                <p className="text-sm text-ink/70">{member.role}</p>
              </div>
            ))}
          </div>
        ) : null}
        {billing.length > 0 ? (
          // The billing block, laid out like the credits on a poster: role on
          // the left, names on the right, stacked on a phone.
          <dl className="max-w-2xl divide-y divide-cream-200 border-y border-cream-200">
            {billing.map((line) => (
              <div key={line.role} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{line.role}</dt>
                <dd>
                  <ul className="space-y-1 text-base text-navy-900">
                    {line.names.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <ComingSoon label="Announced closer to release">
            We&apos;ll introduce the cast here as the world of the film comes together. Follow the Journal
            for behind-the-scenes updates in the meantime.
          </ComingSoon>
        )}
      </Section>

      {hasWorld ? (
        <Section tone="cream-alt" eyebrow="The world of the film">
          <div className="max-w-prose space-y-4 text-base leading-relaxed text-ink/90">
            {world.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          {world.images.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {world.images.map((image) => (
                <Figure key={image.src} {...image} />
              ))}
            </div>
          ) : null}
        </Section>
      ) : null}
    </>
  );
}

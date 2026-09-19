import type { Metadata } from 'next';
import Image from 'next/image';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Figure } from '@/components/Figure';
import { VideoEmbed } from '@/components/VideoEmbed';
import { film } from '@/content/film';

export const metadata: Metadata = {
  title: 'The Film',
  description: 'Daddy Bear: trailer, synopsis, cast and the world of the film.',
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

  return (
    <>
      <Section tone="navy" eyebrow="The Film">
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">{film.logline}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90">{film.intro}</p>
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

      <Section tone="cream" eyebrow="Cast">
        {film.cast.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
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
        ) : (
          <ComingSoon label="Announced closer to release">
            We&apos;ll introduce the cast here as the world of the film comes together. Follow the Journal
            for behind-the-scenes updates in the meantime.
          </ComingSoon>
        )}
        {film.credits.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-3">
            {film.credits.map((credit) => (
              <Badge key={`${credit.role}-${credit.name}`}>
                {credit.role} — {credit.name}
              </Badge>
            ))}
          </div>
        ) : null}
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

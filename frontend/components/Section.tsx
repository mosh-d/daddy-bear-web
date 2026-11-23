import type { ReactNode } from 'react';
import Image from 'next/image';
import { Container } from './Container';
import { FilmStrip } from './FilmStrip';
import { FILM_ICONS, type FilmIconName } from './Icons';

/**
 * A photo behind an ember hero. It's blended into the brand red (luminosity
 * blend: the photo's light and shade, the brand's colour) and faded under a
 * gradient that stays solid muted ember (ember-950) behind the text, so cream
 * text keeps over 12:1 contrast and Sun Gold labels over 8:1. On a phone the
 * photo sits behind the whole hero, heavily dimmed; from desktop up it fills
 * the right side over a softer red (ember-700), warming slightly away from
 * the text.
 * Decorative (alt=""): the hero's text carries the meaning.
 */
export type HeroImage = {
  /** Path under public/, e.g. /heroes/film.webp. Ship it grayscale, 1400px wide (see CONTENT.md). */
  src: string;
  /** CSS object-position, to keep the subject in frame. Default 'center'. */
  position?: string;
};

function HeroBackdrop({ image }: { image: HeroImage }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%] lg:bg-ember-700">
        <Image
          src={image.src}
          alt=""
          fill
          // Decorative, so it loads at low priority: the text, fonts and
          // styles come first and the hero is readable on solid ember until
          // the photo arrives. Not preloaded, so it isn't in the page-weight
          // budget; keep each file under ~60KB instead (CONTENT.md).
          loading="eager"
          fetchPriority="low"
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover opacity-60 mix-blend-luminosity"
          style={{ objectPosition: image.position ?? 'center' }}
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-ember-950 via-ember-950/85 to-ember-950/65 lg:bg-linear-to-r lg:from-ember-950 lg:from-38% lg:via-ember-950/70 lg:via-60% lg:to-ember-950/20" />
      <div className="film-grain absolute inset-0" />
    </div>
  );
}

const TONE_CLASSES = {
  ember: 'bg-ember-950 text-cream-50',
  cream: 'bg-cream-50 text-ink',
  'cream-alt': 'bg-cream-100 text-ink',
} as const;

type Tone = keyof typeof TONE_CLASSES;

const EYEBROW_TONE_CLASSES: Record<Tone, string> = {
  ember: 'text-gold-400',
  cream: 'text-ember-800',
  'cream-alt': 'text-ember-800',
};

export function Section({
  id,
  tone = 'cream',
  eyebrow,
  eyebrowIcon,
  className = '',
  containerClassName = '',
  image,
  children,
}: {
  id?: string;
  tone?: Tone;
  eyebrow?: string;
  /** A small film motif before the eyebrow label: clapper (making the film),
   *  reel (the film itself), camera (on set), ticket (screenings). */
  eyebrowIcon?: FilmIconName;
  className?: string;
  containerClassName?: string;
  /** Background photo for an ember hero. */
  image?: HeroImage;
  children: ReactNode;
}) {
  const Icon = eyebrowIcon ? FILM_ICONS[eyebrowIcon] : null;
  return (
    // `reveal` / `reveal-late` are the entrance motion (app/globals.css): the
    // label arrives just before the content it introduces. The first section
    // of a page animates on load, the rest as they scroll into view.
    <section
      id={id}
      className={`${TONE_CLASSES[tone]} ${tone === 'ember' ? 'relative isolate overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-36' : 'py-16 sm:py-24'} ${className}`}
    >
      {image ? <HeroBackdrop image={image} /> : null}
      <Container className={containerClassName}>
        {eyebrow ? (
          <p
            className={`reveal mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm ${EYEBROW_TONE_CLASSES[tone]}`}
          >
            {Icon ? <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" /> : null}
            {eyebrow}
          </p>
        ) : null}
        <div className="reveal reveal-late">{children}</div>
      </Container>
      {/* Every ember hero ends on a strip of film. */}
      {tone === 'ember' ? <FilmStrip tone="ember" className="absolute inset-x-0 bottom-0" /> : null}
    </section>
  );
}

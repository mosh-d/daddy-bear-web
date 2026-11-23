import fs from 'node:fs';
import path from 'node:path';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { Container } from './Container';
import { FilmStrip } from './FilmStrip';
import { FILM_ICONS, type FilmIconName } from './Icons';

/**
 * A photo behind an ember hero. It's blended into the brand red (luminosity
 * blend: the photo's light and shade, the brand's colour) and faded under a
 * gradient that stays solid muted ember (ember-950) behind the text, so cream
 * text keeps over 12:1 contrast and Sun Gold labels over 8:1.
 *
 * On phones the hero fills the screen (less the header, with a sensible
 * minimum) and stacks: the text at the top on solid ember that fades softly
 * down into the photo (`.hero-copy` in app/globals.css), however long the
 * text runs, and a portrait crop of the photo below it. From md up
 * (tablets, landscape phones, desktop) it splits sideways: text on the
 * left, the photo filling the right side over a softer red (ember-700).
 * Decorative (alt=""): the hero's text carries the meaning.
 */
export type HeroImage = {
  /** Path under public/, e.g. /heroes/film.webp. Ship it grayscale, 1400px wide (see CONTENT.md). */
  src: string;
  /** CSS object-position for the side-by-side layout, to keep the subject in frame. Default 'center'. */
  position?: string;
};

/**
 * The phone version of a hero photo: a portrait crop with the subject in the
 * lower part of the frame, below the text. Found by convention, the same
 * file name in /heroes/mobile/ (checked at build time); without one, phones
 * get the main photo.
 */
function mobileSource(src: string) {
  const mobile = src.replace(/\/([^/]+)$/, '/mobile/$1');
  return fs.existsSync(path.join(process.cwd(), 'public', mobile)) ? mobile : src;
}

function HeroBackdrop({ image }: { image: HeroImage }) {
  // Decorative, so both load at low priority: the text, fonts and styles
  // come first and the hero is readable on solid ember until the photo
  // arrives. Not preloaded, so they aren't in the page-weight budget; keep
  // each file under ~60KB instead (CONTENT.md). Lazy, so a phone never
  // downloads the wide photo and a laptop never the portrait one (browsers
  // skip lazy images that are hidden).
  const shared = { fill: true, loading: 'lazy', fetchPriority: 'low' } as const;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-y-0 right-0 w-full bg-ember-700 md:w-[62%]">
        <Image
          {...shared}
          alt=""
          src={mobileSource(image.src)}
          sizes="100vw"
          className="object-cover object-bottom opacity-60 mix-blend-luminosity md:hidden"
        />
        <Image
          {...shared}
          alt=""
          src={image.src}
          sizes="62vw"
          className="hidden object-cover opacity-60 mix-blend-luminosity md:block"
          style={{ objectPosition: image.position ?? 'center' }}
        />
      </div>
      {/* Stacked (phones): only a light veil here, since the text brings its
          own solid ground. Side by side: the sideways fade away from the
          text, held more solid on tablets, where the text column runs
          further across. */}
      <div className="absolute inset-0 bg-linear-to-b from-ember-950/10 via-ember-950/10 to-ember-950/50 md:bg-linear-to-r md:from-ember-950 md:from-50% md:via-ember-950/80 md:via-72% md:to-ember-950/25 lg:from-38% lg:via-ember-950/70 lg:via-60% lg:to-ember-950/20" />
      <div className="film-grain absolute inset-0" />
    </div>
  );
}

/* On phones (below md), a photo hero fills the screen under the sticky
   header (about 3.5rem), never shorter than 34rem, with its text at the top
   and the photo below. `svh` so it doesn't jump as the address bar slides
   away. From md up (tablets, landscape phones, desktop) it's side by side. */
// The extra bottom padding on phones keeps at least ~12rem of photo in view
// under even the longest hero text (on top of the film strip).
const HERO_LAYOUT = 'min-h-[max(34rem,calc(100svh-3.5rem))] pb-60! md:min-h-0 md:pb-36!';

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
      className={`${TONE_CLASSES[tone]} ${tone === 'ember' ? 'relative isolate overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-36' : 'py-16 sm:py-24'} ${image ? HERO_LAYOUT : ''} ${className}`}
    >
      {image ? <HeroBackdrop image={image} /> : null}
      <Container className={`${image ? 'hero-copy w-full' : ''} ${containerClassName}`}>
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

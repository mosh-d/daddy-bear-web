import type { ReactNode } from 'react';
import Image from 'next/image';
import { Container } from './Container';

/**
 * A photo behind a navy hero. It's blended into the navy (luminosity blend:
 * the photo's light and shade in the brand blue) and faded under a gradient
 * that stays solid navy behind the text, so cream text keeps strong contrast.
 * On a phone the photo sits behind the whole hero, more heavily dimmed; from
 * desktop up it fills the right side and fades out towards the text.
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
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
        <Image
          src={image.src}
          alt=""
          fill
          // Decorative, so it loads at low priority: the text, fonts and
          // styles come first and the hero is readable on solid navy until
          // the photo arrives. Not preloaded, so it isn't in the page-weight
          // budget; keep each file under ~60KB instead (CONTENT.md).
          loading="eager"
          fetchPriority="low"
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover opacity-60 mix-blend-luminosity"
          style={{ objectPosition: image.position ?? 'center' }}
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-navy-900/85 to-navy-900/55 lg:bg-linear-to-r lg:from-navy-900 lg:from-38% lg:via-navy-900/75 lg:via-60% lg:to-navy-900/15" />
    </div>
  );
}

const TONE_CLASSES = {
  navy: 'bg-navy-900 text-cream-50',
  cream: 'bg-cream-50 text-ink',
  'cream-alt': 'bg-cream-100 text-ink',
} as const;

type Tone = keyof typeof TONE_CLASSES;

const EYEBROW_TONE_CLASSES: Record<Tone, string> = {
  navy: 'text-gold-400',
  cream: 'text-gold-600',
  'cream-alt': 'text-gold-600',
};

export function Section({
  id,
  tone = 'cream',
  eyebrow,
  className = '',
  containerClassName = '',
  image,
  children,
}: {
  id?: string;
  tone?: Tone;
  eyebrow?: string;
  className?: string;
  containerClassName?: string;
  /** Background photo for a navy hero. */
  image?: HeroImage;
  children: ReactNode;
}) {
  return (
    // `reveal` / `reveal-late` are the entrance motion (app/globals.css): the
    // label arrives just before the content it introduces. The first section
    // of a page animates on load, the rest as they scroll into view.
    <section
      id={id}
      className={`${TONE_CLASSES[tone]} py-16 sm:py-24 ${image ? 'relative isolate overflow-hidden' : ''} ${className}`}
    >
      {image ? <HeroBackdrop image={image} /> : null}
      <Container className={containerClassName}>
        {eyebrow ? (
          <p
            className={`reveal mb-3 text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm ${EYEBROW_TONE_CLASSES[tone]}`}
          >
            {eyebrow}
          </p>
        ) : null}
        <div className="reveal reveal-late">{children}</div>
      </Container>
    </section>
  );
}

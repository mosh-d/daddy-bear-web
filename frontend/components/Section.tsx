import type { ReactNode } from 'react';
import { Container } from './Container';

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
  children,
}: {
  id?: string;
  tone?: Tone;
  eyebrow?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${TONE_CLASSES[tone]} py-16 sm:py-24 ${className}`}>
      <Container className={containerClassName}>
        {eyebrow ? (
          <p
            className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm ${EYEBROW_TONE_CLASSES[tone]}`}
          >
            {eyebrow}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

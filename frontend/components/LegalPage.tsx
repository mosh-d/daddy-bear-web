import { Section } from './Section';
import { CONTACT_EMAIL } from '@/content/links';
import { formatDate } from '@/lib/dates';
import type { LegalSection } from '@/content/legal';

/**
 * Shared layout for the Terms and Privacy pages. `{{EMAIL}}` in the text
 * becomes a mailto link, so the contact address is written once in
 * content/links.ts and can't drift between the two pages.
 */
function Paragraph({ text }: { text: string }) {
  const parts = text.split('{{EMAIL}}');
  return (
    <p className="mt-3">
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 ? (
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-navy-900 underline underline-offset-4 hover:text-gold-600"
            >
              {CONTACT_EMAIL}
            </a>
          ) : null}
        </span>
      ))}
    </p>
  );
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  updated,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  sections: LegalSection[];
  updated: string;
}) {
  return (
    <>
      <Section tone="navy" eyebrow={eyebrow}>
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">{title}</h1>
        {intro ? <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90">{intro}</p> : null}
        <p className="mt-6 text-sm text-cream-100/70">Last updated: {formatDate(updated)}</p>
      </Section>

      <Section tone="cream">
        <div className="max-w-prose text-base leading-relaxed text-ink/90">
          {sections.map((section) => (
            <section key={section.title} className="mt-10 first:mt-0">
              <h2 className="font-display text-xl font-semibold text-navy-900">{section.title}</h2>
              {section.body.map((paragraph) => (
                <Paragraph key={paragraph.slice(0, 32)} text={paragraph} />
              ))}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}

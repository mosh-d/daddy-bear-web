import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { TallyEmbed } from '@/components/TallyEmbed';
import { WhatsAppChat } from '@/components/WhatsAppLinks';
import { TALLY_EMBED_URL, TALLY_FORM_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Host a Screening',
  description:
    'Apply to host a Daddy Bear screening at your mosque, school or community centre.',
};

const CHAT_MESSAGE = 'Hello Daddy Bear team, I would like to host a screening.';

export default function HostScreeningPage() {
  return (
    <>
      <Section tone="navy" eyebrow="Host a screening">
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          Bring Daddy Bear to your community.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90">
          Some of the best screenings happen outside cinemas, in mosques, schools and community centres,
          among people who know each other. Tell us about your organisation and when you&apos;d like to
          screen, and we&apos;ll be in touch by email or WhatsApp.
        </p>
      </Section>

      <Section tone="cream">
        <div className="mx-auto max-w-2xl">
          {TALLY_EMBED_URL ? (
            <>
              <TallyEmbed src={TALLY_EMBED_URL} title="Host a Daddy Bear screening: application form" />
              <p className="mt-6 text-sm text-ink/70">
                Form not showing?{' '}
                <a
                  href={TALLY_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-navy-900 underline underline-offset-4 hover:text-gold-600"
                >
                  Open it in a new tab
                </a>
                .
              </p>
            </>
          ) : (
            <Card>
              <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
                Applications open soon
              </p>
              <p className="mt-2 text-base leading-relaxed text-ink/80">
                The application form is on its way. In the meantime, message us and we&apos;ll take your
                details directly.
              </p>
            </Card>
          )}
          <div className="mt-8">
            <WhatsAppChat message={CHAT_MESSAGE} label="Rather talk it through? Chat with us on WhatsApp" />
          </div>
        </div>
      </Section>
    </>
  );
}

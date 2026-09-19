import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { ScreeningsList } from '@/components/ScreeningsList';
import { WhatsAppChat } from '@/components/WhatsAppLinks';
import { todayInLagos } from '@/lib/dates';
import { screenings } from '@/lib/screenings';

export const metadata: Metadata = {
  title: 'Screenings & Tickets',
  description: 'Where and when to watch Daddy Bear. Find a screening near you and get tickets.',
};

export default function ScreeningsPage() {
  return (
    <>
      <Section tone="navy" eyebrow="Screenings & Tickets">
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">Watch it together.</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90">
          Daddy Bear is made to be watched in company: in cinemas, mosques, schools and community centres.
          Find a screening near you. Tickets are sold through Tix Africa, or at the door where noted.
        </p>
      </Section>

      <Section tone="cream">
        <ScreeningsList screenings={screenings} buildDay={todayInLagos()} />
      </Section>

      <Section tone="cream-alt" eyebrow="Host a screening">
        <h2 className="max-w-2xl font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
          Bring Daddy Bear to your community.
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/80">
          Mosques, schools and community centres can apply to host their own screening. It takes a few
          minutes.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <Button href="/screenings/host" showArrow>
            Apply to host
          </Button>
          <WhatsAppChat
            message="Hello Daddy Bear team, I have a question about a screening."
            label="Questions? Chat with us"
          />
        </div>
      </Section>
    </>
  );
}

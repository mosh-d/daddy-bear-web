import { Container } from './Container';
import { NewsletterForm } from './NewsletterForm';
import { WhatsAppCTA } from './WhatsAppCTA';

const CARDINAL_URL = process.env.NEXT_PUBLIC_CARDINAL_STUDIO_URL || 'https://cardinalstudio.ng';

export function Footer() {
  return (
    <footer className="bg-navy-950 py-16 text-cream-50 sm:py-20">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <p className="font-display text-xl font-semibold uppercase tracking-wide">Daddy Bear</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-100/80">
              A film, a brand and a mission: celebrating fathers who show up. Follow the production
              from the first day of the shoot.
            </p>
            <div className="mt-6">
              <WhatsAppCTA tone="onNavy" />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">
              Stay with the story
            </p>
            <div className="mt-4">
              <NewsletterForm tone="onNavy" />
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-navy-700 pt-6 text-xs text-cream-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Daddy Bear. A Cardinal Productions film.</p>
          <a href={CARDINAL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400">
            cardinalstudio.ng
          </a>
        </div>
      </Container>
    </footer>
  );
}

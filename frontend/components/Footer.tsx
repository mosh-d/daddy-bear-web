import Link from 'next/link';
import { Container } from './Container';
import { NewsletterForm } from './NewsletterForm';
import { WhatsAppCTA } from './WhatsAppCTA';
import { WhatsAppChat } from './WhatsAppLinks';
import { CARDINAL_STUDIO_URL } from '@/lib/site';

const LINKS = [
  { href: '/film', label: 'The Film' },
  { href: '/screenings', label: 'Screenings' },
  { href: '/screenings/host', label: 'Host a screening' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 py-16 text-cream-50 sm:py-20">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <p className="font-display text-xl font-semibold uppercase tracking-wide">Daddy Bear</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-100/80">
              A film, a brand and a mission: celebrating fathers who show up.
            </p>
            <div className="mt-6 flex flex-col items-start gap-4">
              <WhatsAppCTA tone="onNavy" />
              <WhatsAppChat
                tone="onNavy"
                message="Hello Daddy Bear team, I have a question."
                label="Questions? Chat with us"
              />
            </div>
            <nav aria-label="Footer" className="mt-5">
              {/* Padded rather than hit-area: the rows wrap, and enlarged areas would overlap. */}
              <ul className="flex flex-wrap gap-x-5 text-sm">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-block py-3 text-cream-100/80 hover:text-gold-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
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
          <a href={CARDINAL_STUDIO_URL} target="_blank" rel="noopener noreferrer" className="hit-area self-start py-1 hover:text-gold-400 sm:self-auto">
            cardinalstudio.ng
          </a>
        </div>
      </Container>
    </footer>
  );
}

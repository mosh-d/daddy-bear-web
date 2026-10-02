import Link from 'next/link';
import { Container } from './Container';
import { SocialLinks } from './SocialLinks';
import { WhatsAppCTA } from './WhatsAppCTA';
import { WhatsAppChat } from './WhatsAppLinks';
import { CONTACT_EMAIL, SUBSTACK_URL, SUPPORT_CREDIT } from '@/content/links';
import { CARDINAL_STUDIO_URL, withUtm } from '@/lib/site';

const LINKS = [
  { href: '/film', label: 'The Film' },
  { href: '/screenings', label: 'Screenings' },
  { href: '/screenings/host', label: 'Host a screening' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

const SUBSCRIBE_URL = withUtm(`${SUBSTACK_URL}/subscribe`, {
  source: 'daddybear.ng',
  medium: 'website',
  campaign: 'footer',
});

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
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <WhatsAppCTA tone="onNavy" />
            <WhatsAppChat
              tone="onNavy"
              message="Hello Daddy Bear team, I have a question."
              label="Questions? Chat with us"
            />
            {/* The newsletter needs to be reachable from every page, but Home
                already gives it a section of its own — so this is one line,
                not a second signup block. */}
            <p className="text-sm text-cream-100/80">
              Screenings, gifts and news by email:{' '}
              <a
                href={SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hit-area underline-grow font-semibold text-cream-50 hover:text-gold-400"
              >
                subscribe on Substack
              </a>
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hit-area underline-grow text-sm font-semibold text-cream-100/80 hover:text-gold-400"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="mt-10">
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

        <div className="mt-6 border-t border-navy-700 pt-6 text-xs text-cream-100/60">
          {/* Funder credit, in the exact wording Cardinal's pack requires. */}
          <p className="text-cream-100/80">{SUPPORT_CREDIT}</p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} Daddy Bear. A Cardinal Productions film.</p>
            <a
              href={CARDINAL_STUDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hit-area self-start py-1 hover:text-gold-400 sm:self-auto"
            >
              cardinalstudio.ng
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

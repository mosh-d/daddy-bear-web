import Link from 'next/link';
import { Container } from './Container';

const LINKS = [
  { href: '/film', label: 'The Film' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-700/60 bg-navy-900/95 py-3 backdrop-blur">
      <Container className="flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-semibold uppercase tracking-wide text-cream-50"
        >
          Daddy Bear
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wide text-cream-100 transition-colors hover:text-gold-400 sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}

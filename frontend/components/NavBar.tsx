import Link from 'next/link';
import { Container } from './Container';
import { MobileMenu } from './MobileMenu';
import { NavLinks } from './NavLinks';

/**
 * Sticky header: wordmark, then the section links inline from `md` up, or
 * a burger menu below that. The header is the positioned ancestor the
 * mobile menu's panel hangs from.
 */
export function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-700/60 bg-navy-900/95 py-3 backdrop-blur">
      <Container className="flex items-center justify-between gap-6">
        <Link
          href="/"
          className="hit-area font-display text-lg font-semibold uppercase tracking-wide text-cream-50"
        >
          Daddy Bear
        </Link>
        <NavLinks />
        <MobileMenu />
      </Container>
    </header>
  );
}

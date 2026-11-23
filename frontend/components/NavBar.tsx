import Image from 'next/image';
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
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink/95 py-3 backdrop-blur">
      <Container className="flex items-center justify-between gap-6">
        {/* The gold wordmark on Ink, an approved pairing (Brand Guide p.2). */}
        <Link href="/" className="hit-area block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400">
          <Image
            src="/brand/wordmark-gold-sm.png"
            alt="Daddy Bear"
            width={400}
            height={50}
            loading="eager"
            className="h-5 w-auto sm:h-6"
          />
        </Link>
        <NavLinks />
        <MobileMenu />
      </Container>
    </header>
  );
}

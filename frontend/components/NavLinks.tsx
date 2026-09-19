'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, isActive } from '@/lib/navigation';

/** The inline header links from `md` up, with the current section shown in the hover color. */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
      {NAV_LINKS.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className={`hit-area py-1 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-gold-400 ${
              active ? 'text-gold-400' : 'text-cream-100'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

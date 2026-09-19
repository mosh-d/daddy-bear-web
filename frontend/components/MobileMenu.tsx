'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './Button';
import { Container } from './Container';
import { WhatsAppCTA } from './WhatsAppCTA';
import { ArrowRightIcon, CloseIcon, MenuIcon } from './Icons';
import { NAV_LINKS, isActive } from '@/lib/navigation';

/** Tailwind's `md` breakpoint, where the inline nav takes over from this menu. */
const DESKTOP_QUERY = '(min-width: 48rem)';

/**
 * The burger menu for phones and small tablets (below `md`). Opens a panel
 * under the header with the section links, the current one in gold, plus
 * the join-the-list action.
 *
 * While open, the page behind is dimmed, doesn't scroll, and can't be
 * reached by keyboard (inert). It closes on: tapping a link, the X, or the
 * dimmed page; Escape (focus goes back to the button); a route change; or
 * the window widening past `md`, so a rotated tablet never keeps a hidden
 * menu locking the page.
 */
export function MobileMenu() {
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  // Close when the route changes. Adjusting state while rendering (rather
  // than in an effect) is React's recommended way to react to a new prop.
  const [menuPath, setMenuPath] = useState(pathname);
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const behind = document.querySelectorAll<HTMLElement>('body > main, body > footer');
    behind.forEach((el) => (el.inert = true));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = () => desktop.matches && setOpen(false);

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      root.style.overflow = previousOverflow;
      behind.forEach((el) => (el.inert = false));
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="-my-2 -mr-2 flex h-11 w-11 items-center justify-center rounded-pill text-cream-50 transition-colors hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      </button>

      {/* The header is the positioned ancestor, so top-full sits just under it. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`absolute inset-x-0 top-full h-dvh bg-navy-950/60 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        id={panelId}
        // Any link tapped inside the panel closes it, including one to the
        // page already open (which doesn't change the route).
        onClick={(event) => (event.target as HTMLElement).closest('a') && setOpen(false)}
        className={`absolute inset-x-0 top-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-b border-navy-700 bg-navy-900 shadow-xl transition-[opacity,translate,visibility] duration-200 ease-out ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <Container className="pb-8 pt-2">
          <nav aria-label="Primary">
            <ul className="divide-y divide-navy-700/60">
              {NAV_LINKS.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center justify-between py-3 font-display text-xl font-semibold transition-colors hover:text-gold-400 ${
                        active ? 'text-gold-400' : 'text-cream-50'
                      }`}
                    >
                      {link.label}
                      <ArrowRightIcon className="h-4 w-4 opacity-60" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Link
            href="/screenings/host"
            className="hit-area mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-cream-100 hover:text-gold-400"
          >
            Host a screening
          </Link>
          <div className="mt-8 flex flex-col items-start gap-4">
            <Button href="/#join" tone="onNavy" showArrow>
              Join the list
            </Button>
            <WhatsAppCTA tone="onNavy" />
          </div>
        </Container>
      </div>
    </div>
  );
}

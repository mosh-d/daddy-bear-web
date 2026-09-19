/** The header's links, shared by the inline nav (md and up) and the mobile menu. */
export const NAV_LINKS = [
  { href: '/film', label: 'The Film' },
  { href: '/screenings', label: 'Screenings' },
  { href: '/journal', label: 'Journal' },
  { href: '/about', label: 'About' },
];

/**
 * A section stays active on its sub-pages (/journal/some-post,
 * /screenings/host), since those are part of it.
 */
export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

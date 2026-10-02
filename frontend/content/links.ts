/**
 * Public brand links and contact details, from Cardinal's Website Content &
 * Information Pack. These are content, not credentials, so they live here
 * rather than in env (service IDs and tokens stay in .env — see lib/site.ts).
 *
 * Tracking parameters from however a link was copied (utm_source=qr, ?s=11,
 * stkn=…) are stripped: they'd follow every visitor and skew the
 * destination's own analytics. Keep these canonical. See CONTENT.md.
 */

/** Where "Join the list" goes. Substack is the newsletter platform. */
export const SUBSTACK_URL = 'https://cardinalproductions.substack.com';

/** Substack's own signup box, embedded on Home. */
export const SUBSTACK_EMBED_URL = `${SUBSTACK_URL}/embed`;

/** General, press, partnership and screening enquiries. */
export const CONTACT_EMAIL = 'cardinalproductionsng@gmail.com';

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/daddybearfilm' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@daddybearfilm' },
  { label: 'X', href: 'https://x.com/daddybearfilm' },
  { label: 'YouTube', href: 'https://youtube.com/@korayday' },
];

/**
 * Funder credit. Cardinal's pack requires this exact wording wherever the
 * film's support is acknowledged — don't reword it. Partner logos go beside
 * it once supplied, subject to the partners' brand-use guidelines.
 */
export const SUPPORT_CREDIT = 'Powered by CcHUB in Partnership with Africa No Filter';

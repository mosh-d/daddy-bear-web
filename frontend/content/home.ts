/**
 * Home page copy and its one primary call to action. The CTA changes with
 * the season: join the list now, buy a ticket once screenings are on sale,
 * buy a gift once there's a shop. To switch, change ACTIVE_SEASON and push.
 * See CONTENT.md.
 */

type Cta = { label: string; href: string; external?: boolean };

const CTA_BY_SEASON = {
  join: { label: 'Join the list', href: '#join' },
  tickets: { label: 'Get tickets', href: '/screenings' },
  // gifts: { label: 'Shop gifts', href: 'https://shop.daddybear.ng', external: true },
  // Add the gifts season once a shop link exists. The shop itself is out of
  // scope for this site.
} satisfies Record<string, Cta>;

export const ACTIVE_SEASON: keyof typeof CTA_BY_SEASON = 'join';

export const homeCta: Cta = CTA_BY_SEASON[ACTIVE_SEASON];

export const homeHero = {
  eyebrow: 'Cardinal Productions presents',
  title: 'Daddy Bear',
  tagline: 'A film about fathers who show up.',
  // The film in one paragraph, from Cardinal's information pack.
  paragraph:
    'A Nigerian family drama set in Abuja. After losing his wife during childbirth, Fahd refuses to remarry and has to learn to raise his newborn daughter and his pre-teen daughter while navigating grief, work and the everyday demands of family life.',
};

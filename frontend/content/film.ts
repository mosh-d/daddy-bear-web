/**
 * Everything on The Film page. Synopsis, release date and credits are from
 * Cardinal's About Film pack (2026-11). Fill the remaining fields in as
 * post-production delivers them; anything left empty shows a "coming soon"
 * note or is hidden, so the page never looks broken. See CONTENT.md.
 */

type Image = {
  /** Path under public/, e.g. /film/still-01.webp */
  src: string;
  alt: string;
  /** The file's real pixel size, so the page reserves space for it. */
  width: number;
  height: number;
  caption?: string;
};

type CastMember = {
  name: string;
  role: string;
  /** Square-ish headshot under public/, e.g. /film/cast/name.webp */
  photo?: string;
};

/** One billing-block line, e.g. { role: 'Directed by', names: [...] }. */
type Credit = { role: string; names: string[] };

export type Film = {
  logline: string;
  intro: string;
  /** Release date, YYYY-MM-DD. Leave '' to hide it. */
  releaseDate: string;
  /** YouTube link to the trailer. Leave '' until it's released. */
  trailerUrl: string;
  /** One string per paragraph. */
  synopsis: string[];
  cast: CastMember[];
  credits: Credit[];
  world: {
    /** One string per paragraph. */
    paragraphs: string[];
    images: Image[];
  };
};

export const film: Film = {
  logline: 'A story about fathers who show up.',
  intro:
    'A Nigerian family drama about a widowed father learning to raise his two daughters, rooted in Muslim family life.',
  releaseDate: '2026-11-21',
  trailerUrl: '',
  synopsis: [
    'After losing his wife during childbirth, Fahd refuses to remarry and has to learn to raise his newborn daughter and his pre-teen daughter while navigating grief, work and the everyday demands of family life.',
  ],
  cast: [
    { name: 'Jammal Ibrahim', role: 'Fahd' },
    { name: 'Dera Osadebe', role: 'Aisha' },
    { name: 'Ummi Baba-Ahmed', role: 'Aunty Kike' },
    { name: 'Ame Aiyejina', role: 'Zahra' },
    { name: 'Ijapari Ben-Hirki', role: 'Khadijah' },
  ],
  credits: [
    { role: 'Directed by', names: ['Hajarat Alli', 'Korede Azeez'] },
    { role: 'Written by', names: ['Hajarat Alli', 'Cardinal Storyworks'] },
    { role: 'Produced by', names: ['Fulfillment “Fuchi” Nwaturuocha', 'Korede Azeez'] },
    { role: 'Production company', names: ['Cardinal Productions'] },
  ],
  world: {
    paragraphs: [],
    images: [],
  },
};

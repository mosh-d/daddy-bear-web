/**
 * Everything on The Film page. Fill fields in as post-production delivers
 * them; anything left empty shows a "coming soon" note or is hidden, so
 * the page never looks broken. See CONTENT.md.
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

type Credit = { role: string; name: string };

export type Film = {
  logline: string;
  intro: string;
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
    'Filmed in 2026 and coming to screenings across Nigeria. The trailer, synopsis and cast land here as post-production delivers them.',
  trailerUrl: '',
  synopsis: [],
  cast: [],
  credits: [{ role: 'Founder, Producer & Co-Director', name: 'Korede Azeez' }],
  world: {
    paragraphs: [],
    images: [],
  },
};

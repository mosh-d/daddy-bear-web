/**
 * Everything on The Film page. Synopsis and credits are from Cardinal's
 * Website Content & Information Pack. Fill the remaining fields in as
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
    'A Nigerian family drama set in Abuja. The trailer, cast and stills land here as post-production delivers them.',
  trailerUrl: '',
  synopsis: [
    'Daddy Bear is a Nigerian family drama set in Abuja. After losing his wife during childbirth, Fahd refuses to remarry and has to learn to raise his newborn daughter and his pre-teen daughter while navigating grief, work and the everyday demands of family life.',
  ],
  cast: [],
  credits: [
    { role: 'Writer', name: 'Hajarat Abiodun Alli' },
    { role: 'Co-Directors', name: 'Hajarat Abiodun Alli and Korede Azeez' },
    { role: 'Producer', name: 'Fulfilment “Fuchi” Nwaturuocha' },
    { role: 'Production Company', name: 'Cardinal Productions' },
  ],
  world: {
    paragraphs: [],
    images: [],
  },
};

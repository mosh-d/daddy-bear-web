/**
 * Everything on the About & Mission page, from Cardinal's About Page pack
 * (2026-11). The mission is one string per paragraph. The three galleries
 * are swipeable rows of photos that open fullscreen when tapped; add, remove
 * or reorder a photo by editing its list. See CONTENT.md.
 */

export type GalleryImage = {
  /** Path under public/, e.g. /about/team/fxt55781.webp */
  src: string;
  /** Describes the photo for people using screen readers. Required. */
  alt: string;
  /** The file's real pixel size, so the page reserves space for it. */
  width: number;
  height: number;
  /** Optional line under the photo, e.g. a name and role. */
  caption?: string;
  /**
   * Larger version shown in fullscreen view. Filled in automatically: if a
   * file with the same name exists in a `full/` folder beside `src`, it's
   * used; otherwise fullscreen shows `src`. See CONTENT.md.
   */
  full?: string;
};

export type Gallery = {
  /** Small label above the row. */
  eyebrow: string;
  title: string;
  intro?: string;
  images: GalleryImage[];
};

const portrait = { width: 800, height: 1200 };
const landscape = { width: 1200, height: 800 };

export const about = {
  title: 'The Mission',
  /** The first paragraph is the lead, shown large at the top of the page. */
  mission: [
    '“Daddy Bear,” a Cardinal Productions feature film to hit the big screen, is set to soar into theaters nationwide supported through the Entertainment and Media Hubs Program, powered by CcHUB Creative Economy Practice in partnership with Africa No Filter.',
    'With a heartfelt approach to storytelling, Daddy Bear explores the realities of fatherhood through an intimate blend of family drama, emotion and resilience, delivering a moving story of a father whose love for his children is tested by loss, responsibility and the unexpected challenges of widowhood. Rooted in Muslim family life, the film celebrates the strength of family and the courage it takes to keep going.',
    'Korede and Fuchi of Cardinal Productions are producing the film, which Korede and Hajarat direct from a screenplay by Hajarat and Cardinal Storyworks.',
    'Jammal Ibrahim plays Fahd. He is joined by Dera Osadebe as Aisha, Ummi Baba-Ahmed as Aunty Kike, Ame Aiyejina as Zahra and Ijapari Ben-Hirki as Khadijah.',
    'Beyond the story of one man’s journey, Daddy Bear invites us to rethink family responsibilities, embrace vulnerability, and recognise that love is expressed not only through provision but also through presence, care, and emotional connection. Above all, we hope the film sparks honest conversations about parenting and the importance of asking for help when we need it.',
    '“Daddy Bear” is executive produced by Africa No Filter, Korede Azeez and Fulfillment “Fuchi” Nwaturuocha. Behind the camera, they are joined by director of photography Okwong Fadamana, props and set Rachael Eraikhuemen, costume designer Olujimi Sunday John and sound team Jonathan Ainwokhai, along with Bishel and Sunny Jonas Adoga, editor Adio Solanke and first assistant director Jb Gbagyifilmboy Mairubutu.',
  ],

  galleries: [
    {
      eyebrow: 'Characters',
      title: 'Meet the family.',
      images: [
        {
          src: '/about/characters/fxt56813.webp',
          alt: 'A father in a brown kaftan lifts his baby high above his head',
          ...portrait,
        },
        {
          src: '/about/characters/fxt55852.webp',
          alt: 'Portrait of a man in an orange kaftan against a grey backdrop',
          ...portrait,
        },
        {
          src: '/about/characters/fxt56759.webp',
          alt: 'Portrait of a girl in a green hijab and abaya',
          ...portrait,
        },
        {
          src: '/about/characters/fxt56082.webp',
          alt: 'Portrait of a young woman in a rose-patterned headscarf',
          ...portrait,
        },
        {
          src: '/about/characters/fxt56232.webp',
          alt: 'Portrait of a young woman in an olive hijab over a mustard dress',
          ...portrait,
        },
        {
          src: '/about/characters/fxt57056.webp',
          alt: 'Portrait of a smiling woman in a brown hijab, arms folded',
          ...portrait,
        },
        {
          src: '/about/characters/fxt57005.webp',
          alt: 'Portrait of a woman in a striped peach hijab, arms folded',
          ...portrait,
        },
        {
          src: '/about/characters/fxt56738.webp',
          alt: 'Portrait of an older man with a white beard, in a black cap and embroidered robe',
          ...portrait,
        },
        {
          src: '/about/characters/fxt57039.webp',
          alt: 'Portrait of an older woman in a blue hijab, one hand on her chest',
          ...portrait,
        },
      ],
    },
    {
      eyebrow: 'Behind the scenes',
      title: 'On set.',
      images: [
        {
          src: '/about/behind-the-scenes/fxt56717.webp',
          alt: 'A crew member holds up the Daddy Bear clapperboard in front of the cast in a living room',
          ...landscape,
        },
        {
          src: '/about/behind-the-scenes/fxt56709.webp',
          alt: 'Two on-set monitors show a close-up of an older man while a crew member listens on headphones',
          ...landscape,
        },
        {
          src: '/about/behind-the-scenes/fxt56671.webp',
          alt: 'Cast and crew rehearse a scene outdoors under the trees',
          ...landscape,
        },
        {
          src: '/about/behind-the-scenes/fxt56693.webp',
          alt: 'Cast seated on the floor for a prayer gathering, with the boom microphone overhead',
          ...landscape,
        },
        {
          src: '/about/behind-the-scenes/topdown1.webp',
          alt: 'Seen from above, a father holding his baby lies on a rug beside his daughter, surrounded by toys',
          width: 1200,
          height: 900,
        },
      ],
    },
    {
      eyebrow: 'The team',
      title: 'The people who made it.',
      images: [
        {
          src: '/about/team/fxt55781.webp',
          alt: 'Portrait of a member of the Daddy Bear team in a green headwrap and patterned top',
          ...portrait,
        },
        {
          src: '/about/team/fxt55957.webp',
          alt: 'Portrait of a member of the Daddy Bear team in a red hijab',
          ...portrait,
        },
        {
          src: '/about/team/fxt55988.webp',
          alt: 'Three members of the Daddy Bear team standing together in the studio',
          ...landscape,
        },
        {
          src: '/about/team/fxt56353.webp',
          alt: 'Three members of the Daddy Bear team laughing together in the studio',
          ...landscape,
        },
        {
          src: '/about/team/fxt56328.webp',
          alt: 'Four members of the Daddy Bear team posing together',
          ...portrait,
        },
      ],
    },
  ] satisfies Gallery[],
};

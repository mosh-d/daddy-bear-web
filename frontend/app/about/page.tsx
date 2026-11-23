import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { WhatsAppChat } from '@/components/WhatsAppLinks';
import { PhotoGallery } from '@/components/PhotoGallery';
import { about, type GalleryImage } from '@/content/about';
import { CONTACT_EMAIL, SUPPORT_CREDIT } from '@/content/links';

export const metadata: Metadata = {
  title: 'About & Mission',
  description:
    'The mission behind Daddy Bear, a Cardinal Productions feature about fatherhood, loss and family, with its characters, behind-the-scenes photos and the team who made it.',
};

/**
 * Pairs each photo with its larger fullscreen version, if one exists in a
 * `full/` folder beside it (checked at build time). A photo added without
 * one still opens fullscreen, just at its carousel size.
 */
function withFullSize(image: GalleryImage): GalleryImage {
  if (image.full) return image;
  const full = image.src.replace(/\/([^/]+)$/, '/full/$1');
  return fs.existsSync(path.join(process.cwd(), 'public', full)) ? { ...image, full } : image;
}

export default function AboutPage() {
  const [lead, ...rest] = about.mission;

  return (
    <>
      <Section tone="navy" eyebrow="About & Mission" image={{ src: '/heroes/about.webp' }}>
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">{about.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream-100/90">{lead}</p>
      </Section>

      <Section tone="cream" eyebrow="The story">
        {/* Full width, flowing into two columns from desktop up so lines stay
            a comfortable reading length. */}
        <div className="text-base leading-relaxed text-ink/90 lg:columns-2 lg:gap-12">
          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mb-5 break-inside-avoid last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {about.galleries.map((gallery, index) => (
        <Section key={gallery.eyebrow} tone={index % 2 === 0 ? 'cream-alt' : 'cream'} eyebrow={gallery.eyebrow}>
          <h2 className="mb-8 max-w-2xl font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
            {gallery.title}
          </h2>
          <PhotoGallery label={gallery.eyebrow} images={gallery.images.map(withFullSize)} />
        </Section>
      ))}

      <Section tone="cream" eyebrow="Supported by">
        {/* Funder credit, in the exact wording Cardinal's pack requires. Partner
            logos go beside it once supplied, per the partners' brand guidelines. */}
        <p className="font-display text-xl font-semibold text-navy-900 sm:text-2xl">{SUPPORT_CREDIT}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70">
          Through the Entertainment and Media Hubs Program, powered by CcHUB Creative Economy Practice.
        </p>
      </Section>

      <Section tone="cream" eyebrow="Press & partners">
        <h2 className="max-w-2xl font-display text-2xl font-semibold text-navy-900 sm:text-3xl">
          Writing about Daddy Bear, or want to work with us?
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/80">
          We&apos;re glad to hear from journalists, brands and organisations who share the mission, whether
          that&apos;s coverage, a partnership or a screening for your community.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <Button href={`mailto:${CONTACT_EMAIL}`} external>
            Email us
          </Button>
          <WhatsAppChat
            message="Hello Daddy Bear team, I'm getting in touch about press or a partnership."
            label="Chat with us on WhatsApp"
          />
          <Button href="/screenings/host" variant="ghost">
            Host a screening
          </Button>
        </div>
        <p className="mt-6 text-sm text-ink/70">
          General, press, partnership and screening enquiries:{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-navy-900 underline underline-offset-4 hover:text-gold-600"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </Section>
    </>
  );
}

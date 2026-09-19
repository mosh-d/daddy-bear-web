import type { ComponentPropsWithoutRef } from 'react';
import type { MDXComponents } from 'mdx/types';
import { Figure } from '@/components/Figure';
import { VideoEmbed } from '@/components/VideoEmbed';

/**
 * How Journal post markdown renders, styled to the design system rather
 * than a generic prose theme. `Figure` and `Video` are available inside any
 * post without an import. See CONTENT.md for usage.
 */
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-10 font-display text-2xl font-semibold text-navy-900" {...props} />,
  h3: (props) => <h3 className="mt-8 font-display text-xl font-semibold text-navy-900" {...props} />,
  p: (props) => <p className="mt-4" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 border-gold-500 pl-4 font-display-italic text-lg italic text-navy-900"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-cream-200" />,
  // A wide table scrolls inside its own box on a phone instead of making
  // the whole page scroll sideways.
  table: (props) => (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b border-cream-200 px-3 py-2 font-semibold text-navy-900" {...props} />,
  td: (props) => <td className="border-b border-cream-200 px-3 py-2" {...props} />,
  a: ({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="font-semibold text-navy-900 underline underline-offset-4 hover:text-gold-600"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      />
    );
  },
  // Plain markdown images (![alt](/journal/photo.webp)) have no known size,
  // so they can't go through next/image. Lazy-loaded; use <Figure> when the
  // dimensions are known, to avoid the text jumping as the image arrives.
  img: ({ alt = '', ...props }: ComponentPropsWithoutRef<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} loading="lazy" decoding="async" className="mt-8 h-auto w-full rounded-card" {...props} />
  ),
  Figure,
  Video: ({ url, title }: { url: string; title: string }) => (
    <div className="mt-8">
      <VideoEmbed url={url} title={title} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}

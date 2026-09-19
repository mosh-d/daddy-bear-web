import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Section } from '@/components/Section';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { WhatsAppShare } from '@/components/WhatsAppLinks';
import { formatDate } from '@/lib/dates';
import { getJournalPost, getJournalPosts } from '@/lib/journal';
import { absoluteUrl } from '@/lib/site';

// Static export: every post is generated at build time, and any other slug
// is a 404 rather than an attempt to render on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return getJournalPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<'/journal/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getJournalPost(slug);
  if (!post) return {};
  const { title, excerpt, cover } = post.meta;
  return {
    title,
    description: excerpt,
    openGraph: {
      type: 'article',
      title,
      description: excerpt,
      url: `/journal/${slug}`,
      ...(cover ? { images: [cover] } : {}),
    },
  };
}

export default async function JournalPostPage(props: PageProps<'/journal/[slug]'>) {
  const { slug } = await props.params;
  const post = await getJournalPost(slug);
  if (!post) notFound();
  const { meta, Content } = post;

  return (
    <Section tone="cream">
      <article className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 text-sm text-ink/60">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          {meta.tag ? <Badge>{meta.tag}</Badge> : null}
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">{meta.title}</h1>
        {meta.cover ? (
          <div className="relative mt-8 aspect-video overflow-hidden rounded-card bg-navy-700">
            <Image
              src={meta.cover}
              alt={meta.coverAlt ?? ''}
              fill
              preload
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="mt-8 max-w-prose text-base leading-relaxed text-ink/90 [&>*:first-child]:mt-0">
          <Content />
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-cream-200 pt-6">
          <WhatsAppShare
            text={`${meta.title}, from the Daddy Bear journal:`}
            url={absoluteUrl(`/journal/${slug}`)}
          />
          <Button href="/journal" variant="ghost">
            All journal entries
          </Button>
        </div>
      </article>
    </Section>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './Badge';
import { formatDate } from '@/lib/dates';
import type { JournalPostMeta } from '@/lib/journal';

export function JournalCard({ post }: { post: JournalPostMeta }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-cream-200 bg-cream-50 transition-[translate,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/10">
      <div className="relative aspect-video bg-ember-900">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.coverAlt ?? ''}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-xs text-cream-100/70">
            Image coming from set
          </div>
        )}
      </div>
      {/* Text on top, "Read the update" pinned to the bottom, so the links
          line up across cards whatever the length of the excerpt. */}
      <div className="flex flex-1 flex-col justify-between gap-5 p-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs text-ink/60">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.tag ? <Badge>{post.tag}</Badge> : null}
          </div>
          <h3 className="font-display text-lg font-semibold text-ink">
            <Link href={`/journal/${post.slug}`} className="hit-area inline-block hover:text-ember-600">
              {post.title}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-ink/80">{post.excerpt}</p>
        </div>
        <Link
          href={`/journal/${post.slug}`}
          className="hit-area self-start text-sm font-semibold text-ink underline-offset-4 hover:text-ember-600 hover:underline"
        >
          Read the update<span className="sr-only">: {post.title}</span>
        </Link>
      </div>
    </article>
  );
}

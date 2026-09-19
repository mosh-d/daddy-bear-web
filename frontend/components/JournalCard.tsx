import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './Badge';
import { formatDate } from '@/lib/dates';
import type { JournalPostMeta } from '@/lib/journal';

export function JournalCard({ post }: { post: JournalPostMeta }) {
  return (
    <article className="overflow-hidden rounded-card border border-cream-200 bg-cream-50">
      <div className="relative aspect-video bg-navy-700">
        {post.cover ? (
          <Image
            src={post.cover}
            alt={post.coverAlt ?? ''}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-xs text-cream-100/70">
            Image coming from set
          </div>
        )}
      </div>
      <div className="space-y-3 p-6">
        <div className="flex items-center gap-3 text-xs text-ink/60">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.tag ? <Badge>{post.tag}</Badge> : null}
        </div>
        <h3 className="font-display text-lg font-semibold text-navy-900">
          <Link href={`/journal/${post.slug}`} className="hit-area inline-block hover:text-gold-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-ink/80">{post.excerpt}</p>
        <Link
          href={`/journal/${post.slug}`}
          className="hit-area inline-block text-sm font-semibold text-navy-900 underline-offset-4 hover:text-gold-600 hover:underline"
        >
          Read the update<span className="sr-only">: {post.title}</span>
        </Link>
      </div>
    </article>
  );
}

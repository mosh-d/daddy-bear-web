import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './Badge';
import type { JournalEntry } from '@/lib/journal';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function JournalCard({ entry }: { entry: JournalEntry }) {
  return (
    <article className="overflow-hidden rounded-card border border-cream-200 bg-cream-50">
      <div className="relative aspect-[16/9] bg-navy-700">
        {entry.image ? (
          <Image
            src={entry.image}
            alt={entry.imageAlt ?? ''}
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
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          {entry.tag ? <Badge>{entry.tag}</Badge> : null}
        </div>
        <h3 className="font-display text-lg font-semibold text-navy-900">
          <Link href={`/journal/${entry.slug}`} className="hover:text-gold-600">
            {entry.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-ink/80">{entry.excerpt}</p>
        <Link
          href={`/journal/${entry.slug}`}
          className="inline-block text-sm font-semibold text-navy-900 underline-offset-4 hover:text-gold-600 hover:underline"
        >
          Read the update
        </Link>
      </div>
    </article>
  );
}

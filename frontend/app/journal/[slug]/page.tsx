import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { Section } from '@/components/Section';
import { Badge } from '@/components/Badge';
import { getJournalEntry } from '@/lib/journal';

export const revalidate = 60;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export async function generateMetadata(props: PageProps<'/journal/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = await getJournalEntry(slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.excerpt,
    openGraph: { title: entry.title, description: entry.excerpt },
  };
}

export default async function JournalEntryPage(props: PageProps<'/journal/[slug]'>) {
  const { slug } = await props.params;
  const entry = await getJournalEntry(slug);
  if (!entry) notFound();

  return (
    <Section tone="cream">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3 text-sm text-ink/60">
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          {entry.tag ? <Badge>{entry.tag}</Badge> : null}
        </div>
        <h1 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
          {entry.title}
        </h1>
        <div className="mt-8 max-w-prose space-y-4 text-base leading-relaxed text-ink/90">
          {Array.isArray(entry.body) ? (
            <PortableText value={entry.body} />
          ) : (
            entry.body.split('\n\n').map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)
          )}
        </div>
      </div>
    </Section>
  );
}

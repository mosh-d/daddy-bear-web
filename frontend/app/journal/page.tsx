import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { JournalCard } from '@/components/JournalCard';
import { getJournalEntries } from '@/lib/journal';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Real-time updates from the Daddy Bear production and screening circuit.',
};

export default async function JournalPage() {
  const entries = await getJournalEntries();

  return (
    <>
      <Section tone="navy" eyebrow="The Journal">
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          Follow the production, day by day.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90">
          Text, photos and video from set — posted by the team as it happens, no waiting for a
          developer.
        </p>
      </Section>

      <Section tone="cream">
        {entries.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <JournalCard key={entry.slug} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="text-base text-ink/70">
            The first entry goes up when the shoot begins. Join the list on the home page and
            we&apos;ll let you know.
          </p>
        )}
      </Section>
    </>
  );
}

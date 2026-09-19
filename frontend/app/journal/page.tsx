import type { Metadata } from 'next';
import { Section } from '@/components/Section';
import { JournalCard } from '@/components/JournalCard';
import { getJournalPosts } from '@/lib/journal';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Updates from the Daddy Bear production and screening circuit.',
};

export default function JournalPage() {
  const posts = getJournalPosts();

  return (
    <>
      <Section tone="navy" eyebrow="The Journal">
        <h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
          Follow the production, day by day.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/90">
          Text, photos and video from set and from the screening circuit, as it happens.
        </p>
      </Section>

      <Section tone="cream">
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <JournalCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-base text-ink/70">
            The first entry is on its way. Join the list below and we&apos;ll let you know when it goes up.
          </p>
        )}
      </Section>
    </>
  );
}

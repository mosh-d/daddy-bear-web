import type { JournalEntry } from '@/lib/journal';

/**
 * Placeholder Journal content so the site is demoable before Sanity is
 * connected (see lib/journal.ts). Replace by publishing real entries in
 * Sanity Studio once NEXT_PUBLIC_SANITY_PROJECT_ID is set — this file
 * stops being read the moment that env var exists.
 */
export const journalSample: JournalEntry[] = [
  {
    slug: 'welcome-to-the-journal',
    title: 'Welcome to the Daddy Bear journal',
    date: '2026-08-07',
    excerpt:
      'This is where we’ll post as the film comes together — from the last days of prep through the first day on set and beyond.',
    body: 'This is where we’ll post as the film comes together — from the last days of prep through the first day on set and beyond. Real updates, posted from a phone, as they happen. Check back often, or join the list below and we’ll let you know when something new goes up.',
    tag: 'Announcement',
  },
  {
    slug: 'principal-photography-begins',
    title: 'Principal photography begins',
    date: '2026-08-15',
    excerpt: 'Cameras roll today. Here’s what the first day on set looked like.',
    body: 'Cameras roll today. Here’s what the first day on set looked like — more from the team once we wrap for the day.',
    tag: 'Production',
  },
];

import type { TypedObject } from '@portabletext/types';
import { sanityClient, sanityConfigured } from './sanity';
import { journalSample } from '@/content/journal-sample';

export type JournalEntry = {
  slug: string;
  title: string;
  /** ISO date string */
  date: string;
  excerpt: string;
  /** Plain text (sample content) or Sanity Portable Text blocks. */
  body: string | TypedObject[];
  tag?: string;
  image?: string;
  imageAlt?: string;
};

const LIST_QUERY = `*[_type == "journalEntry"] | order(date desc){
  "slug": slug.current,
  title,
  date,
  excerpt,
  tag,
  "image": image.asset->url,
  "imageAlt": image.alt
}`;

const ENTRY_QUERY = `*[_type == "journalEntry" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  date,
  excerpt,
  body,
  tag,
  "image": image.asset->url,
  "imageAlt": image.alt
}`;

function bySampleSlug(slug: string) {
  return journalSample.find((entry) => entry.slug === slug) ?? null;
}

/** All Journal entries, newest first. Reads Sanity once configured, sample content until then. */
export async function getJournalEntries(): Promise<JournalEntry[]> {
  if (sanityConfigured && sanityClient) {
    return sanityClient.fetch<JournalEntry[]>(LIST_QUERY);
  }
  return [...journalSample].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getJournalEntry(slug: string): Promise<JournalEntry | null> {
  if (sanityConfigured && sanityClient) {
    const entry = await sanityClient.fetch<JournalEntry | null>(ENTRY_QUERY, { slug });
    return entry ?? null;
  }
  return bySampleSlug(slug);
}

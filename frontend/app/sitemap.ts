import type { MetadataRoute } from 'next';
import { getJournalPosts } from '@/lib/journal';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/film', '/screenings', '/screenings/host', '/journal', '/about'];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path) })),
    ...getJournalPosts().map((post) => ({
      url: absoluteUrl(`/journal/${post.slug}`),
      lastModified: post.date.slice(0, 10),
    })),
  ];
}

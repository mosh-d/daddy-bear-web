import fs from 'node:fs';
import path from 'node:path';
import type { ComponentType } from 'react';
import { parse as parseYaml } from 'yaml';
import { z } from 'zod';

/**
 * Journal posts are MDX files in content/journal/, one per post, named by
 * their URL slug. Read at build time only (this module uses the file
 * system), so it must never be imported from a client component.
 *
 * Frontmatter is validated here, so a missing field, a malformed date or a
 * cover image that isn't in public/ fails the build with the file name
 * rather than shipping a broken page. See CONTENT.md.
 */

const JOURNAL_DIR = path.join(process.cwd(), 'content', 'journal');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const frontmatterSchema = z.object({
  title: z.string().min(1),
  /** "2026-08-15", or "2026-08-15T18:30" to order several posts on one day. */
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2})?$/, 'date must look like 2026-08-15 (optionally 2026-08-15T18:30)'),
  excerpt: z.string().min(1),
  /** Path under public/, e.g. /journal/first-day.webp */
  cover: z.string().startsWith('/', 'cover must be a path under public/, starting with /').optional(),
  coverAlt: z.string().optional(),
  tag: z.string().optional(),
});

export type JournalPostMeta = z.infer<typeof frontmatterSchema> & { slug: string };

function readFrontmatter(file: string): JournalPostMeta {
  const slug = file.replace(/\.mdx$/, '');
  const where = `content/journal/${file}`;
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`${where}: file names must be lowercase words joined by hyphens (e.g. first-day-on-set.mdx).`);
  }

  const source = fs.readFileSync(path.join(JOURNAL_DIR, file), 'utf8');
  const block = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!block) throw new Error(`${where}: missing the --- frontmatter block at the top of the file.`);

  const parsed = frontmatterSchema.safeParse(parseYaml(block[1]));
  if (!parsed.success) throw new Error(`${where}: invalid frontmatter\n${z.prettifyError(parsed.error)}`);

  const meta = parsed.data;
  if (meta.cover && !fs.existsSync(path.join(PUBLIC_DIR, meta.cover))) {
    throw new Error(`${where}: cover image public${meta.cover} does not exist.`);
  }
  if (meta.cover && !meta.coverAlt) {
    throw new Error(`${where}: add coverAlt describing the cover image for screen readers.`);
  }
  return { ...meta, slug };
}

/** All posts, newest first. */
export function getJournalPosts(): JournalPostMeta[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs
    .readdirSync(JOURNAL_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map(readFrontmatter)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export async function getJournalPost(
  slug: string,
): Promise<{ meta: JournalPostMeta; Content: ComponentType } | null> {
  const meta = getJournalPosts().find((post) => post.slug === slug);
  if (!meta) return null;
  const { default: Content } = await import(`@/content/journal/${slug}.mdx`);
  return { meta, Content };
}

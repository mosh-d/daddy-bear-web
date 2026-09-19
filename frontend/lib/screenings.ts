import { z } from 'zod';
import data from '@/content/screenings.json';
import type { Screening } from './screening-helpers';

/**
 * Loads content/screenings.json. Validated at build time, so a typo in the
 * file (a bad date, a missing venue, a duplicate id) fails the build with a
 * clear message instead of shipping a broken listing. See CONTENT.md.
 */

const screeningSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'id must be lowercase words joined by hyphens'),
  city: z.string().trim().min(1),
  venue: z.string().trim().min(1),
  address: z.string().trim().min(1),
  date: z.iso.date('date must look like 2026-11-14'),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'time must be 24-hour, like "16:00" or "18:30"'),
  ticketUrl: z.preprocess((value) => (value === '' || value === null ? undefined : value), z.url().optional()),
  soldAtDoor: z.boolean(),
  status: z.enum(['upcoming', 'past']),
});

function load(): Screening[] {
  const parsed = z.array(screeningSchema).safeParse(data);
  if (!parsed.success) {
    // Name each broken entry by its id (or position), not Zod's "[3].date".
    const entries = data as { id?: unknown }[];
    const problems = parsed.error.issues.map(({ path, message }) => {
      const [index, field] = path;
      const id = entries[Number(index)]?.id;
      const entry = typeof id === 'string' ? `"${id}"` : `entry ${Number(index) + 1}`;
      return `  - ${entry}${field ? `, ${String(field)}` : ''}: ${message}`;
    });
    throw new Error(`content/screenings.json is invalid:\n${problems.join('\n')}`);
  }

  const screenings = parsed.data;
  const seen = new Set<string>();
  for (const { id } of screenings) {
    if (seen.has(id)) throw new Error(`content/screenings.json: id "${id}" is used more than once.`);
    seen.add(id);
  }

  if (screenings.some(({ id }) => id.startsWith('sample-'))) {
    console.warn('[screenings] content/screenings.json still contains sample screenings (ids starting "sample-").');
  }

  return screenings.sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
}

/** Every screening, earliest first. */
export const screenings = load();

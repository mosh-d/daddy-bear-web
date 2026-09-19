import { formatLongDate, formatTime } from './dates';
import { absoluteUrl, withUtm } from './site';

/**
 * Pure helpers shared by the screenings page, its client-side filters and
 * the Home page. Kept apart from lib/screenings.ts so client components
 * don't pull the data file and its schema into their bundle.
 */

export type Screening = {
  id: string;
  city: string;
  venue: string;
  address: string;
  /** "2026-11-14" */
  date: string;
  /** 24-hour "16:00" */
  time: string;
  ticketUrl?: string;
  soldAtDoor: boolean;
  status: 'upcoming' | 'past';
};

/**
 * Past if the file says so, or if its date has gone by. The date check
 * matters because the site is static: a screening marked "upcoming" stays
 * that way in the file until someone edits it.
 */
export function isPast(screening: Screening, today: string) {
  return screening.status === 'past' || screening.date < today;
}

/** Start time as an ISO timestamp in Lagos time (WAT, UTC+1, no daylight saving). */
export function startsAt(screening: Screening) {
  return `${screening.date}T${screening.time}:00+01:00`;
}

/** The Tix Africa link, tagged so the click-through is attributable to this site and this screening. */
export function ticketHref(screening: Screening) {
  if (!screening.ticketUrl) return undefined;
  return withUtm(screening.ticketUrl, {
    source: 'daddybear.ng',
    medium: 'website',
    campaign: 'screenings',
    content: screening.id,
  });
}

export function shareMessage(screening: Screening) {
  return `Daddy Bear is screening in ${screening.city}: ${formatLongDate(screening.date)}, ${formatTime(
    screening.time,
  )} at ${screening.venue}. Details and tickets:`;
}

export function screeningUrl(screening: Screening) {
  return absoluteUrl(`/screenings#${screening.id}`);
}

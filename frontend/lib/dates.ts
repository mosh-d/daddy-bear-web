/**
 * Date helpers that give the same answer on the build machine and on every
 * visitor's phone. Content dates are date-only strings ("2026-11-14"); a
 * plain `new Date(...)` reads those as UTC midnight and then displays them
 * in the viewer's timezone, which shows the previous day anywhere west of
 * UTC. Formatting in UTC keeps the written date intact.
 */

const LAGOS = 'Africa/Lagos';

function utcDate(isoDate: string) {
  return new Date(`${isoDate.slice(0, 10)}T00:00:00Z`);
}

/** "15 August 2026" */
export function formatDate(isoDate: string) {
  return utcDate(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** "Saturday 14 November 2026" */
export function formatLongDate(isoDate: string) {
  return utcDate(isoDate).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Parts for a calendar-style date block: { weekday: "Sat", day: "14", month: "Nov" } */
export function dateParts(isoDate: string) {
  const date = utcDate(isoDate);
  const part = (options: Intl.DateTimeFormatOptions) =>
    date.toLocaleDateString('en-GB', { ...options, timeZone: 'UTC' });
  return { weekday: part({ weekday: 'short' }), day: part({ day: 'numeric' }), month: part({ month: 'short' }) };
}

/** "2026-11" -> "November 2026" */
export function formatMonth(yearMonth: string) {
  return utcDate(`${yearMonth}-01`).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** 24-hour "16:00" -> "4pm", "18:30" -> "6:30pm" */
export function formatTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const suffix = hours < 12 ? 'am' : 'pm';
  const hour12 = hours % 12 || 12;
  return minutes ? `${hour12}:${String(minutes).padStart(2, '0')}${suffix}` : `${hour12}${suffix}`;
}

/** Today's date in Lagos as "YYYY-MM-DD", comparable as a string against content dates. */
export function todayInLagos(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: LAGOS,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

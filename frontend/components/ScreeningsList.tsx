'use client';

import { useId, useState } from 'react';
import { ScreeningCard } from './ScreeningCard';
import { ActionButton, Button } from './Button';
import { formatMonth } from '@/lib/dates';
import { isPast, type Screening } from '@/lib/screening-helpers';
import { useTodayInLagos } from '@/lib/use-today';

const ALL = 'all';

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort();
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-card border border-cream-200 bg-cream-50 px-4 py-3 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * The screenings listing with its city and month filters. All filtering
 * happens in the browser, against today's date in Lagos, so a screening
 * drops off the list the day after it happens even if nobody has edited
 * the data file yet. Past screenings stay hidden unless asked for.
 */
export function ScreeningsList({ screenings, buildDay }: { screenings: Screening[]; buildDay: string }) {
  const today = useTodayInLagos(buildDay);
  const [city, setCity] = useState(ALL);
  const [month, setMonth] = useState(ALL);
  const [showPast, setShowPast] = useState(false);
  const pastToggleId = useId();

  const pool = showPast ? screenings : screenings.filter((s) => !isPast(s, today));
  const cities = uniqueSorted(pool.map((s) => s.city));
  const months = uniqueSorted(pool.map((s) => s.date.slice(0, 7)));
  // A filter can outlive its option (e.g. hiding past screenings removes a
  // month), so fall back to "all" rather than showing an empty list.
  const activeCity = cities.includes(city) ? city : ALL;
  const activeMonth = months.includes(month) ? month : ALL;

  const matches = pool.filter(
    (s) => (activeCity === ALL || s.city === activeCity) && (activeMonth === ALL || s.date.startsWith(activeMonth)),
  );
  const upcoming = matches.filter((s) => !isPast(s, today));
  const past = matches.filter((s) => isPast(s, today)).reverse();
  const filtered = activeCity !== ALL || activeMonth !== ALL;

  function clearFilters() {
    setCity(ALL);
    setMonth(ALL);
  }

  if (screenings.every((s) => isPast(s, today)) && !showPast) {
    return (
      <div className="max-w-xl">
        <p className="text-base leading-relaxed text-ink/80">
          New screening dates are being confirmed. Join the list below and you&apos;ll hear the moment
          tickets are on sale, or bring Daddy Bear to your own community.
        </p>
        <div className="mt-6">
          <Button href="/screenings/host" variant="secondary">
            Host a screening
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <Select
          label="City"
          value={activeCity}
          onChange={setCity}
          options={[{ value: ALL, label: 'All cities' }, ...cities.map((c) => ({ value: c, label: c }))]}
        />
        <Select
          label="Date"
          value={activeMonth}
          onChange={setMonth}
          options={[{ value: ALL, label: 'Any date' }, ...months.map((m) => ({ value: m, label: formatMonth(m) }))]}
        />
        <label htmlFor={pastToggleId} className="flex items-center gap-2 py-3 text-sm text-ink/80">
          <input
            id={pastToggleId}
            type="checkbox"
            checked={showPast}
            onChange={(event) => setShowPast(event.target.checked)}
            className="h-4 w-4 rounded border-cream-200 focus-visible:ring-2 focus-visible:ring-gold-500"
          />
          Show past screenings
        </label>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-ink/70">
        {upcoming.length === 1 ? '1 upcoming screening' : `${upcoming.length} upcoming screenings`}
        {activeCity !== ALL ? ` in ${activeCity}` : ''}
        {activeMonth !== ALL ? ` in ${formatMonth(activeMonth)}` : ''}
      </p>

      {upcoming.length > 0 ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {upcoming.map((screening) => (
            <ScreeningCard key={screening.id} screening={screening} />
          ))}
        </div>
      ) : filtered ? (
        <div className="mt-4">
          <p className="text-base text-ink/80">No upcoming screenings match those filters.</p>
          <div className="mt-4">
            <ActionButton variant="secondary" onClick={clearFilters}>
              Clear filters
            </ActionButton>
          </div>
        </div>
      ) : null}

      {past.length > 0 ? (
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold text-navy-900">Past screenings</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {past.map((screening) => (
              <ScreeningCard key={screening.id} screening={screening} past />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

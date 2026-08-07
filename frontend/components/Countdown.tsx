'use client';

import { useEffect, useState } from 'react';

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Mins' },
  { key: 'seconds', label: 'Secs' },
];

function timeLeftUntil(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

/**
 * Counts down to a real production milestone (e.g. principal photography
 * starting) — not manufactured event-marketing urgency. See
 * design-system/00-brand-voice.md for why that distinction is the reason
 * this component exists at all. Renders nothing until mounted, so the
 * server-rendered HTML and the client's first paint always match (a ticking
 * value can't be computed identically on both).
 */
export function Countdown({
  target,
  arrivedMessage,
}: {
  /** ISO 8601 date string, e.g. '2026-08-15T00:00:00+01:00' (WAT). */
  target: string;
  /** Shown once the target date has passed, in place of the numbers. */
  arrivedMessage: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const targetDate = new Date(target);
    const tick = () => setTimeLeft(timeLeftUntil(targetDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const arrived = timeLeft && Object.values(timeLeft).every((n) => n === 0);

  return (
    <div className="rounded-card border border-navy-700 bg-navy-950 p-6 text-cream-50 sm:p-8">
      {!timeLeft ? (
        <div className="h-16" aria-hidden="true" />
      ) : arrived ? (
        <p className="text-center text-lg font-semibold text-gold-400 sm:text-left">{arrivedMessage}</p>
      ) : (
        <div className="grid grid-cols-4 gap-3 sm:gap-6" role="timer" aria-live="off">
          {UNITS.map(({ key, label }) => (
            <div key={key} className="text-center">
              <span className="block font-display text-3xl font-semibold tabular-nums sm:text-5xl">
                {String(timeLeft[key]).padStart(2, '0')}
              </span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-100/60 sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { Countdown } from './Countdown';
import { ScreeningCard } from './ScreeningCard';
import { Button } from './Button';
import { isPast, startsAt, type Screening } from '@/lib/screening-helpers';
import { useTodayInLagos } from '@/lib/use-today';

/**
 * The next screening that hasn't happened yet, picked in the browser
 * against today's date so Home never advertises a screening that's over.
 * The countdown is to a real, ticketed date: information, not manufactured
 * urgency (see design-system/00-brand-voice.md).
 */
export function NextScreening({ screenings, buildDay }: { screenings: Screening[]; buildDay: string }) {
  const today = useTodayInLagos(buildDay);
  const next = screenings.find((s) => !isPast(s, today));

  if (!next) {
    return (
      <div className="max-w-xl">
        <p className="text-base leading-relaxed text-ink/80">
          The next round of screening dates is being confirmed. Join the list below to hear first, or
          bring Daddy Bear to your own community.
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
    <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
      <ScreeningCard screening={next} />
      <Countdown target={startsAt(next)} arrivedMessage="It's screening day. See you there." />
    </div>
  );
}

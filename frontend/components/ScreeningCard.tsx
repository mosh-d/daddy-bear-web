import { Badge } from './Badge';
import { Button } from './Button';
import { WhatsAppShare } from './WhatsAppLinks';
import { dateParts, formatLongDate, formatTime } from '@/lib/dates';
import {
  shareMessage,
  screeningUrl,
  startsAt,
  ticketHref,
  type Screening,
} from '@/lib/screening-helpers';

/**
 * One screening: when, where, and how to get in. The date block is visual
 * only; the full date is written out in text for screen readers and for
 * anyone skimming. Renders on the server and inside the client-side filter
 * list alike, so it takes no hooks.
 */
export function ScreeningCard({ screening, past = false }: { screening: Screening; past?: boolean }) {
  const { weekday, day, month } = dateParts(screening.date);
  const tickets = ticketHref(screening);
  const when = `${formatLongDate(screening.date)}, ${formatTime(screening.time)}`;

  return (
    <article
      id={screening.id}
      className={`grid scroll-mt-20 grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-4 rounded-card border border-cream-200 bg-cream-50 p-5 sm:gap-x-6 sm:p-6 ${
        past ? 'opacity-70' : ''
      }`}
    >
      <div
        aria-hidden="true"
        className="flex w-16 flex-col items-center self-start rounded-card bg-navy-900 py-3 text-cream-50"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">{weekday}</span>
        <span className="mt-1 font-display text-3xl font-semibold leading-none">{day}</span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-wide">{month}</span>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{screening.city}</p>
        <h3 className="mt-1 font-display text-lg font-semibold text-navy-900 sm:text-xl">{screening.venue}</h3>
        <p className="mt-1 text-sm text-ink/70">{screening.address}</p>
        <p className="mt-2 text-sm font-semibold text-ink">
          <time dateTime={startsAt(screening)}>{when}</time>
        </p>
      </div>

      {/* On phones the actions take the card's full width (under the date
          block) so the button never squeezes into the narrow text column. */}
      <div className="col-span-2 flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-1 sm:col-start-2">
        {past ? (
          <Badge>Past screening</Badge>
        ) : tickets ? (
          <Button href={tickets} external showArrow>
            Buy tickets
            <span className="sr-only">
              {' '}
              for {screening.city}, {when}
            </span>
          </Button>
        ) : (
          <p className="text-sm font-semibold text-navy-900">
            {screening.soldAtDoor ? 'Tickets sold at the door' : 'Ticket details coming soon'}
          </p>
        )}
        {past ? null : <WhatsAppShare text={shareMessage(screening)} url={screeningUrl(screening)} />}
      </div>
    </article>
  );
}

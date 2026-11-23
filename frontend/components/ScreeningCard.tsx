import { Badge } from './Badge';
import { Button } from './Button';
import { TicketIcon } from './Icons';
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
 * One screening, drawn as a cinema ticket: the main part says where and how
 * to get in, and a Deep Ember stub, torn off along a perforated line,
 * carries the date and time. Notches are cut out of both edges at the
 * perforation (`.ticket` in app/globals.css, a CSS mask, so the section
 * behind shows through whatever its colour). The stub sits on the right
 * from tablet up and along the bottom on a phone.
 *
 * The stub is visual only; the full date is written out in the main part
 * for screen readers and for anyone skimming. Renders on the server and
 * inside the client-side filter list alike, so it takes no hooks.
 */
export function ScreeningCard({ screening, past = false }: { screening: Screening; past?: boolean }) {
  const { weekday, day, month } = dateParts(screening.date);
  const tickets = ticketHref(screening);
  const when = `${formatLongDate(screening.date)}, ${formatTime(screening.time)}`;

  return (
    // The drop shadow lives on a wrapper: a shadow on the masked ticket
    // itself would be cut away with the notches.
    <div
      className={`ticket-shadow transition-[translate] duration-200 ease-out hover:-translate-y-1 ${
        past ? 'opacity-70' : ''
      }`}
    >
      <article
        id={screening.id}
        className="ticket grid scroll-mt-20 overflow-hidden rounded-card bg-cream-50 sm:grid-cols-[minmax(0,1fr)_10rem]"
      >
        <div className="p-5 sm:p-6">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ember-800">
            <TicketIcon className="h-4 w-4" />
            {screening.city}
          </p>
          <h3 className="mt-2 font-display text-lg font-semibold text-ink sm:text-xl">{screening.venue}</h3>
          <p className="mt-1 text-sm text-ink/70">{screening.address}</p>
          <p className="mt-2 text-sm font-semibold text-ink">
            <time dateTime={startsAt(screening)}>{when}</time>
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
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
              <p className="text-sm font-semibold text-ink">
                {screening.soldAtDoor ? 'Tickets sold at the door' : 'Ticket details coming soon'}
              </p>
            )}
            {past ? null : <WhatsAppShare text={shareMessage(screening)} url={screeningUrl(screening)} />}
          </div>
        </div>

        {/* The stub. Its perforated edge is a dashed cream line. */}
        <div
          aria-hidden="true"
          className="flex h-[4.5rem] items-center justify-between gap-4 border-t-2 border-dashed border-cream-50/60 bg-ember-800 px-5 text-cream-50 sm:h-auto sm:flex-col sm:justify-center sm:gap-1 sm:border-t-0 sm:border-l-2 sm:px-3 sm:py-6"
        >
          <div className="flex items-baseline gap-2 sm:flex-col sm:items-center sm:gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">{weekday}</span>
            <span className="font-display text-3xl font-semibold leading-none sm:text-5xl">{day}</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">{month}</span>
          </div>
          <span className="text-sm font-semibold sm:mt-2">{formatTime(screening.time)}</span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cream-100/70 sm:mt-3">
            Admit one
          </span>
        </div>
      </article>
    </div>
  );
}

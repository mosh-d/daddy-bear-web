# Cards & badges

Components: [`components/Card.tsx`](../../components/Card.tsx), [`components/Badge.tsx`](../../components/Badge.tsx), [`components/JournalCard.tsx`](../../components/JournalCard.tsx).

## Card

`bg-cream-50 border border-cream-200 rounded-card p-6` on a cream/navy section, or `bg-navy-700/40 border border-navy-500/40 rounded-card p-6` when a card sits on a navy section. Used for the Home page's three mission pillars and for `JournalCard`.

## Badge (pill)

`rounded-pill px-3 py-1 text-xs font-semibold uppercase tracking-wide`, gold-on-navy or navy-on-cream depending on surface. Structurally borrowed from Black Market's rounded-pill credit chips ("Director — Fatimah Binta Gimsay") — a genuinely good pattern for short label+name pairs. Used for: Journal entry tags, "Past screening" labels, and crediting the team on About and The Film ("Role — Name").

## JournalCard

Thumbnail (`next/image`, 16:9, `rounded-card`), date + tag `Badge`, title (`font-display text-lg`), one-line excerpt, "Read" ghost-button. Grid: 1 column mobile, 2 columns `sm:`, 3 `lg:`.

## ScreeningCard

[`components/ScreeningCard.tsx`](../../components/ScreeningCard.tsx). A navy calendar block (weekday / day / month, gold weekday) beside city eyebrow, venue title (`font-display`), address, and the full date and time written out in text (the block is `aria-hidden`). Then one action: **Buy tickets** (primary, links out to Tix Africa) or the plain line "Tickets sold at the door", plus a WhatsApp share text link. Past screenings drop the action for a "Past screening" badge and fade to 70% opacity. List: 1 column mobile, 2 columns `lg:`.

Layout is a two-column grid (date block | details). Below `sm` the action row spans both columns, under the date block, because the details column is only ~170px wide on a 320px phone, too narrow for **Buy tickets** beside **Share on WhatsApp**. From `sm` up the actions sit under the details.

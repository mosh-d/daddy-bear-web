# Cards & badges

Components: [`components/Card.tsx`](../../components/Card.tsx), [`components/Badge.tsx`](../../components/Badge.tsx), [`components/JournalCard.tsx`](../../components/JournalCard.tsx).

## Card

`bg-cream-50 border border-cream-200 rounded-card p-6` on a cream section, or `bg-cream-50/10 border border-cream-50/20 rounded-card p-6` when a card sits on a dark section. Used for the Home page's three mission pillars and for `JournalCard`.

## Badge (pill)

`rounded-pill px-3 py-1 text-xs font-semibold uppercase tracking-wide`, gold-on-dark or ink-on-cream depending on surface. Structurally borrowed from Black Market's rounded-pill credit chips ("Director — Fatimah Binta Gimsay") — a genuinely good pattern for short label+name pairs. Used for: Journal entry tags, "Past screening" labels, and crediting the team on About and The Film ("Role — Name").

## JournalCard

Thumbnail (`next/image`, 16:9, `rounded-card`), date + tag `Badge`, title (`font-display text-lg`), one-line excerpt, "Read" ghost-button. Grid: 1 column mobile, 2 columns `sm:`, 3 `lg:`.

## ScreeningCard

[`components/ScreeningCard.tsx`](../../components/ScreeningCard.tsx). Drawn as a cinema ticket: the main part (city eyebrow with a ticket icon, venue, address, full date and time, then the actions) on cream, and a Deep Ember stub carrying weekday, day, month and time, separated by a dashed perforation. Notches are cut out of both edges at the perforation with a CSS mask (`.ticket` in `app/globals.css`), and the drop shadow sits on a wrapper so the mask doesn't clip it. The stub is on the right from tablet up and along the bottom on a phone.

Layout is a two-column grid (date block | details). Below `sm` the action row spans both columns, under the date block, because the details column is only ~170px wide on a 320px phone, too narrow for **Buy tickets** beside **Share on WhatsApp**. From `sm` up the actions sit under the details.

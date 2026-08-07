# Cards & badges

Components: [`components/Card.tsx`](../../components/Card.tsx), [`components/Badge.tsx`](../../components/Badge.tsx), [`components/JournalCard.tsx`](../../components/JournalCard.tsx).

## Card

`bg-cream-50 border border-cream-200 rounded-card p-6` on a cream/navy section, or `bg-navy-700/40 border border-navy-500/40 rounded-card p-6` when a card sits on a navy section. Used for the Home page's three mission pillars and for `JournalCard`.

## Badge (pill)

`rounded-pill px-3 py-1 text-xs font-semibold uppercase tracking-wide`, gold-on-navy or navy-on-cream depending on surface. Structurally borrowed from Black Market's rounded-pill credit chips ("Director — Fatimah Binta Gimsay") — a genuinely good pattern for short label+name pairs. Used for: Journal entry tags, and (Phase 1's About page) crediting the founding team once Cardinal supplies names/roles.

## JournalCard

Thumbnail (`next/image`, 16:9, `rounded-card`), date + tag `Badge`, title (`font-display text-lg`), one-line excerpt, "Read" ghost-button. Grid: 1 column mobile, 2 columns `sm:`, 3 `lg:`.

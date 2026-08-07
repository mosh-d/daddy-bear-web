# Spacing & layout

## Scale

Tailwind's default 4px base scale is used as-is (`1` = 0.25rem = 4px) — no custom spacing tokens. Reaching for a non-default value is a signal to reconsider the layout rather than add one-off CSS.

## Containers

- `Container` component (`components/Container.tsx`): `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`. Every page's content sits inside this — no bespoke max-widths per page.
- Full-bleed `Section` backgrounds extend edge-to-edge (see `04-components/section-blocks.md`); the `Container` goes *inside* the section to keep content readable at desktop widths while the color block reads full-width.

## Breakpoints

Default Tailwind breakpoints (`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px). Design and build mobile-first: base (unprefixed) classes target a small Android phone on a slow connection — the brief's actual audience — and breakpoints only ever *add* refinement upward, never fix a broken mobile layout after the fact.

## Section rhythm

- Vertical padding per section: `py-16 sm:py-24` — generous enough to read as "unhurried," not so large that a phone user scrolls forever past mostly-empty space.
- Gap between stacked elements inside a section: `space-y-6` to `space-y-8` depending on density.
- Cards in a grid: `gap-6`, collapsing to a single column below `sm`.

## Radii

- `rounded-card` (`1rem`) for cards, form fields, images.
- `rounded-pill` (`999px`) for badges, the pill-style credit chips borrowed structurally from Black Market's cast-credit UI (see `04-components/cards-badges.md`), and buttons.

# Typography

## Pairing

- **Display / headings — Fraunces** (`font-display`). A warm serif with real optical presence at large sizes and a genuine italic, loaded via `next/font/google` in `app/layout.tsx`. Used for page titles, section headers, and the wordmark. Its warmth is the point: it reads as considered and human, not corporate — the opposite of Black Market's aggressive distressed western display font.
- **Body / UI — Inter** (`font-body`). Clean, highly legible at small sizes on low-end phone screens, huge language/character coverage, loads fast as a self-hosted variable font via `next/font`. Used for paragraphs, nav, buttons, form fields, captions.

Both are placeholders pending Cardinal's final brand identity assets (brief promises "brand identity and design language" as something Cardinal provides). Swapping either is a one-line change in `app/layout.tsx` since every component reads `font-display`/`font-body` utilities, never a hardcoded font name.

## Scale (mobile-first, fluid where it matters)

| Role | Class | Notes |
|---|---|---|
| Hero title | `text-4xl sm:text-5xl md:text-6xl font-display font-semibold` | One per page, ever |
| Section title | `text-2xl sm:text-3xl font-display font-semibold` | |
| Card / subsection title | `text-lg sm:text-xl font-display font-semibold` | |
| Body | `text-base leading-relaxed font-body` | 16px minimum — never smaller for paragraph text, per mobile-first accessibility |
| Small / meta | `text-sm font-body text-navy-500` (on navy) or `text-ink/70` (on cream) | Dates, tags, captions |
| Eyebrow label | `text-xs sm:text-sm font-body font-semibold uppercase tracking-[0.2em]` | Gold, above section titles — the one deliberate structural echo of Black Market's "- SECTION LABEL" eyebrow convention |

## Rules

1. Never use the display serif below `text-lg` — it loses legibility at small sizes on phone screens (mobile-first non-negotiable).
2. Italic Fraunces is reserved for a single supporting line under a hero title (mirroring the brief document's own cover: bold serif title, italic serif subhead) — not for body copy.
3. Line length: body text containers cap at `max-w-prose` (~65ch) even inside a full-width color-blocked section, so reading stays comfortable.

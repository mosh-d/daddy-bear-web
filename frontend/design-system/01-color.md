# Color

Source of truth: [`tokens.css`](./tokens.css) (Tailwind utilities, e.g. `bg-navy-900`) and [`tokens.ts`](./tokens.ts) (raw hex for JS contexts). Both must stay in sync.

## Palette

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#0f1b30` | Deepest surfaces: footer, rare high-contrast hero moments |
| `navy-900` | `#17253f` | Primary dark surface — hero sections, nav bar, dark section blocks |
| `navy-700` | `#2c3e63` | Borders/dividers on navy, secondary buttons on navy |
| `navy-500` | `#62759e` | Muted/secondary text on navy (captions, meta text) |
| `cream-50` | `#fbf7ee` | Default page background |
| `cream-100` | `#f4efe1` | Alternate section background, card fill |
| `cream-200` | `#eae0c8` | Card border, subtle divider on cream |
| `gold-400` | `#d9b166` | Hover/lighter accent, gold text on navy |
| `gold-500` | `#c2953a` | Primary accent — CTA fills, eyebrow labels, dividers |
| `gold-600` | `#9c7527` | Gold text on cream (passes contrast where `gold-500` doesn't) |
| `ink` | `#201d17` | Body text on cream surfaces |

## Rules

1. **Every screen is built from two surfaces at most: navy and cream.** Gold never fills a large area — it marks something (a CTA, a label, a number), it doesn't cover a section. This is the direct counter to Black Market's four-hue rotation (black/orange/electric-blue/white): Daddy Bear's restraint *is* the differentiator.
2. **Section rhythm alternates navy and cream**, borrowing Black Market's full-bleed color-blocked structure (see `04-components/section-blocks.md`) but with only two tones instead of four, and no section using a hue outside this palette.
3. **Text contrast:**
   - On `navy-900`/`navy-950`: text is `cream-50` (headings) or `navy-500`... no — use `cream-100`/`cream-50` for body text on navy, never navy-500 for body copy (it's for meta/caption text only, ~4.5:1 minimum on navy-900 already tight — verify at implementation).
   - On `cream-50`/`cream-100`: text is `ink` for body, `navy-900` for headings.
   - Gold text: use `gold-400` on navy (passes contrast), `gold-600` on cream (`gold-500` is borderline on cream-50 for small text — reserve `gold-500` for large text/icons/borders on cream).
4. **Buttons:** primary CTA is a solid `gold-500` fill with `navy-900` text (highest-contrast, most confident combination we have — reserved for the one action per section). Secondary is an outline in the surface's foreground color.

## Where this came from

Directly from the brief's non-negotiable #7 ("Navy, cream and gold, restraint over noise, warmth over gloss") and the Cardinal Productions brief document itself, which uses this exact navy/cream/gold system in its own PDF layout — headings in navy, body cards alternating cream and light-gray, gold used only for small labels and one highlighted callout line. The website should feel like a continuation of that document, not a departure from it.

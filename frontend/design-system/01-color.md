# Color

Source of truth: [`tokens.css`](./tokens.css) (Tailwind utilities, e.g. `bg-ember-800`) and [`tokens.ts`](./tokens.ts) (raw hex for JS contexts). Both must stay in sync. The palette comes from the **Daddy Bear Brand Guide v1.0 (October 2026)**; the brand hexes are marked "brand". The other shades are derived from them for accessibility and depth.

## Palette

| Token | Hex | Use |
|---|---|---|
| `ember-500` | `#db4126` | **Brand Ember Red.** Large fills, big headlines, icons, focus rings on cream. 3.9:1 on cream, so large text only. |
| `ember-600` | `#b9311b` | Ember darkened for small text and buttons on cream: primary CTA fill, link hover. 5.4:1 on cream. |
| `ember-800` | `#9a2219` | **Brand Deep Ember.** Eyebrow labels on cream (7.2:1); the screening date block. |
| `ember-900` | `#6e1610` | Deepest red: image placeholders, hover on Deep Ember. |
| `ember-700` | `#7d3528` | Muted ember: the softer red a hero photo is blended into. |
| `ember-950` | `#511f19` | Muted deep ember: the hero surface behind the text. Deep Ember pulled toward Ink so a full-width red stays warm rather than harsh. |
| `gold-400` | `#f0c847` | **Brand Sun Gold.** CTAs, eyebrows and active nav on dark surfaces (5.0:1 on Deep Ember, 11.5:1 on Ink). |
| `gold-300` | `#f5d676` | Gold hover state. |
| `cream-50` | `#f7f2e8` | **Brand Cream.** Page background, text on dark surfaces. |
| `cream-100` | `#efe6d4` | Alternate section background. |
| `cream-200` | `#e2d6be` | Card borders, dividers on cream. |
| `ink` | `#141414` | **Brand Ink.** Body text and headings on cream; header, footer, countdown and video surfaces. |
| `ink-800` | `#2a2724` | Hairlines and raised surfaces on Ink. |

## Rules

1. **Balance, per the guide: 40% Cream, 25% Ember, 15% Ink, 12% Gold, 8% Deep Ember.** In practice: cream sections carry the reading, every page opens on an ember hero, the header and footer are Ink, and gold marks things (CTAs on dark, labels, the wordmark) rather than filling areas.
2. **Surfaces:** a page is Ink header → muted ember hero → alternating `cream-50` / `cream-100` sections → Ink footer. The hero runs from solid `ember-950` behind the text to the softer `ember-700` behind the photo (see `05-imagery-motion.md`). Full-strength Ember Red is kept for smaller areas (buttons, icons, the link preview), where its saturation reads as energy rather than glare.
3. **Text contrast (WCAG AA):**
   - On cream: body and headings in `ink`; eyebrow labels in `ember-800`; links hover to `ember-600`.
   - On the ember hero / Ink: text in `cream-50`/`cream-100`; eyebrows, active nav and highlights in `gold-400`.
   - **Never gold text on cream** (the guide's rule, and it fails contrast). Never `ember-500` for text smaller than ~24px on cream; use `ember-600` or `ember-800`.
4. **Buttons:** on cream, the primary CTA is `ember-600` with cream text ("Ember for calls to action"). On dark surfaces it's `gold-400` with Ink text. One primary action per section. Secondary is an outline in the surface's foreground colour.
5. **Focus rings:** `ember-500` on cream, `gold-400` on dark surfaces, so they're always visible.

## Logo

The logo files are in `public/brand/` and `app/` (favicons). Use them as supplied and **never recolour** (Brand Guide p.5):

- **Gold wordmark** (`wordmark-gold*.png`): header and footer (gold on Ink) and the Home hero title (gold on Ember). Both are approved pairings.
- **Accent icon** (Ember icon on Sun Gold): favicon and home-screen icon (`app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`).
- **Primary icon** (gold icon, Deep Ember diamond, on Ember): footer, beside the copyright line.
- **Link preview** (`public/og.png`): the gold wordmark on Ember Red.

Minimum icon size is 24px on screen; keep one diamond height of clear space on every side.

# Buttons

Component: [`components/Button.tsx`](../../components/Button.tsx).

## Variants

- **Primary** (`variant="primary"`): `bg-gold-500 text-navy-900`, hover `bg-gold-400`. The one high-emphasis action on a section. Never more than one primary button visible at a time within a section, per the brand-voice rule of one idea/one action per screen.
- **Secondary** (`variant="secondary"`): outline in the current surface's foreground color (`border-navy-900 text-navy-900` on cream, `border-cream-50 text-cream-50` on navy), transparent fill. For a supporting action alongside a primary (e.g. hero's "Join the journey" primary + "Follow the shoot" secondary).
- **Ghost / link** (`variant="ghost"`): no border or fill, underline on hover. For low-emphasis inline actions (e.g. "Read more" on a journal card).

## Shape and sizing

- `rounded-pill`, `px-6 py-3`, `text-sm font-semibold uppercase tracking-wide`, `whitespace-nowrap`: a pill label must never wrap ("BUY / TICKETS" reads as broken). If a button doesn't fit on a small phone, give it a wider row rather than letting the label break (see `ScreeningCard`).
- Optional trailing arrow icon (`showArrow` prop) — the one structural device deliberately reused from Black Market's CTA buttons ("CLAIM YOUR SEAT IN HISTORY →"), because a directional cue on the primary action is a good pattern independent of tone.
- Minimum tap target 44×44px (mobile-first accessibility). Solid buttons are 44px tall by their padding. Ghost buttons and other small standalone text links (≈20px of text) use the **`hit-area`** utility (`app/globals.css`): an invisible `::after` that extends the tappable area 12px above and below and 8px to each side, so the target is ~44px without changing the layout. Don't use it on links in running text, or on links stacked closer than 12px apart (their areas would overlap); pad those instead, as the footer does.

## States

Hover, focus-visible (2px `gold-500` ring, always visible — never `outline-none` without a replacement), disabled (50% opacity, no pointer events), loading (spinner replaces label, used by `NewsletterForm`'s submit button).

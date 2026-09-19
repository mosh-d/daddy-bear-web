# Navigation

Components: [`components/NavBar.tsx`](../../components/NavBar.tsx), [`components/NavLinks.tsx`](../../components/NavLinks.tsx), [`components/MobileMenu.tsx`](../../components/MobileMenu.tsx), [`components/Footer.tsx`](../../components/Footer.tsx). The link list itself is in [`lib/navigation.ts`](../../lib/navigation.ts), shared by both header layouts.

## Header

Sticky, `bg-navy-900`, slim (`py-3`, ~53px) — mirrors Black Market's minimal sticky header pattern (logo + a handful of text links, no clutter) but restrained to the brand palette. Nav: wordmark (links home) + **The Film / Screenings / Journal / About**. No Shop link: the shop is out of scope, and dead nav links actively hurt trust.

- **`md` (768px) and up:** the four links sit inline to the right of the wordmark (`NavLinks`).
- **Below `md`:** a burger button (`MobileMenu`). An earlier version of this doc argued against a hamburger for only four links; the team chose one (September 2026) because the inline row no longer fit a 320px phone and every link was a sub-24px tap target. The menu keeps the cost of that extra tap low by being quick and roomy, and it earns its keep by also carrying the join-the-list action.

Active state, both layouts: the current section's link shows in `gold-400`, the same as hover, with `aria-current="page"`. It stays active on sub-pages (a Journal post keeps **Journal** lit; `/screenings/host` keeps **Screenings**). Nothing is lit on Home, since the wordmark is its link.

## Mobile menu

Tapping the burger (which becomes an X) drops a solid navy panel from under the header, over the page, which dims behind it:

- The four links in Fraunces 600 at `text-xl` (20px), one per row with a hairline divider and a quiet arrow: ~52px tall rows, easy to hit one-handed without dominating a small screen.
- **Host a screening** as a small secondary link, then the one primary action, **Join the list** (to `/#join`), and the WhatsApp Channel button when configured.

Behaviour: opens and closes in ~200ms (fade + 8px slide, `ease-out`; instant under reduced motion). While it's open the page behind doesn't scroll and is `inert`, so keyboard focus can't wander behind the menu. It closes when you tap a link, the X, or the dimmed page; press Escape (focus returns to the burger); change route; or widen the window past `md`. On a short landscape phone the panel scrolls within itself. The burger is a 44×44 target and exposes `aria-expanded`/`aria-controls`.

## Footer

`bg-navy-950`, contains: wordmark, one-line mission restatement, newsletter form, WhatsApp channel CTA, WhatsApp click-to-chat, a footer link list (including Host a screening, which isn't in the header), social links (to add once Cardinal provides handles), and a link back to **cardinalstudio.ng** — the brief requires the two sites to cross-link ("cardinalstudio.ng remains the company's home and links to the brand site prominently. The two are connected, not merged"), so daddybear.ng must return the favor from every page.

The footer links wrap onto several rows on a phone, so each is padded to ~41px tall rather than using `hit-area` (enlarged areas on stacked rows would overlap).

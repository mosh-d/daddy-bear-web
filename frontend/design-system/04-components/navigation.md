# Navigation

Components: [`components/NavBar.tsx`](../../components/NavBar.tsx), [`components/Footer.tsx`](../../components/Footer.tsx).

## Header

Sticky, `bg-navy-900`, slim (`py-3`) — mirrors Black Market's minimal sticky header pattern (logo + a handful of text links, no clutter) but restrained to the brand palette. Phase 1 nav: wordmark (links home) + **The Film / Journal / About**. No Screenings/Shop links until those routes exist in Phase 2 — brief's "structure open to your judgement" note, and dead nav links actively hurt trust on a first-impression holding site.

Mobile: same flat link row (only 3 items), wraps or scales down `text-xs` before it needs a hamburger — a hamburger menu is unnecessary complexity for this few links and would cost an extra tap on the exact "join the list" action the brief prioritizes above all else.

## Footer

`bg-navy-950`, contains: wordmark, one-line mission restatement, newsletter mini-form, WhatsApp channel CTA, social links (placeholder until Cardinal provides handles), and a link back to **cardinalstudio.ng** — the brief requires the two sites to cross-link ("cardinalstudio.ng remains the company's home and links to the brand site prominently. The two are connected, not merged"), so daddybear.ng must return the favor from every page.

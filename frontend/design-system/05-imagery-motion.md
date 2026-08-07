# Imagery & motion

## Photography

- Real people, real light — production stills, behind-the-scenes phone photos from set, family/community photography. Warm color grading, not the high-contrast black-and-white studio headshots Black Market uses for its cast grid.
- Every image ships through `next/image` for automatic sizing/format/lazy-loading — this is a hard requirement, not a preference, given the brief's "light pages, fast on weak connections" mandate. No raw `<img>` tags.
- Until Cardinal delivers real photography, pages use clearly-labeled placeholder blocks (a solid `cream-200`/`navy-700` panel with a caption noting what will go there) rather than stock photography — a labeled gap reads as "in progress," a stock photo reads as "finished and wrong."

## Motion

- Subtle and functional only: fade/slide-in on scroll for section entrances (small, ~150–250ms, `ease-out`), hover states on buttons/links, no parallax, no auto-playing carousels, nothing that competes with a countdown-style urgency device.
- Respect `prefers-reduced-motion` — disable entrance animation for users who request it.
- No motion should delay content becoming visible or interactive; this is a conversion site on slow connections first.

## Icons

- Hand-rolled minimal inline SVGs for the small fixed set the site needs (WhatsApp, arrow, chevron) rather than an icon library dependency — keeps bundle size down per the mobile-first non-negotiable. Revisit if Phase 2's larger surface area (admin dashboard, shop) makes a proper icon set worth the weight.

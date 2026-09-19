# Imagery & motion

## Photography

- Real people, real light — production stills, behind-the-scenes phone photos from set, family/community photography. Warm color grading, not the high-contrast black-and-white studio headshots Black Market uses for its cast grid.
- The site is a static export with no image server (`images.unoptimized: true`), so **images must be compressed and sized before they're committed**: WebP, 1600px wide for full-width use, quality ~70, under ~200KB (see `CONTENT.md`). `next/image` is still used everywhere a size is known, for lazy-loading and reserved space (width/height or `fill` in a sized box), so nothing shifts as images arrive. The one exception is a plain markdown image in a Journal post, whose size isn't known: it renders as a lazy `<img>`, and `<Figure>` is preferred.
- Video is click-to-load (`components/VideoEmbed.tsx`): a ~20KB thumbnail and a play button until tapped, never YouTube's ~1MB player on page load. The 16:9 box is reserved either way.
- Until Cardinal delivers real photography, pages use clearly-labeled placeholder blocks (a solid `cream-200`/`navy-700` panel with a caption noting what will go there) rather than stock photography — a labeled gap reads as "in progress," a stock photo reads as "finished and wrong."

## Motion

- Subtle and functional only: fade/slide-in on scroll for section entrances (small, ~150–250ms, `ease-out`), hover states on buttons/links, no parallax, no auto-playing carousels. The Home countdown (see `00-brand-voice.md`) is the one element allowed to visibly change on its own — its numerals tick quietly once a second, nothing about it flashes or competes for attention.
- Respect `prefers-reduced-motion` — disable entrance animation for users who request it.
- No motion should delay content becoming visible or interactive; this is a conversion site on slow connections first.

## Icons

- Hand-rolled minimal inline SVGs for the small fixed set the site needs (WhatsApp, arrow, chevron, play) rather than an icon library dependency — keeps bundle size down per the mobile-first non-negotiable.

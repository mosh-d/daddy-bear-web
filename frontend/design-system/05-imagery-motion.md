# Imagery & motion

## Photography

- Real people, real light — production stills, behind-the-scenes phone photos from set, family/community photography. Warm color grading, not the high-contrast black-and-white studio headshots Black Market uses for its cast grid.
- The site is a static export with no image server (`images.unoptimized: true`), so **images must be compressed and sized before they're committed**: WebP, 1600px wide for full-width use, quality ~70, under ~200KB (see `CONTENT.md`). `next/image` is still used everywhere a size is known, for lazy-loading and reserved space (width/height or `fill` in a sized box), so nothing shifts as images arrive. The one exception is a plain markdown image in a Journal post, whose size isn't known: it renders as a lazy `<img>`, and `<Figure>` is preferred.
- Video is click-to-load (`components/VideoEmbed.tsx`): a ~20KB thumbnail and a play button until tapped, never YouTube's ~1MB player on page load. The 16:9 box is reserved either way.
- Until Cardinal delivers real photography, pages use clearly-labeled placeholder blocks (a solid `cream-200`/`navy-700` panel with a caption noting what will go there) rather than stock photography — a labeled gap reads as "in progress," a stock photo reads as "finished and wrong."

## Motion

Motion is **confident but quiet**: things arrive, they don't perform. The test is the brand-voice one — if an effect would suit a record-breaking stunt, it's wrong here. Everything below is CSS (tokens in `tokens.css`, keyframes and rules in `app/globals.css`), so it costs no JavaScript and stays smooth on a cheap Android phone.

**One easing, few durations.** `--ease-soft` (`cubic-bezier(0.16, 1, 0.3, 1)`) decelerates and settles, never bounces. Entrances 550ms, interface responses 200–300ms. Only `opacity` and `translate`/`scale` are animated, so the compositor does the work and nothing triggers layout.

### Entrances

- **Above the fold:** the first section of a page rises and fades in on load (`.reveal`), its eyebrow label a beat ahead of the content (`.reveal-late`, +140ms). This also runs on client-side navigation, where the elements are new, so moving between pages feels like arriving somewhere.
- **Below the fold:** the same movement, driven by scroll position rather than time (`animation-timeline: view()`), so a section arrives as you reach it rather than on a timer you can't see. Browsers without scroll-driven animations simply show the content — it's visible by default and these rules only animate it, so nothing can be left stranded invisible.
- **Lists** (screening results) fade in when the filters change, so a changed list reads as an answer to the tap.

### Interactions

- **Buttons** lift 2px with a soft shadow under the cursor, press down 1px when tapped, and their trailing arrow nudges forward. Solid buttons never change size, so nothing reflows.
- **Cards** (journal, screenings, mission) lift 4px with a shadow; a journal cover zooms slowly (500ms) inside its frame; a screening's date block deepens.
- **Links** grow an underline from the left (`underline-grow`) rather than blinking one on. Drawn as a pseudo-element so a component's own `transition-*` utility can't override it.
- **The mobile menu** fades and slides 8px from under the header in 200ms, its links following one after another 45ms apart. The burger rotates as it becomes an X.
- **The countdown** is the one thing that moves on its own: each digit fades up as it changes. Quiet by design — see `00-brand-voice.md` for why a countdown is allowed here at all.
- **Anchor jumps** (the menu's "Join the list" to `#join`) glide via `scroll-behavior: smooth`.

### Rules

- **`prefers-reduced-motion` turns all of it off**, including smooth scrolling. Entrance rules sit inside a `no-preference` query, so they never even apply; everything else is collapsed to ~0ms.
- **No motion may delay content.** Nothing is hidden waiting on JavaScript, nothing fades in over an already-visible paragraph, and no animation runs longer than the time it takes to read what's arriving.
- **No parallax, no auto-playing carousels, no scroll-jacking**, and never motion on something a person is reading.

## Icons

- Hand-rolled minimal inline SVGs for the small fixed set the site needs (WhatsApp, arrow, chevron, play) rather than an icon library dependency — keeps bundle size down per the mobile-first non-negotiable.

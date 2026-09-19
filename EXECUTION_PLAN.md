# Daddy Bear Website — Execution Plan

Cardinal Productions Limited · Built against the build brief in `../CLAUDE.md`, which is the source of truth for scope, stack and integrations. Where this plan and the brief disagree, the brief wins and this plan gets corrected.

**Status date: 2026-09-19 (Friday).** Principal photography started 15 August 2026. The November screening circuit is the next hard date, and the site must be selling tickets well before it opens. All dates below are absolute, not relative, so this plan stays correct if picked up later.

---

## What changed on 2026-09-19, and why

The first version of this plan (7 August) was written against the original proposal: Vercel, a Sanity CMS, Brevo through a Next.js API route, Plausible, and a NestJS/PostgreSQL backend with a shop and admin dashboard in Phase 2. The build brief replaces that with a **fully static, backend-free site**, and the golden rules are strict enough that the Phase 1 code has to be reworked before anything new goes on top of it.

| Concern | Old plan (7 Aug) | Brief (now) |
|---|---|---|
| Rendering | SSR/SSG + ISR (`revalidate`) | Static export only (`output: "export"`). No SSR, API routes, middleware or ISR |
| Hosting | Vercel (app) + Cloudflare (DNS) | Cloudflare Pages, serving the `out/` folder |
| Images | Next.js image server | `images.unoptimized: true`; ship pre-compressed WebP/AVIF, lazy-load below the fold |
| Journal | Sanity.io, posted from a phone | Local MDX files in `content/journal/`, edited by the developer and deployed on push |
| Newsletter | Brevo via `/api/newsletter` | Kit's hosted form endpoint, posted from the browser (no endpoint of our own) |
| Analytics | Plausible | Cloudflare Web Analytics (cookie-free) or GA4, whichever is set in env |
| Screenings & tickets | Phase 2, on the NestJS backend | **In scope now.** Local `content/screenings.json`; "Buy tickets" links out to Tix Africa |
| Host-a-screening form | Phase 2, on the backend | Tally iframe embed |
| WhatsApp | Channel link only | Channel link + click-to-chat + share buttons on Journal posts and screenings |
| Shop, payments, social wall, admin, accounts | Phase 2 | **Out of scope for this version.** Not built. |
| `backend/` folder | Reserved for NestJS | Removed. There is no backend. |

**Consequence for the old "posted from a phone, without a developer" goal:** with no CMS, a new Journal post is a new file plus a push. `frontend/CONTENT.md` documents the exact steps so this stays a five-minute job for the developer.

---

## Architecture (the golden rules, applied)

1. **Static export.** `next build` writes plain HTML/CSS/JS to `frontend/out/`. Every route, including each Journal post, is generated at build time (`generateStaticParams` + `dynamicParams = false`).
2. **No server code.** Every dynamic behaviour goes to a third party: Kit (newsletter), Tally (host applications), Tix Africa (tickets), WhatsApp (channel/chat/share), Cloudflare/GA4 (analytics).
3. **Content is files.** `content/screenings.json`, `content/journal/*.mdx`, `content/film.ts`, `content/home.ts`. Each is validated with Zod at build time, so a typo fails the build instead of shipping a broken page.
4. **Time-sensitive UI is decided in the browser.** A static page can be days old, so "is this screening past?" and "what's the next screening?" are decided against today's date in Lagos on the visitor's device. The build-time date is only the first paint.
5. **Mobile-first and light.** Third-party scripts load after the page is interactive. Embeds reserve their space. Video embeds are click-to-load (a thumbnail, not an iframe, until tapped). A page-weight budget check runs after every build and fails it if a page's initial load is over budget.

---

## Where the code stands (audit, 2026-09-19)

*Everything in this audit was addressed in the same day's build (M1–M3 below). It's kept as the record of why the rework happened.*

**Keep as-is:** design system (`frontend/design-system/`), `Section`, `Container`, `Card`, `Badge`, `Button`, `Input`, `Icons`, `WhatsAppCTA`, `Countdown`, the About/Film/Journal page shells, and the React Hook Form + Zod pattern.

**Rework (violates the brief):**
- `app/api/newsletter/route.ts` + `lib/brevo.ts`: API route, which a static export can't have. Replace with a direct Kit form post.
- `lib/sanity.ts`, `@sanity/client`, `@portabletext/react`, `content/journal-sample.ts`: replace with local MDX.
- `export const revalidate = 60` on the Journal routes: ISR, not allowed. `/journal/[slug]` also needs `generateStaticParams`.
- Plausible script in `app/layout.tsx`: replace with Cloudflare Web Analytics / GA4.
- `next.config.ts`: add `output: "export"` and `images.unoptimized`.

**Bugs found:**
- Both newsletter forms on Home (the "Join" section and the footer) render `<input id="email">`. The duplicate IDs mean the second label focuses the first form's field. Fix with per-instance IDs.
- Home and Film copy still says principal photography "begins 15 August 2026", which is now in the past. The Home countdown has been stuck on its "arrived" message since 15 August.
- Journal dates are formatted in the viewer's local timezone, so a date-only value (`2026-08-15`) shows as the previous day for anyone west of UTC.
- A fourth nav item will overflow the header on a 360px phone unless the header can wrap.

**Missing (required by the brief):** `/screenings`, `/screenings/host`, Tix Africa links with UTM tags, WhatsApp click-to-chat and share, next screening on Home, a season-swappable Home CTA, the `content/film.ts` model (trailer, synopsis, cast, world), room for press/partners on About, `CONTENT.md`, Cloudflare Pages config, page-weight budget, `sitemap.xml`/`robots.txt`, a branded 404.

---

## Build sequence

| # | Milestone | Target date | Scope | Owner | Status |
|---|---|---|---|---|---|
| M1 | Static foundation | Mon 21 Sep | Static export config; remove API route/Brevo/Sanity; MDX Journal with Zod-validated frontmatter; Kit newsletter form (with optional name, inline success/error, no reload); analytics component; duplicate-ID fix; date-format fix | dev | **Code complete 19 Sep** |
| M2 | Screenings & hosting | Fri 25 Sep | `content/screenings.json`; `/screenings` with client-side city/month filters and "show past" toggle; Tix Africa buttons with UTM tags, or "sold at the door"; `/screenings/host` with Tally embed; WhatsApp share on screenings and posts; click-to-chat where relevant; Screenings in the nav | dev | **Code complete 19 Sep** |
| M3 | Home, Film, About | Wed 30 Sep | Home rebuilt to the brief (film paragraph, mission, next screening with countdown, one seasonal CTA, newsletter); `content/film.ts` + Film page (click-to-load trailer, synopsis, cast, world of the film); About press & partners section | dev | **Code complete 19 Sep** (placeholder copy) |
| M4 | Performance & QA | Fri 9 Oct | Page-weight budget in the build; image guidance for real photography (WebP, sized); `_headers` caching for hashed assets; OG share image for WhatsApp previews; real-device QA on throttled 3G incl. WhatsApp/Instagram in-app browsers | dev + Cardinal | Budget, `_headers`, image guidance done. OG image waits on artwork; device QA waits on real content. |
| M5 | Launch on Cloudflare Pages | Fri 16 Oct | Cloudflare Pages project (root `frontend`, build `npm run build`, output `out`); env vars set; `daddybear.ng` attached as custom domain; analytics verified firing; real screenings and Tix Africa links loaded | Cardinal (accounts) + dev | Waiting on accounts |
| — | **November circuit opens** | November 2026 | Screenings updated by editing `content/screenings.json` and pushing | dev | |

M1–M3 are code the dev team controls. M4–M5 depend on Cardinal's accounts and assets (below).

### Notes from the 19 September build
- **Page weight.** Pages went from ~395KB to ~280KB initial load (gzipped). Full Zod in the footer form cost ~55KB of JS on every page, so it now uses Zod Mini. Fraunces now loads as two single-weight files, with the italic only on pages that use it (128KB → 65KB of fonts). The remaining ~165KB of JS is React plus the Next.js router, the floor for a Next.js App Router site. The build now fails if a page goes over 300KB total or 215KB of JS.
- **Newsletter before JavaScript loads.** On 3G the form is visible seconds before it's interactive. A submit in that gap used to reload the page with the email address in the URL, where analytics would record it. The form now posts natively to Kit in that window.
- **Windows build quirk.** Next.js 16's static export writes the client router's prefetch files under the wrong names when built on Windows, so every prefetch 404s. `scripts/fix-segment-paths.mjs` corrects this after each build. Cloudflare's Linux builds aren't affected, and the script does nothing there. Remove it once Next.js fixes the exporter.
- **Navigation and responsiveness.** Below 768px the header uses a burger menu, because four inline links no longer fit a 320px phone. The site is checked at 320, 360, 390, 414, 768, 1024, 1280 and 1536px: no sideways scrolling, no wrapped button labels, and 44px tap targets throughout (see `design-system/03-spacing-layout.md`).
- **Verified in a browser at 360px and 1280px:** all routes render with no console errors or failed requests and no horizontal overflow. Filters, the show-past toggle and UTM-tagged ticket links work. Past screenings drop off the list and Home's next screening advances as the date passes (tested with a simulated clock). Newsletter validation and error states work inline.

### What Cardinal needs to provide (blocks M4/M5)
1. **Kit** account + a form created in Kit; its form ID or action URL → `NEXT_PUBLIC_KIT_FORM_ACTION`. Decide whether double opt-in stays on (Kit's default).
2. **Tally** form with the fields from the brief (organisation name, organisation type: mosque / school / community centre, contact name, email, phone or WhatsApp, city, preferred dates, notes) → `NEXT_PUBLIC_TALLY_FORM_ID`.
3. **WhatsApp** Channel invite link → `NEXT_PUBLIC_WHATSAPP_CHANNEL_URL`, and the business number for click-to-chat → `NEXT_PUBLIC_WHATSAPP_NUMBER`.
4. **Analytics:** recommend **Cloudflare Web Analytics**. It's cookie-free, so no consent banner is needed under the NDPA. GA4 is supported but sets cookies and arguably needs consent. Provide the token or measurement ID.
5. **Screening list** for the November circuit: city, venue, address, date, time, and each screening's Tix Africa event link.
6. **Film content:** trailer (YouTube link), synopsis, cast names/roles/photos, "world of the film" copy and stills.
7. **About copy:** the full origin story (three women, the grant, the mission) and team credits.
8. **Photography + a 1200×630 share image** for WhatsApp/social link previews.
9. **Cloudflare account access** for the Pages project and custom domain.

### Before go-live checklist
- Replace the sample screenings (`id`s starting `sample-`) and sample Journal posts with real content.
- All env vars set in Cloudflare Pages → Settings → Environment variables (they are baked in at build time, so a change needs a redeploy).
- Test signup creates a subscriber in Kit; test Tally submission arrives; tap every WhatsApp link on a real phone.
- `npm run build` passes (including the page-weight budget).

---

## Out of scope for this version
Shop / merch, payments, social wall, authentication, user accounts, admin dashboard, any backend or database, WhatsApp Business API. `shop.daddybear.ng` and `tickets.daddybear.ng` will later be DNS-level redirects (Cloudflare redirect rules) onto paths in this one app, not separate apps. The Home CTA is built to swap to "buy a gift" when a shop link exists.

## After launch
Monthly management retainer (per the proposal): Journal and screening updates by file edit + push, seasonal Home CTA swaps (join → tickets → gifts), campaign pages (December, then Ramadan/Eid 2027), quarterly review.

---

## Phase 1 history (7–15 August 2026)
The holding site (Home, Film stub, About, Journal, newsletter + WhatsApp capture) was built against the original proposal's stack, plus a countdown to principal photography. That code is the starting point for M1. The design system and components carry over unchanged. The data layer and hosting are what change.

---

## Design system

Lives in code at `frontend/design-system/`: a token source file plus category docs (voice, color, typography, spacing, components, imagery/motion). It borrows the *structural* patterns of blackmarketmovie.com (full-bleed color-blocked sections, one CTA per section, pill-style credit badges). It rejects that site's *tonal* register (loud street-marketing color and urgency) in favour of the brief's navy/cream/gold restraint.

---

## Repository structure

```
daddy-bear-web/            (git repo root)
  frontend/                 Next.js static site, deployed to Cloudflare Pages (root directory: frontend)
    content/                screenings.json, journal/*.mdx, film.ts, home.ts (see CONTENT.md)
    CONTENT.md              how to add a screening or a Journal post
  EXECUTION_PLAN.md          this file
```

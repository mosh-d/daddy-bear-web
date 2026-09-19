# Daddy Bear website

A fully static Next.js site (TypeScript, App Router, Tailwind CSS v4), exported to plain HTML/CSS/JS and hosted on Cloudflare Pages. There is no backend: the newsletter, host-a-screening form, tickets, WhatsApp and analytics are all third-party services. See `../CLAUDE.md` for the build brief, `../EXECUTION_PLAN.md` for the schedule, `design-system/` for tokens, voice and component rules, and **`CONTENT.md` for adding screenings and Journal posts**.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything degrades gracefully when unset
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs with no env vars at all: sample screenings and Journal posts, a newsletter form that logs to the console, and WhatsApp/Tally/analytics hidden until configured.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Static export to `out/`, then the page-weight budget check (fails if a page is too heavy) |
| `npm run preview` | Serves `out/` locally, with the same clean URLs as Cloudflare Pages |
| `npm run lint` | ESLint |

## Deploying to Cloudflare Pages

1. Cloudflare dashboard → Workers & Pages → Create → Pages → **Connect to Git** → this repo.
2. Build settings:
   - **Framework preset: None.** Not "Next.js": that preset expects a server build, and this site is a static export.
   - **Root directory:** `frontend`
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - Node version comes from `.node-version` (22).
3. Settings → Environment variables: add everything from `.env.example` for Production (and Preview if wanted). These are baked in at build time, so **redeploy after changing one**.
4. Custom domains → add `daddybear.ng` (and `www.daddybear.ng`). The domain's DNS must be on Cloudflare.
5. Cloudflare Web Analytics can be switched on for the Pages project without any code. If you do that, leave `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` unset so the beacon doesn't load twice.

Every push to `main` deploys. `public/_headers` sets long-lived caching for fingerprinted assets and basic security headers.

`shop.daddybear.ng` and `tickets.daddybear.ng`, when needed, are Cloudflare redirect rules onto paths of this site (e.g. `tickets.` → `https://daddybear.ng/screenings`), not separate apps.

## Third-party accounts

| Service | Used for | Env var |
|---|---|---|
| **Kit** | Newsletter. Create a form in Kit; its ID is in the embed code (`app.kit.com/forms/<ID>/subscriptions`). The site posts to it directly from the browser. Double opt-in is Kit's default: subscribers confirm by email. | `NEXT_PUBLIC_KIT_FORM_ACTION` |
| **Tally** | Host-a-screening application, embedded on `/screenings/host`. Fields: organisation name, organisation type (mosque / school / community centre), contact name, email, phone or WhatsApp, city, preferred dates, notes. | `NEXT_PUBLIC_TALLY_FORM_ID` |
| **WhatsApp** | Channel link (footer, Home), click-to-chat (host page, screenings, About, footer), share buttons (posts, screenings). | `NEXT_PUBLIC_WHATSAPP_CHANNEL_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| **Tix Africa** | Ticket sales. No key: each screening's event link lives in `content/screenings.json`. Links get `utm_*` tags automatically so click-throughs are attributable. | none |
| **Cloudflare Web Analytics** (recommended, cookie-free) or **GA4** | Page views. With GA4, outbound clicks to Tix Africa are recorded by Enhanced Measurement, with the screening id in `utm_content`. | `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` / `NEXT_PUBLIC_GA4_ID` |

## Project structure

```
app/            routes: /, /film, /screenings, /screenings/host, /journal, /journal/[slug], /about, 404, sitemap, robots
components/     shared UI built against design-system/ tokens
content/        everything editable: screenings.json, journal/*.mdx, film.ts, home.ts (see CONTENT.md)
design-system/  tokens.css (Tailwind theme source), tokens.ts (JS mirror), and category docs
lib/            content loaders (validated at build), date helpers, Kit client, site config and link builders
scripts/        post-build steps: page-weight budget, Windows segment-path fix
mdx-components.tsx  how Journal markdown renders, plus the <Figure> and <Video> post components
```

## Rules this build keeps

- **Static only.** No API routes, server actions, middleware, ISR (`revalidate`) or on-demand rendering. Dynamic routes use `generateStaticParams` with `dynamicParams = false`.
- **Anything date-sensitive is decided in the browser**, because the HTML may be days old (see `lib/use-today.ts`).
- **Third-party scripts load after the page is interactive** (`afterInteractive` / `lazyOnload`), and embeds reserve their space.
- **Page-weight budget** (`scripts/check-budget.mjs`): the build fails if a page's initial load goes over the limit. See CONTENT.md for the baseline.

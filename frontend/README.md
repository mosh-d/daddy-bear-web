# Daddy Bear — website (Phase 1)

Next.js (TypeScript, App Router, Tailwind CSS v4). See `../EXECUTION_PLAN.md` for the full project roadmap and `design-system/` for the design tokens, voice and component rules this build follows.

This is one of two independently-deployed apps in this repo — see `../EXECUTION_PLAN.md#repository-structure`. This one deploys to Vercel; `../backend` (empty until Phase 2) will deploy to Render.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in what you have — everything degrades gracefully when unset
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs out of the box with placeholder Journal content and a newsletter form that logs to the console — nothing below is required just to see the site.

## Account setup checklist (Day 0 of the execution plan)

These are the accounts a human needs to create — this codebase is already wired to use them the moment the env vars are set (see `.env.example`).

1. **Domain** — register `daddybear.ng` (primary) and `daddybear.com.ng` (defensive) through a NiRA-accredited registrar, then point DNS at Vercel/Cloudflare.
2. **Vercel** — create a project, connect this repo, set the project's **Root Directory to `frontend`** (this repo also contains `backend/` for Phase 2), deploy. Set all `.env.example` vars in Project Settings → Environment Variables.
3. **Cloudflare** — add the domain, proxy DNS through it for edge caching.
4. **Sanity.io** (Journal, free tier) — create a project at sanity.io, note the Project ID, set `NEXT_PUBLIC_SANITY_PROJECT_ID`. Create a `journalEntry` document type with fields: `title` (string), `slug` (slug, source: title), `date` (datetime), `excerpt` (text), `body` (portable text / block content), `tag` (string), `image` (image, with an `alt` field). The team posts updates from a phone via Sanity's mobile-friendly Studio (studio.sanity.io) or a deployed Studio URL — no separate login system to build.
5. **Brevo** (newsletter, free tier) — create an account, generate an API key (Settings → API Keys), set `BREVO_API_KEY`. Optionally create a dedicated list and set `BREVO_LIST_ID`. Configure the welcome email sequence in Brevo's automation UI.
6. **Plausible** (analytics) — add the site at plausible.io, set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to the registered domain.
7. **WhatsApp Channel** — Cardinal creates the channel in WhatsApp, copies the invite link, sets `NEXT_PUBLIC_WHATSAPP_CHANNEL_URL`. The "Join our WhatsApp channel" button is hidden anywhere this isn't set, rather than shipping a dead link.

## Project structure

```
app/            routes (Home, /film, /about, /journal, /journal/[slug], /api/newsletter)
components/     shared UI built against design-system/ tokens
design-system/  tokens.css (Tailwind theme source), tokens.ts (JS mirror), and category docs
lib/            Sanity client + Journal data access, Brevo helper, shared Zod schema
content/        placeholder Journal entries used until Sanity is configured
```

## Verifying changes

```bash
npm run lint
npm run build
```

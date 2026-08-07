# Daddy Bear Website — Execution Plan

Cardinal Productions Limited · Prepared against the Design and Management Brief and the accepted Website Proposal.

**Status date: 2026-08-07.** Phase 1 must be live by **15 August 2026** (principal photography start) — 8 days from today. All dates below are absolute, not relative, so this plan stays correct if picked up later.

---

## Why this document exists

The brief sets four jobs the site must do, in order: build the audience, sell tickets, sell the products, keep the story running. The proposal sets the stack and a three-phase roadmap against two hard dates (15 August for Phase 1, the November screening circuit and December gifting window for Phase 2). This document turns that into an executable schedule, starting with Phase 1.

---

## Phase 1 — Live before the shoot (target: 15 August 2026)

**Goal:** a small, fast holding site — the brand, the mission, the film in one paragraph — with newsletter and WhatsApp capture on every page, and the Journal live so the audience follows the shoot from day one.

### Pages in scope
Home (holding) · The Film (stub) · About & Mission · Journal (list + entry, phone-postable) · Newsletter + WhatsApp capture (persistent component, not a separate page).

**Explicitly out of scope for Phase 1:** Screenings & Tickets, Shop, payments, admin dashboard, social wall, WhatsApp Business API. These are Phase 2 (see below) — no dead nav links to them in Phase 1; add them to the nav when they ship.

### Stack (Phase 1 subset of the proposal's full stack)

| Concern | Choice | Why |
|---|---|---|
| Frontend | Next.js (TypeScript, App Router) + Tailwind CSS | Fast on 3G via SSR/SSG, built-in image optimization; matches accepted proposal |
| Forms/validation | React Hook Form + Zod | Light on low-end phones; matches proposal |
| Hosting | Vercel (app) + Cloudflare (DNS/edge) | Matches proposal |
| Journal content | Sanity.io (free tier) | Needs to be postable "from a phone, without a developer" *now* — the custom NestJS admin dashboard that would otherwise do this is priced and scheduled as Phase 2 work. Sanity's mobile Studio fills the gap at zero cost and integrates cleanly with the Phase 2 backend later. |
| Newsletter | Brevo (free tier) | Exportable list = owned audience, per the brief's non-negotiable |
| WhatsApp | Static "Join our WhatsApp Channel" link | Business API (order confirmations) is Phase 2/3 |
| Analytics | Plausible | Cookieless, no consent-banner build needed — supports NDPA compliance without eating into the 8-day build |
| Domains | daddybear.ng (primary), daddybear.com.ng (defensive) now; daddybearfilm.com optional/deferrable | Per proposal's domain table |

### Day-by-day (Aug 7 → Aug 15)

| Day | Date | Focus | Owner |
|---|---|---|---|
| 0 | Thu 7 Aug (today) | Register domains. Create accounts: GitHub, Vercel, Cloudflare, Sanity, Brevo, Plausible. Scaffold Next.js + Tailwind. First-pass design tokens. | Cardinal (accounts/payment) + dev (scaffold) |
| 1 | Fri 8 Aug | Finish design-system docs. Low-fi mobile wireframes for the 4 pages + capture pattern. Client checkpoint. | dev + Cardinal sign-off |
| 2 | Sat 9 Aug | Core components in code (Button, Input, Section, Nav, Footer, NewsletterForm, WhatsAppCTA, Badge). Home page built end-to-end. | dev |
| 3 | Sun 10 Aug | About & Mission page. Film stub page. Journal list + entry template wired to Sanity. | dev |
| 4 | Mon 11 Aug | Brevo API + welcome sequence. WhatsApp CTA wired. Plausible + baseline goals. Social share/OG cards tuned for WhatsApp previews. | dev |
| 5 | Tue 12 Aug | Real copy/photography from Cardinal dropped in. Visual polish. Performance pass (images, fonts, Lighthouse). | Cardinal (content) + dev |
| 6 | Wed 13 Aug | Real-device QA on throttled 3G/4G, incl. WhatsApp/Instagram in-app browsers. Team training: posting to Journal from a phone. | dev + Cardinal team |
| 7 | Thu 14 Aug | Final sign-off. DNS cutover. shop./tickets. subdomains → "coming soon" anchor. Go-live checklist. | Cardinal + dev |
| — | **Fri 15 Aug** | **Live.** Journal receives first on-set post same day. | — |

### What Cardinal provides (per brief, "What we provide")
Brand identity assets (logo files, any existing photography), copy for Home/About/Film stub, a single decision-maker for same-day approvals, and the WhatsApp Channel already created (dev just needs the invite link).

### What blocks the dev team right now
1. Domain registration (needs Cardinal's payment/registrar access) — the single item most likely to slip if delayed, since availability isn't guaranteed.
2. Brand assets and copy for Day 5.
3. Confirmation the WhatsApp Channel exists (or who creates it).

---

## Phase 2 — The selling site (September → early November 2026)

Carries the whole first season's revenue; dates do not move.

- **September:** NestJS/PostgreSQL backend, admin dashboard, Screenings & Tickets (public + host-a-screening form). Screenings live before the November circuit opens.
- **October:** Shop (catalogue, cart, checkout), Paystack payments across Naira/USD/GBP, multi-currency display, social wall (Curator.io), WhatsApp Business API confirmations, analytics. Shop live and tested well before the December window.
- **Early November:** end-to-end payment testing on real phones, performance pass, go live.

This phase gets its own detailed execution plan once Phase 1 ships, since its scope depends on what's learned from Phase 1 and on Cardinal's marketing/distribution plan being finalized.

## Phase 3 — Forever (November 2026 onward)

Monthly management retainer (Essential / Standard / Growth tiers per the proposal): Journal and screening updates, uptime/backups, seasonal campaign pages (December, then Ramadan/Eid 2027), shop growth, quarterly review.

---

## Design system

A structured design system lives in code at `frontend/design-system/` — token source file plus category docs (voice, color, typography, spacing, components, imagery/motion). See that folder's docs for the full rationale, including how it deliberately borrows the *structural* patterns of blackmarketmovie.com (confident full-bleed color-blocked sections, one CTA per section, pill-style credit badges) while rejecting its *tonal* register (loud street-marketing color/urgency) in favor of the brief's navy/cream/gold restraint.

---

## Repository structure

```
daddy-bear-web/            (git repo root)
  frontend/                 Next.js app — Phase 1 site, deployed to Vercel
  backend/                  reserved for Phase 2's NestJS + PostgreSQL API, deployed to Render
  EXECUTION_PLAN.md          this file
```

Deployed independently (Vercel's root directory set to `frontend`, Render's to `backend` once it exists) from one repo — both hosts support this natively, no monorepo tooling required at this size.

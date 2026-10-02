# Setting up the third-party services

Everything on daddybear.ng that isn't a page — the newsletter, ticket links, the host-a-screening form, WhatsApp, analytics — is handled by an outside service. There is no backend and no database, so there are no server keys to protect: every setting below is a public ID or URL that gets baked into the site when it's built.

Work through this in order. Steps 1–2 get the site live; 3–6 switch on each feature. Nothing breaks while a service is unconfigured: the site simply hides that feature rather than showing a dead link or a broken embed.

**Where settings go.** Two places only:

| Kind of setting | Where | Takes effect |
|---|---|---|
| Service IDs and tokens (WhatsApp, Tally, analytics) | Cloudflare Pages → Settings → **Environment variables** | On the next deployment |
| Public brand links (Substack, socials, contact email) | `frontend/content/links.ts` in the repo | On push |

**Important:** environment variables are read when the site is *built*, not when someone visits. After adding or changing one in Cloudflare, start a new deployment (Deployments → Retry deployment), or the site keeps the old value.

---

## 1. Cloudflare account and the Pages project

**Who:** Cardinal owns the account; the developer can do the setup.
**Time:** ~20 minutes, plus DNS propagation.

1. Create a free account at [dash.cloudflare.com](https://dash.cloudflare.com) (or sign in to Cardinal's).
2. Add the domain **daddybear.ng** to Cloudflare: *Add a site* → enter the domain → Free plan. Cloudflare gives you two nameservers.
3. At the Nigerian registrar where `daddybear.ng` is registered, replace the existing nameservers with Cloudflare's two. This can take a few hours to take effect.
4. In Cloudflare: *Workers & Pages* → **Create** → **Pages** → **Connect to Git** → authorise GitHub → pick the `daddy-bear-web` repository.
5. Build settings — these matter, and the defaults are wrong for this site:

   | Setting | Value |
   |---|---|
   | Framework preset | **None** (not "Next.js": that preset expects a server; this site is a static export) |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Root directory | `frontend` |

6. Click **Save and Deploy**. The first build takes a few minutes. You'll get a `*.pages.dev` address — check the site loads there.
7. *Custom domains* → **Set up a domain** → `daddybear.ng`. Repeat for `www.daddybear.ng` if you want it. Cloudflare adds the DNS records itself.

From here, every push to `main` deploys automatically.

---

## 2. Newsletter: Substack

**Who:** Cardinal (the publication already exists: cardinalproductions.substack.com).
**Time:** ~10 minutes.
**No API key, no account linking.**

The site doesn't collect email addresses itself — Substack doesn't accept signups from other websites, so people subscribe on Substack's own form. Two things point at it: a **Join the list** button in the footer of every page, and Substack's own signup box embedded on the home page.

1. Sign in to Substack and confirm the publication URL is `cardinalproductions.substack.com`. **If it ever changes, update `SUBSTACK_URL` in `frontend/content/links.ts`** — that one line feeds every signup link and the embed.
2. Settings → check that **Embeds** are allowed (on by default) so the box on the home page works.
3. Write the welcome email new subscribers receive (Settings → Emails → Welcome email). This is the first thing the audience gets, so it's worth doing before launch.
4. Decide whether the publication takes paid subscriptions. If it's free only, Settings → turn off paid subscriptions so the signup box doesn't offer payment.

**How to check:** open the home page, tap the signup box, enter an address, confirm it appears in Substack → Subscribers. Signups coming from the website are tagged, so Substack's stats show how many arrived from daddybear.ng.

---

## 3. WhatsApp: channel, chat and sharing

**Who:** Cardinal creates the channel and provides the number.
**Time:** ~15 minutes.
**No API, no Business account needed** — these are ordinary WhatsApp links.

1. **Channel:** in WhatsApp → *Updates* → **+** → *New channel*. Name it Daddy Bear, add the logo and a one-line description.
2. Channel → *Share channel link* → copy it. It looks like `https://whatsapp.com/channel/0029Xxxxxxxx`.
3. **Number for direct chat:** decide which number replies to enquiries (a dedicated SIM or WhatsApp Business app is easier to share among the team than someone's personal line).
4. In Cloudflare Pages → Settings → Environment variables, add:

   ```
   NEXT_PUBLIC_WHATSAPP_CHANNEL_URL = https://whatsapp.com/channel/your-link
   NEXT_PUBLIC_WHATSAPP_NUMBER      = 2348012345678
   ```

   The number goes in international format without `+` or the leading zero. A local `0803…` number is converted automatically, so either works.
5. Redeploy.

**What this switches on:** the "Join our WhatsApp channel" button (hidden until step 4), "Questions? Chat with us" links on the footer, screenings, host and about pages, and "Share on WhatsApp" buttons on every screening and journal post (those work already — they need no number).

**How to check on a phone:** tap the channel button (opens the channel), tap a chat link (opens a chat with your number, message prefilled), tap Share on a screening (opens WhatsApp's "send to…" with the message and link).

---

## 4. Host-a-screening form: Tally

**Who:** Cardinal or the developer.
**Time:** ~20 minutes.
**Free plan is enough.**

1. Create a free account at [tally.so](https://tally.so).
2. New form, titled e.g. "Host a Daddy Bear screening", with these fields (the brief's list):

   | Field | Type | Required |
   |---|---|---|
   | Organisation name | Short answer | Yes |
   | Organisation type | Multiple choice: Mosque / School / Community centre / Other | Yes |
   | Contact name | Short answer | Yes |
   | Email | Email | Yes |
   | Phone or WhatsApp | Phone | Yes |
   | City | Short answer | Yes |
   | Preferred dates | Short answer or date range | Yes |
   | Notes | Long answer | No |

3. Keep it short: every extra question loses applicants on a phone.
4. Form settings → **Notifications** → send submissions to `cardinalproductionsng@gmail.com`, so applications don't sit unseen in Tally.
5. **Publish** the form, then copy its link: `https://tally.so/r/XXXXXX`. The part after `/r/` is the form ID.
6. In Cloudflare Pages → Environment variables:

   ```
   NEXT_PUBLIC_TALLY_FORM_ID = XXXXXX
   ```

   (The full `https://tally.so/r/XXXXXX` link works here too.) Redeploy.

**How to check:** open `/screenings/host`. The form appears in the page. Submit a test entry and confirm the email notification arrives. Until this is set, the page shows "Applications open soon" with a WhatsApp link instead.

---

## 5. Tickets: Tix Africa

**Who:** Cardinal (whoever handles ticket money).
**Time:** ~15 minutes per screening.
**No API key** — each screening simply links out to its event page.

1. Create an organiser account at [tix.africa](https://tix.africa) and complete the payout details, so ticket money reaches Cardinal.
2. For each screening, create an event: title, venue, date, time, ticket types and prices.
3. Publish it and copy the event link (`https://tix.africa/discover/your-event`).
4. Add the screening to `frontend/content/screenings.json`, pasting that link as `ticketUrl` — see **CONTENT.md** for the fields. Paste the plain link; the site adds its own tracking tags so you can see which sales came from the website.
5. For a screening with no online sale, set `"ticketUrl": null` and `"soldAtDoor": true`, and the card reads "Tickets sold at the door".
6. Push. **Delete the sample screenings** (their ids start `sample-`) at the same time.

---

## 6. Analytics

**Who:** Cardinal or the developer. **Pick one.** The published privacy policy names whichever you enable, automatically.

### Recommended: Cloudflare Web Analytics (cookie-free)

No cookies, so no consent banner is needed under the NDPA, and it's free and unlimited.

1. Cloudflare dashboard → *Analytics & Logs* → **Web Analytics** → add `daddybear.ng`.
2. Easiest route: in your Pages project → *Settings* → **Enable Web Analytics**. Cloudflare injects it; leave `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` **unset** so it isn't loaded twice.
3. If you'd rather the site load it, copy the token from the beacon snippet and set `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` instead, then redeploy.

### Alternative: Google Analytics 4

More detail, but it sets cookies, so Cardinal should take a view on consent before using it in Nigeria.

1. [analytics.google.com](https://analytics.google.com) → create a property for daddybear.ng → add a **Web** data stream.
2. Copy the Measurement ID (`G-XXXXXXXXXX`) and set:

   ```
   NEXT_PUBLIC_GA4_ID = G-XXXXXXXXXX
   ```

3. In the data stream, keep **Enhanced measurement** on. It records page views on this site without extra code, and records clicks to Tix Africa as outbound clicks — the link carries `utm_content` with the screening id, so you can tell which screening drove a sale.
4. Redeploy.

**How to check:** open the live site, then look at the service's realtime view for your visit.

---

## 7. Social accounts and contact email

Already live and wired in `frontend/content/links.ts`:

- Instagram `@daddybearfilm` · TikTok `@daddybearfilm` · X `@daddybearfilm` · YouTube `@korayday`
- Contact: `cardinalproductionsng@gmail.com`

Two things to confirm: the **YouTube** link points at `@korayday`, which looks like a personal channel rather than a film account — change it in `links.ts` if there's a Daddy Bear channel. And consider a dedicated address rather than a personal Gmail for press, since it's published on the site.

---

## 8. Later: shop. and tickets. addresses

When needed, these become redirects in Cloudflare, not separate sites: *Rules* → **Redirect Rules** → e.g. hostname equals `tickets.daddybear.ng` → 301 to `https://daddybear.ng/screenings`.

---

## Before launch: the checklist

| # | Check | Done when |
|---|---|---|
| 1 | Site loads on `daddybear.ng` over https | Padlock shows, no certificate warning |
| 2 | Sample screenings replaced with real ones | No id starts `sample-`; the build warning is gone |
| 3 | Sample journal posts replaced or removed | `content/journal/` holds real posts |
| 4 | Newsletter | Test signup appears in Substack |
| 5 | Host form | Test submission arrives by email |
| 6 | Tickets | Every "Buy tickets" opens the right Tix Africa event |
| 7 | WhatsApp | Channel, chat and share links all work **on a real phone** |
| 8 | Analytics | Your visit shows in realtime |
| 9 | Link preview | Paste daddybear.ng into a WhatsApp chat: title, description and image appear |
| 10 | Legal pages | `/privacy` names the analytics you actually enabled |
| 11 | Film content | Trailer, synopsis and cast in `content/film.ts` once delivered |

---

## If something doesn't work

- **A change in Cloudflare did nothing.** Environment variables apply at build time: redeploy.
- **A feature is missing from the live site.** It's hidden because its variable is unset or misspelled. Names are case-sensitive and all begin `NEXT_PUBLIC_`.
- **The build failed.** Read the last lines of the Cloudflare build log. A content mistake names the file and the problem (`content/screenings.json is invalid: "lagos-2026-11-07", date must look like 2026-11-14`). A page-weight failure means something heavy was added — see CONTENT.md.
- **The host form doesn't appear**, usually a blocked script or a strict browser. The page offers "Open it in a new tab" underneath for exactly this case.
- **The WhatsApp button is missing.** `NEXT_PUBLIC_WHATSAPP_CHANNEL_URL` isn't set, or the deploy predates it.
- **Link previews show no image.** Previews are cached per platform; re-share after a deploy, or test with Facebook's Sharing Debugger.

# Updating the site's content

Everything editable lives in `frontend/content/`. Each change is **one file, then a push to `main`**: Cloudflare Pages rebuilds and the change is live in a couple of minutes. There's no CMS and no login.

If you make a mistake in a content file (a missing field, a date in the wrong format, an image that isn't there), **the build fails with a message naming the file and the problem**, and the live site stays as it was. To catch it before pushing, run `npm run build` locally.

---

## Add a screening

Edit `content/screenings.json`. Add one entry to the list:

```json
{
  "id": "lagos-2026-11-07",
  "city": "Lagos",
  "venue": "Community Hall, Surulere",
  "address": "12 Example Street, Surulere, Lagos",
  "date": "2026-11-07",
  "time": "16:00",
  "ticketUrl": "https://tix.africa/discover/your-event",
  "soldAtDoor": false,
  "status": "upcoming"
}
```

| Field | What to put |
|---|---|
| `id` | Unique, lowercase, hyphens only. City + date works well (`abuja-2026-11-14`). It's also the link anchor: `daddybear.ng/screenings#abuja-2026-11-14`. |
| `city` | Shown on the card and in the city filter. Spell a city the same way every time, or it appears twice in the filter. |
| `venue`, `address` | As they should appear on the card. |
| `date` | `YYYY-MM-DD`. |
| `time` | 24-hour `HH:MM`, Lagos time: `16:00`, `18:30`. Shown as "4pm", "6:30pm". |
| `ticketUrl` | The screening's Tix Africa event page, or `null` if there's no online sale. Tracking tags are added automatically; paste the plain link. |
| `soldAtDoor` | `true` shows "Tickets sold at the door" when there's no `ticketUrl`. |
| `status` | `upcoming` or `past`. |

- Order in the file doesn't matter: the site sorts by date.
- **You don't have to mark screenings as past.** The site hides any screening whose date has gone by, on the visitor's phone, even if nobody has edited the file. Set `"status": "past"` to hide one early (e.g. a cancelled date).
- JSON is strict: every entry except the last is followed by a comma, and text goes in double quotes.
- **Before launch:** delete the sample entries (ids starting `sample-`). The build prints a warning while any remain.

## Add a Journal post

Create a new file in `content/journal/`. The file name is the post's URL: `first-day-on-set.mdx` → `daddybear.ng/journal/first-day-on-set`. Lowercase words joined by hyphens.

```mdx
---
title: First day on set
date: 2026-08-15
excerpt: One line for the Journal list and for link previews on WhatsApp.
tag: Production
cover: /journal/first-day-on-set.webp
coverAlt: The crew setting up the first shot in the family living room
---

Write the post here in plain paragraphs. A blank line starts a new paragraph.

## A subheading

**Bold**, _italic_, [a link](https://example.com), lists with `-`, and quotes with `>`.

<Figure src="/journal/first-day-2.webp" alt="Director and cast reading the scene" width={1600} height={1067} caption="Reading the scene before the first take." />

<Video url="https://www.youtube.com/watch?v=VIDEO_ID" title="Behind the scenes, day one" />
```

| Frontmatter | |
|---|---|
| `title`, `date`, `excerpt` | Required. `date` is `YYYY-MM-DD`; add a time (`2026-08-15T18:30`) to order several posts on the same day. Newest shows first. |
| `tag` | Optional label, e.g. Production, Screenings, Announcement. |
| `cover` + `coverAlt` | Optional. A path under `public/`. If you set `cover`, `coverAlt` is required (it describes the image for people using screen readers). Without a cover, the card shows a navy panel. |

**Images.** Put them in `public/journal/` and reference them as `/journal/name.webp`. Before adding one, **resize and compress it**: the site doesn't do this for you, and most readers are on phones on limited data. Use [squoosh.app](https://squoosh.app) (free, in the browser): resize to **1600px wide**, format **WebP**, quality **~70**. Aim for **under 200KB** per image. Use `<Figure>` with the image's real `width`/`height` (Squoosh shows them) so the page doesn't jump while it loads. A plain `![alt](/journal/x.webp)` also works but can't reserve the space.

**Video.** `<Video url="…" title="…" />` takes any YouTube link. Readers see a thumbnail and only download the player if they tap play.

## The Film page

Edit `content/film.ts`: `trailerUrl` (a YouTube link), `synopsis` (one string per paragraph), `cast` (name, role, optional photo under `public/film/`), `credits`, and `world` (paragraphs and sized images, as for `<Figure>`). Empty fields show "coming soon" or are hidden, so fill them in as they arrive.

## The Home page call to action

The Home hero has one main button, and it changes with the season. In `content/home.ts`, set `ACTIVE_SEASON`:

- `'join'`: **Join the list** (now)
- `'tickets'`: **Get tickets**, linking to the screenings page (once tickets are on sale)
- gifts: add a `gifts` entry with the shop link once a shop exists (the commented line shows the shape)

The hero paragraph ("the film in one paragraph") is in the same file.

## Page weight

`npm run build` measures each page's initial download and fails if one goes over budget (limits are at the top of `scripts/check-budget.mjs`). Baseline on 2026-09-19, gzipped:

- **~200KB JavaScript** per page. About 165KB of that is React and the Next.js router, which every page carries; the rest is the site's own code, mostly the newsletter form.
- **~65KB fonts**: Fraunces 600 and Inter, preloaded. The Fraunces italic (the Home tagline) loads only where it's used.
- **~280KB total** on content pages.

Images below the fold are lazy-loaded and don't count. If the check fails after a change, look at what that change added before raising the limit.

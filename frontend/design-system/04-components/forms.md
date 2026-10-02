# Forms

## Where forms live now

The site has no form of its own. Both places people submit something are hosted elsewhere:

- **Newsletter** ([`components/NewsletterSignup.tsx`](../../components/NewsletterSignup.tsx)): Substack. It accepts no cross-origin posts, so a brand-styled form on this site could never submit — it links to Substack instead, and Home embeds Substack's own box ([`components/SubstackEmbed.tsx`](../../components/SubstackEmbed.tsx)) so most people don't leave. That embed is click-to-load: a facade in a reserved 220px box until tapped, because Substack's iframe is a few hundred KB that most visitors would never use. (Through September 2026 this was a custom Kit form, per the original brief; Cardinal's information pack named Substack as the platform, which rules out an inline form.)
- **Host a screening** ([`components/TallyEmbed.tsx`](../../components/TallyEmbed.tsx)): a Tally iframe, styled by Tally inside its frame, with a fixed starting height so the page doesn't jump, and a plain link out for anyone whose browser blocks it.

Both are **one clear action, in the brand's voice, with the third party kept behind it** — never a form that looks like ours but fails silently.

## If a form is ever built here

The pattern to follow, and what the removed Kit form did:

- **React Hook Form + Zod**, validating in the browser before handing anything to a third party; there is no API of our own to check again. Use `zod/mini` for anything that ships on every page — full Zod cost ~55KB gzipped per page.
- **Label above the field**, never placeholder-as-label: placeholders are supplementary hint text only, since placeholder-only labels fail accessibility and vanish the moment someone starts typing.
- Field: `bg-cream-50 border border-cream-200 rounded-card px-4 py-3 text-base`, focus ring `gold-500`. Error state: red border plus one line of error text below, tied to the field with `aria-describedby`, in `red-600` on cream and `red-300` on navy (red-600 fails contrast on navy).
- **Unique field IDs per instance** (`useId`): a form that appears twice on a page, as the newsletter did, otherwise has two labels pointing at the same input.
- **Progressive enhancement:** give the form the third party's own URL as its `action` and `method="post"`. On a slow connection the form is visible seconds before its JavaScript, and a submit in that window must still reach the service instead of reloading the page with the email address in the URL.
- Success replaces the form with a short confirmation (`role="status"`), errors appear inline (`role="alert"`). Never a page reload.

## Newsletter placement

The newsletter is reachable from every page, per the brief's non-negotiable ("newsletter signup present on every page, not hidden on one"), but it only gets a section of its own on Home:

- **Home, Join section:** the Substack embed, with a quiet link beside it for anyone who'd rather use Substack's own page. The WhatsApp Channel CTA sits alongside — the brief treats both as the same "capture the audience" job, not two separate asks.
- **Every page, footer:** one line of text with a link, not a heading and a button. Repeating the full block there turned the bottom of Home into two near-identical panels.

One button per destination: if a visitor can already subscribe in front of them, don't put a second gold button to the same place underneath.

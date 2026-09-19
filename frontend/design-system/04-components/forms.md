# Forms

Components: [`components/Input.tsx`](../../components/Input.tsx), [`components/NewsletterForm.tsx`](../../components/NewsletterForm.tsx).

## Pattern

Forms we build use **React Hook Form + Zod**, validating in the browser before handing off to a third party (there's no API of our own to check again). The host-a-screening application is a Tally embed, so it follows Tally's own form styling inside its iframe.

## Field anatomy

Label above field (never placeholder-as-label — placeholders are supplementary hint text only, since placeholder-only labels fail accessibility and disappear the moment a low-literacy or first-time user starts typing). Field: `bg-cream-50 border border-cream-200 rounded-card px-4 py-3 text-base`, focus ring `gold-500`. Error state: red-600 border + one-line error text below, referenced via `aria-describedby`.

## Newsletter capture specifically

- Present on every page (persistent footer placement) plus a dedicated section on Home — per the brief's non-negotiable #4 ("newsletter signup present on every page, not hidden on one").
- Single email field + one consent checkbox ("...updates about the film, screenings and gifts. Unsubscribe anytime.") — minimal friction, matches "checkout/forms that work first time on a phone."
- Optional first name, then email, then consent. Field names match Kit's (`email_address`).
- Submits straight from the browser to Kit's hosted form endpoint (`lib/kit.ts`); there is no server of our own. Kit replies HTTP 200 even when it rejects a signup, so success is read from its JSON `status`, not the HTTP code. Success state replaces the form with a short confirmation (and a nudge to confirm by email, since Kit uses double opt-in), not a redirect, so the user stays on the page they were reading.
- The `<form>` also carries Kit's URL as its native `action` with `method="post"`. That only matters before the page's JavaScript has loaded (seconds, on 3G): a submit in that window still reaches Kit instead of reloading the page with the email address in the URL.
- Validation uses **Zod Mini** (`zod/mini`), not full Zod, because this form is on every page and full Zod added ~55KB of JavaScript to each one.
- Field IDs come from `useId()`: the form appears twice on Home (Join section and footer), and fixed IDs made the second form's labels point at the first form's inputs.
- The WhatsApp Channel CTA sits directly beside the newsletter form wherever it appears — the brief treats both as the same "capture the audience" job, not two separate asks.

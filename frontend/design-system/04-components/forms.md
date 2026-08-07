# Forms

Components: [`components/Input.tsx`](../../components/Input.tsx), [`components/NewsletterForm.tsx`](../../components/NewsletterForm.tsx).

## Pattern

All forms use **React Hook Form + Zod** (matches the accepted proposal), with the validation schema defined once and reused for both client-side feedback and the server-side check in the route handler — "one validation schema shared by the browser and the API" per the proposal's stack rationale.

## Field anatomy

Label above field (never placeholder-as-label — placeholders are supplementary hint text only, since placeholder-only labels fail accessibility and disappear the moment a low-literacy or first-time user starts typing). Field: `bg-cream-50 border border-cream-200 rounded-card px-4 py-3 text-base`, focus ring `gold-500`. Error state: red-600 border + one-line error text below, referenced via `aria-describedby`.

## Newsletter capture specifically

- Present on every page (persistent footer placement) plus a dedicated section on Home — per the brief's non-negotiable #4 ("newsletter signup present on every page, not hidden on one").
- Single email field + one consent checkbox ("...updates about the film, screenings and gifts. Unsubscribe anytime.") — minimal friction, matches "checkout/forms that work first time on a phone."
- Submits to `app/api/newsletter/route.ts`, which forwards to Brevo. Success state replaces the form with a short confirmation, not a redirect (keeps the user on the page they were reading).
- The WhatsApp Channel CTA sits directly beside the newsletter form wherever it appears — the brief treats both as the same "capture the audience" job, not two separate asks.

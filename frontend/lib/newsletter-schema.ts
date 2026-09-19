import * as z from 'zod/mini';

/**
 * Validated in the browser before the signup is handed to Kit, so bad data
 * never reaches the list. There's no server of our own to check it again.
 *
 * Field names match Kit's form fields (email_address), so the same form can
 * post straight to Kit before the page's JavaScript has loaded.
 *
 * Uses Zod Mini because this form is in the footer of every page: the full
 * Zod build added ~55KB (gzipped) of JavaScript to each one. Server-only
 * schemas (lib/journal.ts, lib/screenings.ts) use full Zod.
 */
export const newsletterSchema = z.object({
  first_name: z.optional(
    z.string().check(z.trim(), z.maxLength(60, 'Please keep your name under 60 characters.')),
  ),
  email_address: z.pipe(z.string().check(z.trim()), z.email('Enter a valid email address.')),
  consent: z.literal(true, 'Please confirm you want to receive updates.'),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

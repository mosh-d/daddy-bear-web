import { z } from 'zod';

/**
 * Shared by the client form (components/NewsletterForm.tsx) and the API
 * route (app/api/newsletter/route.ts) so "bad data never reaches" Brevo —
 * one schema, per the proposal's stated rationale for using Zod.
 */
export const newsletterSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  consent: z.literal(true, 'Please confirm you want to receive updates.'),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

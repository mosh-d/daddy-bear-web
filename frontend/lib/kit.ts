import { KIT_FORM_ACTION } from './site';
import type { NewsletterInput } from './newsletter-schema';

/**
 * Sends a subscriber straight to Kit's hosted form endpoint from the
 * browser. The endpoint allows cross-origin posts and replies with JSON
 * when asked for it. Throws on any failure so the form can show its error
 * state.
 *
 * Not configured yet? In development the signup is logged and treated as a
 * success, so the form can be worked on without a Kit account. A production
 * build without Kit fails visibly instead of pretending to subscribe people.
 */
export async function subscribeToKit({ email_address, first_name }: NewsletterInput): Promise<void> {
  if (!KIT_FORM_ACTION) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[newsletter] NEXT_PUBLIC_KIT_FORM_ACTION not set — would have subscribed: ${email_address}`);
      return;
    }
    throw new Error('Kit form is not configured');
  }

  const body = new FormData();
  body.append('email_address', email_address);
  if (first_name) body.append('fields[first_name]', first_name);

  const res = await fetch(KIT_FORM_ACTION, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body,
  });
  const json: { status?: string } | null = await res.json().catch(() => null);

  // Kit answers 200 even when it rejects a signup; the verdict is in `status`.
  if (!res.ok || json?.status !== 'success') {
    throw new Error(`Kit rejected the signup (HTTP ${res.status}, status ${json?.status ?? 'unknown'})`);
  }
}

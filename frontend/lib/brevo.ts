const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

export const brevoConfigured = Boolean(BREVO_API_KEY);

/**
 * Adds (or updates) a contact in Brevo. Server-only — never call from a
 * client component, the API key must not reach the browser.
 *
 * Not configured yet? Logs the signup instead of throwing, so local dev
 * and the first few days of building don't require a live Brevo account.
 */
export async function subscribeToNewsletter(email: string): Promise<{ ok: boolean }> {
  if (!BREVO_API_KEY) {
    console.warn(`[newsletter] BREVO_API_KEY not set — would have subscribed: ${email}`);
    return { ok: true };
  }

  const res = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({
      email,
      listIds: BREVO_LIST_ID ? [Number(BREVO_LIST_ID)] : undefined,
      updateEnabled: true,
    }),
  });

  // Brevo returns 204 for an update to an existing contact, 201 for a new one.
  if (res.ok || res.status === 204) return { ok: true };

  const body = await res.text();
  console.error('[newsletter] Brevo subscribe failed', res.status, body);
  return { ok: false };
}

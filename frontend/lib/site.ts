/**
 * Every third-party URL and ID the site uses, read once from env. They're
 * all NEXT_PUBLIC_ because a static export has no runtime environment —
 * Next.js bakes them into the HTML/JS at build time, so changing one in
 * Cloudflare Pages needs a redeploy. Each integration hides itself when its
 * value is unset, rather than shipping a dead link or a broken embed.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://daddybear.ng').replace(/\/+$/, '');

export const CARDINAL_STUDIO_URL = process.env.NEXT_PUBLIC_CARDINAL_STUDIO_URL || 'https://cardinalstudio.ng';

export const WHATSAPP_CHANNEL_URL = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL || undefined;

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || undefined;

export const CF_ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN || undefined;

/** Kit's hosted form endpoint. Accepts the form's full action URL or its bare numeric ID. */
export const KIT_FORM_ACTION = (() => {
  const raw = process.env.NEXT_PUBLIC_KIT_FORM_ACTION?.trim();
  if (!raw) return undefined;
  return /^\d+$/.test(raw) ? `https://app.kit.com/forms/${raw}/subscriptions` : raw;
})();

/** Tally form. Accepts the form ID or any tally.so/r/… or tally.so/embed/… link. */
const TALLY_FORM_ID = (() => {
  const raw = process.env.NEXT_PUBLIC_TALLY_FORM_ID?.trim();
  if (!raw) return undefined;
  return raw.match(/tally\.so\/(?:r|embed)\/([\w-]+)/)?.[1] ?? raw;
})();

export const TALLY_EMBED_URL = TALLY_FORM_ID
  ? `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`
  : undefined;

/** The same form as a standalone page, for when the embed can't load. */
export const TALLY_FORM_URL = TALLY_FORM_ID ? `https://tally.so/r/${TALLY_FORM_ID}` : undefined;

/**
 * Click-to-chat number in the international format wa.me needs (digits
 * only, no leading + or 0). A local Nigerian number (0803…) is converted,
 * since that's the form most likely to be pasted in.
 */
const WHATSAPP_NUMBER = (() => {
  const digits = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '');
  if (!digits) return undefined;
  return digits.length === 11 && digits.startsWith('0') ? `234${digits.slice(1)}` : digits;
})();

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Opens a chat with the Daddy Bear number, message prefilled. Undefined until the number is set. */
export function whatsappChatUrl(text: string) {
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}` : undefined;
}

/** Opens WhatsApp's "send to…" picker with the message prefilled. Needs no number. */
export function whatsappShareUrl(text: string) {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Tags an outbound link so the click-through is attributable (e.g. which
 * screening a Tix Africa sale came from). Leaves any UTM params the link
 * already carries alone, so a hand-tagged URL in the data file wins.
 */
export function withUtm(
  url: string,
  params: { source: string; medium: string; campaign: string; content?: string },
) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }
  for (const [key, value] of Object.entries(params)) {
    if (value && !parsed.searchParams.has(`utm_${key}`)) parsed.searchParams.set(`utm_${key}`, value);
  }
  return parsed.toString();
}

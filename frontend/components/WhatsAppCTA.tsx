import { WhatsAppIcon } from './Icons';

const WHATSAPP_CHANNEL_URL = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL;

/**
 * Static "join our WhatsApp Channel" link — the brief's Phase 1 WhatsApp
 * requirement. Business API (order confirmations) is Phase 2/3, not this.
 * Renders nothing if the channel URL hasn't been configured yet, rather
 * than shipping a dead link.
 */
export function WhatsAppCTA({ tone = 'onCream' }: { tone?: 'onNavy' | 'onCream' }) {
  if (!WHATSAPP_CHANNEL_URL) return null;

  const classes =
    tone === 'onNavy'
      ? 'border-cream-50 text-cream-50 hover:bg-cream-50/10'
      : 'border-navy-900 text-navy-900 hover:bg-navy-900/5';

  return (
    <a
      href={WHATSAPP_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-pill border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${classes}`}
    >
      <WhatsAppIcon />
      Join our WhatsApp channel
    </a>
  );
}

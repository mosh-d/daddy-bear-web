import { WhatsAppIcon } from './Icons';
import { WHATSAPP_CHANNEL_URL } from '@/lib/site';

/**
 * The "join our WhatsApp Channel" link. Click-to-chat and share links live
 * in WhatsAppLinks.tsx.
 * Renders nothing if the channel URL hasn't been configured yet, rather
 * than shipping a dead link.
 */
export function WhatsAppCTA({ tone = 'onCream' }: { tone?: 'onDark' | 'onCream' }) {
  if (!WHATSAPP_CHANNEL_URL) return null;

  const classes =
    tone === 'onDark'
      ? 'border-cream-50 text-cream-50 hover:bg-cream-50/10 focus-visible:ring-gold-400'
      : 'border-ink text-ink hover:bg-ink/5 focus-visible:ring-ember-500';

  return (
    <a
      href={WHATSAPP_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-pill border px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 ${classes}`}
    >
      <WhatsAppIcon />
      Join our WhatsApp channel
    </a>
  );
}

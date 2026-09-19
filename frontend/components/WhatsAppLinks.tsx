import { whatsappChatUrl, whatsappShareUrl } from '@/lib/site';
import { WhatsAppIcon } from './Icons';

type Tone = 'onNavy' | 'onCream';

const TEXT_LINK_TONES: Record<Tone, string> = {
  onNavy: 'text-cream-50 hover:text-gold-400',
  onCream: 'text-navy-900 hover:text-gold-600',
};

const textLink =
  'hit-area inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500';

/**
 * Opens WhatsApp's "send to…" picker with a prefilled message and link, on
 * Journal posts and screenings. Works without any env config.
 */
export function WhatsAppShare({
  text,
  url,
  label = 'Share on WhatsApp',
  tone = 'onCream',
}: {
  text: string;
  url: string;
  label?: string;
  tone?: Tone;
}) {
  return (
    <a
      href={whatsappShareUrl(`${text}\n${url}`)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${textLink} ${TEXT_LINK_TONES[tone]}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}

/**
 * Click-to-chat with the Daddy Bear number, message prefilled. Renders
 * nothing until NEXT_PUBLIC_WHATSAPP_NUMBER is set.
 */
export function WhatsAppChat({
  message,
  label,
  tone = 'onCream',
}: {
  message: string;
  label: string;
  tone?: Tone;
}) {
  const href = whatsappChatUrl(message);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${textLink} ${TEXT_LINK_TONES[tone]}`}>
      <WhatsAppIcon />
      {label}
    </a>
  );
}

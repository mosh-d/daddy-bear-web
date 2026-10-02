import { SOCIAL_LINKS } from '@/content/links';
import { InstagramIcon, TikTokIcon, XIcon, YouTubeIcon } from './Icons';

const ICONS: Record<string, (props: { className?: string }) => React.ReactElement> = {
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  X: XIcon,
  YouTube: YouTubeIcon,
};

/** The film's social accounts. Icon-only, so each carries its platform name for screen readers. */
export function SocialLinks({ tone = 'onNavy' }: { tone?: 'onNavy' | 'onCream' }) {
  const classes =
    tone === 'onNavy'
      ? 'text-cream-100/80 hover:text-gold-400'
      : 'text-navy-900 hover:text-gold-600';

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {SOCIAL_LINKS.map(({ label, href }) => {
        const Icon = ICONS[label];
        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-11 w-11 items-center justify-center rounded-pill transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${classes}`}
            >
              {Icon ? <Icon /> : null}
              <span className="sr-only">Daddy Bear on {label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

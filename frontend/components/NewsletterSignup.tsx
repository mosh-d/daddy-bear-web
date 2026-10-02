import { Button } from './Button';
import { SUBSTACK_URL } from '@/content/links';
import { withUtm } from '@/lib/site';

/**
 * The way out to Substack's own subscribe page, beside Home's embedded
 * signup box (see SubstackEmbed). Deliberately a quiet link, not a button:
 * the embed is the main path, and a gold button here only competed with it.
 * The footer carries a one-line version for every other page.
 *
 * Tagged so Substack's stats show how many subscribers came from the site.
 */
export function NewsletterSignup({
  tone = 'onCream',
  label = 'Or open Substack in a new tab',
  campaign = 'home',
}: {
  tone?: 'onNavy' | 'onCream';
  label?: string;
  campaign?: string;
}) {
  const href = withUtm(`${SUBSTACK_URL}/subscribe`, {
    source: 'daddybear.ng',
    medium: 'website',
    campaign,
  });

  return (
    <Button href={href} external variant="ghost" tone={tone}>
      {label}
    </Button>
  );
}

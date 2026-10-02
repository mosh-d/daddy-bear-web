import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { LEGAL_UPDATED, PRIVACY } from '@/content/legal';
import { CF_ANALYTICS_TOKEN, GA4_ID } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Cardinal Productions handles information collected through the Daddy Bear website.',
};

/**
 * The policy promises to name the analytics actually installed, so this is
 * written from the same configuration the site loads analytics from, and
 * can't fall out of step with it.
 */
function analyticsSentence() {
  const tools = [
    CF_ANALYTICS_TOKEN ? 'Cloudflare Web Analytics, which is cookie-free and does not track visitors across sites' : null,
    GA4_ID ? 'Google Analytics 4, which sets cookies on your device' : null,
  ].filter(Boolean);

  if (tools.length === 0) {
    return 'This website currently runs no analytics and sets no analytics or advertising cookies. Embedded third-party content you choose to load (the Substack signup box, the host-a-screening form, or a video) may set its own cookies, as described by those services.';
  }
  return `This website uses ${tools.join(' and ')}. Embedded third-party content you choose to load (the Substack signup box, the host-a-screening form, or a video) may set its own cookies, as described by those services. You can block or delete cookies in your browser settings.`;
}

export default function PrivacyPage() {
  const sections = PRIVACY.map((section) =>
    section.body[0] === '{{ANALYTICS}}' ? { ...section, body: [analyticsSentence()] } : section,
  );

  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Your information."
      intro="What we collect through this website, why, and what you can ask us to do about it."
      sections={sections}
      updated={LEGAL_UPDATED}
    />
  );
}

import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { LEGAL_UPDATED, TERMS } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that apply to using the Daddy Bear website.',
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of Service"
      title="Using this website."
      sections={TERMS}
      updated={LEGAL_UPDATED}
    />
  );
}

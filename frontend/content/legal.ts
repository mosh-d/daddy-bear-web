/**
 * Terms of Service and Privacy Policy, as supplied in Cardinal's Website
 * Content & Information Pack. Wording is the client's: edit with care, and
 * update LEGAL_UPDATED whenever the substance changes.
 *
 * `{{ANALYTICS}}` in the privacy text is replaced at build time with a
 * sentence naming the analytics actually enabled (the policy requires the
 * published version to identify the tools installed). See app/privacy.
 */

export type LegalSection = { title: string; body: string[] };

/** Shown as "Last updated" on both pages. */
export const LEGAL_UPDATED = '2026-10-02';

export const TERMS: LegalSection[] = [
  {
    title: 'Acceptance',
    body: [
      'By accessing or using the Daddy Bear website, you agree to these Terms of Service. If you do not agree, please discontinue use of the website.',
    ],
  },
  {
    title: 'Website content',
    body: [
      'The website provides information about Daddy Bear, its production, news, newsletters and screening opportunities. Content may be updated, changed or removed without notice.',
    ],
  },
  {
    title: 'Intellectual property',
    body: [
      'Unless otherwise stated, the Daddy Bear name, film materials, text, photographs, artwork, videos, logos and other website content are owned by or used with permission by Cardinal Productions and/or the relevant rights holders. You may not reproduce, distribute, modify or commercially exploit this material without prior written permission, except where permitted by law.',
    ],
  },
  {
    title: 'Permitted use',
    body: [
      'You may use the website for lawful, personal and informational purposes. Do not attempt to disrupt the website, gain unauthorised access, submit unlawful or harmful material, or misuse contact and enquiry forms.',
    ],
  },
  {
    title: 'Third-party services',
    body: [
      'The website may link to third-party platforms, including social media and the Daddy Bear newsletter. Those services are governed by their own terms and privacy policies. Cardinal Productions is not responsible for third-party websites or services.',
    ],
  },
  {
    title: 'Screening enquiries',
    body: [
      'Submitting a screening enquiry does not guarantee approval, availability, licensing or a screening arrangement. Any screening is subject to separate confirmation and applicable terms.',
    ],
  },
  {
    title: 'Disclaimer',
    body: [
      'The website is provided on an “as available” basis. We make reasonable efforts to keep information accurate, but do not guarantee that all content will always be complete, current or uninterrupted.',
    ],
  },
  {
    title: 'Limitation of liability',
    body: [
      'To the extent permitted by applicable law, Cardinal Productions will not be liable for indirect or consequential loss arising from use of, or inability to use, the website.',
    ],
  },
  {
    title: 'Changes and contact',
    body: [
      'These terms may be updated from time to time. The current version will be published on this website. For questions, contact us at {{EMAIL}}.',
    ],
  },
];

export const PRIVACY: LegalSection[] = [
  {
    title: 'Who we are',
    body: [
      'Daddy Bear is a film project produced by Cardinal Productions. “We” refers to Cardinal Productions and the team responsible for operating the Daddy Bear website.',
    ],
  },
  {
    title: 'Information collected',
    body: [
      'Depending on enabled features, we may collect information you provide, such as your name, email address, organisation, phone number, screening enquiry details and newsletter subscription. Website hosts or analytics tools may also collect basic technical information.',
    ],
  },
  {
    title: 'How we use information',
    body: [
      'We use submitted information to respond to enquiries, manage screening requests, send newsletter updates where you have subscribed, maintain website security and improve the website. Screening enquiry details will not be used for unrelated marketing without an appropriate basis or consent.',
    ],
  },
  {
    title: 'Newsletter',
    body: [
      'If you subscribe, your email address is processed by Substack, the newsletter platform used by Daddy Bear. Subscribing happens on Substack’s own pages, not on this website. You can unsubscribe using the link in newsletter emails. Review Substack’s privacy information for details of its processing.',
    ],
  },
  {
    title: 'Sharing',
    body: [
      'We do not sell personal information. Information may be processed by service providers that help operate the website, forms, newsletter or analytics, or disclosed where required by law or necessary to protect rights, safety or the website.',
    ],
  },
  {
    title: 'Cookies and analytics',
    body: ['{{ANALYTICS}}'],
  },
  {
    title: 'Retention and security',
    body: [
      'We retain information only as long as reasonably needed for the purposes described or as required by law. We use reasonable safeguards, but no online transmission or storage method can be guaranteed completely secure.',
    ],
  },
  {
    title: 'Your choices and rights',
    body: [
      'Depending on applicable law, you may request access to, correction or deletion of your personal information, or object to certain processing. You may withdraw newsletter consent at any time. Contact us at {{EMAIL}}.',
    ],
  },
  {
    title: 'Children’s privacy',
    body: [
      'The website is not intended to knowingly collect personal information directly from children without appropriate authorisation. A parent or guardian who believes a child has submitted personal information may contact us to request review or deletion.',
    ],
  },
  {
    title: 'Updates and contact',
    body: [
      'We may update this policy as the website or its practices change. The latest version will be posted here. Privacy questions or requests should be sent to {{EMAIL}}.',
    ],
  },
];

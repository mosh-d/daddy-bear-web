import Script from 'next/script';
import { CF_ANALYTICS_TOKEN, GA4_ID } from '@/lib/site';

/**
 * Loads whichever analytics is configured, after the page is interactive.
 * Nothing loads when neither is set.
 *
 * Both count client-side route changes as page views without extra code:
 * the Cloudflare beacon tracks history changes, and so does GA4 with
 * Enhanced Measurement's "page changes" option, which is on by default.
 * GA4's outbound-click tracking (also on by default) records Tix Africa
 * click-throughs, with the screening named in the link's utm_content.
 */
export function Analytics() {
  return (
    <>
      {CF_ANALYTICS_TOKEN ? (
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: CF_ANALYTICS_TOKEN })}
          strategy="afterInteractive"
        />
      ) : null}
      {GA4_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA4_ID)});`}
          </Script>
        </>
      ) : null}
    </>
  );
}

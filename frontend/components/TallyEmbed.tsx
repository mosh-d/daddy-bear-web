'use client';

import Script from 'next/script';

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

/** Starts the embed. If Tally's script is blocked, loads the iframe directly (fixed height, no auto-resize). */
function loadEmbeds() {
  if (window.Tally) {
    window.Tally.loadEmbeds();
    return;
  }
  document.querySelectorAll<HTMLIFrameElement>('iframe[data-tally-src]:not([src])').forEach((iframe) => {
    iframe.src = iframe.dataset.tallySrc ?? '';
  });
}

/**
 * Tally form embed. The iframe starts at a fixed height, so the page layout
 * is settled before the form arrives, then Tally resizes it to fit. Tally's
 * script loads only once the browser is idle, after everything else on the
 * page.
 */
export function TallyEmbed({ src, title }: { src: string; title: string }) {
  return (
    <>
      <iframe
        data-tally-src={src}
        loading="lazy"
        width="100%"
        height="900"
        title={title}
        className="block w-full border-0"
      />
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" onReady={loadEmbeds} onError={loadEmbeds} />
    </>
  );
}

'use client';

import { useState } from 'react';
import { SUBSTACK_EMBED_URL } from '@/content/links';

/**
 * Substack's own signup box, so people can subscribe without leaving Home.
 *
 * It's a click-to-load facade rather than a bare iframe: the embed pulls a
 * few hundred KB from Substack, which is a lot to spend on every Home visit
 * for a box most visitors scroll past. Tapping it swaps in the real embed.
 * The space is reserved either way, so nothing shifts. Anyone who doesn't
 * tap still has the "Join the list" button beside it.
 */
export function SubstackEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="h-[220px] overflow-hidden rounded-card border border-navy-700 bg-cream-50">
      {loaded ? (
        <iframe
          src={SUBSTACK_EMBED_URL}
          title="Subscribe to the Daddy Bear newsletter on Substack"
          width="100%"
          height="220"
          className="block border-0 bg-cream-50"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center transition-colors hover:bg-cream-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-500"
        >
          <span className="font-display text-lg font-semibold text-navy-900">
            Subscribe here without leaving the page
          </span>
          <span className="text-sm text-ink/70">
            Tap to load the Substack signup box. It loads only when you ask for it, to save data.
          </span>
        </button>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { youtubeId } from '@/lib/video';
import { PlayIcon } from './Icons';

/**
 * Click-to-load YouTube player. Until someone taps play, this is a single
 * ~20KB thumbnail, not YouTube's iframe (which pulls close to 1MB of script
 * on load). That difference matters on a phone on limited data. The 16:9
 * box is reserved up front, so nothing shifts when the player appears.
 */
export function VideoEmbed({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(url);

  if (!id) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-900 underline">
        Watch: {title}
      </a>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-card bg-navy-950">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-500"
        >
          <Image
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
          />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-pill bg-gold-500 text-navy-900 shadow-lg transition-colors group-hover:bg-gold-400">
            <PlayIcon className="ml-1 h-7 w-7" />
          </span>
          <span className="sr-only">Play video: {title}</span>
        </button>
      )}
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRightIcon, CloseIcon } from './Icons';
import type { GalleryImage } from '@/content/about';

/**
 * A swipeable strip of film, each photo a frame on it, that settles each one
 * in the centre. The centred
 * photo is full size and the ones either side shrink and fade back, driven
 * by scroll position (`.gallery-slide` in app/globals.css), so the focus
 * follows your finger rather than jumping when the swipe ends. Tapping a
 * photo opens it fullscreen over a blurred, darkened page.
 *
 * Never auto-plays (design-system/05-imagery-motion.md). Photos are
 * lazy-loaded, so only the ones scrolled near are downloaded, and the larger
 * fullscreen version only when it's opened.
 */
export function PhotoGallery({ label, images }: { label: string; images: GalleryImage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  // Which slide is nearest the centre of the track.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const centre = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Infinity;
    Array.from(track.children).forEach((child, index) => {
      const slide = child as HTMLElement;
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - centre);
      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [measure]);

  const goTo = useCallback((index: number, instant = false) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({
      left: slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2,
      behavior: instant || reduceMotion ? 'auto' : 'smooth',
    });
  }, []);

  // Start with a photo settled in the centre. From tablet up that's the
  // second, so the first sits beside it and the strip doesn't open on a long
  // stretch of empty film; on a phone, where one photo fills the view, the first.
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 640px)').matches;
    goTo(wide && images.length > 2 ? 1 : 0, true);
  }, [goTo, images.length]);

  // After the fullscreen view closes, leave the row on the photo you were
  // last looking at, with focus on it. Runs once the dialog has gone, since
  // the page behind a modal dialog can't take focus.
  const returnTo = useRef<number | null>(null);
  useEffect(() => {
    if (open !== null || returnTo.current === null) return;
    const index = returnTo.current;
    returnTo.current = null;
    goTo(index, true);
    trackRef.current?.children[index]?.querySelector('button')?.focus({ preventScroll: true });
  }, [open, goTo]);

  const closeLightbox = useCallback((index: number) => {
    returnTo.current = index;
    setOpen(null);
  }, []);

  const roundButton =
    'flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-[background-color,opacity,translate] duration-200 hover:bg-ink/5 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-500 disabled:pointer-events-none disabled:opacity-30';

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        // The row is a strip of film (`.film-roll` in app/globals.css): Ink,
        // sprocket holes along both edges that travel with the photos, and
        // each photo a frame on it.
        className="gallery-track film-roll relative -mx-4 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto py-10 [scrollbar-width:none] sm:-mx-6 sm:gap-3 sm:rounded-sm sm:py-12 lg:-mx-8 [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => {
          const isPortrait = image.height > image.width;
          return (
            <figure
              key={image.src}
              className="gallery-slide shrink-0 snap-center snap-always"
              data-active={index === active ? '' : undefined}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${images.length}`}
            >
              <button
                type="button"
                onClick={() => setOpen(index)}
                className="group relative block cursor-zoom-in overflow-hidden rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                aria-label={`View fullscreen: ${image.alt}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  draggable={false}
                  className={`h-auto bg-ember-900 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:h-[26rem] sm:w-auto ${
                    isPortrait ? 'w-[64vw]' : 'w-[82vw]'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </button>
              {image.caption ? (
                <figcaption className="mt-3 max-w-[64vw] text-sm text-cream-100/75 sm:max-w-xs">{image.caption}</figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        {/* Position dots: the active one stretches into a bar. */}
        <div className="flex flex-wrap items-center gap-1.5">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show photo ${index + 1} of ${images.length}`}
              aria-current={index === active ? 'true' : undefined}
              className="hit-area flex h-6 items-center focus-visible:outline-none [&:focus-visible>span]:ring-2 [&:focus-visible>span]:ring-ember-500"
            >
              <span
                className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out ${
                  index === active ? 'w-6 bg-ember-600' : 'w-1.5 bg-ink/25'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="hidden gap-3 sm:flex">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous photo"
            className={roundButton}
          >
            <ArrowRightIcon className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === images.length - 1}
            aria-label="Next photo"
            className={roundButton}
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open !== null ? (
        <Lightbox images={images} start={open} label={label} onClose={closeLightbox} />
      ) : null}
    </div>
  );
}

/**
 * Fullscreen view. A native modal <dialog>: it sits above everything, traps
 * focus, closes on Escape and hands focus back to the photo that opened it.
 * Arrow keys and swipes move between photos; tapping outside the photo or
 * the close button returns to the page.
 */
function Lightbox({
  images,
  start,
  label,
  onClose,
}: {
  images: GalleryImage[];
  start: number;
  label: string;
  onClose: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(start);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const image = images[index];

  const step = useCallback(
    (delta: 1 | -1) => {
      setDirection(delta);
      setIndex((current) => (current + delta + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  // Warm the neighbours so stepping through feels instant.
  useEffect(() => {
    for (const offset of [1, -1]) {
      const neighbour = images[(index + offset + images.length) % images.length];
      const preload = new window.Image();
      preload.src = neighbour.full ?? neighbour.src;
    }
  }, [index, images]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') step(1);
    else if (event.key === 'ArrowLeft') step(-1);
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const from = touchStart.current;
    touchStart.current = null;
    if (!from) return;
    const dx = event.changedTouches[0].clientX - from.x;
    const dy = event.changedTouches[0].clientY - from.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose(index); // swipe down to close
  };

  const navButton =
    'absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 backdrop-blur-sm transition-colors duration-200 hover:bg-cream-50/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:flex';

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${label}: photo ${index + 1} of ${images.length}`}
      className="lightbox fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-cream-50 outline-none"
      onCancel={(event) => {
        event.preventDefault();
        onClose(index);
      }}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        // A click on the dialog itself (not the photo or a control) is the dimmed backdrop.
        if (event.target === event.currentTarget || (event.target as HTMLElement).dataset.backdrop !== undefined)
          onClose(index);
      }}
      onTouchStart={(event) => {
        touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }}
      onTouchEnd={onTouchEnd}
    >
      <div data-backdrop className="flex h-full w-full flex-col items-center justify-center px-4 py-16 sm:px-20">
        <figure data-backdrop className="flex max-h-full flex-col items-center">
          <Image
            key={image.src}
            src={image.full ?? image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="eager"
            draggable={false}
            // The carousel-size photo (already downloaded) shows through
            // until the larger one arrives, so there's never a blank frame.
            style={{ backgroundImage: `url(${image.src})`, backgroundSize: 'cover' }}
            className={`lightbox-image h-auto max-h-[calc(100dvh-7rem)] w-auto max-w-full rounded-card object-contain shadow-2xl shadow-black/50 ${
              direction === 1 ? 'from-right' : 'from-left'
            }`}
          />
          {/* Only a caption set in content/about.ts shows here; the alt text
              stays for screen readers, not as visible text. */}
          {image.caption ? (
            <figcaption className="mt-4 max-w-xl text-center text-sm text-cream-100/80">{image.caption}</figcaption>
          ) : null}
        </figure>
      </div>

      <p className="absolute top-5 left-5 text-xs font-semibold tracking-[0.2em] text-cream-100/70 uppercase tabular-nums sm:top-6 sm:left-6">
        {index + 1} / {images.length}
      </p>
      <button
        type="button"
        onClick={() => onClose(index)}
        aria-label="Close fullscreen"
        autoFocus
        className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 backdrop-blur-sm transition-colors duration-200 hover:bg-cream-50/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:top-4 sm:right-4"
      >
        <CloseIcon className="h-6 w-6" />
      </button>
      {images.length > 1 ? (
        <>
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={`${navButton} left-4`}>
            <ArrowRightIcon className="h-5 w-5 rotate-180" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next photo" className={`${navButton} right-4`}>
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </>
      ) : null}
    </dialog>
  );
}

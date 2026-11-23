/**
 * A band of film stock, sprocket holes along both edges and frames down the
 * middle: muted ember (the hero's own colour) along the foot of
 * each hero, Ink along the top of the footer, so every page reads as a film's
 * site at a glance. Pure CSS (`.film-strip` in app/globals.css), no image
 * download. Where the browser supports scroll-driven animation the strip
 * slides along as the page scrolls, like film through a gate; with
 * reduced motion it stays still. Decorative.
 */
export function FilmStrip({ tone = 'ink', className = '' }: { tone?: 'ink' | 'ember'; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`film-strip ${tone === 'ember' ? 'film-strip-ember' : ''} ${className}`}
    />
  );
}

/**
 * A screen-shaped frame with sprocket holes down both sides, for the
 * trailer (and its placeholder until the trailer is out).
 */
export function FilmFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1.25rem_minmax(0,1fr)_1.25rem] overflow-hidden rounded-card bg-ink sm:grid-cols-[1.75rem_minmax(0,1fr)_1.75rem]">
      <div aria-hidden="true" className="film-strip-v" />
      <div className="py-2 sm:py-3">{children}</div>
      <div aria-hidden="true" className="film-strip-v" />
    </div>
  );
}

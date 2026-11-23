import type { ReactNode } from 'react';

export function Badge({
  tone = 'onCream',
  children,
}: {
  tone?: 'onDark' | 'onCream';
  children: ReactNode;
}) {
  const classes =
    tone === 'onDark'
      ? 'bg-cream-50/10 text-gold-400 border border-gold-400/40'
      : 'bg-ink/5 text-ink border border-ink/15';
  return (
    <span
      className={`inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold uppercase tracking-wide ${classes}`}
    >
      {children}
    </span>
  );
}

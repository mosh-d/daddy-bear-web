import type { ReactNode } from 'react';

export function Badge({
  tone = 'onCream',
  children,
}: {
  tone?: 'onNavy' | 'onCream';
  children: ReactNode;
}) {
  const classes =
    tone === 'onNavy'
      ? 'bg-cream-50/10 text-gold-400 border border-gold-400/40'
      : 'bg-navy-900/5 text-navy-900 border border-navy-900/15';
  return (
    <span
      className={`inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold uppercase tracking-wide ${classes}`}
    >
      {children}
    </span>
  );
}

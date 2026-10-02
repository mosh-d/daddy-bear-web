import type { ReactNode } from 'react';

export function Card({
  tone = 'onCream',
  className = '',
  children,
}: {
  tone?: 'onNavy' | 'onCream';
  className?: string;
  children: ReactNode;
}) {
  const classes =
    tone === 'onNavy'
      ? 'bg-navy-700/40 border border-navy-500/40 text-cream-50'
      : 'bg-cream-50 border border-cream-200 text-ink';
  return (
    <div
      className={`rounded-card p-6 transition-[translate,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-950/10 ${classes} ${className}`}
    >
      {children}
    </div>
  );
}

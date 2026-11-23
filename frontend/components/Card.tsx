import type { ReactNode } from 'react';

export function Card({
  tone = 'onCream',
  className = '',
  children,
}: {
  tone?: 'onDark' | 'onCream';
  className?: string;
  children: ReactNode;
}) {
  const classes =
    tone === 'onDark'
      ? 'bg-cream-50/10 border border-cream-50/20 text-cream-50'
      : 'bg-cream-50 border border-cream-200 text-ink';
  return (
    <div
      className={`rounded-card p-6 transition-[translate,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/10 ${classes} ${className}`}
    >
      {children}
    </div>
  );
}

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from './Icons';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonTone = 'onNavy' | 'onCream';

// Shared truly-common styles only. Each variant below owns its full shape
// (padding, radius, casing) instead of overriding base — conflicting
// Tailwind utilities (e.g. rounded-pill vs rounded-none) don't resolve by
// className string order, so partial overrides aren't safe to rely on.
const base =
  'inline-flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const shapeSolid = 'justify-center rounded-pill px-6 py-3 text-sm font-semibold uppercase tracking-wide';

const variantClasses: Record<ButtonVariant, Record<ButtonTone, string>> = {
  primary: {
    onNavy: `${shapeSolid} bg-gold-500 text-navy-900 hover:bg-gold-400 focus-visible:ring-offset-navy-900`,
    onCream: `${shapeSolid} bg-gold-500 text-navy-900 hover:bg-gold-400 focus-visible:ring-offset-cream-50`,
  },
  secondary: {
    onNavy: `${shapeSolid} border border-cream-50 text-cream-50 hover:bg-cream-50/10 focus-visible:ring-offset-navy-900`,
    onCream: `${shapeSolid} border border-navy-900 text-navy-900 hover:bg-navy-900/5 focus-visible:ring-offset-cream-50`,
  },
  ghost: {
    onNavy: 'text-sm font-medium text-cream-50 underline-offset-4 hover:underline',
    onCream: 'text-sm font-medium text-navy-900 underline-offset-4 hover:underline',
  },
};

type Content = {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  showArrow?: boolean;
  className?: string;
  children: ReactNode;
};

function classesFor({ variant = 'primary', tone = 'onCream', className = '' }: Content) {
  return `${base} ${variantClasses[variant][tone]} ${className}`;
}

function ButtonContent({ showArrow, children }: { showArrow?: boolean; children: ReactNode }) {
  return (
    <>
      {children}
      {showArrow ? <ArrowRightIcon /> : null}
    </>
  );
}

/** A navigational CTA — internal route via next/link, or an external link (e.g. WhatsApp). */
export function Button({
  href,
  external = false,
  ...content
}: Content & { href: string; external?: boolean }) {
  const classes = classesFor(content);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <ButtonContent showArrow={content.showArrow}>{content.children}</ButtonContent>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      <ButtonContent showArrow={content.showArrow}>{content.children}</ButtonContent>
    </Link>
  );
}

/** A form submit / action button. */
export function ActionButton({
  type = 'button',
  onClick,
  disabled,
  ...content
}: Content & {
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
}) {
  const classes = classesFor(content);
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      <ButtonContent showArrow={content.showArrow}>{content.children}</ButtonContent>
    </button>
  );
}

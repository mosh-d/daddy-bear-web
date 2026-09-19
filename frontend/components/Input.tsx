import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  tone?: 'onNavy' | 'onCream';
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, tone = 'onCream', id, className = '', ...rest },
  ref,
) {
  const inputId = id ?? rest.name;
  const labelClasses = tone === 'onNavy' ? 'text-cream-50' : 'text-navy-900';
  // red-600 fails contrast on navy; red-300 is the readable equivalent there.
  const errorClasses = tone === 'onNavy' ? 'text-red-300' : 'text-red-600';
  return (
    <div className="text-left">
      <label htmlFor={inputId} className={`mb-1.5 block text-sm font-semibold ${labelClasses}`}>
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`w-full rounded-card border bg-cream-50 px-4 py-3 text-base text-ink placeholder:text-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
          error ? 'border-red-600' : 'border-cream-200'
        } ${className}`}
        {...rest}
      />
      {error ? (
        <p id={`${inputId}-error`} className={`mt-1.5 text-sm ${errorClasses}`}>
          {error}
        </p>
      ) : null}
    </div>
  );
});

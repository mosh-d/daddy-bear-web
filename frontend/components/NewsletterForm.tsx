'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSchema, type NewsletterInput } from '@/lib/newsletter-schema';
import { Input } from './Input';
import { ActionButton } from './Button';

export function NewsletterForm({ tone = 'onCream' }: { tone?: 'onNavy' | 'onCream' }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(data: NewsletterInput) {
    setStatus('idle');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    const successClasses = tone === 'onNavy' ? 'text-cream-50' : 'text-navy-900';
    return (
      <p className={`text-base font-semibold ${successClasses}`}>
        You&apos;re on the list. Watch out for a welcome message, and thank you for showing up for this.
      </p>
    );
  }

  const helpClasses = tone === 'onNavy' ? 'text-cream-50/70' : 'text-ink/60';
  const consentLabelClasses = tone === 'onNavy' ? 'text-cream-50/80' : 'text-ink/70';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        tone={tone}
        error={errors.email?.message}
        {...register('email')}
      />
      <div>
        <label className={`flex items-start gap-2 text-sm ${consentLabelClasses}`}>
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-cream-200 text-gold-500 focus-visible:ring-2 focus-visible:ring-gold-500"
            {...register('consent')}
          />
          <span>
            Send me updates about the film, screenings and gifts. Unsubscribe anytime.
          </span>
        </label>
        {errors.consent ? <p className="mt-1 text-sm text-red-500">{errors.consent.message}</p> : null}
      </div>
      <ActionButton type="submit" tone={tone} disabled={isSubmitting}>
        {isSubmitting ? 'Joining…' : 'Join the list'}
      </ActionButton>
      {status === 'error' ? (
        <p className="text-sm text-red-500">
          Something went wrong on our end — please try again in a moment.
        </p>
      ) : null}
      <p className={`text-xs ${helpClasses}`}>
        Your details are kept by Cardinal Productions and never shared with brand partners.
      </p>
    </form>
  );
}

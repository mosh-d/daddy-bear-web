'use client';

import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSchema, type NewsletterInput } from '@/lib/newsletter-schema';
import { subscribeToKit } from '@/lib/kit';
import { KIT_FORM_ACTION } from '@/lib/site';
import { Input } from './Input';
import { ActionButton } from './Button';

export function NewsletterForm({ tone = 'onCream' }: { tone?: 'onNavy' | 'onCream' }) {
  // Home renders this form twice (the Join section and the footer), so
  // field IDs must be unique per instance or labels point at the wrong input.
  const uid = useId();
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
      await subscribeToKit(data);
      setStatus('success');
      reset();
    } catch (error) {
      console.error('[newsletter]', error);
      setStatus('error');
    }
  }

  if (status === 'success') {
    const successClasses = tone === 'onNavy' ? 'text-cream-50' : 'text-navy-900';
    return (
      <p role="status" className={`text-base font-semibold ${successClasses}`}>
        Thank you for showing up for this. Check your inbox for a message from us to confirm your place
        on the list.
      </p>
    );
  }

  const helpClasses = tone === 'onNavy' ? 'text-cream-50/70' : 'text-ink/60';
  const consentLabelClasses = tone === 'onNavy' ? 'text-cream-50/80' : 'text-ink/70';
  const errorClasses = tone === 'onNavy' ? 'text-red-300' : 'text-red-600';

  // action/method only matter before hydration: on a slow connection the
  // form is visible seconds before its JavaScript arrives, and a submit in
  // that gap posts straight to Kit instead of reloading this page with the
  // email address in the URL. Once hydrated, handleSubmit takes over.
  return (
    <form
      action={KIT_FORM_ACTION}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
    >
      <Input
        id={`${uid}-first-name`}
        label="First name (optional)"
        type="text"
        autoComplete="given-name"
        tone={tone}
        error={errors.first_name?.message}
        {...register('first_name')}
      />
      <Input
        id={`${uid}-email`}
        label="Email address"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com"
        tone={tone}
        error={errors.email_address?.message}
        {...register('email_address')}
      />
      <div>
        <label className={`flex items-start gap-2 text-sm ${consentLabelClasses}`}>
          <input
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
            className="mt-1 h-4 w-4 rounded border-cream-200 text-gold-500 focus-visible:ring-2 focus-visible:ring-gold-500"
            {...register('consent')}
          />
          <span>
            Send me updates about the film, screenings and gifts. Unsubscribe anytime.
          </span>
        </label>
        {errors.consent ? (
          <p id={`${uid}-consent-error`} className={`mt-1 text-sm ${errorClasses}`}>
            {errors.consent.message}
          </p>
        ) : null}
      </div>
      <ActionButton type="submit" tone={tone} disabled={isSubmitting}>
        {isSubmitting ? 'Joining…' : 'Join the list'}
      </ActionButton>
      {status === 'error' ? (
        <p role="alert" className={`text-sm ${errorClasses}`}>
          Something went wrong on our end. Please try again in a moment.
        </p>
      ) : null}
      <p className={`text-xs ${helpClasses}`}>
        Your details are kept by Cardinal Productions and never shared with brand partners.
      </p>
    </form>
  );
}

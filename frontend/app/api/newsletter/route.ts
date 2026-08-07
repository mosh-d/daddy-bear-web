import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/newsletter-schema';
import { subscribeToNewsletter } from '@/lib/brevo';

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  const { ok } = await subscribeToNewsletter(parsed.data.email);
  if (!ok) {
    return NextResponse.json({ error: 'Could not subscribe right now.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

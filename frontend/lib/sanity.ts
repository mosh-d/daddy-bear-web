import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const sanityConfigured = Boolean(projectId);

/**
 * Read-only client for the Journal. Only constructed when a project ID is
 * present — callers must check `sanityConfigured` first (see lib/journal.ts),
 * which falls back to content/journal-sample.ts otherwise so the site runs
 * before Sanity is set up.
 */
export const sanityClient = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-01-01',
      useCdn: true,
    })
  : null;

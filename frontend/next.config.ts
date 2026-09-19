import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // Fully static site for Cloudflare Pages: `next build` writes plain
  // HTML/CSS/JS to out/. This rules out SSR, API routes, middleware and
  // ISR on purpose — see ../CLAUDE.md (golden rules 1 and 2).
  output: 'export',

  // There's no image server behind a static export. Images ship
  // pre-compressed and pre-sized from public/ (see CONTENT.md).
  images: { unoptimized: true },

  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  // Pin the workspace root to this project — without it, Next.js walks up
  // and picks up an unrelated package-lock.json under the Windows user
  // profile folder, which just produces a harmless but noisy warning.
  turbopack: {
    root: __dirname,
  },
};

const withMDX = createMDX({
  options: {
    // Plugin names as strings so Turbopack can load them. remark-frontmatter
    // strips the YAML block from the rendered post; lib/journal.ts parses it.
    remarkPlugins: ['remark-frontmatter', 'remark-gfm'],
  },
});

export default withMDX(nextConfig);

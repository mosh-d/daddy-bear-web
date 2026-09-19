/**
 * Page-weight budget for the static export. Runs after `next build` (see
 * package.json) and fails the build if any page's initial load is over
 * budget. The audience is mostly on phones on limited data, so this is
 * the check that stops the site getting heavy one small addition at a time.
 *
 * "Initial load" = the HTML plus everything it makes the browser fetch
 * before the page is usable: scripts, stylesheets and preloaded fonts and
 * images. Lazy-loaded images, third-party scripts (analytics, Tally,
 * YouTube) and the payloads for later client-side navigation are not
 * counted. Sizes are gzipped, which is roughly what goes over the wire.
 *
 * Usage: node scripts/check-budget.mjs [--out=out]
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

// Budgets in KB (gzipped). Measured baseline on 2026-09-19 is in CONTENT.md;
// raise these deliberately, never to make a failing build pass.
const BUDGET_TOTAL_KB = 300;
const BUDGET_JS_KB = 215;

const outDir = path.resolve(process.argv.find((a) => a.startsWith('--out='))?.slice(6) ?? 'out');

if (!fs.existsSync(outDir)) {
  console.error(`[budget] ${outDir} not found. Run \`next build\` first.`);
  process.exit(1);
}

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '_next' ? [] : htmlFiles(full);
    return entry.name.endsWith('.html') && !entry.name.startsWith('_') ? [full] : [];
  });
}

const gzCache = new Map();
function gzipKB(file) {
  if (!gzCache.has(file)) gzCache.set(file, zlib.gzipSync(fs.readFileSync(file), { level: 6 }).length / 1024);
  return gzCache.get(file);
}

function kind(url) {
  if (/\.m?js(\?|$)/.test(url)) return 'js';
  if (/\.css(\?|$)/.test(url)) return 'css';
  if (/\.(woff2?|ttf|otf)(\?|$)/.test(url)) return 'font';
  return 'other';
}

/** Same-origin resources the HTML loads up front. */
function initialResources(html) {
  const urls = new Set();
  for (const [, tag] of html.matchAll(/<(script|link)\b[^>]*>/g).map((m) => [m, m[0]])) {
    const src = tag.match(/\s(?:src|href)="([^"]+)"/)?.[1];
    if (!src || !src.startsWith('/')) continue;
    if (tag.startsWith('<script')) urls.add(src);
    else if (/rel="(stylesheet|preload|modulepreload)"/.test(tag)) urls.add(src);
  }
  return [...urls];
}

const rows = [];
let failed = false;

for (const file of htmlFiles(outDir).sort()) {
  const html = fs.readFileSync(file, 'utf8');
  const totals = { html: gzipKB(file), js: 0, css: 0, font: 0, other: 0 };
  for (const url of initialResources(html)) {
    const assetPath = path.join(outDir, decodeURIComponent(url.split('?')[0]));
    if (fs.existsSync(assetPath)) totals[kind(url)] += gzipKB(assetPath);
  }
  const total = Object.values(totals).reduce((a, b) => a + b, 0);
  const over = total > BUDGET_TOTAL_KB || totals.js > BUDGET_JS_KB;
  failed ||= over;
  rows.push({ page: '/' + path.relative(outDir, file).replace(/\\/g, '/'), ...totals, total, over });
}

const fmt = (n) => n.toFixed(1).padStart(7);
console.log(`\n[budget] Initial load per page, KB gzipped (limits: total ${BUDGET_TOTAL_KB}, JS ${BUDGET_JS_KB})`);
console.log(`${'page'.padEnd(46)}${'html'.padStart(7)}${'js'.padStart(7)}${'css'.padStart(7)}${'font'.padStart(7)}${'total'.padStart(8)}`);
for (const r of rows) {
  console.log(
    `${r.page.padEnd(46)}${fmt(r.html)}${fmt(r.js)}${fmt(r.css)}${fmt(r.font)} ${fmt(r.total)}${r.over ? '  OVER BUDGET' : ''}`,
  );
}

if (failed) {
  console.error('\n[budget] One or more pages are over the page-weight budget. See the table above.');
  process.exit(1);
}
console.log('\n[budget] All pages within budget.');

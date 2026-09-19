/**
 * Works around a Next.js 16 static-export bug on Windows. The client router
 * prefetches each page segment from a flat file such as
 *   out/film/__next.film.__PAGE__.txt
 * but when `next build` runs on Windows, the exporter builds that name from
 * a backslash path, so it writes a folder instead:
 *   out/film/__next.film/__PAGE__.txt
 * and every prefetch 404s. (node_modules/next/dist/export/index.js:
 * collectSegmentPaths returns path.relative() output, which has backslashes
 * on Windows, and convertSegmentPathToStaticExportFilename only replaces
 * forward slashes.)
 *
 * In a correct export, `__next.*` entries are always files, so any
 * `__next.*` directory is this bug. This flattens each one back into the
 * dotted file name the client asks for. On Linux (including Cloudflare
 * Pages' build) there's nothing to fix and it does nothing. Delete this
 * script once Next.js fixes the exporter.
 *
 * Usage: node scripts/fix-segment-paths.mjs [--out=out]
 */

import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve(process.argv.find((a) => a.startsWith('--out='))?.slice(6) ?? 'out');

function filesUnder(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(full) : [full];
  });
}

function brokenSegmentDirs(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (!entry.isDirectory() || entry.name === '_next') return [];
    const full = path.join(dir, entry.name);
    return entry.name.startsWith('__next.') ? [full] : brokenSegmentDirs(full);
  });
}

let fixed = 0;
for (const segmentDir of brokenSegmentDirs(outDir)) {
  for (const file of filesUnder(segmentDir)) {
    const rest = path.relative(segmentDir, file).split(path.sep).join('.');
    fs.renameSync(file, path.join(path.dirname(segmentDir), `${path.basename(segmentDir)}.${rest}`));
    fixed++;
  }
  fs.rmSync(segmentDir, { recursive: true });
}

if (fixed) console.log(`[segments] Flattened ${fixed} segment prefetch file(s) written as folders (Windows export bug).`);

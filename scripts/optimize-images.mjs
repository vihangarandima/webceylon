// Generates responsive WebP versions of every PNG/JPG under public/projects
// and public/masks:  name.webp (1600px wide) and name-800.webp (800px wide).
// The originals stay as the fallback. Run after adding screenshots:
//
//   npm run images
//
// Existing outputs newer than their source are skipped.

import { readdir, stat } from 'node:fs/promises';
import { join, extname, basename, dirname } from 'node:path';
import sharp from 'sharp';

const ROOTS = ['public/projects', 'public/masks'];
const SIZES = [
  { suffix: '', width: 1600 },
  { suffix: '-800', width: 800 },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const isNewer = async (a, b) => {
  try {
    return (await stat(a)).mtimeMs > (await stat(b)).mtimeMs;
  } catch {
    return true; // output missing
  }
};

let made = 0;
for (const root of ROOTS) {
  for await (const file of walk(root)) {
    if (!['.png', '.jpg', '.jpeg'].includes(extname(file).toLowerCase())) continue;
    const base = join(dirname(file), basename(file, extname(file)));
    for (const { suffix, width } of SIZES) {
      const out = `${base}${suffix}.webp`;
      if (!(await isNewer(file, out))) continue;
      await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(out);
      made++;
      console.log('→', out);
    }
  }
}
console.log(made ? `${made} image(s) written.` : 'Images up to date.');

import assert from 'node:assert/strict';
import { readFile, readdir, stat, writeFile, mkdir } from 'node:fs/promises';
import { join, resolve, relative } from 'node:path';
const root = resolve('dist');
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((e) => e.isDirectory() ? files(join(directory, e.name)) : [join(directory, e.name)]))).flat();
}
const htmlFiles = (await files(root)).filter((p) => p.endsWith('.html'));
const results = [];
const localTarget = async (path) => {
  const target = resolve(root, `.${path}`);
  assert.ok(target.startsWith(root), 'Path outside dist');
  try { return (await stat(target)).isDirectory() ? join(target, 'index.html') : target; }
  catch { throw new Error(`Missing local resource: ${path}`); }
};
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const path = relative(root, file).replaceAll('\\', '/');
  assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, `${path}: requires one H1`);
  assert.match(html, /<meta name="description" content="[^"<>]+"/, `${path}: missing description`);
  assert.match(html, /<link rel="canonical" href="https:\/\/doctorcell\.com\.ec\/[^"<>]*"/, `${path}: missing canonical`);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  for (const schema of schemas) JSON.parse(schema[1]);
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const url = new URL(href, 'https://doctorcell.com.ec');
    const target = await localTarget(decodeURIComponent(url.pathname));
    await stat(target);
    if (url.hash) {
      const targetHtml = await readFile(target, 'utf8');
      assert.ok(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${path}: missing anchor ${href}`);
    }
  }
  results.push({ path, schemas: schemas.length, h1: 1 });
}
const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
for (const location of locations) {
  const target = await localTarget(new URL(location).pathname);
  assert.doesNotMatch(await readFile(target, 'utf8'), /name="robots" content="noindex/, `Sitemap includes draft: ${location}`);
}
assert.doesNotMatch(sitemap, /terminos-rifa/);
await mkdir(resolve('verification'), { recursive: true });
await writeFile(resolve('verification/conversion-static-check.json'), JSON.stringify({ htmlPages: results.length, sitemapUrls: locations.length, results }, null, 2));
console.log(`Verified ${results.length} HTML pages: one H1, metadata, JSON-LD and local links. ${locations.length} sitemap URLs resolve without drafts.`);

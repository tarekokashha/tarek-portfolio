#!/usr/bin/env node
/**
 * Static build. Reads src/, writes dist/. No dependencies, no network.
 *
 *   node build.mjs           one-shot build
 *   node build.mjs --serve   build, then serve dist/ on :3000 and rebuild on change
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(root, 'src');
const STATIC = path.join(root, 'static');
const DIST = path.join(root, 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

async function copyDir(from, to) {
  await fs.mkdir(to, { recursive: true });
  for (const entry of await fs.readdir(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) await copyDir(src, dst);
    else await fs.copyFile(src, dst);
  }
}

async function build() {
  const t0 = Date.now();

  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });

  // Cache-bust the renderer so --serve picks up edits to src/*.mjs.
  const mod = await import(
    pathToFileURL(path.join(SRC, 'render.mjs')).href + '?t=' + Date.now()
  );

  await copyDir(STATIC, DIST);
  await fs.copyFile(path.join(SRC, 'styles.css'), path.join(DIST, 'styles.css'));
  await fs.copyFile(path.join(SRC, 'app.js'), path.join(DIST, 'app.js'));

  const html = mod.renderPage();
  await fs.writeFile(path.join(DIST, 'index.html'), html, 'utf8');

  // sitemap.xml is generated so lastmod never drifts from the deploy.
  const today = new Date().toISOString().slice(0, 10);
  const { site } = await import(
    pathToFileURL(path.join(SRC, 'data.mjs')).href + '?t=' + Date.now()
  );
  await fs.writeFile(
    path.join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site.url}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
    'utf8'
  );

  const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
  console.log(`built dist/ — index.html ${kb} kB in ${Date.now() - t0} ms`);
}

async function serve(port = 3000) {
  const server = http.createServer(async (req, res) => {
    try {
      let rel = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      if (rel.endsWith('/')) rel += 'index.html';
      const file = path.join(DIST, path.normalize(rel).replace(/^(\.\.[/\\])+/, ''));
      if (!file.startsWith(DIST)) {
        res.writeHead(403).end('Forbidden');
        return;
      }
      const body = await fs.readFile(file);
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(body);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
    }
  });
  server.listen(port, () => console.log(`serving dist/ on http://localhost:${port}`));

  const { watch } = await import('node:fs');
  let pending = null;
  for (const dir of [SRC, STATIC]) {
    watch(dir, { recursive: true }, () => {
      clearTimeout(pending);
      pending = setTimeout(() => build().catch(console.error), 80);
    });
  }
}

await build();
if (process.argv.includes('--serve')) await serve(Number(process.env.PORT) || 3000);

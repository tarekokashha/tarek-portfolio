#!/usr/bin/env node
/**
 * Verification harness. Builds, serves dist/, and drives a real browser over
 * the page: console errors, horizontal overflow, heading order, link targets,
 * and the interactive pieces that only exist at runtime.
 *
 *   npm run check            checks only
 *   npm run check -- --shots also writes screenshots to .shots/
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIST = path.join(root, 'dist');
const SHOTS = path.join(root, '.shots');
const wantShots = process.argv.includes('--shots');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

const results = [];
const ok = (m) => results.push(['pass', m]);
const bad = (m) => results.push(['FAIL', m]);

const server = http.createServer(async (req, res) => {
  let rel = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (rel.endsWith('/')) rel += 'index.html';
  try {
    const file = path.join(DIST, rel);
    const body = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('nope');
  }
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

// PLAYWRIGHT_CHROMIUM lets a sandbox point at a preinstalled binary instead
// of the revision this Playwright build would download.
const launchOpts = process.env.PLAYWRIGHT_CHROMIUM
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM }
  : {};
const browser = await chromium.launch(launchOpts);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
const failedRequests = [];
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text());
});
page.on('pageerror', (e) => consoleErrors.push(String(e)));
page.on('requestfailed', (r) => failedRequests.push(r.url() + ' — ' + r.failure()?.errorText));
page.on('response', (r) => {
  if (r.status() >= 400) failedRequests.push(r.url() + ' — HTTP ' + r.status());
});

await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

/* ------------------------------------------------------------ static checks */

const html = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');

if (/<html lang="en">/.test(html)) ok('html has lang');
else bad('html missing lang attribute');

if (/<title>.+<\/title>/.test(html)) ok('title present');
else bad('title missing');

// Every asset the document references must exist in dist/.
const refs = [...html.matchAll(/(?:href|src)="(\/[^"#]+)"/g)].map((m) => m[1]);
const missing = [];
for (const r of new Set(refs)) {
  try {
    await fs.access(path.join(DIST, r));
  } catch {
    missing.push(r);
  }
}
if (missing.length) bad('referenced files missing from dist: ' + missing.join(', '));
else ok(`all ${new Set(refs).size} referenced assets exist`);

/* ------------------------------------------------------------- live checks */

const h1s = await page.$$eval('h1', (n) => n.map((e) => e.textContent.trim()));
if (h1s.length === 1) ok('exactly one h1');
else bad(`expected 1 h1, found ${h1s.length}`);

const order = await page.$$eval('h1,h2,h3', (ns) =>
  ns.map((n) => Number(n.tagName[1]))
);
let jump = null;
for (let i = 1; i < order.length; i++) {
  if (order[i] - order[i - 1] > 1) jump = `${order[i - 1]} → ${order[i]} at index ${i}`;
}
if (jump) bad('heading level skipped: ' + jump);
else ok(`heading order sound across ${order.length} headings`);

const noAlt = await page.$$eval('img:not([alt])', (n) => n.length);
if (noAlt === 0) ok('every img has alt text');
else bad(`${noAlt} img without alt`);

const blankNoRel = await page.$$eval(
  'a[target="_blank"]:not([rel~="noopener"])',
  (n) => n.map((e) => e.href)
);
if (blankNoRel.length === 0) ok('all new-tab links carry rel=noopener');
else bad('missing rel=noopener: ' + blankNoRel.join(', '));

// Every in-page anchor must resolve to a real element.
const anchors = await page.$$eval('a[href^="#"]', (n) =>
  n.map((e) => e.getAttribute('href')).filter((h) => h !== '#')
);
const deadAnchors = [];
for (const a of new Set(anchors)) {
  const found = await page.$(a);
  if (!found) deadAnchors.push(a);
}
if (deadAnchors.length) bad('dead in-page anchors: ' + deadAnchors.join(', '));
else ok(`all ${new Set(anchors).size} in-page anchors resolve`);

// Clock, counters and the canvas only exist once app.js has run.
await page.waitForTimeout(1200);
const clock = await page.$eval('[data-clock]', (e) => e.textContent.trim());
if (/^\d{2}:\d{2}:\d{2} CLT$/.test(clock)) ok('Cairo clock is ticking (' + clock + ')');
else bad('clock did not render: ' + JSON.stringify(clock));

const armPainted = await page.$eval('[data-arm]', (c) => {
  const ctx = c.getContext('2d');
  const d = ctx.getImageData(0, 0, c.width, c.height).data;
  for (let i = 3; i < d.length; i += 4) if (d[i] !== 0) return true;
  return false;
});
if (armPainted) ok('robot arm canvas is painting');
else bad('robot arm canvas is blank');

/* ------------------------------------------------ overflow across viewports */

const viewports = [
  ['desktop', 1440, 900],
  ['laptop', 1180, 800],
  ['tablet', 834, 1112],
  ['mobile', 390, 844],
  ['small', 320, 700],
];

if (wantShots) await fs.mkdir(SHOTS, { recursive: true });

for (const [name, width, height] of viewports) {
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(350);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  if (overflow <= 1) ok(`${name} (${width}px) — no horizontal overflow`);
  else bad(`${name} (${width}px) — overflows by ${overflow}px`);

  if (wantShots) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(SHOTS, `${name}-top.png`) });
    await page.screenshot({ path: path.join(SHOTS, `${name}-full.png`), fullPage: true });
  }
}

/* -------------------------------------------------- graceful degradation */

// With scripting off the page must still read completely — the markup is
// static, so nothing may depend on app.js to become visible.
{
  const ctx = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const p = await ctx.newPage();
  await p.goto(base + '/', { waitUntil: 'load' });
  await p.waitForTimeout(2500); // let the CSS entrance animations finish

  const rows = await p.$$eval('.row', (n) => n.length);
  if (rows === 7) ok('no-JS — all 7 work entries render');
  else bad(`no-JS — expected 7 work entries, got ${rows}`);

  const stuck = await p.$$eval('*', (els) =>
    els
      .filter((e) => {
        const s = getComputedStyle(e);
        return (s.opacity === '0' || s.visibility === 'hidden') && !e.hasAttribute('data-chip');
      })
      .map((e) => e.className.toString() || e.tagName)
  );
  if (stuck.length === 0) ok('no-JS — nothing left invisible');
  else bad('no-JS — invisible without JS: ' + stuck.join(', '));

  await ctx.close();
}

// prefers-reduced-motion must still paint everything, including the canvas,
// which draws a single frame and has to survive a post-paint resize.
{
  const ctx = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 1440, height: 900 },
  });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await p.waitForTimeout(600);

  const faded = await p.$$eval('[data-reveal],[data-wipe]', (els) =>
    els.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.9).length
  );
  if (faded === 0) ok('reduced-motion — all content visible');
  else bad(`reduced-motion — ${faded} elements still faded out`);

  const painted = await p.$eval('[data-arm]', (c) => {
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    for (let i = 3; i < d.length; i += 4) if (d[i] !== 0) return true;
    return false;
  });
  if (painted) ok('reduced-motion — arm renders a static frame');
  else bad('reduced-motion — arm canvas is blank');

  if (errs.length) bad('reduced-motion page errors: ' + errs.join(', '));
  await ctx.close();
}

/* ------------------------------------------------------------------ mobile
   A phone has no hover and no keyboard: the nav has to open, trap, close and
   release the page, every control has to be thumb-sized, and an anchored jump
   has to clear the fixed masthead. */

for (const [label, width, height] of [
  ['phone', 390, 844],
  ['small phone', 320, 700],
  ['landscape', 844, 390],
]) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(base + '/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(900);

  // Anything under 44px on its longest edge is a miss waiting to happen.
  // .skip only exists while focused and .copy carries an ::after hit area.
  const small = await p.$$eval('a,button', (els) =>
    els
      .filter((e) => {
        if (e.classList.contains('skip') || e.classList.contains('copy')) return false;
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.height < 44;
      })
      .map((e) => (e.className || e.tagName) + ' — ' + Math.round(e.getBoundingClientRect().height) + 'px')
  );
  if (small.length === 0) ok(`${label} — every control clears a 44px touch target`);
  else bad(`${label} — controls under 44px: ${small.join(', ')}`);

  const burgerVisible = await p.$eval('[data-menu-btn]', (b) => getComputedStyle(b).display !== 'none');
  const wantsBurger = width <= 900;
  if (burgerVisible === wantsBurger) {
    ok(`${label} — ${wantsBurger ? 'burger' : 'inline nav'} is the one on show`);
  } else {
    bad(`${label} — burger ${burgerVisible ? 'visible' : 'hidden'} at ${width}px`);
  }

  if (wantsBurger) {
    // Closed, the panel must be out of the tab order, not merely transparent.
    const hidden = await p.$eval('[data-menu]', (n) => getComputedStyle(n).visibility === 'hidden');
    if (hidden) ok(`${label} — closed menu is out of the tab order`);
    else bad(`${label} — closed menu is still focusable`);

    await p.evaluate(() => window.scrollTo(0, 1500));
    await p.waitForTimeout(200);
    await p.click('[data-menu-btn]');
    await p.waitForTimeout(500);

    const open = await p.evaluate(() => ({
      expanded: document.querySelector('[data-menu-btn]').getAttribute('aria-expanded'),
      // The panel has to actually cover the screen, not collapse to a strip.
      h: Math.round(document.querySelector('[data-menu]').getBoundingClientRect().height),
      locked: document.documentElement.classList.contains('is-locked'),
      vh: window.innerHeight,
    }));
    if (open.expanded === 'true' && open.h > open.vh * 0.6) {
      ok(`${label} — menu opens full height (${open.h}px)`);
    } else {
      bad(`${label} — menu opened to ${open.h}px with aria-expanded=${open.expanded}`);
    }
    if (open.locked) ok(`${label} — page behind the menu is locked`);
    else bad(`${label} — page still scrolls behind the menu`);

    // Following a link has to close the panel, unlock the page, and land the
    // section clear of the masthead rather than under it.
    await p.click('.masthead__link[href="#about"]');
    await p.waitForTimeout(900);
    const after = await p.evaluate(() => ({
      expanded: document.querySelector('[data-menu-btn]').getAttribute('aria-expanded'),
      locked: document.documentElement.classList.contains('is-locked'),
      top: Math.round(document.getElementById('about').getBoundingClientRect().top),
      navH: Math.round(
        document.querySelector('[data-masthead]').getBoundingClientRect().height
      ),
    }));
    if (after.expanded === 'false' && !after.locked) ok(`${label} — link closes and unlocks`);
    else bad(`${label} — after a link: expanded=${after.expanded} locked=${after.locked}`);
    if (after.top >= after.navH) ok(`${label} — #about lands clear of the masthead`);
    else bad(`${label} — #about lands ${after.navH - after.top}px under the masthead`);
  }

  const overflow = await p.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  if (overflow <= 1) ok(`${label} — no horizontal overflow with touch emulation`);
  else bad(`${label} — overflows by ${overflow}px`);

  if (errs.length) bad(`${label} page errors: ` + errs.join(', '));
  await ctx.close();
}

/* ------------------------------------------------------------- diagnostics */

if (consoleErrors.length) bad('console errors:\n    ' + consoleErrors.join('\n    '));
else ok('no console errors');

if (failedRequests.length) bad('failed requests:\n    ' + failedRequests.join('\n    '));
else ok('no failed requests');

await browser.close();
server.close();

/* ------------------------------------------------------------------ report */

let failed = 0;
for (const [state, msg] of results) {
  if (state === 'FAIL') failed++;
  console.log(`${state === 'pass' ? '  ok ' : '  ✗  '} ${msg}`);
}
console.log(`\n${results.length - failed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);

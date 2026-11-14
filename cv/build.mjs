#!/usr/bin/env node
/**
 * Builds both CVs from content.mjs into one-page A4 PDFs.
 *
 *   node cv/build.mjs            writes cv/*.pdf and static/Tarek-Okasha-CV.pdf
 *   node cv/build.mjs --shots    also writes PNG previews to .shots/
 *
 * Needs Playwright with Chromium, same as scripts/check.mjs. Fonts are bundled in cv/fonts.
 * The build fails if either CV spills past one page.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

import { person, variants } from './content.mjs';

const { chromium } = createRequire(import.meta.url)('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(here);
const FONTS = path.join(here, 'fonts');
const wantShots = process.argv.includes('--shots');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escape, then turn **bold** into <strong>. */
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

async function fontFace(family, file, weight) {
  const data = (await fs.readFile(path.join(FONTS, file))).toString('base64');
  return `@font-face{font-family:'${family}';font-weight:${weight};font-style:normal;src:url(data:font/woff2;base64,${data}) format('woff2');}`;
}

function renderEntry(e) {
  const flow = e.flow
    ? `<div class="flow">${e.flow
        .map((s) => `<span class="flow__step">${esc(s)}</span>`)
        .join('<span class="flow__arrow">→</span>')}</div>`
    : '';
  return `
    <div class="entry">
      <div class="entry__top">
        <h3 class="entry__title">${esc(e.title)}${e.org ? `<span class="entry__org">${esc(e.org)}</span>` : ''}</h3>
        <span class="entry__date">${esc(e.date)}</span>
      </div>
      ${e.stack ? `<div class="entry__stack">${esc(e.stack)}</div>` : ''}
      ${flow}
      <ul class="bullets">${e.bullets.map((b) => `<li>${rich(b)}</li>`).join('')}</ul>
    </div>`;
}

function renderSection(s) {
  const entries = (s.entries || []).map(renderEntry).join('');
  const cards = s.cards
    ? `<div class="cards">
        <h3 class="cards__label">${esc(s.cards.label)}</h3>
        <div class="cards__grid">${s.cards.items
          .map((c) => `<div class="card"><div class="card__t">${esc(c.t)}</div><div class="card__d">${esc(c.d)}</div></div>`)
          .join('')}</div>
      </div>`
    : '';
  const skills = s.skills
    ? `<dl class="skills">${s.skills.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`
    : '';
  return `
    <section class="section">
      <div class="section__head"><h2 class="section__title">${esc(s.title)}</h2></div>
      ${entries}${cards}${skills}
    </section>`;
}

function renderPage(v, css, qr) {
  const fields = person.fields
    .map((f) => {
      const value = f.href ? `<a href="${esc(f.href)}">${esc(f.v)}</a>` : esc(f.v);
      return `<div class="field"><div class="field__k">${esc(f.k)}</div><div class="field__v">${value}</div></div>`;
    })
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(person.name)} · ${esc(v.role)} · CV</title>
<meta name="author" content="${esc(person.name)}">
<style>${css}</style>
</head>
<body class="theme-${v.theme}">
<main class="page">
  <div class="sheet">
    <header class="head">
      <div>
        <div class="head__bar"></div>
        <h1 class="name">${esc(person.name)}</h1>
        <p class="role">${esc(v.role)}<span class="role__sep"></span><span class="role__note">${esc(v.roleNote)}</span></p>
      </div>
      <a class="scan" href="https://${esc(person.portfolio)}">
        <div class="scan__text"><b>Portfolio</b>Live projects<br>and demos<span class="scan__url">${esc(person.portfolio)}</span></div>
        <div class="scan__qr">${qr}</div>
      </a>
    </header>

    <p class="summary">${esc(v.summary)}</p>

    <div class="fields">${fields}</div>

    <div class="proof">${v.proof
      .map((p) => `<div class="proof__cell"><div class="proof__v">${esc(p.v)}</div><div class="proof__k">${esc(p.k)}</div></div>`)
      .join('')}</div>

    ${v.sections.map(renderSection).join('')}
  </div>
</main>
</body>
</html>`;
}

// Static TrueType cuts, one file per weight. Chromium embeds these as real fonts;
// variable or CFF fonts end up as Type 3 outlines, which print and parse worse.
const faces = [
  ['Inter', 'inter', [400, 500, 600, 700]],
  ['Space Grotesk', 'space-grotesk', [500, 600, 700]],
  ['Azeret Mono', 'azeret-mono', [400, 500, 600]],
];
let css = '';
for (const [family, slug, weights] of faces) {
  for (const w of weights) css += await fontFace(family, `${slug}-${w}.woff2`, w);
}
css += await fs.readFile(path.join(here, 'cv.css'), 'utf8');
const qr = await fs.readFile(path.join(here, 'qr.svg'), 'utf8');

const launchOpts = process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {};
const browser = await chromium.launch(launchOpts);
let failed = false;

for (const v of variants) {
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
  await page.setContent(renderPage(v, css, qr), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  // Millimetres left between the end of the sheet and the bottom margin, at spacing scale k.
  const spareAt = (k) =>
    page.evaluate((k) => {
      document.documentElement.style.setProperty('--k', k);
      const pageEl = document.querySelector('.page');
      const sheet = document.querySelector('.sheet');
      const pad = parseFloat(getComputedStyle(pageEl).paddingBottom);
      const limit = pageEl.getBoundingClientRect().bottom - pad;
      return ((limit - sheet.getBoundingClientRect().bottom) / 96) * 25.4;
    }, k);

  // Open the spacing up until the page is full, so nothing is left hanging at the bottom.
  let lo = 1;
  let hi = 2.2;
  if ((await spareAt(hi)) >= 0) lo = hi;
  else if ((await spareAt(lo)) >= 0) {
    for (let i = 0; i < 14; i++) {
      const mid = (lo + hi) / 2;
      if ((await spareAt(mid)) >= 0) lo = mid;
      else hi = mid;
    }
  }
  const fit = { k: Math.round(lo * 100) / 100, spare: Math.round((await spareAt(lo)) * 10) / 10 };

  const out = path.join(here, `${v.file}.pdf`);
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true, tagged: true });

  if (wantShots) {
    await fs.mkdir(path.join(root, '.shots'), { recursive: true });
    await page.screenshot({ path: path.join(root, '.shots', `${v.file}.png`) });
  }
  await page.close();

  const status = fit.spare < 0 ? 'OVERFLOWS' : 'fits';
  if (fit.spare < 0) failed = true;
  console.log(`${v.file}.pdf  ${status}, spacing x${fit.k}, ${fit.spare}mm spare`);
}

await browser.close();

// The site serves the robotics CV as its downloadable resume.
await fs.copyFile(path.join(here, 'Tarek_Okasha_CV_Robotics.pdf'), path.join(root, 'static', 'Tarek-Okasha-CV.pdf'));

if (failed) {
  console.error('A CV is longer than one page. Trim content or tighten cv.css.');
  process.exit(1);
}

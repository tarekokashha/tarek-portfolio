#!/usr/bin/env node
/**
 * Renders the social card and the raster icons with the real typefaces,
 * using the Chromium that Playwright already ships.
 *
 *   npm run og
 *
 * Outputs are committed to static/, so neither Vercel nor CI needs a browser.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const STATIC = path.join(root, 'static');

const ACCENT = '#FF4A1C';
const INK = '#0E0E0F';
const BONE = '#EDE9E2';

/* ---------------------------------------------------------------- arm pose
   Same three-link chain and CCD solver the live canvas runs, evaluated once
   here so the card and the site agree on what the arm looks like. */

function armSvg(size = 470) {
  const ang = [-1.05, 0.95, 0.55];
  const bx = size * 0.46;
  const by = size * 0.9;
  const s = size / 470;
  const L = [150 * s, 122 * s, 62 * s];
  const reach = L[0] + L[1] + L[2];

  const fk = () => {
    let x = bx;
    let y = by;
    let a = 0;
    const pts = [{ x, y }];
    for (let i = 0; i < 3; i++) {
      a += ang[i];
      x += Math.cos(a) * L[i];
      y += Math.sin(a) * L[i];
      pts.push({ x, y });
    }
    return pts;
  };

  const limits = [
    [-2.7, -0.15],
    [-0.15, 2.5],
    [-2.0, 2.0],
  ];

  // A pose reaching up and to the right reads best in a 1.91:1 crop.
  const tx = bx + reach * 0.46;
  const ty = by - reach * 0.72;

  for (let it = 0; it < 40; it++) {
    for (let i = 2; i >= 0; i--) {
      const p = fk();
      const j = p[i];
      const e = p[3];
      let d = Math.atan2(ty - j.y, tx - j.x) - Math.atan2(e.y - j.y, e.x - j.x);
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      ang[i] = Math.max(limits[i][0], Math.min(limits[i][1], ang[i] + d * 0.36));
    }
  }

  const p = fk();
  const ee = p[3];
  const wa = ang[0] + ang[1] + ang[2];
  const nx = -Math.sin(wa);
  const ny = Math.cos(wa);
  const open = 4 * s;

  const link = (a, b, w) =>
    `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(
      1
    )}" stroke="${INK}" stroke-width="${w.toFixed(1)}" stroke-linecap="round"/>` +
    `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(
      1
    )}" stroke="${BONE}" stroke-width="${Math.max(1, w - 5.5).toFixed(
      1
    )}" stroke-linecap="round"/>`;

  const joints = [p[0], p[1], p[2]]
    .map((j, i) => {
      const r = (13 - i * 2) * s;
      return (
        `<circle cx="${j.x.toFixed(1)}" cy="${j.y.toFixed(1)}" r="${r.toFixed(
          1
        )}" fill="${BONE}" stroke="${INK}" stroke-width="2.6"/>` +
        `<circle cx="${j.x.toFixed(1)}" cy="${j.y.toFixed(1)}" r="${(r * 0.34).toFixed(
          1
        )}" fill="${ACCENT}"/>`
      );
    })
    .join('');

  const jaws = [-1, 1]
    .map((sgn) => {
      const ax = ee.x + nx * open * sgn;
      const ay = ee.y + ny * open * sgn;
      return `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${(
        ax + Math.cos(wa) * 15 * s
      ).toFixed(1)}" y2="${(ay + Math.sin(wa) * 15 * s).toFixed(
        1
      )}" stroke="${INK}" stroke-width="${(4 * s).toFixed(1)}" stroke-linecap="round"/>`;
    })
    .join('');

  // Frame the whole reach envelope plus the base rail, with a little air.
  const pad = 14 * s;
  const vx = bx - reach * 0.98 - pad;
  const vy = by - reach * 0.96 - pad;
  const vw = reach * 1.96 + pad * 2;
  const vh = reach * 0.96 + pad * 2 + 18 * s;

  return `<svg viewBox="${vx.toFixed(1)} ${vy.toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(
    1
  )}" xmlns="http://www.w3.org/2000/svg">
    <path d="M ${(bx - reach * 0.96).toFixed(1)} ${by} A ${(reach * 0.96).toFixed(1)} ${(
    reach * 0.96
  ).toFixed(1)} 0 0 1 ${(bx + reach * 0.96).toFixed(1)} ${by}"
      fill="none" stroke="rgba(14,14,15,0.13)" stroke-width="1" stroke-dasharray="3 6"/>
    <line x1="${(bx - reach * 0.98).toFixed(1)}" y1="${by}" x2="${(bx + reach * 0.98).toFixed(
    1
  )}" y2="${by}" stroke="rgba(14,14,15,0.2)" stroke-width="1"/>
    <circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="${(13 * s + 2).toFixed(
    1
  )}" fill="none" stroke="${ACCENT}" stroke-width="1"/>
    <path d="M ${(tx - 20 * s).toFixed(1)} ${ty.toFixed(1)} H ${(tx - 7 * s).toFixed(1)}
             M ${(tx + 7 * s).toFixed(1)} ${ty.toFixed(1)} H ${(tx + 20 * s).toFixed(1)}
             M ${tx.toFixed(1)} ${(ty - 20 * s).toFixed(1)} V ${(ty - 7 * s).toFixed(1)}
             M ${tx.toFixed(1)} ${(ty + 7 * s).toFixed(1)} V ${(ty + 20 * s).toFixed(1)}"
      stroke="${ACCENT}" stroke-width="1" fill="none"/>
    <path d="M ${(bx - 40 * s).toFixed(1)} ${by} L ${(bx + 40 * s).toFixed(1)} ${by} L ${(
    bx + 26 * s
  ).toFixed(1)} ${(by - 22 * s).toFixed(1)} L ${(bx - 26 * s).toFixed(1)} ${(
    by - 22 * s
  ).toFixed(1)} Z" fill="${INK}"/>
    ${link(p[0], p[1], 26 * s)}
    ${link(p[1], p[2], 21 * s)}
    ${link(p[2], p[3], 15 * s)}
    ${joints}
    ${jaws}
  </svg>`;
}

/* ------------------------------------------------------------------- card */

async function fontFace(family, file) {
  const buf = await fs.readFile(path.join(STATIC, 'fonts', file));
  return `@font-face{font-family:'${family}';font-style:normal;font-weight:300 700;
    src:url(data:font/woff2;base64,${buf.toString('base64')}) format('woff2');}`;
}

async function cardHtml() {
  const faces = [
    await fontFace('Space Grotesk', 'space-grotesk-latin.woff2'),
    await fontFace('Azeret Mono', 'azeret-mono-latin.woff2'),
  ].join('\n');

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${faces}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:${BONE};color:${INK};
  font-family:'Space Grotesk',sans-serif;overflow:hidden;position:relative;
  -webkit-font-smoothing:antialiased}
.wash{position:absolute;inset:0;
  background-image:linear-gradient(rgba(14,14,15,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(14,14,15,.05) 1px,transparent 1px);
  background-size:64px 64px;
  -webkit-mask-image:radial-gradient(120% 90% at 40% 30%,#000 30%,transparent 100%)}
.frame{position:relative;height:100%;display:grid;
  grid-template-columns:1fr 520px;align-items:center;padding:60px 64px 0}
.eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:26px;
  font:500 15px/1 'Azeret Mono',monospace;letter-spacing:.2em;text-transform:uppercase}
.dot{width:10px;height:10px;border-radius:50%;background:${ACCENT}}
h1{font:600 84px/.92 'Space Grotesk',sans-serif;letter-spacing:-.045em}
.stop{color:${ACCENT}}
p{margin-top:26px;max-width:26ch;font:300 21px/1.45 'Space Grotesk',sans-serif;color:#3A3835}
.arm{display:flex;align-items:center;justify-content:center;height:100%;padding-bottom:80px}
.arm svg{width:100%;height:auto;display:block}
.strip{position:absolute;left:0;right:0;bottom:0;display:flex;gap:44px;
  padding:20px 64px;background:${ACCENT};border-top:1px solid ${INK};
  font:500 15px/1 'Azeret Mono',monospace;letter-spacing:.16em;text-transform:uppercase}
.strip span:last-child{margin-left:auto}
</style></head><body>
<div class="wash"></div>
<div class="frame">
  <div>
    <div class="eyebrow"><span class="dot"></span>Tarek Okasha — Cairo, EG</div>
    <h1>Robotics &amp;<br>Automation<br>Engineer<span class="stop">.</span></h1>
    <p>Systems that run without supervision.</p>
  </div>
  <div class="arm">${armSvg()}</div>
</div>
<div class="strip">
  <span>ROS 2 / MoveIt 2</span><span>AI Automation</span><span>Full-Stack</span>
  <span>90+ systems live</span>
</div>
</body></html>`;
}

/* ------------------------------------------------------------------- icons */

const iconHtml = (size) => `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0}body{width:${size}px;height:${size}px;overflow:hidden}
svg{display:block;width:${size}px;height:${size}px}
</style></head><body>
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" fill="${INK}"/>
  <path d="M12 44h40" stroke="${ACCENT}" stroke-width="4" stroke-linecap="round"/>
  <path d="M20 44V26l12-8 12 12" stroke="${BONE}" stroke-width="5" fill="none"
    stroke-linejoin="round" stroke-linecap="round"/>
</svg></body></html>`;

/* -------------------------------------------------------------------- run */

const browser = await chromium.launch();

async function shot(html, width, height, out) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(STATIC, out), type: 'png' });
  await page.close();
  const { size } = await fs.stat(path.join(STATIC, out));
  console.log(`  ${out} — ${width}×${height}, ${(size / 1024).toFixed(1)} kB`);
}

console.log('rendering social card and icons…');
await shot(await cardHtml(), 1200, 630, 'og.png');
await shot(iconHtml(180), 180, 180, 'apple-touch-icon.png');
await shot(iconHtml(512), 512, 512, 'icon-512.png');
await browser.close();
console.log('done');

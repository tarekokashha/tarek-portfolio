# tarek-portfolio

Portfolio of **Tarek Okasha** — Robotics & Automation Engineer.

**Live:** https://tarek-okasha.vercel.app

A single-page site built as static HTML. No framework, no runtime dependencies,
no client-side rendering — the markup ships complete and the JavaScript only
adds motion on top of a page that already reads without it.

---

## Why it is built this way

The page was originally a React artifact that rendered itself in the browser:
nothing existed in the HTML until ~180 kB of React had downloaded and executed.
This rebuild inverts that. The content is rendered at build time into plain
HTML, styling lives in one stylesheet, and a single 20 kB script layers on the
scroll choreography and the robot-arm canvas.

Practical consequences:

- **First paint needs no JavaScript.** Crawlers, previews and readers with
  scripting off get the whole page.
- **Nothing depends on `app.js` to become visible.** Reveal animations opt
  elements *into* a hidden state only when an `IntersectionObserver` is also
  ready to bring them back, so a script failure degrades to a static page
  rather than a blank one.
- **Zero dependencies.** `npm install` installs nothing. The build is one Node
  script with no network access, so it will still run years from now.

## Layout

```
src/
  data.mjs      all copy and project data — the only file to edit for content
  render.mjs    renders data.mjs into the HTML document
  styles.css    design tokens, layout, components
  app.js        clock, reveals, counters, parallax, robot-arm canvas
static/         assets copied verbatim to the site root (fonts, CV, images)
scripts/
  og.mjs        regenerates the social card and icons (needs a browser)
  check.mjs     verification harness — runs a real browser over the build
build.mjs       reads src/ + static/, writes dist/
```

## Commands

```bash
npm run build   # write dist/
npm run dev     # build, serve on :3000, rebuild on change
npm run check   # build a browser over dist/ and assert 21 invariants
npm run og      # regenerate og.png and the raster icons
```

`npm run check` drives Chromium over the built site and verifies heading order,
alt text, `rel="noopener"`, that every referenced asset exists, that no viewport
from 320px up scrolls horizontally, that the clock and canvas actually run, and
that the page still reads with JavaScript disabled and with
`prefers-reduced-motion` set. It exits non-zero on failure, so it works in CI.

`npm run og` is the one command that needs a browser. Its output is committed to
`static/`, so neither Vercel nor CI ever has to install one.

## Editing content

Everything is in `src/data.mjs` — headline, projects, capabilities, brands,
method, about, stack, contact details. Add an entry to the `work` array and it
renders with the row layout, hover choreography and stat panel already wired.

To change the signal colour, edit `--ac` and `--ac-ink` in `src/styles.css`.
`--ac-ink` is the same hue darkened to hold 4.5:1 contrast against the bone
background; the two are meant to move together.

## Deployment

Vercel builds with `node build.mjs` and serves `dist/`. `vercel.json` sets
immutable caching for fonts and images, revalidation for the HTML shell, a
strict `Content-Security-Policy` (no inline script, no third-party origins),
HSTS, and `/cv` + `/resume` redirects to the PDF.

## Fonts

Space Grotesk and Azeret Mono are self-hosted from `static/fonts/` as
unicode-range subsets, preloaded for the latin subset. No Google Fonts request
is made, which removes a third-party round trip and keeps the CSP closed.
Both are licensed under the SIL Open Font License 1.1.

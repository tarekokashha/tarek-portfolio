import {
  site,
  nav,
  hero,
  marquee,
  position,
  capabilities,
  work,
  brands,
  process,
  about,
  stack,
  contact,
} from './data.mjs';

/* ------------------------------------------------------------------ helpers */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Attribute pair, omitted entirely when the value is falsy. */
const attr = (name, value) => (value ? ` ${name}="${esc(value)}"` : '');

const tags = (list, cls = 'tag') =>
  `<div class="tags">${list
    .map((t) => `<span class="${cls}">${esc(t)}</span>`)
    .join('')}</div>`;

/* -------------------------------------------------------------------- head */

const jsonLd = () =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    image: site.url + site.portrait,
    email: 'mailto:' + site.email,
    telephone: site.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: about.education.school },
    knowsLanguage: ['ar', 'en', 'de'],
    sameAs: [site.linkedin, site.github],
    knowsAbout: [
      'Robotics',
      'ROS 2',
      'MoveIt 2',
      'Industrial Automation',
      'PLC Programming',
      'Computer Vision',
      'AI Engineering',
      'Full-Stack Development',
    ],
  });

const head = () => `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(site.title)}</title>
<meta name="description" content="${esc(site.description)}">
<meta name="author" content="${esc(site.name)}">
<meta name="theme-color" content="#EDE9E2">
<link rel="canonical" href="${site.url}/">

<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(site.title)}">
<meta property="og:description" content="${esc(site.ogDescription)}">
<meta property="og:url" content="${site.url}/">
<meta property="og:locale" content="en_US">
<meta property="og:image" content="${site.url}${site.ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(site.name)} — ${esc(site.role)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(site.title)}">
<meta name="twitter:description" content="${esc(site.ogDescription)}">
<meta name="twitter:image" content="${site.url}${site.ogImage}">

<link rel="preload" href="/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/azeret-mono-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/styles.css">
<script type="application/ld+json">${jsonLd()}</script>`;

/* ------------------------------------------------------------------ chrome */

const masthead = () => `<header class="masthead" data-masthead>
  <a class="masthead__logo" href="#top">
    <span class="masthead__name">${esc(site.name)}</span>
    <span class="masthead__tag">R&amp;A Eng</span>
  </a>

  <button class="burger" type="button" data-menu-btn aria-controls="site-nav" aria-expanded="false">
    <span class="burger__label">Menu</span>
    <span class="burger__box" aria-hidden="true">
      <span class="burger__bar"></span>
      <span class="burger__bar"></span>
    </span>
  </button>

  <nav class="masthead__nav" id="site-nav" aria-label="Sections" data-menu>
    <div class="masthead__links">
      ${nav
        .map(
          (n, i) =>
            `<a class="masthead__link" href="#${n.id}"><span class="masthead__link-n" aria-hidden="true">0${
              i + 1
            }</span><span class="masthead__link-t">${esc(
              n.label
            )}</span><span class="masthead__link-a" aria-hidden="true">→</span></a>`
        )
        .join('\n      ')}
      <a class="masthead__cta" href="#contact"><span class="dot dot--sm"></span>Contact</a>
    </div>

    <div class="masthead__foot" aria-hidden="true">
      <span class="masthead__foot-k">Direct</span>
      <span class="masthead__foot-v">${esc(site.email)}</span>
      <span class="masthead__foot-v">${esc(site.phone)}</span>
    </div>
  </nav>
</header>`;

/* -------------------------------------------------------------------- hero */

const heroSection = () => `<section class="hero" id="top">
  <div class="grid-wash"></div>

  <div class="hero__grid">
    <div class="hero__copy" data-hero>
      <div class="hero__status">
        <span class="dot"></span>
        <span class="hero__available">${esc(site.availability)}</span>
        <span class="hero__hair"></span>
        <span class="hero__place">${esc(site.location)}</span>
      </div>

      <h1 class="hero__title">
        ${hero.headline
          .map(
            (line, i) =>
              `<span class="hero__line">${esc(line)}${
                i === hero.headline.length - 1 ? '<span class="hero__stop">.</span>' : ''
              }</span>`
          )
          .join('\n        ')}
      </h1>

      <p class="hero__lede">${esc(hero.lede)}</p>

      <div class="hero__actions">
        <a class="btn btn--solid" href="#work" data-mag>Selected work<span class="btn__glyph" aria-hidden="true">↓</span></a>
        <a class="btn btn--ghost" href="#contact" data-mag>Start a project<span class="btn__glyph" aria-hidden="true">→</span></a>
      </div>
    </div>

    <div class="stage" data-stage>
      <canvas class="stage__canvas" data-arm aria-hidden="true"></canvas>
      <div class="stage__corner stage__corner--tl"></div>
      <div class="stage__corner stage__corner--tr"></div>
      <div class="stage__corner stage__corner--bl"></div>
      <div class="stage__corner stage__corner--br"></div>
      <div class="stage__label">
        <span class="stage__line">UR5e · 6-DOF</span>
        <span class="stage__line stage__line--spec">MoveIt 2 / CCD solver</span>
        <span class="stage__line stage__hint stage__hint--pointer">Move cursor · click to grip</span>
        <span class="stage__line stage__hint stage__hint--touch">Drag to aim · tap to grip</span>
      </div>
      <div class="stage__telemetry" data-telemetry aria-hidden="true">J1 +000.0°
J2 +000.0°
J3 +000.0°
GRIP 0%</div>
    </div>
  </div>

  <div class="facts">
    ${hero.facts
      .map(
        (f) => `<div class="fact">
      <div class="fact__k">${esc(f.k)}</div>
      <div class="fact__v${f.clock ? ' fact__v--mono' : ''}"${f.clock ? ' data-clock' : ''}>${esc(
          f.v
        )}</div>
    </div>`
      )
      .join('\n    ')}
  </div>
</section>`;

/* ----------------------------------------------------------------- ticker */

const tickerGroup = () =>
  `<div class="ticker__group">${marquee
    .map((m) => `<span>${esc(m)}</span><span aria-hidden="true">◆</span>`)
    .join('')}</div>`;

const ticker = () => `<div class="ticker">
  <div class="ticker__track" data-marq aria-hidden="true">
    ${tickerGroup()}
    ${tickerGroup()}
  </div>
</div>`;

/* --------------------------------------------------------------- position */

const positionSection = () => `<section class="section">
  <div class="split">
    <div class="split__label" data-reveal><span class="eyebrow__n">01</span> — Position</div>
    <div>
      <p class="lead-para" data-reveal>${esc(position.lead)}</p>
      <p class="body-para" data-reveal>${esc(position.body)}</p>
      <div class="stats" data-reveal>
        ${position.stats
          .map(
            (s) => `<div class="stat">
          <div class="stat__v" data-count>${esc(s.v)}${
              s.accent ? `<span class="stat__v-accent">${esc(s.accent)}</span>` : ''
            }</div>
          <div class="stat__k">${s.k}</div>
        </div>`
          )
          .join('\n        ')}
      </div>
    </div>
  </div>
</section>`;

/* ----------------------------------------------------------- capabilities */

const capabilitiesSection = () => `<section class="section section--rule" id="capabilities">
  <div class="shell">
    <div class="head head--wide" data-reveal>
      <h2 class="head__title" data-wipe>What I build</h2>
      <span class="eyebrow"><span class="eyebrow__n">02</span> — Capabilities</span>
    </div>
    <div class="caps">
      ${capabilities
        .map(
          (c) => `<div class="cap" data-reveal>
        <span class="cap__n">${esc(c.n)}</span>
        <h3 class="cap__title">${esc(c.title)}</h3>
        <p class="cap__body">${esc(c.body)}</p>
        ${tags(c.tags)}
      </div>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>`;

/* --------------------------------------------------------------------- work */

const workRow = (p) => {
  const tag = p.href ? 'a' : 'div';
  const link = p.href
    ? ` href="${esc(p.href)}" target="_blank" rel="noopener"`
    : '';
  const label = p.href
    ? ` aria-label="${esc(p.title)} — opens ${esc(p.client)} in a new tab"`
    : '';
  return `<${tag} class="row" data-reveal data-row${link}${label}>
        <span class="row__bar" aria-hidden="true"></span>
        <div class="row__grid">
          <div class="row__idx">${esc(p.idx)}<br><span>${esc(p.year)}</span></div>
          <div class="row__main">
            <div class="row__meta">
              <span class="row__client">${esc(p.client)}</span>
              <span class="row__dash" aria-hidden="true"></span>
              ${
                p.live
                  ? `<span class="row__live">View live<span class="arrow" aria-hidden="true">↗</span></span>`
                  : ''
              }${
                p.internal
                  ? `<span class="row__private">Private — no public deployment</span>`
                  : ''
              }
            </div>
            <h3 class="row__title">${esc(p.title)}</h3>
            <p class="row__outcome">${esc(p.outcome)}</p>
            ${tags(p.tags, 'tag tag--wide tag--dark')}
          </div>
          <div class="row__stats">
            ${p.stats
              .map(
                (s) => `<div class="row__stat">
              <span class="row__stat-v">${esc(s.v)}</span>
              <span class="row__stat-k">${esc(s.k)}</span>
            </div>`
              )
              .join('\n            ')}
          </div>
        </div>
      </${tag}>`;
};

const workSection = () => `<section class="section section--dark" id="work">
  <div class="work__list">
    <div class="head" data-reveal>
      <h2 class="head__title" data-wipe>Selected work</h2>
      <span class="eyebrow"><span class="eyebrow__n">03</span> — Seven systems, robots to storefronts</span>
    </div>
    ${work.map(workRow).join('\n    ')}
    <div class="work__end"></div>
  </div>
</section>`;

/* ------------------------------------------------------------------ brands */

const brandsSection = () => `<section class="section" id="brands">
  <div class="shell">
    <div class="head head--tight" data-reveal>
      <h2 class="head__title" data-wipe>Brands, end to end</h2>
      <span class="eyebrow"><span class="eyebrow__n">04</span> — Presence &amp; partnership</span>
    </div>
    <p class="brands__lede" data-reveal>${esc(brands.lede)}</p>

    <a class="panel feature" href="${esc(brands.feature.href)}" target="_blank" rel="noopener" data-reveal
       aria-label="${esc(brands.feature.name)} — opens in a new tab">
      <div class="feature__grid">
        <div>
          <div class="feature__head">
            <span class="feature__eyebrow">${esc(brands.feature.eyebrow)}</span>
            <span class="panel__arrow" aria-hidden="true">↗</span>
          </div>
          <h3 class="feature__name">${esc(brands.feature.name)}</h3>
          <p class="feature__body">${esc(brands.feature.body)}</p>
          ${tags(brands.feature.tags, 'tag tag--wide')}
        </div>
        <div>
          <div class="feature__stats-label">${esc(brands.feature.statsLabel)}</div>
          <div class="feature__stats">
            ${brands.feature.stats
              .map(
                (s) => `<div class="feature__stat">
              <div class="feature__stat-v" data-count>${esc(s.v)}</div>
              <div class="feature__stat-k">${esc(s.k)}</div>
            </div>`
              )
              .join('\n            ')}
          </div>
          <div class="feature__meta">${brands.feature.meta
            .map((m) => `<span>${esc(m)}</span>`)
            .join('')}</div>
          <div class="feature__note">${esc(brands.feature.note)}</div>
        </div>
      </div>
    </a>

    <div class="collection__head" data-reveal>
      <h3 class="collection__title">${esc(brands.collection.name)}</h3>
      <span class="collection__meta">${esc(brands.collection.meta)}</span>
    </div>

    <div class="collection__grid">
      ${brands.collection.items
        .map(
          (c) => `<a class="panel card" href="${esc(c.href)}" target="_blank" rel="noopener" data-reveal
        aria-label="${esc(c.mark + c.markAccent)} — opens in a new tab">
        <div class="card__head">
          <span class="card__eyebrow">${esc(c.eyebrow)}</span>
          <span class="panel__arrow card__arrow" aria-hidden="true">↗</span>
        </div>
        <div class="card__mark">${esc(c.mark)}<span class="card__mark-accent">${esc(
            c.markAccent
          )}</span></div>
        <p class="card__body">${esc(c.body)}</p>
        <div class="card__tags">${tags(c.tags, 'tag tag--wide tag--dark')}</div>
        <div class="card__domain">${esc(c.domain)}</div>
      </a>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------------ method */

const processSection = () => `<section class="section section--rule">
  <div class="split">
    <div class="split__label" data-reveal>
      <span><span class="eyebrow__n">05</span> — Method</span>
      <h2 class="split__heading" data-wipe>How the work<br>actually goes</h2>
    </div>
    <div class="process">
      ${process
        .map(
          (s) => `<div class="step" data-reveal>
        <span class="step__n">${esc(s.n)}</span>
        <div>
          <h3 class="step__t">${esc(s.t)}</h3>
          <p class="step__d">${esc(s.d)}</p>
        </div>
      </div>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------------- about */

const aboutSection = () => `<section class="section section--dark" id="about">
  <div class="shell">
    <div class="head" data-reveal>
      <h2 class="head__title" data-wipe>About</h2>
      <span class="eyebrow"><span class="eyebrow__n">06</span> — Cairo, Egypt · Working remote</span>
    </div>
    <div class="about__grid">
      <div data-reveal>
        <figure class="figure">
          <img class="figure__img" src="${site.portrait}" alt="Portrait of ${esc(
  site.name
)}" width="1086" height="1448" data-wipe>
          <div class="figure__inner" aria-hidden="true"></div>
        </figure>
        <div class="figure__caption">
          <span>${esc(about.figure.caption)}</span><span>${esc(about.figure.coords)}</span>
        </div>

        <div class="about__facts">
          ${about.facts
            .map(
              (f) => `<div class="about__fact">
            <div class="about__fact-k">${esc(f.k)}</div>
            <div class="about__fact-v">${esc(f.v)}</div>
          </div>`
            )
            .join('\n          ')}
        </div>

        <div class="edu">
          <div class="edu__label">Education</div>
          <div class="edu__box">
            <div class="edu__school">${esc(about.education.school)}</div>
            <div class="edu__detail">${esc(about.education.detail)}</div>
            <div class="edu__badges">
              ${about.education.badges
                .map(
                  (b) =>
                    `<span class="badge${b.accent ? ' badge--accent' : ''}">${esc(
                      b.label
                    )}</span>`
                )
                .join('\n              ')}
            </div>
          </div>
        </div>
      </div>

      <div>
        <p class="about__lead" data-reveal>${esc(about.lead)}</p>
        ${about.paragraphs
          .map((p) => `<p class="about__para" data-reveal>${esc(p)}</p>`)
          .join('\n        ')}
        <blockquote class="quote" data-reveal>${esc(about.quote)}</blockquote>

        <div class="stack" data-reveal>
          <div class="stack__label">Technical stack</div>
          <div class="stack__grid">
            ${stack
              .map(
                (g) => `<div class="stack__group">
              <div class="stack__name">${esc(g.name)}</div>
              ${g.items
                .map((i) => `<div class="stack__item">${esc(i)}</div>`)
                .join('\n              ')}
            </div>`
              )
              .join('\n            ')}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

/* ----------------------------------------------------------------- contact */

const contactSection = () => `<section class="contact" id="contact">
  <div class="grid-wash grid-wash--contact"></div>
  <div class="contact__inner">
    <div class="contact__eyebrow" data-reveal>
      <span class="dot"></span>
      <span><span class="eyebrow__n">07</span> — ${esc(contact.eyebrow)}</span>
    </div>
    <h2 class="contact__title" data-reveal data-wipe>${esc(
      contact.headline
    )}<span class="hero__stop">.</span></h2>
    <p class="contact__body" data-reveal>${esc(contact.body)}</p>

    <div class="contacts" data-reveal>
      <div class="contact-item">
        <div class="contact-item__k">Email</div>
        <div class="contact-item__v contact-item__v--row">
          <a class="contact-item__mail" href="mailto:${esc(site.email)}">${esc(
  site.email
).replace(
  '@',
  '<wbr>@'
)}</a>
          <button class="copy" type="button" data-copy="${esc(
            site.email
          )}">Copy</button>
        </div>
      </div>
      <a class="contact-item" href="${esc(
        site.whatsapp
      )}" target="_blank" rel="noopener">
        <div class="contact-item__k">WhatsApp</div>
        <div class="contact-item__v">${esc(site.phone)}</div>
      </a>
      <a class="contact-item" href="${esc(
        site.linkedin
      )}" target="_blank" rel="noopener">
        <div class="contact-item__k">LinkedIn</div>
        <div class="contact-item__v">${esc(site.linkedinHandle)}</div>
      </a>
      <a class="contact-item" href="${esc(
        site.github
      )}" target="_blank" rel="noopener">
        <div class="contact-item__k">GitHub</div>
        <div class="contact-item__v">${esc(site.githubHandle)}</div>
      </a>
    </div>

    <a class="cv" href="${site.cv}" download="Tarek-Okasha-CV.pdf" data-reveal>
      <span class="cv__label-group">
        <span class="cv__label">Résumé</span>
        <span class="cv__title">${esc(contact.cvLabel)}</span>
      </span>
      <span class="cv__action">Download PDF<span class="cv__arrow" aria-hidden="true">↓</span></span>
    </a>
  </div>
</section>`;

/* ------------------------------------------------------------------ footer */

const footer = () => `<footer class="footer">
  <div class="shell">
    <div class="wordmark" data-wordmark aria-hidden="true">TAREK OKASHA</div>
    <h2 class="visually-hidden" hidden>${esc(site.name)}</h2>
    <div class="footer__row">
      <span>© ${site.year} ${esc(site.name)} — ${esc(site.role)}</span>
      <span>Cairo, Egypt — Working remote, worldwide</span>
      <a href="${site.cv}" download="Tarek-Okasha-CV.pdf">Résumé ↓</a>
      <a href="${esc(site.github)}" target="_blank" rel="noopener">GitHub ↗</a>
      <a href="#top">Back to top ↑</a>
    </div>
  </div>
</footer>`;

/* -------------------------------------------------------------------- page */

export function renderPage() {
  return `<!doctype html>
<html lang="en">
<head>
${head()}
</head>
<body>
<a class="skip" href="#work">Skip to the work</a>
<div class="cursor-chip" data-chip aria-hidden="true">View live ↗</div>
<div class="progress" aria-hidden="true"><div class="progress__bar" data-progress></div></div>

${masthead()}

<main>
${heroSection()}

${ticker()}

${positionSection()}

${capabilitiesSection()}

${workSection()}

${brandsSection()}

${processSection()}

${aboutSection()}

${contactSection()}
</main>

${footer()}

<script src="/app.js" defer></script>
</body>
</html>
`;
}

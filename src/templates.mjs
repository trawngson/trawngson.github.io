import * as icons from "./icons.mjs"
import { site, peek, skills, community, filters, projects } from "./content.mjs"

const CDN = {
  gsap: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js",
  scrollTrigger: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js",
  splitText: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js",
  flip: "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Flip.min.js",
  lenis: "https://cdn.jsdelivr.net/npm/lenis@1.3.3/dist/lenis.min.js",
  matter: "https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js",
}

const IMG = "/assets/img/"

export const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")

const attr = (value) => esc(value)
const href = (project) => `/works/${project.slug}/`
const arrow = `<svg class="arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
const external = `<svg class="arrow arrow--ext" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`

// ---------------------------------------------------------------------------
// Shell
// ---------------------------------------------------------------------------

export function layout({ title, description = site.description, path = "/", body, page, scripts = [], jsonLd, image }) {
  const url = site.url + path
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Portfolio`
  const ogImage = site.url + (image ?? "/assets/img/og-card.jpg")
  const scriptTags = [CDN.gsap, CDN.scrollTrigger, CDN.splitText, CDN.flip, CDN.lenis, ...scripts]
    .map((src) => `<script defer src="${src}"></script>`)
    .join("\n")
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${attr(description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${attr(site.name)}">
<meta property="og:title" content="${attr(fullTitle)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#f8f6f3">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap">
<link rel="stylesheet" href="/assets/css/site.css">
<script>
// Hide animated elements only when motion is allowed, and show them again if
// the motion script never starts (blocked CDN, old browser, script error).
(function () {
  var d = document.documentElement
  d.classList.add("js")
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return
  d.classList.add("motion")
  setTimeout(function () { if (!d.classList.contains("motion-ready")) d.classList.remove("motion") }, 3000)
})()
</script>
${scriptTags}
<script defer src="/assets/js/main.js"></script>
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ""}
</head>
<body data-page="${page}">
<a class="skip-link" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"><span></span></div>
${nav(page)}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>
`
}

function nav(page) {
  const current = (name) => (page === name ? ' aria-current="page"' : "")
  return `<header class="nav-wrap">
  <nav class="nav" aria-label="Primary">
    <a class="nav-link" href="/works/"${current("works")}><span>Works</span></a>
    <a class="logo" href="/" aria-label="Truong Son, home"${current("home")}>truong<em>son</em></a>
    <a class="nav-link" href="/contact/"${current("contact")}><span>Contact</span></a>
  </nav>
</header>`
}

function footer() {
  return `<footer class="footer">
  <a class="logo logo--footer" href="/" aria-label="Truong Son, home">truong<em>son</em></a>
  <p>© ${site.year} Made with <span class="heart" aria-label="love">♥️</span> from TS</p>
  <button class="to-top" type="button" data-to-top>Back to top <span aria-hidden="true">↑</span></button>
</footer>`
}

function contactCta({ heading = "h2", withLove = false } = {}) {
  const rows = site.socials
    .map(
      (s) => `<li>
      <a class="contact-row" href="${s.href}"${s.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""} data-magnetic>
        <span class="contact-label">${esc(s.label)}</span>
        <span class="contact-value">${esc(s.value)} ${s.href.startsWith("http") ? external : arrow}</span>
      </a>${s.copy ? `<button class="copy-btn" type="button" data-copy="${attr(s.value)}" aria-label="Copy email address"><span>Copy</span></button>` : ""}
    </li>`,
    )
    .join("\n")
  return `<section class="contact" aria-labelledby="contact-title">
  <div class="section-head">
    ${icons.fax}
    <${heading} id="contact-title" class="section-title section-title--xl" data-split>Ready to build something amazing?</${heading}>
    <p class="section-lede" data-reveal>I'd love to connect with you!</p>
  </div>
  <ul class="contact-list" data-stagger>
    ${rows}
  </ul>
  ${withLove ? `<p class="contact-love" data-reveal>Love what you see? <a href="mailto:${site.email}">Send me an email</a></p>` : ""}
</section>`
}

// ---------------------------------------------------------------------------
// Covers
// ---------------------------------------------------------------------------

const vtStyle = (project, vt) => (vt ? ` style="view-transition-name: cover-${project.slug}"` : "")

export function cover(project, { vt = false, eager = false } = {}) {
  const c = project.cover
  const loading = eager ? 'fetchpriority="high"' : 'loading="lazy"'
  const label = `role="img" aria-label="${attr(c.alt)}"`
  switch (c.type) {
    case "phones":
      return `<div class="cover cover--phones" ${label}${vtStyle(project, vt)}>
  <img class="cover-art" src="${IMG}art/${c.art}-wide.webp" alt="" width="1600" height="1000" ${loading} decoding="async" data-depth="0.15">
  <div class="cover-phones">
    ${c.phones.map((p, i) => `<div class="cover-phone cover-phone--${i + 1}"><img src="${IMG}${p}" alt="" width="502" height="966" ${loading} decoding="async" data-depth="${[0.5, 0.8, 0.5][i]}"></div>`).join("\n    ")}
  </div>
</div>`
    case "object":
      return `<div class="cover cover--object" ${label}${vtStyle(project, vt)}>
  <img class="cover-art" src="${IMG}art/${c.art}-wide.webp" alt="" width="1600" height="1000" ${loading} decoding="async" data-depth="0.15">
  <div class="cover-object" style="aspect-ratio: ${c.width} / ${c.height}"><img src="${IMG}${c.object}" alt="" width="${c.width}" height="${c.height}" ${loading} decoding="async" data-depth="0.7"></div>
</div>`
    case "image":
      return `<div class="cover cover--image" ${label}${vtStyle(project, vt)}>
  <img class="cover-img" src="${IMG}${c.src}" alt="" width="${c.width}" height="${c.height}" ${loading} decoding="async" data-depth="0.15">
</div>`
    case "browser":
      return `<div class="cover cover--browser cover--${c.tone}" ${label}${vtStyle(project, vt)}>
  <div class="browser" style="--bar: ${c.bar}; --page-w: ${c.width}" data-depth="0.5">
    ${safariToolbar(c.url)}
    <img src="${IMG}${c.src}" alt="" width="${c.width}" height="${c.height}" ${loading} decoding="async">
  </div>
</div>`
    case "tool-media":
      return mediaCover(project, label, vt)
    case "tool-blur":
      return blurCover(project, label, vt)
    case "tool-math":
      return mathCover(project, label, vt)
    case "tool-morse":
      return morseCover(project, label, vt)
    default:
      throw new Error(`Unknown cover type ${c.type}`)
  }
}

// A Safari window toolbar drawn at macOS proportions (traffic lights, sidebar,
// back and forward, a centered address field, share, new tab, tab overview).
const SYMBOL = {
  sidebar: '<svg viewBox="0 0 20 16"><rect x="1" y="1.5" width="18" height="13" rx="3"/><path d="M7.5 1.5v13M3.4 4.6h2M3.4 7h2M3.4 9.4h2"/></svg>',
  back: '<svg viewBox="0 0 12 16"><path d="M8.5 2.5 3 8l5.5 5.5"/></svg>',
  forward: '<svg viewBox="0 0 12 16"><path d="M3.5 2.5 9 8l-5.5 5.5"/></svg>',
  reload: '<svg viewBox="0 0 16 16"><path d="M13 8a5 5 0 1 1-1.6-3.7"/><path d="M11.8 1.6v3h-3"/></svg>',
  share: '<svg viewBox="0 0 16 18"><path d="M8 11V1.8M4.8 4.8 8 1.6l3.2 3.2"/><path d="M5.2 7.5H3.8a1.8 1.8 0 0 0-1.8 1.8v5.4a1.8 1.8 0 0 0 1.8 1.8h8.4a1.8 1.8 0 0 0 1.8-1.8V9.3a1.8 1.8 0 0 0-1.8-1.8h-1.4"/></svg>',
  plus: '<svg viewBox="0 0 16 16"><path d="M8 2v12M2 8h12"/></svg>',
  tabs: '<svg viewBox="0 0 18 16"><rect x="1.5" y="4.5" width="11" height="10" rx="2.2"/><path d="M5 2.2h8.3a2.2 2.2 0 0 1 2.2 2.2v7.4"/></svg>',
}

const safariToolbar = (url) => `<div class="safari-bar" aria-hidden="true">
      <span class="traffic"><i></i><i></i><i></i></span>
      <span class="sf sf--sidebar">${SYMBOL.sidebar}</span>
      <span class="sf sf--nav">${SYMBOL.back}${SYMBOL.forward}</span>
      <span class="safari-url"><span>${esc(url)}</span>${SYMBOL.reload}</span>
      <span class="sf sf--right">${SYMBOL.share}${SYMBOL.plus}${SYMBOL.tabs}</span>
    </div>`

const HAND = {
  points: [
    [100, 215], [72, 196], [52, 173], [40, 151], [30, 131],
    [78, 141], [72, 106], [68, 83], [65, 61],
    [100, 136], [100, 96], [100, 71], [100, 47],
    [121, 141], [127, 105], [131, 83], [134, 63],
    [139, 153], [149, 127], [155, 111], [160, 95],
  ],
  bones: [
    [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12],
    [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17],
  ],
}

function mediaCover(project, label, vt) {
  const lines = HAND.bones
    .map(([a, b]) => `<line x1="${HAND.points[a][0]}" y1="${HAND.points[a][1]}" x2="${HAND.points[b][0]}" y2="${HAND.points[b][1]}"/>`)
    .join("")
  const dots = HAND.points.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === 0 ? 6 : 4.5}"/>`).join("")
  return `<div class="cover cover--tool cover--media" ${label}${vtStyle(project, vt)}>
  <div class="media-frame">
    <span class="media-live"><i></i>webcam</span>
    <span class="media-fps">FPS: 30</span>
    <svg class="media-hand" viewBox="0 0 200 240" aria-hidden="true"><g class="bones">${lines}</g><g class="joints">${dots}</g></svg>
    <span class="media-status"><b class="st st--next">NEXT TRACK</b><b class="st st--prev">PREVIOUS TRACK</b><b class="st st--play">PLAY/PAUSE</b></span>
  </div>
  <div class="media-player" aria-hidden="true">
    <span class="mp-art"></span>
    <span class="mp-meta"><b>Now playing</b><i>Spotify</i></span>
    <span class="mp-controls"><i class="c c--prev">⏮</i><i class="c c--play">⏯</i><i class="c c--next">⏭</i></span>
  </div>
</div>`
}

function blurCover(project, label, vt) {
  const rows = [
    ["Further Maths: Unit 4 test", "47 / 50"],
    ["Physics: Lab report", "9.5 / 10"],
    ["Computer Science: Project", "A*"],
  ]
  return `<div class="cover cover--tool cover--blur" ${label}${vtStyle(project, vt)}>
  <div class="lms" aria-hidden="true">
    <div class="lms-head"><span class="lms-logo"></span><b>Dashboard</b><span class="lms-pill">Canvas</span></div>
    <div class="lms-panel">
      <p class="lms-title">Recent Feedback</p>
      ${rows.map(([name, grade], i) => `<div class="lms-row lms-row--${i + 1}"><span class="lms-check">✓</span><span class="lms-name">${esc(name)}</span><span class="lms-grade">${esc(grade)}</span></div>`).join("\n      ")}
    </div>
  </div>
  <span class="blur-spy" aria-hidden="true">🕵️</span>
  <svg class="blur-cursor" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6 1.5L10 19z" fill="#fff" stroke="#001666" stroke-width="1.6" stroke-linejoin="round"/></svg>
</div>`
}

function mathCover(project, label, vt) {
  return `<div class="cover cover--tool cover--math" ${label}${vtStyle(project, vt)}>
  <div class="term">
    <div class="term-bar" aria-hidden="true"><span class="browser-dots"><i></i><i></i><i></i></span><span>java Main</span></div>
    <pre class="term-body" data-math aria-hidden="true"><span class="t-dim">[LEVEL 3]</span>
Alright, Son. What is the type of the following sequence?
Your sequence is: <b>3, 6, 11, 18, 27</b>
A. Arithmetic   B. Quadratic
C. Cubic        D. Prime
&gt; <b class="t-orange">B</b>
<span class="t-green">Congratulations! That is correct.</span>
Your level has increased to LEVEL 4!<span class="t-caret"></span></pre>
  </div>
</div>`
}

const MORSE = { S: "...", O: "---", N: "-." }

function morseCover(project, label, vt) {
  const letters = "SON"
    .split("")
    .map(
      (letter) =>
        `<span class="m-letter">${MORSE[letter]
          .split("")
          .map((sym) => `<i class="m-${sym === "." ? "dot" : "dash"}"></i>`)
          .join("")}<b>${letter}</b></span>`,
    )
    .join("")
  return `<div class="cover cover--tool cover--morse" ${label}${vtStyle(project, vt)} data-morse>
  <span class="morse-lamp" aria-hidden="true"><i></i></span>
  <span class="morse-tape" aria-hidden="true">${letters}</span>
  <code class="morse-code" aria-hidden="true">Morse.toMorse("son") → "... --- -."</code>
</div>`
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

function tags(list) {
  return `<ul class="tags">${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`
}

function projectCard(project, { vt = true, eager = false, headingLevel = 3 } = {}) {
  return `<article class="card" data-categories="${attr(project.categories.join("|"))}" data-reveal-card>
  <a class="card-link" href="${href(project)}" data-cursor="View">
    <div class="card-cover">${cover(project, { vt, eager })}</div>
    <div class="card-body">
      <p class="card-kicker"><span>${esc(project.year)}</span><span>${esc(project.kind)}</span></p>
      <h${headingLevel} class="card-title">${esc(project.title)} <span class="card-arrow">${arrow}</span></h${headingLevel}>
      <p class="card-text">${esc(project.summary)}</p>
      ${tags(project.tags)}
    </div>
  </a>
</article>`
}

function peekCard(card, hidden) {
  const tab = hidden ? ' tabindex="-1"' : ""
  const visual = card.baked
    ? `<img class="peek-baked" src="${IMG}${card.baked}" alt="${hidden ? "" : attr(card.alt)}" loading="lazy" decoding="async">`
    : `<img class="peek-art" src="${IMG}art/${card.art}-portrait.webp" alt="" width="600" height="840" loading="lazy" decoding="async">
        <img class="peek-fg${card.object ? " peek-fg--object" : ""}" src="${IMG}${card.fg}" alt="${hidden ? "" : attr(card.alt)}" loading="lazy" decoding="async">`
  return `<li class="peek-card">
      <a class="peek-link" href="/works/${card.project}/"${tab} data-cursor="Open">
        ${visual}
        <span class="placard"><span class="placard-project">${esc(card.label)}</span><span class="placard-screen">${esc(card.screen)}</span></span>
      </a>
    </li>`
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

export function homePage() {
  const featured = projects.filter((p) => p.featured)
  const bench = projects.filter((p) => !p.featured)
  const peekList = (hidden) =>
    `<ul class="marquee-list"${hidden ? ' aria-hidden="true"' : ""}>
    ${peek.map((c) => peekCard(c, hidden)).join("\n    ")}
  </ul>`

  const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-icons">
    <a class="hero-icon hero-icon--walley" href="/works/walley/" aria-label="Walley"><span class="hero-icon-tilt"><span class="hero-icon-face" data-depth="0.5"><img src="${IMG}icons/walley-app.avif" alt="" width="512" height="512"></span></span></a>
    <a class="hero-icon hero-icon--aware" href="/works/aware/" aria-label="AWARE"><span class="hero-icon-tilt"><span class="hero-icon-face" data-depth="0.9"><img src="${IMG}icons/aware-app.webp" alt="" width="512" height="512"></span></span></a>
  </div>
  <div class="portrait" data-depth="0.2">
    <svg class="portrait-ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48"/></svg>
    <img src="${IMG}people/portrait.avif" alt="Truong Son working at a robotics table" width="512" height="512" fetchpriority="high">
  </div>
  <h1 id="hero-title" class="hero-title" data-hero-title>Hey, I'm <span class="nowrap"><span class="accent">Truong Son<svg class="scribble" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true"><path d="M3 14 C 60 4, 120 4, 170 10 S 260 17, 297 6"/></svg></span>.</span> Here, you can check out what I'm working on.</h1>
  <p class="hero-sub" data-hero-sub><span class="wave">I try my best to make my projects with</span> <span class="heart" aria-label="love">❤️</span></p>
  <a class="scroll-cue" href="#sneak-peek" aria-label="Scroll to my work"><span></span></a>
</section>

<section class="peek" id="sneak-peek" aria-labelledby="peek-title">
  <div class="section-head">
    ${icons.telescope}
    <h2 id="peek-title" class="section-title" data-split>Sneak peek of my works</h2>
  </div>
  <div class="marquee" data-marquee>
    <div class="marquee-track">
      ${peekList(false)}
      ${peekList(true)}
    </div>
  </div>
</section>

<section class="work" id="work" aria-labelledby="work-title">
  <div class="section-head">
    <h2 id="work-title" class="section-title section-title--xl" data-split>Programming in action</h2>
    <p class="section-lede" data-reveal>I love to create things, and here are some of the projects I've worked on. You can click on them to see more:</p>
  </div>
  <div class="card-grid card-grid--featured">
    ${featured.map((p) => projectCard(p)).join("\n    ")}
  </div>

  <div class="bench" data-bench>
    <h3 class="bench-title" data-reveal>More from the workbench</h3>
    <ol class="bench-list">
      ${bench
        .map(
          (p, i) => `<li class="bench-item" data-reveal-row>
        <a class="bench-link" href="${href(p)}">
          <span class="bench-index">${String(featured.length + i + 1).padStart(2, "0")}</span>
          <span class="bench-name">${esc(p.title)}</span>
          <span class="bench-desc">${esc(p.kind)}</span>
          <span class="bench-year">${esc(p.year)}</span>
          <span class="bench-arrow">${arrow}</span>
          <div class="bench-preview" aria-hidden="true">${cover(p)}</div>
        </a>
      </li>`,
        )
        .join("\n      ")}
    </ol>
  </div>

  <div class="cta-row" data-reveal>
    <a class="btn btn--ghost" href="/works/" data-magnetic>All ${projects.length} works ${arrow}</a>
    <a class="btn btn--orange" href="https://github.com/trawngson" target="_blank" rel="noopener" data-magnetic>See more on GitHub ${external}</a>
  </div>
</section>

<section class="skills" aria-labelledby="skills-title">
  <div class="section-head">
    ${icons.ufo}
    <h2 id="skills-title" class="section-title section-title--xl" data-split>What I bring to the table</h2>
    <p class="section-lede" data-reveal>Digital experiences that stand out from design to production.</p>
  </div>
  <div class="pills" data-pills>
    <ul class="pill-list">
      ${skills.map((s) => `<li class="pill${s.tone ? ` pill--${s.tone}` : ""}">${esc(s.label)}</li>`).join("\n      ")}
    </ul>
    <p class="pills-hint" aria-hidden="true">Drag them around</p>
  </div>
</section>

<section class="beyond" aria-labelledby="beyond-title">
  <div class="beyond-panel" data-beyond>
    <div class="beyond-grid" aria-hidden="true"><div class="beyond-floor"></div></div>
    <div class="section-head section-head--dark">
      ${icons.server}
      <h2 id="beyond-title" class="section-title section-title--xl" data-split>Beyond the terminal</h2>
      <p class="section-lede" data-reveal>${esc(community.intro)}</p>
    </div>
    <div class="beyond-items">
      ${community.items
        .map(
          (item, i) => `<article class="beyond-item${i % 2 ? " beyond-item--flip" : ""}">
        <figure class="beyond-photo" style="--tilt: ${i % 2 ? -3 : 3}">
          <img src="${IMG}${item.photo}" alt="${attr(item.alt)}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async">
          <figcaption>${esc(item.caption)}</figcaption>
        </figure>
        <div class="beyond-text" data-reveal>
          <p class="beyond-role">${esc(item.role)}</p>
          <p>At <a href="${item.org.href}" target="_blank" rel="noopener">${esc(item.org.name)}</a>, ${esc(item.text)}</p>
        </div>
      </article>`,
        )
        .join("\n      ")}
    </div>
  </div>
</section>

${contactCta()}
`
  return layout({
    path: "/",
    page: "home",
    body,
    scripts: [CDN.matter],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.name,
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: "High school student and developer",
      affiliation: { "@type": "EducationalOrganization", name: "Vinschool The Harmony" },
      address: { "@type": "PostalAddress", addressLocality: "Hanoi", addressCountry: "VN" },
      sameAs: ["https://github.com/trawngson", "https://facebook.com/sonntt.az"],
      knowsAbout: ["Computer vision", "iOS development", "Machine learning", "Python", "Java"],
    },
  })
}

export function worksPage() {
  const count = (f) => (f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length)
  const body = `
<section class="page-head">
  <h1 class="page-title" data-split>Works</h1>
  <p class="section-lede" data-reveal>Apps, research pipelines, hardware and small tools, built at school, for school, and for fun.</p>
  <div class="filters" role="toolbar" aria-label="Filter projects by type" data-filters>
    ${filters.map((f, i) => `<button type="button" class="filter" data-filter="${attr(f)}" aria-pressed="${i === 0}">${esc(f)} <sup>${count(f)}</sup></button>`).join("\n    ")}
  </div>
</section>
<section class="works" aria-label="All projects">
  <div class="card-grid card-grid--all" data-grid>
    ${projects.map((p, i) => projectCard(p, { eager: i < 2, headingLevel: 2 })).join("\n    ")}
  </div>
  <p class="works-empty" hidden>Nothing here yet.</p>
</section>
${contactCta()}
`
  return layout({
    title: "Works",
    description: "Every project by Nguyen Truong Son: AWARE, the AWARE smart bin, Walley, Lunch, Teacher Day and small tools in Python, Java and JavaScript.",
    path: "/works/",
    page: "works",
    body,
  })
}

function gallery(project) {
  const g = project.gallery
  if (!g) return ""
  if (g.type === "phones") {
    return `<section class="gallery gallery--phones" aria-labelledby="gallery-title">
  <div class="gallery-head">
    <h2 id="gallery-title" class="section-title" data-split>${esc(g.title)}</h2>
  </div>
  <ol class="shots" data-stagger>
    ${g.items.map(([src, caption], i) => `<li class="shot">
      <img src="${IMG}${src}" alt="${attr(caption)}" loading="lazy" decoding="async">
      <span class="shot-caption"><b>${String(i + 1).padStart(2, "0")}</b> ${esc(caption)}</span>
    </li>`).join("\n    ")}
  </ol>
</section>`
  }
  if (g.type === "renders") {
    return `<section class="gallery gallery--renders" aria-labelledby="gallery-title">
  <div class="gallery-head">
    <h2 id="gallery-title" class="section-title" data-split>${esc(g.title)}</h2>
  </div>
  <ul class="renders" data-stagger>
    ${g.items.map(([src, caption]) => `<li class="render"><img src="${IMG}${src}" alt="${attr(`${project.title}: ${caption}`)}" loading="lazy" decoding="async"><span>${esc(caption)}</span></li>`).join("\n    ")}
  </ul>
  <div class="viewer" data-viewer="/works/aware-bin/viewer.html">
    <div class="viewer-poster">
      <img src="${IMG}bin/assembled.webp" alt="" loading="lazy" decoding="async">
      <div class="viewer-copy">
        <h3>Spin it yourself</h3>
        <p>The interactive 3D model works offline in your browser. Drag to orbit, scroll to zoom, cut away the shell, or press <b>Play detection demo</b> to watch a water bottle get sorted. Sound starts only when you press play.</p>
        <div class="viewer-actions">
          <button class="btn btn--orange" type="button" data-viewer-load>Load the 3D model <small>1.2 MB</small></button>
          <a class="btn btn--ghost" href="/works/aware-bin/viewer.html" target="_blank" rel="noopener">Open full screen ${external}</a>
        </div>
      </div>
    </div>
  </div>
</section>`
  }
  return ""
}

function demoBlock(project) {
  const d = project.demo
  if (!d) return ""
  return `<section class="demo" aria-labelledby="demo-title">
  <h2 id="demo-title" class="section-title" data-split>${esc(d.title)}</h2>
  <figure class="demo-figure" data-reveal>
    <video class="demo-video" muted loop playsinline preload="none" poster="${IMG}${d.poster}" width="${d.width}" height="${d.height}" aria-label="${attr(d.label)}" data-autoplay>
      <source src="${IMG}${d.video}" type="video/mp4">
    </video>
    <figcaption>${esc(d.caption)}</figcaption>
  </figure>
</section>`
}

function codeBlock(project) {
  const c = project.code
  if (!c) return ""
  return `<section class="code" aria-labelledby="code-title">
  <h2 id="code-title" class="section-title" data-split>From the source</h2>
  <figure class="code-window" data-reveal>
    <figcaption><span class="browser-dots"><i></i><i></i><i></i></span><span>${esc(c.file)}</span><span class="code-lang">${esc(c.lang)}</span></figcaption>
    <pre><code>${esc(c.body)}</code></pre>
  </figure>
</section>`
}

export function projectPage(project, next) {
  const body = `
<article class="project" data-project="${project.slug}">
  <header class="project-hero">
    <a class="back-link" href="/works/"><span aria-hidden="true">←</span> All works</a>
    <p class="eyebrow" data-reveal><span>${esc(project.year)}</span><span>${esc(project.kind)}</span></p>
    <h1 class="project-title" data-split>${esc(project.title)}</h1>
    <p class="project-tagline" data-reveal>${esc(project.tagline)}</p>
    <div data-reveal>${tags(project.tags)}</div>
  </header>
  <figure class="project-cover">${cover(project, { vt: true, eager: true })}</figure>
  <div class="project-body">
    <aside class="project-meta" aria-label="Project details" data-reveal>
      <dl>
        ${project.meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("\n        ")}
      </dl>
      <div class="project-links">
        ${project.links.map((l, i) => `<a class="btn ${i === 0 ? "btn--orange" : "btn--ghost"}" href="${l.href}" target="_blank" rel="noopener" data-magnetic>${esc(l.label)} ${external}</a>`).join("\n        ")}
      </div>
    </aside>
    <div class="project-overview">
      <h2 class="kicker" data-reveal>Overview</h2>
      ${project.overview.map((p) => `<p data-reveal>${esc(p)}</p>`).join("\n      ")}
    </div>
  </div>
  ${demoBlock(project)}
  <section class="highlights" aria-labelledby="hl-title">
    <h2 id="hl-title" class="section-title" data-split>Highlights</h2>
    <ul class="highlight-grid" data-stagger>
      ${project.highlights.map(([num, label, text]) => `<li class="highlight">
        <span class="hl-num" data-count="${attr(num)}">${esc(num)}</span>
        <span class="hl-label">${esc(label)}</span>
        <p>${esc(text)}</p>
      </li>`).join("\n      ")}
    </ul>
  </section>
  ${gallery(project)}
  ${codeBlock(project)}
  <nav class="next-project" aria-label="Next project">
    <a href="${href(next)}" data-cursor="Next">
      <span class="next-label">Next project</span>
      <span class="next-title">${esc(next.title)} ${arrow}</span>
      <span class="next-kind"><span>${esc(next.year)}</span><span>${esc(next.kind)}</span></span>
    </a>
  </nav>
</article>
${contactCta()}
`
  return layout({
    title: project.title,
    description: project.summary,
    path: href(project),
    page: "project",
    body,
  })
}

export function contactPage() {
  return layout({
    title: "Contact",
    description: "Get in touch with Nguyen Truong Son by email, GitHub or Facebook.",
    path: "/contact/",
    page: "contact",
    body: `<div class="contact-page">${contactCta({ heading: "h1", withLove: true })}</div>`,
  })
}

export function notFoundPage() {
  return layout({
    title: "Page not found",
    description: "This page doesn't exist.",
    path: "/404.html",
    page: "notfound",
    body: `<section class="notfound">
  ${icons.telescope}
  <h1 class="section-title section-title--xl" data-split>Nothing out here.</h1>
  <p class="section-lede" data-reveal>The telescope found no page at this address. It may have moved when the site was rebuilt.</p>
  <div class="cta-row" data-reveal>
    <a class="btn btn--orange" href="/" data-magnetic>Go home ${arrow}</a>
    <a class="btn btn--ghost" href="/works/" data-magnetic>See all works</a>
  </div>
</section>`,
  })
}

export function redirectPage(target, title) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(title)} | ${esc(site.name)}</title>
<meta http-equiv="refresh" content="0; url=${target}">
<link rel="canonical" href="${site.url}${target}">
<meta name="robots" content="noindex">
</head>
<body>
<p>${esc(title)} has moved to <a href="${target}">${site.url}${target}</a>.</p>
</body>
</html>
`
}

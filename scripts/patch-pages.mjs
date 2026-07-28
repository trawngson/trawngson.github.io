import { readFile, writeFile, mkdir } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

const pages = [
  {
    file: "index.html",
    css: "home.css",
    prefix: "",
    links: {
      "./": "./",
      "./works": "./works/",
      "./contact": "./contact/",
      "./works/aware": "./works/aware/",
      "./works/launchpad": "./works/launchpad/",
    },
  },
  {
    file: "works/index.html",
    css: "works.css",
    prefix: "../",
    links: {
      "./": "../",
      "./works": "./",
      "./contact": "../contact/",
      "./works/aware": "./aware/",
      "./works/launchpad": "./launchpad/",
    },
  },
  {
    file: "contact/index.html",
    css: "contact.css",
    prefix: "../",
    links: {
      "./": "../",
      "./works": "../works/",
      "./contact": "./",
    },
  },
  {
    file: "works/aware/index.html",
    css: "aware.css",
    prefix: "../../",
    links: {
      "../": "../../",
      "../works": "../",
      "../contact": "../../contact/",
      "./launchpad": "../launchpad/",
    },
  },
  {
    file: "works/launchpad/index.html",
    css: "launchpad.css",
    prefix: "../../",
    links: {
      "../": "../../",
      "../works": "../",
      "../contact": "../../contact/",
    },
  },
]

const localImages = {
  "1elheynEejH948BFNGWKzk1p9w": "1elheynEejH948BFNGWKzk1p9w.avif",
  "46904KdLxBwux5bckEZUT9Tzs": "46904KdLxBwux5bckEZUT9Tzs.avif",
  "SQcHnVglRIGT3M9xKAJPEzkFxc4": "SQcHnVglRIGT3M9xKAJPEzkFxc4.webp",
  "wpTHnBFaDdfSZ2v7Ww0jxJDA1xg": "wpTHnBFaDdfSZ2v7Ww0jxJDA1xg.avif",
  "SZThRHCiqe98RFCyAFhxZON00I": "SZThRHCiqe98RFCyAFhxZON00I.avif",
  "qvvi9TdFvoFDCVecF8AnPbKAK7Q": "qvvi9TdFvoFDCVecF8AnPbKAK7Q.avif",
  "02NDpfILUbqVZgEV0igBBI0REk": "02NDpfILUbqVZgEV0igBBI0REk.avif",
  "s4bOufc8XTEokdBpr5SyANexcI": "s4bOufc8XTEokdBpr5SyANexcI.avif",
  "dvpiATUEowQyzxQ89TqrB39q9hA": "dvpiATUEowQyzxQ89TqrB39q9hA.avif",
  "DSTEtsv74SerexXHSvi44Ah5Y": "DSTEtsv74SerexXHSvi44Ah5Y.avif",
  "BjzR0Oqfk04DFB1eotwiLka8ys": "BjzR0Oqfk04DFB1eotwiLka8ys.avif",
  "QRMpKqiwep7li6Bf7hHO1nwnY": "QRMpKqiwep7li6Bf7hHO1nwnY.avif",
  "5bSgVOjwR5iEdfk692ONl843us": "5bSgVOjwR5iEdfk692ONl843us.svg",
  "y693z1QYyOBCt6uxrYEhvwblA": "y693z1QYyOBCt6uxrYEhvwblA.avif",
  "8kcXGNFRXll09U5uD2uo3SX48": "8kcXGNFRXll09U5uD2uo3SX48.avif",
  "KNITtfXEslV22WMlohIQg1pipb0": "KNITtfXEslV22WMlohIQg1pipb0.avif",
  "oZSCDNcihDo10MPhbIXmLz1q9Q": "oZSCDNcihDo10MPhbIXmLz1q9Q.webp",
  "AKelK3hxwsJRLxNeowMzkunFW1M": "AKelK3hxwsJRLxNeowMzkunFW1M.webp",
  "NFvBhVSp9U0WbJuTShfu10Ns": "NFvBhVSp9U0WbJuTShfu10Ns.webp",
  "HwqcQ1wmIXGfNa7jy7oL7wVhdw": "HwqcQ1wmIXGfNa7jy7oL7wVhdw.webp",
  "z8zgenFpKoeep7vyeo11cnc": "z8zgenFpKoeep7vyeo11cnc.webp",
  "WLxdrG7hEZ7ZRwrSRToyib8SK8": "WLxdrG7hEZ7ZRwrSRToyib8SK8.webp",
  "vl4CMTyaEaDMeNwdH6BEUXAv9E8": "vl4CMTyaEaDMeNwdH6BEUXAv9E8.webp",
  "sRmJRwTKoaw8vmtvxfN21i5QQFc": "sRmJRwTKoaw8vmtvxfN21i5QQFc.webp",
}

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

for (const page of pages) {
  const htmlPath = join(root, page.file)
  let html = await readFile(htmlPath, "utf8")

  const cssBlocks = []
  html = html.replace(
    /<style\b[^>]*data-framer-(?:font-css|breakpoint-css|css-ssr-minified)[^>]*>([\s\S]*?)<\/style>/g,
    (_match, css) => {
      cssBlocks.push(css)
      return cssBlocks.length === 1
        ? `<link rel="stylesheet" href="${page.prefix}assets/css/${page.css}">`
        : ""
    },
  )

  if (cssBlocks.length > 0) {
    await mkdir(join(root, "assets/css"), { recursive: true })
    await writeFile(
      join(root, "assets/css", page.css),
      `/* Extracted from the published Framer SSR document. */\n${cssBlocks.join("\n")}\n\n/* Keep the Framer badge out of first paint while React hydrates. */\n#__framer-badge-container, .__framer-badge { display: none !important; }\n`,
    )
  }

  const internalLinkPattern = new RegExp(
    `href="(${Object.keys(page.links)
      .sort((a, b) => b.length - a.length)
      .map(escapeRegex)
      .join("|")})"`,
    "g",
  )
  html = html.replace(
    internalLinkPattern,
    (_match, href) =>
      `href="${page.links[href]}" data-static-route`,
  )

  for (const [stem, file] of Object.entries(localImages)) {
    const remote = new RegExp(
      `https://framerusercontent\\.com/images/${escapeRegex(stem)}\\.[A-Za-z0-9]+(?:\\?[^"'\\s)<>\\\\]*)?`,
      "g",
    )
    html = html.replace(remote, `${page.prefix}assets/images/${file}`)
  }

  html = html
    .replace(
      /<script>try\{if\(localStorage\.getItem\("__framer_force_showing_editorbar_since"\)\)[\s\S]*?<\/script>/,
      '<script>try{localStorage.removeItem("__framer_force_showing_editorbar_since")}catch{}</script>',
    )
    .replace(
      /[\t ]*<!-- Global site tag \(gtag\.js\) - Google Analytics -->[\s\S]*?<\/script>\s*<script>[\s\S]*?gtag\('config', 'G-BZQP0LS1RC'\);[\s\S]*?<\/script>/,
      "",
    )
    .replace(
      /<script[^>]+src="https:\/\/events\.framer\.com\/script\?v=2"[^>]*><\/script>/g,
      "",
    )
    .replaceAll(
      "https://unpkg.com/lenis@1.3.3/dist/lenis.css",
      `${page.prefix}assets/css/lenis.css`,
    )
    .replace(
      /<script type="module" async data-framer-bundle="main" fetchpriority="low" src="https:\/\/framerusercontent\.com\/sites\/[^"]+\/script_main\.[^"]+\.mjs"><\/script>/i,
      `<script type="module" async data-framer-bundle="main" fetchpriority="low" src="${page.prefix}assets/js/framer-loader.js"></script>`,
    )
    .replace(
      "</head>",
      `\t<script defer src="${page.prefix}assets/js/site.js"></script>\n</head>`,
    )
    .replace(
      "<!-- Made in Framer · framer.com ✨ -->",
      "<!-- Static GitHub Pages build derived from the published Framer SSR output. -->",
    )

  await writeFile(htmlPath, html)
}

console.log(`Patched ${pages.length} routes.`)

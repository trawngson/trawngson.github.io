// Checks the built site before publishing: every page exists, every local
// link and asset resolves, metadata is complete, and nothing still points at
// the old Framer build. Run from the repository root: node scripts/verify.mjs
import { access, readFile, readdir, stat } from "node:fs/promises"
import { dirname, join, normalize } from "node:path"
import { fileURLToPath } from "node:url"

import { projects, peek } from "../src/content.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const errors = []
const fail = (message) => errors.push(message)

const exists = async (relativePath) => {
  try {
    await access(join(root, relativePath))
    return true
  } catch {
    return false
  }
}

const pages = [
  "index.html",
  "works/index.html",
  "contact/index.html",
  "404.html",
  ...projects.map((p) => `works/${p.slug}/index.html`),
]

// Resolve a site URL (absolute "/x/" or relative) to a file in the repo.
const resolve = (page, url) => {
  const clean = decodeURI(url.split(/[?#]/, 1)[0])
  const base = clean.startsWith("/") ? clean.slice(1) : normalize(join(dirname(page), clean))
  return base === "" || base.endsWith("/") ? join(base, "index.html") : base
}

for (const page of pages) {
  if (!(await exists(page))) {
    fail(`${page}: missing; run node scripts/build.mjs`)
    continue
  }
  const html = await readFile(join(root, page), "utf8")

  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${page}: missing <title>`)
  if (!/<meta name="description" content="[^"]{20,}">/.test(html)) fail(`${page}: missing or short meta description`)
  if (page !== "404.html" && !/<link rel="canonical" href="https:\/\/truongson\.me\/[^"]*">/.test(html)) fail(`${page}: missing canonical URL`)
  if (!html.includes('<meta property="og:image"')) fail(`${page}: missing og:image`)
  if (/framerusercontent|framer\.com|data-framer/i.test(html)) fail(`${page}: still references Framer`)
  if (/noindex/.test(html)) fail(`${page}: blocks indexing`)
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) fail(`${page}: should have exactly one <h1>`)

  // View transition names must be unique within a page.
  const names = [...html.matchAll(/view-transition-name: ([\w-]+)/g)].map((m) => m[1])
  const dupes = names.filter((n, i) => names.indexOf(n) !== i)
  if (dupes.length) fail(`${page}: duplicate view-transition-name ${[...new Set(dupes)].join(", ")}`)

  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="/.test(match[0])) fail(`${page}: <img> without alt: ${match[0].slice(0, 80)}`)
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1]
    if (/^(?:#|data:|mailto:|tel:)/.test(value)) continue
    if (/^https?:\/\//.test(value)) {
      if (value.startsWith("http://")) fail(`${page}: insecure URL ${value}`)
      continue
    }
    const file = resolve(page, value)
    if (!(await exists(file))) fail(`${page}: broken local reference ${value}`)
  }

  for (const match of html.matchAll(/<script defer src="(https:\/\/cdn\.jsdelivr\.net\/[^"]+)"/g)) {
    if (!/@\d+\.\d+\.\d+\//.test(match[1])) fail(`${page}: CDN script without an exact version: ${match[1]}`)
  }
}

// Data-file references.
for (const card of peek) {
  for (const file of [card.fg, card.baked].filter(Boolean)) {
    if (!(await exists(`assets/img/${file}`))) fail(`peek: missing assets/img/${file}`)
  }
  if (card.art && !card.baked && !(await exists(`assets/img/art/${card.art}-portrait.webp`))) fail(`peek: missing painting ${card.art}`)
}

// Redirect for the old Walley URL.
const launchpad = await readFile(join(root, "works/launchpad/index.html"), "utf8").catch(() => "")
if (!launchpad.includes("url=/works/walley/")) fail("works/launchpad: redirect to /works/walley/ is missing")

for (const required of ["CNAME", ".nojekyll", "assets/css/site.css", "assets/js/main.js", "assets/img/og-card.jpg", "assets/img/favicon.svg", "works/aware-bin/viewer.html"]) {
  if (!(await exists(required))) fail(`missing ${required}`)
}
if ((await readFile(join(root, "CNAME"), "utf8")).trim() !== "truongson.me") fail("CNAME must be truongson.me")

// Keep the repository light: images up to 600 KB, videos up to 1.5 MB.
const walk = async (dir) => {
  for (const entry of await readdir(join(root, dir), { withFileTypes: true })) {
    const rel = join(dir, entry.name)
    const limit = rel.endsWith(".mp4") ? 1536 : 600
    if (entry.isDirectory()) await walk(rel)
    else if ((await stat(join(root, rel))).size > limit * 1024) fail(`${rel}: larger than ${limit} KB`)
  }
}
await walk("assets/img")

if (errors.length) {
  console.error(errors.join("\n"))
  process.exitCode = 1
} else {
  console.log(`Verified ${pages.length} pages, ${peek.length} sneak-peek cards and every local reference.`)
}

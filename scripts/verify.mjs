import { access, readFile, readdir } from "node:fs/promises"
import { dirname, join, normalize } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const pages = [
  "index.html",
  "works/index.html",
  "contact/index.html",
  "works/aware/index.html",
  "works/launchpad/index.html",
]
const canonicalUrls = {
  "index.html": "https://truongson.me/",
  "works/index.html": "https://truongson.me/works/",
  "contact/index.html": "https://truongson.me/contact/",
  "works/aware/index.html": "https://truongson.me/works/aware/",
  "works/launchpad/index.html": "https://truongson.me/works/launchpad/",
}

const errors = []

async function requireFile(relativePath, context) {
  try {
    await access(join(root, relativePath))
  } catch {
    errors.push(`${context}: missing ${relativePath}`)
  }
}

for (const page of pages) {
  const html = await readFile(join(root, page), "utf8")

  if (!html.includes('data-framer-bundle="main"')) {
    errors.push(`${page}: missing Framer runtime loader`)
  }
  if (!html.includes("data-static-route")) {
    errors.push(`${page}: route patch was not applied`)
  }
  if (/googletagmanager|events\.framer\.com/.test(html)) {
    errors.push(`${page}: analytics bootstrap was not removed`)
  }
  if (/src="https:\/\/framerusercontent\.com\/sites\/[^"]+\/script_main/.test(html)) {
    errors.push(`${page}: still loads the main runtime directly`)
  }
  if (html.includes('<meta name="robots" content="noindex">')) {
    errors.push(`${page}: still blocks search indexing`)
  }
  if (
    !html.includes(`<link rel="canonical" href="${canonicalUrls[page]}">`) ||
    !html.includes(`<meta property="og:url" content="${canonicalUrls[page]}">`)
  ) {
    errors.push(`${page}: canonical metadata does not match the main domain`)
  }
  if (
    page === "index.html" &&
    !html.includes("At Student Council hosting Serenade Prom 2026")
  ) {
    errors.push(`${page}: first Beyond the terminal caption was not updated`)
  }

  const attributePattern = /\b(?:href|src)="([^"]+)"/g
  for (const match of html.matchAll(attributePattern)) {
    const value = match[1]
    if (
      value.startsWith("#") ||
      value.startsWith("data:") ||
      value.startsWith("mailto:") ||
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("//")
    ) {
      continue
    }

    const clean = value.split(/[?#]/, 1)[0]
    const resolved = normalize(join(dirname(page), clean))
    await requireFile(
      clean.endsWith("/") ? join(resolved, "index.html") : resolved,
      page,
    )
  }

  const srcsetPattern = /\bsrcset="([^"]+)"/gi
  for (const match of html.matchAll(srcsetPattern)) {
    for (const candidate of match[1].split(",")) {
      const value = candidate.trim().split(/\s+/, 1)[0]
      if (!value || /^https?:\/\//.test(value)) continue
      const resolved = normalize(join(dirname(page), value))
      await requireFile(resolved, `${page} srcset`)
    }
  }
}

for (const required of [
  ".nojekyll",
  ".github/workflows/pages.yml",
  "assets/js/framer-loader.js",
  "assets/js/site.js",
  "assets/css/home.css",
  "assets/css/works.css",
  "assets/css/contact.css",
  "assets/css/aware.css",
  "assets/css/launchpad.css",
]) {
  await requireFile(required, "required build file")
}

const framerDirectory = join(root, "assets/framer")
const modules = (await readdir(framerDirectory)).filter((file) =>
  file.endsWith(".mjs"),
)

for (const module of modules) {
  const source = await readFile(join(framerDirectory, module), "utf8")
  if (
    source.includes("https://framer.com/edit/") ||
    source.includes("https://app.framerstatic.com/")
  ) {
    errors.push(`${module}: contains the optional remote Framer editor loader`)
  }
  if (source.includes("robots:`noindex`")) {
    errors.push(`${module}: still contains a noindex metadata directive`)
  }
  if (
    source.includes(
      "https://framerusercontent.com/sites/5Kx2XLMGy1pa7UdUQDRO4o/",
    )
  ) {
    errors.push(`${module}: contains a remote same-site module URL`)
  }

  const relativeModulePattern = /["']\.\/([^"']+\.mjs)["']/g
  for (const match of source.matchAll(relativeModulePattern)) {
    await requireFile(
      join("assets/framer", match[1]),
      `${module} import graph`,
    )
  }
}

const homepageContentModule = await readFile(
  join(
    framerDirectory,
    "F4sSbbRelN_RcV3ibiSfefa8wQbDzbTEZ5THliAdCIY.DoGmo9G0.mjs",
  ),
  "utf8",
)
if (
  !homepageContentModule.includes(
    "vPPoaq4Qp:`At Student Council hosting Serenade Prom 2026`",
  )
) {
  errors.push("homepage content module: first gallery caption was not updated")
}

if (errors.length > 0) {
  console.error(errors.join("\n"))
  process.exitCode = 1
} else {
  console.log(
    `Verified ${pages.length} routes, ${modules.length} local Framer modules, and all local references.`,
  )
}

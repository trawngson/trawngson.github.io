// Generates every HTML page from src/content.mjs and src/templates.mjs.
// Run from the repository root: node scripts/build.mjs
import { mkdir, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { projects } from "../src/content.mjs"
import {
  contactPage,
  homePage,
  notFoundPage,
  projectPage,
  redirectPage,
  worksPage,
} from "../src/templates.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

const pages = new Map([
  ["index.html", homePage()],
  ["works/index.html", worksPage()],
  ["contact/index.html", contactPage()],
  ["404.html", notFoundPage()],
  // The Walley page used to live at /works/launchpad/.
  ["works/launchpad/index.html", redirectPage("/works/walley/", "Walley")],
])

projects.forEach((project, i) => {
  const next = projects[(i + 1) % projects.length]
  pages.set(`works/${project.slug}/index.html`, projectPage(project, next))
})

for (const [file, html] of pages) {
  const path = join(root, file)
  await mkdir(dirname(path), { recursive: true })
  await writeFile(path, html)
}

console.log(`Built ${pages.size} pages.`)

// Framer's client router was authored for extensionless routes on its own host.
// GitHub Pages serves directory routes with trailing slashes, so route links
// are handled before Framer's router and handed to the browser normally.
try {
  localStorage.removeItem("__framer_force_showing_editorbar_since")
} catch {
  // Storage can be unavailable in hardened browser contexts.
}

document.addEventListener(
  "click",
  (event) => {
    const link = event.target.closest?.("a[data-static-route]")
    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    event.preventDefault()
    event.stopImmediatePropagation()
    window.location.assign(link.href)
  },
  true,
)

// Framer expects the badge node to be present while hydrating its SSR tree.
// CSS hides it from first paint; remove the hidden node after hydration.
const removeFramerBadge = () => {
  document.querySelector("#__framer-badge-container")?.remove()
  document.querySelectorAll(".__framer-badge").forEach((badge) => badge.remove())
}

window.setTimeout(removeFramerBadge, 2500)

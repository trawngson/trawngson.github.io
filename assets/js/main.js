// Motion and interaction for truongson.me.
// Every module is optional: if a library is missing or the visitor prefers
// reduced motion, the page stays fully readable and usable.

;(() => {
  const root = document.documentElement
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches
  const hasGsap = !!(window.gsap && window.ScrollTrigger)
  // The head script removes "motion" if this file was too slow to start.
  const motion = hasGsap && root.classList.contains("motion")
  const $ = (sel, ctx = document) => ctx.querySelector(sel)
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel))

  const safely = (name, fn) => {
    try {
      fn()
    } catch (error) {
      console.error(`[site] ${name} failed`, error)
      root.classList.remove("motion")
    }
  }

  const revealEverything = () => root.classList.remove("motion")

  if (!motion) revealEverything()

  let lenis = null

  // Run something only while an element is on screen.
  const whileVisible = (el, start, stop) => {
    if (!("IntersectionObserver" in window)) return start()
    let active = false
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !active) {
        active = true
        start()
      } else if (!entry.isIntersecting && active) {
        active = false
        stop?.()
      }
    }, { rootMargin: "80px" }).observe(el)
  }

  const wait = (ms, token) =>
    new Promise((resolve, reject) => {
      setTimeout(() => (token.cancelled ? reject(new Error("cancelled")) : resolve()), ms)
    })

  // ---------------------------------------------------------- interaction
  // These work with or without GSAP.

  safely("copy", () => {
    $$("[data-copy]").forEach((btn) => {
      const label = btn.querySelector("span")
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy)
          btn.classList.add("is-copied")
          label.textContent = "Copied!"
        } catch {
          label.textContent = "Press ⌘C"
        }
        setTimeout(() => {
          btn.classList.remove("is-copied")
          label.textContent = "Copy"
        }, 2000)
      })
    })
  })

  safely("viewer", () => {
    $$("[data-viewer]").forEach((viewer) => {
      const button = viewer.querySelector("[data-viewer-load]")
      button?.addEventListener("click", () => {
        const frame = document.createElement("iframe")
        frame.src = viewer.dataset.viewer
        frame.title = "Interactive 3D model of the AWARE smart bin"
        frame.allow = "fullscreen"
        viewer.replaceChildren(frame)
        window.ScrollTrigger?.refresh()
      })
    })
  })

  // Demo videos play silently while on screen. With reduced motion they stay
  // on their poster frame and show controls instead.
  safely("videos", () => {
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches
    $$("video[data-autoplay]").forEach((video) => {
      if (calm) {
        video.controls = true
        return
      }
      whileVisible(
        video,
        () => video.play().catch(() => (video.controls = true)),
        () => video.pause(),
      )
    })
  })

  safely("to-top", () => {
    $$("[data-to-top]").forEach((btn) =>
      btn.addEventListener("click", () => {
        if (lenis) lenis.scrollTo(0, { duration: 1.6 })
        else window.scrollTo({ top: 0, behavior: "smooth" })
      }),
    )
  })

  safely("filters", () => {
    const bar = $("[data-filters]")
    const grid = $("[data-grid]")
    if (!bar || !grid) return
    const cards = $$(".card", grid)
    const empty = $(".works-empty")
    bar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]")
      if (!button) return
      const filter = button.dataset.filter
      $$("[data-filter]", bar).forEach((b) => b.setAttribute("aria-pressed", String(b === button)))
      const state = motion && window.Flip ? Flip.getState(cards) : null
      let shown = 0
      cards.forEach((card) => {
        const match = filter === "All" || card.dataset.categories.split("|").includes(filter)
        card.style.display = match ? "" : "none"
        if (match) shown++
      })
      if (empty) empty.hidden = shown > 0
      if (state) {
        Flip.from(state, {
          duration: 0.7,
          ease: "power3.inOut",
          scale: true,
          absolute: true,
          stagger: 0.03,
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }),
          onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.4 }),
          onComplete: () => ScrollTrigger.refresh(),
        })
      }
    })
  })

  // Animated tool covers (MathChamp terminal, Morse lamp).
  safely("math covers", () => {
    if (!motion) return
    const rounds = [
      { level: 1, seq: "4, 7, 10, 13, 16", ans: "A" },
      { level: 3, seq: "3, 6, 11, 18, 27", ans: "B" },
      { level: 5, seq: "2, 9, 28, 65, 126", ans: "C" },
      { level: 7, seq: "2, 3, 5, 7, 11", ans: "D" },
    ]
    $$("[data-math]").forEach((pre) => {
      let token = null
      const line = (html) => {
        pre.insertAdjacentHTML("beforeend", html)
      }
      const play = async (t) => {
        let i = 1
        for (;;) {
          const r = rounds[i % rounds.length]
          pre.innerHTML = ""
          const out = [
            `<span class="t-dim">[LEVEL ${r.level}]</span>\n`,
            "Alright, Son. What is the type of the following sequence?\n",
            `Your sequence is: <b>${r.seq}</b>\n`,
            "A. Arithmetic   B. Quadratic\n",
            "C. Cubic        D. Prime\n",
          ]
          for (const html of out) {
            line(html)
            await wait(110, t)
          }
          line('&gt; <span class="t-caret"></span>')
          await wait(900, t)
          pre.lastElementChild?.remove()
          line(`<b class="t-orange">${r.ans}</b>\n`)
          await wait(420, t)
          line('<span class="t-green">Congratulations! That is correct.</span>\n')
          await wait(160, t)
          line(`Your level has increased to LEVEL ${r.level + 1}!<span class="t-caret"></span>`)
          await wait(2200, t)
          i++
        }
      }
      whileVisible(
        pre,
        () => {
          token = { cancelled: false }
          play(token).catch(() => {})
        },
        () => {
          if (token) token.cancelled = true
        },
      )
    })
  })

  safely("morse covers", () => {
    if (!motion) return
    const unit = 150
    $$("[data-morse]").forEach((cover) => {
      const letters = $$(".m-letter", cover)
      let token = null
      const play = async (t) => {
        cover.classList.add("is-driven")
        for (;;) {
          for (const letter of letters) {
            letter.classList.add("is-active")
            for (const sym of $$("i", letter)) {
              sym.classList.add("is-active")
              cover.classList.add("is-on")
              await wait(sym.classList.contains("m-dash") ? unit * 3 : unit, t)
              cover.classList.remove("is-on")
              sym.classList.remove("is-active")
              await wait(unit, t)
            }
            await wait(unit * 2, t)
            letter.classList.remove("is-active")
          }
          await wait(unit * 7, t)
        }
      }
      whileVisible(
        cover,
        () => {
          token = { cancelled: false }
          play(token).catch(() => {
            cover.classList.remove("is-on")
            $$(".is-active", cover).forEach((el) => el.classList.remove("is-active"))
          })
        },
        () => {
          if (token) token.cancelled = true
        },
      )
    })
  })

  if (!motion) {
    safely("static pills", () => $("[data-pills]")?.classList.remove("is-physics"))
    return
  }

  // ------------------------------------------------------------- motion
  const { gsap, ScrollTrigger } = window
  gsap.registerPlugin(ScrollTrigger)
  if (window.SplitText) gsap.registerPlugin(SplitText)
  if (window.Flip) gsap.registerPlugin(Flip)
  root.classList.add("motion-ready")

  const ease = "expo.out"
  const onceOnEnter = (trigger, start = "top 88%") => ({ trigger, start, once: true })

  safely("lenis", () => {
    if (!window.Lenis) return
    lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 })
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    $$('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (event) => {
        const target = $(a.getAttribute("href"))
        if (!target) return
        event.preventDefault()
        lenis.scrollTo(target, { offset: -40, duration: 1.4 })
      }),
    )
  })

  safely("nav", () => {
    const wrap = $(".nav-wrap")
    const bar = $(".progress span")
    let last = window.scrollY
    const update = () => {
      const y = window.scrollY
      wrap.classList.toggle("is-scrolled", y > 24)
      wrap.classList.toggle("is-hidden", y > 260 && y > last + 2)
      if (y < last - 2) wrap.classList.remove("is-hidden")
      last = y
      const max = document.documentElement.scrollHeight - innerHeight
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
    }
    addEventListener("scroll", update, { passive: true })
    update()
  })

  // ---------------------------------------------------------- headings
  const splitHeadings = () => {
    $$("[data-split]").forEach((el) => {
      gsap.set(el, { opacity: 1 })
      if (!window.SplitText) {
        gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease, scrollTrigger: onceOnEnter(el) })
        return
      }
      SplitText.create(el, {
        type: "lines,words",
        linesClass: "split-line",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 115,
            rotate: 5,
            duration: 1.15,
            ease,
            stagger: 0.045,
            scrollTrigger: onceOnEnter(el, "top 90%"),
          }),
      })
    })
  }

  // ---------------------------------------------------------- hero
  const heroIntro = () => {
    const hero = $(".hero")
    if (!hero) return
    const portrait = $(".portrait", hero)
    const ring = $(".portrait-ring circle", hero)
    const img = $(".portrait img", hero)
    const icons = $$(".hero-icon", hero)
    const title = $("[data-hero-title]", hero)
    const scribble = $(".scribble path", hero)
    const sub = $("[data-hero-sub]", hero)
    const cue = $(".scroll-cue", hero)

    const tl = gsap.timeline({ defaults: { ease }, delay: 0.15 })
    gsap.set([portrait, title, sub], { opacity: 1 })

    const circumference = 2 * Math.PI * 48
    gsap.set(ring, { strokeDasharray: circumference, strokeDashoffset: circumference })
    tl.fromTo(img, { clipPath: "circle(0% at 50% 50%)", scale: 1.25 }, { clipPath: "circle(50% at 50% 50%)", scale: 1, duration: 1.4 }, 0)
      .to(ring, { strokeDashoffset: 0, duration: 1.5, ease: "power3.inOut" }, 0)

    let words = [title]
    if (window.SplitText) {
      words = SplitText.create(title, { type: "words", wordsClass: "word" }).words
    }
    tl.from(words, { y: 34, opacity: 0, rotateX: -50, filter: "blur(6px)", duration: 1.1, stagger: 0.05 }, 0.35)

    if (scribble) {
      const length = scribble.getTotalLength?.() ?? 320
      gsap.set(scribble, { strokeDasharray: length, strokeDashoffset: length })
      tl.to(scribble, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 1.1)
    }

    const wave = $(".wave", sub)
    let chars = [sub]
    if (wave && window.SplitText) chars = SplitText.create(wave, { type: "chars", charsClass: "char" }).chars
    tl.from(chars, { y: 16, opacity: 0, duration: 0.7, stagger: 0.012, ease: "back.out(2)" }, 0.95)
    tl.from($(".heart", sub), { scale: 0, rotate: -30, duration: 0.8, ease: "back.out(3)" }, 1.4)
    tl.to(cue, { opacity: 1, duration: 0.8 }, 1.8)

    icons.forEach((icon, i) => {
      tl.fromTo(
        icon,
        { opacity: 0, y: -160, scale: 0.6, rotation: i ? 40 : -40 },
        { opacity: 1, y: 0, scale: 1, rotation: 0, duration: 1.4, ease: "elastic.out(1, 0.6)" },
        0.55 + i * 0.12,
      )
    })
    tl.add(() => {
      icons.forEach((icon, i) =>
        gsap.to(icon.firstElementChild, { yPercent: i ? -9 : 9, rotation: i ? 4 : -4, duration: 3 + i, ease: "sine.inOut", yoyo: true, repeat: -1 }),
      )
      gsap.to($(".heart", sub), { scale: 1.18, duration: 0.45, ease: "power2.inOut", yoyo: true, repeat: -1, repeatDelay: 1.6 })
    })

    // Pointer parallax for the portrait and floating icons.
    if (finePointer) {
      const layers = $$("[data-depth]", hero).map((el) => ({
        depth: parseFloat(el.dataset.depth),
        x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }),
      }))
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect()
        const dx = (e.clientX - r.left) / r.width - 0.5
        const dy = (e.clientY - r.top) / r.height - 0.5
        layers.forEach((l) => {
          l.x(dx * l.depth * 46)
          l.y(dy * l.depth * 34)
        })
      })
    }

    // Icons drift apart as the hero scrolls away.
    icons.forEach((icon, i) =>
      gsap.to(icon, {
        xPercent: i ? 70 : -70,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      }),
    )
  }

  // ---------------------------------------------------------- reveals
  const reveals = () => {
    $$("[data-reveal]").forEach((el) =>
      gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.1, ease, clearProps: "transform", scrollTrigger: onceOnEnter(el, "top 92%") }),
    )
    $$("[data-stagger]").forEach((group) =>
      gsap.fromTo(
        group.children,
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 1, ease, stagger: 0.06, clearProps: "transform", scrollTrigger: onceOnEnter(group, "top 90%") },
      ),
    )
    $$(".section-icon").forEach((icon) =>
      gsap.fromTo(
        icon,
        { opacity: 0, scale: 0.4, rotate: -25, y: 20 },
        { opacity: 1, scale: 1, rotate: 0, y: 0, duration: 1.2, ease: "back.out(2.2)", scrollTrigger: onceOnEnter(icon, "top 92%") },
      ),
    )
    ScrollTrigger.batch("[data-reveal-card]", {
      start: "top 92%",
      once: true,
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { opacity: 0, y: 90, rotate: (i) => (i % 2 ? 2.5 : -2.5) },
          { opacity: 1, y: 0, rotate: 0, duration: 1.3, ease, stagger: 0.12, clearProps: "transform" },
        ),
    })
    ScrollTrigger.batch("[data-reveal-row]", {
      start: "top 94%",
      once: true,
      // Clear the transform afterwards so rows don't trap the hover preview's z-index.
      onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, ease, stagger: 0.08, clearProps: "transform" }),
    })
  }

  // ---------------------------------------------------------- marquee
  const marquee = () => {
    const el = $("[data-marquee]")
    if (!el) return
    const track = $(".marquee-track", el)
    const first = $(".marquee-list", el)
    el.classList.add("is-live")
    gsap.fromTo(el, { opacity: 0, x: 120 }, { opacity: 1, x: 0, duration: 1.6, ease, scrollTrigger: onceOnEnter(el, "top 95%") })

    let width = first.offsetWidth
    let x = 0
    const pace = { value: 1 }
    let running = true

    addEventListener("resize", () => (width = first.offsetWidth))
    el.addEventListener("pointerenter", () => gsap.to(pace, { value: 0.12, duration: 0.8, ease: "power3.out" }))
    el.addEventListener("pointerleave", () => gsap.to(pace, { value: 1, duration: 1.2, ease: "power2.inOut" }))
    el.addEventListener("focusin", () => gsap.to(pace, { value: 0, duration: 0.4 }))
    el.addEventListener("focusout", () => gsap.to(pace, { value: 1, duration: 0.8 }))

    ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onToggle: (self) => (running = self.isActive) })

    gsap.ticker.add((_, delta) => {
      if (!running || !width) return
      // A slow, constant drift that ignores page scrolling.
      x -= 0.5 * pace.value * (delta / 16.67)
      if (x <= -width) x += width
      track.style.transform = `translate3d(${x}px, 0, 0)`
    })
  }

  // ---------------------------------------------------------- covers
  const coverParallax = () => {
    if (!finePointer) return
    $$(".card-link, .project-cover").forEach((host) => {
      const layers = $$("[data-depth]", host).map((el) => ({
        depth: parseFloat(el.dataset.depth),
        x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
      }))
      if (!layers.length) return
      host.addEventListener("pointermove", (e) => {
        const r = host.getBoundingClientRect()
        const dx = (e.clientX - r.left) / r.width - 0.5
        const dy = (e.clientY - r.top) / r.height - 0.5
        layers.forEach((l) => {
          l.x(dx * l.depth * -28)
          l.y(dy * l.depth * -20)
        })
      })
      host.addEventListener("pointerleave", () => layers.forEach((l) => (l.x(0), l.y(0))))
    })

    // Project hero: the painting drifts slower than the page.
    const heroCover = $(".project-cover .cover")
    if (heroCover) {
      const art = $(".cover-art, .cover-img", heroCover)
      if (art)
        gsap.to(art, { yPercent: 6, ease: "none", scrollTrigger: { trigger: heroCover, start: "top top", end: "bottom top", scrub: true } })
      $$(".cover-phone img, .cover-object img, .browser", heroCover).forEach((el, i) =>
        gsap.to(el, { yPercent: -2 - i * 0.6, duration: 2.6 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.3 }),
      )
    }
  }

  const benchPreviews = () => {
    const list = $(".bench-list")
    if (!list || !finePointer) return
    list.classList.add("has-previews")
    const previews = $$(".bench-preview", list)
    const movers = previews.map((p) => ({
      x: gsap.quickTo(p, "x", { duration: 0.55, ease: "power3" }),
      y: gsap.quickTo(p, "y", { duration: 0.55, ease: "power3" }),
      r: gsap.quickTo(p, "rotation", { duration: 0.8, ease: "power3" }),
    }))
    let lastX = 0
    list.addEventListener("pointermove", (e) => {
      const r = list.getBoundingClientRect()
      const px = e.clientX - r.left
      const py = e.clientY - r.top
      const w = previews[0].offsetWidth
      const h = previews[0].offsetHeight
      const left = px + w + 40 > r.width ? px - w - 30 : px + 30
      movers.forEach((m) => {
        m.x(left)
        m.y(py - h / 2)
        m.r(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6))
      })
      lastX = e.clientX
    })
    $$(".bench-item", list).forEach((item, i) => {
      item.addEventListener("pointerenter", () => {
        previews.forEach((p, j) =>
          gsap.to(p, j === i ? { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" } : { opacity: 0, scale: 0.85, duration: 0.3 }),
        )
      })
    })
    list.addEventListener("pointerleave", () => gsap.to(previews, { opacity: 0, scale: 0.85, duration: 0.35 }))
    gsap.set(previews, { scale: 0.85 })
  }

  // ---------------------------------------------------------- skills
  const pills = () => {
    const box = $("[data-pills]")
    if (!box) return
    const items = $$(".pill", box)
    if (!window.Matter) {
      gsap.fromTo(items, { opacity: 0, y: -60, rotate: () => gsap.utils.random(-20, 20) }, {
        opacity: 1, y: 0, rotate: 0, duration: 1.2, ease: "bounce.out", stagger: 0.04, scrollTrigger: onceOnEnter(box),
      })
      return
    }
    const { Engine, Bodies, Composite, Body, Mouse, MouseConstraint, Events } = Matter
    box.classList.add("is-physics")
    gsap.set(items, { opacity: 0 })
    const engine = Engine.create()
    engine.gravity.y = 1.1
    const sizes = items.map((el) => ({ w: el.offsetWidth, h: el.offsetHeight }))
    // Size the box to the pile: total pill area spread over the width, plus headroom.
    const fitHeight = () => {
      const area = sizes.reduce((sum, s) => sum + s.w * s.h, 0)
      box.style.height = `${gsap.utils.clamp(260, 760, Math.round((area / box.clientWidth) * 1.7 + 130))}px`
    }
    fitHeight()
    let W = box.clientWidth
    let H = box.clientHeight
    const wallOpts = { isStatic: true, restitution: 0.3, friction: 0.5 }
    const walls = [
      Bodies.rectangle(W / 2, H + 50, W * 3, 100, wallOpts),
      Bodies.rectangle(-50, H / 2, 100, H * 4, wallOpts),
      Bodies.rectangle(W + 50, H / 2, 100, H * 4, wallOpts),
    ]
    Composite.add(engine.world, walls)
    const bodies = items.map((el, i) => {
      const { w, h } = sizes[i]
      const body = Bodies.rectangle(
        gsap.utils.random(w / 2 + 10, W - w / 2 - 10),
        -80 - i * 46,
        w,
        h,
        { chamfer: { radius: h / 2 - 1 }, restitution: 0.45, friction: 0.25, frictionAir: 0.012, angle: gsap.utils.random(-0.6, 0.6) },
      )
      return body
    })

    if (finePointer) {
      box.classList.add("can-drag")
      const mouse = Mouse.create(box)
      // Matter cancels wheel events by default; let the page scroll.
      mouse.element.removeEventListener("wheel", mouse.mousewheel)
      mouse.element.removeEventListener("mousewheel", mouse.mousewheel)
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel)
      const drag = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.18, damping: 0.1, render: { visible: false } } })
      Composite.add(engine.world, drag)
      Events.on(drag, "startdrag", () => box.classList.add("is-grabbing"))
      Events.on(drag, "enddrag", () => box.classList.remove("is-grabbing"))
      // Release a pill even when the button comes up outside the box.
      addEventListener("mouseup", (e) => mouse.mouseup(e))
    } else {
      // Touch: tap a pill to flick it, without blocking page scroll.
      items.forEach((el, i) =>
        el.addEventListener("click", () => {
          Body.setVelocity(bodies[i], { x: gsap.utils.random(-6, 6), y: -14 })
          Body.setAngularVelocity(bodies[i], gsap.utils.random(-0.2, 0.2))
        }),
      )
    }

    let started = false
    let running = false
    const draw = () => {
      bodies.forEach((b, i) => {
        const { w, h } = sizes[i]
        items[i].style.transform = `translate3d(${b.position.x - w / 2}px, ${b.position.y - h / 2}px, 0) rotate(${b.angle}rad)`
      })
    }
    const step = 1000 / 60
    let pending = 0
    const tick = (_, delta) => {
      if (!running) return
      // Advance the simulation in fixed 60 Hz steps, whatever the display rate.
      pending = Math.min(pending + delta, step * 4)
      while (pending >= step) {
        Engine.update(engine, step)
        pending -= step
      }
      // Keep anything flung out of the box inside it.
      bodies.forEach((b) => {
        if (b.position.y > H + 200 || b.position.x < -200 || b.position.x > W + 200) {
          Body.setPosition(b, { x: W / 2, y: -60 })
          Body.setVelocity(b, { x: 0, y: 0 })
        }
      })
      draw()
    }
    gsap.ticker.add(tick)
    ScrollTrigger.create({
      trigger: box,
      start: "top 80%",
      end: "bottom top",
      onToggle: (self) => {
        running = self.isActive
        if (self.isActive && !started) {
          started = true
          Composite.add(engine.world, bodies)
          draw()
          gsap.set(items, { opacity: 1 })
        }
      },
    })
    let resizeTimer
    addEventListener("resize", () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        fitHeight()
        W = box.clientWidth
        H = box.clientHeight
        Body.setPosition(walls[0], { x: W / 2, y: H + 50 })
        Body.setPosition(walls[1], { x: -50, y: H / 2 })
        Body.setPosition(walls[2], { x: W + 50, y: H / 2 })
        bodies.forEach((b) => {
          if (b.position.x > W - 20) Body.setPosition(b, { x: W - 60, y: b.position.y - 40 })
        })
      }, 150)
    })
  }

  // ---------------------------------------------------------- beyond
  const beyond = () => {
    const panel = $("[data-beyond]")
    if (!panel) return
    gsap.fromTo(
      panel,
      { scale: 0.9, borderRadius: 90 },
      { scale: 1, borderRadius: 44, ease: "none", scrollTrigger: { trigger: panel, start: "top bottom", end: "top 25%", scrub: true } },
    )
    $$(".beyond-photo", panel).forEach((photo) => {
      const tilt = parseFloat(getComputedStyle(photo).getPropertyValue("--tilt")) || 0
      gsap.fromTo(
        photo,
        { opacity: 0, y: 120, rotate: tilt * 4, scale: 0.9 },
        { opacity: 1, y: 0, rotate: tilt, scale: 1, duration: 1.5, ease, scrollTrigger: onceOnEnter(photo, "top 90%") },
      )
      gsap.fromTo($("img", photo), { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true } })
    })
  }

  // ---------------------------------------------------------- project pages
  const counters = () => {
    $$("[data-count]").forEach((el) => {
      const match = el.dataset.count.match(/^(\d+)(.*)$/)
      if (!match || Number(match[1]) >= 1000 || Number(match[1]) < 2) return
      const target = Number(match[1])
      const suffix = match[2]
      const state = { n: 0 }
      gsap.to(state, {
        n: target,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: onceOnEnter(el, "top 92%"),
        onUpdate: () => (el.textContent = `${Math.round(state.n)}${suffix}`),
      })
    })
  }

  // ---------------------------------------------------------- pointer
  const magnetic = () => {
    if (!finePointer) return
    $$("[data-magnetic]").forEach((el) => {
      const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" })
      const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" })
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect()
        x((e.clientX - r.left - r.width / 2) * 0.18)
        y((e.clientY - r.top - r.height / 2) * 0.3)
      })
      el.addEventListener("pointerleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.4)" })
      })
    })
  }

  const start = () => {
    safely("headings", splitHeadings)
    safely("hero", heroIntro)
    safely("reveals", reveals)
    safely("marquee", marquee)
    safely("covers", coverParallax)
    safely("bench", benchPreviews)
    safely("pills", pills)
    safely("beyond", beyond)
    safely("counters", counters)
    safely("magnetic", magnetic)
    ScrollTrigger.refresh()
  }

  // Split text after web fonts settle so line breaks are measured correctly.
  const fontsReady = document.fonts?.ready ?? Promise.resolve()
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(() => {
    try {
      start()
    } catch (error) {
      console.error("[site] motion failed", error)
      revealEverything()
    }
  })
  addEventListener("load", () => ScrollTrigger.refresh())
})()

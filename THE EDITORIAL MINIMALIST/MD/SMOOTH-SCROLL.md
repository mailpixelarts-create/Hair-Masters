You are a senior creative technologist building a premium portfolio website.
Use the following exact tech stack — no substitutions:

STACK:
- Vanilla HTML/CSS/JS (no React, no framework)
- GSAP 3 + ScrollTrigger plugin
- Lenis (smooth scroll / momentum inertia)
- Barba.js (AJAX page transitions)

---

SMOOTH SCROLL SETUP (Lenis):
- Install Lenis and initialise with lerp: 0.08, duration: 1.4
- Run Lenis on every GSAP ticker frame:
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
- Sync ScrollTrigger with Lenis:
  lenis.on('scroll', ScrollTrigger.update)
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) { return arguments.length ? lenis.scrollTo(value) : lenis.scroll.progress * (document.body scrollHeight - window.innerHeight) },
    getBoundingClientRect() { return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight } }
  })

---

PAGE TRANSITIONS (Barba.js):
- Wrap all page content in data-barba="wrapper" and data-barba="container"
- On every page transition:
  1. GSAP exit: clip-path from "inset(0 0 0 0)" to "inset(0 0 100% 0)", duration 0.8, ease "power4.inOut"
  2. Destroy and reinitialise Lenis
  3. ScrollTrigger.refresh() after new page loads
  4. GSAP enter: fade + y translate from y:40 opacity:0 to y:0 opacity:1

---

PARALLAX EFFECTS:
- Hero image: gsap.to(".hero-img", { yPercent: 30, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } })
- Section text parallax: different yPercent values for heading vs body (heading: -20, body: -10) to create depth layers
- On any element that needs parallax, add data-speed attribute and read it in JS to set the yPercent value dynamically

---

SCROLL ANIMATIONS:
- All section reveals: gsap.from(".reveal", { y: 80, opacity: 0, duration: 1, ease: "power4.out", stagger: 0.1, scrollTrigger: { trigger: parent, start: "top 85%" } })
- Pinned sections: scrollTrigger: { pin: true, scrub: 1, start: "top top", end: "+=100%" }
- Horizontal scroll panel: gsap.to(".h-track", { x: () => -(track.scrollWidth - window.innerWidth), ease: "none", scrollTrigger: { pin: true, scrub: 1 } })

---

TEXT ANIMATIONS:
- Split every heading into words using SplitType (free library)
- Animate each word: gsap.from(words, { y: "100%", opacity: 0, duration: 0.9, ease: "power4.out", stagger: 0.06 })
- Wrap each word's parent in overflow: hidden so words slide up from behind a mask

---

CUSTOM CURSOR:
- Two divs: .cursor-dot (8px) and .cursor-follower (40px, border only)
- Move dot instantly with mousemove
- Move follower with gsap.quickTo for smooth lag:
  const xTo = gsap.quickTo(".cursor-follower", "x", { duration: 0.4, ease: "power3" })
  const yTo = gsap.quickTo(".cursor-follower", "y", { duration: 0.4, ease: "power3" })
- On hover of links/buttons: scale follower to 2.5x, mix-blend-mode: difference

---

PRELOADER:
- Full screen div, z-index 9999
- Count from 0 to 100 over 2 seconds
- On complete: gsap.to(".preloader", { yPercent: -100, duration: 0.9, ease: "power4.inOut" })
- Then initialise Lenis and all ScrollTriggers AFTER preloader exits

---

PERFORMANCE RULES (non-negotiable):
- Only animate transform and opacity — never width, height, top, left, margin
- Use will-change: transform on parallax elements
- All images use loading="lazy" and object-fit: cover
- ScrollTrigger.refresh() after any DOM change or font load
- On mobile (< 768px): disable Lenis smooth scroll, keep GSAP animations but reduce yPercent values by 50%

---

FILE STRUCTURE:
index.html
about.html
work.html (with horizontal scroll section)
css/
  style.css
  animations.css
js/
  lenis-init.js       (smooth scroll setup + ScrollTrigger sync)
  barba-init.js       (page transitions, re-init hooks)
  animations.js       (all GSAP ScrollTrigger animations)
  cursor.js           (custom cursor)
  preloader.js        (preloader logic)
  split-text.js       (SplitType word splitting)

---

INITIALISATION ORDER (critical, do not change):
1. Preloader starts
2. Fonts loaded (document.fonts.ready)
3. Lenis initialised
4. Lenis synced to ScrollTrigger
5. All GSAP animations registered
6. ScrollTrigger.refresh()
7. Preloader exits
8. Barba hooks registered last

Build this. Every file complete. No placeholders.
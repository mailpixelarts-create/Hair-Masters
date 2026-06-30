# CHANGELOG — THE PRECISION CUTTER

## v1.5 — 2026-06-29

### Smooth Scroll — Lenis Configuration Confirmed

**Files Modified:**
- None — Lenis smooth scroll already active in `js/main.js:13-38`.

**Logic Summary:** Verified Lenis is properly configured with duration: 1.4, disabled on mobile (<768px) and `prefers-reduced-motion`, synced with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add`. Smooth scroll is live across all pages.

---

## v1.4 — 2026-06-29

### Creative Image Integration — All 38 Local Assets Deployed

**Files Modified:**
- `index.html` — Added Beauty Macro section (04) with 6 detail images in editorial grid; added Transformation section (05) with 2 before/after pairs; enhanced Process section (02) with 4 inline process images; added 3 atmosphere images as footer ambient layer; replaced HTML `&hearts;` with inline SVG heart (fill #E03C31) on all 3 pages; renumbered sections 04→06, 05→07.
- `about.html` — Replaced `&hearts;` with red SVG heart icon in footer.
- `work.html` — Replaced `&hearts;` with red SVG heart icon in footer.
- `css/style.css` — Added `.step-image` grid column + crop styling; `.macros-grid` editorial layout with tall/wide variants; `.transform-pair` before/after grid; `.footer-atmosphere` grayscale-to-color strip; `.heart-icon` SVG sizing; `.footer-norman` typography; responsive rules for all new sections at 1024px/640px breakpoints.
- `css/animations.css` — Added initial hidden states for `.step-image`, `.macro-item`, `.transform-pair` (clip-path + opacity + translateY).
- `js/main.js` — Added `animateMacros()` with random-stagger grid reveal + step image clip-path reveals; added `animateTransformation()` with splitType title + before/after clip-path reveals; both respect `prefersReducedMotion`.

**Logic Summary:** All 38 images from `precision_cutter_images/` are now live across the experience. The Beauty Macro section (Sec XXVII — Beauty Macro hero type) showcases micro-precision through an editorial asymmetric grid. The Transformation section leverages before/after pairs as emotional proof of the craft. Process images transform text-only steps into visual narrative. Atmosphere images create a desaturated footer world that colorizes on hover. The red SVG heart (&#x2764;) provides the brand signature requested.

---

## v1.2 — 2026-06-29

### System Check: Motion Doctrine & Aesthetic World Alignment — Deep Pass

**Files Modified:**
- `js/main.js` — Replaced repetitive clip-path reveals with SplitType editorial word-by-word reveals; added `prefers-reduced-motion` checks to all animation functions; rewrote section zoom transitions from generic scale+blur to narrative-driven Y-axis + rotateX with per-section variation; added custom cursor system with hover/drag states.
- `js/about.js` — Added SplitType word reveals for hero title and section titles; added reduced motion checks to hero, bio, and approach animations; rewrote section zoom to match main.js narrative-driven approach; added custom cursor initialization.
- `js/work.js` — Added SplitType word reveals for hero title; added reduced motion checks; rewrote section zoom; added custom cursor with gallery drag state.
- `css/style.css` — Added custom cursor CSS (dot + ring, mix-blend-mode difference, hover/drag states, touch device hiding); enhanced footer with world-building tagline, address/hours details, and sign-off section; updated responsive footer styles.
- `index.html` — Added custom cursor HTML elements; enhanced footer with emotional tagline, address details, and sign-off per Section XXVII.
- `about.html` — Added custom cursor HTML; enhanced footer with world-building closure.
- `work.html` — Added custom cursor HTML; enhanced footer with editorial closure.

**Logic Summary:** Aligned all UI code with the Motion Doctrine (Section XXI) by replacing repetitive clip-path animations with varied SplitType editorial reveals (word-by-word staggered); with the Typography Doctrine (Section XXV) by utilizing SplitType for meaningful text decomposition; with the Accessibility Pillar (Section LXVI) by adding `prefers-reduced-motion` support to all JS animation functions; with the Signature Interaction Rule (Section XXIV) by adding a custom cursor system; and with the Footer Worldbuilding directive (Section XXVII) by transforming minimal footers into emotional closures with brand-world details.

---

## v1.1 — 2026-06-29

### Local Image Integration — Replace External Unsplash Dependencies

**Files Modified:**
- `index.html` — Replaced 6 Unsplash URLs with local images from `precision_cutter_images/` (hero portrait + 5 gallery slides).
- `about.html` — Replaced 1 Unsplash URL with `precision_cutter_images/hero/hero_02_modernist_crop_portrait.png` for bio portrait.
- `work.html` — Replaced 8 Unsplash URLs with all 8 gallery images from `precision_cutter_images/gallery/`.

**Logic Summary:** Eliminated all external image dependencies. Every `<img>` across the three pages now sources from the local `precision_cutter_images/` directory, ensuring offline capability, faster load times (no DNS lookup to Unsplash), and alignment with the Image Architecture directive (Sec XVIII) — images are now directed assets, not random stock.

---

## v1.0 — 2026-06-29

### System Check: Motion Doctrine & Aesthetic World Alignment

**Files Modified:**
- `js/main.js` — Removed `filter: blur()` from section zoom (violates Performance Doctrine: only `transform`/`opacity`); added `prefers-reduced-motion` check; disabled Lenis on mobile (<768px); added `gsap.config()` with `force3D` respecting reduced motion.
- `js/about.js` — Same blur removal, reduced-motion, mobile Lenis, and gsap.config fixes as main.js.
- `js/work.js` — Same blur removal, reduced-motion, mobile Lenis, and gsap.config fixes as main.js.
- `css/animations.css` — Added `@media (prefers-reduced-motion: reduce)` block that disables all animations/transitions and forces initial reveal states for all animated elements.
- `index.html` — Added ARIA attributes: `aria-label` on nav and sections, `role="button"` + `tabindex` + `aria-expanded` on nav toggle, `role="menu"`/`role="menuitem"` on dropdown, `aria-label` on contact form.

**Logic Summary:** Aligned all UI code with the Motion Doctrine (Section XXI) by eliminating `filter: blur()` animation, with the Mobile Luxury Protocol by disabling Lenis smooth scroll on mobile, and with the Accessibility Pillar by implementing `prefers-reduced-motion` and ARIA landmarks.

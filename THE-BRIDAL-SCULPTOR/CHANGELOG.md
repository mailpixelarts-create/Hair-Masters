# CHANGELOG — THE BRIDAL SCULPTOR

---

## v1.0 — 2026-06-25

### Initial Build
- Created complete single-page site with 7 scenes: Hero, Philosophy, Gallery, Details, Process, Look Pathways, Experience, Inquire
- Built full design system: ivory/champagne palette, Cormorant Garamond + DM Sans, responsive grid

### Files Created
- `index.html` — Full site structure with 32 mapped image prompts, preloader, cursor, nav, mobile nav
- `css/style.css` — Design tokens, layout, responsive breakpoints, reduced-motion, footer worldbuilding
- `css/animations.css` — Reveal states, split-text masks, hover effects, look-card expand, mobile nav stagger
- `js/lenis-init.js` — Lenis smooth scroll with ScrollTrigger sync, mobile disabled
- `js/preloader.js` — Loading count + progress bar + yPercent exit
- `js/split-text.js` — SplitType line wrapping with overflow:hidden masks
- `js/animations.js` — GSAP matchMedia desktop/mobile systems, hero entrance, parallax, reveals, gallery batch, look-card signature interaction, experience stagger
- `js/cursor.js` — Custom dot + follower with gsap.quickTo, touch detection
- `README.md` — Project documentation

### Image Prompts Mapped
- All 32 production prompts from `THE BRIDAL SCULPTOR Production_Image_Prompts.md` mapped to HTML as comments + alt-text
- All `picsum.photos` placeholders replaced with local paths in `assets/images/Bridal_Sculptor_Images/`

---

## v1.1 — 2026-06-25

### System Check — Doctrine Compliance Audit
Audited all JS/CSS against `FASHION-SOTD-GRANDMASTER.SKILL.MD` Motion Doctrine and Aesthetic World.

### CRITICAL Fixes
- `js/animations.js` — Fixed `.line-inner` permanently invisible with `prefers-reduced-motion` (accessibility failure)
- `js/animations.js` — Replaced `height` animation on look-card expand with `scaleY` transform (doctrine: transform + opacity only)
- `css/style.css` — Removed `.nav` padding transition (layout thrash on every scroll)

### HIGH Fixes
- `js/preloader.js` — Added `prefers-reduced-motion` check; skips animation entirely for reduced-motion users
- `js/lenis-init.js` — Lenis completely disabled on mobile (no RAF loop, no proxy); native scroll only

### MEDIUM Fixes
- `css/style.css` — Replaced all CSS `width` transitions on decorative lines with `scaleX` transforms (nav-link::after, hero-cta-line, inquire-form-submit-line)
- `css/style.css` — Added `will-change: transform` to `.philosophy-image img` and `.process-image img` (parallax GPU acceleration)
- `js/animations.js` — Increased mobile hero entrance from ~1.8s to ~3s (doctrine minimum)
- `js/animations.js` — Increased mobile section/gallery/experience reveal durations from 1-1.2s to 2s (doctrine minimum)
- `css/animations.css` — Replaced `.nav-logo-text` `font-size` transition with `scale` transform
- `js/cursor.js` — Replaced `borderColor` animation with `opacity` (transform + opacity only)
- `css/style.css` — Removed `.cursor-follower` CSS transitions (GSAP handles via scale/opacity now)

### Files Modified
- `js/animations.js` — Reduced-motion fix, scaleY look-card, mobile duration increases
- `js/preloader.js` — Reduced-motion early exit
- `js/lenis-init.js` — Mobile skip guard
- `js/cursor.js` — borderColor → opacity
- `css/style.css` — Nav padding removed, width→scaleX, will-change additions, cursor transitions removed
- `css/animations.css` — Nav logo scale, look-card will-change

---

---

## v1.2 — 2026-06-29

### Missing Images — SVG Placeholders Created
- Created brand-aligned SVG placeholders for 2 missing Look Pathway images (`Pathway_07_The_Reception_Shift.svg`, `Pathway_08_The_Editorial_Bride.svg`)
- Updated `index.html` `src` attributes to reference `.svg` instead of `.jpg` for these two files
- Placeholders use ivory/champagne palette for Pathway 07 and dark charcoal palette for Pathway 08, matching the editorial tone

### System Check — Doctrine Compliance Audit
- Full audit against `FASHION-SOTD-GRANDMASTER.SKILL.md` Motion Doctrine and Aesthetic World
- Confirmed all v1.1 fixes remain intact: scaleY transform, reduced-motion, mobile Lenis disabled, cursor opacity, scaleX decorative lines
- Verified mobile hero entrance ~3.4s (within 3–5s doctrine range)
- Verified all section reveals ≥2s on both desktop and mobile
- Confirmed one signature interaction (Look Card expand) — no secondary interactions introduced
- Confirmed transform+opacity-only rule maintained across all CSS and GSAP animations
- Confirmed `will-change: transform` on parallax elements
- Confirmed `prefers-reduced-motion` early exit in preloader, animations, and cursor
- Confirmed two font families only (Cormorant Garamond + DM Sans)
- Confirmed footer worldbuilding as "The Atelier"
- Minor note: `box-shadow` on form input focus retained for accessibility focus visibility (§LXVI)

### Files Modified
- `index.html` — Updated Pathway 07 and 08 image `src` from `.jpg` to `.svg`

### Files Created
- `assets/images/Bridal_Sculptor_Images/LookPathways/Pathway_07_The_Reception_Shift.svg` — SVG placeholder
- `assets/images/Bridal_Sculptor_Images/LookPathways/Pathway_08_The_Editorial_Bride.svg` — SVG placeholder

---

*End of changelog.*

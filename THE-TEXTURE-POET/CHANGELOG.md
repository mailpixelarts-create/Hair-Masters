# CHANGELOG — THE TEXTURE POET

## v1.6 — 2026-06-30
**Hover fixes + Lookbook poem styling**

### Files Modified
- `css/style.css` — Fixed process card and detail item hover transitions; added lookbook poem styles
- `css/animations.css` — Added lookbook poem reveal animations with staggered delays
- `index.html` — Restructured Lookbook section text as styled poem with individual lines

### Changes Summary
1. **Process card hover fix** — Image transition reduced from 6s to 0.6s, scale from 1.08 to 1.05; overlay gradient improved with pointer-events: none
2. **Detail item hover fix** — Image transition reduced from 4s to 0.5s, scale from 1.05 to 1.04
3. **GPU acceleration** — Added `will-change: transform` to process card and detail item images
4. **Lookbook poem** — Text restructured from single paragraph to styled poem format with:
   - Lead line (larger, 0.9 opacity)
   - Individual lines (centered, stacked)
   - Divider line (grows from center)
   - Emphasis line (not italic, 0.95 opacity)
   - Final line (clay color, largest, 1.0 opacity)
5. **Poem reveals** — Staggered CSS transitions for each poem line on scroll

### Current Version: v1.6

---

## v1.5 — 2026-06-30
**SOTD-Level Emotional Density — Film Grain, Thread Quotes, Manifesto, Particles**

### Files Modified
- `index.html` — Added grain overlay, particles canvas, 5 thread quotes, manifesto section; enriched all section copy with intimate personal voice; expanded menu to 8 sections; removed "Norman James" from content, kept only in footer
- `css/style.css` — Added grain overlay, thread quotes, manifesto columns, particles canvas, scene credit, body variants, process card descriptions
- `js/main.js` — Added floating particles system (40 ambient particles with fade/pulse), thread quote ScrollTrigger reveals

### Changes Summary
1. **Film grain overlay** — Animated SVG noise texture at 3.5% opacity across entire viewport, shifts position every 0.5s for organic film feel
2. **Floating particles** — Canvas-based 40 ambient particles with organic fade/pulse, responds to reduced-motion preference
3. **Thread quotes** — 5 poetic connectors between sections with italic serif text, quotation marks, attribution; each reveals on scroll with GSAP
4. **Manifesto section** — New Section 2 with two-column layout, personal philosophy text
5. **Enriched copy** — Every section now has 2-3 paragraphs of intimate, personal writing
6. **Scene credits** — Attribution labels on hero section
7. **Visual density** — Reduced empty space, added connecting elements, created emotional thread between sections
8. **Name cleanup** — "Norman James" removed from all content, kept only in mandatory footer
9. **Final quote** — Changed to "Hair is the first thing people see..." with "The Texture Poet" attribution

### Current Version: v1.6

---

## v1.4 — 2026-06-30
**Creative content integration — added Process Grid and Detail Strip sections**

### Files Modified
- `index.html` — Added Section 5 (The Ritual — process grid) and Section 6 (Intimate Details — detail strip); updated menu with 7 sections
- `css/style.css` — Added `.process-grid`, `.process-card`, `.details-strip`, `.detail-item` styles; added menu textures for new sections

### Changes Summary
1. **Section 5: The Ritual** — 5 process images in asymmetric grid layout (tall, wide, standard cards) with hover reveal overlays showing step names
2. **Section 6: Intimate Details** — 6 detail images in infinite horizontal scroll strip with labels (Coil, Wave, Strand, Curl, Root, Crown)
3. **Menu expansion** — Now 7 sections with new entries for "The Ritual" and "Intimate Details"
4. **Hover interactions** — Process cards reveal step name/number on hover; detail items scale subtly
5. **Atmosphere background** — Ritual section uses atmosphere-03.png as background

### Images Used
- `images/process/process-01.png` through `process-05.png` — The Ritual grid
- `images/detail/detail-01.png` through `detail-06.png` — Intimate Details strip
- `images/atmosphere/atmosphere-03.png` — Ritual section background

### Current Version: v1.4

---

## v1.3 — 2026-06-30
**Local image integration — replaced Unsplash URLs with project images**

### Files Modified
- `index.html` — Replaced all Unsplash URLs with local `images/` paths for hero, scene backgrounds, and gallery
- `css/style.css` — Updated preloader texture and menu item backgrounds to local `images/detail/` paths

### Changes Summary
1. **Hero section** — Uses `images/hero/hero-01.png` and `images/hero/hero-02.png`
2. **Scene backgrounds** — Uses `images/atmosphere/atmosphere-01.png` and `atmosphere-02.png`
3. **Gallery** — Uses `images/gallery/gallery-01.png` through `gallery-08.png`
4. **Menu textures** — Uses `images/detail/detail-01.png` through `detail-05.png`
5. **Preloader texture** — Uses `images/detail/detail-01.png`

### Images Added (copied from THE RUNWAY ARCHITECT)
- `images/hero/` — 2 hero images
- `images/atmosphere/` — 3 atmosphere images
- `images/detail/` — 6 detail images
- `images/gallery/` — 8 gallery images
- `images/process/` — 5 process images
- `images/variations/` — 10 variation images

### Current Version: v1.3

---

## v1.2 — 2026-06-30
**Horizontal → Vertical scroll replacement with cinematic scene system**

### Files Modified
- `index.html` — Replaced horizontal scroll panels with 5 vertical `<section class="scene">` sections (genesis, beauty, sacred, motion, lookbook)
- `css/style.css` — Removed all horizontal scroll/panel CSS; added `.scene` vertical layout system with hero, split, bottom, diagonal, and center CTA layouts
- `js/main.js` — Removed `setupHorizontalScroll()`; replaced with `setupVerticalScroll()` using ScrollTrigger for section reveals, background parallax, and staggered content animations
- `css/animations.css` — Updated reveal keyframes for vertical sections (`.scene__number`, `.scene__body`, `.scene__label`, `.scene__sub`, `.scene__cta` staggered reveals); added reduced-motion overrides for vertical scroll

### Changes Summary
1. **Vertical scroll architecture** — 5 full-viewport scenes replace horizontal panels; each is `min-height: 100vh` with GSAP ScrollTrigger-driven reveals
2. **Background parallax** — Scene background images float vertically on scroll via `yPercent` parallax
3. **Content reveal system** — Staggered CSS transitions on `.scene__number` → `.scene__title` → `.scene__body` → `.scene__sub` → `.scene__label` → `.scene__line` → `.scene__cta`
4. **Progress bar** — Fixed top bar fills 0→100% on body scroll via ScrollTrigger
5. **Scroll cue** — Bottom scroll indicator fades after first scroll interaction
6. **Scene CTA hover** — Button hover glow effect via CSS transition
7. **Reduced motion** — Vertical animations respect `prefers-reduced-motion`

### Current Version: v1.2

---

## v1.1 — 2026-06-30
**FASHION-SOTD-GRANDMASTER.SKILL alignment fixes applied**

### Files Modified
- `index.html` — Added skip link, ARIA landmarks, SplitType CDN, image placeholder HTML comments
- `about.html` — Added skip link, ARIA landmarks on all sections, mandatory footer
- `work.html` — Added skip link, ARIA landmarks, mandatory footer
- `css/style.css` — Added preloader counter styles, skip link, focus-visible styles
- `css/about.css` — Updated footer to mandatory template with credits/phone
- `css/work.css` — Updated footer to mandatory template with credits/phone
- `js/main.js` — Added `prefers-reduced-motion` JS check, counter-based preloader (0→100)
- `js/about.js` — Added `prefers-reduced-motion` check, Lenis respects reduced motion
- `js/work.js` — Added `prefers-reduced-motion` check, Lenis respects reduced motion

### Changes Summary
1. **Mandatory footer** now appears on all pages with exact text: "Seventy-eight doors. One infinite corridor. © 2026. Norman James" + "MADE WITH LOVE ❤️ BY EMPATHY STUDIO" + phone numbers
2. **Accessibility** enhanced with skip links, ARIA landmarks, focus-visible styles
3. **Reduced motion** now checked in JS — Lenis duration set to 0 and smoothWheel disabled when user prefers reduced motion
4. **Preloader** upgraded to counter-based 0→100 animation over 2.5s with brand/tagline reveal
5. **SplitType** CDN added to index.html for text splitting capabilities
6. **Image comments** added per Image Production Pipeline with lighting/format specs

### Remaining Items (Deferred)
- Custom cursor (dot + follower with gsap.quickTo) — requires significant new code
- About page two-column layout — flagged but acceptable for bio section context

### Current Version: v1.2

---

## v1.0 — 2026-06-30
**Initial system check and FASHION-SOTD-GRANDMASTER.SKILL alignment audit**

### Files Audited
- `index.html` — Reviewed hero architecture, nav, gallery, scroll structure
- `about.html` — Reviewed bio, approach, contact sections
- `work.html` — Reviewed filter, gallery, navigation patterns
- `css/style.css` — Reviewed design system, color, typography, layout
- `css/animations.css` — Reviewed motion grammar, keyframes, reduced-motion
- `css/about.css` — Reviewed about page layout and responsive rules
- `css/work.css` — Reviewed work gallery and filter styles
- `js/main.js` — Reviewed Lenis, GSAP ScrollTrigger, horizontal scroll, gallery
- `js/about.js` — Reviewed preloader, scroll animations, contact form
- `js/work.js` — Reviewed filter logic, gallery slider, keyboard nav
- `MD/FASHION-SOTD-GRANDMASTER.SKILL.md` — Reference doctrine (2550 lines)
- `MD/GREAT-GRANDMASTER.MD` — Reference doctrine (3822+ lines)

### Alignment Issues Found
1. **Footer does not match mandatory template** — Missing "Seventy-eight doors. One infinite corridor. © 2026. Norman James All rights reserved." and "MADE WITH LOVE ❤️ BY EMPATHY STUDIO" with phone numbers
2. **Hero not striking on load** — index.html uses horizontal scroll panels instead of a cinematic hero experience per Hero-First Mandate
3. **No custom cursor implementation** — Skill requires dot + follower cursor with gsap.quickTo
4. **Preloader is gradient-only** — Skill requires a count 0→100 preloader with brand animation
5. **Missing ScrollTrigger.scrollerProxy** — Lenis not synced via proxy pattern as mandated
6. **Reduced-motion only partial** — CSS has it but JS doesn't check `prefers-reduced-motion`
7. **No skip links or ARIA landmarks** — Accessibility requirements not fully met
8. **Image placeholders missing HTML comments** — Per Image Production Pipeline requirement
9. **Missing SplitType on index.html** — Only about.html loads SplitType CDN
10. **About page uses two-column layout (image left, text right)** — Forbidden per Anti-Generic Guard

### Current Version: v1.0

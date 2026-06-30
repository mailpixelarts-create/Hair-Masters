# CHANGELOG — THE ALCHEMIST

## v1.8 — 2026-06-25

### Hero Text Visibility Fix

**Files Modified:**
- `src/js/hero.js` — Fixed hero entrance animation to work with split text

**Issue:**
- `splitText()` in `animations.js` was setting hero name lines to `opacity: 0` and `translateY(100%)`
- Hero entrance animation used `.from()` which animated TO that hidden state
- Result: hero text remained invisible

**Fix:**
- Changed hero entrance to target inner spans created by `splitText()` 
- Uses `.to()` instead of `.from()` to animate FROM hidden state TO visible state
- Staggers span reveals for cinematic text emergence

**Build Verified:**
- 26.05 KB HTML
- 16.64 KB CSS
- 478.33 KB JS

## v1.7 — 2026-06-25

### Complete CSS Architecture for New Sections

**Files Modified:**
- `src/css/globals.css` — Added all missing styles for new image sections

**New CSS Added:**

| Section | Styles Added |
|---------|--------------|
| Hero Fallback | `.hero-fallback` container, hidden image fallback |
| Detail Grid | `.scene-detail`, `.detail-grid`, `.detail-item`, `.detail-caption`, hover effects |
| Atmosphere Interstitials | `.scene-atmosphere`, `.atmosphere-image`, `.atmosphere-overlay`, `.atmosphere-text` |
| Mobile Responsive | Detail grid single column, atmosphere min-height reduction |

**CSS Features:**
- Detail grid: 3-column layout with `.detail-item--large` spanning 2x2
- Hover effects: image scale (1.08) with caption fade-in
- Atmosphere: full-viewport sections with gradient overlays
- Typography: Cormorant Garamond italic for atmosphere quotes
- Transitions: cubic-bezier easing for premium feel
- Mobile: single-column detail grid, reduced atmosphere height

**Build Verified:**
- 26.05 KB HTML (6.04 KB gzip)
- 16.64 KB CSS (3.69 KB gzip)
- 478.35 KB JS (121.31 KB gzip)

## v1.6 — 2026-06-25

### Production Image Path Integration

**Files Modified:**
- `src/index.html` — Updated all 26 image paths to match generated production files

**Image Path Mapping:**

| Category | Path Pattern | Files |
|----------|--------------|-------|
| Hero | `Hero/Hero_01_Re-Authored_Brunette.jpg` | 1 |
| Gallery | `Gallery/Gallery_01_Expensive_Brunette_Reset.jpg` through `Gallery_08_Post-Correction_Silence.jpg` | 8 |
| Slider | `Slider/Slider_01A_Brunette_Before.jpg` through `Slider_02B_Blonde_After.jpg` | 4 |
| Detail | `Detail/Detail_01_Root-to-Midlength_Tonal_Blend.jpg` through `Detail_06_Movement_Texture_Micro_Study.jpg` | 6 |
| Process | `Process/Process_01_Formula_Bowl_Alchemy.jpg` through `Process_05_Final_Gloss_Check_Hand.jpg` | 5 |
| Atmosphere | `Atmosphere/Atmosphere_01_The_Transformation_Table.jpg` through `Atmosphere_03_Pigment_Gloss_Material_Study.jpg` | 3 |

**Build Verified:**
- 26.05 KB HTML (6.04 KB gzip)
- All 26 production images properly referenced

**Additional Generated Images (available for expansion):**
- `Gallery_09_West_Asian_Renaissance.jpg`
- `Gallery_10_Glass_Hair_Sleek.jpg`
- `Gallery_11_Blonde_to_Brunette_Reauthoring.jpg`
- `Gallery_12_Undone_Luxe_Movement.jpg`
- `Detail_07_Warm_Copper_Gloss_Sheen.jpg`
- `Detail_08_Nape_Hairline_Edge.jpg`
- `Process_06_Freehand_Balayage_Painting.jpg`
- `Atmosphere_04_The_Atelier_at_Rest.jpg`
- `Hero_02_Corrected_Blonde_Alchemy.jpg`

## v1.5 — 2026-06-25

### Complete Image Slot Architecture

**Files Modified:**
- `src/index.html` — Added all remaining image slots from `THE ALCHEMISProduction_Image_Prompts.md`

**New Sections Added:**

| Section | Image Slots | Prompts Used |
|---------|-------------|--------------|
| Gallery Filmstrip (extended) | 2 | Gallery 07–08 |
| Transformation Slider 02 | 2 | Slider Pair 02 (Before/After) |
| Detail / Texture Crops | 6 | Detail Prompts 01–06 |
| Atmosphere Interstitials | 3 | Atmosphere Prompts 01–03 |
| Hero Fallback | 1 | Hero Prompt 01 |

**Complete Image Inventory (26 slots):**

| Category | Count | Status |
|----------|-------|--------|
| Hero | 1 | ✅ Mapped (fallback) |
| Gallery | 8 | ✅ Mapped |
| Detail | 6 | ✅ Mapped |
| Process | 5 | ✅ Mapped |
| Atmosphere | 3 | ✅ Mapped |
| Slider Before/After | 4 (2 pairs) | ✅ Mapped |
| **Total** | **26** | **All prompts mapped** |

**HTML Structure Updates:**
- Added `scene-03b` (Detail section) between Gallery and Process
- Added `scene-atmo-01` interstitial after Process
- Added `scene-atmo-02` and `scene-atmo-03` interstitials between Pathways and Trust
- Added second transformation slider (`transformation-slider-02`) for blonde repair
- Extended filmstrip from 6 to 8 items
- Added hero fallback image (hidden, for mobile/canvas fallback)

**Remaining:**
- Generate all 26 images from prompts
- Place in `public/assets/images/`
- Add CSS for new sections (detail grid, atmosphere interstitials)

## v1.4 — 2026-06-25

### Production Image Mapping

**Files Modified:**
- `src/index.html` — Replaced all `picsum.photos` placeholders with production image paths mapped to `THE ALCHEMISProduction_Image_Prompts.md`

**Image Mapping Applied:**

| HTML Slot | Production Prompt | Filename |
|-----------|------------------|----------|
| Slider Before | Slider 01A — Before | `slider-01a-before.jpg` |
| Slider After | Slider 01B — After | `slider-01b-after.jpg` |
| Gallery 1 | Gallery 01 — Expensive Brunette Reset | `gallery-01-expensive-brunette.jpg` |
| Gallery 2 | Gallery 02 — Corrective Copper Refinement | `gallery-02-corrective-copper.jpg` |
| Gallery 3 | Gallery 03 — Healthy Blonde Repair | `gallery-03-healthy-blonde.jpg` |
| Gallery 4 | Gallery 04 — Dark Gloss Back View | `gallery-04-dark-gloss-back.jpg` |
| Gallery 5 | Gallery 05 — Dimensional Bronde | `gallery-05-dimensional-bronde.jpg` |
| Gallery 6 | Gallery 06 — Bob Correction / Glass Finish | `gallery-06-bob-correction.jpg` |
| Process 1 | Process 01 — Formula Bowl Alchemy | `process-01-formula-bowl.jpg` |
| Process 2 | Process 02 — Gloss Application | `process-02-gloss-application.jpg` |
| Process 3 | Process 03 — Sectioning + Precision | `process-03-sectioning.jpg` |
| Process 4 | Process 04 — Blowout Finish | `process-04-blowout-finish.jpg` |
| Process 5 | Process 05 — Final Gloss Check | `process-05-final-gloss-check.jpg` |

**Remaining Prompts (not yet in HTML):**
- Hero Prompt 01 & 02 — Reserved for hero section (currently using Three.js canvas)
- Gallery Prompts 07–08 — Available for gallery expansion
- Detail Prompts 01–06 — Available for detail/texture sections
- Atmosphere Prompts 01–03 — Available for interstitial sections
- Slider Pair 02 — Available for second before/after slider

**Next Steps:**
1. Generate production images from prompts in `MD/THE ALCHEMISProduction_Image_Prompts.md`
2. Place images in `public/assets/images/`
3. Consider adding detail and atmosphere sections to HTML for remaining prompts

## v1.3 — 2026-06-25

### Copy Cleanup

**Files Modified:**
- `src/index.html` — Removed "Transformation Atelier" from title tag, hero label, and footer brand text

## v1.2 — 2026-06-25

### Footer Copy Update

**Files Modified:**
- `src/index.html` — Removed "Seventy-eight doors. One infinite corridor." from footer, retained "© 2026. Norman James All rights reserved." and "MADE WITH LOVE BY EMPATHY STUDIO"

## v1.1 — 2026-06-25

### Motion Doctrine Alignment — FASHION-SOTD-GRANDMASTER.SKILL.MD Audit

**Files Modified:**
- `src/js/hero.js` — Refined Three.js displacement shader: reduced noise speed (0.1→0.06), softened mouse influence (0.05→0.03), added subtle film grain, deepened vignette for cinematic atmosphere
- `src/js/animations.js` — Restructured all animations to follow Motion Doctrine scroll choreography rhythm: Reveal → Pause → Accelerate → Breathe → Seduce → Expand → Reflect

**Motion Doctrine Compliance:**
- Manifesto heading now uses clip-path reveal (cinematic, not fade)
- Philosophy pillars use staggered acceleration with parallax drift
- Filmstrip scrub increased to 1.5 for luxurious pacing
- Pathway cards include subtle scale for depth
- Trust blocks use slower 1.2s duration with 0.2s stagger for contemplation
- Invitation closing has dedicated fade-in animation

**Aesthetic World Alignment:**
- Hero shader now feels atmospheric (breathing surface) not technical (noise demo)
- Film grain adds tactile quality per "cinematic refinement" pillar
- All motion serves narrative purpose, never decorates

**Build Bible Motion Doctrine Compliance:**
- reveal through light: clip-path reveals, fade-ins ✅
- soft cinematic drift: parallax, gentle easing ✅
- luxury editorial pacing: 1.2-1.4s durations, controlled stagger ✅
- controlled transformation: hero displacement, formula scroll ✅
- depth appearing gradually: parallax layers, scale transitions ✅

**Build Bible Scene-by-Scene Motion:**
- Hero: slow drift + text reveal stagger + mask entrance ✅
- Manifesto: line-by-line reveal + parallax + fades ✅
- Gallery: sequence reveals + clip-path slider + hover emphasis ✅
- Process: layered modules + scroll choreography ✅
- CTA: calm fade/lift + luxurious finality ✅

## v1.0 — 2026-06-25

### Initial Build Complete

**Files Created:**
- `src/index.html` — Full 7-scene cinematic structure with semantic HTML
- `src/css/globals.css` — Design system: colors, typography, spacing, responsive, reduced-motion
- `src/css/animations.css` — Keyframe animations library
- `src/js/main.js` — Entry point with strict initialization order
- `src/js/lenis.js` — Lenis smooth scroll + GSAP ScrollTrigger sync
- `src/js/preloader.js` — Full-screen preloader with count 0–100
- `src/js/cursor.js` — Custom cursor (dot + follower) with hover states
- `src/js/hero.js` — Three.js THE SLOW EMERGENCE with displacement shader
- `src/js/nav.js` — Vertical left edge navigation with scene tracking
- `src/js/split-text.js` — Manual text splitting with overflow masks
- `src/js/animations.js` — GSAP ScrollTrigger animations for all scenes
- `src/js/transformation-slider.js` — Before/after reveal slider
- `src/js/formula-scroll.js` — Pinned formula-to-finish scroll sequence
- `package.json` — Dependencies: GSAP, Lenis, Three.js, Vite
- `vite.config.js` — Vite config with src root

**Build Verified:**
- 18.34 KB HTML (4.42 KB gzip)
- 14.54 KB CSS (3.37 KB gzip)
- 477 KB JS (121 KB gzip)

**Design System Aligned with Build Bible:**
- Palette: deep espresso, smoked bronze, champagne beige, muted gold
- Typography: Cormorant Garamond (display) + DM Sans (body)
- Motion: Flowing personality (1.6s Lenis duration)
- Hero: THE SLOW EMERGENCE — Three.js displacement portrait
- Navigation: Vertical left edge with scene numbers
- Signature Interactions: Transformation Slider + Formula-to-Finish

**Aesthetic World Alignment (FASHION-SOTD-GRANDMASTER.SKILL.MD):**
- Dark Luxury × Maison Editorial aesthetic cluster
- Emotion > Information priority maintained
- Motion = Narrative (all animations serve narrative purpose)
- Performance = Respect (60fps target, only transform/opacity animated)
- Accessibility = Inclusion (reduced-motion, keyboard nav, contrast)

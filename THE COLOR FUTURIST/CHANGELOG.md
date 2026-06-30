# CHANGELOG — THE COLOR FUTURIST

All notable changes to this project will be documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/).

---

## [1.3] - 2026-06-29

### SKILL.md Alignment — Full Motion Doctrine + Aesthetic World
- **Lenis smooth scroll** added to all 3 HTML files (CDN) with GSAP ticker sync for 60fps
- **SplitType CDN** added to all 3 HTML files for word-level text splitting
- **Tonal Spectrum Explorer** section added to index.html — 10 swatches with hover/active states, live tone name, preview swatch
- **Atmospheric imagery** section added to index.html — 3 editorial images with grayscale→color hover
- **Rich color palette** expanded: black-plum, oil-dark, espresso, taupe, berry-black, metallic-taupe, pearl, ivory, copper, copper-oxidized, lavender-silver, berry, champagne + dim variants
- **All Unsplash URLs replaced** with local images from `images/tcf/` (40 images: hero, philosophy, gallery, process, before-after, detail, atmosphere, cta, footer, mobile)
- **Editorial footer** redesigned as "The Atelier" — Playfair Display italic, cleaner hierarchy, © 2026 Norman James
- **Copy voice cleanup** — removed "molecular precision" from hero subtitles and meta descriptions, softened "Total Works" → "Portfolio", "Average Precision" → "Color Accuracy"
- **work.js fully rewritten** — Lenis init, SplitType hero, gsap.quickTo cursor, clip-path/mask scroll reveals (Motion Doctrine)
- **about.js fully rewritten** — matching Lenis/SplitType/clip-path patterns
- **Gallery image sizes** increased to local high-res files

### Files Modified
- `index.html` — Tonal Spectrum Explorer, atmospheric imagery, local images, editorial footer, copy cleanup
- `work.html` — Local images, editorial footer, hero data labels
- `about.html` — Local image, editorial footer, copy cleanup
- `js/main.js` — Lenis init + GSAP ticker sync, SplitType hero, clip-path reveals, spectrum explorer handler
- `js/work.js` — Full rewrite with Lenis + SplitType + clip-path Motion Doctrine
- `js/about.js` — Full rewrite with Lenis + SplitType + clip-path Motion Doctrine
- `css/style.css` — Spectrum section, atmospheric section, expanded palette tokens, editorial footer CSS
- `images/tcf/` — All 40 local images added (gallery, hero, atmosphere, before-after, detail, process, philosophy, cta, footer, mobile)

---

## [1.2] - 2026-06-29

### Premium Editorial Elevation
- Complete CSS rewrite: dramatic Playfair Display typography (clamp(4rem, 11vw, 9rem)), custom cursor with gold dot + hover circle, grain SVG overlay at 3.5% opacity
- GSAP-powered hero entrance: staggered text line reveals, image scale-in, parallax on scroll
- Scroll-triggered section reveals with GSAP ScrollTrigger (titles, cards, gallery cells, process steps)
- Editorial gallery: grayscale-to-color image transitions on hover with overlay reveal
- Custom cursor: mix-blend-mode difference, smooth following, hover/click states, hidden on mobile
- Magnetic CTA button with shimmer effect on hover
- Grain overlay for cinematic film texture across all pages

### Files Modified
- `css/style.css` — Full rewrite with premium editorial design system
- `css/animations.css` — Trimmed to minimal essential keyframes only
- `js/main.js` — Rewritten with custom cursor, GSAP text splitting, cinematic hero, scroll reveals
- `js/work.js` — Rewritten with matching cursor + GSAP animation patterns
- `js/about.js` — Rewritten with matching cursor + GSAP animation patterns
- `index.html` — Added grain overlay + meta theme-color
- `work.html` — Added grain overlay + meta theme-color
- `about.html` — Added grain overlay + meta theme-color

---

## [1.1] - 2026-06-29

### Phase 1: Typography Swap
- Replaced JetBrains Mono + Source Code Pro + Space Grotesk with Playfair Display + Inter
- Updated Google Fonts link in index.html, work.html, about.html
- Updated CSS font variables: --font-heading: Playfair Display, --font-body: Inter, --font-data: Inter

### Phase 2: Prada Palette Tokens
- Overhauled all CSS custom properties to stark black (#0A0A0A) + white (#FFFFFF) + warm gold (#C9A96E)
- Removed all neon accent colors (cyan, magenta, amber, violet, rose, lime)
- Added legacy aliases for gradual migration
- Updated body font-family to Inter, background to #0A0A0A

### Phase 3: Neon Removal
- Replaced all cyan (#00E5FF) references with gold (#C9A96E) across style.css, about.css, work.css
- Removed all neon glow effects, text-shadows, box-shadows
- Removed particle canvas CSS (#preloader-canvas)
- Removed persistent canvas CSS (.persistent-canvas)
- Removed tech overlay CSS (.tech-overlay and all children)
- Updated section background gradients from neon to subtle gold

### Phase 4: Nav Restyle
- Removed mega panel from nav (6 section descriptions with tech specs)
- Removed keyboard shortcut indicators ([1], [2], etc.)
- Changed nav labels from 01.CMD, 02.SCI to I. Vision, II. Philosophy, etc.
- Restyled nav items to elegant minimal sans-serif

### Phase 5: Hero Redesign
- Added editorial hero image (Unsplash portrait, right half of screen)
- Added .section__hero-image CSS with 50% width layout
- Changed hero title font to Playfair Display with gold accent
- Added responsive mobile override (image fades to 30% opacity)

### Phase 6: Content Language
- Replaced all tech/scientific language with editorial fashion copy
- Changed section headers: "Chromatic Computation" → "Color Is Not Applied. It's Revealed."
- Changed process steps from 7 (SCAN, COMPUTE, etc.) to 6 (Consultation, Analysis, etc.)
- Changed evidence data from hex values/delta-E to descriptive captions
- Changed CTA from "INITIATE CONSULTATION" to "Begin Your Journey"
- Changed location from "LOS ANGELES, CA" to "Mumbai, India"
- Updated all 3 HTML files with editorial language

### Phase 7: Particle System Removal
- Deleted entire ParticleSystem class from js/main.js (135 lines)
- Deleted particle initialization and animation code
- Deleted persistent particle system code
- Updated work.js — removed ParticleSystem class (125 lines)
- Removed CONFIG.colors.cmyk and CONFIG.particles from all JS files

### Phase 8: Preloader Simplification
- Removed canvas element from preloader in all 3 HTML files
- Changed preloader label from ".% LOADED" to "% loaded"
- Updated CSS for text-only preloader counter

### Phase 9: Tech Overlay Removal
- Removed tech overlay HTML from index.html, work.html, about.html
- Removed persistent canvas HTML from index.html
- Removed showOverlay(), updateTechOverlay() functions from all JS files
- Removed techOverlay, techSec, techPos, techTime DOM references
- Removed 1-second interval timer for tech overlay updates

### Phase 12: Footer Rewrite
- Changed footer tagline from "Chromatic Computation Laboratory" to "Where Color Becomes Art"
- Changed copyright from "© 2024 TCF LAB" to "© Norman James"
- Changed "ALL SPECTRAL DATA PROPRIETARY" to "made with love ❤️ by Empathy Studio +91 9833274308"
- Removed footer time display (SYS: HH:MM:SS)

### Phase 13: Animation Cleanup
- Deleted 80% of animation keyframes from css/animations.css
- Removed: spectrumShift, spectrumPulse, counterPulse, overlayPulse, valueFlash, cellReveal, dataSlideUp, navStripSlide, megaPanelGlow, barFill, ctaGlow, particleFloat, particleGlow, envValueUpdate, accentPop, chromaticPulse
- Kept: preloaderFade, sectionFadeIn, headerSlide, sliderPulse, modalContentReveal, specLineReveal
- Updated slider pulse color from white to gold

### New Files Created
- `TCF-40-IMAGE-GENERATION-PROMPTS.txt` — 40 ultra-specific image generation prompts
- `CHANGELOG.md` — This file

### Files Modified
- `index.html` — 550→~480 lines (removed particles, tech overlay, mega panel)
- `css/style.css` — 1174→~1070 lines (removed neon, particles, tech overlay)
- `css/animations.css` — 388→~100 lines (deleted 80% of keyframes)
- `css/about.css` — neon references replaced with gold
- `css/work.css` — active filter color changed to gold
- `js/main.js` — 755→~340 lines (deleted ParticleSystem, tech overlay)
- `js/work.js` — 496→~240 lines (deleted ParticleSystem, tech overlay)
- `js/about.js` — 346→~230 lines (deleted tech overlay)
- `work.html` — nav, hero, footer updated
- `about.html` — nav, hero, bio, approach, contact, footer updated

---

## [1.0] - 2026-06-29

### System Check Audit
- Full codebase review against FASHION-SOTD-GRANDMASTER.SKILL.md doctrine
- Identified 14 critical misalignments between current code and design specs
- Confirmed decisions: Unsplash placeholders, elegant strip nav, full Prada palette
- 40-image generation prompt file created with ultra-specific camera/lens/lighting specs

### Files Assessed
- `index.html` — 550 lines
- `css/style.css` — 1174 lines
- `css/animations.css` — 388 lines
- `css/about.css` — 337 lines
- `css/work.css` — 70 lines
- `js/main.js` — 755 lines
- `js/work.js` — 496 lines
- `js/about.js` — 346 lines
- `work.html` — 285 lines
- `about.html` — 271 lines

### Known Issues (now resolved)
- Fonts: JetBrains Mono + Source Code Pro + Space Grotesk (monospace, tech dashboard) → FIXED
- Colors: Neon accents (#00E5FF, #FF00E5, #FFB800, #7B2FFF) → FIXED
- Particle system: reads "tech demo" not "fashion editorial" → FIXED
- Tech overlay: SEC/POS/T+ timer reads as dashboard → FIXED
- Nav: monospace strip with keyboard shortcut indicators → FIXED
- Hero: no editorial image → FIXED
- Content: all language is technical → FIXED
- Footer: tech lab branding → FIXED

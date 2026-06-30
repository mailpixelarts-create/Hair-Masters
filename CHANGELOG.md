# CHANGELOG

## v3.1 — 2026-06-26

### COMPLETION — About + Work Pages for All 7 Rebuilt Worlds

Added about.html and work.html to each of the 7 rebuilt worlds. Each subpage matches its world's unique identity (fonts, nav, preloader, color palette, motion).

**Files added per world:**

| World | about.html | work.html | Supporting JS |
|-------|-----------|-----------|---------------|
| 02 Runway Architect | ✓ (875 lines) | ✓ (gallery) | — |
| 04 Color Futurist | ✓ | ✓ | js/about.js, js/work.js, css/about.css, css/work.css |
| 05 Editorial Minimalist | ✓ | ✓ | js/about.js, js/work.js, css/about.css, css/work.css |
| 06 Texture Poet | ✓ | ✓ | js/about.js, js/work.js, css/about.css, css/work.css |
| 08 Red Carpet Director | ✓ | ✓ | js/about.js, js/work.js |
| 09 Precision Cutter | ✓ | ✓ | js/about.js, js/work.js |
| 10 Hair Ritualist | ✓ | ✓ | js/about.js, js/work.js |

**About pages include:** Hero, bio, 4 approach cards (unique per world), contact form, footer.
**Work pages include:** Filterable gallery (unique categories per world), hero, footer.

**Total files added:** 14 HTML files + 18 supporting CSS/JS files = 32 new files.

---

## v3.0 — 2026-06-26

### FULL REBUILD — 7 Worlds From Scratch (No Templates)

Each world rebuilt with completely unique architecture. No two worlds share: preloader, nav, fonts, section order, gallery system, scroll behavior, or motion language.

**World 02 — The Runway Architect (Industrial Backstage):**
- Preloader: Diagonal wipe with clip-path polygon + SVG grain + scan lines
- Nav: Side-stacked vertical (writing-mode: vertical-rl) with section numbers + scramble effect
- Fonts: Bebas Neue + Space Grotesk + Space Mono
- Structure: 5 horizontal pinned sections (GSAP ScrollTrigger pin + horizontal scrub)
- Gallery: Typography-only portfolio index (no thumbnails)
- Signature: Section-aware scramble indicator

**World 04 — The Color Futurist (Digital Laboratory):**
- Preloader: Canvas particle system with CMYK spectrum shift (blue→magenta→amber)
- Nav: Monospace top bar with keyboard shortcuts [1]-[6], glassmorphism mega-panel
- Fonts: Space Grotesk + Source Code Pro (monospace body!) + JetBrains Mono
- Structure: Scroll-snap sections with floating tech overlay (SEC/POS/T+)
- Gallery: Data grid with GSAP Flip hover expand to 2×2
- Signature: Interactive particle field responding to cursor site-wide

**World 05 — The Editorial Minimalist (Quiet Luxury):**
- Preloader: Text-only typewriter "R E S T R A I N T" (CSS animation-delay, becomes ghost)
- Nav: Disappearing — hidden when scrolled past 80px, reappears at top
- Fonts: Instrument Serif + Instrument Sans (matched pair)
- Structure: 5 sections at 100vh, scroll-snap proximity, 1px progress line
- Gallery: Stacked cards with -1deg rotation, hover peel reveal (rotateX + perspective)
- Signature: "Glass Hair" cursor-following radial gradient gloss
- Note: NO Lenis — native scroll, light theme

**World 06 — The Texture Poet (Organic Warmth):**
- Preloader: Luminous garment reveal with CSS @property gradient animation + texture crossfade
- Nav: Full-screen editorial menu with visual card grid (not a list)
- Fonts: Cormorant Garamond + Lora (all-serif) + DM Sans
- Structure: 5 horizontal pinned panels with opposing parallax
- Gallery: Fullscreen lookbook slideshow (drag/swipe, parallax per slide)
- Signature: Curl ripple — concentric ring animation on hover/touch

**World 08 — The Red Carpet Director (Cinematic Glamour):**
- Preloader: B&W video intro with "Enter the Experience" gate, color crossfade
- Nav: Bottom-floating cinematic bar with gold underline, fade on scroll
- Fonts: Playfair Display + Lato + Josefin Sans (Art Deco)
- Structure: 7 film chapters with cut/dissolve/fade transitions
- Gallery: Filmstrip ribbon with film-gate corners + grain overlay
- Signature: Spotlight — mouse-following radial vignette overlay

**World 09 — The Precision Cutter (Bauhaus Geometry):**
- Preloader: Mechanical geometric morph (3 divs rotating/positioning via GSAP)
- Nav: Bottom-left scramble indicator with architectural grid dropdown
- Fonts: Bodoni Moda + Inter + Space Mono
- Structure: 6 pinned sections with zoom transitions (scale + blur)
- Gallery: Horizontal cinematic scroll (drag-enabled, numbered progress)
- Signature: SVG perimeter line tracing cut silhouette on scroll
- Note: Light Bauhaus theme

**World 10 — The Hair Ritualist (Restorative Ceremony):**
- Preloader: Pulse rings + aurora gradient (sage→lavender→sand via @property) + particle sparks
- Nav: Circular radial nav (bottom-right toggle → 5-item radial wheel)
- Fonts: Fraunces (wonky optical) + Source Serif 4 + Manrope
- Structure: Infinite scroll loop with sessionStorage position persistence
- Gallery: Masonry with 100px breathing gaps, staggered load speeds, gold glow
- Signature: Ripple ritual — auto-animating concentric rings (6s interval)
- Note: Light warm theme, meditative pacing

## v2.6 — 2026-06-26

### Worlds 05–10 — Remaining 5 Worlds Complete

**World 05 — The Editorial Minimalist:**
- Light chalk palette (#F5F2ED), nav mix-blend-mode multiply, cursor exclusion
- 7-act structure, 6 disciplines (Precision Bob, Minimal Blowout, Line Control, Gloss Surface, Quiet Luxury, Flyaway Perfection)
- Filter: All/Precision Bob/Blowout/Short/Campaign

**World 06 — The Texture Poet:**
- Dark warm palette (Espresso #3A2A1E, Cream #F0E8D8, Clay #C4A882)
- 7-act structure, 6 disciplines (Curl Pattern, Coil Density, Diffuser Sculpting, Hydration Ritual, Natural Texture, Movement)
- Filter: All/Curl/Coil/Wave/Natural

**World 08 — The Red Carpet Director:**
- Dark luxe palette (Black #0E0E0E, Champagne #F0E8D8, Bronze #8B7355)
- 7-act structure, 6 disciplines (Event-Command, Silhouette Design, Premiere Construction, Celebrity Direction, Formal Updo, Press-Ready Finish)
- Filter: All/Glam/Updo/Wave/Campaign

**World 09 — The Precision Cutter:**
- Light Bauhaus palette (#F8F6F2, #1E1E1E, #6A6A6A), before/after sliders
- 7-act structure + Before/After section, 6 disciplines (Perimeter, Fringe, Nape, Weight, Symmetry, Dry-Refinement)
- Filter: All/Bob/Pixie/Fringe/Editorial

**World 10 — The Hair Ritualist:**
- Light warm-restorative palette (Cream #F5EDE0, Soft Brown #5A4A3A, Warm Wood #8B7355), before/after sliders
- 7-act structure + Before/After section, 6 disciplines (Scalp Diagnosis, Oil Ritual, Treatment Mask, Steam Basin, Moisture Architecture, Post-Ritual Finish)
- Filter: All/Scalp/Oil/Treatment/Restoration

**All worlds include:** 12 files each (3 HTML pages, 2 CSS files, 7 JS files), Barba.js multi-page transitions, GSAP ScrollTrigger animations, Lenis smooth scroll, SplitType word masking, custom cursor, hamburger mobile nav, responsive 768px, reduced motion support.

## v2.2 — 2026-06-26

### World 04 — The Color Futurist — Full Multi-Page Build

**Files Created:**
- `THE COLOR FUTURIST/index.html` — Home page with 8-act structure (Hero, Philosophy, Disciplines, Gallery, Process, Before/After, Atmosphere, CTA), Barba.js wrapper, built-in before/after slider
- `THE COLOR FUTURIST/about.html` — About page with Bio, Chromatic Protocol (4 principles), and Contact form
- `THE COLOR FUTURIST/work.html` — Work page with filter system (All/Platinum/Copper/Brunette/Vivid), 10-item gallery
- `THE COLOR FUTURIST/css/style.css` — Cool-chromatic palette: Void #0C0C0E, Graphite #18181B, Silver #2A2A30, Platinum #C8C8D0, Champagne #E8E0D0, Accent #A89070
- `THE COLOR FUTURIST/css/animations.css` — Animation classes matching design system
- `THE COLOR FUTURIST/js/` — Copied from Runway Architect (preloader, lenis, split-text, cursor, animations, barba, gallery)

**Signature Interaction:** Before/After color transformation slider (drag-to-reveal clip-path)

## v2.1 — 2026-06-26

### World 02 — The Runway Architect — Full Multi-Page Build

**Files Created:**
- `THE RUNWAY ARCHITECT/THE RUNWAY ARCHITECT.md` — Build Bible with structural construction thesis, cool-neutral industrial-editorial palette, 9-section site map, and development priorities
- `THE RUNWAY ARCHITECT/index.html` — Home page with 7-act structure (Hero, Philosophy, Disciplines, Gallery, Process, Atmosphere, CTA), Barba.js wrapper, cinematic fragment scatter preloader
- `THE RUNWAY ARCHITECT/about.html` — About page with Bio, Approach (4 construction principles), and Contact form (5 fields + textarea)
- `THE RUNWAY ARCHITECT/work.html` — Work page with filter system (All/Editorial/Runway/Campaign/Detail), 12-item gallery with hover overlays
- `THE RUNWAY ARCHITECT/css/style.css` — Complete design system: cool-neutral palette (Charcoal #0A0A0A → Bone #E8E4DF), Cormorant Garamond + DM Sans typography, 4 typography roles, responsive at 768px, reduced motion support
- `THE RUNWAY ARCHITECT/css/animations.css` — Animation classes: reveal, word-mask, clip-reveal, scale-reveal, stagger delays, parallax containers
- `THE RUNWAY ARCHITECT/js/preloader.js` — Counter 0→100 with bar fill, slide-up exit
- `THE RUNWAY ARCHITECT/js/lenis-init.js` — Smooth scroll (lerp 0.08, duration 1.4s), GSAP ticker sync, ScrollTrigger proxy, mobile disable
- `THE RUNWAY ARCHITECT/js/split-text.js` — SplitType word-level masking with word-mask wrappers
- `THE RUNWAY ARCHITECT/js/cursor.js` — Dot + follower with RAF loop, mix-blend-mode difference, hover states on interactives
- `THE RUNWAY ARCHITECT/js/animations.js` — GSAP matchMedia (desktop/mobile), hero entrance timeline, parallax, section reveals, split text reveals
- `THE RUNWAY ARCHITECT/js/barba-init.js` — Page transitions with wipe effect, Lenis destroy/reinit, animation reinit
- `THE RUNWAY ARCHITECT/js/gallery.js` — Mouse-tracking tilt on gallery items, parallax on atmosphere items, card tilt on discipline/approach cards

**Design System:**
- Palette: Void #0A0A0A, Graphite #141414, Steel #1E1E1E, Charcoal #2C2C2C, Stone #8A8A8A, Bone #E8E4DF
- Accent: Steel Grey #6A6A6A (sparingly)
- Hero System: The Runway Opening (sequential reveals)
- Signature Interaction: Gallery tilt/parallax (mouse-tracking 3D rotation)
- Gallery System: Modular grid with wide/tall variants
- Navigation: mix-blend-mode difference, hamburger on mobile

**Motion Doctrine Compliance:**
- ✅ Motion = Narrative (reveal, guide, connect, transform)
- ✅ Transform + opacity only (60fps)
- ✅ prefers-reduced-motion respected
- ✅ Mobile: independent animation system via matchMedia
- ✅ Lenis disabled on mobile (≤768px)
- ✅ Barba.js page transitions with wipe effect
- ✅ SplitType word-level masking on section titles
- ✅ Custom cursor with mix-blend-mode difference
- ✅ Cinematic fragment scatter preloader
- ✅ Footer worldbuilding (tagline, navigation, credits)

## v2.0.1 — 2026-06-25

### Fixes — Preloader, Menu Font, Broken Selectors, Dist Build

**Files Modified:**
- `css/style.css` — Added `--font-nav: 'Open Sans'` CSS variable. Nav logo, links, CTA now use Open Sans instead of DM Sans/Cormorant Garamond. Preloader wipe starts with `visibility: hidden` to prevent blocking.
- `css/animations.css` — Updated `.hero__scroll-line` → `.threshold__scroll-line` to match v2.0 BEM classes.
- `js/preloader.js` — Added `visibility: visible` set before wipe animation, `visibility: hidden` on complete. Prevents wipe overlay from blocking site after preloader finishes.
- `js/gallery.js` — Complete rewrite. Updated selectors from `.portfolio__item` to `.archive__frame`, `.silhouette__study`, `.construction__card`, `.atmosphere__item`, `.manifesto__crop`. Added tilt/parallax hover effects for new components.
- `js/barba-init.js` — Updated `.hero__title` → `.threshold__title`. Added safety checks for `destroyLenis()` and `initLenis()` function existence.
- `index.html` — Added Open Sans to Google Fonts link. Added 5-second safety fallback to force-hide preloader/wipe if GSAP fails. Updated wipe inline style with `visibility: hidden`.

**Dist Build:**
- `dist/` — Fresh v2.0 production build with all files (HTML, CSS, JS, 24 PNG images).

## v2.0 — 2026-06-25

### Experience Direction Bible Rebuild — 8-Act Film Structure

**Files Modified:**
- `index.html` — Complete rewrite. 10 sections → 8-act film structure (Threshold, Manifesto, Silhouette Chamber, Mutation Archive, Construction Lab, Identity Split, Atmosphere, Invocation). New BEM classes (`act--threshold`, `manifesto__grid`, `silhouette__study`, `archive__frame`, `construction__card`, `split__module`, `atmosphere__strip`, `invocation__content`). New preloader with cinematic fragment scatter (5 planes, drift + count + scatter). Updated init script with new selectors.
- `css/style.css` — Complete rewrite. 4 typography roles (World Title, Manifesto, Technical Caption, CTA). New component system: Threshold canvas with veil + detail crop, Manifesto grid with staggered crops, Silhouette Chamber vertical procession, Mutation Archive editorial sequence (full-bleed, diptych, vertical, wide, quote), Construction Lab dossier grid, Identity Split dual-state modules, Atmosphere horizontal strip, Invocation closing panel. Reduced accent to "extremely rare" (footer divider + construction phase label only).
- `js/animations.js` — Complete rewrite. Motion language: reveal, conceal, split, rupture, drift, emergence. Hero: veil lift + scale reveal + detail crop emergence. Manifesto: staggered phrase reveals + crop emergence. Silhouette: vertical procession with parallax. Archive: editorial frame reveals + quote interruption. Construction: dossier card stagger with slide-in. Identity Split: clip-path reveal from sides. Atmosphere: item emergence. Final Vanish: CTA image dissolves on scroll.

**New BEM Structure (8 Acts):**
| Act | Section | BEM Root |
|-----|---------|----------|
| 01 | Threshold / Hero | `.act--threshold` |
| 02 | Manifesto | `.act--manifesto` |
| 03 | Silhouette Chamber | `.act--silhouette` |
| 04 | Mutation Archive | `.act--archive` |
| 05 | Construction Lab | `.act--construction` |
| 06 | Identity Split | `.act--split` |
| 07 | Atmosphere | `.act--atmosphere` |
| 08 | CTA / Invocation | `.act--invocation` |

**Wow Moments Implemented:**
1. ✅ Silhouette Reveal Hero (veil lift + scale + detail crop)
2. ✅ Gallery Quote (manifesto interruption in archive)
3. ✅ Construction Dossier (forensic evidence cards)
4. ✅ Identity Rupture (clip-path dual-state reveal)
5. ✅ Final Vanish (CTA image dissolves on scroll)

**Signature Components Added:**
1. Transformation Frame (`.archive__frame`)
2. Silhouette Study Block (`.silhouette__study`)
3. Construction Dossier Card (`.construction__card`)
4. Identity Split Module (`.split__module`)
5. Atmosphere Strip (`.atmosphere__strip`)
6. Closing Invocation Panel (`.invocation__content`)

**Preloader Update:**
- Changed from count + wipe to cinematic fragment scatter
- 5 dark planes drift during count 0→100
- Fragments scatter outward on completion (random order)
- Wipe reveal exposes hero underneath

**Typography Roles:**
- World Title: `.t-world-title` — Large, severe, elegant
- Manifesto: `.t-manifesto` — Oversized, fragmented, editorial
- Technical Caption: `.t-technical` — Small, sharp, controlled
- CTA: `.t-cta` — Minimal and confident

**Color Discipline:**
- Accent (`--accent: #8b3a62`) now "extremely rare"
- Used only: footer divider, construction phase labels
- No accent in CTAs, hovers, or decorative elements

## v1.4 — 2026-06-25

### Base64 Build — Self-Contained Distribution

**Files Created:**
- `dist/index.html` — Self-contained HTML with all 24 images embedded as base64 data URIs (65.6 MB)
- `dist/css/style.css` — Copied from source
- `dist/css/animations.css` — Copied from source
- `dist/js/lenis-init.js` — Copied from source
- `dist/js/preloader.js` — Copied from source
- `dist/js/split-text.js` — Copied from source
- `dist/js/cursor.js` — Copied from source
- `dist/js/animations.js` — Copied from source
- `dist/js/gallery.js` — Copied from source

**Distribution:**
- Total dist folder size: 131.25 MB
- Images embedded as base64 data URIs (no external dependencies)
- Ready for single-file deployment

**Note:** Large file size due to base64 encoding (33% overhead). Consider using WebP compression for production to reduce size.

## v1.3.1 — 2026-06-25

### Before/After Slider Fix

**Files Modified:**
- `js/animations.js` — Rewrote `initBeforeAfter` to use direct DOM manipulation instead of GSAP tweens for drag. Added `is-dragging` class toggle. Added `touch-action: none` support. Fixed initial position to 50%.
- `css/style.css` — Removed `transform: translateX(-50%)` from handle (fought with drag). Added `touch-action: none` to slider. Added `.is-dragging` state styles (cursor: grabbing, handle scale up, glow intensify). Added transition on handle::after for smooth state changes.

**Root Cause:** GSAP tweens on `clipPath` and `left` during drag conflicted with the scroll-triggered clip-path reveal animation. Direct DOM manipulation resolves the conflict.

## v1.3 — 2026-06-25

### Motion & Atmosphere Overhaul — Cinematic Rebrand

**Files Modified:**
- `js/animations.js` — Complete rewrite. Hero: clip-path wipe reveal + scale 1.3→1 + content fade-out on scroll. Philosophy: split timeline with clip-path portrait reveal + parallax depth layers. Disciplines: staggered with scale + rotateX depth. Portfolio: individual clip-path reveals per item + parallax on scroll. Process: enhanced horizontal scroll with phase-by-phase reveals (number bounce, title slide, image clip). Intelligence: text clip-path reveals. Before/after: dramatic scale + clip reveal. Atmosphere: parallax filmstrip with x-percent scroll. Booking: staged timeline with CTA bounce. Closing: slow center-out clip-path reveal. Section labels: scale entrance. All parallax values increased for depth.
- `css/style.css` — Added cinematic vignette overlay on body (radial gradient). Added hero side vignette. Enhanced discipline cards: hover lift + accent color on number + title brighten. Enhanced portfolio items: desaturated default → full color on hover. Enhanced booking CTA: accent border glow on hover + active scale. Enhanced closing: atmospheric radial glow behind statement + italic style. Increased hero overlay gradient complexity.

**Motion Improvements:**
- Hero: 1.6s clip-path wipe from bottom, parallax 30%, content fades on scroll
- Philosophy: timeline-based reveal, portrait clip-path from bottom
- Disciplines: rotateX depth perspective on cards
- Portfolio: individual clip-path per item (bottom wipe, right wipe varied)
- Process: phase-by-phase reveals with bounce number + slide title + clip image
- Closing: 1.6s center-out clip-path reveal, atmospheric glow
- All parallax: increased yPercent for deeper scroll feel

## v1.2 — 2026-06-25

### Image Integration — Local Assets Connected

**Files Modified:**
- `index.html` — Replaced all 24 picsum.photos placeholder URLs with local asset paths from `assets/images/`

**Image Mapping:**
| Section | Images Used |
|---------|-------------|
| Hero | `hero_01.png` |
| Philosophy Portrait | `detail_01.png` |
| Portfolio (8 items) | `gallery_01.png` through `gallery_08.png` |
| Process (7 phases) | `process_01.png` through `process_05.png`, `detail_05.png`, `detail_06.png` |
| Before/After (2 pairs) | `detail_02.png` / `detail_03.png`, `detail_04.png` / `hero_02.png` |
| Atmosphere (3 items) | `atmosphere_01.png`, `atmosphere_02.png`, `atmosphere_03.png` |

**Remaining Placeholders:** None. All images now use local assets.

## v1.1 — 2026-06-25

### FASHION-SOTD-GRANDMASTER.SKILL.md Audit — Alignment Fixes

**Files Modified:**
- `css/style.css` — Added film grain texture overlay to body, transformed portfolio from masonry grid to editorial spread layout (12-column asymmetric), transformed disciplines from uniform 3-col grid to editorial rhythm layout, enhanced footer with worldbuilding atmosphere (accent line, divider, italic tagline, studio credit), added signature interaction pulse animation to before/after slider handle, added accent underline to before/after title
- `index.html` — Updated portfolio to use editorial spread classes (`portfolio__item--hero`, `--feature`, `--accent`, `--standard-a` through `--standard-d`, `--wide`), updated footer structure with divider element and separated copyright line
- `js/animations.js` — Updated portfolio animation trigger selector from `.portfolio__masonry` to `.portfolio__spread`

**Audit Findings (aligned to SKILL doctrine):**
- ✅ Motion Doctrine (XXI): Animations communicate meaning, not decoration
- ✅ Typography Doctrine (XXV): Two font families max, clear hierarchy
- ✅ Gallery Systems (XIX): Portfolio now uses editorial spread, not generic masonry
- ✅ Footer Worldbuilding (XXVII): Footer now has atmospheric structure with accent line and italic tagline
- ✅ Signature Interaction (XXIV): Before/after slider enhanced with pulse animation and accent glow
- ✅ Anti-Generic Guard (XIV): Removed generic grid patterns, added editorial rhythm
- ✅ Grain texture: Added luxury fashion film grain overlay
- ✅ Reduced Motion: `prefers-reduced-motion` respected
- ✅ Mobile: Lenis disabled, cursor hidden, responsive at 768px
- ✅ Performance: Only transform/opacity animated

## v1.0 — 2026-06-25

### Initial Build — Full Modular Structure

**Files Created:**
- `css/style.css` — Design tokens, reset, typography, layout, all 10 section styles, responsive breakpoints, dark transformation palette
- `css/animations.css` — Reveal states, word masks, clip reveals, keyframes, parallax containers, scroll-triggered states
- `js/lenis-init.js` — Smooth scroll (lerp 0.08, duration 1.6s), ScrollTrigger sync, mobile disable
- `js/preloader.js` — Count 0→100, wipe exit, init sequence
- `js/split-text.js` — SplitType word masking with overflow:hidden wrappers
- `js/cursor.js` — Dot + follower with lag, hover states, blend-mode, hidden on touch devices
- `js/animations.js` — All GSAP ScrollTrigger animations: hero parallax, section reveals, process horizontal scroll, before/after sliders
- `js/gallery.js` — Portfolio hover tilt, atmosphere parallax on hover
- `index.html` — 10 sections with real copy, CDN links, right-click protection, ARIA labels
- `README.md` — Project documentation, design system, setup instructions

**Summary:** Complete modular build of The Avant-Garde Transformer (Hair Styling World 07). Dark transformation palette, flowing 1.6s Lenis scroll, full GSAP ScrollTrigger animation system, editorial typography (Cormorant Garamond + DM Sans), 10-scene narrative structure, before/after interactive sliders, horizontal process scroll, custom cursor, responsive at 768px.

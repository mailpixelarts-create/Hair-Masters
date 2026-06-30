# CHANGELOG

## v2.3 — June 30, 2026
**Clean single-entry architecture confirmed**

### Current Architecture:
- `js/main.js` — single self-contained IIFE, no external module globals
- 4 CDN libs only: GSAP core, ScrollTrigger, Lenis, (Barba/SplitType removed)
- CSS split: `style.css` (tokens/layout), `animations.css` (cursor/keyframes only)
- All GSAP entrance/scroll animations driven from JS, zero CSS opacity:0 conflicts

### Verified Files:
- `index.html` — 5-section horizontal scroll with GSAP pin+scrub
- `about.html` — vertical scroll with reveal animations
- `work.html` — vertical scroll, gallery grid, filter system
- `css/style.css` — section width `calc(100vw - var(--nav-width))`, nav-width: 72px
- `css/animations.css` — clean: cursor, nav transitions, keyframes, no opacity conflicts
- `js/main.js` — boot: register GSAP → preloader → Lenis (vertical only) → hero → h-scroll → reveals → cursor → filter

### Remaining:
- Test all 3 pages in browser
- Verify CDN libs load (GSAP 3.12.5, Lenis 1.1.18)
- Images exist in `images/runway-architect/` (5 hero, 15 gallery, 10 detail, 5 process, 5 atmosphere)

## v2.2 — June 30, 2026
**Fix: Site invisible — CSS/GSAP animation conflict**

### Root Cause:
- `animations.css` set `opacity: 0` and `translateY(40px)` on `.section__content > *`, `.reveal`, and `.stagger-reveal > *` via CSS
- GSAP `from()` animates FROM those CSS values TO the computed CSS value — which was ALSO opacity: 0
- Result: everything permanently invisible. No class toggle ever triggered visibility.

### Fix:
- Rewrote `animations.css` — removed ALL CSS opacity/transform animation rules
- CSS now handles only: static states, cursor, nav transitions, keyframe animations
- GSAP handles ALL entrance and scroll animations exclusively
- Fixed horizontal scroll: uses `container.clientWidth` instead of `window.innerWidth`

### Files Changed:
- `css/animations.css` — complete rewrite (removed 200+ lines of conflicting CSS)
- `js/main.js` — fixed horizontal scroll end calculation

## v2.1 — June 30, 2026
**Fix: Site stuck / not loading**

### Root Causes Fixed:
- **Horizontal scroll had no GSAP pin animation** — sections were laid out 500vw but nothing converted vertical scroll to horizontal movement. Added `gsap.to(wrapper, { x, scrollTrigger: { pin, scrub } })`.
- **Lenis conflicted with horizontal scroll** — Lenis smooth scroll fights GSAP's ScrollTrigger pin. Disabled Lenis on horizontal-scroll pages (index.html).
- **Section width mismatch** — Sections were `100vw` but container had `margin-left: 72px`, breaking GSAP scroll calculation. Fixed to `calc(100vw - var(--nav-width))`.
- **Redundant module scripts** — 6 old module JS files were still loaded, defining globals that conflicted with the self-contained main.js. Removed all redundant script tags from all 3 HTML files.
- **Simplified main.js** — Single self-contained file, no global module dependencies. Clear boot sequence: register GSAP → preloader → Lenis (vertical only) → hero → horizontal scroll → reveals → cursor → filter.

### Files Changed:
- `js/main.js` — Complete rewrite, single entry point
- `index.html` — Cleaned script tags
- `about.html` — Cleaned script tags  
- `work.html` — Cleaned script tags
- `css/style.css` — Fixed `.horizontal-scroll` and `.section` width calculations

## v2.0 — June 30, 2026
**COMPLETE SOTD-LEVEL REBUILD — Premium Fashion Experience**

### New Tech Stack:
- Lenis smooth scroll with lerp: 0.08, duration: 1.4
- Barba.js AJAX page transitions with clip-path cinematic wipe
- SplitType word-by-word text animations
- Custom cursor with GSAP quickTo lag effect
- GSAP ScrollTrigger for all scroll animations

### New Files Created:
- `js/lenis-init.js` — Smooth scroll setup with ScrollTrigger sync
- `js/barba-init.js` — Page transitions with GSAP clip-path wipe
- `js/animations.js` — All GSAP ScrollTrigger animations
- `js/cursor.js` — Custom cursor with hover states
- `js/preloader.js` — Preloader with GSAP exit animation
- `js/split-text.js` — SplitType word splitting and reveal
- `js/main.js` — Main initialization with correct order

### Files Rewritten:
- `index.html` — Barba wrapper structure, reveal classes, data-split attributes
- `about.html` — Barba structure, cinematic hero, reveal animations
- `work.html` — Barba structure, gallery with stagger-reveal
- `css/style.css` — SOTD luxury design tokens, refined typography
- `css/animations.css` — Cinematic motion system, page transitions

### Design Upgrades:
- Deeper blacks (#050505) for cinematic contrast
- Refined typography hierarchy with tighter letter-spacing
- Backdrop blur on mobile nav and footer
- Smoother transitions with power4 easing
- Custom cursor with mix-blend-mode difference
- Page transition overlay for seamless navigation

## v1.3 — June 30, 2026
- Integrated 40 local images from `images/runway-architect/` folder.
- Updated `index.html`: Replaced all Unsplash URLs with local hero images (hero-01 through hero-05).
- Gallery links in index.html now point to `work.html` instead of `#`.
- Image organization: 5 hero, 15 gallery, 10 detail, 5 process, 5 atmosphere images.

## v1.2 — June 30, 2026
- Fixed image visibility: reduced overlay opacity from 0.9 to 0.5, increased brightness from 0.4 to 0.7.
- Fixed preloader z-index and visibility issues.
- Updated `css/style.css`: Adjusted section overlay gradient and image brightness/contrast.
- Updated `css/animations.css`: Reduced active section overlay opacity.
- Updated `about.html`: Fixed hero overlay and image filter for better visibility.
- Updated `work.html`: Fixed hero overlay, gallery item filters, and hover states.

## v1.1 — June 30, 2026
- Complete rewrite of `Production_Image_Prompts.md` with 40 black and white high fashion hair prompts.
- 5 Hero prompts for homepage and manifesto sections.
- 15 Gallery prompts for portfolio and work showcase.
- 10 Detail prompts for texture and surface studies.
- 5 Process prompts for backstage and construction documentation.
- 5 Atmosphere prompts for mood and environmental inserts.
- All prompts mandate pure monochrome, noir aesthetic, and high fashion editorial quality.
- Updated global visual direction, lighting, camera, and grading rules for B&W only.

## v1.0 — June 30, 2026
- Initial project setup with noir black and white aesthetic implementation.
- Modified `css/style.css`: Removed red accent color, replaced all red references with bone/white for pure monochrome palette.
- Modified `css/animations.css`: Updated scramble text and hover effects to use monochrome colors.
- Modified `about.html`: Updated inline styles to remove red accent from form focus states and interactive elements.
- Modified `work.html`: Updated gallery hover effects and filter bar to use monochrome palette.
- Modified `js/main.js`: Updated cursor effects to use pure monochrome colors.

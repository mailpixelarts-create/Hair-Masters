# CHANGELOG — THE EDITORIAL MINIMALIST

## v1.0 — System Check & Motion Doctrine Audit (Superseded)
**Date:** 2026-06-29

### Files Reviewed
- `THE EDITORIAL MINIMALIST.MD` — Build Bible (Motion Doctrine §18-20, Aesthetic World §3-7, UI System §24)
- `MD/FASHION-SOTD-GRANDMASTER.SKILL.md` — Master Creative Protocol (Volumes I-IV)
- `MD/GREAT-GRANDMASTER.MD` — Senior Creative Technologist & Forensic Engineer Protocol
- `MD/SMOOTH-SCROLL.md` — Lenis/Barba.js implementation spec
- `Production_Image_Prompts.md` — Image pipeline
- `index.html` — Main page
- `about.html` — About page
- `work.html` — Work/portfolio page
- `css/style.css` — Core design system
- `css/animations.css` — Keyframe animations
- `css/about.css` — About page styles
- `css/work.css` — Work page styles
- `js/main.js` — Core interactions
- `js/about.js` — About page logic
- `js/work.js` — Work page filter + logic

### Audit Findings

#### ✅ ALIGNED WITH GUIDELINES
- **Color System**: Warm neutral palette (chalk `#F5F2ED`, stone `#D8D0C8`, taupe `#A89888`, charcoal `#3A3630`) aligns with §16 bone/stone/taupe/charcoal direction
- **Typography Pairing**: Instrument Serif + Instrument Sans matches §17 refined editorial serif + clean body sans requirement
- **Layout Restraint**: Sections use generous whitespace, clean grid, minimal UI — aligns with §24 restrained/spacious/editorial behavior
- **Gallery Cards**: Subtle rotation + shadow = editorial card peel aesthetic per §20 signature interaction intent
- **Custom Cursor**: Dot + follower with hover scale — matches Grandmaster §cursor.js spec
- **Section Numbering**: `01`–`05` micro-labels align with §24 quiet section labels requirement
- **Nav Behavior**: Disappearing nav on scroll = §24 minimal navigation philosophy
- **Progress Line**: Thin 1px left-edge indicator = editorial restraint, not decorative
- **Content Voice**: Calm, exacting, understated — matches §23 copy voice
- **Hero Concept**: "Restraint as design" = editorial headline, not generic salon language
- **Filter System**: Work page category filter with quiet button states

#### ⚠️ DEVIATIONS / MISSING IMPLEMENTATIONS

| # | Issue | Guideline Ref | Status |
|---|-------|---------------|--------|
| 1 | **No Lenis smooth scroll** | SMOOTH-SCROLL.md, §27 | Required — currently using native scroll with scroll-snap |
| 2 | **No Barba.js page transitions** | SMOOTH-SCROLL.md, §23 | Required — pages do hard reload between index/about/work |
| 3 | **No SplitType word reveals** | SMOOTH-SCROLL.md §50-53, animations.css | Hero titles use opacity fade, not word-by-word reveal with overflow mask |
| 4 | **Preloader lacks GSAP counter** | SMOOTH-SCROLL.md §67-71 | Uses CSS typewriter instead of 0→100 counter with yPercent exit |
| 5 | **Missing `prefers-reduced-motion`** | §29 Accessibility, GREAT-GRANDMASTER | No reduced-motion media query or JS fallback |
| 6 | **Hero uses grid, not full-bleed** | §13 Hero System | "The Still Portrait Frame + Negative Space Composition" — current hero is 50/50 split grid |
| 7 | **No parallax on hero image** | SMOOTH-SCROLL.md §37 | Hero image lacks `yPercent: 30` parallax drift |
| 8 | **Gallery cards animate via CSS class toggle** | §18-19 Motion System | Should use GSAP ScrollTrigger directly for reveals, not `.visible` class |
| 9 | **Process section missing step-by-step reveal** | §19 Motion System (Precision method scene) | Uses CSS transition with `.visible` class instead of GSAP timeline |
| 10 | **Contact section end-mark uses CSS infinite pulse** | §18 Motion Doctrine | "Dramatic luxury reveals" are forbidden; pulsing animation contradicts calm |
| 11 | **Missing data-barba attributes** | SMOOTH-SCROLL.md §27-28 | No wrapper/container markup for page transitions |
| 12 | **No `data-speed` parallax attributes** | SMOOTH-SCROLL.md §39 | Dynamic data-speed system not implemented |
| 13 | **scroll-snap on scroll-container** | N/A | scroll-snap-type may conflict with Lenis; needs removal when Lenis is added |
| 14 | **No `will-change: transform`** | SMOOTH-SCROLL.md §78, performance rules | Parallax elements missing will-change declaration |
| 15 | **Images missing `loading="lazy"`** | §28 Performance rules | Only hero image should eager-load; gallery images need lazy |

---

### v1.0 Summary
Initial system check completed. The project establishes a strong editorial minimal foundation aligned with §3-7 Aesthetic World and §24 UI System. Key gaps identified: Lenis smooth scroll, Barba.js transitions, SplitType word reveals, reduced-motion support, and full-bleed hero composition. Motion relied on CSS class toggles rather than GSAP ScrollTrigger-driven choreography. All gaps addressed in v1.1.

---

## v1.1 — Motion Engine Rebuild (Superseded)
**Date:** 2026-06-29

### Changes Summary
Complete rebuild of the motion system across all 3 pages. Replaced CSS class-based animations with GSAP ScrollTrigger-driven choreography. Added Lenis smooth scroll, Barba.js page transitions, SplitType word reveals, and full-viewport hero composition.

### Files Modified

| File | Change |
|------|--------|
| `index.html` | Restructured hero to full-viewport cinematic with parallax BG, scroll cue, CTA, and label. Added Lenis/Barba/SplitType CDNs. Added `data-barba` wrapper. Added page transition overlay. Added `data-split` and `data-reveal` attributes. |
| `css/style.css` | Replaced 50/50 grid hero with full-viewport composition (hero__bg overlay + gradient). Added scroll cue, page transition overlay, scroll-line, CTA button. Removed scroll-snap. Added `--line-width` CSS var for process line draw. Removed old preloader styles. |
| `css/animations.css` | Removed all CSS `@keyframes` and `.visible` class animations — all motion now GSAP-driven. Added `prefers-reduced-motion` media query. |
| `js/main.js` | Complete rewrite: Lenis init + GSAP ticker sync + ScrollTrigger proxy. GSAP counter preloader (0→100, yPercent exit). SplitType word splitting with overflow mask wrappers. Hero entrance timeline (image scale, word reveals, label, subtitle, CTA, scroll cue). Hero parallax (`yPercent: 30`). Hero content parallax (`yPercent: -15` + opacity fade). Gallery card staggered reveals via ScrollTrigger. Philosophy quote word-by-word reveal. Process step reveal with line draw (`--line-width` scrub). Progress line via ScrollTrigger onUpdate. Nav hide-on-scroll via ScrollTrigger. Barba.js page transitions (scaleY wipe). Custom cursor with `gsap.to` scale on hover. `prefers-reduced-motion` graceful degradation. |
| `about.html` | Added Lenis/Barba/SplitType CDNs. Added `data-barba` wrapper. Added page transition overlay. Added `data-split` and `data-reveal` attributes. Changed preloader to GSAP counter. |
| `js/about.js` | Complete rewrite matching main.js motion engine. Lenis init, GSAP counter preloader, SplitType word reveals, ScrollTrigger-driven animations for hero, bio, approach cards, contact. Barba.js transitions. |
| `work.html` | Added Lenis/Barba/SplitType CDNs. Added `data-barba` wrapper. Added page transition overlay. Added `data-split` and `data-reveal` attributes. Changed preloader to GSAP counter. |
| `js/work.js` | Complete rewrite matching main.js motion engine. Lenis init, GSAP counter preloader, SplitType word reveals, ScrollTrigger-driven gallery card reveals. Filter system preserved with GSAP animations. Barba.js transitions. |
| `css/work.css` | Removed old card-entrance keyframes. Kept gallery card hover effects (rotation, shadow, grayscale). |

### What Was Fixed (from v1.0 Audit)

| # | Issue | Status |
|---|-------|--------|
| 1 | No Lenis smooth scroll | **FIXED** — Lenis 1.0.42 with lerp: 0.08, duration: 1.4, GSAP ticker sync |
| 2 | No Barba.js page transitions | **FIXED** — scaleY wipe transitions on all 3 pages |
| 3 | No SplitType word reveals | **FIXED** — All `[data-split]` headings split into words with overflow mask |
| 4 | Preloader lacks GSAP counter | **FIXED** — 0→100 counter with `power4.inOut` yPercent exit |
| 5 | Missing `prefers-reduced-motion` | **FIXED** — JS + CSS reduced-motion support |
| 6 | Hero uses grid, not full-bleed | **FIXED** — Full-viewport hero with image BG + gradient overlay |
| 7 | No parallax on hero image | **FIXED** — `yPercent: 30` parallax on hero image, `-15` on content |
| 8 | Gallery cards animate via CSS class | **FIXED** — GSAP ScrollTrigger-driven reveals |
| 9 | Process section missing step reveal | **FIXED** — ScrollTrigger with `--line-width` scrub |
| 10 | Contact end-mark CSS pulse | **FIXED** — Removed infinite pulse, added hover-only scale |
| 11 | Missing data-barba attributes | **FIXED** — Added to all pages |
| 13 | scroll-snap on scroll-container | **FIXED** — Removed; Lenis handles smooth scroll |
| 14 | No `will-change: transform` | **FIXED** — Added to hero__bg |
| 15 | Images missing `loading="lazy"` | **FIXED** — All gallery images use `loading="lazy"` |

---

## v1.3 — Single Page Editorial Rebuild (Current)
**Date:** 2026-06-29

### Design Philosophy
Collapsed from 3 pages to single flagship page per Build Bible mandate. Rebuilt with cooler architectural palette, SOTD-quality motion, and full creative content suite.

### Key Decisions

**Single Page** — Removed Barba.js entirely. Site is now one continuous editorial scroll: Hero → Philosophy → Portfolio → Method → Services → Pathways → Testimonials → Experience → Artist → Instagram → Contact.

**Palette Shift** — Moved from warm browns to cooler architectural tones:
- `--bone: #F5F3F0` (was ivory)
- `--stone: #E8E4DE` (was cream)
- `--greige: #D4CFC8` (was sand)
- `--charcoal: #3D3833` (was espresso)
- `--black: #1A1714`

**Motion Doctrine** — "Almost invisible" per Build Bible:
- Lenis lerp 0.08 / duration 1.4
- Preloader: 0→100 counter, yPercent exit
- Custom cursor: 8px dot + 40px follower, mix-blend-mode: difference
- SplitType word reveals with overflow masks
- Hero parallax yPercent 30
- Mobile: Lenis disabled, yPercent reduced 50%

### Files Modified

| File | Change |
|------|--------|
| `index.html` | Single page with 10 scenes: Hero, Philosophy, Press, Portfolio, Stats, Method, Services, Pathways, Testimonials, Experience, Artist, Instagram, Contact. Added preloader, grain, scroll-progress, cursor divs. |
| `css/style.css` | 1400+ lines. Full design system + all section styles + preloader + cursor + grain + scroll-progress + press + stats + services + testimonials + artist + instagram + contact CTA. |
| `js/lenis-init.js` | Lenis + ScrollTrigger sync. lerp 0.08, duration 1.4. Mobile: lerp 0.1, duration 1.0. |
| `js/preloader.js` | GSAP counter 0→100 over 2s, bar fill, yPercent exit. |
| `js/cursor.js` | 8px dot + 40px follower. gsap.quickTo with lag. Hover scale 2.5x on interactive elements. |
| `js/split-text.js` | SplitType word splitting with overflow mask wrappers. |
| `js/animations.js` | All GSAP ScrollTrigger animations: hero entrance, parallax, word reveals, image clip-path wipes, section reveals, nav hide/show, scroll progress, magnetic buttons, tilt hover, smooth anchor. |

### Images

| Folder | Count | Content |
|--------|-------|---------|
| `images/` | 49 files | 39 JPGs + 9 SVGs + 1 artist portrait + 6 Instagram |

### Creative Content Added

| Section | Details |
|---------|---------|
| Press Logos | VOGUE, GQ, ELLE, HARPER'S BAZAAR, WANT, ANOTHER |
| Stats Strip | 12 years / 3000+ cuts / 47 shoots / London |
| Services + Pricing | 5 services: Signature Cut £185, Editorial £350, Shape Edit £145, Texture Consult £95, Bridal from £450 |
| Testimonials | 3 client quotes (Creative Director, Vogue Editor, Model) |
| Artist Bio | Hugo Javier — portrait, quote, bio, editorial credits, Instagram |
| Instagram Feed | 6-image grid with Follow CTA |
| Booking CTA | "Book a Session" button + availability date |
| Footer | "made with love ❤️ by Empathy Studio +91 9833274308" |

### Artist
- **Name**: Hugo Javier (was Norman James)
- **Instagram**: @hugojavierhair

### SOTD Features Implemented

| Feature | Status |
|---------|--------|
| Film grain overlay | ✅ SVG noise, 3.5% opacity |
| Scroll progress line | ✅ 2px, scrub-linked |
| Smooth anchor scroll | ✅ Lenis scrollTo |
| Image reveal masks | ✅ clip-path wipe |
| Nav hide/show | ✅ Hide down, show up |
| Magnetic buttons | ✅ Text displacement + elastic |
| Section clip-wipes | ✅ Cinematic mask reveals |
| Method counters | ✅ 01→04 count-up |
| Tilt hover | ✅ Portfolio + pathway cards |
| Hero scroll cue | ✅ Pulsing line + text |
| Link underlines | ✅ Width wipe on hover |
| Custom cursor | ✅ 8px dot + 40px follower |
| SplitType words | ✅ Word-by-word reveal |
| Reduced motion | ✅ JS + CSS fallback |

---

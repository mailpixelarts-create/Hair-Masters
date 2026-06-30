# THE AVANT-GARDE TRANSFORMER — CHANGELOG

## v3.0
- Integrated all 34 new images — each used exactly once across 8 acts, zero duplicates
- Hero: hero_03 (Silhouette Reveal) + detail_08 (Material Study) as floating depth plane
- Silhouette Chamber: added gallery_09 as 4th monolith (Structural Cascade)
- Mutation Archive: added gallery_10 (Dual Exposure) + gallery_11 (Profile Architecture) closing frame
- Construction Lab: replaced picsum placeholders with detail_07 (Construction Evidence) + detail_06 (Seam/Join/Wrap)
- Identity Split: replaced gallery_10 with detail_01 (Lacquered Surface) for unique pair
- Atmosphere: expanded 3-item strip to 7-item staggered grid (atmosphere_04–07 added)
- CTA: hero_01 (Transformation Icon) for Final Vanish
- Unified hero across all pages (index, about, work)
- Rewrote JS stack to match SMOOTH-SCROLL.md spec exactly
- lenis-init.js: lerp 0.08, duration 1.4, GSAP ticker sync, ScrollTrigger scrollerProxy
- preloader.js: count 0→100, yPercent -100 exit
- cursor.js: gsap.quickTo for follower lag, 8px dot + 40px follower
- split-text.js: SplitType word masking with overflow:hidden masks
- animations.js: data-speed parallax, fromTo with immediateRender:false, safety fallback
- barba-init.js: clipPath inset(0 0 100% 0) exit, destroy/reinit Lenis, y:40→0 enter
- Init order: preloader → Lenis → ScrollTrigger → animations → Barba
- Removed all CSS initial hidden states (opacity:0) — GSAP now controls visibility
- Removed atmosphere.js from init (particle/cursor-light effects not in spec)
- Fixed critical init blocker: removed document.fonts.ready dependency that prevented all initialization when Google Fonts failed to load
- Added 4s timeout fallback to guarantee init runs even if preloader hangs
- Fixed light passing effect: diagonal warm sweep (blur:35px, rotate:18deg, mix-blend-mode:screen)
- Applied same init fix to about.html and work.html

## v2.6
- Enhanced hover states across all interactive elements (CTA, gallery frames, portfolio items, construction cards, atmosphere items, silhouette studies)
- Added CTA shimmer sweep animation on hover
- Added gallery frame gradient overlay on hover
- Added scroll cue pulse animation
- Added loading shimmer animation for states
- Final polish pass on all visual elements

## v2.5
- Enhanced archive quote section with oversized text (clamp(2rem, 5vw, 4rem))
- Added translucent material background panel with backdrop-filter blur
- Added gradient accent line at top of quote section
- Increased max-width to 1000px for more dramatic presence
- Added text-shadow for depth

## v2.4
- Created atmosphere.js with floating particles, cursor light, and shadow drift effects
- Added 30 floating dust motes with subtle drift animation in hero
- Added cursor-following ambient light with radial gradient
- Added shadow drift responding to mouse movement on hero veil
- Integrated atmosphere.js across all pages

## v2.3
- Rewrote animations.js with section-specific motion (v3.0)
- Enhanced hero reveal with solid black veil and slower cinematic timing
- Added clip-path reveals for silhouette chamber and archive frames
- Added varying animation speeds for manifesto text fragments
- Enhanced construction lab with evidence-card slide-in and phase label animation
- Added divider line draw-in for identity split
- Added multi-element dissolution sequence for final vanish
- Added subtle shadow drift atmospheric motion on scroll

## v2.2
- Added material/surface texture CSS classes (lacquer, mesh, translucent, mirror, velvet, chrome, glass)
- Added hover effects and animations for material treatments

## v2.1
- Fixed CSS syntax error (stray closing brace after .threshold__title)
- Added act--threshold class to hero header on all pages to restore scroll animations
- Fixed selector mismatches in about.html and work.html (.hero__title → .threshold__title)

## v2.0
- Fixed text clipping issue by adding overflow: visible to threshold__content and threshold__title
- Reduced title font size to clamp(2.5rem, 6vw, 5.5rem) to prevent overflow
- Adjusted line-height to 1.0 and letter-spacing to -0.02em for better readability
- Added word-wrap: break-word to title for proper text wrapping
- Reduced max-width to 550px and right position to 3% for better spacing

## v1.9
- Fixed hero typography styling by removing conflicting inline styles
- Updated max-width to 600px for better text layout
- Applied consistent CSS design system styles for threshold__title and threshold__statement

## v1.8
- Updated 10 image prompts to match current image continuity and naming conventions
- Added continuity references linking new prompts to existing images (hero_01-02, gallery_01-08, detail_01-06, process_01-05, atmosphere_01-03)
- Aligned new prompts with existing visual language and dark void aesthetic

## v1.7
- Added 10 detailed image prompts to Production_Image_Prompts.md
- Expanded image system with hero, gallery, detail, atmosphere, and transformation proof prompts

## v1.6
- Added 2 placeholder process images (Phase 06: Test, Phase 07: Reveal) to meet minimum requirements
- Updated Construction Lab section in index.html and dist/index.html

## v1.5
- Made hamburger menu visible on desktop (all screen sizes)
- Hidden desktop nav links in favor of hamburger navigation

## v1.4
- Added stylized hamburger menu with animated line transitions to X
- Implemented full-screen mobile menu overlay with staggered link reveals
- Added responsive CSS for mobile navigation
- Integrated hamburger toggle JavaScript across all pages

## v1.3
- Restructured all headers to cinematic transformation gate style per Motion Doctrine
- Integrated hero content into header with layered canvas, floating detail crop, gradient veil
- Removed duplicate ACT 01 sections from main content
- Applied consistent asymmetrical typography positioning across all pages

## v1.2
- Replaced "Norman James" with "The Avant Garde" across all HTML files, README.md, and package.json
- Added full-screen header with gallery_05.png background image (then reverted text overlay per user request)

## v1.1
- Fixed Preloader wipe not hidden initially
- Added initial scroll-to-top on load
- Fixed Barba.js initialization to not conflict with preloader flow
- Reduced hero text reveal delay for better UX

## v1.0
- Created full website with all sections: Hero, Philosophy, Disciplines, Portfolio, Process, Intelligence, Before/After, Atmosphere, Booking, Closing
- Implemented custom cursor, preloader, smooth scrolling (Lenis)
- Added GSAP animations, SplitType text reveals, Barba.js page transitions
- Created About and Work pages
- Built responsive navigation and full gallery

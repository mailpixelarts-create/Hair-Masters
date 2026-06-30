# Animation Guide

## Timeline (Entrance Sequence)

**File:** `src/animations/timeline.js`

### Sequence

1. **Sidebar slide-in** — Slides from left (x: -120 → 0), fades in. Duration: 1s.
2. **Headline stagger** — Each child element (kicker, title, description, button) slides up from y: 70 with 0.18s stagger. Duration: 1s each. Overlaps sidebar by 0.3s.
3. **Hero image zoom** — Scales from 1.35 to 1.0 over 7s with `power2.out` easing. Runs concurrent with headline.
4. **Flash pulse 1** — White overlay flashes to 0.95 opacity over 0.08s, fades to 0 over 0.12s.
5. **Flash pulse 2** — After 0.8s delay, flashes to 0.8 opacity, fades to 0.

### Purpose

The double flash mimics paparazzi camera bursts — creating the feeling of a red-carpet premiere moment.

---

## Parallax (Mouse Tracking)

**File:** `src/animations/parallax.js`

- Tracks mouse position relative to viewport center
- Offsets `.hero-image` by `delta / 40` on both axes
- 2s ease on the GSAP tween for smooth, lagging response
- Creates subtle depth and life in the hero image

---

## Smooth Scroll (Lenis)

**File:** `src/utils/smooth-scroll.js`

- Lenis initialized with 1.2s duration
- Custom easing curve for natural deceleration
- Foundation for future scroll-driven sections
- Currently `overflow: hidden` on body — enable scrolling when additional sections are added

---

## Adding New Animations

When extending this experience:

1. Create a new file in `src/animations/`
2. Export an `init*` function
3. Import and call it in `src/main.js`
4. Follow GSAP best practices: animate only `transform` and `opacity`

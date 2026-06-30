# THE BRIDAL SCULPTOR

## Hair Styling World 03

A luxury bridal hair atelier website — sculptural, emotional, timeless.

---

## Project Overview

**The Bridal Sculptor** is the ceremonial luxury world within the 10 Hair Styling Worlds system. This is not "wedding hair" in the generic vendor sense — it is bridal hair as emotional architecture.

### Core Promise

> Bridal hair, sculpted to hold emotion, elegance, and memory.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Structure | Semantic HTML5 |
| Styling | Custom CSS (CSS Variables) |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis |
| Text Splitting | SplitType |
| Fonts | Cormorant Garamond + DM Sans |

---

## File Structure

```
THE BRIDAL SCULPTOR/
├── index.html                 # Main single-page site
├── css/
│   ├── style.css              # Core design system
│   └── animations.css         # Animation styles
├── js/
│   ├── lenis-init.js          # Smooth scroll setup
│   ├── preloader.js           # Loading sequence
│   ├── split-text.js          # Text reveal animations
│   ├── animations.js          # GSAP ScrollTrigger
│   └── cursor.js              # Custom cursor
├── assets/
│   └── images/
│       ├── hero/
│       ├── gallery/
│       ├── detail/
│       ├── process/
│       ├── atmosphere/
│       └── lookpathways/
├── THE BRIDAL SCULPTOR Production_Image_Prompts.md
└── README.md
```

---

## Sections (7 Scenes)

1. **The Bridal Arrival** — Hero with emotional trust, sculptural portrait, soft reveal
2. **The Bridal Philosophy** — Manifesto on bridal styling as emotional architecture
3. **The Bridal Gallery** — Curated editorial proof of sculptural work
4. **The Sculpting Process** — Trial, consultation, hold strategy, wedding-day logic
5. **Bridal Look Pathways** — 8 signature looks with interactive reveal (signature interaction)
6. **The Experience** — Who this is for, booking standards, trust section
7. **The Invitation** — Calm luxury inquiry CTA

---

## Design System

### Palette

| Token | Hex | Role |
|-------|-----|------|
| Ivory | #FAF8F5 | Primary background |
| Champagne | #F5E6D3 | Secondary surface |
| Warm Stone | #D4C5B2 | Tertiary surface |
| Muted Gold | #C9A96E | Accent, CTAs, lines |
| Soft Grey | #8A817C | Body text, labels |
| Charcoal | #3D3530 | Headlines, primary text |

### Typography

- **Display:** Cormorant Garamond (300, 400, 500)
- **Body:** DM Sans (300, 400, 500)

### Motion

- **Lenis Duration:** 1.6s (Flowing — luxurious, water-like)
- **ScrollTrigger:** Reveals at 85% viewport entry
- **Text:** SplitType line masks with y:100% → 0
- **Stagger:** 0.06s between text lines

---

## Setup

1. Open `index.html` in a browser
2. Replace placeholder images (picsum.photos) with real bridal imagery
3. Update form action for inquiry submissions

---

## Image Requirements

See `THE BRIDAL SCULPTOR Production_Image_Prompts.md` for complete prompt specifications.

### Minimum Assets

| Category | Count |
|----------|-------|
| Hero | 2 portraits |
| Gallery | 8 bridal looks |
| Detail | 6 close crops |
| Process | 5 craft images |
| Atmosphere | 3 editorial |
| Look Pathways | 8 styled looks |

---

## Footer (Mandatory)

```
Seventy-eight doors. One infinite corridor. © 2026. Norman James All rights reserved.

MADE WITH LOVE ❤️ BY EMPATHY STUDIO
91 + 9833274308 / 91 + 9833274305
```

---

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

---

## Accessibility

- `prefers-reduced-motion` support
- Semantic HTML structure
- ARIA labels on sections
- Keyboard navigation
- Touch-safe CTA sizing (48×48px)

---

*Built with precision. Designed for emotion.*

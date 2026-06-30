# THE AVANT-GARDE TRANSFORMER

## Hair Styling World 07

A radical, sculptural, conceptual hair transformation website — hair as architecture, motion as meaning.

---

## Project Overview

**The Avant-Garde Transformer** is the most disruptive world within the 10 Hair Styling Worlds system. It exists beyond traditional hairstyling — this is the discipline of reshaping how a person is seen through the structural possibilities of hair.

### Core Promise

> Hair can do more than flatter. It can become architecture. It can alter how a face is read, how a body moves through a room, how identity is felt.

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
THE AVANT-GARDE TRANSFORMER/
├── index.html                 # Main single-page site
├── css/
│   ├── style.css              # Core design system
│   └── animations.css         # Animation styles
├── js/
│   ├── lenis-init.js          # Smooth scroll setup
│   ├── preloader.js           # Loading sequence
│   ├── split-text.js          # Text reveal animations
│   ├── animations.js          # GSAP ScrollTrigger
│   ├── cursor.js              # Custom cursor
│   └── gallery.js             # Gallery interactions
├── assets/
│   └── images/
│       ├── hero/
│       ├── gallery/
│       ├── detail/
│       ├── process/
│       └── atmosphere/
├── THE AVANT-GARDE TRANSFORMER.md
├── Production_Image_Prompts.md
└── README.md
```

---

## Sections (10 Scenes)

1. **The Transformation Entry** — Full-screen transformation portrait, world title, metamorphosis statement
2. **The Philosophy** — Manifesto on hair as architecture, split layout with parallax portrait
3. **Signature Disciplines** — 6 disciplines: sculptural silhouette, wig transformation, hair-object, runway distortion, identity-shift, high-fashion
4. **The Portfolio** — Editorial masonry grid of 8 radical hair transformations
5. **The Process** — 7 phases of metamorphosis: Conceive → Construct → Manipulate → Sculpt → Refine → Test → Reveal (horizontal scroll)
6. **Conceptual Styling Intelligence** — Silhouette & proportion, editorial translation, wig integration
7. **Before/After Evidence** — 2 slider pairs showing dramatic identity shifts
8. **Backstage Lab** — Atmosphere filmstrip: wigs, pins, mirrors, studio
9. **Collaboration CTA** — "Book a transformation consultation"
10. **Closing Statement** — "Hair can do more than flatter..."

---

## Design System

### Palette (Route A — Dark Transformation)

| Token | Hex | Role |
|-------|-----|------|
| Background Void | #080808 | Primary background |
| Graphite | #141414 | Surface elevation |
| Steel | #1e1e1e | Cards, modals |
| Plum | #2d1b2e | Bruised plum accent |
| Burgundy | #4a1528 | Deep burgundy |
| Steel Grey | #6b6b7b | Cold steel |
| Text Primary | #e8e4df | Warm off-white |
| Accent | #8b3a62 | Muted rose-plum |

### Typography

- **Display:** Cormorant Garamond (300, 400, 500)
- **Body:** DM Sans (300, 400, 500)

### Motion

- **Lenis Duration:** 1.6s (Flowing — luxurious, water-like)
- **Lenis Lerp:** 0.08
- **ScrollTrigger:** Reveals at 70-85% viewport entry
- **Text:** SplitType word masks with y:100% → 0
- **Stagger:** 0.04s between words, 0.1s between cards

---

## Setup

1. Open `index.html` in a browser
2. Replace placeholder images (picsum.photos) with real imagery
3. Update production image prompts from `Production_Image_Prompts.md`
4. Update form action for consultation submissions

---

## Image Requirements

See `Production_Image_Prompts.md` for complete prompt specifications.

### Minimum Assets

| Category | Count |
|----------|-------|
| Hero | 1 transformation portrait |
| Gallery | 8 editorial looks |
| Process | 7 phase images |
| Before/After | 2 slider pairs (4 images) |
| Atmosphere | 3 backstage images |

---

## Footer (Mandatory)

```
Seventy-eight doors. One infinite corridor. © 2026. The Avant Garde All rights reserved.

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
- ARIA labels on all sections
- Keyboard navigation
- Touch-safe CTA sizing (48×48px)
- Custom cursor hidden on touch devices

---

*Hair as architecture. Motion as meaning.*

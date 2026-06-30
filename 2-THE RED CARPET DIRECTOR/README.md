# THE RED CARPET DIRECTOR

A cinematic hero experience inspired by award-show glamour and celebrity image direction.

## Brand Summary

"THE RED CARPET DIRECTOR" is World 08 of a fashion experience series — an editorial statement on red-carpet hairstyling, where every look is designed to own the camera.

## Experience Overview

A single-screen cinematic hero with:
- Dark editorial aesthetic (black + gold)
- Cinzel serif typography for headlines
- GSAP-powered entrance timeline
- Camera flash double-pulse effect
- Mouse-tracking parallax on hero image
- Lenis smooth scroll foundation

## Design Philosophy

- Emotion over information
- Editorial minimalism
- Cinematic pacing
- Luxury restraint

## Technical Stack

- **Vite** — Dev server + build
- **GSAP** — Motion architecture
- **Lenis** — Smooth scroll
- **CSS Custom Properties** — Design tokens

## Folder Structure

```
the-red-carpet-director/
├── index.html              Entry point
├── package.json            Dependencies
├── vite.config.js          Build config
├── public/
│   ├── images/             Hero + gallery images
│   ├── fonts/              Custom fonts
│   └── audio/              Soundscapes
├── src/
│   ├── styles/
│   │   ├── variables.css   Design tokens
│   │   ├── base.css        Reset + body
│   │   └── hero.css        Hero section
│   ├── animations/
│   │   ├── timeline.js     Entrance sequence
│   │   ├── parallax.js     Mouse parallax
│   │   └── flash.js        Flash effect
│   ├── utils/
│   │   └── smooth-scroll.js Lenis init
│   └── main.js             Entry point
├── assets/
│   ├── images/             Source images
│   └── videos/             Source videos
└── documentation/
    └── animation-guide.md  Animation docs
```

## Installation

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run build
```

Output goes to `dist/`. Deploy to Vercel, Netlify, or any static host.

## Performance Targets

- 60 FPS desktop
- LCP < 2.5s
- CLS < 0.1

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

## License

Private project.

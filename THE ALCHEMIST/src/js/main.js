/* ============================================
   THE ALCHEMIST — Main Entry Point
   ============================================ */

import { initLenis, lenis } from './lenis.js';
import { initPreloader } from './preloader.js';
import { initCursor } from './cursor.js';
import { initHero } from './hero.js';
import { initNav } from './nav.js';
import { initAnimations } from './animations.js';
import { initTransformationSlider } from './transformation-slider.js';
import { initFormulaScroll } from './formula-scroll.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Strict initialization order
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
  
  // Check if nav exists
  const nav = document.getElementById('nav');
  console.log('Nav element:', nav);

  // 1. Preloader starts immediately
  initPreloader();

  // 2. Wait for fonts
  document.fonts.ready.then(() => {
    console.log('Fonts ready');
    // 3. Custom cursor (desktop only)
    initCursor();

    // 4. Hero Three.js scene
    initHero();

    // 5. Navigation
    console.log('Calling initNav');
    initNav();

    // 6. Wait for preloader to finish, then init everything else
    window.addEventListener('preloader:complete', () => {
      console.log('Preloader complete');

      // 7. Lenis smooth scroll
      try { initLenis(); } catch(e) { console.error('Lenis init failed:', e); }

      // 8. All GSAP animations (includes text splitting)
      try { initAnimations(); } catch(e) { console.error('Animations init failed:', e); }

      // 9. Now that text is split, run hero entrance animation
      try {
        if (window.heroEntrance) window.heroEntrance();
      } catch(e) { console.error('Hero entrance failed:', e); }

      // 10. Transformation slider
      try { initTransformationSlider(); } catch(e) { console.error('Slider init failed:', e); }

      // 11. Formula-to-finish scroll
      try { initFormulaScroll(); } catch(e) { console.error('Formula scroll init failed:', e); }

      // 12. ScrollTrigger refresh
      try { ScrollTrigger.refresh(); } catch(e) { console.error('ScrollTrigger refresh failed:', e); }
    });
  });
});

// Expose lenis for other modules
window.lenis = lenis;

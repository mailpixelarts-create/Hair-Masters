/* ============================================
   THE ALCHEMIST — Lenis Smooth Scroll
   ============================================ */

let lenis = null;
let isMobile = false;

export function initLenis() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  isMobile = window.innerWidth < 768;

  lenis = new Lenis({
    lerp: 0.08,
    duration: 1.4,
    smoothWheel: !prefersReducedMotion && !isMobile,
    smoothTouch: false
  });

  // Sync Lenis with GSAP ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Sync ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      return arguments.length
        ? lenis.scrollTo(value)
        : lenis.progress * (document.body.scrollHeight - window.innerHeight);
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
  });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });

  return lenis;
}

export { lenis };

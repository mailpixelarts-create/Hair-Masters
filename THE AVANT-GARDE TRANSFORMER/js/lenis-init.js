/* ============================================
   THE AVANT-GARDE TRANSFORMER — Lenis Smooth Scroll
   Spec: lerp 0.08, duration 1.4, GSAP ticker sync
   Mobile: Lenis DISABLED, native scrolling
   ============================================ */

let lenis;

function initLenis() {
  const isMobile = window.innerWidth <= 768;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile || prefersReducedMotion) {
    ScrollTrigger.defaults({ scroller: document.documentElement });
    return null;
  }

  lenis = new Lenis({
    lerp: 0.08,
    duration: 1.4,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  lenis.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      return arguments.length
        ? lenis.scrollTo(value)
        : lenis.scroll.progress * (document.body.scrollHeight - window.innerHeight);
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  return lenis;
}

function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

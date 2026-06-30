/* ============================================
   THE BRIDAL SCULPTOR — Lenis Smooth Scroll
   Doctrine: "Mobile = Default = Native Scrolling"
   Lenis is DISABLED on mobile — no RAF loop, no proxy.
   ============================================ */

let lenis;

function initLenis() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;

  // Mobile: skip Lenis entirely, use native scroll
  if (isMobile) {
    // Still need ScrollTrigger to work without Lenis proxy
    ScrollTrigger.defaults({ scroller: document.documentElement });
    return null;
  }

  lenis = new Lenis({
    lerp: prefersReducedMotion ? 1 : 0.08,
    duration: prefersReducedMotion ? 0 : 1.6,
    smoothWheel: !prefersReducedMotion,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 2,
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
        : lenis.scroll.progress * (document.body.scrollHeight - window.innerHeight);
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

  return lenis;
}

function destroyLenis() {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}

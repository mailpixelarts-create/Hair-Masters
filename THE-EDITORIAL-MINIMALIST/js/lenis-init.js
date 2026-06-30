/* ============================================
   Lenis Smooth Scroll + ScrollTrigger Sync
   lerp: 0.08, duration: 1.4
   ============================================ */

let lenis = null;

function initLenis() {
  if (lenis) lenis.destroy();

  const isMobile = window.innerWidth < 768;

  lenis = new Lenis({
    lerp: isMobile ? 0.1 : 0.08,
    duration: isMobile ? 1.0 : 1.4,
    smoothWheel: !isMobile,
    smoothTouch: false,
  });

  // Run Lenis on GSAP ticker
  gsap.ticker.add((time) => lenis.raf(time * 1000));
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
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
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

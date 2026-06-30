/* ============================================
   THE RUNWAY ARCHITECT — Lenis Smooth Scroll
   ============================================ */

const LenisManager = {
  lenis: null,
  isMobile: window.innerWidth < 768 || 'ontouchstart' in window,

  init() {
    if (this.isMobile) return;

    try {
      this.lenis = new Lenis({
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true
      });

      this.lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => { this.lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      console.warn('Lenis init failed:', e);
    }
  },

  scrollTo(target) {
    if (this.lenis) {
      this.lenis.scrollTo(target, { offset: 0, duration: 1.5 });
    }
  }
};

/* ============================================
   THE RUNWAY ARCHITECT — Split Text
   ============================================ */

const SplitTextManager = {
  instances: [],

  init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('[data-split]').forEach(el => {
      const split = new SplitType(el, { types: 'words, chars' });
      this.instances.push(split);
    });
  },

  animate() {
    document.querySelectorAll('[data-split]').forEach(el => {
      const chars = el.querySelectorAll('.char');
      if (!chars.length) return;

      gsap.from(chars, {
        opacity: 0,
        y: 20,
        rotateX: -40,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  }
};

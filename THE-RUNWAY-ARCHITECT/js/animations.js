/* ============================================
   THE RUNWAY ARCHITECT — GSAP Animations
   ============================================ */

const AnimationManager = {
  isMobile: window.innerWidth < 768 || 'ontouchstart' in window,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  init() {
    if (this.reducedMotion) {
      document.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    this.initReveals();
    this.initScrollProgress();
    this.initHeroEntrance();
    this.initParallax();
  },

  initReveals() {
    document.querySelectorAll('.reveal').forEach(el => {
      gsap.from(el, {
        y: this.isMobile ? 40 : 60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });
  },

  initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    gsap.to(bar, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });
  },

  initHeroEntrance() {
    const hero = document.querySelector('.scene-prologue');
    if (!hero) return;

    const tl = gsap.timeline({ delay: 2.5 });

    tl.from('.prologue-label', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power4.out'
    })
    .from('.prologue-title-line', {
      opacity: 0, y: 60, duration: 1, stagger: 0.15, ease: 'power4.out'
    }, '-=0.4')
    .from('.prologue-subtitle', {
      opacity: 0, y: 30, duration: 0.8, ease: 'power4.out'
    }, '-=0.5')
    .from('.prologue-meta', {
      opacity: 0, y: 20, duration: 0.6, ease: 'power4.out'
    }, '-=0.4')
    .from('.prologue-scroll', {
      opacity: 0, y: 20, duration: 0.6, ease: 'power4.out'
    }, '-=0.2');
  },

  initParallax() {
    document.querySelectorAll('.prologue-bg img, .brief-image img').forEach(img => {
      gsap.to(img, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.scene'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }
};

/* ============================================
   THE RUNWAY ARCHITECT — GSAP Animations v2
   Scroll Choreography: Reveal → Pause →
   Accelerate → Breathe → Seduce → Expand → Reflect
   ============================================ */

const AnimationManager = {
  isMobile: window.innerWidth < 768 || 'ontouchstart' in window,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  init() {
    if (this.reducedMotion) {
      document.querySelectorAll('.reveal-up, .reveal-clip').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.clipPath = 'inset(0 0 0 0)';
      });
      return;
    }

    this.initRevealUp();
    this.initRevealClip();
    this.initScrollProgress();
    this.initHeroEntrance();
    this.initInterstitials();
    this.initFormulaSequence();
    this.initFilmstrip();
    this.initMultiSpeedParallax();
    this.initPortfolioReveal();
  },

  /* --- Reveal: fade up from below --- */
  initRevealUp() {
    document.querySelectorAll('.reveal-up').forEach((el, i) => {
      gsap.from(el, {
        y: this.isMobile ? 40 : 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  },

  /* --- Reveal: cinematic clip-path wipe --- */
  initRevealClip() {
    document.querySelectorAll('.reveal-clip').forEach(el => {
      gsap.fromTo(el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.8,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  },

  /* --- Scroll Progress Bar --- */
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

  /* --- Hero Entrance Timeline --- */
  initHeroEntrance() {
    const hero = document.querySelector('.scene-prologue');
    if (!hero) return;

    const tl = gsap.timeline({ delay: 2.5 });

    tl.from('.prologue-label', {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.2,
      ease: 'power3.inOut'
    })
    .from('.prologue-title-line', {
      opacity: 0,
      y: 80,
      rotateX: -15,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out'
    }, '-=0.6')
    .from('.prologue-subtitle', {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.4,
      ease: 'power3.inOut'
    }, '-=0.5')
    .from('.prologue-meta', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power4.out'
    }, '-=0.6')
    .from('.prologue-scroll', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power4.out'
    }, '-=0.3');
  },

  /* --- Interstitial Parallax + Text Reveal --- */
  initInterstitials() {
    document.querySelectorAll('.scene-interstitial').forEach(scene => {
      const img = scene.querySelector('.interstitial-bg img');
      const text = scene.querySelector('.interstitial-text');

      if (img) {
        gsap.fromTo(img,
          { scale: 1.2, yPercent: -10 },
          {
            scale: 1.1,
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: scene,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          }
        );
      }

      if (text) {
        gsap.fromTo(text,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 2.0,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: scene,
              start: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });
  },

  /* --- Blueprint: Pinned Formula Sequence --- */
  initFormulaSequence() {
    const sequence = document.getElementById('formula-sequence');
    if (!sequence) return;

    const steps = sequence.querySelectorAll('.formula-step');
    if (!steps.length) return;

    // Pin the entire sequence
    ScrollTrigger.create({
      trigger: sequence,
      start: 'top top',
      end: () => `+=${(steps.length - 1) * window.innerHeight}`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeIndex = Math.round(progress * (steps.length - 1));

        steps.forEach((step, i) => {
          if (i === activeIndex) {
            step.classList.add('active');
          } else {
            step.classList.remove('active');
          }
        });
      }
    });

    // Individual step entrance animations
    steps.forEach((step, i) => {
      const visual = step.querySelector('.formula-step-visual');
      const info = step.querySelector('.formula-step-info');
      const num = step.querySelector('.formula-step-num');

      if (visual) {
        gsap.from(visual, {
          scale: 1.1,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });
      }

      if (num) {
        gsap.from(num, {
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: step,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        });
      }
    });
  },

  /* --- Filmstrip: Horizontal Scroll --- */
  initFilmstrip() {
    const track = document.getElementById('filmstrip-track');
    if (!track) return;

    const items = track.querySelectorAll('.filmstrip-item');
    if (!items.length) return;

    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 80),
      ease: 'none',
      scrollTrigger: {
        trigger: '.filmstrip-wrapper',
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth + 160}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });

    // Fade items as they scroll
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0.3, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            containerAnimation: gsap.getById ? undefined : undefined,
            start: 'left 90%',
            end: 'left 50%',
            scrub: 1,
            horizontal: true,
            onEnter: () => gsap.to(item, { opacity: 1, duration: 0.3 }),
            onLeave: () => gsap.to(item, { opacity: 0.3, duration: 0.3 }),
            onEnterBack: () => gsap.to(item, { opacity: 1, duration: 0.3 }),
            onLeaveBack: () => gsap.to(item, { opacity: 0.3, duration: 0.3 })
          }
        }
      );
    });
  },

  /* --- Multi-Speed Parallax --- */
  initMultiSpeedParallax() {
    // Per-pillar variable parallax
    document.querySelectorAll('.brief-pillar').forEach((pillar, i) => {
      gsap.to(pillar, {
        yPercent: -8 - (i * 4),
        ease: 'none',
        scrollTrigger: {
          trigger: pillar,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    });

    // Suite blocks per-speed parallax
    document.querySelectorAll('.suite-block').forEach((block, i) => {
      gsap.to(block, {
        yPercent: -5 - (i * 3),
        ease: 'none',
        scrollTrigger: {
          trigger: block,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    });

    // Interstitial bg images — slower parallax
    document.querySelectorAll('.interstitial-bg img').forEach(img => {
      gsap.to(img, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.scene-interstitial'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    });

    // Backstage gallery staggered reveal
    document.querySelectorAll('.backstage-item').forEach((item, i) => {
      gsap.from(item, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: i * 0.08,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.backstage-gallery',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Suite quote entrance
    const quote = document.querySelector('.suite-quote blockquote');
    if (quote) {
      gsap.fromTo(quote,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 2.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: quote,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  },

  /* --- Portfolio Grid Stagger --- */
  initPortfolioReveal() {
    const grid = document.querySelector('.portfolio-grid');
    if (!grid) return;

    const items = grid.querySelectorAll('.portfolio-item');
    items.forEach((item, i) => {
      gsap.from(item, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.06,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  }
};

/* ============================================
   THE AVANT-GARDE TRANSFORMER — GSAP Animations
   Spec: data-speed parallax, .reveal scroll triggers,
   pinned sections, text split reveals
   Only animate transform + opacity
   ============================================ */

function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const isMobile = window.innerWidth <= 768;

  ScrollTrigger.defaults({ toggleActions: 'play none none none' });

  // ============================================
  // HERO PARALLAX — yPercent: 30 on image
  // ============================================
  const heroImg = document.querySelector('.threshold__image--primary');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.act--threshold',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // ============================================
  // TEXT PARALLAX — heading vs body different speeds
  // ============================================
  document.querySelectorAll('[data-speed]').forEach((el) => {
    const speed = parseFloat(el.dataset.speed) || -10;
    gsap.to(el, {
      yPercent: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // ============================================
  // SECTION REVEALS — .reveal class, y:80, opacity:0
  // ============================================
  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.fromTo(el,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: el.closest('.act') || el.parentElement,
          start: 'top 85%',
        },
      }
    );
  });

  // ============================================
  // ACT 01 — HERO REVEAL SEQUENCE
  // ============================================
  const thresholdVeil = document.querySelector('.threshold__veil');
  const thresholdImage = document.querySelector('.threshold__image--primary');
  const thresholdDetail = document.querySelector('.threshold__detail');
  const thresholdContent = document.querySelector('.threshold__content');
  const thresholdScrollCue = document.querySelector('.threshold__scroll-cue');

  if (thresholdImage) {
    gsap.set(thresholdImage, { scale: 1.1, clipPath: 'inset(100% 0 0 0)' });
    if (thresholdContent) gsap.set(thresholdContent, { opacity: 0, y: 60 });
    if (thresholdDetail) gsap.set(thresholdDetail, { opacity: 0, y: 30 });

    const heroTl = gsap.timeline({ delay: 2.2 });

    if (thresholdVeil) {
      heroTl.to(thresholdVeil, { scaleY: 0, duration: 1.8, ease: 'power4.inOut' });
    }

    heroTl.to(thresholdImage, {
      scale: 1,
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.6,
      ease: 'power3.inOut',
    }, '-=1.4');

    if (thresholdContent) {
      heroTl.to(thresholdContent, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
      }, '-=0.6');
    }

    if (thresholdDetail) {
      heroTl.to(thresholdDetail, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.4');
    }

    // Fade hero content on scroll
    if (thresholdContent) {
      gsap.to(thresholdContent, {
        opacity: 0,
        y: -40,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: '.act--threshold',
          start: '25% top',
          end: '55% top',
          scrub: 1.5,
        },
      });
    }

    // Detail crop drifts
    if (thresholdDetail) {
      gsap.to(thresholdDetail, {
        y: -60,
        opacity: 0,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: '.act--threshold',
          start: '15% top',
          end: '45% top',
          scrub: 1.5,
        },
      });
    }

    // Scroll cue fade
    if (thresholdScrollCue) {
      gsap.to(thresholdScrollCue, {
        opacity: 0,
        scrollTrigger: {
          trigger: '.act--threshold',
          start: '5% top',
          end: '20% top',
          scrub: 1,
        },
      });
    }

    // Light passing — diagonal warm sweep across hero
    const lightBeam = document.querySelector('.light');
    if (lightBeam) {
      heroTl.to(lightBeam, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.in',
      }, '-=0.3');

      gsap.to(lightBeam, {
        x: '180vw',
        duration: 7,
        ease: 'none',
        delay: 3.5,
      });
    }
  }

  // ============================================
  // ACT 02 — MANIFESTO REVEALS
  // ============================================
  const manifestoTitle = document.querySelector('.manifesto__title');
  const manifestoFragments = document.querySelectorAll('.manifesto__fragment');
  const manifestoCrops = document.querySelectorAll('.manifesto__crop');

  if (manifestoTitle) {
    gsap.fromTo(manifestoTitle,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: manifestoTitle, start: 'top 85%' },
      }
    );
  }

  manifestoFragments.forEach((fragment, i) => {
    gsap.fromTo(fragment,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: fragment, start: 'top 85%' },
        delay: i * 0.08,
      }
    );
  });

  manifestoCrops.forEach((crop, i) => {
    gsap.fromTo(crop,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: crop, start: 'top 85%' },
        delay: i * 0.15,
      }
    );
  });

  // ============================================
  // ACT 03 — SILHOUETTE CHAMBER
  // ============================================
  const silhouetteStudies = document.querySelectorAll('.silhouette__study');
  silhouetteStudies.forEach((study, i) => {
    gsap.fromTo(study,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: study, start: 'top 85%' },
        delay: i * 0.1,
      }
    );

    const img = study.querySelector('img');
    if (img && !isMobile) {
      gsap.to(img, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: study,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }
  });

  // ============================================
  // ACT 04 — MUTATION ARCHIVE
  // ============================================
  document.querySelectorAll('.archive__frame').forEach((frame) => {
    gsap.fromTo(frame,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: frame, start: 'top 85%' },
      }
    );
  });

  const archiveQuote = document.querySelector('.archive__quote');
  if (archiveQuote) {
    gsap.fromTo(archiveQuote,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: archiveQuote, start: 'top 85%' },
      }
    );
  }

  // ============================================
  // ACT 05 — CONSTRUCTION LAB
  // ============================================
  document.querySelectorAll('.construction__card').forEach((card, i) => {
    gsap.fromTo(card,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: card, start: 'top 85%' },
        delay: i * 0.06,
      }
    );
  });

  // ============================================
  // ACT 06 — IDENTITY SPLIT
  // ============================================
  document.querySelectorAll('.split__module').forEach((module) => {
    const divider = module.querySelector('.split__divider');

    gsap.fromTo(module,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: module, start: 'top 85%' },
      }
    );

    if (divider) {
      gsap.fromTo(divider,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1, ease: 'power2.inOut',
          immediateRender: false,
          scrollTrigger: { trigger: module, start: 'top 75%' },
          delay: 0.3,
        }
      );
    }
  });

  // ============================================
  // ACT 07 — ATMOSPHERE
  // ============================================
  document.querySelectorAll('.atmosphere__item').forEach((item, i) => {
    gsap.fromTo(item,
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power4.out',
        immediateRender: false,
        scrollTrigger: { trigger: item, start: 'top 85%' },
        delay: i * 0.08,
      }
    );

    const img = item.querySelector('img');
    if (img && !isMobile) {
      gsap.to(img, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }
  });

  // ============================================
  // ACT 08 — FINAL VANISH
  // ============================================
  const invocationImage = document.querySelector('.invocation__image');
  const invocationContent = document.querySelector('.invocation__content');

  if (invocationImage && !isMobile) {
    const vanishTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.act--invocation',
        start: 'center center',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    vanishTl.to(invocationImage, {
      opacity: 0, scale: 0.92, y: -30, ease: 'power2.in',
    });

    if (invocationContent) {
      vanishTl.to(invocationContent, {
        y: -20, ease: 'power2.in',
      }, '<');
    }
  }

  // ============================================
  // PINNED SECTIONS
  // ============================================
  document.querySelectorAll('[data-pin]').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=100%',
      pin: true,
      scrub: 1,
    });
  });

  // ============================================
  // SAFETY — Show everything after 3s no matter what
  // ============================================
  setTimeout(() => {
    document.querySelectorAll('.manifesto__fragment, .manifesto__crop, .silhouette__study, .archive__frame, .archive__quote, .construction__card, .split__module, .atmosphere__item').forEach((el) => {
      if (el.style.opacity === '0' || getComputedStyle(el).opacity === '0') {
        gsap.set(el, { opacity: 1, y: 0 });
      }
    });
  }, 3000);

  // ============================================
  // REFRESH
  // ============================================
  ScrollTrigger.refresh();
}

/* ============================================
   THE BRIDAL SCULPTOR — GSAP Animations
   Doctrine: Motion = Narrative. 60fps. Transform + Opacity only.
   Hero: 3-5s entrance. Gallery: 2-3s reveals. Stagger: 0.04-0.08.
   ============================================ */

function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.hero-label, .hero-title, .hero-sub, .hero-cta, .hero-detail').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.hero-title-line').forEach(el => {
      el.style.transform = 'translateY(0%)';
    });
    // CRITICAL: Reset split-text line-inner elements (set to translateY(100%) by split-text.js)
    document.querySelectorAll('.line-inner').forEach(el => {
      el.style.transform = 'translateY(0%)';
    });
    return;
  }

  // ============================================
  // MATCHMEDIA — Independent Desktop / Mobile Systems
  // Doctrine: "Desktop and mobile must maintain independent animation systems"
  // ============================================
  const mm = gsap.matchMedia();

  // --- DESKTOP ANIMATIONS (min-width: 769px) ---
  mm.add('(min-width: 769px)', () => {

    // --- HERO ENTRANCE (~4s total per GREAT-GRANDMASTER spec) ---
    const heroTL = gsap.timeline({ delay: 0.3 });

    heroTL
      .to('.hero-label', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power4.out'
      }, '-=0.5')
      .to('.hero-sub', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.7')
      .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .to('.hero-detail', {
        opacity: 0.6,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.8');

    // --- HERO IMAGE PARALLAX (yPercent: 30 per SMOOTH-SCROLL spec) ---
    gsap.to('.hero-img', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // --- HERO CONTENT FADE ON SCROLL ---
    gsap.to('.hero-content', {
      opacity: 0,
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: '30% top',
        end: '80% top',
        scrub: true
      }
    });

    // --- SECTION REVEALS (2-3s duration per spec) ---
    gsap.utils.toArray('.reveal').forEach(el => {
      if (el.closest('.hero')) return;

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 2.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        }
      });
    });

    // --- SPLIT TEXT ANIMATIONS (2s reveal, stagger 0.06) ---
    const splitElements = document.querySelectorAll('[data-split]');
    splitElements.forEach(el => {
      if (el.closest('.hero')) return;

      const lineInners = el.querySelectorAll('.line-inner');
      if (lineInners.length === 0) return;

      gsap.to(lineInners, {
        y: '0%',
        duration: 2,
        ease: 'power4.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    // --- HERO TITLE SPLIT TEXT ---
    const heroTitleLines = document.querySelectorAll('.hero-title-line');
    heroTitleLines.forEach((line, i) => {
      gsap.to(line, {
        y: '0%',
        duration: 1.2,
        delay: 0.6 + (i * 0.15),
        ease: 'power4.out'
      });
      line.style.transform = 'translateY(100%)';
      line.style.overflow = 'hidden';
      line.style.display = 'block';
    });

    // --- PHILOSOPHY IMAGE PARALLAX ---
    const philImg = document.querySelector('.philosophy-image');
    if (philImg) {
      gsap.to(philImg.querySelector('img'), {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: philImg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // --- GALLERY: EDITORIAL SPREAD CHOREOGRAPHY ---
    // Doctrine: "Never rely solely on masonry grids. Curate experiences."
    // Instead of batch stagger, use individual reveals with editorial pacing
    const galleryCards = gsap.utils.toArray('.gallery-card');
    galleryCards.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 2.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          once: true
        }
      });
    });

    // --- PROCESS IMAGE PARALLAX ---
    const processImg = document.querySelector('.process-image');
    if (processImg) {
      gsap.to(processImg.querySelector('img'), {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: processImg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // --- LOOK CARDS: SIGNATURE INTERACTION (GSAP-driven, not CSS max-height) ---
    // Doctrine XXIV: "ONE memorable interaction. Must reinforce identity."
    const lookCards = document.querySelectorAll('.look-card');
    lookCards.forEach(card => {
      const content = card.querySelector('.look-card-content');
      const details = card.querySelector('.look-card-details');
      const image = card.querySelector('.look-card-image img');

      if (!content || !details) return;

      // Set initial state — scaleY instead of height (doctrine: transform + opacity only)
      gsap.set(content, { scaleY: 0, transformOrigin: 'top', overflow: 'hidden' });
      gsap.set(details, { opacity: 0, y: 20 });

      card.addEventListener('click', () => {
        const wasActive = card.classList.contains('active');

        // Close all other cards with animation
        lookCards.forEach(c => {
          if (c !== card && c.classList.contains('active')) {
            c.classList.remove('active');
            const cContent = c.querySelector('.look-card-content');
            const cDetails = c.querySelector('.look-card-details');
            gsap.to(cContent, { scaleY: 0, duration: 0.6, ease: 'power3.inOut' });
            gsap.to(cDetails, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
          }
        });

        if (!wasActive) {
          card.classList.add('active');
          // Cinematic expand: image zooms slightly, content reveals with detail stagger
          gsap.to(image, { scale: 1.05, duration: 0.8, ease: 'power2.out' });
          gsap.to(content, { scaleY: 1, duration: 0.8, ease: 'power3.inOut' });
          gsap.to(details, { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power3.out' });
        } else {
          gsap.to(image, { scale: 1, duration: 0.6, ease: 'power2.out' });
          gsap.to(content, { scaleY: 0, duration: 0.6, ease: 'power3.inOut' });
        }
      });
    });

    // --- EXPERIENCE CARDS STAGGER (2s reveal per spec) ---
    const expCards = gsap.utils.toArray('.experience-card');
    if (expCards.length > 0) {
      expCards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true
          }
        });
      });
    }

    // Refresh ScrollTrigger after fonts load
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  });

  // --- MOBILE ANIMATIONS (max-width: 768px) ---
  // Doctrine: "Mobile = Couture Garment, not compressed desktop"
  mm.add('(max-width: 768px)', () => {

    // --- MOBILE HERO ENTRANCE (3s minimum per doctrine) ---
    const heroTL = gsap.timeline({ delay: 0.2 });

    heroTL
      .to('.hero-label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out'
      }, '-=0.3')
      .to('.hero-sub', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out'
      }, '-=0.4')
      .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
      }, '-=0.3');

    // --- MOBILE HERO PARALLAX (reduced by 50% per spec) ---
    gsap.to('.hero-img', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // --- MOBILE HERO CONTENT FADE ---
    gsap.to('.hero-content', {
      opacity: 0,
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: '20% top',
        end: '60% top',
        scrub: true
      }
    });

    // --- MOBILE SECTION REVEALS (2s minimum per doctrine) ---
    gsap.utils.toArray('.reveal').forEach(el => {
      if (el.closest('.hero')) return;

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true
        }
      });
    });

    // --- MOBILE SPLIT TEXT ---
    const splitElements = document.querySelectorAll('[data-split]');
    splitElements.forEach(el => {
      if (el.closest('.hero')) return;

      const lineInners = el.querySelectorAll('.line-inner');
      if (lineInners.length === 0) return;

      gsap.to(lineInners, {
        y: '0%',
        duration: 2,
        ease: 'power4.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        }
      });
    });

    // --- MOBILE HERO TITLE SPLIT TEXT ---
    const heroTitleLines = document.querySelectorAll('.hero-title-line');
    heroTitleLines.forEach((line, i) => {
      gsap.to(line, {
        y: '0%',
        duration: 0.8,
        delay: 0.3 + (i * 0.1),
        ease: 'power4.out'
      });
      line.style.transform = 'translateY(100%)';
      line.style.overflow = 'hidden';
      line.style.display = 'block';
    });

    // --- MOBILE GALLERY: Sequential Discovery (2s per doctrine) ---
    const galleryCards = gsap.utils.toArray('.gallery-card');
    galleryCards.forEach((card) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          once: true
        }
      });
    });

    // --- MOBILE LOOK CARDS: Tap Reveal ---
    const lookCards = document.querySelectorAll('.look-card');
    lookCards.forEach(card => {
      const content = card.querySelector('.look-card-content');
      const details = card.querySelector('.look-card-details');

      if (!content || !details) return;

      gsap.set(content, { scaleY: 0, transformOrigin: 'top', overflow: 'hidden' });
      gsap.set(details, { opacity: 0, y: 15 });

      card.addEventListener('click', () => {
        const wasActive = card.classList.contains('active');

        lookCards.forEach(c => {
          if (c !== card && c.classList.contains('active')) {
            c.classList.remove('active');
            const cContent = c.querySelector('.look-card-content');
            const cDetails = c.querySelector('.look-card-details');
            gsap.to(cContent, { scaleY: 0, duration: 0.5, ease: 'power3.inOut' });
            gsap.to(cDetails, { opacity: 0, y: 15, duration: 0.25, ease: 'power2.in' });
          }
        });

        if (!wasActive) {
          card.classList.add('active');
          gsap.to(content, { scaleY: 1, duration: 0.6, ease: 'power3.inOut' });
          gsap.to(details, { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: 'power3.out' });
        } else {
          gsap.to(content, { scaleY: 0, duration: 0.5, ease: 'power3.inOut' });
        }
      });
    });

    // --- MOBILE EXPERIENCE CARDS (2s per doctrine) ---
    const expCards = gsap.utils.toArray('.experience-card');
    expCards.forEach((card) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          once: true
        }
      });
    });

    // Refresh after fonts
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  });
}

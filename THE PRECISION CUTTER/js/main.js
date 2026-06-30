/* ============================================
   THE PRECISION CUTTER — MAIN JS
   Bauhaus Geometry. Every Millimeter Matters.
   ============================================ */

(function () {
  'use strict';

  // ---- REDUCED MOTION / MOBILE DETECT ----
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  // ---- LENIS SMOOTH SCROLL ----
  // Per Mobile Luxury Protocol: disable Lenis on mobile, use native scrolling
  const lenisEnabled = !prefersReducedMotion && !isMobile;
  const lenis = new Lenis({
    duration: lenisEnabled ? 1.4 : 0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: lenisEnabled,
  });

  if (lenisEnabled) {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  gsap.registerPlugin(ScrollTrigger);

  // Sync Lenis with ScrollTrigger (only when Lenis is active)
  if (lenisEnabled) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  gsap.config({
    force3D: !prefersReducedMotion,
    autoSleep: 60,
    nullTargetWarn: false,
  });

  // ---- SPLITTYPE EDITORIAL REVEALS ----
  function splitTextElements() {
    if (typeof SplitType === 'undefined') return [];

    const selectors = [
      '.hero-title .line',
      '.section-title',
      '.philosophy-text p',
      '.step-content h3',
      '.slide-info h3',
      '.measurements-desc',
      '.contact-details p',
    ];

    const splits = [];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        const split = new SplitType(el, { types: 'lines,words' });
        splits.push({ el, split });
      });
    });

    return splits;
  }

  function revealSplitWords(splitObj, options = {}) {
    if (!splitObj || !splitObj.split) return;
    const { duration = 0.8, stagger = 0.03, delay = 0, ease = 'power3.out' } = options;
    gsap.from(splitObj.split.words, {
      y: '100%',
      opacity: 0,
      duration,
      stagger,
      delay,
      ease,
    });
  }

  // ---- PRELOADER ----
  const preloaderTL = gsap.timeline({
    onComplete: () => {
      document.getElementById('preloader').style.pointerEvents = 'none';
      initPageAnimations();
    },
  });

  preloaderTL
    .to('.preloader-shape', {
      opacity: 1,
      duration: 0.3,
      stagger: 0.1,
    })
    .from('.shape-1', {
      rotation: -45,
      scale: 0.5,
      duration: 1.2,
      ease: 'power3.inOut',
    })
    .from(
      '.shape-2',
      {
        x: 100,
        rotation: 90,
        scale: 0.5,
        duration: 1.2,
        ease: 'power3.inOut',
      },
      '<0.15'
    )
    .from(
      '.shape-3',
      {
        y: -80,
        rotation: -90,
        scale: 0.5,
        duration: 1.2,
        ease: 'power3.inOut',
      },
      '<0.1'
    )
    .to(
      '.shape-1',
      {
        x: -250,
        y: -150,
        rotation: 180,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
      },
      '+=0.3'
    )
    .to(
      '.shape-2',
      {
        x: 200,
        y: 100,
        rotation: -180,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
      },
      '<0.05'
    )
    .to(
      '.shape-3',
      {
        x: -100,
        y: 200,
        rotation: 270,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.in',
      },
      '<0.05'
    )
    .to('#preloader', {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    });

  // ---- PAGE ANIMATIONS ----
  function initPageAnimations() {
    animateHero();
    animatePhilosophy();
    animateProcess();
    initGallery();
    animateMacros();
    animateTransformation();
    animateMeasurements();
    animateContact();
    initNav();
    initCutLine();
    initSectionZoom();
    initCursor();
  }

  // ---- HERO ----
  function animateHero() {
    // Use SplitType for title words — editorial reveal
    const heroTitleSplits = [];
    document.querySelectorAll('#hero .line').forEach((line) => {
      const split = new SplitType(line, { types: 'words' });
      heroTitleSplits.push(split);
    });

    if (prefersReducedMotion) {
      heroTitleSplits.forEach((s) => gsap.set(s.words, { y: '0%' }));
      gsap.set('#hero .hero-tag, #hero .hero-sub, #hero .hero-measure', { opacity: 1, y: 0 });
      gsap.set('#hero .hero-image-frame', { clipPath: 'inset(0% 0 0 0)' });
      gsap.set('.frame-corner', { scale: 1 });
      return;
    }

    // Sequential word reveal — cinematic pacing per Motion Doctrine
    heroTitleSplits.forEach((split, i) => {
      gsap.to(split.words, {
        y: '0%',
        duration: 1,
        stagger: 0.06,
        delay: 0.3 + i * 0.2,
        ease: 'power3.out',
      });
    });

    gsap.to('#hero .hero-tag', {
      opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'power2.out',
    });

    gsap.to('#hero .hero-sub', {
      opacity: 1, y: 0, duration: 0.8, delay: 1.1, ease: 'power2.out',
    });

    gsap.to('#hero .hero-measure', {
      opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: 'power2.out',
    });

    // Cinematic reveal — image emerges from below
    gsap.to('#hero .hero-image-frame', {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.6,
      delay: 0.6,
      ease: 'power3.inOut',
    });

    // Frame corners — precision detail
    gsap.from('.frame-corner', {
      scale: 0, duration: 0.6, stagger: 0.1, delay: 1.6, ease: 'back.out(2)',
    });

    // Parallax — depth on scroll
    const heroTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    heroTL
      .to('#hero .hero-title', { y: -80, opacity: 0.3 })
      .to('#hero .hero-image-frame', { y: -40, scale: 1.05 }, '<');
  }

  // ---- PHILOSOPHY ----
  function animatePhilosophy() {
    if (prefersReducedMotion) {
      gsap.set('#philosophy .section-number, #philosophy .philosophy-text p, .m-block', { opacity: 1, y: 0 });
      gsap.set('#philosophy .section-title', { clipPath: 'inset(0 0% 0 0)' });
      return;
    }

    const titleSplit = new SplitType('#philosophy .section-title', { types: 'lines,words' });
    const textSplit = new SplitType('#philosophy .philosophy-text', { types: 'lines' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#philosophy',
        start: 'top 80%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    // Staggered reveal — different from hero: number fades, title splits by line
    tl.to('#philosophy .section-number', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .from(titleSplit.lines, {
        y: '100%', opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      }, '-=0.3')
      .from(textSplit.lines, {
        y: 20, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      }, '-=0.4')
      .from('.m-block', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      }, '-=0.3');

    // Measurement counter — transforms numbers into meaning
    gsap.utils.toArray('.m-number').forEach((el) => {
      const target = el.textContent;
      gsap.from(el, {
        textContent: '0',
        duration: 1.5,
        snap: { textContent: 1 },
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    });
  }

  // ---- PROCESS ----
  function animateProcess() {
    if (prefersReducedMotion) {
      gsap.set('#process .section-number, .process-step', { opacity: 1, y: 0 });
      gsap.set('#process .section-title', { clipPath: 'inset(0 0% 0 0)' });
      gsap.set('.step-line', { height: '100%' });
      return;
    }

    const titleSplit = new SplitType('#process .section-title', { types: 'lines,words' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#process',
        start: 'top 80%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    // Process steps cascade — narrative reveal per Motion Doctrine
    tl.to('#process .section-number', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .from(titleSplit.lines, {
        y: '100%', opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      }, '-=0.3')
      .from('.process-step', {
        opacity: 0, x: -30, duration: 0.7, stagger: 0.18, ease: 'power3.out',
      }, '-=0.4')
      .to('.step-line', {
        height: '100%', duration: 0.8, stagger: 0.18, ease: 'power2.inOut',
      }, '-=1');
  }

  // ---- GALLERY (Horizontal Scroll) ----
  function initGallery() {
    const track = document.getElementById('galleryTrack');
    const slides = gsap.utils.toArray('.gallery-slide');
    const progressFill = document.getElementById('galleryProgress');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let targetX = 0;

    // Mark first slide active
    slides[0].classList.add('active');

    // Horizontal scroll via GSAP
    const galleryScroll = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top top',
        end: () => '+=' + (track.scrollWidth - window.innerWidth),
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const slideIndex = Math.round(progress * (totalSlides - 1));

          if (slideIndex !== currentSlide) {
            slides[currentSlide].classList.remove('active');
            slides[slideIndex].classList.add('active');
            currentSlide = slideIndex;
            currentSlideEl.textContent = String(slideIndex + 1).padStart(2, '0');
          }

          progressFill.style.width = progress * 100 + '%';
        },
      },
    });

    // Drag to scroll horizontally
    const wrapper = document.getElementById('galleryWrapper');

    wrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      wrapper.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const diff = startX - e.clientX;
      const scrollAmount = diff * 2;
      const st = galleryScroll.scrollTrigger;
      const newScroll = st.start + (st.end - st.start) * Math.min(1, Math.max(0, st.progress + scrollAmount / (track.scrollWidth - window.innerWidth)));
      lenis.scrollTo(newScroll);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      wrapper.style.cursor = 'grab';
    });

    wrapper.style.cursor = 'grab';

    // Touch support
    wrapper.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const diff = startX - e.touches[0].clientX;
      const scrollAmount = diff * 2;
      const st = galleryScroll.scrollTrigger;
      const newScroll = st.start + (st.end - st.start) * Math.min(1, Math.max(0, st.progress + scrollAmount / (track.scrollWidth - window.innerWidth)));
      lenis.scrollTo(newScroll);
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // ---- BEAUTY MACRO ----
  function animateMacros() {
    if (prefersReducedMotion) {
      gsap.set('.macro-item', { opacity: 1, y: 0 });
      gsap.set('#macros .section-number, #macros .macros-sub', { opacity: 1, y: 0 });
      gsap.set('#macros .section-title', { clipPath: 'inset(0 0% 0 0)' });
      return;
    }

    const titleSplit = new SplitType('#macros .section-title', { types: 'lines,words' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#macros',
        start: 'top 80%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to('#macros .section-number', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .from(titleSplit.lines, {
        y: '100%', opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      }, '-=0.3')
      .to('#macros .macros-sub', {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      }, '-=0.4')
      .to('.macro-item', {
        opacity: 1, y: 0, duration: 0.6, stagger: { amount: 0.8, from: 'random' }, ease: 'power3.out',
      }, '-=0.3');

    // Step images reveal alongside their steps
    gsap.utils.toArray('.step-image').forEach((img) => {
      gsap.to(img, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: img.closest('.process-step'),
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }

  // ---- TRANSFORMATION ----
  function animateTransformation() {
    if (prefersReducedMotion) {
      gsap.set('.transform-pair', { opacity: 1, y: 0 });
      gsap.set('#transformation .section-number, #transformation .transform-sub', { opacity: 1, y: 0 });
      gsap.set('#transformation .section-title', { clipPath: 'inset(0 0% 0 0)' });
      return;
    }

    const titleSplit = new SplitType('#transformation .section-title', { types: 'lines,words' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#transformation',
        start: 'top 80%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to('#transformation .section-number', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .from(titleSplit.lines, {
        y: '100%', opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      }, '-=0.3')
      .to('#transformation .transform-sub', {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      }, '-=0.4')
      .to('.transform-pair', {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
      }, '-=0.3');

    // Before/after images clip-path reveal
    gsap.utils.toArray('.transform-before, .transform-after').forEach((el) => {
      gsap.from(el, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }

  // ---- MEASUREMENTS ----
  function animateMeasurements() {
    if (prefersReducedMotion) {
      gsap.set('#measurements .section-number, #measurements .measurements-desc, .measurement-card', { opacity: 1, y: 0 });
      gsap.set('#measurements .section-title', { clipPath: 'inset(0 0% 0 0)' });
      return;
    }

    const titleSplit = new SplitType('#measurements .section-title', { types: 'lines,words' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#measurements',
        start: 'top 80%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    // Cards emerge like product reveals
    tl.to('#measurements .section-number', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .from(titleSplit.lines, {
        y: '100%', opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      }, '-=0.3')
      .from('#measurements .measurements-desc', {
        opacity: 0, y: 20, duration: 0.7, ease: 'power2.out',
      }, '-=0.4')
      .from('.measurement-card', {
        opacity: 0, y: 40, scale: 0.97, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      }, '-=0.3');
  }

  // ---- CONTACT ----
  function animateContact() {
    if (prefersReducedMotion) {
      gsap.set('#contact .section-number, #contact .contact-details, #contact .form-group', { opacity: 1, y: 0 });
      gsap.set('#contact .section-title', { clipPath: 'inset(0 0% 0 0)' });
      return;
    }

    const titleSplit = new SplitType('#contact .section-title', { types: 'lines,words' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    // Form elements cascade in — invitation per Section XXVII
    tl.to('#contact .section-number', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .from(titleSplit.lines, {
        y: '100%', opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      }, '-=0.3')
      .from('#contact .contact-details', {
        opacity: 0, y: 20, duration: 0.7, ease: 'power2.out',
      }, '-=0.4')
      .from('#contact .form-group', {
        opacity: 0, y: 15, duration: 0.5, stagger: 0.1, ease: 'power2.out',
      }, '-=0.3');
  }

  // ---- NAVIGATION ----
  function initNav() {
    const navIndicator = document.getElementById('nav-indicator');
    const navScramble = document.getElementById('navScramble');
    const navDropdown = document.getElementById('navDropdown');
    const navLabel = navScramble.querySelector('.nav-label');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = ['HOME', 'PHILOSOPHY', 'PROCESS', 'PORTFOLIO', 'MEASUREMENTS', 'CONTACT'];
    const sectionIds = ['hero', 'philosophy', 'process', 'gallery', 'measurements', 'contact'];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
    let currentSectionIndex = 0;

    // Scramble text effect
    function scrambleTo(text, el) {
      const original = text;
      let iteration = 0;
      const maxIterations = original.length * 3;

      const interval = setInterval(() => {
        el.textContent = original
          .split('')
          .map((char, i) => {
            if (i < iteration / 3) return char[i] || char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        iteration++;
        if (iteration > maxIterations) {
          clearInterval(interval);
          el.textContent = original;
        }
      }, 30);
    }

    // Track scroll position to determine section
    sectionIds.forEach((id, index) => {
      ScrollTrigger.create({
        trigger: '#' + id,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          if (currentSectionIndex !== index) {
            currentSectionIndex = index;
            scrambleTo(sections[index], navLabel);
          }
        },
        onEnterBack: () => {
          if (currentSectionIndex !== index) {
            currentSectionIndex = index;
            scrambleTo(sections[index], navLabel);
          }
        },
      });
    });

    // Hover dropdown
    navScramble.addEventListener('mouseenter', () => {
      navDropdown.classList.add('active');
    });

    navIndicator.addEventListener('mouseleave', () => {
      navDropdown.classList.remove('active');
    });

    // Nav link clicks
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        lenis.scrollTo(target);
        navDropdown.classList.remove('active');
      });
    });
  }

  // ---- SIGNATURE CUT LINE ----
  function initCutLine() {
    const cutPath = document.getElementById('cutPath');
    const cutLine = document.getElementById('cutLine');

    gsap.to(cutPath, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 },
    });

    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (self.direction === 1 && self.progress > 0.05) {
          cutLine.classList.add('cut-line-active');
        } else {
          cutLine.classList.remove('cut-line-active');
        }
      },
    });
  }

  // ---- CUSTOM CURSOR — Signature interaction ----
  function initCursor() {
    if (prefersReducedMotion || 'ontouchstart' in window) return;

    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateCursor() {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    // Hover states for interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .nav-scramble, .filter-btn, .gallery-slide');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // Drag state for gallery
    const galleryWrapper = document.getElementById('galleryWrapper');
    if (galleryWrapper) {
      galleryWrapper.addEventListener('mousedown', () => cursor.classList.add('dragging'));
      galleryWrapper.addEventListener('mouseup', () => cursor.classList.remove('dragging'));
    }
  }

  // ---- SECTION ZOOM TRANSITION ----
  // Narrative-driven: each section breathes into view with unique rhythm
  function initSectionZoom() {
    if (prefersReducedMotion) return;

    const sections = gsap.utils.toArray('.pinned-section');

    sections.forEach((section, i) => {
      if (i === 0) return;

      const rotations = [0.5, -0.3, 0.2, -0.4, 0.15];
      const rotation = rotations[i % rotations.length];

      gsap.fromTo(
        section,
        { y: 60, opacity: 0, rotateX: rotation },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1,
          },
        }
      );
    });
  }
})();

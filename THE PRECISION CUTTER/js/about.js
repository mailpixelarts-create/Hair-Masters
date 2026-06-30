/* ============================================
   THE PRECISION CUTTER — ABOUT PAGE JS
   Bauhaus Geometry. Every Millimeter Matters.
   ============================================ */

(function () {
  'use strict';

  // ---- REDUCED MOTION / MOBILE DETECT ----
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  // ---- LENIS SMOOTH SCROLL ----
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

  // ---- PRELOADER ----
  const preloaderTL = gsap.timeline({
    onComplete: () => {
      document.getElementById('preloader').style.pointerEvents = 'none';
      initPageAnimations();
    },
  });

  preloaderTL
    .to('.preloader-shape', { opacity: 1, duration: 0.3, stagger: 0.1 })
    .from('.shape-1', { rotation: -45, scale: 0.5, duration: 1.2, ease: 'power3.inOut' })
    .from('.shape-2', { x: 100, rotation: 90, scale: 0.5, duration: 1.2, ease: 'power3.inOut' }, '<0.15')
    .from('.shape-3', { y: -80, rotation: -90, scale: 0.5, duration: 1.2, ease: 'power3.inOut' }, '<0.1')
    .to('.shape-1', { x: -250, y: -150, rotation: 180, opacity: 0, duration: 0.8, ease: 'power2.in' }, '+=0.3')
    .to('.shape-2', { x: 200, y: 100, rotation: -180, opacity: 0, duration: 0.8, ease: 'power2.in' }, '<0.05')
    .to('.shape-3', { x: -100, y: 200, rotation: 270, opacity: 0, duration: 0.8, ease: 'power2.in' }, '<0.05')
    .to('#preloader', { opacity: 0, duration: 0.5, ease: 'power2.in' });

  // ---- PAGE ANIMATIONS ----
  function initPageAnimations() {
    animateHero();
    animateBio();
    animateApproach();
    initNav();
    initCutLine();
    initSectionZoom();
    initCursor();
  }

  // ---- HERO ----
  function animateHero() {
    const heroTitleSplits = [];
    document.querySelectorAll('#about-hero .line').forEach((line) => {
      const split = new SplitType(line, { types: 'words' });
      heroTitleSplits.push(split);
    });

    if (prefersReducedMotion) {
      heroTitleSplits.forEach((s) => gsap.set(s.words, { y: '0%' }));
      gsap.set('#about-hero .section-number, #about-hero .about-hero-sub', { opacity: 1, y: 0 });
      return;
    }

    heroTitleSplits.forEach((split, i) => {
      gsap.to(split.words, {
        y: '0%', duration: 1, stagger: 0.06, delay: 0.3 + i * 0.2, ease: 'power3.out',
      });
    });

    gsap.to('#about-hero .section-number', { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'power2.out' });
    gsap.to('#about-hero .about-hero-sub', { opacity: 1, y: 0, duration: 0.8, delay: 1.1, ease: 'power2.out' });
  }

  // ---- BIO ----
  function animateBio() {
    if (prefersReducedMotion) {
      gsap.set('#about-bio .section-number, #about-bio .about-bio-text p', { opacity: 1, y: 0 });
      gsap.set('#about-bio .section-title', { clipPath: 'inset(0 0% 0 0)' });
      gsap.set('#about-bio .about-image-frame', { clipPath: 'inset(0% 0 0 0)' });
      gsap.set('#about-bio .frame-corner', { scale: 1, opacity: 1 });
      return;
    }

    const titleSplit = new SplitType('#about-bio .section-title', { types: 'lines,words' });
    const textSplit = new SplitType('#about-bio .about-bio-text', { types: 'lines' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about-bio',
        start: 'top 80%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to('#about-bio .section-number', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .from(titleSplit.lines, { y: '100%', opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, '-=0.3')
      .from(textSplit.lines, { y: 20, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' }, '-=0.4')
      .to('#about-bio .about-image-frame', { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power3.inOut' }, '-=1')
      .to('#about-bio .frame-corner', { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(2)' }, '-=0.5');
  }

  // ---- APPROACH ----
  function animateApproach() {
    if (prefersReducedMotion) {
      gsap.set('#about-approach .section-number, .approach-card', { opacity: 1, y: 0 });
      gsap.set('#about-approach .section-title', { clipPath: 'inset(0 0% 0 0)' });
      gsap.set('.approach-line', { width: '100%' });
      return;
    }

    const titleSplit = new SplitType('#about-approach .section-title', { types: 'lines,words' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about-approach',
        start: 'top 80%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to('#about-approach .section-number', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .from(titleSplit.lines, { y: '100%', opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, '-=0.3')
      .from('.approach-card', { opacity: 0, x: -30, duration: 0.7, stagger: 0.15, ease: 'power3.out' }, '-=0.4')
      .to('.approach-line', { width: '100%', duration: 0.8, stagger: 0.15, ease: 'power2.inOut' }, '-=0.8');
  }

  // ---- NAVIGATION ----
  function initNav() {
    const navScramble = document.getElementById('navScramble');
    const navDropdown = document.getElementById('navDropdown');
    const navLabel = navScramble.querySelector('.nav-label');
    const sections = ['ABOUT', 'BIO', 'APPROACH', 'CONTACT'];
    const sectionIds = ['about-hero', 'about-bio', 'about-approach', 'about-contact'];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
    let currentSectionIndex = 0;

    function scrambleTo(text, el) {
      const original = text;
      let iteration = 0;
      const maxIterations = original.length * 3;
      const interval = setInterval(() => {
        el.textContent = original
          .split('')
          .map((char, i) => {
            if (i < iteration / 3) return char;
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

    navScramble.addEventListener('mouseenter', () => navDropdown.classList.add('active'));
    document.getElementById('nav-indicator').addEventListener('mouseleave', () => navDropdown.classList.remove('active'));

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        lenis.scrollTo(link.getAttribute('href'));
        navDropdown.classList.remove('active');
      });
    });
  }

  // ---- SIGNATURE CUT LINE ----
  function initCutLine() {
    const cutPath = document.getElementById('cutPath');
    gsap.to(cutPath, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 },
    });
  }

  // ---- CUSTOM CURSOR ----
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

    const hoverTargets = document.querySelectorAll('a, button, .nav-scramble');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }

  // ---- SECTION ZOOM ----
  function initSectionZoom() {
    if (prefersReducedMotion) return;

    gsap.utils.toArray('.pinned-section').forEach((section, i) => {
      if (i === 0) return;
      const rotations = [0.5, -0.3, 0.2];
      const rotation = rotations[i % rotations.length];

      gsap.fromTo(section,
        { y: 60, opacity: 0, rotateX: rotation },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 35%', scrub: 1 },
        }
      );
    });
  }
})();

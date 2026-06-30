/* ============================================
   THE RED CARPET DIRECTOR — Main Script
   World 08 | Cinematic Hair Artistry
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // CONFIG
  // ============================================

  const CONFIG = {
    scrollDebounce: 500,
    spotlightOffset: 80,
    parallaxEnabled: true,
    lenisDuration: 1.2,
    lenisEasing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  };

  // ============================================
  // STATE
  // ============================================

  const state = {
    isLoaded: false,
    isScrolling: false,
    scrollTimer: null,
    currentScene: 0,
    spotlightActive: false,
  };

  // ============================================
  // DOM CACHE
  // ============================================

  const dom = {
    preloader: document.getElementById('preloader'),
    preloaderEnter: document.getElementById('preloaderEnter'),
    nav: document.getElementById('mainNav'),
    navItems: document.querySelectorAll('.nav-bar__item'),
    spotlight: document.getElementById('spotlight'),
    filmstrip: document.getElementById('filmstrip'),
    filmstripTrack: document.querySelector('.filmstrip__track'),
    lightbox: document.getElementById('lightbox'),
    lightboxImg: document.getElementById('lightboxImg'),
    lightboxClose: document.getElementById('lightboxClose'),
    scenes: document.querySelectorAll('.scene'),
    parallaxContainer: document.getElementById('parallaxContainer'),
  };

  // ============================================
  // LENIS SMOOTH SCROLL
  // ============================================

  let lenis;

  function initLenis() {
    lenis = new Lenis({
      duration: CONFIG.lenisDuration,
      easing: CONFIG.lenisEasing,
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // ============================================
  // PRELOADER
  // ============================================

  function initPreloader() {
    if (!dom.preloaderEnter) return;

    dom.preloaderEnter.addEventListener('click', exitPreloader);
  }

  function exitPreloader() {
    const preloader = dom.preloader;

    // Trigger color crossfade on video
    const video = preloader.querySelector('.preloader__video');
    if (video) {
      preloader.classList.add('is-colorizing');
    }

    // Exit gate after color fade
    setTimeout(() => {
      preloader.classList.add('is-exiting');
      state.isLoaded = true;

      // Initialize all systems after preloader exits
      setTimeout(() => {
        preloader.style.display = 'none';
        initScrollAnimations();
        initNav();
        initSpotlight();
        revealFirstScene();
      }, 1200);
    }, 800);
  }

  // ============================================
  // NAVIGATION
  // ============================================

  function initNav() {
    // Click handlers
    dom.navItems.forEach((item) => {
      item.addEventListener('click', () => {
        const targetId = item.dataset.target;
        const targetEl = document.getElementById(targetId);
        if (targetEl && lenis) {
          lenis.scrollTo(targetEl, { offset: 0 });
        }
      });
    });

    // Scroll show/hide with debounce
    window.addEventListener('scroll', handleNavScroll, { passive: true });
  }

  function handleNavScroll() {
    state.isScrolling = true;
    dom.nav.classList.add('is-hidden');

    clearTimeout(state.scrollTimer);
    state.scrollTimer = setTimeout(() => {
      state.isScrolling = false;
      dom.nav.classList.remove('is-hidden');
    }, CONFIG.scrollDebounce);
  }

  function updateActiveNav(index) {
    dom.navItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  // ============================================
  // SPOTLIGHT EFFECT
  // ============================================

  function initSpotlight() {
    window.addEventListener('mousemove', handleSpotlightMove, { passive: true });

    ScrollTrigger.create({
      trigger: dom.parallaxContainer,
      start: 'top top',
      end: 'bottom bottom',
      onEnter: () => { state.spotlightActive = true; dom.spotlight.classList.add('is-active'); },
      onLeave: () => { state.spotlightActive = false; dom.spotlight.classList.remove('is-active'); },
      onEnterBack: () => { state.spotlightActive = true; dom.spotlight.classList.add('is-active'); },
      onLeaveBack: () => { state.spotlightActive = false; dom.spotlight.classList.remove('is-active'); },
    });
  }

  function handleSpotlightMove(e) {
    if (!state.spotlightActive) return;

    const x = ((e.clientX / window.innerWidth) * 100).toFixed(1);
    const y = ((e.clientY / window.innerHeight) * 100).toFixed(1);

    dom.spotlight.style.setProperty('--spot-x', x + '%');
    dom.spotlight.style.setProperty('--spot-y', y + '%');
  }

  // ============================================
  // SCROLL-TRIGGERED ANIMATIONS
  // ============================================

  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax layers
    if (CONFIG.parallaxEnabled) {
      dom.scenes.forEach((scene) => {
        const speed = parseFloat(scene.dataset.speed) || 0.5;
        const bgLayer = scene.querySelector('.scene__parallax-layer--bg');
        const midLayer = scene.querySelector('.scene__parallax-layer--mid');

        if (bgLayer) {
          gsap.to(bgLayer, {
            yPercent: -20 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: scene,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }

        if (midLayer) {
          gsap.to(midLayer, {
            yPercent: -5 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: scene,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });
        }
      });
    }

    // Scene entrances — cinematic transitions
    dom.scenes.forEach((scene, index) => {
      const elements = scene.querySelectorAll(
        '.scene__label, .scene__title, .scene__divider, .scene__tagline, .scene__description, ' +
        '.scene__film-frame, .scene__transform-card, .scene__craft-item, ' +
        '.scene__premiere-item, .scene__credits-col, .scene__cta, .scene__quote'
      );

      const transitionTypes = ['cut', 'dissolve', 'fade'];
      const transitionType = transitionTypes[index % transitionTypes.length];

      ScrollTrigger.create({
        trigger: scene,
        start: 'top 75%',
        end: 'top 20%',
        onEnter: () => {
          scene.classList.add(`scene--${transitionType}-entering`);
          scene.classList.add('is-current');

          // Staggered element reveals
          elements.forEach((el, i) => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay: i * 0.12,
              ease: 'power3.out',
              onComplete: () => el.classList.add('revealed'),
            });
          });

          updateActiveNav(index);
        },
        onLeaveBack: () => {
          scene.classList.remove('is-current');
        },
      });
    });

    // Filmstrip gallery entrance
    initFilmstripAnimations();
  }

  // ============================================
  // FILMSTRIP GALLERY
  // ============================================

  function initFilmstripAnimations() {
    const items = document.querySelectorAll('.filmstrip__item');
    const filmstripEl = dom.filmstrip;

    if (!filmstripEl || !items.length) return;

    // Reveal items on scroll
    ScrollTrigger.create({
      trigger: filmstripEl,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        items.forEach((item) => item.classList.add('revealed'));
      },
    });

    // Drag to scroll
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    filmstripEl.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - filmstripEl.offsetLeft;
      scrollLeft = filmstripEl.scrollLeft;
      filmstripEl.style.cursor = 'grabbing';
    });

    filmstripEl.addEventListener('mouseleave', () => {
      isDragging = false;
      filmstripEl.style.cursor = 'grab';
    });

    filmstripEl.addEventListener('mouseup', () => {
      isDragging = false;
      filmstripEl.style.cursor = 'grab';
    });

    filmstripEl.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - filmstripEl.offsetLeft;
      const walk = (x - startX) * 1.5;
      filmstripEl.scrollLeft = scrollLeft - walk;
    });

    // Click to open lightbox
    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (isDragging) return;
        const img = item.querySelector('.filmstrip__img');
        if (img) {
          openLightbox(img.src);
        }
      });
    });
  }

  // ============================================
  // LIGHTBOX
  // ============================================

  function openLightbox(src) {
    dom.lightboxImg.src = src;
    dom.lightbox.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    dom.lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
    setTimeout(() => {
      dom.lightboxImg.src = '';
    }, 500);
  }

  function initLightbox() {
    if (!dom.lightbox) return;

    dom.lightboxClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });

    dom.lightbox.addEventListener('click', (e) => {
      if (e.target === dom.lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dom.lightbox.classList.contains('is-active')) {
        closeLightbox();
      }
    });
  }

  // ============================================
  // FIRST SCENE REVEAL
  // ============================================

  function revealFirstScene() {
    const firstScene = dom.scenes[0];
    if (!firstScene) return;

    firstScene.classList.add('scene--cut-entering', 'is-current');

    const elements = firstScene.querySelectorAll(
      '.scene__label, .scene__title, .scene__divider, .scene__tagline, .scene__description'
    );

    elements.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2 + i * 0.15,
        ease: 'power3.out',
        onComplete: () => el.classList.add('revealed'),
      });
    });

    // Title character animation
    const heroTitle = firstScene.querySelector('.scene__title--hero');
    if (heroTitle && typeof SplitType !== 'undefined') {
      const split = new SplitType(heroTitle, { types: 'chars' });
      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        delay: 0.5,
        ease: 'power3.out',
      });
    }

    updateActiveNav(0);
  }

  // ============================================
  // INIT
  // ============================================

  function init() {
    initLenis();
    initPreloader();
    initLightbox();

    // If preloader somehow missed, allow keyboard skip
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !state.isLoaded) {
        exitPreloader();
      }
    });
  }

  // Wait for DOM + assets
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

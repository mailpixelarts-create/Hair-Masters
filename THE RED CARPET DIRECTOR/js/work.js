/* ============================================
   THE RED CARPET DIRECTOR — Work Page Script
   World 08 | Cinematic Hair Artistry
   ============================================ */

(function () {
  'use strict';

  const CONFIG = {
    lenisDuration: 1.2,
    lenisEasing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  };

  const state = {
    isLoaded: false,
    activeFilter: 'all',
  };

  const dom = {
    preloader: document.getElementById('preloader'),
    preloaderEnter: document.getElementById('preloaderEnter'),
    nav: document.getElementById('mainNav'),
    filmstrip: document.getElementById('filmstrip'),
    filmstripTrack: document.querySelector('.filmstrip__track'),
    lightbox: document.getElementById('lightbox'),
    lightboxImg: document.getElementById('lightboxImg'),
    lightboxClose: document.getElementById('lightboxClose'),
    filterBtns: document.querySelectorAll('.work-filters__btn'),
    items: document.querySelectorAll('.filmstrip__item'),
  };

  // LENIS
  let lenis;

  function initLenis() {
    lenis = new Lenis({
      duration: CONFIG.lenisDuration,
      easing: CONFIG.lenisEasing,
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // PRELOADER
  function initPreloader() {
    if (!dom.preloaderEnter) return;
    dom.preloaderEnter.addEventListener('click', exitPreloader);
  }

  function exitPreloader() {
    dom.preloader.classList.add('is-exiting');
    state.isLoaded = true;

    setTimeout(() => {
      dom.preloader.style.display = 'none';
      initScrollAnimations();
      initFilmstrip();
      initFilter();
      revealHero();
    }, 1200);
  }

  // HERO REVEAL
  function revealHero() {
    const hero = document.querySelector('.work-hero__content');
    if (!hero) return;

    const elements = hero.querySelectorAll('.work-hero__label, .work-hero__title, .work-hero__divider, .work-hero__tagline');
    elements.forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3 + i * 0.2,
        ease: 'power3.out',
      });
    });
  }

  // SCROLL ANIMATIONS
  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Filter bar reveal
    const filterBar = document.querySelector('.work-filters');
    if (filterBar) {
      gsap.from(filterBar, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: filterBar,
          start: 'top 90%',
        },
      });
    }
  }

  // FILMSTRIP
  function initFilmstrip() {
    const filmstripEl = dom.filmstrip;
    if (!filmstripEl) return;

    // Reveal items
    gsap.from(dom.items, {
      opacity: 0,
      y: 30,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: filmstripEl,
        start: 'top 80%',
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
    dom.items.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (isDragging) return;
        const img = item.querySelector('.filmstrip__img');
        if (img) openLightbox(img.src);
      });
    });
  }

  // FILTER
  function initFilter() {
    dom.filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        if (filter === state.activeFilter) return;

        state.activeFilter = filter;

        // Update active button
        dom.filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Animate items
        dom.items.forEach((item) => {
          const category = item.dataset.category;
          const show = filter === 'all' || category === filter;

          gsap.to(item, {
            opacity: show ? 1 : 0.15,
            scale: show ? 1 : 0.95,
            filter: show ? 'none' : 'grayscale(0.8)',
            duration: 0.5,
            ease: 'power2.inOut',
          });

          if (!show) {
            item.style.pointerEvents = 'none';
          } else {
            item.style.pointerEvents = '';
          }
        });
      });
    });
  }

  // LIGHTBOX
  function openLightbox(src) {
    dom.lightboxImg.src = src;
    dom.lightbox.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    dom.lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
    setTimeout(() => { dom.lightboxImg.src = ''; }, 500);
  }

  function initLightbox() {
    if (!dom.lightbox) return;

    dom.lightboxClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });

    dom.lightbox.addEventListener('click', (e) => {
      if (e.target === dom.lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dom.lightbox.classList.contains('is-active')) {
        closeLightbox();
      }
    });
  }

  // INIT
  function init() {
    initLenis();
    initPreloader();
    initLightbox();

    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !state.isLoaded) {
        exitPreloader();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

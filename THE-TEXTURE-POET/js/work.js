/* ============================================
   THE TEXTURE POET — Work Page JavaScript
   GSAP + ScrollTrigger + Lenis + Lookbook
   ============================================ */

(function () {
  'use strict';

  /* --- STATE --- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const state = {
    preloaderDone: false,
    menuOpen: false,
    currentSlide: 0,
    totalSlides: 0,
    visibleSlides: [],
    currentFilter: 'all',
    dragStart: 0,
    dragDelta: 0,
    isDragging: false,
  };

  /* --- DOM REFS --- */
  const dom = {
    preloader: document.getElementById('preloader'),
    menuToggle: document.querySelector('.header__brand'),
    menuClose: document.getElementById('menuClose'),
    editorialMenu: document.getElementById('editorialMenu'),
    galleryTrack: document.getElementById('workGalleryTrack'),
    galleryProgress: document.getElementById('galleryProgress'),
    slideCurrent: document.getElementById('slideCurrent'),
    slideTotal: document.getElementById('slideTotal'),
    galleryPrev: document.getElementById('galleryPrev'),
    galleryNext: document.getElementById('galleryNext'),
    filterBtns: document.querySelectorAll('.work-filter__btn'),
  };

  /* --- INIT --- */
  function init() {
    runPreloader();
    setupLenis();
    setupMenu();
    setupFilter();
    setupGallery();
    updateVisibleSlides();
  }

  /* --- PRELOADER --- */
  function runPreloader() {
    const tl = gsap.timeline({
      onComplete: () => {
        state.preloaderDone = true;
        dom.preloader.classList.add('is-exiting');
        setTimeout(() => {
          dom.preloader.style.display = 'none';
          revealHero();
          activateFirstSlide();
        }, 1200);
      }
    });

    tl.to('.preloader__brand', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.3
    })
    .to('.preloader__tagline', {
      opacity: 0.7,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=1')
    .to('.preloader__gradient', {
      backgroundPosition: '100% 100%',
      filter: 'brightness(1)',
      duration: 3.5,
      ease: 'power2.inOut'
    }, 0)
    .to('.preloader__texture', {
      opacity: 0.15,
      scale: 1,
      duration: 3,
      ease: 'power2.out'
    }, 0.5)
    .to({}, { duration: 1.5 });
  }

  function revealHero() {
    const heroContent = document.querySelector('.work-hero__content');
    if (!heroContent) return;

    gsap.fromTo(heroContent.children, {
      opacity: 0,
      y: 40,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
    });
  }

  function activateFirstSlide() {
    if (state.visibleSlides.length > 0) {
      state.visibleSlides[0].classList.add('is-active');
      updateCounter();
      updateProgress();
    }
  }

  /* --- LENIS SMOOTH SCROLL --- */
  let lenis;

  function setupLenis() {
    lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      smoothWheel: !prefersReducedMotion,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  /* --- MENU --- */
  function setupMenu() {
    if (dom.menuToggle) dom.menuToggle.addEventListener('click', openMenu);
    if (dom.menuClose) dom.menuClose.addEventListener('click', closeMenu);

    document.querySelectorAll('.editorial-menu__item').forEach((item) => {
      item.addEventListener('click', closeMenu);
    });
  }

  function openMenu() {
    state.menuOpen = true;
    dom.editorialMenu.classList.add('is-open');
    if (lenis) lenis.stop();

    gsap.fromTo('.editorial-menu__item', {
      opacity: 0,
      y: 40,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.2,
    });
  }

  function closeMenu() {
    state.menuOpen = false;
    if (lenis) lenis.start();
    dom.editorialMenu.classList.remove('is-open');
  }

  /* --- FILTER --- */
  function setupFilter() {
    dom.filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        if (filter === state.currentFilter) return;

        dom.filterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.currentFilter = filter;

        state.currentSlide = 0;
        updateVisibleSlides();
        resetGallery();
      });
    });
  }

  function updateVisibleSlides() {
    const allSlides = document.querySelectorAll('.work-gallery__slide');
    state.visibleSlides = [];

    allSlides.forEach((slide) => {
      const cat = slide.dataset.category;
      if (state.currentFilter === 'all' || cat === state.currentFilter) {
        slide.classList.remove('is-hidden');
        state.visibleSlides.push(slide);
      } else {
        slide.classList.add('is-hidden');
        slide.classList.remove('is-active');
      }
    });

    state.totalSlides = state.visibleSlides.length;
    if (dom.slideTotal) dom.slideTotal.textContent = String(state.totalSlides).padStart(2, '0');

    if (state.visibleSlides.length > 0) {
      state.visibleSlides[0].classList.add('is-active');
    }
  }

  /* --- GALLERY --- */
  function setupGallery() {
    dom.galleryPrev.addEventListener('click', prevSlide);
    dom.galleryNext.addEventListener('click', nextSlide);

    /* drag/swipe */
    dom.galleryTrack.addEventListener('mousedown', dragStart);
    dom.galleryTrack.addEventListener('mousemove', dragMove);
    dom.galleryTrack.addEventListener('mouseup', dragEnd);
    dom.galleryTrack.addEventListener('mouseleave', dragEnd);

    dom.galleryTrack.addEventListener('touchstart', dragStart, { passive: true });
    dom.galleryTrack.addEventListener('touchmove', dragMove, { passive: true });
    dom.galleryTrack.addEventListener('touchend', dragEnd);

    updateProgress();
    updateCounter();
  }

  function prevSlide() {
    if (state.currentSlide > 0) {
      goToSlide(state.currentSlide - 1);
    }
  }

  function nextSlide() {
    if (state.currentSlide < state.visibleSlides.length - 1) {
      goToSlide(state.currentSlide + 1);
    }
  }

  function goToSlide(index) {
    state.visibleSlides.forEach((s) => s.classList.remove('is-active'));
    state.currentSlide = index;
    state.visibleSlides[index].classList.add('is-active');

    const offset = -(index * window.innerWidth);
    dom.galleryTrack.style.transform = `translateX(${offset}px)`;

    /* parallax on active image */
    const img = state.visibleSlides[index].querySelector('.work-gallery__img');
    gsap.fromTo(img, {
      scale: 1.08,
      y: -15,
    }, {
      scale: 1.04,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    });

    updateProgress();
    updateCounter();
  }

  function resetGallery() {
    dom.galleryTrack.style.transition = 'none';
    dom.galleryTrack.style.transform = 'translateX(0)';

    state.visibleSlides.forEach((s) => s.classList.remove('is-active'));
    if (state.visibleSlides.length > 0) {
      state.visibleSlides[0].classList.add('is-active');
    }

    updateProgress();
    updateCounter();

    requestAnimationFrame(() => {
      dom.galleryTrack.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  }

  function updateProgress() {
    const progress = state.visibleSlides.length > 0
      ? ((state.currentSlide + 1) / state.visibleSlides.length) * 100
      : 0;
    dom.galleryProgress.style.width = progress + '%';
  }

  function updateCounter() {
    if (dom.slideCurrent) {
      dom.slideCurrent.textContent = String(state.currentSlide + 1).padStart(2, '0');
    }
  }

  /* --- DRAG --- */
  function dragStart(e) {
    state.isDragging = true;
    state.dragStart = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    state.dragDelta = 0;
    dom.galleryTrack.style.transition = 'none';
  }

  function dragMove(e) {
    if (!state.isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    state.dragDelta = clientX - state.dragStart;
    const offset = -(state.currentSlide * window.innerWidth) + state.dragDelta;
    dom.galleryTrack.style.transform = `translateX(${offset}px)`;
  }

  function dragEnd() {
    if (!state.isDragging) return;
    state.isDragging = false;
    dom.galleryTrack.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    const threshold = window.innerWidth * 0.15;

    if (state.dragDelta < -threshold && state.currentSlide < state.visibleSlides.length - 1) {
      state.currentSlide++;
    } else if (state.dragDelta > threshold && state.currentSlide > 0) {
      state.currentSlide--;
    }

    goToSlide(state.currentSlide);
  }

  /* --- KEYBOARD NAV --- */
  document.addEventListener('keydown', (e) => {
    if (state.menuOpen && e.key === 'Escape') {
      closeMenu();
      return;
    }

    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  /* --- RESIZE --- */
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      goToSlide(state.currentSlide);
    }, 250);
  });

  /* --- BOOT --- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

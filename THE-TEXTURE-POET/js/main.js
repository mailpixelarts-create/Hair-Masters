/* ============================================
   THE TEXTURE POET — Main JavaScript
   GSAP + ScrollTrigger + Lenis + Curl Ripple
   Vertical cinematic scroll system.
   ============================================ */

(function () {
  'use strict';

  /* --- STATE --- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const state = {
    preloaderDone: false,
    menuOpen: false,
    galleryOpen: false,
    currentGallerySlide: 0,
    totalGallerySlides: 0,
    galleryDragStart: 0,
    galleryDragDelta: 0,
    isDragging: false,
  };

  /* --- DOM REFS --- */
  const dom = {
    preloader: document.getElementById('preloader'),
    menuToggle: document.getElementById('menuToggle'),
    menuClose: document.getElementById('menuClose'),
    editorialMenu: document.getElementById('editorialMenu'),
    scenes: null,
    gallery: document.getElementById('lookbookGallery'),
    galleryTrack: document.getElementById('galleryTrack'),
    galleryProgress: document.getElementById('galleryProgress'),
    openGallery: document.getElementById('openGallery'),
    closeGallery: document.getElementById('closeGallery'),
    scrollFill: document.getElementById('scrollFill'),
    scrollCue: document.getElementById('scrollCue'),
    curlRipples: null,
  };

  /* --- INIT --- */
  function init() {
    dom.scenes = document.querySelectorAll('.scene');
    dom.curlRipples = document.querySelectorAll('.curl-ripple');
    dom.totalGallerySlides = document.querySelectorAll('.gallery__slide').length;

    runPreloader();
    setupLenis();
    setupVerticalScroll();
    setupMenu();
    setupGallery();
    setupCurlRipple();
    setupButtonTracking();
    setupParticles();
    setupThreadQuoteReveals();
  }

  /* --- PRELOADER --- */
  function runPreloader() {
    /* Counter animation 0-100 */
    const counterEl = document.createElement('span');
    counterEl.className = 'preloader__count';
    counterEl.textContent = '0';
    dom.preloader.querySelector('.preloader__content').appendChild(counterEl);

    const tl = gsap.timeline({
      onComplete: () => {
        state.preloaderDone = true;
        dom.preloader.classList.add('is-exiting');
        setTimeout(() => {
          dom.preloader.style.display = 'none';
          revealFirstScene();
        }, 1200);
      }
    });

    /* Count from 0 to 100 */
    const countObj = { val: 0 };
    tl.to(countObj, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate() {
        counterEl.textContent = Math.round(countObj.val);
      }
    })
    .to('.preloader__brand', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.3
    }, 0)
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
    .to({}, { duration: 1 });
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

  /* --- VERTICAL SCROLL (Scene Reveals) --- */
  function setupVerticalScroll() {
    /* Progress bar */
    if (dom.scrollFill) {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          dom.scrollFill.style.width = (self.progress * 100) + '%';
        },
      });
    }

    /* Each scene: parallax background + reveal children */
    dom.scenes.forEach((scene, i) => {
      const bgImg = scene.querySelector('.scene__bg-img');

      /* Background parallax on scroll */
      if (bgImg) {
        gsap.fromTo(bgImg, {
          yPercent: -10,
        }, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: scene,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      /* Scene content reveal on enter */
      ScrollTrigger.create({
        trigger: scene,
        start: 'top 75%',
        onEnter: () => scene.classList.add('is-inview'),
        onLeaveBack: () => scene.classList.remove('is-inview'),
      });

      /* Staggered text reveals within each scene */
      const textElements = scene.querySelectorAll('.scene__title > div > span, .scene__body, .scene__sub, .scene__label, .scene__number, .scene__line, .scene__cta');
      if (textElements.length > 0 && i > 0) {
        gsap.fromTo(textElements, {
          opacity: 0,
          y: 30,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scene,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });

    /* Hide scroll cue after first scroll */
    if (dom.scrollCue) {
      ScrollTrigger.create({
        trigger: dom.scenes[0],
        start: 'top top-=100',
        onEnter: () => dom.scrollCue.style.opacity = '0',
        onLeaveBack: () => dom.scrollCue.style.opacity = '1',
      });
    }
  }

  function revealFirstScene() {
    const first = dom.scenes[0];
    if (first) {
      first.classList.add('is-inview');

      /* Stagger reveal hero text */
      const heroElements = first.querySelectorAll('.scene__title > div > span, .scene__sub, .scene__line');
      if (heroElements.length > 0) {
        gsap.fromTo(heroElements, {
          opacity: 0,
          y: 40,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.3,
        });
      }
    }
  }

  /* --- MENU --- */
  function setupMenu() {
    dom.menuToggle.addEventListener('click', openMenu);
    dom.menuClose.addEventListener('click', closeMenu);

    document.querySelectorAll('.editorial-menu__item').forEach((item) => {
      item.addEventListener('click', () => {
        const sceneIndex = parseInt(item.dataset.scene, 10);
        closeMenu();
        scrollToScene(sceneIndex);
      });
    });
  }

  function openMenu() {
    state.menuOpen = true;
    dom.editorialMenu.classList.add('is-open');
    lenis.stop();

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
    lenis.start();
    dom.editorialMenu.classList.remove('is-open');
  }

  function scrollToScene(index) {
    const scene = dom.scenes[index];
    if (!scene) return;

    const targetY = scene.offsetTop;

    lenis.scrollTo(targetY, {
      duration: 2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  }

  /* --- GALLERY --- */
  function setupGallery() {
    if (!dom.openGallery || !dom.closeGallery) return;

    dom.openGallery.addEventListener('click', openGallery);
    dom.closeGallery.addEventListener('click', closeGallery);

    /* drag/swipe */
    dom.galleryTrack.addEventListener('mousedown', galleryDragStart);
    dom.galleryTrack.addEventListener('mousemove', galleryDragMove);
    dom.galleryTrack.addEventListener('mouseup', galleryDragEnd);
    dom.galleryTrack.addEventListener('mouseleave', galleryDragEnd);

    dom.galleryTrack.addEventListener('touchstart', galleryDragStart, { passive: true });
    dom.galleryTrack.addEventListener('touchmove', galleryDragMove, { passive: true });
    dom.galleryTrack.addEventListener('touchend', galleryDragEnd);

    updateGalleryProgress();
  }

  function openGallery() {
    state.galleryOpen = true;
    state.currentGallerySlide = 0;
    dom.gallery.classList.add('is-open');
    lenis.stop();
    updateGalleryPosition();
  }

  function closeGallery() {
    state.galleryOpen = false;
    dom.gallery.classList.remove('is-open');
    lenis.start();
  }

  function galleryDragStart(e) {
    state.isDragging = true;
    state.galleryDragStart = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    state.galleryDragDelta = 0;
    dom.galleryTrack.style.transition = 'none';
  }

  function galleryDragMove(e) {
    if (!state.isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    state.galleryDragDelta = clientX - state.galleryDragStart;
    const offset = -(state.currentGallerySlide * window.innerWidth) + state.galleryDragDelta;
    dom.galleryTrack.style.transform = `translateX(${offset}px)`;
  }

  function galleryDragEnd() {
    if (!state.isDragging) return;
    state.isDragging = false;
    dom.galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

    const threshold = window.innerWidth * 0.15;

    if (state.galleryDragDelta < -threshold && state.currentGallerySlide < state.totalGallerySlides - 1) {
      state.currentGallerySlide++;
    } else if (state.galleryDragDelta > threshold && state.currentGallerySlide > 0) {
      state.currentGallerySlide--;
    }

    updateGalleryPosition();
  }

  function updateGalleryPosition() {
    const offset = -(state.currentGallerySlide * window.innerWidth);
    dom.galleryTrack.style.transform = `translateX(${offset}px)`;
    updateGalleryProgress();

    /* parallax on current slide image */
    document.querySelectorAll('.gallery__slide').forEach((slide, i) => {
      const img = slide.querySelector('.gallery__img');
      if (i === state.currentGallerySlide) {
        slide.classList.add('is-active');
        gsap.fromTo(img, {
          scale: 1.08,
          y: -20,
        }, {
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        });
      } else {
        slide.classList.remove('is-active');
      }
    });
  }

  function updateGalleryProgress() {
    const progress = ((state.currentGallerySlide + 1) / state.totalGallerySlides) * 100;
    dom.galleryProgress.style.width = progress + '%';
  }

  /* --- CURL RIPPLE --- */
  function setupCurlRipple() {
    dom.curlRipples.forEach((ripple) => {
      const scene = ripple.closest('.scene');
      if (!scene) return;

      /* create rings */
      for (let i = 0; i < 4; i++) {
        const ring = document.createElement('div');
        ring.className = 'ring';
        ripple.appendChild(ring);
      }

      scene.addEventListener('mouseenter', () => triggerRipple(ripple));
      scene.addEventListener('touchstart', () => triggerRipple(ripple), { passive: true });
    });
  }

  function triggerRipple(ripple) {
    ripple.style.opacity = '1';
    ripple.classList.remove('is-active');
    void ripple.offsetWidth;
    ripple.classList.add('is-active');

    /* GSAP radial scale for extra organic feel */
    const rings = ripple.querySelectorAll('.ring');
    rings.forEach((ring, i) => {
      gsap.fromTo(ring, {
        scale: 0,
        opacity: 0.6,
      }, {
        scale: 3 + (i * 0.5),
        opacity: 0,
        duration: 1.8 + (i * 0.15),
        ease: 'power2.out',
        delay: i * 0.12,
      });
    });

    setTimeout(() => {
      ripple.classList.remove('is-active');
    }, 2500);
  }

  /* --- BUTTON MOUSE TRACKING --- */
  function setupButtonTracking() {
    document.querySelectorAll('.scene__cta, .panel__cta').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty('--mouse-x', x + '%');
        btn.style.setProperty('--mouse-y', y + '%');
      });
    });
  }

  /* --- KEYBOARD NAV --- */
  document.addEventListener('keydown', (e) => {
    if (state.galleryOpen) {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight' && state.currentGallerySlide < state.totalGallerySlides - 1) {
        state.currentGallerySlide++;
        dom.galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        updateGalleryPosition();
      }
      if (e.key === 'ArrowLeft' && state.currentGallerySlide > 0) {
        state.currentGallerySlide--;
        dom.galleryTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        updateGalleryPosition();
      }
    }

    if (state.menuOpen && e.key === 'Escape') {
      closeMenu();
    }
  });

  /* --- FLOATING PARTICLES --- */
  function setupParticles() {
    if (prefersReducedMotion) return;

    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 40;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.3 + 0.05;
        this.fadeSpeed = Math.random() * 0.005 + 0.001;
        this.growing = Math.random() > 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 0.35) this.growing = false;
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0.05) this.growing = true;
        }

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 168, 130, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();
  }

  /* --- THREAD QUOTE REVEALS --- */
  function setupThreadQuoteReveals() {
    const quotes = document.querySelectorAll('.thread-quote');

    quotes.forEach((quote) => {
      const text = quote.querySelector('.thread-quote__text');
      const attr = quote.querySelector('.thread-quote__attr');
      const mark = quote.querySelectorAll('.thread-quote__mark');
      const line = quote.querySelector('.thread-quote__line');

      gsap.fromTo(text, {
        opacity: 0,
        y: 30,
      }, {
        opacity: 0.9,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quote,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      if (attr) {
        gsap.fromTo(attr, {
          opacity: 0,
          y: 15,
        }, {
          opacity: 0.5,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: quote,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      mark.forEach((m) => {
        gsap.fromTo(m, {
          opacity: 0,
          scale: 0.8,
        }, {
          opacity: 0.2,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quote,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      if (line) {
        gsap.fromTo(line, {
          scaleX: 0,
        }, {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: quote,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });
  }

  /* --- RESIZE --- */
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
      if (state.galleryOpen) {
        updateGalleryPosition();
      }
    }, 250);
  });

  /* --- BOOT --- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

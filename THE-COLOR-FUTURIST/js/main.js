/* ═══════════════════════════════════════════════════════════════
   THE COLOR FUTURIST — High-Fashion Editorial
   Lenis + SplitType + Cinematic Motion + Tonal Spectrum Explorer
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  const state = {
    currentSection: 0,
    isPreloaderDone: false,
    lenis: null
  };

  const dom = {
    preloader: document.getElementById('preloader'),
    preloaderPercent: document.getElementById('preloader-percent'),
    monoNav: document.getElementById('mono-nav'),
    sections: document.querySelectorAll('.section'),
    navItems: document.querySelectorAll('.mono-nav__item'),
    galleryItems: document.querySelectorAll('.gallery__item'),
    sliders: document.querySelectorAll('.evidence__slider'),
    modal: document.getElementById('modal'),
    modalImg: document.getElementById('modal-img'),
    modalName: document.getElementById('modal-name')
  };

  /* ─── LENIS SMOOTH SCROLL ─── */
  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    state.lenis = new Lenis({
      lerp: 0.08,
      duration: 1.4,
      smoothWheel: true,
      smoothTouch: false
    });

    gsap.ticker.add((time) => {
      state.lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    state.lenis.on('scroll', ScrollTrigger.update);
  }

  /* ─── CUSTOM CURSOR ─── */
  function initCursor() {
    if (window.innerWidth <= 768) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const xTo = gsap.quickTo(cursor, 'left', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'top', { duration: 0.4, ease: 'power3' });

    document.addEventListener('mousemove', (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });

    const hoverElements = document.querySelectorAll('a, button, .gallery__item, .evidence__slider-container, .lab__cta-button, .spectrum__swatch');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
    });

    document.addEventListener('mousedown', () => cursor.classList.add('is-clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('is-clicking'));
  }

  /* ─── PRELOADER ─── */
  function initPreloader() {
    if (typeof gsap === 'undefined') {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 5 + 2;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          completePreloader();
        }
        dom.preloaderPercent.textContent = String(Math.floor(progress)).padStart(3, '0');
      }, 35);
      return;
    }

    gsap.to({ val: 0 }, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate() {
        const count = Math.round(this.targets()[0].val);
        dom.preloaderPercent.textContent = String(count).padStart(3, '0');
      },
      onComplete() {
        gsap.to(dom.preloader, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete() {
            dom.preloader.style.display = 'none';
            state.isPreloaderDone = true;
            showNav();
            animateHero();
            initGSAPAnimations();
          }
        });
      }
    });
  }

  function completePreloader() {
    dom.preloader.classList.add('is-hidden');
    state.isPreloaderDone = true;
    setTimeout(() => {
      dom.preloader.style.display = 'none';
      showNav();
      animateHero();
      initGSAPAnimations();
    }, 800);
  }

  /* ─── HERO ENTRANCE ─── */
  function animateHero() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const heroImg = document.querySelector('.section__hero-image img');
    if (heroImg) {
      tl.to(heroImg, { scale: 1, duration: 2.4, ease: 'power2.out' }, 0);
    }

    tl.to('.section__hero-image', { opacity: 1, duration: 1.8, ease: 'power2.out' }, 0);
    tl.to('.hero__label', { opacity: 1, y: 0, duration: 0.8 }, 0.4);

    const titleEl = document.querySelector('.hero__title');
    if (titleEl) {
      tl.fromTo(titleEl,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' },
        0.3
      );
    }

    tl.to('.hero__subtitle', { opacity: 1, y: 0, duration: 0.8 }, 1.0);
    tl.to('.hero__data', { opacity: 1, y: 0, duration: 0.8 }, 1.2);
    tl.to('.hero__scroll-cue', { opacity: 1, duration: 1 }, 1.6);
  }

  /* ─── NAVIGATION ─── */
  function showNav() {
    dom.monoNav.classList.add('is-visible');
  }

  function initNav() {
    dom.navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionIndex = parseInt(item.dataset.section);
        if (!isNaN(sectionIndex)) scrollToSection(sectionIndex);
      });
    });
  }

  function updateActiveNav(index) {
    dom.navItems.forEach(item => item.classList.remove('is-active'));
    if (dom.navItems[index]) dom.navItems[index].classList.add('is-active');
  }

  /* ─── SCROLL ─── */
  function initScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.sectionIndex);
          state.currentSection = index;
          updateActiveNav(index);
          entry.target.classList.add('is-in-view');
        }
      });
    }, { threshold: 0.3 });

    dom.sections.forEach(section => observer.observe(section));
  }

  function scrollToSection(index) {
    if (index < 0 || index >= dom.sections.length) return;
    const target = dom.sections[index].offsetTop;
    if (state.lenis) {
      state.lenis.scrollTo(target, { duration: 1.4 });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }

  /* ─── GALLERY ─── */
  function initGrid() {
    dom.galleryItems.forEach(item => {
      item.addEventListener('click', () => openModal(item));
    });
  }

  /* ─── MODAL ─── */
  function openModal(item) {
    const img = item.querySelector('img');
    const name = item.querySelector('.gallery__name');

    if (img) dom.modalImg.src = img.src;
    if (name) dom.modalName.textContent = name.textContent;

    dom.modal.classList.add('is-open');
    dom.modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    dom.modal.classList.remove('is-open');
    dom.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function initModal() {
    const closeBtn = dom.modal.querySelector('.modal__close');
    const backdrop = dom.modal.querySelector('.modal__backdrop');

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dom.modal.classList.contains('is-open')) closeModal();
    });
  }

  /* ─── SLIDERS ─── */
  function initSliders() {
    dom.sliders.forEach(slider => {
      const container = slider.querySelector('.evidence__slider-container');
      const beforeLayer = slider.querySelector('.evidence__slider-before');
      const handle = slider.querySelector('.evidence__slider-handle');

      if (!container || !beforeLayer || !handle) return;

      let isDragging = false;

      const updateSlider = (clientX) => {
        const rect = container.getBoundingClientRect();
        let percent = ((clientX - rect.left) / rect.width) * 100;
        percent = Math.max(0, Math.min(100, percent));
        beforeLayer.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        handle.style.left = percent + '%';
      };

      container.addEventListener('mousedown', (e) => { isDragging = true; updateSlider(e.clientX); });
      document.addEventListener('mousemove', (e) => { if (isDragging) updateSlider(e.clientX); });
      document.addEventListener('mouseup', () => { isDragging = false; });
      container.addEventListener('touchstart', (e) => { isDragging = true; updateSlider(e.touches[0].clientX); });
      container.addEventListener('touchmove', (e) => { if (isDragging) updateSlider(e.touches[0].clientX); });
      container.addEventListener('touchend', () => { isDragging = false; });
    });
  }

  /* ─── TONAL SPECTRUM EXPLORER ─── */
  function initSpectrumExplorer() {
    const spectrum = document.querySelector('.spectrum');
    if (!spectrum) return;

    const bar = document.getElementById('spectrum-bar');
    const currentName = document.getElementById('spectrum-current-name');
    const previewSwatch = document.getElementById('spectrum-preview');
    const swatches = spectrum.querySelectorAll('.spectrum__swatch');

    swatches.forEach(swatch => {
      swatch.addEventListener('mouseenter', () => {
        const name = swatch.dataset.name;
        const color = swatch.dataset.color;

        if (currentName) currentName.textContent = name;
        if (previewSwatch) previewSwatch.style.background = color;

        swatches.forEach(s => s.classList.remove('is-active'));
        swatch.classList.add('is-active');
      });
    });

    if (bar) {
      bar.addEventListener('mouseleave', () => {
        swatches.forEach(s => s.classList.remove('is-active'));
      });
    }
  }

  /* ─── GSAP SCROLL ANIMATIONS ─── */
  function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.section__title').forEach(title => {
      gsap.fromTo(title,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)', opacity: 1,
          duration: 1.4, ease: 'power4.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    document.querySelectorAll('.section__header .mono-tag').forEach(tag => {
      gsap.fromTo(tag,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)', opacity: 1,
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: tag,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    document.querySelectorAll('.science__card').forEach((card, i) => {
      gsap.fromTo(card,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)', opacity: 1,
          duration: 1.0, delay: i * 0.12, ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    document.querySelectorAll('.gallery__item').forEach((item, i) => {
      gsap.fromTo(item,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)', opacity: 1,
          duration: 1.0, delay: i * 0.08, ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    document.querySelectorAll('.process__step').forEach((step, i) => {
      gsap.fromTo(step,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)', opacity: 1,
          duration: 0.9, delay: i * 0.1, ease: 'power4.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    dom.sliders.forEach((slider, i) => {
      gsap.fromTo(slider,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)', opacity: 1,
          duration: 1.0, delay: i * 0.15, ease: 'power4.out',
          scrollTrigger: {
            trigger: slider,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    const labCta = document.querySelector('.lab__cta');
    if (labCta) {
      gsap.fromTo(labCta,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)', opacity: 1,
          duration: 1.2, ease: 'power4.out',
          scrollTrigger: {
            trigger: labCta,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    const spectrumSection = document.querySelector('.spectrum');
    if (spectrumSection) {
      gsap.fromTo(spectrumSection,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)', opacity: 1,
          duration: 1.2, ease: 'power4.out',
          scrollTrigger: {
            trigger: spectrumSection,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    const heroImg = document.querySelector('.section__hero-image img');
    if (heroImg) {
      gsap.to(heroImg, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: document.getElementById('section-0'),
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    const heroContent = document.querySelector('.section--hero .section__content');
    if (heroContent) {
      gsap.to(heroContent, {
        y: -40,
        opacity: 0.6,
        ease: 'none',
        scrollTrigger: {
          trigger: document.getElementById('section-0'),
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    document.querySelectorAll('.atmosphere__image').forEach(img => {
      gsap.to(img.querySelector('img'), {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Interlude — parallax drift
    const interludeImg = document.querySelector('.interlude__image img');
    if (interludeImg) {
      gsap.to(interludeImg, {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.interlude',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
      gsap.fromTo('.interlude__text',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)', opacity: 0.9,
          duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.interlude',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Triptych — staggered reveal
    document.querySelectorAll('.triptych__item').forEach((item, i) => {
      gsap.fromTo(item,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)', opacity: 1,
          duration: 1.0, delay: i * 0.15, ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Lookbook — staggered reveal
    document.querySelectorAll('.lookbook__item').forEach((item, i) => {
      gsap.fromTo(item,
        { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)', opacity: 1,
          duration: 1.0, delay: i * 0.1, ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }

  /* ─── INIT ─── */
  function init() {
    document.fonts.ready.then(() => {
      initLenis();
      initPreloader();
      initCursor();
      initNav();
      initScroll();
      initGrid();
      initModal();
      initSliders();
      initSpectrumExplorer();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

/* ============================================
   THE TEXTURE POET — About Page JavaScript
   GSAP + ScrollTrigger + SplitType + Lenis
   ============================================ */

(function () {
  'use strict';

  /* --- STATE --- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const state = {
    preloaderDone: false,
    menuOpen: false,
  };

  /* --- DOM REFS --- */
  const dom = {
    preloader: document.getElementById('preloader'),
    menuToggle: document.querySelector('.header__brand'),
    menuClose: document.getElementById('menuClose'),
    editorialMenu: document.getElementById('editorialMenu'),
    contactForm: document.getElementById('contactForm'),
  };

  /* --- INIT --- */
  function init() {
    runPreloader();
    setupLenis();
    setupMenu();
    setupScrollAnimations();
    setupContactForm();
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
    const heroContent = document.querySelector('.about-hero__content');
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

  /* --- SCROLL ANIMATIONS --- */
  function setupScrollAnimations() {
    /* Bio section */
    gsap.fromTo('.bio__portrait', {
      opacity: 0,
      x: -60,
    }, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.bio',
        start: 'top 75%',
      },
    });

    gsap.fromTo('.bio__text > *', {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.bio__text',
        start: 'top 75%',
      },
    });

    /* Approach cards */
    gsap.fromTo('.approach__card', {
      opacity: 0,
      y: 40,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.approach__grid',
        start: 'top 80%',
      },
    });

    /* Contact section */
    gsap.fromTo('.contact__info > *', {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 75%',
      },
    });

    gsap.fromTo('.contact__form', {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact__form',
        start: 'top 85%',
      },
    });

    /* Stats counter animation */
    document.querySelectorAll('.bio__stat-num').forEach((stat) => {
      const text = stat.textContent;
      const num = parseInt(text);
      if (!isNaN(num)) {
        const suffix = text.replace(num, '');
        gsap.fromTo(stat, { textContent: '0' }, {
          textContent: num,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
          },
          onUpdate: function () {
            stat.textContent = Math.round(parseFloat(stat.textContent)) + suffix;
          },
        });
      }
    });
  }

  /* --- CONTACT FORM --- */
  function setupContactForm() {
    if (!dom.contactForm) return;

    dom.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = dom.contactForm.querySelector('.contact__submit');
      const originalText = btn.querySelector('.contact__submit-text').textContent;
      btn.querySelector('.contact__submit-text').textContent = 'Message Sent';
      btn.style.pointerEvents = 'none';

      gsap.to(btn, {
        scale: 0.98,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });

      setTimeout(() => {
        btn.querySelector('.contact__submit-text').textContent = originalText;
        btn.style.pointerEvents = '';
        dom.contactForm.reset();
      }, 3000);
    });
  }

  /* --- KEYBOARD NAV --- */
  document.addEventListener('keydown', (e) => {
    if (state.menuOpen && e.key === 'Escape') {
      closeMenu();
    }
  });

  /* --- BOOT --- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

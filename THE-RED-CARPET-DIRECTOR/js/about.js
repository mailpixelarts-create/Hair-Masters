/* ============================================
   THE RED CARPET DIRECTOR — About Page Script
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
  };

  const dom = {
    preloader: document.getElementById('preloader'),
    preloaderEnter: document.getElementById('preloaderEnter'),
    nav: document.getElementById('mainNav'),
    spotlight: document.getElementById('spotlight'),
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
      revealHero();
    }, 1200);
  }

  // SCROLL ANIMATIONS
  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Bio section
    const bioImage = document.querySelector('.about-bio__image-col');
    const bioText = document.querySelector('.about-bio__text-col');

    if (bioImage && bioText) {
      gsap.from(bioImage, {
        opacity: 0,
        x: -60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-bio',
          start: 'top 75%',
        },
      });

      gsap.from(bioText, {
        opacity: 0,
        x: 60,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-bio',
          start: 'top 75%',
        },
      });
    }

    // Approach cards
    const cards = document.querySelectorAll('.about-approach__card');
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
      });
    });

    // Contact form
    const formFields = document.querySelectorAll('.about-contact__field, .about-contact__submit');
    formFields.forEach((field, i) => {
      gsap.from(field, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-contact__form',
          start: 'top 80%',
        },
      });
    });
  }

  // HERO REVEAL
  function revealHero() {
    const hero = document.querySelector('.about-hero__content');
    if (!hero) return;

    const elements = hero.querySelectorAll('.about-hero__label, .about-hero__title, .about-hero__divider');
    elements.forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3 + i * 0.2,
        ease: 'power3.out',
      });
    });

    // Title character animation
    const heroTitle = hero.querySelector('.about-hero__title');
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
  }

  // CONTACT FORM
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.about-contact__submit');
      const originalText = submitBtn.querySelector('.about-contact__submit-text').textContent;

      submitBtn.querySelector('.about-contact__submit-text').textContent = 'SENT';
      submitBtn.style.borderColor = 'var(--bronze)';
      submitBtn.style.background = 'rgba(139, 115, 85, 0.15)';

      setTimeout(() => {
        submitBtn.querySelector('.about-contact__submit-text').textContent = originalText;
        submitBtn.style.borderColor = '';
        submitBtn.style.background = '';
        form.reset();
      }, 2500);
    });
  }

  // INIT
  function init() {
    initLenis();
    initPreloader();
    initContactForm();

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

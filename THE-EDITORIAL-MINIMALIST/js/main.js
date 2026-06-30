/* ============================================
   THE EDITORIAL MINIMALIST — Motion
   Near-invisible. Controlled breath.
   ============================================ */

(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  const heroTl = gsap.timeline({ delay: 0.3 });
  heroTl
    .from('.hero__label', { y: 15, opacity: 0, duration: 1, ease: 'power2.out' })
    .from('.hero__line', { y: 30, opacity: 0, duration: 1.2, ease: 'power2.out', stagger: 0.15 }, '-=0.6')
    .from('.hero__subtitle', { y: 10, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
    .from('.hero__cta', { opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
    .from('.hero__image', { scale: 1.05, duration: 2, ease: 'power2.out' }, 0);

  // All [data-reveal] elements
  document.querySelectorAll('[data-reveal]').forEach(el => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
      },
    });
  });

  // Philosophy quote
  gsap.from('.philosophy__quote', {
    y: 20,
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.philosophy__quote',
      start: 'top 80%',
    },
  });

  // Philosophy body
  gsap.from('.philosophy__body', {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.philosophy__body',
      start: 'top 85%',
    },
  });

  // Portfolio items
  document.querySelectorAll('.portfolio__item').forEach((item, i) => {
    gsap.from(item, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      delay: (i % 2) * 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
      },
    });
  });

  // Method steps
  document.querySelectorAll('.method__step').forEach((step, i) => {
    gsap.from(step, {
      y: 25,
      opacity: 0,
      duration: 1,
      delay: i * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: step,
        start: 'top 88%',
      },
    });
  });

  // Pathway cards
  document.querySelectorAll('.pathways__card').forEach((card, i) => {
    gsap.from(card, {
      y: 25,
      opacity: 0,
      duration: 0.9,
      delay: i * 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
      },
    });
  });

  // Experience columns
  document.querySelectorAll('.experience__col').forEach((col, i) => {
    gsap.from(col, {
      y: 25,
      opacity: 0,
      duration: 1,
      delay: i * 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: col,
        start: 'top 88%',
      },
    });
  });

  // Contact statement
  gsap.from('.contact__statement', {
    y: 20,
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.contact__statement',
      start: 'top 85%',
    },
  });

})();

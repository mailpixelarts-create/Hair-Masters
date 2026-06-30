/* ============================================
   GSAP ScrollTrigger Animations — SOTD Quality
   All reveals, parallax, text, interactions
   ============================================ */

function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.getAll().forEach(t => t.kill());

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;
  const yScale = isMobile ? 0.5 : 1;

  if (reduced) {
    document.querySelectorAll('[data-reveal], .reveal, .img-reveal__inner, .section-wipe').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
    });
    return;
  }

  // ═══════════════════════════════════════════
  // SCROLL PROGRESS
  // ═══════════════════════════════════════════
  gsap.to('#scrollProgress', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });

  // ═══════════════════════════════════════════
  // NAV HIDE/SHOW
  // ═══════════════════════════════════════════
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const scroll = self.scroll();
      if (scroll > 200 && scroll > lastScroll) {
        nav.classList.add('nav--hidden');
      } else {
        nav.classList.remove('nav--hidden');
      }
      lastScroll = scroll;
    },
  });

  // ═══════════════════════════════════════════
  // HERO ENTRANCE
  // ═══════════════════════════════════════════
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl
    .from('.hero__label', { y: 15 * yScale, opacity: 0, duration: 1, ease: 'power2.out' })
    .from('.hero__line', { y: 40 * yScale, opacity: 0, duration: 1.4, ease: 'power4.out', stagger: 0.18 }, '-=0.6')
    .from('.hero__subtitle', { y: 10 * yScale, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
    .from('.hero__cta', { opacity: 0, y: 10, duration: 0.8, ease: 'power2.out' }, '-=0.3')
    .from('.hero__image', { scale: 1.08, duration: 2.5, ease: 'power3.out' }, 0)
    .from('.hero__scroll-cue', { opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.5');

  // ═══════════════════════════════════════════
  // HERO PARALLAX
  // ═══════════════════════════════════════════
  gsap.to('.hero__image', {
    yPercent: 30 * yScale,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // Hero scroll line pulse
  gsap.to('.hero__scroll-line', {
    scaleY: 0.5,
    opacity: 0.3,
    duration: 1.2,
    ease: 'power2.inOut',
    repeat: -1,
    yoyo: true,
  });

  // ═══════════════════════════════════════════
  // SPLITTYPE WORD REVEALS
  // ═══════════════════════════════════════════
  document.querySelectorAll('.word').forEach(word => {
    gsap.from(word, {
      y: '110%',
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: word.closest('[data-split]'),
        start: 'top 85%',
      },
    });
  });

  // ═══════════════════════════════════════════
  // IMAGE REVEAL MASKS (clip-path wipe)
  // ═══════════════════════════════════════════
  document.querySelectorAll('.img-reveal').forEach(el => {
    const inner = el.querySelector('.img-reveal__inner') || el;
    gsap.fromTo(inner,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    );
  });

  // ═══════════════════════════════════════════
  // SECTION CLIP-WIPES
  // ═══════════════════════════════════════════
  document.querySelectorAll('.section-wipe').forEach(el => {
    gsap.fromTo(el,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.4,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      }
    );
  });

  // ═══════════════════════════════════════════
  // SECTION REVEALS (data-reveal)
  // ═══════════════════════════════════════════
  document.querySelectorAll('[data-reveal]').forEach(el => {
    gsap.from(el, {
      y: 60 * yScale,
      opacity: 0,
      duration: 1.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
      },
    });
  });

  // ═══════════════════════════════════════════
  // PHILOSOPHY
  // ═══════════════════════════════════════════
  gsap.from('.philosophy__quote', {
    y: 25 * yScale,
    opacity: 0,
    duration: 1.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.philosophy__quote',
      start: 'top 80%',
    },
  });

  gsap.from('.philosophy__body', {
    y: 20 * yScale,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.philosophy__body',
      start: 'top 85%',
    },
  });

  // ═══════════════════════════════════════════
  // PORTFOLIO ITEMS (staggered reveal)
  // ═══════════════════════════════════════════
  document.querySelectorAll('.portfolio__item').forEach((item, i) => {
    gsap.from(item, {
      y: 80 * yScale,
      opacity: 0,
      duration: 1.3,
      delay: (i % 2) * 0.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 92%',
      },
    });
  });

  // ═══════════════════════════════════════════
  // METHOD STEPS (with number counter)
  // ═══════════════════════════════════════════
  document.querySelectorAll('.method__step').forEach((step, i) => {
    const numEl = step.querySelector('.method__step-num');
    if (numEl) {
      const count = { val: 0 };
      gsap.to(count, {
        val: i + 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
        },
        onUpdate() {
          numEl.textContent = String(Math.round(count.val)).padStart(2, '0');
        },
      });
    }

    gsap.from(step, {
      y: 50 * yScale,
      opacity: 0,
      duration: 1.1,
      delay: i * 0.12,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: step,
        start: 'top 88%',
      },
    });
  });

  // ═══════════════════════════════════════════
  // PATHWAY CARDS (staggered)
  // ═══════════════════════════════════════════
  document.querySelectorAll('.pathways__card').forEach((card, i) => {
    gsap.from(card, {
      y: 40 * yScale,
      opacity: 0,
      duration: 1,
      delay: i * 0.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
      },
    });
  });

  // ═══════════════════════════════════════════
  // EXPERIENCE COLUMNS
  // ═══════════════════════════════════════════
  document.querySelectorAll('.experience__col').forEach((col, i) => {
    gsap.from(col, {
      y: 50 * yScale,
      opacity: 0,
      duration: 1.1,
      delay: i * 0.15,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: col,
        start: 'top 88%',
      },
    });
  });

  // ═══════════════════════════════════════════
  // CONTACT
  // ═══════════════════════════════════════════
  gsap.from('.contact__portrait-wrap', {
    scale: 0.85,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact__portrait-wrap',
      start: 'top 85%',
    },
  });

  gsap.from('.contact__statement', {
    y: 25 * yScale,
    opacity: 0,
    duration: 1.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.contact__statement',
      start: 'top 85%',
    },
  });

  gsap.from('.contact__details', {
    y: 15 * yScale,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.contact__details',
      start: 'top 88%',
    },
  });

  ScrollTrigger.refresh();
}

// ═══════════════════════════════════════════
// SMOOTH ANCHOR SCROLL
// ═══════════════════════════════════════════
function initSmoothAnchor() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target && typeof lenis !== 'undefined' && lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.8 });
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ═══════════════════════════════════════════
// MAGNETIC BUTTON
// ═══════════════════════════════════════════
function initMagneticBtns() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) return;

  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    const text = btn.querySelector('.magnetic-btn__text');
    if (!text) return;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(text, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power3' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(text, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ═══════════════════════════════════════════
// IMAGE TILT ON HOVER
// ═══════════════════════════════════════════
function initTiltHover() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) return;

  document.querySelectorAll('.portfolio__img-wrap, .pathways__card-img-wrap').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: x * 5,
        rotateX: -y * 5,
        transformPerspective: 800,
        duration: 0.4,
        ease: 'power2',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power3',
      });
    });
  });
}

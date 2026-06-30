/* ═══════════════════════════════════════════════════
   THE HAIR RITUALIST — About Page JS
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  const preloader = document.getElementById('preloader');
  const nav = document.getElementById('radialNav');
  const navToggle = nav.querySelector('.radial-nav__toggle');
  const navItems = nav.querySelectorAll('.radial-nav__item');
  const sparksContainer = document.querySelector('.preloader__sparks');

  let lenis = null;

  // ─── PRELOADER ───

  function createSparks() {
    for (let i = 0; i < 20; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      spark.style.left = Math.random() * 100 + '%';
      spark.style.top = 40 + Math.random() * 40 + '%';
      spark.style.animation = `sparkFloat ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 4}s infinite`;
      sparksContainer.appendChild(spark);
    }
  }

  function hidePreloader() {
    return new Promise(resolve => {
      createSparks();
      setTimeout(() => {
        preloader.classList.add('is-hidden');
        setTimeout(resolve, 1200);
      }, 2800);
    });
  }

  // ─── LENIS ───

  function initLenis() {
    lenis = new Lenis({
      duration: 1.8,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // ─── RADIAL NAV ───

  function initNav() {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });

    navItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        const href = item.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            nav.classList.remove('is-open');
            lenis.scrollTo(target, { duration: 1.8 });
          }
        } else {
          nav.classList.remove('is-open');
        }
      });
    });

    drawNavLines();
  }

  function drawNavLines() {
    const svg = nav.querySelector('.radial-nav__lines');
    const items = Array.from(navItems);
    const centerX = 280;
    const centerY = 280;

    let linesHtml = '';
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const x = rect.left - navRect.left + rect.width / 2;
      const y = rect.top - navRect.top + rect.height / 2;
      linesHtml += `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#C8B8A0" stroke-width="0.5" opacity="0.4"/>`;
    });

    svg.innerHTML = linesHtml;
  }

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
    }
  });

  // ─── GSAP ANIMATIONS ───

  function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title
    const heroTitle = document.querySelector('.about-hero__title');
    if (heroTitle) {
      const lines = heroTitle.querySelectorAll('.split-line');
      lines.forEach((line, i) => {
        gsap.fromTo(line,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.6, ease: 'power3.out', delay: 0.3 + i * 0.2 }
        );
      });
    }

    // Hero subtitle
    const heroSub = document.querySelector('.about-hero__sub');
    if (heroSub) {
      gsap.fromTo(heroSub,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 1, ease: 'power2.out' }
      );
    }

    // Section tags
    document.querySelectorAll('.section-tag').forEach((tag) => {
      ScrollTrigger.create({
        trigger: tag.closest('section'),
        start: 'top 80%',
        onEnter: () => tag.classList.add('is-visible'),
      });
    });

    // Section headings — chars
    document.querySelectorAll('.section-heading').forEach((heading) => {
      if (typeof SplitType !== 'undefined') {
        const split = new SplitType(heading, { types: 'chars' });
        ScrollTrigger.create({
          trigger: heading.closest('section'),
          start: 'top 70%',
          onEnter: () => {
            gsap.to(split.chars, {
              opacity: 1, y: 0, rotateX: 0,
              stagger: 0.04, duration: 1, ease: 'power3.out',
            });
          },
        });
      }
    });

    // Bio portrait
    const portrait = document.querySelector('.about-bio__portrait');
    if (portrait) {
      gsap.fromTo(portrait,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: portrait, start: 'top 75%' },
        }
      );
    }

    // Bio text
    const bioText = document.querySelector('.about-bio__text');
    if (bioText) {
      gsap.fromTo(bioText,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: bioText, start: 'top 75%' },
        }
      );
    }

    // Approach cards stagger
    const cards = document.querySelectorAll('.approach-card');
    if (cards.length) {
      ScrollTrigger.create({
        trigger: cards[0].closest('section'),
        start: 'top 60%',
        onEnter: () => {
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('is-revealed'), i * 200);
          });
        },
      });
    }

    // Form groups
    const formGroups = document.querySelectorAll('.form-group');
    if (formGroups.length) {
      ScrollTrigger.create({
        trigger: document.getElementById('ritualForm'),
        start: 'top 80%',
        onEnter: () => {
          formGroups.forEach(g => g.classList.add('is-visible'));
        },
      });
    }

    // Footer
    const footer = document.querySelector('.contact__footer');
    if (footer) {
      gsap.fromTo(footer,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: footer, start: 'top 90%' },
        }
      );
    }
  }

  // ─── FORM ───

  function initForm() {
    const form = document.getElementById('ritualForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-ritual span');
      if (btn) btn.textContent = 'Received';
      setTimeout(() => {
        form.reset();
        if (btn) btn.textContent = 'Submit';
      }, 3000);
    });
  }

  // ─── RESIZE ───

  function initResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        drawNavLines();
      }, 250);
    });
  }

  // ─── INIT ───

  async function init() {
    await hidePreloader();
    initLenis();
    initNav();
    initAnimations();
    initForm();
    initResize();
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

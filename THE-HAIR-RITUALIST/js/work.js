/* ═══════════════════════════════════════════════════
   THE HAIR RITUALIST — Work Page JS
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

  // ─── FILTER ───

  function initFilter() {
    const buttons = document.querySelectorAll('.work-filter__btn');
    const items = document.querySelectorAll('.work-masonry__item');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        items.forEach((item, i) => {
          const match = filter === 'all' || item.dataset.category === filter;
          if (match) {
            item.classList.remove('is-hidden');
            setTimeout(() => item.classList.add('is-visible'), i * 80);
          } else {
            item.classList.remove('is-visible');
            item.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // ─── GSAP ANIMATIONS ───

  function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title
    const heroTitle = document.querySelector('.work-hero__title');
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
    const heroSub = document.querySelector('.work-hero__sub');
    if (heroSub) {
      gsap.fromTo(heroSub,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 1, ease: 'power2.out' }
      );
    }

    // Section tag
    const tag = document.querySelector('.section-tag');
    if (tag) {
      ScrollTrigger.create({
        trigger: tag.closest('section'),
        start: 'top 80%',
        onEnter: () => tag.classList.add('is-visible'),
      });
    }

    // Masonry items staggered entrance
    const items = document.querySelectorAll('.work-masonry__item');
    items.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          setTimeout(() => item.classList.add('is-visible'), i * 150);
        },
      });

      const img = item.querySelector('img');
      if (img) {
        const speed = parseFloat(item.dataset.speed) || 0.5;
        gsap.to(img, {
          y: -40 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    });

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
    initFilter();
    initAnimations();
    initResize();
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

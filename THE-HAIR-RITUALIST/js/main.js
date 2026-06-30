/* ═══════════════════════════════════════════════════
   THE HAIR RITUALIST — Main JS
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── CONFIG ───
  const PANEL_COUNT = 7;
  const STORAGE_KEY = 'ritualist_scroll_pos';
  const SNAP_DURATION = 1.8;

  // ─── ELEMENTS ───
  const preloader = document.getElementById('preloader');
  const container = document.getElementById('scrollContainer');
  const panels = document.querySelectorAll('.panel');
  const nav = document.getElementById('radialNav');
  const navToggle = nav.querySelector('.radial-nav__toggle');
  const navItems = nav.querySelectorAll('.radial-nav__item');
  const sparksContainer = document.querySelector('.preloader__sparks');

  let lenis = null;
  let scrollTriggers = [];
  let isSnapping = false;
  let currentSection = 0;

  // ═══════════════════════════════════════════════════
  // PRELOADER
  // ═══════════════════════════════════════════════════

  function createSparks() {
    for (let i = 0; i < 20; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      spark.style.left = Math.random() * 100 + '%';
      spark.style.top = 40 + Math.random() * 40 + '%';
      spark.style.animationDuration = 2 + Math.random() * 3 + 's';
      spark.style.animationDelay = Math.random() * 4 + 's';
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

  // ═══════════════════════════════════════════════════
  // LENIS SMOOTH SCROLL
  // ═══════════════════════════════════════════════════

  function initLenis() {
    lenis = new Lenis({
      duration: SNAP_DURATION,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.on('scroll', onScroll);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // ═══════════════════════════════════════════════════
  // SNAP SCROLL TO SECTION
  // ═══════════════════════════════════════════════════

  function snapToSection(index) {
    if (!lenis) return;
    const target = index * window.innerHeight;
    lenis.scrollTo(target, { duration: SNAP_DURATION });
    currentSection = index;
    sessionStorage.setItem(STORAGE_KEY, index);
  }

  // ═══════════════════════════════════════════════════
  // SCROLL EVENT HANDLER
  // ═══════════════════════════════════════════════════

  function onScroll() {
    updateActivePanel();
    savePosition();
  }

  function updateActivePanel() {
    if (!lenis) return;
    const scrollPos = lenis.scroll;
    const wh = window.innerHeight;

    panels.forEach((panel, i) => {
      const panelTop = i * wh;
      const panelBottom = panelTop + wh;
      const viewCenter = scrollPos + wh / 2;

      if (viewCenter >= panelTop && viewCenter < panelBottom) {
        if (currentSection !== i && i < PANEL_COUNT) {
          currentSection = i;
        }
        panel.classList.add('is-active');
      } else {
        panel.classList.remove('is-active');
      }
    });
  }

  function savePosition() {
    if (!lenis) return;
    const scrollPos = lenis.scroll;
    const wh = window.innerHeight;
    const section = Math.round(scrollPos / wh);
    sessionStorage.setItem(STORAGE_KEY, Math.min(section, PANEL_COUNT - 1));
  }

  function restorePosition() {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved !== null && lenis) {
      const section = parseInt(saved, 10);
      if (section > 0 && section < PANEL_COUNT) {
        setTimeout(() => {
          lenis.scrollTo(section * window.innerHeight, { immediate: true, force: true });
          currentSection = section;
        }, 100);
      }
    }
  }

  // ═══════════════════════════════════════════════════
  // RADIAL NAV
  // ═══════════════════════════════════════════════════

  function initNav() {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });

    navItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(item.dataset.index, 10);
        nav.classList.remove('is-open');
        snapToSection(idx);
      });
    });

    // Draw connecting lines
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

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
    }
  });

  // ═══════════════════════════════════════════════════
  // GSAP SCROLL ANIMATIONS
  // ═══════════════════════════════════════════════════

  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title reveal
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
      const lines = heroTitle.querySelectorAll('.split-line');
      lines.forEach((line, i) => {
        gsap.fromTo(line,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.6,
            ease: 'power3.out',
            delay: 0.3 + i * 0.2,
          }
        );
      });
    }

    // Hero subtitle
    const heroSub = document.querySelector('.hero__sub');
    if (heroSub) {
      gsap.fromTo(heroSub,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 1, ease: 'power2.out' }
      );
    }

    // Section tags reveal on scroll
    const tags = document.querySelectorAll('.section-tag');
    tags.forEach((tag) => {
      ScrollTrigger.create({
        trigger: tag.closest('.panel'),
        start: 'top 80%',
        onEnter: () => tag.classList.add('is-visible'),
      });
    });

    // Section headings — chars
    const headings = document.querySelectorAll('.section-heading');
    headings.forEach((heading) => {
      if (typeof SplitType !== 'undefined') {
        const split = new SplitType(heading, { types: 'chars' });
        ScrollTrigger.create({
          trigger: heading.closest('.panel'),
          start: 'top 70%',
          onEnter: () => {
            gsap.to(split.chars, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.04,
              duration: 1,
              ease: 'power3.out',
            });
          },
        });
      }
    });

    // Practice steps
    const steps = document.querySelectorAll('.practice__step');
    if (steps.length) {
      ScrollTrigger.create({
        trigger: steps[0].closest('.panel'),
        start: 'top 60%',
        onEnter: () => {
          steps.forEach(step => step.classList.add('is-revealed'));
        },
      });
    }

    // Editorial spread items stagger
    const editorialItems = document.querySelectorAll('.editorial-spread__item');
    editorialItems.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          setTimeout(() => {
            item.classList.add('is-visible');
          }, i * 200);
        },
      });

      // Parallax on editorial images
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

    // Form groups reveal
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

    // Value items
    const valueItems = document.querySelectorAll('.value-item');
    if (valueItems.length) {
      ScrollTrigger.create({
        trigger: valueItems[0].closest('.panel'),
        start: 'top 60%',
        onEnter: () => {
          valueItems.forEach(v => v.classList.add('is-visible'));
        },
      });
    }

    // Closing statement
    const closingQuote = document.querySelector('.closing__quote');
    const closingText = document.querySelector('.closing__text');
    if (closingQuote) {
      ScrollTrigger.create({
        trigger: closingQuote.closest('.panel'),
        start: 'top 60%',
        onEnter: () => {
          closingQuote.classList.add('is-visible');
          if (closingText) closingText.classList.add('is-visible');
        },
      });
    }

    // Atmosphere items
    const atmosItems = document.querySelectorAll('.atmosphere__item');
    if (atmosItems.length) {
      ScrollTrigger.create({
        trigger: atmosItems[0].closest('.panel'),
        start: 'top 60%',
        onEnter: () => {
          atmosItems.forEach(item => item.classList.add('is-visible'));
        },
      });
    }

    scrollTriggers.push(ScrollTrigger);
  }

  // ═══════════════════════════════════════════════════
  // KEYBOARD NAVIGATION
  // ═══════════════════════════════════════════════════

  function initKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const next = Math.min(currentSection + 1, PANEL_COUNT - 1);
        snapToSection(next);
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prev = Math.max(currentSection - 1, 0);
        snapToSection(prev);
      }
    });
  }

  // ═══════════════════════════════════════════════════
  // FORM HANDLER
  // ═══════════════════════════════════════════════════

  function initForm() {
    const form = document.getElementById('ritualForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('.btn-ritual span');
      if (btn) {
        btn.textContent = 'Received';
      }

      setTimeout(() => {
        form.reset();
        if (btn) btn.textContent = 'Submit';
      }, 3000);
    });
  }

  // ═══════════════════════════════════════════════════
  // BACKGROUND PARALLAX
  // ═══════════════════════════════════════════════════

  function initBgParallax() {
    panels.forEach((panel) => {
      const bg = panel.querySelector('.panel__bg');
      if (!bg) return;

      gsap.to(bg, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: panel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    });
  }

  // ═══════════════════════════════════════════════════
  // RESIZE HANDLER
  // ═══════════════════════════════════════════════════

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

  // ═══════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════

  async function init() {
    await hidePreloader();

    initLenis();
    initNav();
    initScrollAnimations();
    initBgParallax();
    initKeyboard();
    initForm();
    initResize();

    restorePosition();

    // Trigger initial visibility
    setTimeout(() => {
      ScrollTrigger.refresh();
      updateActivePanel();
    }, 200);
  }

  // Start when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
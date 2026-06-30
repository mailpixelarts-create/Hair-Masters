/* ============================================
   THE RUNWAY ARCHITECT — Main Orchestrator v2
   ============================================ */

(function () {
  'use strict';

  /* --- SCROLL-AWARE SIDE NAV --- */
  function initSideNav() {
    const navItems = document.querySelectorAll('.side-nav-item');
    const scenes = document.querySelectorAll('.scene');
    if (!navItems.length || !scenes.length) return;

    // Track which scene is active via ScrollTrigger
    scenes.forEach((scene, i) => {
      ScrollTrigger.create({
        trigger: scene,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i)
      });
    });

    function setActive(index) {
      navItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
    }

    // Click to scroll
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const href = item.getAttribute('href');
        if (LenisManager.lenis) {
          LenisManager.scrollTo(href);
        } else {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* --- MOBILE HAMBURGER / NAV OVERLAY --- */
  function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('nav-overlay');
    const closeBtn = document.getElementById('nav-close');
    const sceneLinks = document.querySelectorAll('.nav-overlay-scene');

    if (!hamburger || !overlay) return;

    function openNav() {
      hamburger.classList.add('is-active');
      overlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';

      gsap.from(sceneLinks, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power4.out',
        delay: 0.2
      });
    }

    function closeNav() {
      hamburger.classList.remove('is-active');
      overlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      overlay.classList.contains('is-active') ? closeNav() : openNav();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeNav);

    sceneLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        closeNav();
        const href = link.getAttribute('href');
        setTimeout(() => {
          if (LenisManager.lenis) {
            LenisManager.scrollTo(href);
          } else {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          }
        }, 400);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
        closeNav();
      }
    });
  }

  /* --- LIGHTBOX --- */
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    if (!lightbox) return;

    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('is-active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
        closeLightbox();
      }
    });
  }

  /* --- BOOT SEQUENCE --- */
  async function boot() {
    try {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Preloader
      await PreloaderManager.init();

      // 2. WebGL Hero (try, but don't block on failure)
      try {
        HeroManager.init();
        HeroManager.animate();
      } catch (e) {
        console.warn('WebGL hero init failed:', e);
      }

      // 3. Smooth Scroll
      try {
        LenisManager.init();
      } catch (e) {
        console.warn('Lenis init failed:', e);
      }

      // 4. Cursor
      CursorManager.init();

      // 5. Split Text
      SplitTextManager.init();

      // 6. All animations
      AnimationManager.init();

      // 7. Navigation
      initSideNav();
      initMobileNav();

      // 8. Lightbox
      initLightbox();

      // 9. Final refresh
      ScrollTrigger.refresh();

    } catch (e) {
      console.error('Boot error:', e);
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.style.display = 'none';
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');

      // Fallback: still try to init animations
      try {
        AnimationManager.init();
      } catch (e2) {
        console.error('Fallback init error:', e2);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();

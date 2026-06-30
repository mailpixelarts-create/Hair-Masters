/* THE RUNWAY ARCHITECT — Main Orchestrator */
(function () {
  'use strict';

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn(name + ':', e); }
  }

  function initSideNav() {
    var navItems = document.querySelectorAll('.side-nav-item');
    var scenes = document.querySelectorAll('.scene');
    if (!navItems.length || !scenes.length) return;

    scenes.forEach(function (scene, i) {
      ScrollTrigger.create({
        trigger: scene,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: function () { setActive(i); },
        onEnterBack: function () { setActive(i); }
      });
    });

    function setActive(index) {
      navItems.forEach(function (item, i) {
        item.classList.toggle('active', i === index);
      });
    }

    navItems.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        var href = item.getAttribute('href');
        if (window.LenisManager && LenisManager.lenis) {
          LenisManager.scrollTo(href);
        } else {
          var el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function initMobileNav() {
    var hamburger = document.getElementById('hamburger');
    var overlay = document.getElementById('nav-overlay');
    var closeBtn = document.getElementById('nav-close');
    var sceneLinks = document.querySelectorAll('.nav-overlay-scene');
    if (!hamburger || !overlay) return;

    function openNav() {
      hamburger.classList.add('is-active');
      overlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      if (typeof gsap !== 'undefined') {
        gsap.from(sceneLinks, { y: 40, opacity: 0, duration: 0.6, stagger: 0.06, ease: 'power4.out', delay: 0.2 });
      }
    }

    function closeNav() {
      hamburger.classList.remove('is-active');
      overlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      overlay.classList.contains('is-active') ? closeNav() : openNav();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeNav);

    sceneLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        closeNav();
        var href = link.getAttribute('href');
        setTimeout(function () {
          if (window.LenisManager && LenisManager.lenis) {
            LenisManager.scrollTo(href);
          } else {
            var el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 400);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-active')) closeNav();
    });
  }

  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxClose = document.getElementById('lightbox-close');
    if (!lightbox) return;

    document.querySelectorAll('.portfolio-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
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
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-active')) closeLightbox();
    });
  }

  var inited = false;

  function initAll() {
    if (inited) return;
    inited = true;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    safe(function () { HeroManager.init(); HeroManager.animate(); }, 'Hero');
    safe(function () { LenisManager.init(); }, 'Lenis');
    safe(function () { CursorManager.init(); }, 'Cursor');
    safe(function () { SplitTextManager.init(); }, 'SplitText');
    safe(function () { AnimationManager.init(); }, 'Animation');
    safe(function () { initSideNav(); }, 'SideNav');
    safe(function () { initMobileNav(); }, 'MobileNav');
    safe(function () { initLightbox(); }, 'Lightbox');

    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  }

  // Listen for body.loaded class (set by preloader)
  var observer = new MutationObserver(function (mutations) {
    if (document.body.classList.contains('loaded')) {
      observer.disconnect();
      setTimeout(initAll, 100);
    }
  });

  function boot() {
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Fallback: if loaded class never appears, init after 4s
    setTimeout(function () {
      if (!inited) initAll();
    }, 4000);

    // Last resort: force loaded class after 5s
    setTimeout(function () {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    }, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

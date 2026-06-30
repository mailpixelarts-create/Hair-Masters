/* ═══════════════════════════════════════════════════════════════
   THE COLOR FUTURIST — About Page
   Lenis + SplitType + Cinematic Motion
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
    navItems: document.querySelectorAll('.mono-nav__item')
  };

  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    state.lenis = new Lenis({ lerp: 0.08, duration: 1.4, smoothWheel: true, smoothTouch: false });
    gsap.ticker.add((time) => state.lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    state.lenis.on('scroll', ScrollTrigger.update);
  }

  function initCursor() {
    if (window.innerWidth <= 768) return;
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    const xTo = gsap.quickTo(cursor, 'left', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'top', { duration: 0.4, ease: 'power3' });
    document.addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); });
    document.querySelectorAll('a, button, .lab__cta-button').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
    });
    document.addEventListener('mousedown', () => cursor.classList.add('is-clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('is-clicking'));
  }

  function initPreloader() {
    if (typeof gsap === 'undefined') {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 5 + 2;
        if (progress >= 100) { progress = 100; clearInterval(interval); completePreloader(); }
        dom.preloaderPercent.textContent = String(Math.floor(progress)).padStart(3, '0');
      }, 35);
      return;
    }
    gsap.to({ val: 0 }, {
      val: 100, duration: 2.2, ease: 'power2.inOut',
      onUpdate() { dom.preloaderPercent.textContent = String(Math.round(this.targets()[0].val)).padStart(3, '0'); },
      onComplete() {
        gsap.to(dom.preloader, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', onComplete() {
          dom.preloader.style.display = 'none'; state.isPreloaderDone = true; showNav(); animateHero(); initGSAPAnimations();
        }});
      }
    });
  }

  function completePreloader() {
    dom.preloader.classList.add('is-hidden');
    state.isPreloaderDone = true;
    setTimeout(() => { dom.preloader.style.display = 'none'; showNav(); animateHero(); initGSAPAnimations(); }, 800);
  }

  function animateHero() {
    if (typeof gsap === 'undefined') return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const heroImg = document.querySelector('.section__hero-image img');
    if (heroImg) tl.to(heroImg, { scale: 1, duration: 2.4, ease: 'power2.out' }, 0);
    tl.to('.hero__label', { opacity: 1, y: 0, duration: 0.8 }, 0.4);
    const titleEl = document.querySelector('.hero__title');
    if (titleEl && typeof SplitType !== 'undefined') {
      const split = new SplitType(titleEl, { types: 'words' });
      tl.from(split.words, { y: '100%', opacity: 0, duration: 1.0, ease: 'power4.out', stagger: 0.06 }, 0.5);
    }
    tl.to('.hero__subtitle', { opacity: 1, y: 0, duration: 0.8 }, 1.0);
    tl.to('.hero__data', { opacity: 1, y: 0, duration: 0.8 }, 1.2);
  }

  function showNav() { dom.monoNav.classList.add('is-visible'); }

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

  function initScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.sectionIndex);
          state.currentSection = index; updateActiveNav(index); entry.target.classList.add('is-in-view');
        }
      });
    }, { threshold: 0.3 });
    dom.sections.forEach(section => observer.observe(section));
  }

  function scrollToSection(index) {
    if (index < 0 || index >= dom.sections.length) return;
    const target = dom.sections[index].offsetTop;
    if (state.lenis) state.lenis.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.lab__cta-button');
      const originalText = btn.textContent;
      btn.textContent = 'RECEIVED';
      btn.style.pointerEvents = 'none';
      setTimeout(() => { btn.textContent = originalText; btn.style.pointerEvents = ''; form.reset(); }, 3000);
    });
  }

  function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('.section__title').forEach(title => {
      gsap.fromTo(title, { clipPath: 'inset(0 0 100% 0)', opacity: 0 }, {
        clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 1.4, ease: 'power4.out',
        scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    });

    document.querySelectorAll('.section__header .mono-tag').forEach(tag => {
      gsap.fromTo(tag, { clipPath: 'inset(0 100% 0 0)', opacity: 0 }, {
        clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: tag, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    });

    document.querySelectorAll('.process__step').forEach((step, i) => {
      gsap.fromTo(step, { clipPath: 'inset(0 0 100% 0)', opacity: 0 }, {
        clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 0.9, delay: i * 0.1, ease: 'power4.out',
        scrollTrigger: { trigger: step, start: 'top 88%', toggleActions: 'play none none reverse' }
      });
    });

    const labCta = document.querySelector('.lab__cta');
    if (labCta) {
      gsap.fromTo(labCta, { clipPath: 'inset(0 0 100% 0)', opacity: 0 }, {
        clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: labCta, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    }
  }

  function init() {
    document.fonts.ready.then(() => {
      initLenis(); initPreloader(); initCursor(); initNav(); initScroll(); initContactForm();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();

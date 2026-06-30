/* ============================================
   THE PRECISION CUTTER — WORK PAGE JS
   Bauhaus Geometry. Every Millimeter Matters.
   ============================================ */

(function () {
  'use strict';

  // ---- REDUCED MOTION / MOBILE DETECT ----
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  // ---- LENIS SMOOTH SCROLL ----
  const lenisEnabled = !prefersReducedMotion && !isMobile;
  const lenis = new Lenis({
    duration: lenisEnabled ? 1.4 : 0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: lenisEnabled,
  });

  if (lenisEnabled) {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  gsap.registerPlugin(ScrollTrigger);

  if (lenisEnabled) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  gsap.config({
    force3D: !prefersReducedMotion,
    autoSleep: 60,
    nullTargetWarn: false,
  });

  // ---- PRELOADER ----
  const preloaderTL = gsap.timeline({
    onComplete: () => {
      document.getElementById('preloader').style.pointerEvents = 'none';
      initPageAnimations();
    },
  });

  preloaderTL
    .to('.preloader-shape', { opacity: 1, duration: 0.3, stagger: 0.1 })
    .from('.shape-1', { rotation: -45, scale: 0.5, duration: 1.2, ease: 'power3.inOut' })
    .from('.shape-2', { x: 100, rotation: 90, scale: 0.5, duration: 1.2, ease: 'power3.inOut' }, '<0.15')
    .from('.shape-3', { y: -80, rotation: -90, scale: 0.5, duration: 1.2, ease: 'power3.inOut' }, '<0.1')
    .to('.shape-1', { x: -250, y: -150, rotation: 180, opacity: 0, duration: 0.8, ease: 'power2.in' }, '+=0.3')
    .to('.shape-2', { x: 200, y: 100, rotation: -180, opacity: 0, duration: 0.8, ease: 'power2.in' }, '<0.05')
    .to('.shape-3', { x: -100, y: 200, rotation: 270, opacity: 0, duration: 0.8, ease: 'power2.in' }, '<0.05')
    .to('#preloader', { opacity: 0, duration: 0.5, ease: 'power2.in' });

  // ---- PAGE ANIMATIONS ----
  function initPageAnimations() {
    animateHero();
    initGallery();
    initFilters();
    initNav();
    initCutLine();
    initSectionZoom();
    initCursor();
  }

  // ---- HERO ----
  function animateHero() {
    const heroTitleSplits = [];
    document.querySelectorAll('#work-hero .line').forEach((line) => {
      const split = new SplitType(line, { types: 'words' });
      heroTitleSplits.push(split);
    });

    if (prefersReducedMotion) {
      heroTitleSplits.forEach((s) => gsap.set(s.words, { y: '0%' }));
      gsap.set('#work-hero .section-number, #work-hero .work-filters', { opacity: 1, y: 0 });
      return;
    }

    heroTitleSplits.forEach((split, i) => {
      gsap.to(split.words, {
        y: '0%', duration: 1, stagger: 0.06, delay: 0.3 + i * 0.2, ease: 'power3.out',
      });
    });

    gsap.to('#work-hero .section-number', { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'power2.out' });
    gsap.to('#work-hero .work-filters', { opacity: 1, y: 0, duration: 0.8, delay: 1.1, ease: 'power2.out' });
  }

  // ---- FILTERS ----
  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const slides = document.querySelectorAll('.gallery-slide');
    const totalSlidesEl = document.getElementById('totalSlides');

    function updateTotal() {
      const visible = document.querySelectorAll('.gallery-slide:not(.hidden)');
      totalSlidesEl.textContent = String(visible.length).padStart(2, '0');
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        slides.forEach((slide) => {
          if (filter === 'all' || slide.dataset.category === filter) {
            slide.classList.remove('hidden');
            gsap.to(slide, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
          } else {
            gsap.to(slide, {
              opacity: 0,
              scale: 0.95,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => slide.classList.add('hidden'),
            });
          }
        });

        setTimeout(updateTotal, 400);
      });
    });
  }

  // ---- HORIZONTAL GALLERY ----
  function initGallery() {
    const track = document.getElementById('galleryTrack');
    const slides = gsap.utils.toArray('.gallery-slide');
    const progressFill = document.getElementById('galleryProgress');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let isDragging = false;
    let startX = 0;

    slides[0].classList.add('active');

    const galleryScroll = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: '#work-gallery',
        start: 'top top',
        end: () => '+=' + (track.scrollWidth - window.innerWidth),
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const visibleSlides = document.querySelectorAll('.gallery-slide:not(.hidden)');
          const visibleCount = visibleSlides.length;
          if (visibleCount === 0) return;
          const slideIndex = Math.min(Math.round(progress * (visibleCount - 1)), visibleCount - 1);

          if (slideIndex !== currentSlide) {
            slides[currentSlide].classList.remove('active');
            visibleSlides[slideIndex].classList.add('active');
            currentSlide = slideIndex;
            currentSlideEl.textContent = String(slideIndex + 1).padStart(2, '0');
          }

          progressFill.style.width = progress * 100 + '%';
        },
      },
    });

    // Drag
    const wrapper = document.getElementById('galleryWrapper');

    wrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      wrapper.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const diff = startX - e.clientX;
      const scrollAmount = diff * 2;
      const st = galleryScroll.scrollTrigger;
      const newScroll = st.start + (st.end - st.start) * Math.min(1, Math.max(0, st.progress + scrollAmount / (track.scrollWidth - window.innerWidth)));
      lenis.scrollTo(newScroll);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      wrapper.style.cursor = 'grab';
    });

    wrapper.style.cursor = 'grab';

    // Touch
    wrapper.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const diff = startX - e.touches[0].clientX;
      const scrollAmount = diff * 2;
      const st = galleryScroll.scrollTrigger;
      const newScroll = st.start + (st.end - st.start) * Math.min(1, Math.max(0, st.progress + scrollAmount / (track.scrollWidth - window.innerWidth)));
      lenis.scrollTo(newScroll);
    }, { passive: true });

    wrapper.addEventListener('touchend', () => { isDragging = false; });
  }

  // ---- NAVIGATION ----
  function initNav() {
    const navScramble = document.getElementById('navScramble');
    const navDropdown = document.getElementById('navDropdown');
    const navLabel = navScramble.querySelector('.nav-label');
    const sections = ['WORK', 'GALLERY', 'FILTER'];
    const sectionIds = ['work-hero', 'work-gallery', 'work-gallery'];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
    let currentSectionIndex = 0;

    function scrambleTo(text, el) {
      const original = text;
      let iteration = 0;
      const maxIterations = original.length * 3;
      const interval = setInterval(() => {
        el.textContent = original
          .split('')
          .map((char, i) => {
            if (i < iteration / 3) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        iteration++;
        if (iteration > maxIterations) {
          clearInterval(interval);
          el.textContent = original;
        }
      }, 30);
    }

    sectionIds.forEach((id, index) => {
      ScrollTrigger.create({
        trigger: '#' + id,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          if (currentSectionIndex !== index) {
            currentSectionIndex = index;
            scrambleTo(sections[index], navLabel);
          }
        },
        onEnterBack: () => {
          if (currentSectionIndex !== index) {
            currentSectionIndex = index;
            scrambleTo(sections[index], navLabel);
          }
        },
      });
    });

    navScramble.addEventListener('mouseenter', () => navDropdown.classList.add('active'));
    document.getElementById('nav-indicator').addEventListener('mouseleave', () => navDropdown.classList.remove('active'));

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        lenis.scrollTo(link.getAttribute('href'));
        navDropdown.classList.remove('active');
      });
    });
  }

  // ---- SIGNATURE CUT LINE ----
  function initCutLine() {
    const cutPath = document.getElementById('cutPath');
    gsap.to(cutPath, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1 },
    });
  }

  // ---- CUSTOM CURSOR ----
  function initCursor() {
    if (prefersReducedMotion || 'ontouchstart' in window) return;

    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateCursor() {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    const hoverTargets = document.querySelectorAll('a, button, .nav-scramble, .filter-btn, .gallery-slide');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    const galleryWrapper = document.getElementById('galleryWrapper');
    if (galleryWrapper) {
      galleryWrapper.addEventListener('mousedown', () => cursor.classList.add('dragging'));
      galleryWrapper.addEventListener('mouseup', () => cursor.classList.remove('dragging'));
    }
  }

  // ---- SECTION ZOOM ----
  function initSectionZoom() {
    if (prefersReducedMotion) return;

    gsap.utils.toArray('.pinned-section').forEach((section, i) => {
      if (i === 0) return;
      gsap.fromTo(section,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 35%', scrub: 1 },
        }
      );
    });
  }
})();

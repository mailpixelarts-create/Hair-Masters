/* THE RED CARPET DIRECTOR — GSAP Animations */
var AnimationManager = {
  isMobile: window.innerWidth < 768 || 'ontouchstart' in window,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  init: function() {
    if (this.reducedMotion) {
      document.querySelectorAll('.reveal-up, .reveal-clip').forEach(function(el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.clipPath = 'inset(0 0 0 0)';
      });
      return;
    }

    this.initRevealUp();
    this.initRevealClip();
    this.initScrollProgress();
    this.initHeroEntrance();
    this.initInterstitial();
    this.initFilmstrip();
    this.initArchiveGrid();
    this.initCraftSequence();
    this.initBackstageGrid();
    this.initDetailsMosaic();
    this.initFirstlook();
    this.initSuiteColumns();
    this.initSuiteQuote();
  },

  initRevealUp: function() {
    document.querySelectorAll('.reveal-up').forEach(function(el) {
      gsap.from(el, {
        y: AnimationManager.isMobile ? 40 : 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      });
    });
  },

  initRevealClip: function() {
    document.querySelectorAll('.reveal-clip').forEach(function(el) {
      gsap.fromTo(el,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.8, ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    });
  },

  initScrollProgress: function() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    gsap.to(bar, { width: '100%', ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 }
    });
  },

  initHeroEntrance: function() {
    var tl = gsap.timeline({ delay: 2.5 });
    tl.from('.hero-act', { clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'power3.inOut' })
      .from('.hero-title-line', { opacity: 0, y: 80, rotateX: -15, duration: 1.2, stagger: 0.15, ease: 'power4.out' }, '-=0.6')
      .from('.hero-tagline', { clipPath: 'inset(0 100% 0 0)', duration: 1.4, ease: 'power3.inOut' }, '-=0.5')
      .from('.hero-meta', { opacity: 0, y: 20, duration: 0.8, ease: 'power4.out' }, '-=0.6')
      .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6, ease: 'power4.out' }, '-=0.3');
  },

  initFilmstrip: function() {
    var track = document.getElementById('filmstrip-track');
    if (!track) return;

    gsap.to(track, {
      x: function() { return -(track.scrollWidth - window.innerWidth + 80); },
      ease: 'none',
      scrollTrigger: {
        trigger: '.filmstrip-wrapper',
        start: 'top top',
        end: function() { return '+=' + (track.scrollWidth - window.innerWidth + 160); },
        pin: true, scrub: 1, invalidateOnRefresh: true
      }
    });
  },

  initArchiveGrid: function() {
    var grid = document.querySelector('.archive-grid');
    if (!grid) return;

    grid.querySelectorAll('.archive-item').forEach(function(item, i) {
      gsap.from(item, {
        y: 60, opacity: 0, duration: 1,
        delay: i * 0.08, ease: 'power4.out',
        scrollTrigger: { trigger: grid, start: 'top 80%', toggleActions: 'play none none none' }
      });
    });
  },

  initCraftSequence: function() {
    document.querySelectorAll('.craft-step').forEach(function(step, i) {
      var visual = step.querySelector('.craft-visual');
      var info = step.querySelector('.craft-info');

      if (visual) {
        gsap.from(visual, {
          clipPath: 'inset(100% 0 0 0)', duration: 1.2, delay: i * 0.12, ease: 'power3.inOut',
          scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none none' }
        });
      }

      if (info) {
        gsap.from(info, {
          y: 30, opacity: 0, duration: 0.8, delay: i * 0.12 + 0.4, ease: 'power4.out',
          scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none none' }
        });
      }
    });
  },

  initDetailsMosaic: function() {
    var mosaic = document.querySelector('.details-mosaic');
    if (!mosaic) return;

    mosaic.querySelectorAll('.details-item').forEach(function(item, i) {
      gsap.from(item, {
        scale: 0.9, opacity: 0, duration: 0.8, delay: i * 0.06, ease: 'power4.out',
        scrollTrigger: { trigger: mosaic, start: 'top 80%', toggleActions: 'play none none none' }
      });
    });
  },

  initSuiteColumns: function() {
    document.querySelectorAll('.suite-col').forEach(function(col, i) {
      gsap.from(col, {
        y: 50, opacity: 0, duration: 1, delay: i * 0.1, ease: 'power4.out',
        scrollTrigger: { trigger: col.parentElement, start: 'top 80%', toggleActions: 'play none none none' }
      });
    });
  },

  initSuiteQuote: function() {
    var quote = document.querySelector('.suite-quote');
    if (!quote) return;

    gsap.fromTo(quote,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 2.5, ease: 'power3.inOut',
        scrollTrigger: { trigger: quote, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );
  },

  initInterstitial: function() {
    var scene = document.querySelector('.scene-interstitial');
    if (!scene) return;

    var corners = scene.querySelectorAll('.interstitial-corner');
    gsap.from(corners, {
      width: 0, height: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: scene, start: 'top 75%', toggleActions: 'play none none none' }
    });

    var quote = scene.querySelector('.interstitial-quote');
    if (quote) {
      gsap.fromTo(quote,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.8, ease: 'power3.out',
          scrollTrigger: { trigger: scene, start: 'top 65%', toggleActions: 'play none none reverse' }
        }
      );
    }
  },

  initBackstageGrid: function() {
    var grid = document.querySelector('.backstage-grid');
    if (!grid) return;

    grid.querySelectorAll('.backstage-item').forEach(function(item, i) {
      var frame = item.querySelector('.film-frame');
      var meta = item.querySelector('.backstage-meta');

      if (frame) {
        gsap.from(frame, {
          clipPath: 'inset(0 0 100% 0)', duration: 1.4, delay: i * 0.15, ease: 'power3.inOut',
          scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
        });
      }

      if (meta) {
        gsap.from(meta, {
          y: 20, opacity: 0, duration: 0.8, delay: i * 0.15 + 0.6, ease: 'power4.out',
          scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
        });
      }
    });
  },

  initFirstlook: function() {
    var slider = document.getElementById('firstlook-slider');
    if (!slider) return;

    var before = slider.querySelector('.firstlook-before');
    var handle = document.getElementById('firstlook-handle');
    if (!before || !handle) return;

    var isDragging = false;

    function getPercent(e) {
      var rect = slider.getBoundingClientRect();
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var x = clientX - rect.left;
      return Math.max(0, Math.min(100, (x / rect.width) * 100));
    }

    function updateSlider(percent) {
      before.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
      handle.style.left = percent + '%';
    }

    function onStart(e) {
      isDragging = true;
      slider.style.cursor = 'grabbing';
      updateSlider(getPercent(e));
      e.preventDefault();
    }

    function onMove(e) {
      if (!isDragging) return;
      updateSlider(getPercent(e));
    }

    function onEnd() {
      isDragging = false;
      slider.style.cursor = 'ew-resize';
    }

    slider.addEventListener('mousedown', onStart);
    slider.addEventListener('touchstart', onStart, { passive: false });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: true });
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);

    gsap.from(slider, {
      opacity: 0, y: 40, duration: 1.2, ease: 'power4.out',
      scrollTrigger: { trigger: slider, start: 'top 80%', toggleActions: 'play none none none' }
    });
  }
};

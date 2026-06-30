/* ============================================
   THE RUNWAY ARCHITECT — Preloader
   ============================================ */

const PreloaderManager = {
  element: null,
  percentEl: null,
  line: null,
  duration: 2200,
  startTime: null,
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  init() {
    this.element = document.getElementById('preloader');
    if (!this.element) return Promise.resolve();

    this.percentEl = this.element.querySelector('.preloader-percent');
    this.line = this.element.querySelector('.preloader-line');

    document.body.classList.add('loading');

    if (this.reducedMotion) {
      return this.skip();
    }

    return new Promise((resolve) => {
      this.startTime = Date.now();
      this.resolve = resolve;
      this.animate();
    });
  },

  animate() {
    const update = () => {
      const elapsed = Date.now() - this.startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * 100);

      this.percentEl.textContent = String(current).padStart(3, '0');

      if (this.line) {
        this.line.style.transform = `scaleX(${eased})`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        this.exit();
      }
    };

    requestAnimationFrame(update);
  },

  exit() {
    gsap.to(this.element, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete: () => {
        this.element.style.display = 'none';
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        this.resolve();
      }
    });
  },

  skip() {
    this.element.style.display = 'none';
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    return Promise.resolve();
  }
};

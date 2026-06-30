/* ============================================
   THE RUNWAY ARCHITECT — Preloader
   SOTD Premium Experience
   ============================================ */

const PreloaderManager = {
    element: null,
    percentEl: null,
    counter: 0,
    target: 100,
    duration: 2200,
    startTime: null,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

    init() {
        this.element = document.getElementById('preloader');
        if (!this.element) return Promise.resolve();

        this.percentEl = this.element.querySelector('.preloader__percent');

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
            this.counter = Math.floor(eased * this.target);

            this.percentEl.textContent = String(this.counter).padStart(3, '0');

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
                document.querySelector('.side-nav')?.classList.add('visible');
                document.querySelector('.mobile-nav')?.classList.add('visible');
                document.querySelector('.footer')?.classList.add('visible');

                if (this.resolve) this.resolve();
            }
        });
    },

    skip() {
        this.percentEl.textContent = '100';
        this.element.style.display = 'none';
        document.body.classList.add('loaded');
        document.querySelector('.side-nav')?.classList.add('visible');
        document.querySelector('.mobile-nav')?.classList.add('visible');
        document.querySelector('.footer')?.classList.add('visible');

        return Promise.resolve();
    }
};
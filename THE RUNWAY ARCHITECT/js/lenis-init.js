/* ============================================
   THE RUNWAY ARCHITECT — Lenis Smooth Scroll
   SOTD Premium Experience
   ============================================ */

const LenisManager = {
    instance: null,
    isMobile: window.innerWidth < 768,

    init() {
        if (this.isMobile) return;

        try {
            this.instance = new Lenis({
                lerp: 0.08,
                duration: 1.4,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2
            });

            this.syncWithGSAP();
            this.startLoop();

            return this.instance;
        } catch (e) {
            console.warn('Lenis initialization failed:', e);
            return null;
        }
    },

    syncWithGSAP() {
        if (!this.instance) return;

        this.instance.on('scroll', ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(document.documentElement, {
            scrollTop(value) {
                return arguments.length
                    ? LenisManager.instance.scrollTo(value)
                    : LenisManager.instance.scroll.progress * (document.body.scrollHeight - window.innerHeight);
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            fixedMarkers: false
        });
    },

    startLoop() {
        const raf = (time) => {
            this.instance.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        gsap.ticker.lagSmoothing(0);
    },

    scrollTo(target, options = {}) {
        if (!this.instance) return;
        this.instance.scrollTo(target, {
            offset: options.offset || 0,
            duration: options.duration || 1.4,
            easing: options.easing || (t => Math.min(1, 1.001 - Math.pow(2, -10 * t)))
        });
    },

    stop() {
        if (this.instance) this.instance.stop();
    },

    start() {
        if (this.instance) this.instance.start();
    },

    destroy() {
        if (this.instance) {
            this.instance.destroy();
            this.instance = null;
        }
    },

    reinit() {
        this.destroy();
        this.isMobile = window.innerWidth < 768;
        this.init();
    }
};
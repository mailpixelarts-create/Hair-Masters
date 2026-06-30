/* ============================================
   THE RUNWAY ARCHITECT — Barba.js Transitions
   SOTD Premium Experience
   ============================================ */

const BarbaManager = {
    init() {
        if (typeof barba === 'undefined') {
            console.warn('Barba.js not loaded');
            return;
        }

        barba.init({
            preventRunning: true,
            timeout: 10000,
            transitions: [{
                name: 'page-transition',
                async leave(data) {
                    const done = this.async();

                    LenisManager.stop();

                    gsap.to('.page-transition-overlay', {
                        clipPath: 'inset(0 0 0% 0)',
                        duration: 0.9,
                        ease: 'power4.inOut',
                        onComplete: () => done()
                    });
                },
                enter(data) {
                    window.scrollTo(0, 0);

                    LenisManager.reinit();

                    return new Promise((resolve) => {
                        gsap.fromTo('.page-transition-overlay',
                            { clipPath: 'inset(0 0 0% 0)' },
                            {
                                clipPath: 'inset(0 0 100% 0)',
                                duration: 0.9,
                                ease: 'power4.inOut',
                                onComplete: () => {
                                    ScrollTrigger.refresh();
                                    AnimationManager.init();
                                    SplitTextManager.init();
                                    resolve();
                                }
                            }
                        );
                    });
                },
                after() {
                    ScrollTrigger.refresh();
                    LenisManager.start();
                }
            }],
            views: [{
                namespace: 'home',
                afterEnter() {
                    AnimationManager.initHero();
                }
            }, {
                namespace: 'about',
                afterEnter() {
                    AnimationManager.initAbout();
                }
            }, {
                namespace: 'work',
                afterEnter() {
                    AnimationManager.initWork();
                    AnimationManager.initHorizontalScroll();
                }
            }]
        });
    }
};
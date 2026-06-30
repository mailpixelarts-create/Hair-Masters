/* ============================================
   THE RUNWAY ARCHITECT — GSAP Animations
   SOTD Premium Experience
   ============================================ */

const AnimationManager = {
    isMobile: window.innerWidth < 768,

    init() {
        gsap.registerPlugin(ScrollTrigger);
        this.initHero();
        this.initRevealAnimations();
        this.initParallax();
        this.initGalleryHover();
    },

    initHero() {
        const hero = document.querySelector('.section--command');
        if (!hero) return;

        const tl = gsap.timeline({ delay: 0.2 });

        tl.from('.section--command .label', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power4.out'
        })
        .from('.section--command .title-line', {
            opacity: 0,
            y: 60,
            duration: 1,
            stagger: 0.15,
            ease: 'power4.out'
        }, '-=0.4')
        .from('.section--command .section__subtitle', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power4.out'
        }, '-=0.5')
        .from('.section--command .section__meta', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power4.out'
        }, '-=0.4')
        .from('.section--command .section__scroll-indicator', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power4.out'
        }, '-=0.2');

        gsap.to('.section--command .section__bg-img', {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '.section--command',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    },

    initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            gsap.from(el, {
                y: this.isMobile ? 40 : 80,
                opacity: 0,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            });
        });

        const staggerReveals = document.querySelectorAll('.stagger-reveal');
        staggerReveals.forEach(container => {
            const children = container.children;
            gsap.from(children, {
                y: this.isMobile ? 30 : 60,
                opacity: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
    },

    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-speed]');
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.2;
            gsap.to(el, {
                yPercent: speed * 100 * (this.isMobile ? 0.5 : 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: el.closest('section') || el,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

        const bgImages = document.querySelectorAll('.section__bg-img');
        bgImages.forEach(img => {
            gsap.to(img, {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                    trigger: img.closest('section'),
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    },

    initHorizontalScroll() {
        const track = document.querySelector('.h-track');
        const wrapper = document.querySelector('.h-wrapper');
        if (!track || !wrapper) return;

        const sections = gsap.utils.toArray('.h-section');
        const totalWidth = sections.length * window.innerWidth;

        gsap.set(wrapper, { width: totalWidth });

        gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: '.h-container',
                pin: true,
                scrub: 1,
                end: () => `+=${track.scrollWidth}`,
                invalidateOnRefresh: true
            }
        });

        sections.forEach((section, i) => {
            if (i > 0) {
                gsap.fromTo(section,
                    { scale: 0.92, opacity: 0.6 },
                    {
                        scale: 1,
                        opacity: 1,
                        scrollTrigger: {
                            trigger: '.h-container',
                            start: () => `${(i - 1) * (100 / sections.length)}% top`,
                            end: () => `${i * (100 / sections.length)}% top`,
                            scrub: true,
                            invalidateOnRefresh: true
                        }
                    }
                );
            }
        });
    },

    initGalleryHover() {
        document.querySelectorAll('.gallery-item').forEach(item => {
            const img = item.querySelector('.gallery-item__img');
            const overlay = item.querySelector('.gallery-item__overlay');
            const line = item.querySelector('.gallery-item__line');

            item.addEventListener('mouseenter', () => {
                gsap.to(img, {
                    scale: 1.05,
                    duration: 0.6,
                    ease: 'power3.out'
                });
                if (line) {
                    gsap.to(line, {
                        width: '100%',
                        duration: 0.5,
                        ease: 'power3.out'
                    });
                }
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.6,
                    ease: 'power3.out'
                });
                if (line) {
                    gsap.to(line, {
                        width: 0,
                        duration: 0.4,
                        ease: 'power3.out'
                    });
                }
            });
        });
    },

    initAbout() {
        const hero = document.querySelector('.about-hero');
        if (!hero) return;

        const tl = gsap.timeline({ delay: 0.3 });

        tl.from('.about-hero__label', { opacity: 0, y: 20, duration: 0.8 })
          .from('.about-hero__title .title-line', { opacity: 0, y: 40, duration: 1, stagger: 0.15 }, '-=0.4')
          .from('.about-hero__name', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
          .from('.about-hero__tagline', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4');

        gsap.from('.bio-section__heading', {
            scrollTrigger: { trigger: '.bio-section', start: 'top 80%' },
            opacity: 0, x: -40, duration: 1
        });

        gsap.from('.bio-section__text', {
            scrollTrigger: { trigger: '.bio-section__body', start: 'top 80%' },
            opacity: 0, y: 30, duration: 0.8, stagger: 0.2
        });

        gsap.from('.approach-card', {
            scrollTrigger: { trigger: '.approach-grid', start: 'top 80%' },
            opacity: 0, y: 40, duration: 0.8, stagger: 0.15
        });
    },

    initWork() {
        const hero = document.querySelector('.work-hero');
        if (!hero) return;

        gsap.from('.work-hero__label', { opacity: 0, y: 20, duration: 0.8, delay: 0.3 });
        gsap.from('.work-hero__title', { opacity: 0, y: 40, duration: 1, delay: 0.5 });

        gsap.from('.gallery-item', {
            scrollTrigger: { trigger: '.gallery-grid', start: 'top 85%' },
            opacity: 0, y: 40, duration: 0.7, stagger: 0.08
        });
    }
};
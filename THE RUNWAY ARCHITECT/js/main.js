/* ============================================
   THE RUNWAY ARCHITECT — Main Initialization
   Single entry point — Lenis-free horizontal scroll
   ============================================ */

(function () {
    'use strict';

    const MOBILE_BREAKPOINT = 768;
    const IS_MOBILE = window.innerWidth < MOBILE_BREAKPOINT || 'ontouchstart' in window;
    const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const HAS_HORIZONTAL = !!document.querySelector('.horizontal-scroll');

    /* ============================================
       PRELOADER
       ============================================ */
    function runPreloader() {
        return new Promise((resolve) => {
            const preloader = document.getElementById('preloader');
            const percentEl = preloader ? preloader.querySelector('.preloader__percent') : null;

            if (!preloader || !percentEl || REDUCED_MOTION) {
                if (preloader) preloader.style.display = 'none';
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
                showNav();
                resolve();
                return;
            }

            const duration = 2200;
            const start = Date.now();

            const tick = () => {
                const elapsed = Date.now() - start;
                const p = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                percentEl.textContent = String(Math.floor(eased * 100)).padStart(3, '0');

                if (p < 1) {
                    requestAnimationFrame(tick);
                } else {
                    gsap.to(preloader, {
                        yPercent: -100,
                        duration: 0.9,
                        ease: 'power4.inOut',
                        onComplete() {
                            preloader.style.display = 'none';
                            document.body.classList.remove('loading');
                            document.body.classList.add('loaded');
                            showNav();
                            resolve();
                        }
                    });
                }
            };

            requestAnimationFrame(tick);
        });
    }

    function showNav() {
        document.querySelector('.side-nav')?.classList.add('visible');
        document.querySelector('.mobile-nav')?.classList.add('visible');
        document.querySelector('.footer')?.classList.add('visible');
    }

    /* ============================================
       LENIS — only on vertical-scroll pages
       ============================================ */
    let lenis = null;

    function initLenis() {
        if (IS_MOBILE || HAS_HORIZONTAL || lenis) return;

        try {
            lenis = new Lenis({ lerp: 0.08, duration: 1.4, smoothWheel: true });
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);
        } catch (e) {
            console.warn('Lenis failed:', e);
        }
    }

    /* ============================================
       HORIZONTAL SCROLL (index.html)
       ============================================ */
    function initHorizontalScroll() {
        const container = document.querySelector('.horizontal-scroll');
        const wrapper = document.querySelector('.horizontal-scroll__wrapper');
        if (!container || !wrapper) return;

        const sections = gsap.utils.toArray('.section', wrapper);
        if (!sections.length) return;

        const getScrollDistance = () => wrapper.scrollWidth - container.clientWidth;

        gsap.to(wrapper, {
            x: () => -getScrollDistance(),
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 1,
                end: () => '+=' + getScrollDistance(),
                invalidateOnRefresh: true
            }
        });
    }

    /* ============================================
       HERO ENTRANCE
       ============================================ */
    function animateHero() {
        const hero = document.querySelector('.section--command');
        if (!hero) return;

        const tl = gsap.timeline({ delay: 0.3 });

        tl.from('.section--command .label', {
            opacity: 0, y: 30, duration: 0.8, ease: 'power4.out'
        })
        .from('.section--command .title-line', {
            opacity: 0, y: 60, duration: 1, stagger: 0.15, ease: 'power4.out'
        }, '-=0.4')
        .from('.section--command .section__subtitle', {
            opacity: 0, y: 30, duration: 0.8, ease: 'power4.out'
        }, '-=0.5')
        .from('.section--command .section__meta', {
            opacity: 0, y: 20, duration: 0.6, ease: 'power4.out'
        }, '-=0.4')
        .from('.section--command .section__scroll-indicator', {
            opacity: 0, y: 20, duration: 0.6, ease: 'power4.out'
        }, '-=0.2');
    }

    /* ============================================
       SCROLL REVEALS (vertical pages only)
       ============================================ */
    function initReveals() {
        if (REDUCED_MOTION || HAS_HORIZONTAL) return;

        document.querySelectorAll('.reveal').forEach(el => {
            gsap.from(el, {
                y: IS_MOBILE ? 40 : 60,
                opacity: 0,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        });

        document.querySelectorAll('.stagger-reveal').forEach(container => {
            gsap.from(container.children, {
                y: IS_MOBILE ? 30 : 50,
                opacity: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    /* ============================================
       CUSTOM CURSOR (desktop only)
       ============================================ */
    function initCursor() {
        if (IS_MOBILE) return;

        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.innerHTML = '<div class="cursor-dot__inner"></div>';

        const follower = document.createElement('div');
        follower.className = 'cursor-follower';

        document.body.appendChild(dot);
        document.body.appendChild(follower);

        gsap.set(dot, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(follower, 'x', { duration: 0.4, ease: 'power3' });
        const yTo = gsap.quickTo(follower, 'y', { duration: 0.4, ease: 'power3' });

        document.addEventListener('mousemove', e => {
            gsap.set(dot, { x: e.clientX, y: e.clientY });
            xTo(e.clientX);
            yTo(e.clientY);
        });

        document.querySelectorAll('a, button, .gallery-index__item, .gallery-item, .filter-btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(follower, { scale: 2.5, duration: 0.3, ease: 'power2.out' });
                follower.classList.add('is-hover');
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(follower, { scale: 1, duration: 0.3, ease: 'power2.out' });
                follower.classList.remove('is-hover');
            });
        });
    }

    /* ============================================
       GALLERY FILTER (work.html)
       ============================================ */
    function initFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll('.gallery-item');
        const countEl = document.getElementById('visibleCount');
        if (!filterBtns.length || !items.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                let visibleCount = 0;
                items.forEach(item => {
                    const match = filter === 'all' || item.dataset.category === filter;
                    item.classList.toggle('dimmed', !match);
                    if (match) visibleCount++;
                });

                if (countEl) countEl.textContent = visibleCount;

                gsap.from('.gallery-item:not(.dimmed)', {
                    opacity: 0.3, y: 15, duration: 0.5, stagger: 0.04, ease: 'power2.out'
                });
            });
        });
    }

    /* ============================================
       NAVIGATION
       ============================================ */
    function initNavigation() {
        document.querySelectorAll('.side-nav__link, .mobile-nav__link, .gallery-index__item').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href !== '#') window.location.href = href;
            });
        });
    }

    /* ============================================
       FALLBACK
       ============================================ */
    function fallback() {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.style.display = 'none';
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        showNav();
    }

    /* ============================================
       BOOT
       ============================================ */
    async function boot() {
        try {
            gsap.registerPlugin(ScrollTrigger);
            await runPreloader();
            initLenis();
            animateHero();
            initHorizontalScroll();
            initReveals();
            initNavigation();
            initFilter();
            initCursor();
            ScrollTrigger.refresh();
        } catch (e) {
            console.error('Boot error:', e);
            fallback();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

})();
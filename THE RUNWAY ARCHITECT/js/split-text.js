/* ============================================
   THE RUNWAY ARCHITECT — Split Text
   SOTD Premium Experience
   ============================================ */

const SplitTextManager = {
    instances: [],

    init() {
        this.destroy();

        const splitElements = document.querySelectorAll('[data-split]');
        splitElements.forEach(el => {
            const type = el.dataset.split || 'words,chars';
            try {
                const split = new SplitType(el, { types: type });
                this.instances.push(split);
                this.animateWords(el);
            } catch (e) {
                console.warn('SplitType failed for element:', el, e);
            }
        });
    },

    animateWords(container) {
        const words = container.querySelectorAll('.word');
        if (!words.length) return;

        gsap.set(words, { yPercent: 100, opacity: 0 });

        gsap.to(words, {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.04,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    },

    animateHeroText(selector) {
        const el = document.querySelector(selector);
        if (!el) return;

        try {
            const split = new SplitType(el, { types: 'words,chars' });
            this.instances.push(split);

            const chars = el.querySelectorAll('.char');
            gsap.from(chars, {
                y: '100%',
                opacity: 0,
                duration: 0.8,
                stagger: 0.02,
                ease: 'power4.out',
                delay: 0.5
            });
        } catch (e) {
            console.warn('SplitType hero animation failed:', e);
        }
    },

    destroy() {
        this.instances.forEach(instance => {
            try {
                instance.revert();
            } catch (e) {}
        });
        this.instances = [];
    }
};
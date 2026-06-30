/* ============================================
   THE RUNWAY ARCHITECT — Custom Cursor
   SOTD Premium Experience
   ============================================ */

const CursorManager = {
    dot: null,
    follower: null,
    xTo: null,
    yTo: null,
    isMobile: window.innerWidth < 768 || 'ontouchstart' in window,

    init() {
        if (this.isMobile) return;

        this.createElements();
        this.setupMovement();
        this.setupHoverStates();
        this.animate();
    },

    createElements() {
        this.dot = document.createElement('div');
        this.dot.className = 'cursor-dot';
        this.dot.innerHTML = '<div class="cursor-dot__inner"></div>';

        this.follower = document.createElement('div');
        this.follower.className = 'cursor-follower';

        document.body.appendChild(this.dot);
        document.body.appendChild(this.follower);

        gsap.set(this.dot, { xPercent: -50, yPercent: -50 });
        gsap.set(this.follower, { xPercent: -50, yPercent: -50 });
    },

    setupMovement() {
        this.xTo = gsap.quickTo(this.follower, 'x', {
            duration: 0.4,
            ease: 'power3'
        });

        this.yTo = gsap.quickTo(this.follower, 'y', {
            duration: 0.4,
            ease: 'power3'
        });

        document.addEventListener('mousemove', (e) => {
            gsap.set(this.dot, { x: e.clientX, y: e.clientY });
            this.xTo(e.clientX);
            this.yTo(e.clientY);
        });
    },

    setupHoverStates() {
        const hoverElements = document.querySelectorAll('a, button, .gallery-index__item, .gallery-item, .filter-btn');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(this.follower, {
                    scale: 2.5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                this.follower.classList.add('is-hover');
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(this.follower, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                this.follower.classList.remove('is-hover');
            });
        });

        document.addEventListener('mouseleave', () => {
            gsap.to([this.dot, this.follower], {
                opacity: 0,
                duration: 0.3
            });
        });

        document.addEventListener('mouseenter', () => {
            gsap.to([this.dot, this.follower], {
                opacity: 1,
                duration: 0.3
            });
        });
    },

    animate() {
        const render = () => {
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
    },

    destroy() {
        if (this.dot) this.dot.remove();
        if (this.follower) this.follower.remove();
    }
};
/* ============================================
   THE RUNWAY ARCHITECT — Custom Cursor v2
   ============================================ */

const CursorManager = {
  dot: null,
  follower: null,
  xTo: null,
  yTo: null,
  isMobile: window.innerWidth < 768 || 'ontouchstart' in window,

  init() {
    if (this.isMobile) return;

    this.dot = document.getElementById('cursor-dot');
    this.follower = document.getElementById('cursor-follower');

    if (!this.dot || !this.follower) return;

    gsap.set(this.dot, { xPercent: -50, yPercent: -50 });
    gsap.set(this.follower, { xPercent: -50, yPercent: -50 });

    this.xTo = gsap.quickTo(this.follower, 'x', { duration: 0.4, ease: 'power3' });
    this.yTo = gsap.quickTo(this.follower, 'y', { duration: 0.4, ease: 'power3' });

    document.addEventListener('mousemove', (e) => {
      gsap.set(this.dot, { x: e.clientX, y: e.clientY });
      this.xTo(e.clientX);
      this.yTo(e.clientY);
    });

    // Hover interactions — scale + mix-blend-mode difference
    document.querySelectorAll('a, button, .portfolio-item, .filmstrip-item, .backstage-item, .suite-block').forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(this.follower, {
          scale: 2.5,
          mixBlendMode: 'difference',
          borderColor: '#6B2D3E',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(this.dot, {
          scale: 0.5,
          background: '#6B2D3E',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(this.follower, {
          scale: 1,
          mixBlendMode: 'difference',
          borderColor: '#F5F0EB',
          duration: 0.3,
          ease: 'power2.out'
        });
        gsap.to(this.dot, {
          scale: 1,
          background: '#F5F0EB',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Hide cursor when leaving viewport
    document.addEventListener('mouseleave', () => {
      gsap.to([this.dot, this.follower], { opacity: 0, duration: 0.3 });
    });

    document.addEventListener('mouseenter', () => {
      gsap.to([this.dot, this.follower], { opacity: 1, duration: 0.3 });
    });

    // Reveal cursor after preloader
    gsap.to([this.dot, this.follower], { opacity: 1, duration: 0.6, delay: 2.5 });
  }
};

/* THE RED CARPET DIRECTOR — Custom Cursor */
var CursorManager = {
  dot: null,
  follower: null,
  xTo: null,
  yTo: null,
  isMobile: window.innerWidth < 768 || 'ontouchstart' in window,

  init: function() {
    if (this.isMobile) return;

    this.dot = document.getElementById('cursor-dot');
    this.follower = document.getElementById('cursor-follower');
    if (!this.dot || !this.follower) return;

    gsap.set(this.dot, { xPercent: -50, yPercent: -50 });
    gsap.set(this.follower, { xPercent: -50, yPercent: -50 });

    this.xTo = gsap.quickTo(this.follower, 'x', { duration: 0.4, ease: 'power3' });
    this.yTo = gsap.quickTo(this.follower, 'y', { duration: 0.4, ease: 'power3' });

    var self = this;
    document.addEventListener('mousemove', function(e) {
      gsap.set(self.dot, { x: e.clientX, y: e.clientY });
      self.xTo(e.clientX);
      self.yTo(e.clientY);
    });

    document.querySelectorAll('a, button, .archive-item, .filmstrip-item, .details-item, .suite-col').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        gsap.to(self.follower, { scale: 2.5, mixBlendMode: 'difference', borderColor: '#9A7C52', duration: 0.3, ease: 'power2.out' });
        gsap.to(self.dot, { scale: 0.5, background: '#9A7C52', duration: 0.3, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', function() {
        gsap.to(self.follower, { scale: 1, mixBlendMode: 'difference', borderColor: '#D4C4A8', duration: 0.3, ease: 'power2.out' });
        gsap.to(self.dot, { scale: 1, background: '#D4C4A8', duration: 0.3, ease: 'power2.out' });
      });
    });

    document.addEventListener('mouseleave', function() { gsap.to([self.dot, self.follower], { opacity: 0, duration: 0.3 }); });
    document.addEventListener('mouseenter', function() { gsap.to([self.dot, self.follower], { opacity: 1, duration: 0.3 }); });
    gsap.to([this.dot, this.follower], { opacity: 1, duration: 0.6, delay: 2.5 });
  }
};

/* ============================================
   THE BRIDAL SCULPTOR — Custom Cursor
   ============================================ */

function initCursor() {
  // Skip on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const dot = document.querySelector('.cursor-dot');
  const follower = document.querySelector('.cursor-follower');

  if (!dot || !follower) return;

  // Smooth follower movement
  const xTo = gsap.quickTo(follower, 'x', {
    duration: 0.4,
    ease: 'power3'
  });

  const yTo = gsap.quickTo(follower, 'y', {
    duration: 0.4,
    ease: 'power3'
  });

  // Mouse move handler
  window.addEventListener('mousemove', (e) => {
    gsap.set(dot, { x: e.clientX, y: e.clientY });
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // Hover states for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .gallery-card, .look-card');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(follower, {
        scale: 2,
        opacity: 0.6,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(dot, {
        scale: 0.5,
        duration: 0.3
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(follower, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.3
      });
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    gsap.to([dot, follower], {
      opacity: 0,
      duration: 0.3
    });
  });

  document.addEventListener('mouseenter', () => {
    gsap.to([dot, follower], {
      opacity: 1,
      duration: 0.3
    });
  });
}

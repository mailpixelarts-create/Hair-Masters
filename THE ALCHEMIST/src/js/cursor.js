/* ============================================
   THE ALCHEMIST — Custom Cursor
   ============================================ */

export function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const follower = document.getElementById('cursor-follower');

  if (!dot || !follower) return;

  // Skip on touch devices
  if ('ontouchstart' in window) {
    dot.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  // Skip on mobile
  if (window.innerWidth < 768) {
    dot.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  const xTo = gsap.quickTo(follower, 'x', {
    duration: 0.4,
    ease: 'power3'
  });

  const yTo = gsap.quickTo(follower, 'y', {
    duration: 0.4,
    ease: 'power3'
  });

  window.addEventListener('mousemove', (e) => {
    gsap.set(dot, { x: e.clientX, y: e.clientY });
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // Hover states for links and buttons
  const interactiveElements = document.querySelectorAll('a, button, .pathway-card, .slider-container');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(follower, {
        scale: 2.5,
        mixBlendMode: 'difference',
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(follower, {
        scale: 1,
        mixBlendMode: 'normal',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

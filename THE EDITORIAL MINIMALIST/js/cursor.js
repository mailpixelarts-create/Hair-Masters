/* ============================================
   Custom Cursor
   Dot (8px) + Follower (40px border)
   ============================================ */

function initCursor() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  if (reduced || isMobile) {
    document.body.style.cursor = 'auto';
    const dot = document.getElementById('cursorDot');
    const follower = document.getElementById('cursorFollower');
    if (dot) dot.style.display = 'none';
    if (follower) follower.style.display = 'none';
    return;
  }

  document.body.style.cursor = 'none';

  const xTo = gsap.quickTo('#cursorFollower', 'x', { duration: 0.4, ease: 'power3' });
  const yTo = gsap.quickTo('#cursorFollower', 'y', { duration: 0.4, ease: 'power3' });

  document.addEventListener('mousemove', (e) => {
    gsap.set('#cursorDot', { x: e.clientX, y: e.clientY });
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // Hover scale on links, buttons, images
  const hoverEls = document.querySelectorAll('a, button, .portfolio__item, .pathways__card, .philosophy__img-wrap, .method__step-img-wrap, .experience__img-wrap, .magnetic-btn');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to('#cursorFollower', { scale: 2.5, duration: 0.4, ease: 'power2.out', mixBlendMode: 'difference' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to('#cursorFollower', { scale: 1, duration: 0.4, ease: 'power2.out', mixBlendMode: 'normal' });
    });
  });
}

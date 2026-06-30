/* ============================================
   THE AVANT-GARDE TRANSFORMER — Custom Cursor
   Dot (8px) instant, follower (40px) gsap.quickTo
   Hover: scale 2.5x, mix-blend-mode: difference
   ============================================ */

function initCursor() {
  const isMobile = window.innerWidth <= 768;
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  if (isMobile || hasCoarsePointer) return;

  const dot = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (!dot || !follower) return;

  const xTo = gsap.quickTo(follower, 'left', { duration: 0.4, ease: 'power3' });
  const yTo = gsap.quickTo(follower, 'top', { duration: 0.4, ease: 'power3' });

  document.addEventListener('mousemove', (e) => {
    gsap.set(dot, { left: e.clientX, top: e.clientY });
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // Hover targets — scale follower, blend mode
  const hoverTargets = document.querySelectorAll(
    'a, button, .archive__frame, .silhouette__study, .construction__card, .atmosphere__item, .manifesto__crop, .invocation__cta, .nav__cta'
  );

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(follower, {
        width: 100,
        height: 100,
        borderColor: 'var(--accent)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(dot, {
        width: 60,
        height: 60,
        background: 'var(--accent)',
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(follower, {
        width: 40,
        height: 40,
        borderColor: 'rgba(232, 228, 223, 0.3)',
        duration: 0.4,
        ease: 'power3.out',
      });
      gsap.to(dot, {
        width: 8,
        height: 8,
        background: 'var(--text-primary)',
        duration: 0.4,
        ease: 'power3.out',
      });
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    gsap.to([dot, follower], { opacity: 0, duration: 0.3 });
  });

  document.addEventListener('mouseenter', () => {
    gsap.to([dot, follower], { opacity: 1, duration: 0.3 });
  });
}

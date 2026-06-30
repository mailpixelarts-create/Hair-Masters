/* ============================================
   THE BRIDAL SCULPTOR — Preloader
   ============================================ */

function initPreloader() {
  return new Promise((resolve) => {
    const preloader = document.querySelector('.preloader');
    const counter = document.querySelector('.preloader-count');
    const barAfter = document.querySelector('.preloader-bar');

    if (!preloader || !counter) {
      resolve();
      return;
    }

    // Skip animation for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      preloader.style.display = 'none';
      resolve();
      return;
    }

    // Create a progress element inside the bar for animation
    const progress = document.createElement('div');
    progress.style.cssText = 'position:absolute;inset:0;background:#C9A96E;transform:scaleX(0);transform-origin:left;transition:none;';
    barAfter.style.position = 'relative';
    barAfter.style.overflow = 'hidden';
    barAfter.appendChild(progress);

    let count = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Preloader exit
        gsap.to(preloader, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => {
            preloader.style.display = 'none';
            resolve();
          }
        });
      }
    });

    // Count animation
    tl.to(count, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        counter.textContent = Math.round(count.val);
      }
    });

    // Bar fill
    tl.to(progress, {
      scaleX: 1,
      duration: 2,
      ease: 'power2.inOut'
    }, 0);
  });
}

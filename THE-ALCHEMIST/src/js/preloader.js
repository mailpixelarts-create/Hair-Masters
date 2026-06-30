/* ============================================
   THE ALCHEMIST — Preloader
   ============================================ */

export function initPreloader() {
  const preloader = document.getElementById('preloader');
  const countEl = document.getElementById('preloader-count');
  const line = preloader.querySelector('.preloader-line');

  if (!preloader || !countEl) return;

  let count = 0;

  // Animate count from 0 to 100
  const counter = gsap.to({ val: 0 }, {
    val: 100,
    duration: 2,
    ease: 'power2.inOut',
    onUpdate() {
      count = Math.round(counter.targets()[0].val);
      countEl.textContent = count;
    },
    onComplete() {
      // Animate line
      gsap.to(line, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: exitPreloader
      });
    }
  });

  function exitPreloader() {
    gsap.to(preloader, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      onComplete: () => {
        preloader.style.display = 'none';
        // Dispatch event for main.js to continue initialization
        window.dispatchEvent(new CustomEvent('preloader:complete'));
      }
    });
  }
}

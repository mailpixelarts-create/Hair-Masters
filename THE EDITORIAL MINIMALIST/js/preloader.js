/* ============================================
   Preloader
   Count 0→100 over 2s, then exit
   ============================================ */

function initPreloader() {
  return new Promise((resolve) => {
    const preloader = document.getElementById('preloader');
    const counter = document.getElementById('preloaderCount');
    const barFill = document.querySelector('.preloader__bar-fill');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !preloader) {
      if (preloader) preloader.style.display = 'none';
      resolve();
      return;
    }

    const count = { val: 0 };

    gsap.to(count, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate() {
        const v = Math.round(count.val);
        if (counter) counter.textContent = v;
        if (barFill) barFill.style.width = v + '%';
      },
      onComplete() {
        gsap.to(preloader, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete() {
            preloader.style.display = 'none';
            resolve();
          },
        });
      },
    });
  });
}

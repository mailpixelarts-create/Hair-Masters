/* ============================================
   THE AVANT-GARDE TRANSFORMER — Preloader
   Count 0→100 over 2s, then yPercent: -100 exit
   ============================================ */

function initPreloader() {
  return new Promise((resolve) => {
    const preloader = document.querySelector('.preloader');
    const wipe = document.querySelector('.preloader__wipe');
    const countEl = document.querySelector('.preloader__count');

    if (!preloader || !countEl) {
      if (preloader) preloader.style.display = 'none';
      resolve();
      return;
    }

    const count = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        preloader.style.display = 'none';
        resolve();
      },
    });

    // Count 0 → 100
    tl.to(count, {
      value: 100,
      duration: 2,
      ease: 'power1.inOut',
      onUpdate: () => {
        countEl.textContent = String(Math.floor(count.value)).padStart(3, '0');
      },
    });

    // Preloader exits — slide up
    tl.to(preloader, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
    });

    // Wipe exits if present
    if (wipe) {
      tl.set(wipe, { visibility: 'visible' }, '<');
      tl.fromTo(
        wipe,
        { scaleY: 1, transformOrigin: 'bottom' },
        {
          scaleY: 0,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => {
            wipe.style.visibility = 'hidden';
          },
        },
        '-=0.9'
      );
    }
  });
}

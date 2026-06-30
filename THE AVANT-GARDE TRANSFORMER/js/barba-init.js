/* ============================================
   THE AVANT-GARDE TRANSFORMER — Barba.js Transitions
   Spec: clip-path exit, destroy/reinit Lenis,
   ScrollTrigger.refresh, fade+y enter
   ============================================ */

function initBarba() {
  barba.init({
    transitions: [
      {
        name: 'page-transition',

        async leave(data) {
          const done = this.async();

          // Exit: clip-path from full to hidden
          gsap.to(data.current.container, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.8,
            ease: 'power4.inOut',
            onComplete: () => {
              done();
            },
          });
        },

        async enter(data) {
          const done = this.async();

          // Destroy Lenis
          if (typeof destroyLenis === 'function') destroyLenis();

          // Reinit Lenis
          if (typeof initLenis === 'function') initLenis();

          // Reinit animations
          if (typeof initAnimations === 'function') initAnimations();
          if (typeof initCursor === 'function') initCursor();
          if (typeof initGallery === 'function') initGallery();

          // Split and reveal hero text on new page
          const heroTitle = data.next.container.querySelector('.threshold__title');
          if (heroTitle) {
            splitTextElements('.threshold__title');
            revealWords('.threshold__title', { delay: 0.3, stagger: 0.06 });
          }

          // Scroll to top
          window.scrollTo(0, 0);
          ScrollTrigger.refresh();

          // Enter: fade + y translate
          gsap.fromTo(
            data.next.container,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              onComplete: () => {
                done();
              },
            }
          );
        },
      },
    ],
  });
}

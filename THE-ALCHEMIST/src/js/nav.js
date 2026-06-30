/* ============================================
   THE ALCHEMIST — Navigation
   ============================================ */

export function initNav() {
  const scenes = document.querySelectorAll('.scene');
  const navLinks = document.querySelectorAll('.nav-scene');

  if (!scenes.length || !navLinks.length) return;

  // ScrollTrigger for each scene to update nav
  scenes.forEach((scene, index) => {
    ScrollTrigger.create({
      trigger: scene,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => updateActiveNav(index + 1),
      onEnterBack: () => updateActiveNav(index + 1)
    });
  });

  function updateActiveNav(activeIndex) {
    navLinks.forEach(link => {
      const sceneIndex = parseInt(link.dataset.scene);
      if (sceneIndex === activeIndex) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Click to scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target && window.lenis) {
        window.lenis.scrollTo(target, { offset: 0 });
      }
    });
  });
}

/* ============================================
   THE AVANT-GARDE TRANSFORMER — Gallery v2.0
   Hover states, image transitions, lightbox.
   Updated for 8-act film structure BEM classes.
   ============================================ */

function initGallery() {
  // Archive frames — subtle tilt on hover
  const archiveFrames = document.querySelectorAll('.archive__frame');
  archiveFrames.forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(img, {
        rotateY: x * 5,
        rotateX: -y * 5,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(img, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    });
  });

  // Silhouette studies — subtle tilt on hover
  const silhouetteStudies = document.querySelectorAll('.silhouette__study');
  silhouetteStudies.forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(img, {
        rotateY: x * 3,
        rotateX: -y * 3,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(img, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    });
  });

  // Construction cards — subtle tilt on hover
  const constructionCards = document.querySelectorAll('.construction__card');
  constructionCards.forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(img, {
        rotateY: x * 4,
        rotateX: -y * 4,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(img, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    });
  });

  // Atmosphere items — subtle parallax on hover
  const atmosphereItems = document.querySelectorAll('.atmosphere__item');
  atmosphereItems.forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(img, {
        x: x * 10,
        y: y * 10,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(img, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    });
  });

  // Manifesto crops — subtle scale on hover
  const manifestoCrops = document.querySelectorAll('.manifesto__crop');
  manifestoCrops.forEach(item => {
    const img = item.querySelector('img');
    if (!img) return;

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(img, {
        rotateY: x * 4,
        rotateX: -y * 4,
        scale: 1.03,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(img, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      });
    });
  });
}

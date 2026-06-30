import { gsap } from 'gsap';

export function initParallax() {
  document.addEventListener('mousemove', (e) => {
    gsap.to('.hero-image', {
      x: (e.clientX - window.innerWidth / 2) / 40,
      y: (e.clientY - window.innerHeight / 2) / 40,
      duration: 2,
    });
  });
}

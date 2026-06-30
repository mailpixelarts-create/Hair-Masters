import { gsap } from 'gsap';

export function initTimeline() {
  const tl = gsap.timeline();

  tl.from('.sidebar', {
    x: -120,
    opacity: 0,
    duration: 1,
  })
    .from('.headline > *', {
      y: 70,
      opacity: 0,
      stagger: 0.18,
      duration: 1,
    }, '-=0.3')
    .from('.hero-image', {
      scale: 1.35,
      duration: 7,
      ease: 'power2.out',
    }, '<')
    .to('.flash', {
      opacity: 0.95,
      duration: 0.08,
    }, '+=0.4')
    .to('.flash', {
      opacity: 0,
      duration: 0.12,
    })
    .to('.flash', {
      opacity: 0.8,
      duration: 0.08,
    }, '+=0.8')
    .to('.flash', {
      opacity: 0,
      duration: 0.12,
    });

  return tl;
}

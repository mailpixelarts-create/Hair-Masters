import './styles/variables.css';
import './styles/base.css';
import './styles/hero.css';
import './styles/sections.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

function initHeroTimeline() {
  const tl = gsap.timeline();
  tl.from('.sidebar', { x: -120, opacity: 0, duration: 1 })
    .from('.headline > *', { y: 70, opacity: 0, stagger: 0.18, duration: 1 }, '-=0.3')
    .from('.hero-image', { scale: 1.35, duration: 7, ease: 'power2.out' }, '<')
    .to('.flash', { opacity: 0.95, duration: 0.08 }, '+=0.4')
    .to('.flash', { opacity: 0, duration: 0.12 })
    .to('.flash', { opacity: 0.8, duration: 0.08 }, '+=0.8')
    .to('.flash', { opacity: 0, duration: 0.12 });
}

function initParallax() {
  document.addEventListener('mousemove', (e) => {
    gsap.to('.hero-image', {
      x: (e.clientX - window.innerWidth / 2) / 40,
      y: (e.clientY - window.innerHeight / 2) / 40,
      duration: 2,
    });
  });
}

function createReveal(selector, trigger, vars = {}) {
  const el = document.querySelector(selector);
  if (!el) return;
  gsap.set(selector, { opacity: 0, y: vars.y || 50 });
  ScrollTrigger.create({
    trigger: trigger,
    start: vars.start || 'top 80%',
    onEnter: () => {
      gsap.to(selector, {
        opacity: 1, y: 0,
        duration: vars.duration || 0.8,
        ease: 'power3.out',
        delay: vars.delay || 0,
      });
    },
    once: true,
  });
}

function createStaggerReveal(selector, trigger, vars = {}) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  gsap.set(selector, { opacity: 0, y: vars.y || 60 });
  ScrollTrigger.create({
    trigger: trigger,
    start: vars.start || 'top 80%',
    onEnter: () => {
      gsap.to(selector, {
        opacity: 1, y: 0,
        duration: vars.duration || 0.8,
        ease: 'power3.out',
        stagger: vars.stagger || 0.15,
        delay: vars.delay || 0,
      });
    },
    once: true,
  });
}

function initScrollAnimations() {
  createReveal('.scene--identity .scene__kicker', '.scene--identity', { start: 'top 85%' });
  createReveal('.scene--identity .scene__title', '.scene--identity', { start: 'top 80%', delay: 0.1 });
  createReveal('.scene--identity .scene__body', '.scene--identity', { start: 'top 75%', delay: 0.2 });
  createReveal('.scene--identity .scene__image-block', '.scene--identity .scene__visual', { y: 30, duration: 1 });
  createReveal('.scene--identity .scene__stat', '.scene--identity .scene__visual', { delay: 0.3 });

  createReveal('.scene--campaign .scene__kicker', '.scene--campaign', { start: 'top 85%' });
  createReveal('.scene--campaign .scene__title', '.scene--campaign', { start: 'top 80%', delay: 0.1 });
  createStaggerReveal('.gallery__item', '.gallery', { start: 'top 90%', y: 80, stagger: 0.12 });

  createReveal('.scene--immersion .scene__image-block', '.scene--immersion', { y: 30, duration: 1 });
  createReveal('.scene--immersion .scene__kicker', '.scene--immersion .scene__content', { start: 'top 85%' });
  createReveal('.scene--immersion .scene__title', '.scene--immersion .scene__content', { start: 'top 80%', delay: 0.1 });
  createReveal('.scene--immersion .scene__body', '.scene--immersion .scene__content', { start: 'top 75%', delay: 0.2 });

  createReveal('.scene--craft .scene__kicker', '.scene--craft', { start: 'top 85%' });
  createReveal('.scene--craft .scene__title', '.scene--craft', { start: 'top 80%', delay: 0.1 });
  createStaggerReveal('.craft-grid__item', '.craft-grid', { start: 'top 90%', y: 50, stagger: 0.1 });

  createReveal('.scene--transformation .scene__kicker', '.scene--transformation', { start: 'top 85%' });
  createReveal('.scene--transformation .scene__title', '.scene--transformation', { start: 'top 80%', delay: 0.1 });
  createReveal('.scene--transformation .scene__body', '.scene--transformation', { start: 'top 75%', delay: 0.2 });
  createReveal('.scene--transformation .scene__image-block', '.scene--transformation .scene__visual', { y: 30, duration: 1 });

  createReveal('.scene--connection .scene__kicker', '.scene--connection', { start: 'top 85%' });
  createReveal('.scene--connection .scene__title', '.scene--connection', { start: 'top 80%', delay: 0.1 });
  createReveal('.scene--connection .scene__body', '.scene--connection', { start: 'top 75%', delay: 0.2 });
  createReveal('.cta-group', '.scene--connection', { start: 'top 70%', delay: 0.3 });

  createReveal('.footer__brand', '.footer', { start: 'top 95%', y: 30 });
  createStaggerReveal('.footer__col', '.footer__links', { start: 'top 95%', y: 30, stagger: 0.1 });
  createReveal('.footer__bottom', '.footer', { start: 'top 90%', y: 20, delay: 0.2 });
}

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initHeroTimeline();
  initParallax();
  initScrollAnimations();
});

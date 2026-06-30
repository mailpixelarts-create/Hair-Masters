/* ============================================
   THE ALCHEMIST — GSAP Animations
   Motion Doctrine: Reveal → Pause → Accelerate → Breathe → Seduce → Expand → Reflect
   ============================================ */

import { splitText } from './split-text.js';

export function initAnimations() {
  // Split text for all data-split elements
  document.querySelectorAll('[data-split]').forEach(el => splitText(el));

  // =============================================
  // SCROLL CHOREOGRAPHY RHYTHM
  // Following FASHION-SOTD-GRANDMASTER.SKILL.MD
  // Reveal → Pause → Accelerate → Breathe → Seduce → Expand → Reflect
  // =============================================

  // --- REVEAL: Scene introductions ---
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Split text reveal — words rise from mask
  document.querySelectorAll('[data-split="done"]').forEach(el => {
    const spans = el.querySelectorAll('span > span');
    gsap.fromTo(spans,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1.0,
        ease: 'power4.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%'
        }
      }
    );
  });

  // --- PAUSE: Hero content lingers ---
  gsap.to('.hero-content', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.scene-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    }
  });

  // --- ACCELERATE: Philosophy pillars rise with momentum ---
  gsap.utils.toArray('.pillar').forEach((pillar, i) => {
    gsap.fromTo(pillar,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power3.out',
        delay: i * 0.12,
        scrollTrigger: {
          trigger: '.philosophy-pillars',
          start: 'top 80%'
        }
      }
    );

    // Parallax drift on scroll
    gsap.to(pillar, {
      yPercent: -8 - (i * 4),
      ease: 'none',
      scrollTrigger: {
        trigger: pillar,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });

  // --- BREATHE: Manifesto heading — cinematic clip-path reveal ---
  const manifestoHeading = document.querySelector('.manifesto-heading');
  if (manifestoHeading) {
    gsap.fromTo(manifestoHeading,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 2.0,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: manifestoHeading,
          start: 'top 80%'
        }
      }
    );
  }

  // --- SEDUCE: Filmstrip horizontal scroll — editorial gallery ---
  const filmstrip = document.querySelector('.filmstrip-track');
  if (filmstrip) {
    gsap.to(filmstrip, {
      x: () => -(filmstrip.scrollWidth - window.innerWidth + 110),
      ease: 'none',
      scrollTrigger: {
        trigger: '.gallery-filmstrip',
        start: 'top 70%',
        end: () => `+=${filmstrip.scrollWidth - window.innerWidth + 110}`,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  }

  // Filmstrip items fade in on scroll
  gsap.utils.toArray('.filmstrip-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0.3 },
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.gallery-filmstrip',
          start: 'top 70%',
          toggleActions: 'play none none none'
        },
        delay: i * 0.08
      }
    );
  });

  // --- EXPAND: Pathway cards stagger with scale ---
  const pathwayCards = gsap.utils.toArray('.pathway-card');
  if (pathwayCards.length) {
    gsap.fromTo(pathwayCards,
      { opacity: 0, y: 60, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.pathways-grid',
          start: 'top 80%'
        }
      }
    );
  }

  // --- REFLECT: Trust blocks — contemplative reveal ---
  const trustBlocks = gsap.utils.toArray('.trust-block');
  if (trustBlocks.length) {
    gsap.fromTo(trustBlocks,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.trust-grid',
          start: 'top 80%'
        }
      }
    );
  }

  // --- Scene number labels — editorial markers ---
  gsap.utils.toArray('.scene-num').forEach(num => {
    gsap.fromTo(num,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: num.closest('.scene'),
          start: 'top 70%'
        }
      }
    );
  });

  // --- Invitation heading — final cinematic reveal ---
  const invitationHeading = document.querySelector('.invitation-heading');
  if (invitationHeading) {
    const spans = invitationHeading.querySelectorAll('span > span');
    gsap.fromTo(spans,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 1.4,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: invitationHeading,
          start: 'top 80%'
        }
      }
    );
  }

  // --- Invitation closing — fade in with delay ---
  gsap.fromTo('.invitation-closing',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.invitation-closing',
        start: 'top 85%'
      }
    }
  );
}

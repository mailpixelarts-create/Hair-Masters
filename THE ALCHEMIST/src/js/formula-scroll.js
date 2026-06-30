/* ============================================
   THE ALCHEMIST — Formula-to-Finish Scroll Sequence
   ============================================ */

export function initFormulaScroll() {
  const sequence = document.getElementById('formula-sequence');
  if (!sequence) return;

  const steps = sequence.querySelectorAll('.formula-step');
  if (!steps.length) return;

  // Pin the formula section and animate steps
  const pin = ScrollTrigger.create({
    trigger: sequence,
    start: 'top top',
    end: () => `+=${(steps.length - 1) * 100}%`,
    pin: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const activeIndex = Math.min(Math.floor(progress * steps.length), steps.length - 1);

      steps.forEach((step, i) => {
        if (i === activeIndex) {
          step.classList.add('active');
          gsap.to(step, { opacity: 1, duration: 0.3 });
        } else if (i < activeIndex) {
          step.classList.remove('active');
          gsap.to(step, { opacity: 0.3, duration: 0.3 });
        } else {
          step.classList.remove('active');
          gsap.to(step, { opacity: 0.1, duration: 0.3 });
        }
      });
    }
  });

  // Individual step animations
  steps.forEach((step, i) => {
    const visual = step.querySelector('.step-visual');
    const content = step.querySelector('.step-content');

    if (visual) {
      gsap.fromTo(visual,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    if (content) {
      gsap.fromTo(content,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  });

  // Step number counter animation
  const stepNums = sequence.querySelectorAll('.step-num');
  stepNums.forEach(num => {
    gsap.fromTo(num,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: num.closest('.formula-step'),
          start: 'top 75%'
        }
      }
    );
  });
}

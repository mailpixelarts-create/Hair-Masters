/* ============================================
   THE AVANT-GARDE TRANSFORMER — Split Text
   SplitType word masking for reveal animations.
   Each word wrapped in overflow:hidden mask.
   ============================================ */

function splitTextElements(selector, options = {}) {
  const defaults = {
    types: 'words',
    wordClass: 'split-word',
  };

  const config = { ...defaults, ...options };
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    if (el.dataset.splitDone) return;

    const split = new SplitType(el, {
      types: config.types,
      wordClass: config.wordClass,
    });

    // Wrap each word in a mask container
    el.querySelectorAll('.split-word').forEach((word) => {
      const mask = document.createElement('span');
      mask.className = 'word-mask';
      mask.style.overflow = 'hidden';
      mask.style.display = 'inline-block';
      mask.style.verticalAlign = 'bottom';

      const inner = document.createElement('span');
      inner.className = 'word-mask__inner';
      inner.style.display = 'inline-block';
      inner.style.transform = 'translateY(100%)';

      word.parentNode.insertBefore(mask, word);
      inner.appendChild(word);
      mask.appendChild(inner);
    });

    el.dataset.splitDone = 'true';
  });
}

function revealWords(selector, options = {}) {
  const defaults = {
    stagger: 0.06,
    delay: 0,
    duration: 0.9,
    ease: 'power4.out',
  };

  const config = { ...defaults, ...options };
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const words = el.querySelectorAll('.word-mask__inner');

    gsap.fromTo(
      words,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: config.duration,
        stagger: config.stagger,
        delay: config.delay,
        ease: config.ease,
      }
    );
  });
}

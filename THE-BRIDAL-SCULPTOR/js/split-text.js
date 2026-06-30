/* ============================================
   THE BRIDAL SCULPTOR — Split Text Animations
   ============================================ */

function initSplitText() {
  const splitElements = document.querySelectorAll('[data-split]');

  splitElements.forEach(el => {
    // Skip if already split
    if (el.classList.contains('split-done')) return;

    const split = new SplitType(el, {
      types: 'lines',
      lineClass: 'line'
    });

    // Wrap each line in overflow:hidden mask
    split.lines.forEach(line => {
      const wrapper = document.createElement('span');
      wrapper.style.cssText = 'display:block; overflow:hidden; vertical-align:bottom;';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);

      // Inner element for animation
      const inner = document.createElement('span');
      inner.classList.add('line-inner');
      inner.style.cssText = 'display:block; transform: translateY(100%); will-change: transform;';
      line.parentNode.insertBefore(inner, line);
      inner.appendChild(line);
    });

    el.classList.add('split-done');
  });
}

function animateSplitText(trigger, elements) {
  const lineInners = [];

  elements.forEach(el => {
    const inner = el.querySelectorAll('.line-inner');
    lineInners.push(...inner);
  });

  if (lineInners.length === 0) return;

  gsap.to(lineInners, {
    y: '0%',
    duration: 1,
    ease: 'power4.out',
    stagger: 0.06,
    scrollTrigger: {
      trigger: trigger,
      start: 'top 85%',
      once: true
    }
  });
}

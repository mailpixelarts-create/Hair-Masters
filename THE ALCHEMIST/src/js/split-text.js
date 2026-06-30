/* ============================================
   THE ALCHEMIST — Text Splitting (Manual)
   Splits text into words with overflow:hidden masks
   ============================================ */

export function splitText(element) {
  if (!element || element.dataset.split === 'done') return;

  const text = element.textContent;
  const words = text.split(' ');

  element.innerHTML = '';
  element.style.overflow = 'hidden';

  words.forEach((word, i) => {
    const wrapper = document.createElement('span');
    wrapper.style.cssText = 'display:inline-block; overflow:hidden; vertical-align:bottom;';

    const span = document.createElement('span');
    span.textContent = word;
    span.style.cssText = 'display:inline-block; transform: translateY(100%); opacity: 0;';

    wrapper.appendChild(span);
    element.appendChild(wrapper);

    if (i < words.length - 1) {
      const space = document.createTextNode(' ');
      element.appendChild(space);
    }
  });

  element.dataset.split = 'done';
}

export function initSplitText() {
  const elements = document.querySelectorAll('[data-split]');
  elements.forEach(el => splitText(el));
}

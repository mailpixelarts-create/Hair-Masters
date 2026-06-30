/* ============================================
   SplitType Word Splitting
   Split headings, wrap in overflow mask
   ============================================ */

function initSplitText() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-split]').forEach(el => {
    if (reduced) {
      el.style.opacity = '1';
      return;
    }

    const split = new SplitType(el, { types: 'words' });

    split.words.forEach(word => {
      const wrapper = document.createElement('span');
      wrapper.style.cssText = 'display:inline-block; overflow:hidden; vertical-align:bottom;';
      word.parentNode.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });
  });
}

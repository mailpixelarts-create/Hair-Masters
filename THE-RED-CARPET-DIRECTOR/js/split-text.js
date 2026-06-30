/* THE RED CARPET DIRECTOR — Split Text */
var SplitTextManager = {
  instances: [],

  init: function() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('[data-split]').forEach(function(el) {
      try {
        var split = new SplitType(el, { types: 'words, chars' });
        SplitTextManager.instances.push(split);
      } catch(e) {}
    });
  }
};

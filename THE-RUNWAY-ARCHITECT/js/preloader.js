/* THE RUNWAY ARCHITECT — Preloader */
(function() {
  var el = document.getElementById('preloader');
  if (!el) return;

  var percentEl = el.querySelector('.preloader-percent');
  var line = el.querySelector('.preloader-line');
  var duration = 2200;
  var startTime = Date.now();
  var done = false;

  document.body.classList.add('loading');

  function finish() {
    if (done) return;
    done = true;
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(-100%)';
    setTimeout(function() {
      el.style.display = 'none';
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    }, 850);
  }

  function tick() {
    if (done) return;
    var elapsed = Date.now() - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = Math.floor(eased * 100);

    if (percentEl) percentEl.textContent = String(current).padStart(3, '0');
    if (line) line.style.transform = 'scaleX(' + eased + ')';

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      finish();
    }
  }

  requestAnimationFrame(tick);
  setTimeout(finish, 3500);
})();

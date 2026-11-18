/* ==========================================================================
   SIGNATURE TRANSITION — behaviour
   Adds .is-drawn once, when the transition enters the viewport.
   Exposes window.SignatureTransition.observe(el) for dynamically added sections.
   ========================================================================== */

(function () {
  'use strict';

  var THRESHOLD = 0.45;

  function draw(element) {
    element.classList.add('is-drawn');
  }

  function observe(root) {
    var scope = root || document;
    var elements = scope.querySelectorAll('.sig:not(.is-drawn)');

    if (!elements.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(elements, draw);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        draw(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: THRESHOLD });

    Array.prototype.forEach.call(elements, function (element) {
      observer.observe(element);
    });
  }

  document.documentElement.classList.add('js');

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { observe(); });
  } else {
    observe();
  }

  window.SignatureTransition = { observe: observe, draw: draw };
})();

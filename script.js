// Gauge needle: rests at final reading by default (see CSS). If motion is
// allowed, sweep it up from zero the first time it scrolls into view.
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var needle = document.querySelector(".gauge-needle");
  if (!needle || reduceMotion) return;

  needle.classList.add("gauge-pre");

  var played = false;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !played) {
        played = true;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            needle.classList.remove("gauge-pre");
          });
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(needle);
})();

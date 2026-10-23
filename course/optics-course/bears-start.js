(function () {
  "use strict";
  const stage = document.querySelector("[data-bears-opening]");
  const toggle = document.getElementById("bears-motion-toggle");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let paused = reduce.matches;
  let visible = true;
  function update() {
    stage.dataset.state = document.hidden || !visible ? "stopped" : paused ? "paused" : "playing";
    toggle.textContent = paused ? "播放动画" : "暂停动画";
    toggle.setAttribute("aria-label", toggle.textContent);
    toggle.setAttribute("aria-pressed", String(paused));
  }
  toggle.addEventListener("click", () => { paused = !paused; update(); });
  reduce.addEventListener("change", () => { paused = reduce.matches; update(); });
  document.addEventListener("visibilitychange", update);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); }).observe(stage);
  update();
})();

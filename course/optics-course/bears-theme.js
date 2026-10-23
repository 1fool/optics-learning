(function () {
  "use strict";
  const base = new URL("assets/we-bare-bears/", document.currentScript.src);
  const episodes = window.OpticsBearEpisodes;
  let current;
  const roots = [document.getElementById("deep-lab"), document.getElementById("sphere-lab")];
  const image = (file, className) => {
    const node = document.createElement("img");
    node.src = new URL(file, base).href;
    node.alt = "";
    node.className = className;
    node.decoding = "async";
    node.draggable = false;
    return node;
  };
  const episodeLabel = () => `S01E${String(current.episode).padStart(2, "0")} · ${current.title}`;
  const guides = ["grizz.webp", "panda.webp", "ice-bear.webp"];
  function refreshFormulaScroll() {
    if (!current || document.getElementById("lesson-reading").hidden) return;
    document.querySelectorAll(".reading-card .equation").forEach(equation => {
      const hint = equation.nextElementSibling?.classList.contains("bears-scroll-hint") ? equation.nextElementSibling : null;
      const overflow = equation.scrollWidth > equation.clientWidth + 2;
      if (overflow) {
        equation.dataset.bearScrollable = "true";
        equation.tabIndex = 0;
        const label = hint || document.createElement("span");
        label.className = "bears-scroll-hint";
        label.textContent = document.documentElement.lang === "en" ? "↔ Scroll sideways or use arrow keys for the full formula" : "↔ 左右滑动或用方向键查看完整公式";
        if (!hint) equation.after(label);
      } else {
        hint?.remove();
        if (equation.dataset.bearScrollable) {
          delete equation.dataset.bearScrollable;
          if (equation.id) equation.tabIndex = -1;
          else equation.removeAttribute("tabindex");
        }
      }
    });
  }
  function scene(parent, file, className) {
    if (!parent || parent.querySelector(`:scope > .${className}`)) return;
    const art = document.createElement("figure");
    art.className = className;
    art.setAttribute("aria-hidden", "true");
    art.append(image(file, "bears-frame"));
    parent.append(art);
  }
  function decorateLab(root) {
    if (root.hidden || !current) return;
    const tabs = root.querySelectorAll(".lab-tab");
    tabs.forEach((tab, i) => {
      if (!tab.querySelector(".bears-tab-art")) tab.prepend(image(current.art[i], "bears-tab-art"));
      if (!tab.querySelector(".bears-tab-character")) {
        tab.prepend(image(i === 3 ? "bear-friends.webp" : guides[(i + current.episode - 1) % 3], "bears-tab-character"));
      }
    });
    const hero = root.querySelector(".lab-hero");
    if (hero) {
      if (!hero.querySelector(".bears-episode")) {
        const caption = document.createElement("span");
        caption.className = "bears-episode";
        caption.textContent = episodeLabel();
        hero.prepend(caption);
      }
      scene(hero, current.art[0], "bears-hero-art");
      if (!hero.querySelector(".bears-hero-character")) hero.append(image(guides[(current.episode - 1) % 3], "bears-hero-character"));
    }
    const cover = root.querySelector(".deep-scene-cover");
    if (cover && !cover.querySelector(".bears-cover-copy")) {
      const copy = document.createElement("span");
      copy.className = "bears-cover-copy";
      copy.textContent = cover.textContent;
      cover.replaceChildren(image("bear-trio.webp", "bears-cover-guide"), copy);
    }
    scene(root.querySelector(".lab-task"), current.art[1], "bears-task-art");
    scene(root.querySelector(".lab-recap"), current.art[2], "bears-recap-art");
    refreshFormulaScroll();
  }
  const observer = new MutationObserver(() => {
    // Observe only lab root replacement: adding art inside a panel cannot loop.
    roots.forEach(decorateLab);
  });
  roots.forEach(root => observer.observe(root, { childList: true }));
  window.addEventListener("resize", refreshFormulaScroll);
  document.getElementById("lesson-reading").addEventListener("toggle", refreshFormulaScroll, true);
  document.fonts.ready.then(refreshFormulaScroll);
  const brand = document.querySelector(".brand-mark");
  if (brand) {
    const stack = document.createElement("span");
    stack.className = "bears-brand";
    stack.setAttribute("aria-hidden", "true");
    stack.append(image("bear-stack.webp", ""));
    brand.replaceWith(stack);
  }
  const rail = document.querySelector(".rail");
  const crew = document.createElement("div");
  crew.className = "bears-rail-crew";
  crew.setAttribute("aria-hidden", "true");
  crew.append(image("bear-friends.webp", ""));
  rail.prepend(crew);

  window.OpticsBearsTheme = {
    apply(code) {
      current = episodes.find(episode => episode.code === code);
      if (!current) return;
      document.body.classList.add("bears-theme");
      document.body.dataset.bearEpisode = String(current.episode);
      document.body.style.setProperty("--bear-scene", `url("${new URL(current.art[2], base).href}")`);
      document.querySelectorAll(".nav-lesson").forEach((button, index) => {
        if (!button.querySelector(".bears-nav-art")) {
          button.prepend(image(episodes[index].art[0], "bears-nav-art"));
        }
      });
      const head = document.querySelector(".lesson-head");
      head.querySelector(".bears-notes-art")?.remove();
      scene(head, current.art[3], "bears-notes-art");
      const headArt = head.querySelector(".bears-notes-art");
      const caption = document.createElement("figcaption");
      caption.textContent = episodeLabel();
      headArt.append(caption);
      document.querySelectorAll(".reading-doodle-art").forEach(art => {
        art.replaceChildren(image(current.art[3], "bears-doodle-art"));
      });
      roots.forEach(decorateLab);
    }
  };
})();

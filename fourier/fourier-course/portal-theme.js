// Decoration is independent of lesson models, formal answers and lab progress.
(() => {
  const assets = new URL("assets/rick-and-morty/", document.currentScript.src);
  const episodes = [
    ["1.1", "Pilot", [35, 127, 158], ["异星初航", "Alien encounter"]],
    ["1.2.1", "Lawnmower Dog", [329, 306, 397], ["梦境潜入", "Dream infiltration"]],
    ["1.2.2", "Anatomy Park", [108, 17, 268], ["微观探险", "Microscopic expedition"]],
    ["1.3.1", "M. Night Shaym-Aliens!", [270, 191, 87], ["模拟世界", "Simulation world"]],
    ["1.3.2", "Meeseeks and Destroy", [242, 333, 400], ["Meeseeks 任务", "Meeseeks mission"]],
    ["1.3.3", "Rick Potion #9", [82, 83, 58], ["变异现场", "Mutation scene"]],
    ["1.4.1", "Raising Gazorpazorp", [230, 211, 151], ["星际来客", "Visitors from space"]],
    ["1.4.2", "Rixty Minutes", [20, 136, 277], ["跨维电视", "Interdimensional TV"]],
    ["1.4.3", "Something Ricked This Way Comes", [243, 826, 192], ["奇物商店", "Curiosity shop"]],
  ];
  const label = document.createElement("div");
  label.className = "episode-label";
  document.getElementById("lesson-kicker").before(label);
  const art = document.createElement("figure");
  art.className = "episode-side";
  const cast = document.createElement("div");
  cast.className = "episode-cast";
  const portraits = [0, 1, 2].map(() => {
    const image = document.createElement("img");
    image.alt = "";
    image.width = 96;
    image.height = 112;
    image.decoding = "async";
    cast.append(image);
    return image;
  });
  const heading = document.createElement("strong");
  heading.className = "episode-cast-title";
  const caption = document.createElement("figcaption");
  const source = document.createElement("a");
  source.href = new URL("SOURCES.md", assets).href;
  source.target = "_blank";
  source.rel = "noopener";
  art.append(heading, cast, caption, source);
  document.querySelector(".sidebar").append(art);
  const hero = document.createElement("div");
  hero.className = "episode-hero-art";
  hero.setAttribute("aria-hidden", "true");
  hero.innerHTML = '<span class="episode-channel"></span><img class="episode-hero-still" alt="" width="480" height="300"><img class="episode-hero-cast" alt="" width="120" height="120"><img class="episode-hero-token" alt="" width="84" height="84">';
  document.querySelector(".lesson-head").append(hero);
  const icons = { explore: "portal-gun", recap: "dimension-tv", notes: "field-notes", quiz: "meeseeks-box" };
  document.querySelectorAll(".lesson-link").forEach((button, index) => {
    button.style.setProperty("--nav-cast", `url("${new URL(`cast-${episodes[index][2][0]}.webp`, assets).href}")`);
  });

  window.FourierPortalTheme = {
    apply(id, language) {
      const index = episodes.findIndex(episode => episode[0] === id);
      if (index < 0) return;
      const episode = `S01E${String(index + 1).padStart(2, "0")}`;
      const title = `${episode} / ${episodes[index][1]}`;
      const url = new URL(`${episode.toLowerCase()}.webp`, assets).href;
      document.documentElement.style.setProperty("--episode-art", `url("${url}")`);
      episodes[index][2].forEach((character, n) => {
        const portrait = new URL(`cast-${character}.webp`, assets).href;
        document.documentElement.style.setProperty(`--cast-${n + 1}`, `url("${portrait}")`);
        portraits[n].src = portrait;
      });
      document.body.dataset.episode = episode;
      label.textContent = `RICK AND MORTY · ${title}`;
      heading.textContent = episodes[index][3][language === "zh" ? 0 : 1];
      hero.querySelector(".episode-channel").textContent = `${episode} / ${language === "zh" ? "跨维频道" : "DIMENSION CHANNEL"}`;
      hero.querySelector(".episode-hero-still").src = url;
      hero.querySelector(".episode-hero-cast").src = portraits[1].src;
      hero.querySelector(".episode-hero-token").src = portraits[2].src;
      caption.textContent = title;
      source.textContent = language === "zh" ? "剧照与角色素材来源 ↗" : "Artwork sources ↗";
      source.setAttribute("aria-label", language === "zh" ? `${episode} 剧照与角色素材来源` : `${episode} artwork sources`);
      document.getElementById("quick-symbols").title = language === "zh" ? "本节符号" : "Symbols for this section";
      document.querySelectorAll("#views [data-view]").forEach(button => {
        const icon = document.createElement("img");
        icon.src = new URL(`${icons[button.dataset.view]}.svg`, assets).href;
        icon.alt = "";
        icon.width = 42;
        icon.height = 42;
        button.prepend(icon);
      });
      document.body.dataset.portalView = document.querySelector("#views .selected")?.dataset.view || "explore";
    },
  };
})();

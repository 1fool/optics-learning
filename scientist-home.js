(function () {
  "use strict";

  const scientists = [
    {
      name: "Albert Einstein",
      japanese: "アルベルト・アインシュタイン",
      field: "THEORETICAL PHYSICS / 1879—1955",
      quote: "相对论与光电效应，改写时空观。",
      caption: "THEORY / RELATIVITY",
      portrait: "assets/scientist-einstein-cutout.webp",
      scores: [5, 4, 5, 5, 3, 5]
    },
    {
      name: "Isaac Newton",
      japanese: "アイザック・ニュートン",
      field: "MATHEMATICS & PHYSICS / 1643—1727",
      quote: "经典力学、万有引力与光学的奠基者。",
      caption: "MECHANICS / OPTICS",
      portrait: "assets/scientist-newton.webp",
      scores: [5, 4, 5, 5, 4, 5]
    },
    {
      name: "Max Planck",
      japanese: "マックス・プランク",
      field: "THEORETICAL PHYSICS / 1858—1947",
      quote: "以量子假说开启微观物理的新章。",
      caption: "QUANTUM / THERMODYNAMICS",
      portrait: "assets/scientist-planck.webp",
      scores: [5, 4, 4, 5, 3, 5]
    },
    {
      name: "James Clerk Maxwell",
      japanese: "ジェームズ・クラーク・マクスウェル",
      field: "MATHEMATICAL PHYSICS / 1831—1879",
      quote: "用统一方程揭示电、磁与光的联系。",
      caption: "ELECTROMAGNETISM / OPTICS",
      portrait: "assets/scientist-maxwell.webp",
      scores: [5, 4, 5, 4, 4, 5]
    }
  ];

  const dimensions = [
    { label: "理论颠覆力", description: "重写经典物理的边界。" },
    { label: "思维敏捷度", description: "以思想实验快速穿透问题。" },
    { label: "领域覆盖面", description: "在多个研究领域留下影响。" },
    { label: "学术持久力", description: "长期深耕并持续推进研究。" },
    { label: "实验精密度", description: "以可检验的证据约束理论。" },
    { label: "后世启发性", description: "为后续研究打开新的路径。" }
  ];

  const $ = (selector) => document.querySelector(selector);
  const heading = $("#hero-title");
  const japanese = $("#scientist-japanese");
  const field = $("#scientist-field");
  const quote = $("#scientist-quote");
  const portrait = $("#scientist-portrait");
  const portraitIndex = $("#portrait-index");
  const caption = $("#portrait-caption");
  const index = $("#scientist-index");
  const svg = $(".radar-chart");
  if (!heading || !svg) return;

  const ns = "http://www.w3.org/2000/svg";
  const center = { x: 260, y: 211 };
  const radius = 132;
  const startAngle = -Math.PI / 2;
  const rings = $(".radar-rings");
  const axes = $(".radar-axes");
  const points = $(".radar-points");
  const labels = $(".radar-labels");
  const area = $(".radar-area");
  const focusArea = $(".radar-focus-area");
  const grade = $("#radar-grade");
  const dimension = $("#radar-dimension");
  const description = $("#radar-description");
  const value = $("#radar-value");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hero = $(".scientist-hero");
  const stage = $("#portrait-stage");
  const portraitStatus = $("#portrait-status");
  let current = 0;
  let requested = 0;
  let activeDimension = 0;
  let typeTimer = 0;
  const portraitLoads = [];

  function loadPortrait(position) {
    if (!portraitLoads[position]) {
      portraitLoads[position] = new Promise((resolve) => {
        const image = new Image();
        image.onload = async () => {
          if (image.decode) await image.decode().catch(() => {});
          resolve(true);
        };
        image.onerror = () => resolve(false);
        image.src = scientists[position].portrait;
      });
    }
    return portraitLoads[position];
  }

  window.addEventListener("load", () => {
    scientists.forEach((_, position) => { if (position !== 0) loadPortrait(position); });
  });

  function pointAt(position, scale) {
    const angle = startAngle + position * Math.PI / 3;
    return {
      x: center.x + Math.cos(angle) * radius * scale,
      y: center.y + Math.sin(angle) * radius * scale
    };
  }

  function make(tag, attrs, parent) {
    const element = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, item]) => element.setAttribute(key, item));
    parent.append(element);
    return element;
  }

  for (let level = 1; level <= 5; level++) {
    const ringPoints = Array.from({ length: 6 }, (_, i) => pointAt(i, level / 5))
      .map((point) => `${point.x},${point.y}`).join(" ");
    make("polygon", { points: ringPoints }, rings);
    const labelPoint = pointAt(5, level / 5);
    const marker = make("text", { x: labelPoint.x + 8, y: labelPoint.y + 3 }, rings);
    marker.textContent = String(level);
  }

  const labelNodes = [];
  const pointNodes = [];
  dimensions.forEach((item, i) => {
    const endpoint = pointAt(i, 1);
    make("line", { x1: center.x, y1: center.y, x2: endpoint.x, y2: endpoint.y }, axes);
    const labelPoint = pointAt(i, 1.25);
    const anchor = i === 1 || i === 2 ? "start" : i === 4 || i === 5 ? "end" : "middle";
    const text = make("text", { x: labelPoint.x, y: labelPoint.y, "text-anchor": anchor }, labels);
    text.textContent = item.label;
    labelNodes.push(text);
    const point = make("circle", { cx: endpoint.x, cy: endpoint.y, r: 17, class: "radar-point-hit", tabindex: "0", role: "button", "aria-label": item.label }, points);
    point.addEventListener("mouseenter", () => setActiveDimension(i));
    point.addEventListener("focus", () => setActiveDimension(i));
    point.addEventListener("click", () => setActiveDimension(i));
    point.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActiveDimension(i);
      }
    });
    pointNodes.push(point);
    make("circle", { cx: endpoint.x, cy: endpoint.y, r: 4, "pointer-events": "none", class: "radar-dot" }, points);
  });

  function setActiveDimension(dimensionIndex) {
    activeDimension = dimensionIndex;
    const scientist = scientists[current];
    const score = scientist.scores[dimensionIndex];
    const focusPoints = scientist.scores.map((item, i) => pointAt(i, item / 5))
      .map((point) => `${point.x},${point.y}`).join(" ");
    focusArea.setAttribute("points", focusPoints);
    focusArea.style.opacity = "1";
    grade.textContent = ["-", "E", "D", "C", "B", "A"][score];
    dimension.textContent = dimensions[dimensionIndex].label;
    description.textContent = dimensions[dimensionIndex].description;
    value.textContent = `${String(score).padStart(2, "0")} / 05`;
    labelNodes.forEach((node, i) => node.classList.toggle("is-active", i === dimensionIndex));
    pointNodes.forEach((node, i) => node.classList.toggle("is-active", i === dimensionIndex));
  }

  function typeName(name) {
    window.clearInterval(typeTimer);
    heading.classList.remove("is-typing");
    hero.classList.remove("is-name-typing");
    heading.setAttribute("aria-label", name);
    heading.textContent = "";
    if (reducedMotion.matches) {
      heading.textContent = name;
      return;
    }
    heading.classList.add("is-typing");
    hero.classList.add("is-name-typing");
    let character = 0;
    typeTimer = window.setInterval(() => {
      character += 1;
      heading.textContent = name.slice(0, character);
      if (character >= name.length) {
        window.clearInterval(typeTimer);
        typeTimer = 0;
        hero.classList.remove("is-name-typing");
        window.setTimeout(() => heading.classList.remove("is-typing"), 700);
      }
    }, 52);
  }

  function renderScientist() {
    const scientist = scientists[current];
    japanese.textContent = scientist.japanese;
    field.textContent = scientist.field;
    quote.textContent = scientist.quote;
    caption.textContent = scientist.caption;
    portraitIndex.textContent = String(current + 1).padStart(2, "0");
    index.textContent = `${String(current + 1).padStart(2, "0")} / ${String(scientists.length).padStart(2, "0")}`;
    typeName(scientist.name);
    portrait.src = scientist.portrait;
    portrait.alt = `${scientist.name}卡通立绘`;
    portrait.hidden = false;
    const chartPoints = scientist.scores.map((score, i) => pointAt(i, score / 5))
      .map((point) => `${point.x},${point.y}`).join(" ");
    area.setAttribute("points", chartPoints);
    svg.querySelector("title").textContent = `${scientist.name}六维能力雷达图`;
    svg.querySelector("desc").textContent = "悬停或聚焦六个维度可查看说明。";
    setActiveDimension(activeDimension);
    stage.classList.remove("is-changing");
    void stage.offsetWidth;
    stage.classList.add("is-changing");
  }

  document.querySelectorAll("[data-scientist-step]").forEach((button) => {
    button.addEventListener("click", async () => {
      const direction = Number(button.dataset.scientistStep);
      requested = (requested + direction + scientists.length) % scientists.length;
      if (requested === current) {
        stage.classList.remove("is-loading", "is-error");
        return;
      }
      stage.classList.add("is-loading");
      stage.classList.remove("is-error");
      portraitStatus.textContent = `正在切换到 ${scientists[requested].name}…`;
      const target = requested;
      const loaded = await loadPortrait(target);
      if (target !== requested) return;
      if (!loaded) {
        portraitLoads[target] = null;
        requested = current;
        portraitStatus.textContent = "图片加载失败，请重试";
        stage.classList.remove("is-loading");
        stage.classList.add("is-error");
        return;
      }
      current = target;
      renderScientist();
      stage.classList.remove("is-loading", "is-error");
      playCue();
    });
  });

  let audioContext = null;
  let soundEnabled = false;
  const soundButton = $(".sound-toggle");

  function playCue() {
    if (!soundEnabled) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    audioContext ||= new AudioContextClass();
    if (audioContext.state === "suspended") audioContext.resume();
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const sub = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const subGain = audioContext.createGain();
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(112, now);
    oscillator.frequency.exponentialRampToValueAtTime(58, now + .28);
    sub.type = "triangle";
    sub.frequency.setValueAtTime(55, now);
    sub.frequency.exponentialRampToValueAtTime(38, now + .3);
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.07, now + .025);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .34);
    subGain.gain.setValueAtTime(.0001, now);
    subGain.gain.exponentialRampToValueAtTime(.055, now + .03);
    subGain.gain.exponentialRampToValueAtTime(.0001, now + .36);
    oscillator.connect(gain).connect(audioContext.destination);
    sub.connect(subGain).connect(audioContext.destination);
    oscillator.start(now);
    sub.start(now);
    oscillator.stop(now + .36);
    sub.stop(now + .38);
  }

  soundButton.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundButton.setAttribute("aria-pressed", String(soundEnabled));
    soundButton.setAttribute("aria-label", soundEnabled ? "关闭音效" : "开启音效");
    if (soundEnabled) playCue();
  });

  renderScientist();
})();

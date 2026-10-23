// Portal-themed, seekable preview; panels still use the same sampled F-shaped field.
(() => {
  const cover = document.getElementById("cover");
  const canvas = document.getElementById("cover-canvas");
  const ctx = canvas.getContext("2d");
  const $ = id => document.getElementById(id);
  const starts = [0, 7000, 14000], duration = 22000, dissolve = 850;
  const scenes = [
    {
      zh: { name: "传播 / F 形物光 → 观察屏", readout: z => `同一物光 · z = ${z} mm · 强度结构正在演化` },
      en: { name: "PROPAGATION / F OBJECT → SCREEN", readout: z => `Same object field · z = ${z} mm · intensity evolves` }
    },
    {
      zh: { name: "计算 / FFT → H → IFFT", readout: (z, stage) => `同一物光 · z = ${z} mm · 计算步骤 ${stage + 1} / 4` },
      en: { name: "COMPUTE / FFT → H → IFFT", readout: (z, stage) => `Same object · z = ${z} mm · Step ${stage + 1} / 4` }
    },
    {
      zh: { name: "全息 / 干涉记录 → 重建", readout: c => `同一物光 · 参考光载频 ${c} 周期 / 128 像素` },
      en: { name: "HOLOGRAPHY / RECORD → RECONSTRUCT", readout: c => `Same object · reference carrier ${c} cycles / 128 pixels` }
    }
  ];
  const labels = {
    zh: { preview: "传送门光学实验室", skip: "跳过开场 →", enter: "进入 1.1 课程", play: "播放", pause: "暂停", replay: "从头重播", timeline: "跨维度光学之旅 · 拖动回看", names: ["传播", "计算", "全息"], canvas: ["F 形物光、空间频谱与随传播距离变化的强度", "同一 F 形物光的 FFT、相位传播与逆 FFT", "同一 F 形物光的离轴全息记录与重建"] },
    en: { preview: "PORTAL OPTICS LAB", skip: "Skip intro →", enter: "Enter lesson 1.1", play: "Play", pause: "Pause", replay: "Replay from start", timeline: "A TRIP THROUGH OPTICAL DIMENSIONS · DRAG TO SEEK", names: ["PROPAGATE", "COMPUTE", "HOLOGRAPHY"], canvas: ["F-shaped object, spatial spectrum and propagated intensity", "FFT, transfer phase and inverse FFT of the same object", "Off-axis hologram and reconstruction of the same object"] }
  };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let elapsed = 0, act = -1, playing = false, frame = 0, last = 0;
  const lang = () => document.documentElement.lang.startsWith("en") ? "en" : "zh";

  function sceneAt(time) { return time >= starts[2] ? 2 : time >= starts[1] ? 1 : 0; }
  function stateAt(time, index) {
    const local = Math.max(0, time - starts[index]);
    if (index === 0) return { mm: Math.round(30 * Math.min(local / 7000, 1)), carrier: 24, stage: 0 };
    if (index === 1) return { mm: 30, carrier: 24, stage: Math.min(3, Math.floor(local / 1750)) };
    return { mm: 30, carrier: Math.round(14 + 10 * Math.min(local / 8000, 1)), stage: Math.min(2, Math.floor(local / (8000 / 3))) };
  }
  function renderScene() {
    const l = lang(), scene = scenes[act][l], ui = labels[l];
    $("cover-scene-name").textContent = scene.name;
    $("cover-scene-counter").textContent = `0${act + 1} / 03`;
    $("cover-skip").textContent = ui.skip;
    $("cover-enter").textContent = ui.enter;
    $("cover-replay").textContent = ui.replay;
    $("cover-lang").textContent = l === "zh" ? "EN" : "中文";
    $("cover-preview-label").textContent = ui.preview;
    $("cover-open").textContent = l === "zh" ? "开始页" : "Intro";
    $("cover-timeline-label").textContent = ui.timeline;
    $("cover-chapters").setAttribute("aria-label", l === "zh" ? "动画时间点" : "Animation chapter marks");
    canvas.setAttribute("aria-label", ui.canvas[act]);
    $("cover-chapters").innerHTML = ui.names.map((name, i) => `<button type="button" data-cover-scene="${i}" ${i === act ? 'aria-current="step"' : ""}>0${i + 1} &nbsp; ${name}</button>`).join("");
    $("cover-play").textContent = playing ? ui.pause : ui.play;
    $("cover-play").setAttribute("aria-pressed", String(playing));
  }
  function draw() {
    const compact = innerWidth < 650, width = compact ? 480 : 960, height = compact ? 780 : 540;
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
    const current = sceneAt(elapsed), state = stateAt(elapsed, current), local = elapsed - starts[current];
    if (current > 0 && local < dissolve && !reduced.matches) {
      const previous = stateAt(starts[current], current - 1);
      window.FourierCoverPhysics.paint(ctx, current - 1, previous.mm, previous.carrier, previous.stage, lang());
      ctx.save(); ctx.globalAlpha = local / dissolve;
      window.FourierCoverPhysics.paint(ctx, current, state.mm, state.carrier, state.stage, lang());
      ctx.restore();
    } else {
      window.FourierCoverPhysics.paint(ctx, current, state.mm, state.carrier, state.stage, lang());
    }
    $("cover-readout").textContent = scenes[current][lang()].readout(current === 2 ? state.carrier : state.mm, state.stage);
    $("cover-progress").style.width = `${elapsed / duration * 100}%`;
    $("cover-timeline").value = Math.round(elapsed / 100) * 100;
    $("cover-time").value = `0:${String(Math.floor(elapsed / 1000)).padStart(2, "0")} / 0:22`;
  }
  function seek(time) {
    elapsed = Math.max(0, Math.min(duration, time));
    const current = sceneAt(elapsed);
    if (current !== act) { act = current; renderScene(); }
    draw();
  }
  function stop() {
    playing = false; cancelAnimationFrame(frame); frame = 0; last = 0;
    cover.dataset.playing = "false";
    $("cover-play").textContent = labels[lang()].play;
    $("cover-play").setAttribute("aria-pressed", "false");
  }
  function tick(now) {
    if (!playing || !cover.open) return;
    if (last) seek(elapsed + now - last);
    last = now;
    if (elapsed >= duration) { stop(); return; }
    frame = requestAnimationFrame(tick);
  }
  function play() {
    if (playing) { stop(); return; }
    if (elapsed >= duration) seek(0);
    playing = true; last = 0;
    cover.dataset.playing = "true";
    $("cover-play").textContent = labels[lang()].pause;
    $("cover-play").setAttribute("aria-pressed", "true");
    frame = requestAnimationFrame(tick);
  }
  function enter() {
    stop();
    if (cover.open) cover.close();
    try { sessionStorage.setItem("fourier-intro-seen", "1"); } catch { /* file:// may disable storage */ }
    $("cover-open").focus();
  }
  function open() {
    if (cover.open) return;
    cover.showModal(); cover.scrollTop = 0; seek(0);
    if (reduced.matches) seek(3500); else play();
  }
  $("cover-open").addEventListener("click", open);
  $("cover-skip").addEventListener("click", enter);
  $("cover-enter").addEventListener("click", enter);
  $("cover-chapters").addEventListener("click", event => {
    const button = event.target.closest("[data-cover-scene]");
    if (!button) return;
    seek(starts[Number(button.dataset.coverScene)]);
    cover.scrollTop = 0;
    $("cover-scene-name").tabIndex = -1;
    $("cover-scene-name").focus({ preventScroll: true });
  });
  $("cover-timeline").addEventListener("input", event => { stop(); seek(Number(event.target.value)); });
  $("cover-play").addEventListener("click", play);
  $("cover-replay").addEventListener("click", () => { stop(); seek(0); cover.scrollTop = 0; if (!reduced.matches) play(); });
  $("cover-lang").addEventListener("click", () => { $("language").click(); renderScene(); draw(); });
  cover.addEventListener("close", enter);
  addEventListener("resize", () => { if (cover.open) draw(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden && playing) stop(); });
  reduced.addEventListener("change", () => { if (reduced.matches) stop(); });
  seek(0);
  let seen = false;
  try { seen = sessionStorage.getItem("fourier-intro-seen") === "1"; } catch { /* storage may be disabled */ }
  if (!location.hash && !seen) open();
})();

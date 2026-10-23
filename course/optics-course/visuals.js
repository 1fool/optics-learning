/* Seven different original diagrams. Every animated distance/time is a model unit,
   not a claim that optical frequencies can be displayed in real time. */
window.OpticsVisuals = function createVisuals(canvas, controls, caption) {
  const ctx = canvas.getContext("2d");
  let language = "zh";
  const localize = (zh, en) => language === "en" ? en : zh;
  const settings = {
    maxwell: [{ key: "strength", label: "变化幅度（示意）", min: .4, max: 1.5, step: .1, value: 1, unit: "×" }],
    solution: [{ key: "direction", label: "行波方向", min: -1, max: 1, step: 2, value: 1, unit: "方向" }, { key: "width", label: "脉冲宽度", min: .7, max: 1.6, step: .1, value: 1, unit: "×" }],
    periods: [{ key: "lambda", label: "空间波长 λ（模型单位）", min: 1.5, max: 3.8, step: .1, value: 2.5, unit: "u" }, { key: "speed", label: "相速度 v（模型单位）", min: .6, max: 1.6, step: .1, value: 1, unit: "u/s" }],
    wavefronts: [{ key: "angle", label: "传播方向角", min: -70, max: 70, step: 5, value: 25, unit: "°" }, { key: "spacing", label: "波面间距 λ（像素示意）", min: 40, max: 100, step: 5, value: 65, unit: "px" }],
    phasor: [{ key: "phase", label: "初相位 φ₀", min: -180, max: 180, step: 15, value: 0, unit: "°" }, { key: "amplitude", label: "振幅 A₀", min: .5, max: 1.4, step: .1, value: 1, unit: "×" }],
    amplitude: [{ key: "lambda", label: "波长 λ（模型单位）", min: 1.2, max: 3.4, step: .1, value: 2.4, unit: "u" }, { key: "phase", label: "初相位 φ₀", min: -180, max: 180, step: 15, value: 0, unit: "°" }],
    orthogonal: [{ key: "lambda", label: "波长 λ（模型单位）", min: 1.6, max: 4, step: .1, value: 2.6, unit: "u" }, { key: "n", label: "相对折射率 n（μᵣ=1）", min: 1, max: 2.5, step: .1, value: 1, unit: "" }]
  };
  const alt = {
    maxwell: "两组局部旋度示意：变化的磁通与环绕电场、变化的电位移与环绕磁场；并非具有先后次序的因果循环。",
    solution: "一维脉冲按 z−vt 向右或按 z+vt 向左移动；浅色曲线表示初始位置。",
    periods: "上下两图分别是固定时间的空间波形和固定位置的时间波形，标出波长 λ 和周期 T。",
    wavefronts: "二维截面中平行的等相位线与传播方向 k 正交，旋转 k 后波面一起转动。",
    phasor: "复平面中转动的相量及其在实轴上的投影；投影对应真实余弦场。",
    amplitude: "沿传播方向五个位置的复振幅相量，相邻位置产生相位差；下方实场随共同时间变化。",
    orthogonal: "三维投影中的电场 E、等比例磁场 vB 与传播方向 k 相互正交，E 与 B 同相。"
  };
  const altEn = {
    maxwell: "Two local curl relations: changing magnetic flux with circulating E, and changing electric displacement with circulating H. This is not a time-ordered causal loop.",
    solution: "A one-dimensional pulse moves right as f(z−vt) or left as g(z+vt); the pale curve marks its starting location.",
    periods: "The upper plot samples the wave in space at fixed time; the lower samples it in time at fixed position. Wavelength λ and period T are marked.",
    wavefronts: "In a 2D section, parallel equal-phase lines are perpendicular to k; rotating k rotates the wavefronts.",
    phasor: "A rotating complex phasor and its projection on the real axis; the projection gives the physical cosine field.",
    amplitude: "Complex-amplitude phasors at five positions along propagation differ in phase; the physical field below varies with the shared time factor.",
    orthogonal: "In a 3D projection, E, the scaled magnetic field vB, and the propagation direction k are mutually perpendicular. E and B are in phase."
  };
  const controlLabelsEn = {
    strength: "Variation strength (schematic)", direction: "Wave direction", width: "Pulse width", lambda: "Wavelength λ (model units)", speed: "Phase speed v (model units)",
    angle: "Propagation angle", spacing: "Wavefront spacing λ (pixels)", phase: "Initial phase φ₀", amplitude: "Amplitude A₀", n: "Relative refractive index n (μᵣ=1)"
  };
  const extra = window.OpticsExtraVisuals || {};
  for (const [key, figure] of Object.entries(extra)) {
    settings[key] = figure.settings;
    alt[key] = figure.note.zh;
    altEn[key] = figure.note.en;
  }
  let mode = "maxwell";
  let values = {};
  let paused = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let clock = 0;
  let last = 0;
  let yaw = .63;
  let pitch = .42;
  let dragging = null;
  const colors = { red: "#ff7b83", blue: "#70b8ff", green: "#86deb1", grid: "#658266", text: "#f6f0dc", muted: "#bdcdb1" };

  function setMode(next, savedValues = {}) {
    mode = next;
    clock = 0;
    values = Object.fromEntries(settings[mode].map((item) => [item.key, savedValues[item.key] ?? item.value]));
    controls.replaceChildren();
    for (const item of settings[mode]) {
      const row = document.createElement("div");
      row.className = "control-row";
      const label = document.createElement("label");
      const output = document.createElement("output");
      const input = document.createElement("input");
      input.type = "range";
      input.id = `visual-${item.key}`;
      input.min = item.min;
      input.max = item.max;
      input.step = item.step;
      input.value = values[item.key];
      label.htmlFor = input.id;
      label.append(document.createTextNode(language === "en" ? item.labelEn || controlLabelsEn[item.key] : item.label), output);
      const update = () => {
        values[item.key] = Number(input.value);
        output.value = item.valueLabels ? item.valueLabels[language][values[item.key]] : item.unit === "方向" ? (values[item.key] > 0 ? "+z" : "−z") : `${values[item.key].toFixed(String(item.step).split(".")[1]?.length || 0)} ${item.unit}`.trim();
      };
      input.addEventListener("input", update);
      update();
      row.append(label, input);
      controls.append(row);
    }
    const description = language === "en" ? altEn[mode] : alt[mode];
    canvas.setAttribute("aria-label", description + (mode === "orthogonal" ? localize(" 可拖动旋转视角。", " Drag to rotate the view.") : ""));
    caption.textContent = extra[mode] ? localize("读图提示：控件标明物理量与单位；图示的假设和局限见操作区。", "Reading guide: controls name the quantities and units; assumptions and limitations are stated alongside.") : description + localize(" 动画时间、长度均为教学缩放量。", " Animation time and distance use instructional scales.");
  }
  function setLanguage(next) { const savedValues = { ...values }; language = next; setMode(mode, savedValues); }
  function toggle() { paused = !paused; return paused; }
  function reset() { setMode(mode); yaw = .63; pitch = .42; }
  canvas.addEventListener("pointerdown", (event) => {
    if (mode !== "orthogonal") return;
    dragging = { x: event.clientX, y: event.clientY };
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    yaw += (event.clientX - dragging.x) * .006;
    pitch = Math.max(-1.1, Math.min(1.1, pitch + (event.clientY - dragging.y) * .006));
    dragging = { x: event.clientX, y: event.clientY };
  });
  canvas.addEventListener("pointerup", () => { dragging = null; });
  canvas.addEventListener("pointercancel", () => { dragging = null; });
  canvas.addEventListener("keydown", (event) => {
    if (mode !== "orthogonal" || !event.key.startsWith("Arrow")) return;
    event.preventDefault();
    if (event.key === "ArrowLeft") yaw -= .12;
    if (event.key === "ArrowRight") yaw += .12;
    if (event.key === "ArrowUp") pitch = Math.max(-1.1, pitch - .12);
    if (event.key === "ArrowDown") pitch = Math.min(1.1, pitch + .12);
  });
  function text(value, x, y, color = colors.text, size = 14, align = "left") {
    ctx.fillStyle = color; ctx.font = `${size}px "Microsoft YaHei UI", sans-serif`; ctx.textAlign = align; ctx.fillText(value, x, y); ctx.textAlign = "left";
  }
  function line(x1, y1, x2, y2, color = colors.grid, width = 1, alpha = 1) {
    ctx.globalAlpha = alpha; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineWidth = width; ctx.strokeStyle = color; ctx.stroke(); ctx.globalAlpha = 1;
  }
  function arrow(x1, y1, x2, y2, color, label = "") {
    line(x1, y1, x2, y2, color, 2.5);
    const a = Math.atan2(y2 - y1, x2 - x1);
    line(x2, y2, x2 - 10 * Math.cos(a - .52), y2 - 10 * Math.sin(a - .52), color, 2.5);
    line(x2, y2, x2 - 10 * Math.cos(a + .52), y2 - 10 * Math.sin(a + .52), color, 2.5);
    if (label) text(label, x2 + 8, y2 - 7, color, 14);
  }
  function curve(points, color, width = 2.5, alpha = 1) {
    ctx.beginPath(); points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
    ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke(); ctx.globalAlpha = 1;
  }
  function drawGrid(x, y, width, height) {
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, width, height); ctx.clip(); ctx.beginPath();
    for (let gx = x + 26.5; gx < x + width; gx += 52) { ctx.moveTo(gx, y); ctx.lineTo(gx, y + height); }
    for (let gy = y + 26.5; gy < y + height; gy += 52) { ctx.moveTo(x, gy); ctx.lineTo(x + width, gy); }
    ctx.strokeStyle = "#ffffff0b"; ctx.lineWidth = 1; ctx.stroke(); ctx.restore();
  }
  function panel(x, y, width, height, title) {
    ctx.fillStyle = "#2a4536"; ctx.fillRect(x, y, width, height);
    drawGrid(x, y, width, height);
    ctx.strokeStyle = "#67805f"; ctx.strokeRect(x + .5, y + .5, width - 1, height - 1);
    text(title, x + 16, y + 26, colors.text, 14);
  }
  function maxwell(w, h) {
    const gap = 14, left = 20, top = 54;
    const pw = (w - left * 2 - gap) / 2, ph = h - top - 36;
    const titles = language === "en" ? ["Changing B ↔ circulating E", "Changing D ↔ circulating H"] : ["变化的 B　↔　环绕的 E", "变化的 D　↔　环绕的 H"];
    for (let i = 0; i < 2; i++) {
      const x = left + i * (pw + gap), cx = x + pw / 2, cy = top + ph * .52;
      panel(x, top, pw, ph, titles[i]);
      const radius = Math.min(pw * .25, ph * .33);
      const pulse = 1 + .15 * Math.sin(clock * Math.PI * 2);
      ctx.beginPath(); ctx.ellipse(cx, cy, radius * pulse, radius * .64 * pulse, 0, 0, 2 * Math.PI);
      ctx.strokeStyle = i === 0 ? colors.red : colors.blue; ctx.lineWidth = 2.5; ctx.stroke();
      const midColor = i === 0 ? colors.blue : colors.red;
      arrow(cx, cy + 20, cx, cy - 20 - 15 * values.strength * Math.sin(clock * 2 * Math.PI), midColor);
      text(i === 0 ? "∂B/∂t" : "∂D/∂t", cx, cy + radius * .64 + 22, midColor, 14, "center");
      text(i === 0 ? "∇×E = −∂B/∂t" : "∇×H = ∂D/∂t（J=0）", cx, top + ph - 20, colors.muted, Math.min(14, Math.max(11, pw / 19)), "center");
    }
    text(localize("无源介质中的局部旋度耦合 · 下方推导才说明波动方程", "Local curl coupling in a source-free medium · derivation below"), 22, 31, colors.muted, 13);
  }
  function solution(w, h) {
    const left = 46, right = w - 28, mid = h * .63, span = right - left;
    line(left, mid, right, mid, colors.grid, 2); arrow(right - 50, mid, right - 4, mid, colors.green, "+z");
    const position = values.direction * (clock % 1) * span * .58;
    const width = span * .12 * values.width;
    function pulse(shift) {
      return Array.from({ length: 151 }, (_, i) => {
        const x = left + span * i / 150;
        return [x, mid - Math.exp(-(((x - (left + span * .48 + shift)) / width) ** 2)) * h * .34];
      });
    }
    curve(pulse(0), colors.muted, 2, .45);
    curve(pulse(position), colors.red, 3);
    text(localize("t = 0（浅色）", "t = 0 (pale)"), left + 2, h * .25, colors.muted);
    text(values.direction > 0 ? localize("t > 0　f(z−vt) 向 +z", "t > 0  f(z−vt) toward +z") : localize("t > 0　g(z+vt) 向 −z", "t > 0  g(z+vt) toward −z"), left + 2, h * .34, colors.text, 16);
    text(localize("同一特征点：z ∓ vt = 常数", "Same feature: z ∓ vt = constant"), left + 2, h - 29, colors.muted, 13);
  }
  function periods(w, h) {
    const left = 53, right = w - 26, range = right - left;
    for (let row = 0; row < 2; row++) {
      const y = h * (row ? .74 : .31), top = y - h * .18;
    text(row ? localize("固定 z：随时间 t 振动", "Fixed z: sample over time t") : localize("固定 t：沿位置 z 取样", "Fixed t: sample along z"), left, top - 6, colors.text, 14);
      line(left, y, right, y, colors.grid, 1.5);
      const scale = row ? values.lambda / values.speed : values.lambda;
      const pixelsPerUnit = range / 7;
      const points = Array.from({ length: 201 }, (_, i) => {
        const x = left + range * i / 200;
        const argument = 2 * Math.PI * ((x - left) / pixelsPerUnit / scale - (row ? 0 : clock * .65));
        return [x, y - h * .13 * Math.cos(argument)];
      });
      curve(points, row ? colors.blue : colors.red, 2.6);
      const bracketY = y + h * .16;
      const x2 = Math.min(right, left + scale * pixelsPerUnit);
      line(left, bracketY, x2, bracketY, colors.green, 2);
      line(left, bracketY - 6, left, bracketY + 6, colors.green);
      line(x2, bracketY - 6, x2, bracketY + 6, colors.green);
      text(row ? "T = λ/v" : "λ", (left + x2) / 2, bracketY - 7, colors.green, 14, "center");
    }
  }
  function wavefronts(w, h) {
    const cx = w * .5, cy = h * .54;
    const a = values.angle * Math.PI / 180;
    const nx = Math.cos(a), ny = -Math.sin(a), tx = -ny, ty = nx;
    for (let index = -5; index <= 5; index++) {
      const shift = index * values.spacing + (clock % 1) * values.spacing;
      const px = cx + nx * shift, py = cy + ny * shift;
      line(px - tx * Math.max(w, h), py - ty * Math.max(w, h), px + tx * Math.max(w, h), py + ty * Math.max(w, h), colors.blue, 1.5, .22 + .5 * (index === 0));
    }
    arrow(cx - nx * 65, cy - ny * 65, cx + nx * 90, cy + ny * 90, colors.green, "k");
    text(localize("等相位线（波面的截面）", "Equal-phase lines (wavefront section)"), 25, 35, colors.text, 15);
    text(localize("沿线移动 Δr：k·Δr = 0", "Along a line Δr: k·Δr = 0"), 25, h - 25, colors.muted, 14);
  }
  function phasor(w, h) {
    const compact = w < 610;
    const cx = compact ? w * .34 : w * .3, cy = h * .54;
    const radius = Math.min(h * .27, w * (compact ? .22 : .17)) * values.amplitude;
    const phi = values.phase * Math.PI / 180 - clock * Math.PI * 2;
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.strokeStyle = colors.grid; ctx.lineWidth = 1.5; ctx.stroke();
    line(cx - radius - 25, cy, cx + radius + 25, cy, colors.grid, 1.5);
    line(cx, cy - radius - 22, cx, cy + radius + 22, colors.grid, 1.5);
    const px = cx + radius * Math.cos(phi), py = cy - radius * Math.sin(phi);
    arrow(cx, cy, px, py, colors.blue);
    line(px, py, px, cy, colors.muted, 1.5, .85);
    line(cx, cy, px, cy, colors.red, 4);
    text("Im", cx + 8, cy - radius - 16, colors.muted, 12);
    text("Re", cx + radius + 6, cy - 7, colors.muted, 12);
    text(localize("实部 = A cosφ", "Real part = A cosφ"), Math.max(20, cx - 50), h - 24, colors.red, 14);
    if (!compact) {
      const left = w * .58, right = w - 22, base = cy;
      line(left, base, right, base, colors.grid, 1.5);
      const points = Array.from({ length: 121 }, (_, i) => {
        const x = left + (right - left) * i / 120;
        return [x, base - radius * Math.cos(i / 120 * Math.PI * 3 + phi)];
      });
      curve(points, colors.red, 2.5);
    text(localize("真实场随相位变化", "Physical field varies with phase"), left, h - 24, colors.muted, 13);
    }
  }
  function amplitude(w, h) {
    const count = w < 500 ? 4 : 5;
    const gap = (w - 70) / (count - 1);
    const r = Math.min(31, gap * .28, h * .12);
    const cy = h * .45;
    line(30, cy + r + 35, w - 28, cy + r + 35, colors.grid, 1.5);
    text(localize("同一时刻，不同位置的复振幅 A(z)", "Complex amplitude A(z) at different positions"), 25, 34, colors.text, 15);
    for (let i = 0; i < count; i++) {
      const x = 35 + gap * i;
      const z = i * .5;
      const phi = 2 * Math.PI * z / values.lambda + values.phase * Math.PI / 180;
      const live = phi - clock * Math.PI * 2;
      ctx.beginPath(); ctx.arc(x, cy, r, 0, Math.PI * 2); ctx.strokeStyle = colors.grid; ctx.stroke();
      arrow(x, cy, x + r * Math.cos(phi), cy - r * Math.sin(phi), colors.blue);
      const real = Math.cos(live) * r * 1.25;
      line(x, cy + r + 35, x, cy + r + 35 - real, colors.red, 5);
      text(`z${i}`, x, cy + r + 65, colors.muted, 12, "center");
    }
    text(localize("蓝：空间相量　红：乘共同时间因子后取实部", "Blue: spatial phasor · red: real part after time factor"), 25, h - 20, colors.muted, 12);
  }
  function orthogonal(w, h) {
    const scale = Math.min(w / 8.8, h / 4.8);
    const project = (x, y, z) => {
      const depth = z * Math.sin(yaw) - y * Math.cos(yaw);
      return [w * .49 + scale * (z * Math.cos(yaw) + y * Math.sin(yaw)), h * .53 - scale * (x * Math.cos(pitch) - depth * Math.sin(pitch))];
    };
    const pLine = (a, b, color, width = 1, alpha = 1) => { const p = project(...a), q = project(...b); line(p[0], p[1], q[0], q[1], color, width, alpha); };
    for (let i = -3; i <= 3; i++) {
      const z = values.lambda * (i + (clock / values.n) % 1);
      if (Math.abs(z) > 3.65) continue;
      const corners = [[-1.35,-1.35],[1.35,-1.35],[1.35,1.35],[-1.35,1.35]];
      ctx.beginPath(); corners.forEach(([x,y],j) => { const p=project(x,y,z); if(j) ctx.lineTo(...p); else ctx.moveTo(...p); });
      ctx.closePath(); ctx.fillStyle="#8bdbab12"; ctx.fill(); ctx.strokeStyle="#8bdbab44"; ctx.stroke();
    }
    pLine([0,0,-3.7],[0,0,3.7],colors.muted,1.5,.7);
    const a = project(0,0,2.4), b=project(0,0,3.75); arrow(...a,...b,colors.green,"+k");
    const sampleZ=.2, val=Math.cos(2*Math.PI*(sampleZ/values.lambda-clock/values.n));
    const base=project(0,0,sampleZ), e=project(val,0,sampleZ), fieldB=project(0,val,sampleZ);
    if(Math.abs(val)>.06) { arrow(...base,...e,colors.red,"E"); arrow(...base,...fieldB,colors.blue,"vB"); }
    for(const [color,point] of [[colors.red,(v,z)=>project(v,0,z)],[colors.blue,(v,z)=>project(0,v,z)]]) {
      const points=Array.from({length:161},(_,i)=>{const z=-3.5+7*i/160;return point(Math.cos(2*Math.PI*(z/values.lambda-clock/values.n)),z);});
      curve(points,color,2.6);
    }
    text(localize("E ⟂ B ⟂ k · E₀/B₀ = c/n（此处 μᵣ=1）", "E ⟂ B ⟂ k · E₀/B₀ = c/n (here μᵣ=1)"),20,31,colors.text,w<500?11:14);
    text(localize("拖动旋转 / 方向键 · 蓝线绘制的是 vB", "Drag / arrow keys to rotate · blue line is vB"),20,h-20,colors.muted,12);
  }
  const painters = { maxwell, solution, periods, wavefronts, phasor, amplitude, orthogonal };
  for (const [key, figure] of Object.entries(extra)) {
    painters[key] = (w, h) => figure.draw({ ctx, w, h, values, clock, language, drawGrid });
  }
  function frame(now) {
    if (!paused && !document.hidden && last) clock += Math.min((now - last) / 1000, .05) * .45;
    last = now;
    const rect = canvas.getBoundingClientRect();
    // The figure moves between the lab and full notes. Do not paint a hidden
    // 1px canvas: several physical diagrams require a positive plotting area.
    if (rect.width < 60 || rect.height < 60) { requestAnimationFrame(frame); return; }
    const w = Math.max(1, rect.width), h = Math.max(1, rect.height), dpr = Math.min(devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    const background = ["#243d32", "#345142"];
    gradient.addColorStop(0, background[0]); gradient.addColorStop(1, background[1]);
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip();
    drawGrid(0, 0, w, h);
    painters[mode](w, h);
    ctx.restore();
    requestAnimationFrame(frame);
  }
  setMode(mode);
  requestAnimationFrame(frame);
  return { setMode, setLanguage, toggle, reset, get paused() { return paused; }, get mode() { return mode; } };
};

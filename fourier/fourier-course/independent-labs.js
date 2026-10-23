(() => {
  const data = window.FourierIndependentLabData;
  const recaps = window.FourierIndependentRecaps;
  const key = "fourier-independent-labs-v1";
  let records = {};
  try { records = JSON.parse(localStorage.getItem(key)) || {}; } catch { /* Optional local persistence. */ }
  let context, host, activeId, activeMode;
  const P = (zh, en) => ({ zh, en });
  const text = value => typeof value === "string" ? value : value[context.language];
  const h = value => context.html(String(value));
  const t = (zh, en) => h(text(P(zh, en)));
  const prose = value => h(text(value)).replace(/\$([^$]+)\$/g, (_, tex) => context.math(tex));
  const fmt = x => Math.abs(x) < 1e-8 ? "0" : Number(x.toFixed(4)).toString();
  const save = () => {
    try { localStorage.setItem(key, JSON.stringify(records)); } catch { /* Reading and interaction remain available. */ }
    document.dispatchEvent(new Event("fourier-lab-change"));
  };
  const record = id => records[id] ||= { stage: 0, values: {}, answers: {}, notes: {} };
  const values = (id, index, notes = false) => {
    const group = notes ? record(id).notes : record(id).values;
    return group[index] ||= { ...data[id][index].initial };
  };
  const overlap = (a, b, c, d) => Math.max(0, Math.min(b, d) - Math.max(a, c));
  const sinc = x => Math.abs(x) < 1e-10 ? 1 : Math.sin(x) / x;
  const gauss = x => Math.exp(-Math.PI * x * x);
  const test = x => 1 / (1 + x * x);
  const integrate = (fn, a, b, n = 500) => {
    const dx = (b - a) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) sum += fn(a + (i + .5) * dx) * dx;
    return sum;
  };
  const convolve = (a, b) => {
    const out = Array(a.length + b.length - 1).fill(0);
    a.forEach((x, i) => b.forEach((y, j) => { out[i + j] += x * y; }));
    return out;
  };
  const add = (a, b) => Array.from({ length: Math.max(a.length, b.length) }, (_, i) => (a[i] || 0) + (b[i] || 0));
  function functionValue(shape, x, a) {
    if (shape === "step") return x === 0 ? .5 : x > 0 ? 1 : 0;
    if (shape === "sgn") return Math.sign(x);
    if (shape === "rect") return Math.abs(x) <= a / 2 ? 1 : 0;
    if (shape === "tri") return Math.max(0, 1 - Math.abs(x) / a);
    if (shape === "sinc") return sinc(Math.PI * x / a);
    return gauss(x / a);
  }
  function deltaValue(s) {
    const f = s.discontinuous ? x => x > 0 ? 1 : x < 0 ? 0 : .5 : test;
    return s.family === "gauss"
      ? integrate(x => s.weight * s.n * gauss(s.n * (x - s.x0)) * f(x), s.x0 - 6 / s.n, s.x0 + 6 / s.n)
      : s.weight * s.n * integrate(f, s.x0 - .5 / s.n, s.x0 + .5 / s.n);
  }
  function lawValues(s) {
    const f = [1, 2], g = [1, 1], k = [1, 0, 1];
    if (s.law === "commute") return { first: s.swap ? g : f, second: s.swap ? f : g, left: convolve(f, g), right: convolve(g, f) };
    if (s.law === "distribute") {
      const u = [1, 0], v = [0, 2 * s.gain];
      return { first: convolve(u, g), second: convolve(v, g), left: convolve(add(u, v), g), right: add(convolve(u, g), convolve(v, g)) };
    }
    return { first: s.group === "right" ? convolve(g, k) : convolve(f, g), second: s.group === "right" ? f : k, left: convolve(convolve(f, g), k), right: convolve(f, convolve(g, k)) };
  }
  function impulseValue(s, x) {
    if (s.variant === "finite") return s.n * integrate(u => gauss(x - u), -.5 / s.n, .5 / s.n, 80);
    if (s.variant === "train") return Array.from({ length: 9 }, (_, i) => gauss(x - (i - 4) * s.spacing)).reduce((a, b) => a + b, 0);
    const width = s.variant === "system" && !s.invariant ? 1 + .6 * Math.abs(s.x0) : 1;
    const first = s.weight * gauss((x - s.x0) / width);
    return first + (s.variant === "pair" ? s.second * gauss(x - s.x0 - s.spacing) : 0);
  }
  function crossValue(s, x) {
    const lag = s.swap ? -x : x;
    const area = overlap(-.5, .5, s.shift + lag - .5, s.shift + lag + .5)
      + (s.repeated ? overlap(-.5, .5, s.shift + 2 + lag - .5, s.shift + 2 + lag + .5) : 0);
    const phase = (s.phase || 0) * (s.swap ? 1 : -1);
    return { re: area * Math.cos(phase), im: area * Math.sin(phase), abs: area };
  }
  function autoValue(s, x) {
    if (s.signed) {
      const intervals = [[-1, 0, 1], [0, 1, -1]];
      const value = intervals.reduce((sum, [a, b, f]) => sum + intervals.reduce((v, [c, d, g]) => v + f * g * overlap(a, b, c + x, d + x), 0), 0);
      return { re: value, im: 0, abs: Math.abs(value), energy: 2 };
    }
    const area = s.amp * s.amp * Math.max(0, s.a - Math.abs(x));
    return { re: area * Math.cos((s.omega || 0) * x), im: area * Math.sin((s.omega || 0) * x), abs: area, energy: s.amp * s.amp * s.a };
  }
  function powerValue(s, x) {
    const k = 2 * Math.PI / s.period, q = k * (s.ratio || 1);
    const phase = q * x - (s.phase || 0), factor = s.amp * s.amp / 2;
    const finite = factor * Math.cos(phase) * (sinc((k - q) * s.window) + sinc((k + q) * s.window));
    const limit = (s.ratio || 1) === 1 ? factor * Math.cos(phase) : 0;
    return { finite, limit, total: finite * 2 * s.window };
  }
  // Charts share only drawing primitives; each lesson uses its own mathematical model.
  function graph(curves, options = {}) {
    const { xmin = -3, xmax = 3, ymin = -.2, ymax = 1.3, marker, bound, axis = "x" } = options;
    const X = x => 52 + (x - xmin) * 450 / (xmax - xmin);
    const Y = y => 172 - (y - ymin) * 132 / (ymax - ymin);
    const zero = Y(Math.max(ymin, Math.min(ymax, 0)));
    const ticks = Array.from({ length: 5 }, (_, i) => xmin + i * (xmax - xmin) / 4);
    return `<svg class="il-graph" viewBox="0 0 550 210" role="img" aria-label="${h(options.label || text(P("带刻度的函数图", "Function chart with ticks")))}"><path d="M52 30V172H510M52 ${zero}H510" fill="none" stroke="#a59b8f"/>${ticks.map(x => `<path d="M${X(x)} 172v5" stroke="#777"/><text x="${X(x)}" y="193" text-anchor="middle">${fmt(x)}</text>`).join("")}${[ymin, (ymin + ymax) / 2, ymax].map(y => `<text x="44" y="${Y(y) + 4}" text-anchor="end">${fmt(y)}</text>`).join("")}<text x="526" y="193">${h(axis)}</text>${bound === undefined ? "" : `<path d="M52 ${Y(bound)}H502" stroke="#888" stroke-dasharray="3 5"/>`}${curves.map((c, j) => `<polyline points="${Array.from({ length: 501 }, (_, i) => { const x = xmin + (xmax - xmin) * i / 500; return `${X(x)},${Y(c.fn(x))}`; }).join(" ")}" fill="none" stroke="${c.color || ["#245b66", "#ae5130", "#61548b"][j]}" stroke-width="${c.dash ? 2 : 2.5}" ${c.dot ? 'stroke-dasharray="2 5"' : c.dash ? 'stroke-dasharray="6 4"' : ""}/>`).join("")}${marker === undefined ? "" : `<path d="M${X(marker)} 30V172" stroke="#8a5b22" stroke-dasharray="3 4"/>`}</svg>`;
  }
  function stems(items, label, ymin = 0, ymax = 3) {
    const xmin = Math.min(-4, ...items.map(v => v[0] - .5)), xmax = Math.max(4, ...items.map(v => v[0] + .5));
    const X = x => 55 + (x - xmin) * 424 / (xmax - xmin), Y = y => 153 - (y - ymin) * 112 / (ymax - ymin);
    return `<svg class="il-graph" viewBox="0 0 550 200" role="img" aria-label="${h(label)}"><text x="25" y="22">${h(label)}</text><path d="M25 ${Y(0)}H525" stroke="#a59b8f"/>${items.map(([x, y], i) => `<path d="M${X(x)} ${Y(0)}V${Y(y)}l-4 ${y < 0 ? -6 : 6}m4 ${y < 0 ? -6 : 6}l4 ${y < 0 ? -6 : 6}" fill="none" stroke="${i % 2 ? "#ae5130" : "#245b66"}" stroke-width="2.4"/><text x="${X(x)}" y="${Y(y) + (y < 0 ? 18 : -7)}" text-anchor="middle">${fmt(y)}</text><text x="${X(x)}" y="190" text-anchor="middle">${fmt(x)}</text>`).join("")}</svg>`;
  }
  const legend = (zh, en) => `<p class="il-legend">${t(zh, en)}</p>`;
  function scene(model, s) {
    if (model === "function") {
      if (s.shape === "circ") {
        const radius = 42 * s.a;
        return { graphic: `<svg class="il-graph" viewBox="0 0 550 320" role="img" aria-label="${t("圆内透过值1，圆外0；标记半径a", "Transmission 1 inside, 0 outside; radius a marked")}"><path d="M45 160H505M275 20V300" stroke="#b1a493"/><circle cx="275" cy="160" r="${radius}" fill="#bed7d9" stroke="#245b66" stroke-width="3"/><path d="M275 160h${radius}" stroke="#ae5130" stroke-width="3"/><text x="${275 + radius / 2}" y="148">a=${fmt(s.a)}</text><text x="285" y="180">1</text><text x="490" y="145">0</text><text x="505" y="180">x</text><text x="285" y="25">y</text></svg>`, readout: t(`半径=${fmt(s.a)}；面积 πa²=${fmt(Math.PI * s.a * s.a)}`, `Radius=${fmt(s.a)}; area πa²=${fmt(Math.PI * s.a * s.a)}`) };
      }
      const value = functionValue(s.shape, s.probe, s.a);
      return { graphic: graph([{ fn: x => functionValue(s.shape, x, s.a) }], { xmin: -4, xmax: 4, ymin: -1.15, ymax: 1.3, marker: s.probe, label: `${s.shape}, a=${s.a}, x=${s.probe}` }), readout: `${h(s.shape)} · a=${fmt(s.a)} · x=${fmt(s.probe)} · ${t("函数值", "value")}=${fmt(value)}` };
    }
    if (model === "delta") {
      const f = s.discontinuous ? x => x > 0 ? 1 : x < 0 ? 0 : .5 : test;
      const pulse = x => s.weight * (s.family === "gauss" ? gauss(s.n * (x - s.x0)) : Math.abs(x - s.x0) <= .5 / s.n ? 1 : 0);
      return { graphic: legend("蓝：测试函数；橙：脉冲高度除以N后显示，真实峰高cN；宽度不缩放", "Blue: test function; orange: pulse height divided by N for display, true peak cN; width unchanged") + graph([{ fn: f }, { fn: pulse }], { xmin: -3, xmax: 3, ymin: -1.2, ymax: 3.2, marker: s.x0, axis: "ξ" }), readout: `${t("宽", "Width")} 1/N=${fmt(1 / s.n)} · ${t("权重", "weight")} c=${s.weight} · ${t("真实峰高", "true peak")}=${fmt(s.weight * s.n)} · ${t("有限积分", "finite integral")}=${fmt(deltaValue(s))} · ${t("目标", "target")}=${fmt(s.weight * f(s.x0))}` };
    }
    if (model === "deltaPlane") {
      return { graphic: `<svg class="il-graph" viewBox="0 0 550 300" role="img" aria-label="${t("虚线原轮廓，实线横纵分别压缩的轮廓", "Dashed original contour and solid horizontally/vertically compressed contour")}"><path d="M60 150H490M275 25V275" stroke="#a59b8f"/><ellipse cx="275" cy="150" rx="130" ry="110" fill="none" stroke="#a59b8f" stroke-dasharray="6 4"/><ellipse cx="275" cy="150" rx="${130 / s.ax}" ry="${110 / s.by}" fill="#bed7d9" stroke="#245b66" stroke-width="3"/><text x="285" y="32">y</text><text x="492" y="165">x</text><text x="25" y="290">α=${s.ax}, β=${s.by}</text></svg>`, readout: `${t("相对积分权重", "Relative integral weight")}=1/|αβ|=${fmt(1 / Math.abs(s.ax * s.by))}` };
    }
    if (model.startsWith("comb")) {
      const tau = s.tau;
      if (s.grid) {
        return { graphic: `<svg class="il-graph" viewBox="0 0 550 300" role="img" aria-label="${t("二维单位权重点列", "2D unit-weight lattice")}">${Array.from({ length: 7 }, (_, i) => Array.from({ length: 7 }, (_, j) => `<circle cx="${275 + (i - 3) * tau * 27}" cy="${150 - (j - 3) * s.b * 20}" r="4" fill="#245b66"/>`).join("")).join("")}<path d="M275 150h${tau * 27}m0 0l-5 -3m5 3l-5 3M275 150v${-s.b * 20}" stroke="#ae5130" fill="none"/><text x="280" y="180">τ=${tau}</text><text x="287" y="${148 - s.b * 10}">b=${s.b}</text><text x="20" y="24">(nτ,mb), ${t("每点权重1", "weight 1 per site")}</text></svg>`, readout: `${t("位置", "Sites")}: (n×${tau}, m×${s.b}) · ${t("权重补偿", "weight correction")}: 1/(τb)=${fmt(1 / (tau * s.b))}` };
      }
      const f = model === "combOperation" ? gauss : x => .5 + .4 * Math.cos(Math.PI * x / 2);
      const xs = Array.from({ length: 2 * Math.floor(4 / tau) + 1 }, (_, i) => (i - Math.floor(4 / tau)) * tau);
      if (model === "combScale") return { graphic: stems(xs.map(x => [x, tau]), "comb(x/τ)", 0, 3.5) + stems(xs.map(x => [x, 1]), "(1/τ) comb(x/τ)", 0, 3.5), readout: t(`位置相同；上：权重${tau}，下：权重1`, `Same sites; top weight ${tau}, bottom weight 1`) };
      const curves = [{ fn: f }];
      if (model === "combAlias") curves.push({ fn: x => f(x) + .3 * Math.sin(Math.PI * x / tau) });
      if (model === "combOperation" && s.operation === "convolve") {
        return { graphic: legend("蓝：原高斯；橙：n=−8…8的移位副本和", "Blue: original Gaussian; orange: shifted-copy sum for n=−8…8") + graph([curves[0], { fn: x => Array.from({ length: 17 }, (_, i) => gauss(x - (i - 8) * tau)).reduce((a, b) => a + b, 0) }], { xmin: -4, xmax: 4, ymax: 3 }), readout: t(`副本中心 n×${tau}；不是样点乘积`, `Replica centers n×${tau}; not a sampled product`) };
      }
      const weighted = s.weighted || model === "combOperation" || model === "combAlias";
      return { graphic: graph(curves, { xmin: -4, xmax: 4, ymax: 1.3, marker: (s.sample || 0) * tau }) + stems(xs.map(x => [x, weighted ? f(x) : 1]), weighted ? "f(nτ) δ(x−nτ)" : "Σ δ(x−nτ)", 0, 1.4), readout: `τ=${tau} · n=${s.sample || 0} · nτ=${fmt((s.sample || 0) * tau)} · ${t("权重", "weight")}=${fmt(weighted ? f((s.sample || 0) * tau) : 1)}` };
    }
    if (model === "laws") {
      const v = lawValues(s), range = Math.max(5, ...v.left.map(Math.abs), ...v.right.map(Math.abs));
      const array = a => `[${a.map(fmt).join(", ")}]`;
      return { graphic: `<div class="il-flow"><p>${s.law === "commute" ? t("依次输入", "Input order") : t("中间分支", "Intermediate branches")}: <b>${array(v.first)}</b> &nbsp; / &nbsp; <b>${array(v.second)}</b></p><p>${t("路线甲", "Path A")}: <b>${array(v.left)}</b></p><p>${t("路线乙", "Path B")}: <b>${array(v.right)}</b></p></div>` + stems(v.left.map((x, i) => [i, x]), text(P("共同的最终输出；编号从0开始", "Common final output; indices start at 0")), -range, range), readout: t(`逐项差值：${array(v.left.map((x, i) => x - v.right[i]))}`, `Indexwise differences: ${array(v.left.map((x, i) => x - v.right[i]))}`) };
    }
    if (model === "lawWindows") {
      const fn = x => overlap(-.5, .5, x - s.a / 2, x + s.a / 2);
      return { graphic: legend("蓝：f；橙：移动响应；下图是乘积积分", "Blue: f; orange: shifted response; bottom: product integral") + graph([{ fn: x => Math.abs(x) <= .5 ? 1 : 0 }, { fn: x => Math.abs(x - s.lag) <= s.a / 2 ? 1 : 0 }], { xmin: Math.min(-3, s.lag - s.a / 2 - .5), xmax: Math.max(3, s.lag + s.a / 2 + .5), marker: s.lag, axis: "τ" }) + graph([{ fn }], { marker: s.lag }), readout: `${t("交叠积分", "Overlap integral")}=${fmt(fn(s.lag))} · ${t("支撑边界", "Support edges")}: ±${fmt((1 + s.a) / 2)}` };
    }
    if (model === "impulses") {
      const curves = [{ fn: gauss, dash: true }, { fn: x => impulseValue(s, x) }];
      if (s.variant === "pair") curves.push({ fn: x => s.second * gauss(x - s.x0 - s.spacing), dash: true });
      const ymax = Math.max(2.5, Math.abs(s.weight) + Math.abs(s.second || 0) + .5, s.variant === "train" ? 4 : 0);
      const xmin = Math.min(-4, s.x0 - 2, s.variant === "pair" ? s.x0 + s.spacing - 2 : 0), xmax = Math.max(4, s.x0 + 2, s.variant === "pair" ? s.x0 + s.spacing + 2 : 0);
      return { graphic: legend("蓝虚线：原响应h；橙实线：计算输出；紫虚线：第二点分响应（有时显示）", "Blue dashed: original h; orange solid: computed output; purple dashed: second-point component when present") + graph(curves, { xmin, xmax, ymin: -2, ymax, marker: s.x0 }) + (["pair", "ideal", "system"].includes(s.variant) ? stems([[s.x0, s.weight], ...(s.variant === "pair" ? [[s.x0 + s.spacing, s.second]] : [])], text(P("输入点的位置和权重", "Input sites and weights")), -2, 3) : ""), readout: `${t("位置", "Site")} x₀=${fmt(s.x0)} · ${t("该位置输出", "Output at that site")}=${fmt(impulseValue(s, s.x0))} · ${t("模型", "model")}: ${t({ finite: "有限脉冲近似", ideal: "理想单点", pair: "两点叠加", train: "有限点列", system: "系统响应" }[s.variant], s.variant)}` };
    }
    if (model === "crossPlane") {
      const cx = s.shift + s.lag, cy = s.sy + s.ly;
      const area = overlap(-.5, .5, cx - .5, cx + .5) * overlap(-.5, .5, cy - .5, cy + .5);
      return { graphic: `<svg class="il-graph" viewBox="0 0 550 320" role="img" aria-label="${t("两个单位方窗的平面交叠", "Planar overlap of two unit squares")}"><path d="M50 160H500M275 20V300" stroke="#aaa"/><rect x="225" y="110" width="100" height="100" fill="#b9d4d9" fill-opacity=".6" stroke="#245b66" stroke-width="3"/><rect x="${225 + cx * 100}" y="${110 - cy * 100}" width="100" height="100" fill="#eabf86" fill-opacity=".5" stroke="#ae5130" stroke-width="3"/><text x="40" y="25">ξ,η</text><text x="35" y="295">(s+x, sᵧ+y)=(${fmt(cx)}, ${fmt(cy)})</text></svg>`, readout: `${t("乘积面积", "Product area")}=${fmt(area)}` };
    }
    if (model === "crossKernel") {
      const center = s.reflected ? -s.shift : s.shift, phase = (s.phase || 0) * (s.reflected ? -1 : 1);
      return { graphic: legend("蓝实线：实部；橙虚线：虚部", "Blue solid: real; orange dashed: imaginary") + graph([{ fn: x => Math.abs(x - center) <= .5 ? Math.cos(phase) : 0 }, { fn: x => Math.abs(x - center) <= .5 ? Math.sin(phase) : 0, dash: true }], { ymin: -1.2, ymax: 1.2, axis: "u", marker: center }), readout: `${s.reflected ? "g*(−u)" : "g(u)"} · ${t("中心", "center")}=${fmt(center)} · φ=${fmt(phase)}` };
    }
    if (model === "cross") {
      // For a swapped correlation, the original f is translated instead.
      const fCenter = s.swap ? s.lag : 0, gCenter = s.shift + (s.swap ? 0 : s.lag);
      const top = graph([{ fn: x => Math.abs(x - fCenter) <= .5 ? 1 : 0 }, { fn: x => (Math.abs(x - gCenter) <= .5 ? 1 : 0) + (s.repeated && Math.abs(x - gCenter - 2) <= .5 ? 1 : 0) }], { xmin: Math.min(-3, fCenter - .75, gCenter - .75), xmax: Math.max(3, fCenter + .75, gCenter + .75 + (s.repeated ? 2 : 0)), axis: "ξ", ymax: 1.3 });
      const v = crossValue(s, s.lag);
      return { graphic: legend("上：蓝f、橙g的支撑（不表示复值）；下：实部实线、虚部虚线、模点线", "Top: blue f/orange g supports, not complex values; bottom: real solid, imaginary dashed, magnitude dotted") + top + graph([{ fn: x => crossValue(s, x).re }, { fn: x => crossValue(s, x).im, dash: true }, { fn: x => crossValue(s, x).abs, dot: true }], { xmin: -4, xmax: 4, ymin: -1.2, ymax: 1.3, marker: s.lag }), readout: `s=${fmt(s.shift)}, x=${fmt(s.lag)} · r=${fmt(v.re)} ${v.im < 0 ? "−" : "+"} ${fmt(Math.abs(v.im))}i · |r|=${fmt(v.abs)}` };
    }
    if (model === "auto") {
      const fn = x => s.signed ? x >= -1 && x < 0 ? 1 : x >= 0 && x <= 1 ? -1 : 0 : Math.abs(x) <= s.a / 2 ? s.amp * Math.cos((s.omega || 0) * x) : 0;
      const v = autoValue(s, s.lag);
      return { graphic: legend("上：输入实部及移位副本实部；下：自相关实部、虚部虚线、模点线", "Top: input real part and shifted real part; bottom: autocorrelation real, imaginary dashed, magnitude dotted") + graph([{ fn }, { fn: x => fn(x - s.lag), dash: true }], { xmin: Math.min(-3, s.lag - s.a / 2 - .5), xmax: Math.max(3, s.lag + s.a / 2 + .5), ymin: -3.2, ymax: 3.2, axis: "ξ" }) + graph([{ fn: x => autoValue(s, x).re }, { fn: x => autoValue(s, x).im, dash: true }, { fn: x => autoValue(s, x).abs, dot: true }], { ymin: -v.energy * 1.15, ymax: v.energy * 1.15, marker: s.lag, bound: v.energy }), readout: `x=${fmt(s.lag)} · r=${fmt(v.re)} ${v.im < 0 ? "−" : "+"} ${fmt(Math.abs(v.im))}i · |r|=${fmt(v.abs)} · E=${fmt(v.energy)}` };
    }
    if (model === "power") {
      const k = 2 * Math.PI / s.period, q = k * (s.ratio || 1), v = powerValue(s, s.lag);
      return { graphic: legend("上：窗[−X,X]内两信号；下：蓝实线有限平均，橙虚线无限窗极限", "Top: signals within [−X,X]; bottom: blue solid finite mean, orange dashed infinite-window limit") + graph([{ fn: x => s.amp * Math.cos(k * x) }, { fn: x => s.amp * Math.cos(q * (x - s.lag) + (s.phase || 0)), dash: true }], { xmin: -s.window, xmax: s.window, ymin: -s.amp * 1.2, ymax: s.amp * 1.2, axis: "ξ" }) + graph([{ fn: x => powerValue(s, x).finite }, { fn: x => powerValue(s, x).limit, dash: true }], { ymin: -s.amp * s.amp, ymax: s.amp * s.amp, marker: s.lag }), readout: `2X=${fmt(2 * s.window)} · ${t("积分", "integral")}=${fmt(v.total)} · ${t("有限平均", "finite mean")}=${fmt(v.finite)} · ${t("极限", "limit")}=${fmt(v.limit)}` };
    }
    throw new Error(`Unknown independent-lab model: ${model}`);
  }
  const controls = {
    a: ["a", P("尺度 a（圆孔为半径）", "Scale a (radius for circle)"), .5, 3, .25],
    probe: ["probe", P("探针位置 x", "Probe position x"), -3, 3, .25],
    n: ["n", P("窄化参数 N", "Narrowing parameter N"), 1, 12, 1],
    x0: ["x0", P("点位置 x₀", "Point position x₀"), -2, 2, .25],
    weight: ["weight", P("第一点权重 c", "First-point weight c"), -1, 3, .5],
    second: ["second", P("第二点权重 b", "Second-point weight b"), -1, 2, .5],
    spacing: ["spacing", P("点列间隔 d", "Point separation d"), .75, 3, .25],
    ax: ["ax", P("横向缩放 α", "Horizontal scaling α"), 1, 4, 1],
    by: ["by", P("纵向缩放 β", "Vertical scaling β"), 1, 4, 1],
    tau: ["tau", P("采样间距 τ", "Sample spacing τ"), .75, 2.5, .25],
    b: ["b", P("纵向间距 b", "Vertical spacing b"), .5, 2, .25],
    sample: ["sample", P("样点编号 n", "Sample index n"), -1, 1, 1],
    gain: ["gain", P("第二路系数 c", "Second-path coefficient c"), -1, 2, .5],
    lag: ["lag", P("试探位移 x", "Trial lag x"), -3, 3, .25],
    shift: ["shift", P("第二信号原中心 s", "Original second-signal center s"), -1.5, 1.5, .25],
    ly: ["ly", P("竖直试探位移 y", "Vertical trial lag y"), -1, .5, .25],
    amp: ["amp", P("信号幅度 A", "Signal amplitude A"), .5, 3, .5],
    period: ["period", P("周期 T", "Period T"), 1, 3, .5],
    window: ["window", P("观察窗半宽 X", "Window half-width X"), .5, 8, .25],
    shapeSwitch: ["shape", P("函数", "Function"), [["step", "step"], ["sgn", "sgn"]]],
    family: ["family", P("脉冲轮廓", "Pulse profile"), [["rect", P("矩形", "Rectangle")], ["gauss", P("高斯", "Gaussian")]]],
    operation: ["operation", P("运算", "Operation"), [["multiply", P("相乘采样", "Multiply / sample")], ["convolve", P("卷积复制", "Convolve / replicate")]]],
    group: ["group", P("先算哪一组", "Compute which group first"), [["left", "(f*h)*k"], ["right", "f*(h*k)"]]],
    phase: ["phase", P("第二信号相位 φ", "Second-signal phase φ"), [[0, "0"], [Math.PI / 2, "π/2"], [Math.PI, "π"]]],
    omega: ["omega", P("相位斜率 ω", "Phase slope ω"), [[0, "0"], [Math.PI / 2, "π/2"], [Math.PI, "π"]]],
    ratio: ["ratio", P("第二频率 / 第一频率", "Second / first frequency"), [[1, "1"], [2, "2"]]],
    swap: ["swap", P("交换两个输入", "Swap inputs"), "check"],
    reflected: ["reflected", P("显示折转并共轭的 g*(−u)", "Show reflected/conjugated g*(−u)"), "check"],
    invariant: ["invariant", P("固定形状（空间不变）", "Fixed shape (shift-invariant)"), "check"],
  };
  function controlMarkup(stage, s) {
    return `<div class="il-controls">${stage.controls.map(name => {
      const [field, label, low, max, step] = controls[name];
      if (low === "check") return `<label class="il-check"><input type="checkbox" data-il-control="${field}" ${s[field] ? "checked" : ""}>${h(text(label))}</label>`;
      if (Array.isArray(low)) return `<label>${h(text(label))}<select data-il-control="${field}">${low.map(([value, option]) => `<option value="${value}" ${String(s[field]) === String(value) ? "selected" : ""}>${h(text(option))}</option>`).join("")}</select></label>`;
      return `<label>${h(text(label))} <output data-il-output="${field}">${fmt(s[field])}</output><input type="range" data-il-control="${field}" min="${low}" max="${max}" step="${step}" value="${s[field]}"></label>`;
    }).join("")}</div>`;
  }
  function liveMarkup(index, notes = false) {
    const stage = data[activeId][index], s = values(activeId, index, notes);
    const hidden = !notes && index === data[activeId].length - 1 && record(activeId).answers[index] === undefined;
    const result = hidden ? null : scene(stage.model, s);
    return `<div class="il-bench" data-il-bench="${index}" data-il-notes="${notes}" tabindex="-1"><div class="il-scene">${hidden ? `<div class="il-hidden" role="status">${t("先用题目给定条件独立判断；提交后再显示计算图和读数。", "Use the given conditions to predict independently. Submit to reveal the calculated chart and readings.")}</div>` : result.graphic}</div><div class="il-readout" role="status">${hidden ? t("新情境：计算结果未显示", "New case: calculated results hidden") : result.readout}</div>${controlMarkup(stage, s)}${stage.controls.length ? `<button type="button" class="il-reset" data-il-reset="${index}">${t("恢复本步题述条件", "Restore this step's stated conditions")}</button>` : ""}<p class="il-boundary">${t("无量纲数学模型，非实测。判断按题述条件，控件用于另做对照。", "Dimensionless mathematical model, not measurements. Answer for the stated case; use controls for additional comparisons.")}</p>${notes ? "" : `<button type="button" class="il-mobile-jump" data-il-focus="decision">${t("查看判断与反馈 ↓", "Go to prediction and feedback ↓")}</button>`}</div>`;
  }
  function equation(tex) {
    return tex ? `<div class="il-math" role="group" tabindex="0" aria-label="${t("关系式；可左右滚动", "Relation; horizontally scrollable")}">${context.math(tex, true)}</div>` : "";
  }
  function renderExplore() {
    const list = data[activeId], r = record(activeId), index = Math.min(r.stage || 0, list.length - 1), stage = list[index];
    const selected = r.answers[index], answered = selected !== undefined;
    // The final insight and relation are withheld along with the result, including accessible text.
    host.innerHTML = `<div class="il-shell"><p class="il-intro">${t("每步有不同的观察与比较；可自由跳步、回看。操作不会写入正式练习。", "Each step has its own observation and comparison. Skip or revisit freely; exploration never writes formal answers.")}</p><nav class="il-route" aria-label="${t("实验步骤", "Experiment steps")}">${list.map((s, i) => `<button type="button" data-il-stage="${i}" ${index === i ? 'aria-current="step"' : ""}>${i + 1} · ${h(text(s.title))}</button>`).join("")}</nav><section class="il-stage" tabindex="-1"><header><small>${activeId} / ${index + 1}—${list.length}</small><h2>${h(text(stage.title))}</h2><p class="il-task">${prose(stage.task)}</p></header><div class="il-grid">${liveMarkup(index)}<div class="il-decision" tabindex="-1"><button type="button" class="il-mobile-jump" data-il-focus="bench">${t("回看图和条件 ↑", "Revisit chart and conditions ↑")}</button><h3>${t("先预测，再操作比较", "Predict, then operate and compare")}</h3><div class="il-choices">${stage.choices.map((choice, i) => `<button type="button" data-il-answer="${i}" aria-pressed="${selected === i}">${h(text(choice))}</button>`).join("")}</div><p class="il-feedback" role="status" aria-live="polite">${answered ? `<strong>${selected === stage.answer ? t("判断正确。", "Correct. ") : t("再比较一下。", "Compare again. ")}</strong>${h(text(stage.feedback[selected]))}` : t("选一个判断；不同误解会得到不同解释，可随时重试。", "Choose a claim for misconception-specific feedback; retry at any time.")}</p>${index === list.length - 1 && !answered ? "" : `<div class="il-insight"><h3>${t("看懂这一步", "Make sense of this step")}</h3><p>${prose(stage.insight)}</p>${equation(stage.tex)}</div>`}</div></div><p class="il-next-reason">${h(text(stage.next))}</p><div class="il-step-actions"><button type="button" data-il-stage="${Math.max(0, index - 1)}" ${index === 0 ? "disabled" : ""}>${t("← 上一步", "← Previous")}</button>${index < list.length - 1 ? `<button type="button" data-il-stage="${index + 1}">${t("下一步 →", "Next →")}</button>` : `<button type="button" data-view="recap">${t("图解回顾 →", "Visual recap →")}</button>`}</div></section><p class="il-progress">${t("本节已作答", "Answered in this section")} ${Object.keys(r.answers).length}/${list.length} · ${t("不代表掌握率", "not a mastery score")}</p></div>`;
  }
  const noteStages = {
    "1.1": [0, 1, 2, 3, 4, 5],
    "1.2.1": [2, 0, 4, 3],
    "1.2.2": [0, 1, 2, 3],
    "1.3.2": [0, 1, 2, 5],
    "1.3.3": [0, 1, 3, 5],
    "1.4.1": [6, 1, 4],
    "1.4.2": [0, 3, 4, 2],
    "1.4.3": [0, 1, 2, 5],
  };
  const noteTitles = {
    "1.4.1": [P("把相关扩展到平面", "Extend correlation to a plane"), P("用一维条带建立相关", "Build correlation with 1D strips"), P("把相关改写为卷积", "Rewrite correlation as convolution")],
  };
  function renderNotes() {
    const lesson = window.FourierLessons.find(l => l.id === activeId), g = window.FourierGuides[activeId];
    const content = window.FourierIndependentNotes;
    const order = activeId === "1.4.1" ? [1, 0, 2] : lesson.notes.map((_, i) => i);
    const benchIndex = record(activeId).noteStage ?? noteStages[activeId][order[0]];
    const title = i => text(noteTitles[activeId]?.[i] || lesson.notes[i].title);
    const supplement = content.supplements[activeId];
    const proof = lines => lines.map(line => `<div class="il-proof-line"><p>${h(text(line.lead))}</p>${equation(line.tex)}<p>${h(text(line.read))}</p></div>`).join("");
    host.innerHTML = `<div class="il-shell il-notes"><header class="il-notes-intro"><h2>${h(text(g.question))}</h2><p>${h(text(content.setups[activeId]))}</p><p>${t("先修：函数、坐标、四则运算；复数和积分的当前用法在下面就地说明。探索只保留操作所需的关系；这里连续给出定义、演算和条件。", "Prerequisites: functions, coordinates and arithmetic. Current uses of complex numbers and integration are explained below. Exploration keeps operational relations; these notes give definitions, calculations and conditions continuously.")}</p><ul>${g.terms.map(v => `<li>${h(text(v))}</li>`).join("")}</ul><nav class="il-reading-route" aria-label="${t("讲义路线", "Notes route")}">${order.map((i, n) => `<button type="button" data-reading="${i}">${n + 1} · ${h(title(i))}</button>`).join("")}</nav></header><div class="il-notes-layout"><div class="il-reading">${order.map((i, n) => {
      const item = lesson.notes[i], step = g.steps[i];
      const prelude = content.preludes[`${activeId}:${i}`];
      return `<article id="reading-${i}" class="il-note" tabindex="-1"><small>${n + 1} / ${order.length}</small><h2>${h(title(i))}</h2>${prelude ? `<p>${prose(prelude.text)}</p>${equation(prelude.tex)}` : ""}<p>${h(text(content.before[`${activeId}:${i}`] || item.before))}</p><p>${h(text(step.build))}</p><button type="button" data-il-note="${i}">${t("对照本段的可操作图 ↗", "Compare with this section's interactive chart ↗")}</button>${proof(step.proof)}${equation(item.tex)}<p class="il-insight">${h(text(item.after))}</p>${proof(content.extraProof[`${activeId}:${i}`] || [])}<p><strong>${t("具体算例：", "Worked case: ")}</strong>${h(text(step.example))}</p><p class="il-next-reason">${h(text(content.next[`${activeId}:${i}`] || step.next))}</p></article>`;
    }).join("")}${supplement ? `<section class="il-supplement"><h2>${t("把实验结果放回一般条件", "Connect the experiment to general conditions")}</h2><p>${prose(supplement.text)}</p>${equation(supplement.tex)}</section>` : ""}<button type="button" data-view="quiz">${t("进入正式练习 →", "Go to formal practice →")}</button><details class="il-sources"><summary>${t("来源、教材记号与页码（选读）", "Sources, textbook notation and pages (optional)")}</summary><p>${t("吕乃光《傅里叶光学》第3版；下列页码可用页面顶部来源按钮打开。本课图示与数字例子为教学重组。", "Lü Naiguang, Fourier Optics, 3rd edition. Use the source button above to open the pages. Diagrams and numerical examples are teaching adaptations.")}</p><ul>${lesson.notes.map(item => `<li>${h(context.language === "zh" ? item.source || `${lesson.pages} / PDF ${lesson.pdf}` : `${(item.source || "").match(/\([0-9,-]+\)/g)?.join(", ") || "Course derivation"} · pp. ${lesson.pages} / PDF ${lesson.pdf}`)}</li>`).join("")}</ul></details></div><aside class="il-notes-bench" aria-label="${t("讲义交互图", "Interactive notes chart")}"><p class="il-chart-title">${h(text(data[activeId][benchIndex].title))}</p>${liveMarkup(benchIndex, true)}${record(activeId).noteReturn === undefined ? "" : `<button type="button" data-il-return="${record(activeId).noteReturn}">${t("回到刚才的讲解 ↓", "Return to the explanation ↓")}</button>`}</aside></div></div>`;
  }
  function renderRecap() {
    host.innerHTML = `<div class="il-shell il-recap"><h2>${t("沿着同一条线索回顾", "Recap along one connected example")}</h2><p>${t("四幅图串起输入、操作、结果与边界；它不是重复的讲义，也不写入作答。", "Four diagrams connect inputs, operations, results and limits, without repeating the notes or recording answers.")}</p><div class="il-recap-grid">${recaps[activeId].map(([zh, en, model, state], i) => {
      const result = scene(model, state);
      return `<figure><figcaption><b>0${i + 1}</b> ${t(zh, en)}</figcaption>${result.graphic}<p class="il-readout">${result.readout}</p></figure>`;
    }).join("")}</div><button type="button" data-view="notes">${t("阅读完整讲义 →", "Read full notes →")}</button></div>`;
  }
  function render(element, options) {
    host = element; context = options; activeId = options.id; activeMode = options.mode;
    if (options.mode === "explore") renderExplore();
    if (options.mode === "recap") renderRecap();
    if (options.mode === "notes") renderNotes();
  }
  const focus = selector => {
    const target = host.querySelector(selector);
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  document.addEventListener("click", event => {
    const target = event.target.closest("[data-il-stage],[data-il-answer],[data-il-reset],[data-il-note],[data-il-return],[data-il-focus]");
    if (!target || !host?.contains(target)) return;
    if (target.hasAttribute("data-il-focus")) { focus(target.dataset.ilFocus === "bench" ? ".il-bench" : ".il-decision"); return; }
    if (target.hasAttribute("data-il-stage")) {
      record(activeId).stage = Number(target.dataset.ilStage); save(); renderExplore(); focus(".il-stage"); return;
    }
    if (target.hasAttribute("data-il-answer")) {
      const index = record(activeId).stage;
      record(activeId).answers[index] = Number(target.dataset.ilAnswer); save(); renderExplore();
      host.querySelector(`[data-il-answer="${target.dataset.ilAnswer}"]`)?.focus({ preventScroll: true }); return;
    }
    if (target.hasAttribute("data-il-reset")) {
      const index = Number(target.dataset.ilReset), notes = activeMode === "notes";
      (notes ? record(activeId).notes : record(activeId).values)[index] = { ...data[activeId][index].initial };
      save();
      const bench = target.closest(".il-bench");
      bench.outerHTML = liveMarkup(index, notes);
      host.querySelector(`[data-il-reset="${index}"]`)?.focus({ preventScroll: true }); return;
    }
    if (target.hasAttribute("data-il-note")) {
      const note = Number(target.dataset.ilNote);
      record(activeId).noteStage = noteStages[activeId][note];
      record(activeId).noteReturn = note;
      save(); renderNotes();
      if (matchMedia("(max-width: 1100px)").matches) host.querySelector(".il-notes-bench").scrollIntoView({ block: "start" });
      host.querySelector(".il-notes-bench button")?.focus({ preventScroll: true }); return;
    }
    if (target.hasAttribute("data-il-return")) focus(`#reading-${target.dataset.ilReturn}`);
  });
  document.addEventListener("input", event => {
    const control = event.target.closest("[data-il-control]");
    if (!control || !host?.contains(control)) return;
    const bench = control.closest(".il-bench"), index = Number(bench.dataset.ilBench);
    const state = values(activeId, index, bench.dataset.ilNotes === "true"), field = control.dataset.ilControl;
    state[field] = control.type === "checkbox" ? control.checked : typeof state[field] === "number" ? Number(control.value) : control.value;
    save();
    const result = scene(data[activeId][index].model, state);
    bench.querySelector(".il-scene").innerHTML = result.graphic;
    bench.querySelector(".il-readout").innerHTML = result.readout;
    const output = bench.querySelector(`[data-il-output="${field}"]`);
    if (output) output.textContent = fmt(state[field]);
  });
  window.FourierIndependentLabs = {
    has: id => Boolean(data[id]), render,
    currentValues: (id, mode) => {
      if (mode === "recap" || mode === "quiz") return {};
      const r = record(id), index = mode === "notes" ? r.noteStage ?? noteStages[id][id === "1.4.1" ? 1 : 0] : r.stage || 0;
      if (mode === "explore" && index === data[id].length - 1 && r.answers[index] === undefined) return {};
      return values(id, index, mode === "notes");
    },
    // Exposed for independent numerical regression, not for determining formal answers.
    calculate: { functionValue, deltaValue, lawValues, impulseValue, crossValue, autoValue, powerValue, convolve },
  };
})();

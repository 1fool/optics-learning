// A non-modal chart companion: the learner can keep using the controls.
(() => {
  let panel, source, opener, observer;
  const english = () => document.documentElement.lang === "en";
  const label = (zh, en) => english() ? en : zh;
  const content = () => source?.querySelector(".il-explanation-slot, .conv-chart-explanation");
  function close(restoreFocus = false) {
    if (!panel) return;
    panel.hidden = true;
    panel.querySelector(".explanation-card-body").replaceChildren();
    opener?.setAttribute("aria-expanded", "false");
    if (restoreFocus && opener?.isConnected) opener.focus({ preventScroll: true });
    source = null;
  }
  function bounds(left, top, width, height) {
    width = Math.min(Math.max(Math.min(300, innerWidth - 24), width), innerWidth - 24);
    height = Math.min(Math.max(Math.min(220, innerHeight - 24), height), innerHeight - 24);
    Object.assign(panel.style, {
      width: `${width}px`, height: `${height}px`,
      left: `${Math.min(Math.max(12, left), innerWidth - width - 12)}px`,
      top: `${Math.min(Math.max(12, top), innerHeight - height - 12)}px`,
    });
  }
  function refresh() {
    if (!source) return;
    if (!source.isConnected || !content()) { close(); return; }
    opener = source.querySelector("[data-explanation-toggle]");
    opener?.setAttribute("aria-expanded", "true");
    const body = panel.querySelector(".explanation-card-body"), scroll = body.scrollTop;
    body.innerHTML = content().innerHTML;
    body.scrollTop = scroll;
  }
  function create() {
    panel = document.createElement("aside");
    panel.id = "chart-explanation-card";
    panel.className = "chart-explanation-card";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "chart-explanation-title");
    panel.innerHTML = `<header><div class="explanation-card-move" tabindex="0" role="group"><h2 id="chart-explanation-title"></h2><small></small></div><button type="button" data-explanation-close></button></header><div class="explanation-card-body" tabindex="0"></div><button type="button" class="explanation-card-resize" aria-label="Resize">↘</button>`;
    document.body.append(panel);
    for (const [selector, resize] of [[".explanation-card-move", false], [".explanation-card-resize", true]]) {
      const handle = panel.querySelector(selector);
      let drag;
      handle.addEventListener("pointerdown", event => {
        if (event.button !== 0) return;
        const r = panel.getBoundingClientRect();
        drag = { x: event.clientX, y: event.clientY, left: r.left, top: r.top, width: r.width, height: r.height };
        handle.setPointerCapture(event.pointerId);
        event.preventDefault();
      });
      handle.addEventListener("pointermove", event => {
        if (!drag) return;
        const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
        bounds(drag.left + (resize ? 0 : dx), drag.top + (resize ? 0 : dy), drag.width + (resize ? dx : 0), drag.height + (resize ? dy : 0));
      });
      for (const type of ["pointerup", "pointercancel", "lostpointercapture"]) handle.addEventListener(type, () => { drag = null; });
      handle.addEventListener("keydown", event => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
        event.preventDefault();
        const r = panel.getBoundingClientRect(), dx = event.key === "ArrowRight" ? 16 : event.key === "ArrowLeft" ? -16 : 0, dy = event.key === "ArrowDown" ? 16 : event.key === "ArrowUp" ? -16 : 0;
        bounds(r.left + (resize ? 0 : dx), r.top + (resize ? 0 : dy), r.width + (resize ? dx : 0), r.height + (resize ? dy : 0));
      });
    }
    panel.querySelector("[data-explanation-close]").addEventListener("click", () => close(true));
    panel.addEventListener("keydown", event => { if (event.key === "Escape") { event.stopPropagation(); close(true); } });
    observer = new MutationObserver(refresh);
    observer.observe(document.getElementById("content"), { childList: true, subtree: true });
    window.addEventListener("resize", () => {
      if (!source) return;
      const r = panel.getBoundingClientRect(); bounds(r.left, r.top, r.width, r.height);
    });
  }
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-explanation-toggle]");
    if (!button) return;
    if (source === button.closest(".il-bench, .conv-scene, .il-recap-grid figure")) { close(true); return; }
    close();
    if (!panel) create();
    source = button.closest(".il-bench, .conv-scene, .il-recap-grid figure");
    opener = button;
    if (!content()) { close(); return; }
    button.setAttribute("aria-expanded", "true");
    panel.querySelector("h2").textContent = label("图示与计算说明", "Chart and calculation guide");
    panel.querySelector("small").textContent = label("拖动标题移动 · 右下角调整大小 · 方向键也可操作", "Drag title to move · resize bottom-right · arrow keys also work");
    panel.querySelector("[data-explanation-close]").textContent = label("关闭", "Close");
    panel.querySelector(".explanation-card-move").setAttribute("aria-label", label("移动说明卡片", "Move explanation card"));
    panel.querySelector(".explanation-card-resize").setAttribute("aria-label", label("调整说明卡片大小", "Resize explanation card"));
    panel.hidden = false;
    refresh();
    const r = (source.querySelector(".il-scene, svg") || source).getBoundingClientRect();
    const width = Math.min(460, innerWidth - 24), height = Math.min(660, innerHeight - 48);
    bounds(r.right + 14, Math.max(24, r.top), width, height);
    panel.querySelector(".explanation-card-move").focus({ preventScroll: true });
  });
})();

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
  const prose = value => text(value).split(/(\$[^$]+\$)/g).map(part => part.startsWith("$") ? context.math(part.slice(1, -1)) : h(part)).join("");
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
  function deltaBounds(s) {
    if (s.family === "left") return [s.x0 - 1 / s.n, s.x0];
    if (s.family === "right") return [s.x0, s.x0 + 1 / s.n];
    const half = (s.family === "gauss" ? 6 : .5) / s.n;
    return [s.x0 - half, s.x0 + half];
  }
  function deltaValue(s) {
    const f = s.discontinuous ? x => x > 0 ? 1 : x < 0 ? 0 : .5 : test;
    const [left, right] = deltaBounds(s);
    return s.family === "gauss"
      ? integrate(x => s.weight * s.n * gauss(s.n * (x - s.x0)) * f(x), left, right)
      : s.weight * s.n * integrate(f, left, right);
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
    return `<svg class="il-graph" viewBox="0 0 550 210" role="img" aria-label="${h(options.label || text(P("带刻度的函数图", "Function chart with ticks")))}"><path d="M52 30V172H510M52 ${zero}H510" fill="none" stroke="#a59b8f"/>${ticks.map(x => `<path d="M${X(x)} 172v5" stroke="#777"/><text x="${X(x)}" y="193" text-anchor="middle">${fmt(x)}</text>`).join("")}${[ymin, (ymin + ymax) / 2, ymax].map(y => `<text x="44" y="${Y(y) + 4}" text-anchor="end">${fmt(y)}</text>`).join("")}<text x="526" y="193">${h(axis)}</text>${bound === undefined ? "" : `<path d="M52 ${Y(bound)}H502" stroke="#888" stroke-dasharray="3 5"/>`}${curves.map((c, j) => `<polyline points="${(c.points || Array.from({ length: 501 }, (_, i) => { const x = xmin + (xmax - xmin) * i / 500; return [x, c.fn(x)]; })).map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}" fill="none" stroke="${c.color || ["#245b66", "#ae5130", "#61548b"][j]}" stroke-width="${c.dash ? 2 : 2.5}" ${c.dot ? 'stroke-dasharray="2 5"' : c.dash ? 'stroke-dasharray="6 4"' : ""}/>`).join("")}${marker === undefined ? "" : `<path d="M${X(marker)} 30V172" stroke="#8a5b22" stroke-dasharray="3 4"/>`}</svg>`;
  }
  function stems(items, label, ymin = 0, ymax = 3) {
    const xmin = Math.min(-4, ...items.map(v => v[0] - .5)), xmax = Math.max(4, ...items.map(v => v[0] + .5));
    const X = x => 55 + (x - xmin) * 424 / (xmax - xmin), Y = y => 153 - (y - ymin) * 112 / (ymax - ymin);
    return `<svg class="il-graph" viewBox="0 0 550 200" role="img" aria-label="${h(label)}"><text x="25" y="22">${h(label)}</text><path d="M25 ${Y(0)}H525" stroke="#a59b8f"/>${items.map(([x, y], i) => `<path d="M${X(x)} ${Y(0)}V${Y(y)}l-4 ${y < 0 ? -6 : 6}m4 ${y < 0 ? -6 : 6}l4 ${y < 0 ? -6 : 6}" fill="none" stroke="${i % 2 ? "#ae5130" : "#245b66"}" stroke-width="2.4"/><text x="${X(x)}" y="${Y(y) + (y < 0 ? 18 : -7)}" text-anchor="middle">${fmt(y)}</text><text x="${X(x)}" y="190" text-anchor="middle">${fmt(x)}</text>`).join("")}</svg>`;
  }
  const legend = (zh, en) => `<p class="il-legend">${t(zh, en)}</p>`;
  function jumpComparison(s) {
    return `<div class="il-comparison"><p><strong>${t("必须比较的三个条件（同一N、同一面积）", "Three required comparisons (same N and area)")}</strong></p><table><thead><tr><th>${t("近似族", "Family")}</th><th>${t("非零区间", "Support interval")}</th><th>${t("乘阶跃后积分", "Integral against step")}</th></tr></thead><tbody>${[
      ["left", P("左侧", "Left"), `[${fmt(-1 / s.n)}, 0]`, "0"],
      ["rect", P("对称", "Symmetric"), `[${fmt(-.5 / s.n)}, ${fmt(.5 / s.n)}]`, fmt(s.weight / 2)],
      ["right", P("右侧", "Right"), `[0, ${fmt(1 / s.n)}]`, fmt(s.weight)],
    ].map(([family, label, interval, value]) => `<tr ${s.family === family ? 'aria-current="true"' : ""}><th>${h(text(label))}</th><td>${interval}</td><td>${value}</td></tr>`).join("")}</tbody></table><p>${t("先取单位权重：左侧脉冲只乘到阶跃的零值；对称脉冲只有正半边贡献；右侧脉冲全部乘到一。分别计算：", "Take unit weight: the left pulse sees only zero, the symmetric pulse contributes only on its positive half, and the right pulse sees one throughout. Compute:")}</p>${equation(String.raw`\begin{aligned}\text{left: }&N\times\frac1N\times0=0,\\\text{symmetric: }&N\times\frac1{2N}\times1=\frac12,\\\text{right: }&N\times\frac1N\times1=1.\end{aligned}`)}<p>${t("改变N只改变宽度和高度，不改变落在阶跃右侧的面积比例；更换近似族才改变这个比例。单点的函数值约定不改变积分。", "Changing N changes width and height, not the fraction of area to the right of the jump; changing families changes that fraction. Assigning a value at a single point cannot change the integral.")}</p>${equation(String.raw`\int p_N(\xi)f(\xi)\,d\xi=\int_0^\infty p_N(\xi)\,d\xi`)}<p>${prose(P("为什么三者都能近似 $\\delta$？对在零处连续的函数 $\\varphi$，收缩区间里的函数值都趋近 $\\varphi(0)$，所以单位面积平均也趋近该值。阶跃在零处不连续，这段理由失效：当前对称例的一半不是通用取样目标。", "Why do all three approximate $\\delta$? For a function $\\varphi$ continuous at zero, values throughout each shrinking interval approach $\\varphi(0)$, as does their unit-area average. The step is discontinuous there, so this argument fails: the symmetric one-half is not a universal target."))}</p></div>`;
  }
  function deltaExplanation(s) {
    const [left, right] = deltaBounds(s);
    const paragraph = (zh, en) => `<p>${prose(P(zh, en))}</p>`;
    const f = s.discontinuous
      ? String.raw`f(\xi)=\begin{cases}0,&\xi<0,\\\frac12,&\xi=0,\\1,&\xi>0.\end{cases}`
      : String.raw`f(\xi)=\frac{1}{1+\xi^2}`;
    const pulse = s.family === "gauss"
      ? String.raw`p_N(\xi)=cN e^{-\pi N^2(\xi-x_0)^2}`
      : String.raw`p_N(\xi)=\begin{cases}cN,&${fmt(left)}\le\xi\le${fmt(right)},\\0,&\text{otherwise}.\end{cases}`;
    const integral = s.family === "gauss"
      ? String.raw`\begin{aligned}I_N&=\int_{-\infty}^{\infty}p_N(\xi)f(\xi)\,d\xi\\&\approx\int_{x_0-6/N}^{x_0+6/N}\!cN e^{-\pi N^2(\xi-x_0)^2}f(\xi)\,d\xi\end{aligned}`
      : String.raw`\begin{aligned}I_N&=\int_{-\infty}^{\infty}p_N(\xi)f(\xi)\,d\xi\\&=cN\int_{${fmt(left)}}^{${fmt(right)}}f(\xi)\,d\xi\end{aligned}`;
    let result = `<section class="il-explanation"><h3>${t("先认清图与记号", "Identify the plot and notation")}</h3>`
      + paragraph(`当前演示给定 $N=${s.n}$。$N$ 是收缩参数，越大脉冲越窄；不是积分分格数，也不是需要从积分结果反求的未知量。理想 $\\delta$ 的取样积分不依赖这个有限宽演示参数。`, `The current demonstration uses $N=${s.n}$. $N$ controls concentration: larger values give narrower pulses. It is not the integration cell count or an unknown to infer from the result. Ideal $\\delta$ sampling does not depend on this finite-width demonstration parameter.`)
      + paragraph("$p_N$ 读作‘p下标N’，是参数为 $N$ 的有限宽脉冲函数。$p$ 只是函数名，下标用来区分宽度，不是乘法或幂。$p_N(\\xi)$ 表示它在输入位置 $\\xi$ 处的值。它是近似理想脉冲的普通函数，不是理想脉冲本身。", "$p_N$, read p subscript N, names the finite-width pulse for parameter $N$. The letter $p$ is only a function name; the subscript labels its width, not multiplication or a power. $p_N(\\xi)$ is its value at input position $\\xi$. It approximates an ideal impulse but is not that impulse itself.")
      + paragraph("$\\delta$ 读作德尔塔，表示理想狄拉克脉冲，不是有限高度的曲线。$\\xi$ 读作克西，是横轴上的积分坐标；$x_0$ 是极限取样位置，$c$ 是带符号的积分权重，$N$ 控制脉冲收缩。", "$\\delta$ (delta) denotes the ideal Dirac impulse, not a finite-height curve. $\\xi$ (xi) is the horizontal integration coordinate; $x_0$ is the limiting sample site, $c$ is signed integral weight, and $N$ controls concentration.")
      + paragraph("蓝线是被取样函数 $f$。橙线显示有限脉冲的真实高度除以 $N$，以免峰过高；它不是两条线相乘的结果。虚竖线标极限位置；左、右侧脉冲不以该位置为中心。", "Blue is the sampled function $f$. Orange displays true finite-pulse height divided by $N$ to keep the peak visible; it is not the product of the curves. Vertical dashes mark the limiting site; left/right pulses are not centered there.")
      + equation(f) + equation(pulse)
      + equation(String.raw`\text{orange: }\frac{p_N(\xi)}{N},\qquad\text{true peak: }cN=${s.weight}\times${s.n}=${fmt(s.weight*s.n)}`)
      + `<h3>${t("分清两个积分", "Distinguish the two integrals")}</h3>`
      + paragraph("脉冲自身的积分是权重 $c$；当权重为一时，称为单位面积。加权积分 $I_N$ 则先把蓝线值与真实脉冲值逐点相乘，再沿横坐标累加，一般不等于脉冲面积。", "The pulse alone integrates to weight $c$; weight one is called unit area. The weighted integral $I_N$ first multiplies the blue function by the true pulse point by point, then accumulates over the horizontal coordinate. It generally differs from the pulse area.")
      + equation(String.raw`\int_{-\infty}^{\infty}p_N(\xi)\,d\xi=c=${s.weight}`)
      + equation(integral)
      + paragraph(`当前计算区间为 [${fmt(left)}, ${fmt(right)}]。` + (s.family === "gauss" ? "高斯在全实轴都不严格为零；$\\frac1N$ 是特征尺度，不是有限支撑宽度。程序只在中心两侧各六倍特征尺度处截断。" : "矩形在这段之外为零，故那里乘积没有贡献；蓝线仍定义在整个实轴。这里没有把橙线宽度重新定义成蓝线的定义域。") + "值域是输出值的集合，不是这里的积分区域。", `The current calculation interval is [${fmt(left)}, ${fmt(right)}]. ` + (s.family === "gauss" ? "A Gaussian is nonzero on the whole line; $\\frac1N$ is a characteristic scale, not compact support width. The program truncates at six such scales on either side of the center. " : "Outside this interval the rectangle is zero, so the product contributes nothing; blue remains defined on the whole line. This does not redefine the domain of blue. ") + "The range is a set of output values, not this integration region.")
      + `<h3>${t("怎样算出当前读数", "Calculate the current reading")}</h3>`
      + paragraph("程序把区间分成500等格，取每格中点的‘脉冲值 × 蓝线值 × 格宽’，再相加。显示保留四位小数，内部计算不先舍入。", "The program divides the interval into 500 equal cells, evaluates pulse value × blue value × cell width at each midpoint, then sums. Display uses four decimals without first rounding internal values.");
    if (!s.discontinuous && s.family !== "gauss") {
      result += paragraph("矩形例还可用反正切作为原函数独立验算；反正切的导数正好是这条蓝线。代入上下限，得到：", "For the rectangle, inverse tangent is an independent antiderivative check: its derivative is exactly the blue function. Substituting both limits gives:")
        + equation(String.raw`\begin{aligned}I_N&=cN\left[\arctan\xi\right]_{${fmt(left)}}^{${fmt(right)}}\\&=${s.weight}\times${s.n}\,[\arctan(${fmt(right)})-\arctan(${fmt(left)})]\\&\approx${fmt(deltaValue(s))}.\end{aligned}`);
    }
    if (s.discontinuous) result += jumpComparison(s);
    else result += `<h3>${t("取样极限参考值从哪里来", "Derive the sampling reference")}</h3>`
      + paragraph("蓝线在取样位置连续时，脉冲不断收窄后的加权积分趋于该点函数值乘权重。这是理想脉冲的取样规则，不是由画出的橙线面积算出，也不要求有限宽脉冲恰好达到。", "When blue is continuous at the sampling site, its integral against the narrowing pulse approaches the local function value times weight. This ideal-impulse sampling rule is not the displayed orange area and is not an exact finite-width requirement.")
      + equation(String.raw`\begin{aligned}c f(x_0)&=\frac{${s.weight}}{1+(${fmt(s.x0)})^2}\\&=${fmt(s.weight*test(s.x0))},\\I_N&\longrightarrow c f(x_0)\quad(N\to\infty).\end{aligned}`);
    return result + "</section>";
  }
  function explanation(model, s) {
    const block = (intro, tex, worked, limits) => `<section class="il-explanation"><h3>${t("图中对象 → 运算 → 当前结果", "Objects → calculation → current result")}</h3><p>${prose(P(...intro))}</p>${equation(tex)}<p>${prose(P(...worked))}</p>${limits ? `<p>${prose(P(...limits))}</p>` : ""}</section>`;
    const array = a => `[${a.map(fmt).join(", ")}]`;
    if (model === "function") {
      if (s.shape === "circ") return block(
        ["圆面是理想圆孔的平面示意，不是函数的立体高度。x、y是位置，$r=\\sqrt{x^2+y^2}$是离圆心的距离；蓝圆内函数值1、圆外0，橙线段是半径a。", "This is a planar ideal pupil, not a 3D function height. x,y are positions; $r=\\sqrt{x^2+y^2}$ is distance from the center. Blue interior has value 1, exterior 0; the orange segment marks radius a."],
        String.raw`F(x,y)=\begin{cases}1,&x^2+y^2\le a^2,\\0,&x^2+y^2>a^2,\end{cases}\qquad \iint F\,dx\,dy=\pi a^2`,
        [`面积=π×${s.a}²=${fmt(Math.PI * s.a ** 2)}，是坐标平面上的面积；透过值为1才可直接等同函数积分。`, `Area=π×${s.a}²=${fmt(Math.PI * s.a ** 2)}, measured in the coordinate plane; it equals the function integral because transmission is 1 inside.`]);
      const formulas = {
        step: String.raw`f(x)=\begin{cases}0,&x<0,\\1/2,&x=0,\\1,&x>0,\end{cases}`,
        sgn: String.raw`f(x)=\begin{cases}-1,&x<0,\\0,&x=0,\\1,&x>0,\end{cases}`,
        rect: String.raw`f(x)=\operatorname{rect}(x/a)=\begin{cases}1,&|x|\le a/2,\\0,&|x|>a/2,\end{cases}`,
        tri: String.raw`f(x)=\operatorname{tri}(x/a)=\max(0,1-|x|/a)`,
        sinc: String.raw`f(x)=\operatorname{sinc}(x/a)=\frac{\sin(\pi x/a)}{\pi x/a},\quad f(0)=1`,
        gauss: String.raw`f(x)=\exp[-\pi(x/a)^2]`,
      };
      return block(
        ["蓝线是所选函数f，横轴x是输入位置，纵轴是函数值；虚竖线标当前探针位置，不是另一条函数。a是横向尺度：rect的全宽、tri的半底宽、sinc第一个正零点、高斯的横向尺度；不是统一的峰高。", "Blue is the selected function f: horizontal x is position, vertical is function value. The vertical dashed line marks the probe, not a second function. Scale a means full rect width, tri half-base width, first positive sinc zero, or Gaussian scale, not a common peak height."],
        formulas[s.shape],
        [`代入 a=${s.a}、x=${s.probe} 得 f(x)=${fmt(functionValue(s.shape, s.probe, s.a))}。|x|是绝对值，max取较大者，sin是正弦（弧度），$\\exp(z)=e^z$，π≈3.14159。sinc在x=0用极限值1，不直接除以0。`, `Substitute a=${s.a}, x=${s.probe} to get f(x)=${fmt(functionValue(s.shape, s.probe, s.a))}. |x| is absolute value, max selects the larger value, sin uses radians, $\\exp(z)=e^z$, and π≈3.14159. At zero, sinc uses its limit 1, not division by zero.`],
        ["rect与tri在有限区间外为0；sinc与高斯并没有以画面边框为界的有限定义域。高斯的全域面积为a（使用标准高斯积分），并非因为峰高为1就面积为1。", "Rect and tri vanish outside finite supports; sinc and Gaussian are not restricted to the displayed horizontal window. Gaussian area is a by the standard Gaussian integral, not always 1 merely because its peak is 1."]);
    }
    if (model === "deltaPlane") return block(
      ["$\\delta(x,y)$是理想点脉冲；虚椭圆表示缩放前有限近似的等值轮廓，蓝椭圆是$\\delta(\\alpha x,\\beta y)$的近似轮廓，不是光斑照片或δ的高度图。α、β分别压缩横向、纵向坐标。", "$\\delta(x,y)$ is an ideal point impulse. The dashed ellipse is an original finite-approximation contour; blue is a contour for $\\delta(\\alpha x,\\beta y)$, not a photograph or a height plot of delta. α,β compress the two coordinates."],
      String.raw`u=\alpha x,\ v=\beta y,\quad dx\,dy=\frac{du\,dv}{|\alpha\beta|},\quad\iint\delta(\alpha x,\beta y)dx\,dy=\frac{1}{|\alpha\beta|}`,
      [`横向宽变为$\\frac{1}{${s.ax}}$，纵向宽变为$\\frac{1}{${s.by}}$，积分权重因此为$\\frac{1}{|${s.ax}\\times${s.by}|}$=${fmt(1 / Math.abs(s.ax * s.by))}。α、β非零；若想保持单位权重，还须把整个函数乘|αβ|。`, `Widths scale by $\\frac{1}{${s.ax}}$ horizontally and $\\frac{1}{${s.by}}$ vertically, so integral weight is $\\frac{1}{|${s.ax}\\times${s.by}|}$=${fmt(1 / Math.abs(s.ax * s.by))}. α,β must be nonzero. Multiply the whole distribution by |αβ| to retain unit weight.`]);
    if (model.startsWith("comb")) {
      if (s.grid) return block(
        ["蓝点是理想脉冲的位置，不表示孔径大小。n、m取所有整数，τ是水平间距，b是竖直间距；橙线段示意这两个间距。每点权重为1，不由点的圆面积计算。", "Blue dots locate ideal impulses, not aperture sizes. n,m range over integers; τ,b are horizontal and vertical spacings, indicated by orange segments. Each site has weight 1, independent of drawn dot area."],
        String.raw`\frac{1}{\tau b}\operatorname{comb}(x/\tau)\operatorname{comb}(y/b)=\sum_{n,m\in\mathbb Z}\delta(x-n\tau)\delta(y-mb)`,
        [`本图位置为(n×${s.tau},m×${s.b})。未补偿的缩放会使每点权重变为τb=${fmt(s.tau * s.b)}；乘$\\frac{1}{\\tau b}$=${fmt(1 / (s.tau * s.b))}后才是单位点列。`, `Sites are (n×${s.tau},m×${s.b}). Uncompensated scaling gives each weight τb=${fmt(s.tau * s.b)}; multiplying by $\\frac{1}{\\tau b}$=${fmt(1 / (s.tau * s.b))} restores unit weights.`]);
      if (model === "combScale") return block(
        ["comb（梳状函数）是等距理想脉冲之和；δ读德尔塔，箭头只编码位置和积分权重，蓝橙交替仅为分辨相邻点，不代表两种信号。上图未补偿，下图补偿。", "Comb is a train of equally spaced ideal Dirac impulses δ. Arrows encode location and integral weight; alternating colors only distinguish adjacent sites. Top is uncorrected scaling, bottom corrected."],
        String.raw`\operatorname{comb}(x/\tau)=\tau\sum_{n\in\mathbb Z}\delta(x-n\tau),\quad\frac1\tau\operatorname{comb}(x/\tau)=\sum_{n\in\mathbb Z}\delta(x-n\tau),\quad\tau>0`,
        [`位置都在n×${s.tau}；上图每点权重${s.tau}，再乘$\\frac{1}{${s.tau}}$后下图每点权重为1。箭头不是普通曲线，不能把箭头围出的三角形面积当权重。`, `Sites are n×${s.tau} in both charts. Top weights ${s.tau}, multiplied by $\\frac{1}{${s.tau}}$ to give bottom weights 1. Arrow-triangle areas have no integral meaning.`]);
      const op = model === "combOperation", replicated = op && s.operation === "convolve";
      const n = s.sample || 0, x = n * s.tau, f = op ? gauss : u => .5 + .4 * Math.cos(Math.PI * u / 2);
      return block(
        [replicated ? "蓝线是原高斯$f(x)=e^{-\\pi x^2}$，橙线是整条函数的移位副本相加。τ是副本间隔，*表示卷积；这里不是逐点相乘取样。" : `上图蓝线是${op ? "高斯$f(x)=e^{-\\pi x^2}$" : "$f(x)=0.5+0.4\\cos(\\pi x/2)$"}，横轴x是位置；下图箭头表示位置nτ上的权重，非δ的实际峰高。n为整数编号，τ为间距，虚竖线标当前样点。`, replicated ? "Blue is the original Gaussian $f(x)=e^{-\\pi x^2}$; orange sums shifted copies of the whole function. τ is their spacing and * denotes convolution, not pointwise sampling." : `Blue is ${op ? "Gaussian $f(x)=e^{-\\pi x^2}$" : "$f(x)=0.5+0.4\\cos(\\pi x/2)$"}; x is position. Lower arrows give integral weights at nτ, not delta peak heights. n is an integer index, τ is spacing, and the vertical dashed line marks the sample.`],
        replicated ? String.raw`(f*\sum_n\delta(\cdot-n\tau))(x)=\sum_n f(x-n\tau)` : String.raw`f(x)\sum_n\delta(x-n\tau)=\sum_n f(n\tau)\delta(x-n\tau)`,
        [replicated ? `当前间距τ=${s.tau}；程序用n=−8到8的17个副本求和，每个副本先把横坐标改成x−nτ，再求高斯值；有限副本只近似无限点列的卷积。` : `当前n=${n}，位置nτ=${n}×${s.tau}=${fmt(x)}。${s.weighted || op || model === "combAlias" ? `将这个位置代入f得权重${fmt(f(x))}` : "本步是未加权单位点列，每支权重1，上方f仅作后续取样对照"}。上下图纵轴分别为函数值与积分权重，不能当同一种峰高比较。`, replicated ? `For τ=${s.tau}, the program sums 17 copies n=−8…8, evaluating the Gaussian at x−nτ for each. This finite sum only approximates convolution with an infinite train.` : `For n=${n}, nτ=${n}×${s.tau}=${fmt(x)}. ${s.weighted || op || model === "combAlias" ? `Substitution into f gives weight ${fmt(f(x))}` : "This unweighted train has weight 1 at every site; f is shown for the later sampling comparison"}. The two vertical axes are function value and integral weight, not comparable peak heights.`],
        model === "combAlias" ? ["上图橙线是$f(x)+0.3\\sin(\\pi x/\\tau)$；在x=nτ处新增项为0，所以不同连续曲线可以有相同样点。此图不能证明能从样点唯一重建。", "Orange is $f(x)+0.3\\sin(\\pi x/\\tau)$. At x=nτ the added term is zero, so distinct continuous curves share these samples. Unique reconstruction does not follow."] : undefined);
    }
    if (model === "laws") {
      const v = lawValues(s);
      return block(
        ["这里是有限数组，不是连续曲线。序号从0开始，范围外的数组元素为0；*是离散卷积，先乘再按相同输出序号相加。箭头编码数组元素值，交替颜色仅分辨序号。甲乙是两种计算次序，中间分支不是总输出。", "These are finite arrays, not continuous curves. Indices start at zero and omitted entries are zero. * is discrete convolution: multiply pairs with the same total index and add. Arrows encode array values; alternating colors distinguish indices. A/B are evaluation paths, and intermediate branches are not final outputs."],
        String.raw`(a*b)[k]=\sum_j a[j]b[k-j],\quad ([1,2]*[1,1])[1]=1\times1+2\times1=3`,
        [`固定输入f=[1,2]、h=[1,1]、k=[1,0,1]。${s.law === "distribute" ? `本步u=[1,0]、v=[0,2c]，c=${s.gain}，故u+v=[1,${fmt(2 * s.gain)}]。` : "此处数组k是第三个输入的名称，公式[k]中的k则是输出编号。"} 两条路线得到${array(v.left)}与${array(v.right)}，逐项相减为${array(v.left.map((x, i) => x - v.right[i]))}。`, `Fixed inputs: f=[1,2], h=[1,1], k=[1,0,1]. ${s.law === "distribute" ? `Here u=[1,0], v=[0,2c] with c=${s.gain}, so u+v=[1,${fmt(2 * s.gain)}].` : "The array name k denotes the third input; [k] in the general formula is an output index."} Paths give ${array(v.left)} and ${array(v.right)}, with indexwise difference ${array(v.left.map((x, i) => x - v.right[i]))}.`],
        ["有限数组演算是检验例，不是无限连续函数定律的证明；后者须满足讲义中的存在与换序条件。", "Finite-array agreement is an example, not proof for arbitrary infinite continuous functions; the notes state existence and interchange conditions."]);
    }
    if (model === "lawWindows") {
      const l = Math.max(-.5, s.lag - s.a / 2), r = Math.min(.5, s.lag + s.a / 2), length = Math.max(0, r - l);
      return block(
        ["上图蓝线f在[−0.5,0.5]高1，橙线是折转平移后的h(x−τ)，在[x−$\\frac a2$,x+$\\frac a2$]高1；τ是输入积分坐标，x是固定求输出的位置，a是响应全宽。下图蓝线是随x变化的卷积值，不是另一输入。虚竖线定位当前x。", "Top: blue f is height 1 on [−0.5,0.5], orange h(x−τ) is height 1 on [x−$\\frac a2$,x+$\\frac a2$]. τ is the integration coordinate, x the fixed output location, and a the response full width. Bottom blue is the convolution versus x, not another input. Vertical dashes locate the current x."],
        String.raw`g(x)=\int f(\tau)h(x-\tau)d\tau=\max(0,\min(0.5,x+a/2)-\max(-0.5,x-a/2))`,
        [`x=${s.lag}、a=${s.a}：交集左端${fmt(l)}、右端${fmt(r)}；${r > l ? `乘积高1，所以积分=1×(${fmt(r)}−(${fmt(l)}))=${fmt(length)}` : "右端不大于左端，无正长度交集，积分为0"}。输出非零区间边界为$\\pm\\frac{1+a}{2}$=±${fmt((1 + s.a) / 2)}。`, `x=${s.lag}, a=${s.a}: intersection endpoints ${fmt(l)}, ${fmt(r)}. ${r > l ? `Product height is 1, hence integral=1×(${fmt(r)}−(${fmt(l)}))=${fmt(length)}` : "No positive-length intersection, so the integral is zero"}. Output support edges are $\\pm\\frac{1+a}{2}$=±${fmt((1 + s.a) / 2)}.`]);
    }
    if (model === "impulses") {
      const variant = s.variant;
      const formulas = {
        finite: String.raw`g_N(x)=N\int_{-1/(2N)}^{1/(2N)}h(x-u)\,du,\quad h(z)=e^{-\pi z^2}`,
        ideal: String.raw`g(x)=\int c\delta(u-x_0)h(x-u)du=c\,h(x-x_0)`,
        pair: String.raw`g(x)=c\,h(x-x_0)+b\,h(x-x_0-d)`,
        train: String.raw`g(x)=\sum_{n=-4}^{4}h(x-nd)`,
        system: String.raw`g(x)=c\exp[-\pi((x-x_0)/w)^2],\quad w=\begin{cases}1,&\text{invariant},\\1+0.6|x_0|,&\text{otherwise}.\end{cases}`,
      };
      return block(
        [(variant === "finite" ? `当前 $N=${s.n}$ 是有限输入脉冲的收缩参数，越大输入越窄；它不是积分算法的80个分格。` : "") + "蓝虚线h是原点单位输入的高斯响应$h(z)=e^{-\\pi z^2}$，橙实线是输出g，不是δ本身；紫虚线（如有）是第二点单独的输出。下方箭头才表示输入点及带符号权重。x是输出位置，u是被积分的输入位置；δ是理想脉冲，c是第一点权重，b是第二点权重，d是间距。", (variant === "finite" ? `Here $N=${s.n}$ controls the finite input pulse's concentration: larger values give narrower inputs. It is not the integration algorithm's 80-cell count. ` : "") + "Blue dashed h is the Gaussian response $h(z)=e^{-\\pi z^2}$ to a unit input at the origin. Orange is output g, not delta; optional purple dashes show the second-point output. Lower arrows mark input sites and signed weights. x is output position and u the integration coordinate. δ denotes an ideal impulse; c,b are point weights and d their separation."],
        formulas[variant],
        [variant === "finite" ? `有限单位脉冲宽$\\frac1N$=${fmt(1 / s.n)}、高N=${s.n}，u在[${fmt(-.5 / s.n)},${fmt(.5 / s.n)}]内变化；程序用80等格中点和算加权积分。此模型脉冲固定在0，“位置x₀=${s.x0}”只选择输出曲线上的读数点，$g_N(x_0)$≈${fmt(impulseValue(s, s.x0))}，不是把输入脉冲移到x₀。` : variant === "train" ? `本图只累加n=−4…4的9个单位输入响应，间距d=${s.spacing}。在x=${s.x0}处，把9个h(x−nd)相加得${fmt(impulseValue(s, s.x0))}；有限点列并非严格无限周期。` : `在第一点位置x=x₀=${s.x0}求值：${variant === "pair" ? `c h(0)+b h(−d)=${s.weight}+${s.second}e^(−π×${s.spacing}²)` : `c h(0)=${s.weight}×1`}=${fmt(impulseValue(s, s.x0))}；一个点值不代表整条曲线。`, variant === "finite" ? `A unit pulse has width $\\frac1N$=${fmt(1 / s.n)}, height N=${s.n}, and u∈[${fmt(-.5 / s.n)},${fmt(.5 / s.n)}]. The program uses 80 midpoint cells. This pulse stays at zero; x₀=${s.x0} selects an output probe only: $g_N(x_0)$≈${fmt(impulseValue(s, s.x0))}. It does not shift the input pulse.` : variant === "train" ? `This chart sums only 9 unit responses n=−4…4, spacing d=${s.spacing}. At x=${s.x0}, summing h(x−nd) gives ${fmt(impulseValue(s, s.x0))}; a finite train is not exactly infinite-periodic.` : `At x=x₀=${s.x0}: ${variant === "pair" ? `c h(0)+b h(−d)=${s.weight}+${s.second}e^(−π×${s.spacing}²)` : `c h(0)=${s.weight}×1`}=${fmt(impulseValue(s, s.x0))}. This one value is not the whole function.`],
        ["理想点的筛选是在积分内使用，不计算δ(0)。空间不变关闭时，w（响应宽度因子）随输入位置变化；这是反例系统，不能再用同一个h的卷积描述全部输入。", "Ideal sampling acts under an integral; never evaluate δ(0) as a number. With invariance disabled, response-width factor w depends on input location: this counterexample cannot use convolution with one fixed h for every input."]);
    }
    if (model === "crossPlane") {
      const cx = s.shift + s.lag, cy = s.sy + s.ly;
      const lx = Math.max(0, 1 - Math.abs(cx)), ly = Math.max(0, 1 - Math.abs(cy));
      return block(
        ["ξ、η（xi、eta）是输入平面坐标，x、y是本次试探位移。蓝方窗f固定在原点，橙方窗g(ξ−x,η−y)的中心变成(s+x,sᵧ+y)；两个窗内部都为1、外部0。颜色重叠不是自动相乘，积分用的是两函数数值的乘积。", "ξ,η (xi,eta) are input-plane coordinates; x,y are trial lags. Blue f stays centered at zero. Orange g(ξ−x,η−y) moves to (s+x,sᵧ+y). Each square is 1 inside and 0 outside. Color blending is not numerical multiplication; the integral uses their actual values."],
        String.raw`r(x,y)=\iint f(\xi,\eta)g(\xi-x,\eta-y)d\xi d\eta=L_xL_y,\quad L_x=\max(0,1-|s+x|),\ L_y=\max(0,1-|s_y+y|)`,
        [`中心(${fmt(cx)},${fmt(cy)})，交叠宽${fmt(lx)}、高${fmt(ly)}；乘积高1，故双重积分=1×${fmt(lx)}×${fmt(ly)}=${fmt(lx * ly)}。这里只因实单位方窗才可直接算交叠面积。`, `Center (${fmt(cx)},${fmt(cy)}), overlap width ${fmt(lx)}, height ${fmt(ly)}. Product height is 1, so the double integral is 1×${fmt(lx)}×${fmt(ly)}=${fmt(lx * ly)}. This area shortcut relies on real unit-height squares.`]);
    }
    if (model === "crossKernel") return block(
      ["u是横坐标，g是宽1、中心s的复矩窗：窗内值$e^{i\\phi}=\\cos\\phi+i\\sin\\phi$，窗外0；$i^2=-1$，φ以弧度计。蓝实线是实部、橙虚线是虚部，两者共同定义一个复函数，不是两个独立输入。上标*是复共轭，使虚部变号；不是卷积号。", "u is position. g is a width-1 complex window centered at s: inside $e^{i\\phi}=\\cos\\phi+i\\sin\\phi$, outside zero. $i^2=-1$ and φ is in radians. Blue solid and orange dashed are real and imaginary parts of one function. Superscript * means complex conjugation, reversing the imaginary part, not convolution."],
      String.raw`\widetilde g(u)=g^*(-u),\quad r_{fg}=f*\widetilde g`,
      [`${s.reflected ? "折转把中心s变成−s，共轭把φ变成−φ" : "当前显示原函数，尚未折转或共轭"}；当前中心${fmt(s.reflected ? -s.shift : s.shift)}、相位${fmt((s.reflected ? -1 : 1) * (s.phase || 0))} rad。复窗的实部、虚部按cos与sin分别计算。`, `${s.reflected ? "Reflection takes center s to −s; conjugation takes φ to −φ" : "The original function is shown, without reflection or conjugation"}. Current center ${fmt(s.reflected ? -s.shift : s.shift)}, phase ${fmt((s.reflected ? -1 : 1) * (s.phase || 0))} rad. Evaluate cos and sin for its two components.`]);
    if (model === "cross") {
      const v = crossValue(s, s.lag), area = v.abs;
      return block(
        ["上图横轴ξ（xi）遍历输入位置：蓝色是f的支撑，橙色是平移后g的支撑，只画非零区间，不画复幅值。s是g原中心，x是试探位移；未交换时橙中心s+x。下图横轴是位移x：蓝实线Re r、橙虚线Im r、紫点线|r|，虚竖线标当前x；重合时曲线会互相遮盖。", "Top horizontal ξ (xi) sweeps input position. Blue/orange show supports of f/shifted g, not complex amplitudes. s is g's original center, x the trial lag; without swapping the orange center is s+x. Bottom horizontal axis is lag x: blue solid Re r, orange dashed Im r, purple dotted |r|; vertical dashes mark current x. Coincident curves can hide one another."],
        String.raw`r_{fg}(x)=\int f(\xi)g^*(\xi-x)d\xi=L(x)e^{-i\phi},\quad |r|=\sqrt{(\Re r)^2+(\Im r)^2}=L(x)`,
        [`*在g上方表示复共轭。L是交叠总长度：先分别求两个非零区间的交集，再把“窗内乘积×长度”相加。本次${s.repeated ? "两段橙窗的交叠长度求和" : `max(0,1−|${s.shift}${s.swap ? "−" : "+"}(${s.lag})|)`}=${fmt(area)}；乘相位因子后r=${fmt(v.re)}${v.im < 0 ? "−" : "+"}${fmt(Math.abs(v.im))}i。${s.swap ? "交换后使用$r_{gf}(x)=r_{fg}^*(-x)$，所以位移和虚部都反号。" : "单位实窗φ=0时，结果才等于交叠长度。"}`, `Superscript * conjugates g. L is total overlap length: intersect the supports and add product × length on each intersection. Here ${s.repeated ? "the overlap lengths of two orange windows sum to" : `max(0,1−|${s.shift}${s.swap ? "−" : "+"}(${s.lag})|)=`} ${fmt(area)}. Including phase gives r=${fmt(v.re)}${v.im < 0 ? "−" : "+"}${fmt(Math.abs(v.im))}i. ${s.swap ? "Swapping uses $r_{gf}(x)=r_{fg}^*(-x)$, reversing lag and imaginary sign." : "Only for real unit windows with φ=0 does r equal overlap length."}`],
        ["这是原始相关，不是相似度百分比；重复结构可能给多个峰。不同高度、负值或复数信号必须保留乘积与相位，不能只量几何交叠。", "This is raw correlation, not a similarity percentage. Repeated structures may give multiple peaks. Amplitudes, signs and complex phases must be retained; geometry alone is insufficient."]);
    }
    if (model === "auto") {
      const v = autoValue(s, s.lag), length = Math.max(0, s.a - Math.abs(s.lag));
      return block(
        ["上图横轴ξ：蓝实线是f(ξ)的实部，橙虚线是f(ξ−x)的实部；x是固定试探位移，A是幅度，a是窗全宽，ω是相位随位置的斜率（rad/坐标单位）。复数模型$f(\\xi)=A e^{i\\omega\\xi}$在|ξ|≤$\\frac a2$内，外面0；图未画的虚部仍参与计算。下图横轴x，蓝实线Re r、橙虚线Im r、紫点线|r|；横虚线是能量上界E，竖虚线定位当前x。", "Top horizontal ξ: blue solid is Re f(ξ), orange dashed is Re f(ξ−x). x is the fixed lag, A amplitude, a full window width, and ω phase slope in rad per coordinate unit. For the complex model $f(\\xi)=A e^{i\\omega\\xi}$ within |ξ|≤$\\frac a2$, zero outside; unseen imaginary parts still enter calculations. Bottom: blue solid Re r, orange dashed Im r, purple dotted |r|. Horizontal dashes mark energy E, vertical dashes current x."],
        s.signed ? String.raw`f=1\text{ on }[-1,0),\quad f=-1\text{ on }[0,1];\quad r(x)=\int f(\xi)f(\xi-x)d\xi,\quad E=1^2\times1+(-1)^2\times1=2` : String.raw`r(x)=\int f(\xi)f^*(\xi-x)d\xi=A^2\max(0,a-|x|)e^{i\omega x},\quad E=\int|f|^2d\xi=A^2a`,
        [s.signed ? `本步用正负阶梯替换复矩窗，逐对求两区间交集；每项=原段值×移位段值×交叠长度，再把四项相加。x=${s.lag}时得到r=${fmt(v.re)}、|r|=${fmt(v.abs)}；例如x=1只有异号段交叠，r=−1而非+1。` : `本次交叠长max(0,${s.a}−|${s.lag}|)=${fmt(length)}，乘A²=${fmt(s.amp ** 2)}，再乘$\\cos(\\omega x)+i\\sin(\\omega x)$，得r=${fmt(v.re)}${v.im < 0 ? "−" : "+"}${fmt(Math.abs(v.im))}i。能量E=${s.amp}²×${s.a}=${fmt(v.energy)}；比较的是|r|=${fmt(v.abs)}≤E，不是要求r本身总为正。`, s.signed ? `This step replaces the complex window by a signed two-step signal. Intersect each original/shifted interval pair and sum its value product × overlap length over four pairs. At x=${s.lag}, r=${fmt(v.re)}, |r|=${fmt(v.abs)}. For example, x=1 overlaps only opposite signs, giving r=−1, not +1.` : `Overlap max(0,${s.a}−|${s.lag}|)=${fmt(length)}, multiplied by A²=${fmt(s.amp ** 2)} and $\\cos(\\omega x)+i\\sin(\\omega x)$, gives r=${fmt(v.re)}${v.im < 0 ? "−" : "+"}${fmt(Math.abs(v.im))}i. E=${s.amp}²×${s.a}=${fmt(v.energy)}. Compare |r|=${fmt(v.abs)}≤E; r need not always be positive.`]);
    }
    if (model === "power") {
      const v = powerValue(s, s.lag), k = 2 * Math.PI / s.period, q = k * (s.ratio || 1), theta = q * s.lag - (s.phase || 0);
      const paragraph = (zh, en) => `<p>${prose(P(zh, en))}</p>`;
      return `<section class="il-explanation"><h3>${t("图中对象与坐标", "Objects and coordinates")}</h3>`
        + paragraph("上图横轴是输入位置 $\\xi$。蓝实线是第一条余弦，橙虚线是移动后的第二条余弦。$A$ 是幅度，$T$ 是第一条信号的周期；$k$、$q$ 分别控制两条余弦随位置的变化快慢。$\\phi$ 是初相位，以弧度计。", "The upper horizontal coordinate is input position $\\xi$. Blue is the first cosine; orange dashes show the shifted second cosine. $A$ is amplitude and $T$ the first period; $k,q$ set their spatial rates. $\\phi$ is initial phase in radians.")
        + equation(String.raw`\begin{aligned}f(\xi)&=A\cos(k\xi),& k&=\frac{2\pi}{T},\\g(\xi-x)&=A\cos\bigl(q(\xi-x)+\phi\bigr).\end{aligned}`)
        + paragraph("小写 $x$ 是试探位移；大写 $X$ 是积分窗口半宽，不能混淆。下图横轴是位移，蓝实线是有限窗平均，橙虚线是无限窗极限，竖虚线标出当前位移。", "Lowercase $x$ is trial lag; uppercase $X$ is integration half-width. The lower chart uses lag horizontally: blue is the finite-window mean, orange dashes the infinite-window limit, and vertical dashes the current lag.")
        + `<h3>${t("先求总量，再求平均", "Total first, then mean")}</h3>`
        + paragraph("$J_X$ 表示窗内乘积的积分总量，$M_X$ 表示总量除以窗口全长后的平均。$R$ 是窗口不断增大时的极限。沿输入位置累加，不是对下图的曲线积分；两条信号都是实数，共轭不改变它们。", "$J_X$ names the integral total of the product; $M_X$ divides that total by full window length. $R$ is the limit as the window grows. Accumulate over input positions, not under the lower curves. Both signals are real, so conjugation leaves them unchanged.")
        + equation(String.raw`\begin{aligned}J_X(x)&=\int_{-X}^{X}f(\xi)g(\xi-x)\,d\xi,\\M_X(x)&=\frac{J_X(x)}{2X},\\R(x)&=\lim_{X\to\infty}M_X(x).\end{aligned}`)
        + paragraph("代入当前窗口和信号，得到：", "Substituting the current window and signals gives:")
        + equation(String.raw`\begin{aligned}J_X(x)&\approx${fmt(v.total)},\\2X&=${fmt(2 * s.window)},\\M_X(x)&\approx\frac{${fmt(v.total)}}{${fmt(2 * s.window)}}\approx${fmt(v.finite)}.\end{aligned}`)
        + `<h3>${t("有限窗公式从哪里来", "Where the finite-window formula comes from")}</h3>`
        + paragraph("先用积化和差把两个余弦的乘积改成两个余弦之和；$a$、$b$ 在这条恒等式中表示两个角度。", "Use the product-to-sum identity; $a,b$ here denote two angles.")
        + equation(String.raw`\cos a\cos b=\frac{\cos(a-b)+\cos(a+b)}{2}`)
        + paragraph("把两个角度代入，再在对称窗口积分。为简写结果，定义辅助函数 $S$；它在零处取极限值一。注意这里的自变量没有额外乘 $\\pi$，不同于1.1中的归一化 sinc。", "Substitute the two angles and integrate over the symmetric window. Define auxiliary function $S$ to abbreviate the result; its value at zero is its limit, one. No extra $\\pi$ multiplies its argument, unlike normalized sinc in 1.1.")
        + equation(String.raw`S(z)=\begin{cases}\dfrac{\sin z}{z},&z\ne0,\\1,&z=0.\end{cases}`)
        + equation(String.raw`\begin{aligned}M_X(x)={}&\frac{A^2}{2}\cos(qx-\phi)\\&\cdot\bigl[S((k-q)X)+S((k+q)X)\bigr].\end{aligned}`)
        + equation(String.raw`k\approx${fmt(k)},\quad q\approx${fmt(q)},\quad qx-\phi\approx${fmt(theta)}`)
        + `<h3>${t("极限参考值怎样得到", "How the limit reference is obtained")}</h3>`
        + paragraph("同频时，第一项始终取零处的值，第二项随窗口增大趋于零。不同的正频率使两项都趋于零。因此：", "For equal frequencies the first term stays at its value at zero, while the second tends to zero. For distinct positive frequencies both terms tend to zero. Thus:")
        + equation(String.raw`R(x)=\begin{cases}\dfrac{A^2}{2}\cos(kx-\phi),&k=q>0,\\0,&k,q>0,\ k\ne q.\end{cases}`)
        + equation(String.raw`R(${s.lag})\approx${fmt(v.limit)}`)
        + paragraph("这个参考值由极限推导得到，不是把当前有限窗口的读数取整；显示数值经过四位小数舍入，内部计算保留原精度。", "This reference follows from the limit, not rounding the finite-window result. Displayed numbers are rounded to four decimal places; internal calculations retain their precision.") + `</section>`;
    }
    return "";
  }
  function scene(model, s) {
    const result = drawScene(model, s);
    result.explanation ||= explanation(model, s);
    return result;
  }
  function drawScene(model, s) {
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
      const [left, right] = deltaBounds(s);
      const pulse = x => s.weight * (s.family === "gauss" ? gauss(s.n * (x - s.x0)) : x >= left && x <= right ? 1 : 0);
      const pulseCurve = { fn: pulse, points: s.family === "gauss" ? undefined : [[-3, 0], [left, 0], [left, s.weight], [right, s.weight], [right, 0], [3, 0]] };
      const testCurve = { fn: f, points: s.discontinuous ? [[-3, 0], [0, 0], [0, 1], [3, 1]] : undefined };
      return { graphic: legend("蓝：被取样函数；橙：有限宽脉冲，真实高度除以N显示（不是δ）；虚竖线：极限取样位置x₀。点击“查看说明”了解记号和计算。", "Blue: sampled function; orange: finite-width pulse with true height divided by N for display (not delta); vertical dashed line: limiting sample site x₀. Use View explanation for notation and calculations.") + graph([testCurve, pulseCurve], { xmin: -3, xmax: 3, ymin: -1.2, ymax: 3.2, marker: s.x0, axis: "ξ" }), readout: `${t(s.family === "gauss" ? "高斯特征尺度" : "矩形宽", s.family === "gauss" ? "Gaussian scale" : "Rectangle width")} 1/N=${fmt(1 / s.n)} · ${t("脉冲自身积分", "Pulse integral")} c=${s.weight} · ${t("真实峰高", "true peak")}=${fmt(s.weight * s.n)} · ${t("有限脉冲加权积分", "Finite-pulse weighted integral")} ${context.math(String.raw`I_N\approx${fmt(deltaValue(s))}`)} · ${s.discontinuous ? t("跳变点：不设通用目标值；查看说明中的三族对照", "Jump: no universal target; compare three families in the guide") : `${t("取样极限参考值", "Ideal sampling reference")}=${fmt(s.weight * f(s.x0))}`}`, explanation: deltaExplanation(s) };
    }
    if (model === "deltaPlane") {
      return { graphic: `<svg class="il-graph" viewBox="0 0 550 300" role="img" aria-label="${t("虚线原轮廓，实线横纵分别压缩的轮廓", "Dashed original contour and solid horizontally/vertically compressed contour")}"><path d="M60 150H490M275 25V275" stroke="#a59b8f"/><ellipse cx="275" cy="150" rx="130" ry="110" fill="none" stroke="#a59b8f" stroke-dasharray="6 4"/><ellipse cx="275" cy="150" rx="${130 / s.ax}" ry="${110 / s.by}" fill="#bed7d9" stroke="#245b66" stroke-width="3"/><text x="285" y="32">y</text><text x="492" y="165">x</text><text x="25" y="290">α=${s.ax}, β=${s.by}</text></svg>`, readout: `${t("相对积分权重：", "Relative integral weight: ")}${context.math(String.raw`\frac{1}{|\alpha\beta|}\approx${fmt(1 / Math.abs(s.ax * s.by))}`)}` };
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
    jumpFamily: ["family", P("近似族（改变左右分布，不只是改N）", "Family (change left/right allocation, not only N)"), [["left", P("左侧：只覆盖负半轴", "Left: negative side only")], ["rect", P("对称：左右各一半", "Symmetric: half on each side")], ["right", P("右侧：只覆盖正半轴", "Right: positive side only")]]],
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
  function questionContext(index) {
    const stage = data[activeId][index], s = values(activeId, index);
    if (!stage.controls.length) return "";
    const changed = stage.controls.some(name => {
      const field = controls[name][0];
      return s[field] !== stage.initial[field];
    });
    const current = stage.controls.map(name => {
      const [field, label, options] = controls[name];
      const option = Array.isArray(options) ? options.find(([v]) => String(v) === String(s[field]))?.[1] : null;
      const value = option ? text(option) : typeof s[field] === "boolean" ? text(s[field] ? P("开", "on") : P("关", "off")) : s[field];
      return `${text(label)}=${value}`;
    }).join(" · ");
    return `<div class="il-question-context"><strong>${t(changed ? "当前显示的是对照条件；题目仍按上方指定的情境或比较范围作答。" : "作答范围：按上方题述的数值或比较关系。", changed ? "Chart conditions changed for comparison; answer for the stated case or comparison range." : "Answer for the values or comparison stated in the task.")}</strong><p>${h(current)}</p><p>${t("题目若给出固定数值，判分针对那组数值；若问比较关系，就综合题述的几种条件。下方图读数始终对应当前控件，改变控件不会偷偷改写题设。", "For a numerical question, grading uses its stated values. For a comparison, consider all stated conditions. Chart readings always follow the current controls; controls do not silently rewrite the question.")}</p></div>`;
  }
  function pulseParameters(model, s, adjustable = false) {
    if (model !== "delta" && !(model === "impulses" && s.variant === "finite")) return "";
    const gaussian = model === "delta" && s.family === "gauss";
    const label = adjustable ? P("当前图（下方可调）", "Current chart (adjustable below)") : P("本图固定", "Fixed for this chart");
    return `<p class="il-pulse-parameters" data-pulse-n="${s.n}"><strong>${h(text(label))}：${context.math(`N=${s.n}`)}</strong> · ${t(gaussian ? "高斯特征尺度" : "矩形全宽", gaussian ? "Gaussian scale" : "Rectangle full width")} ${context.math(String.raw`\frac1N\approx${fmt(1 / s.n)}`)}。${prose(P("$N$ 是收缩参数，越大脉冲越窄。", "$N$ controls concentration: larger means narrower."))}</p>`;
  }
  function liveMarkup(index, notes = false) {
    const stage = data[activeId][index], s = values(activeId, index, notes);
    const hidden = !notes && index === data[activeId].length - 1 && record(activeId).answers[index] === undefined;
    const result = hidden ? null : scene(stage.model, s);
    return `<div class="il-bench" data-il-bench="${index}" data-il-notes="${notes}" tabindex="-1">${pulseParameters(stage.model, s, stage.controls.includes("n"))}<div class="il-scene">${hidden ? `<div class="il-hidden" role="status">${t("先用题目给定条件独立判断；提交后再显示计算图和读数。", "Use the given conditions to predict independently. Submit to reveal the calculated chart and readings.")}</div>` : result.graphic}</div><div class="il-readout" role="status"${!hidden && stage.model === "delta" ? ` data-weighted-integral="${deltaValue(s)}"` : ""}>${hidden ? t("新情境：计算结果未显示", "New case: calculated results hidden") : result.readout}</div>${controlMarkup(stage, s)}<div class="il-chart-actions">${stage.controls.length ? `<button type="button" class="il-reset" data-il-reset="${index}">${t("恢复本步题述条件", "Restore this step's stated conditions")}</button>` : ""}${hidden ? "" : explanationButton()}</div><div class="il-explanation-slot" hidden>${hidden ? "" : result.explanation || ""}</div><p class="il-boundary">${t("无量纲数学模型，非实测。判断按题述条件，控件用于另做对照。", "Dimensionless mathematical model, not measurements. Answer for the stated case; use controls for additional comparisons.")}</p>${notes ? "" : `<button type="button" class="il-mobile-jump" data-il-focus="decision">${t("查看判断与反馈 ↓", "Go to prediction and feedback ↓")}</button>`}</div>`;
  }
  function explanationButton() {
    return `<button type="button" class="il-reset" data-explanation-toggle aria-expanded="false" aria-controls="chart-explanation-card">${t("查看说明", "View explanation")}</button>`;
  }
  function equation(tex) {
    return tex ? `<div class="il-math" role="group" tabindex="0" aria-label="${t("关系式；可左右滚动", "Relation; horizontally scrollable")}">${context.math(tex, true)}</div>` : "";
  }
  function renderExplore() {
    const list = data[activeId], r = record(activeId), index = Math.min(r.stage || 0, list.length - 1), stage = list[index];
    const selected = r.answers[index], answered = selected !== undefined;
    const evidence = stage.evidence ? `<div class="il-evidence">${prose(stage.evidence.text)}${equation(stage.evidence.tex)}</div>` : "";
    // The final insight and relation are withheld along with the result, including accessible text.
    host.innerHTML = `<div class="il-shell"><p class="il-intro">${t("每步有不同的观察与比较；可自由跳步、回看。操作不会写入正式练习。", "Each step has its own observation and comparison. Skip or revisit freely; exploration never writes formal answers.")}</p><nav class="il-route" aria-label="${t("实验步骤", "Experiment steps")}">${list.map((s, i) => `<button type="button" data-il-stage="${i}" ${index === i ? 'aria-current="step"' : ""}>${i + 1} · ${h(text(s.title))}</button>`).join("")}</nav><section class="il-stage" tabindex="-1"><header><small>${activeId} / ${index + 1}—${list.length}</small><h2>${h(text(stage.title))}</h2><p class="il-task">${prose(stage.task)}</p></header><div class="il-grid">${liveMarkup(index)}<div class="il-decision" tabindex="-1"><button type="button" class="il-mobile-jump" data-il-focus="bench">${t("回看图和条件 ↑", "Revisit chart and conditions ↑")}</button><h3>${t("先预测，再操作比较", "Predict, then operate and compare")}</h3>${questionContext(index)}${evidence}<div class="il-choices">${stage.choices.map((choice, i) => `<button type="button" data-il-answer="${i}" aria-pressed="${selected === i}">${h(text(choice))}</button>`).join("")}</div><p class="il-feedback" role="status" aria-live="polite">${answered ? `<strong>${selected === stage.answer ? t("判断正确。", "Correct. ") : t("再比较一下。", "Compare again. ")}</strong>${h(text(stage.feedback[selected]))}` : t("选一个判断；不同误解会得到不同解释，可随时重试。", "Choose a claim for misconception-specific feedback; retry at any time.")}</p>${index === list.length - 1 && !answered ? "" : `<div class="il-insight"><h3>${t("看懂这一步", "Make sense of this step")}</h3><p>${prose(stage.insight)}</p>${equation(stage.tex)}</div>`}</div></div><p class="il-next-reason">${h(text(stage.next))}</p><div class="il-step-actions"><button type="button" data-il-stage="${Math.max(0, index - 1)}" ${index === 0 ? "disabled" : ""}>${t("← 上一步", "← Previous")}</button>${index < list.length - 1 ? `<button type="button" data-il-stage="${index + 1}">${t("下一步 →", "Next →")}</button>` : `<button type="button" data-view="recap">${t("图解回顾 →", "Visual recap →")}</button>`}</div></section><p class="il-progress">${t("本节已作答", "Answered in this section")} ${Object.keys(r.answers).length}/${list.length} · ${t("不代表掌握率", "not a mastery score")}</p></div>`;
  }
  const noteStages = {
    "1.1": [0, 1, 2, 3, 4, 5],
    "1.2.1": [2, 0, 4, 4],
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
    const reading = record(activeId).noteReturn;
    const benchIndex = reading === undefined ? record(activeId).noteStage ?? noteStages[activeId][order[0]] : noteStages[activeId][reading];
    record(activeId).noteStage = benchIndex;
    const title = i => text(noteTitles[activeId]?.[i] || lesson.notes[i].title);
    const supplement = content.supplements[activeId];
    const proof = lines => lines.map(line => `<div class="il-proof-line">${line.title ? `<h3>${h(text(line.title))}</h3>` : ""}<p>${prose(line.lead)}</p>${equation(line.tex)}<p>${prose(line.read)}</p></div>`).join("");
    host.innerHTML = `<div class="il-shell il-notes"><header class="il-notes-intro"><h2>${h(text(g.question))}</h2><p>${h(text(content.setups[activeId]))}</p><p>${t("先修：函数、坐标、四则运算；复数和积分的当前用法在下面就地说明。探索只保留操作所需的关系；这里连续给出定义、演算和条件。", "Prerequisites: functions, coordinates and arithmetic. Current uses of complex numbers and integration are explained below. Exploration keeps operational relations; these notes give definitions, calculations and conditions continuously.")}</p><ul>${g.terms.map(v => `<li>${h(text(v))}</li>`).join("")}</ul><nav class="il-reading-route" aria-label="${t("讲义路线", "Notes route")}">${order.map((i, n) => `<button type="button" data-reading="${i}">${n + 1} · ${h(title(i))}</button>`).join("")}</nav></header><div class="il-notes-layout"><div class="il-reading">${order.map((i, n) => {
      const item = lesson.notes[i], step = g.steps[i];
      const prelude = content.preludes[`${activeId}:${i}`];
      return `<article id="reading-${i}" class="il-note" tabindex="-1"><small>${n + 1} / ${order.length}</small><h2>${h(title(i))}</h2>${prelude ? `<p>${prose(prelude.text)}</p>${equation(prelude.tex)}` : ""}<p>${h(text(content.before[`${activeId}:${i}`] || item.before))}</p><p>${h(text(step.build))}</p><button type="button" data-il-note="${i}">${step.chartLabel ? h(text(step.chartLabel)) : t("对照本段的可操作图 ↗", "Compare with this section's interactive chart ↗")}</button>${proof(step.proof)}${equation(item.tex)}<p class="il-insight">${h(text(item.after))}</p>${proof(content.extraProof[`${activeId}:${i}`] || [])}<p><strong>${t("具体算例：", "Worked case: ")}</strong>${prose(step.example)}</p><p class="il-next-reason">${h(text(content.next[`${activeId}:${i}`] || step.next))}</p></article>`;
    }).join("")}${supplement ? `<section class="il-supplement"><h2>${t("把实验结果放回一般条件", "Connect the experiment to general conditions")}</h2><p>${prose(supplement.text)}</p>${equation(supplement.tex)}</section>` : ""}<button type="button" data-view="quiz">${t("进入正式练习 →", "Go to formal practice →")}</button><details class="il-sources"><summary>${t("来源、教材记号与页码（选读）", "Sources, textbook notation and pages (optional)")}</summary><p>${t("吕乃光《傅里叶光学》第3版；下列页码可用页面顶部来源按钮打开。本课图示与数字例子为教学重组。", "Lü Naiguang, Fourier Optics, 3rd edition. Use the source button above to open the pages. Diagrams and numerical examples are teaching adaptations.")}</p><ul>${lesson.notes.map(item => `<li>${h(context.language === "zh" ? item.source || `${lesson.pages} / PDF ${lesson.pdf}` : `${(item.source || "").match(/\([0-9,-]+\)/g)?.join(", ") || "Course derivation"} · pp. ${lesson.pages} / PDF ${lesson.pdf}`)}</li>`).join("")}</ul></details></div><aside class="il-notes-bench" aria-label="${t("讲义交互图", "Interactive notes chart")}"><p class="il-chart-title">${h(text(g.steps[reading]?.chartCaption || data[activeId][benchIndex].title))}</p>${liveMarkup(benchIndex, true)}${record(activeId).noteReturn === undefined ? "" : `<button type="button" data-il-return="${record(activeId).noteReturn}">${t("回到刚才的讲解 ↓", "Return to the explanation ↓")}</button>`}</aside></div></div>`;
  }
  function renderRecap() {
    host.innerHTML = `<div class="il-shell il-recap"><h2>${t("沿着同一条线索回顾", "Recap along one connected example")}</h2><p>${t("四幅图串起输入、操作、结果与边界；它不是重复的讲义，也不写入作答。", "Four diagrams connect inputs, operations, results and limits, without repeating the notes or recording answers.")}</p><div class="il-recap-grid">${recaps[activeId].map(([zh, en, model, state], i) => {
      const result = scene(model, state);
      return `<figure><figcaption><b>0${i + 1}</b> ${t(zh, en)}</figcaption>${pulseParameters(model, state)}${result.graphic}<p class="il-readout">${result.readout}</p>${explanationButton()}<div class="il-explanation-slot" hidden>${result.explanation || ""}</div></figure>`;
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
      const template = document.createElement("template");
      template.innerHTML = liveMarkup(index, notes);
      bench.innerHTML = template.content.firstElementChild.innerHTML;
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
    const stage = data[activeId][index], result = scene(stage.model, state);
    const parameters = bench.querySelector(".il-pulse-parameters");
    if (parameters) parameters.outerHTML = pulseParameters(stage.model, state, stage.controls.includes("n"));
    bench.querySelector(".il-scene").innerHTML = result.graphic;
    bench.querySelector(".il-readout").innerHTML = result.readout;
    if (data[activeId][index].model === "delta") bench.querySelector(".il-readout").dataset.weightedIntegral = deltaValue(state);
    bench.querySelector(".il-explanation-slot").innerHTML = result.explanation || "";
    const output = bench.querySelector(`[data-il-output="${field}"]`);
    if (output) output.textContent = fmt(state[field]);
    if (activeMode === "explore") {
      const status = host.querySelector(".il-question-context");
      if (status) status.outerHTML = questionContext(index);
    }
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

/* Shared interactive plot and readout, after per-section data registration. */
(() => {
  const xSvg = x => 340 + x * 73;
  const ySvg = y => 150 - y * 88;
  const clip = v => Math.max(-3.9, Math.min(3.9, v));
  const line = (fn, min = -3.9, max = 3.9, n = 320) => Array.from({ length: n + 1 }, (_, i) => {
    const x = min + (max - min) * i / n;
    return `${xSvg(x).toFixed(1)},${ySvg(fn(x)).toFixed(1)}`;
  }).join(" ");
  const rect = (center, width, top = 1, color = "#b74739") => `<rect x="${xSvg(clip(center - width / 2))}" y="${ySvg(top)}" width="${Math.max(0, xSvg(clip(center + width / 2)) - xSvg(clip(center - width / 2)))}" height="${ySvg(0) - ySvg(top)}" fill="${color}" fill-opacity=".28" stroke="${color}" stroke-width="2"/>`;
  const gauss = (x, center, width) => Math.exp(-Math.PI * ((x - center) / width) ** 2);
  const norm = (id, state, x) => {
    if (id === "1.3.1" || id === "1.3.2") {
      if (state.family === "gauss" && id === "1.3.1") return state.a / Math.sqrt(state.a ** 2 + 1) * Math.exp(-Math.PI * x ** 2 / (state.a ** 2 + 1));
      return Math.max(0, Math.min(.5, x + state.a / 2) - Math.max(-.5, x - state.a / 2));
    }
    if (id === "1.3.3") return gauss(x, state.x0, .65);
    if (id === "1.4.1") return Math.max(0, Math.min(.5, x + state.x0 + state.a / 2) - Math.max(-.5, x + state.x0 - state.a / 2));
    if (id === "1.4.2") return state.family === "gauss" ? state.a / Math.sqrt(2) * Math.exp(-Math.PI * x ** 2 / (2 * state.a ** 2)) : Math.max(0, state.a - Math.abs(x));
    return .5 * Math.cos(2 * Math.PI * x / state.a);
  };
  const axes = `<line x1="50" y1="150" x2="630" y2="150" stroke="#8d8e87" stroke-width="2"/><line x1="340" y1="35" x2="340" y2="320" stroke="#8d8e87" stroke-width="2"/><text x="618" y="165">x</text><text x="348" y="167">0</text>`;
  const labels = {
    "1.3.1": ["上：f(τ) 与折转平移后的 h(x−τ) · 下：卷积输出", "Top: f(τ) and flipped-shifted h(x−τ) · bottom: convolution"],
    "1.3.2": ["蓝：第一窗 · 红：第二窗 · 橙：卷积输出", "Blue: first window · red: second window · orange: convolution"],
    "1.3.3": ["理想点位置 · 整条移位响应 h(x−x₀)", "Ideal point position · translated response h(x−x₀)"],
    "1.4.1": ["上：f(ξ) 与 g*(ξ−x) · 下：相关输出", "Top: f(ξ) and g*(ξ−x) · bottom: correlation"],
    "1.4.2": ["同一函数左右错位 · 下：自相关输出", "The same function shifted · bottom: autocorrelation"],
    "1.4.3": ["周期余弦 · 平均相关 ½cos(2πx/a)", "Periodic cosine · mean correlation ½cos(2πx/a)"]
  };
  window.FourierNewPlot = (id, state, language, hidden) => {
    const zh = language === "zh", isConv = id === "1.3.1" || id === "1.3.2", isCorr = id === "1.4.1" || id === "1.4.2";
    const signal = id === "1.4.3" ? `<polyline points="${line(x => .28 + .5 * Math.cos(2 * Math.PI * x / state.a))}" fill="none" stroke="#58a8de" stroke-width="3"/>` : id === "1.3.3" ? `<line x1="${xSvg(state.x0)}" y1="150" x2="${xSvg(state.x0)}" y2="63" stroke="#58a8de" stroke-width="3"/><path d="M${xSvg(state.x0) - 8} 79 L${xSvg(state.x0)} 63 L${xSvg(state.x0) + 8} 79" fill="none" stroke="#315aa2" stroke-width="3"/>` : state.family === "gauss" && (id === "1.3.1" || id === "1.4.2") ? `<polyline points="${line(x => gauss(x, 0, 1))}" fill="none" stroke="#58a8de" stroke-width="3"/><polyline points="${line(x => gauss(x, state.x0, state.a))}" fill="none" stroke="#b74739" stroke-width="3"/>` : `${rect(0, id === "1.4.2" ? state.a : 1, 1, "#58a8de")}${rect(id === "1.4.1" ? state.x0 + state.lag : isConv ? state.x0 : -state.x0, state.a, 1, "#b74739")}`;
    const output = hidden ? "" : `<polyline points="${line(x => norm(id, state, x) * .62 - 1.65)}" fill="none" stroke="#e4a65f" stroke-width="4"/><line x1="${xSvg(id === "1.4.1" ? state.lag : state.x0)}" y1="${ySvg(-1.62)}" x2="${xSvg(id === "1.4.1" ? state.lag : state.x0)}" y2="${ySvg(-.72)}" stroke="#e4a65f" stroke-width="2" stroke-dasharray="5 5"/>`;
    return `<svg class="fourier-new" viewBox="0 0 680 350" role="img" aria-label="${labels[id][zh ? 0 : 1]}${hidden ? zh ? '；新情境读数已隐藏' : '; new-case output hidden' : ''}"><rect width="680" height="350" fill="#152737"/><g font-family="sans-serif" font-size="15"><text x="38" y="28">${labels[id][zh ? 0 : 1]}</text><text x="48" y="316">${id === "1.3.3" ? zh ? "点位置" : "point site" : isConv ? zh ? "输出位移" : "output shift" : isCorr ? zh ? "相关位移" : "correlation lag" : zh ? "周期位移" : "periodic lag"}</text></g>${axes}${signal}${output}${hidden ? `<rect x="45" y="284" width="590" height="64" fill="#152737"/><text x="55" y="320" font-size="15">${zh ? "先作答，再显示新情境输出" : "Predict before revealing the output"}</text>` : ""}</svg>`;
  };
  window.FourierNewReadout = (id, state, language) => {
    const zh = language === "zh";
    if (id === "1.3.3") return `${zh ? "理想点" : "Ideal point"} x₀=${state.x0.toFixed(2)}; h(x−x₀) ${zh ? "整条响应被平移；图中曲线非 δ 本身" : "is translated; the drawn curve is not delta itself"}.`;
    if (id === "1.4.3") {
      const k = 2 * Math.PI / state.a, X = state.window;
      const osc = Math.abs(Math.sin(2 * k * X) / (2 * k * X)) < 1e-10 ? 0 : Math.sin(2 * k * X) / (2 * k * X);
      const finite = .5 * Math.cos(k * state.x0) + .5 * osc * Math.cos(k * state.x0);
      return `${zh ? "周期" : "Period"} a=${state.a.toFixed(2)}; X=${X.toFixed(2)}; ${zh ? "有限窗均值" : "finite-window mean"} ≈${finite.toFixed(3)}; ${zh ? "极限" : "limit"}=${norm(id, state, state.x0).toFixed(3)}.`;
    }
    const lag = id === "1.4.1" ? state.lag : state.x0;
    const value = norm(id, state, lag);
    return `${zh ? "位移" : "Lag"} x=${lag.toFixed(2)}; ${zh ? "乘积积分/输出" : "overlap integral/output"}=${value.toFixed(3)}; ${zh ? "输入仅为一维模型" : "one-dimensional model only"}.`;
  };
})();

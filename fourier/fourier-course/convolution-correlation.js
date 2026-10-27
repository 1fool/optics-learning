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
  const axes = `<line x1="50" y1="150" x2="630" y2="150" stroke="#8d8e87" stroke-width="2"/><line x1="340" y1="35" x2="340" y2="320" stroke="#8d8e87" stroke-width="2"/><text x="618" y="165">x</text><text x="348" y="167">0</text>`;
  window.FourierNewPlot = (id, state, language, hidden) => {
    const zh = language === "zh", plot = window.FourierSectionRuntime[id].legacyPlot;
    const signal = plot.signal(state, { line, gauss, rect, xSvg });
    const output = hidden ? "" : `<polyline points="${line(x => plot.norm(state, x) * .62 - 1.65)}" fill="none" stroke="#e4a65f" stroke-width="4"/><line x1="${xSvg(plot.marker(state))}" y1="${ySvg(-1.62)}" x2="${xSvg(plot.marker(state))}" y2="${ySvg(-.72)}" stroke="#e4a65f" stroke-width="2" stroke-dasharray="5 5"/>`;
    return `<svg class="fourier-new" viewBox="0 0 680 350" role="img" aria-label="${plot.label[zh ? 0 : 1]}${hidden ? zh ? '；新情境读数已隐藏' : '; new-case output hidden' : ''}"><rect width="680" height="350" fill="#152737"/><g font-family="sans-serif" font-size="15"><text x="38" y="28">${plot.label[zh ? 0 : 1]}</text><text x="48" y="316">${plot.axisLabel[zh ? 0 : 1]}</text></g>${axes}${signal}${output}${hidden ? `<rect x="45" y="284" width="590" height="64" fill="#152737"/><text x="55" y="320" font-size="15">${zh ? "先作答，再显示新情境输出" : "Predict before revealing the output"}</text>` : ""}</svg>`;
  };
  window.FourierNewReadout = (id, state, language) => {
    const zh = language === "zh", plot = window.FourierSectionRuntime[id].legacyPlot;
    if (plot.readout) return plot.readout(state, language);
    const lag = plot.marker(state);
    const value = plot.norm(state, lag);
    return `${zh ? "位移" : "Lag"} x=${lag.toFixed(2)}; ${zh ? "乘积积分/输出" : "overlap integral/output"}=${value.toFixed(3)}; ${zh ? "输入仅为一维模型" : "one-dimensional model only"}.`;
  };
})();

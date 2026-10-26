/* Original compact Canvas figures; no textbook images are shipped in the course. */
(() => {
  const pair = (zh, en) => ({ zh, en });
  const slider = (key, zh, en, min, max, step, value, unit = "") => ({ key, label: zh, labelEn: en, min, max, step, value, unit });
  const figures = {};
  function setup(a) {
    const { ctx, w, h, language } = a;
    const tr = (zh, en) => language === "en" ? en : zh;
    const ink = "#e7f1fa", muted = "#aec4d7", red = "#ffad8d", blue = "#87cbff", green = "#a8e0b8";
    const text = (s, x, y, color = ink, size = 13, align = "left") => {
      ctx.font = `${size}px "Microsoft YaHei UI", sans-serif`; ctx.fillStyle = color; ctx.textAlign = align; ctx.fillText(s, x, y); ctx.textAlign = "left";
    };
    const line = (x, y, xx, yy, color = "#48657f", width = 1) => {
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(xx, yy); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
    };
    const circle = (x, y, r, color, width = 1) => {
      ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), 0, 2 * Math.PI); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
    };
    const path = (points, color, width = 2) => {
      ctx.beginPath(); points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
    };
    const arrow = (x, y, xx, yy, color = green) => {
      line(x, y, xx, yy, color, 2); const angle = Math.atan2(yy - y, xx - x);
      line(xx, yy, xx - 9 * Math.cos(angle - .5), yy - 9 * Math.sin(angle - .5), color, 2);
      line(xx, yy, xx - 9 * Math.cos(angle + .5), yy - 9 * Math.sin(angle + .5), color, 2);
    };
    const bar = (label, ratio, x, y, length, color) => {
      text(label, x, y, muted); ctx.fillStyle = "#355068"; ctx.fillRect(x, y + 9, length, 10);
      ctx.fillStyle = color; ctx.fillRect(x, y + 9, length * Math.max(0, Math.min(1, ratio)), 10);
      text(ratio.toFixed(3), x + length, y + 39, color, 14, "right");
    };
    return { ...a, tr, ink, muted, red, blue, green, text, line, circle, path, arrow, bar };
  }
  function rays(a, n1, n2, theta, x, y, R) {
    const { ctx, text, line, arrow, red, blue, green, muted } = a;
    const f = window.OpticsInterface.fresnel(n1, n2, theta), t = theta * Math.PI / 180;
    ctx.setLineDash([4, 5]); line(x, y - R - 10, x, y + R + 10, muted); ctx.setLineDash([]);
    line(x - R - 12, y, x + R + 12, y, muted, 1.5);
    arrow(x - R * Math.sin(t), y - R * Math.cos(t), x, y, red);
    arrow(x, y, x + R * Math.sin(t), y - R * Math.cos(t), blue);
    if (!f.tir) arrow(x, y, x + R * Math.sin(f.theta2), y + R * Math.cos(f.theta2), green);
    text(`n₁=${n1}`, x - R, y - R - 20, muted, 12); text(`n₂=${n2}`, x - R, y + R + 29, muted, 12);
    return f;
  }
  window.OpticsFigureTools = { pair, slider, setup, rays };
  // The per-section files register individual figures after this shared helper.
  window.OpticsExtraVisuals = figures;
})();

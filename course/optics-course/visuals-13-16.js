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
  figures.spherical = {
    title: pair("点源的同心波面与几何扩散", "Concentric wavefronts and geometric spreading"),
    note: pair("各向均匀标量点源，无吸收；r₀ 仅为非零参考距离。动画相位为缩放示意，不表示真实光频率。", "Isotropic scalar point source without absorption; r₀ is a nonzero reference distance. Animation phase is scaled, not an optical frequency."),
    settings: [slider("radiusRatio", "观察距离 r/r₀", "Observation distance r/r₀", 1, 4, .1, 2)],
    draw(a) {
      const { ctx, w, h, values, clock, tr, text, circle, line, bar, blue, red, green, muted } = setup(a);
      const cx = w * .32, cy = h * .49, R = Math.min(w * .27, h * .35), ratio = values.radiusRatio;
      for (let i = 0; i < 6; i++) {
        const r = R * ((i / 6 + clock * .16) % 1);
        circle(cx, cy, r, `rgba(135,203,255,${.75 * (1 - r / (R * 1.5))})`);
      }
      circle(cx, cy, 4, red, 4); circle(cx, cy, R * ratio / 4, green, 2);
      line(cx, cy, cx + R * ratio / 4, cy, green, 2);
      text("S", cx - 15, cy - 10, red); text("r", cx + R * ratio / 8, cy - 8, green);
      text(tr("同相位向外传播", "Phase travels outward"), cx, 30, blue, 13, "center");
      bar("A/A₀ = r₀/r", 1 / ratio, w * .65, h * .3, w * .3, red);
      bar("I/I₀ = (r₀/r)²", 1 / ratio ** 2, w * .65, h * .62, w * .3, blue);
      text("4πr² · I = P", cx, h - 35, muted, 17, "center");
    },
  };
  figures.sphericalPhase = {
    title: pair("接收平面的路差与相位", "Path difference and phase on a receiving plane"),
    note: pair("固定 z₀=1 m、λ=500 nm。右侧圆环表示选定离轴点相对轴上点的复相位；距离精确计算，图形不按真实比例。", "Fixed z₀=1 m and λ=500 nm. The right phasor shows the selected off-axis point relative to the on-axis point. Distances are exact; geometry is not to scale."),
    settings: [slider("offset", "离轴距离 ρ", "Off-axis distance ρ", 0, 2, .05, 1, "mm")],
    draw(a) {
      const { w, h, values, tr, text, line, circle, arrow, blue, red, green, muted } = setup(a);
      const rho = values.offset / 1000, r = Math.hypot(1, rho);
      // Rationalized difference avoids subtracting two almost equal numbers.
      const dr = rho * rho / (r + 1), phase = 2 * Math.PI * dr / 500e-9;
      const sx = w * .08, plane = w * .48, y = h * .52, py = y - values.offset * h * .1;
      line(plane, 65, plane, h - 85, blue, 3); line(sx, y, plane, y, muted); line(sx, y, plane, py, red, 2);
      circle(sx, y, 4, green, 3); circle(plane, py, 4, red, 3);
      text("S", sx, y + 25, green); text("z = 0", plane, 48, blue, 13, "center");
      text("z₀ = 1 m", (sx + plane) / 2, y + 25, muted, 12, "center");
      const cx = w * .77, cy = h * .42, R = Math.min(w * .15, h * .19);
      circle(cx, cy, R, muted); arrow(cx, cy, cx + R * Math.cos(phase), cy - R * Math.sin(phase), red);
      text(`Δr = ${(dr * 1e6).toFixed(3)} μm`, cx, h * .75, blue, 14, "center");
      text(`Δφ/2π = ${(phase / (2 * Math.PI)).toFixed(3)}`, cx, h * .84, red, 14, "center");
      text(tr("模几乎不变 ≠ 相位不变", "Nearly equal magnitude ≠ equal phase"), w / 2, h - 25, green, w < 450 ? 11 : 14, "center");
    },
  };
  figures.cylindrical = {
    title: pair("线源扩散：圆柱与球面的对照", "Line-source spreading: cylinder versus sphere"),
    note: pair("r/r₀ 为无量纲距离。线源理想无限长，柱面幅值采用 kr≫1 近似；不模拟源轴或有限狭缝端部。", "r/r₀ is dimensionless. The line is ideally infinite; cylindrical amplitude uses kr≫1. Neither the source axis nor finite-slit ends are modeled."),
    settings: [slider("radiusRatio", "距离 r/r₀", "Distance r/r₀", 1, 4, .1, 2)],
    draw(a) {
      const { ctx, w, h, values, clock, tr, text, line, bar, blue, red, green, muted } = setup(a);
      const cx = w * .28, cy = h * .45, ratio = values.radiusRatio;
      for (let i = 1; i < 5; i++) {
        const R = (i + (clock * .4) % 1) * Math.min(w * .047, h * .04);
        ctx.beginPath(); ctx.ellipse(cx, cy - 55, R, R * .33, 0, 0, 2 * Math.PI); ctx.strokeStyle = blue; ctx.stroke();
        ctx.beginPath(); ctx.ellipse(cx, cy + 55, R, R * .33, 0, 0, 2 * Math.PI); ctx.stroke();
        line(cx - R, cy - 55, cx - R, cy + 55, blue); line(cx + R, cy - 55, cx + R, cy + 55, blue);
      }
      line(cx, cy - 100, cx, cy + 100, red, 4); text(tr("理想无限线源", "Ideal infinite line"), cx, h - 68, muted, 12, "center");
      bar(tr("柱面 A/A₀", "Cylinder A/A₀"), 1 / Math.sqrt(ratio), w * .56, h * .25, w * .38, blue);
      bar(tr("球面 A/A₀", "Sphere A/A₀"), 1 / ratio, w * .56, h * .57, w * .38, red);
      text(tr("柱面 I∝1/r · 球面 I∝1/r²", "Cylinder I∝1/r · sphere I∝1/r²"), w / 2, h - 25, green, w < 450 ? 11 : 14, "center");
    },
  };
  figures.sources = {
    title: pair("三类光源的光谱指纹", "Spectral fingerprints of three source classes"),
    note: pair("横轴为可见光波长示意。曲线分别显示连续背景、钠双线、窄带激光；峰宽人为放大，纵轴已归一化，不比较功率或真实线宽。", "Schematic visible wavelengths: continuum, sodium doublet, and narrow laser line. Widths are exaggerated and heights normalized; neither power nor actual linewidth is compared."),
    settings: [Object.assign(slider("sourceType", "切换光源", "Source class", 0, 2, 1, 0), { valueLabels: pair(["热光源", "钠放电灯", "窄带激光"], ["Thermal", "Sodium discharge", "Narrowband laser"]) })],
    draw(a) {
      const { w, h, values, tr, text, line, path, red, blue, green, muted } = setup(a);
      const left = 42, right = w - 25, baseline = h * .78, scale = h * .49, type = values.sourceType;
      const x = lambda => left + (lambda - 380) / 400 * (right - left);
      line(left, baseline, right, baseline); line(left, 60, left, baseline);
      for (const lambda of [400, 500, 600, 700]) { line(x(lambda), baseline, x(lambda), baseline + 6); text(String(lambda), x(lambda), baseline + 25, muted, 12, "center"); }
      const points = Array.from({ length: 700 }, (_, i) => {
        const lambda = 380 + 400 * i / 699;
        const f = type === 0 ? .22 + .7 * Math.exp(-(((lambda - 700) / 190) ** 2)) : type === 1 ? Math.exp(-(((lambda - 589) / .25) ** 2)) + .75 * Math.exp(-(((lambda - 589.6) / .25) ** 2)) : Math.exp(-(((lambda - 532) / 2) ** 2));
        return [x(lambda), baseline - scale * f];
      });
      path(points, [red, blue, green][type], 2.8);
      text([tr("宽连续谱（示意）", "Broad continuum (schematic)"), tr("589 / 589.6 nm（峰宽放大）", "589 / 589.6 nm (width exaggerated)"), tr("窄谱线 ≠ 数学单频", "Narrow line ≠ exact single frequency")][type], w / 2, 34, [red, blue, green][type], w < 450 ? 11 : 15, "center");
      text("λ / nm", right, h - 22, muted, 13, "right");
      if (type === 1) {
        // A separate magnified inset resolves the doublet; the main axis is not falsified.
        const x0 = w * .56, ww = w * .35, y0 = h * .15;
        line(x0, y0 + 90, x0 + ww, y0 + 90, muted);
        for (const [f, lab, height] of [[.28, "589", 65], [.72, "589.6", 49]]) {
          line(x0 + ww * f, y0 + 90, x0 + ww * f, y0 + 90 - height, blue, 3);
          text(lab, x0 + ww * f, y0 + 109, muted, 10, "center");
        }
      }
    },
  };
  figures.dipole = {
    title: pair("偶极辐射的 sin²ψ 方向图", "The dipole sin²ψ radiation pattern"),
    note: pair("显示辐射远场在偶极轴截面内的归一化强度，不是电力线。固定 r、ω、p₀ 和介质，轴上只消失辐射项。", "Normalized far-field intensity in a plane containing the dipole axis, not electric field lines. r, ω, p₀ and medium are fixed; only the radiation term vanishes on axis."),
    settings: [slider("psi", "观察方向 ψ", "Observation angle ψ", 0, 180, 5, 60, "°")],
    draw(a) {
      const { w, h, values, tr, text, line, path, arrow, bar, red, blue, green, muted } = setup(a);
      const cx = w * .33, cy = h * .52, R = Math.min(w * .26, h * .35), angle = values.psi * Math.PI / 180;
      line(cx, cy - R - 22, cx, cy + R + 22, muted, 1.5); arrow(cx, cy + 25, cx, cy - 25, red);
      text("p", cx + 10, cy - 26, red, 15);
      const points = Array.from({ length: 361 }, (_, i) => {
        const psi = 2 * Math.PI * i / 360, rr = R * Math.sin(psi) ** 2;
        return [cx + rr * Math.sin(psi), cy - rr * Math.cos(psi)];
      });
      path(points, blue, 3); arrow(cx, cy, cx + R * Math.sin(angle), cy - R * Math.cos(angle), green);
      bar("E₀ / Emax = sinψ", Math.sin(angle), w * .66, h * .29, w * .29, red);
      bar("I / Imax = sin²ψ", Math.sin(angle) ** 2, w * .66, h * .62, w * .29, blue);
      text(tr("轴上为零 · 侧向最强", "Axial null · side-on maximum"), w / 2, h - 24, muted, 12, "center");
    },
  };
  figures.energy = {
    title: pair("瞬时场与周期平均能流", "Instantaneous field and cycle-averaged energy flux"),
    note: pair("真空单色平面波，E₀ 为峰值。波形按显示频率缩放；图中 E/E₀ 与 S/Smax 分别归一化，不能比较它们的单位。", "Vacuum monochromatic plane wave with peak E₀. Display frequency is scaled. E/E₀ and S/Smax have separate normalizations; their units are not interchangeable."),
    settings: [slider("fieldPeak", "电场峰值 E₀", "Peak electric field E₀", 1, 20, .5, 10, "V/m")],
    draw(a) {
      const { ctx, w, h, values, clock, tr, text, line, path, red, blue, green, muted } = setup(a);
      const left = 48, right = w - 25, top = h * .31, bottom = h * .76, amp = h * .13;
      const E = values.fieldPeak, I = E * E / (2 * 376.730313);
      for (const y of [top, bottom]) line(left, y, right, y);
      const samples = Array.from({ length: 221 }, (_, i) => i / 220);
      path(samples.map(s => [left + s * (right - left), top - amp * Math.cos(s * 4 * Math.PI - clock * 2)]), red, 2.7);
      path(samples.map(s => [left + s * (right - left), bottom - amp * 1.5 * Math.cos(s * 4 * Math.PI - clock * 2) ** 2]), blue, 2.7);
      ctx.setLineDash([5, 5]); line(left, bottom - amp * .75, right, bottom - amp * .75, green, 2); ctx.setLineDash([]);
      text("E/E₀", 12, top - amp - 9, red, 12); text("S/Smax", 12, bottom - amp * 1.5 - 12, blue, 12);
      text(tr("平均 / 峰值 = 1/2", "Mean / peak = 1/2"), right, bottom - amp * .75 - 9, green, 12, "right");
      text(`I = E₀²/(2Z₀) = ${I.toFixed(3)} W/m²`, w / 2, 29, muted, w < 450 ? 12 : 17, "center");
      text(tr("S 不因 E 的正负而变成负值", "S does not reverse when E changes sign"), w / 2, h - 22, muted, 12, "center");
    },
  };
  figures.packets = {
    title: pair("有限波列与相位记忆", "Finite wave trains and phase memory"),
    note: pair("固定真空传播速度。载波已极度降频；平滑包络与确定性相位扰动只作概念图，τc 是手动假设，不由图拟合或测量。", "Vacuum propagation speed is fixed. The carrier is drastically slowed; smooth envelopes and deterministic phase perturbations are conceptual. τc is assumed by the control, not fitted or measured from this plot."),
    settings: [slider("coherence", "假定相干时间 τc", "Assumed coherence time τc", .2, 3, .1, 1, "ns"), slider("jitter", "相邻波列相位扰动", "Phase perturbation between trains", 0, 180, 15, 90, "°")],
    draw(a) {
      const { w, h, values, clock, tr, text, line, path, blue, red, green, muted } = setup(a);
      const left = 30, span = w - 55, rows = [h * .31, h * .68];
      text(tr("无限单频模型", "Infinite monochromatic model"), left, rows[0] - 62, blue, 13);
      text(tr("平滑有限包络（示意）", "Smooth finite envelopes (schematic)"), left, rows[1] - 62, red, 13);
      for (let row = 0; row < 2; row++) {
        line(left, rows[row], left + span, rows[row]);
        const pts = Array.from({ length: 401 }, (_, i) => {
          const s = i / 400, time = s * 8 - clock * .4;
          let y = Math.cos(2 * Math.PI * time);
          if (row) {
            y = 0;
            for (let j = -2; j < 7; j++) {
              const distance = time - j * 1.65, width = .22 + values.coherence * .16;
              y += Math.exp(-((distance / width) ** 2)) * Math.cos(2 * Math.PI * time + Math.sin(j * 13.1) * values.jitter * Math.PI / 180);
            }
          }
          return [left + span * s, rows[row] - y * h * .1];
        });
        path(pts, row ? red : blue, 2);
      }
      text(`ℓc ≈ cτc = ${(values.coherence * .3).toFixed(2)} m`, w / 2, h - 25, green, 16, "center");
    },
  };

  figures.boundary = {
    title: pair("跨界小柱、小回路与场分量", "Pillbox, loop, and interface field components"),
    note: pair("无自由面源、μ₁=μ₂。图中 n̂ 从 1 指向 2，E₁ₙ 固定 100 V/m。箭头仅示意连续/跳变，不是完整的反射场解。", "No free sheet sources, μ₁=μ₂. n̂ points from 1 to 2 and E₁ₙ=100 V/m. Arrows illustrate continuity/jumps, not a full reflected-field solution."),
    settings: [slider("epsilonRatio", "介电常数比 ε₂/ε₁", "Permittivity ratio ε₂/ε₁", 1, 6, .5, 4)],
    draw(a) {
      const { ctx, w, h, values, tr, text, line, arrow, red, blue, green, muted } = setup(a);
      const y = h * .46, cx = w * .27, lx = w * .72, ratio = values.epsilonRatio;
      ctx.fillStyle = "#30475b"; ctx.fillRect(15, 60, w - 30, y - 60);
      ctx.fillStyle = "#3f354e"; ctx.fillRect(15, y, w - 30, h * .78 - y);
      line(15, y, w - 15, y, muted, 2);
      text(tr("介质 1", "Medium 1"), 24, 83, muted, 12); text(tr("介质 2", "Medium 2"), 24, h * .77 - 10, muted, 12);
      ctx.setLineDash([4, 4]); ctx.strokeStyle = blue; ctx.strokeRect(cx - 30, y - 43, 60, 86); ctx.strokeStyle = green; ctx.strokeRect(lx - 46, y - 27, 92, 54); ctx.setLineDash([]);
      arrow(cx, y - 112, cx, y - 50, red); arrow(cx, y + 50, cx, y + 50 + 62 / ratio, red);
      arrow(lx - 40, y - 60, lx + 40, y - 60, green); arrow(lx - 40, y + 60, lx + 40, y + 60, green);
      text("B₁ₙ = B₂ₙ", cx, 29, blue, 14, "center"); text("E₁ₜ = E₂ₜ", lx, 29, green, 14, "center");
      arrow(w * .47, y - 15, w * .47, y + 35, muted); text("n̂", w * .47 + 9, y + 23, muted, 14);
      text(`E₂ₙ = 100/${ratio.toFixed(1)} = ${(100 / ratio).toFixed(1)} V/m`, w / 2, h - 36, red, w < 440 ? 12 : 16, "center");
      text(tr("连续 Dₙ ≠ 连续 Eₙ", "Continuous Dₙ ≠ continuous Eₙ"), w / 2, h - 12, muted, 12, "center");
    },
  };
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
  figures.snell = {
    title: pair("法线、三条光线与守恒频率", "The normal, three rays, and conserved frequency"),
    note: pair("固定 n₁=1，角度从法线量起。可把 n₂ 调低以看到实折射角的边界；全反射时不虚构传播透射光线，近界面倏逝场未画。", "Fixed n₁=1; angles are from the normal. Lower n₂ to reach the real-refraction boundary. No propagating transmitted ray is invented under total reflection; the evanescent near-interface field is omitted."),
    settings: [slider("incidence", "入射角 θ₁", "Incidence angle θ₁", 0, 85, 1, 30, "°"), slider("index2", "透射介质 n₂", "Transmitted index n₂", .6, 2.4, .1, 1.5)],
    draw(a) {
      const d = setup(a), { w, h, values, tr, text, red, blue, green, muted } = d;
      const f = rays(d, 1, values.index2, values.incidence, w * .42, h * .48, Math.min(w * .29, h * .29));
      text(`θ₁ = θᵣ = ${values.incidence.toFixed(0)}°`, w / 2, 27, blue, 15, "center");
      text(f.tir ? tr("无实数传播折射角", "No real propagating refraction angle") : `θ₂ = ${(f.theta2 * 180 / Math.PI).toFixed(2)}°`, w * .73, h * .72, green, w < 430 ? 11 : 14, "center");
      text(tr("红：入射　蓝：反射　绿：透射", "Red: incident · blue: reflected · green: transmitted"), w / 2, h - 17, muted, w < 480 ? 10 : 12, "center");
    },
  };
  figures.fresnel = {
    title: pair("四个场系数，而不是四个功率比", "Four field coefficients, not four power ratios"),
    note: pair("固定 n₁=1、非磁性无吸收。实线为 r，虚线为 t；采用教材的 p 基底约定。n₂>1，不含复系数全反射区。", "Fixed n₁=1, nonmagnetic lossless media. Solid curves are r, dashed curves t, with the book p-basis convention. n₂>1 excludes complex total-reflection coefficients."),
    settings: [slider("incidence", "入射角 θ₁", "Incidence angle θ₁", 0, 85, 1, 30, "°"), slider("index2", "透射折射率 n₂", "Transmitted index n₂", 1.1, 2.4, .1, 1.5)],
    draw(a) {
      const { ctx, w, h, values, text, line, path, red, blue, green, muted } = setup(a);
      const left = 42, span = w - 65, top = 60, bottom = h - 82, H = bottom - top;
      const X = angle => left + span * angle / 90, Y = value => top + H * (1.2 - value) / 2.2;
      for (const value of [-1, 0, 1]) { line(left, Y(value), w - 23, Y(value)); text(String(value), left - 12, Y(value) + 4, muted, 11, "right"); }
      for (const angle of [0, 30, 60, 90]) text(`${angle}°`, X(angle), bottom + 22, muted, 11, "center");
      for (const [key, color, dashed] of [["rs", blue, false], ["rp", red, false], ["ts", green, true], ["tp", "#e4c18a", true]]) {
        ctx.setLineDash(dashed ? [5, 4] : []);
        path(Array.from({ length: 181 }, (_, i) => [X(i * .499), Y(window.OpticsInterface.fresnel(1, values.index2, i * .499)[key])]), color, 2);
      }
      ctx.setLineDash([]);
      line(X(values.incidence), top, X(values.incidence), bottom, muted, 1);
      const f = window.OpticsInterface.fresnel(1, values.index2, values.incidence);
      text(`rₛ=${f.rs.toFixed(3)}`, w * .3, 25, blue, 14, "center");
      text(`rₚ=${f.rp.toFixed(3)}`, w * .72, 25, red, 14, "center");
      text(`tₛ=${f.ts.toFixed(3)}`, w * .3, h - 21, green, 14, "center");
      text(`tₚ=${f.tp.toFixed(3)}`, w * .72, h - 21, "#e4c18a", 14, "center");
      text("r: ━   t: ┄", w - 25, 46, muted, 11, "right");
    },
  };
  figures.fresnelDiscussion = {
    title: pair("布儒斯特零点与全反射边界", "Brewster zero versus total-reflection boundary"),
    note: pair("蓝线 rₛ，橙线 rₚ。仅绘制有实传播折射角的场系数；阴影区应使用复相位模型，留给 1.7，不将 r 强行画成实数 1。", "Blue rₛ, orange rₚ. Field coefficients are drawn only with real propagating refraction. The shaded region requires the complex-phase model of §1.7; r is not forced to real 1."),
    settings: [Object.assign(slider("directionCase", "界面方向", "Interface direction", 0, 1, 1, 0), { valueLabels: pair(["1 → 1.5", "1.5 → 1"], ["1 → 1.5", "1.5 → 1"]) }), slider("incidence", "观察角 θ₁", "Selected angle θ₁", 0, 85, 1, 45, "°")],
    draw(a) {
      const { ctx, w, h, values, tr, text, line, path, red, blue, green, muted } = setup(a);
      const reverse = values.directionCase === 1, n1 = reverse ? 1.5 : 1, n2 = reverse ? 1 : 1.5;
      const B = Math.atan(n2 / n1) * 180 / Math.PI, C = reverse ? Math.asin(n2 / n1) * 180 / Math.PI : 90;
      const left = 40, span = w - 63, top = 65, bottom = h - 80, H = bottom - top;
      const X = angle => left + span * angle / 90, Y = value => top + H * (1 - value) / 2;
      if (reverse) { ctx.fillStyle = "#7b637755"; ctx.fillRect(X(C), top, X(90) - X(C), H); text(tr("复相位区", "Complex r"), (X(C) + X(90)) / 2, top + 22, muted, 12, "center"); }
      for (const v of [-1, 0, 1]) { line(left, Y(v), X(90), Y(v)); text(String(v), left - 10, Y(v) + 3, muted, 11, "right"); }
      for (const [key, color] of [["rs", blue], ["rp", red]]) path(Array.from({ length: 221 }, (_, i) => {
        const angle = Math.min(C, 89.9) * i / 220;
        return [X(angle), Y(window.OpticsInterface.fresnel(n1, n2, angle)[key])];
      }), color, 2.6);
      ctx.setLineDash([3, 5]); line(X(B), top, X(B), bottom, green); ctx.setLineDash([]);
      line(X(values.incidence), top, X(values.incidence), bottom, muted);
      text(`θB=${B.toFixed(2)}°`, left, bottom + 24, green, 12);
      if (reverse) text(`θc=${C.toFixed(2)}°`, X(90), bottom + 24, muted, 12, "right");
      const f = window.OpticsInterface.fresnel(n1, n2, values.incidence);
      text(f.tir ? tr("|rₛ|=|rₚ|=1，r 一般非实数", "|rₛ|=|rₚ|=1; r is generally complex") : `rₛ=${f.rs.toFixed(3)}   rₚ=${f.rp.toFixed(3)}`, w / 2, 29, blue, w < 480 ? 11 : 14, "center");
      text(tr("θB 是零点，θc 是传播边界", "θB is a zero; θc a propagation boundary"), w / 2, h - 21, muted, w < 480 ? 10 : 13, "center");
    },
  };
  figures.power = {
    title: pair("反射 + 透射：同一界面上的能量账本", "Reflection + transmission: one interface energy budget"),
    note: pair("n₁=1、n₂=1.5，无吸收；比较同一界面面积上的法向平均功率。两行分别按各自通道入射功率归一，不把场系数当能量比。", "n₁=1,n₂=1.5, lossless. Mean normal power is compared through the same interface area. Each row is normalized to its own incident channel power, not to a field coefficient."),
    settings: [slider("incidence", "入射角 θ₁", "Incidence angle θ₁", 0, 85, 1, 0, "°")],
    draw(a) {
      const { ctx, w, h, values, tr, text, line, arrow, red, blue, green, muted } = setup(a);
      const f = window.OpticsInterface.fresnel(1, 1.5, values.incidence), left = 36, width = w - 72;
      text(tr("同一块界面 ΔA · 每个偏振独立守恒", "Common ΔA · each channel conserves power"), w / 2, 30, muted, w < 480 ? 11 : 14, "center");
      for (const [row, R, T, label] of [[0, f.Rs, f.Ts, "s"], [1, f.Rp, f.Tp, "p"]]) {
        const y = h * (.3 + row * .3);
        text(`${label}:  R=${(100 * R).toFixed(2)}%   T=${(100 * T).toFixed(2)}%`, left, y - 15, muted, w < 420 ? 12 : 15);
        ctx.fillStyle = red; ctx.fillRect(left, y, width * R, 25); ctx.fillStyle = blue; ctx.fillRect(left + width * R, y, width * T, 25);
        text(`R+T=${(R + T).toFixed(6)}`, left + width, y + 49, green, 12, "right");
      }
      const Rn = (f.Rs + f.Rp) / 2;
      text(`10 W → ${(10 * Rn).toFixed(3)} W + ${(10 * (1 - Rn)).toFixed(3)} W`, w / 2, h - 28, green, w < 450 ? 13 : 18, "center");
    },
  };
  figures.brewster = {
    title: pair("少量的反射光，也可以完全 s 偏振", "A weak reflection can still be purely s polarized"),
    note: pair("自然光入射，固定 n₁=1、n₂=1.5。右侧比较反射通道能量，非相干分量不画成一条合成相量；θB≈56.31°。", "Unpolarized input; fixed n₁=1,n₂=1.5. Reflected channel powers are compared, not combined into a coherent phasor. θB≈56.31°."),
    settings: [slider("incidence", "入射角（θB≈56.31°）", "Incidence angle (θB≈56.31°)", 0, 80, .01, 56.31, "°")],
    draw(a) {
      const d = setup(a), { ctx, w, h, values, tr, text, line, circle, bar, red, blue, green, muted } = d;
      const f = rays(d, 1, 1.5, values.incidence, w * .28, h * .46, Math.min(w * .22, h * .26));
      const D = (f.Rs + f.Rp) > 1e-15 ? Math.abs(f.Rs - f.Rp) / (f.Rs + f.Rp) : null;
      bar("Rs", f.Rs, w * .61, h * .23, w * .32, blue);
      bar("Rp", f.Rp, w * .61, h * .48, w * .32, red);
      text(`Dr = ${D === null ? "—" : D.toFixed(4)}`, w * .77, h * .77, green, 17, "center");
      text(`R = ${((f.Rs + f.Rp) * 50).toFixed(3)}%`, w / 2, 26, blue, 17, "center");
      text(tr("全偏振 ≠ 全部能量反射", "Fully polarized ≠ fully reflected"), w / 2, h - 18, muted, w < 480 ? 11 : 14, "center");
    },
  };
  for (const key of ["sources", "dipole", "energy", "packets"]) figures[key].background = ["#162a25", "#293d30"];
  figures.boundary.background = ["#211f35", "#3a2d48"];
  for (const key of ["snell", "fresnel", "fresnelDiscussion", "power", "brewster"]) figures[key].background = ["#102b34", "#163d43"];
  for (const [key, figure] of Object.entries(figures)) figure.animated = ["spherical", "cylindrical", "energy", "packets"].includes(key);
  window.OpticsExtraVisuals = figures;
})();

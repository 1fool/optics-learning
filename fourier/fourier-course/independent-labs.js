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
    if (source === button.closest(".il-bench, .conv-scene, .il-recap-grid figure, .conv-solution")) { close(true); return; }
    close();
    if (!panel) create();
    source = button.closest(".il-bench, .conv-scene, .il-recap-grid figure, .conv-solution");
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
  const block = (intro, tex, worked, limits) => `<section class="il-explanation"><h3>${t("图中对象 → 运算 → 当前结果", "Objects → calculation → current result")}</h3><p>${prose(P(...intro))}</p>${equation(tex)}<p>${prose(P(...worked))}</p>${limits ? `<p>${prose(P(...limits))}</p>` : ""}</section>`;
  const runtimes = window.FourierSectionRuntime;
  const models = {};
  const calculate = { convolve };
  for (const section of Object.values(runtimes)) {
    if (!section.create) continue;
    const runtime = section.create({ P, text, h, t, prose, fmt, overlap, sinc, gauss, integrate, convolve, add, graph, stems, legend, equation, block, pulseParameterMarkup, math: (...args) => context.math(...args) });
    section.models.forEach(model => { models[model] = runtime; });
    Object.assign(calculate, runtime.calculate);
  }
  function scene(model, s) {
    const result = models[model].drawScene(model, s);
    result.explanation ||= models[model].explanation(model, s);
    return result;
  }
  function controlMarkup(stage, s) {
    return `<div class="il-controls">${stage.controls.map(name => {
      const [field, label, low, max, step] = runtimes[activeId].controls[name];
      if (low === "check") return `<label class="il-check"><input type="checkbox" data-il-control="${field}" ${s[field] ? "checked" : ""}>${h(text(label))}</label>`;
      if (Array.isArray(low)) return `<label>${h(text(label))}<select data-il-control="${field}">${low.map(([value, option]) => `<option value="${value}" ${String(s[field]) === String(value) ? "selected" : ""}>${h(text(option))}</option>`).join("")}</select></label>`;
      return `<label>${h(text(label))} <output data-il-output="${field}">${fmt(s[field])}</output><input type="range" data-il-control="${field}" min="${low}" max="${max}" step="${step}" value="${s[field]}"></label>`;
    }).join("")}</div>`;
  }
  function questionContext(index) {
    const stage = data[activeId][index], s = values(activeId, index);
    if (!stage.controls.length) return "";
    const changed = stage.controls.some(name => {
      const field = runtimes[activeId].controls[name][0];
      return s[field] !== stage.initial[field];
    });
    const current = stage.controls.map(name => {
      const [field, label, options] = runtimes[activeId].controls[name];
      const option = Array.isArray(options) ? options.find(([v]) => String(v) === String(s[field]))?.[1] : null;
      const value = option ? text(option) : typeof s[field] === "boolean" ? text(s[field] ? P("开", "on") : P("关", "off")) : s[field];
      return `${text(label)}=${value}`;
    }).join(" · ");
    return `<div class="il-question-context"><strong>${t(changed ? "当前显示的是对照条件；题目仍按上方指定的情境或比较范围作答。" : "作答范围：按上方题述的数值或比较关系。", changed ? "Chart conditions changed for comparison; answer for the stated case or comparison range." : "Answer for the values or comparison stated in the task.")}</strong><p>${h(current)}</p><p>${t("题目若给出固定数值，判分针对那组数值；若问比较关系，就综合题述的几种条件。下方图读数始终对应当前控件，改变控件不会偷偷改写题设。", "For a numerical question, grading uses its stated values. For a comparison, consider all stated conditions. Chart readings always follow the current controls; controls do not silently rewrite the question.")}</p></div>`;
  }
  function pulseParameterMarkup(n, gaussian, adjustable) {
    const label = adjustable ? P("当前图（下方可调）", "Current chart (adjustable below)") : P("本图固定", "Fixed for this chart");
    return `<p class="il-pulse-parameters" data-pulse-n="${n}"><strong>${h(text(label))}：${context.math(`N=${n}`)}</strong> · ${t(gaussian ? "高斯特征尺度" : "矩形全宽", gaussian ? "Gaussian scale" : "Rectangle full width")} ${context.math(String.raw`\frac1N\approx${fmt(1 / n)}`)}。${prose(P("$N$ 是收缩参数，越大脉冲越窄。", "$N$ controls concentration: larger means narrower."))}</p>`;
  }
  const pulseParameters = (model, s, adjustable = false) => models[model].parameters?.(model, s, adjustable) || "";
  function liveMarkup(index, notes = false) {
    const stage = data[activeId][index], s = values(activeId, index, notes);
    const hidden = !notes && index === data[activeId].length - 1 && record(activeId).answers[index] === undefined;
    const result = hidden ? null : scene(stage.model, s);
    return `<div class="il-bench" data-il-bench="${index}" data-il-notes="${notes}" tabindex="-1">${pulseParameters(stage.model, s, stage.controls.includes("n"))}<div class="il-scene">${hidden ? `<div class="il-hidden" role="status">${t("先用题目给定条件独立判断；提交后再显示计算图和读数。", "Use the given conditions to predict independently. Submit to reveal the calculated chart and readings.")}</div>` : result.graphic}</div><div class="il-readout" role="status"${!hidden && result.weightedIntegral !== undefined ? ` data-weighted-integral="${result.weightedIntegral}"` : ""}>${hidden ? t("新情境：计算结果未显示", "New case: calculated results hidden") : result.readout}</div>${controlMarkup(stage, s)}<div class="il-chart-actions">${stage.controls.length ? `<button type="button" class="il-reset" data-il-reset="${index}">${t("恢复本步题述条件", "Restore this step's stated conditions")}</button>` : ""}${hidden ? "" : explanationButton()}</div><div class="il-explanation-slot" hidden>${hidden ? "" : result.explanation || ""}</div><p class="il-boundary">${t("无量纲数学模型，非实测。判断按题述条件，控件用于另做对照。", "Dimensionless mathematical model, not measurements. Answer for the stated case; use controls for additional comparisons.")}</p>${notes ? "" : `<button type="button" class="il-mobile-jump" data-il-focus="decision">${t("查看判断与反馈 ↓", "Go to prediction and feedback ↓")}</button>`}</div>`;
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
  function renderNotes() {
    const lesson = window.FourierLessons.find(l => l.id === activeId), g = window.FourierGuides[activeId];
    const content = window.FourierIndependentNotes;
    const order = runtimes[activeId].noteOrder || lesson.notes.map((_, i) => i);
    const reading = record(activeId).noteReturn;
    const benchIndex = reading === undefined ? record(activeId).noteStage ?? runtimes[activeId].noteStages[order[0]] : runtimes[activeId].noteStages[reading];
    record(activeId).noteStage = benchIndex;
    const title = i => text(runtimes[activeId].noteTitles?.[i] || lesson.notes[i].title);
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
      record(activeId).noteStage = runtimes[activeId].noteStages[note];
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
    if (result.weightedIntegral !== undefined) bench.querySelector(".il-readout").dataset.weightedIntegral = result.weightedIntegral;
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
      const r = record(id), index = mode === "notes" ? r.noteStage ?? runtimes[id].noteStages[runtimes[id].noteOrder?.[0] ?? 0] : r.stage || 0;
      if (mode === "explore" && index === data[id].length - 1 && r.answers[index] === undefined) return {};
      return values(id, index, mode === "notes");
    },
    // Exposed for independent numerical regression, not for determining formal answers.
    calculate,
  };
})();

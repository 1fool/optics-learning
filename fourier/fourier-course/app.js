(() => {
  const lessons = window.FourierLessons;
  const guides = window.FourierGuides;
  const byId = Object.fromEntries(lessons.map(lesson => [lesson.id, lesson]));
  const storage = { answers: "fourier-course-answers-v1", labs: "fourier-course-labs-v1", language: "fourier-course-language" };
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* file:// may disable storage */ } };
  const text = (value) => typeof value === "string" ? value : value[language];
  const html = (value) => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const math = (tex, display = false) => katex.renderToString(tex, { displayMode: display, throwOnError: true, output: "html" });
  const ui = {
    zh: { scope: "教材样章 · 1.1–1.2", chapter: "第 1 章 · 傅里叶分析", section: "1.2 · 脉冲函数", side: "两本教材分开成课 · 本页只包含《傅里叶光学》第 1 章的已做部分。", book: "吕乃光《傅里叶光学》第 3 版", source: "打开教材对应页 ↗", pages: "书页", view: ["动手探索", "图解回顾", "完整讲义", "正式练习"], predict: "先预测，再动手", transfer: "换个条件试一试 · 答前不显示结果", observe: "观察任务", chart: "交互图示 · 模型计算，非实测", compare: "虚线：a=1 参照 / 实线：当前值", func: "函数", scale: "尺度 a", family: "近似脉冲", width: "收缩倍数 N", center: "位置 x₀", spacing: "间距 τ", grid: "二维格点", rect: "矩形族", gauss: "高斯族", false: "一维抽样", true: "二维阵列", area: "脉冲面积", target: "目标值 f(x₀)", integral: "加权积分（有限宽近似）", sample: "采样位置 nτ；箭头长度编码权重 f(nτ)，不是 δ 的高度。", boundary: "模型边界", labBoundary: ["a>0；本图仅演示一维函数截面与理想二维圆孔，图上的不连续边界依教材定义。", "图中是有限 N 的近似脉冲；δ 本身不具有通常意义的曲线高度。积分示例用连续的 f(x)=1/(1+x²)。", "箭头表示理想单位脉冲及其权重；有限图窗只画出其中一些，二维格点图不代表真实小孔尺寸。"], recap: "带走这三点", notes: "从现象到公式", practice: "本节正式练习", unknown: "我不知道", retry: "再试一次", correct: "答对了", wrong: "再想想", nextQ: "下一题", prev: "← 上一节", next: "下一节 →", finished: "已到样章末尾", start: "这是第一节", answer: "解析", reset: "重做本题", saved: "作答保存在这本书的独立进度中", plot: "纵轴单位见图示说明" },
    en: { scope: "Sample · §§1.1–1.2", chapter: "Chapter 1 · Fourier Analysis", section: "1.2 · Impulse Functions", side: "A separate course for this textbook. Only the completed part of Chapter 1 appears here.", book: "Lü Naiguang, Fourier Optics, 3rd ed.", source: "Open source page ↗", pages: "Book pp.", view: ["Explore", "Visual recap", "Full notes", "Practice"], predict: "Predict, then investigate", transfer: "Try a new condition · answer hidden until submitted", observe: "Observation task", chart: "Interactive model · not measured data", compare: "Dashed: a=1 reference / solid: current", func: "Function", scale: "Scale a", family: "Approximation", width: "Concentration N", center: "Center x₀", spacing: "Spacing τ", grid: "2D lattice", rect: "Rectangular", gauss: "Gaussian", false: "1D sampling", true: "2D lattice", area: "Pulse area", target: "Target f(x₀)", integral: "Weighted integral (finite pulse)", sample: "Samples at nτ; arrow length encodes weight f(nτ), not the height of δ.", boundary: "Model boundary", labBoundary: ["a>0. These are 1D profiles and an ideal 2D circular pupil; discontinuous boundary values follow the book.", "The plot shows finite-N approximations; delta itself has no ordinary graph height. The integral example uses continuous f(x)=1/(1+x²).", "Arrows represent ideal unit impulses and weights. Only a finite window is drawn; 2D dots are not real pinhole sizes."], recap: "Three takeaways", notes: "From observation to formula", practice: "Practice for this section", unknown: "I don't know", retry: "Try again", correct: "Correct", wrong: "Not quite", nextQ: "Next question", prev: "← Previous", next: "Next →", finished: "End of sample", start: "First section", answer: "Explanation", reset: "Retry question", saved: "Answers use a separate progress key for this book", plot: "See diagram note for vertical scales" }
  };
  let language = read(storage.language, "zh") === "en" ? "en" : "zh";
  let lessonId = byId[decodeURIComponent(location.hash.replace(/^#lesson-/, ""))] ? decodeURIComponent(location.hash.slice(8)) : "1.1";
  let mode = "explore";
  let compareIndex = null;
  let quizIndex = 0;
  const answers = read(storage.answers, {});
  const labs = read(storage.labs, {});
  const defaultLab = id => id === "1.1" ? { func: "rect", a: 1.5 } : id === "1.2.1" ? { family: "rect", n: 2, x0: 0 } : { tau: 1.5, grid: false };
  const lab = () => labs[lessonId] ||= defaultLab(lessonId);
  const lesson = () => byId[lessonId];
  const guide = () => guides[lessonId];
  const L = () => ui[language];
  const $ = id => document.getElementById(id);
  const names = { step: "step", sgn: "sgn", rect: "rect", tri: "tri", sinc: "sinc", gaus: "Gaus", circ: "circ" };
  const f = x => 1 / (1 + x * x);
  const quickUi = {
    zh: { tools: "学习快捷工具", symbols: "本节符号", top: "返回顶部", close: "关闭", move: "拖动标题移动 · 方向键微调", resize: "拖动右下角调整大小；方向键微调", headings: ["符号", "含义", "单位", "本节条件／当前值"], note: "图中坐标为无量纲演示；实际长度按本行单位换算。“—”表示未指定。关闭再打开恢复默认位置与大小；窄屏表格可左右滑动。" },
    en: { tools: "Learning shortcuts", symbols: "Section symbols", top: "Back to top", close: "Close", move: "Drag heading to move · arrow keys to nudge", resize: "Drag the lower-right corner to resize; arrow keys to nudge", headings: ["Symbol", "Meaning", "Unit", "Condition / current value"], note: "Diagram coordinates are dimensionless; use the listed units for physical lengths. “—” means unspecified. Close and reopen to reset position and size; scroll the table sideways on small screens." }
  };
  const learningUi = {
    zh: { bridge: ["承接", "本节", "下一步"], start: "从一个问题开始", known: "先弄清这两件事", route: "阅读路线 · 点击跳到相应步骤", see: "先看图，做一件事", stage: "探索进度（只表示已作答，不代表掌握）", choose: "先操作图，再选择你的判断", next: "继续探索 →", notes: "按顺序读 · 图板保持可操作", example: "代入一个具体情境", link: "为什么接着学这一步", proof: "展开验算：已知 → 运算 → 结果", compare: "回到图板试一试", hidden: "先选出判断，再看新情境的数值读数。" },
    en: { bridge: ["Previously", "Here", "Next"], start: "Start with a question", known: "First clarify these two ideas", route: "Reading route · jump to a step", see: "First observe one thing", stage: "Exploration progress (answers, not mastery)", choose: "Operate the chart, then choose a claim", next: "Continue exploring →", notes: "Read in order · keep the chart interactive", example: "Work a concrete case", link: "Why this leads to the next step", proof: "Expand check: given → operation → result", compare: "Try it on the chart", hidden: "Make a prediction before reading the new-case numerical display." }
  };
  const G = () => learningUi[language];

  function renderShell() {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = `${text(lesson().title)} · ${language === "zh" ? "傅里叶光学" : "Fourier Optics"}`;
    $("language").textContent = language === "zh" ? "EN" : "中文";
    $("scope-label").textContent = L().scope;
    $("chapter-label").textContent = L().chapter;
    $("section-label").textContent = L().section;
    $("side-foot").textContent = L().side;
    document.querySelector(".sidebar").setAttribute("aria-label", language === "zh" ? "课程目录" : "Course contents");
    document.querySelectorAll(".lesson-link").forEach(button => {
      button.textContent = `${button.dataset.lesson}  ${text(byId[button.dataset.lesson].title)}`;
      button.classList.toggle("active", button.dataset.lesson === lessonId);
      if (button.dataset.lesson === lessonId) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current");
    });
    $("breadcrumb").textContent = `${L().chapter}  /  ${lessonId.startsWith("1.2") ? `${L().section}  /  ` : ""}${lessonId}`;
    $("lesson-kicker").textContent = `${lessonId}  /  ${L().book}`;
    $("lesson-title").textContent = text(lesson().title);
    $("lesson-lead").textContent = text(lesson().lead);
    $("page-label").textContent = `${L().pages} ${lesson().pages}  ·  PDF ${lesson().pdf}`;
    $("source-link").textContent = language === "zh" ? "教材未随网站提供 · 请据页码对照" : "Textbook not hosted · consult page numbers";
    $("source-link").removeAttribute("href");
    $("views").innerHTML = ["explore", "recap", "notes", "quiz"].map((view, i) => `<button type="button" data-view="${view}" class="${view === mode ? "selected" : ""}" aria-pressed="${view === mode}">${html(L().view[i])}</button>`).join("");
    $("quick-symbols-label").textContent = quickUi[language].symbols;
    $("quick-symbols").setAttribute("aria-label", quickUi[language].symbols);
    $("back-to-top").setAttribute("aria-label", quickUi[language].top);
    $("back-to-top").title = quickUi[language].top;
    $("close-symbols").textContent = quickUi[language].close;
    $("symbol-move-hint").textContent = quickUi[language].move;
    $("symbol-move").title = quickUi[language].move;
    $("resize-symbols").setAttribute("aria-label", quickUi[language].resize);
    $("resize-symbols").title = quickUi[language].resize;
    document.querySelector(".quick-tools").setAttribute("aria-label", quickUi[language].tools);
    const pos = lessons.findIndex(item => item.id === lessonId);
    $("prev").textContent = pos ? L().prev : L().start;
    $("prev").disabled = !pos;
    $("next").textContent = pos < lessons.length - 1 ? L().next : L().finished;
    $("next").disabled = pos === lessons.length - 1;
  }

  function render() {
    renderShell();
    if (mode === "explore") renderExplore();
    if (mode === "recap") {
      const image = lessonId === "1.1" ? functionPlot({ func: "rect", a: 2 }) : lessonId === "1.2.1" ? deltaPlot({ family: "rect", n: 8, x0: 0 }) : combPlot({ grid: false, tau: 2 });
      $("content").innerHTML = `<div class="section-caption">${html(L().recap)}</div><figure class="recap-figure"><div class="plot">${image}</div><figcaption>${html(text(guide().observe))} · ${html(L().chart)}</figcaption></figure><div class="recap-grid">${lesson().recap.map((item, i) => `<article class="recap-card"><span>0${i + 1}</span><p>${html(text(item))}</p></article>`).join("")}</div><button type="button" class="primary inline-next" data-view="notes">${html(L().view[2])} →</button>`;
    }
    if (mode === "notes") renderNotes();
    if (mode === "quiz") renderQuiz();
    renderSymbols();
  }

  function renderNotes() {
    const g = guide();
    const intro = `<div class="learning-intro"><div class="section-caption">${html(G().start)}</div><h2>${html(text(g.question))}</h2><p>${html(text(g.setup))}</p><div class="bridge-row">${g.bridge.map((item, i) => `<p><strong>${html(G().bridge[i])}</strong>${html(text(item))}</p>`).join("")}</div><div class="section-caption">${html(G().known)}</div><ul class="first-terms">${g.terms.map(item => `<li>${html(text(item))}</li>`).join("")}</ul><p class="observation-guide"><strong>${html(G().see)}：</strong>${html(text(g.observe))}</p><div class="section-caption">${html(G().route)}</div><ol class="reading-route">${lesson().notes.map((note, i) => `<li><button type="button" data-reading="${i}">${html(text(note.title))}</button></li>`).join("")}</ol></div>`;
    const blocks = lesson().notes.map((item, i) => {
      const step = g.steps[i];
      return `<article class="note" id="reading-${i}" tabindex="-1"><div class="note-num">${String(i + 1).padStart(2, "0")}</div><div class="note-body"><h2>${html(text(item.title))}</h2><p class="build">${html(text(step.build))}</p><button type="button" class="compare-button" data-compare="${i}">${html(G().compare)} ↗</button><div class="equation" role="group" aria-label="${html(text(item.title))}">${math(item.tex, true)}</div><p class="read-formula">${html(text(item.after))}</p><p class="worked"><strong>${html(G().example)} · </strong>${html(text(step.example))}</p><details class="proof"><summary>${html(G().proof)}</summary>${step.proof.map(line => `<div class="proof-line"><p>${html(text(line.lead))}</p><div class="proof-equation">${math(line.tex, true)}</div><p>${html(text(line.read))}</p></div>`).join("")}</details><p class="to-next"><strong>${html(G().link)} · </strong>${html(text(step.next))}</p></div></article>`;
    }).join("");
    $("content").innerHTML = `<div class="notes-layout"><div class="notes-reading">${intro}<div class="section-caption">${html(G().notes)}</div><div class="notes">${blocks}</div><button type="button" class="primary inline-next" data-view="quiz">${html(L().view[3])} →</button></div><aside class="notes-visual" aria-label="${html(L().chart)}">${workbenchMarkup(lab())}</aside></div>`;
    renderLabVisual();
  }

  function workbenchMarkup(state) {
    const controls = lessonId === "1.1" ? `<label>${html(L().func)}<select data-lab="func">${Object.keys(names).map(key => `<option value="${key}" ${key === state.func ? "selected" : ""}>${names[key]}</option>`).join("")}</select></label><label class="range-label">${html(L().scale)} <output id="a-value">${state.a.toFixed(2)}</output><input data-lab="a" type="range" min="0.5" max="3" step="0.25" value="${state.a}" ${["step", "sgn"].includes(state.func) ? "disabled" : ""}></label>` : lessonId === "1.2.1" ? `${state.plane ? "" : `<label>${html(L().family)}<select data-lab="family"><option value="rect" ${state.family === "rect" ? "selected" : ""}>${html(L().rect)}</option><option value="gauss" ${state.family === "gauss" ? "selected" : ""}>${html(L().gauss)}</option></select></label>`}<label class="range-label">${html(L().width)} <output id="n-value">${state.n}</output><input data-lab="n" type="range" min="1" max="12" step="1" value="${state.n}"></label>${state.plane ? "" : `<label class="range-label">${html(L().center)} <output id="x0-value">${state.x0.toFixed(1)}</output><input data-lab="x0" type="range" min="-2" max="2" step="0.25" value="${state.x0}"></label>`}` : `<label class="range-label">${html(L().spacing)} <output id="tau-value">${state.tau.toFixed(2)}</output><input data-lab="tau" type="range" min="0.75" max="2.5" step="0.25" value="${state.tau}"></label><label class="toggle"><input data-lab="grid" type="checkbox" ${state.grid ? "checked" : ""}><span>${html(L().grid)}</span></label>`;
    const boundary = lessonId === "1.2.1" && state.plane ? (language === "zh" ? "二维椭圆轮廓是有限宽数学近似，x、y 均为无量纲演示；颜色和线宽不代表测得的光斑。缩放权重须由面积积分判断。" : "The 2D ellipses are finite mathematical approximations with dimensionless axes; colors and line widths are not measured spots. Scaling weight follows from an area integral.") : L().labBoundary[lessons.findIndex(item => item.id === lessonId)];
    return `<div class="workbench"><div class="plot-header"><strong>${html(L().chart)}</strong><span>${lessonId === "1.1" ? html(L().compare) : ""}</span></div><div id="plot" class="plot"></div><div id="readout" class="readout" aria-live="polite"></div><div class="controls">${controls}</div><p class="boundary"><strong>${html(L().boundary)}</strong> · ${html(boundary)}</p>${mode === "notes" && compareIndex !== null ? `<button type="button" class="return-reading" data-return-reading="${compareIndex}">${html(language === "zh" ? "返回刚才的讲解 ↓" : "Back to the explanation ↓")}</button>` : ""}</div>`;
  }

  function renderExplore() {
    const state = lab();
    const stages = guide().stages, index = Math.min(state.stage || 0, stages.length - 1), current = stages[index], selected = state.stageAnswers?.[index];
    const progress = Object.keys(state.stageAnswers || {}).length;
    $("content").innerHTML = `<section class="experiment"><div class="experiment-heading"><div><span class="lab-tag">LAB / ${lessonId}</span><h2>${html(text(guide().question))}</h2><p>${html(text(guide().setup))}</p>${index === 0 ? `<p class="observe-first"><strong>${html(G().see)}：</strong>${html(text(guide().observe))}</p>` : ""}</div></div><div class="stage-strip"><span>${html(G().stage)} · ${progress}/${stages.length}</span><div class="stage-buttons">${stages.map((s, i) => `<button type="button" data-stage="${i}" class="${i === index ? "current" : ""}" aria-current="${i === index ? "step" : "false"}" aria-label="${html(text(s.title))}">${String(i + 1).padStart(2, "0")}${state.stageAnswers?.[i] === s.answer ? " ✓" : ""}</button>`).join("")}</div></div><div class="experiment-grid">${workbenchMarkup(state)}<div class="prediction"><div class="section-caption">${String(index + 1).padStart(2, "0")} / ${String(stages.length).padStart(2, "0")}</div><h3>${html(text(current.title))}</h3><p class="stage-task">${html(text(current.task))}</p><div class="section-caption">${html(G().choose)}</div><div class="prediction-options">${current.choices.map((option, i) => `<button type="button" data-stage-answer="${i}" class="${selected === i ? "chosen" : ""}" aria-pressed="${selected === i}">${html(text(option))}</button>`).join("")}</div><p class="feedback" role="status" aria-live="polite">${selected === undefined ? "" : html(text(current.feedback[selected]))}</p><div class="task-next">${index < stages.length - 1 ? `<button type="button" class="primary" data-stage="${index + 1}">${html(G().next)}</button>` : `<button type="button" class="primary" data-view="recap">${html(L().view[1])} →</button>`}<button type="button" class="quiet-link" data-view="notes">${html(L().view[2])} →</button></div></div></div></section>`;
    renderLabVisual();
  }

  function renderLabVisual() {
    const state = lab();
    $("plot").innerHTML = lessonId === "1.1" ? functionPlot(state) : lessonId === "1.2.1" ? deltaPlot(state) : combPlot(state);
    const message = lessonId === "1.1" ? functionReadout(state) : lessonId === "1.2.1" ? deltaReadout(state) : combReadout(state);
    $("readout").textContent = message;
    if (mode === "explore") {
      const index = lab().stage || 0;
      const masked = (index === guide().stages.length - 1 || (lessonId === "1.2.1" && index === 3)) && lab().stageAnswers?.[index] === undefined;
      $("readout").textContent = masked ? G().hidden : message;
    }
    for (const [key, value] of Object.entries({ a: state.a?.toFixed(2), n: state.n, x0: state.x0?.toFixed(1), tau: state.tau?.toFixed(2) })) {
      if ($(`${key}-value`)) $(`${key}-value`).textContent = value;
    }
    if ($("content").querySelector('[data-lab="a"]')) $("content").querySelector('[data-lab="a"]').disabled = ["step", "sgn"].includes(state.func);
    if ($("symbol-dialog").open) renderSymbols();
  }

  function renderSymbols() {
    $("symbol-dialog-title").textContent = `${lessonId} · ${quickUi[language].symbols}`;
    $("symbol-dialog-note").textContent = quickUi[language].note;
    $("symbol-head").innerHTML = quickUi[language].headings.map(label => `<th scope="col">${html(label)}</th>`).join("");
    $("symbol-rows").innerHTML = lesson().symbols.map(item => {
      const current = item.control ? lab()[item.control] : undefined;
      const condition = `${text(item.condition)}${current === undefined ? "" : ` · ${item.control === "n" ? current : current.toFixed(2)}`}`;
      return `<tr><th scope="row">${math(item.tex)}</th><td>${html(text(item.meaning))}</td><td>${html(text(item.unit))}</td><td>${html(condition)}</td></tr>`;
    }).join("");
  }

  const X = x => 40 + (x + 4) * 75;
  const Y = y => 195 - y * 105;
  const polyline = (fn, from = -4, to = 4, count = 480) => Array.from({ length: count + 1 }, (_, i) => `${X(from + (to - from) * i / count).toFixed(1)},${Y(fn(from + (to - from) * i / count)).toFixed(1)}`).join(" ");
  const axes = () => `<line x1="40" y1="195" x2="640" y2="195" class="axis"/><line x1="340" y1="45" x2="340" y2="335" class="axis"/><text x="630" y="215">x</text><text x="347" y="68">1</text><text x="335" y="215">0</text>`;
  function profile(kind, x, a) {
    if (kind === "step") return x > 0 ? 1 : x < 0 ? 0 : 0.5;
    if (kind === "sgn") return Math.sign(x);
    if (kind === "rect") return Math.abs(x) <= a / 2 ? 1 : 0;
    if (kind === "tri") return Math.max(0, 1 - Math.abs(x) / a);
    if (kind === "sinc") return Math.abs(x) < 1e-9 ? 1 : Math.sin(Math.PI * x / a) / (Math.PI * x / a);
    return Math.exp(-Math.PI * (x / a) ** 2);
  }
  function functionPlot(state) {
    if (state.func === "circ") {
      const r = state.a * 50;
      return `<svg viewBox="0 0 680 350" role="img" aria-label="${html(language === "zh" ? `半径 ${state.a} 的二维圆孔，内 1 外 0` : `Two-dimensional disk of radius ${state.a}, 1 inside and 0 outside`)}"><rect x="0" y="0" width="680" height="350" fill="#142638"/><circle cx="340" cy="175" r="50" fill="none" stroke="#efa96b" stroke-dasharray="6 6" stroke-width="2"/><circle cx="340" cy="175" r="${r}" fill="#5cd2c5" fill-opacity=".7" stroke="#9dede3" stroke-width="3"/><line x1="80" y1="175" x2="600" y2="175" class="axis"/><line x1="340" y1="20" x2="340" y2="325" class="axis"/><text x="610" y="179">x</text><text x="348" y="30">y</text><text x="345" y="169">0</text><text x="${340 + r / 2}" y="163">r₀</text></svg>`;
    }
    const continuous = ["tri", "sinc", "gaus"].includes(state.func);
    const curve = a => continuous ? `<polyline points="${polyline(x => profile(state.func, x, a))}"/>` : `<path d="${state.func === "step" ? `M40 ${Y(0)} H340 V${Y(1)} H640` : state.func === "sgn" ? `M40 ${Y(-1)} H340 V${Y(1)} H640` : `M40 ${Y(0)} H${X(-a / 2)} V${Y(1)} H${X(a / 2)} V${Y(0)} H640`}"/>`;
    return `<svg viewBox="0 0 680 350" role="img" aria-label="${html(`${state.func}, a=${state.a}; ${language === "zh" ? "虚线为 a=1" : "dashed reference a=1"}`)}">${axes()}<g class="reference">${curve(1)}</g><g class="curve">${curve(state.a)}</g><text x="430" y="55" class="graph-key">a = ${state.a.toFixed(2)}</text></svg>`;
  }
  function functionReadout(state) {
    const a = state.a;
    const zh = { step: "step(0)=1/2；a 不参与此函数。", sgn: "sgn(0)=0；a 不参与此函数。", rect: `矩形窗范围：−${(a / 2).toFixed(2)} ≤ x ≤ ${(a / 2).toFixed(2)}；全宽 ${a.toFixed(2)}。`, tri: `零点 x=±${a.toFixed(2)}；底宽 ${(2 * a).toFixed(2)}。`, sinc: `首对非零零点 x=±${a.toFixed(2)}；中心值为 1。`, gaus: `中心值 1；曲线面积 ${a.toFixed(2)}（x 与 a 同单位）。`, circ: `圆孔半径 r₀=${a.toFixed(2)}；圆内透过率 1、圆外 0。` };
    const en = { step: "step(0)=1/2; a is not used.", sgn: "sgn(0)=0; a is not used.", rect: `Window: −${(a / 2).toFixed(2)} ≤ x ≤ ${(a / 2).toFixed(2)}; full width ${a.toFixed(2)}.`, tri: `Zeros at x=±${a.toFixed(2)}; base width ${(2 * a).toFixed(2)}.`, sinc: `First nonzero zeros at x=±${a.toFixed(2)}; center is 1.`, gaus: `Peak 1; curve area ${a.toFixed(2)} (x and a share a unit).`, circ: `Pupil radius r₀=${a.toFixed(2)}; transmission is 1 inside, 0 outside.` };
    return (language === "zh" ? zh : en)[state.func];
  }

  function integrate(state) {
    const count = 2400, left = state.x0 - 4, right = state.x0 + 4, dx = (right - left) / count;
    const pulse = x => state.family === "rect" ? (Math.abs(x - state.x0) <= 1 / (2 * state.n) ? state.n : 0) : state.n * Math.exp(-Math.PI * state.n ** 2 * (x - state.x0) ** 2);
    let sum = 0;
    for (let i = 0; i <= count; i++) sum += (i === 0 || i === count ? 1 : i % 2 ? 4 : 2) * f(left + i * dx) * pulse(left + i * dx);
    return sum * dx / 3;
  }
  function deltaPlot(state) {
    if (state.plane) {
      const radius = Math.min(100, 180 / Math.sqrt(state.n));
      return `<svg viewBox="0 0 680 350" role="img" aria-label="${html(language === "zh" ? `二维脉冲坐标缩放，x 方向 2 倍，y 方向 3 倍，N=${state.n}；虚线为缩放前等宽参照` : `2D impulse scaling, x by 2 and y by 3, N=${state.n}; dashed ellipse is the isotropic reference`)}"><line x1="40" y1="175" x2="640" y2="175" class="axis"/><line x1="340" y1="35" x2="340" y2="310" class="axis"/><ellipse cx="340" cy="175" rx="${radius}" ry="${radius}" class="delta-reference"/><ellipse cx="340" cy="175" rx="${radius / 2}" ry="${radius / 3}" class="delta-scaled"/><text x="42" y="55">${language === "zh" ? "虚线：δ(x,y) 近似" : "Dashed: δ(x,y) approximation"}</text><text x="42" y="80">${language === "zh" ? "实线：δ(2x,3y) 近似" : "Solid: δ(2x,3y) approximation"}</text><text x="612" y="164">x</text><text x="352" y="45">y</text></svg>`;
    }
    const px = x => 40 + (x + 3) * 100, y = value => 245 - value * 165;
    const pulse = x => state.family === "rect" ? (Math.abs(x - state.x0) <= 1 / (2 * state.n) ? 1 : 0) : Math.exp(-Math.PI * state.n ** 2 * (x - state.x0) ** 2);
    const points = Array.from({ length: 601 }, (_, i) => { const x = -3 + i / 100; return `${px(x).toFixed(1)},${y(pulse(x)).toFixed(1)}`; }).join(" ");
    const curve = Array.from({ length: 601 }, (_, i) => { const x = -3 + i / 100; return `${px(x).toFixed(1)},${y(f(x)).toFixed(1)}`; }).join(" ");
    return `<svg viewBox="0 0 680 350" role="img" aria-label="${html(language === "zh" ? `中心 ${state.x0}，N=${state.n} 的单位面积脉冲近似；绿色为 f(x)，两条曲线纵轴各自归一化` : `Unit-area pulse near ${state.x0}, N=${state.n}; green f(x); vertical axes normalized separately`)}"><line x1="40" y1="245" x2="640" y2="245" class="axis"/><line x1="340" y1="45" x2="340" y2="290" class="axis"/><polyline points="${curve}" class="test-curve"/><polyline points="${points}" class="pulse-curve"/><circle cx="${px(state.x0)}" cy="${y(f(state.x0))}" r="6" fill="#f6b779"/><text x="45" y="42">${language === "zh" ? "蓝：脉冲（自身峰高归一显示）" : "Blue: pulse (display-normalized peak)"}</text><text x="45" y="65">${language === "zh" ? "绿：f(x)=1/(1+x²)" : "Green: f(x)=1/(1+x²)"}</text><text x="${Math.min(540, px(state.x0) + 12)}" y="104">${language === "zh" ? "实际峰高" : "Actual peak"} = ${state.n}</text><text x="626" y="263">x</text></svg>`;
  }
  function deltaReadout(state) {
    if (state.plane) return language === "zh" ? `横向宽度变为 1/2、纵向变为 1/3；相对积分权重 = 1/6。图中轮廓线非真实光斑。` : `Width becomes 1/2 along x and 1/3 along y; relative integral weight = 1/6. Contours are not measured spots.`;
    const number = integrate(state), target = f(state.x0);
    return `${L().area} = 1  ·  ${L().target} = ${target.toFixed(3)}  ·  ${L().integral} ≈ ${number.toFixed(3)}`;
  }
  const signal = x => 0.5 + 0.4 * Math.cos(Math.PI * x / 2);
  function combPlot(state) {
    if (state.grid) {
      const dots = Array.from({ length: 7 }, (_, i) => Array.from({ length: 5 }, (_, j) => `<circle cx="${340 + (i - 3) * state.tau * 45}" cy="${175 + (j - 2) * state.tau * 45}" r="4" fill="#7adbd0"/>`).join("")).join("");
      return `<svg viewBox="0 0 680 350" role="img" aria-label="${html(language === "zh" ? `二维格点 x、y 间距为 ${state.tau}` : `2D lattice spacing ${state.tau} along x and y`)}"><line x1="40" y1="175" x2="640" y2="175" class="axis"/><line x1="340" y1="20" x2="340" y2="330" class="axis"/>${dots}<text x="623" y="166">x</text><text x="346" y="30">y</text><text x="50" y="42">(na, mb),  a = b = ${state.tau.toFixed(2)}</text></svg>`;
    }
    const px = x => 340 + x * 60, py = value => 265 - value * 195;
    const curve = Array.from({ length: 601 }, (_, i) => { const x = -5 + i / 60; return `${px(x).toFixed(1)},${py(signal(x)).toFixed(1)}`; }).join(" ");
    let stems = "";
    for (let n = -Math.floor(5 / state.tau); n <= Math.floor(5 / state.tau); n++) {
      const x = n * state.tau, y = py(signal(x));
      stems += `<line x1="${px(x)}" y1="265" x2="${px(x)}" y2="${y}" class="sample-stem"/><path d="M${px(x) - 5} ${y + 8} L${px(x)} ${y} L${px(x) + 5} ${y + 8}" class="sample-tip"/><circle cx="${px(x)}" cy="${y}" r="3" fill="#efa96b"/>`;
    }
    return `<svg viewBox="0 0 680 350" role="img" aria-label="${html(language === "zh" ? `间距 ${state.tau} 的脉冲列抽样连续曲线` : `Impulse train of spacing ${state.tau} sampling a continuous curve`)}"><line x1="40" y1="265" x2="640" y2="265" class="axis"/><line x1="340" y1="40" x2="340" y2="290" class="axis"/><polyline points="${curve}" class="test-curve"/>${stems}<text x="48" y="40">f(x)=0.5+0.4 cos(πx/2)</text><text x="618" y="280">x</text></svg>`;
  }
  function combReadout(state) {
    return state.grid ? (language === "zh" ? `图示取 a=b=${state.tau.toFixed(2)}；点是理想位置，不是有限半径小孔。` : `Diagram uses a=b=${state.tau.toFixed(2)}; dots mark ideal positions, not finite pinholes.`) : `${L().sample}  τ = ${state.tau.toFixed(2)},  f(τ) = ${signal(state.tau).toFixed(3)}`;
  }

  function renderQuiz() {
    const q = lesson().questions[quizIndex];
    const value = answers[q.id];
    const completed = lesson().questions.filter(item => answers[item.id] === item.answer).length;
    const feedback = value === undefined ? "" : `<div class="quiz-feedback ${value === q.answer ? "right" : "not-right"}" role="status"><strong>${html(value === q.answer ? L().correct : L().wrong)}</strong><p>${html(value < 0 ? (language === "zh" ? "没关系，先看解析，再试一次。" : "That's fine. Read the explanation and retry.") : text(q.explanations[value]))}</p><p><b>${html(L().answer)}：</b>${html(text(q.explanations[q.answer]))}</p><button type="button" data-retry>${html(L().reset)}</button></div>`;
    $("content").innerHTML = `<section class="quiz"><div class="quiz-top"><span class="section-caption">${html(L().practice)}</span><span>${completed} / ${lesson().questions.length}</span></div><div class="quiz-counter">${String(quizIndex + 1).padStart(2, "0")} / ${String(lesson().questions.length).padStart(2, "0")}</div><h2>${html(text(q.stem))}</h2><div class="quiz-options">${q.choices.map((choice, i) => `<button type="button" data-answer="${i}" ${value !== undefined ? "disabled" : ""} class="${value === i ? "picked" : ""}"><span>${String.fromCharCode(65 + i)}</span>${html(text(choice))}</button>`).join("")}</div><button type="button" data-answer="-1" class="unknown" ${value !== undefined ? "disabled" : ""}>${html(L().unknown)}</button>${feedback}<div class="quiz-footer"><button type="button" data-question="prev" ${quizIndex === 0 ? "disabled" : ""}>${html(L().prev)}</button><span>${html(L().saved)}</span><button type="button" data-question="next" ${quizIndex === lesson().questions.length - 1 ? "disabled" : ""}>${html(L().nextQ)} →</button></div></section>`;
  }

  function navigate(id) {
    lessonId = id;
    mode = "explore";
    compareIndex = null;
    quizIndex = 0;
    $("chapter-label").parentElement.open = true;
    if (id.startsWith("1.2")) $("section-label").parentElement.open = true;
    location.hash = `lesson-${id}`;
    render();
    $("main").focus();
    window.scrollTo(0, 0);
  }
  document.addEventListener("click", event => {
    const lessonButton = event.target.closest("[data-lesson]");
    if (lessonButton) return navigate(lessonButton.dataset.lesson);
    const view = event.target.closest("[data-view]");
    if (view) { mode = view.dataset.view; render(); return; }
    const route = event.target.closest("[data-reading]");
    if (route) {
      const target = $(`reading-${route.dataset.reading}`);
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      return;
    }
    const compare = event.target.closest("[data-compare]");
    if (compare) {
      const index = Number(compare.dataset.compare);
      compareIndex = index;
      const stageIndex = lessonId === "1.2.1" ? [2, 0, 3, 3][index] : index;
      lab().stage = stageIndex;
      Object.assign(lab(), guide().stages[stageIndex].preset);
      save(storage.labs, labs);
      const visual = $("content").querySelector(".notes-visual");
      visual.innerHTML = workbenchMarkup(lab());
      renderLabVisual();
      if (matchMedia("(max-width: 1220px)").matches) visual.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      return;
    }
    const returnReading = event.target.closest("[data-return-reading]");
    if (returnReading) {
      const target = $(`reading-${returnReading.dataset.returnReading}`);
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      return;
    }
    const stageButton = event.target.closest("[data-stage]");
    if (stageButton) {
      const index = Number(stageButton.dataset.stage);
      lab().stage = index;
      Object.assign(lab(), guide().stages[index].preset);
      save(storage.labs, labs);
      renderExplore();
      return;
    }
    const stageAnswer = event.target.closest("[data-stage-answer]");
    if (stageAnswer) {
      (lab().stageAnswers ||= {})[lab().stage || 0] = Number(stageAnswer.dataset.stageAnswer);
      save(storage.labs, labs);
      renderExplore();
      return;
    }
    const prediction = event.target.closest("[data-predict]");
    if (prediction) { lab().prediction = Number(prediction.dataset.predict); save(storage.labs, labs); renderExplore(); return; }
    const transfer = event.target.closest("[data-transfer]");
    if (transfer) { lab().transfer = Number(transfer.dataset.transfer); save(storage.labs, labs); renderExplore(); return; }
    const choice = event.target.closest("[data-answer]");
    if (choice) { answers[lesson().questions[quizIndex].id] = Number(choice.dataset.answer); save(storage.answers, answers); renderQuiz(); return; }
    if (event.target.closest("[data-retry]")) { delete answers[lesson().questions[quizIndex].id]; save(storage.answers, answers); renderQuiz(); return; }
    const changeQuestion = event.target.closest("[data-question]");
    if (changeQuestion) { quizIndex += changeQuestion.dataset.question === "next" ? 1 : -1; renderQuiz(); return; }
  });
  $("content").addEventListener("input", event => {
    const control = event.target.closest("[data-lab]");
    if (!control) return;
    const key = control.dataset.lab;
    lab()[key] = control.type === "range" ? Number(control.value) : control.type === "checkbox" ? control.checked : control.value;
    save(storage.labs, labs);
    renderLabVisual();
  });
  const symbolDialog = $("symbol-dialog");
  const symbolMove = $("symbol-move");
  const symbolResize = $("resize-symbols");
  const symbolViewport = () => ({ width: document.documentElement.clientWidth, height: innerHeight, gap: 8 });
  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
  function placeSymbolDialog(left, top) {
    const rect = symbolDialog.getBoundingClientRect();
    const { width, height, gap } = symbolViewport();
    symbolDialog.style.left = `${clamp(left, gap, width - rect.width - gap)}px`;
    symbolDialog.style.top = `${clamp(top, gap, height - rect.height - gap)}px`;
    symbolDialog.style.right = symbolDialog.style.bottom = "auto";
  }
  function sizeSymbolDialog(width, height) {
    const rect = symbolDialog.getBoundingClientRect();
    const { width: vw, height: vh, gap } = symbolViewport();
    const minWidth = Math.min(320, vw - 2 * gap), minHeight = Math.min(240, vh - 2 * gap);
    const left = clamp(rect.left, gap, vw - minWidth - gap);
    const top = clamp(rect.top, gap, vh - minHeight - gap);
    symbolDialog.style.left = `${left}px`;
    symbolDialog.style.top = `${top}px`;
    symbolDialog.style.right = symbolDialog.style.bottom = "auto";
    symbolDialog.style.maxHeight = "calc(100vh - 16px)";
    symbolDialog.style.width = `${clamp(width, minWidth, vw - left - gap)}px`;
    symbolDialog.style.height = `${clamp(height, minHeight, vh - top - gap)}px`;
  }
  $("quick-symbols").addEventListener("click", () => {
    if (symbolDialog.open) return;
    for (const property of ["left", "top", "right", "bottom", "width", "height", "maxHeight"]) symbolDialog.style[property] = "";
    renderSymbols();
    symbolDialog.show();
    symbolMove.focus({ preventScroll: true });
  });
  $("close-symbols").addEventListener("click", () => symbolDialog.close());
  symbolDialog.addEventListener("close", () => $("quick-symbols").focus({ preventScroll: true }));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && symbolDialog.open && !$("cover").open) { event.preventDefault(); symbolDialog.close(); }
  });
  let symbolDrag = null;
  symbolMove.addEventListener("pointerdown", event => {
    if (!event.isPrimary) return;
    const rect = symbolDialog.getBoundingClientRect();
    symbolDrag = { id: event.pointerId, x: event.clientX - rect.left, y: event.clientY - rect.top };
    symbolMove.focus({ preventScroll: true });
    symbolMove.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  symbolMove.addEventListener("pointermove", event => {
    if (symbolDrag?.id === event.pointerId) placeSymbolDialog(event.clientX - symbolDrag.x, event.clientY - symbolDrag.y);
  });
  symbolMove.addEventListener("lostpointercapture", () => { symbolDrag = null; });
  symbolMove.addEventListener("keydown", event => {
    const moves = { ArrowLeft: [-16, 0], ArrowRight: [16, 0], ArrowUp: [0, -16], ArrowDown: [0, 16] };
    if (event.target !== symbolMove || !moves[event.key]) return;
    event.preventDefault();
    const rect = symbolDialog.getBoundingClientRect();
    placeSymbolDialog(rect.left + moves[event.key][0], rect.top + moves[event.key][1]);
  });
  let symbolResizeDrag = null;
  symbolResize.addEventListener("pointerdown", event => {
    if (!event.isPrimary) return;
    const rect = symbolDialog.getBoundingClientRect();
    symbolResizeDrag = { id: event.pointerId, x: event.clientX, y: event.clientY, width: rect.width, height: rect.height };
    symbolResize.focus({ preventScroll: true });
    symbolResize.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  symbolResize.addEventListener("pointermove", event => {
    if (symbolResizeDrag?.id === event.pointerId) sizeSymbolDialog(symbolResizeDrag.width + event.clientX - symbolResizeDrag.x, symbolResizeDrag.height + event.clientY - symbolResizeDrag.y);
  });
  symbolResize.addEventListener("lostpointercapture", () => { symbolResizeDrag = null; });
  symbolResize.addEventListener("keydown", event => {
    const changes = { ArrowLeft: [-16, 0], ArrowRight: [16, 0], ArrowUp: [0, -16], ArrowDown: [0, 16] };
    if (!changes[event.key]) return;
    event.preventDefault();
    const rect = symbolDialog.getBoundingClientRect();
    sizeSymbolDialog(rect.width + changes[event.key][0], rect.height + changes[event.key][1]);
  });
  window.addEventListener("resize", () => {
    if (!symbolDialog.open) return;
    const rect = symbolDialog.getBoundingClientRect();
    if (symbolDialog.style.width || symbolDialog.style.height) sizeSymbolDialog(rect.width, rect.height);
    else if (symbolDialog.style.left) placeSymbolDialog(rect.left, rect.top);
  });
  $("back-to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }));
  const updateBackToTop = () => { $("back-to-top").hidden = window.scrollY < 480; };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  $("language").addEventListener("click", () => { language = language === "zh" ? "en" : "zh"; save(storage.language, language); render(); });
  $("prev").addEventListener("click", () => navigate(lessons[lessons.findIndex(item => item.id === lessonId) - 1].id));
  $("next").addEventListener("click", () => navigate(lessons[lessons.findIndex(item => item.id === lessonId) + 1].id));
  window.addEventListener("hashchange", () => { const id = decodeURIComponent(location.hash.replace(/^#lesson-/, "")); if (byId[id] && id !== lessonId) navigate(id); });
  render();
})();

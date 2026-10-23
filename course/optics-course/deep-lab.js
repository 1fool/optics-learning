/* A shared experiment bench, with a different model, decisions and transfer
   question for each of the 19 non-pilot sections. The original formal quiz is
   intentionally outside this state machine. */
"use strict";
window.OpticsDeepLab = function createDeepLab(root, figure, onMode) {
  const home = figure.parentElement;
  const key = "optics-deep-labs-v1";
  const steps = [["先猜一下", "Predict"], ["动手改变", "Change one thing"], ["对照两次", "Compare readings"],
    ["读懂关系", "Read the relation"], ["连接图与式", "Connect figure and equation"],
    ["认清边界", "Check the model"], ["新情境挑战", "New situation"]];
  let lesson = null, lang = "zh", mode = "experiment", state = null;
  const states = {};
  try { Object.assign(states, JSON.parse(localStorage.getItem(key)) || {}); } catch { /* Optional offline progress. */ }
  const text = pair => pair[lang === "en" ? 1 : 0];
  const t = (zh, en) => lang === "en" ? en : zh;
  const el = (tag, className, value) => {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (value !== undefined) item.textContent = value;
    return item;
  };
  const button = (label, action, className = "lab-button") => {
    const item = el("button", className, label);
    item.type = "button"; item.addEventListener("click", action); return item;
  };
  const persist = () => { try { localStorage.setItem(key, JSON.stringify(states)); } catch { /* Storage is optional. */ } };
  const remember = () => { if (lesson) { states[lesson.code] = state; persist(); } };
  const config = () => window.OpticsDeepLabs[lesson.code];
  const task = () => window.OpticsExplorations[lesson.code];
  function detach() {
    figure.inert = false;
    figure.removeAttribute("aria-hidden");
    if (figure.parentElement !== home) home.insertBefore(figure, home.querySelector(".symbols"));
  }
  function selectMode(next) {
    mode = next;
    if (mode !== "experiment") detach();
    onMode(mode); render();
  }
  function selectStep(next) {
    state.step = next; remember(); render();
    root.querySelector(".lab-task-title")?.focus({ preventScroll: true });
  }
  function setControl([name, value]) {
    const input = figure.querySelector(`#visual-${name}`);
    if (!input) return;
    input.value = value;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    state.observed = true; state.control = [name, value]; remember();
    const status = root.querySelector(".deep-observed");
    if (status) status.textContent = t(`已设置 ${input.previousElementSibling?.textContent || name}：${value}。看看画面和读数。`, `Set ${name} to ${value}. Inspect the scene and readings.`);
  }
  function options(container, labels, current, onSelect, prefix) {
    const group = el("div", "lab-choices");
    labels.forEach((pair, index) => {
      const item = button(text(pair), () => onSelect(index), "lab-choice");
      item.dataset.choice = `${prefix}-${index}`;
      item.setAttribute("aria-pressed", String(current === index)); group.append(item);
    }); container.append(group);
  }
  function feedback(container, message, kind = "discovery") {
    const box = el("p", `lab-feedback ${kind}`, message);
    box.setAttribute("role", "status"); container.append(box);
  }
  function presets(panel, both = false) {
    const row = el("div", "deep-presets");
    config().controls.slice(0, both ? 2 : 1).forEach((preset, index) => {
      row.append(button(index ? t("设置对照条件 B", "Set comparison B") : t("设置条件 A", "Set condition A"), () => setControl(preset), "lab-button"));
    });
    panel.append(row);
    feedback(panel, state.observed ? t("控件已改变。可以反复调节，观察画面和数值。", "A control changed. Adjust it again and inspect the scene and values.") : t("用左侧原生滑块或这里的按钮改变图示；键盘也能操作滑块。", "Use the scene's native sliders or these buttons; sliders also work by keyboard."), "neutral");
    panel.lastElementChild.classList.add("deep-observed");
  }
  function renderTask(panel) {
    const c = config(), q = task(), n = state.step;
    const titles = [q.ask, ["改变图中的关键量", "Change the key quantity"], ["两种条件有什么不同？", "What changed between A and B?"], ["把两次读数连成关系", "Connect the readings"],
      ["连接符号与画面", "Connect symbols to the scene"], ["这幅图没有模拟什么？", "What does this diagram leave out?"], c.challenge[0]];
    panel.append(el("div", "lab-kicker", t(`探索 ${n + 1} / 7`, `DISCOVERY ${n + 1} / 7`)));
    const heading = el("h3", "lab-task-title", text(titles[n])); heading.tabIndex = -1; panel.append(heading);
    if (n === 0) {
      panel.append(el("p", "lab-prompt", t("先作一个可修改的预测；暂不揭晓图中的结果，也不计入正式测验。", "Make a revisable prediction. The scene's result is hidden for now; this does not count toward the formal quiz.")));
      options(panel, q.choices, state.prediction, value => { state.prediction = value; remember(); render(); }, "prediction");
      if (state.prediction !== null) feedback(panel, t("预测已记录。下一步调控件，再对照自己的想法。", "Prediction saved. Change the controls next, then compare with your idea."));
      panel.append(button(t("暂不确定，先试试", "Not sure; try it first"), () => selectStep(1), "lab-text-button"));
    } else if (n === 1) {
      panel.append(el("p", "lab-prompt", text(q.try))); presets(panel);
    } else if (n === 2) {
      panel.append(el("p", "lab-prompt", text(c.compare))); presets(panel, true);
      const reveal = button(t("我比较好了：对照预测", "I compared them: review prediction"), () => { state.compared = true; remember(); render(); }, "lab-button lab-primary");
      panel.append(reveal);
      if (state.compared) feedback(panel, text(q.why) + (state.prediction !== null && state.prediction !== q.answer ? t(" 原预测指向的误区可以再用两种条件核查。", " Check your earlier misconception against both conditions.") : ""));
    } else if (n === 3) {
      panel.append(el("p", "lab-prompt", text(c.relation)));
      const equation = el("div", "lab-equation");
      window.katex.render(c.formula, equation, { displayMode: true, throwOnError: true, output: "htmlAndMathml" });
      panel.append(equation);
      presets(panel, true);
    } else if (n === 4) {
      panel.append(el("p", "lab-prompt", text(c.focus)));
      const chips = el("div", "deep-symbols");
      lesson.symbols.slice(0, 5).forEach((row, i) => {
        chips.append(button(row[0], () => { state.symbol = i; remember(); render(); }, "lab-choice"));
      });
      panel.append(chips);
      if (state.symbol !== null) {
        const row = lesson.symbols[state.symbol];
        feedback(panel, `${row[0]} · ${row[1]} (${row[2]})`);
      }
      panel.append(el("p", "lab-small", text(c.relation)));
    } else if (n === 5) {
      panel.append(el("p", "lab-prompt", text(c.limitQuestion)));
      options(panel, [["是", "Yes"], ["不是", "No"]], state.limitChoice ?? null, value => { state.limitChoice = value; remember(); render(); }, "limit");
      if (state.limitChoice !== undefined && state.limitChoice !== null) {
        const correct = (state.limitChoice === 0) === c.limitAnswer;
        feedback(panel, (correct ? t("判断正确：", "Correct: ") : t("再看图示：", "Recheck the scene: ")) + text(c.focus), correct ? "discovery" : "rethink");
      }
      const note = el("details", "lab-hint");
      note.append(el("summary", "", t("打开本图的条件与局限", "Reveal this figure's assumptions and limits")), el("p", "", window.OpticsExtraVisuals?.[lesson.visual]?.note[lang] || figure.querySelector("figcaption").textContent));
      panel.append(note, el("p", "lab-small", t("图示由给定模型计算，不是仪器实测或对定律的独立证明。", "This is a computed model illustration, not an instrument reading or independent proof.")));
    } else {
      panel.append(el("p", "lab-prompt", text(c.challenge[0])));
      options(panel, c.challenge[1], state.challenge, value => { state.challenge = value; remember(); render(); }, "challenge");
      if (state.challenge !== null) {
        feedback(panel, state.challenge === c.challenge[2] ? t("判断正确。", "Correct. ") + text(c.relation) : t("再想一次：", "Try again: ") + text(c.mistakes[state.challenge]), state.challenge === c.challenge[2] ? "discovery" : "rethink");
        panel.append(button(t("再试一次（隐藏答案）", "Try again (hide answer)"), () => { state.challenge = null; remember(); render(); }, "lab-text-button"));
      }
      panel.append(el("p", "lab-small", t("这题只帮助迁移，不写入正式题的答案。", "This transfer challenge never writes to the formal quiz answers.")));
    }
    const hint = el("details", "lab-hint");
    hint.append(el("summary", "", t("提示 / 操作替代", "Hint / alternative to operating")), el("p", "", n < 3 ? text(q.try) : n === 6 ? text(c.relation) : text(q.why)));
    panel.append(hint);
  }
  function renderRecap() {
    const recap = el("section", "lab-recap");
    recap.append(el("div", "lab-kicker", t("把探索连起来", "CONNECT THE DISCOVERIES")), el("h3", "", text(task().ask)));
    const flow = el("div", "lab-recap-flow");
    for (const [label, content] of [[t("操作", "Change"), task().try], [t("关系", "Relation"), config().relation], [t("边界", "Boundary"), [window.OpticsExtraVisuals?.[lesson.visual]?.note.zh || "图示模型", window.OpticsExtraVisuals?.[lesson.visual]?.note.en || "Schematic model"]]]) {
      const card = el("article", "lab-recap-card"); card.append(el("h4", "", label), el("p", "", text(content))); flow.append(card);
    }
    recap.append(flow);
    const eq = el("div", "lab-equation");
    window.katex.render(config().formula, eq, { displayMode: true, throwOnError: true, output: "htmlAndMathml" }); recap.append(eq);
    const actions = el("div", "lab-recap-actions");
    actions.append(button(t("返回实验", "Back to experiment"), () => selectMode("experiment")), button(t("完整讲义", "Full notes"), () => selectMode("notes")), button(t("正式练习 →", "Formal quiz →"), () => selectMode("quiz"), "lab-button lab-primary"));
    recap.append(actions); root.append(recap);
  }
  function render() {
    if (!lesson) return;
    detach(); root.replaceChildren(); root.dataset.mode = mode; root.dataset.step = state.step;
    const toolbar = el("div", "lab-toolbar");
    toolbar.append(el("span", "lab-edition", t(`${lesson.code} / 本节互动实验`, `${lesson.code} / SECTION LAB`)));
    const tabs = el("div", "lab-tabs");
    for (const [id, zh, en] of [["experiment", "动手探索", "Explore"], ["recap", "图解回顾", "Recap"], ["notes", "完整讲义", "Full notes"], ["quiz", "正式练习", "Formal quiz"]]) {
      const tab = button(t(zh, en), () => selectMode(id), "lab-tab"); tab.dataset.labMode = id; tab.setAttribute("aria-pressed", String(mode === id)); tabs.append(tab);
    }
    root.append(toolbar, tabs);
    if (mode === "recap") { renderRecap(); return; }
    if (mode !== "experiment") {
      root.append(el("p", "lab-mode-note", mode === "notes" ? t("完整讲义保留在下方，可随时切回实验。", "Full notes are below; return to the lab at any time.") : t("正式题沿用原有独立作答记录。", "Formal questions keep their separate answer record.")));
      return;
    }
    const hero = el("div", "lab-hero");
    hero.append(el("h2", "", lesson.title), el("p", "", text(task().try))); root.append(hero);
    const progress = el("nav", "lab-steps"); progress.setAttribute("aria-label", t("实验步骤，可自由回看", "Experiment steps, freely revisitable"));
    steps.forEach((pair, i) => {
      const item = button(`${String(i + 1).padStart(2, "0")} ${text(pair)}`, () => selectStep(i), "lab-step");
      item.dataset.step = i; if (i === state.step) item.setAttribute("aria-current", "step"); progress.append(item);
    }); root.append(progress);
    const bench = el("div", "lab-bench");
    const scene = el("div", "lab-scene");
    scene.append(el("div", "lab-scene-head", t("本节可操作图示 · 非实测", "SECTION MODEL · NOT MEASURED")), el("p", "lab-mobile-mission", text(state.step === 6 ? config().challenge[0] : state.step < 3 ? task().try : config().compare)));
    scene.append(figure);
    const concealed = state.step === 0 || (state.step === 6 && state.challenge === null);
    figure.inert = concealed;
    if (concealed) figure.setAttribute("aria-hidden", "true");
    if (concealed) {
      const cover = el("div", "deep-scene-cover", t("先预测，再看模型读数。可以跳步或看提示。", "Predict first, then reveal model readings. You may skip or use a hint."));
      scene.append(cover);
    }
    const panel = el("section", "lab-task"); renderTask(panel);
    bench.append(scene, panel); root.append(bench);
    const bottom = el("div", "lab-bottom");
    const back = button(t("← 上一步", "← Back"), () => selectStep(state.step - 1)); back.disabled = state.step === 0;
    const next = button(state.step === 6 ? t("图解回顾 →", "See recap →") : t("接着探索 →", "Continue →"), () => state.step === 6 ? selectMode("recap") : selectStep(state.step + 1), "lab-button lab-primary");
    bottom.append(back, el("span", "", t("可跳步、重试、看提示；无计时惩罚。", "Skip, retry, or use hints; no timer.")), next); root.append(bottom);
    const model = el("details", "lab-model");
    model.append(el("summary", "", t("模型与教材来源", "Model and textbook source")), el("p", "", `${t("《物理光学（第5版）》书页", "Physical Optics (5th ed.), book pp.")} ${lesson.pages} / PDF ${lesson.pdf}. ${window.OpticsExtraVisuals?.[lesson.visual]?.note[lang] || ""}`)); root.append(model);
    const current = progress.querySelector('[aria-current="step"]');
    progress.scrollLeft = current.offsetLeft - progress.offsetLeft - (progress.clientWidth - current.clientWidth) / 2;
  }
  return {
    detach,
    show(nextLesson, language, preserve = false) {
      detach(); lesson = nextLesson; lang = language;
      root.hidden = !lesson;
      if (!lesson) return;
      const saved = states[lesson.code];
      state = saved && Number.isInteger(saved.step) && saved.step >= 0 && saved.step < 7 ? saved : { step: 0, prediction: null, challenge: null, limitChoice: null, symbol: null, compared: false, observed: false, control: null };
      if (state.control && !preserve) {
        const input = figure.querySelector(`#visual-${state.control[0]}`);
        if (input) { input.value = state.control[1]; input.dispatchEvent(new Event("input", { bubbles: true })); }
      }
      if (!preserve) mode = "experiment";
      onMode(mode); render();
    },
    setMode: selectMode,
    track(input) {
      if (!lesson || mode !== "experiment" || input.type !== "range") return;
      state.observed = true;
      state.control = [input.id.replace(/^visual-/, ""), Number(input.value)];
      remember();
      const status = root.querySelector(".deep-observed");
      if (status) status.textContent = t("图示已改变；对照前后数值，再继续探索。", "The scene changed; compare the readings before continuing.");
    },
    get mode() { return mode; },
  };
};

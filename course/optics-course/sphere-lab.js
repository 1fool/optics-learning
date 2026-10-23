/* §1.3.1 pilot: predict → measure → explain → transfer.
   Book pp. 12–13 / PDF pp. 22–23. Normalized model, not measured source data.
   This experiment never writes to the formal question/answer store. */
"use strict";
window.OpticsSphereLab = function createSphereLab(root, onMode) {
  const key = "optics-sphere-lab-v1";
  const titles = [
    ["先猜一下", "Make a guess"], ["动手测量", "Take a reading"],
    ["看看分摊", "See the spread"], ["读懂公式", "Read the equation"],
    ["两种读数", "Two readings"], ["认识波面", "Meet a wavefront"],
    ["试试新距离", "Try a new distance"]
  ];
  let state = { step: 0, r: 1, prediction: null, tested: false, challenge: null };
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved) {
      state.step = Number.isInteger(saved.step) && saved.step >= 0 && saved.step < titles.length ? saved.step : 0;
      state.r = Number.isFinite(saved.r) ? Math.min(4, Math.max(1, saved.r)) : 1;
      state.prediction = [0, 1, 2, -1].includes(saved.prediction) ? saved.prediction : null;
      state.tested = saved.tested === true;
      state.challenge = [0, 1, 2].includes(saved.challenge) ? saved.challenge : null;
    }
  } catch { /* The offline experiment also works without storage. */ }
  let language = "zh", mode = "experiment", active = false;
  let paused = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0, time = 0, lastTime = 0, dragging = false;
  let phaseOffset = 0, formulaPart = "area";
  const narrow = matchMedia("(max-width: 760px)");
  const t = (zh, en) => language === "en" ? en : zh;
  const text = pair => pair[language === "en" ? 1 : 0];
  const find = selector => root.querySelector(selector);
  const save = () => { try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* Optional progress. */ } };
  function node(tag, className, value) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (value !== undefined) item.textContent = value;
    return item;
  }
  function button(label, action, className = "lab-button") {
    const item = node("button", className, label);
    item.type = "button";
    item.addEventListener("click", action);
    return item;
  }
  function math(tex) {
    const item = node("div", "lab-equation");
    window.katex.render(tex, item, { displayMode: true, throwOnError: true, strict: "error", output: "htmlAndMathml" });
    return item;
  }
  function stop() { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
  function animate(now) {
    frame = 0;
    if (!active || paused || mode !== "experiment" || document.hidden) return;
    if (lastTime) time += Math.min(now - lastTime, 50) / 1000;
    lastTime = now;
    draw();
    frame = requestAnimationFrame(animate);
  }
  function schedule() {
    stop();
    if (active && !paused && mode === "experiment" && !document.hidden) frame = requestAnimationFrame(animate);
  }
  function setMode(next) {
    mode = next;
    root.dataset.mode = mode;
    onMode(mode);
    render();
  }
  function setStep(step) {
    state.step = step;
    save(); render();
    find(".lab-task-title").focus({ preventScroll: true });
  }
  function setDistance(value) {
    state.r = Math.round(Math.min(4, Math.max(1, value)) * 10) / 10;
    if (state.step === 1 && Math.abs(state.r - 2) < .051) state.tested = true;
    save(); updateReadings(); draw();
  }
  function distanceControls() {
    const panel = node("div", "lab-distance-controls");
    const label = node("label", "lab-range-label");
    label.htmlFor = "lab-distance";
    label.append(node("span", "", t("探测器距光源", "Detector distance")), node("output", "lab-distance-value"));
    const range = node("input"); range.type = "range"; range.id = "lab-distance";
    range.min = "1"; range.max = "4"; range.step = ".1"; range.value = String(state.r);
    range.addEventListener("input", () => setDistance(Number(range.value)));
    const presets = node("div", "lab-presets");
    for (const r of [1, 2, 3, 4]) {
      const preset = button(`${r} m`, () => setDistance(r), "lab-distance-preset");
      preset.dataset.distance = r;
      preset.setAttribute("aria-label", t(`把探测器放到 ${r} 米`, `Place detector at ${r} metres`));
      presets.append(preset);
    }
    panel.append(label, range, presets);
    return panel;
  }
  function options(labels, selected, action, prefix) {
    const group = node("div", "lab-choices");
    labels.forEach((label, index) => {
      const choice = button(label, () => action(index), "lab-choice");
      choice.dataset.choice = `${prefix}-${index}`;
      choice.setAttribute("aria-pressed", String(selected === index));
      group.append(choice);
    });
    return group;
  }
  function feedback(value, kind = "neutral") {
    const box = node("p", `lab-feedback ${kind}`, value);
    box.setAttribute("role", "status");
    return box;
  }
  function renderTask(panel) {
    const titlesByStep = [
      ["离远一倍，读数会剩多少？", "Twice as far. How much remains?"],
      ["把探测器移到 2 m，亲眼看一次。", "Move the detector to 2 m. See for yourself."],
      ["光没消失，只是分给了更大的球面。", "The same power crosses a larger sphere."],
      ["把你刚发现的关系，压缩成一句公式。", "Write your discovery as one equation."],
      ["光强剩四分之一，振幅也一样吗？", "One-quarter intensity. What about amplitude?"],
      ["这些圆圈，究竟代表什么？", "What do these circles represent?"],
      ["不看实时读数，再预测一次。", "Predict again, with live readings hidden."]
    ];
    const heading = node("h3", "lab-task-title", text(titlesByStep[state.step]));
    heading.tabIndex = -1;
    panel.append(node("div", "lab-kicker", t(`探索 ${state.step + 1} / 7`, `DISCOVERY ${state.step + 1} / 7`)), heading);
    if (state.step === 0) {
      panel.append(node("p", "lab-prompt", t("把光源看成向各方向均匀发光的一个点。探测器测每平方米收到的平均光功率；1 m 处记为 100%，移到 2 m 呢？", "Treat the source as a point emitting equally in all directions. The detector measures average power per square metre: 100% at 1 m. What about 2 m?")));
      panel.append(options([t("剩 50%", "50% remains"), t("剩 25%", "25% remains"), t("仍是 100%", "Still 100%")], state.prediction, index => { state.prediction = index; save(); render(); }, "prediction"));
      panel.append(button(t("没想好，先试试", "Not sure. Let's try it."), () => { state.prediction = -1; setStep(1); }, "lab-text-button"));
      if (state.prediction !== null && state.prediction !== -1) panel.append(feedback(t("记下了。不急着判对错，去测一测。", "Prediction noted. Let's measure before judging it.")));
    } else if (state.step === 1) {
      panel.append(node("p", "lab-prompt", t("拖动橙色探测器，或使用下方滑块、距离按钮。只有距离在变，光源没有变弱。", "Drag the orange detector, or use the slider and distance buttons. Only distance changes; source power stays fixed.")));
      panel.append(distanceControls());
      const result = feedback("", "discovery"); result.id = "lab-measure-feedback"; panel.append(result);
      if (state.prediction !== null && state.prediction !== -1) panel.append(node("p", "lab-small", t(`你的预测：${["50%", "25%", "100%"][state.prediction]}。可以随时改想法。`, `Your prediction: ${["50%", "25%", "100%"][state.prediction]}. Changing your mind is welcome.`)));
    } else if (state.step === 2) {
      panel.append(node("p", "lab-prompt", t("每秒穿过整个球面的总能量相同。半径变成两倍，球面积变成四倍；每平方米就只分到四分之一。", "The same total energy crosses each whole sphere every second. Twice the radius gives four times the area, so each square metre receives one quarter.")));
      const comparison = node("div", "lab-area-comparison");
      for (const n of [1, 2]) {
        const card = node("div", "lab-area-card");
        const tiles = node("div", `lab-area-tiles tiles-${n}`);
        for (let i = 0; i < n * n; i++) tiles.append(node("span", "", n === 1 ? "100%" : "25%"));
        card.append(node("strong", "", `${n} m`), tiles, node("span", "", t(`面积 ×${n * n}`, `Area ×${n * n}`)));
        comparison.append(card);
      }
      panel.append(comparison, node("p", "lab-small", t("方格只示意面积比例与功率分摊，不是把球面真的展开成正方形；每格代表相同面积。", "Tiles illustrate equal-area power sharing, not a literal flattening of the sphere.")));
      panel.append(button(t("在图上比较 1 m / 2 m", "Compare 1 m / 2 m in the scene"), () => setDistance(state.r === 2 ? 1 : 2)));
    } else if (state.step === 3) {
      panel.append(node("p", "lab-prompt", t("光强 I，就是总功率 P 分摊到球面积上。点一个标签，把公式和图连起来。", "Intensity I is total power P divided by sphere area. Select a label to connect the equation to the scene.")));
      panel.append(math("I=\\frac{P}{4\\pi r^2}"));
      const pieces = node("div", "lab-formula-parts");
      for (const [part, label] of [["power", t("P · 总功率", "P · total power")], ["area", t("4πr² · 球面积", "4πr² · sphere area")], ["intensity", t("I · 光强", "I · intensity")]]) {
        const item = button(label, () => { formulaPart = part; render(); }, "lab-choice");
        item.dataset.part = part; item.setAttribute("aria-pressed", String(part === formulaPart)); pieces.append(item);
      }
      panel.append(pieces, feedback(formulaPart === "power" ? t("P 是光源每秒发出的总能量，单位 W；移动探测器不改变它。", "P is emitted energy per second, in W. Moving the detector does not change it.") : formulaPart === "area" ? t("r 是到点源的距离（m）；4πr² 是整张球壳的面积（m²），不是圆面积 πr²。", "r is distance from the point source (m). 4πr² is the whole sphere area (m²), not the disk area πr².") : t("I 的单位是 W/m²。右侧仪表显示它相对 1 m 参考值的百分比，不是眼睛感觉的亮度。", "I is measured in W/m². The meter shows its percentage of the 1 m reference, not perceived brightness.")));
    } else if (state.step === 4) {
      panel.append(node("p", "lab-prompt", t("振幅 A 是场振动的最大大小，不是能量读数。同一介质中，光强与振幅的平方成正比。", "Amplitude A is the maximum field oscillation, not an energy reading. In the same medium, intensity is proportional to amplitude squared.")));
      panel.append(distanceControls(), math("\\frac{A(r)}{A(1\\,\\mathrm{m})}=\\frac{1\\,\\mathrm{m}}{r}"));
      panel.append(feedback(t("在 2 m：振幅是 50%，光强是 50% 的平方，也就是 25%。试试另一个距离。", "At 2 m: amplitude is 50%; intensity is its square, 25%. Try another distance."), "discovery"));
    } else if (state.step === 5) {
      panel.append(node("p", "lab-prompt", t("波面是振动进度相同的位置组成的面。图中圆圈是球壳的截面；两个青色标记同半径、同相位，不是光粒子的轨道。", "A wavefront joins positions at the same oscillation phase. Circles are sections of spherical shells. The two teal markers share radius and phase; they are not particle paths.")));
      panel.append(button(t("向前走 1/4 个周期", "Advance by 1/4 cycle"), () => { paused = true; time = 0; phaseOffset = (phaseOffset + .25) % 1; render(); }));
      panel.append(feedback(t("每按一次，同相位球壳向外移。外移的是振动的图样，不是整层物质。传播快慢已刻意放慢。", "Each press moves the equal-phase shells outward. An oscillation pattern travels, not a material shell. Propagation is deliberately slowed.")));
      panel.append(node("p", "lab-small", t("这是标量、各向均匀点源模型；真实偶极子辐射还随方向改变。完整波函数与逐步验算可在“完整讲义”查看。", "This is an isotropic scalar point-source model. Real dipole radiation also depends on direction. See Full notes for the wave function and its verification.")));
    } else {
      panel.append(node("p", "lab-prompt", t("现在把探测器放在 3 m。同一个光源、同一种介质：光强和场振幅各剩多少？", "The detector is now at 3 m. Same source, same medium: what fractions of intensity and field amplitude remain?")));
      panel.append(options([t("光强 1/3，振幅 1/9", "Intensity 1/3; amplitude 1/9"), t("光强 1/9，振幅 1/3", "Intensity 1/9; amplitude 1/3"), t("两者都剩 1/3", "Both are 1/3")], state.challenge, index => { state.challenge = index; save(); render(); }, "challenge"));
      if (state.challenge !== null) {
        panel.append(feedback(state.challenge === 1 ? t("对！面积变成 9 倍，光强剩 1/9；振幅是它的平方根，剩 1/3。你已经能预测一个新位置了。", "Yes! Nine times the area gives 1/9 intensity. Amplitude is its square root, 1/3. You predicted a new position.") : state.challenge === 0 ? t("两种读数交换了。先看面积：半径 ×3，面积 ×9，所以能量读数是 1/9；再对光强比例开平方得到振幅 1/3。", "The readings were swapped. Radius ×3 means area ×9, so intensity is 1/9. Its square root gives amplitude 1/3.") : t("振幅判断对了，但光强不是同样下降。它与振幅的平方成正比，所以是 (1/3)² = 1/9。", "Amplitude is right, but intensity does not fall by the same factor. It scales with amplitude squared: (1/3)² = 1/9."), state.challenge === 1 ? "discovery" : "rethink"));
        panel.append(button(t("再想一次（隐藏答案）", "Try again (hide the answer)"), () => { state.challenge = null; save(); render(); }, "lab-text-button"));
      }
      panel.append(button(t("提示：先想球面积怎样变", "Hint: start with sphere area"), () => {
        const hint = find(".lab-challenge-hint"); hint.hidden = !hint.hidden;
      }, "lab-text-button"));
      const hint = node("p", "lab-challenge-hint lab-feedback", t("半径乘 3，球面积乘 3 × 3。相同功率分摊到这些面积上。", "Radius ×3 gives sphere area ×3×3. The same power is shared over that area."));
      hint.hidden = true; panel.append(hint);
      panel.append(node("p", "lab-small", t("这是实验内的练习，不改写原有正式题的答案。还想确认自己理解了吗？可以进入正式练习。", "This experiment does not overwrite formal quiz answers. Use the formal questions for a further check.")));
    }
    if (state.step < 6) {
      const hint = node("details", "lab-hint");
      hint.append(node("summary", "", t("需要一点提示？", "Need a hint?")), node("p", "", text([
        ["先保留一个猜测就好。接下来用相同的探测器比较两个位置。", "Keep a tentative guess. Next, compare two positions with the same detector."],
        ["点 2 m 按钮也能移动探测器。把这里的读数和 1 m 时比较。", "The 2 m button also moves the detector. Compare that reading with 1 m."],
        ["不要只看距离翻倍：球面同时在两个面积方向上变大。", "Doubling radius expands the surface area in two dimensions."],
        ["分子是要分的总功率，分母是分给它的总面积。", "The numerator is total power; the denominator is the area sharing it."],
        ["先把距离设成 2 m，对比两种读数：50% × 50% = 25%。", "Set 2 m and compare: 50% × 50% = 25%."],
        ["用单步按钮暂停观察：两个同半径标记的振动进度始终一致。", "Step while paused: equal-radius markers always have the same oscillation phase."]
      ][state.step])));
      panel.append(hint);
    }
  }
  function renderRecap(panel) {
    panel.append(node("div", "lab-kicker", t("把发现连起来", "CONNECT YOUR DISCOVERIES")), node("h3", "", t("带走三幅图，不用带走一屏文字。", "Take away three pictures, not a wall of text.")));
    const flow = node("div", "lab-recap-flow");
    const diagrams = [
      '<circle cx="53" cy="60" r="19" fill="none" stroke="#526e35" stroke-width="2"/><circle cx="53" cy="60" r="38" fill="none" stroke="#526e35" stroke-width="2"/><circle cx="53" cy="60" r="4" fill="#526e35"/><path d="M109 60h30m-7-6 7 6-7 6" fill="none" stroke="#526e35" stroke-width="2"/><rect x="154" y="28" width="28" height="28" fill="#526e35"/><g fill="#d2dfb5" stroke="#526e35"><rect x="188" y="28" width="28" height="28"/><rect x="154" y="62" width="28" height="28"/><rect x="188" y="62" width="28" height="28"/></g>',
      '<path d="M18 84h202" stroke="#526e35"/><rect x="40" y="20" width="28" height="64" fill="#526e35"/><rect x="77" y="52" width="28" height="32" fill="#526e35"/><rect x="137" y="20" width="28" height="64" fill="#ad7039"/><rect x="174" y="68" width="28" height="16" fill="#ad7039"/><g fill="#314522" font-size="12" font-family="sans-serif"><text x="69" y="104" text-anchor="middle">A: 1 → ½</text><text x="169" y="104" text-anchor="middle">I: 1 → ¼</text></g>',
      '<g fill="none" stroke="#526e35"><circle cx="120" cy="58" r="21"/><circle cx="120" cy="58" r="38" stroke-width="2"/><circle cx="120" cy="58" r="51" stroke-dasharray="3 3"/></g><circle cx="120" cy="58" r="4" fill="#526e35"/><g fill="#2e7770"><circle cx="120" cy="20" r="5"/><circle cx="158" cy="58" r="5"/></g><path d="M179 58h25m-7-6 7 6-7 6" fill="none" stroke="#526e35" stroke-width="2"/>'
    ];
    for (const [index, [big, title, copy]] of [
      ["r × 2 → S × 4", t("同样的功率，分给更大面积", "Same power, more area"), t("没有吸收，也会因几何扩散而减弱。", "Geometric spreading reduces intensity even without absorption.")],
      ["I × ¼  /  A × ½", t("能量读数 ≠ 场振幅", "Intensity ≠ field amplitude"), t("同一介质中，光强随场振幅的平方变化。", "In the same medium, intensity scales with amplitude squared.")],
      ["◎ → ◎", t("同一球壳，同一振动进度", "One shell, one phase"), t("圆圈是球面截面，向外移动的是等相位图样。", "Circles are sphere sections; an equal-phase pattern travels outward.")]
    ].entries()) {
      const card = node("article", "lab-recap-card");
      const diagram = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      diagram.setAttribute("viewBox", "0 0 240 115"); diagram.setAttribute("aria-hidden", "true");
      diagram.innerHTML = diagrams[index];
      card.append(diagram, node("div", "lab-recap-symbol", big), node("h4", "", title), node("p", "", copy)); flow.append(card);
    }
    panel.append(flow, math("I(r)/I(r_0)=(r_0/r)^2,\\qquad A(r)/A(r_0)=r_0/r"));
    panel.append(node("p", "lab-small", t("r₀ 是参考距离，S 是球面积。固定光源、同一均匀无吸收介质，r、r₀ > 0。各向均匀标量模型不是完整矢量偶极子辐射解。", "r₀ is the reference distance; S is sphere area. Fixed source, same uniform nonabsorbing medium, r and r₀ > 0. This isotropic scalar model is not a full vector dipole radiation solution.")));
    panel.append(node("p", "", t("下一步 1.3.2：如果探测器排在平面而不是球壳上，它们的振动进度还相同吗？", "Next, §1.3.2: if detectors form a plane instead of a shell, will they still have the same phase?")));
    const actions = node("div", "lab-recap-actions");
    actions.append(button(t("再玩一次实验", "Return to experiment"), () => setMode("experiment")), button(t("完整波函数与推导", "Full wave function and derivation"), () => setMode("notes")), button(t("正式练习 →", "Formal questions →"), () => setMode("quiz"), "lab-button lab-primary")); panel.append(actions);
  }
  function render() {
    stop();
    root.replaceChildren(); root.dataset.mode = mode; root.dataset.step = state.step;
    root.setAttribute("aria-label", t("球面波互动实验", "Spherical wave interactive experiment"));
    const toolbar = node("div", "lab-toolbar");
    toolbar.append(node("span", "lab-edition", t("1.3.1 / 球面波实验室 · 样章", "1.3.1 / SPHERICAL WAVE LAB · PILOT")));
    const tabs = node("div", "lab-tabs"); tabs.setAttribute("aria-label", t("学习方式", "Learning view"));
    for (const [id, zh, en] of [["experiment", "动手探索", "Explore"], ["recap", "图解回顾", "Recap"], ["notes", "完整讲义", "Full notes"], ["quiz", "正式练习", "Formal quiz"]]) {
      const tab = button(t(zh, en), () => setMode(id), "lab-tab"); tab.dataset.labMode = id;
      tab.setAttribute("aria-pressed", String(mode === id)); tabs.append(tab);
    }
    root.append(toolbar, tabs);
    if (mode === "recap") {
      const recap = node("section", "lab-recap"); renderRecap(recap); root.append(recap); return;
    }
    if (mode !== "experiment") {
      root.append(node("p", "lab-mode-note", mode === "notes" ? t("完整内容保留在下方。随时切回实验，已做的探索不会丢失。", "The complete notes remain below. Return to the experiment without losing your discoveries.") : t("原有题目和作答记录原样保留；实验内的预测不会替你作答。", "Original questions and saved answers are preserved. Experiment predictions do not answer them for you."))); return;
    }
    const hero = node("div", "lab-hero");
    hero.append(node("h2", "", t("追光，不追公式。", "Follow the light. Find the rule.")), node("p", "", t("移动一个探测器，弄懂光为什么越远越弱。", "Move one detector. Discover why light spreads and weakens.")));
    root.append(hero);
    const progress = node("nav", "lab-steps"); progress.setAttribute("aria-label", t("实验步骤，可自由回看", "Experiment steps, freely revisitable"));
    titles.forEach((title, i) => {
      const step = button(`${String(i + 1).padStart(2, "0")} ${text(title)}`, () => setStep(i), "lab-step");
      step.dataset.step = i;
      if (i === state.step) step.setAttribute("aria-current", "step"); progress.append(step);
    }); root.append(progress);
    const currentStep = progress.querySelector('[aria-current="step"]');
    progress.scrollLeft = currentStep.offsetLeft - progress.offsetLeft - (progress.clientWidth - currentStep.clientWidth) / 2;
    const bench = node("div", "lab-bench");
    const stage = node("div", "lab-scene");
    const sceneHead = node("div", "lab-scene-head");
    sceneHead.append(node("span", "", t("点源探测台", "POINT-SOURCE BENCH")), node("span", "lab-live", t("各向均匀 · 无吸收", "ISOTROPIC · NO ABSORPTION"))); stage.append(sceneHead);
    const mobileMissions = [
      ["先猜：探测器到 2 m，读数剩多少？", "Predict: what reading will we get at 2 m?"],
      ["任务：把探测器移到 2 m，比较读数。", "Target: move to 2 m and compare the reading."],
      ["看球面变大，功率怎样分摊。", "See how a larger sphere shares the power."],
      ["点下方标签，把公式和图连起来。", "Use the labels below to connect formula and scene."],
      ["振幅是场振动的最大大小。对比两种读数。", "Amplitude is the maximum field oscillation. Compare the two readings."],
      ["看两个青色标记：同半径、同相位。", "Watch the teal markers: equal radius, equal phase."],
      ["新挑战：预测 3 m 处的光强和场振幅。", "New challenge: predict intensity and amplitude at 3 m."]
    ];
    stage.append(node("p", "lab-mobile-mission", text(mobileMissions[state.step])));
    const canvas = node("canvas", "lab-canvas"); canvas.id = "sphere-lab-canvas";
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", t("同心球面截面与橙色探测器；可用下方距离控件代替拖动", "Concentric sphere sections and orange detector; use distance controls instead of dragging")); stage.append(canvas);
    const readings = node("div", "lab-meters");
    for (const [id, label] of [["radius", t("距光源", "Distance")], ["intensity", t("相对光强", "Relative intensity")], ["amplitude", t("相对场振幅", "Relative field amplitude")]]) {
      const item = node("div", "lab-meter"); item.dataset.meter = id;
      item.append(node("span", "", label), node("strong", `lab-${id}-reading`, "—")); readings.append(item);
    }
    stage.append(readings);
    const sceneActions = node("div", "lab-scene-actions");
    sceneActions.append(button(paused ? t("播放波面", "Play wavefronts") : t("暂停波面", "Pause wavefronts"), () => { paused = !paused; render(); }, "lab-scene-button"));
    sceneActions.append(button(t("重做实验", "Restart experiment"), () => { state = { step: 0, r: 1, prediction: null, tested: false, challenge: null }; time = 0; phaseOffset = 0; save(); render(); }, "lab-scene-button"));
    stage.append(sceneActions, node("p", "lab-scene-note", t("固定功率 · 1 m 参考读数 = 100% · 探测面正对径向能流。圆圈为球面截面，动画已放慢。", "Fixed power · 1 m reference = 100% · Detector faces radial power flow. Circles are sphere sections; motion is slowed.")));
    const panel = node("section", "lab-task"); renderTask(panel);
    const distancePanel = panel.querySelector(".lab-distance-controls");
    if (narrow.matches && distancePanel) stage.insertBefore(distancePanel, sceneActions);
    bench.append(stage, panel); root.append(bench);
    const bottom = node("div", "lab-bottom");
    const back = button(t("← 上一步", "← Back"), () => setStep(state.step - 1)); back.disabled = state.step === 0;
    const forward = button(state.step === 6 ? t("整理我的发现 →", "Review my discoveries →") : state.step === 0 ? t("去测一测 →", "Let's measure →") : t("接着探索 →", "Keep exploring →"), () => state.step === 6 ? setMode("recap") : setStep(state.step + 1), "lab-button lab-primary");
    bottom.append(back, node("span", "", t("可以跳步、回看、用提示；没有倒计时。", "Skip, revisit, or use hints. No timer.")), forward); root.append(bottom);
    const model = node("details", "lab-model");
    model.append(node("summary", "", t("模型与来源 · 不把模拟当实测", "Model and source · simulation, not measurement")), node("p", "", t("《物理光学（第5版）》书页 12–13 / PDF 22–23。假设固定功率的各向均匀点源、同一均匀无吸收介质、r > 0；参考距离 1 m，光强与振幅分别对各自在参考处的值归一化。本实验不包含吸收、真实光源尺寸或偶极子方向性。用给定模型计算的图示帮助理解，不构成对定律的实验证明。", "Physical Optics (5th ed.), book pp. 12–13 / PDF pp. 22–23. Fixed-power isotropic point source, same uniform nonabsorbing medium, r > 0. Reference distance is 1 m; intensity and amplitude are separately normalized to their reference values. Absorption, finite source size and dipole directivity are excluded. Computed illustrations explain the assumed model; they are not experimental proof."))); root.append(model);
    canvas.addEventListener("pointerdown", event => {
      if (![1, 4].includes(state.step)) return;
      const rect = canvas.getBoundingClientRect(), geometry = sceneGeometry(rect.width, rect.height);
      if (Math.hypot(event.clientX - rect.left - geometry.cx - state.r * geometry.unit, event.clientY - rect.top - geometry.cy) > 30) return;
      dragging = true; canvas.setPointerCapture(event.pointerId); canvas.classList.add("dragging");
    });
    canvas.addEventListener("pointermove", event => {
      if (!dragging) return;
      const rect = canvas.getBoundingClientRect(), geometry = sceneGeometry(rect.width, rect.height);
      setDistance((event.clientX - rect.left - geometry.cx) / geometry.unit);
    });
    const release = () => { dragging = false; canvas.classList.remove("dragging"); };
    canvas.addEventListener("pointerup", release); canvas.addEventListener("pointercancel", release); canvas.addEventListener("lostpointercapture", release);
    updateReadings(); draw(); schedule();
  }
  function updateReadings() {
    if (mode !== "experiment") return;
    const r = state.step === 6 ? 3 : state.step === 0 ? 1 : state.r;
    const hidden = state.step === 6 && state.challenge === null;
    find(".lab-radius-reading").textContent = `${r.toFixed(1)} m`;
    find(".lab-intensity-reading").textContent = hidden ? "?" : `${(100 / (r * r)).toFixed(1)}%`;
    find(".lab-amplitude-reading").textContent = hidden ? "?" : `${(100 / r).toFixed(1)}%`;
    find('[data-meter="amplitude"]').hidden = state.step < 4;
    const range = find("#lab-distance");
    if (range) {
      range.value = state.r;
      range.setAttribute("aria-valuetext", `${state.r.toFixed(1)} ${t("米", "metres")}`);
      find(".lab-distance-value").textContent = `${state.r.toFixed(1)} m`;
      for (const preset of root.querySelectorAll(".lab-distance-preset")) preset.setAttribute("aria-pressed", String(Number(preset.dataset.distance) === state.r));
    }
    const result = find("#lab-measure-feedback");
    if (result) result.textContent = state.tested ? t("测到了：2 m 时只剩 25%。功率没变，那光去哪儿了？下一步看看。", "Measured: 25% at 2 m. Source power stayed fixed. Where did the light go? See next.") : t("目标：把探测器放到 2 m。留意右侧读数怎么变。", "Target: put the detector at 2 m. Watch the intensity reading change.");
  }
  function sceneGeometry(w, h) { return { cx: w * .44, cy: h * .5, unit: Math.min(w * .112, h * .115) }; }
  function draw() {
    const canvas = find("canvas"); if (!canvas || !active || mode !== "experiment") return;
    const rect = canvas.getBoundingClientRect(), w = rect.width, h = rect.height;
    if (!w || !h) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
    const ctx = canvas.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
    const { cx, cy, unit } = sceneGeometry(w, h);
    const r = state.step === 6 ? 3 : state.step === 0 ? 1 : state.r;
    const radius = r * unit;
    const circle = (x, y, rad, color, width = 1) => { ctx.beginPath(); ctx.arc(x, y, rad, 0, 2 * Math.PI); ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke(); };
    const label = (value, x, y, color = "#a9b8cb", size = 12, align = "center") => { ctx.fillStyle = color; ctx.font = `500 ${size}px 'Microsoft YaHei UI',sans-serif`; ctx.textAlign = align; ctx.fillText(value, x, y); };
    // The decorative grid sits behind this transparent canvas on the scene.
    const offset = (time * .35 + phaseOffset) % 1;
    for (let i = 0; i < 5; i++) {
      const rr = (i + offset) * unit;
      if (rr < 3 || rr > unit * 4.3) continue;
      circle(cx, cy, rr, `rgba(173,213,239,${.3 - i * .035})`);
    }
    ctx.fillStyle = state.step === 3 && formulaPart === "area" ? "#d3f58316" : "#d3f58306";
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, 2 * Math.PI); ctx.fill();
    circle(cx, cy, radius, "#d3f583", 1.5);
    ctx.beginPath(); ctx.ellipse(cx, cy, radius, radius * .3, -.28, 0, 2 * Math.PI); ctx.strokeStyle = "#d3f58366"; ctx.stroke();
    circle(cx, cy, unit, "#ffffff4d");
    ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + 4 * unit, cy); ctx.strokeStyle = "#718299"; ctx.stroke(); ctx.setLineDash([]);
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32); glow.addColorStop(0, "#fff7b7cc"); glow.addColorStop(1, "#fff7b700"); ctx.fillStyle = glow; ctx.fillRect(cx - 32, cy - 32, 64, 64);
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, 2 * Math.PI); ctx.fillStyle = "#fff5bd"; ctx.fill();
    label(t("点光源", "Point source"), cx - 16, cy + 25, "#ece4c5", 11, "right");
    for (let i = 1; i <= 4; i++) { ctx.fillStyle = "#78899c"; ctx.fillRect(cx + i * unit - .5, cy + 23, 1, 5); label(`${i}`, cx + i * unit, cy + 42); }
    label(t("距离 / m", "Distance / m"), cx + 2.7 * unit, cy + 61, "#91a3b8", 11);
    const detectorX = cx + radius;
    ctx.fillStyle = "#ffb875"; ctx.beginPath(); ctx.roundRect(detectorX - 7, cy - 18, 14, 36, 4); ctx.fill();
    circle(detectorX, cy, 25, "#ffb87555");
    label(t("探测器", "Detector"), detectorX, cy - 35, "#ffd1a4");
    label(state.step === 6 && state.challenge === null ? "?" : `${(100 / (r * r)).toFixed(1)}%`, detectorX, cy - 54, "#fff0d9", 16);
    if (state.step === 1 && h > 250) label(t("← 拖动 →", "← drag →"), detectorX, cy + 88, "#e2b98e", 11);
    if (state.step === 5) {
      const shell = (1.65 + offset) * unit;
      circle(cx, cy, shell, "#72e2dd", 2);
      for (const [index, angle] of [-Math.PI * .32, -Math.PI * .75].entries()) {
        const x = cx + shell * Math.cos(angle), y = cy + shell * Math.sin(angle);
        ctx.beginPath(); ctx.arc(x, y, 5, 0, 2 * Math.PI); ctx.fillStyle = "#72e2dd"; ctx.fill();
        label(String(index + 1), x - 13, y + 4, "#b6f8f1", 11);
        // Equal-radius scalar probes have identical phase and amplitude.
        const value = Math.cos(2 * Math.PI * (1.65 + offset - (time * .35 + phaseOffset)));
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 18 * value); ctx.strokeStyle = "#72e2dd"; ctx.lineWidth = 3; ctx.stroke();
      }
      label(t("同半径的两点 · 同相位", "Equal radius · equal phase"), w * .5, 28, "#88ede4", 12);
    } else if (state.step === 4) {
      const y = h - 20, width = w * .26;
      for (const [start, amplitude, color] of [[w * .08, 14, "#b6c5db"], [w * .62, 14 / r, "#d3f583"]]) {
        ctx.beginPath();
        for (let i = 0; i <= 90; i++) { const x = start + width * i / 90, yy = y - amplitude * Math.sin(i / 90 * 4 * Math.PI - time * 2); i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
      }
      label(t("参考振幅", "Reference A"), w * .21, h - 43, "#b6c5db", 11);
      label(t("当前振幅", "Current A"), w * .75, h - 43, "#d3f583", 11);
    } else {
      label(t("整张球壳：总功率相同", "WHOLE SHELL · SAME TOTAL POWER"), w * .5, 28, "#bdd497", 12);
    }
  }
  const resize = new ResizeObserver(() => draw()); resize.observe(root);
  narrow.addEventListener("change", () => { if (active) render(); });
  document.addEventListener("visibilitychange", () => schedule());
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", event => { if (event.matches) { paused = true; if (active) render(); } });
  return {
    show(isActive, nextLanguage, preserveMode = false) {
      active = isActive; language = nextLanguage; root.hidden = !active;
      if (!active) { stop(); return; }
      if (!preserveMode) mode = "experiment";
      onMode(mode); render();
    },
    setMode,
    get mode() { return mode; }
  };
};

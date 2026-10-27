/* Small shared data constructors. Load section files in textbook order. */
(() => {
  const pair = (zh, en) => ({ zh, en });
  const formula = (title, before, tex, after) => ({ title: pair(...title), before: pair(...before), tex, after: pair(...after) });
  const question = (id, stem, choices, answer, explanations) => ({ id, stem: pair(...stem), choices: choices.map(c => pair(...c)), answer, explanations: explanations.map(c => pair(...c)) });
  const symbol = (tex, meaning, unit, condition, control) => ({ tex, meaning: pair(...meaning), unit: pair(...unit), condition: pair(...condition), control });
  const p = pair;
  const stage = (title, task, preset, choices, answer, feedback) => ({ title: p(...title), task: p(...task), preset, choices: choices.map(item => p(...item)), answer, feedback: feedback.map(item => p(...item)) });
  const step = (build, example, next, proof) => ({ build: p(...build), example: p(...example), next: p(...next), proof: [{ lead: p(...proof[0]), tex: proof[1], read: p(...proof[2]) }] });
  const sym = (tex, zh, en, unitZh = "无量纲演示", unitEn = "dimensionless demo", conditionZh = "未指定", conditionEn = "not specified", control) => ({ tex, meaning: p(zh, en), unit: p(unitZh, unitEn), condition: p(conditionZh, conditionEn), control });
  const block = (title, before, tex, after, build, example, next, proofLead, proofTex, proofRead) => ({ note: { title: p(...title), before: p(...before), tex, after: p(...after) }, guide: { build: p(...build), example: p(...example), next: p(...next), proof: [{ lead: p(...proofLead), tex: proofTex, read: p(...proofRead) }] } });
  const q = (id, stem, choices, answer, explanations) => ({ id: `fo-${id}`, stem: p(...stem), choices: choices.map(v => p(...v)), answer, explanations: explanations.map(v => p(...v)) });
  const origin = { a: 1, x0: 0, family: "rect" };
  const P = pair;
  let questionIndex = 0;
  const S = (title, task, model, initial, controls, choices, answer, feedback, insight, next, tex = "") => {
    const offset = questionIndex++ % choices.length;
    const order = choices.map((_, i) => (i + offset) % choices.length);
    return { title: P(...title), task: P(...task), model, initial, controls,
      choices: order.map(i => P(...choices[i])), answer: order.indexOf(answer),
      feedback: order.map(i => P(...feedback[i])), insight: P(...insight), next: P(...next), tex };
  };
  const commonSymbols = [sym("x", "卷积输出位移或理想点位置", "Convolution output lag or ideal point position", "长度", "length", "图中无量纲", "Dimensionless chart", "x0"), sym("\\tau", "卷积积分坐标", "Convolution integration coordinate", "长度", "length"), sym("f", "输入函数或信号", "Input function or signal", "依模型定义", "model-dependent"), sym("h", "卷积核／响应", "Convolution kernel / response", "依模型定义", "model-dependent"), sym("a", "可调窗宽；余弦时为周期", "Window width; cosine period in power example", "长度", "length", "a>0", "a>0", "a")];
  const corrSymbols = [sym("x", "相关的相对位移", "Correlation lag", "长度", "length", "图中无量纲", "Dimensionless chart"), sym("\\xi", "积分扫描坐标", "Integration coordinate", "长度", "length"), sym("f,g", "待比较信号", "Signals compared", "依模型定义", "model-dependent"), sym("g^{*}", "g 的复共轭（并非相关运算符）", "Complex conjugate of g (not correlation operator)", "与 g 相同", "same as g"), sym("a", "窗口宽度或余弦周期", "Window width or cosine period", "长度", "length", "a>0", "a>0", "a")];
  window.FourierSectionBuilders = { pair, formula, question, symbol, p, stage, step, sym, block, q, origin, P, S, commonSymbols, corrSymbols };
  window.FourierSectionRuntime = {};
  window.FourierLessons = [];
  window.FourierGuides = {};
  window.FourierSectionSymbolOverrides = {};
  window.FourierIndependentLabData = {};
  window.FourierIndependentRecaps = {};
  window.FourierIndependentNotes = { setups: {}, preludes: {}, before: {}, supplements: {}, extraProof: {}, next: {} };
})();

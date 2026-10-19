"use strict";
let language = "zh";
try { if (localStorage.getItem("optics-course-language") === "en") language = "en"; } catch { /* Local files can disable storage. */ }
let chapters = language === "en" ? window.OpticsCourseChaptersEn : window.OpticsCourseChapters;
const collectLessons = () => chapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ ...lesson, chapterCode: chapter.code, chapterTitle: chapter.title, sourcePdf: chapter.pdf })));
let lessons = collectLessons();
const collectQuestions = () => lessons.flatMap((lesson, lessonIndex) => lesson.questions.map((question, index) => ({ ...question, id: question.id || `${lesson.code}:q${index + 1}`, lessonIndex })));
let questionBank = collectQuestions();
const $ = (id) => document.getElementById(id);
const visual = window.OpticsVisuals($("visual"), $("visual-controls"), $("visual-caption"));
const localize = (zh, en) => language === "en" ? en : zh;
const sphereLab = window.OpticsSphereLab($("sphere-lab"), (mode) => {
  document.body.dataset.labMode = mode;
  $("lesson-reading").hidden = mode !== "notes";
  document.querySelector(".lesson-actions").hidden = mode !== "notes";
  $("quiz").hidden = mode !== "notes" && mode !== "quiz";
  document.querySelector(".footer").hidden = mode !== "notes";
});
const deepLab = window.OpticsDeepLab($("deep-lab"), document.querySelector(".stage"), (mode) => {
  document.body.dataset.deepMode = mode;
  $("lesson-reading").hidden = mode !== "notes";
  document.querySelector(".lesson-actions").hidden = mode !== "notes";
  $("quiz").hidden = mode !== "notes" && mode !== "quiz";
  document.querySelector(".footer").hidden = mode !== "notes";
});
$("visual-controls").addEventListener("input", event => deepLab.track(event.target));
const englishStatic = {
  brand: "Visual Optics Course", "brand-subtitle": "Physical Optics · Chapter course", "top-note": "Cross-check the book · Offline · Extendable source", sections: "sections",
  "hero-title": "From electromagnetic fields to optical interfaces", "hero-copy": "How do wavefronts spread, sources radiate, and interfaces split light? Explore §§1.1–1.6 with figures, step-by-step derivations, and immediate quizzes. This is not the entire book.",
  "pilot-entry": "Try the new pilot: spherical wave experiment →",
  "rail-title": "Physical Optics · Contents", "rail-note": "First visit: ask a question → observe → build the equations → explain the idea yourself → practise. Open full derivations and symbol references when you need them; no formula memorization required upfront.", "rail-quiz": "Practice this section ↓",
  "bridge-kicker": "WHAT CAME BEFORE · THIS SECTION · WHAT COMES NEXT", "bridge-title": "Where this fits: previous and next sections (reference)",
  "symbols-kicker": "LOOK UP WHEN NEEDED", "symbols-title": "Look up a symbol: full section reference", "symbols-note": "Values come from this section's examples or stated assumptions. A dash means no value was given, not a universal constant.",
  symbol: "Symbol", meaning: "Meaning", unit: "Usual unit", value: "Value / condition here", observe: "Observe and interact", reset: "Reset figure", "previous-lesson": "← Previous section",
  "quiz-kicker": "CHECK · ONE SECTION AT A TIME", "quiz-title": "Answer, review, then continue", "quiz-intro": "Try the verbal concept check above before these section questions. For derivation questions, open the relevant detailed explanation first. Choose 'I don't know' if needed; explanations appear immediately after submission.", "quiz-number": "Section question",
  choose: "Choose one answer", submit: "Submit and see explanation", retry: "Try this question again", "previous-question": "← Previous question",
  footer: "Based on Chapter 1, §§1.1–1.6 of Physical Optics (5th ed.), book pp. 3–29 (PDF pp. 13–39). Explanations and questions are original reorganizations, not verbatim copies. Each section states its assumptions, distinguishing scalar approximations, radiation far fields, nonabsorbing media, and real sources. The next batch is §1.7, Total internal reflection, not developed here."
};
const originalStatic = new Map([...document.querySelectorAll("[data-i18n]")].map((node) => [node, node.textContent]));
function renderStaticLanguage() {
  document.documentElement.lang = language === "en" ? "en" : "zh-CN";
  document.title = localize("物理光学 · 1.1—1.6 系统学习", "Physical Optics · §§1.1–1.6");
  $("site-home").textContent = localize("← 网站首页", "← Site home");
  for (const [node, chinese] of originalStatic) node.textContent = language === "en" ? englishStatic[node.dataset.i18n] : chinese;
  $("lang-toggle").textContent = language === "en" ? "中文" : "English";
  $("lang-toggle").setAttribute("aria-label", localize("Switch to English", "切换到中文"));
  $("lesson-nav").setAttribute("aria-label", localize("课程目录", "Course contents"));
}
renderStaticLanguage();
const storedKey = "optics-course-answers-v3";
let currentLesson = 0;
let currentQuestion = 0;
let draft = null;
let answers = Array(questionBank.length).fill(null);
try {
  const saved = JSON.parse(localStorage.getItem(storedKey));
  // v2 had exactly these seven sections, in this order. Never reinterpret later indices.
  const legacyCodes = ["1.1", "1.2.1", "1.2.2", "1.2.3", "1.2.4", "1.2.5", "1.2.6"];
  const legacy = saved ? null : JSON.parse(localStorage.getItem("optics-course-answers-v2"));
  answers = questionBank.map((question) => {
    const code = lessons[question.lessonIndex].code;
    const oldIndex = legacyCodes.indexOf(code) * 3 + Number(question.id.split(":q")[1]) - 1;
    const entry = saved?.[question.id] ?? (legacyCodes.includes(code) && Array.isArray(legacy) ? legacy[oldIndex] : null);
    return entry && Number.isInteger(entry.choice) && entry.choice >= -1 && entry.choice < question.choices.length ? { choice: entry.choice } : null;
  });
} catch { /* Opening a file may disable local storage. The lesson still works. */ }
function persist() { try { localStorage.setItem(storedKey, JSON.stringify(Object.fromEntries(questionBank.map((question, i) => [question.id, answers[i]])))); } catch { /* No persistent storage available. */ } }
function element(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}
function lessonQuestionIndices() {
  return questionBank.flatMap((question, index) => question.lessonIndex === currentLesson ? [index] : []);
}
function appendSubscripts(container, formula) {
  const subscript = /([A-Za-z])_\{([^}]+)\}/g;
  let start = 0;
  for (const match of formula.matchAll(subscript)) {
    container.append(document.createTextNode(formula.slice(start, match.index) + match[1]));
    container.append(element("sub", "", match[2]));
    start = match.index + match[0].length;
  }
  container.append(document.createTextNode(formula.slice(start)));
}
function appendFormulaTokens(container, formula) {
  // Recognize units before fractions: otherwise "rad/s" contains a false "d/s" fraction.
  const tokens = /(?<![A-Za-z])(?:rad\/(?:m|s)|[VACFHuHm]\/(?:m|s)(?:[²³])?|Hz|nm|rad)(?![A-Za-z])|(?<![A-Za-z])(∂²?[A-Za-z][̃₀-₉]?|[0-9]+π?|iπ|[A-Za-zλνωμπ][₀-₉]?|√\([^()]*\))\/(∂[A-Za-z][²³]?|dt|√\([^()]*\)|[A-Za-zλνωμπ][₀-₉²³]?|[0-9]+π?)/g;
  let start = 0;
  for (const match of formula.matchAll(tokens)) {
    appendSubscripts(container, formula.slice(start, match.index));
    if (!match[1]) {
      container.append(element("span", "unit", match[0]));
    } else {
      const wrapper = element("span", "math-fraction");
      wrapper.setAttribute("role", "math");
      wrapper.setAttribute("aria-label", localize(`${match[2]} 分之 ${match[1]}`, `${match[1]} over ${match[2]}`));
      const top = element("span");
      const bottom = element("span");
      appendSubscripts(top, match[1]);
      appendSubscripts(bottom, match[2]);
      wrapper.append(top, bottom);
      container.append(wrapper);
    }
    start = match.index + match[0].length;
  }
  appendSubscripts(container, formula.slice(start));
}
function appendFormula(container, formula) {
  if (formula.includes("$")) {
    let offset = 0;
    for (const match of formula.matchAll(/\$([^$]+)\$/g)) {
      appendFormula(container, formula.slice(offset, match.index));
      const math = element("span", "math-inline math-typeset");
      window.katex.render(match[1], math, { throwOnError: true, strict: "error", output: "htmlAndMathml" });
      container.append(math);
      offset = match.index + match[0].length;
    }
    if (offset) { appendFormula(container, formula.slice(offset)); return; }
  }
  let start = 0;
  for (const match of formula.matchAll(/⟦([^⟧]+)⟧/g)) {
    appendFormulaTokens(container, formula.slice(start, match.index));
    const math = element("strong", "math-inline");
    appendFormulaTokens(math, match[1]);
    container.append(math);
    start = match.index + match[0].length;
  }
  appendFormulaTokens(container, formula.slice(start));
}
function formulaParagraph(content, className = "") {
  const paragraph = element("p", className);
  appendFormula(paragraph, content);
  return paragraph;
}
function renderNavigation(revealCurrent = false) {
  const nav = $("lesson-nav");
  if (nav.dataset.language !== language) {
    const expanded = new Map([...nav.querySelectorAll("details")].map((branch) => [branch.dataset.code, branch.open]));
    nav.replaceChildren();
    let lessonIndex = 0;
    for (const chapter of chapters) {
      const branches = new Map();
      const addBranch = (code, title, parent, isChapter = false) => {
        const branch = element("details", isChapter ? "nav-chapter" : "nav-section");
        branch.dataset.code = code;
        branch.open = expanded.get(code) ?? isChapter;
        const summary = element("summary", "nav-disclosure");
        const label = element("span", "nav-branch-label");
        label.append(element("span", "nav-code", isChapter ? localize(`第 ${code} 章`, `Chapter ${code}`) : code), element("strong", "nav-label", title));
        const chevron = element("span", "nav-chevron");
        chevron.setAttribute("aria-hidden", "true");
        summary.append(label, chevron);
        const children = element("div", "nav-children");
        branch.append(summary, children);
        parent.append(branch);
        branches.set(code, children);
        return children;
      };
      addBranch(chapter.code, chapter.title, nav, true);
      for (const lesson of chapter.lessons) {
        const parts = lesson.code.split(".");
        for (let depth = 2; depth < parts.length; depth++) {
          const code = parts.slice(0, depth).join(".");
          if (!branches.has(code)) addBranch(code, chapter.sectionTitles?.[code] || localize("学习小节", "Sections"), branches.get(parts.slice(0, depth - 1).join(".")));
        }
        const button = element("button", "nav-lesson");
        button.type = "button";
        button.dataset.lessonIndex = lessonIndex;
        button.append(element("span", "nav-code", lesson.code), element("span", "nav-label", lesson.title));
        const index = lessonIndex++;
        button.addEventListener("click", () => showLesson(index, true));
        branches.get(parts.slice(0, -1).join(".")).append(button);
      }
    }
    nav.dataset.language = language;
  }
  nav.querySelectorAll(".nav-lesson").forEach((button) => {
    const current = Number(button.dataset.lessonIndex) === currentLesson;
    button.removeAttribute("aria-current");
    if (!current) return;
    button.setAttribute("aria-current", "step");
    if (revealCurrent) {
      for (let branch = button.closest("details"); branch; branch = branch.parentElement.closest("details")) branch.open = true;
    }
  });
}
function formulaLocations(ref) {
  return lessons.flatMap((lesson, lessonIndex) => lesson.blocks.flatMap((block, blockIndex) => (block.eq || []).flatMap((line, lineIndex) =>
    typeof line === "object" && line.ref === ref ? [{ lessonIndex, blockIndex, lineIndex }] : [])));
}
function goToFormula(target) {
  if (currentLesson !== target.lessonIndex) showLesson(target.lessonIndex);
  if (lessons[currentLesson].code === "1.3.1") sphereLab.setMode("notes");
  else deepLab.setMode("notes");
  const equation = $(`formula-${target.lessonIndex}-${target.blockIndex}-${target.lineIndex}`);
  for (let parent = equation.parentElement; parent; parent = parent.parentElement) {
    if (parent.tagName === "DETAILS") parent.open = true;
  }
  equation.focus({ preventScroll: true });
  equation.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
}
function appendFormulaLinks(equations, ref, blockIndex, lineIndex) {
  const destinations = formulaLocations(ref).filter((location) => location.lessonIndex !== currentLesson || location.blockIndex !== blockIndex || location.lineIndex !== lineIndex);
  if (!destinations.length) return;
  const links = element("div", "formula-links");
  const destinationButton = (target) => {
    const lesson = lessons[target.lessonIndex];
    const button = element("button", "formula-link", `§${lesson.code} · ${guidedText(guidedLesson(lesson).blocks[target.blockIndex].title)} ↗`);
    button.type = "button";
    button.addEventListener("click", () => goToFormula(target));
    return button;
  };
  if (destinations.length === 1) {
    links.append(element("span", "", localize("同式速查：", "Same formula: ")), destinationButton(destinations[0]));
  } else {
    const chooser = element("details", "formula-chooser");
    chooser.append(element("summary", "", localize(`同式速查 · 选择位置（${destinations.length}）`, `Same formula · Choose a location (${destinations.length})`)));
    const options = element("div", "formula-options");
    destinations.forEach((target) => options.append(destinationButton(target)));
    chooser.append(options);
    links.append(chooser);
  }
  const review = element("details", "formula-review");
  review.append(element("summary", "", localize("跨节复习：同一公式还在哪出现（初学可略过）", "Review across sections: other uses of this formula (optional)")), links);
  equations.append(review);
}
function guidedLesson(lesson) { return window.OpticsGuidedLessons[lesson.code]; }
function guidedText(pair) { return pair[language === "en" ? 1 : 0]; }
function renderLearningPath(lesson) {
  const guide = guidedLesson(lesson);
  const start = $("learning-start");
  start.replaceChildren(element("div", "section-kicker", localize("先不背公式 · 从一个问题开始", "NO FORMULAS TO MEMORIZE · START WITH A QUESTION")), element("h3", "", guidedText(guide.question)));
  start.querySelector("h3").id = "learning-question";
  start.append(formulaParagraph(guidedText(guide.setup)));
  const terms = element("dl", "first-terms");
  for (const term of guide.terms) terms.append(element("dt", "", guidedText(term.name)), element("dd", "", guidedText(term.meaning)));
  start.append(terms);
  const route = element("ol", "learning-route");
  for (const [i, block] of guide.blocks.entries()) {
    const link = element("a", "", guidedText(block.title));
    link.href = `#reading-${lesson.code}-${i}`;
    link.addEventListener("click", event => {
      event.preventDefault();
      const target = $(`reading-${lesson.code}-${i}`);
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
    const item = element("li"); item.append(link); route.append(item);
  }
  start.append(route);
  const observation = $("observation-guide");
  observation.replaceChildren(element("strong", "", localize("先看图，只做这一件事：", "Start with the figure. Try this: ")), formulaParagraph(guidedText(guide.observe)));
  const recap = $("learning-recap");
  recap.replaceChildren(element("h3", "", localize("停一下：不用公式，你能解释了吗？", "Pause: can you explain it without an equation?")));
  recap.querySelector("h3").id = "recap-title";
  recap.append(formulaParagraph(guidedText(guide.check.question)));
  const answer = element("details", "self-check");
  answer.append(element("summary", "", localize("先自己说一遍，再展开参考解释", "Explain it yourself, then open the suggested answer")), formulaParagraph(guidedText(guide.check.answer)));
  recap.append(answer, formulaParagraph(guidedText(guide.next), "next-connection"));
}
// Eight different marginalia shapes, not eight copies of one framed animal card.
const readingSurprises = ["expression", "dialogue", "pointer", "scene", "note", "progress", "teacher", "reflection"];
const readingArt = {
  expression: [
    `<circle cx="76" cy="69" r="42"/><path d="M51 61q10-11 20 0m19 0q10-11 20 0M59 85q18 12 36-1"/><path d="M125 28q16-23 29-2 3 10-10 19-7 6-7 13m0 10v2"/><path d="m17 35 8-5m129 66 8 5"/>`,
    `<path d="M42 48 34 24l23 11q19-9 38 0l23-11-8 24q12 35-12 53-20 14-42 0-24-18-14-53Z"/><circle cx="66" cy="65" r="3"/><circle cx="92" cy="65" r="3"/><path d="m76 79 4 4 4-4m-5 4q-9 12-18 0m19 0q9 12 18 0M64 29l2-12m27 12 2-12"/>`
  ],
  dialogue: `<circle cx="40" cy="69" r="21"/><path d="M21 63 17 51l13 3m30 0 13-3-4 13M32 71h2m18 0h2M36 83q9 7 16 0M40 91v17m0 0-13 12m13-12 15 12m-27-17-9 7m30-7 9 7"/>`,
  pointer: `<path d="M15 72q51-47 112-18" stroke-dasharray="5 7"/><path d="m116 39 18 19-25 6"/><path d="M137 59q7-3 10 2l8 12 7-12q4-5 9 0l-6 24q-4 13-22 13l-13-18q-3-7 4-9l10 8"/><path d="m32 91 5 9 9-5m102-76 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/>`,
  scene: [
    `<path d="M9 118h44V99h43V80h42V61h42"/><path d="M55 86q-3-28 18-29 20 0 21 29-16 20-39 0Z" fill="#d6e8e4"/><ellipse cx="75" cy="76" rx="11" ry="17" fill="#fffdf7"/><circle cx="69" cy="64" r="2"/><circle cx="81" cy="64" r="2"/><path d="m72 70 4 5 4-5m-11 30 9 5m3-5 8 5M140 51l5-7 6 7"/>`,
    `<path d="M12 109q40-8 80 0t80 0M45 102q8-15 27-8 20 7 21 15M71 81q-8-24 7-31l6 15 17-2 7-13q15 14 4 31-15 18-41 0Z" fill="#f7e4d3"/><circle cx="82" cy="77" r="2"/><circle cx="99" cy="77" r="2"/><path d="M104 64q23-28 45-23m0 0q20 10 1 33m-3-2q9 9 17-2-11-1-17 2Z"/>`
  ],
  note: `<path d="M44 17q-12-17-17 0-6 16 6 23l10-21q4-9-2-11-7-3-9 5"/><path d="m126 91 12-10m-83-4 9 5m64-43 5-8"/>`,
  progress: `<path d="M15 95h152" stroke-dasharray="5 6"/><path d="M75 71q-2-28 24-46 25 20 22 46l-23 10Z" fill="#e5f0ed"/><circle cx="99" cy="52" r="7"/><path d="m78 60-13 16 22-2m31-14 13 16-22-2m-17 9-2 12m10-12v15m9-16 4 13"/><circle cx="24" cy="95" r="4"/><circle cx="160" cy="95" r="4"/>`,
  teacher: `<rect x="31" y="28" width="84" height="70" rx="22" fill="#e5f0ed"/><path d="M73 28V16m-7 0h14M42 50h62m-53 19h1m38 0h1M58 83q15 10 28 0M31 59H20v18h11m84-18h11v18h-11M49 98l-5 15m52-15 5 15"/><circle cx="52" cy="69" r="3"/><circle cx="92" cy="69" r="3"/>`,
  reflection: `<path d="M37 60q-19-11-18-25 2-19 24-20 10-17 34-11 14 3 19 17 22 1 25 21 1 17-19 25H53l-10 12-2-17Z"/><path d="M63 40q1-13 13-12 13 2 9 14-2 5-8 8m0 9v1M129 105l31-44 8 6-31 44-12 5Z"/>`
};
const readingPrompt = {
  dialogue: [["先找出这一步用到的条件。", "Find the assumptions used in this step."], ["这一步别跳：它接住了什么？", "Don't skip this step: what does it build on?"]],
  note: [["先看条件，再看结论。", "Read the assumptions before the result."], ["回看上一块，再读这一块。", "Look back one block before reading on."]],
  teacher: [["试着用自己的话解释这一步。", "Try explaining this step in your own words."], ["这一步要回答什么问题？", "What question does this step answer?"]],
  reflection: [["想一想：这一步为什么成立？", "Think: why does this step follow?"], ["想一想：这一块的关键依据是什么？", "Think: what supports this step?"]]
};
const readingSurpriseOffset = Math.floor(Math.random() * readingSurprises.length);
const readingSurpriseByLesson = new Map();
function readingDoodle(lesson, index) {
  if (!readingSurpriseByLesson.has(lesson.code)) {
    const lessonIndex = lessons.findIndex(item => item.code === lesson.code);
    readingSurpriseByLesson.set(lesson.code, lesson.blocks.length > 1 && Math.random() < .7 ? {
      step: 1 + Math.floor(Math.random() * (lesson.blocks.length - 1)),
      kind: readingSurprises[(lessonIndex + readingSurpriseOffset) % readingSurprises.length],
      variant: Math.floor(lessonIndex / readingSurprises.length) % 2
    } : null);
  }
  const surprise = readingSurpriseByLesson.get(lesson.code);
  if (!surprise || surprise.step !== index) return null;
  const { kind, variant } = surprise;
  const decorative = ["expression", "pointer", "scene"].includes(kind);
  const margin = element(decorative ? "figure" : "aside", "reading-doodle");
  margin.dataset.kind = kind;
  if (decorative) margin.setAttribute("aria-hidden", "true");
  const art = element("div", "reading-doodle-art");
  art.innerHTML = `<svg viewBox="0 0 180 125" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round">${Array.isArray(readingArt[kind]) ? readingArt[kind][variant] : readingArt[kind]}</g></svg>`;
  margin.append(art);
  if (kind === "progress") {
    margin.append(element("span", "reading-doodle-text", localize(`讲义第 ${index + 1} / ${lesson.blocks.length} 步`, `Notes step ${index + 1} / ${lesson.blocks.length}`)));
  } else if (!decorative) {
    margin.append(element("span", "reading-doodle-text", guidedText(readingPrompt[kind][variant])));
  }
  return margin;
}
function renderBlocks(lesson) {
  const container = $("lesson-content");
  container.replaceChildren();
  for (const [index, block] of lesson.blocks.entries()) {
    const guide = guidedLesson(lesson).blocks[index];
    const role = block.steps ? "derivation-card" : index === 0 ? "intro-card" : index === lesson.blocks.length - 1 ? "closing-card" : "";
    const card = element("section", `reading-card ${role}`.trim());
    card.id = `reading-${lesson.code}-${index}`;
    card.tabIndex = -1;
    card.append(element("div", "section-kicker", localize(`第 ${index + 1} 步`, `STEP ${index + 1}`)), element("h3", "", guidedText(guide.title)));
    const doodle = readingDoodle(lesson, index);
    if (doodle) card.append(doodle);
    card.append(formulaParagraph(guidedText(guide.before), "concept-before"));
    const depth = element("details", "depth-notes");
    depth.append(element("summary", "", guide.advanced ? localize("进阶验算：展开完整方程、条件与计算", "Advanced check: full equations, assumptions and calculation") : localize("继续深挖：条件、详细解释与逐步推导", "Go deeper: assumptions, details and step-by-step derivation")));
    for (const paragraph of block.text || []) depth.append(formulaParagraph(paragraph));
    if (block.steps) {
      const list = element("ol", "proof");
      for (const [lead, description] of block.steps) {
        const item = element("li");
        const content = element("div");
        content.append(element("strong", "", lead));
        appendFormula(content, description);
        item.append(content);
        list.append(item);
      }
      depth.append(list);
    }
    if (block.eq?.length) {
      const equations = element("div", "equations");
      for (const [lineIndex, line] of block.eq.entries()) {
        if (guide.eqLead?.[lineIndex]) equations.append(formulaParagraph(guidedText(guide.eqLead[lineIndex]), "equation-lead"));
        const source = typeof line === "string" ? line : line.text;
        for (const formula of source.split("；").map((part) => part.trim()).filter(Boolean)) {
          const equation = element("div", "equation");
          if (line.tex) window.katex.render(formula, equation, { displayMode: true, throwOnError: true, strict: "error", output: "htmlAndMathml" });
          else appendFormula(equation, formula);
          if (line.ref) {
            equation.id = `formula-${currentLesson}-${index}-${lineIndex}`;
            equation.tabIndex = -1;
          }
          equations.append(equation);
        }
        if (line.ref) appendFormulaLinks(equations, line.ref, index, lineIndex);
      }
      (guide.advanced ? depth : card).append(equations);
    }
    card.append(formulaParagraph(guidedText(guide.read), "formula-reading"));
    card.append(depth);
    if (block.note) card.append(element("p", "reading-note", localize("模型边界：", "Model boundary: ") + block.note));
    container.append(card);
  }
  const rows = $("symbol-rows");
  rows.replaceChildren();
  for (const symbol of lesson.symbols) {
    const row = element("tr");
    for (const [fieldIndex, field] of [...symbol.slice(0, 3), symbol[3] || "—"].entries()) {
      const cell = element("td");
      if (fieldIndex === 2) cell.className = "symbol-unit";
      appendSubscripts(cell, field);
      row.append(cell);
    }
    rows.append(row);
  }
}
function renderSymbolDialog(lesson) {
  document.querySelector(".quick-tools").setAttribute("aria-label", localize("学习快捷工具", "Learning shortcuts"));
  $("quick-symbols").querySelector(".quick-label").textContent = localize("本节符号", "Section symbols");
  $("back-to-top").setAttribute("aria-label", localize("返回顶部", "Back to top"));
  $("back-to-top").title = localize("返回顶部", "Back to top");
  $("close-symbols").querySelector(".close-label").textContent = localize("关闭", "Close");
  document.querySelector(".symbol-dialog-heading").title = localize("拖动标题移动卡片；聚焦后可用方向键微调", "Drag the heading to move the card; use arrow keys when focused");
  $("symbol-dialog-title").textContent = localize(`§${lesson.code} · 本节符号`, `§${lesson.code} · Symbols`);
  $("symbol-dialog-note").textContent = localize("拖动标题可移动卡片，拖动右下角可调整大小；关闭再打开恢复默认。数值只适用于本节示例；“—”表示未指定。窄屏可左右滑动表格。", "Drag the heading to move, or the lower-right corner to resize. Closing and reopening restores the default. Values apply only to this section's examples; “—” means unspecified. Swipe the table on narrow screens.");
  $("resize-symbols").setAttribute("aria-label", localize("调整符号卡片大小；方向键微调", "Resize the symbol card; use arrow keys for small adjustments"));
  $("resize-symbols").title = localize("拖动调整大小，方向键微调", "Drag to resize; use arrow keys to adjust");
  const head = $("symbol-dialog-head");
  head.replaceChildren();
  for (const label of [localize("符号", "Symbol"), localize("含义", "Meaning"), localize("单位", "Unit"), localize("本节条件", "Here")]) {
    const cell = element("th", "", label); cell.scope = "col"; head.append(cell);
  }
  const rows = $("symbol-dialog-rows");
  rows.replaceChildren();
  for (const symbol of lesson.symbols) {
    const row = element("tr");
    for (const field of [...symbol.slice(0, 3), symbol[3] || "—"]) {
      const cell = element("td"); appendSubscripts(cell, field); row.append(cell);
    }
    rows.append(row);
  }
  if (symbolDialog.open && symbolDialog.style.left) {
    const rect = symbolDialog.getBoundingClientRect();
    clampSymbolDialog(rect.left, rect.top);
  }
}
const symbolDialog = $("symbol-dialog");
const symbolHeading = document.querySelector(".symbol-dialog-heading");
const symbolResize = $("resize-symbols");
const clampSymbolDialog = (left, top) => {
  const rect = symbolDialog.getBoundingClientRect();
  symbolDialog.style.left = `${Math.max(8, Math.min(left, innerWidth - rect.width - 8))}px`;
  symbolDialog.style.top = `${Math.max(8, Math.min(top, innerHeight - rect.height - 8))}px`;
  symbolDialog.style.right = symbolDialog.style.bottom = "auto";
  symbolDialog.style.margin = "0";
};
$("quick-symbols").addEventListener("click", () => {
  if (symbolDialog.open) return;
  for (const property of ["left", "top", "right", "bottom", "margin", "width", "height", "maxHeight"]) symbolDialog.style[property] = "";
  symbolDialog.show();
  symbolHeading.focus({ preventScroll: true });
});
$("close-symbols").addEventListener("click", () => $("symbol-dialog").close());
symbolDialog.addEventListener("close", () => $("quick-symbols").focus({ preventScroll: true }));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && symbolDialog.open) { event.preventDefault(); symbolDialog.close(); }
});
let symbolDrag = null;
symbolHeading.addEventListener("pointerdown", event => {
  if (!event.isPrimary || event.target.closest("button")) return;
  const rect = symbolDialog.getBoundingClientRect();
  symbolDrag = { id: event.pointerId, x: event.clientX - rect.left, y: event.clientY - rect.top };
  symbolHeading.setPointerCapture(event.pointerId);
  event.preventDefault();
});
symbolHeading.addEventListener("pointermove", event => {
  if (symbolDrag?.id === event.pointerId) clampSymbolDialog(event.clientX - symbolDrag.x, event.clientY - symbolDrag.y);
});
symbolHeading.addEventListener("lostpointercapture", () => { symbolDrag = null; });
symbolHeading.addEventListener("keydown", event => {
  const moves = { ArrowLeft: [-16, 0], ArrowRight: [16, 0], ArrowUp: [0, -16], ArrowDown: [0, 16] };
  if (event.target !== symbolHeading || !moves[event.key]) return;
  event.preventDefault();
  const rect = symbolDialog.getBoundingClientRect();
  clampSymbolDialog(rect.left + moves[event.key][0], rect.top + moves[event.key][1]);
});
const resizeSymbolDialog = (width, height) => {
  const rect = symbolDialog.getBoundingClientRect();
  symbolDialog.style.maxHeight = "calc(100vh - 16px)";
  symbolDialog.style.width = `${Math.max(Math.min(300, innerWidth - 16), Math.min(width, innerWidth - rect.left - 8))}px`;
  symbolDialog.style.height = `${Math.max(Math.min(340, innerHeight - 16), Math.min(height, innerHeight - rect.top - 8))}px`;
  clampSymbolDialog(rect.left, rect.top);
};
let symbolResizeDrag = null;
symbolResize.addEventListener("pointerdown", event => {
  if (!event.isPrimary) return;
  const rect = symbolDialog.getBoundingClientRect();
  clampSymbolDialog(rect.left, rect.top);
  symbolResizeDrag = { id: event.pointerId, x: event.clientX, y: event.clientY, width: rect.width, height: rect.height };
  symbolResize.setPointerCapture(event.pointerId);
  event.preventDefault();
});
symbolResize.addEventListener("pointermove", event => {
  if (symbolResizeDrag?.id === event.pointerId) resizeSymbolDialog(symbolResizeDrag.width + event.clientX - symbolResizeDrag.x, symbolResizeDrag.height + event.clientY - symbolResizeDrag.y);
});
symbolResize.addEventListener("lostpointercapture", () => { symbolResizeDrag = null; });
symbolResize.addEventListener("keydown", event => {
  const changes = { ArrowLeft: [-16, 0], ArrowRight: [16, 0], ArrowUp: [0, -16], ArrowDown: [0, 16] };
  if (!changes[event.key]) return;
  event.preventDefault();
  const rect = symbolDialog.getBoundingClientRect();
  clampSymbolDialog(rect.left, rect.top);
  resizeSymbolDialog(rect.width + changes[event.key][0], rect.height + changes[event.key][1]);
});
window.addEventListener("resize", () => {
  if (symbolDialog.open && symbolDialog.style.left) {
    const rect = symbolDialog.getBoundingClientRect();
    if (symbolDialog.style.height) resizeSymbolDialog(rect.width, rect.height);
    clampSymbolDialog(rect.left, rect.top);
  }
});
$("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
});
const updateBackToTop = () => { $("back-to-top").hidden = window.scrollY < 480; };
window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();
const visualNames = {
  maxwell: "旋度与电磁耦合", solution: "右行与左行脉冲", periods: "空间波长 / 时间周期",
  wavefronts: "波矢量与等相位面", phasor: "复平面相量与实部", amplitude: "空间复振幅相位", orthogonal: "E、B、k 的空间关系"
};
const visualNamesEn = {
  maxwell: "Curl and electromagnetic coupling", solution: "Right- and left-going pulses", periods: "Spatial wavelength / temporal period",
  wavefronts: "Wavevector and equal-phase planes", phasor: "Complex phasor and real part", amplitude: "Spatial complex-amplitude phase", orthogonal: "Spatial relation among E, B, and k"
};
const lessonThemes = { spherical: "geometry", sphericalPhase: "phase", cylindrical: "geometry", sources: "motion", dipole: "field", energy: "field", packets: "phase", boundary: "phase", snell: "geometry", fresnel: "field", fresnelDiscussion: "phase", power: "field", brewster: "geometry", maxwell: "foundation", solution: "motion", periods: "motion", wavefronts: "geometry", phasor: "phase", amplitude: "phase", orthogonal: "field" };
function showLesson(index, scroll = false, preserveVisual = false) {
  deepLab.detach();
  const revealNavigation = index !== currentLesson || !$("lesson-nav").childElementCount;
  currentLesson = index;
  const lesson = lessons[index];
  document.querySelector(".content").dataset.theme = lessonThemes[lesson.visual];
  document.querySelector(".content").dataset.layout = lesson.code.startsWith("1.3") ? "atlas" : lesson.code.startsWith("1.4") ? "radiation" : lesson.code === "1.5" ? "boundary" : lesson.code.startsWith("1.6") ? "interface" : "classic";
  try { localStorage.setItem("optics-course-last-section", lesson.code); } catch { /* Optional location memory. */ }
  try { history.replaceState(null, "", `#lesson-${lesson.code}`); } catch { /* Some file viewers restrict history. */ }
  $("lesson-code").textContent = localize(`第 ${lesson.chapterCode} 章 / ${lesson.code} · 书页 ${lesson.pages}`, `Chapter ${lesson.chapterCode} / §${lesson.code} · book pp. ${lesson.pages}`);
  $("lesson-title").textContent = lesson.title;
  $("lesson-overview").textContent = guidedText(guidedLesson(lesson).question);
  const bridge = $("bridge-content");
  bridge.replaceChildren();
  for (const [label, description] of [[localize("承接", "Previously"), lesson.bridge.previous], [localize("本节", "Here"), lesson.bridge.current], [localize("下一步", "Next"), lesson.bridge.next]]) {
    const item = element("p");
    item.append(element("strong", "", `${label}：`), document.createTextNode(description));
    bridge.append(item);
  }
  $("source-link").textContent = localize(`书页 ${lesson.pages} · PDF 第 ${lesson.pdf} 页（教材未随网站提供）`, `Book pp. ${lesson.pages} · PDF p. ${lesson.pdf} (book not hosted)`);
  $("source-link").removeAttribute("href");
  const goals = $("lesson-goals");
  goals.replaceChildren();
  goals.append(element("strong", "", localize("学完能做：", "Learning goals:")));
  for (const goal of lesson.goals) goals.append(element("span", "", goal));
  const figure = window.OpticsExtraVisuals?.[lesson.visual];
  $("visual-title").textContent = figure ? figure.title[language] : (language === "en" ? visualNamesEn : visualNames)[lesson.visual];
  if (!preserveVisual) visual.setMode(lesson.visual);
  $("toggle-motion").hidden = figure?.animated === false;
  $("visual-note").textContent = figure ? figure.note[language] : lesson.visual === "orthogonal" ? localize("拖动画布或用方向键旋转。蓝线为 vB，不是以 T 为单位的 B 原值。此控件固定模型波长改变 n，因此动画频率随 v 变；它不模拟同一束光穿过静止界面。", "Drag or use arrow keys to rotate. The blue line shows vB, not the numerical value of B in tesla. This control varies n at fixed model wavelength, so animation frequency changes with v; it does not model the same beam crossing a stationary interface.") : localize("图形只说明该节特定关系；颜色、像素长度和动画快慢不代表真实光学单位。", "The figure illustrates this section's relation. Color, pixel length, and animation speed are not physical optical units.");
  $("toggle-motion").textContent = visual.paused ? localize("播放动画", "Play animation") : localize("暂停动画", "Pause animation");
  renderLearningPath(lesson);
  renderBlocks(lesson);
  renderSymbolDialog(lesson);
  currentQuestion = lessonQuestionIndices()[0];
  draft = null;
  renderQuestion();
  renderNavigation(revealNavigation);
  $("previous-lesson").disabled = index === 0;
  $("lesson-quiz").textContent = localize(`练本节的 ${lesson.questions.length} 道题 ↓`, `Practice ${lesson.questions.length} questions from this section ↓`);
  $("next-lesson").textContent = index === lessons.length - 1 ? localize("练本节的题 →", "Practice this section →") : localize("下一节 →", "Next section →");
  const isSample = lesson.code === "1.3.1";
  const quizIntro = document.querySelector('[data-i18n="quiz-intro"]');
  quizIntro.textContent = isSample ? localize("实验里的预测不会替你填写这些题。这里还会检查源点处的模型边界和完整波函数；不熟悉时，可先切到“完整讲义”。每题可选“我不知道”。", "Experiment predictions do not fill these answers. These questions also cover the source-point model limit and full wave function; open Full notes if needed. You can choose 'I don't know'.") : language === "en" ? englishStatic["quiz-intro"] : originalStatic.get(quizIntro);
  document.body.classList.toggle("sphere-sample", isSample);
  document.body.classList.toggle("deep-lab-open", !isSample);
  if (!isSample) {
    document.body.classList.remove("lab-map-open");
    for (const node of [$("lesson-reading"), document.querySelector(".lesson-actions"), $("quiz"), document.querySelector(".footer")]) node.hidden = false;
  }
  sphereLab.show(isSample, language, preserveVisual);
  deepLab.show(isSample ? null : lesson, language, preserveVisual);
  if (scroll) (isSample ? $("sphere-lab") : $("deep-lab")).scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
}
$("previous-lesson").addEventListener("click", () => { if (currentLesson > 0) showLesson(currentLesson - 1, true); });
$("open-sphere-lab").addEventListener("click", () => showLesson(lessons.findIndex(lesson => lesson.code === "1.3.1"), true));
document.querySelector(".rail-exam").addEventListener("click", (event) => {
  event.preventDefault();
  if (lessons[currentLesson].code === "1.3.1") sphereLab.setMode("quiz");
  else deepLab.setMode("quiz");
  $("quiz").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
});
$("next-lesson").addEventListener("click", () => {
  if (currentLesson < lessons.length - 1) showLesson(currentLesson + 1, true);
  else $("quiz").scrollIntoView({ behavior: "smooth" });
});
$("lesson-quiz").addEventListener("click", () => {
  currentQuestion = lessonQuestionIndices()[0];
  draft = null;
  renderQuestion();
  $("quiz").scrollIntoView({ behavior: "smooth" });
});
$("toggle-motion").addEventListener("click", () => { visual.toggle(); $("toggle-motion").textContent = visual.paused ? localize("播放动画", "Play animation") : localize("暂停动画", "Pause animation"); });
$("reset-visual").addEventListener("click", () => { visual.reset(); });
$("lang-toggle").addEventListener("click", () => {
  const questionPosition = lessonQuestionIndices().indexOf(currentQuestion);
  language = language === "zh" ? "en" : "zh";
  try { localStorage.setItem("optics-course-language", language); } catch { /* Keep switching even without storage. */ }
  chapters = language === "en" ? window.OpticsCourseChaptersEn : window.OpticsCourseChapters;
  lessons = collectLessons();
  questionBank = collectQuestions();
  renderStaticLanguage();
  visual.setLanguage(language);
  renderCountNote();
  showLesson(currentLesson, false, true);
  currentQuestion = lessonQuestionIndices()[questionPosition];
  renderQuestion();
});

function renderQuestion() {
  $("quiz-summary").hidden = true;
  const indices = lessonQuestionIndices();
  const position = indices.indexOf(currentQuestion);
  const question = questionBank[currentQuestion];
  const answer = answers[currentQuestion];
  $("quiz-position").textContent = `${position + 1} / ${indices.length}`;
  $("quiz-progress-fill").style.width = `${indices.filter((index) => answers[index]).length / indices.length * 100}%`;
  $("quiz-topic").textContent = localize(`第 ${lessons[question.lessonIndex].code} 节 · 书页 ${lessons[question.lessonIndex].pages}`, `§${lessons[question.lessonIndex].code} · book pp. ${lessons[question.lessonIndex].pages}`);
  $("quiz-state").textContent = answer ? localize("已解析", "Reviewed") : localize("待作答", "Not answered");
  $("quiz-question").replaceChildren();
  appendFormula($("quiz-question"), question.stem);
  const options = $("quiz-options");
  options.replaceChildren();
  [...question.choices.map((choice, index) => ({ choice, index })), { choice: localize("我不知道，直接看解析", "I don't know — show explanation"), index: -1 }].forEach(({ choice, index }) => {
    const label = element("label", `quiz-option${index === -1 ? " unknown" : ""}`);
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "quiz-choice";
    input.value = String(index);
    input.checked = (answer ? answer.choice : draft) === index;
    input.disabled = Boolean(answer);
    input.addEventListener("change", () => { draft = index; $("quiz-warning").textContent = ""; });
    const optionText = element("span");
    appendFormula(optionText, choice);
    label.append(input, optionText);
    options.append(label);
  });
  $("quiz-warning").textContent = "";
  $("submit-question").hidden = Boolean(answer);
  $("retry-question").hidden = !answer;
  $("previous-question").disabled = position === 0;
  $("next-question").disabled = !answer;
  $("next-question").textContent = position === indices.length - 1 ? localize("查看本节结果 →", "See section results →") : localize("下一题 →", "Next question →");
  renderFeedback();
}
function renderFeedback() {
  const answer = answers[currentQuestion];
  const box = $("quiz-feedback");
  if (!answer) { box.hidden = true; box.replaceChildren(); return; }
  const question = questionBank[currentQuestion];
  const correct = answer.choice === question.answer;
  const unknown = answer.choice === -1;
  box.hidden = false;
  box.classList.toggle("bad", !correct);
  box.replaceChildren(
    element("h4", "", correct ? localize("答对了 · 继续下一题", "Correct · Continue to the next question") : unknown ? localize("这题还不会 · 先把推理走一遍", "Not sure yet · Work through the reasoning") : localize("这题需要巩固 · 看清关键条件", "Review needed · Check the key assumptions")),
    formulaParagraph(localize(`正确答案：${question.choices[question.answer]}。${unknown ? "你选择了“我不知道”。" : correct ? "" : `你选择了“${question.choices[answer.choice]}”。`}`, `Correct answer: ${question.choices[question.answer]}. ${unknown ? "You chose 'I don't know'." : correct ? "" : `You chose '${question.choices[answer.choice]}'.`}`), "answer-label"),
    element("h5", "", localize("推理与计算", "Reasoning and calculation")),
    formulaParagraph(question.explain),
    element("h5", "", localize("其他选项为什么不对", "Why the other choices are wrong")),
    formulaParagraph(question.whyOther),
    element("p", "", localize(`回看路径：左侧 ${lessons[question.lessonIndex].code} 节的讲解与推导；本题为原创练习，不是书中原题。`, `Review §${lessons[question.lessonIndex].code} in the navigation for its explanation and derivation. This is an original practice question, not copied from the book.`))
  );
}
$("submit-question").addEventListener("click", () => {
  const selected = document.querySelector('input[name="quiz-choice"]:checked');
  if (!selected) { $("quiz-warning").textContent = localize("请选择一个选项，或选“我不知道”。", "Choose an answer or 'I don't know'."); return; }
  answers[currentQuestion] = { choice: Number(selected.value) };
  draft = null;
  persist();
  renderQuestion();
  $("quiz-feedback").scrollIntoView({ block: "nearest" });
});
$("retry-question").addEventListener("click", () => {
  answers[currentQuestion] = null;
  draft = null;
  persist();
  renderQuestion();
});
$("previous-question").addEventListener("click", () => {
  const indices = lessonQuestionIndices();
  const position = indices.indexOf(currentQuestion);
  if (position > 0) { currentQuestion = indices[position - 1]; draft = null; renderQuestion(); }
});
$("next-question").addEventListener("click", () => {
  if (!answers[currentQuestion]) return;
  const indices = lessonQuestionIndices();
  const position = indices.indexOf(currentQuestion);
  if (position < indices.length - 1) { currentQuestion = indices[position + 1]; draft = null; renderQuestion(); $("quiz-card").scrollIntoView({ block: "start" }); }
  else showSummary();
});
function showSummary() {
  const indices = lessonQuestionIndices();
  const correct = indices.filter((i) => answers[i]?.choice === questionBank[i].answer).length;
  const unknown = indices.filter((i) => answers[i]?.choice === -1).length;
  const wrong = indices.filter((i) => answers[i] && answers[i].choice !== -1 && answers[i].choice !== questionBank[i].answer).length;
  const box = $("quiz-summary");
  box.hidden = false;
  box.replaceChildren(
    element("h3", "", localize(`第 ${lessons[currentLesson].code} 节学习记录`, `§${lessons[currentLesson].code} results`)),
    element("p", "", localize(`已作答 ${indices.filter((i) => answers[i]).length}/${indices.length} · 正确 ${correct} · 不知道 ${unknown} · 答错 ${wrong}。不确定与答错都值得回到本节讲解复习。`, `Answered ${indices.filter((i) => answers[i]).length}/${indices.length} · Correct ${correct} · Don't know ${unknown} · Incorrect ${wrong}. Return to this section to review uncertain or incorrect answers.`))
  );
  const first = indices.find((i) => !answers[i] || answers[i].choice !== questionBank[i].answer);
  if (first !== undefined) {
    const button = element("button", "outline", localize("回到第一道待巩固题 →", "Return to the first question to review →"));
    button.type = "button";
    button.addEventListener("click", () => { currentQuestion = first; draft = null; renderQuestion(); $("quiz-card").scrollIntoView({ block: "start" }); });
    box.append(button);
  }
  box.scrollIntoView({ block: "nearest" });
}
function verifyPhysics() {
  const v = 1 / Math.sqrt(2 * 3);
  for (let i = 0; i < 32; i++) {
    const E = Math.cos(i * .31), B = E / v;
    if (Math.abs(E - v * B) > 1e-12 || E * B < -1e-12) return false;
  }
  return lessons.length > 0 && questionBank.length > 0 && questionBank.every((question) => question.answer >= 0 && question.answer < question.choices.length);
}
window.verifyPhysics = verifyPhysics;
  console.info(`Optics course ${verifyPhysics() ? "PASS" : "FAIL"}: ${lessons.length} sections, ${questionBank.length} questions, E/B=v and nonnegative E×B direction.`);
$("total-lessons").textContent = String(lessons.length);
function renderCountNote() {
  $("course-count-note").textContent = localize(`${chapters.length === 1 ? "书页 3–29 / " : "分章学习 / "}${questionBank.length} 道逐题测验`, `${chapters.length === 1 ? "Book pp. 3–29 / " : "By chapter / "}${questionBank.length} questions across sections`);
}
renderCountNote();
visual.setLanguage(language);
let initialCode = location.hash.match(/^#lesson-([0-9.]+)$/)?.[1];
try { initialCode ||= localStorage.getItem("optics-course-last-section"); } catch { /* Optional location memory. */ }
showLesson(Math.max(0, lessons.findIndex((lesson) => lesson.code === initialCode)));
persist();

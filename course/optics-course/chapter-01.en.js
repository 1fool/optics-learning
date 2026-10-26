/* Assemble bilingual chapter 1 from section files; preserve stable question IDs. */
(() => {
  const equationTerms = [
    ["微分式：", "Differential: "], ["积分式：", "Integral: "], ["Q_{自由}", "Q_{free}"], ["I_{自由}", "I_{free}"], ["E_{物理}", "E_{physical}"],
    ["（导电时）", "(if conducting)"], ["（沿 +z，固定约定）", "(along +z, with this convention)"],
    ["（无耗散均匀平面波）", "(homogeneous lossless plane wave)"], ["（真空）", "(vacuum)"], ["(真空)", "(vacuum)"],
    ["真空中", "in vacuum: "], ["真空内", "in vacuum: "], ["介质内", "in medium: "],
    ["常数", "constant"], ["右行", "right-going"], ["左行", "left-going"]
  ];
  const translateEquation = (formula) => equationTerms.reduce((value, [source, target]) => value.replaceAll(source, target), formula);
  const original = window.OpticsChapter01;
  const lessons = original.map((section) => {
    const translated = window.OpticsSectionTranslations[section.code];
    if (!translated) throw new Error(`Missing English section ${section.code}`);
    if (section.blocks.length !== translated.blocks.length || section.questions.length !== translated.questions.length) throw new Error(`English content mismatch in ${section.code}`);
    return {
      ...section, ...translated,
      blocks: section.blocks.map((block, i) => ({ ...block, ...translated.blocks[i], eq: block.eq?.map((formula) => typeof formula === "string" ? translateEquation(formula) : { ...formula, text: translateEquation(formula.text) }) })),
      questions: section.questions.map((question, i) => ({ ...question, ...translated.questions[i] }))
    };
  });
  window.OpticsCourseChaptersEn = [{ code: "1", title: "Electromagnetic Theory of Light", sectionTitles: { "1.2": "Plane electromagnetic waves", "1.3": "Spherical and cylindrical waves", "1.4": "Light sources and optical radiation", "1.6": "Reflection and refraction at a two-medium interface" }, pdf: "物理光学（第5版）.pdf", lessons }];
window.OpticsCourseChapters = window.OpticsCourseChapters || [];
window.OpticsCourseChapters.push({ code: "1", title: "光的电磁理论", sectionTitles: { "1.2": "平面电磁波", "1.3": "球面波和柱面波", "1.4": "光源和光的辐射", "1.6": "光在两介质分界面上的反射和折射" }, pdf: "物理光学（第5版）.pdf", lessons: window.OpticsChapter01 });
})();

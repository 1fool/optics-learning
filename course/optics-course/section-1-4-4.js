/* Chapter 1, section 1.4.4: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.4.4",
    "title": "对实际光波的认识",
    "pages": "19",
    "pdf": 29,
    "visual": "packets",
    "overview": "无限长单频波便于计算，真实光却有有限谱宽与统计变化。用有限波列和横向振动的变化，理解相干时间、自然光与探测器平均。",
    "bridge": {
      "previous": "1.4.3 区分了瞬时场与平均光强。",
      "current": "认识有限波列的理想化图像与自然光的统计含义。",
      "next": "1.5 用宏观边界关系处理这些场与介质的相遇。"
    },
    "goals": [
      "解释单频模型与有限波列的差别",
      "由假定相干时间估算相干长度",
      "避免把自然光理解成纵波"
    ],
    "symbols": [
      [
        "τc",
        "相干时间，依定义与谱形而定",
        "s",
        "算例假设：1 ns，非通用值"
      ],
      [
        "ℓc",
        "相干长度估计 vτc",
        "m",
        "真空算例：0.30 m"
      ],
      [
        "Δν",
        "谱宽",
        "Hz"
      ],
      [
        "Eₓ, Eᵧ",
        "垂直传播方向的两个场分量",
        "V/m"
      ]
    ],
    "blocks": [
      {
        "label": "现实与理想",
        "title": "连续波列是方便的图像，不是统一的微观时钟",
        "text": [
          "教材用一段段有限波列说明实际普通光源的振幅、相位与振动方向会变化。真实场不要求在每个波列接缝处突然跳变；平滑包络和统计相关函数是更一般的描述。",
          "把光近似成单频简谐波时，相当于只描述观测范围内相位足够可预测的一部分。相干时间随光源与谱形而变，不能把某个原子发光时长当所有光源通用常数。"
        ]
      },
      {
        "label": "统计含义",
        "title": "自然光没有固定优势横向方向",
        "steps": [
          [
            "瞬时仍是横向",
            "传播方向确定后，场在与其垂直的平面内变化。“方向无规则”不表示电场可以任意沿传播轴振动。"
          ],
          [
            "对时间或系综平均",
            "理想自然光在任意两条正交横向轴上的平均强度相等，且没有稳定的互相关相位；单看一瞬间的箭头不能判断是否自然光。"
          ],
          [
            "与相干性分开",
            "线偏振描述方向统计，时间相干描述延迟后的相位相关。偏振片可以选择方向，却不自动把宽谱热光变成严格单频激光。"
          ]
        ]
      },
      {
        "label": "估算与边界",
        "title": "1 ns 对应多长的光程？",
        "eq": [
          {
            "text": "\\ell_c\\sim v\\tau_c,\\qquad \\tau_c\\sim\\frac1{\\Delta\\nu}",
            "tex": true
          }
        ],
        "text": [
          "如果题设取真空 τc=1 ns，ℓc≈cτc=3.00×10⁸×10⁻⁹=0.30 m。这里是给定相干时间后的估计，不是说任何自然光都能稳定干涉到 0.30 m。",
          "τc 与 1/Δν 只是量级关系，具体因子取决于谱形、宽度及相关衰减标准。交互图用平滑有限包络和确定性相位扰动说明趋势，不生成真实光源的统计采样。"
        ],
        "note": "本节算例取真空；一般用无显著色散时的传播速度估计。若包络在色散介质中传播，应检查群速度与相干长度的定义，不能默认用相速度替代。"
      }
    ],
    "questions": [
      {
        "stem": "真空中题设 τc=1 ns，估算 ℓc 是多少？",
        "choices": [
          "0.30 m",
          "3×10⁸ m",
          "1 nm"
        ],
        "answer": 0,
        "explain": "先将 1 ns 换成 10⁻⁹ s，再乘 c≈3×10⁸ m/s，得到 0.30 m。这个数值依赖题设的 τc，不是所有光源的固定相干长度。",
        "whyOther": "3×10⁸ m 忘记纳秒换算；1 nm 把时间符号中的 nano 直接搬到长度而没有乘传播速度。",
        "id": "1.4.4:q1"
      },
      {
        "stem": "自然光的“无优势振动方向”指什么？",
        "choices": [
          "每一瞬间 E 都为零",
          "统计上没有优势横向方向",
          "纵向与横向场必须等强"
        ],
        "answer": 1,
        "explain": "自然光是统计偏振概念：在传播横向平面内没有固定优势方向。瞬时场通常非零；许多随机方向与相位的贡献经时间或系综平均后形成这种性质。",
        "whyOther": "零瞬时场意味着没有该瞬间场，不等于自然光；纵向等强违背本节传播波的横波模型。",
        "id": "1.4.4:q2"
      },
      {
        "stem": "偏振片筛选宽谱热光后，哪项不应自动断言？",
        "choices": [
          "横向方向统计会改变",
          "输出可以具有线偏振",
          "输出必然成为严格单频且无限相干"
        ],
        "answer": 2,
        "explain": "方向筛选改变偏振，但不自动压缩光谱到一个精确频率，更不能制造无限相干时间。偏振与时间相干是不同描述，必须分别测量或建模。",
        "whyOther": "前两项正是理想偏振片可能产生的改变；不能因为它们成立，就把所有单频激光的理想性质一并赋给输出。",
        "id": "1.4.4:q3"
      }
    ]
  };
  const translation = {
    "code": "1.4.4",
    "title": "Understanding real optical waves",
    "pages": "19",
    "pdf": 29,
    "visual": "packets",
    "overview": "An infinite monochromatic wave is convenient, but real light has finite bandwidth and statistical fluctuations. Finite wave trains and changing transverse directions motivate coherence time, unpolarized light, and detector averaging.",
    "bridge": {
      "previous": "§1.4.3 distinguishes instantaneous fields from average intensity.",
      "current": "Understand the wave-train picture and the statistical meaning of unpolarized light.",
      "next": "§1.5 treats the encounter of fields and media through macroscopic boundary relations."
    },
    "goals": [
      "Contrast monochromatic models and finite wave trains",
      "Estimate coherence length from a specified coherence time",
      "Avoid interpreting unpolarized light as longitudinal"
    ],
    "symbols": [
      [
        "τc",
        "coherence time; depends on definition and spectral shape",
        "s",
        "Example assumption: 1 ns, not universal"
      ],
      [
        "ℓc",
        "coherence-length estimate vτc",
        "m",
        "Vacuum example: 0.30 m"
      ],
      [
        "Δν",
        "spectral width",
        "Hz"
      ],
      [
        "Eₓ, Eᵧ",
        "two field components transverse to propagation",
        "V/m"
      ]
    ],
    "blocks": [
      {
        "label": "Real versus ideal",
        "title": "Wave trains are a picture, not a universal microscopic clock",
        "text": [
          "The book uses finite wave trains to illustrate changing amplitude, phase, and vibration direction in ordinary sources. Real fields need not jump at literal joins between trains; smooth envelopes and correlation functions are more general.",
          "A monochromatic approximation describes a portion of the field whose phase is sufficiently predictable over the observation interval. Coherence time depends on source and spectrum, not a universal atomic emission duration."
        ]
      },
      {
        "label": "Statistical meaning",
        "title": "Unpolarized light has no preferred transverse direction",
        "steps": [
          [
            "Still transverse instantaneously",
            "For a specified propagation direction, the field varies in the transverse plane. Random direction does not mean arbitrary longitudinal electric oscillation."
          ],
          [
            "Average in time or over an ensemble",
            "Ideal unpolarized light has equal average intensities on any orthogonal transverse axes and no stable mutual phase correlation. One instantaneous arrow cannot establish its polarization state."
          ],
          [
            "Separate coherence from polarization",
            "Linear polarization concerns direction statistics; temporal coherence concerns correlations at a delay. A polarizer selects directions but does not automatically turn broadband thermal light into a single-frequency laser."
          ]
        ]
      },
      {
        "label": "Estimate and limits",
        "title": "What distance corresponds to 1 ns?",
        "eq": [
          {
            "text": "\\ell_c\\sim v\\tau_c,\\qquad \\tau_c\\sim\\frac1{\\Delta\\nu}",
            "tex": true
          }
        ],
        "text": [
          "If τc=1 ns is specified in vacuum, ℓc≈cτc=3.00×10⁸×10⁻⁹=0.30 m. This estimates distance from a given coherence time, not a claim that all ordinary light interferes stably to 0.30 m.",
          "The relation to 1/Δν is order-of-magnitude: exact factors depend on spectral shape, width convention, and correlation criterion. The figure uses smooth finite envelopes and deterministic phase changes to show a trend, not statistical samples of a real source."
        ],
        "note": "The example uses vacuum. The simple estimate assumes negligible dispersion. For envelopes in dispersive media, check group velocity and the coherence-length definition rather than automatically substituting phase velocity."
      }
    ],
    "questions": [
      {
        "stem": "Given τc=1 ns in vacuum, estimate ℓc.",
        "choices": [
          "0.30 m",
          "3×10⁸ m",
          "1 nm"
        ],
        "answer": 0,
        "explain": "Convert 1 ns to 10⁻⁹ s and multiply by c≈3×10⁸ m/s to get 0.30 m. This depends on the specified coherence time, not a fixed coherence length for all sources.",
        "whyOther": "3×10⁸ m omits the nanosecond conversion. 1 nm copies the nano prefix into a length without multiplying by propagation speed.",
        "id": "1.4.4:q1"
      },
      {
        "stem": "What does no preferred vibration direction mean for unpolarized light?",
        "choices": [
          "E is zero at every instant",
          "No preferred transverse direction statistically",
          "Longitudinal and transverse fields must be equally strong"
        ],
        "answer": 1,
        "explain": "Unpolarized is a statistical polarization property: no preferred direction in the transverse plane. The instantaneous field need not vanish; averaging varying directions and phases yields the property.",
        "whyOther": "Zero instantaneous field is not the definition of unpolarized light. An equally strong longitudinal field violates the transverse-wave model here.",
        "id": "1.4.4:q2"
      },
      {
        "stem": "After a polarizer selects broadband thermal light, what must not be asserted automatically?",
        "choices": [
          "Transverse direction statistics change",
          "The output can be linearly polarized",
          "The output must be strictly single-frequency with infinite coherence"
        ],
        "answer": 2,
        "explain": "Direction selection changes polarization, but does not automatically reduce the spectrum to one exact frequency or produce infinite coherence time. Polarization and temporal coherence require separate characterization.",
        "whyOther": "The first two are valid effects of an ideal polarizer. They do not confer all the ideal properties of a monochromatic laser on its output.",
        "id": "1.4.4:q3"
      }
    ]
  };
  const guide = {
    question: ["真实光会永远按一条完美余弦振下去吗？", "Does real light oscillate as a perfect cosine forever?"],
    setup: ["前面为了学规律，暂把波写成无限持续、固定方向的单频振动。现在放松这个理想化，分别问：隔一段时间还能预测它的相位吗？长时间看有没有固定的振动方向？这是相干与偏振两个不同问题。", "To learn the rules, we used indefinitely repeating single-frequency oscillations with fixed direction. Now ask separately: how long does phase remain predictable, and is there a preferred oscillation direction over time? These are coherence and polarization, not one question."],
    terms: [
      { name: ["波列", "Wave train"], meaning: ["一段有限持续的振动图像，用来提醒理想余弦不能无限外推；并非所有真实光都按硬接缝分段。", "A finite stretch of oscillation reminding us not to extrapolate a perfect cosine forever; real light need not have sharp segment boundaries."] },
      { name: ["相干时间 τc", "Coherence time τc"], meaning: ["表征延迟后场还保持相关的时间尺度；不是每个光源共享的常数。", "A timescale for field correlation after a delay, not a universal source constant."] },
      { name: ["自然光 / 偏振", "Unpolarized light / polarization"], meaning: ["偏振描述横向振动方向的统计；理想自然光长期没有优势横向方向，不表示电场沿传播方向振动。", "Polarization describes transverse directional statistics. Ideal unpolarized light has no preferred transverse direction over time, not a longitudinal field."] }
    ],
    observe: ["比较理想载波与有限波列图，关注振幅包络和相位变化。图是解释模型，不是从真实光源采集的随机数据；不要从某一帧就判断光是否自然光。", "Compare the ideal carrier with the finite-train sketch, focusing on envelope and phase changes. This is a model, not measured random source data; one frame cannot establish whether light is unpolarized."],
    blocks: [
      { title: ["先承认余弦模型有一段有效范围", "Give the perfect-cosine model a limited useful range"], before: ["只在一小段观察时间内，相位足够可预测时，单频余弦是方便近似。跨更长延迟，真实源的相位可能逐渐失去关联；有限波列就是让我们看见这个限制，不是断言场必须突然跳断。", "A single-frequency cosine is useful over intervals where phase is sufficiently predictable. At longer delays a real source may lose phase correlation. Finite trains visualize that limitation; they do not require abrupt field jumps."], read: ["所以不是前面全部公式都错了，而是每次使用时要问观察时间与光源条件是否支持这种近似。下一步单独讨论方向，因为“相位乱”与“方向没有偏好”不能画等号。", "Earlier formulas are not simply wrong; their usefulness depends on source and observation conditions. Next we consider direction separately, since phase wandering and no directional preference are not equivalent."] },
      { title: ["相位稳定多久，与振动朝哪边，是两条轴", "Phase stability and oscillation direction are separate questions"], before: ["取垂直传播方向的两根横向轴。理想自然光长期在两轴上的平均强度相等，并没有稳定互相位；线偏振则有固定方向的振动轴。但固定方向本身并不保证它永远保持同一频率与相位。", "Choose two axes transverse to propagation. Ideal unpolarized light has equal mean intensities with no stable mutual phase relation. Linear polarization has a fixed oscillation axis, but that alone does not ensure an indefinitely fixed frequency or phase."], read: ["因此偏振片选择的是方向，不能自动把普通宽谱光变成严格单频激光。理解了“相关会维持多久”，下一步才把这个时间换成传播长度。", "A polarizer selects direction; it does not automatically turn broadband light into a perfectly single-frequency laser. Having defined how long correlation persists, we next convert that time to a propagation length."] },
      { title: ["把一段相关时间换成一段光程", "Convert a correlation time to a path-length scale"], before: ["如果光在 τc 这么长时间里保持某种相关，传播速度乘这段时间便给出相干长度的量级。谱越宽，许多不同节拍叠加后通常越快失去固定关系，因此时间尺度与谱宽的倒数量级相关；具体常数依定义而变。", "Speed times a correlation time τc gives a coherence-length scale. A broader range of rhythms generally loses a fixed relation sooner, so coherence time is of order inverse spectral width; numerical factors depend on definitions."], read: ["题设若给真空 τc=1 ns，长度估计是 3.00×10⁸×10⁻⁹=0.30 m。这是代入题设，不是所有自然光的固定长度；有色散时还需谨慎处理包络速度。", "If a problem specifies vacuum τc=1 ns, the length estimate is 3.00×10⁸×10⁻⁹=0.30 m. This applies the given value, not a universal property of unpolarized light. Dispersion also requires care with envelope velocity."] }
    ],
    check: { question: ["光通过偏振片后方向更确定，相干时间就一定很长吗？", "Does a more definite direction after a polarizer guarantee a long coherence time?"], answer: ["不一定。方向统计与延迟后的相位相关不同；选择方向本身不能保证窄谱和长时间相干。", "No. Directional statistics and delayed phase correlation differ; selecting a direction does not ensure a narrow spectrum or long coherence time."] },
    next: ["带到 1.5：已经知道自由传播与真实源的限制，接下来把光送到玻璃表面。两侧的场不能随便各写一套，需要界面规则把它们接上。", "Into §1.5: with free propagation and source limits established, bring light to a glass surface. Fields on its two sides need interface rules to connect them."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.4.4"] = {
    ask: ["把假定相干时间 τc 调大，在固定真空速度下，相干长度估计怎样？", "Increase assumed coherence time τc at fixed vacuum speed. What happens to the coherence-length estimate?"],
    choices: [["变短", "It decreases"], ["按 cτc 变长", "It grows as cτc"], ["这个图直接测出了真实线宽", "The plot measures a real linewidth"]], answer: 1,
    try: ["调 τc 和相位扰动，比较波列的平滑包络；它们是人为设定的示意参数。", "Adjust τc and phase disturbance and inspect the train envelopes; both are assumed schematic parameters."],
    why: ["在给定传播速度下，相关持续越久，对应的传播距离估计越长。图未从真实随机场拟合 τc，也不测线宽。", "At fixed speed a longer assumed correlation time means a longer propagation distance. The diagram neither fits τc from a stochastic field nor measures linewidth."]
  };
  const deepLab = {
    controls: [["coherence", .5], ["coherence", 2]],
    compare: ["保持相位扰动控件不动，增大假定 τc，比较平滑波列包络和图中的 ℓc 估计。", "Keep phase disturbance fixed, raise assumed τc, and compare envelope and ℓc estimate."],
    relation: ["固定传播速度，ℓc≈cτc；这些是手动设定的示意参数，不是从真实随机波列测出的线宽。", "At fixed propagation speed ℓc≈cτc. These are assumed schematic controls, not linewidth measured from a stochastic wave train."],
    formula: "\\ell_c\\approx c\\tau_c",
    challenge: [["在固定真空速度下，把假定 τc 从 0.5 ns 调到 2 ns，ℓc 估计变几倍？", "At fixed vacuum speed, change assumed τc from 0.5 to 2 ns. What is the ratio of estimated ℓc?"], [["四倍", "Four times"], ["一半", "One half"], ["不变", "Unchanged"]], 0],
  };
  deepLab.mistakes = [null, ["τc 从 0.5 到 2 ns 是四倍而非一半；速度固定时长度同倍增加。", "Going from 0.5 to 2 ns is fourfold, not half; at fixed speed length scales likewise."], ["ℓc≈cτc 是本题的估计关系；改变假定 τc 必改变估计长度。", "The estimated ℓc≈cτc changes with the assumed τc at fixed c."]];
  const [focus, limitQuestion, limitAnswer] = [["先分清手动设定的包络宽度 τc 与图上由 cτc 算出的长度。", "Separate the assumed envelope time τc from length calculated as cτc."], ["这里的 τc 是学习者手动设定的概念参数吗？", "Is τc an assumed conceptual parameter set by the learner here?"], true];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.4.4"] = deepLab;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
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
  figure.background = ["#162a25", "#293d30"];
  figure.animated = true;
  window.OpticsExtraVisuals.packets = figure;
})();

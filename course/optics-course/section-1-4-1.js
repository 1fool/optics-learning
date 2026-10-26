/* Chapter 1, section 1.4.1: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.4.1",
    "title": "光源",
    "pages": "15",
    "pdf": 25,
    "visual": "sources",
    "overview": "热光源、气体放电与激光并不只在亮度上不同。比较它们的光谱和相干特征，同时避免把线谱、单色与相干画上等号。",
    "bridge": {
      "previous": "1.3 研究已知光源发出的理想波。",
      "current": "认识教材列举的三类实验光源与光谱特点。",
      "next": "1.4.2 用振荡电偶极子建立经典辐射模型。"
    },
    "goals": [
      "根据发光机制辨认三类光源",
      "区分光谱宽度与相干性",
      "解释钠灯双线不是严格单频"
    ],
    "symbols": [
      [
        "λ",
        "波长",
        "nm",
        "钠双线：约 589、589.6 nm"
      ],
      [
        "ν",
        "光频率",
        "Hz"
      ],
      [
        "Δν",
        "谱宽，定义依所用宽度标准",
        "Hz"
      ],
      [
        "T",
        "热光源温度；不是波周期",
        "K",
        "本节未指定数值"
      ]
    ],
    "blocks": [
      {
        "label": "比较框架",
        "title": "同样是发光，形成光谱的机制不同",
        "text": [
          "热光源：物体在一定温度下辐射，教材以白炽灯、太阳为例，通常呈宽的连续光谱。谱形受温度与发射率影响，不是每个波长都有相同强度。",
          "气体放电光源：受激发原子或离子产生特征谱线，教材以钠灯、汞灯为例。线有有限宽度，而且常有多条；不能只看到一条显眼黄线就当成数学意义的单色波。",
          "激光器：借助受激辐射和反馈形成输出，通常具有较好方向性与相干性。实际可多纵模、有有限线宽，不能断言任何激光都严格单频。"
        ]
      },
      {
        "label": "辨析流程",
        "title": "从“看起来很纯”到“能否稳定干涉”",
        "steps": [
          [
            "先看谱",
            "分辨连续背景还是分立谱线，再检查谱线宽度和是否有多线。图中只示意谱形，面积不代表各类光源的实际功率。"
          ],
          [
            "再看相关性",
            "相干性描述两个时空点间场的相关程度。窄谱有助于时间相干，但空间相干还依赖源尺寸与传播几何，不能由颜色单独决定。"
          ],
          [
            "最后选模型",
            "仅当观测时间、谱宽和几何条件允许时，才把实际源在当前问题中近似成单色平面波或点源。"
          ]
        ]
      },
      {
        "label": "带单位算例",
        "title": "589 nm 与 589.6 nm 对应多大的频差？",
        "eq": [
          {
            "text": "\\Delta\\nu=c\\left|\\frac{1}{\\lambda_1}-\\frac{1}{\\lambda_2}\\right|\\approx5.18\\times10^{11}\\,\\mathrm{Hz}",
            "tex": true
          }
        ],
        "text": [
          "取 c≈3.00×10⁸ m/s，分别将两个波长换成米，再由 ν=c/λ 计算。频差约 5.18×10¹¹ Hz；这个量描述两条谱线中心的间距，不是每条线自身的线宽，也不是已测得的相干时间。"
        ]
      }
    ],
    "questions": [
      {
        "stem": "哪种光源通常有宽的连续光谱？",
        "choices": [
          "热光源",
          "理想单频激光模型",
          "只含两条离散线的模型"
        ],
        "answer": 0,
        "explain": "热辐射由温度与材料发射特征决定，通常在宽波段连续分布。太阳和白炽灯是教材中的例子，但实际谱线上仍可能有吸收或其他结构。",
        "whyOther": "理想单频与两条离散线都是离散频率模型，不是宽连续光谱；“连续”不等于每个波长强度相同。",
        "id": "1.4.1:q1"
      },
      {
        "stem": "把 589 与 589.6 nm 两线间距直接当成什么是不对的？",
        "choices": [
          "两条线中心的波长差",
          "每条谱线自身的线宽",
          "两个中心频率之差的计算依据"
        ],
        "answer": 1,
        "explain": "0.6 nm 是两条线中心间隔；一条线的宽度要在该线附近单独测量。两个中心频率的间距可由 c|1/λ₁−1/λ₂| 求出，但仍不等于各自线宽。",
        "whyOther": "第一、三项是正确解释，不能选它们作为错误说法。先区分“线间隔”和“线宽”再讨论时间相干。",
        "id": "1.4.1:q2"
      },
      {
        "stem": "“所有激光都无限长、严格单频且完全相干”是否成立？",
        "choices": [
          "成立，因为激光一定只有一个频率",
          "不成立，因此激光没有相干性",
          "不成立；实际激光有有限谱宽且可能多模"
        ],
        "answer": 2,
        "explain": "理想单频波是计算模型；真实激光受腔模、噪声与工作状态影响。很多激光相干性很好，但“很好”并不意味着无限相干时间或所有光源参数都理想。",
        "whyOther": "第一项把有用理想化当成普遍事实；第二项从“非完全相干”跳到“完全不相干”，同样是错误的二分。",
        "id": "1.4.1:q3"
      }
    ]
  };
  const translation = {
    "code": "1.4.1",
    "title": "Light sources",
    "pages": "15",
    "pdf": 25,
    "visual": "sources",
    "overview": "Thermal sources, gas discharge sources, and lasers differ in more than brightness. Compare spectra and coherence without treating line spectra, monochromaticity, and coherence as synonyms.",
    "bridge": {
      "previous": "§1.3 studies ideal waves emitted by a specified source.",
      "current": "Identify the three source classes and spectral properties in the book.",
      "next": "§1.4.2 introduces the classical oscillating-dipole model."
    },
    "goals": [
      "Identify three source classes by mechanism",
      "Separate spectral width from coherence",
      "Explain why the sodium doublet is not strictly single-frequency"
    ],
    "symbols": [
      [
        "λ",
        "wavelength",
        "nm",
        "Sodium doublet: about 589 and 589.6 nm"
      ],
      [
        "ν",
        "optical frequency",
        "Hz"
      ],
      [
        "Δν",
        "spectral width; depends on the width convention",
        "Hz"
      ],
      [
        "T",
        "thermal-source temperature, not wave period",
        "K",
        "No value specified here"
      ]
    ],
    "blocks": [
      {
        "label": "Comparison framework",
        "title": "Different emission mechanisms, different spectra",
        "text": [
          "Thermal sources radiate because of temperature. The book uses incandescent lamps and the Sun as examples, generally with broad continuous spectra. Temperature and emissivity shape the spectrum; intensity is not equal at every wavelength.",
          "Gas discharge sources excite atoms or ions that emit characteristic lines. The book gives sodium and mercury lamps. Lines have finite widths and may be numerous: one prominent yellow feature is not a mathematically monochromatic wave.",
          "Lasers use stimulated emission and feedback. They often provide good directionality and coherence, but real lasers can have multiple longitudinal modes and finite linewidth; not every laser is strictly single-frequency."
        ]
      },
      {
        "label": "Reasoning workflow",
        "title": "From a pure-looking color to stable interference",
        "steps": [
          [
            "Inspect the spectrum",
            "Distinguish continuous background from discrete lines, then inspect linewidth and multiple lines. The figure illustrates spectral shapes; areas do not compare actual source powers."
          ],
          [
            "Then inspect correlations",
            "Coherence describes field correlations between spacetime points. Narrow spectra help temporal coherence, while spatial coherence also depends on source size and propagation geometry; color alone is insufficient."
          ],
          [
            "Choose a model last",
            "Only approximate a real source by a monochromatic plane wave or point source when observation time, bandwidth, and geometry justify it."
          ]
        ]
      },
      {
        "label": "Worked example",
        "title": "How far apart in frequency are 589 and 589.6 nm?",
        "eq": [
          {
            "text": "\\Delta\\nu=c\\left|\\frac{1}{\\lambda_1}-\\frac{1}{\\lambda_2}\\right|\\approx5.18\\times10^{11}\\,\\mathrm{Hz}",
            "tex": true
          }
        ],
        "text": [
          "Using c≈3.00×10⁸ m/s, convert both wavelengths to metres and compute ν=c/λ. Their separation is about 5.18×10¹¹ Hz. This is the distance between line centers, not the linewidth of either line or a measured coherence time."
        ]
      }
    ],
    "questions": [
      {
        "stem": "Which source usually has a broad continuous spectrum?",
        "choices": [
          "Thermal source",
          "Ideal single-frequency laser model",
          "A model with exactly two discrete lines"
        ],
        "answer": 0,
        "explain": "Thermal radiation depends on temperature and emissivity and is generally spread continuously over a broad band. The Sun and incandescent lamps are examples, though real spectra can contain absorption or other structure.",
        "whyOther": "A single ideal frequency and two discrete lines are not broad continuous spectra. Continuous also does not mean equal intensity at every wavelength.",
        "id": "1.4.1:q1"
      },
      {
        "stem": "What is it incorrect to identify directly with the separation of the 589 and 589.6 nm lines?",
        "choices": [
          "The wavelength difference between line centers",
          "The linewidth of each individual line",
          "A basis for computing the center-frequency difference"
        ],
        "answer": 1,
        "explain": "0.6 nm separates the centers. Each line has its own locally measured width. c|1/λ₁−1/λ₂| gives center-frequency separation, not either linewidth.",
        "whyOther": "The first and third statements are valid, so they are not the requested incorrect identification. Distinguish line separation from linewidth before discussing temporal coherence.",
        "id": "1.4.1:q2"
      },
      {
        "stem": "Are all lasers infinite-duration, strictly single-frequency, and perfectly coherent?",
        "choices": [
          "Yes, because lasers always have one frequency",
          "No, therefore lasers have no coherence",
          "No; real lasers have finite bandwidth and may be multimode"
        ],
        "answer": 2,
        "explain": "A perfect single frequency is a model. Cavity modes, noise, and operating state affect real lasers. Many have excellent coherence, but excellent does not mean infinite coherence time or fully ideal parameters.",
        "whyOther": "The first treats an idealization as universal. The second wrongly turns not perfectly coherent into no coherence at all.",
        "id": "1.4.1:q3"
      }
    ]
  };
  const guide = {
    question: ["太阳、钠灯和激光都发光，为什么不能用同一个单色波代表？", "Why not represent sunlight, a sodium lamp and a laser by one monochromatic wave?"],
    setup: ["前面用一种频率和理想几何讨论传播，现在回到“光从哪里来”。真实光源常同时含有许多频率。先看它把功率分配在哪些颜色，再决定能否在当前问题中简化成单色波。", "We used a single frequency and ideal geometries for propagation. Real sources often contain many frequencies. First inspect how their power is distributed across wavelengths, then decide whether a monochromatic approximation fits the problem."],
    terms: [
      { name: ["光谱", "Spectrum"], meaning: ["把不同波长（或频率）的成分分开，看各有多强，不是另一条空间波形。", "Shows how strong different wavelength or frequency components are, not another spatial waveform."] },
      { name: ["谱线 / 线宽", "Spectral line / linewidth"], meaning: ["谱线是集中在某一波长附近的成分；真实线通常有宽度，不是数学上无限细的一根线。", "A line is concentrated around a wavelength; a real line generally has finite width."] },
      { name: ["相干性", "Coherence"], meaning: ["比较两处或两个时刻的振动，问相位关系能否保持相关；不等于肉眼觉得颜色纯。", "How reliably oscillations at two positions or times retain a correlated phase relation; not simply perceived colour purity."] }
    ],
    observe: ["比较三种谱形的横轴。宽背景表示许多波长，几座窄峰表示几组集中成分；图只比较形状，不比较三种光源谁总功率更大。", "Compare the spectrum axes. A broad background contains many wavelengths; narrow peaks mark concentrated groups. These schematic shapes do not compare total source powers."],
    blocks: [
      { title: ["先看功率分给哪些波长，再谈光源类别", "Look at wavelength content before classifying the source"], before: ["同样“亮着”可能来自不同过程：热辐射往往覆盖宽范围；气体放电可产生原子或离子的特征线；激光通过受激辐射与反馈形成输出。这里把三类并列，是为了帮助选择模型，不是要背三个名词后就算学会。", "The same visible glow can arise from different processes: thermal radiation often spans a broad range; a discharge produces characteristic atomic or ionic lines; laser output involves stimulated emission and feedback. The comparison helps select models, not merely memorize three names."], read: ["先用图判断“连续范围还是若干峰”，再留意峰有多宽、是否多峰。实际激光也可能多模、有有限线宽，所以任何一类光源都不能只凭名字就视作绝对单色。", "First distinguish a continuous range from peaks, then ask how broad and numerous the peaks are. A laser can have multiple modes and finite linewidth; no category name alone guarantees perfect monochromaticity."] },
      { title: ["从光谱走向干涉，还欠一个稳定相位关系", "From spectra to interference, ask about phase stability"], before: ["光谱告诉我们包含哪些节拍，但能否观察到稳定干涉，还要看被比较的光场是否保持相位关联。可以把干涉先理解为两路波叠加后有时加强、有时削弱；若相对阶段迅速乱变，稳定的明暗关系就难以保留。", "A spectrum tells us which rhythms are present. Stable interference also requires correlated phases in the fields being compared. Think of interference as waves reinforcing or weakening each other; rapidly wandering relative stages make a stable pattern difficult to retain."], read: ["窄谱有助于延迟后的时间关联，但空间关联还取决于源尺寸和观察几何。于是合理的选择顺序是：看光谱 → 看本题要比较什么 → 再选单色、点源或其他近似，不是看起来一种颜色就直接套单色公式。", "A narrow spectrum supports temporal correlation, while spatial correlation also depends on source size and geometry. Choose a model by checking the spectrum, the comparison the problem needs, then the relevant approximation—not merely the apparent colour."] },
      { title: ["两条很近的黄线，仍是两种不同节拍", "Two nearby yellow lines still represent different rhythms"], before: ["用上一节的 ν=c/λ，把两条钠黄线各自换成频率后再相减。这样算出的量叫两条线中心的频差；它没有告诉我们每条线自身有多宽。先统一 nm 到 m，避免数量级出错。", "Use ν=c/λ to convert each sodium line to frequency, then subtract. The result is the difference of line centres, not either line's own width. Convert nm to m first."], read: ["589 nm 与 589.6 nm 对应约 5.18×10¹¹ Hz 的中心频差。这个例子解释“肉眼颜色接近仍非同一个频率”，而不是从双线间距直接计算光源的相干时间。接下来再问，电荷怎样辐射这些光？", "589 nm and 589.6 nm differ by about 5.18×10¹¹ Hz in centre frequency. Similar visible colours need not be identical frequencies. This separation alone does not determine coherence time. Next we ask how charges radiate."] }
    ],
    check: { question: ["看到一束很纯的黄色光，为什么还不能断言它只有一个频率？", "Why does apparently pure yellow light not guarantee a single frequency?"], answer: ["视觉分不开的近邻谱线或有限线宽仍可能存在，需要看光谱与观测条件，而不是只凭颜色。", "Nearby lines or finite linewidth may be visually unresolved. Check the spectrum and observation conditions, not colour alone."] },
    next: ["带到 1.4.2：比较光源后，挑一个最简单的经典发光模型，解释辐射方向为何可能不均匀。", "Into §1.4.2: after comparing sources, use a simple classical emitter to explain unequal radiation in different directions."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.4.1"] = {
    ask: ["把归一化谱图从热光源切到窄带激光，能据峰高断定谁的总功率大吗？", "Switch the normalized spectra from thermal to narrowband laser. Can peak height tell which source has more total power?"],
    choices: [["不能，这里只比较谱形", "No, these plots compare shapes only"], ["能，窄峰一定更大", "Yes, a narrow peak must have more power"], ["能，宽谱一定更大", "Yes, a broad spectrum must have more power"]], answer: 0,
    try: ["轮流选三类光源，比较宽背景、放大的双线与窄谱线。", "Cycle through the three sources: broad background, magnified doublet and narrow line."],
    why: ["纵轴分别归一化，峰宽也作了示意放大；本图没有相同标度的谱功率密度，不能积分比较总功率。", "The plots are normalized separately and line widths are exaggerated. There is no common spectral-power scale from which to integrate total power."]
  };
  const deepLab = {
    controls: [["sourceType", 0], ["sourceType", 1]],
    compare: ["依次切热光源、钠双线、窄带激光；记录谱形区别，不比较各自归一化后的峰高。", "Cycle thermal, sodium doublet and narrow laser. Identify shapes, not separately normalized peak heights."],
    relation: ["三种谱形只是示意，峰高各自归一化不能比较总功率。若另有同一绝对刻度的谱功率密度 Sλ（每单位波长的功率，如 W/nm），把每个小波长段的功率累加（积分）才得到总功率 P；图中没有这些绝对数据。", "The three spectral shapes are illustrative; separately normalized peaks do not compare total power. With an absolute spectral power density Sλ (power per unit wavelength, e.g. W/nm) on a shared scale, summing over wavelength (integrating) gives P. This diagram has no such absolute data."],
    formula: "P=\\int S_{\\lambda}(\\lambda)\\,\\mathrm d\\lambda",
    challenge: [["仅看三张各自归一化的谱图，可以比较哪个光源总功率大吗？", "Can separately normalized spectra reveal which source has the largest total power?"], [["能，看最高峰", "Yes, from peak height"], ["不能，需要共同的谱功率标度", "No; a common spectral-power scale is needed"], ["能，看颜色", "Yes, from colour"]], 1],
  };
  deepLab.mistakes = [["各图纵轴分别归一化，最高峰不提供可比较的绝对功率密度。", "Each vertical axis is normalized separately; peak height is not comparable absolute spectral power."], null, ["颜色和中心波长不提供积分所需的共同谱功率刻度。", "Colour and central wavelength do not supply a common spectral-power scale for integration."]];
  const [focus, limitQuestion, limitAnswer] = [["主图并排看谱形，放大的双线小框不是按原横轴比例画的真实线宽。", "Compare spectral shapes; the doublet inset exaggerates width relative to the main axis."], ["归一化峰高能当作三个光源同标度的谱功率密度吗？", "Are normalized peaks comparable absolute spectral-power densities?"], false];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.4.1"] = deepLab;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
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
  figure.background = ["#162a25", "#293d30"];
  figure.animated = false;
  window.OpticsExtraVisuals.sources = figure;
})();

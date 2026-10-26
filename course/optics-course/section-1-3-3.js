/* Chapter 1, section 1.3.3: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.3.3",
    "title": "柱面波的波函数",
    "pages": "14–15",
    "pdf": 24,
    "visual": "cylindrical",
    "overview": "把点源拉长为理想线源，功率扩散到圆柱侧面，振幅衰减改为 1/√r。还要指出教材简式与严格柱坐标方程之间的近似关系。",
    "bridge": {
      "previous": "球面扩散面积随 r² 增长。",
      "current": "线源单位长度功率扩散到周长 2πr，建立圆柱远场模型。",
      "next": "1.4 转向光源本身及能量流。"
    },
    "goals": [
      "区分到线源的垂距与球面半径",
      "比较两种扩散的幅值与强度",
      "辨认 kr≫1 的远场要求"
    ],
    "symbols": [
      [
        "r",
        "到无限线源的垂直距离",
        "m"
      ],
      [
        "pℓ",
        "单位轴长向外辐射功率",
        "W/m",
        "算例：1 W/m"
      ],
      [
        "Cℓ",
        "柱面波幅值系数",
        "V/√m"
      ],
      [
        "k",
        "介质中的波数",
        "rad/m",
        "远场：kr≫1"
      ]
    ],
    "blocks": [
      {
        "label": "线源几何",
        "title": "扩散面积少了一个 r",
        "eq": [
          {
            "text": "I(r)=\\frac{p_\\ell}{2\\pi r},\\qquad A(r)\\propto r^{-1/2}",
            "tex": true
          },
          {
            "text": "\\widetilde u\\approx\\frac{C_\\ell}{\\sqrt r}e^{i(kr-\\omega t)}",
            "tex": true
          }
        ],
        "text": [
          "理想无限长、沿轴均匀的线源产生同轴圆柱波面。取长度 L 的圆柱侧面，面积为 2πrL；两端无轴向净流时，功率守恒给 I·2πrL=pℓL。",
          "因此强度为 1/r，振幅为 1/√r。长窄缝可在有限范围内近似这种波，但缝长有限时，远到能分辨端部后就不能一直使用无限线源模型。"
        ]
      },
      {
        "label": "精度辨析",
        "title": "教材简式不是处处精确的柱坐标解",
        "eq": [
          {
            "text": "f(r)=r^{-1/2}e^{ikr},\\qquad f^{\\prime\\prime}+\\frac{f^\\prime}{r}+k^2f=\\frac{f}{4r^2}",
            "tex": true
          }
        ],
        "steps": [
          [
            "先写方程",
            "对无轴向与角向变化的标量简谐场，三维波动方程化为 $f^{\\prime\\prime}+f^\\prime/r+k^2f=0$。这是柱坐标径向亥姆霍兹方程，不是球坐标形式。"
          ],
          [
            "一阶导数",
            "把教材的远场空间因子 $f=r^{-1/2}e^{ikr}$ 代入前，先求 $f^\\prime=f(ik-1/(2r))$。"
          ],
          [
            "二阶导数",
            "再次求导得 $f^{\\prime\\prime}=f[-k^2-ik/r+3/(4r^2)]$。"
          ],
          [
            "代入与误差",
            "将一阶与二阶结果逐项代回，余项为 f/(4r²)，相对 k²f 的量级为 1/(4k²r²)。kr≫1 时才可忽略。严格外向解是零阶第一类汉克尔函数 H₀⁽¹⁾(kr)，其远场常相位和系数可并入 Cℓ。"
          ]
        ],
        "note": "书中式 (1.47)–(1.48) 用于几何扩散讨论；本课明确标为远场近似，不把 r→0 附近的奇异简式当精确解。"
      },
      {
        "label": "距离对比",
        "title": "从 r 到 4r，两个模型谁衰减更慢？",
        "text": [
          "柱面波振幅比为 1/2，强度比为 1/4；球面波振幅比为 1/4，强度比为 1/16。若 pℓ=1 W/m，r=1 m 与 4 m 处 I≈0.1592 与 0.03979 W/m²。"
        ]
      }
    ],
    "questions": [
      {
        "stem": "理想柱面远场从 r 到 4r，振幅比为？",
        "choices": [
          "$\\frac{1}{4}$",
          "$\\frac{1}{2}$",
          "$\\frac{1}{16}$"
        ],
        "answer": 1,
        "explain": "柱面强度 I∝1/r，所以强度比为 1/4；振幅为强度的平方根，因此振幅比为 1/2。比较的是同一介质、同一线源的不同半径。",
        "whyOther": "1/4 是球面波在这个距离比下的振幅比，或柱面波的强度比；1/16 是球面波强度比。必须先识别几何维度。",
        "id": "1.3.3:q1"
      },
      {
        "stem": "柱面波中的 r 应从哪里量起？",
        "choices": [
          "到线源的垂直距离",
          "沿线源轴向的距离",
          "总是到线源某个端点的距离"
        ],
        "answer": 0,
        "explain": "理想无限线源沿轴平移后没有变化，场只依赖垂直于轴的径向距离。等相位面是圆柱侧面而不是以端点为中心的球面。",
        "whyOther": "轴向距离不会产生这种理想模型的径向扩散；端点属于有限源效应，已经超出了无限线源的假设。",
        "id": "1.3.3:q2"
      },
      {
        "stem": "r⁻¹ᐟ²exp(ikr) 代入径向亥姆霍兹方程有余项，应怎样使用？",
        "choices": [
          "所有 r 上都完全精确",
          "只能在 r=0 使用",
          "作为 kr≫1 的远场近似"
        ],
        "answer": 2,
        "explain": "余项为 f/(4r²)，相对 k²f 的比例为 1/(4k²r²)，所以当 kr≫1 时才可忽略。这不否定能量守恒给出的远场扩散律，而是为它划定精度边界。",
        "whyOther": "“所有 r 精确”忽略已算出的非零余项；r=0 恰恰是远场表达式不能使用的位置。",
        "id": "1.3.3:q3"
      }
    ]
  };
  const translation = {
    "code": "1.3.3",
    "title": "The cylindrical-wave function",
    "pages": "14–15",
    "pdf": 24,
    "visual": "cylindrical",
    "overview": "Stretch a point source into an ideal line source. Power spreads over a cylindrical side surface and amplitude scales as 1/√r. Separate the textbook expression from an exact cylindrical-wave solution.",
    "bridge": {
      "previous": "Spherical spreading area grows as r².",
      "current": "Power per unit source length spreads over circumference 2πr, giving a cylindrical far-field model.",
      "next": "§1.4 turns to the source itself and energy flow."
    },
    "goals": [
      "Distinguish perpendicular distance to a line from spherical radius",
      "Compare amplitude and intensity spreading",
      "Identify the kr≫1 far-field condition"
    ],
    "symbols": [
      [
        "r",
        "perpendicular distance to an infinite line source",
        "m"
      ],
      [
        "pℓ",
        "outward power per unit axial length",
        "W/m",
        "Example: 1 W/m"
      ],
      [
        "Cℓ",
        "cylindrical amplitude coefficient",
        "V/√m"
      ],
      [
        "k",
        "wavenumber in medium",
        "rad/m",
        "Far field: kr≫1"
      ]
    ],
    "blocks": [
      {
        "label": "Line-source geometry",
        "title": "One fewer power of r",
        "eq": [
          {
            "text": "I(r)=\\frac{p_\\ell}{2\\pi r},\\qquad A(r)\\propto r^{-1/2}",
            "tex": true
          },
          {
            "text": "\\widetilde u\\approx\\frac{C_\\ell}{\\sqrt r}e^{i(kr-\\omega t)}",
            "tex": true
          }
        ],
        "text": [
          "An ideal infinite uniform line source gives coaxial cylindrical wavefronts. A side surface of length L has area 2πrL. With no net axial flow through the ends, conservation gives I·2πrL=pℓL.",
          "Intensity scales as 1/r and amplitude as 1/√r. A long narrow slit can approximate this over a limited region. Finite end effects eventually invalidate the infinite-line model."
        ]
      },
      {
        "label": "Accuracy check",
        "title": "The textbook form is not exact at every radius",
        "eq": [
          {
            "text": "f(r)=r^{-1/2}e^{ikr},\\qquad f^{\\prime\\prime}+\\frac{f^\\prime}{r}+k^2f=\\frac{f}{4r^2}",
            "tex": true
          }
        ],
        "steps": [
          [
            "State the equation",
            "For a scalar harmonic field with no axial or angular dependence, the wave equation becomes $f^{\\prime\\prime}+f^\\prime/r+k^2f=0$, the cylindrical radial Helmholtz equation, not its spherical counterpart."
          ],
          [
            "First derivative",
            "Before substituting the textbook far-field factor $f=r^{-1/2}e^{ikr}$, compute $f^\\prime=f(ik-1/(2r))$."
          ],
          [
            "Second derivative",
            "Differentiating again gives $f^{\\prime\\prime}=f[-k^2-ik/r+3/(4r^2)]$."
          ],
          [
            "Substitution and error",
            "Substitution leaves f/(4r²), of relative size 1/(4k²r²) against k²f. It is negligible only for kr≫1. The exact outgoing solution is the order-zero Hankel function H₀⁽¹⁾(kr); its far-field constant phase and factor can be absorbed into Cℓ."
          ]
        ],
        "note": "Book Eqs. (1.47)–(1.48) express geometric spreading. This course explicitly treats them as far-field approximations, not exact solutions near r=0."
      },
      {
        "label": "Distance comparison",
        "title": "From r to 4r, which model decays more slowly?",
        "text": [
          "For a cylindrical wave the amplitude ratio is 1/2 and intensity ratio 1/4; for a spherical wave they are 1/4 and 1/16. With pℓ=1 W/m, intensities at 1 m and 4 m are approximately 0.1592 and 0.03979 W/m²."
        ]
      }
    ],
    "questions": [
      {
        "stem": "From r to 4r in a cylindrical far field, what is the amplitude ratio?",
        "choices": [
          "$\\frac{1}{4}$",
          "$\\frac{1}{2}$",
          "$\\frac{1}{16}$"
        ],
        "answer": 1,
        "explain": "Cylindrical intensity scales as 1/r, so the intensity ratio is 1/4 and its square-root amplitude ratio is 1/2, comparing radii for the same source and medium.",
        "whyOther": "1/4 is the spherical amplitude ratio or cylindrical intensity ratio. 1/16 is the spherical intensity ratio. Identify the spreading geometry before using a power law.",
        "id": "1.3.3:q1"
      },
      {
        "stem": "Where is r measured from in a cylindrical wave?",
        "choices": [
          "Perpendicular distance to the line source",
          "Axial distance along the source",
          "Always the distance to one endpoint"
        ],
        "answer": 0,
        "explain": "An infinite uniform line source is invariant under axial translation, so the field depends on perpendicular radial distance. Wavefronts are cylindrical side surfaces, not spheres about an endpoint.",
        "whyOther": "Axial distance is not the spreading radius. Endpoints introduce finite-source effects outside the infinite-line assumptions.",
        "id": "1.3.3:q2"
      },
      {
        "stem": "Substituting r⁻¹ᐟ²exp(ikr) leaves a residual in the radial Helmholtz equation. How should it be used?",
        "choices": [
          "As exact at every r",
          "Only at r=0",
          "As a far-field approximation for kr≫1"
        ],
        "answer": 2,
        "explain": "The residual is f/(4r²), with relative size 1/(4k²r²) against k²f, negligible for kr≫1. This defines the accuracy boundary rather than invalidating the far-field spreading law.",
        "whyOther": "Exactness at every r ignores the computed nonzero residual. r=0 is precisely where the far-field expression is unusable.",
        "id": "1.3.3:q3"
      }
    ]
  };
  const guide = {
    question: ["点状小灯和很长的发光线，远离后会一样快地变弱吗？", "Do a point source and a long luminous line weaken at the same rate?"],
    setup: ["我们不换守恒定律，只换源的几何。点源对应球壳；理想无限长、沿轴均匀的线源对应同轴圆柱。比较等长的一段圆柱侧面，就能看出距离规律为什么改变。", "Keep the conservation law but change source geometry. A point source gives shells; an ideal infinitely long uniform line gives coaxial cylinders. Comparing equal-length cylindrical side surfaces reveals why the distance law changes."],
    terms: [
      { name: ["柱面波", "Cylindrical wave"], meaning: ["同相位面像套在线源外的圆筒；r 是到线的垂直距离，不是到某个端点的距离。", "Equal-phase fronts are cylinders around the source line; r is perpendicular distance to the line, not distance to an endpoint."] },
      { name: ["pℓ", "pℓ"], meaning: ["线源每米长度向外送出的功率，单位 W/m；与点源的总功率 P 不同。", "Power emitted outward per unit source length, in W/m; different from a point source's total P."] },
      { name: ["远场近似", "Far-field approximation"], meaning: ["这里要求距离比波长尺度大得多，记为 kr≫1；离源很近不能把简式当精确解。", "Here kr≫1 means distance is large on the wavelength scale; the simple expression is not exact near the source."] }
    ],
    observe: ["把距离比从 1 增至 4，分别看柱面与球面两组读数。先比较它们的面积怎么长，再读幅度比，不要直接背两个不同的幂次。", "Increase distance ratio from 1 to 4 and compare cylindrical and spherical readings. Think about how their areas grow before reading amplitude ratios, rather than memorizing two powers."],
    blocks: [
      { title: ["球面积随 r² 长，圆柱侧面积只随 r 长", "Sphere area grows as r²; cylinder side area only as r"], before: ["取同样长的线源段 L，半径 r 的圆柱侧面积是周长 2πr 乘 L。r 加倍只让侧面积加倍，不像球面会变四倍。同一段每秒送出的功率是 pℓL，所以每平方米的光强随 1/r 下降；振幅是平方根关系，才得到 1/√r。", "For a fixed source length L, cylinder side area is circumference 2πr times L. Doubling r doubles that area, unlike the fourfold spherical increase. The segment emits pℓL, so intensity decreases as 1/r; taking the square root gives amplitude proportional to 1/√r."], read: ["波函数仍用余弦或复指数记录传播阶段，只把幅度包络改成柱面扩散的形式。符号 ≈ 提醒我们这是 kr≫1 下的简式，下一步专门解释这个限制，不另换话题。", "The wave function still uses a cosine or exponential for propagation phase; only the amplitude envelope changes with spreading geometry. The ≈ symbol marks a kr≫1 approximation. We explain that limitation next."] },
      { title: ["为什么守恒给出的简式还要检查精度？", "Why check accuracy even after using conservation?"], before: ["几何守恒只给远处衰减，不能保证猜出的复振幅在任意距离都满足波动方程。这里只看没有轴向变化的径向函数 f(r)=r⁻¹ᐟ²exp(ikr)，撇号表示对 r 求导；柱对称的空间项是一阶径向项 f′/r 加二阶项 f″。把它代入径向方程后检查剩余量，而不是照搬球面公式。", "Spreading gives far-field decay but does not make a guessed complex amplitude an exact solution everywhere. For radial f(r)=r⁻¹ᐟ²exp(ikr) without axial variation, primes mean derivatives with respect to r. The cylindrical spatial terms are f″ and f′/r. Substitution measures the remaining error; the spherical formula does not apply."], read: ["余项 f/(4r²) 与主项 k²f 相比约为 1/(4k²r²)，仅当 kr≫1 才小。汉克尔函数是严格解的名称，第一次学无需掌握它；记住线源简式有距离条件，再使用下一步的比值。", "The residual f/(4r²) is about 1/(4k²r²) relative to k²f, small only for kr≫1. A Hankel function names the exact solution; you need not master it on first reading. Keep this distance condition when using the following ratios."], advanced: true },
      { title: ["用同一个四倍距离，公平比较两种扩散", "Compare both geometries at the same fourfold distance"], before: ["在各自适用的无吸收模型里，从 r 走到 4r。柱面侧面积变四倍，所以强度变 1/4、幅度变 1/2；球面积变十六倍，所以强度变 1/16、幅度变 1/4。比较必须在同一个距离比下进行。", "Within each model's nonabsorbing regime, move from r to 4r. Cylinder area becomes fourfold, giving intensity 1/4 and amplitude 1/2. Sphere area becomes sixteenfold, giving intensity 1/16 and amplitude 1/4. Use the same distance ratio for a fair comparison."], read: ["若 pℓ=1 W/m，r=4 m 时 I=1/(8π)≈0.03979 W/m²。柱面衰减慢不是凭空多出能量，而是面积摊开得更慢；有限长的真实线源不能在任意远处永远按无限线模型算。", "For pℓ=1 W/m and r=4 m, I=1/(8π)≈0.03979 W/m². Slower weakening does not create energy; area grows more slowly. A finite real line source cannot obey the infinite-line model at arbitrarily large distances."] }
    ],
    check: { question: ["柱面波衰减比球面波慢，是否违反能量守恒？", "Does slower cylindrical decay violate energy conservation?"], answer: ["没有。守恒的是总功率；分摊面积随距离增长得不同，每单位面积剩下的功率自然不同。", "No. Total power is conserved. Different area growth gives different power per unit area."] },
    next: ["带到 1.4.1：点源、线源都是方便的模型。接下来看看真实光源有什么不同，以及何时可以用这些理想模型。", "Into §1.4.1: point and line sources are convenient models. Next we examine real sources and when those models are useful."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.3.3"] = {
    ask: ["远场中距离加倍，理想线源与点源的场振幅谁下降得更慢？", "In the far field, double distance. Which field amplitude falls more slowly: ideal line or point source?"],
    choices: [["点源", "Point source"], ["一样快", "They fall equally fast"], ["线源", "Line source"]], answer: 2,
    try: ["调到 r/r₀=2，比较两条幅度条；不要把强度律当幅度律。", "Set r/r₀=2 and compare the amplitude bars, not intensity laws."],
    why: ["柱面远场 A∝1/√r，球面 A∝1/r；加倍距离分别为 1/√2 与 1/2。柱面式需要 kr≫1。", "Cylindrical far-field A∝1/√r, spherical A∝1/r: at twice the distance these are 1/√2 and 1/2. The cylindrical form assumes kr≫1."]
  };
  const deepLab = {
    controls: [["radiusRatio", 1], ["radiusRatio", 2]],
    compare: ["距离从 r₀ 到 2r₀：分开读柱面和球面两根场振幅条，不要把强度比混进来。", "From r₀ to 2r₀ compare cylindrical and spherical field-amplitude bars separately, not intensity."],
    relation: ["理想无限线源远场的柱面面积随 r 变，强度 ∝1/r、场振幅 ∝1/√r；点源球面振幅 ∝1/r。", "For an ideal infinite line in the far field, cylindrical area grows with r: intensity ∝1/r and amplitude ∝1/√r. A point-source spherical amplitude goes as 1/r."],
    formula: "A_{\\mathrm{cyl}}/A_0=\\sqrt{r_0/r},\\qquad A_{\\mathrm{sph}}/A_0=r_0/r",
    challenge: [["理想柱面远场 r 从 r₀ 到 4r₀，场振幅剩多少？", "In the ideal cylindrical far field, go from r₀ to 4r₀. How much amplitude remains?"], [["1/4", "One quarter"], ["1/2", "One half"], ["1/16", "One sixteenth"]], 1],
  };
  deepLab.mistakes = [["1/4 是球面波到 4r₀ 的振幅比；柱面远场要取平方根。", "One quarter is the spherical amplitude ratio at 4r₀; the cylindrical far field requires a square root."], null, ["1/16 把球面积的平方关系再次用于振幅，混淆了模型和物理量。", "One sixteenth mixes the spherical intensity law with the cylindrical amplitude."]];
  const [focus, limitQuestion, limitAnswer] = [["图中两根条都是场振幅，不是总功率；柱面公式只取远场。", "Both bars show field amplitude, not total power; the cylindrical law is far-field only."], ["本图的柱面 1/√r 振幅式限定在 kr≫1 远场吗？", "Is the cylindrical 1/√r amplitude restricted to the kr≫1 far field here?"], true];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.3.3"] = deepLab;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
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
  figure.animated = true;
  window.OpticsExtraVisuals.cylindrical = figure;
})();

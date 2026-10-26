/* Chapter 1, section 1.6.1: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.6.1",
    "title": "反射定律和折射定律",
    "pages": "21–22",
    "pdf": 31,
    "visual": "snell",
    "overview": "反射角等于入射角并非只靠光线作图。静止平面界面上，三束波必须有相同频率与相同切向波矢量，这就给出方向定律。",
    "bridge": {
      "previous": "1.5 给出两侧总场的切向连续。",
      "current": "利用界面上处处、时时成立的相位匹配推出方向定律。",
      "next": "1.6.2 在方向确定后求振幅比。"
    },
    "goals": [
      "把角度统一从法线量起",
      "由切向相位匹配推出斯涅耳定律",
      "区分频率保持与波长变化"
    ],
    "symbols": [
      [
        "n₁, n₂",
        "入射、透射介质折射率",
        "1",
        "算例：1 与 1.5"
      ],
      [
        "θ₁, θᵣ, θ₂",
        "入射、反射、折射角，均相对法线",
        "°",
        "算例：30°、30°、19.47°"
      ],
      [
        "ω",
        "三束光相同的角频率",
        "rad/s"
      ],
      [
        "k∥",
        "波矢量的界面切向分量",
        "rad/m"
      ]
    ],
    "blocks": [
      {
        "label": "相位匹配",
        "title": "同一界面不能同时要求不同的时间节拍",
        "eq": [
          {
            "text": "\\omega_i=\\omega_r=\\omega_t,\\qquad\\mathbf k_{i\\parallel}=\\mathbf k_{r\\parallel}=\\mathbf k_{t\\parallel}",
            "tex": true
          }
        ],
        "text": [
          "把每束波写为 A exp[i(k·r−ωt)]，代入无面源的切向连续条件。等式必须对界面上所有 r∥ 和所有 t 成立；非零相关波的指数因子因而需要相同时间与切向空间频率。",
          "此结论假定界面静止、平坦且不随时间调制；移动或时变界面会改变频率匹配条件，本节不包含这种情形。"
        ]
      },
      {
        "label": "方向推导",
        "title": "从 k∥ 到反射与折射角",
        "eq": [
          {
            "text": "\\theta_r=\\theta_1",
            "tex": true
          },
          {
            "text": "n_1\\sin\\theta_1=n_2\\sin\\theta_2",
            "tex": true,
            "ref": "snell-law"
          }
        ],
        "steps": [
          [
            "使用的关系",
            "使用上方 k∥ 匹配、介质中 k=nω/c 和几何分量 k∥=k sinθ。法向分量的符号由光传播到界面还是离开界面决定。"
          ],
          [
            "反射在同一介质",
            "入射与反射有相同 n₁、ω，因而 kᵢ=kᵣ。切向相等给 sinθ₁=sinθᵣ；在 0° 至 90° 范围得到 θᵣ=θ₁。"
          ],
          [
            "透射进入另一介质",
            "kᵢsinθ₁=kₜsinθ₂ 中消去共同 ω/c，得到 n₁sinθ₁=n₂sinθ₂。共同切向方向与法线还确定三条光线共面。"
          ]
        ]
      },
      {
        "label": "带单位算例",
        "title": "频率不变，波长与角度一起改变",
        "eq": [
          {
            "text": "\\theta_2=\\arcsin\\left(\\frac{n_1}{n_2}\\sin\\theta_1\\right),\\qquad\\lambda_2=\\lambda_1\\frac{n_1}{n_2}",
            "tex": true
          }
        ],
        "text": [
          "空气 n₁=1 到玻璃 n₂=1.5，θ₁=30°：sinθ₂=1/3，θ₂≈19.47°。若空气波长约 600 nm，则玻璃中约 400 nm；频率保持约 5.00×10¹⁴ Hz。"
        ],
        "note": "当 n₁>n₂ 且计算得到 sinθ₂>1 时，不存在实数传播折射角；本批图会提示全反射边界，倏逝场与相移留给 1.7。"
      }
    ],
    "questions": [
      {
        "stem": "空气到 n=1.5 玻璃，入射角 30°，折射角约为？",
        "choices": [
          "19.47°",
          "45°",
          "30°"
        ],
        "answer": 0,
        "explain": "所有角相对法线。斯涅耳定律给 sinθ₂=(1/1.5)sin30°=1/3，故 θ₂≈19.47°。进入更高折射率介质，传播光线靠近法线。",
        "whyOther": "45° 把折射率比例方向弄反或直接乘角度；30° 只在同折射率或正入射等特定条件成立。斯涅耳定律匹配的是正弦。",
        "id": "1.6.1:q1"
      },
      {
        "stem": "光穿过静止界面，哪一量在三束波间保持相同？",
        "choices": [
          "波长",
          "频率",
          "速度"
        ],
        "answer": 1,
        "explain": "边界关系必须对任意 t 成立，时间指数中的 ω 必须匹配。因此频率相同，但不同介质 v=c/n、λ=v/ν 一般不同。",
        "whyOther": "波长与速度会随介质改变；相同频率不意味着所有空间周期也相同。静止、无时间调制是这里的重要前提。",
        "id": "1.6.1:q2"
      },
      {
        "stem": "如果 n₁sinθ₁/n₂>1，应如何解释？",
        "choices": [
          "直接把折射角设成 100°",
          "忽略这个结果，令 θ₂=0°",
          "没有实数传播折射角，进入全反射情形"
        ],
        "answer": 2,
        "explain": "实数角度的正弦不能大于 1。因此不能再画一条进入介质 2 的普通传播光线；需用 1.7 的全反射与倏逝场模型，而不是强行求实数反正弦。",
        "whyOther": "100° 的正弦仍不大于 1，不能修复矛盾；令 0° 则违反已给定的切向相位匹配条件。",
        "id": "1.6.1:q3"
      }
    ]
  };
  const translation = {
    "code": "1.6.1",
    "title": "Laws of reflection and refraction",
    "pages": "21–22",
    "pdf": 31,
    "visual": "snell",
    "overview": "Equal incidence and reflection angles follow from more than ray sketches. At a stationary planar interface, three waves share frequency and tangential wavevector, which determines their directions.",
    "bridge": {
      "previous": "§1.5 supplies tangential continuity of total fields.",
      "current": "Use phase matching everywhere and at all times on the interface.",
      "next": "§1.6.2 finds amplitude ratios once directions are known."
    },
    "goals": [
      "Measure all angles from the normal",
      "Derive Snell law from tangential phase matching",
      "Distinguish conserved frequency from changed wavelength"
    ],
    "symbols": [
      [
        "n₁, n₂",
        "incident and transmitted refractive indices",
        "1",
        "Example: 1 and 1.5"
      ],
      [
        "θ₁, θᵣ, θ₂",
        "incidence, reflection, refraction angles from the normal",
        "°",
        "Example: 30°, 30°, 19.47°"
      ],
      [
        "ω",
        "shared angular frequency",
        "rad/s"
      ],
      [
        "k∥",
        "tangential wavevector component",
        "rad/m"
      ]
    ],
    "blocks": [
      {
        "label": "Phase matching",
        "title": "One interface cannot impose different temporal frequencies",
        "eq": [
          {
            "text": "\\omega_i=\\omega_r=\\omega_t,\\qquad\\mathbf k_{i\\parallel}=\\mathbf k_{r\\parallel}=\\mathbf k_{t\\parallel}",
            "tex": true
          }
        ],
        "text": [
          "Write each wave as A exp[i(k·r−ωt)] and insert it into tangential continuity without sheet sources. Equality holds for every interface position r∥ and all t, requiring equal temporal and tangential spatial frequencies for the participating nonzero waves.",
          "The interface is stationary, planar, and not time modulated. Moving or time-varying boundaries can change frequency matching and are excluded."
        ]
      },
      {
        "label": "Direction derivation",
        "title": "From k∥ to reflection and refraction angles",
        "eq": [
          {
            "text": "\\theta_r=\\theta_1",
            "tex": true
          },
          {
            "text": "n_1\\sin\\theta_1=n_2\\sin\\theta_2",
            "tex": true,
            "ref": "snell-law"
          }
        ],
        "steps": [
          [
            "Relations used",
            "Use tangential matching above, k=nω/c, and k∥=k sinθ. The normal-component sign is selected by propagation toward or away from the interface."
          ],
          [
            "Reflection stays in one medium",
            "Incident and reflected waves share n₁ and ω, hence the same k magnitude. Equal tangential components give sinθ₁=sinθᵣ and θᵣ=θ₁ for angles between 0° and 90°."
          ],
          [
            "Transmission enters a different medium",
            "Cancel the common ω/c in kᵢsinθ₁=kₜsinθ₂ to obtain n₁sinθ₁=n₂sinθ₂. The shared tangential direction and normal establish coplanarity."
          ]
        ]
      },
      {
        "label": "Worked example",
        "title": "Frequency stays fixed while wavelength and angle change",
        "eq": [
          {
            "text": "\\theta_2=\\arcsin\\left(\\frac{n_1}{n_2}\\sin\\theta_1\\right),\\qquad\\lambda_2=\\lambda_1\\frac{n_1}{n_2}",
            "tex": true
          }
        ],
        "text": [
          "From air n₁=1 to glass n₂=1.5 with θ₁=30°, sinθ₂=1/3 and θ₂≈19.47°. An air wavelength of about 600 nm becomes about 400 nm in glass, with frequency about 5.00×10¹⁴ Hz unchanged."
        ],
        "note": "If n₁>n₂ and sinθ₂>1, there is no real propagating refraction angle. The figure flags this boundary; evanescent fields and phase shifts belong to §1.7."
      }
    ],
    "questions": [
      {
        "stem": "From air to n=1.5 glass at 30° incidence, what is the refraction angle?",
        "choices": [
          "19.47°",
          "45°",
          "30°"
        ],
        "answer": 0,
        "explain": "All angles are from the normal. Snell law gives sinθ₂=(1/1.5)sin30°=1/3, hence θ₂≈19.47°. The transmitted ray bends toward the normal.",
        "whyOther": "45° reverses the ratio or multiplies angles directly. 30° requires special conditions such as matched indices. Snell law matches sines, not angles themselves.",
        "id": "1.6.1:q1"
      },
      {
        "stem": "Which quantity is shared by the three waves at a stationary interface?",
        "choices": [
          "Wavelength",
          "Frequency",
          "Speed"
        ],
        "answer": 1,
        "explain": "Boundary equality holds for every t, requiring matching ω. Frequency is shared, while v=c/n and λ=v/ν generally change between media.",
        "whyOther": "Wavelength and speed may change. Equal frequency does not imply equal spatial period. A stationary, unmodulated boundary is essential here.",
        "id": "1.6.1:q2"
      },
      {
        "stem": "How should n₁sinθ₁/n₂>1 be interpreted?",
        "choices": [
          "Set the refraction angle to 100°",
          "Ignore it and set θ₂=0°",
          "No real propagating refraction angle; total internal reflection applies"
        ],
        "answer": 2,
        "explain": "A real sine cannot exceed 1. There is no ordinary propagating transmitted ray into medium 2. The total-reflection and evanescent-field model in §1.7 is needed.",
        "whyOther": "The sine of 100° still cannot exceed 1. Setting 0° violates the prescribed tangential phase matching.",
        "id": "1.6.1:q3"
      }
    ]
  };
  const guide = {
    question: ["光打到玻璃上，为什么不是朝任意方向反射、折射？", "Why does light not reflect and refract in arbitrary directions?"],
    setup: ["上一节要求界面两侧的总场接得上。在第一侧，总场包含入射光和反射光；第二侧有透射光。本节先不算分走多少能量，只解决三束光的节拍与方向。条件是界面平坦、静止、不随时间变化，材料线性。", "The previous section required the total fields to match at an interface. The first side contains incident and reflected light; the second contains transmitted light. Before calculating energy shares, we determine their rhythms and directions. We assume a flat stationary time-invariant interface and linear materials."],
    terms: [
      { name: ["入射 / 反射 / 透射", "Incident / reflected / transmitted"], meaning: ["来向界面的光、返回原介质的光、进入另一介质的光；下标 i、r、t 分别标记它们。", "Light approaching the surface, returning into its original medium, or entering the other medium. Subscripts i, r, t label them."] },
      { name: ["法线与三个角", "Normal and three angles"], meaning: ["法线垂直界面；θ₁、θᵣ、θ₂ 都从法线量起，不是从表面量起。n₁、n₂ 是两侧折射率。", "The normal is perpendicular to the surface. θ₁, θᵣ and θ₂ are measured from it, not from the surface. n₁ and n₂ are the two refractive indices."] },
      { name: ["ω / k∥", "ω / k∥"], meaning: ["ω 记录一个点随时间振动的快慢；k∥ 记录沿界面移动时相位怎样变。∥ 表示平行界面的分量。", "ω describes oscillation rate at one point; k∥ describes phase change along the interface. ∥ means the component parallel to that surface."] }
    ],
    observe: ["先找到界面、垂直它的法线和三束箭头，再把入射角从 0° 慢慢调大。比较反射角是否同样增大，以及进入较高折射率材料的光是否更靠近法线。下面解释这些变化为何受限制。", "Identify surface, normal and three arrows, then slowly increase incidence from 0°. Check equal growth of the reflected angle and bending toward the normal in higher-index material. We now explain what constrains these changes."],
    blocks: [
      { title: ["先对准两种节拍：一个点的时间、同一时刻的界面位置", "Match two rhythms: time at one point, position along the surface"], before: ["1.5 的“连续”要求界面每个位置、每个时刻的总场都能接上，不是只在某一点碰巧相等。先固定一个点看时间：单频入射驱动的非零反射、透射不能各按不同频率振动，否则刚接上的等式过一会儿就失配。再固定时刻沿界面走：三波的相位变化率也必须相同，否则在 A 点配好后，到 B 点就配不上。前者给同一个 ω，后者给同一个 k∥；振幅仍可不同。", "Continuity from §1.5 must hold at every surface position and every time, not just by coincidence once. First fix a point: nonzero waves driven by a single-frequency input cannot keep different time frequencies and still match. Then fix time and walk along the surface: phase must change at the same spatial rate, or a match at A fails at B. These requirements give a shared ω and k∥, not necessarily equal amplitudes."], read: ["所以“相位匹配”是在检查两种变化率，不是要求三束电场每一瞬间都同样大、同向。式中 k 是 1.2.3 的传播波矢量，取 ∥ 后只保留沿界面的部分。下一步利用这个共同分量，才把它换成图上的角度。", "Phase matching compares rates of variation, not equal field sizes or directions at every instant. k is the propagation wavevector from §1.2.3; ∥ selects its along-surface part. Next we convert that shared component into the diagram's angles."] },
      { title: ["再把沿界面的投影，翻译成反射角与折射角", "Convert the shared surface projection into ray angles"], before: ["1.2.2 已得到 k=ω/v；再用 1.1 的 n=c/v，即 v=c/n，代回就有 k=nω/c。接着画直角三角形：因为 θ 从法线量，沿界面那条边与斜边 k 的比是 sinθ，所以切向分量是 k sinθ。反射与入射在同一材料，k 长度相同；投影也相同，就给出两个角相等。透射到了另一材料，k 长度变了，只能改变角度来保持同一投影。", "Section 1.2.2 gave k=ω/v. Using n=c/v from §1.1, write v=c/n and substitute to get k=nω/c. In the right triangle, θ is measured from the normal, so the surface-parallel side divided by hypotenuse k is sinθ. The tangential component is therefore k sinθ. Incident and reflected waves share one medium and hence one k magnitude; matching projections gives equal angles. Transmission changes k magnitude, requiring a different angle to keep the projection fixed."], read: ["对透射把 k 换成 nω/c，再约去共同的 ω/c，就得到 n₁sinθ₁=n₂sinθ₂。这叫斯涅耳定律。它不是与上一步突然无关的新公式，而正是“沿界面必须一直配得上”的几何结果。n₂ 更大时 sinθ₂ 更小，所以折射光更靠近法线。", "For transmission substitute nω/c and cancel the shared ω/c to obtain n₁sinθ₁=n₂sinθ₂, Snell's law. It is the geometry of continued matching along the surface, not an unrelated formula. Larger n₂ requires smaller sinθ₂ and bends the ray toward the normal."] },
      { title: ["用同一束光，检查角度变与频率不变能否同时成立", "Check changed angle and unchanged frequency in one beam"], before: ["把刚得到的投影关系用于空气 n₁=1 到玻璃 n₂=1.5，入射角 30°。先求 sinθ₂=(1/1.5)×sin30°=1/3，再反查角度，得约 19.47°。反射仍在空气里，所以反射角仍是 30°。", "For air n₁=1 to glass n₂=1.5 at 30° incidence, sinθ₂=(1/1.5)sin30°=1/3, giving θ₂≈19.47°. Reflection stays in air, so its angle remains 30°."], read: ["若入射波长 600 nm，玻璃中速度变为原来 2/3，而时间节拍不变，因此波长变为 400 nm。这把 1.2.2 的速度—波长关系与本节的角度关系连上了。下一节不再问朝哪走，而问每束的场幅度有多大。", "At incident wavelength 600 nm, speed in glass becomes two thirds while frequency stays fixed, so wavelength becomes 400 nm. This connects §1.2.2's speed–wavelength relation to ray geometry. Next we ask about field sizes rather than directions."] }
    ],
    check: { question: ["为什么沿界面的 k 分量相同，却不要求整个 k 相同？", "Why must the surface component of k match, but not all of k?"], answer: ["边界在同一表面比较场，所以限制沿面相位变化。进入另一材料后速度与波长可变，k 的总长度与法向分量因此可以不同。", "The boundary compares fields on the same surface and constrains phase variation along it. Another material can change speed and wavelength, allowing a different total k and normal component."] },
    next: ["带到 1.6.2：方向已确定，剩下用切向 E、H 的接续规则，解出反射和透射的幅度。", "Into §1.6.2: with directions determined, use tangential E and H matching to find reflected and transmitted amplitudes."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.6.1"] = {
    ask: ["固定 n₁=1，令 n₂>1 并增大入射角，折射角相对入射角怎样？", "With n₁=1 and n₂>1, raise incidence. How does refraction angle compare with incidence?"],
    choices: [["更小、更靠近法线", "Smaller, closer to the normal"], ["更大、更远离法线", "Larger, farther from the normal"], ["两角恒等", "Always equal"]], answer: 0,
    try: ["保持 n₂=1.5 调入射角；然后调 n₂<1，观察有实传播折射角的边界。", "Hold n₂=1.5 and vary incidence; then try n₂<1 and locate the real-refraction boundary."],
    why: ["界面切向波数匹配：n₁sinθ₁=n₂sinθ₂。n₂ 较大时 θ₂ 较小；全反射时不能画实传播折射光线。", "Tangential wavevector matching gives n₁sinθ₁=n₂sinθ₂. Larger n₂ gives smaller θ₂; in total internal reflection there is no real propagating refracted ray."]
  };
  const deepLab = {
    controls: [["incidence", 20], ["incidence", 60]],
    compare: ["固定 n₁=1、n₂=1.5，比较两个入射角的折射角；再试 n₂<1 的传播边界。", "Hold n₁=1, n₂=1.5, compare refraction at two incidence angles; then test the n₂<1 propagation boundary."],
    relation: ["静止平界面切向波数匹配 n₁sinθ₁=n₂sinθ₂；高折射率侧更靠近法线。", "At a stationary planar interface tangential wavenumbers match: n₁sinθ₁=n₂sinθ₂. The higher-index side lies closer to the normal."],
    formula: "n_1\\sin\\theta_1=n_2\\sin\\theta_2",
    challenge: [["从 n₁=1 斜入射到 n₂=1.5，折射光相对法线怎样？", "Oblique incidence from n₁=1 to n₂=1.5: how does the transmitted ray bend?"], [["远离法线", "Away from normal"], ["靠近法线", "Toward normal"], ["角度完全相同", "Same angle"]], 1],
  };
  deepLab.mistakes = [["n₂ 更大时，sinθ₂=(n₁/n₂)sinθ₁ 更小，折射光靠近法线。", "Larger n₂ gives a smaller sinθ₂=(n₁/n₂)sinθ₁, closer to normal."], null, ["两角相同只在特定条件下成立；这里 n₁ 与 n₂ 不同且斜入射。", "Equal angles need special conditions; here indices differ at oblique incidence."]];
  const [focus, limitQuestion, limitAnswer] = [["角度都从法线量，不是从界面量；没实折射角时不要延长透射箭头。", "Measure angles from the normal, not the surface; do not extend a transmitted ray without a real angle."], ["发生全反射时仍能画实传播折射光线吗？", "Can a real propagating transmitted ray be drawn in total internal reflection?"], false];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.6.1"] = deepLab;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
    title: pair("法线、三条光线与守恒频率", "The normal, three rays, and conserved frequency"),
    note: pair("固定 n₁=1，角度从法线量起。可把 n₂ 调低以看到实折射角的边界；全反射时不虚构传播透射光线，近界面倏逝场未画。", "Fixed n₁=1; angles are from the normal. Lower n₂ to reach the real-refraction boundary. No propagating transmitted ray is invented under total reflection; the evanescent near-interface field is omitted."),
    settings: [slider("incidence", "入射角 θ₁", "Incidence angle θ₁", 0, 85, 1, 30, "°"), slider("index2", "透射介质 n₂", "Transmitted index n₂", .6, 2.4, .1, 1.5)],
    draw(a) {
      const d = setup(a), { w, h, values, tr, text, red, blue, green, muted } = d;
      const f = rays(d, 1, values.index2, values.incidence, w * .42, h * .48, Math.min(w * .29, h * .29));
      text(`θ₁ = θᵣ = ${values.incidence.toFixed(0)}°`, w / 2, 27, blue, 15, "center");
      text(f.tir ? tr("无实数传播折射角", "No real propagating refraction angle") : `θ₂ = ${(f.theta2 * 180 / Math.PI).toFixed(2)}°`, w * .73, h * .72, green, w < 430 ? 11 : 14, "center");
      text(tr("红：入射　蓝：反射　绿：透射", "Red: incident · blue: reflected · green: transmitted"), w / 2, h - 17, muted, w < 480 ? 10 : 12, "center");
    },
  };
  figure.background = ["#102b34", "#163d43"];
  figure.animated = false;
  window.OpticsExtraVisuals.snell = figure;
})();

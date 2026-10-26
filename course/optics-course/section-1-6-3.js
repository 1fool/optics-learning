/* Chapter 1, section 1.6.3: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.6.3",
    "title": "菲涅耳公式的讨论",
    "pages": "24–26",
    "pdf": 34,
    "visual": "fresnelDiscussion",
    "overview": "把系数画成角度函数，正入射、布儒斯特角、掠入射与临界角会自动显现。负振幅不等于负能量，p 波正负还必须连同基底方向来读。",
    "bridge": {
      "previous": "1.6.2 已得到 s、p 场系数及方向约定。",
      "current": "分别讨论低到高、高到低折射率及特殊角度。",
      "next": "1.6.4 把振幅系数转成能量比。"
    },
    "goals": [
      "区分标量负号与完整矢量相位",
      "识别布儒斯特零点与临界角",
      "在全反射区域停止使用实角图像"
    ],
    "symbols": [
      [
        "θB",
        "p 反射为零的布儒斯特角",
        "°",
        "1→1.5：56.31°"
      ],
      [
        "θc",
        "从高到低折射率的临界角",
        "°",
        "1.5→1：41.81°"
      ],
      [
        "rₛ, rₚ",
        "带所选基底正负的场振幅系数",
        "1"
      ],
      [
        "φ",
        "相位；负实系数对应 π 模 2π",
        "rad"
      ]
    ],
    "blocks": [
      {
        "label": "符号地图",
        "title": "先记住公式，再读正负",
        "eq": [
          {
            "text": "r_s=\\frac{n_1\\cos\\theta_1-n_2\\cos\\theta_2}{n_1\\cos\\theta_1+n_2\\cos\\theta_2}",
            "tex": true,
            "ref": "fresnel-rs"
          },
          {
            "text": "r_p=\\frac{n_2\\cos\\theta_1-n_1\\cos\\theta_2}{n_2\\cos\\theta_1+n_1\\cos\\theta_2}",
            "tex": true,
            "ref": "fresnel-rp"
          }
        ],
        "text": [
          "当 n₁<n₂ 时，在 0≤θ₁<90° 内 rₛ<0。rₚ 在正入射附近为正，经过 θB 后变负；但 p̂ᵣ 与 p̂ᵢ 不同，因此 rₚ>0 不能直接解释为固定实验室轴上的反射场与入射场同向。",
          "负实数可以写成 |r|exp(iπ)，表示相对于该基底的相位差。正入射附近从低折射率到高折射率反射时，固定横向轴上的电场反向，常称“半波损失”；这不是能量真的损失半个波长。"
        ]
      },
      {
        "label": "特殊角推导",
        "title": "零反射与无实折射角是两件事",
        "eq": [
          {
            "text": "\\tan\\theta_B=\\frac{n_2}{n_1}",
            "tex": true,
            "ref": "brewster-law"
          },
          {
            "text": "\\sin\\theta_c=\\frac{n_2}{n_1}\\quad(n_1>n_2)",
            "tex": true
          }
        ],
        "steps": [
          [
            "p 波的零点",
            "使用 1.6.2 的 rₚ 分子：n₂cosθ₁=n₁cosθ₂。联合斯涅耳定律，在非同折射率、非退化界面可得 θ₁+θ₂=90°。"
          ],
          [
            "得到 θB",
            "把 θ₂=90°−θB 代入 n₁sinθB=n₂sinθ₂，得到 tanθB=n₂/n₁。这是 p 分量零反射，不是所有偏振都零反射。"
          ],
          [
            "临界角的来源",
            "由 1.6.1 的折射式令 θ₂=90°，得 sinθc=n₂/n₁，只在 n₁>n₂ 时有临界角。θ₁>θc 时折射角不能继续用实数描述。"
          ],
          [
            "不要混在一起",
            "在非吸收全反射区域 |rₛ|=|rₚ|=1，但 r 一般为带相位的复数，不是恒为 +1。此处只报告能量比，详细相移留到 1.7。"
          ]
        ]
      },
      {
        "label": "数值与极限",
        "title": "一个零点，一个传播边界",
        "text": [
          "空气到 n=1.5 玻璃：θB≈56.31°，没有从空气侧发生的全反射。反向 1.5→1：θB≈33.69°，θc≈41.81°。二者都从法线量起，数值与物理含义不同。",
          "非同折射率界面从低到高折射率掠入射时，rₛ、rₚ 趋近 −1、透射场系数趋近 0。这是 θ₁→90° 的极限；恰好沿界面传播时法向入射功率为零，不能不加说明地拿零比零定义功率比。"
        ],
        "note": "图中总反射区域只标出适用域，不把无法用实数显示的场系数强行置为 1；同折射率界面没有独立的布儒斯特选择角。"
      }
    ],
    "questions": [
      {
        "stem": "本课正入射 1→1.5 有 rₚ>0，能否单独据此断言反射 E 与入射 E 同向？",
        "choices": [
          "不能，必须包含反射 p 基底方向",
          "能，正号永远代表实验室轴同向",
          "能，因此没有反射"
        ],
        "answer": 0,
        "explain": "本课取 p̂=ŝ×k̂，正入射反射使 k 反向，也使 p̂ 反向。虽然标量 rₚ=+0.2，乘上反射基底后固定横向轴的实际场仍是反向的。",
        "whyOther": "正号的意义依赖各束波的基底定义；有正振幅系数并不意味着振幅为零，更不意味着没有反射。",
        "id": "1.6.3:q1"
      },
      {
        "stem": "空气到 n=1.5，p 反射零点约在？",
        "choices": [
          "41.81°",
          "56.31°",
          "90°"
        ],
        "answer": 1,
        "explain": "tanθB=n₂/n₁=1.5，所以 θB=arctan1.5≈56.31°。在该角 p 分量不反射，s 分量一般仍反射。",
        "whyOther": "41.81° 是反向 1.5→1 时的临界角；90° 是掠入射极限，不能当作玻璃界面的布儒斯特零点。",
        "id": "1.6.3:q2"
      },
      {
        "stem": "非吸收全反射区中，哪项正确？",
        "choices": [
          "rₛ=rₚ=+1 恒成立",
          "反射率大于 1，能量增多",
          "|rₛ|=|rₚ|=1，但相位可非零"
        ],
        "answer": 2,
        "explain": "全反射说的是法向净功率全部反回，因此 R=|r|²=1。场系数仍可能是复数相位因子，模为一不代表复数本身等于正实数一。",
        "whyOther": "第一项把模和复数本身混淆；第二项违反本节无增益、无吸收界面的能量守恒。",
        "id": "1.6.3:q3"
      },
      {
        "stem": "“半波损失”在这里指什么？",
        "choices": [
          "反射电场在适当固定轴上有 π 相位反转",
          "一定失去一半入射能量",
          "光频率变成一半"
        ],
        "answer": 0,
        "explain": "该术语描述特定反射条件下的相位反转，−1=exp(iπ)。它不表示能量减少一半，也不改变静止界面要求的共同频率。斜入射 p 波还须谨慎处理不同基底。",
        "whyOther": "能量比由 R 与 T 决定，不由“半波”字面决定；频率由时间相位匹配守恒，不会因一个负号而减半。",
        "id": "1.6.3:q4"
      }
    ]
  };
  const translation = {
    "code": "1.6.3",
    "title": "Interpreting Fresnel formulas",
    "pages": "24–26",
    "pdf": 34,
    "visual": "fresnelDiscussion",
    "overview": "Plot coefficients against angle to reveal normal incidence, Brewster incidence, grazing incidence, and the critical angle. Negative amplitude is not negative energy, and p signs must be interpreted with their bases.",
    "bridge": {
      "previous": "§1.6.2 gives s,p field coefficients and their basis convention.",
      "current": "Compare lower-to-higher and higher-to-lower index cases and special angles.",
      "next": "§1.6.4 converts amplitudes into power ratios."
    },
    "goals": [
      "Distinguish scalar sign from vector-phase interpretation",
      "Identify Brewster zero and critical angle",
      "Stop using real transmitted-ray angles beyond critical incidence"
    ],
    "symbols": [
      [
        "θB",
        "Brewster angle at which p reflection vanishes",
        "°",
        "1→1.5: 56.31°"
      ],
      [
        "θc",
        "critical angle for higher-to-lower index",
        "°",
        "1.5→1: 41.81°"
      ],
      [
        "rₛ, rₚ",
        "signed amplitudes in specified bases",
        "1"
      ],
      [
        "φ",
        "phase; negative real coefficient means π modulo 2π",
        "rad"
      ]
    ],
    "blocks": [
      {
        "label": "Sign map",
        "title": "Read signs from the specified formulas",
        "eq": [
          {
            "text": "r_s=\\frac{n_1\\cos\\theta_1-n_2\\cos\\theta_2}{n_1\\cos\\theta_1+n_2\\cos\\theta_2}",
            "tex": true,
            "ref": "fresnel-rs"
          },
          {
            "text": "r_p=\\frac{n_2\\cos\\theta_1-n_1\\cos\\theta_2}{n_2\\cos\\theta_1+n_1\\cos\\theta_2}",
            "tex": true,
            "ref": "fresnel-rp"
          }
        ],
        "text": [
          "For n₁<n₂, rₛ<0 for 0≤θ₁<90°. rₚ starts positive and becomes negative after θB. Because p̂ᵣ and p̂ᵢ differ, positive rₚ alone does not imply aligned reflected and incident lab-frame electric vectors.",
          "A negative real coefficient is |r|exp(iπ), a phase difference in that basis. Near normal incidence from lower to higher index the reflected lab-axis electric field reverses, often called half-wave loss. It is not literal energy loss of half a wavelength."
        ]
      },
      {
        "label": "Special-angle derivation",
        "title": "Zero p reflection and no real refraction angle are different",
        "eq": [
          {
            "text": "\\tan\\theta_B=\\frac{n_2}{n_1}",
            "tex": true,
            "ref": "brewster-law"
          },
          {
            "text": "\\sin\\theta_c=\\frac{n_2}{n_1}\\quad(n_1>n_2)",
            "tex": true
          }
        ],
        "steps": [
          [
            "The p zero",
            "Set the numerator of rₚ from §1.6.2 to zero: n₂cosθ₁=n₁cosθ₂. Together with Snell law, a non-index-matched nondegenerate interface gives θ₁+θ₂=90°."
          ],
          [
            "Obtain θB",
            "Substitute θ₂=90°−θB into n₁sinθB=n₂sinθ₂ to get tanθB=n₂/n₁. This removes p reflection, not reflection of every polarization."
          ],
          [
            "Origin of the critical angle",
            "Set θ₂=90° in §1.6.1 to obtain sinθc=n₂/n₁, possible only for n₁>n₂. Above θc the transmitted angle cannot remain real."
          ],
          [
            "Keep them distinct",
            "In lossless total internal reflection |rₛ|=|rₚ|=1, but r is generally complex with phase, not identically +1. Here only energy ratios are reported; detailed phase shifts are left to §1.7."
          ]
        ]
      },
      {
        "label": "Numbers and limits",
        "title": "One zero, one propagation boundary",
        "text": [
          "Air to n=1.5 glass: θB≈56.31°, with no total reflection from the air side. Reversing to 1.5→1 gives θB≈33.69° and θc≈41.81°. Both are measured from the normal but have different values and meanings.",
          "For a non-index-matched lower-to-higher interface, grazing incidence gives rₛ,rₚ→−1 and transmission amplitudes→0. These are θ₁→90° limits: exactly tangential incidence has zero normal incident power, so one cannot silently divide zero by zero."
        ],
        "note": "The plot marks the total-reflection domain without forcing complex field coefficients to real 1. An index-matched interface has no distinguished polarization-selective Brewster angle."
      }
    ],
    "questions": [
      {
        "stem": "At normal incidence from 1 to 1.5, does rₚ>0 alone imply aligned reflected and incident E vectors?",
        "choices": [
          "No; include the reflected p basis",
          "Yes; positive always means aligned lab axes",
          "Yes; therefore there is no reflection"
        ],
        "answer": 0,
        "explain": "With p̂=ŝ×k̂, normal reflection reverses k and the p basis. Although scalar rₚ=+0.2, its reflected basis gives a reversed electric vector on a fixed transverse lab axis.",
        "whyOther": "A sign depends on basis definitions. A positive coefficient is not zero amplitude and does not imply no reflection.",
        "id": "1.6.3:q1"
      },
      {
        "stem": "From air to n=1.5, where is the p-reflection zero?",
        "choices": [
          "41.81°",
          "56.31°",
          "90°"
        ],
        "answer": 1,
        "explain": "tanθB=n₂/n₁=1.5 gives θB≈56.31°. The p component vanishes in reflection while s generally remains.",
        "whyOther": "41.81° is the critical angle for the reverse 1.5→1 direction. 90° is the grazing limit, not the Brewster zero for this interface.",
        "id": "1.6.3:q2"
      },
      {
        "stem": "Which statement is correct in lossless total internal reflection?",
        "choices": [
          "rₛ=rₚ=+1 always",
          "Reflectance exceeds 1 and energy increases",
          "|rₛ|=|rₚ|=1, but phases need not vanish"
        ],
        "answer": 2,
        "explain": "Total reflection returns all normal net power, so R=|r|²=1. Field coefficients can still be complex phase factors; unit magnitude does not mean the positive real number one.",
        "whyOther": "The first confuses a modulus with the complex number. The second violates energy conservation at this passive lossless interface.",
        "id": "1.6.3:q3"
      },
      {
        "stem": "What does half-wave loss mean here?",
        "choices": [
          "A π reflected-field reversal on an appropriate fixed axis",
          "Exactly half of incident energy is lost",
          "Optical frequency halves"
        ],
        "answer": 0,
        "explain": "The term denotes a phase reversal under specified reflection conditions: −1=exp(iπ). It neither halves energy nor changes the common frequency at a stationary interface. Oblique p reflection also requires attention to differing bases.",
        "whyOther": "Energy ratios come from R,T, not the literal words half-wave. Temporal phase matching preserves frequency; a negative coefficient cannot halve it.",
        "id": "1.6.3:q4"
      }
    ]
  };
  const guide = {
    question: ["曲线过零、变负、走到边界，分别是哪件事？", "What do a zero, a negative value and a propagation limit mean?"],
    setup: ["上一节解出系数，这一节不再发明新公式，而把它当成可变化的函数来读。始终分开三类信息：方向基底下的正负、某通道没有反射、另一侧不再有实传播角。", "We now read the coefficients as variable functions rather than introduce unrelated formulas. Keep three ideas separate: basis-dependent sign, zero reflection in one channel, and the absence of a real transmitted propagation angle."],
    terms: [
      { name: ["负实系数", "Negative real coefficient"], meaning: ["相对于选定正向，相位多 π；不是把能量减成负数。“半波损失”是相位术语。", "A π phase shift relative to the selected basis, not negative energy. Half-wave loss is a phase expression."] },
      { name: ["布儒斯特角 θB", "Brewster angle θB"], meaning: ["p 通道反射场为零的入射角；s 通道通常仍反射。", "Incidence angle with zero p reflection; s usually still reflects."] },
      { name: ["临界角 θc", "Critical angle θc"], meaning: ["仅从高折射率入射到低折射率时，透射传播角达到 90° 的边界。", "For high-to-low index only, the boundary where the transmitted propagation angle reaches 90°."] }
    ],
    observe: ["先选低到高折射率，找到 p 系数穿过零的位置；再换高到低，找临界标记。它们不是同一个点。进入全反射区后，图不再假装系数仍是普通实数。", "First choose low-to-high index and locate the p zero. Then choose high-to-low and locate the critical boundary. They are different points. Beyond the latter, the figure does not pretend amplitudes remain real coefficients."],
    blocks: [
      { title: ["先读正负：它说明相位，不说明能量的符号", "Read sign first: it describes phase, not energy sign"], before: ["沿用上一节的基底，系数等于一个负实数，就是把相量反向转半圈，再缩放长度。用复数语言，这与多一个 π 相位相同。但 p 的基底本身也随光线方向变化，若要比较实验室中的两支箭头，还要把基底一起带回去。", "In the previous basis, a negative real coefficient reverses a phasor by half a turn and scales its length: an extra phase π. But p's basis also changes with ray direction. Comparing laboratory arrows therefore requires carrying the basis along with the scalar."], read: ["所以负号不是“有负的反射能量”，也不表示一半能量丢了。展开部分保留原公式便于复算；初读先在图上区分正负两边，再进入更有物理特征的零点。", "A minus sign is neither negative reflected energy nor loss of half the energy. The original formulas remain below for recalculation; first distinguish the two signs on the plot, then study its physically special zeros."], advanced: true },
      { title: ["分别追问两个特殊位置：哪个通道为零，哪条路不再传播", "Ask separately: which channel vanishes, and which route stops propagating?"], before: ["第一个问题：令上一节 rₚ 分子为零，再与 n₁sinθ₁=n₂sinθ₂ 同时满足，得到使 p 反射消失的 θB；两条光线此时互相垂直，整理为 tanθB=n₂/n₁。第二个问题：只在 n₁>n₂ 时，令折射角到 90°，斯涅耳定律变成 n₁sinθc=n₂。这是另一个边界，不是同一零点。", "First set the numerator of rₚ from the previous section to zero while keeping n₁sinθ₁=n₂sinθ₂. At θB the reflected p field vanishes and the rays are perpendicular, giving tanθB=n₂/n₁. Separately, only for n₁>n₂, let the transmitted angle reach 90°; Snell's law becomes n₁sinθc=n₂. That is a propagation limit, not the same zero."], read: ["读 tanθB=n₂/n₁ 为“使 p 反射消失的角度”；读 sinθc=n₂/n₁ 时必须附带 n₁>n₂。全反射区的反射幅值模为 1，但还有复相移，不是简单把 r 写成 +1；详细相移留在未制作的 1.7。", "tanθB=n₂/n₁ locates zero p reflection. sinθc=n₂/n₁ requires n₁>n₂ and locates a propagation boundary. In total reflection the coefficient magnitude is 1 but its phase is generally complex, not simply r=+1. Detailed phase is reserved for the not-yet-developed §1.7."] },
      { title: ["用两个入射方向，把两种角度彻底分开", "Use both incidence directions to distinguish the two angles"], before: ["现在给 n=1 与 1.5 做数值检验。空气到玻璃有 θB≈56.31°，却没有从这一侧产生的临界角；玻璃到空气则同时有 θB≈33.69° 与 θc≈41.81°。改变入射方向，问题的条件也改变，不能只记一个数。", "With indices 1 and 1.5, air-to-glass has θB≈56.31° but no critical angle from that side. Glass-to-air has θB≈33.69° and θc≈41.81°. Reversing incidence changes conditions, not just a number to memorize."], read: ["到这里会读场系数曲线了，但它仍不是功率曲线：负值、零点都需要先按场来解释。下一节把同一批 r、t 转成总能量账本，检查流入与流出是否守恒。", "We can now read field-coefficient plots, but these are not yet power plots. Interpret signs and zeros as fields first. Next turn the same r and t into an energy ledger and test conservation."] }
    ],
    check: { question: ["“p 没有反射”和“所有光都反射”为什么不能当成同一种现象？", "Why are zero p reflection and total reflection not the same phenomenon?"], answer: ["前者在布儒斯特角只去掉一个反射通道；后者在高到低超过临界角时没有透射的法向传播功率。条件和能量结果都不同。", "The first removes one reflected channel at Brewster incidence. The second, above the high-to-low critical angle, has no transmitted normal travelling-wave power. Conditions and energy outcomes differ."] },
    next: ["带到 1.6.4：将电场系数变成可测功率时，要把介质与斜入射面积投影一起算进去。", "Into §1.6.4: converting fields to measured power also requires material and oblique-area factors."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.6.3"] = {
    ask: ["高折射率到低折射率时，临界角外的阴影区能继续用实数 r 曲线解释吗？", "From high to low index, can the shaded region beyond the critical angle be interpreted by real-valued r curves?"],
    choices: [["不能；反射有复相移", "No; reflection involves complex phase"], ["能，直接令所有 r=+1", "Yes; set every r=+1"], ["能，把折射角画到 100°", "Yes; draw a 100° refracted ray"]], answer: 0,
    try: ["先选 1→1.5 找 p 零点，再选 1.5→1 找临界边界；不要混为一个角。", "First find the p zero for 1→1.5, then the critical boundary for 1.5→1; they differ."],
    why: ["布儒斯特零点与全反射边界来源不同。临界角以上无实传播折射角；反射系数模为 1，但相位不能硬写为 +1。", "The Brewster zero and total-reflection boundary have different causes. Above critical angle there is no real propagating refracted angle; reflection has unit magnitude but nontrivial phase."]
  };
  const deepLab = {
    controls: [["directionCase", 0], ["directionCase", 1]],
    compare: ["先看 1→1.5 的 p 零点，再切 1.5→1 找临界边界；二者不是同一个现象。", "Find the p zero for 1→1.5, then switch to 1.5→1 and locate the critical boundary; they are different phenomena."],
    relation: ["布儒斯特零点是 p 反射场为零；临界角是另一条件：从 n₁>n₂ 入射，斯涅耳定律在透射角 90° 时给 sinθc=n₂/n₁，取反正弦才有下式。超过它没有实传播折射角，反射仍有相位。", "Brewster incidence zeros the reflected p field. The critical angle answers another question: for n₁>n₂, Snell's law at transmitted angle 90° gives sinθc=n₂/n₁; taking arcsine gives the expression below. Beyond it no real refracted propagation angle exists, but reflection retains phase."],
    formula: "\\theta_c=\\arcsin(n_2/n_1)\\quad(n_1>n_2)",
    challenge: [["从 n₁=1.5 到 n₂=1，临界角以上还能画一条实传播折射光线吗？", "From n₁=1.5 to n₂=1, can a real propagating refracted ray be drawn above critical angle?"], [["能，角度继续增大", "Yes, with larger angle"], ["不能，不能用实传播角", "No real propagating angle"], ["能，只需令 r=+1", "Yes, simply set r=+1"]], 1],
  };
  deepLab.mistakes = [["临界角外的折射角没有实传播解，不能把箭头继续画成更大实角。", "Beyond critical angle there is no real propagating refracted angle to keep drawing."], null, ["全反射的模为 1 不等于每种偏振都能写 r=+1；相位仍重要。", "Unit reflection magnitude does not mean r=+1 for every polarization; phase matters."]];
  const [focus, limitQuestion, limitAnswer] = [["布儒斯特零点与临界阴影分别由不同方向条件决定，不能共用一处坐标。", "Brewster zero and critical shading belong to different incidence directions and conditions."], ["全反射区的反射模为 1 就能忽略相位吗？", "Does unit reflected magnitude make its phase irrelevant in the TIR region?"], false];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.6.3"] = deepLab;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
    title: pair("布儒斯特零点与全反射边界", "Brewster zero versus total-reflection boundary"),
    note: pair("蓝线 rₛ，橙线 rₚ。仅绘制有实传播折射角的场系数；阴影区应使用复相位模型，留给 1.7，不将 r 强行画成实数 1。", "Blue rₛ, orange rₚ. Field coefficients are drawn only with real propagating refraction. The shaded region requires the complex-phase model of §1.7; r is not forced to real 1."),
    settings: [Object.assign(slider("directionCase", "界面方向", "Interface direction", 0, 1, 1, 0), { valueLabels: pair(["1 → 1.5", "1.5 → 1"], ["1 → 1.5", "1.5 → 1"]) }), slider("incidence", "观察角 θ₁", "Selected angle θ₁", 0, 85, 1, 45, "°")],
    draw(a) {
      const { ctx, w, h, values, tr, text, line, path, red, blue, green, muted } = setup(a);
      const reverse = values.directionCase === 1, n1 = reverse ? 1.5 : 1, n2 = reverse ? 1 : 1.5;
      const B = Math.atan(n2 / n1) * 180 / Math.PI, C = reverse ? Math.asin(n2 / n1) * 180 / Math.PI : 90;
      const left = 40, span = w - 63, top = 65, bottom = h - 80, H = bottom - top;
      const X = angle => left + span * angle / 90, Y = value => top + H * (1 - value) / 2;
      if (reverse) { ctx.fillStyle = "#7b637755"; ctx.fillRect(X(C), top, X(90) - X(C), H); text(tr("复相位区", "Complex r"), (X(C) + X(90)) / 2, top + 22, muted, 12, "center"); }
      for (const v of [-1, 0, 1]) { line(left, Y(v), X(90), Y(v)); text(String(v), left - 10, Y(v) + 3, muted, 11, "right"); }
      for (const [key, color] of [["rs", blue], ["rp", red]]) path(Array.from({ length: 221 }, (_, i) => {
        const angle = Math.min(C, 89.9) * i / 220;
        return [X(angle), Y(window.OpticsInterface.fresnel(n1, n2, angle)[key])];
      }), color, 2.6);
      ctx.setLineDash([3, 5]); line(X(B), top, X(B), bottom, green); ctx.setLineDash([]);
      line(X(values.incidence), top, X(values.incidence), bottom, muted);
      text(`θB=${B.toFixed(2)}°`, left, bottom + 24, green, 12);
      if (reverse) text(`θc=${C.toFixed(2)}°`, X(90), bottom + 24, muted, 12, "right");
      const f = window.OpticsInterface.fresnel(n1, n2, values.incidence);
      text(f.tir ? tr("|rₛ|=|rₚ|=1，r 一般非实数", "|rₛ|=|rₚ|=1; r is generally complex") : `rₛ=${f.rs.toFixed(3)}   rₚ=${f.rp.toFixed(3)}`, w / 2, 29, blue, w < 480 ? 11 : 14, "center");
      text(tr("θB 是零点，θc 是传播边界", "θB is a zero; θc a propagation boundary"), w / 2, h - 21, muted, w < 480 ? 10 : 13, "center");
    },
  };
  figure.background = ["#102b34", "#163d43"];
  figure.animated = false;
  window.OpticsExtraVisuals.fresnelDiscussion = figure;
})();

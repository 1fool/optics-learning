/* Chapter 1, section 1.6.4: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.6.4",
    "title": "反射率和透射率",
    "pages": "26–27",
    "pdf": 36,
    "visual": "power",
    "overview": "从电场振幅走到能量账本：反射波在同一介质，透射波却跨了阻抗和束截面投影。那个 n cosθ 因子不能省略。",
    "bridge": {
      "previous": "1.6.2–1.6.3 的 r、t 是带符号或相位的场系数。",
      "current": "按同一界面面积比较平均法向功率流，求 R、T。",
      "next": "1.6.5 用 s、p 能量的不均衡解释偏振。"
    },
    "goals": [
      "区分振幅比与功率比",
      "解释余弦来自截面投影",
      "独立检验 R+T=1"
    ],
    "symbols": [
      [
        "R, T",
        "反射、透射法向功率比",
        "1",
        "正入射 1→1.5：0.04、0.96"
      ],
      [
        "Iᵢ, Iᵣ, Iₜ",
        "相对各自传播方向的光强",
        "W/m²"
      ],
      [
        "ΔA",
        "同一块界面面积",
        "m²"
      ],
      [
        "Z",
        "波阻抗",
        "Ω"
      ],
      [
        "Rn",
        "自然光的总反射率",
        "1"
      ]
    ],
    "blocks": [
      {
        "label": "能流公式",
        "title": "先统一比较面积",
        "eq": [
          {
            "text": "I=\\langle S\\rangle=\\frac12\\varepsilon v E_0^2=\\frac{E_0^2}{2Z},\\qquad Z=\\sqrt{\\frac\\mu\\varepsilon}",
            "tex": true,
            "ref": "plane-intensity"
          },
          {
            "text": "P_i=I_i\\cos\\theta_1\\,\\Delta A,\\qquad P_t=I_t\\cos\\theta_2\\,\\Delta A",
            "tex": true
          }
        ],
        "text": [
          "I 是穿过垂直于光束的单位面积的平均功率；边界守恒比较的却是同一界面面积 ΔA。两者由 cosθ 投影联系。反射角等于入射角，所以反射比中的余弦可约去。"
        ]
      },
      {
        "label": "功率比推导",
        "title": "透射率不能只写 |t|²",
        "eq": [
          {
            "text": "R=|r|^2",
            "tex": true
          },
          {
            "text": "T=\\frac{n_2\\cos\\theta_2}{n_1\\cos\\theta_1}|t|^2",
            "tex": true
          },
          {
            "text": "R_s+T_s=1,\\qquad R_p+T_p=1",
            "tex": true
          }
        ],
        "steps": [
          [
            "前提与来源",
            "使用上方平均强度与面积投影；两侧非磁性、无吸收，实数折射率，且有传播透射波。由 Z=Z₀/n，I=nE₀²/(2Z₀)。"
          ],
          [
            "反射功率",
            "R=Pᵣ/Pᵢ。相同 n₁、相同余弦消去，留下 |Eᵣ/Eᵢ|²=|r|²。负振幅平方后不会给负功率。"
          ],
          [
            "透射功率",
            "T=Pₜ/Pᵢ 时 n 与 cosθ 一般不同，留下 [n₂cosθ₂/(n₁cosθ₁)]|t|²。磁导率不同则需改用阻抗比 Z₁/Z₂，不能硬套 n₂/n₁。"
          ],
          [
            "代数验守恒",
            "以 s 波为例令 a=n₁cosθ₁、b=n₂cosθ₂。R=(a−b)²/(a+b)²，T=4ab/(a+b)²，相加分子为 (a+b)²，故和为 1。p 波同理。"
          ]
        ]
      },
      {
        "label": "自然光与多表面",
        "title": "先按能量相加，不按 r 相加",
        "eq": [
          {
            "text": "R_n=\\frac{R_s+R_p}{2},\\qquad T_n=\\frac{T_s+T_p}{2}",
            "tex": true
          }
        ],
        "text": [
          "自然光在正交 s、p 通道的平均入射能量相等，因此总功率比取两者平均。不是先平均 rₛ、rₚ 再平方，因为正交分量的能量应分别计算。",
          "若只跟踪不含往返多次反射的主透射束，12 个相同、近正入射、n=1.52 的空气–玻璃面给 (1−R)¹²≈0.593。这是忽略吸收、镀膜与二次返回光的单程估计，不是相干薄膜或完整多反射计算。"
        ]
      },
      {
        "label": "数值验算",
        "title": "不是 64%，而是 96%",
        "text": [
          "正入射 n₁=1、n₂=1.5，|r|=0.2，t=0.8。R=0.04，T=1.5×0.64=0.96，R+T=1。若入射功率 10 W，则反射 0.4 W、透射 9.6 W。",
          "θ₁=45° 时 Rs≈0.09201、Rp≈0.008466；自然光 Rn≈0.05024、Tn≈0.94976。不同偏振的透射功率各自与反射功率配对守恒。"
        ]
      }
    ],
    "questions": [
      {
        "stem": "正入射 1→1.5，t=0.8，T 等于多少？",
        "choices": [
          "0.64",
          "0.80",
          "0.96"
        ],
        "answer": 2,
        "explain": "T=(n₂/n₁)|t|²=1.5×0.8²=0.96。再由 R=0.04 可验 R+T=1。透射电场小于入射电场，不代表透射功率必须只按振幅平方求。",
        "whyOther": "0.64 忘了折射率/阻抗因子；0.80 直接把电场系数当功率比。这两种错误都破坏本题能量守恒。",
        "id": "1.6.4:q1"
      },
      {
        "stem": "T 中的 cosθ₂/cosθ₁ 来自什么？",
        "choices": [
          "同一界面面积上的法向能流投影",
          "光频率在界面改变",
          "光有两个偏振所以除以二"
        ],
        "answer": 0,
        "explain": "光强按垂直光束的面积定义，守恒比较同一界面面积。P=IcosθΔA 使透射与入射功率比带有两个角度的余弦比。",
        "whyOther": "静止界面频率保持；偏振平均的 1/2 是另一个统计因素，不能解释几何投影余弦。",
        "id": "1.6.4:q2"
      },
      {
        "stem": "自然光已知 Rs=0.10、Rp=0.02，Rn 为？",
        "choices": [
          "0.12",
          "0.06",
          "0.04"
        ],
        "answer": 1,
        "explain": "两正交通道各占一半入射功率，所以 Rn=(0.10+0.02)/2=0.06。总反射功率就是 6% 入射功率。",
        "whyOther": "0.12 直接相加却没有乘各通道 1/2 权重；0.04 不是两项能量的正确加权平均。不要先平均振幅。",
        "id": "1.6.4:q3"
      },
      {
        "stem": "在本节无吸收、无增益界面，若 R+T≠1，首先应怎样做？",
        "choices": [
          "认为界面制造了能量",
          "随意把结果除以二",
          "检查振幅平方、阻抗与投影因子及模型前提"
        ],
        "answer": 2,
        "explain": "在明确前提下能量守恒必须成立。常见错误包括把 t 当 T、漏 n₂/n₁ 或漏 cosθ₂/cosθ₁；也应检查是否误把吸收或多通道情形套入当前模型。",
        "whyOther": "不能凭不守恒计算宣称产生能量；随意缩放数字可能掩盖公式错误，不能替代逐项核查。",
        "id": "1.6.4:q4"
      }
    ]
  };
  const translation = {
    "code": "1.6.4",
    "title": "Reflectance and transmittance",
    "pages": "26–27",
    "pdf": 36,
    "visual": "power",
    "overview": "Move from field amplitudes to an energy budget. Reflection stays in the same medium, while transmission changes impedance and beam projection. The n cosθ factor is essential.",
    "bridge": {
      "previous": "The r,t in §§1.6.2–1.6.3 are field coefficients with signs or phases.",
      "current": "Compare mean normal power flow through the same interface area to obtain R,T.",
      "next": "§1.6.5 explains polarization through unequal s,p energy fractions."
    },
    "goals": [
      "Distinguish amplitude ratios from power ratios",
      "Explain cosine factors as projection",
      "Independently check R+T=1"
    ],
    "symbols": [
      [
        "R, T",
        "reflected and transmitted normal power ratios",
        "1",
        "Normal 1→1.5: 0.04, 0.96"
      ],
      [
        "Iᵢ, Iᵣ, Iₜ",
        "intensities normal to each beam direction",
        "W/m²"
      ],
      [
        "ΔA",
        "common interface area",
        "m²"
      ],
      [
        "Z",
        "wave impedance",
        "Ω"
      ],
      [
        "Rn",
        "total reflectance of unpolarized light",
        "1"
      ]
    ],
    "blocks": [
      {
        "label": "Energy-flow relation",
        "title": "Compare through the same area first",
        "eq": [
          {
            "text": "I=\\langle S\\rangle=\\frac12\\varepsilon v E_0^2=\\frac{E_0^2}{2Z},\\qquad Z=\\sqrt{\\frac\\mu\\varepsilon}",
            "tex": true,
            "ref": "plane-intensity"
          },
          {
            "text": "P_i=I_i\\cos\\theta_1\\,\\Delta A,\\qquad P_t=I_t\\cos\\theta_2\\,\\Delta A",
            "tex": true
          }
        ],
        "text": [
          "I is mean power per area perpendicular to each beam. Boundary conservation compares a common interface area ΔA, introducing cosθ. The reflected and incident angles match, so their cosine factors cancel."
        ]
      },
      {
        "label": "Power-ratio derivation",
        "title": "Transmittance is not simply |t|²",
        "eq": [
          {
            "text": "R=|r|^2",
            "tex": true
          },
          {
            "text": "T=\\frac{n_2\\cos\\theta_2}{n_1\\cos\\theta_1}|t|^2",
            "tex": true
          },
          {
            "text": "R_s+T_s=1,\\qquad R_p+T_p=1",
            "tex": true
          }
        ],
        "steps": [
          [
            "Conditions and source",
            "Use mean intensity and area projection above. Both media are nonmagnetic and lossless with real indices and a propagating transmitted wave. Z=Z₀/n gives I=nE₀²/(2Z₀)."
          ],
          [
            "Reflected power",
            "R=Pᵣ/Pᵢ. The common n₁ and cosine cancel, leaving |Eᵣ/Eᵢ|²=|r|². A negative amplitude does not produce negative reflected power."
          ],
          [
            "Transmitted power",
            "For T=Pₜ/Pᵢ, indices and cosines differ, giving [n₂cosθ₂/(n₁cosθ₁)]|t|². Different permeabilities require the impedance ratio Z₁/Z₂, not automatically n₂/n₁."
          ],
          [
            "Check conservation algebraically",
            "For s set a=n₁cosθ₁, b=n₂cosθ₂. R=(a−b)²/(a+b)² and T=4ab/(a+b)². Their numerator sums to (a+b)², hence R+T=1. p follows analogously."
          ]
        ]
      },
      {
        "label": "Unpolarized light and multiple surfaces",
        "title": "Add powers, not reflection amplitudes",
        "eq": [
          {
            "text": "R_n=\\frac{R_s+R_p}{2},\\qquad T_n=\\frac{T_s+T_p}{2}",
            "tex": true
          }
        ],
        "text": [
          "Unpolarized incident power splits equally between orthogonal s,p channels, so total power ratios are their averages. Do not average rₛ,rₚ and then square; compute each orthogonal energy contribution separately.",
          "Tracking only the primary transmitted beam through 12 identical nearly normal air–glass interfaces of n=1.52 gives (1−R)¹²≈0.593. This one-pass estimate omits absorption, coatings, and returned secondary beams; it is not a coherent thin-film or complete multiple-reflection calculation."
        ]
      },
      {
        "label": "Numerical check",
        "title": "Not 64%, but 96%",
        "text": [
          "At normal incidence n₁=1,n₂=1.5, |r|=0.2 and t=0.8. R=0.04, T=1.5×0.64=0.96, summing to 1. For 10 W incident power this is 0.4 W reflected and 9.6 W transmitted.",
          "At θ₁=45°, Rs≈0.09201 and Rp≈0.008466, giving unpolarized Rn≈0.05024 and Tn≈0.94976. Each polarization conserves its own reflected plus transmitted power."
        ]
      }
    ],
    "questions": [
      {
        "stem": "At normal incidence from 1 to 1.5 with t=0.8, what is T?",
        "choices": [
          "0.64",
          "0.80",
          "0.96"
        ],
        "answer": 2,
        "explain": "T=(n₂/n₁)|t|²=1.5×0.8²=0.96. With R=0.04, conservation holds. A smaller transmitted field alone does not determine power without the medium factor.",
        "whyOther": "0.64 omits the index/impedance factor. 0.80 treats field amplitude as power. Both break energy conservation here.",
        "id": "1.6.4:q1"
      },
      {
        "stem": "Where does cosθ₂/cosθ₁ in T come from?",
        "choices": [
          "Normal-flux projection through a common interface area",
          "Frequency changes at the interface",
          "Two polarizations require division by two"
        ],
        "answer": 0,
        "explain": "Intensity uses beam-normal area, while conservation compares the same interface area. P=IcosθΔA introduces the cosine ratio between transmitted and incident powers.",
        "whyOther": "Frequency is conserved at a stationary interface. The unpolarized average factor 1/2 is a different statistical factor, unrelated to geometric projection.",
        "id": "1.6.4:q2"
      },
      {
        "stem": "For unpolarized light with Rs=0.10,Rp=0.02, what is Rn?",
        "choices": [
          "0.12",
          "0.06",
          "0.04"
        ],
        "answer": 1,
        "explain": "Each orthogonal channel carries half the incident power, so Rn=(0.10+0.02)/2=0.06, or 6% of incident power.",
        "whyOther": "0.12 omits the half weights of the incident channels. 0.04 is not the weighted power average. Do not average amplitudes first.",
        "id": "1.6.4:q3"
      },
      {
        "stem": "At this lossless passive interface, if R+T≠1, what should be checked first?",
        "choices": [
          "Assume the interface creates energy",
          "Divide arbitrarily by two",
          "Check amplitude squares, impedance, projection, and assumptions"
        ],
        "answer": 2,
        "explain": "Energy conservation must hold under the stated conditions. Common errors are t=T, omitted index ratio, or omitted cosine ratio. Also check whether absorption or extra channels invalidate the model.",
        "whyOther": "A nonconserving calculation does not prove energy creation. Arbitrary rescaling conceals mistakes instead of checking the formula.",
        "id": "1.6.4:q4"
      }
    ]
  };
  const guide = {
    question: ["透射场幅度是 0.8 倍，为什么透射功率不是 64%？", "If transmitted field is 0.8 times incident, why is transmitted power not 64%?"],
    setup: ["1.6.2 算的是电场，不是每秒穿过界面的能量。把 1.4.3 的场—光强关系接回来，再比较同一块界面的流入流出，就能算真正的反射率 R 与透射率 T。大写与小写有意区分。", "§1.6.2 calculated fields, not energy crossing the interface per second. Reuse §1.4.3's field–intensity relation, then compare incoming and outgoing power over the same surface patch. Uppercase R and T deliberately differ from lowercase r and t."],
    terms: [
      { name: ["R、T", "R, T"], meaning: ["反射、透射的法向功率分别除以入射功率，取正的比例；不是带正负的场比。", "Positive ratios of reflected or transmitted normal power to incident power, not signed field ratios."] },
      { name: ["I 与 P", "I and P"], meaning: ["I 按垂直光束的面积计；P 是穿过选定一整块界面的功率，所以斜入射时还需投影。", "I is per area perpendicular to a beam; P crosses an entire selected interface patch, requiring projection at oblique incidence."] },
      { name: ["cosθ 投影", "cosθ projection"], meaning: ["同样面积的表面，朝向光束不同，正面接住的面积也不同；余弦给出这个比例。", "A fixed surface patch presents different cross-sectional area to differently directed beams; cosine supplies that factor."] }
    ],
    observe: ["先设正入射、n₁=1、n₂=1.5，读 R=0.04、T=0.96；再斜入射，检查 s、p 各自的两块功率是否加起来为 1。图中现在显示的是能量，不是上一节的带符号系数。", "At normal incidence with n₁=1 and n₂=1.5, read R=0.04 and T=0.96. Then tilt incidence and check that reflected plus transmitted power sums to 1 in each channel. These are energy shares, not signed field coefficients."],
    blocks: [
      { title: ["先统一收能量的面积，才有公平的比值", "Compare power through the same area before taking ratios"], before: ["1.4.3 给 I=E₀²/(2Z)，其中 Z 是材料的波阻抗。要比较界面两侧，选同一小块面积 ΔA；它相对光束的正面面积是 ΔA cosθ，所以穿过功率为 I cosθ ΔA。ΔA 是面积，不是振幅 A。", "§1.4.3 gives I=E₀²/(2Z), with material impedance Z. Compare both sides using one patch ΔA. Its beam-facing area is ΔA cosθ, so crossing power is I cosθ ΔA. ΔA is area, not field amplitude A."], read: ["这就解释为什么单纯比较 E² 还不够：材料改变每单位场幅度的能流，倾角改变穿过表面的面积。下一步做比值，看看哪些因素能约掉，哪些不能。", "Squaring E alone misses two effects: material sets flux for a given amplitude, and tilt sets the effective crossing area. Next take ratios to see what cancels."] },
      { title: ["同侧反射能约掉的因素，跨介质透射不能约", "Reflection cancels factors that transmission must retain"], before: ["反射仍在介质 1，且反射角等于入射角，所以材料与余弦都相同，功率比只剩场比的模平方。透射却换了材料与角度：非磁性材料中 I 与 nE₀² 成正比，因此必须保留 n₂/n₁，再乘 cosθ₂/cosθ₁。", "Reflection remains in medium 1 at the same angle, so material and cosine factors cancel, leaving the squared field-ratio magnitude. Transmission changes both: nonmagnetic I is proportional to nE₀², requiring n₂/n₁ and cosθ₂/cosθ₁."], read: ["这才得到 R=|r|² 与带前因子的 T。| | 取模，避免把相位正负当功率正负。无吸收、无额外能量通道时，每个偏振都有 R+T=1，可以反过来检查计算有没有漏投影或漏折射率。", "This gives R=|r|² and T with its prefactor. Magnitude signs prevent phase signs from becoming power signs. With no absorption or extra energy channels, R+T=1 for each polarization, a check for missing projection or index factors."] },
      { title: ["自然光的两条正交通道，要先分别计能量", "For unpolarized light, count each orthogonal channel's energy first"], before: ["1.4.4 说理想自然光在两条横向正交轴的平均入射能量相等。因此先给 s、p 各分一半，再分别乘对应反射率，最后加功率。不是先把可能正负相反的 r 平均再平方。", "§1.4.4 assigns equal mean incident power to two orthogonal transverse channels for ideal unpolarized light. Give each half the input, multiply by its own reflectance, then add powers—not signed r values before squaring."], read: ["多表面时也先说明跟踪哪条光路：若只跟踪主透射束，每过一面就再乘一个透射率。12 个近正入射、n=1.52 的无吸收界面给约 0.593，但没有把来回反射后再出来的光都计入，不能冒充完整薄膜计算。", "For multiple surfaces, specify the path tracked. Following only the primary transmitted beam multiplies successive transmittances: twelve near-normal n=1.52 lossless interfaces give about 0.593. Returned multiply reflected light is omitted; this is not a complete thin-film calculation."] },
      { title: ["回到 0.8 的例子，把能量账本算闭合", "Return to 0.8 and close the energy ledger"], before: ["正入射从 1 到 1.5，场系数的模为 0.2 和 0.8。反射功率比例是 0.2²=0.04；透射必须是 1.5×0.8²=0.96，不能漏掉更换材料的系数。", "At normal incidence from 1 to 1.5, field magnitudes are 0.2 and 0.8. Reflection is 0.2²=0.04. Transmission is 1.5×0.8²=0.96; the material factor cannot be dropped."], read: ["若入射 10 W，就得到反射 0.4 W、透射 9.6 W，合计 10 W。现在场系数与功率比终于接上了；下一节用 s、p 分走能量不同，解释反光为何会偏向某种振动方向。", "For 10 W input, reflected power is 0.4 W and transmitted power 9.6 W, totaling 10 W. Field coefficients and power ratios now connect. Next their unequal s/p shares explain polarization by reflection."] }
    ],
    check: { question: ["为什么计算 T 时乘 n₂/n₁，却不对 R 这样乘？", "Why does T contain n₂/n₁ while R does not?"], answer: ["反射和入射在同一材料，材料系数约掉；透射在另一材料，单位场平方对应的能流不同，所以保留两侧之比。斜入射还要保留余弦比。", "Reflection and incidence share one medium, so its factor cancels. Transmission changes the energy flux per squared field amplitude, leaving a material ratio and, at oblique incidence, a cosine ratio."] },
    next: ["带到 1.6.5：两通道的功率反射率通常不等；若一条通道恰好不反射，返回来的光还剩什么方向？", "Into §1.6.5: the channels usually reflect unequal powers. If one reflects none, what oscillation direction remains?"]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.6.4"] = {
    ask: ["在无吸收界面，s 与 p 各自的 R+T 应怎样？", "At a lossless interface, what should R+T be for each of s and p?"],
    choices: [["等于场系数 r+t", "Equal the field-coefficient sum r+t"], ["各自等于 1", "Equal 1 for each channel"], ["随角度可大于 1", "Can exceed 1 with angle"]], answer: 1,
    try: ["拖动角度，分别读 s、p 两行能量账本；每行用本通道入射功率归一。", "Vary angle; inspect both s and p budgets, each normalized to its own incident-channel power."],
    why: ["无吸收时同一界面上的法向功率守恒。透射 T 含折射率与 cosθ 的通量因子，不等于 t 或 t²。", "Mean normal power is conserved across the same lossless surface. T contains refractive-index and cosθ flux factors; it is not simply t or t²."]
  };
  const deepLab = {
    controls: [["incidence", 0], ["incidence", 60]],
    compare: ["从 0° 到 60° 读 s/p 两本独立能量账本；每一行用自己的入射通道归一。", "Read separate s/p power budgets from 0° to 60°; each is normalized to its own incident channel."],
    relation: ["无吸收时每个偏振通道的 R+T=1；T 包含 n cosθ 的法向通量因子，不直接等于 t²。", "With no absorption R+T=1 for each polarization. T includes the normal-flux n cosθ factor, not simply t²."],
    formula: "R+T=1\\quad\\text{(each lossless channel)}",
    challenge: [["某无吸收 s 通道 R=0.3，则该通道 T 是多少？", "For a lossless s channel with R=0.3, what is T for that channel?"], [["0.7", "0.7"], ["0.09", "0.09"], ["1.3", "1.3"]], 0],
  };
  deepLab.mistakes = [null, ["0.09 是把 R 再平方一次；R 已是功率比例，T=1−R。", "0.09 squares R again; R is already a power fraction, so T=1−R."], ["无吸收通道的法向功率守恒，R+T=1，不能是 1.3。", "Normal power is conserved for a lossless channel; R+T=1, not 1.3."]];
  const [focus, limitQuestion, limitAnswer] = [["同一行的 Rₛ+Tₛ、Rₚ+Tₚ 分别核账，别把两偏振行直接相加。", "Balance Rₛ+Tₛ and Rₚ+Tₚ separately, not by adding both rows."], ["在无吸收条件下，每个独立偏振通道的 R+T 都等于 1 吗？", "In the lossless model, is R+T=1 for each polarization channel separately?"], true];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.6.4"] = deepLab;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
    title: pair("反射 + 透射：同一界面上的能量账本", "Reflection + transmission: one interface energy budget"),
    note: pair("n₁=1、n₂=1.5，无吸收；比较同一界面面积上的法向平均功率。两行分别按各自通道入射功率归一，不把场系数当能量比。", "n₁=1,n₂=1.5, lossless. Mean normal power is compared through the same interface area. Each row is normalized to its own incident channel power, not to a field coefficient."),
    settings: [slider("incidence", "入射角 θ₁", "Incidence angle θ₁", 0, 85, 1, 0, "°")],
    draw(a) {
      const { ctx, w, h, values, tr, text, line, arrow, red, blue, green, muted } = setup(a);
      const f = window.OpticsInterface.fresnel(1, 1.5, values.incidence), left = 36, width = w - 72;
      text(tr("同一块界面 ΔA · 每个偏振独立守恒", "Common ΔA · each channel conserves power"), w / 2, 30, muted, w < 480 ? 11 : 14, "center");
      for (const [row, R, T, label] of [[0, f.Rs, f.Ts, "s"], [1, f.Rp, f.Tp, "p"]]) {
        const y = h * (.3 + row * .3);
        text(`${label}:  R=${(100 * R).toFixed(2)}%   T=${(100 * T).toFixed(2)}%`, left, y - 15, muted, w < 420 ? 12 : 15);
        ctx.fillStyle = red; ctx.fillRect(left, y, width * R, 25); ctx.fillStyle = blue; ctx.fillRect(left + width * R, y, width * T, 25);
        text(`R+T=${(R + T).toFixed(6)}`, left + width, y + 49, green, 12, "right");
      }
      const Rn = (f.Rs + f.Rp) / 2;
      text(`10 W → ${(10 * Rn).toFixed(3)} W + ${(10 * (1 - Rn)).toFixed(3)} W`, w / 2, h - 28, green, w < 450 ? 13 : 18, "center");
    },
  };
  figure.background = ["#102b34", "#163d43"];
  figure.animated = false;
  window.OpticsExtraVisuals.power = figure;
})();

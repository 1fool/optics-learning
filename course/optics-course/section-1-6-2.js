/* Chapter 1, section 1.6.2: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.6.2",
    "title": "菲涅耳公式",
    "pages": "22–24",
    "pdf": 32,
    "visual": "fresnel",
    "overview": "斯涅耳定律确定方向，菲涅耳公式确定场振幅比。先固定 s、p 的正方向，再分别解两条切向边界方程，避免符号与能量混淆。",
    "bridge": {
      "previous": "1.6.1 已保证频率与切向波矢匹配。",
      "current": "在无吸收、非磁性界面推导 s、p 振幅系数。",
      "next": "1.6.3 讨论系数符号、特殊角度与模型边界。"
    },
    "goals": [
      "正确区分 s、p 分量",
      "从两条方程解出 r、t",
      "保留 p 基底约定解释正负号"
    ],
    "symbols": [
      [
        "rₛ, rₚ",
        "反射电场振幅/入射电场振幅",
        "1"
      ],
      [
        "tₛ, tₚ",
        "透射电场振幅/入射电场振幅",
        "1"
      ],
      [
        "s, p",
        "E 垂直、平行入射面",
        "1"
      ],
      [
        "n₁, n₂",
        "实数正折射率，μ₁≈μ₂",
        "1",
        "算例：1 与 1.5"
      ]
    ],
    "blocks": [
      {
        "label": "先定方向",
        "title": "正负是带基底的振幅，不是负功率",
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
          "入射面由入射波矢和界面法线张成。s 电场垂直该面，三束波的 s 正向相同；取每束波的 p̂=ŝ×k̂，则 p̂ᵢ、p̂ᵣ、p̂ₜ 随各自传播方向而改变，与教材图 1.20 的约定一致。",
          "r=Eᵣ/Eᵢ、t=Eₜ/Eᵢ 是电场系数，不是功率比。下面余弦形式在正入射仍可直接使用，避免教材正弦/正切形式在特殊角度出现可去的 0/0。"
        ]
      },
      {
        "label": "s 波推导",
        "title": "同向的 E，加上反向的 H 切向分量",
        "eq": [
          {
            "text": "1+r_s=t_s",
            "tex": true
          },
          {
            "text": "n_1\\cos\\theta_1(1-r_s)=n_2\\cos\\theta_2t_s",
            "tex": true
          },
          {
            "text": "t_s=\\frac{2n_1\\cos\\theta_1}{n_1\\cos\\theta_1+n_2\\cos\\theta_2}",
            "tex": true
          }
        ],
        "steps": [
          [
            "方程及条件",
            "使用 1.5 的总 E、H 切向连续；两侧均匀、各向同性、线性、无吸收、非磁性，无自由面源。由 1.2.6，H₀=nE₀/Z₀。"
          ],
          [
            "归一化",
            "以非零入射 s 振幅相除，E 条件给 1+rₛ=tₛ；反射的 H 切向方向相反，H 条件给 n₁cosθ₁(1−rₛ)=n₂cosθ₂tₛ。"
          ],
          [
            "消元",
            "令 a=n₁cosθ₁、b=n₂cosθ₂；将 tₛ=1+rₛ 代入 a(1−rₛ)=btₛ，整理为 a−b=(a+b)rₛ，所以 rₛ=(a−b)/(a+b)，tₛ=2a/(a+b)。"
          ]
        ]
      },
      {
        "label": "p 波推导",
        "title": "先投影 E，再匹配 H",
        "eq": [
          {
            "text": "\\cos\\theta_1(1-r_p)=t_p\\cos\\theta_2",
            "tex": true
          },
          {
            "text": "n_1(1+r_p)=n_2t_p",
            "tex": true
          },
          {
            "text": "t_p=\\frac{2n_1\\cos\\theta_1}{n_2\\cos\\theta_1+n_1\\cos\\theta_2}",
            "tex": true
          }
        ],
        "steps": [
          [
            "仍用同一边界",
            "仍使用上方条件和 H₀=nE₀/Z₀，但 p 场在入射面内，先投影到界面切线。所选 p̂ᵣ 的切向分量与 p̂ᵢ 反向。"
          ],
          [
            "列两条方程",
            "切向 E 给 cosθ₁(1−rₚ)=tₚcosθ₂；H 的共同 s 方向给 n₁(1+rₚ)=n₂tₚ。不能把 s 波的 1+r=t 直接复制过来。"
          ],
          [
            "消去 tₚ",
            "将 tₚ=n₁(1+rₚ)/n₂ 代入第一式，整理得 (n₂cosθ₁−n₁cosθ₂)=(n₂cosθ₁+n₁cosθ₂)rₚ，再回代求 tₚ。"
          ]
        ]
      },
      {
        "label": "正入射核对",
        "title": "rₛ=−0.2、rₚ=+0.2 并不矛盾",
        "eq": [
          {
            "text": "\\theta_1=0:\\quad r_s=\\frac{n_1-n_2}{n_1+n_2},\\quad r_p=-r_s,\\quad t_s=t_p=\\frac{2n_1}{n_1+n_2}",
            "tex": true
          }
        ],
        "text": [
          "从 n₁=1 到 n₂=1.5，rₛ=−0.2、rₚ=+0.2、tₛ=tₚ=0.8。正入射极限中 p̂ᵣ=−p̂ᵢ，故固定实验室轴上的实际反射电场仍与入射电场反向，两偏振反射率均为 0.04。"
        ]
      }
    ],
    "questions": [
      {
        "stem": "s 偏振指电场相对什么方向？",
        "choices": [
          "E 垂直入射面",
          "E 平行波矢",
          "E 平行入射面"
        ],
        "answer": 0,
        "explain": "入射面由 kᵢ 与界面法线确定，s 电场垂直此面，同时也垂直 kᵢ。p 电场则在入射面内并与自身传播方向正交。",
        "whyOther": "第二项是纵向场，不是本节传播横波；第三项恰为 p 偏振。s/p 不是简单按屏幕的水平或竖直命名。",
        "id": "1.6.2:q1"
      },
      {
        "stem": "本课 p 基底约定下，正入射 1→1.5 的 rₛ、rₚ 是？",
        "choices": [
          "+0.2, +0.2",
          "−0.2, +0.2",
          "−0.04, +0.04"
        ],
        "answer": 1,
        "explain": "代入余弦公式 cosθ₁=cosθ₂=1，得 rₛ=(1−1.5)/2.5=−0.2，rₚ=(1.5−1)/2.5=+0.2。反射 p 基底相反，因此不能只比较标量符号。",
        "whyOther": "两项均正漏掉 s 的方向反转；0.04 是振幅平方后的功率反射率，不是带符号的场系数。",
        "id": "1.6.2:q2"
      },
      {
        "stem": "哪条是 s 波归一化后的切向电场条件？",
        "choices": [
          "$1-r_s=t_s$",
          "$r_s=t_s$",
          "$1+r_s=t_s$"
        ],
        "answer": 2,
        "explain": "三束波的 s 正方向相同，介质 1 的总电场为入射加反射，介质 2 为透射，故 Eᵢ+Eᵣ=Eₜ，除以 Eᵢ 得 1+rₛ=tₛ。",
        "whyOther": "1−rₛ 出现在 s 的 H 切向条件中，还应带 n 与余弦；rₛ=tₛ 则完全遗漏入射场。",
        "id": "1.6.2:q3"
      },
      {
        "stem": "tₛ=0.8 是否表示透射功率为入射的 80%？",
        "choices": [
          "否，还要平方并乘法向能流系数",
          "是，场系数与功率比相同",
          "否，透射功率必为 64%"
        ],
        "answer": 0,
        "explain": "t 是电场振幅比。透射率 T=[n₂cosθ₂/(n₁cosθ₁)]|t|²；在正入射 1→1.5 时 T=1.5×0.8²=0.96，不是 0.8 或 0.64。",
        "whyOther": "80% 没有平方；64% 虽平方了，却遗漏两侧波阻抗/折射率及投影产生的系数。",
        "id": "1.6.2:q4"
      }
    ]
  };
  const translation = {
    "code": "1.6.2",
    "title": "Fresnel formulas",
    "pages": "22–24",
    "pdf": 32,
    "visual": "fresnel",
    "overview": "Snell law fixes directions; Fresnel formulas fix field-amplitude ratios. Choose s and p basis directions first, then solve two tangential boundary equations without confusing signs and energy.",
    "bridge": {
      "previous": "§1.6.1 has matched frequency and tangential wavevector.",
      "current": "Derive s and p amplitude coefficients for a nonabsorbing nonmagnetic interface.",
      "next": "§1.6.3 interprets signs, special angles, and model limits."
    },
    "goals": [
      "Identify s and p components",
      "Solve two equations for r and t",
      "Interpret signs using a specified p basis"
    ],
    "symbols": [
      [
        "rₛ, rₚ",
        "reflected/incident electric amplitude",
        "1"
      ],
      [
        "tₛ, tₚ",
        "transmitted/incident electric amplitude",
        "1"
      ],
      [
        "s, p",
        "E perpendicular, parallel to incidence plane",
        "1"
      ],
      [
        "n₁, n₂",
        "real positive indices, μ₁≈μ₂",
        "1",
        "Example: 1 and 1.5"
      ]
    ],
    "blocks": [
      {
        "label": "Define directions first",
        "title": "Signs belong to basis amplitudes, not negative power",
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
          "The incidence plane contains the incident wavevector and interface normal. The three waves share the same s direction perpendicular to that plane. Choose p̂=ŝ×k̂ for each wave, so p̂ᵢ,p̂ᵣ,p̂ₜ change with propagation direction, consistent with book Fig. 1.20.",
          "r=Eᵣ/Eᵢ and t=Eₜ/Eᵢ are electric coefficients, not power ratios. The cosine forms remain usable at normal incidence, avoiding removable 0/0 forms in the book sine/tangent expressions."
        ]
      },
      {
        "label": "s-polarization derivation",
        "title": "Common E basis, reversed reflected tangential H",
        "eq": [
          {
            "text": "1+r_s=t_s",
            "tex": true
          },
          {
            "text": "n_1\\cos\\theta_1(1-r_s)=n_2\\cos\\theta_2t_s",
            "tex": true
          },
          {
            "text": "t_s=\\frac{2n_1\\cos\\theta_1}{n_1\\cos\\theta_1+n_2\\cos\\theta_2}",
            "tex": true
          }
        ],
        "steps": [
          [
            "Equations and assumptions",
            "Use tangential continuity of total E,H from §1.5. Media are homogeneous, isotropic, linear, nonabsorbing, nonmagnetic, with no free sheet sources. §1.2.6 gives H₀=nE₀/Z₀."
          ],
          [
            "Normalize",
            "Divide by nonzero incident s amplitude. E continuity gives 1+rₛ=tₛ. Reflected tangential H reverses, giving n₁cosθ₁(1−rₛ)=n₂cosθ₂tₛ."
          ],
          [
            "Eliminate",
            "Set a=n₁cosθ₁ and b=n₂cosθ₂. Substitute tₛ=1+rₛ into a(1−rₛ)=btₛ. Then a−b=(a+b)rₛ, so rₛ=(a−b)/(a+b), tₛ=2a/(a+b)."
          ]
        ]
      },
      {
        "label": "p-polarization derivation",
        "title": "Project E before matching H",
        "eq": [
          {
            "text": "\\cos\\theta_1(1-r_p)=t_p\\cos\\theta_2",
            "tex": true
          },
          {
            "text": "n_1(1+r_p)=n_2t_p",
            "tex": true
          },
          {
            "text": "t_p=\\frac{2n_1\\cos\\theta_1}{n_2\\cos\\theta_1+n_1\\cos\\theta_2}",
            "tex": true
          }
        ],
        "steps": [
          [
            "Same boundary laws",
            "Use the same conditions and H₀=nE₀/Z₀. Since p fields lie in the incidence plane, project onto the interface tangent first. The selected reflected p basis has opposite tangential projection to the incident one."
          ],
          [
            "Write two equations",
            "Tangential E gives cosθ₁(1−rₚ)=tₚcosθ₂. The common s direction of H gives n₁(1+rₚ)=n₂tₚ. Do not copy the s relation 1+r=t."
          ],
          [
            "Eliminate tₚ",
            "Substitute tₚ=n₁(1+rₚ)/n₂ into the first equation. Rearranging gives (n₂cosθ₁−n₁cosθ₂)=(n₂cosθ₁+n₁cosθ₂)rₚ. Back-substitution gives tₚ."
          ]
        ]
      },
      {
        "label": "Normal-incidence check",
        "title": "rₛ=−0.2 and rₚ=+0.2 are consistent",
        "eq": [
          {
            "text": "\\theta_1=0:\\quad r_s=\\frac{n_1-n_2}{n_1+n_2},\\quad r_p=-r_s,\\quad t_s=t_p=\\frac{2n_1}{n_1+n_2}",
            "tex": true
          }
        ],
        "text": [
          "For n₁=1 and n₂=1.5, rₛ=−0.2, rₚ=+0.2 and tₛ=tₚ=0.8. In the normal-incidence limit p̂ᵣ=−p̂ᵢ, so the reflected electric vector is still reversed on a fixed lab axis. Both polarizations have reflectance 0.04."
        ]
      }
    ],
    "questions": [
      {
        "stem": "What defines s polarization?",
        "choices": [
          "E perpendicular to the incidence plane",
          "E parallel to the wavevector",
          "E parallel to the incidence plane"
        ],
        "answer": 0,
        "explain": "The incidence plane is spanned by kᵢ and the interface normal. s electric field is perpendicular to it and to kᵢ; p electric field lies in it but remains transverse.",
        "whyOther": "The second is longitudinal, excluded here. The third defines p. s/p are not merely horizontal/vertical screen directions.",
        "id": "1.6.2:q1"
      },
      {
        "stem": "With this p-basis convention, what are rₛ,rₚ at normal incidence from 1 to 1.5?",
        "choices": [
          "+0.2, +0.2",
          "−0.2, +0.2",
          "−0.04, +0.04"
        ],
        "answer": 1,
        "explain": "Set both cosines to 1: rₛ=(1−1.5)/2.5=−0.2 and rₚ=(1.5−1)/2.5=+0.2. The reflected p basis reverses, so scalar signs alone do not compare lab-frame vectors.",
        "whyOther": "Both positive misses the s reversal. 0.04 is a squared amplitude, a power reflectance, not a signed field coefficient.",
        "id": "1.6.2:q2"
      },
      {
        "stem": "Which is the normalized tangential electric condition for s?",
        "choices": [
          "$1-r_s=t_s$",
          "$r_s=t_s$",
          "$1+r_s=t_s$"
        ],
        "answer": 2,
        "explain": "All s bases point the same way. Total E in medium 1 is incident plus reflected and equals transmitted E, giving 1+rₛ=tₛ after normalization.",
        "whyOther": "1−rₛ occurs in the s magnetic condition with index and cosine factors. rₛ=tₛ omits the incident field entirely.",
        "id": "1.6.2:q3"
      },
      {
        "stem": "Does tₛ=0.8 mean transmitted power is 80% of incident power?",
        "choices": [
          "No; square it and include the normal-flux factor",
          "Yes; field coefficient equals power ratio",
          "No; transmitted power must be 64%"
        ],
        "answer": 0,
        "explain": "t is an electric amplitude ratio. T=[n₂cosθ₂/(n₁cosθ₁)]|t|². At normal incidence from 1 to 1.5, T=1.5×0.8²=0.96, neither 0.8 nor 0.64.",
        "whyOther": "80% omits squaring. 64% squares but omits the impedance/index and projection factor.",
        "id": "1.6.2:q4"
      }
    ]
  };
  const guide = {
    question: ["玻璃既反光又透光，两个场幅度分别占多少？", "Glass both reflects and transmits. How large are the two fields?"],
    setup: ["上一节已找出三束光的方向，现在求它们的幅度关系。电场可能有不同横向方向，投影到界面时几何关系不同，所以先把它拆成 s、p 两个独立通道，再分别接上 E、H。两侧取无吸收、非磁性的理想材料。", "The directions are known; now find field sizes. Different transverse electric orientations project differently onto the surface, so split them into independent s and p channels before matching E and H. Both materials are ideal, nonabsorbing and nonmagnetic."],
    terms: [
      { name: ["入射面 / s、p", "Incidence plane / s, p"], meaning: ["入射光线与法线组成入射面。s 电场垂直这个面，p 电场在这个面内；二者都垂直各自传播方向。", "The incident ray and normal define a plane. s electric field is perpendicular to that plane; p lies in it. Both remain perpendicular to their own propagation direction."] },
      { name: ["小写 r、t", "Lowercase r, t"], meaning: ["分别是反射场、透射场与入射场的带方向振幅之比，不是能量百分数。下标 s、p 区分通道。", "Ratios of signed reflected or transmitted field amplitude to incident amplitude, not energy fractions. s and p label channels."] },
      { name: ["正向基底", "Positive basis direction"], meaning: ["先规定箭头哪边算正，再说系数正负。这里每束波取 p̂=ŝ×k̂；反射波的 p 正向会随传播方向改变。", "Choose what counts as a positive arrow before interpreting signs. We use p̂=ŝ×k̂ for each wave; reflected p changes with its propagation direction."] }
    ],
    observe: ["先只跟踪 rₛ、tₛ 两条曲线，再看 p 通道。若见负值，不要理解成负能量；本图画的是场系数。能量占比会在 1.6.4 另算。", "First follow the rₛ and tₛ curves, then the p channel. Negative values are signed fields, not negative energy. Energy fractions follow in §1.6.4."],
    blocks: [
      { title: ["先规定两种振动方向与系数，不急着背长分式", "Define orientations and ratios before memorizing fractions"], before: ["上一节的角度只确定光往哪走，还不能确定 E 朝哪振。s、p 是把横向电场拆成两条互相垂直的轴；任意横向振动都可以在这两轴上分解。每条轴各有一个反射比 r 和透射比 t。下面的大分式是两组边界方程解出的结果，不是本节学习的起点。", "Ray angles determine travel, not electric oscillation direction. s and p form two perpendicular transverse axes, allowing any transverse field to be resolved into them. Each channel has r and t. The long fractions below are results of two boundary equations, not the starting point."], read: ["先保留“拆方向 → 各列两条接续式 → 解幅度比”的路线。尤其 p 的正向跟着各束传播方向变；因此不同通道的正负不能脱离箭头约定直接比较。接下来先解容易画清楚的 s，再解 p；完整反射分式会在各自的两条接续式之后出现。", "Keep the route: split orientations → write two matching equations per channel → solve amplitude ratios. p's positive direction follows each ray, so signs across channels require their bases. First solve the simpler s geometry, then p. Each full reflection coefficient will appear after the two matching equations that produce it."] },
      { title: ["s 通道：把入射幅度当 1，解两条接续式", "s channel: set incident amplitude to 1 and solve two conditions"], before: ["按非零入射场幅度归一化，入射写 1，反射写 rₛ，透射写 tₛ。s 的 E 都沿同一界面方向，切向 E 连续给第一式；反射方向翻转使 H 的切向符号相反，得到第二式中的 1−rₛ。非磁性介质 H/E 与 n 成正比，沿界面投影带 cosθ。", "Divide by nonzero incident amplitude: incident is 1, reflected rₛ, transmitted tₛ. All s electric fields share one surface direction, giving the first condition. Reversed propagation flips tangential H, giving 1−rₛ in the second. For nonmagnetic media H/E is proportional to n, and the surface projection brings cosθ."], eqLead: [
        ["先写切向电场相等：入射加反射，等于透射。", "First match tangential E: incident plus reflected equals transmitted."],
        ["再写切向磁场相等：反射方向翻转；两侧的 n、角度可以不同。", "Then match tangential H: reflection reverses its sign; indices and angles may differ."],
        ["将 tₛ=1+rₛ 代入第二式，展开并把 rₛ 收到同侧，得到反射场比。", "Substitute tₛ=1+rₛ into the second equation, expand, and collect rₛ on one side to obtain the reflected-field ratio."],
        ["最后把 rₛ 代回第一式，才得到透射场比。详细移项在下方。", "Finally substitute rₛ back into the first equation for the transmitted-field ratio. The detailed rearrangement is below."]
      ], read: ["这两条菲涅耳分式是边界接续式的解，不是两条额外定律；r、t 仍是场幅度比而非能量百分数。", "These Fresnel fractions solve the two boundary conditions; they are not additional laws. r and t remain field-amplitude ratios, not energy percentages."] },
      { title: ["p 通道：规则没换，改变的是电场投影", "p channel: the rules stay; the electric projection changes"], before: ["现在把振动方向转到入射面内，仍使用同一组 E、H 切向连续。E 要投影才得到沿界面的分量，所以出现 cosθ；所选反射 p 正向使 E 的反射项变成减号，H 的方向给出 1+rₚ。不要把 s 通道的正负原样抄来。", "Rotate E into the incidence plane but retain tangential E/H matching. E must be projected onto the surface, producing cosθ; the chosen reflected p basis gives a minus sign in E, while H contains 1+rₚ. Do not copy the s signs."], eqLead: [
        ["先比较沿界面的电场：三束光的投影与各自角度一起出现。", "First compare surface-parallel E: each ray contributes its angle-dependent projection."],
        ["再比较沿界面的磁场：p 基底使反射项取加号。", "Then compare tangential H: the p-basis convention gives the reflected term a plus sign."],
        ["由第二式写出 tₚ=n₁(1+rₚ)/n₂，代回第一式并收集 rₚ。", "Write tₚ=n₁(1+rₚ)/n₂ from the second equation, insert it into the first, and collect rₚ."],
        ["把 rₚ 回代得到 tₚ；完整移项可在下方展开。", "Substitute rₚ back to obtain tₚ; expand the algebra below if needed."]
      ], read: ["两种偏振会分到不同场幅度，是几何投影与同一电磁规则共同作用的结果；下一步用正入射检查符号。", "The two polarizations get different field shares from geometry under the same electromagnetic rules. Next check the signs at normal incidence."] },
      { title: ["用正入射检查：系数正负要连同箭头读", "Normal-incidence check: read signs together with arrows"], before: ["把角度都取 0°，各余弦变 1，式子最简单。空气 1 到玻璃 1.5 给 rₛ=−0.2、rₚ=+0.2、t=0.8。看起来反射正负相反，是否同一表面却给矛盾结果？关键是两个通道比较场时用的正向箭头不同。", "At normal incidence all cosines are 1. Air 1 to glass 1.5 gives rₛ=−0.2, rₚ=+0.2 and t=0.8. Opposite reflection signs appear contradictory only if we forget the different reference arrows."], read: ["正入射极限里反射 p 正向与入射 p 正向相反，所以标量 +0.2 仍对应实验室固定轴上反向的场；s 的 −0.2 给出相同物理结论。两个通道的反射能量都占 4%，不是一个产生负功率。", "In the normal-incidence limit, reflected and incident p basis arrows oppose. Scalar +0.2 thus still gives a reversed field in a fixed laboratory axis, just as s's −0.2 does. Both channels reflect 4% of power; neither creates negative power."] }
    ],
    check: { question: ["为什么已知折射角后，还不能直接知道透射了多少能量？", "Why does a known refraction angle not yet tell us the transmitted energy?"], answer: ["方向只规定几何，还需边界条件求场幅度，之后再把场幅度换成法向功率，不能把 t 直接当能量比例。", "Geometry alone leaves amplitudes unknown. Boundary conditions determine fields; those must then be converted to normal power. t itself is not an energy fraction."] },
    next: ["带到 1.6.3：会计算场系数之后，改变角度，看曲线的负号、零点和传播边界各表示什么。", "Into §1.6.3: with coefficients defined, vary angle and interpret their signs, zeros and propagation limits."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  const [rs, rp] = section.blocks[0].eq;
  delete section.blocks[0].eq;
  section.blocks[1].eq.splice(2, 0, rs);
  section.blocks[2].eq.splice(2, 0, rp);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.6.2"] = {
    ask: ["菲涅耳曲线的负 rₛ 是负反射功率吗？", "Does a negative Fresnel rₛ represent negative reflected power?"],
    choices: [["是，能量从界面倒流", "Yes, energy flows backward through the surface"], ["是，说明光强被抵消", "Yes, intensity is cancelled"], ["不是，它是带基底约定的场振幅符号", "No, it is a signed field amplitude in a specified basis"]], answer: 2,
    try: ["调角度与 n₂，分开追踪四条 r/t 场系数曲线。", "Change angle and n₂, tracing the four r/t field-coefficient curves separately."],
    why: ["r、t 是场振幅比；正负要与 s/p 箭头基底一起读。能量比还需平方及法向能流因子。", "r and t are field-amplitude ratios; signs depend on s/p basis arrows. Power ratios additionally require squares and normal-flux factors."]
  };
  const deepLab = {
    controls: [["incidence", 0], ["incidence", 55]],
    compare: ["固定 n₂=1.5，比较法向和斜入射时 rₛ、rₚ、tₛ、tₚ；先认基底再读符号。", "Hold n₂=1.5 and compare rₛ, rₚ, tₛ, tₚ at normal and oblique incidence; read basis before sign."],
    relation: ["图中小写 rₛ、rₚ 是带符号的反射电场振幅比；反射光与入射光在同一介质、反射角等于入射角，功率换算因子相同并约去，所以反射率 R 才是各 r 的模平方，而不是 r 本身。", "The plotted lowercase rₛ and rₚ are signed reflected-field amplitude ratios. Incident and reflected rays share a medium and angle, so the power-conversion factors cancel; reflectance R is the modulus squared of each r, not r itself."],
    formula: "R_s=|r_s|^2,\\qquad R_p=|r_p|^2",
    challenge: [["若某基底下 rₛ=-0.2，对应反射率 Rₛ 为多少？", "If rₛ=-0.2 in a chosen basis, what is reflectance Rₛ?"], [["−0.2", "−0.2"], ["0.04", "0.04"], ["0.2", "0.2"]], 1],
  };
  deepLab.mistakes = [["rₛ 是有符号的场比，功率比为 |rₛ|²，不能为负。", "rₛ is a signed field ratio; the power ratio is |rₛ|² and cannot be negative."], null, ["0.2 是场系数的模；反射率还要平方，得到 0.04。", "0.2 is the field-ratio magnitude; reflectance squares it to 0.04."]];
  const [focus, limitQuestion, limitAnswer] = [["先认 s/p 的正向基底，再比较四条场系数曲线的正负。", "Identify positive s/p bases before interpreting signs on the four field-coefficient curves."], ["负的 r 就表示负的反射功率吗？", "Does a negative r mean negative reflected power?"], false];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.6.2"] = deepLab;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
    title: pair("四个场系数，而不是四个功率比", "Four field coefficients, not four power ratios"),
    note: pair("固定 n₁=1、非磁性无吸收。实线为 r，虚线为 t；采用教材的 p 基底约定。n₂>1，不含复系数全反射区。", "Fixed n₁=1, nonmagnetic lossless media. Solid curves are r, dashed curves t, with the book p-basis convention. n₂>1 excludes complex total-reflection coefficients."),
    settings: [slider("incidence", "入射角 θ₁", "Incidence angle θ₁", 0, 85, 1, 30, "°"), slider("index2", "透射折射率 n₂", "Transmitted index n₂", 1.1, 2.4, .1, 1.5)],
    draw(a) {
      const { ctx, w, h, values, text, line, path, red, blue, green, muted } = setup(a);
      const left = 42, span = w - 65, top = 60, bottom = h - 82, H = bottom - top;
      const X = angle => left + span * angle / 90, Y = value => top + H * (1.2 - value) / 2.2;
      for (const value of [-1, 0, 1]) { line(left, Y(value), w - 23, Y(value)); text(String(value), left - 12, Y(value) + 4, muted, 11, "right"); }
      for (const angle of [0, 30, 60, 90]) text(`${angle}°`, X(angle), bottom + 22, muted, 11, "center");
      for (const [key, color, dashed] of [["rs", blue, false], ["rp", red, false], ["ts", green, true], ["tp", "#e4c18a", true]]) {
        ctx.setLineDash(dashed ? [5, 4] : []);
        path(Array.from({ length: 181 }, (_, i) => [X(i * .499), Y(window.OpticsInterface.fresnel(1, values.index2, i * .499)[key])]), color, 2);
      }
      ctx.setLineDash([]);
      line(X(values.incidence), top, X(values.incidence), bottom, muted, 1);
      const f = window.OpticsInterface.fresnel(1, values.index2, values.incidence);
      text(`rₛ=${f.rs.toFixed(3)}`, w * .3, 25, blue, 14, "center");
      text(`rₚ=${f.rp.toFixed(3)}`, w * .72, 25, red, 14, "center");
      text(`tₛ=${f.ts.toFixed(3)}`, w * .3, h - 21, green, 14, "center");
      text(`tₚ=${f.tp.toFixed(3)}`, w * .72, h - 21, "#e4c18a", 14, "center");
      text("r: ━   t: ┄", w - 25, 46, muted, 11, "right");
    },
  };
  figure.background = ["#102b34", "#163d43"];
  figure.animated = false;
  window.OpticsExtraVisuals.fresnel = figure;
})();

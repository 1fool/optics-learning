/* Chapter 1, section 1.6.5: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.6.5",
    "title": "反射和折射产生的偏振",
    "pages": "27–29",
    "pdf": 37,
    "visual": "brewster",
    "overview": "界面对 s、p 的反射不同，就能改变偏振。布儒斯特角令 p 反射完全消失，但透射光通常仍有两个分量；“全偏振”不等于“全部能量被反射”。",
    "bridge": {
      "previous": "1.6.4 已有各偏振通道的功率比。",
      "current": "从布儒斯特条件到自然光的反射偏振及线偏振方向变化。",
      "next": "接下来 1.7 研究全反射相移，本批只保留入口，不把它算已完成。"
    },
    "goals": [
      "推出 tanθB=n₂/n₁",
      "解释反射 s 全偏振与透射部分偏振",
      "按 s、p 权重计算任意线偏振入射的能量"
    ],
    "symbols": [
      [
        "θB",
        "布儒斯特角，量自法线",
        "°",
        "1→1.5：56.31°"
      ],
      [
        "α",
        "入射电场与入射面夹角，p→s",
        "°",
        "算例：45°"
      ],
      [
        "Dᵣ",
        "自然光反射后的线偏振度",
        "1"
      ],
      [
        "Rs, Rp",
        "两通道功率反射率",
        "1",
        "θB 时约 0.14793、0"
      ]
    ],
    "blocks": [
      {
        "label": "关键条件",
        "title": "两条出射光线互相垂直时，p 反射消失",
        "eq": [
          {
            "text": "n_1\\sin\\theta_1=n_2\\sin\\theta_2",
            "tex": true,
            "ref": "snell-law"
          },
          {
            "text": "\\tan\\theta_B=\\frac{n_2}{n_1}",
            "tex": true,
            "ref": "brewster-law"
          }
        ],
        "text": [
          "非磁性无吸收、非同折射率界面在 θ₁+θ₂=90° 时 rₚ=0。对含有 s、p 的自然光，反射光只剩 s，电场垂直入射面；若入射纯 p，则反射场为零，不能把零光束称为“有方向的全偏振反射光”。"
        ]
      },
      {
        "label": "布儒斯特推导",
        "title": "从相位匹配到一个可测的角度",
        "steps": [
          [
            "来源与条件",
            "使用 1.6.2 的 rₚ 公式和上方斯涅耳定律；取两侧实数正 n、相等 μ，并排除 n₁=n₂ 的退化无界面情形。"
          ],
          [
            "反射零点",
            "rₚ=0 给 n₂cosθB=n₁cosθ₂。联合 n₁sinθB=n₂sinθ₂，得到 sin2θB=sin2θ₂；非同折射率时选择 θB+θ₂=90° 的分支。"
          ],
          [
            "解出角度",
            "再代入 n₁sinθB=n₂cosθB，除以非零 cosθB，得到 tanθB=n₂/n₁。空气到玻璃 1.5 得 56.31°。"
          ],
          [
            "联系偶极图像",
            "透射 p 场驱动的偶极振动方向在布儒斯特条件下与反射光线平行。1.4.2 的轴向辐射零点给出直观解释；完整定量结果仍以边界条件为准。"
          ]
        ]
      },
      {
        "label": "能量与偏振",
        "title": "100% 偏振，可能只有 7.40% 入射能量",
        "eq": [
          {
            "text": "D_r=\\frac{|R_s-R_p|}{R_s+R_p}\\quad(R_s+R_p>0)",
            "tex": true
          },
          {
            "text": "R(\\alpha)=R_s\\sin^2\\alpha+R_p\\cos^2\\alpha",
            "tex": true
          }
        ],
        "text": [
          "n₁=1、n₂=1.5 在 θB：Rs≈0.14793，Rp=0。自然光总反射率为 Rs/2≈0.07396，即 7.40%，反射光 Dᵣ=1。余下 92.60% 功率透射，不存在“全偏振就把全部光都反回来”。",
          "此时 Ts≈0.85207、Tp=1，自然光的透射仍含两种偏振，偏振度约 0.07987，p 略占优势。对线偏振 α，入射 s、p 能量权重为 sin²α、cos²α，上式不能与自然光的固定一半权重混用。"
        ]
      },
      {
        "label": "方向变化算例",
        "title": "反射后仍线偏振，但方向通常改变",
        "eq": [
          {
            "text": "E_{rs}=r_sE_0\\sin\\alpha,\\qquad E_{rp}=r_pE_0\\cos\\alpha",
            "tex": true
          }
        ],
        "text": [
          "入射 α=45°、n₁=1、n₂=1.5、θ₁=50°。计算得 rₛ≈−0.33474、rₚ≈+0.05725，反射基底中的角 αᵣ=atan2(rₛsinα,rₚcosα)≈−80.29°；方向轴以 180° 为周期，不能只看正的振幅大小。",
          "在有实数传播透射角的本节条件下，实系数只引入 0 或 π 相对相位，线偏振入射仍给线偏振反射；全反射复相移可使偏振变椭圆，属于下一节。"
        ]
      }
    ],
    "questions": [
      {
        "stem": "空气到 n=1.5 的布儒斯特角相对法线约为？",
        "choices": [
          "33.69°",
          "56.31°",
          "41.81°"
        ],
        "answer": 1,
        "explain": "tanθB=1.5，得 θB≈56.31°；折射角为 33.69°，两者互余。测角基准必须保持为法线而不是界面。",
        "whyOther": "33.69° 是此处的折射角或反向入射布儒斯特角；41.81° 是 1.5→1 的临界角，物理条件不同。",
        "id": "1.6.5:q1"
      },
      {
        "stem": "自然光在布儒斯特角反射后，非零反射光是哪种偏振？",
        "choices": [
          "纯 s，垂直入射面",
          "纯 p，平行入射面",
          "没有偏振变化"
        ],
        "answer": 0,
        "explain": "布儒斯特条件给 Rp=0，而 Rs 通常不为零；自然光原来有两种分量，反射后只剩 s。因此电场垂直入射面，反射偏振度为一。",
        "whyOther": "纯 p 把被消去的通道认成保留通道；没有变化忽略两偏振的不同反射率。若入射原本纯 p，则没有非零反射光。",
        "id": "1.6.5:q2"
      },
      {
        "stem": "布儒斯特角的透射光为什么通常不是全偏振？",
        "choices": [
          "因为频率改变了",
          "因为透射光变成纵波",
          "因为 Ts 与 Tp 均非零"
        ],
        "answer": 2,
        "explain": "Rp=0 表示 p 不反射，故该通道全部透射；s 则部分反射仍部分透射。因此透射束通常同时含 s 与 p，只是权重不同，形成部分偏振。",
        "whyOther": "频率由静止界面匹配保持；本节透射仍是横向传播电磁波。偏振不平衡不需要频率变化或纵向场。",
        "id": "1.6.5:q3"
      },
      {
        "stem": "线偏振 α=45°，已知 Rs=0.10、Rp=0.02，总反射率是多少？",
        "choices": [
          "0.12",
          "0.06",
          "0.08"
        ],
        "answer": 1,
        "explain": "Eₛ=E₀sinα、Eₚ=E₀cosα；两通道能量各占一半，所以 R=0.10×1/2+0.02×1/2=0.06。结果在这个角度与自然光数值相同，但偏振统计不同。",
        "whyOther": "0.12 忘记权重；0.08 不是正确能量加权。应按正交分量的功率相加，而不是把带符号振幅先相加再平方。",
        "id": "1.6.5:q4"
      }
    ]
  };
  const translation = {
    "code": "1.6.5",
    "title": "Polarization produced by reflection and refraction",
    "pages": "27–29",
    "pdf": 37,
    "visual": "brewster",
    "overview": "Unequal s,p reflection changes polarization. Brewster incidence removes reflected p, but transmission generally retains both components. Fully polarized does not mean all energy is reflected.",
    "bridge": {
      "previous": "§1.6.4 gives power ratios for each polarization.",
      "current": "Connect Brewster incidence to reflected polarization and changes in linear-polarization direction.",
      "next": "Next, §1.7 studies total-reflection phase shifts; this batch does not count it as completed."
    },
    "goals": [
      "Derive tanθB=n₂/n₁",
      "Explain pure reflected s and partial transmitted polarization",
      "Weight s,p powers for arbitrary linear incidence"
    ],
    "symbols": [
      [
        "θB",
        "Brewster angle from the normal",
        "°",
        "1→1.5: 56.31°"
      ],
      [
        "α",
        "incident E angle from incidence plane, p toward s",
        "°",
        "Example: 45°"
      ],
      [
        "Dᵣ",
        "linear polarization degree of reflected unpolarized input",
        "1"
      ],
      [
        "Rs, Rp",
        "channel power reflectances",
        "1",
        "At θB: about 0.14793, 0"
      ]
    ],
    "blocks": [
      {
        "label": "Key condition",
        "title": "Perpendicular outgoing rays remove reflected p",
        "eq": [
          {
            "text": "n_1\\sin\\theta_1=n_2\\sin\\theta_2",
            "tex": true,
            "ref": "snell-law"
          },
          {
            "text": "\\tan\\theta_B=\\frac{n_2}{n_1}",
            "tex": true,
            "ref": "brewster-law"
          }
        ],
        "text": [
          "At a nonmagnetic lossless non-index-matched interface, θ₁+θ₂=90° gives rₚ=0. For unpolarized input containing both channels, the reflected field is pure s, perpendicular to the incidence plane. Pure p input instead gives no reflected field; a zero beam has no polarization direction."
        ]
      },
      {
        "label": "Brewster derivation",
        "title": "From phase matching to a measurable angle",
        "steps": [
          [
            "Source and conditions",
            "Use rₚ from §1.6.2 and Snell law above, with positive real indices and equal permeabilities, excluding the degenerate matched-index case."
          ],
          [
            "Set reflection to zero",
            "rₚ=0 gives n₂cosθB=n₁cosθ₂. Together with n₁sinθB=n₂sinθ₂, this gives sin2θB=sin2θ₂. For unequal indices choose the branch θB+θ₂=90°."
          ],
          [
            "Solve the angle",
            "Substitute to obtain n₁sinθB=n₂cosθB and divide by nonzero cosθB. Then tanθB=n₂/n₁, giving 56.31° from air to glass of index 1.5."
          ],
          [
            "Link to the dipole picture",
            "Under the Brewster condition, dipoles driven by transmitted p oscillate parallel to the reflected ray. The axial radiation null of §1.4.2 gives intuition; boundary conditions supply the quantitative result."
          ]
        ]
      },
      {
        "label": "Energy and polarization",
        "title": "100% polarization can carry only 7.40% of incident power",
        "eq": [
          {
            "text": "D_r=\\frac{|R_s-R_p|}{R_s+R_p}\\quad(R_s+R_p>0)",
            "tex": true
          },
          {
            "text": "R(\\alpha)=R_s\\sin^2\\alpha+R_p\\cos^2\\alpha",
            "tex": true
          }
        ],
        "text": [
          "At θB for n₁=1,n₂=1.5, Rs≈0.14793 and Rp=0. Unpolarized total reflectance is Rs/2≈0.07396, or 7.40%, while Dᵣ=1. The remaining 92.60% is transmitted; fully polarized does not mean fully reflected.",
          "Here Ts≈0.85207 and Tp=1, so transmitted unpolarized input still has both components, with polarization degree about 0.07987 and a slight p preference. For linear input at α, incident weights are sin²α,cos²α, not the fixed half weights of unpolarized light."
        ]
      },
      {
        "label": "Direction-change example",
        "title": "Reflection stays linear here, but generally rotates",
        "eq": [
          {
            "text": "E_{rs}=r_sE_0\\sin\\alpha,\\qquad E_{rp}=r_pE_0\\cos\\alpha",
            "tex": true
          }
        ],
        "text": [
          "For α=45°, n₁=1,n₂=1.5 and θ₁=50°, rₛ≈−0.33474,rₚ≈+0.05725. The angle in the reflected basis is αᵣ=atan2(rₛsinα,rₚcosα)≈−80.29°. A polarization axis is periodic in 180°, so unsigned magnitudes alone omit direction information.",
          "With a real propagating transmitted angle under these conditions, real coefficients introduce only 0 or π relative phase, so linear input remains linear in reflection. Complex total-reflection phase shifts can produce ellipticity, addressed next."
        ]
      }
    ],
    "questions": [
      {
        "stem": "What is the Brewster angle from the normal for air to n=1.5?",
        "choices": [
          "33.69°",
          "56.31°",
          "41.81°"
        ],
        "answer": 1,
        "explain": "tanθB=1.5 gives θB≈56.31°, with refraction angle 33.69°. The two are complementary. Measure from the normal, not the surface.",
        "whyOther": "33.69° is the transmitted angle here or Brewster angle in reverse. 41.81° is the reverse critical angle, a different condition.",
        "id": "1.6.5:q1"
      },
      {
        "stem": "What is the nonzero reflected polarization for unpolarized input at Brewster incidence?",
        "choices": [
          "Pure s, perpendicular to the incidence plane",
          "Pure p, parallel to the incidence plane",
          "No polarization change"
        ],
        "answer": 0,
        "explain": "Brewster incidence gives Rp=0 while Rs generally remains nonzero. Of the two incident unpolarized channels, only s survives reflection, giving unit polarization degree.",
        "whyOther": "Pure p selects the removed channel. No change ignores unequal reflectances. If the input were pure p instead, the reflected beam would be zero.",
        "id": "1.6.5:q2"
      },
      {
        "stem": "Why is transmitted unpolarized input generally not fully polarized at Brewster incidence?",
        "choices": [
          "Because its frequency changes",
          "Because transmission becomes longitudinal",
          "Because both Ts and Tp remain nonzero"
        ],
        "answer": 2,
        "explain": "Rp=0 means p does not reflect and is fully transmitted. s partly reflects but also partly transmits. Both remain in transmission with unequal weights, producing partial polarization.",
        "whyOther": "Frequency stays matched at a stationary interface. Transmission remains a transverse electromagnetic wave. Unequal polarization weights require neither changed frequency nor a longitudinal field.",
        "id": "1.6.5:q3"
      },
      {
        "stem": "For linear input α=45° with Rs=0.10,Rp=0.02, what is total reflectance?",
        "choices": [
          "0.12",
          "0.06",
          "0.08"
        ],
        "answer": 1,
        "explain": "Eₛ=E₀sinα and Eₚ=E₀cosα. At 45° each channel carries half the power, so R=0.10/2+0.02/2=0.06. It matches the unpolarized value here, but not its polarization statistics.",
        "whyOther": "0.12 omits weights; 0.08 is not the weighted energy result. Add orthogonal powers rather than summing signed amplitudes and squaring.",
        "id": "1.6.5:q4"
      }
    ]
  };
  const guide = {
    question: ["没有偏振片，为什么玻璃反光也会偏振？", "Why can a reflection polarize light without a polarizer?"],
    setup: ["把前面三条线接在一起：自然光含平均等能量的 s、p，菲涅耳公式让它们反射比例不同，布儒斯特角又让 p 反射为零。因此界面本身就能筛选方向。本节分开问“剩下的光偏向哪边”和“还剩多少能量”。", "Connect three ideas: unpolarized input has equal mean s/p powers, Fresnel coefficients reflect them unequally, and Brewster incidence removes p reflection. An interface therefore selects direction. Separate which direction remains from how much energy remains."],
    terms: [
      { name: ["线偏振", "Linear polarization"], meaning: ["电场沿固定横向轴来回振动；方向轴不等于光线传播轴。", "E oscillates along a fixed transverse axis, not along the ray's propagation axis."] },
      { name: ["偏振度 Dᵣ", "Polarization degree Dᵣ"], meaning: ["这里用反射 s、p 强度差相对总强度衡量方向偏好；1 表示只剩一个通道，不表示全部入射光反回。", "Here the reflected s/p intensity imbalance divided by their sum. One means a single channel remains, not all incident power is reflected."] },
      { name: ["α", "α"], meaning: ["线偏振入射场从 p 轴转向 s 轴的角度，决定两通道输入比例；不同于光线的入射角 θ₁。", "Angle of incident linear polarization measured from p toward s, setting their input weights; not ray incidence angle θ₁."] }
    ],
    observe: ["将入射角调到布儒斯特角附近，看 p 反射通道消失而 s 仍有输出，再看总反射功率并没有变成 100%。方向纯度与能量多少要分别读。", "Set incidence near Brewster and watch p reflection disappear while s remains. Total reflected power does not become 100%. Read directional purity separately from energy share."],
    blocks: [
      { title: ["先筛方向：p 消失后，反射光只剩 s", "First select direction: with p absent, reflected light is s"], before: ["上一节已会分别记 s、p 的能量。现在取含两通道的自然光：若角度让 Rp=0，反射光里就没有 p，只剩电场垂直入射面的 s，因而是线偏振。这与偏振片的方向筛选有相似结果，但这里靠的是界面的反射差异。", "We can already count s/p powers separately. For unpolarized input at Rp=0, reflected light contains no p and only s, perpendicular to the incidence plane: linear polarization. Directional selection resembles a polarizer's outcome, but arises from differential interface reflection."], read: ["这个特殊角正是 θB，不是全反射角。若输入原本只有 p，则此时根本没有反射光，不能给零光束指定偏振方向。下面回到两条已有规律，解释怎样找到这个角。", "That angle is θB, not a total-reflection angle. With purely p input, there is no reflected beam here, so no reflected polarization direction to assign. Next combine two earlier rules to locate θB."] },
      { title: ["用 p 零反射条件接上折射定律，找到角度", "Combine zero p reflection with refraction to find the angle"], before: ["rₚ 的分子为零时有 n₂cosθB=n₁cosθ₂；同时方向还须满足斯涅耳定律。对不同折射率的正常界面，两式一起给 θB+θ₂=90°。这解释了为何图中的反射、折射光线此时互相垂直。", "Zero numerator of rₚ gives n₂cosθB=n₁cosθ₂, while directions still obey Snell's law. For a nondegenerate unequal-index interface, together they give θB+θ₂=90°. This explains perpendicular reflected and refracted rays in the figure."], read: ["把 θ₂=90°−θB 放回折射定律，sinθ₂ 变 cosθB，约去后就是 tanθB=n₂/n₁。空气到 1.5 玻璃得 56.31°。1.4.2 的偶极轴向辐射零点提供直观联系，但定量计算仍依靠这里的边界条件。", "Substitute θ₂=90°−θB into Snell's law: sinθ₂ becomes cosθB, giving tanθB=n₂/n₁. Air to index 1.5 gives 56.31°. The dipole axial null in §1.4.2 offers intuition, while boundary conditions supply the quantitative result."] },
      { title: ["再算能量：100% 偏振，不等于 100% 反射", "Now count energy: fully polarized does not mean fully reflected"], before: ["在刚才的角度，空气到玻璃给 Rs≈0.14793、Rp=0。自然光把一半能量送到 s 通道，其中约 14.793% 反射，所以总反射约 7.40%。若要量化返回光偏向哪条轴，定义偏振度 Dᵣ 为两通道反射率之差的绝对值除以两者之和；两者都为零时没有反射光，不能定义它。这里只有 s 返回，所以方向纯度是 100%。", "At that angle, air to glass gives Rs≈0.14793 and Rp=0. Unpolarized input sends half its power into s, of which about 14.793% reflects: roughly 7.40% total. Define reflected polarization degree Dᵣ as the absolute difference of the two channel reflectances divided by their sum. If both vanish, there is no reflected beam and Dᵣ is undefined. Only s returns here, giving 100% directional purity."], read: ["Dᵣ 测方向偏好而非返回功率。若输入是线偏振 α，先用 sin²α、cos²α 分配通道，不能再套自然光各一半。这里的透射仍有两通道，因此并非同时全偏振。", "Dᵣ measures directional preference rather than total returned power. Linear input at α uses sin²α and cos²α weights, not the unpolarized half-and-half rule. Transmitted light still has both channels and is not fully polarized here."] },
      { title: ["若两通道都还在，反射也能转动偏振方向", "When both channels remain, reflection can rotate polarization"], before: ["不在布儒斯特角时，线偏振也可拆成 s、p 两分量。界面给它们乘不同 r，重新合成的箭头通常不再沿原方向。在本节实系数条件下，两分量仍只差 0 或 π 的相位，所以合成仍沿一条直线振动。", "Away from Brewster, resolve a linearly polarized field into s and p. Multiplication by different r values generally changes the recombined direction. Under the real-coefficient conditions here, relative phases remain 0 or π, so the resulting oscillation is still linear."], read: ["例如 θ₁=50°、α=45° 时，反射基底中的方向角约 −80.29°。必须保留系数正负并说明使用哪个基底；只比较两条正的幅度长度会丢方向信息。全反射的复相移可能带来椭圆偏振，但那属于下一批，不混进当前实系数结论。", "For θ₁=50° and α=45°, the reflected-basis angle is about −80.29°. Retain coefficient signs and specify the basis; comparing only positive lengths loses direction. Complex phases in total reflection can produce elliptical polarization, but that is outside the present real-coefficient result."] }
    ],
    check: { question: ["反射光只占 7.40% 却完全偏振，这矛盾吗？", "Can reflection be only 7.40% of the input yet be fully polarized?"], answer: ["不矛盾。7.40% 比较返回与入射的能量；完全偏振只说返回这部分光的振动方向有固定轴，不说它有多少。", "Yes. 7.40% compares reflected to input energy. Fully polarized describes the fixed oscillation axis of the returning portion, not how much energy it carries."] },
    next: ["本批到这里形成闭环：源与波形 → 幅度和能量 → 界面接续 → 方向 → 场系数 → 功率 → 偏振。教材下一节 1.7 将讨论全反射相移，尚未在本课程展开。", "This batch closes the chain: sources and waves → amplitude and energy → interface matching → directions → field coefficients → power → polarization. The book's next §1.7 develops total-reflection phase; it is not yet included here."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.6.5"] = {
    ask: ["自然光在布儒斯特角反射光完全 s 偏振，是否意味着全部入射能量反回？", "At Brewster incidence, unpolarized light reflects as pure s. Does all incident power return?"],
    choices: [["不；方向纯度与返回比例不同", "No; polarization purity differs from returned power"], ["是；完全偏振就是 100% 反射", "Yes; full polarization means 100% reflection"], ["s 与 p 都必须消失", "Both s and p must vanish"]], answer: 0,
    try: ["在 θB≈56.31° 附近读 Rp、Rs、Dᵣ 与总 R，再偏离这个角度比较。", "Near θB≈56.31°, compare Rp, Rs, Dᵣ and total R, then move away."],
    why: ["此处 Rp=0 而 Rs>0；反回的部分只有 s，所以偏振度可为 1，但总返回功率仅约 7.40%。纯 p 入射时零反射光没有偏振方向。", "Here Rp=0 while Rs>0. The returned portion is pure s, yet total reflected power is only about 7.40%. For pure-p incidence, a zero reflected beam has no polarization direction."]
  };
  const deepLab = {
    controls: [["incidence", 40], ["incidence", 56.31]],
    compare: ["比较偏离和接近布儒斯特角的 Rp、Rs、反射偏振度与总反射功率，别混为一谈。", "Compare Rp, Rs, reflected polarization degree and total reflected power away from and near Brewster incidence."],
    relation: ["自然光等强入射 s/p，且 Rs+Rp>0 时，Dᵣ 可由两反射率之差与和求得。布儒斯特角 Rp=0、Rs>0；纯度高不代表所有能量返回。", "For equally weighted incident s/p and Rs+Rp>0, Dᵣ uses the difference divided by the sum of reflectances. At Brewster incidence Rp=0, Rs>0; purity does not imply all power returns."],
    formula: "D_r=\\frac{R_s-R_p}{R_s+R_p}",
    challenge: [["纯 p 光在其布儒斯特角恰无反射光，这束零强度光有偏振方向吗？", "Pure p incidence gives no reflected beam at its Brewster angle. Does that zero-intensity beam have a polarization direction?"], [["没有可定义的反射偏振方向", "No reflected polarization direction is defined"], ["有，必定为 s", "Yes, necessarily s"], ["有，必定为 p", "Yes, necessarily p"]], 0],
  };
  deepLab.mistakes = [null, ["自然光反射中的非零 s 分量与纯 p 入射的零反射束是两种情境；零束没有方向。", "A nonzero s component reflected from unpolarized light is not a zero beam from pure p incidence."], ["入射是 p 不代表反射零束有可定义的 p 方向。", "Pure-p incidence does not give a definable polarization direction to a zero reflected beam."]];
  const [focus, limitQuestion, limitAnswer] = [["比较 Rp 零点和总 R 的非零值：返回光的纯度不等于返回能量比例。", "Compare the Rp zero with nonzero total R: purity of the return is not returned power fraction."], ["布儒斯特角处自然光反射成纯 s，就表示全部入射功率都被反射吗？", "Does pure-s reflected light at Brewster incidence mean all incident power returned?"], false];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.6.5"] = deepLab;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
    title: pair("少量的反射光，也可以完全 s 偏振", "A weak reflection can still be purely s polarized"),
    note: pair("自然光入射，固定 n₁=1、n₂=1.5。右侧比较反射通道能量，非相干分量不画成一条合成相量；θB≈56.31°。", "Unpolarized input; fixed n₁=1,n₂=1.5. Reflected channel powers are compared, not combined into a coherent phasor. θB≈56.31°."),
    settings: [slider("incidence", "入射角（θB≈56.31°）", "Incidence angle (θB≈56.31°)", 0, 80, .01, 56.31, "°")],
    draw(a) {
      const d = setup(a), { ctx, w, h, values, tr, text, line, circle, bar, red, blue, green, muted } = d;
      const f = rays(d, 1, 1.5, values.incidence, w * .28, h * .46, Math.min(w * .22, h * .26));
      const D = (f.Rs + f.Rp) > 1e-15 ? Math.abs(f.Rs - f.Rp) / (f.Rs + f.Rp) : null;
      bar("Rs", f.Rs, w * .61, h * .23, w * .32, blue);
      bar("Rp", f.Rp, w * .61, h * .48, w * .32, red);
      text(`Dr = ${D === null ? "—" : D.toFixed(4)}`, w * .77, h * .77, green, 17, "center");
      text(`R = ${((f.Rs + f.Rp) * 50).toFixed(3)}%`, w / 2, 26, blue, 17, "center");
      text(tr("全偏振 ≠ 全部能量反射", "Fully polarized ≠ fully reflected"), w / 2, h - 18, muted, w < 480 ? 11 : 14, "center");
    },
  };
  figure.background = ["#102b34", "#163d43"];
  figure.animated = false;
  window.OpticsExtraVisuals.brewster = figure;
})();

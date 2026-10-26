/* Chapter 1, section 1.5: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.5",
    "title": "电磁场的边值关系",
    "pages": "19–21",
    "pdf": 29,
    "visual": "boundary",
    "overview": "场穿过分界面时，不是所有分量都连续。用跨界小柱和小回路，把麦克斯韦积分方程转成法向 B、D 与切向 E、H 的约束。",
    "bridge": {
      "previous": "前文在均匀介质内讨论波，尚未跨越材料突变面。",
      "current": "说明哪些场分量在无自由面电荷、无自由面电流时连续。",
      "next": "1.6 将两侧总场代入这些条件，求反射与折射。"
    },
    "goals": [
      "区分切向与法向",
      "从积分方程解释连续条件",
      "避免误断全部 E 或 B 连续"
    ],
    "symbols": [
      [
        "n̂",
        "本课从介质 1 指向 2 的界面法向",
        "1"
      ],
      [
        "ε₁, ε₂",
        "两侧介电常数",
        "F/m",
        "算例：ε₂=4ε₁"
      ],
      [
        "σf",
        "自由面电荷密度",
        "C/m²",
        "主模型：0"
      ],
      [
        "Kf",
        "自由面电流密度",
        "A/m",
        "主模型：0"
      ],
      [
        "E₁ₙ, E₂ₙ",
        "电场法向分量",
        "V/m",
        "算例：100 与 25"
      ]
    ],
    "blocks": [
      {
        "label": "边界速查",
        "title": "连续的是指定分量，不是整个向量",
        "eq": [
          {
            "text": "\\hat{\\mathbf n}\\cdot(\\mathbf B_2-\\mathbf B_1)=0,\\qquad\\hat{\\mathbf n}\\cdot(\\mathbf D_2-\\mathbf D_1)=\\sigma_f",
            "tex": true
          },
          {
            "text": "\\hat{\\mathbf n}\\times(\\mathbf E_2-\\mathbf E_1)=0,\\qquad\\hat{\\mathbf n}\\times(\\mathbf H_2-\\mathbf H_1)=\\mathbf K_f",
            "tex": true
          }
        ],
        "text": [
          "当 σf=0、Kf=0 时，Bₙ、Dₙ、Eₜ、Hₜ 连续。教材取法向从介质 2 指向 1，本课写带源式时统一取相反方向，并同时交换场差，物理关系不变。",
          "无“自由”面电荷不等于没有束缚面电荷。极化界面通常使 E 的法向分量发生改变，而 D 已包含这种材料响应。"
        ]
      },
      {
        "label": "小柱推导",
        "title": "散度方程约束法向通量",
        "eq": [
          {
            "text": "\\oint\\mathbf B\\cdot d\\mathbf A=0,\\qquad\\oint\\mathbf D\\cdot d\\mathbf A=Q_f",
            "tex": true
          }
        ],
        "steps": [
          [
            "方程与几何",
            "由 1.1 的高斯定律，取跨越界面的薄小柱，顶面在介质 2、底面在介质 1，面积 ΔA；两面的外法向相反。"
          ],
          [
            "高度趋零",
            "在场有界时，侧面积随柱高趋零，侧面通量也趋零。B 的顶底通量剩 (B₂ₙ−B₁ₙ)ΔA=0，故 B₁ₙ=B₂ₙ。"
          ],
          [
            "带自由电荷",
            "D 的通量等于 σfΔA，故 D₂ₙ−D₁ₙ=σf。没有自由面电荷时 D 法向连续；不能把 D 换成 E 后照抄。"
          ]
        ]
      },
      {
        "label": "小回路推导",
        "title": "旋度方程约束切向环流",
        "eq": [
          {
            "text": "\\oint\\mathbf E\\cdot d\\mathbf l=-\\frac{d}{dt}\\int\\mathbf B\\cdot d\\mathbf A",
            "tex": true
          },
          {
            "text": "\\oint\\mathbf H\\cdot d\\mathbf l=I_f+\\frac{d}{dt}\\int\\mathbf D\\cdot d\\mathbf A",
            "tex": true
          }
        ],
        "steps": [
          [
            "来源与条件",
            "使用法拉第定律与安培–麦克斯韦定律，取两条长边平行界面的矩形回路。场及时间导数有界，不包含奇异磁面源。"
          ],
          [
            "压扁矩形",
            "让垂直界面的短边趋零，穿过的面积也趋零，因此磁通变化与位移电流面积积分趋零。长边留下 E 切向差，故 E₁ₜ=E₂ₜ。"
          ],
          [
            "检查自由面电流",
            "若自由面电流存在，H 的切向跳变由 Kf 决定；本批绝缘无源界面取 Kf=0，得到 H₁ₜ=H₂ₜ。"
          ]
        ]
      },
      {
        "label": "带单位算例",
        "title": "E 法向不连续是正常结果",
        "eq": [
          {
            "text": "\\varepsilon_1E_{1n}=\\varepsilon_2E_{2n},\\qquad E_{2n}=\\frac{\\varepsilon_1}{\\varepsilon_2}E_{1n}",
            "tex": true
          }
        ],
        "text": [
          "在无自由面电荷的线性各向同性界面，若 ε₂=4ε₁、E₁ₙ=100 V/m，得到 E₂ₙ=25 V/m。若另给 E₁ₜ=20 V/m，则 E₂ₜ=20 V/m。法向变了不与切向连续矛盾。"
        ]
      }
    ],
    "questions": [
      {
        "stem": "σf=Kf=0 时，哪组分量连续？",
        "choices": [
          "$E_n,H_n,D_t,B_t$",
          "$B_n,D_n,E_t,H_t$",
          "全部 E、B、D、H"
        ],
        "answer": 1,
        "explain": "高斯定律约束 B 与 D 的法向通量，回路定律约束 E 与 H 的切向环流。无自由面源时恰为 Bₙ、Dₙ、Eₜ、Hₜ 连续，而不是每个向量的所有分量。",
        "whyOther": "第一项把法向与切向对应颠倒；第三项忽略两侧 ε、μ 可不同，不能从四个标量约束推出整个向量都连续。",
        "id": "1.5:q1"
      },
      {
        "stem": "ε₂=4ε₁、σf=0、E₁ₙ=100 V/m，E₂ₙ 为多少？",
        "choices": [
          "400 V/m",
          "100 V/m",
          "25 V/m"
        ],
        "answer": 2,
        "explain": "D₁ₙ=D₂ₙ，且 D=εE，所以 ε₁×100=4ε₁E₂ₙ，解得 25 V/m。连续的是 D 法向，而非 E 法向。",
        "whyOther": "400 把 ε 比例倒置；100 错把 Eₙ 也视为连续。结果的单位依然是 V/m，不是 D 的 C/m²。",
        "id": "1.5:q2"
      },
      {
        "stem": "没有自由面电荷，能否推出没有束缚面电荷？",
        "choices": [
          "不能；两者是不同来源",
          "能，自由与束缚只是同义词",
          "能，因为 D 与 E 是同一物理量"
        ],
        "answer": 0,
        "explain": "材料极化可产生束缚电荷，已经通过 D 与 E 的本构关系体现。σf=0 给 D 法向连续，E 法向仍可随介电常数变化而改变。",
        "whyOther": "“自由”与“束缚”并非同义词；D 的单位为 C/m²，E 为 V/m，也不应把两场混为一谈。",
        "id": "1.5:q3"
      },
      {
        "stem": "反射问题中介质 1 一侧，应将什么场代入边界关系？",
        "choices": [
          "只有入射场",
          "入射场与反射场的总和",
          "只有反射场"
        ],
        "answer": 1,
        "explain": "麦克斯韦边界条件作用于界面两侧实际存在的总场。因此介质 1 侧为 Eᵢ+Eᵣ、Hᵢ+Hᵣ，介质 2 侧为透射场；相加时必须保留矢量方向与相位。",
        "whyOther": "只代入入射或反射场都漏掉实际场的一部分，通常无法满足两条切向条件，更不能正确推出菲涅耳系数。",
        "id": "1.5:q4"
      }
    ]
  };
  const translation = {
    "code": "1.5",
    "title": "Electromagnetic boundary relations",
    "pages": "19–21",
    "pdf": 29,
    "visual": "boundary",
    "overview": "Not every field component is continuous across an interface. A pillbox and a shrinking loop convert Maxwell integral equations into constraints on normal B,D and tangential E,H.",
    "bridge": {
      "previous": "Earlier sections treated fields inside a homogeneous medium, not across material jumps.",
      "current": "Identify continuous components when free surface charge and current vanish.",
      "next": "§1.6 applies these conditions to total fields to find reflection and refraction."
    },
    "goals": [
      "Separate tangential and normal components",
      "Explain continuity from integral laws",
      "Avoid assuming all of E or B is continuous"
    ],
    "symbols": [
      [
        "n̂",
        "interface normal pointing from medium 1 to 2 here",
        "1"
      ],
      [
        "ε₁, ε₂",
        "permittivities on either side",
        "F/m",
        "Example: ε₂=4ε₁"
      ],
      [
        "σf",
        "free surface-charge density",
        "C/m²",
        "Main model: 0"
      ],
      [
        "Kf",
        "free surface-current density",
        "A/m",
        "Main model: 0"
      ],
      [
        "E₁ₙ, E₂ₙ",
        "normal electric components",
        "V/m",
        "Example: 100 and 25"
      ]
    ],
    "blocks": [
      {
        "label": "Boundary reference",
        "title": "Specified components are continuous, not entire vectors",
        "eq": [
          {
            "text": "\\hat{\\mathbf n}\\cdot(\\mathbf B_2-\\mathbf B_1)=0,\\qquad\\hat{\\mathbf n}\\cdot(\\mathbf D_2-\\mathbf D_1)=\\sigma_f",
            "tex": true
          },
          {
            "text": "\\hat{\\mathbf n}\\times(\\mathbf E_2-\\mathbf E_1)=0,\\qquad\\hat{\\mathbf n}\\times(\\mathbf H_2-\\mathbf H_1)=\\mathbf K_f",
            "tex": true
          }
        ],
        "text": [
          "For σf=0 and Kf=0, Bₙ,Dₙ,Eₜ,Hₜ are continuous. The book takes its normal from medium 2 to 1. In the source-inclusive forms here the normal and field difference are both reversed, leaving the physical relation unchanged.",
          "No free surface charge does not mean no bound charge. Polarization commonly changes the normal component of E, while D accounts for the material response."
        ]
      },
      {
        "label": "Pillbox derivation",
        "title": "Divergence laws constrain normal flux",
        "eq": [
          {
            "text": "\\oint\\mathbf B\\cdot d\\mathbf A=0,\\qquad\\oint\\mathbf D\\cdot d\\mathbf A=Q_f",
            "tex": true
          }
        ],
        "steps": [
          [
            "Laws and geometry",
            "Use the Gauss laws from §1.1 with a thin pillbox crossing the interface, top in medium 2 and bottom in medium 1, each area ΔA, with opposite outward normals."
          ],
          [
            "Shrink the height",
            "For bounded fields the side flux vanishes with pillbox height. The B flux leaves (B₂ₙ−B₁ₙ)ΔA=0, hence B₁ₙ=B₂ₙ."
          ],
          [
            "Include free charge",
            "D flux equals σfΔA, so D₂ₙ−D₁ₙ=σf. Without free surface charge normal D is continuous, but replacing D by E is invalid."
          ]
        ]
      },
      {
        "label": "Loop derivation",
        "title": "Curl laws constrain tangential circulation",
        "eq": [
          {
            "text": "\\oint\\mathbf E\\cdot d\\mathbf l=-\\frac{d}{dt}\\int\\mathbf B\\cdot d\\mathbf A",
            "tex": true
          },
          {
            "text": "\\oint\\mathbf H\\cdot d\\mathbf l=I_f+\\frac{d}{dt}\\int\\mathbf D\\cdot d\\mathbf A",
            "tex": true
          }
        ],
        "steps": [
          [
            "Source and conditions",
            "Use Faraday and Ampère–Maxwell laws on a rectangular loop with long sides parallel to the interface. Fields and time derivatives are bounded, with no singular magnetic sheet source."
          ],
          [
            "Flatten the loop",
            "Shrink the short sides normal to the interface. Enclosed area vanishes, removing the magnetic-flux and displacement-current area terms. The long sides leave the tangential E difference, so E₁ₜ=E₂ₜ."
          ],
          [
            "Check surface current",
            "If free surface current exists, Kf determines the tangential H jump. This batch takes Kf=0 for an insulating source-free interface, giving H₁ₜ=H₂ₜ."
          ]
        ]
      },
      {
        "label": "Worked example",
        "title": "A normal E jump is expected",
        "eq": [
          {
            "text": "\\varepsilon_1E_{1n}=\\varepsilon_2E_{2n},\\qquad E_{2n}=\\frac{\\varepsilon_1}{\\varepsilon_2}E_{1n}",
            "tex": true
          }
        ],
        "text": [
          "At a linear isotropic interface without free surface charge, ε₂=4ε₁ and E₁ₙ=100 V/m give E₂ₙ=25 V/m. Separately specifying E₁ₜ=20 V/m gives E₂ₜ=20 V/m. A changed normal component does not contradict tangential continuity."
        ]
      }
    ],
    "questions": [
      {
        "stem": "Which components are continuous when σf=Kf=0?",
        "choices": [
          "$E_n,H_n,D_t,B_t$",
          "$B_n,D_n,E_t,H_t$",
          "All of E, B, D, H"
        ],
        "answer": 1,
        "explain": "Gauss laws constrain normal B and D fluxes; loop laws constrain tangential E and H. With free sheet sources absent, these four specified components are continuous, not every component of every vector.",
        "whyOther": "The first swaps normal and tangential roles. The third ignores different material parameters and incorrectly promotes component constraints to full-vector continuity.",
        "id": "1.5:q1"
      },
      {
        "stem": "For ε₂=4ε₁, σf=0 and E₁ₙ=100 V/m, what is E₂ₙ?",
        "choices": [
          "400 V/m",
          "100 V/m",
          "25 V/m"
        ],
        "answer": 2,
        "explain": "D₁ₙ=D₂ₙ and D=εE give ε₁×100=4ε₁E₂ₙ, so E₂ₙ=25 V/m. Normal D, not normal E, is continuous.",
        "whyOther": "400 reverses the permittivity ratio; 100 incorrectly assumes Eₙ continuity. The answer retains V/m units, not the C/m² units of D.",
        "id": "1.5:q2"
      },
      {
        "stem": "Does absence of free surface charge imply absence of bound surface charge?",
        "choices": [
          "No; they have different origins",
          "Yes; free and bound are synonyms",
          "Yes; D and E are the same quantity"
        ],
        "answer": 0,
        "explain": "Polarization can produce bound charge, accounted for in the constitutive relation between D and E. σf=0 yields normal D continuity while normal E can change with permittivity.",
        "whyOther": "Free and bound are not synonyms. D is measured in C/m², E in V/m; the fields are not interchangeable.",
        "id": "1.5:q3"
      },
      {
        "stem": "What field on the medium-1 side enters the boundary relations in a reflection problem?",
        "choices": [
          "Incident field only",
          "Sum of incident and reflected fields",
          "Reflected field only"
        ],
        "answer": 1,
        "explain": "Maxwell boundary conditions constrain the actual total fields on each side. Medium 1 has Eᵢ+Eᵣ and Hᵢ+Hᵣ, while medium 2 has the transmitted field. Vector directions and phases must be retained.",
        "whyOther": "Either single field omits part of the physical field, generally failing the two tangential conditions and giving incorrect Fresnel coefficients.",
        "id": "1.5:q4"
      }
    ]
  };
  const guide = {
    question: ["光遇到玻璃表面，两边的电场能随意不一样吗？", "At a glass surface, can the fields on either side be unrelated?"],
    setup: ["前面把材料当成整片均匀区域。现在在两种材料间放一道界面，1.1 的电磁规则仍须成立。我们先把箭头拆成“沿表面”和“穿表面”两部分，再看哪些必须接得上；这个规则会直接用于推导反射与透射。", "We previously used a uniform material region. At an interface, the rules from §1.1 must still hold. Split each field into a part along the surface and a part through it, then identify which components must match. Reflection and transmission will follow from those rules."],
    terms: [
      { name: ["切向 / 法向", "Tangential / normal"], meaning: ["切向沿界面，法向垂直界面；本课法线从介质 1 指向介质 2。", "Tangential is along the interface; normal is perpendicular. Our normal points from medium 1 to medium 2."] },
      { name: ["连续", "Continuous"], meaning: ["从两侧无限靠近同一个界面点，指定分量趋向同一个值；不是所有向量都完全相等。", "Approaching the same interface point from each side gives the same specified component; not necessarily identical full vectors."] },
      { name: ["自由面电荷 / 面电流", "Free surface charge / current"], meaning: ["集中在界面上的自由电荷或沿面自由电流，会改变部分接续规则；不能与材料的束缚响应混淆。", "Free charge or current confined to the interface modifies some matching rules; do not confuse it with bound material response."] }
    ],
    observe: ["在图中区分穿过界面的小柱与沿界面压扁的小回路。改变介电常数比，观察法向 E 会改变，而无自由面电荷时法向 D 仍匹配。", "Distinguish the pillbox crossing the interface from the flattened loop. Change the permittivity ratio: normal E can change while normal D matches when there is no free surface charge."],
    blocks: [
      { title: ["先选分量：接得上的是哪些，不是整支箭头", "Choose components: what matches is not the whole arrow"], before: ["电场既能斜穿界面，也能沿界面。把斜箭头投影成法向与切向，才能准确说“连续”。没有自由面电荷、面电流时，规则是：B、D 的法向接得上，E、H 的切向接得上。以下两步分别说明这两组规则从哪里来。", "An oblique field has both through-surface and along-surface components. Resolve them before claiming continuity. With no free surface charge/current, normal B and D match, while tangential E and H match. The next two steps explain these two groups separately."], read: ["先用语言认清对象，完整带源向量式再按需展开。尤其 D=εE：两侧 ε 不同，即使 D 法向相等，也不要求 E 法向相等。最后的数字例子会专门检验这一点。", "Identify the components verbally before opening the full source-inclusive vector formulas. Since D=εE, unequal ε allows normal E to differ even when normal D matches. The final example tests exactly this point."], advanced: true },
      { title: ["用一个跨界小盒子，检查穿过表面的量", "Use a pillbox to compare through-surface flux"], before: ["1.1 的高斯规则统计穿过封闭面的净量。让一个小盒子横跨界面，再把厚度压到很薄：侧面面积趋零，主要只剩上下两个盖的通量。两盖的外法向相反，因此比较的是两侧法向分量之差。", "Gauss's rules count net flux through a closed surface. Place a thin box across the interface and shrink its thickness. Side area vanishes, leaving the two lids. Their outward normals oppose, so the result compares the normal components on the two sides."], read: ["没有自由面电荷时，D 从一侧穿进多少就从另一侧穿出多少；B 同样没有磁荷导致的净通量。这正是法向连续的由来。已经处理“穿过表面”，下一步再处理“沿表面走一圈”。", "Without free surface charge, the same normal D enters and leaves; B has no magnetic charge contribution either. This explains normal continuity. Having counted through-surface flux, we next count circulation along a loop."], advanced: true },
      { title: ["再用一个压扁回路，检查沿表面的场", "Use a flattened loop to compare along-surface fields"], before: ["现在不是算穿出量，而是沿一条矩形回路逐段累加场。让两条长边分别贴在两侧、短边趋零；在场及时间导数有界时，回路面积趋零，对应的磁通变化或位移电流面积项也趋零。剩下的就是两侧切向分量相比较。", "Now add fields around a rectangular loop rather than through a surface. Place its long edges on opposite sides and shrink the short edges. For bounded fields and time derivatives, flux-change and displacement-current area terms vanish with the area, leaving a comparison of tangential components."], read: ["得到 E 切向相等；H 的切向在无自由面电流时也相等。这不是凭空要求全部场一样，而是两种积分规则分别挑出了法向和切向。下一步把“D 连续但 E 不连续”算给你看。", "Tangential E matches; tangential H also matches when free surface current is absent. These are selected components derived from two integral rules, not a demand that all fields be identical. Next we calculate matching D with differing E."], advanced: true },
      { title: ["把 D=εE 代回去，接受法向 E 可以跳变", "Substitute D=εE and allow normal E to jump"], before: ["无自由面电荷给 D₁ₙ=D₂ₙ，再用每边各自的 D=εE，就成 ε₁E₁ₙ=ε₂E₂ₙ。下标 1、2 指介质，n 指法向。若第二边 ε 是四倍，为保持乘积相同，它的法向 E 就须变成四分之一。", "No free surface charge gives D₁ₙ=D₂ₙ. Using each medium's D=εE yields ε₁E₁ₙ=ε₂E₂ₙ. Subscripts 1 and 2 label media; n means normal. Four times the permittivity therefore needs one quarter of the normal E to keep the product fixed."], read: ["所以 100 V/m 变成 25 V/m；切向若给 20 V/m，则另一侧仍为 20 V/m。法向变化与切向不变并不矛盾。现在这些规则已能把界面两侧的波接起来，而不再只是一张边界公式表。", "Thus 100 V/m becomes 25 V/m; a tangential component of 20 V/m remains 20 V/m. Normal change and tangential equality are compatible. We can now use these rules to connect waves across an interface."] }
    ],
    check: { question: ["没有自由面电荷，是否就能断言两侧整个电场 E 相等？", "With no free surface charge, must the full E vector match across the interface?"], answer: ["不能。它直接约束的是 D 的法向；E 的切向也要匹配，但不同材料的 E 法向可按介电常数比改变。", "No. It constrains normal D directly. Tangential E also matches, but normal E can change with the permittivity ratio."] },
    next: ["带到 1.6.1：界面第一侧不是只有入射波，还包含反射波；总场要与第二侧透射波匹配。先问三束波能朝哪些方向走。", "Into §1.6.1: the first side contains incident plus reflected waves; their total field must match the transmitted field. First determine the allowed directions."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.5"] = {
    ask: ["无自由面电荷时，ε₂/ε₁ 增大，法向 E₂ 相对 E₁ 怎样？", "With no free surface charge, increase ε₂/ε₁. How does normal E₂ compare with E₁?"],
    choices: [["E₂ 不变", "E₂ stays fixed"], ["E₂ 更大", "E₂ grows"], ["E₂ 更小，但法向 D 连续", "E₂ shrinks while normal D remains continuous"]], answer: 2,
    try: ["调介电常数比，读 E₁ₙ、E₂ₙ；再看小柱和小回路各约束哪个分量。", "Change permittivity ratio and read E₁ₙ and E₂ₙ; compare the pillbox and loop constraints."],
    why: ["σf=0 给 ε₁E₁ₙ=ε₂E₂ₙ，而切向 E 才连续；不意味着整个 E 向量连续。", "For σf=0, ε₁E₁ₙ=ε₂E₂ₙ, while tangential E is continuous; the entire E vector need not be."]
  };
  const deepLab = {
    controls: [["epsilonRatio", 1], ["epsilonRatio", 4]],
    compare: ["比较 ε₂/ε₁=1 和 4 的 E₂ₙ；小柱约束 Dₙ，小回路约束 Eₜ。", "Compare E₂ₙ at ε₂/ε₁=1 and 4. The pillbox constrains Dₙ; the loop constrains Eₜ."],
    relation: ["无自由面电荷时 Dₙ 连续，而 ε₂E₂ₙ=ε₁E₁ₙ；切向 E 连续并不要求法向 E 连续。", "Without free surface charge Dₙ is continuous and ε₂E₂ₙ=ε₁E₁ₙ. Continuous tangential E does not require continuous normal E."],
    formula: "\\varepsilon_1 E_{1n}=\\varepsilon_2 E_{2n},\\qquad E_{1t}=E_{2t}",
    challenge: [["若 ε₂=4ε₁、无自由面电荷，E₂ₙ/E₁ₙ 为多少？", "If ε₂=4ε₁ and there is no free surface charge, what is E₂ₙ/E₁ₙ?"], [["4", "Four"], ["1/4", "One quarter"], ["1", "One"]], 1],
  };
  deepLab.mistakes = [["ε₂ 较大时，为保持 Dₙ=εEₙ 连续，E₂ₙ 应较小，不是四倍。", "With larger ε₂, E₂ₙ is smaller so Dₙ=εEₙ stays continuous."], null, ["没有自由面电荷保证 Dₙ 连续，而非 Eₙ 在不同 ε 下也相同。", "No free sheet charge gives continuous Dₙ, not equal Eₙ for different permittivities."]];
  const [focus, limitQuestion, limitAnswer] = [["先定位跨界小柱，再看环路；它们分别约束法向 D 和切向 E。", "Locate the pillbox and loop; they constrain normal D and tangential E respectively."], ["无自由面电荷是否强制整个 E 矢量跨界完全相同？", "Does zero free sheet charge force every component of E to match across the interface?"], false];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.5"] = deepLab;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
    title: pair("跨界小柱、小回路与场分量", "Pillbox, loop, and interface field components"),
    note: pair("无自由面源、μ₁=μ₂。图中 n̂ 从 1 指向 2，E₁ₙ 固定 100 V/m。箭头仅示意连续/跳变，不是完整的反射场解。", "No free sheet sources, μ₁=μ₂. n̂ points from 1 to 2 and E₁ₙ=100 V/m. Arrows illustrate continuity/jumps, not a full reflected-field solution."),
    settings: [slider("epsilonRatio", "介电常数比 ε₂/ε₁", "Permittivity ratio ε₂/ε₁", 1, 6, .5, 4)],
    draw(a) {
      const { ctx, w, h, values, tr, text, line, arrow, drawGrid, red, blue, green, muted } = setup(a);
      const y = h * .46, cx = w * .27, lx = w * .72, ratio = values.epsilonRatio;
      ctx.fillStyle = "#30475b"; ctx.fillRect(15, 60, w - 30, y - 60);
      ctx.fillStyle = "#3f354e"; ctx.fillRect(15, y, w - 30, h * .78 - y);
      drawGrid(15, 60, w - 30, h * .78 - 60);
      line(15, y, w - 15, y, muted, 2);
      text(tr("介质 1", "Medium 1"), 24, 83, muted, 12); text(tr("介质 2", "Medium 2"), 24, h * .77 - 10, muted, 12);
      ctx.setLineDash([4, 4]); ctx.strokeStyle = blue; ctx.strokeRect(cx - 30, y - 43, 60, 86); ctx.strokeStyle = green; ctx.strokeRect(lx - 46, y - 27, 92, 54); ctx.setLineDash([]);
      arrow(cx, y - 112, cx, y - 50, red); arrow(cx, y + 50, cx, y + 50 + 62 / ratio, red);
      arrow(lx - 40, y - 60, lx + 40, y - 60, green); arrow(lx - 40, y + 60, lx + 40, y + 60, green);
      text("B₁ₙ = B₂ₙ", cx, 29, blue, 14, "center"); text("E₁ₜ = E₂ₜ", lx, 29, green, 14, "center");
      arrow(w * .47, y - 15, w * .47, y + 35, muted); text("n̂", w * .47 + 9, y + 23, muted, 14);
      text(`E₂ₙ = 100/${ratio.toFixed(1)} = ${(100 / ratio).toFixed(1)} V/m`, w / 2, h - 36, red, w < 440 ? 12 : 16, "center");
      text(tr("连续 Dₙ ≠ 连续 Eₙ", "Continuous Dₙ ≠ continuous Eₙ"), w / 2, h - 12, muted, 12, "center");
    },
  };
  figure.background = ["#211f35", "#3a2d48"];
  figure.animated = false;
  window.OpticsExtraVisuals.boundary = figure;
})();

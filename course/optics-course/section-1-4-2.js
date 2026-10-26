/* Chapter 1, section 1.4.2: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.4.2",
    "title": "光辐射的经典模型",
    "pages": "16–17",
    "pdf": 26,
    "visual": "dipole",
    "overview": "把原子发光暂时等效为振荡电偶极子。重点不是机械照搬电子轨道，而是从 p(t) 读出辐射场的方向性、距离律和偏振。",
    "bridge": {
      "previous": "1.4.1 区分了实验光源类别。",
      "current": "在远场用振荡偶极矩连接源和电磁辐射。",
      "next": "1.4.3 从 E、B 计算能流与光强。"
    },
    "goals": [
      "确定电偶极矩方向和单位",
      "解释轴向不辐射与侧向最强",
      "区分近场与辐射远场"
    ],
    "symbols": [
      [
        "p₀",
        "电偶极矩振幅",
        "C·m"
      ],
      [
        "ψ",
        "观察方向与偶极轴夹角",
        "°",
        "算例：30° 与 90°"
      ],
      [
        "r",
        "源到观察点距离",
        "m",
        "辐射远场 kr≫1"
      ],
      [
        "v, ε",
        "介质相速度、介电常数",
        "m/s, F/m"
      ]
    ],
    "blocks": [
      {
        "label": "源模型",
        "title": "偶极矩不是电场",
        "eq": [
          {
            "text": "\\mathbf p=q\\boldsymbol\\ell,\\qquad\\mathbf p(t)=\\operatorname{Re}\\left[\\mathbf p_0e^{-i\\omega t}\\right]",
            "tex": true
          }
        ],
        "text": [
          "正负电荷的间距向量 ℓ 从负电荷指向正电荷，p 的单位是 C·m。经典模型把电荷中心的周期性相对位移概括为随时间变化的偶极矩。",
          "这是一种有效的经典辐射图像，不解释原子离散能级、跃迁概率或自发辐射的量子起源。无论是否画电子的机械轨道，本节远场结论都基于给定 p(t)。"
        ]
      },
      {
        "label": "远场结果与读法",
        "title": "sinψ 让“球面波”不再等强",
        "eq": [
          {
            "text": "E_0=\\frac{\\omega^2p_0\\sin\\psi}{4\\pi\\varepsilon v^2r},\\qquad B_0=\\frac{E_0}{v}",
            "tex": true
          },
          {
            "text": "I=\\frac{\\omega^4p_0^2}{32\\pi^2\\varepsilon v^3r^2}\\sin^2\\psi",
            "tex": true
          }
        ],
        "steps": [
          [
            "使用的结果",
            "教材式 (1.51)–(1.52) 给出简谐偶极子的远区辐射场，上式是振幅；时间因子为 cos(kr−ωt)。介质均匀、线性、各向同性且无吸收。"
          ],
          [
            "方向",
            "E 位于偶极轴与观察方向构成的平面内，且垂直径向传播方向；B 与二者正交，满足 B=(1/v)r̂×E。"
          ],
          [
            "角分布",
            "ψ=0° 或 180° 时 sinψ=0，辐射远场在轴上为零；ψ=90° 时最大。这说的是 1/r 辐射项，不是轴上全部近场都为零。"
          ],
          [
            "能流与平方",
            "用下一节的 I=(εv/2)E₀²，代入 E₀ 后得到 sin²ψ、ω⁴ 与 1/r² 的强度规律。此处 p₀ 固定，介质参数也固定；不能跨频段忽略真实材料色散。"
          ]
        ]
      },
      {
        "label": "比值算例",
        "title": "看方向之前，先分清场幅值与能量",
        "text": [
          "固定 r、ω、p₀ 与介质：ψ=30° 时 E₀ 是 ψ=90° 的 1/2，而 I 是 1/4。若改为相同方向下 r 加倍，E₀ 再减半、I 再减为 1/4。"
        ],
        "note": "辐射远区需同时远离有限尺寸源且 kr≫1；本节图形不画 1/r²、1/r³ 近场项，也不模拟单原子的量子发光历程。"
      }
    ],
    "questions": [
      {
        "stem": "固定距离，偶极辐射在 ψ=30° 的强度是 90° 的多少？",
        "choices": [
          "$\\frac{1}{2}$",
          "$\\frac{1}{4}$",
          "2"
        ],
        "answer": 1,
        "explain": "辐射振幅含 sinψ，强度含 sin²ψ；sin30°=1/2，平方后为 1/4。两方向的 ω、p₀、r 与介质都必须相同，才能直接作这个比。",
        "whyOther": "1/2 是场振幅比而不是强度比；2 不仅忽略平方，还把轴向附近较弱的方向误认为更强。",
        "id": "1.4.2:q1"
      },
      {
        "stem": "“偶极轴上辐射远场为零”是否说明那里全部电场为零？",
        "choices": [
          "否；近场项不在本节辐射模型内",
          "是，任何距离都没有电场",
          "是，因此轴上的静态偶极场也为零"
        ],
        "answer": 0,
        "explain": "sinψ=0 消去的是随 1/r 衰减的辐射项。完整偶极场还可能有 1/r² 与 1/r³ 项，尤其靠近源时重要，不能由一个远场角分布推断全部场。",
        "whyOther": "另外两项把辐射远区结论推广到任意距离和静态问题，跨越了模型边界。",
        "id": "1.4.2:q2"
      },
      {
        "stem": "保持 p₀ 与介质参数不变，ω 加倍时辐射强度如何变化？",
        "choices": [
          "2 倍",
          "4 倍",
          "16 倍"
        ],
        "answer": 2,
        "explain": "E₀ 与 ω² 成正比，故强度 I 与 ω⁴ 成正比。频率加倍得到 2⁴=16 倍。这个比较还固定了观察方向和距离，且只在该经典模型内进行。",
        "whyOther": "2 倍误当线性，4 倍只算了场幅值。真实原子改变跃迁频率时 p₀ 未必相同，不能把此比例当所有发光体的普遍经验律。",
        "id": "1.4.2:q3"
      }
    ]
  };
  const translation = {
    "code": "1.4.2",
    "title": "Classical model of optical radiation",
    "pages": "16–17",
    "pdf": 26,
    "visual": "dipole",
    "overview": "Temporarily model atomic radiation by an oscillating electric dipole. The aim is not a literal electron-orbit picture, but radiation directionality, distance scaling, and polarization from p(t).",
    "bridge": {
      "previous": "§1.4.1 distinguishes experimental source classes.",
      "current": "Relate an oscillating dipole moment to electromagnetic radiation in the far field.",
      "next": "§1.4.3 computes energy flow and intensity from E and B."
    },
    "goals": [
      "Identify dipole-moment direction and units",
      "Explain the axial null and side-on maximum",
      "Distinguish near fields from radiation far fields"
    ],
    "symbols": [
      [
        "p₀",
        "dipole-moment amplitude",
        "C·m"
      ],
      [
        "ψ",
        "angle between observation direction and dipole axis",
        "°",
        "Example: 30° and 90°"
      ],
      [
        "r",
        "source-to-observer distance",
        "m",
        "Radiation far field kr≫1"
      ],
      [
        "v, ε",
        "medium phase speed and permittivity",
        "m/s, F/m"
      ]
    ],
    "blocks": [
      {
        "label": "Source model",
        "title": "Dipole moment is not electric field",
        "eq": [
          {
            "text": "\\mathbf p=q\\boldsymbol\\ell,\\qquad\\mathbf p(t)=\\operatorname{Re}\\left[\\mathbf p_0e^{-i\\omega t}\\right]",
            "tex": true
          }
        ],
        "text": [
          "The separation vector ℓ points from negative to positive charge, giving p units of C·m. The classical model summarizes periodic relative charge-center motion by a time-varying dipole moment.",
          "This effective classical picture does not explain discrete energy levels, transition probabilities, or the quantum origin of spontaneous emission. The far-field results assume a specified p(t), not a literal mechanical electron orbit."
        ]
      },
      {
        "label": "Reading the far-field result",
        "title": "sinψ makes a spherical wave anisotropic",
        "eq": [
          {
            "text": "E_0=\\frac{\\omega^2p_0\\sin\\psi}{4\\pi\\varepsilon v^2r},\\qquad B_0=\\frac{E_0}{v}",
            "tex": true
          },
          {
            "text": "I=\\frac{\\omega^4p_0^2}{32\\pi^2\\varepsilon v^3r^2}\\sin^2\\psi",
            "tex": true
          }
        ],
        "steps": [
          [
            "Result used",
            "Book Eqs. (1.51)–(1.52) give the far-zone harmonic dipole field. Above are amplitudes; the real time factor is cos(kr−ωt). The medium is homogeneous, linear, isotropic, and nonabsorbing."
          ],
          [
            "Direction",
            "E lies in the plane containing the dipole axis and observation direction, perpendicular to radial propagation. B is perpendicular to both, with B=(1/v)r̂×E."
          ],
          [
            "Angular distribution",
            "At ψ=0° or 180°, sinψ=0 and the far radiation vanishes; ψ=90° maximizes it. This concerns the 1/r radiation term, not every near-field component on the axis."
          ],
          [
            "Energy flow and squaring",
            "Substitute E₀ into I=(εv/2)E₀² from the next section. This gives sin²ψ, ω⁴ and 1/r². Here p₀ and medium parameters are fixed; real dispersion cannot be ignored across arbitrary frequency ranges."
          ]
        ]
      },
      {
        "label": "Ratio example",
        "title": "Separate field amplitude from energy first",
        "text": [
          "At fixed r, ω, p₀ and medium, ψ=30° gives half the amplitude at 90°, but one-quarter of the intensity. Doubling r at a fixed direction again halves amplitude and quarters intensity."
        ],
        "note": "The radiation zone is far from the finite source and requires kr≫1. The figure omits 1/r² and 1/r³ near-field terms and does not simulate a quantum emission event."
      }
    ],
    "questions": [
      {
        "stem": "At fixed distance, what is dipole intensity at ψ=30° relative to 90°?",
        "choices": [
          "$\\frac{1}{2}$",
          "$\\frac{1}{4}$",
          "2"
        ],
        "answer": 1,
        "explain": "Amplitude contains sinψ, intensity sin²ψ. Since sin30°=1/2, the intensity ratio is 1/4. The comparison fixes ω, p₀, r, and the medium.",
        "whyOther": "1/2 is the amplitude ratio, not intensity. 2 also reverses which direction is weaker.",
        "id": "1.4.2:q1"
      },
      {
        "stem": "Does zero radiation far field on the dipole axis mean the entire electric field there is zero?",
        "choices": [
          "No; near-field terms are outside this radiation model",
          "Yes, at every distance",
          "Yes, including a static dipole field"
        ],
        "answer": 0,
        "explain": "sinψ=0 removes the 1/r radiation term. The full dipole field can also have 1/r² and 1/r³ terms, especially important near the source. A far-field pattern does not determine the entire field.",
        "whyOther": "The other options extend a radiation-zone result to arbitrary distances and static fields, violating the model assumptions.",
        "id": "1.4.2:q2"
      },
      {
        "stem": "With p₀ and medium parameters fixed, what happens to radiation intensity when ω doubles?",
        "choices": [
          "2 times",
          "4 times",
          "16 times"
        ],
        "answer": 2,
        "explain": "E₀ scales as ω², so I scales as ω⁴. Doubling gives 2⁴=16. Direction and distance are also fixed, and the comparison stays within this classical model.",
        "whyOther": "2 assumes linear scaling; 4 is the field-amplitude factor. Real transitions need not share p₀, so this is not a universal empirical law for all emitters.",
        "id": "1.4.2:q3"
      }
    ]
  };
  const guide = {
    question: ["一个很小的发光体，为什么不一定向各方向一样亮？", "Why need a tiny emitter not shine equally in all directions?"],
    setup: ["1.3.1 特意分开了“波面像球”和“各方向一样强”。现在用一对正负电荷的相对振动来解释这种区别：传播距离仍产生球面状相位，但振动轴会让不同观察方向得到不同强度。", "§1.3.1 separated spherical phase fronts from equal strength in every direction. Now model a pair of opposite charges oscillating relative to each other. Distance still determines spherical phase, but the oscillation axis gives different strengths in different viewing directions."],
    terms: [
      { name: ["电偶极子 / 偶极矩 p", "Electric dipole / dipole moment p"], meaning: ["一对分开的正负电荷是简单偶极子；p 用电荷量乘分离矢量记录它，不是观察处的电场。", "A separated positive/negative pair forms a simple dipole. p is charge times separation vector, not the observed electric field."] },
      { name: ["ψ", "ψ"], meaning: ["观察方向与振动轴的夹角；沿轴看是 0°，从侧面看是 90°。", "Angle between observation direction and oscillation axis: 0° along the axis, 90° from the side."] },
      { name: ["辐射远场", "Radiation far field"], meaning: ["离源足够远时主导向外输能的场；本节的轴向零点不代表源旁边全部场都为零。", "The outward energy-carrying field dominant sufficiently far away. Its axial null does not imply every near-source field vanishes."] }
    ],
    observe: ["把观察角从 90° 调到 30°，再调到 0°。看强度瓣在侧面最强、沿轴为零；图上的瓣是强弱方向图，不是光走出的弯曲轨迹。", "Change viewing angle from 90° to 30°, then 0°. Radiation is strongest sideways and zero along the axis. The lobes plot directional strength, not curved ray trajectories."],
    blocks: [
      { title: ["先定义是谁在振动，而不是把 p 当成电场", "Define the vibrating source before confusing p with a field"], before: ["要从传播回到发光，先给源一个可计算的描述。取正负电荷的分离矢量 ℓ 从负指向正，电荷量 q 乘它就是 p。若电荷中心周期性相对移动，p 就随时间振动；p₀ 表示它的振幅。", "To describe emission, first specify a calculable source. Let ℓ point from negative to positive charge; qℓ is p. Periodic relative displacement makes p oscillate in time, with amplitude p₀."], read: ["这只是给定经典源运动的模型，不是在声称真实原子就是小机械天线，也不解释量子能级。明确了振动轴，下一步才有意义去问不同方向会看到多强。", "This specifies a classical source motion; it does not make an actual atom a mechanical antenna or explain quantum energy levels. With an axis defined, directional strength becomes a meaningful question."] },
      { title: ["距离决定摊开，夹角决定往哪边辐射得强", "Distance controls spreading; angle controls radiation strength"], before: ["前面球面模型已给出场随 1/r、强度随 1/r² 的距离规律。偶极模型再增加角度因素：场幅度乘 sinψ，所以强度乘 sin²ψ。沿轴 sin0°=0，侧面 sin90°=1。完整系数还涉及源的振动频率 ω、偶极矩振幅 p₀ 和介质参数 ε、v；初读只需先理解距离与方向的两种作用。", "The spherical model supplied 1/r field and 1/r² intensity decay. A dipole adds an angular factor: field amplitude contains sinψ, so intensity contains sin²ψ. The full coefficient also involves source angular frequency ω, dipole amplitude p₀ and medium parameters ε and v; first distinguish distance from direction."], eqLead: [["进阶的第一式给出辐射远场的电场幅度 E₀，再用前节 B₀=E₀/v 得磁场幅度；只在所述理想介质、远离源时使用。", "The optional first line gives far-field electric amplitude E₀ and uses B₀=E₀/v from the earlier section. It applies to the stated ideal medium far from the source."], ["把场幅度平方，并用下一节详解的平均能流关系，才得到强度 I；因此 sinψ 变为 sin²ψ。", "Square the field amplitude and use the cycle-averaged energy-flux relation explained next section to obtain intensity I; sinψ becomes sin²ψ."]], read: ["初读先分开“距离因子”和“方向因子”，不必背完整系数。完整远场公式、场方向与能流换算放在下方；轴向零点仅针对辐射远场。", "First distinguish distance and angle without memorizing the full coefficient. The far-field expression and energy conversion are optional below; the axial null concerns radiation far from the source only."], advanced: true },
      { title: ["同一距离比两个方向，检查平方关系", "Compare two directions at one distance to test the square"], before: ["固定源、距离和频率，只改观察方向，这样不会把距离变弱混进角度效应。30° 的 sin 是 1/2，所以场幅度是侧面方向的一半；再平方才得到强度。", "Keep source, distance and frequency fixed while changing only viewing direction. This isolates angle from spreading. Since sin30°=1/2, amplitude is half the side-view value; square that to obtain intensity."], read: ["因此 30° 方向的强度是 90° 的 1/4。若同方向再把距离加倍，还要另乘距离引起的 1/4。两种原因可以分别计算，因为在当前模型中它们是独立因子。", "Intensity at 30° is one quarter of its value at 90°. Doubling distance at a fixed direction introduces another factor of one quarter. These causes can be calculated separately because they are separate factors in this model."] }
    ],
    check: { question: ["为什么“同心球面相位”不能保证“球面上处处一样亮”？", "Why do spherical phase fronts not guarantee equal brightness everywhere?"], answer: ["相位描述振动到哪一步，亮度取决于幅度平方。偶极子可有同一距离相位、不同方向幅度的 sinψ 因子。", "Phase describes oscillation stage; intensity depends on amplitude squared. A dipole can share distance-dependent phase while its amplitude varies with direction through sinψ."] },
    next: ["带到 1.4.3：我们反复用到“强度与振幅平方成正比”。接下来解释强度怎样从电磁场的能量流算出。", "Into §1.4.3: we repeatedly used intensity proportional to amplitude squared. Next we derive it from electromagnetic energy flow."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.4.2"] = {
    ask: ["辐射远场的偶极轴上 ψ=0°，光强与侧向 ψ=90° 相比怎样？", "On the dipole axis ψ=0° in the radiation far field, how does intensity compare with ψ=90°?"],
    choices: [["轴上最强", "Strongest on axis"], ["轴上辐射项为零，侧向最强", "Far-field radiation vanishes on axis, strongest sideways"], ["两处相同", "Equal at both directions"]], answer: 1,
    try: ["把方向调到 0° 与 90°，读两条分别归一化的幅度、强度条。", "Compare 0° and 90° with separately normalized amplitude and intensity bars."],
    why: ["远场强度 ∝sin²ψ；轴向零点不代表偶极子的所有近场项都消失。", "Far-field intensity is proportional to sin²ψ. The axial radiation null does not erase every near-field term."]
  };
  const deepLab = {
    controls: [["psi", 0], ["psi", 90]],
    compare: ["比较轴向 0° 和侧向 90° 的两根相对读数：场振幅与强度并非同一变化律。", "Compare axial 0° and side-on 90° readings: field amplitude and intensity follow different powers."],
    relation: ["辐射远场 E 振幅 ∝sinψ，强度 ∝sin²ψ；轴向辐射项为零不代表所有近场为零。", "Far-field radiative amplitude goes as sinψ and intensity as sin²ψ; an axial radiation null does not erase all near-field terms."],
    formula: "E_0(\\psi)\\propto\\sin\\psi,\\qquad I(\\psi)\\propto\\sin^2\\psi",
    challenge: [["在辐射远场 ψ=30° 时，相对于侧向的强度是多少？", "In the radiation far field at ψ=30°, what is intensity relative to side-on?"], [["1/2", "One half"], ["1/4", "One quarter"], ["零", "Zero"]], 1],
  };
  deepLab.mistakes = [["30° 的场振幅比例是 sin30°=1/2；强度要再平方。", "At 30° the field-amplitude ratio is sin30°=1/2; intensity squares it."], null, ["只有轴向 0° 的辐射远场零点；30° 仍有辐射项。", "The far-field radiation null is on axis at 0°, not at 30°."]];
  const [focus, limitQuestion, limitAnswer] = [["把两个方向的场振幅条与强度条配对，再看 sinψ 与 sin²ψ。", "Pair field-amplitude and intensity bars at two directions; compare sinψ with sin²ψ."], ["远场轴向辐射为零，是否意味着所有近场项也为零？", "Does an axial far-field radiation null erase all near-field terms?"], false];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.4.2"] = deepLab;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
    title: pair("偶极辐射的 sin²ψ 方向图", "The dipole sin²ψ radiation pattern"),
    note: pair("显示辐射远场在偶极轴截面内的归一化强度，不是电力线。固定 r、ω、p₀ 和介质，轴上只消失辐射项。", "Normalized far-field intensity in a plane containing the dipole axis, not electric field lines. r, ω, p₀ and medium are fixed; only the radiation term vanishes on axis."),
    settings: [slider("psi", "观察方向 ψ", "Observation angle ψ", 0, 180, 5, 60, "°")],
    draw(a) {
      const { w, h, values, tr, text, line, path, arrow, bar, red, blue, green, muted } = setup(a);
      const cx = w * .33, cy = h * .52, R = Math.min(w * .26, h * .35), angle = values.psi * Math.PI / 180;
      line(cx, cy - R - 22, cx, cy + R + 22, muted, 1.5); arrow(cx, cy + 25, cx, cy - 25, red);
      text("p", cx + 10, cy - 26, red, 15);
      const points = Array.from({ length: 361 }, (_, i) => {
        const psi = 2 * Math.PI * i / 360, rr = R * Math.sin(psi) ** 2;
        return [cx + rr * Math.sin(psi), cy - rr * Math.cos(psi)];
      });
      path(points, blue, 3); arrow(cx, cy, cx + R * Math.sin(angle), cy - R * Math.cos(angle), green);
      bar("E₀ / Emax = sinψ", Math.sin(angle), w * .66, h * .29, w * .29, red);
      bar("I / Imax = sin²ψ", Math.sin(angle) ** 2, w * .66, h * .62, w * .29, blue);
      text(tr("轴上为零 · 侧向最强", "Axial null · side-on maximum"), w / 2, h - 24, muted, 12, "center");
    },
  };
  figure.background = ["#162a25", "#293d30"];
  figure.animated = false;
  window.OpticsExtraVisuals.dipole = figure;
})();

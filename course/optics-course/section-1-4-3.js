/* Chapter 1, section 1.4.3: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.4.3",
    "title": "辐射能",
    "pages": "17–19",
    "pdf": 27,
    "visual": "energy",
    "overview": "场携带能量，探测器通常读到的是时间平均能流。通过能量密度、坡印廷矢量与周期平均，把电场振幅连接到 W/m²。",
    "bridge": {
      "previous": "1.4.2 已知辐射场的振幅与方向。",
      "current": "区分瞬时能量密度、瞬时能流和平均光强。",
      "next": "1.4.4 用平均量认识非理想单色的实际光。"
    },
    "goals": [
      "正确写出 S=E×H",
      "推出周期平均中的 1/2",
      "用功率与面积求场振幅"
    ],
    "symbols": [
      [
        "w",
        "电磁能量密度",
        "J/m³"
      ],
      [
        "S",
        "瞬时坡印廷矢量",
        "W/m²"
      ],
      [
        "I",
        "时间平均辐射能流密度",
        "W/m²",
        "算例：0.07958 W/m²"
      ],
      [
        "E₀",
        "电场峰值振幅，不是有效值",
        "V/m",
        "算例：7.74 V/m"
      ],
      [
        "Z",
        "波阻抗 √(μ/ε)",
        "Ω",
        "真空约 376.7 Ω"
      ]
    ],
    "blocks": [
      {
        "label": "从存储到流动",
        "title": "密度乘速度才是能流密度",
        "eq": [
          {
            "text": "w=\\frac12\\left(\\varepsilon E^2+\\frac{B^2}{\\mu}\\right),\\qquad \\mathbf S=\\mathbf E\\times\\mathbf H=\\frac1\\mu\\mathbf E\\times\\mathbf B",
            "tex": true
          }
        ],
        "text": [
          "w 描述单位体积内的场能量，S 描述单位时间穿过单位面积的能量并带方向。对本节向前传播的无耗散平面波，电能与磁能各占一半，S 的大小为 vw。",
          "能量密度的简单形式还假定材料线性且非色散。显著色散或吸收时不能原样使用这一能量密度公式。"
        ]
      },
      {
        "label": "平均推导",
        "title": "为什么峰值振幅平方前有 1/2？",
        "eq": [
          {
            "text": "I=\\langle S\\rangle=\\frac12\\varepsilon v E_0^2=\\frac{E_0^2}{2Z},\\qquad Z=\\sqrt{\\frac\\mu\\varepsilon}",
            "tex": true,
            "ref": "plane-intensity"
          }
        ],
        "steps": [
          [
            "已知模型与来源",
            "使用 1.2.6 的 B=E/v、v=1/√(εμ) 与上方 S=EB/μ；取实场 E=E₀cosφ，H=E/Z，同相。"
          ],
          [
            "先求瞬时值",
            "S=E²/Z=(E₀²/Z)cos²φ。不能把复场直接平方当瞬时能量，否则可能出现复数或错误负值。"
          ],
          [
            "周期积分",
            "用 $\\cos^2\\phi=(1+\\cos2\\phi)/2$，在 $T=2\\pi/\\omega$ 上平均。余弦项积分为零，留下 $\\langle\\cos^2\\phi\\rangle=1/2$。"
          ],
          [
            "峰值与有效值",
            "因此 I=E₀²/(2Z)。若输入的是有效值 Eᵣₘₛ=E₀/√2，则写 I=Eᵣₘₛ²/Z，不能再多除一个 2。"
          ]
        ]
      },
      {
        "label": "维度与相量",
        "title": "“I=A²”只是一种归一化记号",
        "eq": [
          {
            "text": "\\langle\\mathbf S\\rangle=\\frac12\\operatorname{Re}(\\mathbf E_0\\times\\mathbf H_0^*)",
            "tex": true
          }
        ],
        "text": [
          "原书式 (1.58b) 在只关心相对强度时把比例系数略去。若 A 仍以 V/m 为单位，A² 就不是以 W/m² 为单位的绝对光强，必须保留介质系数。",
          "对峰值复相量，一般使用上式的共轭叉乘平均。若只讨论单一传播的无耗散平面波，则化为 E₀²/(2Z)。不要把这个特例推广为任意叠加场都沿同一方向输运。"
        ]
      },
      {
        "label": "带单位算例",
        "title": "从 100 W 辐射功率到 7.74 V/m",
        "eq": [
          {
            "text": "I=\\frac{P}{4\\pi r^2}",
            "tex": true,
            "ref": "isotropic-intensity"
          },
          {
            "text": "E_0=\\sqrt{2ZI}",
            "tex": true
          }
        ],
        "text": [
          "假设各向均匀向外辐射的光学功率 P=100 W，r=10 m，无吸收：I=100/(4π×10²)≈0.07958 W/m²。取空气近似真空 Z≈376.7 Ω，E₀≈7.74 V/m。这里 100 W 明确是辐射功率，不是灯泡铭牌的耗电功率。"
        ]
      }
    ],
    "questions": [
      {
        "stem": "对于峰值 E₀ 的无耗散平面波，平均光强为？",
        "choices": [
          "$\\frac{E_0^2}{Z}$",
          "$\\frac{E_0^2}{2Z}$",
          "$2ZE_0^2$"
        ],
        "answer": 1,
        "explain": "瞬时 S=(E₀²/Z)cos²φ；周期平均 cos²φ 为 1/2，所以 I=E₀²/(2Z)。Z 的单位为 Ω，结果单位是 W/m²。",
        "whyOther": "第一项只有 E₀ 表示有效值时才对，但题目说的是峰值；第三项把阻抗放错位置，也违背量纲关系。",
        "id": "1.4.3:q1"
      },
      {
        "stem": "同一介质中电场峰值加倍，光强如何变？",
        "choices": [
          "2 倍",
          "不变",
          "4 倍"
        ],
        "answer": 2,
        "explain": "固定 Z 时 I=E₀²/(2Z)，所以 I 新/I 旧=(2E₀/E₀)²=4。这里比较平均能量流，不是瞬时场的符号。",
        "whyOther": "2 倍把二次关系误当线性；不变忽略振幅携带能量。若介质改变，必须同时考虑 Z，不能只比较振幅。",
        "id": "1.4.3:q2"
      },
      {
        "stem": "灯泡标称电功率 100 W，能否不作假设直接当 100 W 可见光辐射功率？",
        "choices": [
          "不能；还需辐射效率、谱段等信息",
          "能，能量守恒说明所有功率变成可见光",
          "能，只要 r 用米"
        ],
        "answer": 0,
        "explain": "电功率可能转为热、红外和其他损耗，可见光只占部分。上面的算例先明确假定 P 为光学辐射功率，才能用 P/(4πr²) 计算指定辐射的强度。",
        "whyOther": "能量守恒约束总能量，不等于所有输入都成为可见光；单位正确也不能替代缺少的效率与谱段信息。",
        "id": "1.4.3:q3"
      },
      {
        "stem": "使用峰值复相量求平均坡印廷矢量，应取哪式？",
        "choices": [
          "$\\operatorname{Re}(\\mathbf E_0\\times\\mathbf H_0)$",
          "$\\frac12\\operatorname{Re}(\\mathbf E_0\\times\\mathbf H_0^*)$",
          "$E_0^2$"
        ],
        "answer": 1,
        "explain": "共轭乘积保留两场的相对相位，取实部给物理平均功率流；峰值相量还要乘 1/2。对于同相平面波才进一步简化为熟悉的标量表达式。",
        "whyOther": "第一项缺少共轭与 1/2；第三项既没有方向，也缺少阻抗等系数，不能表示一般平均能流。",
        "id": "1.4.3:q4"
      }
    ]
  };
  const translation = {
    "code": "1.4.3",
    "title": "Radiant energy",
    "pages": "17–19",
    "pdf": 27,
    "visual": "energy",
    "overview": "Fields carry energy, and detectors usually register time-averaged energy flux. Connect field amplitude to W/m² through energy density, the Poynting vector, and cycle averaging.",
    "bridge": {
      "previous": "§1.4.2 provides radiation-field amplitudes and directions.",
      "current": "Distinguish instantaneous energy density, energy flux, and average intensity.",
      "next": "§1.4.4 uses averages to understand nonideal monochromatic light."
    },
    "goals": [
      "Write S=E×H correctly",
      "Derive the factor 1/2 from cycle averaging",
      "Calculate field amplitude from power and area"
    ],
    "symbols": [
      [
        "w",
        "electromagnetic energy density",
        "J/m³"
      ],
      [
        "S",
        "instantaneous Poynting vector",
        "W/m²"
      ],
      [
        "I",
        "time-averaged radiant flux density",
        "W/m²",
        "Example: 0.07958 W/m²"
      ],
      [
        "E₀",
        "peak electric amplitude, not RMS",
        "V/m",
        "Example: 7.74 V/m"
      ],
      [
        "Z",
        "wave impedance √(μ/ε)",
        "Ω",
        "Vacuum: about 376.7 Ω"
      ]
    ],
    "blocks": [
      {
        "label": "From stored energy to flow",
        "title": "Energy density times speed gives flux density",
        "eq": [
          {
            "text": "w=\\frac12\\left(\\varepsilon E^2+\\frac{B^2}{\\mu}\\right),\\qquad \\mathbf S=\\mathbf E\\times\\mathbf H=\\frac1\\mu\\mathbf E\\times\\mathbf B",
            "tex": true
          }
        ],
        "text": [
          "w is field energy per unit volume; S is directed energy per unit area per unit time. For this forward lossless plane wave, electric and magnetic energies are equal and the magnitude of S is vw.",
          "This simple energy-density expression also assumes a linear nondispersive medium. Significant dispersion or absorption requires a different treatment."
        ]
      },
      {
        "label": "Averaging derivation",
        "title": "Why does peak amplitude squared need a factor 1/2?",
        "eq": [
          {
            "text": "I=\\langle S\\rangle=\\frac12\\varepsilon v E_0^2=\\frac{E_0^2}{2Z},\\qquad Z=\\sqrt{\\frac\\mu\\varepsilon}",
            "tex": true,
            "ref": "plane-intensity"
          }
        ],
        "steps": [
          [
            "Model and source",
            "Use B=E/v and v=1/√(εμ) from §1.2.6, together with S=EB/μ above. The real fields are E=E₀cosφ and H=E/Z, in phase."
          ],
          [
            "Find the instantaneous value",
            "S=E²/Z=(E₀²/Z)cos²φ. Squaring a complex field directly does not give physical instantaneous energy and can produce complex or incorrect negative values."
          ],
          [
            "Integrate over a period",
            "Use $\\cos^2\\phi=(1+\\cos2\\phi)/2$ and average over $T=2\\pi/\\omega$. The oscillatory term integrates to zero, leaving $\\langle\\cos^2\\phi\\rangle=1/2$."
          ],
          [
            "Peak and RMS",
            "Thus I=E₀²/(2Z). With RMS value Eᵣₘₛ=E₀/√2, use I=Eᵣₘₛ²/Z without another division by 2."
          ]
        ]
      },
      {
        "label": "Dimensions and phasors",
        "title": "I=A² is a normalized shorthand",
        "eq": [
          {
            "text": "\\langle\\mathbf S\\rangle=\\frac12\\operatorname{Re}(\\mathbf E_0\\times\\mathbf H_0^*)",
            "tex": true
          }
        ],
        "text": [
          "Book Eq. (1.58b) drops the factor for relative-intensity calculations. If A still has units of V/m, A² alone is not an absolute intensity in W/m²; keep the medium factor.",
          "For peak complex phasors use the conjugated cross product above. A single lossless traveling plane wave reduces it to E₀²/(2Z). Arbitrary superposed fields need not transport energy in one common direction."
        ]
      },
      {
        "label": "Worked example",
        "title": "From 100 W radiant power to 7.74 V/m",
        "eq": [
          {
            "text": "I=\\frac{P}{4\\pi r^2}",
            "tex": true,
            "ref": "isotropic-intensity"
          },
          {
            "text": "E_0=\\sqrt{2ZI}",
            "tex": true
          }
        ],
        "text": [
          "Assume isotropic outward optical radiant power P=100 W, r=10 m, and no absorption. I=100/(4π×10²)≈0.07958 W/m². Approximating air by vacuum with Z≈376.7 Ω gives E₀≈7.74 V/m. The 100 W is radiant output, not a lamp electrical-input rating."
        ]
      }
    ],
    "questions": [
      {
        "stem": "For a lossless plane wave of peak electric amplitude E₀, what is average intensity?",
        "choices": [
          "$\\frac{E_0^2}{Z}$",
          "$\\frac{E_0^2}{2Z}$",
          "$2ZE_0^2$"
        ],
        "answer": 1,
        "explain": "Instantaneous S=(E₀²/Z)cos²φ and the cycle average of cos²φ is 1/2, giving I=E₀²/(2Z) in W/m² for Z in ohms.",
        "whyOther": "The first works for an RMS amplitude, not the specified peak value. The third puts impedance in the numerator and has the wrong dimensions.",
        "id": "1.4.3:q1"
      },
      {
        "stem": "If peak electric amplitude doubles in the same medium, how does intensity change?",
        "choices": [
          "2 times",
          "Unchanged",
          "4 times"
        ],
        "answer": 2,
        "explain": "With Z fixed, I=E₀²/(2Z), hence the intensity ratio is 2²=4. This compares average energy flow, not the sign of the instantaneous field.",
        "whyOther": "2 mistakes a quadratic law for a linear one. Unchanged ignores amplitude dependence. If the medium changes, impedance must be considered too.",
        "id": "1.4.3:q2"
      },
      {
        "stem": "Can a 100 W electrical lamp rating be used directly as 100 W of visible radiant power?",
        "choices": [
          "No; efficiency and spectral-band information are needed",
          "Yes; conservation makes all input visible light",
          "Yes, if r is in metres"
        ],
        "answer": 0,
        "explain": "Input can become heat, infrared, and other losses; visible output is only part. The example explicitly assumes optical radiant power before using P/(4πr²).",
        "whyOther": "Conservation concerns total energy, not conversion entirely to visible light. Correct units cannot supply missing efficiency or spectral information.",
        "id": "1.4.3:q3"
      },
      {
        "stem": "Which expression gives average Poynting vector using peak complex phasors?",
        "choices": [
          "$\\operatorname{Re}(\\mathbf E_0\\times\\mathbf H_0)$",
          "$\\frac12\\operatorname{Re}(\\mathbf E_0\\times\\mathbf H_0^*)$",
          "$E_0^2$"
        ],
        "answer": 1,
        "explain": "The conjugated product preserves relative phase, its real part gives physical mean power flow, and peak phasors require 1/2. A scalar plane-wave expression follows only in the in-phase special case.",
        "whyOther": "The first omits conjugation and the factor 1/2. The third has no direction and lacks impedance factors, so is not general mean energy flow.",
        "id": "1.4.3:q4"
      }
    ]
  };
  const guide = {
    question: ["电场每一瞬间都在变，光功率计到底在量什么？", "The electric field changes every instant. What does a power meter measure?"],
    setup: ["前面分别谈电场幅度和光强，但不能只因符号写在一起就把它们当同一东西。本节用“存了多少能量 → 能量怎样穿过面积 → 仪器平均读多少”的顺序，接起场与功率。", "Field amplitude and intensity have appeared side by side, but they are different quantities. Follow stored energy → energy crossing an area → averaged detector reading to connect fields to power."],
    terms: [
      { name: ["能量密度 w", "Energy density w"], meaning: ["每立方米含多少场能量，单位 J/m³，是“存量”。", "Field energy per cubic metre, in J/m³: a stored quantity."] },
      { name: ["能流密度 S / 光强 I", "Energy flux S / intensity I"], meaning: ["S 记录每秒穿过每平方米的能量和方向；I 是当前波沿传播方向能流的时间平均。", "S gives energy crossing unit area per second and its direction. I is its time average along propagation for the wave here."] },
      { name: ["E₀ / 波阻抗 Z", "E₀ / wave impedance Z"], meaning: ["E₀ 是峰值，不是仪器有效值；Z 连接电场和磁场幅度，也影响同样 E₀ 对应的能流。", "E₀ is peak amplitude, not RMS. Z relates electric and magnetic amplitudes and determines flux for a given E₀."] }
    ],
    observe: ["比较电场曲线、瞬时能流和平均线：电场有正负，向前单波的瞬时能流却不会随它一起变负。再看平均线并不在瞬时峰值上。", "Compare field, instantaneous flux and mean line. E changes sign, but a single forward wave's flux does not reverse with it. Its average also differs from its peak."],
    blocks: [
      { title: ["先把“装在空间里”与“穿过面积”分开", "Separate energy stored in space from energy crossing an area"], before: ["知道一个小体积内有能量，还不知道每秒通过门口多少。平面波以速度 v 前进，1 秒里会把长度 v 的一段能量送过截面；因此能量密度乘速度得到能流密度。电磁理论用 S=E×H 同时给出这个流量和方向。", "Stored energy in a small volume is not the rate passing through a doorway. In one second a plane wave advancing at v transports a length-v segment through a cross-section. Energy density times speed gives flux. Electromagnetism represents its size and direction by S=E×H."], read: ["w 的单位是 J/m³，S 的单位是 W/m²，二者不能互换。这里简单能量密度式还要求线性、无显著色散的材料；在这个模型中 E、B 各占一半能量，下一步把随时间变的流量平均。", "w is in J/m³; S in W/m². They are not interchangeable. The simple energy-density expression also assumes linear, nondispersive material. Electric and magnetic energies are equal here; next we average the time-dependent flow."] },
      { title: ["电场平方后再平均，才得到仪器的光强读数", "Square the field, then average to obtain intensity"], before: ["1.2.6 已把 E 与 B 关联起来，且 B=μH。把它们代入 S=E×H 后，对向前的单一平面波有 S=E²/Z；Z=√(μ/ε) 叫波阻抗，单位 Ω，表示同样的电场在该材料里对应多大能流。若 E=E₀cosφ，瞬时能流随 cos²φ 变化，一个完整周期的平均为 1/2。", "Section 1.2.6 relates E to B, with B=μH. Inserting both into S=E×H gives S=E²/Z for a single forward plane wave. Z=√(μ/ε) is wave impedance, in ohms; it tells how much flux a field produces in this material. For E=E₀cosφ, flux varies as cos²φ, whose cycle average is 1/2."], read: ["读公式为“平均光强=峰值电场平方÷两倍波阻抗”。如果给的是有效值 Eᵣₘₛ，它已包含峰值除以 √2 的平均效果，不能再多除一个 2。平方关系现在有了来源。", "Read the formula as average intensity = peak E squared divided by twice the impedance. RMS E already includes division of the peak by √2, so do not apply the factor twice. The amplitude-squared relation now has an origin."] },
      { title: ["为什么有时只写 I=A²？因为省略了比例系数", "Why sometimes write I=A²? A proportionality was absorbed"], before: ["上一步算绝对光强，需要保留 Z 和单位。若只比较同一介质里的相对强弱，可以把共同系数吸收进 A 的定义，省略写法便成 I=A²。若 A 仍明确是 V/m，A² 本身就还不是 W/m²。", "Absolute intensity needs Z and physical units. For relative comparisons in the same medium, a common coefficient can be absorbed into the definition of A, giving the shorthand I=A². If A still means V/m, its square alone is not W/m²."], read: ["使用复振幅时也要先区分“真实场平方”和“复数平方”；正确平均能流涉及复共轭，星号 * 表示把复数虚部反号。进阶式用于完整记账，初读沿用刚得到的 E₀²/(2Z) 即可。", "Also distinguish squaring a real field from squaring a complex representation. Correct phasor averaging uses the complex conjugate: * reverses the imaginary sign. The general expression is optional below; the single-wave result E₀²/(2Z) suffices here."], advanced: true },
      { title: ["把总功率、面积与电场串成一道题", "Connect total power, area and field in one calculation"], before: ["现在把 1.3.1 的面积分摊接到刚得到的场能关系：先用总辐射功率除以球面积得到 I，再倒过来由 I 求 E₀。设光源各方向均匀，光学输出 100 W，距离 10 m，无吸收。这里 100 W 不是灯泡耗电。", "Connect §1.3.1's area spreading to the field-energy relation: divide total radiated power by sphere area to get I, then invert the intensity formula to obtain E₀. Assume isotropic optical output 100 W at 10 m with no absorption—not electrical lamp consumption."], read: ["先得 I≈0.07958 W/m²，再用近似真空的 Z≈376.7 Ω 得 E₀≈7.74 V/m。这道题依次用了“功率怎样分摊”和“光强对应多大场”，说明两类知识怎样合在一起，而不是两道无关公式。", "First I≈0.07958 W/m², then near-vacuum Z≈376.7 Ω gives E₀≈7.74 V/m. The calculation joins how power spreads to what field carries that intensity; the formulas are stages of one problem."] }
    ],
    check: { question: ["同一介质里电场峰值翻倍，平均光强翻几倍？", "In the same medium, what happens to intensity if peak E doubles?"], answer: ["四倍，因为平均能流依赖峰值的平方。时间平均只带来同一个 1/2 系数，不把平方变回一次方。", "Fourfold, because mean flux depends on peak amplitude squared. Time averaging contributes the same factor 1/2, not a change of exponent."] },
    next: ["带到 1.4.4：前面的平均使用可持续重复的周期。真实光源的幅度、方向和相位若慢慢失去稳定关系，又该怎样描述？", "Into §1.4.4: our average used repeating cycles. How do we describe real sources whose amplitudes, directions and phase relations do not remain stable indefinitely?"]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.4.3"] = {
    ask: ["真空单色平面波的 E₀ 加倍，平均能流 I 会变成几倍？", "Double E₀ for a monochromatic plane wave in vacuum. How does mean energy flux I change?"],
    choices: [["两倍", "Twice"], ["不变", "Unchanged"], ["四倍", "Four times"]], answer: 2,
    try: ["将 E₀ 从 5 调到 10 V/m，比较显示的 I；不要拿归一化曲线高度读物理单位。", "Change E₀ from 5 to 10 V/m and compare the displayed I; normalized curve heights are not physical units."],
    why: ["I=E₀²/(2Z₀)；瞬时 S 与 cos² 同号，周期平均为峰值的一半。", "I=E₀²/(2Z₀). Instantaneous S follows cos² and the cycle mean is half the peak."]
  };
  const deepLab = {
    controls: [["fieldPeak", 5], ["fieldPeak", 10]],
    compare: ["把峰值从 5 调到 10 V/m，读带单位的 I；归一化波形高度不能当成 W/m²。", "Change peak field from 5 to 10 V/m. Read I with units; normalized wave height is not W/m²."],
    relation: ["真空单色平面波中平均能流 I=E₀²/(2Z₀)；电场峰值加倍，平均能流四倍。", "For a monochromatic plane wave in vacuum I=E₀²/(2Z₀); doubling peak electric field quadruples mean flux."],
    formula: "I=\\frac{E_0^2}{2Z_0}",
    challenge: [["E₀ 从 10 降到 5 V/m，平均能流比原来剩多少？", "Peak E₀ falls from 10 to 5 V/m. How much mean flux remains?"], [["1/2", "One half"], ["1/4", "One quarter"], ["1/8", "One eighth"]], 1],
  };
  deepLab.mistakes = [["I 随 E₀² 而非 E₀ 一次方变化：减半后是 1/4。", "I scales with E₀ squared, so halving E₀ leaves one quarter."], null, ["1/8 多乘了一个 1/2；时间平均因子前后都相同，会在比值中约去。", "One eighth counts the averaging factor twice; it cancels in the ratio."]];
  const [focus, limitQuestion, limitAnswer] = [["上方 E/E₀ 可正可负，下方 S/Smax 不因此反向；绿虚线表示周期平均。", "Upper E/E₀ changes sign; lower S/Smax does not reverse. The green dashed line is the cycle mean."], ["下方绿色虚线表示 S 的周期平均位置吗？", "Does the green dashed line show the cycle-mean position of S?"], true];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.4.3"] = deepLab;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
    title: pair("瞬时场与周期平均能流", "Instantaneous field and cycle-averaged energy flux"),
    note: pair("真空单色平面波，E₀ 为峰值。波形按显示频率缩放；图中 E/E₀ 与 S/Smax 分别归一化，不能比较它们的单位。", "Vacuum monochromatic plane wave with peak E₀. Display frequency is scaled. E/E₀ and S/Smax have separate normalizations; their units are not interchangeable."),
    settings: [slider("fieldPeak", "电场峰值 E₀", "Peak electric field E₀", 1, 20, .5, 10, "V/m")],
    draw(a) {
      const { ctx, w, h, values, clock, tr, text, line, path, red, blue, green, muted } = setup(a);
      const left = 48, right = w - 25, top = h * .31, bottom = h * .76, amp = h * .13;
      const E = values.fieldPeak, I = E * E / (2 * 376.730313);
      for (const y of [top, bottom]) line(left, y, right, y);
      const samples = Array.from({ length: 221 }, (_, i) => i / 220);
      path(samples.map(s => [left + s * (right - left), top - amp * Math.cos(s * 4 * Math.PI - clock * 2)]), red, 2.7);
      path(samples.map(s => [left + s * (right - left), bottom - amp * 1.5 * Math.cos(s * 4 * Math.PI - clock * 2) ** 2]), blue, 2.7);
      ctx.setLineDash([5, 5]); line(left, bottom - amp * .75, right, bottom - amp * .75, green, 2); ctx.setLineDash([]);
      text("E/E₀", 12, top - amp - 9, red, 12); text("S/Smax", 12, bottom - amp * 1.5 - 12, blue, 12);
      text(tr("平均 / 峰值 = 1/2", "Mean / peak = 1/2"), right, bottom - amp * .75 - 9, green, 12, "right");
      text(`I = E₀²/(2Z₀) = ${I.toFixed(3)} W/m²`, w / 2, 29, muted, w < 450 ? 12 : 17, "center");
      text(tr("S 不因 E 的正负而变成负值", "S does not reverse when E changes sign"), w / 2, h - 22, muted, 12, "center");
    },
  };
  figure.background = ["#162a25", "#293d30"];
  figure.animated = true;
  window.OpticsExtraVisuals.energy = figure;
})();

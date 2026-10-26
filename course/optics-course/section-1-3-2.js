/* Chapter 1, section 1.3.2: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.3.2",
    "title": "球面波的复振幅",
    "pages": "13–14",
    "pdf": 23,
    "visual": "sphericalPhase",
    "overview": "复振幅同时保存幅值和空间相位。在同一个接收平面上，离轴点走过更长的路，所以既更弱，也积累更多相位。",
    "bridge": {
      "previous": "1.3.1 给出 C/r 与径向相位 kr−ωt。",
      "current": "在平面上写出准确的距离函数，并分清近轴与局部平面近似。",
      "next": "1.3.3 改为线源，扩散维数也随之改变。"
    },
    "goals": [
      "从时间复表示中抽出空间因子",
      "计算源到平面上任一点的距离",
      "解释共轭相位与会聚方向"
    ],
    "symbols": [
      [
        "U",
        "球面波空间复振幅",
        "V/m"
      ],
      [
        "z₀",
        "光源至接收平面的轴向距离",
        "m",
        "算例：1 m"
      ],
      [
        "ρ",
        "相对轴线的横向距离",
        "m",
        "算例：1 mm"
      ],
      [
        "λ",
        "介质中的波长",
        "nm",
        "算例：500 nm"
      ]
    ],
    "blocks": [
      {
        "label": "拆开时间",
        "title": "场、复振幅与实测量",
        "eq": [
          {
            "text": "\\widetilde u=U(\\mathbf r)e^{-i\\omega t},\\qquad U(\\mathbf r)=\\frac{C}{r}e^{ikr}",
            "tex": true
          }
        ],
        "text": [
          "沿用 exp(−iωt) 的时间约定。U 的模为 |C|/r，辐角含 kr 与 C 的初相位。最后取 Re 得到真实场；不能把复数的平方直接当强度，强度需要模平方及介质系数。"
        ]
      },
      {
        "label": "平面上的分布",
        "title": "先求路程，再写振幅与相位",
        "eq": [
          {
            "text": "r=\\sqrt{(x-x_0)^2+(y-y_0)^2+z_0^2},\\qquad U(x,y)=\\frac{C}{r}e^{ikr}",
            "tex": true
          }
        ],
        "steps": [
          [
            "几何假设",
            "源在 (x₀,y₀,−z₀)，z₀>0，接收平面为 z=0。由三维距离公式得到 r；这是教材式 (1.45) 的紧凑写法。"
          ],
          [
            "相位差",
            "轴上 r=z₀；离轴距离 ρ 时 r=√(z₀²+ρ²)，故 Δφ=k(r−z₀)，不是简单取 kρ。"
          ],
          [
            "近轴展开",
            "仅在 $\\rho/z_0\\ll1$ 时，$r\\approx z_0+\\rho^2/(2z_0)$，因此相位近似为常量加二次项；还需检查被丢弃项乘 k 后是否足够小。"
          ],
          [
            "不能混淆",
            "幅值几乎不变，不代表相位几乎不变。在大孔径或短波长下，小路差仍可累积很大的光学相位。"
          ]
        ]
      },
      {
        "label": "算例与共轭",
        "title": "1 mm 离轴，已经相差约一圈相位",
        "eq": [
          {
            "text": "\\Delta r\\approx\\frac{\\rho^2}{2z_0}=0.5\\,\\mathrm{\\mu m},\\qquad \\Delta\\phi\\approx2\\pi",
            "tex": true
          }
        ],
        "text": [
          "z₀=1 m、ρ=1 mm、λ=500 nm 时，Δr≈0.5 μm，Δφ≈2π rad；幅值比 z₀/r≈0.9999995。这里相位差接近一整圈，并不意味着沿平面各点都同相。",
          "若在平面上把 U 共轭，空间相位变为 −kr。在保留 exp(−iωt) 并选择向 +z 半空间传播的条件下，对应朝镜像点 (x₀,y₀,+z₀) 会聚的波；不是把正在发散的实光“只做一次取共轭”就自动制造透镜。"
        ],
        "note": "近轴二次相位近似要求横向尺寸远小于轴距；“直接当平面波”还要求考察区内可接受的相位误差。"
      }
    ],
    "questions": [
      {
        "stem": "U=(C/r)exp(ikr)，r 增加 λ/4 后，空间相位增加多少？",
        "choices": [
          "π/2，且模略下降",
          "π，模不变",
          "0，只有时间相位改变"
        ],
        "answer": 0,
        "explain": "k=2π/λ，因此 Δφ=kλ/4=π/2。与此同时包络 C/r 会随 r 增加下降；与理想平面波不同，乘相位因子时不能忘掉幅值的距离因子。",
        "whyOther": "π 对应半波长；0 忽略空间因子。模不变的说法只适用于不含几何扩散的理想均匀平面波。",
        "id": "1.3.2:q1"
      },
      {
        "stem": "源在 (0,0,−1 m)，平面 z=0 上横向距离 ρ=1 mm，额外路程近似多少？",
        "choices": [
          "1 mm",
          "0.5 μm",
          "1 m"
        ],
        "answer": 1,
        "explain": "使用 Δr≈ρ²/(2z₀)=(10⁻³)²/(2×1)=5×10⁻⁷ m=0.5 μm。横向偏移不是额外路程本身，必须先使用斜边长度。",
        "whyOther": "1 mm 把横向位移当路差；1 m 是轴距，不是离轴点相对轴上点的路程增量。",
        "id": "1.3.2:q2"
      },
      {
        "stem": "在固定 exp(−iωt) 约定下，共轭平面复振幅首先改变什么？",
        "choices": [
          "频率变成负的可测频率",
          "模自动加倍",
          "空间相位符号反转，模不变"
        ],
        "answer": 2,
        "explain": "复共轭满足 |U*|=|U|、arg(U*)=−arg(U)。时间约定没有改变；若选择向镜像点传播的解，它描述会聚球面波。必须同时声明传播半空间。",
        "whyOther": "频率仍按同一个正 ω 描述；复共轭不改变复数的模，更不会把场能量自动加倍。",
        "id": "1.3.2:q3"
      }
    ]
  };
  const translation = {
    "code": "1.3.2",
    "title": "Complex amplitude of a spherical wave",
    "pages": "13–14",
    "pdf": 23,
    "visual": "sphericalPhase",
    "overview": "A complex amplitude stores both magnitude and spatial phase. Off-axis points on a receiving plane are farther from the source: they are weaker and have accumulated more phase.",
    "bridge": {
      "previous": "§1.3.1 supplies C/r and radial phase kr−ωt.",
      "current": "Write the exact distance on a plane and separate paraxial and local-plane approximations.",
      "next": "§1.3.3 turns to a line source and a different spreading dimension."
    },
    "goals": [
      "Factor spatial dependence out of the time-harmonic field",
      "Calculate distance to any point on a plane",
      "Interpret conjugated phase and convergence"
    ],
    "symbols": [
      [
        "U",
        "spatial complex amplitude",
        "V/m"
      ],
      [
        "z₀",
        "axial source-to-plane distance",
        "m",
        "Example: 1 m"
      ],
      [
        "ρ",
        "transverse distance from axis",
        "m",
        "Example: 1 mm"
      ],
      [
        "λ",
        "wavelength in medium",
        "nm",
        "Example: 500 nm"
      ]
    ],
    "blocks": [
      {
        "label": "Factor out time",
        "title": "Field, complex amplitude, and real quantity",
        "eq": [
          {
            "text": "\\widetilde u=U(\\mathbf r)e^{-i\\omega t},\\qquad U(\\mathbf r)=\\frac{C}{r}e^{ikr}",
            "tex": true
          }
        ],
        "text": [
          "Keep the exp(−iωt) convention. The magnitude of U is |C|/r, while its argument includes kr and the phase of C. Take Re at the end for the real field. Intensity uses a modulus square and a medium factor, not the square of a complex field."
        ]
      },
      {
        "label": "Distribution on a plane",
        "title": "Find the path before amplitude and phase",
        "eq": [
          {
            "text": "r=\\sqrt{(x-x_0)^2+(y-y_0)^2+z_0^2},\\qquad U(x,y)=\\frac{C}{r}e^{ikr}",
            "tex": true
          }
        ],
        "steps": [
          [
            "Geometry",
            "The source is at (x₀,y₀,−z₀), with z₀>0, and the receiving plane is z=0. The Euclidean distance gives r, a compact version of book Eq. (1.45)."
          ],
          [
            "Phase difference",
            "On axis r=z₀. At transverse distance ρ, r=√(z₀²+ρ²), so Δφ=k(r−z₀), not kρ."
          ],
          [
            "Paraxial expansion",
            "Only for $\\rho/z_0\\ll1$, $r\\approx z_0+\\rho^2/(2z_0)$. Phase is then a constant plus a quadratic term. Check that neglected path terms remain small after multiplication by k."
          ],
          [
            "Do not conflate",
            "Almost constant magnitude does not imply almost constant phase. At short wavelengths or across a large aperture, a small path difference can accumulate substantial optical phase."
          ]
        ]
      },
      {
        "label": "Example and conjugation",
        "title": "A 1 mm offset can already add a full phase cycle",
        "eq": [
          {
            "text": "\\Delta r\\approx\\frac{\\rho^2}{2z_0}=0.5\\,\\mathrm{\\mu m},\\qquad \\Delta\\phi\\approx2\\pi",
            "tex": true
          }
        ],
        "text": [
          "With z₀=1 m, ρ=1 mm and λ=500 nm, Δr≈0.5 μm and Δφ≈2π rad. The magnitude ratio is z₀/r≈0.9999995. A difference near one full cycle does not mean every intervening point is in phase.",
          "Conjugating U on the plane changes kr to −kr. Retaining exp(−iωt) and propagation into the +z half-space gives convergence toward the mirror point (x₀,y₀,+z₀). This is a wavefront statement, not a claim that taking a conjugate on paper physically creates a lens."
        ],
        "note": "The paraxial quadratic approximation needs transverse dimensions much smaller than axial distance. Treating the wave as a plane wave additionally needs acceptably small phase error over the observation region."
      }
    ],
    "questions": [
      {
        "stem": "For U=(C/r)exp(ikr), how much does spatial phase increase when r increases by λ/4?",
        "choices": [
          "π/2, with a slightly smaller magnitude",
          "π, unchanged magnitude",
          "0; only time phase changes"
        ],
        "answer": 0,
        "explain": "k=2π/λ gives Δφ=π/2. The envelope C/r also decreases. Unlike an ideal plane wave, this wave carries a distance-dependent magnitude as well as a phase factor.",
        "whyOther": "π corresponds to half a wavelength; zero ignores the spatial factor. Constant magnitude applies to an ideal homogeneous plane wave without geometric spreading.",
        "id": "1.3.2:q1"
      },
      {
        "stem": "A source is at (0,0,−1 m). On z=0, what is the extra path at ρ=1 mm?",
        "choices": [
          "1 mm",
          "0.5 μm",
          "1 m"
        ],
        "answer": 1,
        "explain": "Δr≈ρ²/(2z₀)=(10⁻³)²/(2×1)=5×10⁻⁷ m=0.5 μm. The transverse offset is not itself the extra path; distance is the hypotenuse.",
        "whyOther": "1 mm mistakes transverse offset for path difference. 1 m is axial distance rather than the extra path relative to the on-axis point.",
        "id": "1.3.2:q2"
      },
      {
        "stem": "With exp(−iωt) fixed, what does conjugating the complex amplitude on a plane change?",
        "choices": [
          "The measured frequency becomes negative",
          "The magnitude doubles",
          "The spatial phase reverses sign; magnitude is unchanged"
        ],
        "answer": 2,
        "explain": "Complex conjugation preserves magnitude and reverses argument. The time convention is unchanged. Selecting the solution propagating toward the mirror point describes a converging spherical wave; the half-space must also be stated.",
        "whyOther": "The field still uses the same positive ω. Conjugation cannot double a complex magnitude or automatically double field energy.",
        "id": "1.3.2:q3"
      }
    ]
  };
  const guide = {
    question: ["一张平屏接收球面波，中央和边缘会同时振动吗？", "Do the centre and edge of a flat screen receive a spherical wave in phase?"],
    setup: ["上一节在球壳上观察，各点离源同样远。现在把观察面换成平面，边缘的传播路程稍长。我们用已经学过的复振幅同时记住两件事：距离造成的幅度下降，以及路程造成的相位转动。", "On a shell, all points were equally distant from the source. On a flat receiver, edge paths are longer. Complex amplitude stores both consequences: amplitude reduction with distance and phase rotation with path length."],
    terms: [
      { name: ["U / u", "U / u"], meaning: ["U 是不含共同时间因子的空间复振幅；u 是最后取实部得到的真实场分量。", "U is spatial complex amplitude without the common time factor; u is the physical component recovered by taking the real part."] },
      { name: ["z₀ / ρ", "z₀ / ρ"], meaning: ["z₀ 是源到平面的垂直距离；ρ 是平面内离中央轴线的距离，不是传播总路程。", "z₀ is the axial distance from source to plane; ρ is transverse distance from its centre, not the total travel path."] },
      { name: ["路差 / 相位差", "Path difference / phase difference"], meaning: ["路差是两条路的长度差；每差一个波长，相位就多转一整圈。", "Path difference is a length difference. Each extra wavelength adds one full phase turn."] }
    ],
    observe: ["增大离轴距离，先看斜线路程，再看相量转角。幅度数值几乎不变时，相量也可能已经转了一圈；不要把屏幕看起来一样亮当成处处同相。", "Increase the off-axis distance and compare the slanted path with the phasor angle. The phasor may make a full turn while amplitude hardly changes. Similar brightness does not imply a uniform phase."],
    blocks: [
      { title: ["用复振幅，把上一节的幅度和相位分开存", "Store the previous section's amplitude and phase separately"], before: ["1.2.5 已经把同频振动写成“空间地图×共同时间转动”。球面波也能这样拆：C/r 是地图上的箭头长度，exp(ikr) 决定转角；两者一起才是 U。最后乘时间因子并取实部，就回到上一节的余弦波。", "In §1.2.5 we wrote a shared-frequency field as spatial map times common time rotation. Here C/r sets the map's arrow length and exp(ikr) its angle; together they form U. Multiplying by the time factor and taking the real part recovers the previous cosine wave."], read: ["写 U 不是把光变成另一种波，只是让每个观察点的长度与转角都能单独读取。接下来先算屏幕每一点到源的真实距离，这决定这张地图该填什么。", "U does not describe a different wave. It lets us read length and angle at each receiver independently. Next we find the actual source-to-screen distance that determines each map entry."] },
      { title: ["先用直角三角形算路程，才谈相位", "Find the path from a right triangle before finding phase"], before: ["屏幕中央距离是 z₀，离轴点与中央相差横向距离 ρ，所以斜路程 r=√(z₀²+ρ²)。多走的是 r−z₀，而不是 ρ 本身。再乘 k=2π/λ，就把米换成了相位弧度。x、y 只是把横向位置拆成两个坐标的通用写法。", "The centre path is z₀ and the transverse offset is ρ, so the slanted path is r=√(z₀²+ρ²). Its extra length is r−z₀, not ρ itself. Multiplication by k=2π/λ converts metres to phase radians. x and y simply resolve the transverse position into coordinates."], read: ["ρ 远小于 z₀ 时，可把额外路程近似为 ρ²/(2z₀)。这是小角度几何的简化；若拿去算光学相位，还要检查所丢路差相对波长是否足够小。这个几何结果马上用于下一步算例。", "For ρ much smaller than z₀, the extra path is approximately ρ²/(2z₀). That is a small-angle geometric simplification; phase calculations also require the discarded path error to be small compared with a wavelength. We now use this geometry numerically."] },
      { title: ["用 1 mm 的横移，体会光学波长有多短", "Use a 1 mm offset to appreciate the short optical wavelength"], before: ["让源离屏幕 1 m，接收点横移 1 mm。用刚才的三角形，多走的路约 0.5 μm。若波长为 500 nm，它恰好约等于一个波长，所以相位已多走一圈；这时 r 相对 1 m 却只增加很小一点。", "With a source 1 m from the screen and a 1 mm offset, the extra path is about 0.5 μm. At wavelength 500 nm, that is about one wavelength: a full extra phase turn, even though r barely differs from 1 m."], read: ["于是幅度几乎一样不代表从中央到边缘相位都一样：中间位置已经连续扫过不同阶段。进阶说明中的“共轭”就是把每个复数箭头的转角反号，在选定传播半空间后对应会聚地图；它不是本步理解路差所必需的工具。", "Nearly equal amplitudes do not imply uniform phase from centre to edge: intermediate points pass through different stages. The optional conjugation discussion reverses phasor angles and, with a selected propagation half-space, describes a converging map. It is not needed to understand path difference here."] }
    ],
    check: { question: ["两个接收点的场幅度几乎一样，能否直接断定它们相位一样？", "If two field amplitudes are nearly equal, must their phases match?"], answer: ["不能。幅度看距离的相对变化，相位看路差相对波长的大小。可见光波长很短，极小路差也可能对应显著相位差。", "No. Amplitude responds to fractional distance changes; phase responds to path difference relative to wavelength. A tiny path difference can be significant at optical wavelengths."] },
    next: ["带到 1.3.3：点源把能量摊在球壳上；如果源是一条很长的线，能量摊开的面积还会以同样速度增加吗？", "Into §1.3.3: a point source spreads over spherical shells. Does a long line source spread over an area growing at the same rate?"]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.3.2"] = {
    ask: ["离轴点稍微移开，幅度几乎不变时，路差引起的相位还能明显变化吗？", "Move a little off axis. Can phase change appreciably even when amplitude is nearly unchanged?"],
    choices: [["不能，两者总同步", "No, amplitude and phase always track"], ["可以，波长很短使小路差也重要", "Yes, a tiny path difference can matter at short wavelengths"], ["只有吸收才会改变相位", "Only absorption can change phase"]], answer: 1,
    try: ["调离轴距离，分别看 Δr 和 Δφ/2π；相量显示的是取模后的方向。", "Change off-axis distance; compare Δr with Δφ/2π. The phasor direction wraps after full turns."],
    why: ["相位差是 2πΔr/λ。即使 z₀=1 m、ρ 仅为毫米量级，短波长仍可把微米路差放大成多个周期。", "The phase difference is 2πΔr/λ. With z₀=1 m and millimetre-scale ρ, a micrometre path difference can span many short-wavelength cycles."]
  };
  const deepLab = {
    controls: [["offset", 0], ["offset", 1]],
    compare: ["把离轴位置从 0 调到 1 mm；看 Δr 的微米读数与 Δφ/2π，再对照圆形相量。", "Move off axis from 0 to 1 mm. Compare Δr in micrometres, Δφ/2π and the circular phasor."],
    relation: ["路差决定相位：Δφ=2πΔr/λ。图固定 z₀=1 m、λ=500 nm；幅度近似不变不代表相位不变。", "Path difference sets phase: Δφ=2πΔr/λ. Here z₀=1 m and λ=500 nm; nearly unchanged magnitude does not mean unchanged phase."],
    formula: "\\Delta r=\\sqrt{z_0^2+\\rho^2}-z_0,\\qquad \\Delta\\varphi=\\frac{2\\pi\\Delta r}{\\lambda}",
    challenge: [["将离轴距离从 1 mm 加倍到 2 mm，在 ρ≪z₀ 下路差近似变几倍？", "Double off-axis distance from 1 to 2 mm with ρ≪z₀. Approximately how does path difference change?"], [["两倍", "Twice"], ["四倍", "Four times"], ["不变", "Unchanged"]], 1],
  };
  deepLab.mistakes = [["小角度下 Δr≈ρ²/(2z₀)，ρ 加倍会使路差约四倍。", "For small ρ, Δr≈ρ²/(2z₀): doubling ρ approximately quadruples path difference."], null, ["振幅可近似相同，但 Δr 随离轴位置改变，相位不能保持不变。", "Magnitude may be nearly unchanged, but the off-axis path difference and phase change."]];
  const [focus, limitQuestion, limitAnswer] = [["盯 Δr 的微米数与 Δφ/2π 的周数；相量箭头只保留周内方向。", "Track micrometre Δr and phase cycles Δφ/2π; the phasor retains direction within a turn."], ["幅值几乎不变，是否足以推断整个接收平面同相？", "Does nearly unchanged magnitude imply the entire receiving plane is in phase?"], false];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.3.2"] = deepLab;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
    title: pair("接收平面的路差与相位", "Path difference and phase on a receiving plane"),
    note: pair("固定 z₀=1 m、λ=500 nm。右侧圆环表示选定离轴点相对轴上点的复相位；距离精确计算，图形不按真实比例。", "Fixed z₀=1 m and λ=500 nm. The right phasor shows the selected off-axis point relative to the on-axis point. Distances are exact; geometry is not to scale."),
    settings: [slider("offset", "离轴距离 ρ", "Off-axis distance ρ", 0, 2, .05, 1, "mm")],
    draw(a) {
      const { w, h, values, tr, text, line, circle, arrow, blue, red, green, muted } = setup(a);
      const rho = values.offset / 1000, r = Math.hypot(1, rho);
      // Rationalized difference avoids subtracting two almost equal numbers.
      const dr = rho * rho / (r + 1), phase = 2 * Math.PI * dr / 500e-9;
      const sx = w * .08, plane = w * .48, y = h * .52, py = y - values.offset * h * .1;
      line(plane, 65, plane, h - 85, blue, 3); line(sx, y, plane, y, muted); line(sx, y, plane, py, red, 2);
      circle(sx, y, 4, green, 3); circle(plane, py, 4, red, 3);
      text("S", sx, y + 25, green); text("z = 0", plane, 48, blue, 13, "center");
      text("z₀ = 1 m", (sx + plane) / 2, y + 25, muted, 12, "center");
      const cx = w * .77, cy = h * .42, R = Math.min(w * .15, h * .19);
      circle(cx, cy, R, muted); arrow(cx, cy, cx + R * Math.cos(phase), cy - R * Math.sin(phase), red);
      text(`Δr = ${(dr * 1e6).toFixed(3)} μm`, cx, h * .75, blue, 14, "center");
      text(`Δφ/2π = ${(phase / (2 * Math.PI)).toFixed(3)}`, cx, h * .84, red, 14, "center");
      text(tr("模几乎不变 ≠ 相位不变", "Nearly equal magnitude ≠ equal phase"), w / 2, h - 25, green, w < 450 ? 11 : 14, "center");
    },
  };
  figure.animated = false;
  window.OpticsExtraVisuals.sphericalPhase = figure;
})();

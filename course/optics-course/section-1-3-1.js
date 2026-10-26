/* Chapter 1, section 1.3.1: source, translation, and guided reading. */
(() => {
  const section = {
    "code": "1.3.1",
    "title": "球面波的波函数",
    "pages": "12–13",
    "pdf": 22,
    "visual": "spherical",
    "overview": "从平行波面走向点源：相位沿半径传播，振幅却不能保持不变。用能量守恒看清 1/r 与 1/r² 分别属于什么量。",
    "bridge": {
      "previous": "1.2 的理想平面波没有几何扩散。",
      "current": "建立向外传播的标量球面波，并验证它满足三维波动方程。",
      "next": "1.3.2 抽出时间因子，研究平面上的复振幅。"
    },
    "goals": [
      "区分振幅与强度的距离律",
      "读出向外传播的球面相位",
      "识别点源奇点与标量模型边界"
    ],
    "symbols": [
      [
        "r",
        "距点源的径向距离",
        "m",
        "算例：2 → 4"
      ],
      [
        "C",
        "径向振幅常数",
        "V",
        "算例：6 V；不是电场振幅本身"
      ],
      [
        "k, ω",
        "波数、角频率",
        "rad/m, rad/s"
      ],
      [
        "P, I",
        "总功率、光强",
        "W, W/m²",
        "算例：P=1 W"
      ]
    ],
    "blocks": [
      {
        "label": "几何与模型",
        "title": "同相位在球面，不等于各方向等振幅",
        "eq": [
          {
            "text": "u(r,t)=\\frac{C}{r}\\cos(kr-\\omega t),\\qquad k=\\frac{\\omega}{v}",
            "tex": true
          }
        ],
        "text": [
          "点源位于原点；kr−ωt 为常数的轨迹随时间向外移动。固定时刻，同一相位的连续波面是同心球面。这里 u 是一个标量场分量的模型，不是完整矢量电磁解。",
          "实际振荡偶极子的辐射方向不均匀；1.4.2 会出现 sinψ 因子。“球面波”描述波面形状，不能自动推出光源各向均匀发光。"
        ],
        "note": "均匀、各向同性、无吸收介质中的标量外向波，r>0；原点包含源，不能使用此无源表达式。"
      },
      {
        "label": "守恒推导",
        "title": "同样功率分到更大的球壳",
        "eq": [
          {
            "text": "I=\\frac{P}{4\\pi r^2}",
            "tex": true,
            "ref": "isotropic-intensity"
          },
          {
            "text": "A(r)=\\frac{C}{r},\\qquad \\frac{I(r_2)}{I(r_1)}=\\left(\\frac{r_1}{r_2}\\right)^2",
            "tex": true
          }
        ],
        "steps": [
          [
            "使用的定律",
            "对稳态各向均匀辐射、无吸收区域，任一球面穿出的时间平均功率 P 相同：P=4πr²I。"
          ],
          [
            "先求强度",
            "球面积增大为原来的四倍，单位面积获得的功率就减为四分之一，因此 I∝1/r²。"
          ],
          [
            "再求振幅",
            "同一介质同一频率下 I 与 A² 成正比，取正的包络振幅得到 A∝1/r。用有量纲的 C/r 表示，不把“单位距离”当无量纲数。"
          ]
        ]
      },
      {
        "label": "逐项验算",
        "title": "为什么不能代入一维的波动方程？",
        "eq": [
          {
            "text": "\\frac{1}{r^2}\\frac{\\partial}{\\partial r}\\left(r^2\\frac{\\partial u}{\\partial r}\\right)-\\frac{1}{v^2}\\frac{\\partial^2u}{\\partial t^2}=0",
            "tex": true
          }
        ],
        "steps": [
          [
            "方程与条件",
            "使用 1.1 的三维标量波动方程；球对称且 r>0 时，拉普拉斯算符是径向形式，不只是二阶径向导数。令 φ=kr−ωt。"
          ],
          [
            "径向一阶、二阶",
            "$u_r=-\\frac{C\\cos\\phi}{r^2}-\\frac{Ck\\sin\\phi}{r}$；$u_{rr}=\\frac{2C\\cos\\phi}{r^3}+\\frac{2Ck\\sin\\phi}{r^2}-\\frac{Ck^2\\cos\\phi}{r}$。"
          ],
          [
            "时间一阶、二阶",
            "$u_t=\\frac{C\\omega}{r}\\sin\\phi$，$u_{tt}=-\\frac{C\\omega^2}{r}\\cos\\phi=-\\omega^2u$。"
          ],
          [
            "逐项代入",
            "径向项等于 uᵣᵣ+(2/r)uᵣ，其中 r⁻³ 与 r⁻²sinφ 项恰好相消，只余 −k²u。于是方程变成 (−k²+ω²/v²)u=0，由 k=ω/v 成立。"
          ]
        ]
      },
      {
        "label": "带单位算例",
        "title": "距离加倍，哪些量减半？",
        "text": [
          "取 C=6 V，在 r=2 m 处 A=3 V/m；在 r=4 m 处 A=1.5 V/m。若另取各向均匀源 P=1 W，则两处 I 分别为 0.01989 与 0.004974 W/m²，强度比是 1/4。两个算例的 C 与 P 独立给定，不暗示它们对应同一个光源。"
        ]
      }
    ],
    "questions": [
      {
        "stem": "理想各向均匀球面波从 r 传播到 3r，振幅与强度分别变为？",
        "choices": [
          "$\\frac{1}{3}$ 与 $\\frac{1}{9}$",
          "$\\frac{1}{9}$ 与 $\\frac{1}{3}$",
          "都为 $\\frac{1}{3}$"
        ],
        "answer": 0,
        "explain": "P=4πr²I 守恒给出 I(3r)/I(r)=1/9。同一介质中 I∝A²，所以 A(3r)/A(r)=1/3；这是纯几何扩散，不需要吸收。",
        "whyOther": "第二项对调了场与能量；第三项忘记强度与振幅的平方关系。平面波不扩散的结论也不能直接移用到点源球面波。",
        "id": "1.3.1:q1"
      },
      {
        "stem": "C/r 形式能否直接在点源 r=0 处使用？",
        "choices": [
          "可以，电场恰为零",
          "不可以，此无源模型在源点奇异",
          "可以，只需把单位改成 cm"
        ],
        "answer": 1,
        "explain": "推导只适用于 r>0 的无源区域。r=0 处表达式发散，实际光源尺寸和源场结构必须单独处理，不能把数学奇点当真实无限电场。",
        "whyOther": "“电场为零”与 C/r 的极限相反；换单位不能消除除零。区分模型适用域与代数表达式非常重要。",
        "id": "1.3.1:q2"
      },
      {
        "stem": "u=(C/r)cos(kr−ωt) 的连续等相位球面随时间如何移动？",
        "choices": [
          "向内，速度 v",
          "停在原处",
          "向外，速度 ω/k"
        ],
        "answer": 2,
        "explain": "跟踪同一相位 kr−ωt=常数，微分得 k dr/dt−ω=0，故 dr/dt=ω/k=v>0。振幅随距离下降不改变这个相位传播方向。",
        "whyOther": "向内对应 kr+ωt 或一致改写的会聚波；停在原处混淆了固定时刻的波面与随时间跟踪的相位。",
        "id": "1.3.1:q3"
      }
    ]
  };
  const translation = {
    "code": "1.3.1",
    "title": "The spherical-wave function",
    "pages": "12–13",
    "pdf": 22,
    "visual": "spherical",
    "overview": "Move from parallel wavefronts to a point source: phase travels radially, but amplitude cannot stay constant. Conservation of energy separates the 1/r and 1/r² laws.",
    "bridge": {
      "previous": "The ideal plane wave in §1.2 has no geometric spreading.",
      "current": "Build an outgoing scalar spherical wave and verify its three-dimensional wave equation.",
      "next": "§1.3.2 factors out time and studies complex amplitude on a plane."
    },
    "goals": [
      "Distinguish amplitude and intensity distance laws",
      "Identify outgoing spherical phase",
      "Recognize the source singularity and scalar-model limits"
    ],
    "symbols": [
      [
        "r",
        "radial distance from source",
        "m",
        "Example: 2 → 4"
      ],
      [
        "C",
        "radial amplitude constant",
        "V",
        "Example: 6 V; not itself a field amplitude"
      ],
      [
        "k, ω",
        "wavenumber, angular frequency",
        "rad/m, rad/s"
      ],
      [
        "P, I",
        "total power, intensity",
        "W, W/m²",
        "Example: P=1 W"
      ]
    ],
    "blocks": [
      {
        "label": "Geometry and model",
        "title": "Spherical phase does not imply isotropic amplitude",
        "eq": [
          {
            "text": "u(r,t)=\\frac{C}{r}\\cos(kr-\\omega t),\\qquad k=\\frac{\\omega}{v}",
            "tex": true
          }
        ],
        "text": [
          "Place the point source at the origin. A constant value of kr−ωt moves outward; at fixed time a continuous wavefront is a concentric sphere. Here u models a scalar field component, not a full vector electromagnetic solution.",
          "A real oscillating dipole radiates anisotropically; §1.4.2 introduces a sinψ factor. Spherical wavefronts alone do not imply an isotropic source."
        ],
        "note": "Scalar outgoing wave in a homogeneous isotropic nonabsorbing medium, for r>0. The origin contains the source and is excluded."
      },
      {
        "label": "Conservation derivation",
        "title": "The same power crosses a larger sphere",
        "eq": [
          {
            "text": "I=\\frac{P}{4\\pi r^2}",
            "tex": true,
            "ref": "isotropic-intensity"
          },
          {
            "text": "A(r)=\\frac{C}{r},\\qquad \\frac{I(r_2)}{I(r_1)}=\\left(\\frac{r_1}{r_2}\\right)^2",
            "tex": true
          }
        ],
        "steps": [
          [
            "Law used",
            "For steady isotropic radiation without absorption, the time-averaged outward power P through any sphere is equal: P=4πr²I."
          ],
          [
            "Find intensity first",
            "Quadrupling sphere area quarters the power per unit area, hence I is proportional to 1/r²."
          ],
          [
            "Then find amplitude",
            "At a fixed frequency in one medium, I is proportional to A². The positive envelope therefore scales as 1/r. Writing C/r keeps dimensions explicit rather than treating a unit distance as dimensionless."
          ]
        ]
      },
      {
        "label": "Term-by-term verification",
        "title": "Why the one-dimensional equation is insufficient",
        "eq": [
          {
            "text": "\\frac{1}{r^2}\\frac{\\partial}{\\partial r}\\left(r^2\\frac{\\partial u}{\\partial r}\\right)-\\frac{1}{v^2}\\frac{\\partial^2u}{\\partial t^2}=0",
            "tex": true
          }
        ],
        "steps": [
          [
            "Equation and conditions",
            "Use the three-dimensional scalar wave equation from §1.1. Under spherical symmetry for r>0, its Laplacian is radial, not simply a second radial derivative. Set φ=kr−ωt."
          ],
          [
            "First and second radial derivatives",
            "$u_r=-\\frac{C\\cos\\phi}{r^2}-\\frac{Ck\\sin\\phi}{r}$; $u_{rr}=\\frac{2C\\cos\\phi}{r^3}+\\frac{2Ck\\sin\\phi}{r^2}-\\frac{Ck^2\\cos\\phi}{r}$."
          ],
          [
            "First and second time derivatives",
            "$u_t=\\frac{C\\omega}{r}\\sin\\phi$ and $u_{tt}=-\\frac{C\\omega^2}{r}\\cos\\phi=-\\omega^2u$."
          ],
          [
            "Substitute each term",
            "The radial term is uᵣᵣ+(2/r)uᵣ. Its r⁻³ and r⁻²sinφ terms cancel, leaving −k²u. The equation becomes (−k²+ω²/v²)u=0, which holds for k=ω/v."
          ]
        ]
      },
      {
        "label": "Worked example",
        "title": "When distance doubles, what halves?",
        "text": [
          "For C=6 V, A=3 V/m at r=2 m and 1.5 V/m at r=4 m. In a separate isotropic-source example with P=1 W, the intensities are 0.01989 and 0.004974 W/m², a ratio of 1/4. C and P are independently specified examples, not parameters asserted to describe the same source."
        ]
      }
    ],
    "questions": [
      {
        "stem": "An ideal isotropic spherical wave travels from r to 3r. What are its amplitude and intensity ratios?",
        "choices": [
          "$\\frac{1}{3}$ and $\\frac{1}{9}$",
          "$\\frac{1}{9}$ and $\\frac{1}{3}$",
          "Both $\\frac{1}{3}$"
        ],
        "answer": 0,
        "explain": "Conservation of P=4πr²I gives an intensity ratio of 1/9. Since I is proportional to A² in the same medium, the amplitude ratio is 1/3. This is geometric spreading without absorption.",
        "whyOther": "The second choice swaps field and energy laws. The third forgets the amplitude square. A plane wave lacking geometric spreading does not justify constant amplitude for a point source.",
        "id": "1.3.1:q1"
      },
      {
        "stem": "Can the C/r solution be used directly at the source r=0?",
        "choices": [
          "Yes; the field is zero",
          "No; the source-free model is singular there",
          "Yes; change metres to centimetres"
        ],
        "answer": 1,
        "explain": "The derivation applies only in the source-free region r>0. The expression diverges at r=0; source size and source-field structure need separate treatment, rather than interpreting the singularity as a real infinite field.",
        "whyOther": "Zero field contradicts the C/r limit. Unit conversion cannot remove division by zero. The mathematical expression must be used within its stated domain.",
        "id": "1.3.1:q2"
      },
      {
        "stem": "How does a continuous equal-phase sphere of u=(C/r)cos(kr−ωt) move?",
        "choices": [
          "Inward at v",
          "It stays fixed",
          "Outward at ω/k"
        ],
        "answer": 2,
        "explain": "Track kr−ωt=constant. Differentiation gives k dr/dt−ω=0, so dr/dt=ω/k=v>0. The decreasing amplitude does not reverse phase propagation.",
        "whyOther": "An inward wave uses kr+ωt or an equivalent consistent convention. A stationary sphere confuses a fixed-time snapshot with following the same phase over time.",
        "id": "1.3.1:q3"
      }
    ]
  };
  const guide = {
    question: ["离一盏小灯越远越暗，是光被空气吃掉了吗？", "Farther from a tiny lamp, why is it dimmer even without absorption?"],
    setup: ["先做一个理想实验：把很小的光源看作一个点，周围没有吸收。前面平面波的同相位置排成平面；现在光从一点向外走，同样时间走过同样距离。我们依次解决两个不同问题：哪里振动到同一阶段？那里振动有多强？不能用一个“球面”把两者混在一起。", "Imagine an ideal point source surrounded by a nonabsorbing medium. Plane-wave equal-phase points formed planes. Now light travels outward from one point, covering equal distances in equal times. We ask two separate questions: where is the oscillation at the same stage, and how strong is it there? A spherical shape alone does not answer both."],
    terms: [
      { name: ["波面", "Wavefront"], meaning: ["同一时刻，把振动阶段相同的一层连续位置连起来所得的面；图上的圆是球面的切面，不是光只沿圆周走。", "A continuous surface at the same oscillation stage at one time. A circle in the drawing cuts a spherical surface; light is not confined to the circle."] },
      { name: ["r / A(r)", "r / A(r)"], meaning: ["r 是离点源的距离；A(r) 是该距离上的振动幅度。C 只是给幅度定标的常数，不是光速 c。", "r is distance from the point source; A(r) is the oscillation amplitude there. C is an amplitude scale, not light speed c."] },
      { name: ["功率 P / 光强 I", "Power P / intensity I"], meaning: ["P 是每秒总共送出的能量；I 是其中每平方米分到的功率。这里“光强”指辐射能流密度，单位 W/m²。", "P is total energy sent out per second. I is power per square metre, the radiative intensity in W/m² used here."] }
    ],
    observe: ["先暂停，看以 S 为中心的圆圈，想象它们是球壳的截面；再把距离比从 1 调到 2。图中幅度比降到 1/2，光强比降到 1/4。先记住这两个不同的变化，下面解释为什么。", "Pause and imagine the circles around S as cuts through spherical shells. Change distance ratio from 1 to 2. Amplitude ratio falls to 1/2 and intensity ratio to 1/4. Notice the difference; we will explain it rather than memorize it."],
    blocks: [
      { title: ["先确定形状：离源同样远，就处在同一振动阶段", "First find the shape: equal distances share an oscillation stage"], before: ["回到刚才的球壳：在均匀介质中，同一时刻发出的扰动走得同样快，所以沿不同方向走到同一距离 r 时，传播经历相同。把这一层点连接起来，就是以光源为中心的球面。“球面波”首先是在给这种同相位面的形状命名。", "In a uniform medium, a disturbance emitted at one time travels at the same speed in different directions. At the same distance r it has experienced the same travel delay. Joining that layer of points gives a sphere centred on the source. Spherical wave first names this equal-phase geometry."], read: ["这只回答“哪里同拍”，还没回答“各方向多强”。先看一个沿各方向均匀发光的标量理想模型，下一步用能量怎么摊开来确定它的幅度；实际偶极源的方向强弱会在 1.4.2 另讲。", "This answers where the rhythm matches, not how strong each direction is. We first choose an isotropic scalar idealization and determine amplitude from spreading energy next. The directional strength of an actual dipole source is addressed separately in §1.4.2."] },
      { title: ["再确定强弱：球壳越大，每平方米分到的越少", "Then find the strength: a larger shell gets less per square metre"], before: ["刚才同一层波向外走，现在在源外放两个假想球面接收能量。没有吸收时，每秒穿过两个球面的总能量相同。球面积是 4πr²，距离加倍就变成四倍；同样的总功率 P 分到四倍面积，每平方米的 I 就只剩四分之一。这里先用同种介质中 I 与振幅平方成正比的性质（1.4.3 会解释来由）：要让平方变成 1/4，振幅就只需降到 1/2。", "Place two imaginary receiving spheres outside the source. Without absorption, the same total energy per second crosses both. Their area is 4πr², so doubling distance quadruples area. The same P over four times the area gives one-quarter I. We now use intensity proportional to amplitude squared within one medium, explained in §1.4.3. To reduce its square to 1/4, amplitude must fall to 1/2."], read: ["现在才组装波函数：前面的 C/r 记录刚得到的幅度下降，后面的 cos 记录周期振动；kr 记录沿距离积累的相位，−ωt 记录随时间推进的阶段。u 是所选的标量场分量，不是能量。这样完整式子的每一部分都有来由，而不是一上来就让你背。", "Only now assemble the wave function: C/r records the amplitude reduction just derived; cos records oscillation. kr tracks spatial phase, and −ωt its time progression. u is the chosen scalar field component, not energy. Each part of the full expression now has a reason."] },
      { title: ["可选验算：这个组装出的函数真的满足传播规则吗？", "Optional check: does the assembled function obey the wave rule?"], before: ["上一步用守恒得到候选函数，现回到 1.1 的三维波动方程验算。对只依赖源距 r 的标量分量 u，空间算子 ∇²u 不再只是沿一条轴的二阶导数，而是径向二阶导数加上球壳面积增长带来的 2/r 倍一阶导数；因此不能把一维式里的 z 直接改写成 r。完整微分放在下方。", "We built a candidate from conservation; now test it against the three-dimensional wave equation of §1.1. For a scalar component u depending only on distance r, the spatial operator ∇²u becomes a radial second derivative plus (2/r) times the first derivative from spherical geometry. Simply replacing z with r in the one-dimensional equation would be wrong. The calculus is below."], eqLead: [["将上述径向空间项和原来的时间二阶项放在同一式中（仅 r>0）：", "Combine that radial spatial term with the original second time derivative (only for r>0):"]], read: ["代入候选式后，额外距离项会抵消，最后仍要求 k=ω/v。第一次学可先带着这个结论继续算距离比；若要练微积分，再展开一阶、二阶导数。", "Substitution cancels the extra distance terms and again requires k=ω/v. A first reading can continue to distance ratios; expand the first and second derivatives for a calculus check."], advanced: true },
      { title: ["用两种读数检查：距离加倍，幅度与光强分别怎样？", "Check two readings: what halves and what becomes one quarter?"], before: ["前三步已把形状、强弱和验证接起来。最后用数字检查自己有没有把场幅度与能量混淆：给定 C=6 V，在 2 m 处用 C/r 得到 3 V/m；走到 4 m 处变成 1.5 V/m。", "We have connected geometry, strength and verification. Now check that field amplitude and energy are distinct: with C=6 V, C/r gives 3 V/m at 2 m and 1.5 V/m at 4 m."], read: ["幅度减半，光强应减为原来的 1/4，而不是也减半。另用 P=1 W 单独算，2 m 与 4 m 处分别约 0.01989、0.004974 W/m²，正好验证面积规律；这两组独立给定的数据不代表同一光源。", "Halving amplitude gives one-quarter intensity, not one-half. In a separate example with P=1 W, the two intensities are about 0.01989 and 0.004974 W/m². These independently specified examples are not asserted to be one physical source."] }
    ],
    check: { question: ["不考虑吸收，离各向均匀点源两倍远，为什么光强只有四分之一，而不是一半？", "Without absorption, why is intensity one quarter at twice the distance, rather than one half?"], answer: ["同样的总功率要穿过面积变成四倍的球面，所以每平方米只分到原来的四分之一。场幅度才减半，因为光强与它的平方成正比。", "The same total power crosses a sphere with four times the area, so each square metre gets one quarter. Field amplitude halves because intensity is proportional to its square."] },
    next: ["带到 1.3.2：现在知道球壳上怎样振动；如果把接收器排成一张平面，这张平面上各处离源不一样远，又会怎样？", "Into §1.3.2: we understand oscillations on spherical shells. What if receivers instead form a plane, whose points lie at different distances from the source?"]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  const waveFunction = section.blocks[0].eq;
  delete section.blocks[0].eq;
  section.blocks[1].eq.push(...waveFunction);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  const { pair, slider, setup, rays } = window.OpticsFigureTools;
  const figure = {
    title: pair("点源的同心波面与几何扩散", "Concentric wavefronts and geometric spreading"),
    note: pair("各向均匀标量点源，无吸收；r₀ 仅为非零参考距离。动画相位为缩放示意，不表示真实光频率。", "Isotropic scalar point source without absorption; r₀ is a nonzero reference distance. Animation phase is scaled, not an optical frequency."),
    settings: [slider("radiusRatio", "观察距离 r/r₀", "Observation distance r/r₀", 1, 4, .1, 2)],
    draw(a) {
      const { ctx, w, h, values, clock, tr, text, circle, line, bar, blue, red, green, muted } = setup(a);
      const cx = w * .32, cy = h * .49, R = Math.min(w * .27, h * .35), ratio = values.radiusRatio;
      for (let i = 0; i < 6; i++) {
        const r = R * ((i / 6 + clock * .16) % 1);
        circle(cx, cy, r, `rgba(135,203,255,${.75 * (1 - r / (R * 1.5))})`);
      }
      circle(cx, cy, 4, red, 4); circle(cx, cy, R * ratio / 4, green, 2);
      line(cx, cy, cx + R * ratio / 4, cy, green, 2);
      text("S", cx - 15, cy - 10, red); text("r", cx + R * ratio / 8, cy - 8, green);
      text(tr("同相位向外传播", "Phase travels outward"), cx, 30, blue, 13, "center");
      bar("A/A₀ = r₀/r", 1 / ratio, w * .65, h * .3, w * .3, red);
      bar("I/I₀ = (r₀/r)²", 1 / ratio ** 2, w * .65, h * .62, w * .3, blue);
      text("4πr² · I = P", cx, h - 35, muted, 17, "center");
    },
  };
  figure.animated = true;
  window.OpticsExtraVisuals.spherical = figure;
})();

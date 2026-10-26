/* Chapter 1, section 1.2.6: source, translation, and guided reading. */
(() => {
  const section = {
    code: "1.2.6", title: "平面电磁波的性质", pages: "11–12", pdf: 21, visual: "orthogonal",
    overview: "现在回到麦克斯韦方程，证明 E 与 B 都横向、互相垂直且同相；再用介质速度计算两个振幅的比例。这里每一个“垂直”都有条件和来源。",
    bridge: { previous: "1.2.5 构造了复平面波，但场的方向与振幅还需物理方程约束。", current: "用麦克斯韦方程推出横波、正交关系、同相和 E₀/B₀=v。", next: "本章后续学习叠加、偏振或干涉时，要带着这里的适用条件使用平面波。" },
    goals: ["分别证明 k·E=0 与 k·B=0", "由法拉第定律得到 B=(1/ω)k×E", "区分 |E|/|B|=v 与真空特例 c"],
    symbols: [["k̂", "传播方向单位矢量", "无"], ["E₀、B₀", "电场与磁场振幅", "V/m、T", "算例：E₀=3；B₀≈1.00×10⁻⁸（真空）"], ["v", "该介质的相速度", "m/s", "算例：真空 c≈3.00×10⁸；介质 c/2"], ["H", "B/μ，磁场强度", "A/m"]],
    blocks: [
      { label: "推导 07", title: "为什么 E 和 B 都是横波？", steps: [
        ["代入平面波", "对 exp[i(k·r−ωt)]，空间散度中的 ∇ 等效于 i k。"],
        ["电场", "∇·D=0；D=εE 且 ε 为非零常数，故 iε k·E=0，得到 k·E=0。"],
        ["磁场", "∇·B=0，得到 i k·B=0，即 k·B=0。"],
        ["物理图像", "E 与 B 都垂直于传播方向 k；这就是此理想平面波的横波性质。"]
      ], eq: [{ text: "Ẽ(r,t) = A exp[i(k·r−ωt)]", ref: "complex-wave" }, "k·E = 0；　k·B = 0"] },
      { label: "推导 08", title: "互相垂直、右手关系与同相", steps: [
        ["从旋度出发", "∇×E=−∂B/∂t，代入复平面波得 i k×E=iωB。"],
        ["消去 i", "B=(1/ω)k×E=(1/v)k̂×E，因为 |k|/ω=1/v。"],
        ["读出方向", "叉乘保证 B 垂直 E 与 k。E 沿 +x、k 沿 +z 时，z×x=y，故 B 沿 +y。"],
        ["读出相位", "1/v 是正实数，B 和 E 的对应实场同号翻转、同一位置同时达到零和极值，所以同相。"]
      ], eq: ["B = (1/ω)k×E = (1/v)k̂×E"] },
      { label: "推导 09", title: "振幅比与能量方向", text: [
        "因为 E⊥k，|k̂×E|=|E|，所以 B₀=E₀/v，或 E₀/B₀=v。真空里 v=c，才写 E₀=cB₀。在介质中不要把 c 原样代进去。",
        "再看能流方向：H=B/μ，在这里 E×H 沿 +k。注意场恰好为零的节点，瞬时零向量没有可定义的方向；讨论传播方向应看非零位置、波矢量或时间平均能流。"
      ], eq: ["E₀/B₀ = v = 1/√(εμ)；　真空中 E₀/B₀ = c"] },
      { label: "带单位例题", title: "电场振幅 3 V/m 对应多大 B？", text: [
        "真空中 B₀=E₀/c≈3/(3.00×10⁸)=1.00×10⁻⁸ T。若理想非磁性介质 εᵣ=4、μᵣ=1，则 v=c/2，同样 E₀=3 V/m 时 B₀≈2.00×10⁻⁸ T。",
        "图中为了可比性画的是 vB 而非 B 的真实长度；V/m 与 T 不能直接按相同数字作图。"
      ], eq: ["E₀ = 3 V/m　⇒　B₀(真空) ≈ 1.00×10⁻⁸ T"], note: "推导基于均匀、各向同性、线性、无源、无耗散的单色平面波；非均匀、吸收或近场不应直接套用所有结论。" }
    ],
    questions: [
      { stem: "k 沿 +z、E 在该点沿 +x 且非零，B 沿什么方向？", choices: ["+y", "−y", "+z"], answer: 0, explain: "B=(1/v)k̂×E，v>0。右手坐标 z×x=y，故 B 沿 +y；同时 E×B 指向 +z。半个周期后 E 和 B 同时变号，传播方向不会反过来。", whyOther: "−y 会让 E×B 指向 −z；+z 与 k 平行，违背 k·B=0 的横波条件。先用 k×E 确定 B，再核对 E×B。" },
      { stem: "某理想介质中 v=c/2，E₀=3 V/m，B₀ 最接近多少？", choices: ["1×10⁻⁸ T", "2×10⁻⁸ T", "3 T"], answer: 1, explain: "使用 B₀=E₀/v，v≈1.50×10⁸ m/s，所以 B₀≈3/(1.50×10⁸)=2×10⁻⁸ T。", whyOther: "1×10⁻⁸ T 是误把该介质速度写成 c；3 T 则把数值 3 直接从 V/m 搬到 T，忽略了量纲和速度因子。" },
      { stem: "某时刻 E=B=0 的节点，还能把瞬时 E×B 归一化以定义方向吗？", choices: ["可以，永远等于 +k̂", "不可以，零向量没有方向", "只能等于 −k̂"], answer: 1, explain: "在节点 E×B=0，零向量不能归一化；不能对它说“单位方向是 +k̂”。这不妨碍用波矢量 k、相位传播或非零位置的 E×H 来确定整束波的传播方向。", whyOther: "选 +k̂ 忽略了归一化的分母为零；选 −k̂ 更把节点误当成反向传播。方向来自整束波模型，不来自此刻零向量。" }
    ]
  };
  const translation = {
      title: "Properties of plane electromagnetic waves",
      overview: "Return to Maxwell's equations to show that E and B are transverse, mutually perpendicular, and in phase. Then use the medium speed to relate their amplitudes. Every perpendicularity has assumptions and a derivation.",
      bridge: { previous: "§1.2.5 constructed a complex plane wave; physics must still constrain field directions and amplitudes.", current: "Use Maxwell's equations to derive transversality, orientation, phase, and E₀/B₀=v.", next: "When studying superposition, polarization, or interference later, carry along the conditions under which these plane-wave results hold." },
      goals: ["Prove k·E=0 and k·B=0 separately", "Derive B=(1/ω)k×E from Faraday's law", "Distinguish E₀/B₀=v from the vacuum special case c"],
      symbols: [["k̂", "unit vector along propagation", "dimensionless"], ["E₀, B₀", "electric and magnetic amplitudes", "V/m, T", "Example: E₀=3; B₀≈1.00×10⁻⁸ (vacuum)"], ["v", "phase speed in this medium", "m/s", "Example: vacuum c≈3.00×10⁸; medium c/2"], ["H", "magnetic field intensity B/μ", "A/m"]],
      blocks: [
        { label: "Derivation 07", title: "Why are E and B transverse?", steps: [
          ["Insert a plane wave", "For exp[i(k·r−ωt)], the spatial ∇ in a divergence acts like i k."],
          ["Electric field", "With ∇·D=0, D=εE, and constant nonzero ε, we get iε k·E=0, hence k·E=0."],
          ["Magnetic field", "The equation ∇·B=0 similarly yields i k·B=0, or k·B=0."],
          ["Interpret", "Both E and B are perpendicular to the propagation direction k: the transverse-wave property of this ideal plane wave."]
        ] },
        { label: "Derivation 08", title: "Mutual perpendicularity, handedness, and phase", steps: [
          ["Start with curl", "Insert a complex plane wave into ∇×E=−∂B/∂t to get i k×E=iωB."],
          ["Cancel i", "B=(1/ω)k×E=(1/v)k̂×E, because |k|/ω=1/v."],
          ["Read direction", "The cross product makes B perpendicular to E and k. For E along +x and k along +z, z×x=y, so B is along +y."],
          ["Read phase", "Since 1/v is positive and real, corresponding physical fields reverse sign together and reach zero or extrema together: they are in phase."]
        ] },
        { label: "Derivation 09", title: "Amplitude ratio and energy-flow direction", text: [
          "Since E⊥k, |k̂×E|=|E|. Therefore B₀=E₀/v, or E₀/B₀=v. Only in vacuum, where v=c, may we write E₀=cB₀; do not insert c unchanged for a medium.",
          "For energy direction, H=B/μ, and E×H points along +k in this model. At a node where the instantaneous field vanishes, a zero vector has no defined direction. Use a nonzero location, the wavevector, or time-averaged energy flux to describe propagation."
        ] },
        { label: "Example with units", title: "What B corresponds to a 3 V/m electric amplitude?", text: [
          "In vacuum, B₀=E₀/c≈3/(3.00×10⁸)=1.00×10⁻⁸ T. In an ideal nonmagnetic medium with εᵣ=4 and μᵣ=1, v=c/2, so the same E₀=3 V/m gives B₀≈2.00×10⁻⁸ T.",
          "For comparable drawn lengths, the diagram shows vB rather than the numerical magnitude of B. Values measured in V/m and T cannot be drawn using a shared numerical scale."
        ], note: "These results assume a homogeneous, isotropic, linear, source-free, lossless monochromatic plane wave. Do not transfer every conclusion directly to inhomogeneous or absorbing media or to near fields." }
      ],
      questions: [
        { stem: "At a nonzero-field point, k points along +z and E along +x. Which way does B point?", choices: ["+y", "−y", "+z"], explain: "B=(1/v)k̂×E, with v>0. The right-handed cross product z×x=y, so B points +y, and E×B points +z. Half a cycle later E and B both reverse, without reversing propagation.", whyOther: "−y would make E×B point −z. +z would put B parallel to k and violate k·B=0. First use k×E, then check E×B." },
        { stem: "An ideal medium has v=c/2 and E₀=3 V/m. Which B₀ is closest?", choices: ["1×10⁻⁸ T", "2×10⁻⁸ T", "3 T"], explain: "Use B₀=E₀/v. With v≈1.50×10⁸ m/s, B₀≈3/(1.50×10⁸)=2×10⁻⁸ T.", whyOther: "1×10⁻⁸ T mistakenly uses vacuum speed c for this medium. 3 T copies the numerical value in V/m into tesla without accounting for dimensions or the speed factor." },
        { stem: "At a node where instantaneous E=B=0, can E×B be normalized to define a direction?", choices: ["Yes, it always equals +k̂", "No, the zero vector has no direction", "It can only equal −k̂"], explain: "At the node E×B=0, and the zero vector cannot be normalized. This does not prevent determining the wave's overall propagation from k, the moving phase, or E×H at nonzero points.", whyOther: "+k̂ ignores division by zero during normalization. −k̂ additionally confuses a field node with reverse propagation. The whole-wave model supplies a direction, not the zero vector at that instant." }
      ]
    };
  const guide = {
    question: ["光向前走，电场箭头也朝前指吗？", "If light travels forward, must its electric arrow point forward?"],
    setup: ["前面我们一直算振幅与相位，尚没有决定电场箭头朝哪里。现在用一个三维图把传播方向、电场方向和磁场方向分开；本节讨论的是均匀无源理想介质中的平面波。", "We have calculated amplitude and phase but have not yet fixed field directions. A three-dimensional picture separates propagation from E and B. This section concerns a plane wave in a uniform source-free ideal medium."],
    terms: [
      { name: ["横波", "Transverse wave"], meaning: ["振动方向垂直传播方向；“向前传播”和“向侧面振动”可以同时成立。", "Oscillation is perpendicular to propagation. Forward travel and sideways oscillation can coexist."] },
      { name: ["单位矢量 k̂", "Unit vector k̂"], meaning: ["只记传播方向，长度取 1；不同于大小为 2π/λ 的 k。", "Stores only propagation direction and has length one, unlike k with magnitude 2π/λ."] },
      { name: ["叉乘 ×", "Cross product ×"], meaning: ["从两个方向构造一个与二者垂直的方向；正向用右手规则决定。", "Builds a direction perpendicular to two given directions; its sign follows the right-hand rule."] }
    ],
    observe: ["旋转三维图，先找传播轴，再确认 E 与蓝线都在它的横向。蓝线画的是 vB，为了与 E 比长度，不是把不同单位的数值硬画成同一种长度。", "Rotate the 3D figure, locate the propagation axis, then check that E and the blue curve are transverse. Blue shows vB for length comparison with E, not raw quantities with incompatible units."],
    blocks: [
      { title: ["先从无源规则排除沿传播轴的振动", "Use the source-free rules to exclude longitudinal fields"], before: ["1.1 在均匀无源介质给出 ∇·E=0、∇·B=0。对平面波的空间指数求导，会多出沿传播方向的 k；所以两个散度为零就要求 k 与 E、B 的点积都为零。点积为零表示方向垂直，不是说场为零。因此光可以向 z 传播，而电场在 x、y 横向平面里振动。", "In the uniform source-free medium of §1.1, ∇·E=0 and ∇·B=0. Spatial differentiation of a plane-wave exponential brings down the propagation vector k. Thus zero divergence requires the dot products of k with E and B to vanish. That means perpendicular directions, not zero fields. Light can travel along z while E oscillates in the transverse x–y plane."], read: ["这一步只说明 E、B 各自都横向，还没说明它们彼此怎样摆放。下一步用另一条电磁规则把二者接起来；求导验证在下方保留。", "This establishes that E and B are each transverse, but not how they relate to each other. A second electromagnetic rule connects them next; the derivative proof remains below."], advanced: true },
      { title: ["再确定三支箭头的先后方向", "Now determine the orientation of all three arrows"], before: ["法拉第定律把 E 和 B 的变化联系起来。对我们选定的平面波，它化成一个叉乘关系：先取传播方向，再与 E 作叉乘，就得到 B 的方向。比如传播沿 +z、E 沿 +x，B 就沿 +y。", "Faraday's rule couples E and B. For this plane wave, it becomes a cross product: propagation direction crossed with E determines B. For travel along +z and E along +x, B points along +y."], read: ["这不仅让 E 与 B 互相垂直，还告诉我们它们在同一点同相翻转。空间里箭头互相垂直，不等于时间上差四分之一周期；方向夹角与相位差是不同概念。", "This makes E and B perpendicular and shows they reverse in phase at a given point. Perpendicular spatial arrows do not imply a quarter-period time delay: direction angle and phase difference are different concepts."] },
      { title: ["方向配好了，再比较两种场的幅度", "With directions fixed, compare field amplitudes"], before: ["上一步的叉乘关系还含一个 1/v，表示 B 的幅度为 E 幅度除以相速度。于是两种场不能独立任选。因为它们的单位不同，不能只说数值“谁大谁小”，要把速度和单位一起带上。", "The cross-product relation includes 1/v: B amplitude equals E amplitude divided by phase speed. The two fields cannot be independently chosen. Since their units differ, compare them through speed rather than raw numerical sizes."], read: ["真空使用 c，介质使用当地 v。能量流动则由 E×H 指示方向；在当前向前单一平面波里，它沿传播方向。下一步只用这条幅度关系算一个数。", "Use c in vacuum and local v in a medium. E×H indicates energy flow; for this single forward wave it points along propagation. Next we apply the amplitude relation numerically."] },
      { title: ["给定电场幅度，磁场不是另一个自由参数", "Given E amplitude, B is not a free parameter"], before: ["取 E₀=3 V/m。真空中用 B₀=E₀/c；若材料使 v 变成 c/2，在同一 E₀ 下就要除以一半的速度，得到两倍的 B₀。这里比较的是两种已指定的波，不是在模拟同一束光进界面。", "Take E₀=3 V/m. In vacuum, B₀=E₀/c. If a model medium has v=c/2, the same E₀ gives twice the B₀. We are comparing specified waves, not modelling transmission of one beam across an interface."], read: ["因此真空 B₀≈1.00×10⁻⁸ T，所设介质里约 2.00×10⁻⁸ T。至此平面波的形状、相位、方向与场幅度都有了联系；下一节改变的是波面形状，而不是另换一套时间振动规律。", "This gives about 1.00×10⁻⁸ T in vacuum and 2.00×10⁻⁸ T in the model medium. Shape, phase, directions and field amplitudes now connect. Next we change wavefront geometry, not the basic time-oscillation idea."] }
    ],
    check: { question: ["E 与 B 空间互相垂直，是否表示它们时间上相差 90°？", "Does spatially perpendicular E and B mean a 90° time-phase difference?"], answer: ["不表示。在这里它们同时过零、同时到极值；垂直说的是空间箭头，同相说的是时间变化。", "No. Here they cross zero and reach extrema together. Perpendicular describes spatial arrows; in phase describes time variation."] },
    next: ["带到 1.3.1：平面波把同拍的点连成平面；点源发散时，同拍的点又会连成什么形状？", "Into §1.3.1: a plane wave joins in-phase points into planes. What shape do such points make for an outward-spreading point source?"]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.2.6"] = {
    ask: ["图中固定模型波长、提高 n 后，若 E 不变，vB 的关系要求 B 怎样？", "In this fixed-model-wavelength figure, raise n. If E is unchanged, what happens to B from E=vB?"],
    choices: [["B 更大", "B becomes larger"], ["B 更小", "B becomes smaller"], ["E 与 B 必须平行", "E and B must become parallel"]], answer: 0,
    try: ["调 n，再拖动画布或用方向键旋转，确认 E、vB 与传播方向的正交关系。", "Change n, then drag or use arrow keys to inspect the perpendicular E, vB and propagation directions."],
    why: ["在非磁性均匀介质的平面波模型里 v=c/n、E=vB。图画的是 vB 的同比例长度，不是以 T 为单位的 B 原值。", "For this plane-wave model v=c/n and E=vB. The diagram scales vB, not the unscaled magnetic field in tesla."]
  };
  const deepLab = {
    controls: [["n", 1], ["n", 2]],
    compare: ["保持模型波长，调折射率，再用方向键转动视角：蓝线标的是 vB，不是 B 的数值。", "Keep model wavelength fixed, vary n, then rotate with arrow keys; the blue line depicts vB, not the value of B."],
    relation: ["在该非磁性均匀介质平面波模型中，v=c/n、E=vB；E 固定时速度减半，B 的数值加倍。", "For this nonmagnetic homogeneous-medium plane-wave model v=c/n and E=vB. At fixed E, halving v doubles B."],
    formula: "v=\\frac{c}{n},\\qquad E=vB",
    challenge: [["若保持 E 不变且 n 从 1 变为 2，B 的大小如何变？", "With E fixed and n changing from 1 to 2, how does the magnitude of B change?"], [["减半", "Halved"], ["加倍", "Doubled"], ["与 E 平行", "It becomes parallel to E"]], 1],
  };
  deepLab.mistakes = [["n 加倍令 v=c/n 减半；E=vB 且 E 不变时，B 必须加倍。", "Doubling n halves v=c/n; with E=vB and E fixed, B doubles."], null, ["E 与 B 在这个平面波模型中互相垂直，不会因改变 n 变成平行。", "E and B remain perpendicular in this plane-wave model."]];
  const [focus, limitQuestion, limitAnswer] = [["用视角旋转找 E、vB、k 的正交关系；蓝线是按速度缩放过的 B。", "Rotate the view to inspect E, vB and k; blue is velocity-scaled B."], ["图中的蓝线代表按 v 缩放过的 B 吗？", "Does the blue line represent velocity-scaled B?"], true];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.2.6"] = deepLab;
})();

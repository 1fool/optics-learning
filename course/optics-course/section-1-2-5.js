/* Chapter 1, section 1.2.5: source, translation, and guided reading. */
(() => {
  const section = {
    code: "1.2.5", title: "平面简谐波的复振幅", pages: "10–11", pdf: 20, visual: "amplitude",
    overview: "把时间因子统一提出来，剩下的空间相位和振幅放进 A(r)。观察不同位置的小相量如何转动，理解“复振幅随位置变”是什么意思。",
    bridge: { previous: "1.2.4 将真实场转成复表示，留下空间与时间一起出现的指数。", current: "分离 exp(−iωt)，让 A(r) 记录空间振幅与相位。", next: "1.2.6 把复平面波代回麦克斯韦方程，得到横波与场的比例。" },
    goals: ["区分常量 A 与空间复振幅 A(r)", "写出时间因子与空间因子的乘积", "根据相位差判断相隔 λ/4 的两点"],
    symbols: [["A", "常量复振幅矢量", "V/m"], ["A(r)", "含空间相位的复振幅", "V/m", "相隔 λ/4 时相位差 π/2"], ["φ₀", "可选的初相位", "rad"], ["exp(−iωt)", "共同时间因子", "无量纲"]],
    blocks: [
      { label: "把变量分开", title: "“振幅”也可以带相位", text: [
        "把 Ẽ=A exp[i(k·r−ωt)] 拆为 A(r) exp(−iωt)，其中 A(r)=A exp(i k·r)。常量 A 描述偏振方向和参考振幅；A(r) 还记录位置产生的相位。",
        "若 A=A₀ exp(iφ₀)（以某个分量为例），则真实场为 A₀ cos(k·r−ωt+φ₀)。复振幅的模给振幅，辐角给初相位；在理想均匀无耗散平面波中，模不随 z 衰减。"
      ], eq: [{ text: "Ẽ(r,t) = A exp[i(k·r−ωt)]", ref: "complex-wave" }, "Ẽ(r,t) = A(r) exp(−iωt)", "A(r)=A exp(i k·r)"] },
      { label: "推导 06", title: "相隔四分之一波长会怎样？", steps: [
        ["选两点", "同一时刻，沿传播方向选 z₁ 与 z₂=z₁+λ/4。"],
        ["计算相位差", "Δφ=k(z₂−z₁)=(2π/λ)(λ/4)=π/2。"],
        ["观察相量", "A(z₂)=A(z₁)exp(iπ/2)=i A(z₁)，相量在复平面转过 90°。"],
        ["还原实场", "两个位置的瞬时实场并不一定一个大一个小；要代入当时的相位再取实部。"]
      ], eq: [{ text: "k = 2π/λ", ref: "wavenumber" }, "A(z+λ/4) = i A(z)　（沿 +z，固定约定）"] },
      { label: "常见混淆", title: "不等于“振幅每走 λ/4 就变大”", text: [
        "乘 i 只旋转相位，不改变复数的模。若真实介质有吸收，振幅衰减需要另外的模型，例如复波数；本节理想无耗散模型并未包含这种效果。",
        "书中的“复振幅”是处理时间简谐波的工具，后面研究叠加、干涉时非常有用。"
      ], eq: ["|A(z+λ/4)| = |A(z)|　（无耗散均匀平面波）"] }
    ],
    questions: [
      { stem: "Ẽ(r,t)=A(r)exp(−iωt) 中 A(r) 已包含哪一部分？", choices: ["空间因子 exp(i k·r)", "整个时间因子 exp(−iωt)", "介质的全部边界条件"], answer: 0, explain: "定义就是 A(r)=A exp(i k·r)，它收集空间相位和常量振幅。时间因子 exp(−iωt) 被单独提出。", whyOther: "若把时间因子也塞进 A(r)，它就不再只是位置函数；单个平面波形式也没有自动满足特定边界的全部条件。" },
      { stem: "沿传播方向相隔 λ/4 的两点，在同一时刻空间相位相差多少？", choices: ["π/2", "π", "2π"], answer: 0, explain: "Δφ=kΔz=(2π/λ)(λ/4)=π/2 rad，也就是 90°。这里两点位移平行于波矢量，若改成在等相位面内移动，空间相位差反而为零。", whyOther: "π 对应相距 λ/2，2π 对应相距 λ。最可靠的方法是先写 k=2π/λ 再乘实际位移，而不是凭图猜角度。" },
      { stem: "理想无耗散平面波的 A(z+λ/4)=iA(z) 说明什么？", choices: ["模增加 4 倍", "相位转 90°，模不变", "时间倒流"], answer: 1, explain: "i=exp(iπ/2)，其模为 1，因此乘 i 只把复平面上的相量旋转 90°。真实场取实部后随位置变化，但复振幅的模没有因此变大。", whyOther: "模增加需要乘一个模大于 1 的因子；时间方向由 exp(−iωt) 的约定描述，沿 z 移动 λ/4 不是时间倒流。" }
    ]
  };
  const translation = {
      title: "Complex amplitude of a harmonic plane wave",
      overview: "Factor out the common time dependence and gather spatial phase and amplitude in A(r). Watch phasors at different positions rotate to understand what spatially varying complex amplitude means.",
      bridge: { previous: "§1.2.4 introduced complex waves whose exponential still contains both space and time.", current: "Extract exp(−iωt) so that A(r) carries spatial amplitude and phase.", next: "§1.2.6 substitutes the complex plane wave into Maxwell's equations to constrain field direction and magnitude." },
      goals: ["Distinguish constant A from spatial complex amplitude A(r)", "Separate space and time factors", "Compute the phase difference between points λ/4 apart"],
      symbols: [["A", "constant complex amplitude vector", "V/m"], ["A(r)", "complex amplitude including spatial phase", "V/m", "Phase difference π/2 over λ/4"], ["φ₀", "optional initial phase", "rad"], ["exp(−iωt)", "shared time factor", "dimensionless"]],
      blocks: [
        { label: "Separate variables", title: "An 'amplitude' may contain phase", text: [
          "Rewrite Ẽ=A exp[i(k·r−ωt)] as A(r)exp(−iωt), defining A(r)=A exp(i k·r). Constant A describes polarization and reference amplitude; A(r) also records phase arising from position.",
          "For one component, if A=A₀ exp(iφ₀), the physical field is A₀ cos(k·r−ωt+φ₀). The magnitude of a complex amplitude sets amplitude and its argument sets initial phase. Its magnitude does not decay along z in this ideal homogeneous lossless plane wave."
        ] },
        { label: "Derivation 06", title: "What happens a quarter-wavelength away?", steps: [
          ["Pick two points", "At the same time, choose z₁ and z₂=z₁+λ/4 along propagation."],
          ["Find phase difference", "Δφ=k(z₂−z₁)=(2π/λ)(λ/4)=π/2."],
          ["Compare phasors", "A(z₂)=A(z₁)exp(iπ/2)=iA(z₁), a 90° rotation in the complex plane."],
          ["Recover real fields", "One instantaneous real field is not automatically larger than the other. Insert the phase at that time, then take the real part."]
        ] },
        { label: "Common confusion", title: "Phase rotation is not amplitude growth", text: [
          "Multiplication by i rotates phase without changing magnitude. Absorption in a real material needs another model, such as a complex wavenumber; this ideal lossless model has no such decay.",
          "Complex amplitude is a tool for harmonic waves. It will be especially useful for superposition and interference."
        ] }
      ],
      questions: [
        { stem: "In Ẽ(r,t)=A(r)exp(−iωt), what does A(r) contain?", choices: ["The spatial factor exp(i k·r)", "The entire time factor exp(−iωt)", "All material boundary conditions"], explain: "By definition A(r)=A exp(i k·r); it collects spatial phase and a constant amplitude. The time factor exp(−iωt) has been factored out separately.", whyOther: "Including the time factor would make A(r) depend on time rather than position alone. One plane-wave expression does not automatically satisfy all specified boundary conditions." },
        { stem: "At the same time, how much does spatial phase change between two points λ/4 apart along propagation?", choices: ["π/2", "π", "2π"], explain: "Δφ=kΔz=(2π/λ)(λ/4)=π/2 rad, or 90°. The displacement is parallel to the wavevector; motion within an equal-phase plane would instead give zero phase difference.", whyOther: "π corresponds to λ/2; 2π to λ. Write k=2π/λ and multiply by the actual displacement rather than estimating from a sketch." },
        { stem: "What does A(z+λ/4)=iA(z) mean for an ideal lossless plane wave?", choices: ["Its magnitude grows fourfold", "Its phase rotates 90° while magnitude stays fixed", "Time runs backward"], explain: "i=exp(iπ/2) has magnitude one. Multiplication by i therefore rotates a complex phasor 90° but does not increase its magnitude. The real field varies with position after taking the real part.", whyOther: "Amplitude growth requires a factor whose magnitude exceeds one. The time direction is represented by exp(−iωt); shifting z by λ/4 is not reversing time." }
      ]
    };
  const guide = {
    question: ["每个位置都在振动，怎样只用一张“地图”记住它们？", "How can one map store oscillations at every position?"],
    setup: ["上一节用相量记录一个振动。现在同一频率的所有位置都按相同节拍转动，差别只是各处的长度和起始角。把共同的时间转动提出来，剩下的位置地图就是空间复振幅。", "A phasor records an oscillation. At a shared frequency, all positions rotate with the same time rhythm; their lengths and starting angles may differ. Factoring out time leaves a map called the spatial complex amplitude."],
    terms: [
      { name: ["A(r)", "A(r)"], meaning: ["给每个位置保存一个复数（或复矢量），包含当地振幅和参考相位。", "A complex number or vector stored at each position, containing its amplitude and reference phase."] },
      { name: ["模 / 辐角", "Magnitude / argument"], meaning: ["模是箭头长度；辐角是它的转角。复振幅不是只指长度。", "Magnitude is arrow length; argument is its angle. Complex amplitude includes both."] },
      { name: ["共同时间因子", "Common time factor"], meaning: ["exp(−iωt) 负责所有位置随时间的同频转动，负号属于本课约定。", "exp(−iωt) gives every position the shared time rotation; its minus sign is our convention."] }
    ],
    observe: ["比较两个位置的相量。移动位置时先看箭头长度，再看角度：理想无耗散平面波可以长度相同、转角不同。", "Compare phasors at two positions. Check length before angle: an ideal lossless plane wave can have equal lengths with different angles."],
    blocks: [
      { title: ["把共同的时钟拆出，留下位置地图", "Factor out the shared clock to leave a spatial map"], before: ["原来一个指数同时含位置和时间。利用指数相乘等于指数相加，把它拆成空间因子与时间因子。用 A(r) 收纳空间部分后，给定一个位置就只剩一个按时间转动的相量。", "The original exponential includes both position and time. The exponential addition rule lets us separate them into a spatial factor and a temporal factor. A(r) stores the spatial part; at a chosen position only the shared time rotation remains."], read: ["常量 A 与函数 A(r) 不能只因字母相同就当成同一个量：后者还装着位置的相位。括号里的 r 是提示“请在这个位置读取地图”。下一步用两个位置检验这张地图。", "Constant A and function A(r) are not interchangeable just because they share a letter: the latter includes spatial phase. r means read the map at this position. Next we compare two entries in that map."] },
      { title: ["走四分之一波长，是转角改变四分之一圈", "Moving a quarter-wavelength changes phase by a quarter-turn"], before: ["1.2.2 中一个波长对应 2π 的空间相位；所以沿传播方向走 λ/4，相位增加 π/2，也就是 90°。在复平面中，乘 i 正好把箭头旋转 90°，并不拉长它。", "A wavelength corresponds to a spatial phase change of 2π. Moving λ/4 along propagation therefore adds π/2, or 90°. Multiplying by i makes exactly that rotation without stretching the arrow."], read: ["所以两处复振幅可相差一个 i，但两处的振动最大幅度仍一样。要比较当时的真实场，还得给定时间并取投影，不能仅看这个 i 就说第二处场更大。", "Two complex amplitudes can differ by i while retaining the same oscillation amplitude. Comparing actual fields still needs a time and a projection; i alone does not make the second field larger."] },
      { title: ["分清“转了一点”与“真的变弱了”", "Distinguish a changed angle from genuine weakening"], before: ["刚才只是沿理想平面波的位置地图改变了相位。若箭头真的缩短，才是振幅下降；在本节均匀无耗散模型里没有这种缩短。稍后球面波会因为向外摊开而缩短，吸收材料又是另一种原因。", "The ideal plane-wave map changed phase, not size. An actually shorter arrow would mean smaller amplitude. That does not occur in this uniform lossless plane-wave model. Spherical waves later weaken by spreading; absorption is a different mechanism again."], read: ["复振幅的“复”提醒我们同时检查长度与角度。掌握这个区别，才能在后面分别讨论强度下降与相位变化，而不是把两者混在一起。", "Complex amplitude asks us to check both length and angle. That distinction will let us discuss intensity loss and phase variation separately."] }
    ],
    check: { question: ["复振幅乘 i 后，振幅一定变大了吗？", "Does multiplying a complex amplitude by i increase its amplitude?"], answer: ["没有。它转过 90°，模保持不变；真实场在某个时刻可能改变，因为投影角度变了。", "No. It rotates by 90° with unchanged magnitude. The actual field at a given time may change because its projection changes."] },
    next: ["带到 1.2.6：这些波函数描述了怎么变，接下来回到电磁规则，决定电场、磁场和传播方向怎样配合。", "Into §1.2.6: the wave functions describe variation. Next the electromagnetic rules determine how E, B and propagation fit together."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.2.5"] = {
    ask: ["固定两观察点间距，把波长调短，两点的空间相位差通常怎样？", "At fixed separation, shorten wavelength. How does the spatial phase difference change?"],
    choices: [["一定归零", "It must vanish"], ["保持不变", "It stays fixed"], ["按 2πΔz/λ 增大（显示可绕圈）", "It grows as 2πΔz/λ (the display may wrap)"]], answer: 2,
    try: ["固定相位滑块，调波长并比较相邻位置的相量。", "Hold the phase control fixed; change wavelength and compare phasors at nearby positions."],
    why: ["复振幅的空间相位含 kz，k=2π/λ；图上的角度绕过整圈会重复，但未取模的相位差仍随 1/λ 增大。", "Spatial phase contains kz with k=2π/λ. A displayed arrow repeats every turn, while the unwrapped phase difference grows as 1/λ."]
  };
  const deepLab = {
    controls: [["lambda", 3.4], ["lambda", 1.2]],
    compare: ["固定观察点间隔，先用长波、再用短波；相量方向会绕过整圈，别把取模结果当完整相位差。", "At fixed point spacing compare long and short wavelengths; a phasor wraps after a full turn, unlike unwrapped phase."],
    relation: ["空间相位差的大小为 2πΔz/λ；缩短 λ 会增大未取模的相位差。", "The unwrapped spatial phase difference has magnitude 2πΔz/λ; shortening λ increases it."],
    formula: "|\\Delta\\varphi|=\\frac{2\\pi\\Delta z}{\\lambda}",
    challenge: [["点间距固定、波长减半，未取模相位差大小怎样？", "At fixed separation, halve wavelength. What happens to unwrapped phase-difference magnitude?"], [["减半", "Halved"], ["加倍", "Doubled"], ["不变", "Unchanged"]], 1],
  };
  deepLab.mistakes = [["Δφ 的大小与 1/λ 成正比，波长减半不是相位差减半。", "Phase-difference magnitude scales as 1/λ, not λ."], null, ["显示相量可能绕回原方向，但未取模的相位差已改变。", "The displayed phasor may wrap, but unwrapped phase difference changed."]];
  const [focus, limitQuestion, limitAnswer] = [["看两个相量箭头的方向，也要记住显示绕一圈时未取模相位仍可能增加。", "Watch both phasor directions but remember an unwrapped phase can grow after a display wraps."], ["两个箭头显示同向，就一定没有整圈的空间相位差吗？", "If two arrows align, must unwrapped phase difference be zero?"], false];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.2.5"] = deepLab;
})();

/* Chapter 1, section 1.2.2: source, translation, and guided reading. */
(() => {
  const section = {
    code: "1.2.2", title: "平面简谐波", pages: "8–9", pdf: 18, visual: "periods",
    overview: "同一条余弦曲线有空间尺度 λ、时间尺度 T；k、ω 把它们换成更方便的角度单位。用空间图与时间图同时观察，避免把波长当周期。",
    bridge: { previous: "1.2.1 说明了余弦波是行波解，本节给它精确的空间和时间尺度。", current: "建立 λ、T、ν、k、ω 的关系，并从固定相位求传播速度。", next: "1.2.3 把只沿 z 的 kz 推广成任意方向的 k·r。" },
    goals: ["区分 λ、T、ν、k、ω 的量纲", "用固定相位推导 v=λν", "完成一次真实单位的数量级计算"],
    symbols: [["λ", "相邻同相点的空间距离", "m", "算例：λ₀=600 nm"], ["T", "同一点重复一次所需时间", "s", "算例：≈2.00×10⁻¹⁵"], ["ν", "频率，1/T", "Hz", "算例：≈5.00×10¹⁴"], ["k", "2π/λ，波数大小", "rad/m", "算例：k₀≈1.05×10⁷"], ["ω", "2π/T，角频率", "rad/s", "算例：≈3.14×10¹⁵"]],
    blocks: [
      { label: "两个视角", title: "一幅波形，两种取样方式", text: [
        "固定 t 看 E 随 z 的变化，走过 λ 后相位增加 2π；固定 z 看 E 随 t 的变化，过 T 后相位减少 2π，但场值回到同一状态。上面的两幅小图分别展示这两种取样。",
        "λ 是长度，T 是时间；不能仅凭一张静态空间波形的峰间距就读出频率，除非同时知道传播速度。"
      ], eq: [{ text: "k = 2π/λ", ref: "wavenumber" }, "ν = 1/T", "ω = 2πν = 2π/T"] },
      { label: "推导 03", title: "为什么 v=λ/T？", steps: [
        ["选一处波峰", "令相位 φ=kz−ωt 保持常数。"],
        ["沿峰跟踪", "微分得 k dz−ω dt=0，因此 dz/dt=ω/k。"],
        ["代入定义", "ω/k=(2π/T)/(2π/λ)=λ/T=λν。"]
      ], eq: [{ text: "v = ω/k", ref: "phase-speed" }, "v = λ/T = λν"] },
      { label: "带单位例题", title: "600 nm 的真空单色光", text: [
        "λ₀=600 nm=6.00×10⁻⁷ m，取 c≈3.00×10⁸ m/s。于是 ν=c/λ₀≈5.00×10¹⁴ Hz；T=1/ν≈2.00×10⁻¹⁵ s。",
        "⟦k₀=2π/λ₀≈1.05×10⁷⟧ rad/m，⟦ω=2πν≈3.14×10¹⁵⟧ rad/s。角频率与普通频率相差 2π，不要把 rad/s 写成 Hz。"
      ], eq: ["λ₀ = 600 nm　⇒　ν ≈ 5.00×10¹⁴ Hz"] },
      { label: "边界", title: "换介质时哪些量会变？", text: [
        "理想静止界面上，透射波的频率通常与入射波相同；速度变成 v 时，波长 λ=v/ν 随之改变。若介质有色散，v 还可能依赖频率。",
        "本图用相对单位同步演示 λ 与 T，不是实际 10¹⁴ Hz 的逐周期实时动画。"
      ], eq: ["介质内 λ = v/ν；　真空内 λ₀ = c/ν"] }
    ],
    questions: [
      { stem: "λ 加倍而传播速度 v 保持不变，频率 ν 如何变化？", choices: ["加倍", "减半", "不变"], answer: 1, explain: "由 v=λν，v 不变时 ν=v/λ。λ 加倍，ν 减半，同时 T=1/ν 加倍；单位距离内的波峰数也随之减少，但传播方向不变。", whyOther: "选“加倍”把正比和反比弄反；选“不变”只有在 v 也随 λ 变化且恰好补偿时才可能，不符合题设。" },
      { stem: "真空中 λ₀=500 nm 的光，频率最接近哪一个？", choices: ["6×10¹⁴ Hz", "6×10⁸ Hz", "6×10⁻¹⁴ Hz"], answer: 0, explain: "先换单位：500 nm=5×10⁻⁷ m。ν=c/λ₀≈(3×10⁸)/(5×10⁻⁷)=6×10¹⁴ Hz。数量级来自 8−(−7)=15，再除以 5。", whyOther: "6×10⁸ 只接近光速的数字量级而不是频率；6×10⁻¹⁴ 把除以 10⁻⁷ 误算成乘以 10⁻⁷。先统一米与秒再运算。" },
      { stem: "在静止介质界面上，入射光频率保持不变而速度下降，介质中的波长如何变化？", choices: ["变短", "变长", "一定不变"], answer: 0, explain: "同一频率 ν 下 λ=v/ν；v 下降，λ 也下降。波长变化不代表光源在界面上突然改变频率。", whyOther: "“变长”把 v 与 λ 的正比关系看反；“一定不变”把频率连续误当成波长连续。这里限于通常的静止界面。" }
    ]
  };
  const translation = {
      title: "Harmonic plane waves",
      overview: "A cosine wave has a spatial scale λ and a temporal scale T. The quantities k and ω express those scales in angular units. Compare space and time plots rather than confusing wavelength with period.",
      bridge: { previous: "§1.2.1 established the cosine as a traveling-wave solution; now give it exact spatial and temporal scales.", current: "Relate λ, T, ν, k, and ω, and find propagation speed by following a fixed phase.", next: "§1.2.3 generalizes kz for propagation in any direction to k·r." },
      goals: ["Distinguish the units of λ, T, ν, k, and ω", "Derive v=λν from a fixed phase", "Work through a numerical example with physical units"],
      symbols: [["λ", "distance between adjacent in-phase points", "m", "Example: λ₀=600 nm"], ["T", "time for one cycle at a fixed point", "s", "Example: ≈2.00×10⁻¹⁵"], ["ν", "frequency, 1/T", "Hz", "Example: ≈5.00×10¹⁴"], ["k", "wavenumber 2π/λ", "rad/m", "Example: k₀≈1.05×10⁷"], ["ω", "angular frequency 2π/T", "rad/s", "Example: ≈3.14×10¹⁵"]],
      blocks: [
        { label: "Two views", title: "One wave, two ways to sample it", text: [
          "At fixed t, observe E as z varies: after a distance λ the phase advances by 2π. At fixed z, observe E as t varies: after T the phase decreases by 2π and the field returns to the same state. The two small plots illustrate these respective samples.",
          "λ measures length; T measures time. Peak separation in a still spatial picture does not by itself reveal frequency unless propagation speed is also known."
        ] },
        { label: "Derivation 03", title: "Why is v=λ/T?", steps: [
          ["Choose a crest", "Keep its phase φ=kz−ωt constant."],
          ["Follow it", "Differentiation gives k dz−ω dt=0, hence dz/dt=ω/k."],
          ["Use definitions", "ω/k=(2π/T)/(2π/λ)=λ/T=λν."]
        ] },
        { label: "Example with units", title: "Monochromatic 600 nm light in vacuum", text: [
          "λ₀=600 nm=6.00×10⁻⁷ m. Take c≈3.00×10⁸ m/s. Then ν=c/λ₀≈5.00×10¹⁴ Hz and T=1/ν≈2.00×10⁻¹⁵ s.",
          "Also ⟦k₀=2π/λ₀≈1.05×10⁷⟧ rad/m and ⟦ω=2πν≈3.14×10¹⁵⟧ rad/s. Angular frequency differs from ordinary frequency by 2π: do not label rad/s as Hz."
        ] },
        { label: "Scope", title: "What changes on entering another medium?", text: [
          "At an ideal stationary interface, the transmitted frequency normally equals the incident frequency. If speed changes to v, wavelength changes to λ=v/ν. In a dispersive medium, v can depend on frequency.",
          "The diagram illustrates λ and T using scaled model units, not a real-time animation of approximately 10¹⁴ cycles per second."
        ] }
      ],
      questions: [
        { stem: "If λ doubles while propagation speed v stays fixed, what happens to frequency ν?", choices: ["It doubles", "It halves", "It stays unchanged"], explain: "From v=λν, with fixed v we have ν=v/λ. Doubling λ halves ν, while T=1/ν doubles. There are fewer crests per unit length, but the propagation direction does not change.", whyOther: "Doubling confuses direct and inverse proportionality. 'Unchanged' would require v also to change in just the right way, contrary to the stated fixed-v condition." },
        { stem: "For vacuum light with λ₀=500 nm, which frequency is closest?", choices: ["6×10¹⁴ Hz", "6×10⁸ Hz", "6×10⁻¹⁴ Hz"], explain: "Convert first: 500 nm=5×10⁻⁷ m. Then ν=c/λ₀≈(3×10⁸)/(5×10⁻⁷)=6×10¹⁴ Hz. The exponent follows from 8−(−7)=15 before dividing 3 by 5.", whyOther: "6×10⁸ resembles the order of the speed, not the frequency. 6×10⁻¹⁴ mistakenly treats division by 10⁻⁷ as multiplication by 10⁻⁷. Convert everything to meters and seconds first." },
        { stem: "At a stationary medium interface, frequency stays fixed but speed falls. What happens to wavelength inside?", choices: ["It gets shorter", "It gets longer", "It must remain unchanged"], explain: "At the same frequency ν, λ=v/ν. A smaller v therefore means a shorter λ; a changing wavelength does not require the light source to change its frequency at the interface.", whyOther: "Longer reverses the proportionality between v and λ. Unchanged wavelength confuses frequency continuity with wavelength continuity. This describes the usual stationary-interface case." }
      ]
    };
  const guide = {
    question: ["“隔多远重复一次”和“隔多久重复一次”，是同一个问题吗？", "Is repeating after a distance the same as repeating after a time?"],
    setup: ["上一节的余弦波既在空间排成波峰波谷，也在每个固定位置随时间振动。把拍照与录像分开，就不会把图上的峰间距误当成频率。", "The cosine wave has peaks and troughs across space, while each fixed position oscillates over time. Separate a photograph from a recording so peak spacing is not mistaken for frequency."],
    terms: [
      { name: ["波长 λ", "Wavelength λ"], meaning: ["同一张空间快照上，相邻同相位置的距离，单位 m。", "Distance between adjacent equal-phase positions in a spatial snapshot, measured in m."] },
      { name: ["周期 T / 频率 ν", "Period T / frequency ν"], meaning: ["盯住一个位置，重复一次所需时间叫 T；每秒重复次数叫 ν，单位 Hz。", "At one position, T is the time for one repeat; ν is repeats per second, measured in Hz."] },
      { name: ["相位的一圈", "One phase turn"], meaning: ["一次完整振动记作 2π rad；k、ω 分别把每米、每秒的变化改用这个角度单位表示。", "A full cycle is 2π rad. k and ω express phase change per metre and per second."] }
    ],
    observe: ["分别看空间图和时间图的横轴。先指出哪一幅能量 λ，哪一幅能量 T；注意同为峰间距，横轴单位不同就代表不同的量。", "Check the horizontal axes of the spatial and temporal plots. Which measures λ, and which T? The same-looking peak spacing means different things when the axis units differ."],
    blocks: [
      { title: ["先分开两个测量，再给它们角度记号", "Separate the two measurements before naming phase rates"], before: ["空间走过一个波长、时间经过一个周期，振动都回到原阶段，也就是相位转过一圈。因此每米多少弧度叫 k=2π/λ，每秒多少弧度叫 ω=2π/T。每秒完整周期数则是 ν=1/T。它们描述同一个波，但不是同一单位。", "One wavelength in space or one period in time returns the oscillation to its starting stage: a full phase turn. Thus k=2π/λ is radians per metre, ω=2π/T radians per second, and ν=1/T complete cycles per second. They describe one wave using different units."], read: ["例如 λ 变短，k 变大，意思是同样一米内波纹更密；T 变短，ν 和 ω 变大，意思是一个点振动更快。分清这两条轴后，我们才能把距离与时间连接成速度。", "A shorter λ means larger k: more closely spaced waves over a metre. A shorter T means larger ν and ω: faster oscillation at one point. With the two axes distinguished, we can connect them through speed."] },
      { title: ["一个周期里，波峰恰好前进一个波长", "A peak advances one wavelength in one period"], before: ["把上一节追踪波峰的方法接过来：在周期 T 之后，原波峰移动到原来下一个波峰的位置，前进距离是 λ。因此速度就是 λ 除以 T；用每秒周期数 ν 代替 1/T，就变成 λν。", "Use the peak-tracking idea from the previous section: after a period T, a peak reaches the former position of the next peak, a distance λ away. Speed is therefore λ/T, or λν when repeats per second replace 1/T."], read: ["ω/k 也是同一个速度，因为分子分母里的 2π 抵消。这三种写法是在用不同计数方式描述同一次前进，不是三条互不相关的公式。", "ω/k is the same speed: the two factors of 2π cancel. These are different counting conventions for the same motion, not three unrelated formulas."] },
      { title: ["把 600 nm 变成“每秒振动多少次”", "Turn 600 nm into oscillations per second"], before: ["刚才建立了速度=波长×频率，现在给真空波长与真空速度，就能求频率。先统一单位：600 nm 是 6.00×10⁻⁷ m；再用 c 除以这个长度。", "We have speed=wavelength×frequency. Given vacuum wavelength and vacuum speed, solve for frequency. First convert 600 nm to 6.00×10⁻⁷ m, then divide c by that length."], read: ["结果是约 5.00×10¹⁴ Hz，取倒数得到周期约 2.00×10⁻¹⁵ s。这里没有新规律，只是把刚才的一次重复关系用于真实单位；k、ω 也能从同一组数据换算。", "The result is about 5.00×10¹⁴ Hz, whose reciprocal gives T≈2.00×10⁻¹⁵ s. No new law was introduced; we applied the repeat relation using physical units. The same data also determine k and ω."] },
      { title: ["速度变了，同一振动节拍对应的波距也变", "A changed speed changes the spacing at a fixed rhythm"], before: ["用刚算过的关系再问：同一束光进入另一种材料，若时间节拍保持不变，但传播变慢，相邻波峰该更近还是更远？因为每周期前进得少，它们应更近。静止、不随时间变化的界面给出这个频率不变的条件，1.6.1 会解释原因。", "Apply the same relation to light entering another material. If its time rhythm stays fixed but it travels slower, should peaks move closer or farther apart? Less advance per period means closer peaks. A stationary time-invariant interface provides the fixed-frequency condition, explained in §1.6.1."], read: ["因此频率相同不代表波长相同；必须说明波长在哪种介质中。现在我们掌握了长度与时间的计数，下一节让传播方向不再局限于 z 轴。", "Equal frequency does not mean equal wavelength; always specify the medium. With the spatial and temporal scales understood, we can next let propagation point away from the z-axis."] }
    ],
    check: { question: ["同一频率的波速度减半，波长怎样变？不要直接背式子。", "At fixed frequency, speed halves. What happens to wavelength? Explain rather than quote a formula."], answer: ["每次重复所用时间不变，每周期只走原来一半的距离，因此相邻波峰间距也减半。", "The repeat time stays fixed, but a peak travels half as far per period. The distance between adjacent peaks therefore halves."] },
    next: ["带到 1.2.3：波长告诉我们波纹多密；波矢量还会告诉我们波纹朝哪边前进。", "Into §1.2.3: wavelength tells us how dense the pattern is; a wavevector will also tell us its travel direction."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.2.2"] = {
    ask: ["固定模型波长 λ，提高相速度 v，固定位置的周期 T 如何变化？", "At fixed model wavelength λ, increase phase speed v. What happens to the period T at one position?"],
    choices: [["变短", "It gets shorter"], ["不变", "It stays the same"], ["变长", "It gets longer"]], answer: 0,
    try: ["保持波长滑块不动，只调速度，对比上、下两条波形的刻度。", "Keep wavelength fixed; change only speed and compare the spatial and temporal plots."],
    why: ["固定 λ 时 T=λ/v。这里两滑块是教学模型参数，不能把改变 v 当成同一束光跨界面。", "At fixed λ, T=λ/v. These are model controls; changing v here is not a beam crossing an interface."]
  };
  const deepLab = {
    controls: [["speed", .6], ["speed", 1.6]],
    compare: ["波长滑块不动，比较两个速度下的时间周期；空间波形的间距变了吗？", "Leave wavelength fixed. Compare temporal periods at two speeds; does spatial spacing change?"],
    relation: ["这里把 λ 作为独立教学参数固定，所以 v 增大使 T=λ/v 缩短；不是同一束光跨界面。", "Here λ is held fixed as an independent model control, so increasing v shortens T=λ/v. This is not one beam crossing an interface."],
    formula: "T=\\frac{\\lambda}{v}",
    challenge: [["固定 λ，若模型速度变为原来的两倍，周期是多少？", "At fixed λ, if model speed doubles, what happens to period?"], [["两倍", "Twice"], ["一半", "Half"], ["不变", "Unchanged"]], 1],
  };
  deepLab.mistakes = [["固定 λ 时 T=λ/v；分母加倍不会使周期加倍。", "At fixed λ, T=λ/v; doubling the denominator does not double the period."], null, ["本图固定 λ 而非频率，不能直接套用跨界面同频条件。", "This model fixes λ, not frequency; do not apply a crossing-interface condition here."]];
  const [focus, limitQuestion, limitAnswer] = [["上图的 λ 是空间间距，下图的 T 是同一点的重复时间；本控件独立固定 λ。", "The top plot gives spatial λ and the bottom repeats in time T; this control fixes λ independently."], ["这幅固定 λ 的调速图等于同一光束跨静止界面吗？", "Does this fixed-λ speed control model one beam crossing a stationary interface?"], false];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.2.2"] = deepLab;
})();

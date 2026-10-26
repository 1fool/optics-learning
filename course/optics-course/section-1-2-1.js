/* Chapter 1, section 1.2.1: source, translation, and guided reading. */
(() => {
  const section = {
    code: "1.2.1", title: "波动方程的平面波解", pages: "7–8", pdf: 17, visual: "solution",
    overview: "先把三维问题缩成沿 z 传播的一维问题，辨认右行波、左行波和简谐特例。看清 z−vt 的符号，就不会把传播方向弄反。",
    bridge: { previous: "1.1 得到传播速度 v 与波动方程，但还没有写出具体波形。", current: "先解一维波动方程，借 z−vt 与 z+vt 辨认行波方向。", next: "1.2.2 从这些解中选出周期性简谐波，定义波长与周期。" },
    goals: ["解释 f(z−vt) 与 g(z+vt) 的运动方向", "把余弦解代回波动方程验证", "理解等相位面为何是平面"],
    symbols: [["z、t", "位置与时间", "m、s"], ["v", "相速度（在此理想介质中）", "m/s"], ["E₀、B₀", "电场和磁场的振幅", "V/m、T"], ["k、ω", "波数和角频率", "rad/m、rad/s"]],
    blocks: [
      { label: "从一维开始", title: "为什么是 z−vt？", text: [
        "沿 z 轴的一维波动方程允许右行的任意形状 f(z−vt)，也允许左行的 g(z+vt)。取右行脉冲的某个特征点 z−vt=C：时间增加 Δt，它的位置增加 vΔt，所以朝 +z 运动。",
        "两种行波的叠加仍满足线性波动方程。图中先用一个局域脉冲帮助辨认方向；书中的单色余弦平面波是右行解的一个特殊形状。"
      ], eq: [{ text: "∂²E/∂z² − (1/v²)∂²E/∂t² = 0", ref: "wave-equation" }, "E(z,t) = f(z−vt) + g(z+vt)"] },
      { label: "推导 02", title: "检验一个余弦波是否真是解", steps: [
        ["先明确方程", "1.1 推出的矢量波动方程，在只随 z 变化的电场分量上化为 ⟦∂²E/∂z²−(1/v²)∂²E/∂t²=0⟧。这里 v 是该理想介质中的相速度，不是要对 v 求导。"],
        ["提出候选", "令相位 φ=kz−ωt，取 ⟦E(z,t)=E₀cosφ⟧；E₀ 为非零常量，k>0、ω>0。先检验它是否满足上面的方程。"],
        ["对 z 求两次导", "保持 t 不变：⟦∂E/∂z=−kE₀sinφ⟧，再次求导得 ⟦∂²E/∂z²=−k²E₀cosφ=−k²E⟧。"],
        ["对 t 求两次导", "保持 z 不变：⟦∂E/∂t=+ωE₀sinφ⟧，再次求导得 ⟦∂²E/∂t²=−ω²E₀cosφ=−ω²E⟧。"],
        ["代入并约去场", "将两个二阶导数放回第一步的波动方程：⟦−k²E−(1/v²)(−ω²E)=(−k²+ω²/v²)E=0⟧。要让非零波在任意位置和时间成立，须有 ⟦ω²=v²k²⟧；由 k、ω、v>0 得 ⟦ω/k=v⟧。"],
        ["读出波面", "固定时刻、固定相位 ⟦kz−ωt=C⟧ 给出 z=常数；在三维空间这是一整张垂直 z 轴的平面。"]
      ], eq: ["∂²E/∂z² − (1/v²)∂²E/∂t² = 0", "E(z,t) = E₀ cos(kz−ωt)", { text: "v = ω/k", ref: "phase-speed" }] },
      { label: "防止误解", title: "“平面”修饰波面，不是电场只在一张纸上", text: [
        "理想平面波在每一张垂直传播方向的等相位面上具有相同相位；它是数学上无限延伸的模型。图中的截面只展示局部，不表示真实光束有无限能量。",
        "本章后面会用麦克斯韦方程约束 E₀ 和 B₀；此处先把同相的余弦写出来，并不意味着两个振幅可以独立任取。"
      ], eq: ["z−vt = 常数　⇒　右行；　z+vt = 常数　⇒　左行"] }
    ],
    questions: [
      { stem: "一个脉冲保持 f(z−vt) 的形状不变。经过 Δt，它的特征点往哪里移动？", choices: ["+z，距离 vΔt", "−z，距离 vΔt", "停在原处"], answer: 0, explain: "固定脉冲上的某个标记 z−vt=C，可得 z=C+vt。t 增大 Δt，z 增大 vΔt。", whyOther: "−z 对应的是 z+vt=C；“停在原处”混淆了固定观察位置与跟着波形上的特征点移动。这里 v>0。" },
      { stem: "把 E₀cos(kz−ωt) 代入一维波动方程后，k、ω 与 v 的关系是？", choices: ["ω=vk", "ω=k/v", "ω 与 k 无关"], answer: 0, explain: "空间二阶导数为 −k²E，时间二阶导数为 −ω²E。代入 ∂²E/∂z²−(1/v²)∂²E/∂t²=0，得到 −k²+ω²/v²=0；取正频率和正波数，ω=vk。", whyOther: "ω=k/v 把速度移项方向弄反，而且单位也不对；ω 与 k 无关则不能保证候选波形满足该介质的波动方程。" },
      { stem: "在某一固定时刻，沿 +z 传播的平面波的等相位面是什么？", choices: ["z=常数的平面", "仅有 z 轴上的一点", "总与 z 轴平行的平面"], answer: 0, explain: "相位 kz−ωt=C。在给定 t 时，z=(C+ωt)/k 为常数，而 x、y 可取不同值，所以构成垂直 z 轴的平面。", whyOther: "“一点”忽略了横向的全部 x、y 位置；“平行 z 轴的平面”把波面与传播方向颠倒。示意图中的线只是三维波面的截面。" }
    ]
  };
  const translation = {
      title: "Plane-wave solutions of the wave equation",
      overview: "Reduce the three-dimensional problem to propagation along z. Identify right- and left-traveling waves and the harmonic special case. The sign in z−vt determines the direction.",
      bridge: { previous: "§1.1 produced a wave equation and speed v, but not a particular waveform.", current: "Solve the one-dimensional equation and use z−vt and z+vt to identify traveling-wave directions.", next: "§1.2.2 selects periodic harmonic waves from these solutions and defines wavelength and period." },
      goals: ["Explain the directions of f(z−vt) and g(z+vt)", "Verify a cosine solution by substitution", "Explain why equal-phase surfaces are planes"],
      symbols: [["z, t", "position and time", "m, s"], ["v", "phase speed in this ideal medium", "m/s"], ["E₀, B₀", "electric and magnetic amplitudes", "V/m, T"], ["k, ω", "wavenumber and angular frequency", "rad/m, rad/s"]],
      blocks: [
        { label: "Start in one dimension", title: "Why z−vt?", text: [
          "The one-dimensional wave equation admits a right-traveling shape f(z−vt) and a left-traveling shape g(z+vt). Track a marked point on the right-traveling pulse: z−vt=C. After Δt, its position increases by vΔt, so it moves toward +z.",
          "Because the equation is linear, the two traveling waves can be superposed. The diagram first uses a localized pulse to show direction; the monochromatic cosine wave in the book is a special right-traveling shape."
        ] },
        { label: "Derivation 02", title: "Verify that a cosine is a solution", steps: [
          ["State the equation", "The vector wave equation derived in §1.1 reduces, for an electric-field component varying only with z, to ⟦∂²E/∂z²−(1/v²)∂²E/∂t²=0⟧. Here v is the phase speed in this ideal medium; we do not differentiate v."],
          ["Propose a field", "Let φ=kz−ωt and ⟦E(z,t)=E₀cosφ⟧, with constant nonzero E₀ and k>0, ω>0. We now check it against the equation above."],
          ["Differentiate twice in z", "Hold t fixed: ⟦∂E/∂z=−kE₀sinφ⟧; differentiating again gives ⟦∂²E/∂z²=−k²E₀cosφ=−k²E⟧."],
          ["Differentiate twice in t", "Hold z fixed: ⟦∂E/∂t=+ωE₀sinφ⟧; differentiating again gives ⟦∂²E/∂t²=−ω²E₀cosφ=−ω²E⟧."],
          ["Substitute and cancel", "Put both second derivatives back into the first equation: ⟦−k²E−(1/v²)(−ω²E)=(−k²+ω²/v²)E=0⟧. For a nonzero wave to satisfy it at every point and time, ⟦ω²=v²k²⟧; because k, ω and v are positive, ⟦ω/k=v⟧."],
          ["Read the wavefront", "At fixed time, fixed phase ⟦kz−ωt=C⟧ gives constant z. In three dimensions this is an entire plane perpendicular to the z-axis."]
        ] },
        { label: "Avoid a misconception", title: "'Plane' describes the wavefront, not a field confined to a sheet", text: [
          "An ideal plane wave has the same phase everywhere on each plane perpendicular to propagation. It extends infinitely in the mathematical model. The diagram shows a local cross-section, not a physical beam with infinite energy.",
          "Later Maxwell's equations constrain E₀ and B₀. Writing cosines with matching phases here does not mean their amplitudes are freely independent."
        ] }
      ],
      questions: [
        { stem: "A pulse keeps the shape f(z−vt). Where does a marked point move after Δt?", choices: ["Toward +z by vΔt", "Toward −z by vΔt", "It stays fixed"], explain: "Follow a fixed feature of the pulse: z−vt=C, or z=C+vt. Increasing t by Δt increases z by vΔt.", whyOther: "Motion toward −z corresponds to z+vt=C. 'Fixed' confuses a stationary observation point with a feature moving with the waveform. Here v>0." },
        { stem: "Substituting E₀cos(kz−ωt) into the one-dimensional wave equation gives which relation?", choices: ["ω=vk", "ω=k/v", "ω is independent of k"], explain: "The second derivatives are −k²E and −ω²E. Substitution into ∂²E/∂z²−(1/v²)∂²E/∂t²=0 yields −k²+ω²/v²=0; for positive k and ω, ω=vk.", whyOther: "ω=k/v moves the speed incorrectly and has the wrong units. Independent ω and k would not generally satisfy the wave equation in this medium." },
        { stem: "At fixed time, what is an equal-phase surface of a plane wave traveling along +z?", choices: ["A plane with constant z", "A single point on the z-axis", "A plane necessarily parallel to the z-axis"], explain: "Set kz−ωt=C. For fixed t, z=(C+ωt)/k is constant while x and y can vary, forming a plane perpendicular to z.", whyOther: "A single point ignores all transverse x,y positions. A plane parallel to z reverses the relation between wavefront and propagation direction. A line in a diagram is only a section of the full plane." }
      ]
    };
  const guide = {
    question: ["一张波形照片，怎样写成会向前移动的函数？", "How do we turn a snapshot of a wave into a moving function?"],
    setup: ["上一节告诉我们电磁扰动能够以速度 v 传播。现在不再讨论整片空间，先只看一条 z 轴：选波包上的一个凸起当记号，过一会儿它在哪里？搞清这个问题，才有必要写行波函数。", "The previous section gave a propagation speed v. Now restrict attention to a z-axis. Mark a bump on a pulse: where is it a moment later? We answer that before introducing a travelling-wave function."],
    terms: [
      { name: ["z、t", "z, t"], meaning: ["z 是沿选定直线的位置，t 是观察时刻；它们不是同一个自变量。", "z is position along the chosen line; t is observation time. They are independent variables."] },
      { name: ["波形 / 振幅", "Shape / amplitude"], meaning: ["波形是不同位置的场值怎样排列；振幅是振动能达到的最大幅度，不是传播距离。", "A shape is the arrangement of field values over position. Amplitude is the size of the oscillation, not the travel distance."] },
      { name: ["方程的解", "Solution of an equation"], meaning: ["给出一种场的时空变化，把它代回规则后每处都成立，就叫满足方程的解。", "A field pattern that satisfies the equation at every relevant position and time."] }
    ],
    observe: ["先盯住右行脉冲的最高点，播放一小段时间再暂停。它应向 +z 移动，而不是只在原地变高；再比较左行脉冲。", "Follow the peak of the right-going pulse, play briefly, then pause. It should move toward +z, not merely grow at one location. Compare the left-going pulse."],
    blocks: [
      { title: ["保持同一个凸起，位置就必须随时间增加", "Track one bump: its position must increase with time"], before: ["刚才在图中跟的是同一个波形特征，不是固定的观察点。设它起初位于 z=0，以正速度 v 右行，则 t 秒后在 z=vt。把等式移项得到 z−vt=0；同一波形上的其他点只把右边换成别的常数。于是让函数只依赖 z−vt，就能让整条形状一起平移。", "We followed the same feature, not a fixed observer. Starting at z=0 and moving right at positive speed v puts it at z=vt after time t. Rearrange to z−vt=0. Other features have other constants, so a function of z−vt shifts the whole shape together."], read: ["f 是你选定的形状，不是一种新的物理量。f(z−vt) 右行，g(z+vt) 左行；在当前线性模型里，两者可以相加。上面的波动方程是它们必须满足的检查规则，下一步挑一种余弦形状来检查。", "f names a chosen shape, not a new physical quantity. f(z−vt) moves right; g(z+vt) moves left. They may be added in this linear model. The wave equation above is the test they must pass. Next we test a particular cosine shape."] },
      { title: ["选一个周期形状，再检验它是否遵守传播规则", "Choose a periodic shape and test the propagation rule"], before: ["任意脉冲有助于看方向；持续重复的光波更适合用余弦表示。E₀ 决定最大幅度，相位 kz−ωt 告诉我们处在振动周期的哪一步；k 控制沿距离变化多快，ω 控制随时间变化多快。1.1 已把 ∇² 缩为沿 z 的二阶导数，这里先把那个一维方程摆出来，再检验余弦是否满足它。", "Pulses make direction clear; a repeating optical wave is conveniently represented by a cosine. E₀ sets its maximum size; phase kz−ωt specifies the stage in the cycle. k controls variation over distance and ω over time. Section 1.1 reduced ∇² to a second derivative along z; we first recall that equation, then test the cosine against it."], eqLead: [
        ["这是上一节得到的检查规则：空间二阶导数减去时间二阶导数的 1/v² 倍，必须为零。", "This is the test from §1.1: spatial curvature minus time curvature weighted by 1/v² must vanish."],
        ["现在提出候选波形，暂不把它当成自动成立的解。", "Now propose a candidate shape, not an automatically valid solution."],
        ["对候选式分别求两次导，得到空间项 −k²E、时间项 −ω²E；代回上一式，非零波要求 ω²=v²k²。取正的 k、ω、v 后得到：", "Two derivatives give −k²E in space and −ω²E in time. Substitution requires ω²=v²k² for a nonzero wave. For positive k, ω and v, this yields:"]
      ], read: ["所以 ω/k=v 不是另加的规定，而是候选波形通过这条方程检验的条件。完整的一阶、二阶求导及代入过程在下方；下一节把 k、ω 换成波长和周期。", "Thus ω/k=v is the condition for the candidate to pass the equation, not an extra rule. Expand the first and second derivatives and substitution below; the next section relates k and ω to wavelength and period."] },
      { title: ["把一条截面补回三维，才看懂“平面波”", "Restore the third dimension to understand a plane wave"], before: ["已经知道波沿 z 走，再问同一个 z 处的其他横向位置如何。理想模型让这些位置在同一时刻处于相同的振动阶段，连接起来就是垂直 z 轴的一张平面，叫等相位面或波面。图上看到的一条线只是这张面的截面。", "We know the wave moves along z. What about other transverse positions at the same z? In the ideal model, they share the same oscillation stage at a given time. Together they form a plane perpendicular to z: an equal-phase surface or wavefront. A line in the diagram is only its cross-section."], read: ["所以“平面”说的是波面的形状，不是光只存在于一张纸上。先会跟踪波形和辨认波面，再给重复的距离、时间各取一个名字，就自然进入波长与周期。", "Thus plane describes the wavefront, not a restriction of light to a sheet of paper. After learning to track a shape and recognize its front, we can name its repeat distance and repeat time."] }
    ],
    check: { question: ["对 f(z−vt)，为什么 t 增大时不是向 −z 走？", "Why does f(z−vt) not travel toward −z as t increases?"], answer: ["跟踪同一个特征就要保持括号不变。t 增大使 −vt 减小，z 必须增大来补偿，所以特征点向 +z 走。", "Following the same feature means keeping the argument constant. As −vt decreases, z must increase to compensate. The feature therefore travels toward +z."] },
    next: ["带到 1.2.2：我们会描述“移动”，接下来用长度和时间给这种周期性移动定量。", "Into §1.2.2: we can describe motion. Next we measure its repetition in space and time."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.2.1"] = {
    ask: ["保持脉冲宽度，切换传播方向后，同一峰会往哪里移动？", "Keep pulse width fixed and reverse direction. Where does the same peak move?"],
    choices: [["只改变高度，不改变方向", "Only its height changes"], ["始终向 +z", "Always toward +z"], ["改为向 −z", "It moves toward −z"]], answer: 2,
    try: ["切换方向并播放或单看图上的 z∓vt 标签；浅线是起始位置。", "Switch direction and watch the pulse or compare its z∓vt label; the pale curve is its initial position."],
    why: ["保持 z+vt 不变时，t 增大要求 z 减小；改变自变量的号才改变传播方向，不是改变峰值。", "Holding z+vt constant as t grows requires z to fall. The sign in the argument changes direction, not peak height."]
  };
  const deepLab = {
    controls: [["direction", 1], ["direction", -1]],
    compare: ["保留宽度，只把方向从 +z 切到 −z：同一峰的高度变了吗？", "Keep width fixed and reverse +z to −z. Did the peak height change?"],
    relation: ["固定相同的自变量值，z−vt 向 +z 走；z+vt 向 −z 走。变号不等于变幅。", "Track a fixed argument: z−vt travels toward +z; z+vt toward −z. Reversing direction does not change amplitude."],
    formula: "f(z-vt)\\to +z,\\qquad g(z+vt)\\to -z",
    challenge: [["在 t 增大时维持 z+vt 不变，z 应如何变化？", "As t grows while z+vt stays fixed, what happens to z?"], [["增大", "Increase"], ["减小", "Decrease"], ["不变", "Stay fixed"]], 1],
  };
  deepLab.mistakes = [["若 z+vt 固定，t 增大只能由 z 减小来抵消。", "If z+vt stays fixed, increasing t must be offset by decreasing z."], null, ["追踪的是同一峰，不是固定在同一个坐标位置。", "We track the same peak, not a fixed coordinate."]];
  const [focus, limitQuestion, limitAnswer] = [["沿浅色起点追踪同一个峰，别把固定坐标处的值当作峰位置。", "Track one peak from the pale starting curve; a fixed-coordinate value is not peak position."], ["仅改变脉冲宽度，就能把右行变成左行吗？", "Can width alone reverse a right-going pulse?"], false];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.2.1"] = deepLab;
})();

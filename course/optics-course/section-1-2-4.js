/* Chapter 1, section 1.2.4: source, translation, and guided reading. */
(() => {
  const section = {
    code: "1.2.4", title: "复数形式的波函数", pages: "9–10", pdf: 19, visual: "phasor",
    overview: "复数表示把余弦与正弦计算合在一起，但真实电场仍是实部。转动的相量及其水平投影，使欧拉公式不再只是符号技巧。",
    bridge: { previous: "1.2.3 已确定任意方向的相位 k·r−ωt；直接处理三角函数求导较繁。", current: "把实场写成复指数的实部，计算时简化导数与相位。", next: "1.2.5 将复指数分成空间复振幅和共同的时间因子。" },
    goals: ["从欧拉公式恢复真实电场", "辨认本书 exp[i(k·r−ωt)] 的符号约定", "理解微分变成乘 ik 或 −iω 的便利"],
    symbols: [["i", "虚数单位，i²=−1", "无"], ["Ẽ", "复表示，不是直接可测的场", "V/m", "算例：2 exp(iπ/3)"], ["Re", "取复数的实部", "算符", "算例：Re(Ẽ)=1 V/m"], ["φ", "k·r−ωt", "rad", "算例：π/3"]],
    blocks: [
      { label: "原理", title: "相量的投影就是余弦", text: [
        "欧拉公式 exp(iφ)=cosφ+i sinφ。若振幅 A 为实向量，Re[A exp(iφ)]=A cosφ。复数的虚部在计算中有用，却不是“另一个真实电场”。",
        "本书使用空间因子 exp(i k·r)、时间因子 exp(−iωt) 的约定。也可以整体采用相反号，只要从头到尾一致，不能把两套约定拼接。"
      ], eq: [{ text: "Ẽ(r,t) = A exp[i(k·r−ωt)]", ref: "complex-wave" }, "E_{物理} = Re[Ẽ]"] },
      { label: "推导 05", title: "复记号为什么省事？", steps: [
        ["空间求导", "对 exp[i(k·r−ωt)] 作梯度，得到 i k exp[i(k·r−ωt)]。"],
        ["时间求导", "对同一因子求时间导数，得到 −iω exp[i(k·r−ωt)]。"],
        ["代回物理量", "在复数域先处理线性的微分方程，最终取 Re 得到实际的时间依赖电场。"]
      ], eq: ["∇exp(iφ) = i k exp(iφ)；　∂Ẽ/∂t = −iω Ẽ"], note: "这里 φ=k·r−ωt。对矢量场取旋度时应写 ∇×Ẽ=i k×Ẽ，而不是把矢量场的梯度误写为普通向量。" },
      { label: "算一遍", title: "相位 φ=π/3 时场是多少？", text: [
        "若标量分量的振幅为 2 V/m，复表示为 ⟦2 exp(iπ/3)=1+i√3⟧ V/m，取实部得实际电场分量 1 V/m。",
        "复数表示不是额外叠加的物理光束；计算结果中需要真实场时必须写出 Re。"
      ], eq: ["Re[2 exp(iπ/3)] = 2 cos(π/3) = 1 V/m"] }
    ],
    questions: [
      { stem: "若 Ẽ=2 exp(iπ/3) V/m，实际场的该分量是多少？", choices: ["1 V/m", "2 V/m", "√3 V/m"], answer: 0, explain: "先展开：exp(iπ/3)=cos(π/3)+i sin(π/3)=1/2+i√3/2。乘以 2 后实部为 1 V/m。", whyOther: "2 是复振幅的模，不是这个相位下的瞬时实场；√3 是虚部数值。相量箭头长度、水平投影和竖直投影是不同量。" },
      { stem: "采用 exp[i(kz−ωt)] 约定时，时间微分给指数因子乘上什么？", choices: ["+iω", "−iω", "+k"], answer: 1, explain: "指数的时间部分为 −iωt，链式法则给 ∂exp[i(kz−ωt)]/∂t=−iω exp[i(kz−ωt)]。", whyOther: "+iω 属于 exp(+iωt) 的另一种时间约定；k 是空间波数，出现在 z 求导或空间梯度中，不能替代时间导数的 ω。" },
      { stem: "复场 Ẽ 的虚部应怎样理解？", choices: ["直接当成另一股磁场", "是计算表示的一部分，实际 E 取实部", "所有时候都必须为零"], answer: 1, explain: "复指数同时存放 cos 和 sin，方便微分与相位运算。它的虚部通常不为零；实际场在本约定中由 Re(Ẽ) 给出。", whyOther: "B 是另一个满足麦克斯韦方程的物理场，并不是 Ẽ 的虚部；为了表示正弦相位，虚部常常需要非零，也无需强迫其消失。" }
    ]
  };
  const translation = {
      title: "Complex representation of the wave function",
      overview: "Complex notation packages sine and cosine together, but the physical electric field remains the real part. A rotating phasor and its horizontal projection make Euler's formula tangible.",
      bridge: { previous: "§1.2.3 supplied the phase k·r−ωt for any direction, but differentiating trigonometric functions repeatedly is cumbersome.", current: "Represent the real field as the real part of a complex exponential to simplify phase and derivatives.", next: "§1.2.5 separates the complex wave into a spatial amplitude and a shared time factor." },
      goals: ["Recover the physical electric field using Euler's formula", "Recognize the exp[i(k·r−ωt)] sign convention used here", "Understand why derivatives become factors ik or −iω"],
      symbols: [["i", "imaginary unit, i²=−1", "dimensionless"], ["Ẽ", "complex representation, not directly measurable", "V/m", "Example: 2 exp(iπ/3)"], ["Re", "real-part operator", "operator", "Example: Re(Ẽ)=1 V/m"], ["φ", "phase k·r−ωt", "rad", "Example: π/3"]],
      blocks: [
        { label: "Principle", title: "The phasor's projection is a cosine", text: [
          "Euler's formula is exp(iφ)=cosφ+i sinφ. For a real amplitude vector A, Re[A exp(iφ)]=A cosφ. The imaginary part helps calculations but is not a second physical electric field.",
          "Our convention uses the spatial factor exp(i k·r) and time factor exp(−iωt). The opposite overall convention is also valid if used consistently; do not mix the two."
        ] },
        { label: "Derivation 05", title: "Why does complex notation save work?", steps: [
          ["Differentiate in space", "The gradient of exp[i(k·r−ωt)] is i k exp[i(k·r−ωt)]."],
          ["Differentiate in time", "The time derivative of the same factor is −iω exp[i(k·r−ωt)]."],
          ["Return to a physical quantity", "Solve linear differential equations using complex quantities, then take Re to recover the time-dependent physical field."]
        ], note: "Here φ=k·r−ωt. For a vector field, write ∇×Ẽ=i k×Ẽ for the curl; do not treat the vector-field gradient as an ordinary vector." },
        { label: "Worked example", title: "What is the field at phase φ=π/3?", text: [
          "For a scalar component with amplitude 2 V/m, the complex expression is ⟦2 exp(iπ/3)=1+i√3⟧ V/m. Its real part is the physical component 1 V/m.",
          "A complex representation is not an extra physical light beam. Whenever a physical field is requested, take the real part."
        ] }
      ],
      questions: [
        { stem: "If Ẽ=2 exp(iπ/3) V/m, what is the corresponding physical field component?", choices: ["1 V/m", "2 V/m", "√3 V/m"], explain: "Expand exp(iπ/3)=cos(π/3)+i sin(π/3)=1/2+i√3/2. Multiplying by 2 gives a real part of 1 V/m.", whyOther: "2 is the magnitude of the complex amplitude, not the instantaneous real field at this phase. √3 is the imaginary part. Phasor length and its horizontal and vertical projections differ." },
        { stem: "With the convention exp[i(kz−ωt)], what factor does time differentiation produce?", choices: ["+iω", "−iω", "+k"], explain: "The time-dependent exponent is −iωt. By the chain rule, ∂exp[i(kz−ωt)]/∂t=−iω exp[i(kz−ωt)].", whyOther: "+iω comes from the alternate exp(+iωt) time convention. k is a spatial wavenumber; it appears with spatial derivatives, not in place of ω for a time derivative." },
        { stem: "How should the imaginary part of a complex electric field Ẽ be understood?", choices: ["As another magnetic field", "As part of the calculation; the physical E is the real part", "It must always be zero"], explain: "The complex exponential stores cosine and sine together, simplifying derivatives and phase operations. Its imaginary part is generally nonzero; in this convention the physical field is Re(Ẽ).", whyOther: "B is a separate physical field constrained by Maxwell's equations, not the imaginary part of Ẽ. Nonzero imaginary components are useful for representing sine-phase behavior." }
      ]
    };
  const guide = {
    question: ["为什么讲真实的光，却要用到虚数？", "Why use imaginary numbers for real light?"],
    setup: ["前面每次都要计算一个余弦。现在想象一支等长箭头在平面内转动：箭头在横轴上的投影正好像余弦那样变化。用两个坐标保存这支箭头，既能记住幅度，也能记住相位；最后只取横向投影就回到真实场。", "So far we repeatedly evaluated cosines. Imagine a constant-length arrow rotating in a plane: its horizontal projection varies as a cosine. Two coordinates store its amplitude and phase together. Taking the horizontal projection returns the real field."],
    terms: [
      { name: ["i / 复数", "i / complex number"], meaning: ["i²=−1；a+ib 用两个数记录平面中的点，实部为 a，虚部为 b。", "i²=−1. a+ib stores a point with two coordinates; a is its real part, b its imaginary part."] },
      { name: ["相量", "Phasor"], meaning: ["用箭头长度记录幅度、用转角记录相位的计算图像，不是另一束光。", "A computational arrow storing amplitude as length and phase as angle, not another beam of light."] },
      { name: ["Re / exp(iφ)", "Re / exp(iφ)"], meaning: ["Re 表示取实部；exp(iφ)=cosφ+i sinφ 是单位转动箭头的简洁记号。", "Re means take the real part; exp(iφ)=cosφ+i sinφ compactly represents a unit rotating arrow."] }
    ],
    observe: ["调整相位，看箭头的横向投影。箭头转到一圈的四分之一时，长度没变，但投影为零；这就是为什么相位与场值不能混为一谈。", "Change phase and watch the horizontal projection. After a quarter-turn the arrow still has the same length, but its projection is zero. Phase and field value are different quantities."],
    blocks: [
      { title: ["把余弦藏进转动箭头，最后再取投影", "Store the cosine in an arrow and take its projection at the end"], before: ["刚才的图把“长度”和“转到哪里”同时存了下来。现在用复数记号写同一件事：A 乘 exp(iφ) 是长度由 A 决定、转角为 φ 的相量。光的实际场仍是它的实部，波浪号只是提醒这是复表示。", "The figure stores length and angle together. In complex notation, A times exp(iφ) is a phasor with size set by A and angle φ. The physical field remains its real part; the tilde only marks a complex representation."], read: ["这里的 φ 仍是上一节的空间相位减时间相位，并没有变成一种新的物理量。虚部帮助记账，最终实场并不是“实部和虚部的两束光相加”。", "φ is still spatial phase minus temporal phase from the previous section, not a new physical quantity. The imaginary part helps bookkeeping; the real field is not a sum of separate real and imaginary beams."] },
      { title: ["换记号的收益：复杂求导变成简单乘法", "The payoff: derivatives become simple multiplications"], before: ["如果只是算一个点，余弦已经够用。复数真正方便的地方在后续求导：同一指数因子求时间导数后，仍保留原来的形状，只多乘 −iω；空间求导同理出现 i k。这样处理线性方程比反复展开正弦余弦更省事。", "For one point, a cosine is enough. Complex notation pays off in derivatives: a time derivative preserves the exponential's shape and multiplies it by −iω; a spatial derivative gives i k. Linear equations then need less repeated sine/cosine algebra."], read: ["初读记住使用顺序：用复数做线性计算 → 需要真实场时取实部。对能量这类平方量，不能直接把复数平方当答案，1.4.3 会说明正确方法。求导细节可以按需展开。", "Retain the workflow: calculate linearly with complex quantities, then take the real part for the physical field. For squared quantities such as energy, simply squaring a complex field is not the answer; §1.4.3 explains why. The derivatives are optional below."], advanced: true },
      { title: ["用一个 60° 转角，把复数还原成场值", "Use a 60° angle to recover an actual field value"], before: ["现在检验自己是否真的会读投影。振幅取 2 V/m，相位是 π/3，也就是 60°。横向投影等于长度乘 cos60°，而 cos60°=1/2。", "Check the projection interpretation: choose amplitude 2 V/m and phase π/3, or 60°. The horizontal projection is length times cos60°, and cos60°=1/2."], read: ["实际场分量是 1 V/m，不是复数的模 2 V/m，也不是虚部 √3 V/m。幅度、相位、瞬时场值现在有了清楚分工；下一节把共同的时间转动单独拆出来。", "The actual field component is 1 V/m—not magnitude 2 V/m or imaginary coordinate √3 V/m. Amplitude, phase and instantaneous value now have distinct roles. Next we factor out the shared time rotation."] }
    ],
    check: { question: ["相量的长度一直不变，为什么真实电场仍会变？", "If phasor length stays fixed, why can the real electric field change?"], answer: ["真实场取的是横轴投影。转角变了，投影就变，即使箭头长度没有改变。", "The real field is a projection. Changing angle changes that projection even when the arrow length stays fixed."] },
    next: ["带到 1.2.5：每个位置的相量都随同一个时间节拍转动，能否只保存各处的长度和起始转角？", "Into §1.2.5: if all positions share one time rhythm, can we store only their lengths and starting angles?"]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.2.4"] = {
    ask: ["只改变初相位 φ₀，实场投影与复相量长度分别怎样？", "Change only initial phase φ₀. What changes in the real projection and phasor length?"],
    choices: [["投影改变，长度保持", "Projection changes; length stays fixed"], ["两者都归零", "Both become zero"], ["长度改变，投影保持", "Length changes; projection stays fixed"]], answer: 0,
    try: ["固定振幅，只转相位，比较箭头长度与实轴上的投影。", "Hold amplitude fixed, rotate phase and compare arrow length with its real-axis projection."],
    why: ["乘上单位模的相位因子只转动复相量；真实余弦场取它的实部，投影因此变化。", "A unit-magnitude phase factor rotates the phasor without changing its length; the physical cosine is its real projection."]
  };
  const deepLab = {
    controls: [["phase", 0], ["phase", 90]],
    compare: ["振幅滑块不动，把相位转过 90°：箭头长度和实轴投影哪个改变？", "Keep amplitude fixed, rotate phase by 90°: does arrow length or real projection change?"],
    relation: ["单位模复指数只改变相量方向，实场取实部，因此投影随相位变化。", "A unit-modulus complex exponential changes phasor direction, not length. Taking the real part changes its projection."],
    formula: "E=\\operatorname{Re}\\{A_0 e^{i\\varphi}\\}=A_0\\cos\\varphi",
    challenge: [["A₀ 固定，相量转半周后，长度会怎样？", "A₀ fixed, after a half-turn, what happens to phasor length?"], [["变成零", "It vanishes"], ["保持 A₀", "It remains A₀"], ["变成 2A₀", "It doubles"]], 1],
  };
  deepLab.mistakes = [["旋转复相量只改变方向；A₀ 是箭头长度，不会随旋转归零。", "Rotating a phasor changes direction; its length A₀ does not vanish."], null, ["半周改变投影符号，不会凭空增加相量模。", "A half-turn reverses the projection, not the phasor magnitude."]];
  const [focus, limitQuestion, limitAnswer] = [["把相量长度与红色实轴投影分别对上 A₀ 和 E。", "Match phasor length to A₀ and its real-axis projection to E."], ["复相量的虚部也是另一条可直接测得的实电场吗？", "Is the imaginary component another directly measured real electric field?"], false];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.2.4"] = deepLab;
})();

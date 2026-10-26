/* Chapter 1, section 1.1: source, translation, and guided reading. */
(() => {
  const section = {
    code: "1.1", title: "光的电磁波性质", pages: "3–6", pdf: 13, visual: "maxwell",
    overview: "从四条麦克斯韦方程、物质方程和无源波动方程，走到光的传播速度。先分清 E、B、D、H，再理解“光是电磁波”究竟意味着什么。",
    bridge: { previous: "这是本章起点：先认识描述光所需的电磁场语言。", current: "用麦克斯韦方程和介质条件建立波动方程，得到传播速度。", next: "有了波动方程，1.2.1 才能讨论它的平面波解和传播方向。" },
    goals: ["说出四条方程各自约束了什么", "从旋度方程推到电场波动方程", "区分真空速度 c 与介质速度 v"],
    symbols: [["E", "电场强度", "V/m"], ["B", "磁感应强度", "T"], ["D", "电位移矢量", "C/m²"], ["H", "磁场强度", "A/m"], ["ε、μ", "绝对介电常数、绝对磁导率", "F/m、H/m", "算例：εᵣ=2.25、μᵣ=1"], ["ρ、J", "自由电荷密度、自由电流密度", "C/m³、A/m²", "推导：ρ=0、J=0"], ["c、v", "真空速度、介质相速度", "m/s", "c≈3.00×10⁸；算例 v≈2.00×10⁸"]],
    blocks: [
      { label: "建立语言", title: "四条方程不是四种独立的波", text: [
        "∇·D=ρ 描述电通量的源；∇·B=0 表示不存在孤立的磁荷。∇×E=−∂B/∂t 表示变化的磁通与环绕电场有关；∇×H=J+∂D/∂t 把传导电流和位移电流都纳入磁场的旋度。",
        "积分形式对应穿过闭合面或围绕闭合曲线的总量；微分形式对应一点附近的局部关系。书页 3–4 给出两种形式。E 和 B 是场，D 和 H 用于描述介质响应；它们不能随意互换。"
      ], eq: [
        "微分式：∇·D = ρ；　∇·B = 0",
        "微分式：∇×E = −∂B/∂t；　∇×H = J + ∂D/∂t",
        "积分式：∯ D·dS = Q_{自由}；　∯ B·dS = 0",
        "积分式：∮ E·dl = −d/dt ∫ B·dS；　∮ H·dl = I_{自由} + d/dt ∫ D·dS"
      ], note: "闭合曲线与曲面取相容的右手方向；图示只标旋度耦合，不把“E 先产生 B，B 再产生 E”当作有时间先后的机械循环。" },
      { label: "补齐条件", title: "物质方程让方程组闭合", text: [
        "对线性、均匀、各向同性的理想介质，可写 D=εE、B=μH。ε 与 μ 是介质参数；真空取 ε₀、μ₀。导电介质还常写 J=σE，但接下来的无耗散平面波推导取 ρ=0、J=0。",
        "若 ε、μ 随位置或频率变化，或介质各向异性、吸收明显，就不能把下面的标量 ε、μ 和简单速度关系原封不动套用。"
      ], eq: ["D = εE；　B = μH；　（导电时）J = σE"] },
      { label: "推导 01", title: "从旋度方程得到波动方程", steps: [
        ["设定", "均匀无源且不导电：ρ=0、J=0，ε、μ 为常数。于是 ∇×H=ε∂E/∂t，∇·E=0。"],
        ["再取旋度", "对 ∇×E=−∂B/∂t 两边取旋度，并用 B=μH：∇×(∇×E)=−με∂²E/∂t²。"],
        ["化简", "恒等式 ∇×(∇×E)=∇(∇·E)−∇²E；由于 ∇·E=0，左侧化为 −∇²E。"],
        ["结果与系数", "左右两边都是负号，消去后得 ∇²E−εμ∂²E/∂t²=0。把时间二阶项前的系数写成 1/v²，令 1/v²=εμ；ε、μ 为正且 v 取正，故 v=1/√(εμ)。这就是此模型的传播速度，不是从 ∇² 符号直接读出的数。"],
        ["只看一条轴", "对 E 的某个分量，∇²E 是它对 x、y、z 的三个空间二阶导数之和。若该分量不随 x、y 变化，前两项为零，只剩 ∂²E/∂z²；下一节检验沿 z 走的波形。"]
      ], eq: ["∇²E − εμ∂²E/∂t² = 0", "v = 1/√(εμ)", "∇²E − (1/v²)∂²E/∂t² = 0", { text: "∂²E/∂z² − (1/v²)∂²E/∂t² = 0", ref: "wave-equation" }] },
      { label: "算一遍", title: "同一种频率，换介质后速度是多少？", text: [
        "设一个理想非磁性、无色散介质 εᵣ=2.25、μᵣ=1，则 v=c/√(εᵣμᵣ)=c/1.5≈2.00×10⁸ m/s，折射率 n=c/v=1.5。不是“介质里也始终以 c 传播”。",
        "可见光只是电磁频谱的一段。波动方程说明了电磁扰动能传播，并不意味着所有电磁波的颜色、频率和物质响应都一样。"
      ], eq: ["c = 1/√(ε₀μ₀) ≈ 3.00×10⁸ m/s；　n = c/v"], note: "示例是假设参数与频率无关的模型；实际材料可能色散或吸收。" }
    ],
    questions: [
      { stem: "无源、均匀介质中，安培—麦克斯韦方程在 J=0 后还保留哪一项？", choices: ["位移电流项 ∂D/∂t", "自由电流 J", "磁荷密度"], answer: 0, explain: "原式为 ∇×H=J+∂D/∂t。设 J=0 只去掉传导电流，变化的电位移仍贡献旋度。这一步与法拉第定律配合，才能导出传播的波动方程。", whyOther: "自由电流 J 已被题设置零；磁荷密度不是该方程的项。不要把“无源”误读成“所有场与导数都为零”。" },
      { stem: "为什么推导中 ∇×(∇×E) 可以化成 −∇²E？", choices: ["因为 ∇·E=0 且使用向量恒等式", "因为 E 必须等于零", "因为所有介质的 ε 都等于 ε₀"], answer: 0, explain: "恒等式是 ∇×(∇×E)=∇(∇·E)−∇²E。在均匀无源介质中 D=εE、∇·D=0 且 ε 为常数，故 ∇·E=0；于是只剩 −∇²E。", whyOther: "散度为零不代表 E 为零，例如横向振荡的平面波；ε 也可以是介质值而非 ε₀，关键是它在本推导中是常数且非零。" },
      { stem: "理想非磁性介质 εᵣ=4、μᵣ=1 时，传播速度约为多少？", choices: ["c", "c/2", "2c"], answer: 1, explain: "v=1/√(εμ)=c/√(εᵣμᵣ)=c/√4=c/2。这里的 c=1/√(ε₀μ₀)，所以用相对参数就能快速比较速度。", whyOther: "选 c 是把介质误当真空；选 2c 是把平方根放到了分子。结果以均匀、线性、无耗散、无色散近似为条件。" }
    ]
  };
  const translation = {
      title: "The electromagnetic nature of light",
      overview: "Start with Maxwell's four equations, constitutive relations, and the source-free wave equation. Distinguish E, B, D, and H before interpreting light as an electromagnetic wave.",
      bridge: { previous: "This is the starting point: learn the fields used to describe light.", current: "Combine Maxwell's equations with material assumptions to obtain a wave equation and a propagation speed.", next: "With that equation in hand, §1.2.1 examines plane-wave solutions and their directions." },
      goals: ["Explain the role of each Maxwell equation", "Derive the electric-field wave equation from curl equations", "Distinguish vacuum speed c from medium speed v"],
      symbols: [["E", "electric field intensity", "V/m"], ["B", "magnetic flux density", "T"], ["D", "electric displacement field", "C/m²"], ["H", "magnetic field intensity", "A/m"], ["ε, μ", "absolute permittivity and permeability", "F/m, H/m", "Example: εᵣ=2.25, μᵣ=1"], ["ρ, J", "free-charge and free-current densities", "C/m³, A/m²", "Derivation: ρ=0, J=0"], ["c, v", "vacuum and medium phase speeds", "m/s", "c≈3.00×10⁸; example v≈2.00×10⁸"]],
      blocks: [
        { label: "Build the language", title: "Four equations, not four independent waves", text: [
          "∇·D=ρ identifies sources of electric flux; ∇·B=0 rules out isolated magnetic charge. Faraday's law, ∇×E=−∂B/∂t, relates a changing magnetic flux to a circulating electric field. The Ampère–Maxwell law, ∇×H=J+∂D/∂t, includes both conduction current and displacement current.",
          "Integral forms concern flux through a closed surface or circulation around a closed curve; differential forms state local relations near a point. Both appear on book pp. 3–4. E and B are fields, whereas D and H also encode a medium's response: do not interchange them."
        ], note: "Orient a closed contour and its spanning surface by the right-hand rule. The figure illustrates coupled curls, not a time-ordered cycle in which E first creates B and B then creates E." },
        { label: "State the assumptions", title: "Constitutive relations close the system", text: [
          "For an ideal linear, homogeneous, isotropic medium, D=εE and B=μH. Here ε and μ are material parameters; in vacuum they become ε₀ and μ₀. A conducting material is often modeled by J=σE, but the lossless-wave derivation below takes ρ=0 and J=0.",
          "If ε or μ varies with position or frequency, or if the medium is anisotropic or appreciably absorbing, the scalar parameters and simple speed relation below cannot be used unchanged."
        ] },
        { label: "Derivation 01", title: "From curl equations to the wave equation", steps: [
          ["Assume", "A homogeneous, source-free, nonconducting medium: ρ=0, J=0, with constant ε and μ. Thus ∇×H=ε∂E/∂t and ∇·E=0."],
          ["Take another curl", "Apply curl to ∇×E=−∂B/∂t and use B=μH to obtain ∇×(∇×E)=−με∂²E/∂t²."],
          ["Simplify", "The vector identity ∇×(∇×E)=∇(∇·E)−∇²E, together with ∇·E=0, reduces the left side to −∇²E."],
          ["Result and coefficient", "Both sides carry a minus sign; cancelling gives ∇²E−εμ∂²E/∂t²=0. Write the coefficient of the second time derivative as 1/v²: define 1/v²=εμ. With positive ε, μ and positive speed, v=1/√(εμ). This speed follows from the coefficient, not from the ∇² symbol alone."],
          ["Restrict to one axis", "For one component of E, ∇²E adds its second spatial derivatives in x, y and z. If that component does not vary with x or y, those terms vanish and only ∂²E/∂z² remains. The next section tests a shape moving along z."]
        ] },
        { label: "Worked example", title: "How fast does one frequency travel in another medium?", text: [
          "Let an ideal, nonmagnetic, nondispersive medium have εᵣ=2.25 and μᵣ=1. Then v=c/√(εᵣμᵣ)=c/1.5≈2.00×10⁸ m/s, and n=c/v=1.5. Light does not always travel at c inside matter.",
          "Visible light is only one part of the electromagnetic spectrum. The wave equation permits electromagnetic disturbances to propagate; it does not make all electromagnetic waves identical in color, frequency, or material response."
        ], note: "This example assumes parameters independent of frequency. Real materials may disperse or absorb light." }
      ],
      questions: [
        { stem: "In a homogeneous source-free medium, which term remains in the Ampère–Maxwell law after J=0?", choices: ["Displacement-current term ∂D/∂t", "Free current J", "Magnetic-charge density"], explain: "The original equation is ∇×H=J+∂D/∂t. Setting J=0 removes conduction current only. Time-varying D still contributes to the curl; together with Faraday's law, it enables the propagating wave equation.", whyOther: "J was explicitly set to zero, while magnetic-charge density is not a term in this equation. 'Source-free' does not mean every field or time derivative vanishes." },
        { stem: "Why does ∇×(∇×E) reduce to −∇²E in this derivation?", choices: ["Because ∇·E=0 and the vector identity applies", "Because E itself must vanish", "Because every medium has ε=ε₀"], explain: "Use ∇×(∇×E)=∇(∇·E)−∇²E. With D=εE, ∇·D=0 and a constant nonzero ε in a homogeneous source-free medium, ∇·E=0. Only −∇²E remains.", whyOther: "Zero divergence does not imply a zero field: a transverse plane wave is a counterexample. ε may be the medium's value, not ε₀; being a nonzero constant is what matters here." },
        { stem: "For an ideal nonmagnetic medium with εᵣ=4 and μᵣ=1, what is the approximate propagation speed?", choices: ["c", "c/2", "2c"], explain: "v=1/√(εμ)=c/√(εᵣμᵣ)=c/√4=c/2. Since c=1/√(ε₀μ₀), relative material parameters give a quick speed comparison.", whyOther: "c treats the medium as vacuum; 2c incorrectly places the square root in the numerator. The result assumes a homogeneous, linear, lossless, nondispersive model." }
      ]
    };
  const guide = {
    question: ["没有一根绳子，光究竟是什么在振动？", "Without a string, what is actually oscillating in light?"],
    setup: ["摇动绳子，移动的是波形，不是整根绳子跑到远方。光也能把变化传到远处，但不需要绳子。我们先认识描述这种变化的两种场，再问：它们遵守什么规则，规则怎样允许波传播？本节是起点，不要求你已经会向量微积分。", "On a shaken string, a pattern travels without the whole string moving away. Light also carries a changing pattern, but needs no string. First we identify two fields, then ask what rules they obey and how those rules permit waves. This is the starting point; vector calculus is not assumed for the first reading."],
    terms: [
      { name: ["场", "Field"], meaning: ["给空间中每个位置指定一个物理量；箭头同时记录大小和方向。场不是装着光的物质。", "A physical quantity assigned to each position. An arrow records both size and direction; a field is not a substance containing light."] },
      { name: ["电场 E / 磁场 B", "Electric field E / magnetic field B"], meaning: ["E 描述电荷受到的电作用；B 描述磁作用。这里的振动是这些量随时间改变。", "E describes electric action on charges; B describes magnetic action. Oscillation means these quantities change with time."] },
      { name: ["介质", "Medium"], meaning: ["光所在的材料，如空气、玻璃；材料响应会影响传播速度。真空表示没有这种物质介质。", "The material, such as air or glass, in which light travels. Its response affects wave speed. Vacuum has no material medium."] }
    ],
    observe: ["看电场与磁场变化的示意，先辨认两种箭头，不背方程。图想表达它们受共同规则约束，不是电场先走一步、再叫磁场跟上。", "Identify the electric and magnetic arrows in the coupling sketch; do not memorize equations yet. They obey joint rules, rather than E taking a turn and then telling B to follow."],
    blocks: [
      { title: ["先用四条规则描述场，而不是先背四行符号", "Start with four field rules, not four lines to memorize"], before: ["我们要描述的不只是一个点有多大的场，还包括附近的箭头怎样排列、怎样随时间变。麦克斯韦方程把这些关系分成两组：一组检查穿出小封闭面的净量，另一组检查沿小回路的环绕关系。前者叫散度，后者叫旋度；∇· 和 ∇× 分别是它们的记号。", "We need more than the field at one point: we need how nearby arrows are arranged and how they change. Maxwell's rules fall into two groups: net flow through a small closed surface, and circulation around a small loop. These are called divergence and curl, written ∇· and ∇×."], read: ["初读先留下这条主线：电荷约束电场的源，磁场没有孤立磁荷；随时间变化的电场和磁场还受到相互耦合的环绕规则约束。D、H 是把材料响应纳入描述的辅助场，下一步马上解释，不能把它们当第三、第四种光。完整公式放在下方，认识读法后再展开。", "For now, retain the thread: charges constrain electric sources; there are no isolated magnetic charges; time-changing electric and magnetic fields obey coupled circulation rules. D and H incorporate material response, not two extra kinds of light. We introduce them next; open the full equations after learning their meaning."], advanced: true },
      { title: ["同一套场规则，还需要告诉它“材料是什么”", "The field rules also need a description of the material"], before: ["刚才的规则同时含 E、B、D、H，尚不能只靠两个量算完。在线性、各向同性的简单材料里，D 与 E 同方向且成正比，B 与 H 也成正比。把两个比例系数叫介电常数 ε、磁导率 μ，材料信息就接进来了。J 是自由电流密度；σ 是导电率。", "The rules contain E, B, D and H, so two quantities alone do not close the calculation. In a simple linear isotropic material, D is proportional and parallel to E, as B is to H. Permittivity ε and permeability μ are the two proportionality constants. J is free-current density; σ is conductivity."], read: ["读 D=εE 为“材料通过 ε 把 E 与 D 联系起来”，不是二者数值相同。为了先看清波传播，接下来选均匀、不导电且无自由电荷的区域；这表示没有当地自由源，不表示场必须为零。现在可以把方程合并了。", "Read D=εE as a material relation, not numerical equality of the two fields. To isolate wave propagation, we now choose a uniform nonconducting region without free charge. No local free source does not mean zero field. We can now combine the rules."] },
      { title: ["把共同规则合起来，得到“变化能够传播”", "Combine the rules to obtain a travelling disturbance"], before: ["上一步选定均匀、无自由源且不导电的介质，ε、μ 是正的常数。两条旋度规则可消去磁场：对法拉第式再取一次旋度，用 B=μH 和 ∇×H=ε∂E/∂t 替换磁场项；无自由电荷还使 ∇·E=0。这会得到一条只含 E 的传播规则。∂ 表示只让一个变量变化、其余保持不变来求变化率，∂² 表示再求一次；∇²E 表示把 E 对 x、y、z 的空间二阶变化相加，不是 E 的平方。", "In a homogeneous, source-free, nonconducting medium, positive ε and μ are constants. Eliminate the magnetic field between the two curl rules: curl Faraday's law again, replace B by μH and use ∇×H=ε∂E/∂t. No free charge also gives ∇·E=0. This leaves a rule for E alone. ∂ differentiates with respect to one variable while the others are held fixed; ∂² repeats this. ∇²E adds the x, y and z spatial second derivatives of E, not the square of E."], eqLead: [
        ["先看消元后的结果：空间弯曲与时间弯曲要按材料系数 εμ 配平。详细的旋度运算在下方可展开。", "First read the result of elimination: spatial and temporal curvature balance through the material coefficient εμ. Expand the curl calculation below if needed."],
        ["令 1/v²=εμ，并取正的 v。它的单位是速度；下一节代入具体波形，再检验 v 是否确为波峰的传播速度。", "Set 1/v²=εμ and take positive v. It has units of speed; the next section tests a particular waveform and verifies that crests travel at v."],
        ["把 εμ 换写成 1/v²，就是这里所谓的波动方程“标准形式”；不是先前漏讲的另一条定律。", "Replacing εμ by 1/v² is what 'standard wave-equation form' means here, not a new law introduced without warning."],
        ["只看沿 z 变化的一个电场分量时，它不随 x、y 改变，这两项空间二阶导数为零，于是留下下面的一维式。", "For a field component varying only along z, its x and y derivatives vanish, leaving this one-dimensional equation."]
      ], read: ["读最后一式：沿 z 的弯曲程度，等于时间弯曲程度除以 v²。这里 v 由介质的 ε、μ 决定；式子尚未给出具体波形。需要看完整消元时，再展开下方验算；下一节会试一个随时间移动的波形。", "Read the last line as spatial curvature along z matching time curvature divided by v². The medium's ε and μ set v, but this equation does not yet specify a waveform. Expand the calculation below if desired; the next section tests a moving shape."] },
      { title: ["用玻璃式的假设材料，检查速度的意义", "Check the meaning of speed with a glass-like model"], before: ["已经知道速度来自材料，就把它与熟悉的真空速度比较。c 表示真空光速，v 表示当前介质中的相速度；折射率 n 定义为 c 与 v 的比值。下标 0 表示真空参数，下标 r 表示相对真空的比值。", "Since material determines speed, compare it with vacuum. c is vacuum light speed, v the phase speed in the medium, and refractive index n is defined as c/v. Subscript 0 denotes vacuum parameters; subscript r denotes a ratio to vacuum."], read: ["例如 εᵣ=2.25、μᵣ=1，材料使速度成为 c/√2.25=c/1.5，约 2.00×10⁸ m/s，所以 n=1.5。我们现在有了传播规则和速度；还欠一幅能随时间向前移动的波形，这就是下一节的任务。", "For εᵣ=2.25 and μᵣ=1, v=c/√2.25=c/1.5, about 2.00×10⁸ m/s, giving n=1.5. We now have a propagation rule and speed. What is still missing is an actual moving wave shape—the next section's task."] }
    ],
    check: { question: ["“无自由电荷、无自由电流”为什么不等于“没有光”？", "Why does no free charge or free current not mean no light?"], answer: ["它排除的是这片区域内的自由源，不是所有电磁场。已经进入该区域的电磁扰动仍可满足耦合规则并传播。", "It excludes local free sources, not all electromagnetic fields. A disturbance entering the region can still satisfy the coupled rules and propagate."] },
    next: ["带到 1.2.1：知道规则不等于知道波形。接下来跟着一个波峰走，看函数怎样描述它的位置。", "Into §1.2.1: knowing the rule is not yet knowing the shape. Next we follow a feature of a wave and describe its moving position."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.1"] = {
    ask: ["增大图中变化幅度，两组环绕关系会怎样？", "Increase the variation strength. What happens to the two circulating-field sketches?"],
    choices: [["只有电场先变化，磁场随后才动", "Only E changes first; B follows later"], ["两组局部耦合同时更明显", "Both local couplings become more prominent together"], ["其中一组必须消失", "One of the two couplings must vanish"]], answer: 1,
    try: ["调“变化幅度”，比较左右两幅，而不是寻找先后顺序。", "Change variation strength and compare both panels, not their imagined order in time."],
    why: ["图只演示同一电磁系统中的两条局部规则；增大示意幅度不会规定电场先于磁场。", "These are two local rules in one electromagnetic system. Increasing a schematic amplitude does not put E before B."]
  };
  const deepLab = {
    controls: [["strength", .4], ["strength", 1.5]],
    compare: ["比较弱、强两种变化：哪一组局部旋度规则会消失？", "Compare weak and strong variation: does either local curl relation disappear?"],
    relation: ["两条旋度方程共同约束同一个无源电磁场；图中放大幅度不代表先后因果。", "Both curl equations constrain the same source-free field. A larger drawn variation does not impose a time order."],
    formula: "\\nabla\\times\\mathbf E=-\\partial_t\\mathbf B,\\qquad \\nabla\\times\\mathbf H=\\partial_t\\mathbf D",
    challenge: [["如果图上两边都变弱，能断言其中一个场先停止吗？", "If both sketches weaken, can you say one field stops first?"], [["能，必有先后", "Yes, one must lead"], ["不能，两条是同一场的局部关系", "No; both are local relations of one field"], ["能，磁场不再参与", "Yes, B no longer matters"]], 1],
  };
  deepLab.mistakes = [["两幅图不是先后接力的动画，而是同一电磁场在同一时刻满足的局部关系。", "The panels are not a relay in time; both are simultaneous local constraints on the field."], null, ["变化幅度变小不等于磁场被删除；另一条旋度关系仍在。", "A smaller variation does not remove B or its curl relation."]];
  const [focus, limitQuestion, limitAnswer] = [["点左右两幅图：箭头代表局部旋度耦合，不是先后播放时间轴。", "Inspect both panels: arrows show local curl coupling, not a timeline."], ["图表现的是同一电磁系统的两条局部旋度关系吗？", "Does the sketch show two local curl relations of the same field system?"], true];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.1"] = deepLab;
})();

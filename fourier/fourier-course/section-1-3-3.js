/* Section 1.3.3: bilingual lesson, guided path, experiment and reference data. */
(() => {
  const { pair, formula, question, symbol, p, stage, step, sym, block, q, origin, P, S, commonSymbols, corrSymbols } = window.FourierSectionBuilders;
  const deltaStages = [
    stage(["单位脉冲", "Unit impulse"], ["用宽度逐渐缩小、总面积为 1 的有限脉冲近似 δ，观察输出与 f 的形状。", "Approximate delta by narrowing a unit-area pulse and compare output with f."], { ...origin, a: 1 }, [["极限输出为原 f", "The limiting output is f"], ["极限输出恒为 0", "The limiting output is zero"], ["极限输出无穷大", "The limiting output diverges"]], 0, [["对。理想 δ 在积分中选出 f(x)。", "Yes. Ideal delta selects f(x) under integration."], ["单位权重并不会把函数抹除。", "Unit weight does not erase the function."], ["不能用 δ 的峰高代替其积分权重。", "Its integral weight is what matters, not a peak height."]]),
    stage(["把脉冲平移", "Shift the impulse"], ["把 δ 的位置从 0 改成 x₀=1，观察图上输出的位置。", "Move delta from 0 to x₀=1 and inspect the output location."], { ...origin, x0: 1 }, [["f(x−1)，向右平移", "f(x−1), shifted right"], ["f(x+1)，向左平移", "f(x+1), shifted left"], ["输出仍为 f(x)", "Output remains f(x)"]], 0, [["对。δ(τ−1) 在 τ=1 取样 f(x−τ)。", "Yes. δ(τ−1) samples f(x−τ) at τ=1."], ["符号相反；f(x+1) 向左移。", "The sign is reversed: f(x+1) shifts left."], ["只有 x₀=0 才保留原位置。", "Only x₀=0 leaves the position unchanged."]]),
    stage(["多个脉冲", "Multiple impulses"], ["设一个理想脉冲列，每支权重相同；观察几个移位副本的叠加。", "Use an ideal train of equal-weight impulses and inspect the shifted copies."], { ...origin, a: 2 }, [["每支生成一个移位的 f", "Each impulse makes a shifted f"], ["所有脉冲合成一个有限峰", "All impulses make one finite peak"], ["输出只保留 f(0)", "Only f(0) survives"]], 0, [["对。每个脉冲位置单独触发一个移位副本。", "Yes. Each impulse generates one shifted copy."], ["脉冲位置不同，会生成不同中心。", "Distinct impulse sites produce distinct centers."], ["这是卷积移位，不是单点抽样结果。", "Convolution creates shifted copies, not just one sampled value."]]),
    stage(["对应到成像", "Relate to imaging"], ["把输入看作物面点列、h 看作系统点扩散函数；怎样读输出？", "Interpret the input as object points and h as the point-spread function. How do you read the output?"], { ...origin, x0: 0.5 }, [["每个点产生移位的响应，再叠加", "Each point makes a shifted response; add them"], ["每点只取 h(0)", "Every point sees only h(0)"], ["模拟曲线就是实验照片", "The simulated plot is a measured image"]], 0, [["对。这里假定系统线性且空间不变；图只是一维模型。", "Yes. This assumes a linear shift-invariant system; the chart is 1D."], ["成像响应是整条移位函数，不只是中心值。", "An imaging response is an entire shifted function."], ["此图是计算示意，并非实拍数据。", "This is a calculation, not measured image data."]]),
    stage(["新位置先判断", "Predict a new position"], ["若输入 δ(x−2) 且响应峰在 0，输出峰在何处？答后显示。", "If the input is δ(x−2) and the response peaks at 0, where is the output peak? Reveal after answering."], { ...origin, x0: 2 }, [["x=2", "x=2"], ["x=−2", "x=−2"], ["x=0", "x=0"]], 0, [["对。h(x−2) 峰在 x=2。", "Yes. h(x−2) peaks at x=2."], ["h(x+2) 才会峰在 −2。", "Only h(x+2) peaks at −2."], ["只有未位移的 δ 才让峰留在 0。", "Only an unshifted delta keeps the peak at zero."]])
  ];
  const item = {
      id: "1.3.3", title: ["包含脉冲函数的卷积", "Convolution with impulses"], pages: "14–16", pdf: "16–18", firstPage: 16,
      lead: ["如果输入是理想点，为什么系统的整条响应会原样出现，并随点的位置平移？", "If the input is an ideal point, why does a shifted copy of the whole system response appear?"],
      bridge: [["已知 δ 会在积分中读取指定位置。", "Delta already samples a specified location inside an integral."], ["现在把它放入卷积积分，观察整条函数的移位与叠加。", "Insert it into convolution to observe full-function shifts and sums."], ["随后比较另一种运算：相关，它看相似度而不是响应叠加。", "Next compare correlation, which measures alignment rather than response accumulation."]], question: ["点输入为何能“复制”系统响应？", "Why can a point input reproduce the system response?"], setup: ["δ 是分布而非一根高度无穷大的普通曲线；图用窄的单位面积高斯示意，颜色不代表实测光强。", "Delta is a distribution, not an ordinary infinite-height curve. The chart uses a narrow unit-area Gaussian approximation, not measured intensity."], terms: [["δ(x−x₀) 的积分权重为 1，位于 x₀；与卷积核 h 作用时输出 h(x−x₀)。", "Delta(x−x₀) has unit integral weight at x₀ and yields h(x−x₀) under convolution."], ["空间不变指相同输入点只令响应平移；真实系统若位置相关，不能直接套用单一 h。", "Shift invariance means the same point only translates the response; a position-dependent real system needs more than one h."]], observe: ["拖动点位置 x₀：对照原响应与输出峰的横向距离。", "Move point position x₀ and compare the original response with the shifted output peak."], stages: deltaStages,
      recap: [["单位 δ 是卷积的恒等元；位移 δ 将输出整体平移。", "Unit delta is a convolution identity; shifting delta shifts the entire output."], ["脉冲列产生许多移位副本的和，而不是只留下原点数值。", "A train yields a sum of shifted copies, not one point value."], ["点扩散函数的成像解释要以线性空间不变为前提。", "The point-spread interpretation of imaging requires a linear shift-invariant model."]],
      blocks: [
        block(["把 δ 放进积分", "Put delta into the integral"], ["已知上一节 (f*h)(x)=∫f(τ)h(x−τ)dτ，令 f(τ)=δ(τ)，由 δ 的积分筛选性质读取 τ=0。", "Start from (f*h)(x)=∫f(τ)h(x−τ)dτ and set f(τ)=δ(τ); delta samples τ=0."], String.raw`\delta*h=h`, ["卷积恒等式对适当函数按分布意义理解；不是把 δ(0) 当普通数。", "Interpret this identity distributionally for suitable h, not by assigning an ordinary value to δ(0)."], ["先固定 x，h(x−τ) 是被取样的测试函数。", "Fix x; h(x−τ) is what delta samples."], ["若 h 是宽 1 的窗，则点输入得到同一个宽 1 的响应。", "For a width-1 response, a point input yields that same width-1 response."], ["点不在原点时，筛选位置发生变化。", "If the point is not at the origin, the sampling location changes."], ["使用 §1.2.1 的 ∫δ(τ)φ(τ)dτ=φ(0)，令 φ(τ)=h(x−τ)。", "Use §1.2.1's ∫δ(τ)φ(τ)dτ=φ(0), with φ(τ)=h(x−τ)."], String.raw`\int\delta(\tau)h(x-\tau)\,d\tau=h(x)`, ["因为筛选点 τ=0，剩下的是以 x 为变量的整个 h。", "Sampling τ=0 leaves the whole function h of x."]),
        block(["将点移到 x₀", "Move the point to x₀"], ["改用上一节的 δ(τ−x₀)，它只在 τ=x₀ 筛选 h(x−τ)。", "Replace delta with δ(τ−x₀), which selects h(x−τ) at τ=x₀."], String.raw`\delta(x-x_0)*h(x)=h(x-x_0)`, ["左侧按两个关于 x 的函数卷积；x₀ 与 x 用同一长度单位。", "The left side convolves two functions of x; x₀ shares x's length unit."], ["图中把 x₀ 改为正值，输出向右移。", "Set positive x₀ on the chart and the output shifts right."], ["响应峰若本来在 0，则 x₀=2 时峰在 x=2。", "If the response originally peaks at 0, x₀=2 moves its peak to 2."], ["多个理想点的响应由积分的线性性相加。", "Linearity adds responses from several points."], ["令 φ(τ)=h(x−τ)，使用移位 δ 的筛选公式。", "Set φ(τ)=h(x−τ) and apply the shifted delta sampling rule."], String.raw`\int\delta(\tau-x_0)h(x-\tau)\,d\tau=h(x-x_0)`, ["输出位置没有额外取负；点向右移，响应向右移。", "No extra minus sign appears in the output shift." ]),
        block(["多个点叠加", "Sum over several points"], ["若输入为若干个有权重的理想点，由分配律每个点分别产生一条移位响应。", "For finitely many weighted ideal points, distributivity makes each one generate a shifted response."], String.raw`\left(\sum_{n=1}^{N}a_n\delta(x-x_n)\right)*h=\sum_{n=1}^{N}a_n h(x-x_n)`, ["aₙ 是权重；不能把输出说成只有一支峰或等于某个点的数值。", "aₙ is a weight; the output is not merely one peak or one point value."], ["在图中想象再加一个点，两个移位响应会在重合处叠加。", "Imagine a second point in the chart; the two shifted responses add where they overlap."], ["两点位置 −1、1，权重各 1，则输出 h(x+1)+h(x−1)。", "Two unit points at −1 and 1 yield h(x+1)+h(x−1)."], ["可以由点列过渡到教材讨论的连续成像。", "This leads from point trains to continuous imaging."], ["对有限和逐项使用上一块的移位 δ 卷积恒等式。", "For a finite sum apply the shifted-delta identity term by term."], String.raw`\sum_{n=1}^{N}a_n\!\int\delta(\tau-x_n)h(x-\tau)\,d\tau=\sum_{n=1}^{N}a_n h(x-x_n)`, ["无限脉冲列需额外确认收敛或作为适当分布处理。", "Infinite trains need convergence checks or an appropriate distributional interpretation."]),
        block(["点扩散函数的适用前提", "Limits of the point-spread model"], ["线性、空间不变的成像系统使连续物的每个点贡献一个移位 h；积分汇总这些贡献。", "In a linear shift-invariant imaging system, each object point contributes a translated h and the integral sums them."], String.raw`g(x,y)=\iint f(\xi,\eta)h(x-\xi,y-\eta)\,d\xi\,d\eta`, ["若系统随场位置改变、非线性或存在相干强度混淆，不能直接把这一式解释成全部实测图像。", "If the system varies with field position, is nonlinear, or confuses coherent amplitude with measured intensity, this equation alone does not describe the measured image."], ["图是一维标量响应示意，镜头成像还需限定振幅/强度、边界和采样。", "The chart is a 1D scalar response; optical imaging also needs amplitude/intensity and sampling assumptions."], ["两个点间距比 h 的宽度小，输出副本会明显重叠。", "Two points closer than the width of h produce strongly overlapping copies."], ["下一节用相关寻找形状相似而不是叠加响应。", "Next correlation measures similarity rather than adding responses."], ["把连续输入写成理想点的积分叠加，再对每个点使用移位响应。", "Represent the continuous input as an integral of ideal points and apply the shifted response to each."], String.raw`f(x,y)=\iint f(\xi,\eta)\delta(x-\xi,y-\eta)\,d\xi\,d\eta`, ["这是 §1.2.1 的二维筛选恒等式，再卷积 h 就得到上面的二维式。", "This is §1.2.1's 2D sampling identity; convolution with h gives the displayed 2D result."])
      ],
      questions: [q("1.3.3:q1", ["f*δ 等于什么？", "What is f*δ?"], [["f", "f"], ["0", "0"], ["δ(0)f", "δ(0)f"]], 0, [["对，由积分筛选得到整条 f。", "Yes; sampling returns the whole function f."], ["单位脉冲不会消除输入。", "Unit delta does not erase the input."], ["δ(0) 不是普通函数数值。", "δ(0) is not an ordinary numerical value."]]), q("1.3.3:q2", ["δ(x−2)*h(x) 的输出是？", "Output of δ(x−2)*h(x)?"], [["h(x−2)", "h(x−2)"], ["h(x+2)", "h(x+2)"], ["h(2)", "h(2)"]], 0, [["对，响应向右移 2。", "Yes, the response shifts right by 2."], ["h(x+2) 是向左移。", "h(x+2) shifts left."], ["输出仍随 x 变化，不只是点值。", "The output is a whole function of x, not one value."]]), q("1.3.3:q3", ["两个不同位置的单位 δ 与 h 卷积得到？", "Two unit impulses at different sites convolved with h give?"], [["两条移位 h 相加", "Sum of two shifted h responses"], ["仅原点的一条 h", "Only one h at zero"], ["两个 δ 无限峰相乘", "Product of infinite delta peaks"]], 0, [["对，逐项应用分配律与筛选性质。", "Yes. Apply distributivity and sampling at each site."], ["另一个点也产生自己的移位响应。", "The second point contributes another shifted response."], ["δ 不以普通无限峰的方式逐点相乘。", "Delta is not pointwise multiplication of infinite peaks."]])]
    };
  item.symbols = item.id.startsWith("1.3") ? [...commonSymbols] : [...corrSymbols];
  window.FourierLessons.push({
    id: item.id, title: p(...item.title), pages: item.pages, pdf: item.pdf, firstPage: item.firstPage,
    lead: p(...item.lead), challenge: p(...item.question), choices: item.stages[0].choices,
    choiceFeedback: item.stages[0].feedback,
    transfer: { stem: item.stages.at(-1).task, choices: item.stages.at(-1).choices, answer: item.stages.at(-1).answer, feedback: item.stages.at(-1).feedback },
    labHint: p(...item.observe), symbols: item.symbols || [], recap: item.recap.map(v => p(...v)),
    notes: item.blocks.map(b => b.note), questions: item.questions
  });
  window.FourierGuides[item.id] = {
    bridge: item.bridge.map(v => p(...v)), question: p(...item.question), setup: p(...item.setup),
    terms: item.terms.map(v => p(...v)), observe: p(...item.observe), stages: item.stages,
    steps: item.blocks.map(b => b.guide)
  };
  window.FourierIndependentLabData["1.3.3"] = [
    S(["窄脉冲先近似", "Start with a narrow approximation"],
      ["蓝线是 h(x)=exp(−πx²)。输入为宽1/N、高N的单位面积矩脉冲。增大N，比较卷积输出与蓝线。", "Blue is h(x)=exp(−πx²). Input is a unit-area rectangle of width 1/N and height N. Increase N and compare output with blue."],
      "impulses", { n: 2, x0: 0, weight: 1, variant: "finite", second: 0, spacing: 2 }, ["n"],
      [["输出逐渐接近 h", "Output approaches h"], ["输出逐渐发散", "Output diverges"], ["任何有限宽输出都严格等于h", "Exactly h at every finite width"]], 0,
      [["对。单位权重的窄核越来越少混合邻点。", "Yes. Narrowing unit weight mixes fewer neighboring values."], ["输入峰高不是输出权重；面积一直是1。", "Input peak is not output weight; area remains 1."], ["有限宽仍在平均邻点，只是近似恒等。", "Finite width still averages neighbors and is only approximately identity."]],
      ["理想结论来自δ的筛选：h*δ=h。有限近似与理想结果在图上分开。", "Ideal sifting gives h*δ=h. The plot distinguishes finite approximation from ideal output."],
      ["保留单位权重，移动点输入。", "Keep unit weight and move the point."]),
    S(["把整条响应移过去", "Translate the entire response"],
      ["下方箭头标输入δ的位置x₀，橙曲线是h(x−x₀)。把x₀从0移到1，看峰的位置。", "The orange arrow marks input delta at x₀; orange curve is h(x−x₀). Move x₀ from 0 to 1 and inspect its peak."],
      "impulses", { x0: 1, weight: 1, variant: "ideal", second: 0, spacing: 2 }, ["x0"],
      [["峰向右移到1", "Peak moves right to 1"], ["峰向左移到−1", "Peak moves left to −1"], ["只留下数 h(1)", "Only number h(1) remains"]], 0,
      [["对。令x−1=0得峰位1。", "Yes. x−1=0 gives peak position 1."], ["h(x+1)才是左移。", "h(x+1) would shift left."], ["卷积得到整条函数，不是相乘筛选所得的一个权重。", "Convolution produces a whole function, not a single sampled weight."]],
      ["在积分中δ选中输入位置，输出位置x仍可以变化，因而保留整条移位曲线。", "Delta selects an input position within the integral; output x remains variable, retaining the entire shifted curve."],
      ["点的位置管平移，点的权重管幅度。", "Position controls translation; weight controls amplitude."], String.raw`h*\delta(\,\cdot-x_0)=h(x-x_0)`),
    S(["正负权重也要保留", "Retain signed weights"],
      ["输入改为 cδ(x−x₀)，改变c。负权重表示带符号场量的模型，不是负光强。", "Use cδ(x−x₀) and change c. Negative weights model signed field quantities, not negative intensity."],
      "impulses", { x0: .5, weight: -1, variant: "ideal", second: 0, spacing: 2 }, ["weight", "x0"],
      [["输出为 c h(x−x₀)", "Output c h(x−x₀)"], ["负号应删掉", "Discard the minus sign"], ["权重改变位置", "Weight changes position"]], 0,
      [["对。线性积分保留系数与符号。", "Yes. Linearity preserves the coefficient and sign."], ["删负号改变了原问题。", "Removing it changes the problem."], ["位置由自变量的位移决定，不由前置系数决定。", "Position comes from the translated argument, not the prefactor."]],
      ["相干场可相消；用到强度时须另外取模平方并说明成像条件。", "Coherent fields may cancel. Intensity requires modulus squared and appropriate imaging assumptions."],
      ["两点输入会得到几条响应？", "How many responses arise from two points?"]),
    S(["两点的响应相加", "Add two point responses"],
      ["两点位于x₀及x₀+d，权重分别1、b。改变间距d与第二权重b，比较分响应和总响应。", "Points at x₀ and x₀+d have weights 1 and b. Change separation d and second weight b; compare components with their sum."],
      "impulses", { x0: -1, weight: 1, second: 1, spacing: 2, variant: "pair" }, ["spacing", "second"],
      [["总响应为两条移位h的和", "Sum of two shifted h functions"], ["总响应永远等于一条h", "Always just one h"], ["相加前必须各自除以峰高", "Normalize each peak before adding"]], 0,
      [["对。先移位并乘权重，再相加。", "Yes. Shift, multiply by weights, then add."], ["只有重合且特定权重才可能简化。", "Simplification requires special coincident sites and weights."], ["单独归一化会毁掉实际的相对权重。", "Independent normalization destroys relative weights."]],
      ["虚线是单点响应，实线是实际求和；不按每条曲线各自归一化。", "Dashed curves are components; solid is their actual sum, without individual normalization."],
      ["从有限两点推广到等间隔点列。", "Extend two points to an equally spaced train."]),
    S(["点列复制整条响应", "A train replicates the response"],
      ["等权点列间距d。增大或减小d，观察每个副本的位置以及相邻尾部怎样叠加。", "Equal-weight train spacing is d. Change d and inspect replica positions and overlapping tails."],
      "impulses", { x0: 0, weight: 1, second: 1, spacing: 2, variant: "train" }, ["spacing"],
      [["每支δ产生一条h(x−nd)", "Each delta creates h(x−nd)"], ["只保留h在nd处的数", "Only h(nd) values remain"], ["叠加曲线必有孤立的零间隙", "There must be zero gaps between copies"]], 0,
      [["对。用分配律逐支移位。", "Yes. Distribute over the shifted impulses."], ["那是相乘采样，不是点列卷积。", "That is multiplication/sampling, not train convolution."], ["高斯尾部非零，副本可以相互重叠。", "Gaussian tails are nonzero, so copies overlap."]],
      ["图取n=−4…4，显示中央视野；无限列结论另需收敛条件。", "The plot sums n=−4…4 in a central field; infinite trains require convergence conditions."],
      ["复制公式用于系统，还需要哪项物理前提？", "What physical premise is needed to use replication in a system?"]),
    S(["同一响应能否通用", "Can one response serve every site?"],
      ["切换固定响应和位置相关响应。后一种模型令点越远离原点，响应越宽；移动x₀看是否只是平移。", "Switch fixed and position-dependent responses. In the latter, the response widens with distance from zero. Move x₀ and test whether it merely translates."],
      "impulses", { x0: 1, weight: 1, second: 0, spacing: 2, variant: "system", invariant: false }, ["invariant", "x0"],
      [["形状随位置变时，不能共用一个平移h", "Changing shape prevents using one translated h"], ["只要有峰就总能卷积", "Any peaked response permits convolution"], ["线性足以保证空间不变", "Linearity guarantees shift invariance"]], 0,
      [["对。还要独立检验空间不变，不能从线性推出。", "Yes. Shift invariance must be checked separately from linearity."], ["不同位置的响应形状可能不同。", "Response shape may differ across positions."], ["线性只约束叠加，空间不变约束移动后的形状。", "Linearity concerns addition; shift invariance concerns response to translation."]],
      ["固定h的成像卷积要求线性且空间不变；图是模型，不是实测成像。", "Imaging convolution with fixed h requires linearity and shift invariance. This is a model, not measured imaging."],
      ["独立处理一个新位置和权重。", "Handle a new position and weight independently."]),
    S(["新点输入", "A new point input"],
      ["h(x)=exp(−πx²)，输入为2δ(x−1.5)。预测输出峰的位置及高度。", "For h(x)=exp(−πx²), input is 2δ(x−1.5). Predict peak position and height."],
      "impulses", { x0: 1.5, weight: 2, second: 0, variant: "ideal" }, [],
      [["位置1.5，高度2", "Position 1.5, height 2"], ["位置−1.5，高度2", "Position −1.5, height 2"], ["位置2，高度1.5", "Position 2, height 1.5"]], 0,
      [["2h(x−1.5)在x=1.5取峰2。", "2h(x−1.5) peaks at x=1.5 with height 2."], ["平移符号读反了。", "The translation sign is reversed."], ["位置与权重互换了。", "Position and weight have been interchanged."]],
      ["对照移位、系数和系统前提，三者缺一不可。", "Check translation, coefficient and system assumptions separately."],
      ["用回顾串起单点→多点→系统。", "Recap single points, multiple points and systems."]),
  ];
  window.FourierIndependentRecaps["1.3.3"] = [
      ["同一个原响应", "One original response", "impulses", { x0: 0, weight: 1, variant: "ideal" }],
      ["点输入右移1", "Shift point input right by 1", "impulses", { x0: 1, weight: 1, variant: "ideal" }],
      ["权重变2", "Double its weight", "impulses", { x0: 1, weight: 2, variant: "ideal" }],
      ["第二个点的响应相加", "Add a second point response", "impulses", { x0: 1, weight: 2, second: 1, spacing: -2, variant: "pair" }],
    ];
  window.FourierIndependentNotes.setups["1.3.3"] = P("把卷积中的一条输入换成理想点。利用筛选读出整条移位响应，再用线性叠加处理多个点；最后区分数学恒等式和成像模型前提。", "Replace one convolution input by an ideal point. Sifting gives a whole translated response; linearity handles multiple points. Distinguish the identity from imaging assumptions.");
  window.FourierIndependentNotes.supplements["1.3.3"] = { text: P("等间隔理想点列再用逐项移位：每点产生一个h的副本。无限和需要收敛或适当的分布意义。相干成像先加复振幅再取模平方；满足条件的非相干模型才可对强度卷积。", "For an equally spaced train, each point generates one copy of h. Infinite sums need convergence or a suitable distributional interpretation. Coherent imaging adds complex amplitudes before modulus squared; intensity convolution requires an appropriate incoherent model."), tex: String.raw`\left(\sum_{n\in\mathbb Z}\delta(x-nd)\right)*h=\sum_{n\in\mathbb Z}h(x-nd)` };
  window.FourierSectionSymbolOverrides["1.3.3"] = [
      ["x", "整条输出函数的坐标", "Coordinate of the output function", "长度；图中无量纲", "Length; dimensionless demo"],
      ["x_0", "第一个理想点的位置", "Position of the first ideal point", "与x同单位", "Same units as x", "x0"],
      ["c", "第一个点的积分权重", "First-point integral weight", "本例无量纲", "Dimensionless here", "weight"],
      ["b", "第二个点的积分权重", "Second-point integral weight", "本例无量纲", "Dimensionless here", "second"],
      ["d", "两点或点列的间隔", "Separation of points or train spacing", "与x同单位", "Same units as x", "spacing"],
      ["N", "有限脉冲收缩参数", "Finite-pulse concentration parameter", "长度的倒数", "Inverse length", "n"],
      ["h", "原点输入产生的整条响应", "Whole response to an input at the origin", "随模型确定", "Model-dependent"],
    ];
  const line = (zh, en, tex, resultZh, resultEn) => ({ lead: p(zh, en), tex, read: p(resultZh, resultEn) });
  const auditEntries = [
      ["(1-34)", line("目标：证明单位点输入会复制响应。先展开卷积，不要把 δ(0) 当数。", "Goal: show a unit point input copies the response. Expand the convolution without assigning a value to δ(0).", String.raw`(\delta*h)(x)=\int\delta(\tau)h(x-\tau)d\tau`, "把 h(x−τ) 看成 τ 的测试函数，在 τ=0 筛出 h(x)。", "Treat h(x−τ) as a test function of τ; sampling at τ=0 leaves h(x).")],
      ["(1-35); 本课一维模型", line("目标：找到点移动后响应向哪边移。代入 τ=x₀，先求 h 的自变量。", "Goal: find the response's shift direction. Substitute τ=x₀ into h's argument first.", String.raw`\tau=x_0\Longrightarrow x-\tau=x-x_0`, "所以响应峰从 x=0 到 x=x₀；这是位移后的整个函数，不是一个数。", "Thus its peak moves from x=0 to x=x₀; this is a whole shifted function, not a single number.")],
      ["(1-35); 线性叠加", line("目标：说明多个点为何变成多个响应。先对两个点展开，再推广到 N 个。", "Goal: explain why multiple points make multiple responses. Expand two points, then generalize to N.", String.raw`[a_1\delta(x-x_1)+a_2\delta(x-x_2)]*h=a_1h(x-x_1)+a_2h(x-x_2)`, "这里还用了卷积对输入的线性性，不是说两个点的强度一定可相加。", "This also uses linearity of convolution on the chosen field; it does not automatically add measured intensities.")],
      ["(1-29), (1-35); 需线性平移不变", line("目标：辨别积分模型的物理前提。把一个输入点移到 (ξ,η)，写出它的系统响应。", "Goal: identify physical prerequisites. Move an input point to (ξ,η) and write its system response.", String.raw`\delta(x-\xi,y-\eta)\ \longmapsto\ h(x-\xi,y-\eta)`, "只有系统线性且各点只是同一 h 的平移时，才可用 f(ξ,η) 加权后积分。", "Only if the system is linear and each point gives a shifted copy of h may we integrate weighted responses f(ξ,η).")]
  ];
  if (auditEntries.length !== window.FourierGuides["1.3.3"].steps.length) throw new Error("Incomplete textbook audit: 1.3.3");
  auditEntries.forEach(([source, intermediate], i) => {
    window.FourierLessons.find(lesson => lesson.id === "1.3.3").notes[i].source = source;
    window.FourierGuides["1.3.3"].steps[i].proof.unshift(intermediate);
  });
  window.FourierLessons.find(lesson => lesson.id === "1.3.3").symbols = window.FourierSectionSymbolOverrides["1.3.3"].map(([tex, zh, en, unitZh, unitEn, control]) => ({
    tex, meaning: P(zh, en), unit: P(unitZh, unitEn),
    condition: P("按当前实验步骤；未显示读数表示本步未指定", "Current experiment step; no reading means unspecified in this step"), control,
  }));

  // Section-owned chart models, explanations, controls and notes mapping.
  window.FourierSectionRuntime["1.3.3"] = {
    legacyPlot: {
      label: ["理想点位置 · 整条移位响应 h(x−x₀)", "Ideal point position · translated response h(x−x₀)"],
      axisLabel: ["点位置", "point site"],
      marker: state => state.x0,
      norm: (state, x) => Math.exp(-Math.PI * ((x - state.x0) / .65) ** 2),
      signal: (state, { line, gauss, rect, xSvg }) => `<line x1="${xSvg(state.x0)}" y1="150" x2="${xSvg(state.x0)}" y2="63" stroke="#58a8de" stroke-width="3"/><path d="M${xSvg(state.x0) - 8} 79 L${xSvg(state.x0)} 63 L${xSvg(state.x0) + 8} 79" fill="none" stroke="#315aa2" stroke-width="3"/>`,
      readout: (state, language) => {
        const zh = language === "zh";
        return `${zh ? "理想点" : "Ideal point"} x₀=${state.x0.toFixed(2)}; h(x−x₀) ${zh ? "整条响应被平移；图中曲线非 δ 本身" : "is translated; the drawn curve is not delta itself"}.`;
      },
    },
    models: ["impulses"],
    noteStages: [0, 1, 3, 5],
      controls: {
      n: ["n", P("窄化参数 N", "Narrowing parameter N"), 1, 12, 1],
      x0: ["x0", P("点位置 x₀", "Point position x₀"), -2, 2, .25],
      weight: ["weight", P("第一点权重 c", "First-point weight c"), -1, 3, .5],
      second: ["second", P("第二点权重 b", "Second-point weight b"), -1, 2, .5],
      spacing: ["spacing", P("点列间隔 d", "Point separation d"), .75, 3, .25],
      invariant: ["invariant", P("固定形状（空间不变）", "Fixed shape (shift-invariant)"), "check"],
    },
    create(tools) {
      const { P, text, h, t, fmt, gauss, integrate, graph, stems, legend, block, pulseParameterMarkup } = tools;
      function impulseValue(s, x) {
        if (s.variant === "finite") return s.n * integrate(u => gauss(x - u), -.5 / s.n, .5 / s.n, 80);
        if (s.variant === "train") return Array.from({ length: 9 }, (_, i) => gauss(x - (i - 4) * s.spacing)).reduce((a, b) => a + b, 0);
        const width = s.variant === "system" && !s.invariant ? 1 + .6 * Math.abs(s.x0) : 1;
        const first = s.weight * gauss((x - s.x0) / width);
        return first + (s.variant === "pair" ? s.second * gauss(x - s.x0 - s.spacing) : 0);
      }
      function drawScene(model, s) {
        if (model === "impulses") {
          const curves = [{ fn: gauss, dash: true }, { fn: x => impulseValue(s, x) }];
          if (s.variant === "pair") curves.push({ fn: x => s.second * gauss(x - s.x0 - s.spacing), dash: true });
          const ymax = Math.max(2.5, Math.abs(s.weight) + Math.abs(s.second || 0) + .5, s.variant === "train" ? 4 : 0);
          const xmin = Math.min(-4, s.x0 - 2, s.variant === "pair" ? s.x0 + s.spacing - 2 : 0), xmax = Math.max(4, s.x0 + 2, s.variant === "pair" ? s.x0 + s.spacing + 2 : 0);
          return { graphic: legend("蓝虚线：原响应h；橙实线：计算输出；紫虚线：第二点分响应（有时显示）", "Blue dashed: original h; orange solid: computed output; purple dashed: second-point component when present") + graph(curves, { xmin, xmax, ymin: -2, ymax, marker: s.x0 }) + (["pair", "ideal", "system"].includes(s.variant) ? stems([[s.x0, s.weight], ...(s.variant === "pair" ? [[s.x0 + s.spacing, s.second]] : [])], text(P("输入点的位置和权重", "Input sites and weights")), -2, 3) : ""), readout: `${t("位置", "Site")} x₀=${fmt(s.x0)} · ${t("该位置输出", "Output at that site")}=${fmt(impulseValue(s, s.x0))} · ${t("模型", "model")}: ${t({ finite: "有限脉冲近似", ideal: "理想单点", pair: "两点叠加", train: "有限点列", system: "系统响应" }[s.variant], s.variant)}` };
        }
      }
      function explanation(model, s) {
        if (model === "impulses") {
          const variant = s.variant;
          const formulas = {
            finite: String.raw`g_N(x)=N\int_{-1/(2N)}^{1/(2N)}h(x-u)\,du,\quad h(z)=e^{-\pi z^2}`,
            ideal: String.raw`g(x)=\int c\delta(u-x_0)h(x-u)du=c\,h(x-x_0)`,
            pair: String.raw`g(x)=c\,h(x-x_0)+b\,h(x-x_0-d)`,
            train: String.raw`g(x)=\sum_{n=-4}^{4}h(x-nd)`,
            system: String.raw`g(x)=c\exp[-\pi((x-x_0)/w)^2],\quad w=\begin{cases}1,&\text{invariant},\\1+0.6|x_0|,&\text{otherwise}.\end{cases}`,
          };
          return block(
            [(variant === "finite" ? `当前 $N=${s.n}$ 是有限输入脉冲的收缩参数，越大输入越窄；它不是积分算法的80个分格。` : "") + "蓝虚线h是原点单位输入的高斯响应$h(z)=e^{-\\pi z^2}$，橙实线是输出g，不是δ本身；紫虚线（如有）是第二点单独的输出。下方箭头才表示输入点及带符号权重。x是输出位置，u是被积分的输入位置；δ是理想脉冲，c是第一点权重，b是第二点权重，d是间距。", (variant === "finite" ? `Here $N=${s.n}$ controls the finite input pulse's concentration: larger values give narrower inputs. It is not the integration algorithm's 80-cell count. ` : "") + "Blue dashed h is the Gaussian response $h(z)=e^{-\\pi z^2}$ to a unit input at the origin. Orange is output g, not delta; optional purple dashes show the second-point output. Lower arrows mark input sites and signed weights. x is output position and u the integration coordinate. δ denotes an ideal impulse; c,b are point weights and d their separation."],
            formulas[variant],
            [variant === "finite" ? `有限单位脉冲宽$\\frac1N$=${fmt(1 / s.n)}、高N=${s.n}，u在[${fmt(-.5 / s.n)},${fmt(.5 / s.n)}]内变化；程序用80等格中点和算加权积分。此模型脉冲固定在0，“位置x₀=${s.x0}”只选择输出曲线上的读数点，$g_N(x_0)$≈${fmt(impulseValue(s, s.x0))}，不是把输入脉冲移到x₀。` : variant === "train" ? `本图只累加n=−4…4的9个单位输入响应，间距d=${s.spacing}。在x=${s.x0}处，把9个h(x−nd)相加得${fmt(impulseValue(s, s.x0))}；有限点列并非严格无限周期。` : `在第一点位置x=x₀=${s.x0}求值：${variant === "pair" ? `c h(0)+b h(−d)=${s.weight}+${s.second}e^(−π×${s.spacing}²)` : `c h(0)=${s.weight}×1`}=${fmt(impulseValue(s, s.x0))}；一个点值不代表整条曲线。`, variant === "finite" ? `A unit pulse has width $\\frac1N$=${fmt(1 / s.n)}, height N=${s.n}, and u∈[${fmt(-.5 / s.n)},${fmt(.5 / s.n)}]. The program uses 80 midpoint cells. This pulse stays at zero; x₀=${s.x0} selects an output probe only: $g_N(x_0)$≈${fmt(impulseValue(s, s.x0))}. It does not shift the input pulse.` : variant === "train" ? `This chart sums only 9 unit responses n=−4…4, spacing d=${s.spacing}. At x=${s.x0}, summing h(x−nd) gives ${fmt(impulseValue(s, s.x0))}; a finite train is not exactly infinite-periodic.` : `At x=x₀=${s.x0}: ${variant === "pair" ? `c h(0)+b h(−d)=${s.weight}+${s.second}e^(−π×${s.spacing}²)` : `c h(0)=${s.weight}×1`}=${fmt(impulseValue(s, s.x0))}. This one value is not the whole function.`],
            ["理想点的筛选是在积分内使用，不计算δ(0)。空间不变关闭时，w（响应宽度因子）随输入位置变化；这是反例系统，不能再用同一个h的卷积描述全部输入。", "Ideal sampling acts under an integral; never evaluate δ(0) as a number. With invariance disabled, response-width factor w depends on input location: this counterexample cannot use convolution with one fixed h for every input."]);
        }
        return "";
      }
        const parameters = (model, s, adjustable) => s.variant === "finite" ? pulseParameterMarkup(s.n, false, adjustable) : "";
      return { drawScene, explanation, parameters, calculate: { impulseValue } };
    },
  };
})();

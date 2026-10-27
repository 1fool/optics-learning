/* Section 1.2.2: bilingual lesson, guided path, experiment and reference data. */
(() => {
  const { pair, formula, question, symbol, p, stage, step, sym, block, q, origin, P, S, commonSymbols, corrSymbols } = window.FourierSectionBuilders;
  window.FourierLessons.push({
    id: "1.2.2", title: pair("梳状函数", "The comb distribution"), pages: "10", pdf: "12", firstPage: 12,
    lead: pair("怎样表示一排等间隔的点孔？把单位脉冲按间距 τ 排列，再让一条连续曲线在每个脉冲位置被取样。", "How can we represent evenly spaced pinholes? Place unit impulses τ apart and sample a continuous curve at each location."),
    challenge: pair("若把脉冲列间距 τ 增大，在固定观察范围内会发生什么？", "What happens in a fixed viewing range when impulse spacing τ increases?"),
    choices: [pair("样点变稀疏", "Sample positions become sparser"), pair("样点变密集", "They become denser"), pair("每个脉冲变成有限宽柱子", "Each impulse becomes a finite bar")],
    choiceFeedback: [pair("对。间距控制位置密度，不改变理想脉冲的零宽特性。", "Yes. Spacing controls position density, not the ideal impulses' zero width."), pair("增大间距会减少固定范围内的样点数。", "Increasing spacing gives fewer samples in a fixed range."), pair("箭头表示理想脉冲，不是绘成同样高度的有限柱子。", "The arrows denote ideal impulses, not equal-height finite bars.")],
    transfer: { stem: pair("新情境：二维阵列间距 a=2、b=3，哪一个是阵列中的点？", "New case: a 2D lattice has spacings a=2, b=3. Which point belongs to it?"), choices: [pair("(4, −3)", "(4, −3)"), pair("(3, −4)", "(3, −4)"), pair("(1, 0)", "(1, 0)")], answer: 0, feedback: [pair("对。它对应 n=2、m=−1，即 (na,mb)=(4,−3)。", "Yes. It has n=2,m=−1, giving (na,mb)=(4,−3)."), pair("x 需为 2 的整数倍，y 需为 3 的整数倍。", "x must be an integer multiple of 2 and y of 3."), pair("x=1 不是间距 2 的整数倍。", "x=1 is not an integer multiple of spacing 2.")] },
    labHint: pair("改变 τ，对照连续曲线和采样箭头；切二维格点，观察 x、y 间距分别控制哪一方向。", "Vary τ and compare the continuous curve with sample arrows; switch to a 2D lattice to see which direction each spacing controls."),
    symbols: [
      symbol("x,y", ["一维／二维的坐标", "1D / 2D coordinates"], ["长度", "length"], ["演示坐标无量纲", "Dimensionless in this demo"]),
      symbol("\\tau", ["一维脉冲列的间距", "Spacing of the 1D impulse train"], ["与 x 相同", "same as x"], ["τ>0", "τ>0"], "tau"),
      symbol("n,m", ["整数点列的索引", "Integer lattice indices"], ["无量纲", "dimensionless"], ["n,m∈ℤ", "n,m∈ℤ"]),
      symbol("a,b", ["二维格点的 x、y 间距", "2D lattice spacing along x and y"], ["与 x、y 相同", "same as x and y"], ["图中 a=b=τ；一般可不同", "Diagram uses a=b=τ; generally independent"]),
      symbol("f", ["在 nτ 处被抽样的连续函数", "Continuous function sampled at nτ"], ["依所选函数", "depends on f"], ["图中 f(x)=0.5+0.4cos(πx/2)", "Diagram: f(x)=0.5+0.4cos(πx/2)"]),
      symbol("\\operatorname{comb}", ["整数位置单位脉冲的无穷列", "Infinite unit-impulse train at integer positions"], ["与 δ 相应的分布量纲", "distribution units as for δ"], ["箭头是位置与权重", "Arrows denote positions and weights"])
    ],
    recap: [pair("comb(x) 是整数位置的单位脉冲之和；图中的箭头不是有高度的普通峰。", "comb(x) sums unit impulses at integer locations; diagram arrows are not ordinary peaks of finite height."), pair("间隔 τ 的脉冲列是 (1/τ)comb(x/τ)，不是 comb(x/τ) 本身。", "The τ-spaced train is (1/τ)comb(x/τ), not comb(x/τ) alone."), pair("与连续 f 相乘得到 Σ f(nτ)δ(x−nτ)，因此可以表示等距抽样。", "Multiplication by continuous f gives Σ f(nτ)δ(x−nτ), representing uniform sampling.")],
    notes: [
      formula(["整数位置的冲激列", "Impulses at integers"], ["将单位面积的 δ 沿 x 轴平移到每一个整数 n，n 从负无穷到正无穷。", "Shift a unit-area delta to each integer n, in both directions without bound."], String.raw`\operatorname{comb}(x)=\sum_{n=-\infty}^{\infty}\delta(x-n)`, ["每支箭头代表一个脉冲位置及其权重 1，不能读成无限多个普通函数峰。", "Each arrow marks an impulse position and weight 1, not an ordinary finite-height peak."]),
      formula(["间距为 τ 的列", "Train of spacing τ"], ["由二维 δ 的缩放规则的一维版本 δ(ax)=δ(x)/|a|，令 a=1/τ 且 τ>0。", "Use the one-dimensional scaling δ(ax)=δ(x)/|a|, with a=1/τ and τ>0."], String.raw`\sum_{n=-\infty}^{\infty}\delta(x-n\tau)=\frac1\tau\operatorname{comb}(x/\tau)`, ["所以 τ 控制脉冲间的距离；前面的 1/τ 保证每支脉冲权重仍为 1。", "Thus τ sets spacing; the 1/τ factor keeps each impulse's weight at 1."]),
      formula(["等距离抽样", "Uniform sampling"], ["对上一脉冲列逐项乘连续函数 f，利用 f(x)δ(x−nτ)=f(nτ)δ(x−nτ)。", "Multiply the impulse train by continuous f term by term, using f(x)δ(x−nτ)=f(nτ)δ(x−nτ)."], String.raw`f(x)\sum_n\delta(x-n\tau)=\sum_n f(n\tau)\delta(x-n\tau)`, ["图中实线是连续 f，采样箭头的权重是对应 f(nτ)，不是箭头画出的像素高度。", "The solid line is continuous f; sample-arrow weights are f(nτ), not literal pixel heights."]),
      formula(["二维方格点列", "Two-dimensional lattice"], ["分别在 x、y 方向以 a、b>0 排列脉冲；每个格点都承载单位权重。", "Space impulses by a,b>0 in x and y; each lattice point carries unit weight."], String.raw`\sum_{n,m\in\mathbb Z}\delta(x-na,y-mb)=\frac1{ab}\operatorname{comb}(x/a)\operatorname{comb}(y/b)`, ["这是理想点孔阵列的模型；真实孔径和探测器都有有限尺寸。", "This is an ideal pinhole-array model; real openings and detectors have finite extent."])
    ],
    questions: [
      question("fo-1.2.2:q1", ["间距为 τ>0 的单位脉冲列是哪一个？", "Which is the unit-impulse train spaced by τ>0?"], [["comb(x/τ)", "comb(x/τ)"], ["(1/τ)comb(x/τ)", "(1/τ)comb(x/τ)"], ["τ comb(x/τ)", "τ comb(x/τ)"]], 1, [["缺少缩放补偿；每支脉冲权重会变成 τ。", "It lacks the scaling factor; impulse weights would be τ."], ["对，它等于 Σ δ(x−nτ)。", "Yes: it equals Σ δ(x−nτ)."], ["多乘一次 τ，权重不再是 1。", "An extra τ changes each impulse's weight."]]),
      question("fo-1.2.2:q2", ["f(x)∑δ(x−nτ) 中第 n 支脉冲的权重是多少？", "What is the weight of impulse n in f(x)∑δ(x−nτ)?"], [["f(nτ)", "f(nτ)"], ["f(x) 在所有位置的总和", "The sum of f(x) everywhere"], ["恒为 1", "Always 1"]], 0, [["对，脉冲在积分意义下读取所在位置的函数值。", "Yes. The impulse samples the function at its location under integration."], ["每支脉冲只看自己的位置，不汇总整个连续轴。", "Each impulse samples only its own position."], ["只有 f(nτ)=1 时才为 1。", "Only if f(nτ)=1 is its weight 1."]]),
      question("fo-1.2.2:q3", ["二维点列中 a、b 分别控制什么？", "What do a and b control in the 2D lattice?"], [["x、y 方向的间距", "Spacing along x and y"], ["脉冲的普通函数高度", "Ordinary peak heights"], ["光的波长和频率", "Wavelength and frequency"]], 0, [["对，位置为 (na,mb)。", "Yes. Positions are (na,mb)."], ["理想 δ 不用有限高度表示；a、b 定位格点。", "An ideal delta has no finite peak height; a,b locate lattice points."], ["它们是几何间距，不是光谱参数。", "They are geometric spacings, not spectral parameters."]])
    ]
  });
  window.FourierGuides["1.2.2"] = {
      bridge: [p("承接：1.2.1 的 δ 代表一个单位权重位置，并通过积分读取该位置的函数值。", "Previously: delta marked one unit-weight location and sampled a function through integration."), p("本节：把点按固定间距排成列之后，间距与每个点的权重分别由什么控制？", "Here: in a regularly spaced train, what controls positions and what controls each point's weight?"), p("下一步：这些函数将成为建立傅里叶级数与变换、讨论光学系统的重要积木；本页尚未推导抽样定理。", "Next: these functions support Fourier series, transforms and optical systems; this page has not derived a sampling theorem.")],
      question: p("画出一排理想点孔并用它抽取一条连续曲线，应改变点的位置还是把箭头当作普通的峰？", "To represent ideal pinholes sampling a curve, should we change point locations or treat arrows as ordinary peaks?"),
      setup: p("脉冲箭头表示位置和积分权重，不是有限高度的孔。先看未加权的等距位置，再把连续 f 乘上点列；图中橙色箭头的长度编码 f(nτ)，不是 δ 的高度。", "Impulse arrows denote positions and integral weights, not finite-height holes. First locate a uniform unweighted train, then multiply it by continuous f; orange arrow lengths encode f(nτ), not delta heights."),
      terms: [p("索引 n、m 是整数（含负数与零）；τ>0 是一维位置间距，二维则分别用 a、b>0 控制 x、y 方向。", "Indices n,m are integers, including negatives and zero; τ>0 is 1D spacing, while a,b>0 independently set x,y spacings in 2D."), p("抽样是‘连续函数 × 点列’的分布乘积：每支脉冲的权重会变为它所在位置的函数值；并不自动保证能从样点恢复原函数。", "Sampling is the distributional product 'continuous function × impulse train': each impulse gains the value at its location. This alone does not guarantee signal reconstruction." )],
      observe: p("保持观察窗口不变，把 τ 从 1 改到 2：数一数箭头位置，再比较 f(τ)。切换二维后仅看格点间距，别把点大小当成孔径。", "Keep the view fixed and change τ from 1 to 2: count positions, then compare f(τ). Switch to 2D to inspect grid spacing only; dot size is not pupil radius."),
      stages: [
        stage(["一｜先只排位置", "1 | Arrange positions"], ["在一维图上移动 τ；看 −2τ、−τ、0、τ、2τ 的间隔，忽略箭头长短。", "Change τ in the 1D chart; inspect −2τ,−τ,0,τ,2τ, ignoring arrow lengths."], { grid: false, tau: 2 }, [["τ 增大，固定窗口内位置更稀疏", "Larger τ gives fewer positions in a fixed window"], ["τ 增大，位置更密集", "Larger τ makes positions denser"], ["τ 控制每个点的有限孔径半径", "τ controls a finite pinhole radius"]], 0, [["对。第 n 个位置是 nτ；整数集合向两侧无限延伸，图只截取有限窗口。", "Yes. Position n is nτ. The integer train extends both ways; the chart shows a finite window."], ["间距增大意味着固定窗口内可容纳更少样点。", "A larger spacing fits fewer samples into a fixed window."], ["图中点是理想位置；真实孔径半径未包含在本模型里。", "Dots mark ideal positions; a real pupil radius is absent from this model."]]),
        stage(["二｜别丢掉每点的单位权重", "2 | Preserve each unit weight"], ["假设先写 comb(x/τ) 而未补系数。用上一节一维 δ 的缩放规律判断每支脉冲的权重。", "Suppose we write comb(x/τ) without a prefactor. Use the 1D delta scaling rule to determine each impulse weight."], { grid: false, tau: 2 }, [["每支权重为 τ，需乘 1/τ 才恢复为 1", "Each weight is τ; multiply by 1/τ to restore 1"], ["每支仍是 1，无需系数", "Each remains 1; no prefactor needed"], ["每支权重是 τ²", "Each weight is τ²"]], 0, [["对。间距改变位置，额外的系数补回积分权重；不是调整画出的箭头高度。", "Yes. Spacing changes positions, while the prefactor restores integral weight, not the drawn arrow height."], ["变量被 τ 拉伸时，δ((x−nτ)/τ)=τδ(x−nτ)。", "Stretching the argument gives δ((x−nτ)/τ)=τδ(x−nτ)."], ["一维缩放只给一个 τ；二维才会有两个方向相乘。", "One-dimensional scaling contributes one τ; two dimensions contribute two factors."]]),
        stage(["三｜曲线只留下样点的值", "3 | Retain only sampled values"], ["回到一维，将连续 f(x)=0.5+0.4cos(πx/2) 与单位脉冲列相乘。比较 τ=1 和 τ=2 时 τ 处箭头的权重。", "In 1D multiply continuous f(x)=0.5+0.4cos(πx/2) by the unit train. Compare the weight at τ for τ=1 versus τ=2."], { grid: false, tau: 2 }, [["τ=2 时 f(τ)=0.1", "At τ=2, f(τ)=0.1"], ["τ=2 时每支仍权重 1，与 f 无关", "Every impulse still weighs 1 regardless of f"], ["τ=2 时整条连续曲线都保留", "The whole continuous curve remains"]], 0, [["对。f(2)=0.5+0.4cosπ=0.1；换 τ 改变了取值的位置。", "Yes. f(2)=0.5+0.4cosπ=0.1; changing τ changes the sampled locations."], ["未乘 f 的点列才每支权重 1；乘后是 f(nτ)。", "The bare train has unit weights; after multiplication weights are f(nτ)."], ["乘点列后只在离散位置留下加权脉冲；画中的绿线是参照。", "Multiplication leaves weighted impulses only at discrete positions; the green curve is a reference."]]),
        stage(["四｜二维不必等间距", "4 | Two independent directions"], ["切二维。图为便于一个滑块演示取 a=b=τ；一般模型可以让 x 间距 a 和 y 间距 b 不同。", "Switch to 2D. One slider sets a=b=τ in this demo; the general model allows different x-spacing a and y-spacing b."], { grid: true, tau: 2 }, [["a=2、b=3 时 (4,−3) 在格点上", "For a=2,b=3, (4,−3) is a lattice point"], ["a=2、b=3 时 (3,−4) 在格点上", "For a=2,b=3, (3,−4) is a lattice point"], ["二维格点必须只在第一象限", "The lattice lies only in the first quadrant"]], 0, [["对。n=2、m=−1；两个方向的整数可独立取正、负或零。", "Yes. n=2,m=−1; integer indices can each be positive, negative or zero."], ["x=3 不是 2 的整数倍，y=−4 不是 3 的整数倍。", "x=3 is not a multiple of 2 and y=−4 is not a multiple of 3."], ["整数索引也包括负数，阵列跨越四个象限。", "Integer indices include negatives, so the train spans all four quadrants."]]),
        stage(["五｜未画出的曲线", "5 | A curve not shown"], ["新情境：不是图中的 f，而是 g(x)=1+x²，与 τ=3 的单位点列相乘。第一支正向样点 x=τ 的权重是多少？图中没有 g 的读数。", "New case: multiply g(x)=1+x², not the plotted f, by a unit train of spacing τ=3. What is the first positive impulse's weight? The chart does not display g."], { grid: false, tau: 2 }, [["10", "10"], ["4", "4"], ["1，因为未加权的 δ 是单位权重", "1, because an unweighted delta has unit weight"]], 0, [["对。该点位于 x=3，g(3)=1+3²=10；这不是箭头的普通高度。", "Yes. That site is x=3, and g(3)=1+3²=10; this is not an ordinary arrow height."], ["4 是 g(√3)；不要忘记把 x=3 代入平方。", "4 is g(√3); square the sample position x=3."], ["单位权重只在乘 g 之前；乘后权重为 g(3)。", "Unit weight applies before multiplying by g; afterward the weight is g(3)."]])
      ],
      steps: [
        step(["由上一节一个单位 δ 出发，把它平移到每个整数 n 的位置再求和；n 遍历所有整数，包括负数和零。comb(x) 是分布，不是许多可以点值相加的普通尖峰。", "Start with one unit delta, shift it to each integer n and sum over all integers, including negatives and zero. comb(x) is a distribution, not pointwise addition of ordinary spikes."], ["在 x=−1、0、1 都有一个单位权重位置；图只绘出有限的一段，并用箭头表示位置和权重。", "There is a unit-weight location at x=−1,0,1; the figure shows a finite segment and marks each by an arrow."], ["若所需间距不是 1 而是 τ，必须同时改变位置和缩放后的权重。", "For spacing τ instead of 1, rescale positions and also correct the scaled weights."], [["把测试函数想成只在一个有限区间内非零的窗口（这就是“紧支撑”）。例如窗口是 [-2.5, 2.5] 时，只会留下 n=−2、−1、0、1、2；窗口外的整数点因为 φ(n)=0，不会贡献。", "Think of the test function as a window that is nonzero only on a finite interval (this is compact support). For example, if the window is [-2.5, 2.5], only n=−2,−1,0,1,2 remain; outside it, φ(n)=0, so those integer sites contribute nothing."], String.raw`\int\phi(x)\operatorname{comb}(x)\,dx=\sum_{n\in\mathbb Z}\phi(n)`, ["因此图中箭头代表每个整数点的积分权重 1，而非有限峰高。", "Thus each arrow marks unit integral weight at an integer, not a finite peak height."]]),
        step(["τ>0 与 x 同单位。先把 comb 的自变量换成 x/τ，整数位置便成 x=nτ；但一维缩放 δ((x−nτ)/τ)=τδ(x−nτ)，所以还须乘 1/τ 才使每点保持单位权重。", "Take τ>0 in the same unit as x. Replacing the comb argument by x/τ moves sites to x=nτ, but 1D scaling gives δ((x−nτ)/τ)=τδ(x−nτ); multiply by 1/τ to restore each unit weight."], ["τ=2 mm 时位置是 …,−4,−2,0,2,4,… mm；点数变少，但每个理想点对积分仍贡献单位权重。", "For τ=2 mm the locations are …,−4,−2,0,2,4,… mm; there are fewer sites but each ideal point still contributes unit integral weight."], ["有了单位点列，再乘连续的 f，才能描述它在这些位置的抽样值。", "With a unit train, multiply by continuous f to represent sampled values at those sites."], [["逐项应用 δ 的一维缩放式，并说明 τ 为正。", "Apply the 1D delta scaling to each term; τ is positive."], String.raw`\delta\!\left(\frac{x}{\tau}-n\right)=\tau\delta(x-n\tau),\qquad \frac1\tau\operatorname{comb}(x/\tau)=\sum_{n\in\mathbb Z}\delta(x-n\tau)`, ["前面的 1/τ 消去缩放引入的 τ，得到每支权重 1。", "The prefactor 1/τ cancels the scaling factor τ, leaving unit weights."]]),
        step(["假设 f 在每个采样点连续。上一节的 δ 筛选性质告诉我们：f(x) 与 x=nτ 处的单位脉冲相乘，只留下 f(nτ) 作为该脉冲的积分权重；对各点求和便得到等距抽样。", "Assume f is continuous at each sample site. Delta's sampling rule says multiplying f(x) by the unit impulse at x=nτ leaves weight f(nτ); sum over sites for uniform sampling."], ["本图 f(2)=0.1、f(1)=0.5。改变 τ 会取到不同位置；得到样点不等于已证明可以无误重建，抽样条件将在后文学习。", "Here f(2)=0.1 and f(1)=0.5. Changing τ selects different locations; discrete samples alone do not prove exact recovery. Sampling conditions come later."], ["一维点列可沿两个坐标轴相乘，构成理想的二维格点。", "Multiply 1D trains along two coordinates to build an ideal 2D lattice."], [["对每个 n 单独使用上一节的 fδ 乘积规则，再求和。", "Use the previous fδ product rule for each n, then sum."], String.raw`f(x)\delta(x-n\tau)=f(n\tau)\delta(x-n\tau)\ \Longrightarrow\ f(x)\sum_n\delta(x-n\tau)=\sum_n f(n\tau)\delta(x-n\tau)`, ["箭头长度只是这些权重的视觉编码，不是 δ 的普通高度。", "Arrow length only encodes these weights; it is not delta's ordinary height."]]),
        step(["令 a、b>0 分别是 x、y 的长度间距，格点坐标为 (na,mb)。二维 δ 的单位是 1/面积；将两个一维单位点列相乘，两个缩放分别带来 1/a、1/b 的补偿。", "Let a,b>0 be length spacings in x,y, with lattice coordinates (na,mb). A 2D delta has inverse-area units; multiply two 1D unit trains, with factors 1/a and 1/b for the respective scalings."], ["当 a=2 mm、b=3 mm，(4,−3) mm 对应 (n,m)=(2,−1)。演示图只有一个 τ 滑块，暂设 a=b=τ；圆点大小不表示实际孔径。", "For a=2 mm,b=3 mm, (4,−3) mm has (n,m)=(2,−1). The demo has one τ slider and sets a=b=τ; drawn dot size is not a physical aperture."], ["这是理想点孔或点光源阵列的数学记号；真实孔径具有有限尺寸、响应与采样窗口，不能直接拿点阵图当成实验成像。", "This is mathematical notation for an ideal pinhole or point-source array; real apertures have finite size, response and field of view, so the dots are not measured images."], [["两个方向的单位点列相乘，逐对得到二维 δ；分别应用缩放。", "Multiply the unit trains in each direction into 2D deltas, scaling each direction separately."], String.raw`\left[\frac1a\operatorname{comb}(x/a)\right]\left[\frac1b\operatorname{comb}(y/b)\right]=\sum_{n,m\in\mathbb Z}\delta(x-na,y-mb)`, ["每个格点的积分权重是 1；1/(ab) 是乘积缩放的补偿，不是格点普通高度。", "Each site has unit integral weight; 1/(ab) compensates for two scalings, not ordinary dot height."]])
      ]
    };
  window.FourierIndependentLabData["1.2.2"] = [
    S(["先排位置", "Place the sites"],
      ["τ 是相邻采样点的间隔，n 是整数编号。改变 τ，观察位置 nτ；箭头表示权重，不表示有限峰高。", "τ is the spacing and n an integer site index. Change τ and inspect positions nτ. Arrows denote weights, not finite peak heights."],
      "comb", { tau: 1, sample: 1, grid: false, weighted: false }, ["tau", "sample"],
      [["τ=2 时位置为 …−2,0,2…", "At τ=2: …−2,0,2…"], ["位置仍是所有整数", "Sites stay at every integer"], ["间距变大，位置变密", "Larger spacing makes denser sites"]], 0,
      [["对。每个编号都乘以间距。", "Yes. Multiply each index by spacing."], ["只有τ=1才是所有整数位置。", "Integer sites correspond to τ=1 only."], ["间距增大使点列更稀。", "Larger spacing makes the train sparser."]],
      ["梳状函数是理想 δ 的无限列；图只画有限视野。", "A comb is an infinite train of ideal deltas; only a finite field is drawn."],
      ["位置伸缩还会改变未归一化 comb 的权重。", "Coordinate scaling also changes an unnormalized comb's weights."]),
    S(["伸缩后补回权重", "Restore weights after scaling"],
      ["图中比较 comb(x/τ) 与前面乘1/τ的点列。改变 τ，比较每个箭头旁标出的积分权重。", "Compare comb(x/τ) with the train multiplied by 1/τ. Change τ and compare the integral weights printed by the arrows."],
      "combScale", { tau: 2, sample: 1 }, ["tau"],
      [["未补偿时每支权重τ，补偿后为1", "Uncorrected weight τ; corrected weight 1"], ["两者永远都是1", "Both always have weight 1"], ["补偿后位置变回整数", "Correction restores integer positions"]], 0,
      [["对。δ(x/τ−n)=τδ(x−nτ)，τ>0。", "Yes. δ(x/τ−n)=τδ(x−nτ), τ>0."], ["忽略了δ的缩放性质。", "That misses delta's scaling property."], ["外面乘系数只改权重，不改位置。", "An outside factor changes weights, not positions."]],
      ["先分清“位置”与“每支权重”，再用梳状函数采样。", "Separate sites from per-impulse weights before sampling."],
      ["让连续函数给每支脉冲写入不同权重。", "Let a continuous function assign different weights."], String.raw`\frac1\tau\operatorname{comb}(x/\tau)=\sum_{n\in\mathbb Z}\delta(x-n\tau)`),
    S(["样点留下函数值", "Samples retain function values"],
      ["蓝线为 f(x)=0.5+0.4cos(πx/2)。点列乘 f 后，第 n 支的权重是 f(nτ)。改变 n 和 τ，看所选样点。", "Blue is f(x)=.5+.4cos(πx/2). Multiplication assigns weight f(nτ) to site n. Change n and τ and inspect the selected sample."],
      "comb", { tau: 2, sample: 1, grid: false, weighted: true }, ["tau", "sample"],
      [["τ=2,n=1 时权重0.1", "At τ=2,n=1: weight .1"], ["权重仍固定为1", "Weight remains fixed at 1"], ["输出是连续蓝线本身", "The output is the continuous blue curve"]], 0,
      [["对。cosπ=−1，所以0.5−0.4=0.1。", "Yes. cosπ=−1, so .5−.4=.1."], ["乘f后不能继续忽略该点的f值。", "Multiplication by f assigns its value at that site."], ["乘积只在离散位置带权，不包含间隙里的全部值。", "The product is weighted at discrete sites, not all gap values."]],
      ["抽样是连续函数与点列相乘，不是卷积；卷积点列会在后面生成移位副本。", "Sampling multiplies by a comb; it does not convolve. Convolving a train later creates shifted copies."],
      ["从线上的位置对扩展到平面上的位置对。", "Extend line sites to planar coordinate pairs."]),
    S(["两个方向分别计数", "Count two directions separately"],
      ["横向间距 τ，纵向间距 b。把 b 从1改为2，观察哪些坐标改变；每点权重仍为1。", "Horizontal spacing is τ and vertical spacing b. Change b from 1 to 2 and inspect which coordinates move; each weight remains 1."],
      "comb", { tau: 1.5, b: 1, sample: 1, grid: true }, ["tau", "b"],
      [["横坐标 nτ 不变，纵坐标 mb 改变", "nτ stays fixed; mb changes"], ["两个方向都乘2", "Both directions double"], ["权重自动变为b", "Weights automatically become b"]], 0,
      [["对。两个整数编号独立。", "Yes. The integer indices are independent."], ["只改了纵向参数。", "Only the vertical parameter changed."], ["这里直接画单位权重δ列，已包含1/(τb)补偿。", "These unit-weight deltas already include the 1/(τb) correction."]],
      ["二维单位点列为两方向单位点列之积；间距可以不同。", "The unit-weight 2D lattice is the product of two trains, with possibly unequal spacings."],
      ["点列已得到；它是否足以决定点间曲线？", "Does the train determine the curve between sites?"]),
    S(["同样点列，别样曲线", "Same samples, different curves"],
      ["橙线 q(x)=f(x)+0.3sin(πx/τ)，蓝线为 f。改变 τ：两条线在 nτ 上相同，在点间是否相同？", "Orange is q(x)=f(x)+.3sin(πx/τ), blue is f. Change τ: they agree at nτ, but do they agree between sites?"],
      "combAlias", { tau: 1.5, sample: 1 }, ["tau"],
      [["点间可以不同", "They can differ between sites"], ["采样相同就处处相同", "Equal samples imply equal curves everywhere"], ["点间必为0", "All gap values must be zero"]], 0,
      [["对。sin(nπ)=0，但点间通常不为0。", "Yes. sin(nπ)=0, but not generally between sites."], ["没有额外频带条件，不能唯一重建。", "Unique reconstruction needs additional bandwidth conditions."], ["理想采样没有提供间隙里的函数值。", "Ideal samples do not supply gap values."]],
      ["这里是非唯一性的具体反例，不提前把尚未讲授的采样定理当已证明。", "This is a concrete nonuniqueness counterexample, not a proof of the later sampling theorem."],
      ["抽样与复制只差一个运算符，却给不同对象。", "Sampling and replication use different operations and produce different objects."]),
    S(["乘法不是卷积", "Multiplication is not convolution"],
      ["切换“采样”和“副本叠加”。输入仍为同一条高斯，τ 控制点列间距；看看输出保留样点还是整条副本。", "Switch sampling and replica addition. The input is the same Gaussian; τ sets train spacing. Does the result retain values or whole copies?"],
      "combOperation", { tau: 2, operation: "multiply" }, ["tau", "operation"],
      [["乘法留样值，卷积叠加移位副本", "Multiplication samples; convolution adds shifted copies"], ["两者完全一样", "The operations are identical"], ["卷积只留原点值", "Convolution retains only the origin value"]], 0,
      [["对。每个δ在两种运算里承担不同角色。", "Yes. Each delta plays a different role."], ["一个是点列分布，一个是副本构成的连续函数。", "One is a weighted impulse distribution; the other a continuous sum of copies."], ["卷积给整个移位函数，不是单个数。", "Convolution produces whole shifted functions, not one number."]],
      ["画面的副本和取有限项近似，非无限列的收敛证明。", "Displayed replica sums are finite approximations, not proofs of infinite-series convergence."],
      ["换一个样点独立算权重。", "Compute a new sample weight independently."]),
    S(["新间隔的权重", "Weight at a new spacing"],
      ["仍用 f(x)=0.5+0.4cos(πx/2)，取τ=1，n=2。预测单位点列乘 f 后这支的权重。", "Use f(x)=.5+.4cos(πx/2), τ=1 and n=2. Predict this impulse weight after multiplication."],
      "comb", { tau: 1, sample: 2, weighted: true }, [],
      [["0.1", ".1"], ["0.9", ".9"], ["2", "2"]], 0,
      [["位置2，f(2)=0.1。", "The site is 2, with f(2)=.1."], ["0.9是位置0的值，不是位置2。", ".9 is the value at zero, not at 2."], ["2是位置，不能当作函数值。", "2 is position, not function value."]],
      ["位置 nτ、权重 f(nτ)、间距 τ 各有角色。", "Site nτ, weight f(nτ), and spacing τ have distinct roles."],
      ["回顾位置→权重→抽样→边界。", "Recap sites, weights, sampling and limits."]),
  ];
  window.FourierIndependentRecaps["1.2.2"] = [
      ["先排间距2的位置", "Place sites at spacing 2", "comb", { tau: 2, sample: 1 }],
      ["补偿伸缩权重", "Correct scaled weights", "combScale", { tau: 2 }],
      ["乘函数写入样值", "Multiply to assign sample values", "comb", { tau: 2, sample: 1, weighted: true }],
      ["相同样值并不唯一", "Equal samples are not unique", "combAlias", { tau: 2 }],
    ];
  window.FourierIndependentNotes.setups["1.2.2"] = P("把单个理想点排成等间隔点列。先定位每个点，再补偿伸缩权重，最后让连续函数给样点赋值。", "Arrange individual impulses at equal intervals. Locate sites, correct scaling weights, then let a continuous function assign the sample weights.");
  window.FourierSectionSymbolOverrides["1.2.2"] = [
      ["\\tau", "横向点列间距", "Horizontal train spacing", "长度；图中无量纲", "Length; dimensionless demo", "tau"],
      ["b", "二维格点的竖直间距", "Vertical lattice spacing", "长度", "Length", "b"],
      ["n", "样点的整数编号", "Integer sample index", "无量纲", "Dimensionless", "sample"],
      ["f(n\\tau)", "采样后第n支的积分权重", "Integral weight at sampled site n", "与f相同；不是δ峰高", "Same as f; not a delta peak height"],
    ];
  const line = (zh, en, tex, resultZh, resultEn) => ({ lead: p(zh, en), tex, read: p(resultZh, resultEn) });
  const auditEntries = [
      ["(1-24)", line("目标：用一个单位点生成整数格点。先平移单位脉冲并验证单点权重。", "Goal: generate integer sites from a unit impulse. Shift it and verify one site's weight first.", String.raw`\int\phi(x)\delta(x-n)dx=\phi(n),\qquad n\in\mathbb Z`, "对整数求和是测试函数在这些位置取值的总和，不是把箭头高度相加。", "Summing over integers collects test-function values at those sites, not arrow heights.")],
      ["(1-25)", line("目标：变更间距而不改变每点权重。先定位 comb(x/τ) 的零点。", "Goal: change spacing without changing each site's weight. Locate the impulses in comb(x/τ) first.", String.raw`x/\tau=n\Longrightarrow x=n\tau;\qquad \delta((x-n\tau)/\tau)=\tau\delta(x-n\tau)`, "位置变为 nτ，缩放又把每个积分权重乘 τ；因此必须除以 τ。", "Sites move to nτ but scaling multiplies each integral weight by τ; divide by τ.")],
      ["(1-26)", line("目标：看加权采样究竟留下什么。只检查一个点 nτ。", "Goal: see what weighted sampling actually keeps. Check one site nτ first.", String.raw`\int f(x)\phi(x)\delta(x-n\tau)dx=f(n\tau)\phi(n\tau)`, "因此该处 δ 的权重由 1 改为 f(nτ)；对 n 求和得到整个抽样式。", "Thus its delta weight changes from 1 to f(nτ); sum over n for the whole sampling expression.")],
      ["(1-27)", line("目标：构造二维位置。先分别用 x、y 两组一维单位点列。", "Goal: build 2D sites. Start from two one-dimensional unit trains, one on each axis.", String.raw`\sum_n\delta(x-na)\;\sum_m\delta(y-mb)=\sum_{n,m}\delta(x-na)\delta(y-mb)`, "右边每项都对应一个坐标 (na,mb)；这才是二维阵列的单位权重点。", "Each right-hand term sits at (na,mb); these are the 2D unit-weight sites.")]
  ];
  if (auditEntries.length !== window.FourierGuides["1.2.2"].steps.length) throw new Error("Incomplete textbook audit: 1.2.2");
  auditEntries.forEach(([source, intermediate], i) => {
    window.FourierLessons.find(lesson => lesson.id === "1.2.2").notes[i].source = source;
    window.FourierGuides["1.2.2"].steps[i].proof.unshift(intermediate);
  });
  window.FourierLessons.find(lesson => lesson.id === "1.2.2").symbols = window.FourierSectionSymbolOverrides["1.2.2"].map(([tex, zh, en, unitZh, unitEn, control]) => ({
    tex, meaning: P(zh, en), unit: P(unitZh, unitEn),
    condition: P("按当前实验步骤；未显示读数表示本步未指定", "Current experiment step; no reading means unspecified in this step"), control,
  }));

  // Section-owned chart models, explanations, controls and notes mapping.
  window.FourierSectionRuntime["1.2.2"] = {
    models: ["comb", "combScale", "combOperation", "combAlias"],
    noteStages: [0, 1, 2, 3],
      controls: {
      tau: ["tau", P("采样间距 τ", "Sample spacing τ"), .75, 2.5, .25],
      b: ["b", P("纵向间距 b", "Vertical spacing b"), .5, 2, .25],
      sample: ["sample", P("样点编号 n", "Sample index n"), -1, 1, 1],
      operation: ["operation", P("运算", "Operation"), [["multiply", P("相乘采样", "Multiply / sample")], ["convolve", P("卷积复制", "Convolve / replicate")]]],
    },
    create(tools) {
      const { t, fmt, gauss, graph, stems, legend, block } = tools;
      function drawScene(model, s) {
        if (model.startsWith("comb")) {
          const tau = s.tau;
          if (s.grid) {
            return { graphic: `<svg class="il-graph" viewBox="0 0 550 300" role="img" aria-label="${t("二维单位权重点列", "2D unit-weight lattice")}">${Array.from({ length: 7 }, (_, i) => Array.from({ length: 7 }, (_, j) => `<circle cx="${275 + (i - 3) * tau * 27}" cy="${150 - (j - 3) * s.b * 20}" r="4" fill="#245b66"/>`).join("")).join("")}<path d="M275 150h${tau * 27}m0 0l-5 -3m5 3l-5 3M275 150v${-s.b * 20}" stroke="#ae5130" fill="none"/><text x="280" y="180">τ=${tau}</text><text x="287" y="${148 - s.b * 10}">b=${s.b}</text><text x="20" y="24">(nτ,mb), ${t("每点权重1", "weight 1 per site")}</text></svg>`, readout: `${t("位置", "Sites")}: (n×${tau}, m×${s.b}) · ${t("权重补偿", "weight correction")}: 1/(τb)=${fmt(1 / (tau * s.b))}` };
          }
          const f = model === "combOperation" ? gauss : x => .5 + .4 * Math.cos(Math.PI * x / 2);
          const xs = Array.from({ length: 2 * Math.floor(4 / tau) + 1 }, (_, i) => (i - Math.floor(4 / tau)) * tau);
          if (model === "combScale") return { graphic: stems(xs.map(x => [x, tau]), "comb(x/τ)", 0, 3.5) + stems(xs.map(x => [x, 1]), "(1/τ) comb(x/τ)", 0, 3.5), readout: t(`位置相同；上：权重${tau}，下：权重1`, `Same sites; top weight ${tau}, bottom weight 1`) };
          const curves = [{ fn: f }];
          if (model === "combAlias") curves.push({ fn: x => f(x) + .3 * Math.sin(Math.PI * x / tau) });
          if (model === "combOperation" && s.operation === "convolve") {
            return { graphic: legend("蓝：原高斯；橙：n=−8…8的移位副本和", "Blue: original Gaussian; orange: shifted-copy sum for n=−8…8") + graph([curves[0], { fn: x => Array.from({ length: 17 }, (_, i) => gauss(x - (i - 8) * tau)).reduce((a, b) => a + b, 0) }], { xmin: -4, xmax: 4, ymax: 3 }), readout: t(`副本中心 n×${tau}；不是样点乘积`, `Replica centers n×${tau}; not a sampled product`) };
          }
          const weighted = s.weighted || model === "combOperation" || model === "combAlias";
          return { graphic: graph(curves, { xmin: -4, xmax: 4, ymax: 1.3, marker: (s.sample || 0) * tau }) + stems(xs.map(x => [x, weighted ? f(x) : 1]), weighted ? "f(nτ) δ(x−nτ)" : "Σ δ(x−nτ)", 0, 1.4), readout: `τ=${tau} · n=${s.sample || 0} · nτ=${fmt((s.sample || 0) * tau)} · ${t("权重", "weight")}=${fmt(weighted ? f((s.sample || 0) * tau) : 1)}` };
        }
      }
      function explanation(model, s) {
        if (model.startsWith("comb")) {
          if (s.grid) return block(
            ["蓝点是理想脉冲的位置，不表示孔径大小。n、m取所有整数，τ是水平间距，b是竖直间距；橙线段示意这两个间距。每点权重为1，不由点的圆面积计算。", "Blue dots locate ideal impulses, not aperture sizes. n,m range over integers; τ,b are horizontal and vertical spacings, indicated by orange segments. Each site has weight 1, independent of drawn dot area."],
            String.raw`\frac{1}{\tau b}\operatorname{comb}(x/\tau)\operatorname{comb}(y/b)=\sum_{n,m\in\mathbb Z}\delta(x-n\tau)\delta(y-mb)`,
            [`本图位置为(n×${s.tau},m×${s.b})。未补偿的缩放会使每点权重变为τb=${fmt(s.tau * s.b)}；乘$\\frac{1}{\\tau b}$=${fmt(1 / (s.tau * s.b))}后才是单位点列。`, `Sites are (n×${s.tau},m×${s.b}). Uncompensated scaling gives each weight τb=${fmt(s.tau * s.b)}; multiplying by $\\frac{1}{\\tau b}$=${fmt(1 / (s.tau * s.b))} restores unit weights.`]);
          if (model === "combScale") return block(
            ["comb（梳状函数）是等距理想脉冲之和；δ读德尔塔，箭头只编码位置和积分权重，蓝橙交替仅为分辨相邻点，不代表两种信号。上图未补偿，下图补偿。", "Comb is a train of equally spaced ideal Dirac impulses δ. Arrows encode location and integral weight; alternating colors only distinguish adjacent sites. Top is uncorrected scaling, bottom corrected."],
            String.raw`\operatorname{comb}(x/\tau)=\tau\sum_{n\in\mathbb Z}\delta(x-n\tau),\quad\frac1\tau\operatorname{comb}(x/\tau)=\sum_{n\in\mathbb Z}\delta(x-n\tau),\quad\tau>0`,
            [`位置都在n×${s.tau}；上图每点权重${s.tau}，再乘$\\frac{1}{${s.tau}}$后下图每点权重为1。箭头不是普通曲线，不能把箭头围出的三角形面积当权重。`, `Sites are n×${s.tau} in both charts. Top weights ${s.tau}, multiplied by $\\frac{1}{${s.tau}}$ to give bottom weights 1. Arrow-triangle areas have no integral meaning.`]);
          const op = model === "combOperation", replicated = op && s.operation === "convolve";
          const n = s.sample || 0, x = n * s.tau, f = op ? gauss : u => .5 + .4 * Math.cos(Math.PI * u / 2);
          return block(
            [replicated ? "蓝线是原高斯$f(x)=e^{-\\pi x^2}$，橙线是整条函数的移位副本相加。τ是副本间隔，*表示卷积；这里不是逐点相乘取样。" : `上图蓝线是${op ? "高斯$f(x)=e^{-\\pi x^2}$" : "$f(x)=0.5+0.4\\cos(\\pi x/2)$"}，横轴x是位置；下图箭头表示位置nτ上的权重，非δ的实际峰高。n为整数编号，τ为间距，虚竖线标当前样点。`, replicated ? "Blue is the original Gaussian $f(x)=e^{-\\pi x^2}$; orange sums shifted copies of the whole function. τ is their spacing and * denotes convolution, not pointwise sampling." : `Blue is ${op ? "Gaussian $f(x)=e^{-\\pi x^2}$" : "$f(x)=0.5+0.4\\cos(\\pi x/2)$"}; x is position. Lower arrows give integral weights at nτ, not delta peak heights. n is an integer index, τ is spacing, and the vertical dashed line marks the sample.`],
            replicated ? String.raw`(f*\sum_n\delta(\cdot-n\tau))(x)=\sum_n f(x-n\tau)` : String.raw`f(x)\sum_n\delta(x-n\tau)=\sum_n f(n\tau)\delta(x-n\tau)`,
            [replicated ? `当前间距τ=${s.tau}；程序用n=−8到8的17个副本求和，每个副本先把横坐标改成x−nτ，再求高斯值；有限副本只近似无限点列的卷积。` : `当前n=${n}，位置nτ=${n}×${s.tau}=${fmt(x)}。${s.weighted || op || model === "combAlias" ? `将这个位置代入f得权重${fmt(f(x))}` : "本步是未加权单位点列，每支权重1，上方f仅作后续取样对照"}。上下图纵轴分别为函数值与积分权重，不能当同一种峰高比较。`, replicated ? `For τ=${s.tau}, the program sums 17 copies n=−8…8, evaluating the Gaussian at x−nτ for each. This finite sum only approximates convolution with an infinite train.` : `For n=${n}, nτ=${n}×${s.tau}=${fmt(x)}. ${s.weighted || op || model === "combAlias" ? `Substitution into f gives weight ${fmt(f(x))}` : "This unweighted train has weight 1 at every site; f is shown for the later sampling comparison"}. The two vertical axes are function value and integral weight, not comparable peak heights.`],
            model === "combAlias" ? ["上图橙线是$f(x)+0.3\\sin(\\pi x/\\tau)$；在x=nτ处新增项为0，所以不同连续曲线可以有相同样点。此图不能证明能从样点唯一重建。", "Orange is $f(x)+0.3\\sin(\\pi x/\\tau)$. At x=nτ the added term is zero, so distinct continuous curves share these samples. Unique reconstruction does not follow."] : undefined);
        }
        return "";
      }
      return { drawScene, explanation, calculate: {} };
    },
  };
})();

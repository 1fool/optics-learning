/* Section 1.4.1: bilingual lesson, guided path, experiment and reference data. */
(() => {
  const { pair, formula, question, symbol, p, stage, step, sym, block, q, origin, P, S, commonSymbols, corrSymbols } = window.FourierSectionBuilders;
  const crossStages = [
    stage(["先对齐", "Align the signals"], ["选两段位置相同的矩窗，观察 x=0 时乘积的面积。", "Select two rectangles at the same location; inspect product area at x=0."], { ...origin }, [["此时重合最多", "This is maximum overlap"], ["此时没有重合", "There is no overlap"], ["相关等于两峰之和", "Correlation sums the peaks"]], 0, [["对。对于相同的窗，零位移给最大交集。", "Yes. Identical windows overlap maximally at zero lag."], ["图中两段在同一位置。", "Both windows occupy the same interval."], ["相关积分是乘积面积，不是峰值相加。", "Correlation integrates a product, not peak values added."]]),
    stage(["只平移不折转", "Shift without flipping"], ["将第二个窗中心放在 s=1；对照卷积的“折转再移”。", "Move the second-window center to s=1; contrast with convolution's flip-and-shift."], { ...origin, x0: 1 }, [["相关先取复共轭，再相对平移", "Correlation conjugates and relatively shifts"], ["相关必须先折转第二个函数", "Correlation must flip the second input"], ["相关一定没有位移变量", "Correlation has no lag"]], 0, [["对。按教材约定 r_fg(x)=∫f(ξ)g*(ξ−x)dξ。", "Yes. In the book's convention r_fg(x)=∫f(ξ)g*(ξ−x)dξ."], ["镜像是把相关改写成卷积时对 g* 进行的操作。", "Reflection appears when rewriting correlation as a convolution."], ["输出的 x 正是相对位移。", "The output x is the relative lag."]]),
    stage(["峰值在哪边", "Locate the peak"], ["保持 g 比 f 向右偏 s=1；改变 x 寻找两窗重合的位置。", "Keep g shifted right by s=1 and vary x to find the best alignment."], { ...origin, x0: 1, lag: -1 }, [["峰在 x=−1", "Peak is at x=−1"], ["峰在 x=+1", "Peak is at x=+1"], ["没有峰", "There is no peak"]], 0, [["对。g(ξ−x) 的中心在 s+x，取 x=−s 才对齐 f。", "Yes. g(ξ−x) centers at s+x; x=−s aligns it with f."], ["请注意本书的 g(ξ−x) 定义，符号不是凭图猜。", "Use the book's g(ξ−x) convention to determine the sign."], ["有限窗能重合，因而有峰。", "Finite windows can overlap and produce a peak."]]),
    stage(["次序与符号", "Order and sign"], ["交换 f、g，同时保留教材位移定义；原来的峰发生什么？", "Exchange f and g while keeping the same lag convention. What happens to the peak?"], { ...origin, x0: -1 }, [["反向位移（复数时另取共轭）", "Lag reverses (and conjugates if complex)"], ["峰位置完全不变", "Peak location never changes"], ["相关和卷积都无次序影响", "Both operators ignore input order"]], 0, [["对。r_fg(x)=r_gf*(−x)，实信号时峰的位置取反。", "Yes. r_fg(x)=r_gf*(−x); for real signals the peak reverses."], ["对于不同位置的输入，次序会改变位移符号。", "For displaced inputs, order reverses the lag sign."], ["卷积可换序，相关一般不能直接交换。", "Convolution commutes; correlation generally does not."]]),
    stage(["新相对位移", "New relative displacement"], ["若 g 相对 f 向左偏 s=−1.5，依 r_fg 的定义峰在哪里？答后再显示输出。", "If g lies left of f by s=−1.5, where is the peak under r_fg? Reveal after choosing."], { ...origin, x0: -1.5, lag: 1.5 }, [["x=+1.5", "x=+1.5"], ["x=−1.5", "x=−1.5"], ["x=0", "x=0"]], 0, [["对。令 s+x=0，得 x=−s=+1.5。", "Yes. Set s+x=0, giving x=−s=+1.5."], ["这是原始 g 的偏移，不是最优相关位移。", "That is g's original offset, not the correlation peak lag."], ["只有初始位置一致才在零位移对齐。", "Zero lag aligns only initially coincident inputs."]])
  ];
  const item = {
      id: "1.4.1", title: ["互相关", "Cross-correlation"], pages: "16–17", pdf: "18–19", firstPage: 18,
      lead: ["两个信号相差多少位置？不先把响应折转，而是改变相对位移、比较乘积积分。", "How far apart are two signals? Shift one relative to the other and compare their product integral."],
      bridge: [["卷积把每个输入点的响应相加。", "Convolution sums the response from every input point."], ["相关改为判断两个信号相对平移时是否对齐。", "Correlation measures how well two signals align under relative shift."], ["若比较同一信号与自己，就得到自相关。", "Comparing a signal with itself gives autocorrelation."]], question: ["为什么峰的位置能告诉我们两个图案的相对位移？", "Why does the peak locate the relative displacement of two patterns?"], setup: ["教材先给平面图样的二维互相关定义 (1-36)，再给一维特例 (1-38)；图板只算实数一维矩窗。先看两图样能否对齐，再研究位移 x 的符号。", "The book starts with a 2D definition (1-36), then gives a 1D case (1-38). Our chart uses only real 1D rectangles. First test alignment, then determine the sign of lag x."], terms: [["位移符号由教材定义决定：若 g 原先比 f 向右 s，相关峰位于 x=−s。", "The book's lag sign matters: if g starts s to the right of f, correlation peaks at x=−s."], ["相关星号（运算符）与函数值右上角的复共轭星号用途不同。", "The correlation operator star differs from the superscript conjugation star on a function value."]], observe: ["先把 g 的中心 s 调到 +1，再让独立的相关位移 x 从 0 移到 −1，看两窗是否重合。", "Set g center s to +1, then move independent correlation lag x from 0 to −1 and inspect alignment."], stages: crossStages,
      recap: [["互相关把两个信号相对平移后逐点相乘、积分；复数第二项需共轭。", "Cross-correlation shifts the relative signals, multiplies and integrates; conjugate the second complex input."], ["本书定义下 g 向右偏 s 时 r_fg 的峰位于 −s。", "Under the book's convention g shifted right by s gives an r_fg peak at −s."], ["交换顺序一般会使位移反向，并对复结果取共轭。", "Swapping inputs reverses lag and conjugates the complex result."]],
      blocks: [
        block(["先读教材的二维定义 (1-36)", "Start with the book's 2D definition (1-36)"], ["问题是：两幅平面图样错开多少？固定一组试探位移 (x,y)，在扫描点 (ξ,η) 比较 f(ξ,η) 和 g*(ξ−x,η−y)，逐点相乘，再把整个平面的乘积加总。* 是复共轭，不是翻折；式子要求积分有意义。", "How far apart are two planar patterns? Fix test lag (x,y), compare f(ξ,η) with g*(ξ−x,η−y) at scan point (ξ,η), multiply pointwise and integrate over the plane. Superscript * conjugates; it does not reflect. The integral must exist."], String.raw`r_{fg}(x,y)=\iint_{-\infty}^{\infty}f(\xi,\eta)g^{*}(\xi-x,\eta-y)\,d\xi\,d\eta`, ["这正是教材 (1-36)，不是图板的一维公式。r_fg 是每个试探位移的相关输出；ξ、η 只是积分时遍历平面的坐标；若输入量纲是振幅，结果再乘面积单位。", "This is the book's (1-36), not the chart's 1D formula. r_fg is the output at each tested lag, while ξ,η scan the plane. If inputs have amplitude units, the output includes an area factor."], ["先观察 g 图样平移时哪里与 f 的有效区域相交；交集变大，实数单位窗的积分也变大。", "Observe where the shifted g overlaps f: for real unit windows a larger intersection yields a larger integral."], ["取二维单位高矩形，x=y=0 且两窗完全一致，交叠面积为窗面积；这一步只示范积分，不声称任意复信号的相关一定是正数。", "For identical 2D unit rectangles at zero lag, their correlation is their overlap area; this does not claim all complex correlations are positive."], ["图板只有横向坐标。下一步固定 y 方向不变，去掉 η 积分，才得到教材的一维式。", "The chart has one axis. Next restrict the model to one dimension to get the book's 1D case."], ["先逐点乘，再按面积积分；不要把积分记号误读成两图样峰值相加。", "Multiply at each scan position, then integrate area; do not add the two peak values."], String.raw`(x,y)=\mathrm{const.}\;\longrightarrow\;f(\xi,\eta)g^{*}(\xi-x,\eta-y)\;\longrightarrow\;\iint(\cdot)\,d\xi\,d\eta`, ["每试一次位移得到一个数；扫描所有位移才得到整幅相关图。", "Each trial lag yields one number; scanning all lags forms the correlation map."]),
        block(["回到一维矩窗 (1-38)", "Reduce to 1D rectangles (1-38)"], ["教材的一维特例 (1-38) 去掉 y、η，不是把二维积分简单写错成一维。f、g 是沿 ξ 的信号；x 是试探位移，改 x 就是让 g*(ξ−x) 沿 ξ 轴移动。图中实信号使共轭不改数值。", "The book's 1D case (1-38) removes y and η, not by silently changing a 2D integral. f,g vary with ξ; x is test lag and shifts g*(ξ−x). Conjugation leaves the chart's real values unchanged."], String.raw`r_{fg}(x)=\int_{-\infty}^{\infty}f(\xi)g^{*}(\xi-x)\,d\xi`, ["每个 x 得到一个重叠积分。若 f、g 为有限能量且积分存在，这是一维对应式；单位为 f 单位×g 单位×长度。", "Each x yields an overlap integral. For suitable finite-energy inputs, this is the 1D counterpart; units are f units × g units × length."], ["先固定 g 的原中心 s，再移动试探位移 x；在图板上看红窗中心是否移到蓝窗中心 0。", "Hold g's starting center s and vary trial lag x; watch whether the red window center reaches the blue center 0."], ["f 居中 0、g 居中 s=1，g(ξ−x) 居中 1+x；x=−1 时两窗重合，单位宽窗相关为 1，x=0 时刚好不重合、为 0。", "With f centered at 0 and g at s=1, g(ξ−x) centers at 1+x. At x=−1 unit-width windows coincide and correlation is 1; at x=0 they only touch and correlation is 0."], ["下一步把一维相关改写成卷积，辨清哪里才需要折转，并验证交换次序的符号。", "Next rewrite correlation as convolution to identify where reflection enters and verify the order/lag sign."], ["先写出两个窗各自的不为零区间，再求交集，不能由峰位置直接宣称积分值。", "Write each window's nonzero interval and find their intersection before claiming the integral value."], String.raw`f: [-\tfrac12,\tfrac12],\quad g(\xi-x):[s+x-\tfrac12,s+x+\tfrac12],\quad r_{fg}(x)=\max(0,1-|s+x|)`, ["当 s=1、x=−1，交集长 1；当 x=0，交集长 0。因此本模型的峰在 x=−s；它不是任意复杂图样必有的唯一峰。", "For s=1, x=−1 gives overlap 1 and x=0 gives 0. This model peaks at x=−s, not necessarily a unique peak for arbitrary patterns."]),
        block(["相关为何还能写成卷积 (1-39)", "Why correlation can be convolution (1-39)"], ["要借用卷积算法，先定义一个新函数 \widetilde g(u)=g*(−u)：这里才对第二函数反射，并对复数取共轭。把它放进已学卷积定义，不能把这一步误称为教材相关原式要先翻折。", "To reuse convolution, define a new function g-tilde(u)=g*(−u), reflecting and conjugating the second input here. Substitute it into the known convolution; this does not mean the original correlation definition first reflects g."], String.raw`\widetilde g(u)=g^{*}(-u),\qquad r_{fg}(x)=(f*\widetilde g)(x)`, ["将 u=x−ξ 代入新函数：g̃(x−ξ)=g*(ξ−x)，才与 (1-38) 相同；教材写作 f(x)∗g*(−x)，两者等价。这里卷积 ∗ 与上标共轭 * 的意义不同。", "Setting u=x−ξ gives g-tilde(x−ξ)=g*(ξ−x), matching (1-38). The book writes f(x)∗g*(−x), which is equivalent. Convolution ∗ differs from the conjugation superscript *."], ["把教材的相关原式与卷积形式逐项比对：哪个输入变了，积分坐标是否变了？", "Compare the original correlation and convolution forms: which input was transformed, and did the scan variable change?"], ["若 g 比 f 右移 1，r_fg 峰在 −1，交换输入后 r_gf 峰在 +1；一般复数值还须共轭。", "When g starts one unit right of f, r_fg peaks at −1, while r_gf peaks at +1; complex results are also conjugated."], ["同一信号与自己相关，接下来可以研究零位移为何特别。", "Correlating a signal with itself leads to a special zero-lag value."], ["从卷积定义展开，再代入 g̃ 的定义，最后换元检验交换次序；不要直接摆两个结论。", "Expand convolution, insert g-tilde, then substitute variables to check input swapping instead of merely listing results."], String.raw`\begin{aligned}(f*\widetilde g)(x)&=\int f(\xi)\widetilde g(x-\xi)\,d\xi\\&=\int f(\xi)g^{*}(-(x-\xi))\,d\xi=r_{fg}(x),\\r_{gf}^{*}(-x)&=\int g^{*}(u)f(u+x)\,du\\&=\int f(\xi)g^{*}(\xi-x)\,d\xi\quad(\xi=u+x).\end{aligned}`, ["第一条解释 (1-39) 为什么成立；第二条说明相关交换两输入须同时取反位移与复共轭，不能直接套卷积交换律。", "The first derives (1-39); the second shows that swapping correlation inputs also reverses lag and conjugates, unlike plain convolution commutativity."]),
      ],
      questions: [q("1.4.1:q1", ["本书 r_fg 中第二输入的作用是什么？", "What happens to the second input in the book's r_fg?"], [["取共轭并按 ξ−x 相对移动", "Conjugate and shift as ξ−x"], ["直接求导", "Differentiate it"], ["先乘 δ(0)", "Multiply by δ(0)"]], 0, [["对，g*(ξ−x) 决定共轭与位移约定。", "Yes. g*(ξ−x) fixes conjugation and lag convention."], ["相关并不要求求导。", "Correlation does not require differentiation."], ["δ(0) 不是普通乘数。", "δ(0) is not an ordinary multiplier."]]), q("1.4.1:q2", ["f、g是相同的宽1、高1实矩窗，g中心在f右侧1处。按r_fg定义，相关峰的试探位移x是？", "For identical real width-1, height-1 windows with g one unit right of f, at which trial lag x does r_fg peak?"], [["x=−1", "x=−1"], ["x=+1", "x=+1"], ["x=0", "x=0"]], 0, [["对，g*(ξ−x) 的中心在 1+x，取 x=−1 对齐。", "Yes. g*(ξ−x) centers at 1+x; x=−1 aligns it."], ["这是 g 的原始位置，不是相关峰位移。", "That is g's starting position, not the peak lag."], ["原两窗并未对齐。", "The windows start misaligned."]]), q("1.4.1:q3", ["一般复信号交换 r_fg 中的 f 与 g 后？", "What happens after swapping complex f,g in r_fg?"], [["位移反号且复共轭", "Reverse lag and conjugate"], ["值在原位不变", "Same values at same lags"], ["一定恒为零", "Always zero"]], 0, [["对，r_fg(x)=r_gf*(−x)。", "Yes: r_fg(x)=r_gf*(−x)."], ["相关一般不满足卷积的交换律。", "Correlation does not generally commute like convolution."], ["交换顺序不会消除信号的相似性。", "Swapping order does not erase similarity."]])]
    };
  item.symbols = item.id.startsWith("1.3") ? [...commonSymbols] : [...corrSymbols];
  item.symbols.push(sym("s", "第二信号相对第一信号的中心位置", "Second signal's center relative to the first", "长度", "length", "图中无量纲", "Dimensionless chart", "x0"), sym("x", "图板独立可调的相关位移", "Independently adjustable correlation lag in the chart", "长度", "length", "图中无量纲", "Dimensionless chart", "lag"));
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
  window.FourierIndependentLabData["1.4.1"] = [
    S(["先给一次对齐评分", "Score one alignment"],
      ["f和g均为宽1、高1的实矩窗。s是g原来的中心，x是试探位移，图中移动窗为g(ξ−x)，中心s+x；ξ是逐点相乘的输入坐标。", "f and g are real width-1 height-1 rectangles. s is g's original center, x is trial lag; g(ξ−x) has center s+x. ξ indexes pointwise products."],
      "cross", { shift: 0, lag: 0, phase: 0, repeated: false }, ["lag"],
      [["乘积积分随交叠长度变", "Product integral follows overlap length"], ["把两峰高度相加", "Add peak heights"], ["相关就是相似度百分比", "Correlation is a similarity percentage"]], 0,
      [["对。这里两窗单位高，积分才恰等于长度。", "Yes. Unit heights make this integral equal overlap length."], ["相关相乘再积分，不直接加峰高。", "Correlation multiplies then integrates, rather than adding peaks."], ["没有归一化，不是百分比。", "Without normalization, it is not a percentage."]],
      ["这是一维实数例。一般相关要对第二个函数取复共轭。", "This is a 1D real example; general correlation conjugates the second function."],
      ["把原位置s和试探位移x分开操作。", "Operate original position s and trial lag x separately."], String.raw`r_{fg}(x)=\int f(\xi)g^*(\xi-x)\,d\xi`),
    S(["找回错开的条带", "Recover the offset"],
      ["先把g原中心设为s=1，再移动试探位移x；目标是让s+x=0。观察相关曲线的峰在何处。", "Set g's original center s=1, then change trial lag x. Align by making s+x=0. Locate the correlation peak."],
      "cross", { shift: 1, lag: 0, phase: 0 }, ["shift", "lag"],
      [["峰在x=−1", "Peak at x=−1"], ["峰在x=+1", "Peak at x=+1"], ["峰总在原点", "Peak always at zero"]], 0,
      [["对。本书位移约定下峰位为−s。", "Yes. The textbook convention gives peak lag −s."], ["你把原中心s直接当成了试探位移x。", "That confuses original center s with trial lag x."], ["只有原中心s=0时才在原点。", "Zero lag is the peak only when s=0."]],
      ["相关不先折转第二条曲线；g(ξ−x)是平移。负号的方向以本节定义为准。", "Correlation translates, rather than first reflecting, the second profile. Lag signs follow this definition."],
      ["实窗看不出共轭的作用，下一步引入相位。", "Real windows hide conjugation; add phase next."]),
    S(["共轭为什么不可省", "Why conjugation matters"],
      ["保留对齐形状，让g在窗内取 $e^{iφ}$；φ是相位，i²=−1。切换φ=0、π/2、π，比较相关的实部、虚部和模。", "Keep alignment and let g equal $e^{iφ}$ inside; φ is phase and i²=−1. Switch φ among 0, π/2 and π and compare real part, imaginary part and magnitude."],
      "cross", { shift: 0, lag: 0, phase: Math.PI / 2 }, ["phase", "lag"],
      [["φ=π/2 时相关为−i，模为1", "At φ=π/2: correlation −i, magnitude 1"], ["相关为+i", "Correlation +i"], ["复相关永远为实数", "Complex correlation is always real"]], 0,
      [["对。第二函数的共轭把+i变成−i。", "Yes. Conjugating the second function turns +i into −i."], ["这是漏掉共轭的乘积。", "That product omits conjugation."], ["实输入是特例，复相关可以含虚部。", "Real inputs are a special case; complex correlation can be nonreal."]],
      ["形状对齐不保证相关的实部为正；比较相似峰时须说明是在看实部还是模。", "Alignment does not ensure a positive real part; state whether comparing real part or magnitude."],
      ["交换输入后，这个复数和位移怎样变？", "What changes when the input order is exchanged?"]),
    S(["交换要反向且共轭", "Swap, reverse and conjugate"],
      ["选择交换输入，保留s=1、φ=π/2；扫描正负位移，比较两种次序的峰位与虚部。", "Swap inputs at s=1, φ=π/2. Scan positive and negative lags and compare peak positions and imaginary parts."],
      "cross", { shift: 1, lag: 1, phase: Math.PI / 2, swap: true }, ["swap", "lag"],
      [["峰由−1变+1，−i变+i", "Peak −1 to +1, −i to +i"], ["完全不变", "No change"], ["只反向，不需共轭", "Reverse lag only; no conjugation"]], 0,
      [["对。r_gf(x)=r_fg*(−x)。", "Yes. r_gf(x)=r_fg*(−x)."], ["那是把相关误当成可交换的卷积。", "That mistakes correlation for commutative convolution."], ["复数例里还要共轭。", "Complex signals also require conjugation."]],
      ["只对实函数才能把共轭省去，但通常仍须反转位移。", "Only real signals allow omission of conjugation; reversing lag is still generally needed."],
      ["能否先改造g，再借用卷积计算？", "Can we transform g first and then use convolution?"], String.raw`r_{gf}(x)=r_{fg}^{\,*}(-x)`),
    S(["借用卷积，但先改造输入", "Use convolution after transforming g"],
      ["原g中心s=1、相位π/2。切换显示g与g*(−u)：横轴u是该函数自己的坐标。观察中心与虚部一起怎样变。", "Original g has center s=1 and phase π/2. Switch g and g*(−u); u is that function's own coordinate. Inspect center and imaginary-part changes."],
      "crossKernel", { shift: 1, phase: Math.PI / 2, reflected: false }, ["reflected", "shift"],
      [["中心变−1，相位变−π/2", "Center −1; phase −π/2"], ["只移动，不改变相位", "Translation only; same phase"], ["原样与f卷积即可", "Convolve f with unchanged g"]], 0,
      [["对。折转加共轭后才能用卷积公式得到同一相关。", "Yes. Reflection and conjugation produce the convolution kernel for this correlation."], ["星号作用于复值，不是坐标平移。", "Conjugation changes complex values, not position."], ["缺少这两步时一般不是同一个运算。", "Without both operations it is generally a different calculation."]],
      ["此处只是相关的等价计算法；直接相关图中仍是g*(ξ−x)的平移。", "This is an equivalent computational route; direct correlation still translates g*(ξ−x)."],
      ["一次高峰是否总能唯一定位？", "Does a high peak always locate an offset uniquely?"], String.raw`r_{fg}=f*\widetilde g,\qquad \widetilde g(u)=g^*(-u)`),
    S(["重复结构会给多个峰", "Repeated structures yield multiple peaks"],
      ["g改为相隔2的两个相同矩窗，f仍为一个。移动x寻找能分别对齐的两处位置。", "Let g contain two identical rectangles separated by 2, with a single rectangle f. Scan x to align with each copy."],
      "cross", { shift: 0, lag: 0, phase: 0, repeated: true }, ["lag", "shift"],
      [["会出现两个同高峰", "Two equally high peaks"], ["只有一个峰才算相关", "Correlation must have one peak"], ["第二峰是数值错误", "The second peak is a numerical error"]], 0,
      [["对。两个重复结构都能完整对齐。", "Yes. Each repeated feature can align completely."], ["峰的唯一性不是定义的一部分。", "Peak uniqueness is not part of the definition."], ["这是输入的重复性造成，不是程序误差。", "Input repetition causes it, not numerical error."]],
      ["原始相关的峰受幅度、重复结构和观察范围影响；不能无条件读成唯一位移或百分比。", "Raw peaks depend on amplitude, repetition and observation range; they are not automatically a unique offset or a percentage."],
      ["回到一般平面信号，需要两个位移坐标。", "General planar signals need two lag coordinates."]),
    S(["平面里有两个位移", "Two lags in a plane"],
      ["两方形窗口一水平一竖直错开；x、y是试探位移。移动y，保持x=−1，观察交叠面积。", "Two square windows are offset horizontally and vertically; x and y are trial lags. Vary y at x=−1 and inspect overlap area."],
      "crossPlane", { shift: 1, sy: .5, lag: -1, ly: 0 }, ["ly"],
      [["y=−0.5时完全对齐", "Full alignment at y=−.5"], ["y=+0.5时对齐", "Alignment at y=+.5"], ["二维只需水平位移", "Only horizontal lag is needed"]], 0,
      [["对。两方向都要求原偏移加试探位移等于0。", "Yes. Each original offset plus trial lag must vanish."], ["竖直方向的符号同样由定义确定。", "The definition fixes the vertical sign too."], ["漏掉y会丢掉一整个方向的对齐条件。", "Omitting y loses a direction of alignment."]],
      ["二维是输入平面乘积的面积积分，不能把一维长度直接当面积。", "The 2D operation integrates product over area, not 1D length."],
      ["最后用新的s独立预测峰位。", "Predict the peak for a new s independently."]),
    S(["不看曲线找位移", "Find lag without the curve"],
      ["f在原点，g是中心s=−1.5的相同实矩窗。按本节r_fg(x)=∫f(ξ)g*(ξ−x)dξ，峰在哪？", "f is centered at zero; identical real g is centered at s=−1.5. For r_fg(x)=∫f(ξ)g*(ξ−x)dξ, where is the peak?"],
      "cross", { shift: -1.5, lag: 1.5, phase: 0 }, [],
      [["x=+1.5", "x=+1.5"], ["x=−1.5", "x=−1.5"], ["x=0", "x=0"]], 0,
      [["s+x=0，故x=+1.5。", "s+x=0 gives x=+1.5."], ["这是原偏移，不是对齐所需位移。", "That is the original offset, not the aligning lag."], ["原点只适用于未错开的输入。", "Zero works only for inputs with no initial offset."]],
      ["先写移动后中心，再解对齐条件，别凭箭头方向背符号。", "Write the shifted center, then solve alignment; do not memorize signs from arrows."],
      ["回顾同一对条带的四步相关。", "Recap four steps for the same pair of strips."]),
  ];
  window.FourierIndependentRecaps["1.4.1"] = [
      ["同一条带原偏移s=1", "One strip offset by s=1", "cross", { shift: 1, lag: 0 }],
      ["试探x=−0.5", "Try lag x=−.5", "cross", { shift: 1, lag: -.5 }],
      ["到x=−1完全对齐", "Align fully at x=−1", "cross", { shift: 1, lag: -1 }],
      ["同样对齐，增加复相位", "Same alignment, add complex phase", "cross", { shift: 1, lag: -1, phase: Math.PI / 2 }],
    ];
  window.FourierIndependentNotes.setups["1.4.1"] = P("固定一条信号，试着移动另一条。每次把同位置的值相乘并累加，为这个位移给出一个相关值；先从实数一维条带计算，再推广到复数与平面。", "Fix one signal and translate the other. Multiply coincident values and accumulate to score each lag. Start with real 1D strips, then extend to complex values and a plane.");
  window.FourierIndependentNotes.preludes["1.4.1:1"] =  { text: P("先约定一维规则。ξ（xi）遍历输入位置，x在一次评分中固定；g*表示把虚部变号的复共轭。这里f、g都是实单位窗，共轭不改值，星号不是普通卷积符。对每个x按下式得到一个数，扫遍x才得到函数r_fg。", "Set the 1D rule first. ξ (xi) sweeps input positions; x is fixed during one score. g* conjugates complex values by reversing the imaginary part. Here f,g are real unit rectangles, so conjugation changes nothing. Each x gives one number below; varying x builds r_fg."), tex: String.raw`r_{fg}(x)=\int_{-\infty}^{\infty}f(\xi)g^*(\xi-x)\,d\xi` };
  window.FourierIndependentNotes.preludes["1.4.1:0"] =  { text: P("沿用一维的逐点乘加，在平面上多加一个方向：输入点是(ξ,η)，试探位移是(x,y)。小段宽度换成小格面积dξdη；双重积分是所有小格贡献的连续累加。", "Keep 1D pointwise multiply-add, but add a second direction. Input sites are (ξ,η), trial lags (x,y). Cell width becomes area dξdη; the double integral continuously accumulates all cell contributions.") };
  window.FourierIndependentNotes.preludes["1.4.1:2"] =  { text: P("u只是新函数自己的坐标，g̃读作“g波浪号”。这里才把g的坐标折转并把函数值共轭。相邻式中的中置*表示卷积，g右上角的*表示复共轭，位置不同、用途不同。", "u is the new function's coordinate and g̃ is read 'g tilde'. Here we reflect g's coordinate and conjugate its values. An infix * means convolution, while a superscript * means conjugation."), tex: String.raw`\widetilde g(u)=g^*(-u)` };
  window.FourierIndependentNotes.before["1.4.1:1"] =  P("把本例输入完整写出：f在[−1/2,1/2]高为1，g在[s−1/2,s+1/2]高为1，外面都为0。移动后g(ξ−x)的中心在s+x；因此先找交集，再积分。", "Specify the inputs: f is 1 on [−1/2,1/2], g is 1 on [s−1/2,s+1/2], both zero elsewhere. The shifted g(ξ−x) has center s+x. Find the intersection before integrating.");
  window.FourierIndependentNotes.before["1.4.1:2"] =  P("已经会按平移后的逐点乘积算相关。现在想借用卷积程序，因此先构造下列折转、共轭的新输入，再展开卷积检验是否相同。", "We can compute correlation from translated pointwise products. To reuse convolution, construct a reflected, conjugated input and expand its convolution to check equality.");
  window.FourierIndependentNotes.supplements["1.4.1"] = { text: P("归一化与峰的边界：未归一化相关有[f][g]×长度（一维）或×面积（二维）的单位，不是百分比。若g含两个相同结构，则与单个f可出现多个等高峰；没有唯一性保证。复窗g=$e^{iφ}$f在对齐时给$e^{-iφ}$∫|f|²，所以要说明比较的是复值、实部还是模。", "Raw correlation has units [f][g] times length (1D) or area (2D), not percent. Repeated copies in g can give equal peaks against one f; uniqueness is not guaranteed. For g=$e^{iφ}$f at alignment the result is $e^{-iφ}$∫|f|²; specify whether comparing complex value, real part or magnitude."), tex: String.raw`r_{f,\,e^{i\phi}f}(0)=e^{-i\phi}\int|f(\xi)|^2\,d\xi` };
  window.FourierIndependentNotes.extraProof["1.4.1:0"] =  [
      {
        lead: P("已有二维定义，现在把位移改写到f的自变量里。固定(x,y)，令u=ξ−x、v=η−y；反解为ξ=u+x、η=v+y。ℝ²表示整个二维坐标平面；平移不伸缩小格面积，全平面的积分边界也不变。", "Starting from the 2D definition, move the lag into f's arguments. Hold (x,y) fixed and set u=ξ−x, v=η−y, hence ξ=u+x, η=v+y. ℝ² denotes the whole coordinate plane. Translation preserves cell area and whole-plane limits."),
        tex: String.raw`d\xi\,d\eta=du\,dv,\qquad(\xi,\eta)\in\mathbb R^2\ \Longleftrightarrow\ (u,v)\in\mathbb R^2`,
        read: P("这里只更换积分坐标，输入函数和试探位移都没有交换，也没有额外的面积缩放系数。", "Only integration coordinates change; neither inputs nor lag are swapped, and no area-scaling factor is introduced."),
      },
      {
        lead: P("将反解和面积元逐项代回定义，g的自变量变为(u,v)，f的自变量带上位移，得到另一种等价形式。", "Substitute the inverse relations and area element into the definition: g has arguments (u,v), while f carries the lag. This gives an equivalent form."),
        tex: String.raw`\begin{aligned}r_{fg}(x,y)&=\iint_{\mathbb R^2}f(\xi,\eta)g^*(\xi-x,\eta-y)\,d\xi\,d\eta\\&=\iint_{\mathbb R^2}f(u+x,v+y)g^*(u,v)\,du\,dv.\end{aligned}`,
        read: P("这对应教材(1-37)：若把u、v改名为ξ′、η′，就是书上的写法。一维也可令u=ξ−x，得到∫f(u+x)g*(u)du；不是给相关擅自换一个正负号。", "This is the book's (1-37), with u,v renamed ξ′,η′. In 1D, u=ξ−x similarly gives ∫f(u+x)g*(u)du. It is a substitution, not an arbitrary change of lag sign."),
      },
    ];
  window.FourierIndependentNotes.next["1.4.1:1"] =  P("已算出一维位移评分。下一步多加一个输入方向和位移分量，把长度累加推广为面积累加。", "We have computed a 1D lag score. Next add an input direction and a lag component, extending accumulation over lengths to accumulation over areas.");
  window.FourierIndependentNotes.next["1.4.1:0"] =  P("二维定义和换元形式已建立。接下来回到一维，构造能让现成卷积算法算出同一相关的新输入。", "The 2D definition and equivalent substitution are established. Return to 1D and construct a transformed input so that convolution computes the same correlation.");
  window.FourierSectionSymbolOverrides["1.4.1"] = [
      ["x", "试探的水平相关位移", "Trial horizontal correlation lag", "长度；图中无量纲", "Length; dimensionless demo", "lag"],
      ["s", "g原来的中心", "Original center of g", "与x同单位", "Same units as x", "shift"],
      ["\\xi,\\eta", "遍历输入平面的坐标", "Coordinates sweeping the input plane", "长度", "Length"],
      ["\\phi", "第二信号相位", "Second-signal phase", "rad", "rad", "phase"],
      ["y", "竖直试探位移", "Vertical trial lag", "长度", "Length", "ly"],
      ["g^*", "g的复共轭：虚部变号", "Complex conjugate of g: imaginary part reversed", "与g相同", "Same as g"],
      ["r_{fg}", "随试探位移变化的相关函数", "Correlation function versus trial lag", "一维[f][g]×长度；二维×面积", "1D [f][g] times length; 2D times area"],
    ];
  const line = (zh, en, tex, resultZh, resultEn) => ({ lead: p(zh, en), tex, read: p(resultZh, resultEn) });
  const auditEntries = [
      ["(1-36)", line("目标：弄懂双重积分不是神秘评分。固定 (x,y)，先在一个位置 (ξ,η) 求乘积。", "Goal: demystify the double integral. At fixed (x,y), first compute a product at one location (ξ,η).", String.raw`q_{x,y}(\xi,\eta)=f(\xi,\eta)g^{*}(\xi-x,\eta-y)`, "对整个平面把 q 累加才产生该位移下的一个相关值；对实单位窗是交叠面积。", "Integrating q over the plane gives one correlation value at that lag; for real unit windows it is overlap area.")],
      ["(1-38); 本课一维特例", line("目标：求 g 原来在 s=1 时哪个试探位移对齐。先令移动后的中心 1+x 等于蓝窗中心 0。", "Goal: find the aligning lag for g initially at s=1. Set its shifted center 1+x equal to the blue center 0.", String.raw`1+x=0\Longrightarrow x=-1;\qquad r_{fg}(-1)=\int_{-1/2}^{1/2}1\,d\xi=1`, "这只计算单位宽矩窗例子；不能从‘中心对齐’直接推所有信号都有唯一峰。", "This computes only unit-width rectangles; center alignment does not guarantee every signal has a unique peak.")],
      ["(1-39) and order identity", line("目标：检验符号。将新函数 g̃(x−ξ) 的自变量展开。", "Goal: check the signs. Expand the argument of the new g-tilde(x−ξ).", String.raw`\widetilde g(x-\xi)=g^{*}(-(x-\xi))=g^{*}(\xi-x)`, "它与教材 (1-38) 的第二因子相同；交换输入要另外共轭并把位移取反。", "This matches the book's second factor in (1-38); exchanging inputs additionally conjugates and negates lag.")]
  ];
  if (auditEntries.length !== window.FourierGuides["1.4.1"].steps.length) throw new Error("Incomplete textbook audit: 1.4.1");
  auditEntries.forEach(([source, intermediate], i) => {
    window.FourierLessons.find(lesson => lesson.id === "1.4.1").notes[i].source = source;
    window.FourierGuides["1.4.1"].steps[i].proof.unshift(intermediate);
  });
  window.FourierIndependentLabData["1.4.1"][0].insight = P("本例高1、宽1，恰好能把相关读数看成交叠长度；这不是天然的相似度百分比。若两信号幅度都变2，完全对齐的积分就是2×2×1=4，已超过1。复数输入还要对第二项取共轭，后面用相位对照说明。", "Here height and width are both 1, so correlation happens to equal overlap length, not an intrinsic similarity percentage. Doubling both amplitudes gives aligned integral 2×2×1=4, already above 1. Complex inputs also require conjugating the second input, explored with phase later.");
  window.FourierLessons.find(lesson => lesson.id === "1.4.1").symbols = window.FourierSectionSymbolOverrides["1.4.1"].map(([tex, zh, en, unitZh, unitEn, control]) => ({
    tex, meaning: P(zh, en), unit: P(unitZh, unitEn),
    condition: P("按当前实验步骤；未显示读数表示本步未指定", "Current experiment step; no reading means unspecified in this step"), control,
  }));

  // Section-owned chart models, explanations, controls and notes mapping.
  window.FourierSectionRuntime["1.4.1"] = {
    legacyPlot: {
      label: ["上：f(ξ) 与 g*(ξ−x) · 下：相关输出", "Top: f(ξ) and g*(ξ−x) · bottom: correlation"],
      axisLabel: ["相关位移", "correlation lag"],
      marker: state => state.lag,
      norm: (state, x) => Math.max(0, Math.min(.5, x + state.x0 + state.a / 2) - Math.max(-.5, x + state.x0 - state.a / 2)),
      signal: (state, { line, gauss, rect, xSvg }) => `${rect(0, 1, 1, "#58a8de")}${rect(state.x0 + state.lag, state.a, 1, "#b74739")}`,
    },
    models: ["crossPlane", "crossKernel", "cross"],
    noteStages: [6, 1, 4],
    noteOrder: [1, 0, 2],
    noteTitles: [P("把相关扩展到平面", "Extend correlation to a plane"), P("用一维条带建立相关", "Build correlation with 1D strips"), P("把相关改写为卷积", "Rewrite correlation as convolution")],
      controls: {
      lag: ["lag", P("试探位移 x", "Trial lag x"), -3, 3, .25],
      shift: ["shift", P("第二信号原中心 s", "Original second-signal center s"), -1.5, 1.5, .25],
      ly: ["ly", P("竖直试探位移 y", "Vertical trial lag y"), -1, .5, .25],
      phase: ["phase", P("第二信号相位 φ", "Second-signal phase φ"), [[0, "0"], [Math.PI / 2, "π/2"], [Math.PI, "π"]]],
      swap: ["swap", P("交换两个输入", "Swap inputs"), "check"],
      reflected: ["reflected", P("显示折转并共轭的 g*(−u)", "Show reflected/conjugated g*(−u)"), "check"],
    },
    create(tools) {
      const { t, fmt, overlap, graph, legend, block } = tools;
      function crossValue(s, x) {
        const lag = s.swap ? -x : x;
        const area = overlap(-.5, .5, s.shift + lag - .5, s.shift + lag + .5)
          + (s.repeated ? overlap(-.5, .5, s.shift + 2 + lag - .5, s.shift + 2 + lag + .5) : 0);
        const phase = (s.phase || 0) * (s.swap ? 1 : -1);
        return { re: area * Math.cos(phase), im: area * Math.sin(phase), abs: area };
      }
      function drawScene(model, s) {
        if (model === "crossPlane") {
          const cx = s.shift + s.lag, cy = s.sy + s.ly;
          const area = overlap(-.5, .5, cx - .5, cx + .5) * overlap(-.5, .5, cy - .5, cy + .5);
          return { graphic: `<svg class="il-graph" viewBox="0 0 550 320" role="img" aria-label="${t("两个单位方窗的平面交叠", "Planar overlap of two unit squares")}"><path d="M50 160H500M275 20V300" stroke="#aaa"/><rect x="225" y="110" width="100" height="100" fill="#b9d4d9" fill-opacity=".6" stroke="#245b66" stroke-width="3"/><rect x="${225 + cx * 100}" y="${110 - cy * 100}" width="100" height="100" fill="#eabf86" fill-opacity=".5" stroke="#ae5130" stroke-width="3"/><text x="40" y="25">ξ,η</text><text x="35" y="295">(s+x, sᵧ+y)=(${fmt(cx)}, ${fmt(cy)})</text></svg>`, readout: `${t("乘积面积", "Product area")}=${fmt(area)}` };
        }
        if (model === "crossKernel") {
          const center = s.reflected ? -s.shift : s.shift, phase = (s.phase || 0) * (s.reflected ? -1 : 1);
          return { graphic: legend("蓝实线：实部；橙虚线：虚部", "Blue solid: real; orange dashed: imaginary") + graph([{ fn: x => Math.abs(x - center) <= .5 ? Math.cos(phase) : 0 }, { fn: x => Math.abs(x - center) <= .5 ? Math.sin(phase) : 0, dash: true }], { ymin: -1.2, ymax: 1.2, axis: "u", marker: center }), readout: `${s.reflected ? "g*(−u)" : "g(u)"} · ${t("中心", "center")}=${fmt(center)} · φ=${fmt(phase)}` };
        }
        if (model === "cross") {
          // For a swapped correlation, the original f is translated instead.
          const fCenter = s.swap ? s.lag : 0, gCenter = s.shift + (s.swap ? 0 : s.lag);
          const top = graph([{ fn: x => Math.abs(x - fCenter) <= .5 ? 1 : 0 }, { fn: x => (Math.abs(x - gCenter) <= .5 ? 1 : 0) + (s.repeated && Math.abs(x - gCenter - 2) <= .5 ? 1 : 0) }], { xmin: Math.min(-3, fCenter - .75, gCenter - .75), xmax: Math.max(3, fCenter + .75, gCenter + .75 + (s.repeated ? 2 : 0)), axis: "ξ", ymax: 1.3 });
          const v = crossValue(s, s.lag);
          return { graphic: legend("上：蓝f、橙g的支撑（不表示复值）；下：实部实线、虚部虚线、模点线", "Top: blue f/orange g supports, not complex values; bottom: real solid, imaginary dashed, magnitude dotted") + top + graph([{ fn: x => crossValue(s, x).re }, { fn: x => crossValue(s, x).im, dash: true }, { fn: x => crossValue(s, x).abs, dot: true }], { xmin: -4, xmax: 4, ymin: -1.2, ymax: 1.3, marker: s.lag }), readout: `s=${fmt(s.shift)}, x=${fmt(s.lag)} · r=${fmt(v.re)} ${v.im < 0 ? "−" : "+"} ${fmt(Math.abs(v.im))}i · |r|=${fmt(v.abs)}` };
        }
      }
      function explanation(model, s) {
        if (model === "crossPlane") {
          const cx = s.shift + s.lag, cy = s.sy + s.ly;
          const lx = Math.max(0, 1 - Math.abs(cx)), ly = Math.max(0, 1 - Math.abs(cy));
          return block(
            ["ξ、η（xi、eta）是输入平面坐标，x、y是本次试探位移。蓝方窗f固定在原点，橙方窗g(ξ−x,η−y)的中心变成(s+x,sᵧ+y)；两个窗内部都为1、外部0。颜色重叠不是自动相乘，积分用的是两函数数值的乘积。", "ξ,η (xi,eta) are input-plane coordinates; x,y are trial lags. Blue f stays centered at zero. Orange g(ξ−x,η−y) moves to (s+x,sᵧ+y). Each square is 1 inside and 0 outside. Color blending is not numerical multiplication; the integral uses their actual values."],
            String.raw`r(x,y)=\iint f(\xi,\eta)g(\xi-x,\eta-y)d\xi d\eta=L_xL_y,\quad L_x=\max(0,1-|s+x|),\ L_y=\max(0,1-|s_y+y|)`,
            [`中心(${fmt(cx)},${fmt(cy)})，交叠宽${fmt(lx)}、高${fmt(ly)}；乘积高1，故双重积分=1×${fmt(lx)}×${fmt(ly)}=${fmt(lx * ly)}。这里只因实单位方窗才可直接算交叠面积。`, `Center (${fmt(cx)},${fmt(cy)}), overlap width ${fmt(lx)}, height ${fmt(ly)}. Product height is 1, so the double integral is 1×${fmt(lx)}×${fmt(ly)}=${fmt(lx * ly)}. This area shortcut relies on real unit-height squares.`]);
        }
        if (model === "crossKernel") return block(
          ["u是横坐标，g是宽1、中心s的复矩窗：窗内值$e^{i\\phi}=\\cos\\phi+i\\sin\\phi$，窗外0；$i^2=-1$，φ以弧度计。蓝实线是实部、橙虚线是虚部，两者共同定义一个复函数，不是两个独立输入。上标*是复共轭，使虚部变号；不是卷积号。", "u is position. g is a width-1 complex window centered at s: inside $e^{i\\phi}=\\cos\\phi+i\\sin\\phi$, outside zero. $i^2=-1$ and φ is in radians. Blue solid and orange dashed are real and imaginary parts of one function. Superscript * means complex conjugation, reversing the imaginary part, not convolution."],
          String.raw`\widetilde g(u)=g^*(-u),\quad r_{fg}=f*\widetilde g`,
          [`${s.reflected ? "折转把中心s变成−s，共轭把φ变成−φ" : "当前显示原函数，尚未折转或共轭"}；当前中心${fmt(s.reflected ? -s.shift : s.shift)}、相位${fmt((s.reflected ? -1 : 1) * (s.phase || 0))} rad。复窗的实部、虚部按cos与sin分别计算。`, `${s.reflected ? "Reflection takes center s to −s; conjugation takes φ to −φ" : "The original function is shown, without reflection or conjugation"}. Current center ${fmt(s.reflected ? -s.shift : s.shift)}, phase ${fmt((s.reflected ? -1 : 1) * (s.phase || 0))} rad. Evaluate cos and sin for its two components.`]);
        if (model === "cross") {
          const v = crossValue(s, s.lag), area = v.abs;
          return block(
            ["上图横轴ξ（xi）遍历输入位置：蓝色是f的支撑，橙色是平移后g的支撑，只画非零区间，不画复幅值。s是g原中心，x是试探位移；未交换时橙中心s+x。下图横轴是位移x：蓝实线Re r、橙虚线Im r、紫点线|r|，虚竖线标当前x；重合时曲线会互相遮盖。", "Top horizontal ξ (xi) sweeps input position. Blue/orange show supports of f/shifted g, not complex amplitudes. s is g's original center, x the trial lag; without swapping the orange center is s+x. Bottom horizontal axis is lag x: blue solid Re r, orange dashed Im r, purple dotted |r|; vertical dashes mark current x. Coincident curves can hide one another."],
            String.raw`r_{fg}(x)=\int f(\xi)g^*(\xi-x)d\xi=L(x)e^{-i\phi},\quad |r|=\sqrt{(\Re r)^2+(\Im r)^2}=L(x)`,
            [`*在g上方表示复共轭。L是交叠总长度：先分别求两个非零区间的交集，再把“窗内乘积×长度”相加。本次${s.repeated ? "两段橙窗的交叠长度求和" : `max(0,1−|${s.shift}${s.swap ? "−" : "+"}(${s.lag})|)`}=${fmt(area)}；乘相位因子后r=${fmt(v.re)}${v.im < 0 ? "−" : "+"}${fmt(Math.abs(v.im))}i。${s.swap ? "交换后使用$r_{gf}(x)=r_{fg}^*(-x)$，所以位移和虚部都反号。" : "单位实窗φ=0时，结果才等于交叠长度。"}`, `Superscript * conjugates g. L is total overlap length: intersect the supports and add product × length on each intersection. Here ${s.repeated ? "the overlap lengths of two orange windows sum to" : `max(0,1−|${s.shift}${s.swap ? "−" : "+"}(${s.lag})|)=`} ${fmt(area)}. Including phase gives r=${fmt(v.re)}${v.im < 0 ? "−" : "+"}${fmt(Math.abs(v.im))}i. ${s.swap ? "Swapping uses $r_{gf}(x)=r_{fg}^*(-x)$, reversing lag and imaginary sign." : "Only for real unit windows with φ=0 does r equal overlap length."}`],
            ["这是原始相关，不是相似度百分比；重复结构可能给多个峰。不同高度、负值或复数信号必须保留乘积与相位，不能只量几何交叠。", "This is raw correlation, not a similarity percentage. Repeated structures may give multiple peaks. Amplitudes, signs and complex phases must be retained; geometry alone is insufficient."]);
        }
        return "";
      }
      return { drawScene, explanation, calculate: { crossValue } };
    },
  };
})();

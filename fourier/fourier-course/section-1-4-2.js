/* Section 1.4.2: bilingual lesson, guided path, experiment and reference data. */
(() => {
  const { pair, formula, question, symbol, p, stage, step, sym, block, q, origin, P, S, commonSymbols, corrSymbols } = window.FourierSectionBuilders;
  const autoStages = [
    stage(["和自己对齐", "Align with itself"], ["取宽 1 的实矩窗与自身比较，读取 x=0 的积分。", "Compare a real width-1 rectangle with itself; read the integral at x=0."], { ...origin }, [["1，即能量积分", "1, the energy integral"], ["0，因为两者相消", "0 because they cancel"], ["无穷，因为相关无界", "Infinite because correlation is unbounded"]], 0, [["对。∫|f|²dx=1；本窗高度为 1、宽 1。", "Yes. ∫|f|²dx=1 for this unit-height, width-1 rectangle."], ["乘自身不是相减。", "Multiplying by itself is not subtracting."], ["该窗是平方可积的有限能量模型。", "This finite window is square-integrable."]]),
    stage(["离开中心", "Leave zero lag"], ["拖动 x 到 0.5，比较交叠程度与零位移。", "Move lag x to 0.5 and compare overlap with zero lag."], { ...origin, x0: 0.5 }, [["相关不超过零位移", "Correlation does not exceed zero lag"], ["越远越大", "Farther shifts are always larger"], ["等于两个峰之和", "It is the sum of peaks"]], 0, [["对。Cauchy–Schwarz 给 |r_ff(x)|≤r_ff(0)。", "Yes. Cauchy–Schwarz gives |r_ff(x)|≤r_ff(0)."], ["这种有限窗错位后交集缩小。", "The intersection shrinks when this finite window shifts."], ["相关求的是乘积积分。", "Correlation is a product integral."]]),
    stage(["左右对称", "Check both signs"], ["依次把位移设为 +0.5 和 −0.5，对比实信号的自相关。", "Compare lags +0.5 and −0.5 for real-valued autocorrelation."], { ...origin, x0: -0.5 }, [["两个值相同", "The values match"], ["一个必为负数", "One must be negative"], ["正侧恒为零", "Positive lags are always zero"]], 0, [["对。实信号的自相关是偶函数。", "Yes. Autocorrelation of a real signal is even."], ["该例乘积非负；并不存在必然负值。", "This product is nonnegative in this model."], ["有限窗在正小位移仍相交。", "Small positive lags still overlap."]]),
    stage(["复信号区别", "Complex signals"], ["假如把输入改成复振幅，相关里的星号与左右对称性要怎么读？", "If the input is complex amplitude, how do you read the star and lag symmetry?"], { ...origin, family: "gauss" }, [["星号是共轭，r_ff(x)=r_ff*(−x)", "Star means conjugate, r_ff(x)=r_ff*(−x)"], ["星号是卷积符号", "Star is the convolution operator"], ["复信号仍必为实偶函数", "Complex autocorrelation must be real and even"]], 0, [["对。教材把相关运算星号与复共轭星号分开；此式是厄米对称。", "Yes. Distinguish correlation operator from conjugation; the result is Hermitian."], ["这里复共轭作用在函数值上，不是卷积。", "Here the star conjugates a value, not convolves functions."], ["复自相关通常只满足厄米对称，未必实偶。", "Complex autocorrelation is Hermitian, not necessarily real-even."]]),
    stage(["新宽度预测", "New-width prediction"], ["若矩窗宽度改为 a=2、高度仍为 1，自相关零位移是多少？答后揭示。", "If the rectangle's width becomes a=2 with unit height, what is its zero-lag autocorrelation? Reveal afterward."], { ...origin, a: 2 }, [["2", "2"], ["1", "1"], ["4", "4"]], 0, [["对。∫|f|²dx=2×1²=2。", "Yes. ∫|f|²dx=2×1²=2."], ["没有做单位能量归一化；宽度变大使积分变大。", "No unit-energy normalization was applied; the integral grows."], ["积分随宽度一次增长；不是把宽度平方。", "It grows linearly with width, not with width squared."]])
  ];
  const item = {
      id: "1.4.2", title: ["自相关", "Autocorrelation"], pages: "17–19", pdf: "19–21", firstPage: 19,
      lead: ["把信号与自身错位比较：为何零位移最相似，复信号又为何不一定是偶函数？", "Shift a signal against itself: why is zero lag most similar, and why are complex signals not necessarily even?"],
      bridge: [["互相关比较两条可能不同的信号。", "Cross-correlation compares two potentially distinct signals."], ["现在把两条改为同一有限能量信号，分析对称与最大值。", "Now use the same finite-energy signal twice and examine symmetry and the maximum."], ["周期信号往往没有有限总能量，下一节需重新定义平均。", "Periodic signals need not have finite total energy, so the next lesson uses averaging."]], question: ["为什么零位移是自相关模值的上界？", "Why does zero lag bound autocorrelation magnitude?"], setup: ["图中用实数单位矩窗或高斯作有限能量示意；复数情形需保留共轭，自相关一般满足厄米对称而非实偶。", "The chart uses real finite-energy rectangles/Gaussians. For complex signals retain conjugation: autocorrelation is Hermitian, not generally real-even."], terms: [["有限能量指 ∫|f(x)|²dx 有限；它并不等于任何周期信号都有有限能量。", "Finite energy means ∫|f(x)|²dx is finite; an endless periodic signal need not qualify."], ["柯西–施瓦茨不等式将两函数的乘积积分模限制在各自平方积分的几何平均之下。", "Cauchy–Schwarz bounds the product integral magnitude by the geometric mean of the two squared-integral values."]], observe: ["比较矩窗 x=0 与 x=±0.5 的交集宽度，再用公式解释为何模值有上界。", "Compare rectangular overlap at x=0 and x=±0.5, then explain the bound with the formula."], stages: autoStages,
      recap: [["零位移 r_ff(0)=∫|f|²≥0，是总能量型积分。", "At zero lag r_ff(0)=∫|f|²≥0, an energy integral."], ["复函数满足 r_ff(x)=r_ff*(−x)；实函数才是实偶函数。", "Complex autocorrelation has r_ff(x)=r_ff*(−x); real autocorrelation is even."], ["柯西–施瓦茨给 |r_ff(x)|≤r_ff(0)。对非零且平方可积的全域信号，非零位移无法作为非零周期重复；下节的无限周期信号要改用平均相关。", "Cauchy–Schwarz gives |r_ff(x)|≤r_ff(0). A nonzero square-integrable signal cannot repeat periodically across the whole line; the next lesson uses averaged correlation for endless periodic signals."]],
      blocks: [
        block(["令第二信号等于第一信号", "Use the same signal twice"], ["沿用上一节的 r_fg 定义并令 g=f；对于复数要把第二因子共轭。", "Use the previous r_fg definition and set g=f; conjugate the second factor for complex signals."], String.raw`r_{ff}(x)=\int f(\xi)f^{*}(\xi-x)\,d\xi`, ["自相关结果仍是位移 x 的函数；图中两条实数曲线仅为模型。", "Autocorrelation remains a function of lag x; plotted real curves are only models."], ["零位移时两份相同的信号逐点相乘。", "At zero lag the signal multiplies its own conjugate pointwise."], ["单位高、宽 1 的窗在 x=0 交叠面积 1。", "A unit-height width-1 window has overlap integral 1 at zero lag."], ["把 x 与 −x 比较可得到对称关系。", "Next compare opposite lags to obtain symmetry."], ["将自相关定义的 x 置零，并用 z z*=|z|²。", "Set x=0 in the definition and use z z*=|z|²."], String.raw`r_{ff}(0)=\int f(\xi)f^{*}(\xi)\,d\xi=\int|f(\xi)|^2\,d\xi`, ["只有平方可积时该总积分有限。", "This total integral is finite only for square-integrable f."]),
        block(["厄米对称而非总是偶函数", "Hermitian, not always even"], ["把 r_ff(−x) 取复共轭，令 u=ξ+x，就能与 r_ff(x) 比较。", "Conjugate r_ff(−x), substitute u=ξ+x and compare with r_ff(x)."], String.raw`r_{ff}(x)=r_{ff}^{*}(-x)`, ["若 f 为实函数，相关结果是实数，此式退化为 r_ff(x)=r_ff(−x)。", "For real f the result is real, and the relation reduces to r_ff(x)=r_ff(−x)."], ["图中在 ±0.5 得相同交集；复振幅还可能有相位。", "The chart gives equal overlap at ±0.5; a complex amplitude may carry phase."], ["单位矩窗的这两个位置都为 0.5。", "For a unit rectangle both lag values are 0.5."], ["最后判断零位移是否绝对最大。", "Finally ask if zero lag is an absolute magnitude maximum."], ["写出 r_ff(−x)*=∫ f*(ξ) f(ξ+x)dξ，令 u=ξ+x。", "Write r_ff(−x)*=∫f*(ξ)f(ξ+x)dξ and substitute u=ξ+x."], String.raw`r_{ff}^{*}(-x)=\int f(u)f^{*}(u-x)\,du=r_{ff}(x)`, ["推导保留共轭；不可把一般复信号直接当实偶。", "Keep conjugation in the derivation; complex signals are not simply real-even."]),
        block(["零位移的模值上界", "Magnitude bound at zero lag"], ["上一块已知 r_ff(0)=∫|f|²。将 f(ξ) 与 f*(ξ−x) 当作内积的两个因子，使用柯西–施瓦茨；位移不改变全域的平方积分。", "We already know r_ff(0)=∫|f|². Apply Cauchy–Schwarz to f(ξ) and f*(ξ−x); a full-domain shift preserves squared integral."], String.raw`|r_{ff}(x)|\le r_{ff}(0)`, ["这是平方可积信号的模上界；若 f 非零且全域平方可积，非零位移其实严格低于零位移。无限周期信号不符合该前提。", "For a nonzero square-integrable whole-line signal, every nonzero lag has strictly smaller magnitude; endless periodic signals do not satisfy that premise."], ["有限矩窗错位后交集减小，图中确实低于中心。", "For the finite rectangle, displaced overlap shrinks below zero-lag overlap."], ["宽 2 单位高窗的零位移积分是 2。", "For a width-2 unit-height window zero-lag integral is 2."], ["无限周期信号不能直接拿这一有限能量证明照搬，需要另一个平均定义。", "Do not apply this finite-energy proof verbatim to an infinite periodic signal; use an averaged definition."], ["先用 |∫ab|≤√(∫|a|²)√(∫|b|²)，取 a=f(ξ)、b=f*(ξ−x)。", "Use |∫ab|≤√(∫|a|²)√(∫|b|²) with a=f(ξ), b=f*(ξ−x)."], String.raw`|r_{ff}(x)|\le\sqrt{\int|f(\xi)|^2d\xi}\sqrt{\int|f(\xi-x)|^2d\xi}=\int|f(\xi)|^2d\xi`, ["换元 u=ξ−x 得第二个积分与第一个相等，从而得到结论。", "Substitute u=ξ−x in the second integral; the two factors agree."]),
        block(["读图样但别误称实测", "Interpret patterns without overclaiming"], ["自相关在多个位移出现较大值，可能表示结构重复；峰宽也受信号形状和有限观察窗影响。", "Large values at several lags can indicate repeated structure; peak widths depend on signal shape and observation window."], String.raw`r_{ff}(0)=\|f\|_2^2`, ["||f||₂² 是平方积分的紧凑记号，不是图上单一像素的读数。", "||f||₂² abbreviates the squared integral, not one pixel of the chart."], ["将图上的非零位移峰与原函数的结构间距比较。", "Compare off-center peaks against repeated spacings in the original signal."], ["本图只用单个矩窗，没有周期旁峰。", "The plotted single rectangle has no periodic side peaks."], ["下一节考虑无限周期例子，其总平方积分不再有限。", "Next we consider an endless periodic signal whose total squared integral is not finite."], ["对照前块 r_ff(0)=∫|f|²，定义平方积分记号。", "Recall r_ff(0)=∫|f|² from the previous block and introduce the norm shorthand."], String.raw`\|f\|_2=\left(\int|f(\xi)|^2d\xi\right)^{1/2}`, ["平方两边便得本块首式；仅在平方可积时是有限量。", "Square both sides to obtain the displayed identity; it is finite only for square-integrable f."])
      ],
      questions: [q("1.4.2:q1", ["有限能量复信号的自相关一般满足哪条对称性？", "What symmetry holds for the autocorrelation of a finite-energy complex signal?"], [["r_ff(x)=r_ff*(−x)", "r_ff(x)=r_ff*(−x)"], ["r_ff(x)=r_ff(−x) 必为实偶", "Always real and even"], ["不可能有任何对称性", "No symmetry is possible"]], 0, [["对，是厄米对称。", "Yes, Hermitian symmetry."], ["复数相关未必实数；需要共轭。", "Complex correlation need not be real; conjugation is needed."], ["由变量代换可导出厄米对称。", "A variable substitution gives Hermitian symmetry."]]), q("1.4.2:q2", ["有限能量 f 的零位移自相关是？", "For finite-energy f, what is zero-lag autocorrelation?"], [["∫|f|²", "∫|f|²"], ["∫f", "∫f"], ["恒为 1", "Always 1"]], 0, [["对，零位移是平方模积分。", "Yes, it is the squared-modulus integral."], ["复振幅要乘其共轭。", "A complex amplitude multiplies its conjugate."], ["只有经过专门归一化才可能固定为 1。", "Only a specific normalization would make it 1."]]), q("1.4.2:q3", ["宽 2、高 1 的矩窗自相关在 x=0 的值是？", "Autocorrelation at zero lag of a width-2 height-1 rectangle?"], [["2", "2"], ["1", "1"], ["4", "4"]], 0, [["对，积分面积 2。", "Yes; squared-height integral gives area 2."], ["未做单位能量归一化。", "It has not been normalized to unit energy."], ["高度的平方是 1，宽度不平方。", "Height squared is 1; width is not squared."]])]
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
  window.FourierIndependentLabData["1.4.2"] = [
    S(["零位移在算什么", "What zero lag measures"],
      ["f是宽a、值A的矩窗。A是幅度，a是全宽；零位移让f乘自己的共轭。改变A和a，比较积分E。", "f is a width-a rectangle of amplitude A. At zero lag it multiplies its own conjugate. Change A and a and compare integral E."],
      "auto", { a: 1, amp: 1, lag: 0, omega: 0, signed: false }, ["amp", "a"],
      [["E=A²a", "E=A²a"], ["E=Aa", "E=Aa"], ["E总为1", "E is always 1"]], 0,
      [["对。先得到|f|²，再对宽度a积分。", "Yes. First obtain |f|², then integrate over width a."], ["漏掉了第二个幅度因子。", "That omits the second amplitude factor."], ["没有做单位能量归一化。", "There is no unit-energy normalization."]],
      ["这里E指函数平方模积分；它是否等于实际能量还取决于物理单位和模型。", "E denotes the squared-modulus integral; physical energy additionally depends on units and model."],
      ["保持输入不变，只移走它的副本。", "Keep the input fixed and shift only its copy."], String.raw`r_f(0)=\int|f(\xi)|^2\,d\xi=E`),
    S(["移走副本", "Displace the copy"],
      ["保持宽1、幅度1，移动x。上图看交叠，下图把积分画成r_f(x)；查看x=0.5。", "Keep width and amplitude 1 and vary lag x. Inspect overlap above and r_f(x) below, especially at x=.5."],
      "auto", { a: 1, amp: 1, lag: .5, omega: 0 }, ["lag"],
      [["r_f(0.5)=0.5", "r_f(.5)=.5"], ["仍然为1", "Still 1"], ["等于0.25", "Equals .25"]], 0,
      [["对。交集长度为0.5，乘积高度1。", "Yes. Overlap length .5, product height 1."], ["移位后没有完全重合。", "The shifted copies no longer coincide fully."], ["相关本身不是把交叠长度再平方。", "Correlation does not square the overlap length again."]],
      ["对实矩窗，左右位移产生同样交叠；但这不代表所有自相关都是实偶函数。", "A real rectangle has equal overlaps at opposite lags, but not every autocorrelation is real and even."],
      ["先找一个实函数的负相关反例。", "First find a real example with negative correlation."]),
    S(["自相关也可以为负", "Autocorrelation can be negative"],
      ["输入在[−1,0)为+1、[0,1]为−1。移动它的副本到x=1，比较交叠区的符号。", "Input is +1 on [−1,0), −1 on [0,1]. Shift its copy by x=1 and inspect product signs in the overlap."],
      "auto", { a: 2, amp: 1, lag: 1, omega: 0, signed: true }, ["lag"],
      [["r_f(1)=−1，但r_f(0)=2", "r_f(1)=−1, while r_f(0)=2"], ["自相关所有位置都非负", "Autocorrelation is nonnegative everywhere"], ["负相关说明零位移能量为负", "Negative correlation means negative zero-lag energy"]], 0,
      [["对。交叠处的两条信号符号相反。", "Yes. The overlapping signals have opposite signs."], ["只有零位移必为非负的平方模积分。", "Only zero lag necessarily integrates a nonnegative squared modulus."], ["零位移仍是1+1=2。", "Zero-lag energy remains 1+1=2." ]],
      ["“零点模值最大”不是“所有位置都非负”。", "Maximum magnitude at zero does not mean every value is nonnegative."],
      ["再让输入拥有随位置变化的相位。", "Now give the input a position-dependent phase."]),
    S(["复数的左右关系", "Opposite lags for complex input"],
      ["输入改为f(ξ)=exp(iωξ)rect(ξ/a)，ω是每单位长度的相位变化。选ω=π/2，a=2，比较x=±0.5的实、虚部。", "Use f(ξ)=exp(iωξ)rect(ξ/a), where ω is phase change per unit length. At ω=π/2, a=2, compare real and imaginary parts at x=±.5."],
      "auto", { a: 2, amp: 1, lag: .5, omega: Math.PI / 2 }, ["omega", "lag"],
      [["实部相同，虚部反号", "Same real part; opposite imaginary parts"], ["实部虚部都相同", "Both parts equal"], ["模在负位移变负", "Magnitude becomes negative at negative lag"]], 0,
      [["对。r_f(−x)=r_f*(x)，称厄米对称。", "Yes. r_f(−x)=r_f*(x), Hermitian symmetry."], ["只有实输入的自相关才简化为实偶函数。", "Only real-input autocorrelation simplifies to a real even function."], ["模是非负数，复相位不使它变负。", "Magnitude is nonnegative; complex phase cannot make it negative."]],
      ["本例r_f(x)=(a−|x|)exp(iωx)，|x|<a；正负位移相位相反。", "Here r_f(x)=(a−|x|)exp(iωx) for |x|<a; opposite lags carry opposite phases."],
      ["怎样把图上的上界变成一般结论？", "How does the plotted bound become a general result?"], String.raw`r_f(-x)=r_f^*(x)`),
    S(["上界比较的是模", "The bound concerns magnitude"],
      ["保留复输入，扫描x并改变ω。比较|r_f(x)|和零位移E；图中的虚线标记E。", "Keep complex input; scan x and vary ω. Compare |r_f(x)| with zero-lag E, marked by a dashed bound."],
      "auto", { a: 2, amp: 1, lag: 1, omega: Math.PI / 2 }, ["lag", "omega"],
      [["|r_f(x)|≤E，改变相位不破坏上界", "|r_f(x)|≤E despite changing phase"], ["只比较实部即可代表全部复值", "Real part alone represents the whole complex value"], ["任意x都等于E", "Every lag equals E"]], 0,
      [["对。讲义用Cauchy–Schwarz和移位不改平方模积分来证明。", "Yes. The notes prove it by Cauchy–Schwarz and invariance of the squared-modulus integral under shifts."], ["虚部也会贡献模值，不能忽略。", "The imaginary part also contributes to magnitude."], ["本例非零位移减小交叠，模严格变小。", "Nonzero lag reduces this example's overlap and magnitude." ]],
      ["一般有限能量函数的证明在讲义；数值扫描不是一般证明。", "See the notes for finite-energy functions; a numerical scan is not a general proof."],
      ["有限窗的相位重复不等于整个信号周期重复。", "Phase repetition within a finite window is not periodicity of the entire signal."], String.raw`|r_f(x)|\le r_f(0)`),
    S(["相位周期不等于无限周期信号", "Periodic phase is not an infinite periodic signal"],
      ["取a=2、ω=π，令x=2：载波相位恰好转一周，但两矩窗只在端点接触。", "Take a=2, ω=π and x=2. The carrier advances one full turn, but the finite windows only touch at an endpoint."],
      "auto", { a: 2, amp: 1, lag: 2, omega: Math.PI }, ["lag"],
      [["相关为0，不会回到E", "Correlation 0, not E"], ["相位转一周就回到E", "A phase cycle restores E"], ["端点接触贡献完整面积", "Endpoint contact gives full area"]], 0,
      [["对。有限包络不可忽略。", "Yes. The finite envelope matters."], ["你只看载波，漏掉了有限支撑。", "That ignores the finite support of the envelope."], ["单端点没有正长度，积分为0。", "A single endpoint has zero integration length." ]],
      ["无限周期函数通常不是有限能量函数；下一节另用平均功率相关。", "An infinite periodic function is generally not finite-energy; the next section uses mean-power correlation instead."],
      ["独立算一个新幅度和宽度。", "Calculate for a new amplitude and width."]),
    S(["新能量账本", "A new energy account"],
      ["f是宽1.5、幅度2的实矩窗，预测r_f(0)。不要把幅度当作能量。", "f is a real rectangle of width 1.5, amplitude 2. Predict r_f(0); amplitude is not energy."],
      "auto", { a: 1.5, amp: 2, lag: 0, omega: 0 }, [],
      [["6", "6"], ["3", "3"], ["1.5", "1.5"]], 0,
      [["2²×1.5=6。", "2²×1.5=6."], ["漏掉了平方模里的第二个幅度2。", "Missing the second factor 2 in the squared modulus."], ["只算宽度，漏掉了幅度平方。", "That counts only width and omits squared amplitude." ]],
      ["先识别所积分的量，再乘区间长度。", "Identify the integrand before multiplying by interval length."],
      ["回顾能量、位移、相位和上界。", "Recap energy, lag, phase and bounds."]),
  ];
  window.FourierIndependentRecaps["1.4.2"] = [
      ["同一有限窗的能量", "Energy of one finite window", "auto", { a: 2, amp: 1, lag: 0 }],
      ["移开后交叠变小", "Lag reduces overlap", "auto", { a: 2, amp: 1, lag: .5 }],
      ["同一包络加上复相位", "Add phase to that envelope", "auto", { a: 2, amp: 1, lag: .5, omega: Math.PI / 2 }],
      ["反向位移得到共轭", "Reverse lag to obtain the conjugate", "auto", { a: 2, amp: 1, lag: -.5, omega: Math.PI / 2 }],
    ];
  window.FourierIndependentNotes.setups["1.4.2"] = P("让信号和自己的移位副本比较。零位移得到平方模积分；离开零位移后，符号与相位可以变化，但有限能量给出模值上界。", "Compare a signal with a shifted copy of itself. Zero lag gives its squared-modulus integral; other lags can change sign or phase, while finite energy bounds the magnitude.");
  window.FourierIndependentNotes.preludes["1.4.2:0"] =  { text: P("若z=a+ib，i²=−1，则z*=a−ib，zz*=a²+b²=|z|²。|z|是模，也就是复平面中离原点的距离；这解释为什么零位移会出现非负的平方模。", "For z=a+ib with i²=−1, z*=a−ib and zz*=a²+b²=|z|². |z| is magnitude, the distance from the origin in the complex plane. This explains the nonnegative squared modulus at zero lag.") };
  window.FourierIndependentNotes.preludes["1.4.2:2"] =  { text: P("这里引用Cauchy–Schwarz不等式作为数学工具：两个函数乘积的积分，其模不超过各自平方模积分的平方根之积。下面用A、B暂记这两个非负积分，不是输入的幅度。", "We use Cauchy–Schwarz as a mathematical tool: the magnitude of an integral of a product is at most the product of the square roots of the squared-modulus integrals. Below A and B temporarily name those nonnegative integrals, not input amplitudes.") };
  window.FourierIndependentNotes.preludes["1.4.2:3"] =  { text: P("||f||₂读作二范数。先定义为平方模积分的平方根；平方后才回到零位移相关。它与实验控件的幅度A不是同一个量。", "||f||₂ is the L² norm: the square root of the squared-modulus integral. Squaring it recovers zero-lag correlation. It is not the amplitude A used by the experimental control.") };
  window.FourierIndependentNotes.supplements["1.4.2"] = { text: P("把实验中的相位窗复算一次：f(ξ)=Aexp(iωξ)rect(ξ/a)，共轭乘积在交集内为A²exp(iωx)，交集长(a−|x|)。因此相位来自x，而模由交集决定。对非零有限能量函数，非零平移若处处与原函数仅差常数因子，会迫使重复的非零能量延伸到无穷，不能据无限载波周期宣称非零位移也达到能量上界。", "For f(ξ)=Aexp(iωξ)rect(ξ/a), the conjugated product is A²exp(iωx) on the intersection, whose length is a−|x|. Phase comes from x while magnitude follows overlap. A nonzero finite-energy function cannot be proportional to a nonzero translate everywhere: repeated nonzero energy would extend indefinitely. Carrier periodicity alone does not give equality at nonzero lag."), tex: String.raw`r_f(x)=A^2\max(0,a-|x|)\,e^{i\omega x}` };
  window.FourierSectionSymbolOverrides["1.4.2"] = [
      ["x", "自相关位移", "Autocorrelation lag", "长度；图中无量纲", "Length; dimensionless demo", "lag"],
      ["a", "有限矩窗全宽", "Full finite-window width", "长度", "Length", "a"],
      ["A", "窗内幅度，不是能量", "Amplitude inside the window, not energy", "随信号确定", "Signal-dependent", "amp"],
      ["\\omega", "相位随位置的斜率", "Phase slope versus position", "rad/坐标单位", "rad per coordinate unit", "omega"],
      ["E=r_f(0)", "全域平方模积分", "Squared-modulus integral over the domain", "[f]²×长度；二维×面积", "[f]² times length; area in 2D"],
    ];
  const line = (zh, en, tex, resultZh, resultEn) => ({ lead: p(zh, en), tex, read: p(resultZh, resultEn) });
  const auditEntries = [
      ["(1-41), (1-43)", line("目标：从上一节而非凭空给出自相关。先把互相关的第二函数 g 换成 f。", "Goal: obtain autocorrelation from the preceding cross-correlation, not out of nowhere. Replace g by f.", String.raw`r_{fg}(x)\xrightarrow{g=f}\int f(\xi)f^{*}(\xi-x)\,d\xi`, "在 x=0 时两因子成为 z 与 z*，乘积为非负的 |z|²。", "At x=0 the factors become z and z*, giving nonnegative |z|².")],
      ["(1-44)–(1-45)", line("目标：对复信号验证正负位移的关系。先把 r_ff(−x) 写出并取共轭。", "Goal: compare positive and negative lags for a complex signal. Write r_ff(−x) then conjugate.", String.raw`r_{ff}(-x)=\int f(\xi)f^{*}(\xi+x)d\xi\Longrightarrow r_{ff}^{*}(-x)=\int f^{*}(\xi)f(\xi+x)d\xi`, "再令 u=ξ+x，便回到 r_ff(x)；实函数才无需共轭。", "Then set u=ξ+x to recover r_ff(x); only real inputs let us drop conjugation.")],
      ["(1-46)", line("目标：不是只看图猜最大值。对两个因子使用柯西–施瓦茨，先写出两个平方积分。", "Goal: do not guess the maximum from the chart. Apply Cauchy–Schwarz and write the two squared integrals.", String.raw`A=\int|f(\xi)|^2d\xi,\qquad B=\int|f(\xi-x)|^2d\xi`, "全域换元 u=ξ−x 使 B=A，故 |r_ff(x)|≤√(AB)=A=r_ff(0)。", "Over the full line, u=ξ−x gives B=A, so |r_ff(x)|≤√(AB)=A=r_ff(0).")],
      ["(1-46); 本课记号", line("目标：解释紧凑记号而非新物理量。先定义平方可积函数的范数。", "Goal: explain compact notation, not introduce a new physical quantity. Define the norm of a square-integrable function.", String.raw`\|f\|_2^2=\int_{-\infty}^{\infty}|f(\xi)|^2d\xi`, "于是这与第一块的 r_ff(0) 完全相同；无限周期输入不适用。", "This is exactly the first block's r_ff(0); an endless periodic input does not qualify.")]
  ];
  if (auditEntries.length !== window.FourierGuides["1.4.2"].steps.length) throw new Error("Incomplete textbook audit: 1.4.2");
  auditEntries.forEach(([source, intermediate], i) => {
    window.FourierLessons.find(lesson => lesson.id === "1.4.2").notes[i].source = source;
    window.FourierGuides["1.4.2"].steps[i].proof.unshift(intermediate);
  });
  window.FourierIndependentLabData["1.4.2"][1].insight = P("对这个实矩窗，左右位移的交叠相同，所以自相关实偶。这不是所有复函数都实偶的证据；接下来的复矩窗f(ξ)=e^(iπξ/2)rect(ξ/2)在x=±0.5给出1.5e^(±iπ/4)，虚部反号，提供反例。", "This real rectangle has equal left/right overlap and hence real-even autocorrelation. That does not establish real-even symmetry for complex signals. The later f(ξ)=e^(iπξ/2)rect(ξ/2) gives 1.5e^(±iπ/4) at x=±0.5, with opposite imaginary parts: a counterexample.");
  window.FourierLessons.find(lesson => lesson.id === "1.4.2").symbols = window.FourierSectionSymbolOverrides["1.4.2"].map(([tex, zh, en, unitZh, unitEn, control]) => ({
    tex, meaning: P(zh, en), unit: P(unitZh, unitEn),
    condition: P("按当前实验步骤；未显示读数表示本步未指定", "Current experiment step; no reading means unspecified in this step"), control,
  }));

  // Section-owned chart models, explanations, controls and notes mapping.
  window.FourierSectionRuntime["1.4.2"] = {
    legacyPlot: {
      label: ["同一函数左右错位 · 下：自相关输出", "The same function shifted · bottom: autocorrelation"],
      axisLabel: ["相关位移", "correlation lag"],
      marker: state => state.x0,
      norm: (state, x) => state.family === "gauss" ? state.a / Math.sqrt(2) * Math.exp(-Math.PI * x ** 2 / (2 * state.a ** 2)) : Math.max(0, state.a - Math.abs(x)),
      signal: (state, { line, gauss, rect, xSvg }) => state.family === "gauss" ? `<polyline points="${line(x => gauss(x, 0, 1))}" fill="none" stroke="#58a8de" stroke-width="3"/><polyline points="${line(x => gauss(x, state.x0, state.a))}" fill="none" stroke="#b74739" stroke-width="3"/>` : `${rect(0, state.a, 1, "#58a8de")}${rect(-state.x0, state.a, 1, "#b74739")}`,
    },
    models: ["auto"],
    noteStages: [0, 3, 4, 2],
      controls: {
      a: ["a", P("尺度 a（圆孔为半径）", "Scale a (radius for circle)"), .5, 3, .25],
      lag: ["lag", P("试探位移 x", "Trial lag x"), -3, 3, .25],
      amp: ["amp", P("信号幅度 A", "Signal amplitude A"), .5, 3, .5],
      omega: ["omega", P("相位斜率 ω", "Phase slope ω"), [[0, "0"], [Math.PI / 2, "π/2"], [Math.PI, "π"]]],
    },
    create(tools) {
      const { fmt, overlap, graph, legend, block } = tools;
      function autoValue(s, x) {
        if (s.signed) {
          const intervals = [[-1, 0, 1], [0, 1, -1]];
          const value = intervals.reduce((sum, [a, b, f]) => sum + intervals.reduce((v, [c, d, g]) => v + f * g * overlap(a, b, c + x, d + x), 0), 0);
          return { re: value, im: 0, abs: Math.abs(value), energy: 2 };
        }
        const area = s.amp * s.amp * Math.max(0, s.a - Math.abs(x));
        return { re: area * Math.cos((s.omega || 0) * x), im: area * Math.sin((s.omega || 0) * x), abs: area, energy: s.amp * s.amp * s.a };
      }
      function drawScene(model, s) {
        if (model === "auto") {
          const fn = x => s.signed ? x >= -1 && x < 0 ? 1 : x >= 0 && x <= 1 ? -1 : 0 : Math.abs(x) <= s.a / 2 ? s.amp * Math.cos((s.omega || 0) * x) : 0;
          const v = autoValue(s, s.lag);
          return { graphic: legend("上：输入实部及移位副本实部；下：自相关实部、虚部虚线、模点线", "Top: input real part and shifted real part; bottom: autocorrelation real, imaginary dashed, magnitude dotted") + graph([{ fn }, { fn: x => fn(x - s.lag), dash: true }], { xmin: Math.min(-3, s.lag - s.a / 2 - .5), xmax: Math.max(3, s.lag + s.a / 2 + .5), ymin: -3.2, ymax: 3.2, axis: "ξ" }) + graph([{ fn: x => autoValue(s, x).re }, { fn: x => autoValue(s, x).im, dash: true }, { fn: x => autoValue(s, x).abs, dot: true }], { ymin: -v.energy * 1.15, ymax: v.energy * 1.15, marker: s.lag, bound: v.energy }), readout: `x=${fmt(s.lag)} · r=${fmt(v.re)} ${v.im < 0 ? "−" : "+"} ${fmt(Math.abs(v.im))}i · |r|=${fmt(v.abs)} · E=${fmt(v.energy)}` };
        }
      }
      function explanation(model, s) {
        if (model === "auto") {
          const v = autoValue(s, s.lag), length = Math.max(0, s.a - Math.abs(s.lag));
          return block(
            ["上图横轴ξ：蓝实线是f(ξ)的实部，橙虚线是f(ξ−x)的实部；x是固定试探位移，A是幅度，a是窗全宽，ω是相位随位置的斜率（rad/坐标单位）。复数模型$f(\\xi)=A e^{i\\omega\\xi}$在|ξ|≤$\\frac a2$内，外面0；图未画的虚部仍参与计算。下图横轴x，蓝实线Re r、橙虚线Im r、紫点线|r|；横虚线是能量上界E，竖虚线定位当前x。", "Top horizontal ξ: blue solid is Re f(ξ), orange dashed is Re f(ξ−x). x is the fixed lag, A amplitude, a full window width, and ω phase slope in rad per coordinate unit. For the complex model $f(\\xi)=A e^{i\\omega\\xi}$ within |ξ|≤$\\frac a2$, zero outside; unseen imaginary parts still enter calculations. Bottom: blue solid Re r, orange dashed Im r, purple dotted |r|. Horizontal dashes mark energy E, vertical dashes current x."],
            s.signed ? String.raw`f=1\text{ on }[-1,0),\quad f=-1\text{ on }[0,1];\quad r(x)=\int f(\xi)f(\xi-x)d\xi,\quad E=1^2\times1+(-1)^2\times1=2` : String.raw`r(x)=\int f(\xi)f^*(\xi-x)d\xi=A^2\max(0,a-|x|)e^{i\omega x},\quad E=\int|f|^2d\xi=A^2a`,
            [s.signed ? `本步用正负阶梯替换复矩窗，逐对求两区间交集；每项=原段值×移位段值×交叠长度，再把四项相加。x=${s.lag}时得到r=${fmt(v.re)}、|r|=${fmt(v.abs)}；例如x=1只有异号段交叠，r=−1而非+1。` : `本次交叠长max(0,${s.a}−|${s.lag}|)=${fmt(length)}，乘A²=${fmt(s.amp ** 2)}，再乘$\\cos(\\omega x)+i\\sin(\\omega x)$，得r=${fmt(v.re)}${v.im < 0 ? "−" : "+"}${fmt(Math.abs(v.im))}i。能量E=${s.amp}²×${s.a}=${fmt(v.energy)}；比较的是|r|=${fmt(v.abs)}≤E，不是要求r本身总为正。`, s.signed ? `This step replaces the complex window by a signed two-step signal. Intersect each original/shifted interval pair and sum its value product × overlap length over four pairs. At x=${s.lag}, r=${fmt(v.re)}, |r|=${fmt(v.abs)}. For example, x=1 overlaps only opposite signs, giving r=−1, not +1.` : `Overlap max(0,${s.a}−|${s.lag}|)=${fmt(length)}, multiplied by A²=${fmt(s.amp ** 2)} and $\\cos(\\omega x)+i\\sin(\\omega x)$, gives r=${fmt(v.re)}${v.im < 0 ? "−" : "+"}${fmt(Math.abs(v.im))}i. E=${s.amp}²×${s.a}=${fmt(v.energy)}. Compare |r|=${fmt(v.abs)}≤E; r need not always be positive.`]);
        }
        return "";
      }
      return { drawScene, explanation, calculate: { autoValue } };
    },
  };
})();

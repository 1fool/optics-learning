/* Section 1.4.3: bilingual lesson, guided path, experiment and reference data. */
(() => {
  const { pair, formula, question, symbol, p, stage, step, sym, block, q, origin, P, S, commonSymbols, corrSymbols } = window.FourierSectionBuilders;
  const powerStages = [
    stage(["周期信号的难点", "Why a power signal differs"], ["选周期余弦，扩大积分窗口；先想 ∫|f|² 是否有有限极限。", "Take a periodic cosine and enlarge the integration window. Does ∫|f|² approach a finite value?"], { ...origin }, [["不收敛；需按窗口长度平均", "It diverges; average by window length"], ["收敛到 0", "It tends to zero"], ["只要加大窗口就变 δ", "Larger windows make a delta"]], 0, [["对。每周期都有非零能量，积分随周期数增长。", "Yes. Every cycle contributes nonzero energy."], ["cos² 的周期平均为 1/2，不是零。", "The period average of cos² is 1/2, not zero."], ["周期平均与脉冲极限无关。", "A periodic average is unrelated to the impulse limit."]]),
    stage(["定义平均", "Define the average"], ["把窗口半宽 X 调大，对比面积积分与除以 2X 后的平均。", "Increase window half-width X; compare raw integral and average divided by 2X."], { ...origin, a: 2 }, [["稳定的平均功率可存在", "Mean power can remain finite"], ["除以 2X 会总是变 0", "Dividing by 2X always yields zero"], ["单位还是能量而非功率密度", "Its units remain total energy"]], 0, [["对。正弦波的平均 cos² 是 1/2。", "Yes. The mean of cos² over cycles is 1/2."], ["分子也随窗口长度增大；比值可非零。", "The numerator also grows with window size."], ["此处是横向坐标平均，物理功率解释还需指定单位。", "This averages over a spatial coordinate; power units require a physical model."]]),
    stage(["周期与移位", "Period and lag"], ["令 f(ξ)=cos(πξ)，移动 x 一个周期 2；观察平均相关。", "Set f(ξ)=cos(πξ) and move lag by one period, 2."], { ...origin, x0: 2 }, [["再出现最大值", "A maximum returns"], ["必为零", "It must vanish"], ["窗口无限大使其发散", "An infinite window makes it diverge"]], 0, [["对。相隔整数周期时函数仍对齐。", "Yes. Signals align again at integer multiples of the period."], ["周期函数会在周期位移后再次相似。", "Periodicity creates recurrent similarity."], ["有限的是窗口平均，不是未归一化的全域积分。", "The window average, not the total integral, is finite."]]),
    stage(["宽窗数值与极限", "Finite windows and limits"], ["当前图用有限窗口算数值，教材定义把 X→∞；怎样解读有限窗口偏差？", "The chart uses a finite window, while the book takes X→∞. How should a finite-window deviation be read?"], { ...origin, a: 1 }, [["是边界误差，不等于极限定义失效", "A boundary effect, not a failure of the limit"], ["证明了周期函数有有限能量", "It proves finite total energy"], ["可以不说明窗口就称作实测", "Call it measurement without specifying a window"]], 0, [["对。有限区间末端不必恰为整数周期；这是数值模型。", "Yes. The finite window may truncate a cycle; this is a model calculation."], ["总能量仍随窗口增大而增大。", "Total energy still grows with window length."], ["模拟与实测必须明确区分。", "Simulation and measurement must be distinguished."]]),
    stage(["新周期预测", "Predict a new period"], ["换成 f(ξ)=cos(2πξ/3)，在位移 x=3 处平均自相关应是多少？答后显示极限读数。", "Use f(ξ)=cos(2πξ/3). What is mean autocorrelation at x=3? Reveal the limiting value after submitting."], { ...origin, a: 3, x0: 3 }, [["1/2", "1/2"], ["0", "0"], ["−1/2", "−1/2"]], 0, [["对。位移一周期仍同相，cos² 的周期平均为 1/2。", "Yes. One-period lag aligns the wave; mean cos² is 1/2."], ["整周期移位不是四分之一周期。", "One period is not a quarter-period lag."], ["半周期才反相，完整周期同相。", "Half a period reverses phase; one period restores it."]])
  ];
  const item = {
      id: "1.4.3", title: ["有限功率函数的相关", "Correlation of finite-power signals"], pages: "19–20", pdf: "21–22", firstPage: 21,
      lead: ["周期函数的总能量发散，为什么仍能计算稳定的平均相关？用有限窗平均再取极限。", "A periodic signal has infinite total energy. How can its averaged correlation remain finite? Average over finite windows before taking a limit."],
      bridge: [["自相关零位移用全域的 ∫|f|² 表示；它要求有限能量。", "Zero-lag autocorrelation used ∫|f|² over the whole domain, requiring finite energy."], ["对于无限周期信号，积分不断增大；改用窗口平均的极限。", "For endless periodic signals that integral grows without bound; use the limit of window averages."], ["后续正交函数与傅里叶级数将利用周期信号的这种结构。", "Later orthogonal functions and Fourier series use this periodic structure." ]], question: ["为何 cos 波的总能量无穷，但平均自相关有规律？", "Why does an endless cosine have infinite total energy but regular mean autocorrelation?"], setup: ["教材给二维方形窗口的 1/(2X·2Y) 平均极限；图板只展示一维 cos 的有限窗口模拟，横坐标无量纲。", "The book uses a 2D rectangular-window 1/(2X·2Y) average limit; the chart is a finite-window 1D cosine simulation with dimensionless coordinates."], terms: [["有限功率意味着窗口内平方模的平均存在且有限，不表示全域平方积分有限。", "Finite power means a finite limiting mean squared magnitude, not a finite total integral."], ["极限先用有限窗口计算，再令窗口 X、Y→∞；不同信号不保证极限存在。", "First average over finite windows, then let X,Y→∞; the limit does not exist for every signal."]], observe: ["把余弦周期参数 a 设为 2 或 3，改变相关位移，比较零、半周期与整周期读数。", "Set cosine period a to 2 or 3; compare mean correlation at zero, half-period and full-period lags."], stages: powerStages,
      recap: [["无限正弦/余弦函数不属于有限总能量类，但周期平均的平方模有限。", "Endless sine/cosine has infinite total energy but finite period-averaged squared magnitude."], ["二维有限功率相关是按窗口面积归一后取无限窗口极限。", "2D finite-power correlation divides by window area before taking the infinite-window limit."], ["cos(2πξ/a) 的平均自相关是 1/2 cos(2πx/a)，可在整周期位移再达最大。", "The mean autocorrelation of cos(2πξ/a) is 1/2 cos(2πx/a), peaking again at whole-period lags."]],
      blocks: [
        block(["总积分为什么不适用", "Why the total integral fails"], ["前节 r_ff(0)=∫|f|² 仅用于有限能量；无限周期的 cos² 在每个周期都贡献非零面积。", "The previous r_ff(0)=∫|f|² applies to finite energy; an endless cos² adds positive area each period."], String.raw`\int_{-\infty}^{\infty}\cos^2(2\pi\xi/a)\,d\xi=\infty`, ["a>0 为周期；不能把发散的能量积分直接代入上一节公式称为有限数。", "For period a>0 this total integral diverges; it cannot be treated as a finite-energy value."], ["每增加一整周期，cos² 的面积就再增加 a/2。", "Every new full period adds a/2 to the squared integral."], ["a=2，跨完整周期长度 2 的 cos² 积分是 1。", "For a=2, over a full period of length 2 the squared integral is 1."], ["下一步除以窗口长度而不是再放大总能量。", "Next divide by window length rather than enlarging the total integral."], ["用 cos²t=(1+cos 2t)/2 在一整个周期积分。", "Use cos²t=(1+cos 2t)/2 over one full period."], String.raw`\int_0^a\cos^2(2\pi\xi/a)\,d\xi=\frac a2`, ["无限多个周期使总和发散；除以总长度才可能稳定。", "Infinitely many periods make the total diverge; division by total length may stabilize it."]),
        block(["二维窗口面积平均", "Average over a 2D window"], ["选中心窗口 [−X,X]×[−Y,Y]，面积为 (2X)(2Y)；先算乘积积分，再除以面积，最后令 X、Y 一起趋于无穷。", "Use a centered window [−X,X]×[−Y,Y] of area (2X)(2Y); integrate the product, divide by area, and then let X,Y grow."], String.raw`R_{fg}(x,y)=\lim_{X,Y\to\infty}\frac1{(2X)(2Y)}\int_{-X}^{X}\!\int_{-Y}^{Y}f(\xi,\eta)g^{*}(\xi-x,\eta-y)\,d\eta\,d\xi`, ["仅当极限存在才定义该平均相关；变量 x、y 是位移，ξ、η 是积分坐标，X、Y 是窗口半宽。", "Define this mean correlation only when the limit exists; x,y are lags, ξ,η integration coordinates and X,Y window half-widths."], ["图板只画一维，真实二维窗口必须额外看 η、Y；边界截断可造成有限窗数值误差。", "The chart is 1D; true 2D averages also involve η,Y. Truncated boundaries can bias finite-window values."], ["若输入在 y 方向恒定，双重平均中的 y 积分可约去 2Y，留下 x 的一维平均。", "If signals are independent of y, averaging over y cancels 2Y, leaving a 1D mean."], ["用一维图先找整周期位移的相关。", "Use the 1D chart to inspect whole-period lags."], ["令 f(ξ,η)=F(ξ)、g(ξ,η)=G(ξ)，先对 η 从 −Y 至 Y 积分。", "Set f(ξ,η)=F(ξ), g(ξ,η)=G(ξ), and integrate first over η∈[−Y,Y]."], String.raw`\frac1{(2X)(2Y)}\int_{-X}^{X}\!\int_{-Y}^{Y}F(\xi)G^{*}(\xi-x)\,d\eta\,d\xi=\frac1{2X}\int_{-X}^{X}F(\xi)G^{*}(\xi-x)\,d\xi`, ["这是特定 y 不变条件下的一维简化，不是二维一般式。", "This 1D reduction needs y-independent signals; it is not the general 2D formula."]),
        block(["从正弦乘积读平均", "Compute the cosine average"], ["取 f=g=cos(2πξ/a)，将两个 cos 的乘积用积化和差展开；快速振荡项在大窗口平均中消失。", "Set f=g=cos(2πξ/a); use product-to-sum. The oscillatory term averages to zero over a large window."], String.raw`R_{ff}(x)=\tfrac12\cos(2\pi x/a)`, ["幅值 1 的平均功率是 R_ff(0)=1/2；该式的 1/2 来自平均 cos²，不是任意归一化。", "For unit amplitude mean power R_ff(0)=1/2; the factor comes from mean cos², not arbitrary normalization."], ["a=2 时 x=1 是半周期，平均相关 −1/2；x=2 回到 +1/2。", "For a=2, x=1 is half-period (−1/2) and x=2 whole-period (+1/2)."], ["a=3 时 x=3 对齐整周期，再得 1/2。", "For a=3, x=3 again aligns a full period and yields 1/2."], ["图中有限窗口只是数值近似，极限与有限读数不可混淆。", "The chart is a finite-window numerical approximation, not the exact limit."], ["记 A=2πξ/a、B=2π(ξ−x)/a，使用 2cos A cos B=cos(A−B)+cos(A+B)。", "Let A=2πξ/a and B=2π(ξ−x)/a; use 2cos A cos B=cos(A−B)+cos(A+B)."], String.raw`\cos A\cos B=\tfrac12\cos(2\pi x/a)+\tfrac12\cos(4\pi\xi/a-2\pi x/a)`, ["第二项在 X→∞ 的对称窗口平均为零，留下第一项。", "The second term averages to zero as X→∞, leaving the first." ]),
        block(["何时不能使用这个例子", "When the example does not apply"], ["仅在平均极限存在且信号模型成立时可用这一结果；有限图窗会随截断位置产生小偏差。", "Use the result only when the mean limit exists and the signal model applies; finite windows have truncation effects."], String.raw`P_f=R_{ff}(0)=\lim_{X\to\infty}\frac1{2X}\int_{-X}^{X}|f(\xi)|^2\,d\xi`, ["P_f 是一维横向平均平方模；是否具有实际瓦特单位，仍依赖物理振幅定义及截面积，不能仅凭数学式宣称测得光功率。", "P_f is a 1D spatial mean squared magnitude; watts require a physical amplitude and area calibration, not just this formula."], ["拖动 a，观察峰之间间距如何变化，但别用有限采样绘图证明极限对所有函数成立。", "Change a and inspect peak spacing; a finite sampled chart cannot prove the limit for every signal."], ["幅度为 1、周期 3 的余弦平均平方仍是 1/2。", "Unit-amplitude period-3 cosine still has mean square 1/2."], ["以后再研究傅里叶级数中的周期频率成分。", "Later study periodic frequency components via Fourier series."], ["将前块的自相关式令 x=0，再把 cos² 的周期平均代入。", "Set x=0 in the previous correlation and insert the cycle average of cos²."], String.raw`P_f=\lim_{X\to\infty}\frac1{2X}\int_{-X}^{X}\cos^2(2\pi\xi/a)\,d\xi=\tfrac12`, ["无限区间总能量发散，与有限平均平方模并不矛盾。", "Divergent total energy is compatible with a finite mean squared magnitude."])
      ],
      questions: [q("1.4.3:q1", ["单位振幅、非零频率的无限周期余弦，总平方积分和平均平方分别是？", "For an endless unit-amplitude, nonzero-frequency cosine, what are total squared integral and mean square?"], [["无穷与 1/2", "Infinite and 1/2"], ["均为 1/2", "Both 1/2"], ["均为 0", "Both zero"]], 0, [["对，单位振幅无限重复导致积分发散；周期平均为 1/2。", "Yes. Infinite repetition diverges; the cycle mean is 1/2."], ["全域有无限多个周期。", "The full domain has infinitely many periods."], ["cos² 非负且周期平均不为零。", "Cos² is nonnegative with nonzero mean."]]), q("1.4.3:q2", ["教材二维窗口平均的分母是？", "What is the denominator of the book's 2D window average?"], [["(2X)(2Y)", "(2X)(2Y)"], ["X+Y", "X+Y"], ["无限大的能量不归一", "No normalization"]], 0, [["对，窗口面积是 4XY。", "Yes, area is 4XY."], ["长度相加不是二维面积。", "Adding lengths does not give area."], ["平均需要先除以窗口面积。", "The integral must be divided by window area."]]), q("1.4.3:q3", ["f(ξ)=cos(2πξ/3) 在位移 3 的平均自相关是多少？", "Mean autocorrelation at lag 3 for cos(2πξ/3)?"], [["1/2", "1/2"], ["−1/2", "−1/2"], ["0", "0"]], 0, [["对，完整周期后重新同相。", "Yes. A full-period lag restores phase."], ["负值出现在半周期等反相位移。", "Negative values occur at phase-reversing lags such as half a period."], ["完整周期的余弦平均平方为 1/2。", "The mean squared cosine over one period is 1/2."]])]
    };
  item.symbols = item.id.startsWith("1.3") ? [...commonSymbols] : [...corrSymbols];
  item.symbols.push(sym("X,Y", "积分窗口的半宽（二维）", "Integration window half-widths (2D)", "长度", "length", "X,Y>0；图板只用 X", "X,Y>0; chart only uses X", "window"), sym("R_{fg}", "有限窗口面积平均后的相关极限", "Correlation limit after averaging over window area", "振幅平方", "amplitude squared"));
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
  window.FourierIndependentLabData["1.4.3"] = [
    S(["总量与平均量分开", "Separate total from average"],
      ["f(ξ)=Acos(2πξ/T)，T是周期，观察窗为[−X,X]。x=0时改变X，比较平方积分和除以2X后的平均。", "f(ξ)=Acos(2πξ/T), period T, window [−X,X]. At lag zero vary X and compare the squared integral with its mean after division by 2X."],
      "power", { amp: 1, period: 2, window: 2, lag: 0, phase: 0, ratio: 1 }, ["window"],
      [["总量随窗增长，平均趋向A²/2", "Total grows; mean approaches A²/2"], ["周期信号总能量有限", "Periodic signal has finite total energy"], ["平均量也必发散", "The mean must diverge"]], 0,
      [["对。非零周期信号无限重复，改用单位长度的平均。", "Yes. A nonzero periodic signal repeats indefinitely; use a per-length mean."], ["每个周期都贡献正的平方积分。", "Every period contributes positive squared integral."], ["除以观察长度抵消线性增长。", "Dividing by observation length removes linear growth."]],
      ["有限功率不等于有限能量；图是确定性一维余弦模型，非随机光场测量。", "Finite power is not finite energy. This is a deterministic 1D cosine, not a random-field measurement."],
      ["平均的分母必须跟随观察窗。", "The averaging denominator must track the observation window."]),
    S(["窗口宽度要一起除", "Divide by the whole window"],
      ["窗口半宽为X，不是全宽。取X=1，显示积分区间[−1,1]；改成非整数周期窗口，比较有限平均和极限。", "X is half-width, not full width. At X=1 inspect [−1,1], then use a non-integer-period window and compare finite mean with the limit."],
      "power", { amp: 1, period: 2, window: .75, lag: 0, phase: 0, ratio: 1 }, ["window", "period"],
      [["除以2X，有限窗不一定恰等于极限", "Divide by 2X; finite means need not equal the limit"], ["除以X", "Divide by X"], ["只取一个点就代表平均", "A single point represents the mean"]], 0,
      [["对。尾部不完整周期会留下边界项。", "Yes. Incomplete periods leave a boundary term."], ["[−X,X]的长度是2X。", "The length of [−X,X] is 2X."], ["平均是整个窗口上的积分再除长度。", "A mean integrates over the whole window, then divides by its length." ]],
      ["二维定义除以(2X)(2Y)，而不是周长；本例在y方向均匀，y因子抵消才化为一维。", "The 2D definition divides by (2X)(2Y), not perimeter. This y-uniform example reduces to 1D because the y factor cancels."],
      ["窗的账算对后，研究移位带来的相关。", "With the window accounted for, examine lag dependence."]),
    S(["移动四分之一周期", "Shift by a quarter period"],
      ["改变试探位移x，比较零、四分之一周期、半周期的平均相关；有限窗与极限两条线分别标记。", "Vary lag x and compare zero, quarter-period and half-period mean correlations. Finite-window and limiting curves are labeled separately."],
      "power", { amp: 1, period: 2, window: 4, lag: .5, phase: 0, ratio: 1 }, ["lag", "window"],
      [["T/4时为0，T/2时为−A²/2", "0 at T/4; −A²/2 at T/2"], ["所有移位都为正", "Positive at every lag"], ["非零位移全部为0", "Zero at every nonzero lag"]], 0,
      [["对。相位差分别为π/2、π。", "Yes. Phase differences are π/2 and π."], ["半周期使两个余弦符号相反。", "At half a period the cosines have opposite signs."], ["周期结构会在整周期处重复相关。", "Periodic structure repeats correlation at full periods." ]],
      ["由cos a cos b的积化和差得到：振荡项平均消失，留下相位差的余弦。", "The cosine product identity separates an oscillating term that averages away from a cosine of phase difference."],
      ["再改变幅度，别把平均功率当幅度。", "Now change amplitude; mean power is not amplitude."], String.raw`R_f(x)=\frac{A^2}{2}\cos(2\pi x/T)`),
    S(["幅度加倍会怎样", "What doubling amplitude does"],
      ["在零位移把A从1调到2，观察有限平均和极限；二者都使用同一幅度，不单独归一化。", "At zero lag change A from 1 to 2. Both finite mean and limit use the same amplitude without independent normalization."],
      "power", { amp: 2, period: 2, window: 4, lag: 0, phase: 0, ratio: 1 }, ["amp"],
      [["平均功率从0.5变2", "Mean power .5 to 2"], ["变成1", "Becomes 1"], ["仍为0.5", "Stays .5"]], 0,
      [["对。两个函数因子各乘2，总体乘4。", "Yes. Each factor doubles, so their product quadruples."], ["你按一次方放大，漏了另一个因子。", "That scales linearly and misses the second factor."], ["没有做幅度归一化，读数会变。", "No amplitude normalization is applied, so the reading changes." ]],
      ["自动把每幅图拉满会掩盖功率变化，因此读数与纵轴尺度固定对应。", "Independent rescaling would hide power changes; readings and axis scale are linked."],
      ["两个同频信号还可以有不同初相。", "Two equal-frequency signals may have different initial phases."]),
    S(["相关不一定是自相关", "Correlation need not be autocorrelation"],
      ["第二信号为Acos(2πξ/T+φ)。改变φ，再调x寻找同相位置；这时算互相关平均。", "The second signal is Acos(2πξ/T+φ). Change φ, then vary x to find phase alignment. This is mean cross-correlation."],
      "power", { amp: 1, period: 2, window: 4, lag: 0, phase: Math.PI / 2, ratio: 1 }, ["phase", "lag"],
      [["φ=π/2时，峰在x=T/4加整周期", "For φ=π/2, peaks at T/4 plus full periods"], ["峰必须只在0", "Peak must be only at zero"], ["初相不同就永远不相关", "Different initial phase means no correlation"]], 0,
      [["对。2πx/T−φ=2nπ给出同相。", "Yes. 2πx/T−φ=2nπ gives phase alignment."], ["只有同一信号自相关才固定在零位移取上界。", "Zero-lag bound applies to autocorrelation, not arbitrary cross-correlation."], ["调整位移可补偿相位差。", "A lag can compensate phase difference." ]],
      ["峰的周期性意味着不能只靠一个峰唯一确定绝对位移。", "Periodic peaks cannot uniquely determine an absolute displacement."],
      ["相同频率的公式能否用于不同频率？", "Does the same-frequency formula apply to unequal frequencies?"]),
    S(["不同频率别硬套", "Do not force the formula onto different frequencies"],
      ["令第二信号频率为第一条的2倍。增大窗口，比较有限平均与零极限；短窗可留下非零边界项。", "Make the second frequency twice the first. Enlarge the window and compare finite mean with its zero limit; short windows may leave a nonzero boundary term."],
      "power", { amp: 1, period: 2, window: .75, lag: .25, phase: 0, ratio: 2 }, ["ratio", "window", "lag"],
      [["长期平均趋0，不能套同频余弦式", "Mean tends to 0; the same-frequency formula does not apply"], ["仍为0.5cos(2πx/T)", "Still .5cos(2πx/T)"], ["短窗非零证明极限非零", "Nonzero short-window mean proves a nonzero limit"]], 0,
      [["对。差频、和频都非零，平均振荡项消失。", "Yes. Sum and difference frequencies are nonzero; their means vanish."], ["那个结果要求两条频率相同。", "That result requires equal frequencies."], ["有限读数不能代替无限窗极限。", "A finite reading does not replace the infinite-window limit." ]],
      ["一般有限功率函数还须相关平均极限存在；有限功率本身不保证所有相关极限都存在。", "General finite-power functions also require existence of the correlation mean limit; finite power alone does not ensure every such limit."],
      ["回到同一信号，用新周期独立判断。", "Return to one signal and predict at a new period."]),
    S(["隐藏曲线的新周期", "A new period with a hidden curve"],
      ["f(ξ)=2cos(2πξ/3)。预测其平均自相关在x=1.5的值，注意这是半周期。", "f(ξ)=2cos(2πξ/3). Predict its mean autocorrelation at x=1.5, a half-period lag."],
      "power", { amp: 2, period: 3, window: 6, lag: 1.5, phase: 0, ratio: 1 }, [],
      [["−2", "−2"], ["+2", "+2"], ["0", "0"]], 0,
      [["A²/2=2，cosπ=−1，所以−2。", "A²/2=2 and cosπ=−1, giving −2."], ["幅度算对了，但半周期使符号相反。", "Correct magnitude, but half-period lag reverses the sign."], ["四分之一周期才为0。", "A quarter-period lag gives zero." ]],
      ["先算平均功率尺度，再读相位差。", "Find the mean-power scale, then evaluate phase difference."],
      ["回顾窗口→平均→移位→适用边界。", "Recap window, mean, lag and limits."]),
  ];
  window.FourierIndependentRecaps["1.4.3"] = [
      ["同一余弦，短观察窗", "One cosine, short window", "power", { amp: 1, period: 2, window: .75, lag: 0 }],
      ["扩大窗口后取平均", "Enlarge and average", "power", { amp: 1, period: 2, window: 4, lag: 0 }],
      ["只移四分之一周期", "Shift a quarter period", "power", { amp: 1, period: 2, window: 4, lag: .5 }],
      ["只移半周期", "Shift a half period", "power", { amp: 1, period: 2, window: 4, lag: 1 }],
    ];
  window.FourierIndependentNotes.setups["1.4.3"] = P("无限重复的非零周期信号没有有限总能量，但可能有有限平均功率。先取有限观察窗，再除以长度或面积，最后检查窗口增大时的极限。", "A nonzero infinitely periodic signal has infinite total energy but may have finite mean power. Integrate over a window, divide by length or area, and then check the large-window limit.");
  window.FourierIndependentNotes.preludes["1.4.3:0"] =  { text: P("本段用a记周期，与实验里的T是同一个量；ξ是输入坐标，积分的单位仍含一个长度因子。下面先取单位幅度，后面再补幅度A。", "This derivation uses period a, the same quantity labeled T in the experiment. ξ is input position and the integral retains a length factor. Start with unit amplitude; amplitude A is restored later.") };
  window.FourierIndependentNotes.preludes["1.4.3:2"] =  { text: P("下式临时用A、B表示两个余弦的角度，不是实验中的幅度：A=2πξ/a，B=2π(ξ−x)/a。已知积化和差公式2cosAcosB=cos(A−B)+cos(A+B)，将这两个角度代入，得到常数项与振荡项。", "In the next identity A,B temporarily denote angles, not the experimental amplitude: A=2πξ/a, B=2π(ξ−x)/a. Use 2cosAcosB=cos(A−B)+cos(A+B), then substitute to obtain a constant term plus an oscillating term.") };
  window.FourierIndependentNotes.supplements["1.4.3"] = { text: P("补回幅度A，把周期记作T，令k=2π/T。对相同余弦，有限对称窗平均比极限多一个边界项：sin(2kX)有界，分母X增大使它消失。若两个频率不同，差频项也振荡，不能套同频结果。一般函数还必须核实平均极限存在。", "Restore amplitude A, write period T, and set k=2π/T. For identical cosines the finite symmetric-window mean contains a boundary term: bounded sin(2kX) divided by growing X vanishes. Unequal frequencies give an oscillating difference-frequency term too; do not reuse the equal-frequency result. General functions also require an existing mean limit."), tex: String.raw`\begin{aligned}R_{f,X}(x)&=A^2\cos(kx)\left[\frac12+\frac{\sin(2kX)}{4kX}\right],\\R_f(x)&=\frac{A^2}{2}\cos(kx).\end{aligned}` };
  window.FourierSectionSymbolOverrides["1.4.3"] = [
      ["x", "相关试探位移", "Trial correlation lag", "长度；图中无量纲", "Length; dimensionless demo", "lag"],
      ["T", "实验余弦周期；讲义记号a", "Cosine period; denoted a in the derivation", "长度", "Length", "period"],
      ["A", "信号幅度", "Signal amplitude", "随信号确定", "Signal-dependent", "amp"],
      ["X", "观察窗半宽；全长2X", "Window half-width; full length 2X", "长度", "Length", "window"],
      ["Y", "二维观察窗另一方向半宽", "Other half-width in a 2D window", "长度；一维图未指定", "Length; unspecified in 1D chart"],
      ["\\phi", "第二余弦的初相位", "Initial phase of the second cosine", "rad", "rad", "phase"],
      ["R_{fg}", "窗口面积平均后的相关极限", "Correlation limit after averaging over window area", "[f][g]；无长度因子", "[f][g]; no extra length factor"],
    ];
  const line = (zh, en, tex, resultZh, resultEn) => ({ lead: p(zh, en), tex, read: p(resultZh, resultEn) });
  const auditEntries = [
      ["书页 19–20；本课余弦例", line("目标：说明为什么能量发散。先求一个周期内平方的面积。", "Goal: see why total energy diverges. Find squared area within one period first.", String.raw`\cos^2 t=\tfrac12[1+\cos(2t)],\quad\int_0^a\cos^2(2\pi\xi/a)d\xi=\tfrac a2`, "每个周期都额外贡献 a/2>0；无限多个周期的积分便发散。", "Every period adds a/2>0; infinitely many periods make the full integral diverge.")],
      ["(1-47)", line("目标：用平均而不是无穷总和比较周期信号。先求方窗面积。", "Goal: compare periodic signals by an average, not an infinite total. Find the rectangular window area first.", String.raw`[-X,X]\times[-Y,Y]:\quad (2X)(2Y)=4XY`, "有限窗口中先积分乘积、再除面积；只有所得极限存在才称为相关。", "Integrate the product in a finite window and divide by area; call its limit correlation only if it exists.")],
      ["(1-48); 本课一维余弦例", line("目标：求余弦错开 x 后的平均。先把乘积拆成常数项和振荡项。", "Goal: find mean correlation of a cosine shifted by x. Split the product into a constant and an oscillatory term.", String.raw`\cos A\cos B=\tfrac12\cos(2\pi x/a)+\tfrac12\cos(4\pi\xi/a-2\pi x/a)`, "振荡项在 [−X,X] 的积分有界，除以 2X 后趋零；留下常数项。", "The oscillatory term's integral over [−X,X] stays bounded, so division by 2X tends to zero; the constant remains.")],
      ["(1-48); 本课零位移特例", line("目标：分清平均平方与总能量。先把相关位移设为零。", "Goal: distinguish mean square from total energy. Set correlation lag to zero first.", String.raw`R_{ff}(0)=\tfrac12\cos(0)=\tfrac12`, "这是单位振幅余弦的每单位长度平均平方，不是全域积分变成了 1/2。", "This is the unit-amplitude cosine's mean square per length, not a finite value for its full integral.")]
  ];
  if (auditEntries.length !== window.FourierGuides["1.4.3"].steps.length) throw new Error("Incomplete textbook audit: 1.4.3");
  auditEntries.forEach(([source, intermediate], i) => {
    window.FourierLessons.find(lesson => lesson.id === "1.4.3").notes[i].source = source;
    window.FourierGuides["1.4.3"].steps[i].proof.unshift(intermediate);
  });
  window.FourierLessons.find(lesson => lesson.id === "1.4.3").symbols = window.FourierSectionSymbolOverrides["1.4.3"].map(([tex, zh, en, unitZh, unitEn, control]) => ({
    tex, meaning: P(zh, en), unit: P(unitZh, unitEn),
    condition: P("按当前实验步骤；未显示读数表示本步未指定", "Current experiment step; no reading means unspecified in this step"), control,
  }));
})();

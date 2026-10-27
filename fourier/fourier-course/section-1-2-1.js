/* Section 1.2.1: bilingual lesson, guided path, experiment and reference data. */
(() => {
  const { pair, formula, question, symbol, p, stage, step, sym, block, q, origin, P, S, commonSymbols, corrSymbols } = window.FourierSectionBuilders;
  window.FourierLessons.push({
    id: "1.2.1", title: pair("δ 函数的定义与性质", "The delta distribution"), pages: "7–10", pdf: "9–12", firstPage: 9,
    lead: pair("怎样把越来越窄的脉冲用于“读取”某一点的函数值？观察宽度、峰值与面积，再看它如何在积分中起作用。", "How can a narrowing pulse read a function at a point? Watch width, height and area, then see what its integral does."),
    challenge: pair("脉冲越来越窄而面积一直为 1，峰值会怎样？", "If a pulse narrows while its area stays 1, what happens to its peak?"),
    choices: [pair("升高", "It rises"), pair("保持 1", "It stays 1"), pair("降到 0", "It falls to 0")],
    choiceFeedback: [pair("对。图中是有限宽近似，极限 δ 不具有普通函数的有限峰值。", "Yes. The plot is a finite-width approximation; the limiting delta has no ordinary finite peak."), pair("若宽度缩小而高度固定，面积就会趋于 0。", "With fixed height, a shrinking width would make the area tend to 0."), pair("面积固定需要更高，而不是更低。", "Fixed area requires a higher, not a lower, peak.")],
    transfer: { stem: pair("新情境：若 g(x)=2+x²，脉冲中心移至 x₀=1，极限加权积分是多少？", "New case: if g(x)=2+x² and the impulse centers at x₀=1, what is the limiting weighted integral?"), choices: [pair("2", "2"), pair("3", "3"), pair("4", "4")], answer: 1, feedback: [pair("2 是 g(0)；位移后应读取 x₀=1。", "2 is g(0); the shifted impulse samples at x₀=1."), pair("对。δ(x−1) 对连续 g 的积分给 g(1)=2+1²=3。", "Yes. Integrating δ(x−1) against continuous g yields g(1)=2+1²=3."), pair("要代入 x₀=1，不是把函数值再乘以脉冲的“高度”。", "Substitute x₀=1; do not multiply by a supposed delta peak height.")] },
    labHint: pair("选择矩形或高斯脉冲，改变 N 和中心 x₀；看面积固定时，加权积分如何靠近 f(x₀)。", "Choose a rectangular or Gaussian pulse, vary N and center x₀; observe a fixed-area weighted integral approach f(x₀)."),
    symbols: [
      symbol("x", ["横向坐标", "Horizontal coordinate"], ["长度", "length"], ["演示坐标无量纲", "Dimensionless in this demo"]),
      symbol("x_0", ["脉冲中心／取样位置", "Impulse center / sample position"], ["与 x 相同", "same as x"], ["—", "—"], "x0"),
      symbol("N", ["近似脉冲的收缩倍数", "Concentration parameter of finite pulse"], ["x 单位的倒数", "inverse unit of x"], ["N>0", "N>0"], "n"),
      symbol("\\delta", ["单位权重理想脉冲；以积分作用定义", "Unit-weight ideal impulse, defined by its integral action"], ["一维：1/长度；二维：1/面积", "1D: inverse length; 2D: inverse area"], ["不是普通函数的点值", "Not an ordinary point value"]),
      symbol("f", ["积分中被取样的连续函数", "Continuous function sampled by the integral"], ["依所选函数", "depends on f"], ["图中 f(x)=1/(1+x²)", "Diagram: f(x)=1/(1+x²)"]),
      symbol("a,b", ["二维 δ 坐标缩放因子", "2D delta coordinate scale factors"], ["无量纲", "dimensionless"], ["a,b≠0", "a,b≠0"]),
      symbol("r", ["二维点到原点的距离 √(x²+y²)", "Distance √(x²+y²) to the 2D origin"], ["长度", "length"], ["仅用于选读的径向近似", "Only in the optional radial approximation"]),
      symbol("J_1", ["第一类一阶贝塞尔函数", "Bessel function of the first kind, order one"], ["无量纲", "dimensionless"], ["选读近似；自变量须无量纲", "Optional approximation; argument is dimensionless"])
    ],
    recap: [pair("δ 不是“原点数值无限大”的普通函数；它通过对连续测试函数的积分作用定义。", "Delta is not an ordinary function with an infinite numerical value at the origin; its meaning is its action under an integral on a continuous test function."), pair("N rect(Nx) 与 N exp(−πN²x²) 的面积都为 1；宽度趋零、高度增加。", "Both N rect(Nx) and N exp(−πN²x²) have unit area; width shrinks and height rises."), pair("δ(x−x₀) 在积分中选出 x₀ 处的值；实际成像系统有有限分辨率。", "Under integration δ(x−x₀) selects the value at x₀; real imaging systems have finite resolution.")],
    notes: [
      formula(["先定义积分作用", "Start with its integral action"], ["把 δ 当成理想化的单位面积集中脉冲，而不是给每个 x 指定普通的有限数值。", "Treat δ as an ideal unit-area concentrated impulse, not a regular finite-valued function at each x."], String.raw`\int_{-\infty}^{\infty}\delta(x)\,dx=1,\qquad \int\delta(x-x_0)f(x)\,dx=f(x_0)`, ["第二式要求积分区间包含 x₀，且 f 在 x₀ 连续；本实验的 f(x)=1/(1+x²)。", "The integration interval contains x₀ and f is continuous there; this lab uses f(x)=1/(1+x²)."]),
      formula(["用普通函数逼近", "Approximate with ordinary functions"], ["宽度 ~1/N、峰高 ~N，面积仍为 1；高斯族同样满足单位面积。", "Width ~1/N and height ~N preserve unit area; the Gaussian family does too."], String.raw`\delta(x)=\lim_{N\to\infty}N\operatorname{rect}(Nx)=\lim_{N\to\infty}N\exp(-\pi N^2x^2)`, ["等号表示分布意义的极限，不能拿 δ(0) 当作普通函数值。", "These are distributional limits, not numerical values of δ(0)."]),
      formula(["二维点与位移", "Two-dimensional point and shift"], ["用二维积分读取 (x₀,y₀) 处连续函数 φ 的值；dxdy 是面积元。", "A two-dimensional integral reads continuous φ at (x₀,y₀); dxdy is an area element."], String.raw`\iint\delta(x-x_0,y-y_0)\phi(x,y)\,dx\,dy=\phi(x_0,y_0)`, ["二维 δ 具有 1/面积 的量纲。圆孔缩小且总权重归一也可形成近似脉冲。", "The two-dimensional delta has units of inverse area. A shrinking normalized disk is another approximation."]),
      formula(["缩放与相乘", "Scaling and multiplication"], ["a、b 为非零常数；缩放改变坐标面积，必须补偿 1/|ab|。若 h 在采样点连续，δ 只留下它在那里的值。", "For nonzero a,b coordinate scaling changes area and requires 1/|ab|. If h is continuous at the sample point, only its value there remains."], String.raw`\delta(ax,by)=\frac1{|ab|}\delta(x,y),\quad h(x,y)\delta(x-x_0,y-y_0)=h(x_0,y_0)\delta(x-x_0,y-y_0)`, ["这些等式同样按积分作用理解；不要当作在每一点的普通代数。", "Interpret both identities by their integral action, not pointwise ordinary algebra."])
    ],
    questions: [
      question("fo-1.2.1:q1", ["N rect(Nx) 当 N 增大时，面积如何变化？", "As N grows in N rect(Nx), what happens to area?"], [["保持 1", "Stays 1"], ["趋近 0", "Approaches 0"], ["趋于无穷", "Diverges"]], 0, [["对，宽度 1/N 乘高度 N。", "Yes: width 1/N times height N."], ["若没有前面的 N 才会趋于 0。", "Without the N prefactor it would tend to 0."], ["高度虽增加，宽度同时减小。", "Height rises, but width shrinks at the compensating rate."]]),
      question("fo-1.2.1:q2", ["f 在 x₀ 连续时，∫δ(x−x₀)f(x)dx 等于什么？", "For f continuous at x₀, what is ∫δ(x−x₀)f(x)dx?"], [["f(0)", "f(0)"], ["f(x₀)", "f(x₀)"], ["δ(x₀)", "δ(x₀)"]], 1, [["位移后的中心在 x₀，不一定在 0。", "The shifted center is x₀, not necessarily 0."], ["对，积分把 f 在脉冲位置的值选出。", "Yes, integration selects f at the pulse location."], ["δ 不是普通的点值；结果是被采样函数的值。", "Delta is not an ordinary point value; the result is a value of f."]]),
      question("fo-1.2.1:q3", ["二维 δ(2x,3y) 应等于多少倍 δ(x,y)？", "In two dimensions, what factor relates δ(2x,3y) to δ(x,y)?"], [["6", "6"], ["1/6", "1/6"], ["1", "1"]], 1, [["坐标面积被压缩 6 倍，脉冲权重需乘 1/6。", "The coordinate scaling requires the reciprocal factor 1/6."], ["对，1/|2·3|=1/6。", "Yes: 1/|2·3|=1/6."], ["漏掉了二维坐标变换的雅可比。", "This misses the two-dimensional Jacobian."]])
    ]
  });
  window.FourierGuides["1.2.1"] = {
      bridge: [p("承接：1.1 的 rect 和 Gaus 能给出有宽度的函数轮廓；本节用它们构造面积固定、宽度收缩的族。", "Previously: rect and Gaus gave finite-width profiles; here they build families whose area stays fixed as width contracts."), p("本节：理想点为什么不能简单画成一根无限高的普通曲线？如何从积分中读出它的作用？", "Here: why is an ideal point not merely an infinitely tall ordinary graph, and what does its integral do?"), p("下一步：将理想点等距离排开，就会得到用于抽样的梳状函数。", "Next: arranging ideal points at regular intervals gives the comb used for sampling.")],
      question: p("把一条狭缝压得无限窄，还能让它保持单位‘总权重’并读出某处的函数值吗？", "Can a slit shrink indefinitely while keeping unit total weight and selecting a function value?"),
      setup: p("这次画的是数学脉冲而非真实光斑。先看有限宽曲线：宽度变窄、高度变高、面积仍为 1；再用它和连续测试函数 f 的乘积积分定义极限。图上的两条曲线分别做显示归一化，不能从像素高度比较真实峰值。", "These are mathematical impulses, not real spots. First observe finite-width curves narrowing and growing while retaining area 1; then define the limiting action by integrating against a continuous test function f. The two plotted curves are normalized separately for display; pixel heights do not compare physical peaks."),
      terms: [p("δ 是分布：它的意义是与合适函数相乘后积分所得的数，而不是 δ(0) 的普通数值。", "Delta is a distribution: its meaning is the number obtained after integration against a suitable function, not an ordinary number δ(0)."), p("N 控制收缩：在有量纲的 x 中 N 的单位为长度的倒数，使 Nx 无量纲；示意图用无量纲坐标。", "N controls concentration: for dimensional x its unit is inverse length so Nx is dimensionless; the diagram uses dimensionless coordinates.")],
      observe: p("先选矩形脉冲，把 N=2 改成 N=8；读图下的面积与加权积分。再切高斯，看相同的极限作用能否由不同轮廓得到。", "Start with a rectangular pulse, change N=2 to N=8, and read the area and weighted integral below. Then select Gaussian: can a different shape give the same limiting action?"),
      stages: [
        stage(["一｜宽度与高度的账", "1 | Width versus height"], ["选矩形族，把 N 从 2 调到 8；对照脉冲宽度与图下的面积。图中红色峰被压缩显示，实际峰高看标注 N。", "Choose the rectangular family and change N from 2 to 8. Compare width and area. The red peak is display-normalized; actual height is the labeled N."], { family: "rect", n: 8, x0: 0, plane: false }, [["宽 1/N、高 N，因此面积仍为 1", "Width 1/N and height N keep area at 1"], ["宽度缩小而高度不变，面积仍为 1", "Width shrinks but fixed height keeps area at 1"], ["图中同高，所以实际峰高不变", "Equal pixels imply the actual peak is unchanged"]], 0, [["对，面积=宽×高=1；δ 本身不再有这样的有限宽和普通高度。", "Yes: area=width×height=1; delta itself has no finite width or ordinary height."], ["若高度不补偿，面积会变成 1/N 并趋于 0。", "Without height compensation the area becomes 1/N and tends to zero."], ["为防曲线挡住 f，脉冲纵轴在图里单独归一化；读实际峰高标注。", "The pulse axis is independently normalized so f remains visible; read the actual-height label."]]),
        stage(["二｜换一种轮廓", "2 | Change the profile"], ["切高斯族、保持 N=8。它没有硬边界；比较面积和图下的加权积分。", "Switch to Gaussian at N=8. It has no hard edges; compare area and the weighted integral."], { family: "gauss", n: 8, x0: 0, plane: false }, [["不同轮廓可在积分意义下趋向同一单位脉冲", "Different profiles can approach the same unit impulse under integration"], ["没有硬边界就不能有单位面积", "No hard edge means area cannot be 1"], ["两个图必须每一点都相等才有同样极限", "Profiles must agree pointwise to have the same limit"]], 0, [["对。这里只断言对合适的连续测试函数的积分极限相同，不断言每点都相同。", "Yes. Their integrals against suitable continuous tests agree in the limit, not their pointwise values."], ["高斯的尾部虽延伸无限远，按本书的归一化积分仍为 1。", "Gaussian tails extend indefinitely, yet its normalized area is 1."], ["矩形和高斯形状不同，集中后的积分作用仍能一致。", "Rect and Gaussian differ in shape yet have the same limiting integral action."]]),
        stage(["三｜把取样位置移走", "3 | Move the sample"], ["设 f(x)=1/(1+x²)，把脉冲中心 x₀ 从 0 移到 1；看目标值和有限宽积分如何变化，再增加 N。", "For f(x)=1/(1+x²), move the center x₀ from 0 to 1; compare target and finite-width integral, then increase N."], { family: "rect", n: 10, x0: 1, plane: false }, [["积分趋向 f(1)=1/2", "The integral approaches f(1)=1/2"], ["积分始终读取 f(0)=1", "The integral always reads f(0)=1"], ["需再乘 δ 的峰高才能得到结果", "Multiply by the peak of delta to get the answer"]], 0, [["对。中心搬到 x₀ 就读取 f(x₀)；有限 N 的值只能近似。", "Yes. Moving the center to x₀ samples f(x₀); finite N is only approximate."], ["只有中心仍在 0 时才读取 f(0)；观察橙点已移到 x=1。", "Only a center at zero samples f(0); the orange dot moved to x=1."], ["δ 无普通峰高；归一化已包含在脉冲积分中。", "Delta has no ordinary peak height; normalization is in the integral."]]),
        stage(["四｜从一点到平面上一点", "4 | Extend to a plane"], ["想象将单位面积的一维脉冲分别放在 x、y 两个方向，再相乘；在二维积分中缩放 x→2x、y→3y。", "Imagine multiplying unit-area pulses along x and y. In a 2D integral, rescale x→2x and y→3y."], { family: "gauss", n: 6, x0: 0, plane: true }, [["二维权重变为 1/|2·3|=1/6", "The 2D factor is 1/|2·3|=1/6"], ["两个方向只补偿一次 1/2", "Compensate only x with 1/2"], ["缩放会把 δ 当作普通数值乘 6", "Scaling multiplies delta's ordinary value by 6"]], 0, [["对。两个坐标的面积元一起变化；这是积分换元，不是缩放屏幕图像的结论。", "Yes. Both coordinate differentials change; this comes from an integral substitution, not resizing the screen chart."], ["y 方向的 1/3 也必须计入面积元。", "Include the y direction's 1/3 in the area element."], ["δ 不是普通点值，要计算它对测试函数的积分作用。", "Delta has no ordinary point value; evaluate its action on a test function."]]),
        stage(["五｜新函数，不靠记图", "5 | A new function"], ["改用未画出的 g(x)=2+x²。单位脉冲移到 x₀=1 时，极限加权积分会读出什么？", "Use a new function not plotted here, g(x)=2+x². What does the limiting weighted integral read at x₀=1?"], { family: "rect", n: 8, x0: 1, plane: false }, [["2", "2"], ["3", "3"], ["8，因为 N=8", "8 because N=8"]], 1, [["2 是 g(0)；脉冲已经移到 1。", "2 is g(0); the impulse moved to 1."], ["对。g 在 1 连续，所以结果是 g(1)=2+1²=3。", "Yes. g is continuous at 1, so the result is g(1)=2+1²=3."], ["N 只控制有限宽近似，不是理想脉冲被读出的值。", "N controls the finite approximation, not the value selected by the ideal impulse."]])
      ],
      steps: [
        step(["从单位权重的理想点开始：一维 δ 的总积分为 1。把中心移到 x₀ 后，它与在 x₀ 连续的函数 f 相乘并积分，会得到 f 在该点的值；积分范围必须包含 x₀。δ 不是处处为零、在一点无限大那样的普通函数。", "Start with a unit-weight ideal point: the 1D delta has total integral 1. Shift it to x₀ and integrate it against f continuous there to obtain f(x₀); the integration interval must contain x₀. Delta is not an ordinary graph with a numeric infinity at one point."], ["本图 f(x)=1/(1+x²)；若 x₀=1，理想结果为 1/2，有限 N 读数接近但不必等于它。x 与 x₀ 都为长度时，一维 δ 的单位为长度的倒数。", "In this chart f(x)=1/(1+x²). At x₀=1 the ideal answer is 1/2; finite N need not give it exactly. If x and x₀ are lengths, 1D delta has inverse-length units."], ["抽象的积分作用从哪里来？下一步用两类普通、单位面积的脉冲逼近。", "Where does that integral action come from? Next approximate it with two ordinary unit-area pulse families."], [["对理想单位脉冲进行平移，测试函数连续时只留下中心值。", "Shift the unit impulse; continuity lets it select the center value."], String.raw`\int_{-\infty}^{\infty}\delta(x-x_0)f(x)\,dx=f(x_0)`, ["这是分布的定义性作用，而不是把 δ(x₀) 代成一个普通数。", "This is the defining action of a distribution, not numerical substitution for δ(x₀)."]]),
        step(["令 N>0，取前节的 rect(Nx)：它的全宽是 1/N；乘前面的 N 后峰高为 N，面积恰为 1。高斯 N exp(−πN²x²) 同样面积为 1，但有尾部。两族的极限等号都指‘对合适连续测试函数积分的极限’。", "For N>0, rect(Nx) has full width 1/N; multiplying by N gives height N and area 1. The Gaussian N exp(−πN²x²) also has unit area but tails. Both limiting equalities mean convergence of integrals against suitable continuous tests."], ["N=4 时矩形宽 1/4、高 4；N=8 时宽 1/8、高 8。图中为了把测试函数一起画出，对红色脉冲的显示高度另行归一化。", "At N=4 the rectangle has width 1/4 and height 4; at N=8, width 1/8 and height 8. The drawn red pulse is independently normalized for display alongside the test function."], ["一维的取样可沿两个方向进行；下一步用二维积分表示平面上的点。", "Sampling can act along two axes; next use a 2D integral to describe a point in a plane."], [["核对两个近似的单位面积；使用前节的高斯标准积分。", "Check each unit area, using the Gaussian standard integral from §1.1."], String.raw`N\cdot\frac1N=1,\qquad \int_{-\infty}^{\infty}Ne^{-\pi N^2x^2}\,dx=\int_{-\infty}^{\infty}e^{-\pi u^2}\,du=1\quad(u=Nx)`, ["N 的量纲是长度的倒数，故脉冲乘 dx 后是无量纲权重；逐点极限不是这里的定义。", "N has inverse-length units, so integration over dx yields dimensionless weight; pointwise limits do not define delta."]]),
        step(["二维 δ 表示 (x₀,y₀) 处的单位权重点，dxdy 是面积元。它与在该点连续的测试函数 φ 相乘并在包含该点的区域积分，选出 φ(x₀,y₀)。二维 δ 的量纲是面积的倒数。可将两个一维单位面积矩窗相乘构造有限宽近似，也可把圆孔面积归一化后收缩。", "The 2D delta is a unit-weight point at (x₀,y₀), with dxdy an area element. Integrating it against φ continuous there over a region containing the point selects φ(x₀,y₀). The 2D delta has inverse-area units. Finite approximations include a product of two unit-area rectangles or a normalized shrinking disk."], ["例如 φ(x,y)=x²+y，点为 (2,3) 时结果为 7；这只是数学读数，并不是理想光学仪器有无限分辨率。", "For φ(x,y)=x²+y at (2,3), the answer is 7. This is a mathematical reading, not a claim of infinite instrumental resolution."], ["若压缩二维坐标，积分面积元也会变化；下一块由换元得到缩放因子。", "Rescaling both coordinates changes the integration area element; next obtain the factor by substitution."], [["将二维单位权重点移到指定坐标；先确保测试函数在该点连续。", "Shift the 2D unit point after ensuring continuity at that point."], String.raw`\iint\delta(x-x_0,y-y_0)\phi(x,y)\,dx\,dy=\phi(x_0,y_0)`, ["两维的单位由 (1/面积)×面积元抵消。", "Inverse-area units cancel those of the area element."]]),
        step(["这一块分别看相乘和缩放：连续函数 $h$ 乘点脉冲，只改变它的权重；非零系数 $a,b$ 缩放坐标，则改变二维积分的面积元。两式都按积分作用理解。", "Here multiplication and scaling are separate: multiplying a point impulse by continuous $h$ changes its weight; nonzero coordinate factors $a,b$ change the area element in a 2D integral. Both identities are understood through integration."], ["例如 $h(x,y)=x^2+y$ 在 $(2,3)$ 的值是7；而 $\\delta(2x,3y)$ 的权重是 $1/6$。7和 $1/6$ 来自不同操作。", "For example, $h(x,y)=x^2+y$ equals 7 at $(2,3)$, while $\\delta(2x,3y)$ has weight $1/6$. These come from different operations."], ["下一节把单位点按固定间距排开，得到采样阵列。", "Next, repeat unit points at fixed intervals to form a sampling lattice."], [["令 $u=ax,v=by$；面积元中的绝对值也涵盖反向缩放。", "Put $u=ax,v=by$; the absolute value also covers reversed axes."], String.raw`\begin{aligned}u&=ax,\quad v=by,\quad dx\,dy=\frac{du\,dv}{|ab|},\\ \iint\delta(ax,by)\phi(x,y)\,dx\,dy&=\frac1{|ab|}\iint\delta(u,v)\phi(u/a,v/b)\,du\,dv=\frac{\phi(0,0)}{|ab|}.\end{aligned}`, ["这在积分意义下成立，不是逐点代入。", "This is an identity under integration, not pointwise substitution."]])
      ]
    };
  window.FourierIndependentLabData["1.2.1"] = [
    S(["先守住面积", "Preserve area first"],
      ["N 控制脉冲变窄：宽1/N、高N。增大 N，比较高度和积分权重；箭头只表示理想脉冲的权重。", "N narrows the pulse: width 1/N, height N. Increase N and compare height with integral weight. An ideal impulse arrow denotes weight, not height."],
      "delta", { n: 2, x0: 0, family: "rect", weight: 1 }, ["n"],
      [["高度增大，面积仍1", "Height grows; area stays 1"], ["面积趋向0", "Area tends to zero"], ["面积等于峰高N", "Area equals peak N"]], 0,
      [["对。N×(1/N)=1。", "Yes. N×(1/N)=1."], ["宽度虽小，高度同时增大。", "Width shrinks while height increases."], ["积分还必须乘宽度。", "Integration must also account for width."]],
      ["δ 不是具有某个有限峰高的普通函数，而是由积分作用定义的分布。", "Delta is not an ordinary function with a finite peak; it is a distribution defined by its action under integration."],
      ["面积守恒后，检查换轮廓是否改变极限。", "With area fixed, change the pulse profile."]),
    S(["换轮廓，不换权重", "Change shape, not weight"],
      ["切换单位面积矩形和高斯。蓝线是测试函数 $f(x)=\\frac{1}{1+x^2}$，橙线是有限脉冲；改变 N 看加权积分。", "Switch unit-area rectangular and Gaussian pulses. Blue is test function $f(x)=\\frac{1}{1+x^2}$; orange is the finite pulse. Change N and inspect the weighted integral."],
      "delta", { n: 4, x0: 0, family: "gauss", weight: 1 }, ["family", "n"],
      [["都趋向 f(0)=1，但有限宽误差不同", "Both approach f(0)=1, with different finite-width errors"], ["每个有限N都恰好等于1", "Exactly 1 at every finite N"], ["高斯只由峰高决定", "Only the Gaussian peak matters"]], 0,
      [["对。近似的是对连续测试函数的积分作用。", "Yes. The approximation concerns action on continuous test functions."], ["有限宽会平均到邻近较小的 f 值。", "Finite width also samples nearby lower values."], ["必须保留完整的加权积分，不能只看峰。", "Retain the weighted integral, not just the peak."]],
      ["图中脉冲为看清轮廓单独缩放高度，读数用未缩放函数积分；不是把画面高度当权重。", "Pulse height is separately scaled for visibility; readings integrate the unscaled function. Display height is not weight."],
      ["同一个积分算法，下一步移动脉冲所在位置。", "Keep the integration rule and move the pulse."]),
    S(["位置决定选中谁", "Position selects a value"],
      ["x₀ 是脉冲中心，不是输出值。将 x₀ 从0移到1，比较极限选出的 f(x₀)。", "x₀ is pulse position, not output value. Move it from 0 to 1 and compare the selected f(x₀)."],
      "delta", { n: 10, x0: 1, family: "rect", weight: 1 }, ["x0", "n"],
      [["趋向 f(1)=0.5", "Approaches f(1)=.5"], ["仍选 f(0)=1", "Still selects f(0)=1"], ["输出必等于位置1", "Output must equal position 1"]], 0,
      [["对。δ(x−1) 让积分选中位置1。", "Yes. δ(x−1) selects position 1."], ["脉冲已移动，不能继续选原点。", "The pulse moved; it no longer selects the origin."], ["位置和函数值是两种不同的量。", "Position and function value are different quantities."]],
      ["筛选要求测试函数在选中点连续；有限宽读数只是近似。", "Sifting requires continuity at the selected point; the finite-width reading is approximate."],
      ["位置会选点，权重会怎样改变选出的数？", "Position chooses a point; what does weight do?"], String.raw`\int f(x)\delta(x-x_0)\,dx=f(x_0)`),
    S(["权重不是位置", "Weight is not position"],
      ["保留 x₀=1，给脉冲乘权重 c=2。观察积分值与测试函数本身的值是否一样。", "Keep x₀=1 and multiply impulse weight by c=2. Compare the integral with the test-function value."],
      "delta", { n: 12, x0: 1, family: "rect", weight: 2 }, ["weight", "n"],
      [["极限为 2×0.5=1", "Limit is 2×.5=1"], ["仍然只能是0.5", "Still necessarily .5"], ["位置改为2", "Position moves to 2"]], 0,
      [["对。线性积分把权重保留在外面。", "Yes. Linearity retains the weight."], ["那漏掉了脉冲的系数2。", "That omits the impulse coefficient 2."], ["外面的系数不平移自变量。", "An outside coefficient does not translate the argument."]],
      ["普通函数乘 δ 时，只保留该点的函数值作为脉冲权重；不是把 δ 变成普通有限峰。", "Multiplying an ordinary function by delta retains its point value as impulse weight, not as a finite ordinary peak."],
      ["从一条线的宽度变成平面面积。", "Replace a line width with planar area."]),
    S(["二维缩放看面积", "Use area for 2D scaling"],
      ["α、β 分别缩放横、纵坐标。图中椭圆是有限宽轮廓；把 α=2、β=3，比较 δ(αx,βy) 的总权重。", "α and β scale horizontal and vertical coordinates. Ellipses are finite-width contours. Set α=2 and β=3 and compare the total weight of δ(αx,βy)."],
      "deltaPlane", { ax: 2, by: 3 }, ["ax", "by"],
      [["权重为1/6", "Weight 1/6"], ["权重为6", "Weight 6"], ["权重仍为1", "Weight stays 1"]], 0,
      [["对。换元面积元缩小为1/|αβ|。", "Yes. The area element contributes 1/|αβ|."], ["你用了相反方向的面积因子。", "That reverses the area factor."], ["只有外面再乘|αβ|才能恢复单位权重。", "An extra factor |αβ| would restore unit weight."]],
      ["二维 δ 的单位是面积的倒数。一维 δ 的单位是长度的倒数；示意轮廓不是光斑照片。", "A 2D delta has inverse-area units; a 1D delta has inverse-length units. The contours are not measured spots."],
      ["筛选还依赖连续性，不能只背“取该点”。", "Sifting also depends on continuity, not just a slogan about point values."], String.raw`\delta(\alpha x,\beta y)=\frac{\delta(x,y)}{|\alpha\beta|}`),
    S(["遇到跳变先停一下", "Stop at a discontinuity"],
      ["蓝线是左侧0、右侧1的阶跃，约定f(0)=1/2。先只改N：对称矩脉冲的积分确实始终为1/2。再切换脉冲位置分布：左侧区间[−1/N,0]、对称区间[−1/(2N),1/(2N)]、右侧区间[0,1/N]，三者高N、面积1，都向0集中。比较后判断哪句话准确；这里的‘任意近似’包括改变左右分布，不仅是改变N。", "Blue is a step, 0 on the left, 1 on the right, with f(0)=1/2 by convention. Varying N alone really does keep the symmetric integral at 1/2. Then select left [−1/N,0], symmetric [−1/(2N),1/(2N)], and right [0,1/N] rectangles: all have height N, area 1, and concentrate at zero. Which statement describes this comparison? 'Any approximation' includes changing left/right allocation, not just N."],
      "delta", { n: 8, x0: 0, family: "rect", weight: 1, discontinuous: true }, ["n", "jumpFamily"],
      [["只改N时，对称脉冲始终为1/2；换左、右侧脉冲则为0、1", "Changing N preserves symmetric 1/2; left/right pulses instead give 0/1"], ["不论脉冲在左侧、对称或右侧，积分必为右侧值1", "Left, symmetric and right pulses must all give the right-hand value 1"], ["只要都向0集中，左侧、对称、右侧脉冲的积分必相同", "Concentration at zero alone forces equal integrals for left, symmetric and right pulses"]], 0,
      [["对。你看到对称脉冲随N变化仍是0.5完全正确；新增对照才说明更换近似族会不同：左侧0、对称0.5、右侧1。", "Correct. Your observation that the symmetric result stays 0.5 as N changes is valid. The additional families supply the missing evidence: left 0, symmetric 0.5, right 1."], ["右侧脉冲才全部落在f=1的区域；左侧脉冲全落在f=0区，对称脉冲各占一半。", "Only a right pulse lies entirely in f=1; a left pulse lies in f=0, and a symmetric pulse divides equally."], ["只改N时你观察得没错；但本选项还声称换左右分布也相同。切到左侧与右侧看0和1：它们同样面积1且向0集中，反例否定了这个更广的说法。", "Your observation while changing N was correct. This option also claims equality after changing left/right allocation. The left and right results 0 and 1 are counterexamples: both families still have area 1 and concentrate at zero."]],
      ["这里区分‘同一个对称近似族中改变N’与‘更换近似族’。三个矩脉冲对连续函数都趋向f(0)，但对这个跳变阶跃分别得到0、1/2、1。单点f(0)怎么约定不改变普通积分；不连续点的δ作用不能仅由有限脉冲看起来都变窄来确定。", "Distinguish varying N within one symmetric family from changing families. All three rectangles tend to f(0) for continuous functions, but on this step they give 0, 1/2, 1. Assigning f(0) at a single point does not alter an ordinary integral. Narrowing alone cannot define delta action on a discontinuity."],
      ["最后同时判断位置与权重。", "Finally combine position and weight."]),
    S(["独立筛选", "Sift independently"],
      ["新条件：$f(x)=\\frac{1}{1+x^2}$，脉冲为 $3\\delta(x-2)$。求理想脉冲的积分，与 $N$ 无关；提交后的有限宽对照图固定用 $N=12$ 的对称矩形。先预测，再看计算图与读数。", "New case: $f(x)=\\frac{1}{1+x^2}$ and impulse $3\\delta(x-2)$. Predict the ideal-impulse integral, independent of $N$; the finite-width comparison shown after submission uses a symmetric rectangle with fixed $N=12$. Predict before viewing the calculated plot and reading."],
      "delta", { n: 12, x0: 2, family: "rect", weight: 3 }, [],
      [["0.6", ".6"], ["0.2", ".2"], ["3", "3"]], 0,
      [["3f(2)=3/5=0.6；有限脉冲只逼近它。", "3f(2)=3/5=.6; a finite pulse only approximates it."], ["你选对了位置但漏掉权重3。", "Correct position, but missing weight 3."], ["3是权重，还要乘位置2的函数值。", "3 is weight; multiply it by the value at 2."]],
      ["先定位，再取值，最后乘权重；不要把峰高、权重与位置混在一起。", "Locate, evaluate, then multiply by weight; distinguish peak height, weight and position."],
      ["回顾后进入正式练习。", "Recap, then practice."]),
  ];
  window.FourierIndependentRecaps["1.2.1"] = [
      ["选中位置x₀=1", "Select position x₀=1", "delta", { n: 2, x0: 1, weight: 1, family: "rect" }],
      ["同一位置继续变窄", "Narrow at the same site", "delta", { n: 8, x0: 1, weight: 1, family: "rect" }],
      ["极限选出f(1)=0.5", "The limit selects f(1)=.5", "delta", { n: 12, x0: 1, weight: 1, family: "rect" }],
      ["只改权重为2", "Change only weight to 2", "delta", { n: 12, x0: 1, weight: 2, family: "rect" }],
    ];
  window.FourierIndependentNotes.setups["1.2.1"] = P("想用一个理想点表示有固定总权重的局部输入。先检查有限脉冲的面积，再建立积分筛选、位移、二维缩放与相乘规则。", "Represent a localized input with a fixed total weight. Check finite-pulse area first, then establish sifting, translation, 2D scaling and multiplication.");
  window.FourierSectionSymbolOverrides["1.2.1"] = [
      ["x_0", "被选中的输入位置，不是函数值", "Selected input position, not function value", "长度；图中无量纲", "Length; dimensionless demo", "x0"],
      ["N", "有限脉冲收缩参数；矩形宽1/N", "Concentration parameter; rectangle width 1/N", "长度的倒数", "Inverse length", "n"],
      ["c", "积分权重；可正可负", "Integral weight; may be signed", "本例无量纲", "Dimensionless here", "weight"],
      ["\\alpha", "横坐标缩放系数", "Horizontal coordinate scaling", "无量纲", "Dimensionless", "ax"],
      ["\\beta", "纵坐标缩放系数", "Vertical coordinate scaling", "无量纲", "Dimensionless", "by"],
      ["\\delta", "以积分作用定义的理想脉冲", "Ideal impulse defined by integral action", "一维1/长度；二维1/面积", "1D inverse length; 2D inverse area"],
    ];
  window.FourierGuides["1.2.1"].steps[2].proof.push({
    lead: p("两种二维单位面积近似：让矩窗沿 x、y 各自缩小，或让圆孔半径缩成 1/N；N 的单位为长度的倒数。", "Two unit-area 2D approximations: shrink rectangular windows along x and y, or shrink a disk's radius to 1/N; N has inverse-length units."),
    tex: String.raw`N^2\operatorname{rect}(Nx)\operatorname{rect}(Ny),\qquad \frac{N^2}{\pi}\operatorname{circ}\!\left(N\sqrt{x^2+y^2}\right)`,
    read: p("矩窗面积 1/N² 乘峰高 N² 得 1；圆孔面积 π/N² 乘系数 N²/π 也得 1。它们是不同有限宽模型，只有分布极限一致。", "The rectangle has area 1/N² times height N²; the disk has area π/N² times N²/π. Both weigh 1, despite different finite profiles; their distributional limits agree.")
  });
  window.FourierGuides["1.2.1"].steps[2].proof.push({
    lead: p("教材还列出振荡型近似：sinc 采用 1.1 的 sin(πu)/(πu) 约定；它有正负旁瓣，不能当成非负有限光斑。", "The book also lists an oscillatory approximation: sinc uses §1.1's sin(πu)/(πu) convention. Its signed side lobes are not a nonnegative finite light spot."),
    tex: String.raw`\delta(x,y)=\lim_{N\to\infty}N^2\operatorname{sinc}(Nx)\operatorname{sinc}(Ny)`,
    read: p("这里的等号只指对合适测试函数积分的极限；不能用矩形窗的‘宽×高’证明它。这个非必需的收敛验证留到后续傅里叶分析。", "Equality means the limiting integral action on suitable test functions; a rectangular width-times-height argument is invalid. Its optional convergence proof awaits Fourier analysis.")
  });
  window.FourierGuides["1.2.1"].steps[2].proof.push({
    lead: p("另一个径向式用 r=√(x²+y²) 与第一类一阶贝塞尔函数 J₁；其自变量 2πNr 无量纲，r=0 取连续极限，不可直接除零。", "A radial form uses r=√(x²+y²) and the order-one Bessel function J₁. Its argument 2πNr is dimensionless; at r=0 use a continuous limit rather than divide by zero."),
    tex: String.raw`\delta(x,y)=\lim_{N\to\infty}\frac{N J_1(2\pi N r)}{r},\qquad r=\sqrt{x^2+y^2}`,
    read: p("这一族也可能出现振荡旁瓣；属于分布意义的另一种表示，不是 δ 在原点的普通函数值。完整证明需要后续径向傅里叶工具。", "This family can also have oscillatory lobes. It is another distributional representation, not an ordinary value of delta at the origin; a full proof uses later radial Fourier tools.")
  });
  const line = (zh, en, tex, resultZh, resultEn) => ({ lead: p(zh, en), tex, read: p(resultZh, resultEn) });
  const auditEntries = [
      ["(1-12), (1-20)–(1-21)", line("目标：解释为什么 δ 可以取样而不是作为普通峰求值。用宽 1/N、高 N 的矩窗先对 f 积分。", "Goal: explain delta sampling rather than assign it an ordinary peak value. Integrate f against a width-1/N, height-N rectangle first.", String.raw`\int N\operatorname{rect}(N(x-x_0))f(x)dx=N\int_{x_0-1/(2N)}^{x_0+1/(2N)}f(x)dx`, "当 f 在 x₀ 连续，区间均值趋向 f(x₀)；这里使用的是积分极限。", "If f is continuous at x₀, the interval average approaches f(x₀); this is a limit of integrals.")],
      ["(1-13)–(1-14)", line("目标：证明两种有限脉冲都保留权重 1。先求矩窗宽度；高斯再换元 u=Nx。", "Goal: show both finite pulses keep weight 1. Find the rectangle width, then put u=Nx for the Gaussian.", String.raw`\operatorname{width}[\operatorname{rect}(Nx)]=1/N,\quad u=Nx,\quad dx=du/N`, "矩窗高 N，故面积 N(1/N)=1；高斯的 N 与 dx 的 1/N 抵消。", "The rectangle has height N and area N(1/N)=1; for the Gaussian, N cancels the differential's 1/N.")],
      ["(1-15)–(1-21)", line("目标：从两次一维筛选得到二维点的作用。先固定 y，对 x 积分筛出 x₀。", "Goal: derive the 2D point action by two 1D sampling steps. Fix y and integrate over x first to obtain x₀.", String.raw`\iint\delta(x-x_0)\delta(y-y_0)\phi(x,y)dxdy=\int\delta(y-y_0)\phi(x_0,y)dy`, "再对 y 积分得到 φ(x₀,y₀)；乘积模型是在合适连续测试函数下理解。", "Then integrate over y to obtain φ(x₀,y₀); the product acts on suitable continuous test functions.")],
      ["(1-22)–(1-23)", line("目标：找缩放为何出现 1/|ab|。先看测试函数积分中的变量替换。", "Goal: find why scaling produces 1/|ab|. Substitute variables in an integral against a test function.", String.raw`u=ax,\quad v=by,\quad |dx\,dy|=|du\,dv|/|ab|`, "绝对值保证即使某一坐标方向反转，积分权重仍为正。", "Absolute values keep the integral weight positive even if an axis is reversed.")]
  ];
  if (auditEntries.length !== window.FourierGuides["1.2.1"].steps.length) throw new Error("Incomplete textbook audit: 1.2.1");
  auditEntries.forEach(([source, intermediate], i) => {
    window.FourierLessons.find(lesson => lesson.id === "1.2.1").notes[i].source = source;
    window.FourierGuides["1.2.1"].steps[i].proof.unshift(intermediate);
  });
  window.FourierIndependentLabData["1.2.1"][5].evidence = {
    text: P("本题要区分两种操作：只改N，对称族一直为0.5，你的观察没有错；换左右分布才得到新的证据。三族同样高N、面积1：左侧覆盖f=0区，积分0；对称一半覆盖f=1区，积分0.5；右侧全覆盖f=1区，积分1。用左侧/右侧下拉选项实际对照，不要求从一个0.5的画面猜出未展示的条件。", "This question distinguishes two operations. Changing only N keeps symmetric 0.5: that observation is correct. Changing left/right allocation supplies new evidence. All three have height N and area 1: left covers f=0 and integrates to 0; symmetric covers f=1 with half its area and gives 0.5; right covers f=1 entirely and gives 1. Use the family selector to compare: do not infer unseen conditions from one picture of 0.5."),
  };
  window.FourierLessons.find(lesson => lesson.id === "1.2.1").symbols = window.FourierSectionSymbolOverrides["1.2.1"].map(([tex, zh, en, unitZh, unitEn, control]) => ({
    tex, meaning: P(zh, en), unit: P(unitZh, unitEn),
    condition: P("按当前实验步骤；未显示读数表示本步未指定", "Current experiment step; no reading means unspecified in this step"), control,
  }));
  // Explain the sampling mechanism before the two distribution identities.
  const deltaProductNote = window.FourierLessons.find(l => l.id === "1.2.1").notes[3];
  const deltaProductStep = window.FourierGuides["1.2.1"].steps[3];
  deltaProductNote.before = P("为什么只取该点的值？先看脉冲收窄时，积分怎样集中到中心。相乘后仍是脉冲；积分后才得到数。", "Why only the local value? First see how a narrowing pulse concentrates the integral at its center. Multiplication leaves a pulse; integration gives a number.");
  deltaProductStep.build = P("先用普通矩形脉冲算出取样结果，再分别看二维相乘和缩放。", "Compute sampling with an ordinary rectangular pulse, then separate 2D multiplication from scaling.");
  deltaProductStep.chartCaption = P("本段末尾：二维缩放图（不是相乘示意）", "Final part: 2D scaling chart, not the multiplication example");
  deltaProductStep.chartLabel = P("查看本段末尾的二维缩放图 ↗", "View the 2D scaling chart for the final part ↗");
  deltaProductStep.proof = [
    {
      title: P("1 · 有限脉冲", "1 · Finite pulse"),
      lead: P("设 $h(x)=x^2+1$，在 $x_0=1$ 取样。$x$ 是积分变量；$p_N$ 是中心在1的矩形脉冲，$N>0$ 越大越窄。宽 $1/N$、高 $N$，总权重为1。", "Let $h(x)=x^2+1$ and sample at $x_0=1$. The coordinate $x$ varies in the integral; $p_N$ is a rectangle centered at 1, narrowing as $N>0$ grows. Width $1/N$, height $N$: total weight 1."),
      tex: String.raw`\begin{aligned}p_N(x)&=\begin{cases}N,&|x-1|\le\frac1{2N},\\0,&\text{otherwise}\end{cases}\\\int p_N(x)\,dx&=N\cdot\frac1N=1\\I_N&=\int h(x)p_N(x)\,dx\\&=N\int_{1-1/(2N)}^{1+1/(2N)}h(x)\,dx\end{aligned}`,
      read: P("区间外脉冲为0，区间内积分取 $h$ 的平均；有限宽时不等于只取一个点。", "Outside the interval the pulse is zero; inside, the integral averages $h$. Finite width still samples nearby values.")
    },
    {
      title: P("2 · 平均趋向中心值", "2 · Average approaches the center"),
      lead: P("把 $h(x)$ 拆成 $h(1)$ 与误差；单位权重留下 $h(1)$。$h$ 在1连续，所以区间收窄时误差趋零。", "Split $h(x)$ into $h(1)$ and an error. Unit weight retains $h(1)$; continuity at 1 makes the error vanish as the interval narrows."),
      tex: String.raw`\begin{aligned}I_N&=h(1)+E_N\\E_N&=\int p_N(x)[h(x)-h(1)]\,dx\\|E_N|&\le\sup_{|x-1|\le1/(2N)}|h(x)-h(1)|\longrightarrow0\end{aligned}`,
      read: P("附近的值逐渐接近中心值，而不是把整条 $h$ 的其他值删掉。", "Nearby values approach the center value; the rest of $h$ is not deleted.")
    },
    {
      title: P("3 · 数字验算", "3 · Numerical check"),
      lead: P("令 $u=x-1$，积分限为 $\pm1/(2N)$。奇项 $2u$ 抵消，只剩有限宽误差。", "Put $u=x-1$; the bounds become $\pm1/(2N)$. The odd term $2u$ cancels, leaving a finite-width error."),
      tex: String.raw`\begin{aligned}I_N&=N\int_{-1/(2N)}^{1/(2N)}(2+2u+u^2)\,du\\&=N\left[2u+u^2+\frac{u^3}{3}\right]_{-1/(2N)}^{1/(2N)}=2+\frac1{12N^2}\\I_2&\approx2.020833,\quad I_4\approx2.005208,\quad I_{12}\approx2.000579\end{aligned}`,
      read: P("有限宽结果并非精确的2；理想脉冲把极限取样作为定义。", "Finite-width readings are not exactly 2; the ideal impulse is defined through their limiting action.")
    },
    {
      title: P("4 · 相乘保留位置", "4 · Multiplication keeps the site"),
      lead: P("先看一维：相乘改权重，积分才得到数。二维例子 $h(x,y)=x^2+y$ 在 $(2,3)$ 的值为7。", "In 1D, multiplication changes the weight; integration gives a number. In 2D, $h(x,y)=x^2+y$ equals 7 at $(2,3)$."),
      tex: String.raw`\begin{aligned}h(x)\delta(x-1)&=2\delta(x-1),\quad\int h(x)\delta(x-1)\,dx=2\\h(x,y)\delta(x-2,y-3)&=7\delta(x-2,y-3)\\\iint h(x,y)\delta(x-2,y-3)\,dx\,dy&=7\end{aligned}`,
      read: P("7是原位置脉冲的新权重，不是新坐标。", "Seven is the new weight at the original site, not a new coordinate.")
    },
    {
      title: P("5 · 为什么等式成立？", "5 · Why the identity holds"),
      lead: P("分布等式用测试函数检验。任取光滑且支撑有界的 $\\varphi$，对点脉冲积分时读出 $(h\\varphi)(x_0,y_0)$。", "Test a distributional identity with smooth, compactly supported $\\varphi$. Integration against the point impulse reads $(h\\varphi)(x_0,y_0)$."),
      tex: String.raw`\begin{aligned}\iint h(x,y)\varphi(x,y)\delta(x-x_0,y-y_0)\,dx\,dy&=h(x_0,y_0)\varphi(x_0,y_0)\\&=\iint h(x_0,y_0)\varphi(x,y)\delta(x-x_0,y-y_0)\,dx\,dy\end{aligned}`,
      read: P("两边对每个 $\\varphi$ 结果相同；这里要求 $h$ 在取样点连续。", "Both sides agree for every $\\varphi$; here $h$ is continuous at the sampling site.")
    },
    {
      title: P("6 · 缩放改变面积", "6 · Scaling changes area"),
      lead: P("末尾图只演示缩放。图中 $\\alpha,\\beta$ 对应式中的 $a,b$；令 $u=ax,v=by$，面积元除以 $|ab|$。", "The final chart shows scaling only. Its $\\alpha,\\beta$ correspond to $a,b$; set $u=ax,v=by$ and divide the area element by $|ab|$."),
      tex: String.raw`\begin{aligned}u&=ax,\quad v=by,\quad dx\,dy=\frac{du\,dv}{|ab|}\\\iint\delta(ax,by)\varphi(x,y)\,dx\,dy&=\frac1{|ab|}\iint\delta(u,v)\varphi(u/a,v/b)\,du\,dv\\&=\frac{\varphi(0,0)}{|ab|}\end{aligned}`,
      read: P("$a=2,b=3$ 时权重为 $1/6$；只有恢复单位权重才再乘6。", "With $a=2,b=3$ the weight is $1/6$; multiply by 6 only to restore unit weight.")
    },
  ];
  deltaProductNote.tex = String.raw`\begin{aligned}&h(x,y)\delta(x-x_0,y-y_0)\\&\quad=h(x_0,y_0)\delta(x-x_0,y-y_0)\\&\delta(ax,by)=\frac{1}{|ab|}\delta(x,y)\end{aligned}`;
  deltaProductNote.after = P("相乘改权重，缩放改面积因子；都不是给 δ 指定一个普通峰高。", "Multiplication changes weight; scaling changes the area factor. Neither assigns delta an ordinary peak height.");
  deltaProductStep.example = P("相乘例：$(2,3)$ 处权重变7；缩放例：$\\delta(2x,3y)$ 权重为 $1/6$。", "Product example: weight 7 at $(2,3)$; scaling example: $\\delta(2x,3y)$ has weight $1/6$.");

  // Section-owned chart models, explanations, controls and notes mapping.
  window.FourierSectionRuntime["1.2.1"] = {
    models: ["delta", "deltaPlane"],
    noteStages: [2, 0, 4, 4],
      controls: {
      n: ["n", P("窄化参数 N", "Narrowing parameter N"), 1, 12, 1],
      x0: ["x0", P("点位置 x₀", "Point position x₀"), -2, 2, .25],
      weight: ["weight", P("第一点权重 c", "First-point weight c"), -1, 3, .5],
      ax: ["ax", P("横向缩放 α", "Horizontal scaling α"), 1, 4, 1],
      by: ["by", P("纵向缩放 β", "Vertical scaling β"), 1, 4, 1],
      jumpFamily: ["family", P("近似族（改变左右分布，不只是改N）", "Family (change left/right allocation, not only N)"), [["left", P("左侧：只覆盖负半轴", "Left: negative side only")], ["rect", P("对称：左右各一半", "Symmetric: half on each side")], ["right", P("右侧：只覆盖正半轴", "Right: positive side only")]]],
      family: ["family", P("脉冲轮廓", "Pulse profile"), [["rect", P("矩形", "Rectangle")], ["gauss", P("高斯", "Gaussian")]]],
    },
    create(tools) {
      const { P, text, h, t, prose, fmt, gauss, integrate, graph, legend, equation, block, math, pulseParameterMarkup } = tools;
      const test = x => 1 / (1 + x * x);
      function deltaBounds(s) {
        if (s.family === "left") return [s.x0 - 1 / s.n, s.x0];
        if (s.family === "right") return [s.x0, s.x0 + 1 / s.n];
        const half = (s.family === "gauss" ? 6 : .5) / s.n;
        return [s.x0 - half, s.x0 + half];
      }
      function deltaValue(s) {
        const f = s.discontinuous ? x => x > 0 ? 1 : x < 0 ? 0 : .5 : test;
        const [left, right] = deltaBounds(s);
        return s.family === "gauss"
          ? integrate(x => s.weight * s.n * gauss(s.n * (x - s.x0)) * f(x), left, right)
          : s.weight * s.n * integrate(f, left, right);
      }
      function jumpComparison(s) {
        return `<div class="il-comparison"><p><strong>${t("必须比较的三个条件（同一N、同一面积）", "Three required comparisons (same N and area)")}</strong></p><table><thead><tr><th>${t("近似族", "Family")}</th><th>${t("非零区间", "Support interval")}</th><th>${t("乘阶跃后积分", "Integral against step")}</th></tr></thead><tbody>${[
          ["left", P("左侧", "Left"), `[${fmt(-1 / s.n)}, 0]`, "0"],
          ["rect", P("对称", "Symmetric"), `[${fmt(-.5 / s.n)}, ${fmt(.5 / s.n)}]`, fmt(s.weight / 2)],
          ["right", P("右侧", "Right"), `[0, ${fmt(1 / s.n)}]`, fmt(s.weight)],
        ].map(([family, label, interval, value]) => `<tr ${s.family === family ? 'aria-current="true"' : ""}><th>${h(text(label))}</th><td>${interval}</td><td>${value}</td></tr>`).join("")}</tbody></table><p>${t("先取单位权重：左侧脉冲只乘到阶跃的零值；对称脉冲只有正半边贡献；右侧脉冲全部乘到一。分别计算：", "Take unit weight: the left pulse sees only zero, the symmetric pulse contributes only on its positive half, and the right pulse sees one throughout. Compute:")}</p>${equation(String.raw`\begin{aligned}\text{left: }&N\times\frac1N\times0=0,\\\text{symmetric: }&N\times\frac1{2N}\times1=\frac12,\\\text{right: }&N\times\frac1N\times1=1.\end{aligned}`)}<p>${t("改变N只改变宽度和高度，不改变落在阶跃右侧的面积比例；更换近似族才改变这个比例。单点的函数值约定不改变积分。", "Changing N changes width and height, not the fraction of area to the right of the jump; changing families changes that fraction. Assigning a value at a single point cannot change the integral.")}</p>${equation(String.raw`\int p_N(\xi)f(\xi)\,d\xi=\int_0^\infty p_N(\xi)\,d\xi`)}<p>${prose(P("为什么三者都能近似 $\\delta$？对在零处连续的函数 $\\varphi$，收缩区间里的函数值都趋近 $\\varphi(0)$，所以单位面积平均也趋近该值。阶跃在零处不连续，这段理由失效：当前对称例的一半不是通用取样目标。", "Why do all three approximate $\\delta$? For a function $\\varphi$ continuous at zero, values throughout each shrinking interval approach $\\varphi(0)$, as does their unit-area average. The step is discontinuous there, so this argument fails: the symmetric one-half is not a universal target."))}</p></div>`;
      }
      function deltaExplanation(s) {
        const [left, right] = deltaBounds(s);
        const paragraph = (zh, en) => `<p>${prose(P(zh, en))}</p>`;
        const f = s.discontinuous
          ? String.raw`f(\xi)=\begin{cases}0,&\xi<0,\\\frac12,&\xi=0,\\1,&\xi>0.\end{cases}`
          : String.raw`f(\xi)=\frac{1}{1+\xi^2}`;
        const pulse = s.family === "gauss"
          ? String.raw`p_N(\xi)=cN e^{-\pi N^2(\xi-x_0)^2}`
          : String.raw`p_N(\xi)=\begin{cases}cN,&${fmt(left)}\le\xi\le${fmt(right)},\\0,&\text{otherwise}.\end{cases}`;
        const integral = s.family === "gauss"
          ? String.raw`\begin{aligned}I_N&=\int_{-\infty}^{\infty}p_N(\xi)f(\xi)\,d\xi\\&\approx\int_{x_0-6/N}^{x_0+6/N}\!cN e^{-\pi N^2(\xi-x_0)^2}f(\xi)\,d\xi\end{aligned}`
          : String.raw`\begin{aligned}I_N&=\int_{-\infty}^{\infty}p_N(\xi)f(\xi)\,d\xi\\&=cN\int_{${fmt(left)}}^{${fmt(right)}}f(\xi)\,d\xi\end{aligned}`;
        let result = `<section class="il-explanation"><h3>${t("先认清图与记号", "Identify the plot and notation")}</h3>`
          + paragraph(`当前演示给定 $N=${s.n}$。$N$ 是收缩参数，越大脉冲越窄；不是积分分格数，也不是需要从积分结果反求的未知量。理想 $\\delta$ 的取样积分不依赖这个有限宽演示参数。`, `The current demonstration uses $N=${s.n}$. $N$ controls concentration: larger values give narrower pulses. It is not the integration cell count or an unknown to infer from the result. Ideal $\\delta$ sampling does not depend on this finite-width demonstration parameter.`)
          + paragraph("$p_N$ 读作‘p下标N’，是参数为 $N$ 的有限宽脉冲函数。$p$ 只是函数名，下标用来区分宽度，不是乘法或幂。$p_N(\\xi)$ 表示它在输入位置 $\\xi$ 处的值。它是近似理想脉冲的普通函数，不是理想脉冲本身。", "$p_N$, read p subscript N, names the finite-width pulse for parameter $N$. The letter $p$ is only a function name; the subscript labels its width, not multiplication or a power. $p_N(\\xi)$ is its value at input position $\\xi$. It approximates an ideal impulse but is not that impulse itself.")
          + paragraph("$\\delta$ 读作德尔塔，表示理想狄拉克脉冲，不是有限高度的曲线。$\\xi$ 读作克西，是横轴上的积分坐标；$x_0$ 是极限取样位置，$c$ 是带符号的积分权重，$N$ 控制脉冲收缩。", "$\\delta$ (delta) denotes the ideal Dirac impulse, not a finite-height curve. $\\xi$ (xi) is the horizontal integration coordinate; $x_0$ is the limiting sample site, $c$ is signed integral weight, and $N$ controls concentration.")
          + paragraph("蓝线是被取样函数 $f$。橙线显示有限脉冲的真实高度除以 $N$，以免峰过高；它不是两条线相乘的结果。虚竖线标极限位置；左、右侧脉冲不以该位置为中心。", "Blue is the sampled function $f$. Orange displays true finite-pulse height divided by $N$ to keep the peak visible; it is not the product of the curves. Vertical dashes mark the limiting site; left/right pulses are not centered there.")
          + equation(f) + equation(pulse)
          + equation(String.raw`\text{orange: }\frac{p_N(\xi)}{N},\qquad\text{true peak: }cN=${s.weight}\times${s.n}=${fmt(s.weight*s.n)}`)
          + `<h3>${t("分清两个积分", "Distinguish the two integrals")}</h3>`
          + paragraph("脉冲自身的积分是权重 $c$；当权重为一时，称为单位面积。加权积分 $I_N$ 则先把蓝线值与真实脉冲值逐点相乘，再沿横坐标累加，一般不等于脉冲面积。", "The pulse alone integrates to weight $c$; weight one is called unit area. The weighted integral $I_N$ first multiplies the blue function by the true pulse point by point, then accumulates over the horizontal coordinate. It generally differs from the pulse area.")
          + equation(String.raw`\int_{-\infty}^{\infty}p_N(\xi)\,d\xi=c=${s.weight}`)
          + equation(integral)
          + paragraph(`当前计算区间为 [${fmt(left)}, ${fmt(right)}]。` + (s.family === "gauss" ? "高斯在全实轴都不严格为零；$\\frac1N$ 是特征尺度，不是有限支撑宽度。程序只在中心两侧各六倍特征尺度处截断。" : "矩形在这段之外为零，故那里乘积没有贡献；蓝线仍定义在整个实轴。这里没有把橙线宽度重新定义成蓝线的定义域。") + "值域是输出值的集合，不是这里的积分区域。", `The current calculation interval is [${fmt(left)}, ${fmt(right)}]. ` + (s.family === "gauss" ? "A Gaussian is nonzero on the whole line; $\\frac1N$ is a characteristic scale, not compact support width. The program truncates at six such scales on either side of the center. " : "Outside this interval the rectangle is zero, so the product contributes nothing; blue remains defined on the whole line. This does not redefine the domain of blue. ") + "The range is a set of output values, not this integration region.")
          + `<h3>${t("怎样算出当前读数", "Calculate the current reading")}</h3>`
          + paragraph("程序把区间分成500等格，取每格中点的‘脉冲值 × 蓝线值 × 格宽’，再相加。显示保留四位小数，内部计算不先舍入。", "The program divides the interval into 500 equal cells, evaluates pulse value × blue value × cell width at each midpoint, then sums. Display uses four decimals without first rounding internal values.");
        if (!s.discontinuous && s.family !== "gauss") {
          result += paragraph("矩形例还可用反正切作为原函数独立验算；反正切的导数正好是这条蓝线。代入上下限，得到：", "For the rectangle, inverse tangent is an independent antiderivative check: its derivative is exactly the blue function. Substituting both limits gives:")
            + equation(String.raw`\begin{aligned}I_N&=cN\left[\arctan\xi\right]_{${fmt(left)}}^{${fmt(right)}}\\&=${s.weight}\times${s.n}\,[\arctan(${fmt(right)})-\arctan(${fmt(left)})]\\&\approx${fmt(deltaValue(s))}.\end{aligned}`);
        }
        if (s.discontinuous) result += jumpComparison(s);
        else result += `<h3>${t("取样极限参考值从哪里来", "Derive the sampling reference")}</h3>`
          + paragraph("蓝线在取样位置连续时，脉冲不断收窄后的加权积分趋于该点函数值乘权重。这是理想脉冲的取样规则，不是由画出的橙线面积算出，也不要求有限宽脉冲恰好达到。", "When blue is continuous at the sampling site, its integral against the narrowing pulse approaches the local function value times weight. This ideal-impulse sampling rule is not the displayed orange area and is not an exact finite-width requirement.")
          + equation(String.raw`\begin{aligned}c f(x_0)&=\frac{${s.weight}}{1+(${fmt(s.x0)})^2}\\&=${fmt(s.weight*test(s.x0))},\\I_N&\longrightarrow c f(x_0)\quad(N\to\infty).\end{aligned}`);
        return result + "</section>";
      }
      function drawScene(model, s) {
        if (model === "delta") {
          const f = s.discontinuous ? x => x > 0 ? 1 : x < 0 ? 0 : .5 : test;
          const [left, right] = deltaBounds(s);
          const pulse = x => s.weight * (s.family === "gauss" ? gauss(s.n * (x - s.x0)) : x >= left && x <= right ? 1 : 0);
          const pulseCurve = { fn: pulse, points: s.family === "gauss" ? undefined : [[-3, 0], [left, 0], [left, s.weight], [right, s.weight], [right, 0], [3, 0]] };
          const testCurve = { fn: f, points: s.discontinuous ? [[-3, 0], [0, 0], [0, 1], [3, 1]] : undefined };
          return { weightedIntegral: deltaValue(s), graphic: legend("蓝：被取样函数；橙：有限宽脉冲，真实高度除以N显示（不是δ）；虚竖线：极限取样位置x₀。点击“查看说明”了解记号和计算。", "Blue: sampled function; orange: finite-width pulse with true height divided by N for display (not delta); vertical dashed line: limiting sample site x₀. Use View explanation for notation and calculations.") + graph([testCurve, pulseCurve], { xmin: -3, xmax: 3, ymin: -1.2, ymax: 3.2, marker: s.x0, axis: "ξ" }), readout: `${t(s.family === "gauss" ? "高斯特征尺度" : "矩形宽", s.family === "gauss" ? "Gaussian scale" : "Rectangle width")} 1/N=${fmt(1 / s.n)} · ${t("脉冲自身积分", "Pulse integral")} c=${s.weight} · ${t("真实峰高", "true peak")}=${fmt(s.weight * s.n)} · ${t("有限脉冲加权积分", "Finite-pulse weighted integral")} ${math(String.raw`I_N\approx${fmt(deltaValue(s))}`)} · ${s.discontinuous ? t("跳变点：不设通用目标值；查看说明中的三族对照", "Jump: no universal target; compare three families in the guide") : `${t("取样极限参考值", "Ideal sampling reference")}=${fmt(s.weight * f(s.x0))}`}`, explanation: deltaExplanation(s) };
        }
        if (model === "deltaPlane") {
          return { graphic: `<svg class="il-graph" viewBox="0 0 550 300" role="img" aria-label="${t("虚线原轮廓，实线横纵分别压缩的轮廓", "Dashed original contour and solid horizontally/vertically compressed contour")}"><path d="M60 150H490M275 25V275" stroke="#a59b8f"/><ellipse cx="275" cy="150" rx="130" ry="110" fill="none" stroke="#a59b8f" stroke-dasharray="6 4"/><ellipse cx="275" cy="150" rx="${130 / s.ax}" ry="${110 / s.by}" fill="#bed7d9" stroke="#245b66" stroke-width="3"/><text x="285" y="32">y</text><text x="492" y="165">x</text><text x="25" y="290">α=${s.ax}, β=${s.by}</text></svg>`, readout: `${t("相对积分权重：", "Relative integral weight: ")}${math(String.raw`\frac{1}{|\alpha\beta|}\approx${fmt(1 / Math.abs(s.ax * s.by))}`)}` };
        }
      }
      function explanation(model, s) {
        if (model === "deltaPlane") return block(
          ["$\\delta(x,y)$是理想点脉冲；虚椭圆表示缩放前有限近似的等值轮廓，蓝椭圆是$\\delta(\\alpha x,\\beta y)$的近似轮廓，不是光斑照片或δ的高度图。α、β分别压缩横向、纵向坐标。", "$\\delta(x,y)$ is an ideal point impulse. The dashed ellipse is an original finite-approximation contour; blue is a contour for $\\delta(\\alpha x,\\beta y)$, not a photograph or a height plot of delta. α,β compress the two coordinates."],
          String.raw`u=\alpha x,\ v=\beta y,\quad dx\,dy=\frac{du\,dv}{|\alpha\beta|},\quad\iint\delta(\alpha x,\beta y)dx\,dy=\frac{1}{|\alpha\beta|}`,
          [`横向宽变为$\\frac{1}{${s.ax}}$，纵向宽变为$\\frac{1}{${s.by}}$，积分权重因此为$\\frac{1}{|${s.ax}\\times${s.by}|}$=${fmt(1 / Math.abs(s.ax * s.by))}。α、β非零；若想保持单位权重，还须把整个函数乘|αβ|。`, `Widths scale by $\\frac{1}{${s.ax}}$ horizontally and $\\frac{1}{${s.by}}$ vertically, so integral weight is $\\frac{1}{|${s.ax}\\times${s.by}|}$=${fmt(1 / Math.abs(s.ax * s.by))}. α,β must be nonzero. Multiply the whole distribution by |αβ| to retain unit weight.`]);
        return "";
      }
        const parameters = (model, s, adjustable) => model === "delta" ? pulseParameterMarkup(s.n, s.family === "gauss", adjustable) : "";
      return { drawScene, explanation, parameters, calculate: { deltaValue } };
    },
  };
})();

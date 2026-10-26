/* Section 1.3.2: bilingual lesson, guided path, experiment and reference data. */
(() => {
  const { pair, formula, question, symbol, p, stage, step, sym, block, q, origin, P, S, commonSymbols, corrSymbols } = window.FourierSectionBuilders;
  const properties = [
    stage(["换序", "Swap inputs"], ["先观察同一对有限窗，想象交换 f 与 h 的角色；x 不变。", "For the same two finite windows, exchange the roles of f and h without changing x."], { ...origin, a: 1.5, x0: 0.5 }, [["积分值不变", "Integral stays the same"], ["符号必变号", "Its sign must reverse"], ["只有中心相等", "Equal only at zero"]], 0, [["对。换元 u=x−τ 可使两个因子互换。", "Yes. Substitution u=x−τ interchanges the two factors."], ["卷积积分是乘积的积分，不因交换顺序变号。", "Interchanging factors does not change its sign."], ["换元对每个 x 都有效，不只中心。", "The substitution works at every x."]]),
    stage(["加上另一输入", "Add another input"], ["把 f 分成两束 f₁+f₂，先各自同 h 卷积，再比较求和。", "Split f into f₁+f₂; convolve each with h, then compare their sum."], { ...origin, x0: -0.5 }, [["输出逐项相加", "Outputs add term by term"], ["输出应相乘", "Outputs must multiply"], ["只有等宽窗可分配", "Only equal-width windows distribute"]], 0, [["对。积分对被积函数的加法是线性的。", "Yes. Integration is linear in the input."], ["这里用的是线性积分，不是输出相乘。", "The integral is linear, not a multiplication of outputs."], ["只要积分存在，分配律不要求矩窗等宽。", "No equal-width requirement; integrals must exist."]]),
    stage(["三次叠加", "Three factors"], ["加入第三个响应 k；比较先算 f*h 还是先算 h*k。", "Add a third response k. Compare computing f*h first or h*k first."], { ...origin, a: 2 }, [["合适的可积条件下结果相同", "Same result under suitable integrability"], ["只有 h 是 δ 才相同", "Same only if h is delta"], ["积分次序可任意改变而不需条件", "Reordering needs no conditions"]], 0, [["对。可绝对积分等条件允许交换积分顺序，再整理变量。", "Yes. Conditions such as absolute integrability permit swapping integral order."], ["δ 是特例，不是结合律前提。", "Delta is a special case, not the requirement."], ["换积分次序需要可积条件，不能省略。", "Changing integral order needs an integrability condition."]]),
    stage(["看输出含义", "Interpret the output"], ["两扇有限矩窗卷积的输出是否仍然只占原来的宽度？", "Does the output of two finite rectangles occupy only the original width?"], { ...origin, a: 2, x0: 1 }, [["支撑宽度通常相加", "Support widths generally add"], ["输出支撑一定更窄", "Support must shrink"], ["平移不能改变重叠", "Shift cannot affect overlap"]], 0, [["对。两个支撑相加形成更宽的非零位移范围。", "Yes. The supports add to a broader range of nonzero shifts."], ["卷积的支撑可扩展；不等同尖锐化。", "Convolution can broaden support rather than sharpen it."], ["平移改变交集，正是本节图板的观察量。", "Shift changes overlap, the observable in this chart."]]),
    stage(["换模型检验", "Transfer to a new model"], ["将 h 换成宽 2 的非负窗、f 宽 1；在中心先预测 f*h 与 h*f 谁大。", "Use a nonnegative width-2 h and width-1 f. Predict which order is larger at center before seeing the readout."], { ...origin, a: 2 }, [["相等", "Equal"], ["f*h 更大", "f*h larger"], ["h*f 更大", "h*f larger"]], 0, [["对。换序不改变卷积，输入宽度不同也一样。", "Yes. Commutativity holds even for different input widths."], ["先算的因子不会让交叠面积增大。", "The order of factors does not enlarge the overlap."], ["宽窗放在前面也不改变积分结果。", "A wider first factor does not alter the integral."]])
  ];
  const item = {
      id: "1.3.2", title: ["卷积运算定律", "Convolution laws"], pages: "14", pdf: "16", firstPage: 16,
      lead: ["已知道卷积怎么算；交换两输入、拆成两束或串联多个响应，输出会怎样？", "Now that convolution has a definition, what changes when you swap inputs, split them or chain responses?"],
      bridge: [["先前通过重叠面积求出了单次卷积。", "Previously we computed one convolution from overlap area."], ["现在把积分的换元、线性与交换积分次序变成可检验的规则。", "Now test substitutions, linearity and permissible integration-order changes."], ["随后用理想 δ 检验这些规则的物理解释。", "Then test the rules with ideal impulses."]],
      question: ["三个滤波步骤能随意换顺序和分组吗？", "Can three filtering stages always be reordered and regrouped?"], setup: ["本节先对积分存在且可适当交换次序的函数使用卷积定律；图中有限矩窗满足条件。", "Use the laws for functions with existing integrals and justifiable interchange; the plotted finite rectangles satisfy them."], terms: [["交换律：换两个卷积因子的顺序，不改变输出。", "Commutativity: swapping two convolution factors leaves the output unchanged."], ["分配律来自积分对加法的线性；结合律换积分次序前需要可积条件。", "Distributivity follows from linear integration; associativity needs integrability to exchange integral order."]],
      observe: ["用宽度不同的两矩窗试 x=0.5，先预测交换角色后读数是否变化。", "Use two rectangles of unequal widths at x=0.5; predict whether swapping their roles changes the value."], stages: properties,
      recap: [["交换律由 u=x−τ 换元得出；图中宽窗和窄窗交换不改变输出。", "Commutativity follows from u=x−τ; swapping wide and narrow windows leaves the output unchanged."], ["分配律允许把和拆开分别卷积，再把结果相加。", "Distributivity splits a sum into separate convolutions and adds the results."], ["结合律需要对积分存在与交换次序的条件作出说明。", "Associativity requires conditions permitting interchange of the integrals."]],
      blocks: [
        block(["交换两个输入", "Swap inputs"], ["从上一节的积分开始，令 u=x−τ，积分变量从 τ 换到 u；改变上下限后被积因子顺序互换。", "From the previous integral set u=x−τ and reverse the infinite bounds; the two factors exchange places."], String.raw`f*h=h*f`, ["是输出函数相同，不是只在零位移的值相同。", "The whole outputs match, not only values at zero lag."], ["即使两窗宽度不同，也可交换输入。", "Inputs may be swapped even when their widths differ."], ["若 f 窄、h 宽，中心交叠由窄窗限制，反过来亦然。", "A narrow and a wide rectangle overlap in the same way after swapping."], ["再讨论输入信号能否按加法拆开。", "Next ask whether an input can be split additively."], ["假设积分收敛；换元 u=x−τ，dτ=−du，无限上下限互换。", "Assume convergence; with u=x−τ, dτ=−du and infinite limits reverse."], String.raw`\int f(\tau)h(x-\tau)\,d\tau=\int h(u)f(x-u)\,du`, ["右侧正是 h*f 在 x 的定义。", "The right-hand side is the definition of h*f at x."]),
        block(["把输入拆成两路", "Split into two inputs"], ["若输入为 u+v，每个位置贡献 (u(τ)+v(τ))h(x−τ)，积分可在收敛条件下拆成两项。", "For input u+v each location contributes (u(τ)+v(τ))h(x−τ); under convergence split the integral."], String.raw`(u+v)*h=u*h+v*h`, ["先分别卷积，再相加；不能将输出两项相乘。", "Convolve separately then add; do not multiply the two outputs."], ["重叠窗若有两条输入，任意 x 上的两个乘积面积相加。", "Two input components contribute two product areas at any given x."], ["若 u、v 两束各贡献 0.3 和 0.2，叠加值为 0.5。", "If the two paths contribute 0.3 and 0.2, their sum is 0.5."], ["多个响应串联则涉及分组，而不再是加法。", "Cascading several responses leads to grouping rather than addition."], ["把被积函数展开，分别对两项积分。", "Expand the integrand and integrate the two terms separately."], String.raw`\int [u(\tau)+v(\tau)]h(x-\tau)\,d\tau=\int uh\,d\tau+\int vh\,d\tau`, ["简写中的 h 仍表示 h(x−τ)，积分逐点关于 x 成立。", "In the shorthand h still means h(x−τ); the equality holds for each x."]),
        block(["把多次作用重新分组", "Regroup cascading responses"], ["三个函数先分别配对卷积；可积条件保证可以交换两重积分的顺序及变量。", "Convolve three functions in pairs; integrability lets us interchange and regroup the double integral."], String.raw`(u*v)*h=u*(v*h)`, ["结合律不等于说任何发散积分也可以任意换次序。", "Associativity is not permission to reorder arbitrary divergent integrals."], ["两个有限矩窗再卷第三个有限窗：两种分组都得到同一输出；下一节用理想脉冲检验移位特例。", "Three finite rectangles give the same output under either grouping; next test the impulse shift case."], ["下一节用 δ 输入检验结合律的移位特例。", "Next use a delta input to test a shifted special case."], ["从 ((u*v)*h)(x) 写出内外两次积分，设 z=τ−s。", "Expand ((u*v)*h)(x) into two integrals and set z=τ−s."], ["现在换元并在可积条件下交换两层积分。", "Now substitute and exchange the two integrals under integrability."], String.raw`\iint u(s)v(\tau-s)h(x-\tau)\,ds\,d\tau=\int u(s)\left[\int v(z)h(x-s-z)\,dz\right]ds`, ["内层为 (v*h)(x−s)，外层为 u*(v*h)。", "The inner integral is (v*h)(x−s), so the outer is u*(v*h)."]),
        block(["这三条何时可用", "When these laws apply"], ["前面的推导在有限窗上没有积分发散；应用于一般函数时需先检查卷积存在且换元/交换积分有依据。", "The finite-window examples converge; for general functions check existence and justified substitution/interchange."], String.raw`\|f*h\|_1\le\|f\|_1\|h\|_1`, ["这里 ||f||₁=∫|f|，若 f、h 绝对可积则提供足够条件；不声称这是唯一条件。", "Here ||f||₁=∫|f|; absolute integrability is a sufficient, not necessary, condition."], ["所用有限窗都绝对可积；周期正弦延伸到全域则不适用这个判据。", "Finite windows are absolutely integrable; an infinite periodic sine does not meet this criterion."], ["宽 1、高 1 的窗 ||f||₁=1；宽 2、高 1 的窗 ||h||₁=2。", "A width-1 unit window has ||f||₁=1; a width-2 unit window has ||h||₁=2."], ["下一节引入 δ 时需改用其对测试函数的积分作用。", "For delta next section, use its integral action instead."], ["先定义 L¹ 范数，再利用 ∫|∫f(τ)h(x−τ)dτ|dx≤∫∫|f(τ)h(x−τ)|dτdx。", "Define the L¹ norm, then bound the integral of the absolute convolution by the double integral of |f(τ)h(x−τ)|."], String.raw`\int\!\int |f(\tau)|\,|h(x-\tau)|\,d\tau\,dx=\left(\int|f|\right)\left(\int|h|\right)`, ["这给出有限的上界，也允许在绝对可积场景交换积分次序。", "This finite bound also justifies integration-order interchange in the absolutely integrable case."])
      ],
      questions: [q("1.3.2:q1", ["对于可积函数，哪条表示卷积的交换律？", "Which equation is convolution's commutative law?"], [["f*h=h*f", "f*h=h*f"], ["f*h=−h*f", "f*h=−h*f"], ["f*h=f+h", "f*h=f+h"]], 0, [["对，由 u=x−τ 换元。", "Yes, substitute u=x−τ."], ["换元不会产生整体负号。", "No global minus sign survives the change of limits."], ["卷积不是两函数直接相加。", "Convolution is not addition."]]), q("1.3.2:q2", ["把输入 u+v 与 h 卷积应如何展开？", "How should (u+v)*h expand?"], [["u*h+v*h", "u*h+v*h"], ["(u*h)(v*h)", "(u*h)(v*h)"], ["u+v+h", "u+v+h"]], 0, [["对，积分关于加法线性。", "Yes, integration is linear."], ["两路输出应相加而不是相乘。", "The outputs add, not multiply."], ["每一路仍需与 h 卷积。", "Each path still needs convolution with h."]]), q("1.3.2:q3", ["结合律变换积分次序时需要什么？", "What is needed to exchange integration order for associativity?"], [["合适的可积条件", "Suitable integrability"], ["两个函数图像完全相同", "Identical input graphs"], ["只要用字母 u,v,h 就一定成立", "It always holds merely by using symbols"]], 0, [["对，绝对可积是常见充分条件。", "Yes; absolute integrability is a useful sufficient condition."], ["不要求相同。", "The inputs need not match."], ["积分重排不能脱离收敛前提。", "Integral reordering depends on convergence."]])]
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
  window.FourierIndependentLabData["1.3.2"] = [
    S(["先实际换序", "Actually swap the order"],
      ["先用有限格子看运算：f=[1,2]，h=[1,1]。点击换序，比较输出每个编号的读数；一格宽取1。", "Use finite cells first: f=[1,2], h=[1,1], cell width 1. Swap the inputs and compare every output index."],
      "laws", { law: "commute", swap: false, gain: 1 }, ["swap"],
      [["两种次序都是[1,3,2]", "Both orders give [1,3,2]"], ["换序会反号", "Swapping negates the result"], ["只有中心相等", "Only the central value agrees"]], 0,
      [["对。有限和里每对乘积只是重新编号。", "Yes. The finite sum reindexes the same products."], ["普通乘法交换不会引入负号。", "Swapping ordinary factors adds no minus sign."], ["逐项比较可见所有编号都一致。", "Every output index agrees."]],
      ["离散例子用于看清运算，不代替连续积分证明；讲义用 u=x−τ 完成换元。", "This discrete example illustrates the operation, not a proof for continuous integrals; the notes use u=x−τ."],
      ["换序不变之后，输入能不能拆成两路？", "After swapping, can we split an input into two paths?"]),
    S(["两路输入先相加", "Add the input paths first"],
      ["令 u=[1,0]，v=[0,2]，h=[1,1]，输入是 u+c v。改变系数 c；比较先相加再卷积和分别卷积再相加。", "Let u=[1,0], v=[0,2], h=[1,1]; input u+c v. Change c and compare adding first with convolving separately."],
      "laws", { law: "distribute", gain: 1 }, ["gain"],
      [["两条路线逐项相等", "The paths agree at every index"], ["应把两路输出相乘", "Multiply the path outputs"], ["c为负就不成立", "Fails for negative c"]], 0,
      [["对。每个输入值都按相同线性乘加处理。", "Yes. The same linear multiply-add rule acts on every value."], ["输入是相加，线性运算得到输出相加。", "Input addition leads to output addition under a linear operation."], ["带符号权重仍服从分配律。", "Signed coefficients still obey distributivity."]],
      ["输出相加可以相消；非负亮度只是特殊应用，不是代数定律的前提。", "Outputs may cancel. Nonnegative brightness is a special application, not a requirement of the algebra."],
      ["从两路相加继续到三次作用的分组。", "Move from adding paths to grouping three operations."], String.raw`(u+c\,v)*h=u*h+c(v*h)`),
    S(["把中间结果展开", "Expose intermediate results"],
      ["再加入 k=[1,0,1]。切换括号，图中同时显示中间数组与最终数组，不能只比较一个峰。", "Add k=[1,0,1]. Switch grouping; inspect both the intermediate and final arrays, not just one peak."],
      "laws", { law: "associate", group: "left", gain: 1 }, ["group"],
      [["中间不同，最后均为[1,3,3,3,2]", "Different intermediates; final [1,3,3,3,2]"], ["中间也必须完全一样", "Intermediate arrays must also match"], ["括号随便移，任何积分都允许", "Any integral permits arbitrary regrouping"]], 0,
      [["对。分组改变先算谁，不改最终乘积的累加。", "Yes. Grouping changes what is computed first, not the final accumulated products."], ["f*h 和 h*k 的输入不同，中间当然可不同。", "f*h and h*k use different inputs and may differ."], ["有限和可重排，连续积分还需要交换积分次序的条件。", "Finite sums can be reordered; continuous integrals need interchange conditions."]],
      ["连续情形可用绝对可积作为充分条件。这里不把有限数组计算当作一般存在性证明。", "Absolute integrability is a sufficient continuous-case condition. Finite arrays do not prove general existence."],
      ["计算相同不代表所有替换都合法。", "Equal computations do not make every rearrangement legal."], String.raw`(f*h)*k=f*(h*k)`),
    S(["看见相消", "See cancellation"],
      ["沿用两路分配模型，把 c 设为−1。查看中间编号处的正贡献和负贡献。", "Keep the two-path model, set c=−1, and inspect positive and negative contributions at the middle index."],
      "laws", { law: "distribute", gain: -1 }, ["gain"],
      [["中间值为−1，两路仍相等", "Middle value −1; the paths still agree"], ["卷积永远非负", "Convolution is always nonnegative"], ["负系数必须取绝对值", "Take the absolute value of negative coefficients"]], 0,
      [["1−2=−1，两条路线得到同一数。", "1−2=−1 along both paths."], ["只有特定非负输入才保证非负。", "Nonnegativity requires appropriate nonnegative inputs."], ["取绝对值会改掉原来的线性问题。", "Taking absolute values changes the linear problem."]],
      ["相消说明“卷积就是交叠面积”的直观有适用条件。", "Cancellation limits the intuition that convolution is simply overlap area."],
      ["用连续窗回看支撑边界。", "Return to continuous windows and support."]),
    S(["支撑范围不看括号", "Support is not a bracket choice"],
      ["两个居中单位高矩窗，宽分别1和a。改变a和位置x，查看哪些位置有交叠。", "Two centered height-1 rectangles have widths 1 and a. Change a and position x and inspect the overlap range."],
      "lawWindows", { a: 2, lag: 0 }, ["a", "lag"],
      [["a=2 时仅 |x|<1.5 有正交叠", "At a=2, positive overlap only for |x|<1.5"], ["输出全宽等于较窄的1", "Full output width equals the narrower 1"], ["峰高总等于宽度和3", "Peak always equals width sum 3"]], 0,
      [["对。两个半宽相加为1.5。", "Yes. The half-widths sum to 1.5."], ["较窄的窗限制峰值，不限制总支撑宽度。", "The narrower rectangle limits peak overlap, not full support."], ["宽度和是支撑范围，不是乘积积分峰值。", "The width sum describes support, not peak integral."]],
      ["正矩窗的支撑宽度相加；带符号函数可能相消，通常只能给包含关系。", "Positive rectangles have additive support widths; signed functions may cancel, so generally use support inclusion."],
      ["最后检查连续运算的使用条件。", "Check conditions for continuous operations."]),
    S(["把充分条件说完整", "State sufficient conditions"],
      ["比较“有限数组”和“可能发散的连续积分”两种情境。用分配模型切换正、负c，并判断哪个解释成立。", "Compare finite arrays with potentially divergent continuous integrals. Switch c's sign in the distributive model, then choose the valid explanation."],
      "laws", { law: "distribute", gain: 1 }, ["gain"],
      [["有限和演示恒等关系；连续情形另核实存在与可换序", "Finite sums illustrate identities; check existence/interchange for integrals"], ["程序算得出就证明所有积分存在", "A program result proves all integrals exist"], ["三定律只适用于矩窗", "The laws apply only to rectangles"]], 0,
      [["对。数值例和一般证明是不同证据。", "Yes. A numerical example and a general proof are different evidence."], ["离散截断不能证明无限积分收敛。", "A finite truncation cannot prove convergence of an infinite integral."], ["矩窗是例子，不是定律的适用范围。", "Rectangles are examples, not the full domain of the laws."]],
      ["讲义补全二维一般式及换元、分配、交换积分的依据。", "The notes supply the 2D forms and the reasons for substitution, distribution and integral interchange."],
      ["换一组系数，独立做一次分配。", "Apply distributivity at a new coefficient."]),
    S(["隐藏结果的两路系统", "Two paths with hidden results"],
      ["新输入 u+2v，其中u=[1,0]、v=[0,2]、h=[1,1]。预测第1号输出（编号从0开始）。", "New input u+2v, with u=[1,0], v=[0,2], h=[1,1]. Predict output index 1, counting from zero."],
      "laws", { law: "distribute", gain: 2 }, [],
      [["5", "5"], ["3", "3"], ["4", "4"]], 0,
      [["u*h 在此为1，2(v*h)在此为4，合计5。", "u*h gives 1 here; 2(v*h) gives 4: total 5."], ["3漏掉了新系数2。", "3 omits the new coefficient 2."], ["4只保留第二路，漏掉第一路1。", "4 retains only the second path, missing 1."]],
      ["定律的价值是重排计算，不能丢掉任何一路或系数。", "The laws rearrange computation; they do not discard a path or coefficient."],
      ["在图解回顾中比较三条计算路线。", "Compare all three routes in the recap."]),
  ];
  window.FourierIndependentRecaps["1.3.2"] = [
      ["输入与换序", "Inputs and swapping", "laws", { law: "commute" }],
      ["先算两路再相加", "Convolve paths, then add", "laws", { law: "distribute", gain: 1 }],
      ["显示左括号中间结果", "Expose left-group intermediate", "laws", { law: "associate", group: "left" }],
      ["改括号，保留最终结果", "Regroup, retain final result", "laws", { law: "associate", group: "right" }],
    ];
  window.FourierIndependentNotes.setups["1.3.2"] = P("已会按输入×响应再累加求卷积。现在要判断：交换次序、拆分输入或改变括号，哪些计算可保留同一输出？", "You can convolve by multiplying input and response, then accumulating. Which output is preserved when swapping, splitting inputs or regrouping?");
  window.FourierIndependentNotes.preludes["1.3.2:2"] =  { text: P("下面 s、τ 都是被积分的坐标，x是固定输出位置；u、v、h是三个函数名。令z=τ−s时，在固定s的内层有dτ=dz，h的自变量变成x−s−z。", "Below s and τ are integration coordinates, x is fixed, and u,v,h name functions. With z=τ−s at fixed s, dτ=dz and h's argument becomes x−s−z.") };
  window.FourierIndependentNotes.preludes["1.3.2:3"] =  { text: P("先定义 ||f||₁：把函数逐点取绝对值后在全域积分，有限时称绝对可积。三角不等式表示相消只会减小绝对值，不能让总绝对贡献变大。", "First define ||f||₁ as the integral of |f| over the whole domain. A finite value means absolute integrability. The triangle inequality says cancellation cannot exceed the total absolute contributions."), tex: String.raw`\|f\|_1=\int_{-\infty}^{\infty}|f(\xi)|\,d\xi` };
  window.FourierIndependentNotes.supplements["1.3.2"] = { text: P("这三条也是二维函数的恒等关系。将一维输入位置换成(ξ,η)、输出位置换成(x,y)，dτ换成dξdη；在二维全域满足对应可积、可换序条件时，同样得到交换、分配、结合。不是把二维系统直接删掉一个方向。", "These are also identities of 2D functions. Replace input position by (ξ,η), output by (x,y), and dτ by dξdη. With the corresponding 2D integrability/interchange conditions, commutativity, distributivity and associativity follow, without deleting a physical direction."), tex: String.raw`(f*h)(x,y)=\iint f(\xi,\eta)h(x-\xi,y-\eta)\,d\xi\,d\eta` };
  window.FourierSectionSymbolOverrides["1.3.2"] = [
      ["x,\\tau", "连续输出位置与输入积分坐标", "Continuous output position and input integration coordinate", "长度；数组例编号无量纲", "Length; array indices dimensionless"],
      ["u,v,h,k", "函数或有限数组的名称", "Names of functions or finite arrays", "随模型确定", "Model-dependent"],
      ["c", "第二路输入的系数", "Second-path input coefficient", "无量纲", "Dimensionless", "gain"],
      ["*", "卷积；不是相关或共轭", "Convolution, not correlation or conjugation", "运算符", "Operator"],
      ["\\|f\\|_1", "全域绝对值积分", "Integral of absolute value over the domain", "[f]乘坐标单位", "[f] times coordinate unit"],
    ];
  const line = (zh, en, tex, resultZh, resultEn) => ({ lead: p(zh, en), tex, read: p(resultZh, resultEn) });
  const auditEntries = [
      ["(1-31)", line("目标：为什么交换输入不变。固定 x，在卷积定义中换元 u=x−τ。", "Goal: show swapping inputs changes nothing. Hold x fixed and set u=x−τ in the convolution.", String.raw`u=x-\tau,\quad d\tau=-du,\quad\tau:-\infty\to\infty\Rightarrow u:\infty\to-\infty`, "负号与积分限翻转抵消，得到 h(u)f(x−u) 的积分。", "The minus sign cancels the reversed limits, leaving the integral of h(u)f(x−u).")],
      ["(1-32)", line("目标：为什么两路输入的响应能相加。先写出 (u+v)*h 的积分。", "Goal: show why two input responses add. Expand the defining integral for (u+v)*h.", String.raw`\int[u(\tau)+v(\tau)]h(x-\tau)d\tau=\int u(\tau)h(x-\tau)d\tau+\int v(\tau)h(x-\tau)d\tau`, "逐项积分要求它们存在；此处 u、v 是函数名，不是积分变量替换。", "The separate integrals must exist; here u,v name functions, not substitution variables.")],
      ["(1-33)", line("目标：说明重新分组需要哪一步。先展开 (u*v)*h 的两层积分。", "Goal: identify the step needed to regroup. Expand the double integral for (u*v)*h.", String.raw`\int\!\int u(s)v(\tau-s)h(x-\tau)\,ds\,d\tau`, "随后令 z=τ−s，并在绝对可积等条件下交换顺序；否则不能直接宣称结合律。", "Then set z=τ−s and interchange integration under absolute-integrability conditions; otherwise regrouping is not justified.")],
      ["本课充分条件，非教材独立定理", line("目标：检验上述换序条件。先对卷积的绝对值应用三角不等式。", "Goal: check a sufficient condition for interchanging integrals. Apply the triangle inequality to the convolution.", String.raw`|(f*h)(x)|\le\int|f(\tau)|\,|h(x-\tau)|d\tau`, "再对 x 积分，换元 u=x−τ，内层积分便与 τ 无关。", "Integrate over x, then set u=x−τ; the inner integral no longer depends on τ.")]
  ];
  if (auditEntries.length !== window.FourierGuides["1.3.2"].steps.length) throw new Error("Incomplete textbook audit: 1.3.2");
  auditEntries.forEach(([source, intermediate], i) => {
    window.FourierLessons.find(lesson => lesson.id === "1.3.2").notes[i].source = source;
    window.FourierGuides["1.3.2"].steps[i].proof.unshift(intermediate);
  });
  window.FourierIndependentLabData["1.3.2"][5].evidence = {
    text: P("先看真正不同的对照：有限数组只有有限项，逐项重排没有无穷收敛问题；若把连续输入都取f=h=1，在[−L,L]上的卷积积分为2L，L增大便无界，因而不存在有限的全域卷积值。下面的正负c只检验有限数组分配律，不是在演示发散。", "Compare genuinely different cases: finite arrays have finitely many terms, so reordering has no infinite-convergence issue. Continuous f=h=1 gives convolution integral 2L on [−L,L], unbounded as L grows, so no finite full-line convolution exists. The c control below tests finite-array distributivity, not divergence."),
    tex: String.raw`f=h=1:\quad \int_{-L}^{L}1\cdot1\,d\tau=2L\xrightarrow{L\to\infty}\infty`,
  };
  window.FourierIndependentLabData["1.3.2"][5].insight = P("一般定律要另查条件：L¹表示全域绝对值积分有限；f、h、k都在L¹是常用充分条件，允许在相应积分意义下重排。它不是唯一可能条件，也不是从有限数组图中证明出来的。", "Check the general conditions separately. L¹ means finite full-domain absolute integral. f,h,k in L¹ is a standard sufficient condition for the integral identities and rearrangements, not the only condition and not something proved by the finite-array picture.");
  window.FourierLessons.find(lesson => lesson.id === "1.3.2").symbols = window.FourierSectionSymbolOverrides["1.3.2"].map(([tex, zh, en, unitZh, unitEn, control]) => ({
    tex, meaning: P(zh, en), unit: P(unitZh, unitEn),
    condition: P("按当前实验步骤；未显示读数表示本步未指定", "Current experiment step; no reading means unspecified in this step"), control,
  }));
})();

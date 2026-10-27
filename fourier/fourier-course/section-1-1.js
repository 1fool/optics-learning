/* Section 1.1: bilingual lesson, guided path, experiment and reference data. */
(() => {
  const { pair, formula, question, symbol, p, stage, step, sym, block, q, origin, P, S, commonSymbols, corrSymbols } = window.FourierSectionBuilders;
  window.FourierLessons.push({
    id: "1.1", title: pair("一些常用函数", "Some useful functions"), pages: "4–7", pdf: "6–9", firstPage: 6,
    lead: pair("一个孔径如何用函数描述？先看曲线如何随尺度变化，再把它读作一维缝或二维孔的透过率。", "How can a function describe an aperture? Vary its scale first, then read its graph as a slit or two-dimensional pupil transmission."),
    challenge: pair("宽度参数 a 从 1 增大后，哪种说法对矩形窗和高斯函数都成立？", "When scale a increases from 1, what is true of both the rectangular window and the Gaussian?"),
    choices: [pair("横向范围变宽，峰值仍为 1", "They widen horizontally; their peak remains 1"), pair("峰值随 a 增大", "Their peak grows with a"), pair("每一点都变为 0", "Both vanish everywhere")],
    choiceFeedback: [pair("对。这里改变的是横向尺度，不是峰值；面积一般会改变。", "Yes. The horizontal scale changes, not the peak; the area generally changes."), pair("峰值未乘以 a；高斯和矩形在原点始终为 1。", "Neither peak is multiplied by a; both equal 1 at the origin."), pair("扩大尺度不会抹去中心；比较实线与 a=1 虚线。", "Increasing scale does not erase the center. Compare the solid line with the a=1 dashed line.")],
    transfer: { stem: pair("新情境：圆孔半径 r₀=1.5，点 (1.2,1.0) 在孔内吗？", "New case: with pupil radius r₀=1.5, is (1.2,1.0) inside?"), choices: [pair("在孔内", "Inside"), pair("在孔外", "Outside")], answer: 1, feedback: [pair("要比较半径，不是逐项比较坐标；√(1.2²+1.0²)≈1.562>1.5。", "Compare radial distance, not each coordinate separately: √(1.2²+1.0²)≈1.562>1.5."), pair("对。半径约 1.562，大于孔径半径 1.5，因此透过率为 0。", "Yes. Radius ≈1.562 exceeds 1.5, so transmission is 0.")] },
    labHint: pair("选函数、拖动 a，比较实线和 a=1 的虚线；在 x=0 与边界附近观察。", "Choose a function and change a. Compare the solid graph with the dashed a=1 reference at x=0 and near the edges."),
    symbols: [
      symbol("x", ["横向坐标", "Horizontal coordinate"], ["长度", "length"], ["演示坐标无量纲", "Dimensionless in this demo"]),
      symbol("a", ["函数的横向尺度；矩形窗的全宽", "Horizontal scale; full width of rect"], ["与 x 相同", "same as x"], ["a>0", "a>0"], "a"),
      symbol("u=x/a", ["sinc 的无量纲自变量", "Dimensionless sinc argument"], ["无量纲", "dimensionless"], ["—", "—"]),
      symbol("r", ["点到圆心的距离 √(x²+y²)", "Distance √(x²+y²) from the center"], ["与 x 相同", "same as x"], ["—", "—"]),
      symbol("r_0", ["圆孔半径", "Circular pupil radius"], ["与 x 相同", "same as x"], ["r₀>0；图中选 circ 时取 a", "r₀>0; diagram uses a for circ"])
    ],
    recap: [pair("step 与 sgn 表示开关与正负号；在 x=0，教材约定 step(0)=1/2、sgn(0)=0。", "step and sgn model switching and sign; the book takes step(0)=1/2 and sgn(0)=0."), pair("rect 和 circ 分别选取一维区间与二维圆域；边界等号按本书定义。", "rect and circ select a one-dimensional interval and a two-dimensional disk; boundary equality follows this book."), pair("tri、sinc、Gaus 都有中心峰 1，但形状、零点与衰减不同。", "tri, sinc and Gaus all peak at 1, but have different shapes, zeros and decay.")],
    notes: [
      formula(["阶跃与符号", "Step and sign"], ["用门函数保留右半轴；此处单点取值按教材约定，并不影响通常积分。", "A step passes the right half-axis. The single-point convention follows the book and does not change ordinary integrals."], String.raw`\operatorname{step}(x)=\begin{cases}1&x>0\\\tfrac12&x=0\\0&x<0\end{cases},\quad \operatorname{sgn}(x)=2\operatorname{step}(x)-1`, ["因此负半轴为 −1，零点为 0，正半轴为 1。", "Hence the sign is −1 on the left, 0 at the origin and 1 on the right."]),
      formula(["矩形窗：宽度 a", "Rectangular window: width a"], ["让 x 落在以原点为中心、宽 a 的区间内时取 1；a>0，x 与 a 同单位。", "Set the value to 1 inside an origin-centered interval of width a; a>0 and x has the same unit as a."], String.raw`\operatorname{rect}(x/a)=\begin{cases}1&|x|\le a/2\\0&\text{otherwise}\end{cases}`, ["它可表示理想狭缝的振幅透过率。二维矩形窗可由 x、y 两个一维窗相乘得到。", "It can model an ideal slit amplitude transmission. Multiply independent x and y windows for a rectangular two-dimensional aperture."]),
      formula(["三角形：底宽 2a", "Triangle: base width 2a"], ["从中心 1 线性下降，到 x=±a 为 0；注意 a 是半底宽。", "Decrease linearly from 1 at the center to 0 at x=±a; a is the half-base width."], String.raw`\operatorname{tri}(x/a)=\begin{cases}1-|x|/a&|x|\le a\\0&\text{otherwise}\end{cases}`, ["它在本书中也用于表示某些非相干成像系统的光学传递函数形状。", "The book also uses this shape for optical transfer functions of some incoherent imaging systems."]),
      formula(["归一化 sinc", "Normalized sinc"], ["这里采用 sin(πu)/(πu) 的约定，u=x/a 是无量纲量；原点取连续极限 1。", "Here sinc(u)=sin(πu)/(πu), where u=x/a is dimensionless; use the continuous limit 1 at the origin."], String.raw`\operatorname{sinc}(x/a)=\frac{\sin(\pi x/a)}{\pi x/a},\quad \operatorname{sinc}(0)=1`, ["非零整数倍 x=±a, ±2a… 是零点，不等于“在区间外全为零”。本书用二维 sinc 乘积描述矩孔的夫琅禾费衍射图样。", "Its zeros are x=±a, ±2a, …; it is not zero everywhere outside an interval. The book uses a product of two sinc functions for rectangular-aperture Fraunhofer diffraction."]),
      formula(["高斯曲线", "Gaussian curve"], ["中心为 1；尺度 a 增大时更宽，而不是更高。下式采用教材的 π 归一化。", "It peaks at 1; larger a makes it wider, not taller. This is the book's π-normalized convention."], String.raw`\operatorname{Gaus}(x/a)=\exp[-\pi(x/a)^2],\qquad \int_{-\infty}^{\infty}\operatorname{Gaus}(x/a)\,dx=a`, ["a>0。二维可把 x、y 方向高斯相乘，尺度 a、b>0 时曲面下体积为 ab；这里的面积或体积不能直接叫作光束总功率。", "For a>0, multiply Gaussian factors along x and y; scales a,b>0 give volume ab under the surface. Neither this area nor volume is automatically beam power."]),
      formula(["二维圆域", "Two-dimensional disk"], ["先由坐标算半径 r=√(x²+y²)；再比较 r 与孔径半径 r₀。", "First compute radius r=√(x²+y²), then compare it with pupil radius r₀."], String.raw`\operatorname{circ}(r/r_0)=\begin{cases}1&r\le r_0\\0&r>r_0\end{cases},\quad r=\sqrt{x^2+y^2}`, ["r₀>0，圆内为 1、圆外为 0，可表示理想圆孔透过率。", "For r₀>0 the disk is 1 inside and 0 outside; it can model an ideal circular aperture."])
    ],
    questions: [
      question("fo-1.1:q1", ["rect(x/a) 在哪段取 1？", "Where is rect(x/a) equal to 1?"], [["|x|≤a/2", "|x|≤a/2"], ["|x|≤a", "|x|≤a"], ["仅 x=0", "Only x=0"]], 0, [["对，a 是总宽度。", "Correct: a is the full width."], ["这会把全宽误作 2a；那是 tri 的底宽。", "That makes the width 2a; that is the base of tri."], ["窗内整个区间都取 1，不只有中心点。", "It is 1 over the entire interval, not just at its center."]]),
      question("fo-1.1:q2", ["sinc(x/a) 的第一个非零正零点在哪里？", "Where is the first positive zero of sinc(x/a)?"], [["x=a/2", "x=a/2"], ["x=a", "x=a"], ["x=0", "x=0"]], 1, [["那是矩形窗的边界；sinc 的分子在 πx/a=π 时首次为零。", "That is a rect boundary; the sinc numerator first vanishes at πx/a=π."], ["对。sin(πx/a)=0 且分母非零，首次在 x=a。", "Yes. The numerator vanishes while the denominator is nonzero first at x=a."], ["原点用极限定义，sinc(0)=1。", "At the origin take the limit: sinc(0)=1."]]),
      question("fo-1.1:q3", ["高斯 Gaus(x/a) 中 a 翻倍，峰值与面积如何变？", "If a doubles in Gaus(x/a), how do its peak and area change?"], [["峰值翻倍、面积不变", "Peak doubles, area stays"], ["峰值不变、面积翻倍", "Peak stays, area doubles"], ["都不变", "Both stay"]], 1, [["中心 exp(0)=1，不会增高；面积随尺度 a 增大。", "At the center exp(0)=1; only its width/area grows."], ["对，中心仍为 1，变量替换 u=x/a 给出面积 a。", "Yes. The peak is 1 and substituting u=x/a gives area a."], ["横向变宽使面积增加。", "Widening horizontally increases area."]])
    ]
  });
  window.FourierGuides["1.1"] = {
      bridge: [
        p("从哪里来：本章要用简单函数描述光学系统的输入、孔径和响应。这里先学会读这些函数的图，不预设你已学过傅里叶变换。", "Previously: this chapter needs simple functions for optical inputs, apertures and responses. First learn to read their graphs; no Fourier-transform knowledge is assumed."),
        p("现在解决：一条曲线到底怎样规定哪里透光、哪里遮光？尺度变大改变的是宽度、零点，还是峰值？", "Here: how does a curve specify where light passes or is blocked? Does changing scale alter width, zeros or peak?"),
        p("接下来：当光点或孔径小到图中画不出宽度，就需要用单位权重的脉冲描述它。", "Next: when a point or opening becomes too narrow to draw, a unit-weight impulse will describe its idealized limit.")
      ],
      question: p("同样把尺度 a 调大，狭缝、三角窗、sinc 与高斯的图像为什么不会以同一种方式变化？", "Why do a slit, triangle, sinc and Gaussian respond differently when their scale a increases?"),
      setup: p("先把纵轴读作函数值：1 表示此模型中的满透过，0 表示遮挡；只有把函数指定为振幅透过率时才有这个光学解释。横轴 x 和尺度 a 必须用同一种长度单位；当前图中只是无量纲演示。", "Read the vertical axis as the function value: 1 can mean full transmission and 0 blocking only when the function is chosen as an amplitude transmission model. x and a must share a length unit; the current chart is dimensionless."),
      terms: [p("尺度 a：横向伸缩量，不是统一的“半径”。rect 的 a 是全宽，tri 的 a 是半底宽，circ 的半径则记为 r₀。", "Scale a stretches horizontally; it is not a universal radius. For rect it is full width, for tri half the base, and for circ the radius is r₀."), p("函数值与强度不同：透过率若表示复振幅，探测到的强度还涉及模平方；此处只比较函数形状。", "Function value is not intensity: if transmission represents complex amplitude, detected intensity involves its squared magnitude. Here we compare function shapes only.")],
      observe: p("先选 rect，把 a 从 1 调到 2：比较实线和虚线的边界及中央高度。然后按下面的任务依次切换函数。", "Select rect and change a from 1 to 2: compare solid and dashed edges and their central heights. Then switch functions in the tasks below."),
      stages: [
        stage(["一｜开关与正负", "1 | Switch and sign"], ["选 step 再选 sgn。分别读 x<0、x>0 两侧；图中的竖线不能表示单个 x=0 的取值。", "Select step then sgn. Read each side of zero; the vertical line cannot depict the value at the single point x=0."], { func: "step" }, [["sgn 可由 step 的取值乘 2 再减 1 得到", "sgn follows by doubling step and subtracting 1"], ["sgn 与 step 在两侧始终相等", "sgn and step coincide on both sides"], ["零点在画出的竖线上有一段长度", "The point at zero has a finite-length vertical segment"]], 0, [["对。负侧 0→−1，正侧 1→1；零点要读定义。", "Yes. Left: 0→−1; right: 1→1. Use the definition at zero."], ["左侧 0 与 −1 不相等；再切 sgn 对照。", "Left values 0 and −1 differ; compare with sgn."], ["跳跃处的竖线只连接图形，不是 x=0 有一串值。", "The drawn vertical joins levels; it is not a range of values at zero."]]),
        stage(["二｜给狭缝定边界", "2 | Bound a slit"], ["选 rect，移动 a；比较中央高度与左右边界。a=2 时在图上找 x=±1。", "Select rect and move a; compare central height and edges. At a=2 locate x=±1."], { func: "rect", a: 2 }, [["a 是全宽，边界为 ±a/2", "a is full width; edges are ±a/2"], ["a 是半宽，边界为 ±a", "a is half-width; edges are ±a"], ["a 增大会使中心透过率高于 1", "Larger a raises central transmission above 1"]], 0, [["对。图示理想振幅窗在边界内为 1，宽度是两边界之差。", "Yes. Ideal amplitude transmission is 1 inside; width is the distance between edges."], ["那会给出 2a 的全宽；这里 a 已定义为全宽。", "That would give full width 2a; a is defined here as the full width."], ["尺度只拉伸横坐标；原点仍取 1。", "Scale stretches x, while the origin remains 1."]]),
        stage(["三｜相似外形，不同边界", "3 | Similar profiles, different edges"], ["切 tri、保持 a=2，查看两端落到零的位置；再切回 rect 对照。", "Switch to tri at a=2 and locate its zeros; compare with rect."], { func: "tri", a: 2 }, [["tri 的零点是 ±a，底宽 2a", "tri has zeros at ±a and base width 2a"], ["tri 与 rect 都在 ±a/2 截止", "tri and rect both end at ±a/2"], ["tri 的峰值随 a 倍增", "tri's peak doubles with a"]], 0, [["对。tri 从中心 1 线性落到 ±a 的 0；不能把 rect 的 a 原封不动读成 tri 的全宽。", "Yes. tri descends linearly from 1 to zero at ±a; rect's scale cannot be read as tri's full width."], ["矩形 a 才是全宽；三角形的底延伸到 ±a。", "For rect a is full width; tri extends to ±a."], ["两者在中心都为 1，拉宽并不增高。", "Both peak at 1; widening does not increase height."]]),
        stage(["四｜零点之后还有旁瓣", "4 | Zeros, then side lobes"], ["选 sinc，把 a 从 1 改成 2；找第一对零点，再往外看是否一直为零。", "Select sinc and change a from 1 to 2. Locate the first zero pair and inspect beyond it."], { func: "sinc", a: 2 }, [["首对非零零点在 ±a，之后仍有振荡", "First nonzero zeros are at ±a; oscillations follow"], ["像 rect 一样，零点之外恒为零", "Like rect, it vanishes everywhere outside the zeros"], ["中心分母为零，所以中心值为零", "The center denominator vanishes, so the center is zero"]], 0, [["对。sinc 的零点彼此分离，不是有限支撑；中心取连续极限 1。", "Yes. sinc has isolated zeros, not compact support; its central value is the continuous limit 1."], ["看零点右侧的小波瓣；sinc 不会像矩形窗那样直接截止。", "Look at the small lobe beyond the zero; sinc does not simply cut off."], ["中心是 0/0 的未定式，取极限是 1，不能直接代零。", "The center is the indeterminate form 0/0; its limit is 1, not a direct substitution."]]),
        stage(["五｜面积与峰值不是一回事", "5 | Area is not peak"], ["选 Gaus，让 a 翻倍；看高度，再看读数中的曲线面积。", "Choose Gaus and double a. Compare peak and displayed curve area."], { func: "gaus", a: 2 }, [["峰仍为 1，面积随 a 翻倍", "Peak remains 1; area doubles with a"], ["峰和面积都翻倍", "Both peak and area double"], ["面积不变，因为峰值不变", "Area stays fixed because peak is fixed"]], 0, [["对。这一约定的高斯面积为 a；它不是未经说明的光功率。", "Yes. This Gaussian convention has area a; it is not optical power without further assumptions."], ["在 x=0 处指数为 0，峰值还是 1。", "At x=0 the exponent is zero, so the peak stays 1."], ["同高而变宽，积分面积会改变。", "Same height but greater width changes the integral area."]]),
        stage(["六｜从横线到圆孔", "6 | From axis to circular pupil"], ["切 circ，把图当作二维孔径的俯视图。半径 r₀=1.5 时判断点 (1.2,1.0)。", "Switch to circ and read the diagram as a 2D pupil. For r₀=1.5 decide whether (1.2,1.0) is inside."], { func: "circ", a: 1.5 }, [["在孔内，两个坐标都小于 1.5", "Inside, as each coordinate is below 1.5"], ["在孔外，点到中心的距离大于 1.5", "Outside: its distance from the center exceeds 1.5"], ["圆孔只看 x，不看 y", "The pupil depends only on x"]], 1, [["分别比坐标会把圆误判成方孔；半径约 1.562。", "Comparing coordinates separately mistakes a disk for a square; radius is about 1.562."], ["对。√(1.2²+1.0²)≈1.562>1.5，透过率为 0。", "Yes. √(1.2²+1.0²)≈1.562>1.5, so transmission is zero."], ["圆孔以 x、y 共同决定的半径为条件。", "A disk is determined by radius from both x and y."]])
      ],
      steps: [
        step(["先问：一个位置在开关的哪侧？step 在 x>0 取 1、x<0 取 0，约定正好在 0 时取 1/2。sgn 则把两侧改记为 +1 和 −1；它并非另一条连续曲线。", "First ask which side of a switch a position occupies. step is 1 for x>0 and 0 for x<0; the book assigns 1/2 exactly at zero. sgn records the two sides as +1 and −1; it is not a second continuous curve."], ["例如 x=−2 时 step 为 0，sgn 为 −1；x=0 时按教材约定分别为 1/2 与 0。单点的取值不改变普通积分。", "For x=−2, step is 0 and sgn is −1; at zero the book chooses 1/2 and 0. A single-point convention does not alter ordinary integrals."], ["开关只能给出一侧；要指定两条边界之间透光，就需要矩形窗。", "A switch selects one side; to pass light only between two edges we need a rectangular window."], [["对照两侧的三个取值，再写出两者的关系。", "Compare the three values, then relate the functions."], String.raw`2\operatorname{step}(x)-1=\begin{cases}-1&x<0\\0&x=0\\1&x>0\end{cases}`, ["逐段正是 sgn 的定义；仅依赖这里的零点约定。", "Piece by piece this is sgn, using this zero convention."]]),
        step(["用两道边界 −a/2 与 a/2 围出宽 a 的一维狭缝。x 是横向位置，a>0 与 x 同单位；当 |x| 不超过半宽时给振幅透过率 1，其余给 0。这里边界也算孔内，是教材的约定。", "Bound a slit by edges −a/2 and a/2, separated by a. x is transverse position and a>0 shares its unit; amplitude transmission is 1 when |x| is at most half-width, 0 elsewhere. The book includes the boundary."], ["若 a=2 mm，则 −1 mm≤x≤1 mm 通过；x=1.2 mm 截断。若再沿 y 方向放一扇宽 b 的窗，两窗的乘积才是二维矩孔。", "If a=2 mm, −1 mm≤x≤1 mm passes and x=1.2 mm is blocked. A second window of width b in y multiplies this one for a 2D rectangle."], ["矩形窗突变；如果想让透过率从中心平缓下降，会用到三角形。", "Rect has abrupt edges; a linearly falling profile motivates the triangle."], [["左右边界之差给总宽度，而不是半宽。", "Subtract the edges to find full, not half, width."], String.raw`\frac a2-\left(-\frac a2\right)=a`, ["因此 rect 中 ±a/2 的写法与‘宽度 a’相符。", "Thus edges ±a/2 match a width of a."]]),
        step(["把中心值固定为 1，让它随离中心的距离 |x| 线性减小：每离开中心 a 的距离就减去 1；超过边界后为 0。a>0 是半底宽，不沿用上一块 rect 的全宽解释。", "Fix the center at 1 and decrease linearly with distance |x|: subtract 1 over distance a; outside the base the value is 0. a>0 is half the base, unlike rect's full width."], ["a=2 mm 时，x=1 mm 的值是 1−1/2=0.5；到 ±2 mm 为 0，底宽 4 mm。二维可让 x、y 两个三角函数相乘。", "For a=2 mm the value at x=1 mm is 1−1/2=0.5; zeros at ±2 mm give a 4 mm base. Multiply x and y triangles in 2D."], ["三角形在有限区间外为零；下一种 sinc 虽也有零点，却仍有远处的波瓣。", "The triangle vanishes outside a finite interval; sinc has zeros yet retains distant lobes."], [["在边界代入 |x|=a，并读出两端距离。", "Substitute |x|=a at each edge and find their separation."], String.raw`1-\frac{|\pm a|}{a}=0,\qquad a-(-a)=2a`, ["只在 |x|≤a 使用线性式；区间外按定义为零。", "Use the linear expression only for |x|≤a; elsewhere it is zero by definition."]]),
        step(["为了比较波瓣和零点，先设无量纲变量 u=x/a（a>0）。这里的 sinc 约定为 sin(πu)/(πu)；x=0 处不是直接做 0/0 除法，而以连续极限补成 1。", "To compare lobes and zeros, first set dimensionless u=x/a with a>0. The sinc convention is sin(πu)/(πu). At x=0 do not divide 0/0; fill in the continuous limit 1."], ["令 x=a：分子 sinπ=0 而分母 π 不为零，所以是首个正零点；x=1.5a 时分子不为零，说明不是‘边界之外都为零’。本书之后用两个 sinc 的乘积描述理想矩孔的远场图样，但本节尚未推导衍射。", "At x=a the numerator sinπ is zero but the denominator π is not: the first positive zero. At x=1.5a it is nonzero, so this is not a hard cutoff. The book later uses a product of sincs for an ideal rectangular pupil's far-field pattern; diffraction has not yet been derived here."], ["下一条高斯也在中心为 1，但没有这种周期出现的零点。", "The next Gaussian also peaks at 1, but lacks repeating zeros."], [["零点须同时检查分母不为零；中心则取极限。", "A zero requires a nonzero denominator; use a limit at the origin."], String.raw`\sin(\pi n)=0\ (n\in\mathbb Z\setminus\{0\}),\qquad \lim_{u\to0}\frac{\sin(\pi u)}{\pi u}=1`, ["所以非零整数倍 a 为零；x=0 的值为 1。", "Thus nonzero integer multiples of a are zeros, while the origin has value 1."]]),
        step(["高斯采用本书的 π 归一化：a>0，u=x/a 无量纲。中心指数为 0，峰值始终为 1；沿 x 积分求面积时，利用标准高斯积分 ∫e^(−πu²)du=1，再由 dx=a du 得面积 a。这里不是光强积分。", "The book uses a π-normalized Gaussian with a>0 and dimensionless u=x/a. The central peak stays 1. To find area, use the standard Gaussian integral ∫e^(−πu²)du=1 and dx=a du, giving area a. This is not an intensity integral."], ["若 a 由 1 mm 变到 2 mm，峰值不动，但按此约定曲线面积从 1 mm 变成 2 mm。二维高斯沿 x、y 相乘，尺度 a、b 对应的曲面下体积是 ab。", "If a changes from 1 mm to 2 mm the peak stays put, while curve area changes from 1 mm to 2 mm. Multiplying Gaussian factors in x and y gives volume ab under the surface."], ["矩形、三角和高斯都是一维横截面；若光阑真正是圆的，必须比较二维距离。", "Rect, tri and Gaussian have been 1D profiles; a circular pupil requires a 2D distance."], [["令 u=x/a，先说明所用的标准高斯积分，再换元。", "Set u=x/a, state the standard Gaussian integral, then substitute."], String.raw`\int_{-\infty}^{\infty}e^{-\pi u^2}\,du=1,\quad dx=a\,du,\quad \int_{-\infty}^{\infty}e^{-\pi(x/a)^2}\,dx=a`, ["标准积分可将积分平方后改用平面极坐标求得；两维可分别积分成 ab。", "The standard integral follows by squaring it and using polar coordinates in the plane; integrating each dimension gives ab."]]),
        step(["令 r=√(x²+y²) 为点到圆心的距离，r₀>0 为孔半径，两者必须同单位。只有 r≤r₀ 才给理想振幅透过率 1；图示是俯视透光区域，不是沿 x 的曲线高度。", "Let r=√(x²+y²) be distance to the center and r₀>0 the pupil radius, in the same unit. Ideal amplitude transmission is 1 only for r≤r₀. The chart is a top view of the transmitting region, not a 1D height plot."], ["若 r₀=1.5 mm，点 (1.2,1.0) mm 的半径 √2.44≈1.562 mm，故遮挡；只逐项比较 x、y 会误把圆当作方孔。", "For r₀=1.5 mm, (1.2,1.0) mm has radius √2.44≈1.562 mm and is blocked; comparing x and y separately mistakes a disk for a square."], ["到这里我们能描述有限大小的孔；下一节把归一化孔径不断缩小，讨论它的理想极限 δ。", "We can now describe finite openings. Next we shrink a normalized pupil toward the ideal delta limit."], [["先计算半径，最后比较边界；不把透过率 1 当作光功率。", "Calculate radius before testing the boundary; transmission 1 is not optical power."], String.raw`1.2^2+1.0^2=2.44>1.5^2=2.25`, ["平方后比较与直接比较非负半径等价，点在圆外。", "Comparing squares is equivalent for nonnegative radii; the point lies outside."]])
      ]
    };
  window.FourierIndependentLabData["1.1"] = [
    S(["把开关与正负分开", "Separate switching from sign"],
      ["横坐标 x 是观察位置，纵坐标是函数值。切换 step 与 sgn，再把探针 x 移过原点：它们在负半轴是否相同？", "x is the observation position; height is function value. Switch between step and sgn and move the probe across zero. Do their negative halves agree?"],
      "function", { shape: "step", a: 1, probe: -.5 }, ["shapeSwitch", "probe"],
      [["不同：step 为0，sgn 为−1", "No: step is 0, sgn is −1"], ["相同，都是关掉", "Yes, both switch off"], ["两者原点都为1", "Both equal 1 at zero"]], 0,
      [["对。step 表示开关，sgn 还保留正负。", "Yes. step switches; sgn also retains sign."], ["sgn 的负半轴为−1，不是0。", "sgn is −1, not 0, on the negative half-axis."], ["本课按本书约定：step(0)=1/2，sgn(0)=0。", "Our textbook convention is step(0)=1/2 and sgn(0)=0."]],
      ["开关边界不等于一段有限宽的开口。接下来用两个边界把狭缝圈出来。", "A single switching boundary is not a finite aperture. Next locate both edges of a slit."],
      ["从一个边界走向两个边界。", "Move from one boundary to two."]),
    S(["给狭缝定宽", "Set the slit width"],
      ["蓝色矩窗 rect(x/a) 表示高度1的开口，a 是全宽。将 a 从1改成2，用探针找左右边界。", "The blue rectangle rect(x/a) is a height-1 opening; a is its full width. Change a from 1 to 2 and probe both edges."],
      "function", { shape: "rect", a: 2, probe: 1 }, ["a", "probe"],
      [["边界在 ±1", "Edges at ±1"], ["边界在 ±2", "Edges at ±2"], ["峰高变成2", "Peak becomes 2"]], 0,
      [["对。全宽2，一边只占一半。", "Yes. Half of full width 2 lies on each side."], ["你把全宽当成了半宽。", "That treats the full width as a half-width."], ["x/a 改变横坐标尺度，外面没有乘振幅2。", "x/a rescales the horizontal axis; it adds no amplitude factor 2."]],
      ["本书把矩窗边界计为1；孤立端点不影响面积。a 增大使窗变宽，不使峰增高。", "The textbook assigns 1 at rectangle edges; isolated endpoints do not change area. Increasing a widens, not raises, the window."],
      ["保留尺度 a，比较另一种衰减到零的边缘。", "Keep scale a, but change how the edges fall to zero."], String.raw`\operatorname{rect}(x/a)=1\quad(|x|\le a/2)`),
    S(["相同尺度，不同支撑", "Same scale, different support"],
      ["改用 tri(x/a)，a=2。探针依次停在0、1、2；比较矩窗的边界和三角形的边界。", "Use tri(x/a) with a=2. Probe 0, 1 and 2. Compare its edges with those of the rectangle."],
      "function", { shape: "tri", a: 2, probe: 1 }, ["a", "probe"],
      [["x=1 时为0.5，底宽4", "Value .5 at x=1; base width 4"], ["底宽仍为2", "Base width remains 2"], ["x=1 时必为0", "Value must be 0 at x=1"]], 0,
      [["对。1−|1|/2=0.5，零点在±2。", "Yes. 1−|1|/2=.5, with zeros at ±2."], ["tri 的 a 是半底宽，rect 的 a 是全宽。", "For tri, a is half the base width; for rect, it is full width."], ["只有到 |x|=a 才下降到0。", "It reaches zero only at |x|=a."]],
      ["相同的 x/a 不意味着各种函数的宽度定义相同。先读函数自身的边界。", "The same x/a does not give every function the same width convention. Read each function's boundary."],
      ["有限边界已会看；接着检查零点外还有没有信号。", "Now ask whether signal remains beyond a first zero."], String.raw`\operatorname{tri}(x/a)=1-|x|/a\quad(|x|\le a)`),
    S(["零点不是终点", "A zero is not an endpoint"],
      ["sinc(x/a) 使用 sin(πx/a)/(πx/a)。a 从1改到2，探针移到 x=3，观察第一对零点外的旁瓣。", "sinc(x/a) means sin(πx/a)/(πx/a). Change a from 1 to 2 and probe x=3, beyond the first zeros."],
      "function", { shape: "sinc", a: 2, probe: 3 }, ["a", "probe"],
      [["x=3 为负，首个正零点在2", "Negative at 3; first positive zero at 2"], ["零点外永远为0", "Always zero beyond the first zero"], ["原点是0/0所以没有值", "Undefined at zero because of 0/0"]], 0,
      [["对。正弦在此为−1，分母为正。", "Yes. The sine is −1 here and the denominator is positive."], ["零点之间还有正负交替的旁瓣。", "Alternating sidelobes remain between zeros."], ["原点取连续极限1，不直接计算0/0。", "The continuous limit assigns 1 at zero; do not evaluate 0/0."]],
      ["这里画的是可带正负的函数，不是直接画光强；光强不能为负。", "This is a signed function, not optical intensity, which cannot be negative."],
      ["有旁瓣的函数与处处为正的平滑峰有什么不同？", "Compare sidelobes with a smooth positive peak."]),
    S(["峰高不变，面积变化", "Fixed peak, changing area"],
      ["高斯函数为 exp[−π(x/a)²]。令 a=1、2 对照：峰高、横向宽度、曲线积分分别怎样变？", "For exp[−π(x/a)²], compare a=1 and 2. What happens to peak, width and integral?"],
      "function", { shape: "gaus", a: 2, probe: 0 }, ["a", "probe"],
      [["峰仍1，积分变成2", "Peak stays 1; integral becomes 2"], ["峰变2，积分仍1", "Peak doubles; integral stays 1"], ["有限距离处严格截断", "Exactly cut off at finite distance"]], 0,
      [["对。只把横坐标拉宽2倍，面积也随之增大。", "Yes. Doubling horizontal scale doubles area."], ["面积守恒需要另乘1/a，这里没有。", "Area preservation would need an extra 1/a, absent here."], ["高斯尾部趋近0，却没有有限支撑边界。", "Gaussian tails approach zero without a finite support edge."]],
      ["高斯积分为 a，峰高为1。这是数学面积；实际功率还取决于所表示的物理量和维度。", "Its integral is a and peak is 1. Mathematical area is not automatically physical power; the represented quantity and dimension matter."],
      ["从一条线推广到平面，不能再把半径当全宽。", "Move from a line to a plane; distinguish radius from full width."]),
    S(["圆孔的尺寸账本", "Account for a circular aperture"],
      ["圆孔图中 a 改作半径，圆内值1，圆外值0。把半径从1增至2，比较面积。", "Here a is the aperture radius; the value is 1 inside and 0 outside. Double radius from 1 to 2 and compare areas."],
      "function", { shape: "circ", a: 1, probe: 0 }, ["a"],
      [["面积乘4", "Area multiplies by 4"], ["面积乘2", "Area multiplies by 2"], ["高度乘4", "Height multiplies by 4"]], 0,
      [["对。两个横向方向都扩大2倍。", "Yes. Both planar directions scale by 2."], ["只算了一个方向；圆面积为πa²。", "That counts one direction only; area is πa²."], ["孔的透过值仍为1，变化的是面积。", "Transmission stays 1; only area changes."]],
      ["圆孔使用径向距离 √(x²+y²)。二维矩窗和可分离高斯的面积见讲义，不把直径、半径、尺度混用。", "The circle uses radial distance √(x²+y²). See the notes for 2D rectangles and separable Gaussians; do not confuse diameter, radius and scale."],
      ["用一个未算过的尺度检验边界判断。", "Test edge reading at an unworked scale."]),
    S(["隐藏读数的新狭缝", "A new slit with hidden readings"],
      ["已知 rect(x/3) 的高度为1。先预测探针 x=1.25 是否在开口内；提交前不显示曲线和读数。", "A height-1 rect(x/3) is given. Predict whether x=1.25 is inside before the curve and reading are revealed."],
      "function", { shape: "rect", a: 3, probe: 1.25 }, [],
      [["在内，值为1", "Inside; value 1"], ["在外，值为0", "Outside; value 0"], ["在内，值为3", "Inside; value 3"]], 0,
      [["±1.5 是边界，1.25 在其中。", "The edges are ±1.5, containing 1.25."], ["把3当作半宽或把1当作固定边界都会错。", "Neither 3 as half-width nor 1 as a fixed edge is correct."], ["3 是宽度，不是峰值系数。", "3 is width, not an amplitude multiplier."]],
      ["先定位自变量如何缩放，再判断支撑与函数值。", "Locate the coordinate scaling, then determine support and value."],
      ["到回顾串起各类函数，再去正式练习。", "Connect the functions in the recap, then practice."]),
  ];
  window.FourierIndependentRecaps["1.1"] = [
      ["同一狭缝：a=2", "One slit: a=2", "function", { shape: "rect", a: 2, probe: 0 }],
      ["探针到边界x=1", "Probe the edge x=1", "function", { shape: "rect", a: 2, probe: 1 }],
      ["只改尺度为a=3", "Change only scale to a=3", "function", { shape: "rect", a: 3, probe: 1 }],
      ["x=1.25仍在新窗内", "x=1.25 remains inside", "function", { shape: "rect", a: 3, probe: 1.25 }],
    ];
  window.FourierIndependentNotes.setups["1.1"] = P("从理想狭缝出发，区分函数值、横向尺度、边界和面积，再比较三角形、sinc、高斯和二维圆孔。", "Start with an ideal slit: distinguish value, scale, edges and area, then compare triangle, sinc, Gaussian and a 2D circular pupil.");
  window.FourierIndependentNotes.supplements["1.1"] = { text: P("从一维到二维：可分离矩窗的全宽分别a、b，面积ab；可分离三角函数底宽2a、2b，积分仍为ab；高斯在两个方向尺度为a、b时面积也是ab。这些是函数积分，不自动等同光功率。", "In 2D, separable rectangles of full widths a,b have area ab. Separable triangles of base widths 2a,2b also integrate to ab, as do Gaussians of scales a,b. These are function integrals, not automatically optical power."), tex: String.raw`F(x,y)=F_x(x)F_y(y),\qquad \iint F\,dx\,dy=\left(\int F_x\,dx\right)\left(\int F_y\,dy\right)` };
  window.FourierSectionSymbolOverrides["1.1"] = [
      ["x", "观察/探针位置", "Observation/probe position", "长度；图中无量纲", "Length; dimensionless demo", "probe"],
      ["a", "横向尺度；rect全宽、tri半底宽、circ半径", "Horizontal scale; rect full width, tri half-base, circ radius", "与x同单位", "Same units as x", "a"],
      ["b", "二维可分离函数的第二方向尺度", "Second-direction scale for separable 2D functions", "与y同单位；本图未指定", "Same units as y; unspecified here"],
      ["r=\\sqrt{x^2+y^2}", "距圆心的径向距离", "Radial distance from center", "长度", "Length"],
    ];
  const line = (zh, en, tex, resultZh, resultEn) => ({ lead: p(zh, en), tex, read: p(resultZh, resultEn) });
  const auditEntries = [
      ["(1-1)–(1-3)", line("目标：由已定义的开关值算出左、零、右三个符号值；先写出阶跃函数的输入。", "Goal: compute the sign at left, origin and right from the step definition; first list its three inputs.", String.raw`\operatorname{step}(x<0)=0,\quad\operatorname{step}(0)=\tfrac12,\quad\operatorname{step}(x>0)=1`, "再分别代入 2step−1；不能仅从图像猜零点的值。", "Insert each into 2step−1; the value at zero comes from the convention, not the sketch.")],
      ["(1-4)", line("目标：确认 a 是全宽。先从 |x|≤a/2 解出左右边界。", "Goal: show a is the full width. Solve |x|≤a/2 for both edges first.", String.raw`-\tfrac a2\le x\le\tfrac a2`, "边界之差才是宽度；教材在边界取 1。", "Subtract the two edges to get the width; the book includes its boundary.")],
      ["(1-5)", line("目标：找到三角窗在哪些位置非零。先将 |x|≤a 展开，并检查中心。", "Goal: locate where the triangular window survives. Expand |x|≤a and check its center.", String.raw`-a\le x\le a,\qquad 1-|0|/a=1`, "在两端代值为零，端点之间是线性下降；a 是半底宽。", "At both ends it reaches zero and decreases linearly between them; a is the half-base width.")],
      ["(1-6)", line("目标：求第一个非零正零点。令 u=x/a；先判断分子什么时候为零。", "Goal: find the first positive nonzero zero. Set u=x/a and solve for the numerator.", String.raw`\sin(\pi u)=0\Longrightarrow u=n\in\mathbb Z;\qquad x=na`, "剔除 n=0：那里是 0/0 的极限 1，不是零点。", "Exclude n=0: its 0/0 limit is 1, not a zero.")],
      ["(1-7)", line("目标：从标准高斯面积得到尺度 a 时的面积。先令 u=x/a 并改变积分元与积分限。", "Goal: obtain the area for scale a from the standard Gaussian. Substitute u=x/a, changing the differential and limits.", String.raw`u=x/a,\quad dx=a\,du,\quad\int_{-\infty}^{\infty}e^{-\pi(x/a)^2}dx=a\int_{-\infty}^{\infty}e^{-\pi u^2}du`, "本书标准积分是 1，所以面积是 a；面积不等于光功率。", "The standard integral equals 1, so the area is a; this is not optical power.")],
      ["(1-11)", line("目标：判断例题点是否透过圆孔。先平方比较以避免近似开方。", "Goal: decide whether the sample point passes through the disk. Compare squared radii before approximating the square root.", String.raw`r^2=1.2^2+1.0^2=2.44,\quad r_0^2=1.5^2=2.25`, "因为两个半径非负且 2.44>2.25，r>r₀，故在孔外。", "Both radii are nonnegative and 2.44>2.25, so r>r₀ and the point is outside.")]
  ];
  if (auditEntries.length !== window.FourierGuides["1.1"].steps.length) throw new Error("Incomplete textbook audit: 1.1");
  auditEntries.forEach(([source, intermediate], i) => {
    window.FourierLessons.find(lesson => lesson.id === "1.1").notes[i].source = source;
    window.FourierGuides["1.1"].steps[i].proof.unshift(intermediate);
  });
  window.FourierLessons.find(lesson => lesson.id === "1.1").symbols = window.FourierSectionSymbolOverrides["1.1"].map(([tex, zh, en, unitZh, unitEn, control]) => ({
    tex, meaning: P(zh, en), unit: P(unitZh, unitEn),
    condition: P("按当前实验步骤；未显示读数表示本步未指定", "Current experiment step; no reading means unspecified in this step"), control,
  }));

  // Section-owned chart models, explanations, controls and notes mapping.
  window.FourierSectionRuntime["1.1"] = {
    models: ["function"],
    noteStages: [0, 1, 2, 3, 4, 5],
      controls: {
      a: ["a", P("尺度 a（圆孔为半径）", "Scale a (radius for circle)"), .5, 3, .25],
      probe: ["probe", P("探针位置 x", "Probe position x"), -3, 3, .25],
      shapeSwitch: ["shape", P("函数", "Function"), [["step", "step"], ["sgn", "sgn"]]],
    },
    create(tools) {
      const { h, t, fmt, sinc, gauss, graph, block } = tools;
      function functionValue(shape, x, a) {
        if (shape === "step") return x === 0 ? .5 : x > 0 ? 1 : 0;
        if (shape === "sgn") return Math.sign(x);
        if (shape === "rect") return Math.abs(x) <= a / 2 ? 1 : 0;
        if (shape === "tri") return Math.max(0, 1 - Math.abs(x) / a);
        if (shape === "sinc") return sinc(Math.PI * x / a);
        return gauss(x / a);
      }
      function drawScene(model, s) {
        if (model === "function") {
          if (s.shape === "circ") {
            const radius = 42 * s.a;
            return { graphic: `<svg class="il-graph" viewBox="0 0 550 320" role="img" aria-label="${t("圆内透过值1，圆外0；标记半径a", "Transmission 1 inside, 0 outside; radius a marked")}"><path d="M45 160H505M275 20V300" stroke="#b1a493"/><circle cx="275" cy="160" r="${radius}" fill="#bed7d9" stroke="#245b66" stroke-width="3"/><path d="M275 160h${radius}" stroke="#ae5130" stroke-width="3"/><text x="${275 + radius / 2}" y="148">a=${fmt(s.a)}</text><text x="285" y="180">1</text><text x="490" y="145">0</text><text x="505" y="180">x</text><text x="285" y="25">y</text></svg>`, readout: t(`半径=${fmt(s.a)}；面积 πa²=${fmt(Math.PI * s.a * s.a)}`, `Radius=${fmt(s.a)}; area πa²=${fmt(Math.PI * s.a * s.a)}`) };
          }
          const value = functionValue(s.shape, s.probe, s.a);
          return { graphic: graph([{ fn: x => functionValue(s.shape, x, s.a) }], { xmin: -4, xmax: 4, ymin: -1.15, ymax: 1.3, marker: s.probe, label: `${s.shape}, a=${s.a}, x=${s.probe}` }), readout: `${h(s.shape)} · a=${fmt(s.a)} · x=${fmt(s.probe)} · ${t("函数值", "value")}=${fmt(value)}` };
        }
      }
      function explanation(model, s) {
        if (model === "function") {
          if (s.shape === "circ") return block(
            ["圆面是理想圆孔的平面示意，不是函数的立体高度。x、y是位置，$r=\\sqrt{x^2+y^2}$是离圆心的距离；蓝圆内函数值1、圆外0，橙线段是半径a。", "This is a planar ideal pupil, not a 3D function height. x,y are positions; $r=\\sqrt{x^2+y^2}$ is distance from the center. Blue interior has value 1, exterior 0; the orange segment marks radius a."],
            String.raw`F(x,y)=\begin{cases}1,&x^2+y^2\le a^2,\\0,&x^2+y^2>a^2,\end{cases}\qquad \iint F\,dx\,dy=\pi a^2`,
            [`面积=π×${s.a}²=${fmt(Math.PI * s.a ** 2)}，是坐标平面上的面积；透过值为1才可直接等同函数积分。`, `Area=π×${s.a}²=${fmt(Math.PI * s.a ** 2)}, measured in the coordinate plane; it equals the function integral because transmission is 1 inside.`]);
          const formulas = {
            step: String.raw`f(x)=\begin{cases}0,&x<0,\\1/2,&x=0,\\1,&x>0,\end{cases}`,
            sgn: String.raw`f(x)=\begin{cases}-1,&x<0,\\0,&x=0,\\1,&x>0,\end{cases}`,
            rect: String.raw`f(x)=\operatorname{rect}(x/a)=\begin{cases}1,&|x|\le a/2,\\0,&|x|>a/2,\end{cases}`,
            tri: String.raw`f(x)=\operatorname{tri}(x/a)=\max(0,1-|x|/a)`,
            sinc: String.raw`f(x)=\operatorname{sinc}(x/a)=\frac{\sin(\pi x/a)}{\pi x/a},\quad f(0)=1`,
            gauss: String.raw`f(x)=\exp[-\pi(x/a)^2]`,
          };
          return block(
            ["蓝线是所选函数f，横轴x是输入位置，纵轴是函数值；虚竖线标当前探针位置，不是另一条函数。a是横向尺度：rect的全宽、tri的半底宽、sinc第一个正零点、高斯的横向尺度；不是统一的峰高。", "Blue is the selected function f: horizontal x is position, vertical is function value. The vertical dashed line marks the probe, not a second function. Scale a means full rect width, tri half-base width, first positive sinc zero, or Gaussian scale, not a common peak height."],
            formulas[s.shape],
            [`代入 a=${s.a}、x=${s.probe} 得 f(x)=${fmt(functionValue(s.shape, s.probe, s.a))}。|x|是绝对值，max取较大者，sin是正弦（弧度），$\\exp(z)=e^z$，π≈3.14159。sinc在x=0用极限值1，不直接除以0。`, `Substitute a=${s.a}, x=${s.probe} to get f(x)=${fmt(functionValue(s.shape, s.probe, s.a))}. |x| is absolute value, max selects the larger value, sin uses radians, $\\exp(z)=e^z$, and π≈3.14159. At zero, sinc uses its limit 1, not division by zero.`],
            ["rect与tri在有限区间外为0；sinc与高斯并没有以画面边框为界的有限定义域。高斯的全域面积为a（使用标准高斯积分），并非因为峰高为1就面积为1。", "Rect and tri vanish outside finite supports; sinc and Gaussian are not restricted to the displayed horizontal window. Gaussian area is a by the standard Gaussian integral, not always 1 merely because its peak is 1."]);
        }
        return "";
      }
      return { drawScene, explanation, calculate: { functionValue } };
    },
  };
})();

/* Chapter 1, section 1.2.3: source, translation, and guided reading. */
(() => {
  const section = {
    code: "1.2.3", title: "一般坐标系下的波函数", pages: "9", pdf: 19, visual: "wavefronts",
    overview: "去掉“传播方向一定是 z 轴”的限制。波矢量 k 的方向决定波往哪走，长度决定空间相位变化有多快；等相位面与 k 垂直。",
    bridge: { previous: "1.2.2 中的 kz 只适用于沿 z 轴传播；真实坐标系可以任意选取。", current: "用波矢量 k 与位置 r 的点积描述斜向传播和波面。", next: "1.2.4 保留这个空间相位，再用复指数简化微分运算。" },
    goals: ["把 kz 扩展成 k·r", "从等相位方程找波面法向", "用向量分量计算某点的相位"],
    symbols: [["r", "位置矢量 (x,y,z)", "m", "算例：(2,1,0)"], ["k", "波矢量，大小 2π/λ", "rad/m", "算例：(3,4,0)"], ["A", "电场振幅矢量（与 k 正交）", "V/m"], ["φ", "相位 k·r−ωt", "rad", "算例：空间相位 10 rad"]],
    blocks: [
      { label: "从特例到一般", title: "把 kz 写成点积", text: [
        "当传播方向是 +z，k=(0,0,k)，故 k·r=kz。改变坐标或传播方向时，仍使用 k·r，就不必每次重新写一套波函数。",
        "在某个固定时刻 k·r−ωt=C 是平面的方程。沿 k 方向走得越远，相位变化越快；沿波面移动则相位不变。上方图可旋转波面法向，观察条纹方向始终与 k 垂直。"
      ], eq: ["E(r,t) = A cos(k·r−ωt)", "|k| = 2π/λ"] },
      { label: "推导 04", title: "法向量为什么是 k？", steps: [
        ["固定相位", "任取波面上的微小位移 Δr，相位不变意味着 k·Δr=0。"],
        ["几何含义", "与波面内所有 Δr 都垂直的向量就是波面法向，所以 k 是法向。"],
        ["传播方向", "对固定相位随时间移动：k·(dr/dt)=ω。若只沿 k 方向前进，其速度大小为 ω/|k|。"]
      ], eq: ["k·r = kₓx + kᵧy + k_{z} z"] },
      { label: "带入数字", title: "一个斜向传播的平面波", text: [
        "取 k=(3,4,0) rad/m，则 |k|=5 rad/m，λ=2π/5 m。点 r=(2,1,0) m 处的空间相位 k·r=3×2+4×1=10 rad。",
        "虽然 k 有 x、y 分量，电场 A 仍需满足 k·A=0（由 1.2.6 的横波条件得到）；“传播斜向”不等于“电场也沿传播方向”。"
      ], eq: ["k=(3,4,0)，r=(2,1,0)　⇒　k·r=10 rad"] }
    ],
    questions: [
      { stem: "k=(0,0,k)、r=(x,y,z) 时，空间相位 k·r 是多少？", choices: ["kx", "ky", "kz"], answer: 2, explain: "点积逐分量相乘后求和：0·x+0·y+k·z=kz。所以一般式在沿 +z 传播时退化成一维的 kz−ωt。", whyOther: "选 kx 或 ky 说明把位置坐标中的任意分量当成传播轴；真正起作用的是波矢量非零分量所指的方向。" },
      { stem: "固定时刻沿等相位面移动 Δr，哪一个式子成立？", choices: ["k·Δr=0", "k·Δr=2π 必然成立", "Δr 必须与 k 平行"], answer: 0, explain: "同一等相位面上的相位差为 Δφ=k·Δr=0。故面内位移与 k 垂直，k 是波面的法向。", whyOther: "2π 对应跨越相邻同相波面而不是在同一个几何平面内移动；与 k 平行则通常改变相位，恰好不是面内位移。" },
      { stem: "k=(3,4,0) rad/m，r=(2,1,0) m，k·r 等于？", choices: ["5 rad", "10 rad", "14 rad"], answer: 1, explain: "k·r=3×2+4×1+0×0=10 rad。波数的 rad/m 与位置的 m 相消，结果是相位。", whyOther: "5 是 |k|=√(3²+4²) 的数值，单位 rad/m；14 常见于把分量平方或简单相加。相位需要逐分量乘积再求和。" }
    ]
  };
  const translation = {
      title: "Wave functions in arbitrary coordinates",
      overview: "Remove the restriction that propagation must follow z. The wavevector k points in the propagation direction, while its magnitude controls spatial phase variation. Equal-phase surfaces are perpendicular to k.",
      bridge: { previous: "The kz of §1.2.2 describes only propagation along z; coordinate axes can be chosen differently.", current: "Use the dot product of wavevector k and position r to describe oblique propagation and wavefronts.", next: "§1.2.4 retains this spatial phase while simplifying differentiation with a complex exponential." },
      goals: ["Generalize kz to k·r", "Identify the normal to an equal-phase plane", "Calculate phase from vector components"],
      symbols: [["r", "position vector (x,y,z)", "m", "Example: (2,1,0)"], ["k", "wavevector, magnitude 2π/λ", "rad/m", "Example: (3,4,0)"], ["A", "electric-field amplitude vector, transverse to k", "V/m"], ["φ", "phase k·r−ωt", "rad", "Example: spatial phase 10 rad"]],
      blocks: [
        { label: "Generalize the special case", title: "Replace kz by a dot product", text: [
          "When propagation is along +z, k=(0,0,k), so k·r=kz. The dot product k·r continues to work after changing coordinates or the propagation direction; we need not derive a new wave expression each time.",
          "At a fixed time, k·r−ωt=C is the equation of a plane. Moving along k changes phase; moving within the wavefront does not. Rotate the normal in the diagram and observe that the equal-phase lines remain perpendicular to k."
        ] },
        { label: "Derivation 04", title: "Why is k the normal vector?", steps: [
          ["Hold phase fixed", "Any small displacement Δr within the wavefront has zero phase change, so k·Δr=0."],
          ["Interpret geometrically", "A vector perpendicular to every displacement within a plane is its normal. Therefore k is normal to the wavefront."],
          ["Find the propagation speed", "Following a fixed phase gives k·(dr/dt)=ω. If motion is along k, its speed is ω/|k|."]
        ] },
        { label: "Substitute numbers", title: "An obliquely traveling plane wave", text: [
          "Take k=(3,4,0) rad/m. Then |k|=5 rad/m and λ=2π/5 m. At r=(2,1,0) m, the spatial phase is k·r=3×2+4×1=10 rad.",
          "Although k has x and y components, the electric-field amplitude A must still obey k·A=0, as established by the transverse-wave condition in §1.2.6. Oblique propagation does not put E along k."
        ] }
      ],
      questions: [
        { stem: "For k=(0,0,k) and r=(x,y,z), what is the spatial phase k·r?", choices: ["kx", "ky", "kz"], explain: "The dot product multiplies matching components and adds them: 0·x+0·y+k·z=kz. Thus the general expression reduces to kz−ωt for propagation along +z.", whyOther: "kx or ky treats an arbitrary coordinate of r as the propagation axis. The nonzero component of the wavevector determines which coordinate contributes." },
        { stem: "At fixed time, what holds for a displacement Δr along a single equal-phase plane?", choices: ["k·Δr=0", "k·Δr must equal 2π", "Δr must be parallel to k"], explain: "Phase difference within the same plane is Δφ=k·Δr=0. Hence an in-plane displacement is perpendicular to k, making k the plane's normal.", whyOther: "A difference of 2π belongs to neighboring equal-phase planes, not a displacement within the same geometric plane. Motion along k normally changes phase." },
        { stem: "If k=(3,4,0) rad/m and r=(2,1,0) m, what is k·r?", choices: ["5 rad", "10 rad", "14 rad"], explain: "k·r=3×2+4×1+0×0=10 rad. The meters cancel the rad/m units of the wavevector, leaving phase in radians.", whyOther: "5 is |k|=√(3²+4²), with units rad/m. 14 can result from mishandling components. Calculate each component product before adding." }
      ]
    };
  const guide = {
    question: ["光斜着走时，只写 z 方向的距离还够吗？", "If light travels obliquely, is z-distance enough?"],
    setup: ["前面一直把传播方向选作 z 轴，便于理解。现在把光转斜，不能再用任意点的 z 值代表它沿光路前进了多远。需要先把位置投影到传播方向，再用波数换成相位。", "We previously chose z along propagation. If the wave is tilted, z no longer measures how far a point lies along its travel direction. First project position onto that direction, then multiply by the wavenumber to obtain phase."],
    terms: [
      { name: ["位置矢量 r", "Position vector r"], meaning: ["从原点指向观察点的箭头；这里粗体 r 是矢量，不是球面波中的距离大小。", "An arrow from the origin to the observation point. Vector r is not the scalar distance used later for spherical waves."] },
      { name: ["波矢量 k", "Wavevector k"], meaning: ["方向指向波的传播方向，大小等于 2π/λ。", "Its direction is propagation; its magnitude is 2π/λ."] },
      { name: ["点积 k·r", "Dot product k·r"], meaning: ["先取 r 沿 k 的投影，再乘 k 的大小；结果是一个相位数值，不是箭头。", "Project r along k, then multiply by the size of k. The result is a scalar phase, not an arrow."] }
    ],
    observe: ["改变波的方向，注意波面怎样跟着转。沿波面横走保持相同振动阶段；穿过一张张波面才逐步改变相位。", "Change the propagation direction and watch the fronts rotate. Moving within a front keeps the oscillation stage unchanged; crossing fronts changes phase."],
    blocks: [
      { title: ["把“沿 z 走多远”换成“沿传播方向走多远”", "Replace z-distance by distance along propagation"], before: ["先前 kz 中的 z 恰好就是沿传播方向的距离。一般方向下用点积 k·r 完成同样的工作：位置在传播方向上越远，空间相位越大；纯横向移动则不改变它。A 是场振动的幅度与方向，不是传播方向。", "In kz, z happened to measure distance along propagation. The dot product k·r performs that job for any direction: farther along travel means larger spatial phase, while purely transverse motion leaves it unchanged. A describes the field's oscillation size and direction, not the travel direction."], read: ["取 k=(0,0,k) 时，点积就退回 kz。因此这个式子不是换了一种光，而是把已经学过的波函数写成不依赖坐标选择的形式。接下来解释它为什么仍叫平面波。", "For k=(0,0,k), the dot product reduces to kz. This is the same wave written independently of coordinate choice, not a new kind of light. Next we explain why it still has plane fronts."] },
      { title: ["同相位的点，组成垂直波矢量的平面", "Equal-phase points form a plane perpendicular to k"], before: ["固定观察时刻，要留在同一波面上，k·r 就不能改变。两点的位移若与 k 垂直，点积变化为零；所有这样的横向位移拼起来就是一张平面。垂直这张面的方向叫法向。", "At a fixed time, remaining on one front requires k·r to stay fixed. A displacement perpendicular to k changes the dot product by zero. All such transverse displacements make a plane. The perpendicular direction is its normal."], read: ["所以 k 同时给出了波面法向与传播方向。这是“波面”和“光线方向”的连接：不要把波面上横走的方向误认成向前传播的方向。", "Thus k specifies both the wavefront normal and propagation direction. This connects fronts to rays: motion within a front is not forward propagation."] },
      { title: ["做一次投影计算，检查点积究竟算了什么", "Calculate a dot product to check what it measures"], before: ["已经知道几何意义，接下来按坐标计算。点积就是同坐标的分量相乘再求和，z 分量为零时不产生贡献；波数的单位与位置的单位相乘后留下相位。", "With the geometry established, use coordinates: multiply matching components and add them. A zero z-component contributes nothing. Wavenumber times position leaves a phase."], read: ["例子给 3×2+4×1=10 rad。这个 10 是空间相位，不是场值；要知道某一时刻的场，还要减去时间相位 ωt，再放入余弦。下一节用一支转动的箭头来简化这种相位计算。", "The example gives 3×2+4×1=10 rad. That is spatial phase, not the field value. Subtract ωt and take the cosine to get the field at a particular time. Next we use a rotating arrow to simplify phase calculations."] }
    ],
    check: { question: ["在同一波面内横着移动，相位会改变吗？为什么？", "Does moving sideways within one wavefront change phase? Why?"], answer: ["同一时刻不会。位移与传播方向垂直，在该方向上的投影为零，所以空间相位不变。", "Not at a fixed time. The displacement has no projection along propagation, so spatial phase is unchanged."] },
    next: ["带到 1.2.4：我们会算相位了；接下来只是换一种更省运算的记账方式，不增加另一种真实的场。", "Into §1.2.4: we can calculate phase. Next we change the bookkeeping, not the number of physical fields."]
  };
  if (window.OpticsSectionTranslations[section.code]) throw new Error(`Duplicate section ${section.code}`);
  window.OpticsChapter01.push(section);
  window.OpticsSectionTranslations[section.code] = translation;
  window.OpticsGuidedLessons[section.code] = guide;
  window.OpticsExplorations["1.2.3"] = {
    ask: ["旋转传播方向 k，等相位线与 k 的夹角会怎样？", "Rotate propagation direction k. What happens to the angle between k and equal-phase lines?"],
    choices: [["跟着变成平行", "They become parallel"], ["仍然垂直", "They remain perpendicular"], ["波面不随 k 转动", "The lines do not rotate with k"]], answer: 1,
    try: ["调传播角，看一条等相位线和箭头是否一起转动。", "Rotate the direction control and follow one equal-phase line and the arrow."],
    why: ["同一时刻相位不变的位移满足 k·Δr=0；因此平面波波面法向是 k。", "A displacement along a constant-phase line obeys k·Δr=0 at fixed time; k is its normal."]
  };
  const deepLab = {
    controls: [["angle", -60], ["angle", 60]],
    compare: ["把 k 从左倾调到右倾，任选一条等相位线，观察它的法向是否跟着旋转。", "Rotate k from left to right; does the normal to an equal-phase line rotate with it?"],
    relation: ["同一时刻沿波面走，空间相位不变，即 k·Δr=0；方向改变，波面仍与 k 垂直。", "Along a wavefront at fixed time, spatial phase is unchanged: k·Δr=0. Rotating k preserves perpendicularity."],
    formula: "\\mathbf k\\cdot\\Delta\\mathbf r=0",
    challenge: [["沿一条等相位线移动而不改时刻，k·Δr 是多少？", "Move along one equal-phase line at fixed time. What is k·Δr?"], [["零", "Zero"], ["波数 k", "The wavenumber"], ["随角度必为正", "Always positive"]], 0],
  };
  deepLab.mistakes = [null, ["k·Δr 是内积，沿波面位移与 k 垂直，所以是零而不是 k。", "k·Δr is a dot product; motion along the wavefront is perpendicular to k, giving zero."], ["沿等相位线向两个方向走都不改相位；内积不必为正。", "Either direction along a wavefront preserves phase; the dot product is not positive."]];
  const [focus, limitQuestion, limitAnswer] = [["选同一条等相位线，沿线移一点，再看箭头 k 的垂直方向。", "Choose one equal-phase line, move along it, and compare the normal arrow k."], ["图中的等相位线是三维波面的二维截面吗？", "Is the equal-phase line a 2D section of a 3D wavefront?"], true];
  Object.assign(deepLab, { focus, limitQuestion, limitAnswer });
  window.OpticsDeepLabs["1.2.3"] = deepLab;
})();

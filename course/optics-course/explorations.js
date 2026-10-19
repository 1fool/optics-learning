/* Short predictions tied to the existing, section-specific diagrams.
   [Chinese, English] pairs. These are not formal quiz questions. */
"use strict";
window.OpticsExplorations = {
  "1.1": {
    ask: ["增大图中变化幅度，两组环绕关系会怎样？", "Increase the variation strength. What happens to the two circulating-field sketches?"],
    choices: [["只有电场先变化，磁场随后才动", "Only E changes first; B follows later"], ["两组局部耦合同时更明显", "Both local couplings become more prominent together"], ["其中一组必须消失", "One of the two couplings must vanish"]], answer: 1,
    try: ["调“变化幅度”，比较左右两幅，而不是寻找先后顺序。", "Change variation strength and compare both panels, not their imagined order in time."],
    why: ["图只演示同一电磁系统中的两条局部规则；增大示意幅度不会规定电场先于磁场。", "These are two local rules in one electromagnetic system. Increasing a schematic amplitude does not put E before B."]
  },
  "1.2.1": {
    ask: ["保持脉冲宽度，切换传播方向后，同一峰会往哪里移动？", "Keep pulse width fixed and reverse direction. Where does the same peak move?"],
    choices: [["只改变高度，不改变方向", "Only its height changes"], ["始终向 +z", "Always toward +z"], ["改为向 −z", "It moves toward −z"]], answer: 2,
    try: ["切换方向并播放或单看图上的 z∓vt 标签；浅线是起始位置。", "Switch direction and watch the pulse or compare its z∓vt label; the pale curve is its initial position."],
    why: ["保持 z+vt 不变时，t 增大要求 z 减小；改变自变量的号才改变传播方向，不是改变峰值。", "Holding z+vt constant as t grows requires z to fall. The sign in the argument changes direction, not peak height."]
  },
  "1.2.2": {
    ask: ["固定模型波长 λ，提高相速度 v，固定位置的周期 T 如何变化？", "At fixed model wavelength λ, increase phase speed v. What happens to the period T at one position?"],
    choices: [["变短", "It gets shorter"], ["不变", "It stays the same"], ["变长", "It gets longer"]], answer: 0,
    try: ["保持波长滑块不动，只调速度，对比上、下两条波形的刻度。", "Keep wavelength fixed; change only speed and compare the spatial and temporal plots."],
    why: ["固定 λ 时 T=λ/v。这里两滑块是教学模型参数，不能把改变 v 当成同一束光跨界面。", "At fixed λ, T=λ/v. These are model controls; changing v here is not a beam crossing an interface."]
  },
  "1.2.3": {
    ask: ["旋转传播方向 k，等相位线与 k 的夹角会怎样？", "Rotate propagation direction k. What happens to the angle between k and equal-phase lines?"],
    choices: [["跟着变成平行", "They become parallel"], ["仍然垂直", "They remain perpendicular"], ["波面不随 k 转动", "The lines do not rotate with k"]], answer: 1,
    try: ["调传播角，看一条等相位线和箭头是否一起转动。", "Rotate the direction control and follow one equal-phase line and the arrow."],
    why: ["同一时刻相位不变的位移满足 k·Δr=0；因此平面波波面法向是 k。", "A displacement along a constant-phase line obeys k·Δr=0 at fixed time; k is its normal."]
  },
  "1.2.4": {
    ask: ["只改变初相位 φ₀，实场投影与复相量长度分别怎样？", "Change only initial phase φ₀. What changes in the real projection and phasor length?"],
    choices: [["投影改变，长度保持", "Projection changes; length stays fixed"], ["两者都归零", "Both become zero"], ["长度改变，投影保持", "Length changes; projection stays fixed"]], answer: 0,
    try: ["固定振幅，只转相位，比较箭头长度与实轴上的投影。", "Hold amplitude fixed, rotate phase and compare arrow length with its real-axis projection."],
    why: ["乘上单位模的相位因子只转动复相量；真实余弦场取它的实部，投影因此变化。", "A unit-magnitude phase factor rotates the phasor without changing its length; the physical cosine is its real projection."]
  },
  "1.2.5": {
    ask: ["固定两观察点间距，把波长调短，两点的空间相位差通常怎样？", "At fixed separation, shorten wavelength. How does the spatial phase difference change?"],
    choices: [["一定归零", "It must vanish"], ["保持不变", "It stays fixed"], ["按 2πΔz/λ 增大（显示可绕圈）", "It grows as 2πΔz/λ (the display may wrap)"]], answer: 2,
    try: ["固定相位滑块，调波长并比较相邻位置的相量。", "Hold the phase control fixed; change wavelength and compare phasors at nearby positions."],
    why: ["复振幅的空间相位含 kz，k=2π/λ；图上的角度绕过整圈会重复，但未取模的相位差仍随 1/λ 增大。", "Spatial phase contains kz with k=2π/λ. A displayed arrow repeats every turn, while the unwrapped phase difference grows as 1/λ."]
  },
  "1.2.6": {
    ask: ["图中固定模型波长、提高 n 后，若 E 不变，vB 的关系要求 B 怎样？", "In this fixed-model-wavelength figure, raise n. If E is unchanged, what happens to B from E=vB?"],
    choices: [["B 更大", "B becomes larger"], ["B 更小", "B becomes smaller"], ["E 与 B 必须平行", "E and B must become parallel"]], answer: 0,
    try: ["调 n，再拖动画布或用方向键旋转，确认 E、vB 与传播方向的正交关系。", "Change n, then drag or use arrow keys to inspect the perpendicular E, vB and propagation directions."],
    why: ["在非磁性均匀介质的平面波模型里 v=c/n、E=vB。图画的是 vB 的同比例长度，不是以 T 为单位的 B 原值。", "For this plane-wave model v=c/n and E=vB. The diagram scales vB, not the unscaled magnetic field in tesla."]
  },
  "1.3.2": {
    ask: ["离轴点稍微移开，幅度几乎不变时，路差引起的相位还能明显变化吗？", "Move a little off axis. Can phase change appreciably even when amplitude is nearly unchanged?"],
    choices: [["不能，两者总同步", "No, amplitude and phase always track"], ["可以，波长很短使小路差也重要", "Yes, a tiny path difference can matter at short wavelengths"], ["只有吸收才会改变相位", "Only absorption can change phase"]], answer: 1,
    try: ["调离轴距离，分别看 Δr 和 Δφ/2π；相量显示的是取模后的方向。", "Change off-axis distance; compare Δr with Δφ/2π. The phasor direction wraps after full turns."],
    why: ["相位差是 2πΔr/λ。即使 z₀=1 m、ρ 仅为毫米量级，短波长仍可把微米路差放大成多个周期。", "The phase difference is 2πΔr/λ. With z₀=1 m and millimetre-scale ρ, a micrometre path difference can span many short-wavelength cycles."]
  },
  "1.3.3": {
    ask: ["远场中距离加倍，理想线源与点源的场振幅谁下降得更慢？", "In the far field, double distance. Which field amplitude falls more slowly: ideal line or point source?"],
    choices: [["点源", "Point source"], ["一样快", "They fall equally fast"], ["线源", "Line source"]], answer: 2,
    try: ["调到 r/r₀=2，比较两条幅度条；不要把强度律当幅度律。", "Set r/r₀=2 and compare the amplitude bars, not intensity laws."],
    why: ["柱面远场 A∝1/√r，球面 A∝1/r；加倍距离分别为 1/√2 与 1/2。柱面式需要 kr≫1。", "Cylindrical far-field A∝1/√r, spherical A∝1/r: at twice the distance these are 1/√2 and 1/2. The cylindrical form assumes kr≫1."]
  },
  "1.4.1": {
    ask: ["把归一化谱图从热光源切到窄带激光，能据峰高断定谁的总功率大吗？", "Switch the normalized spectra from thermal to narrowband laser. Can peak height tell which source has more total power?"],
    choices: [["不能，这里只比较谱形", "No, these plots compare shapes only"], ["能，窄峰一定更大", "Yes, a narrow peak must have more power"], ["能，宽谱一定更大", "Yes, a broad spectrum must have more power"]], answer: 0,
    try: ["轮流选三类光源，比较宽背景、放大的双线与窄谱线。", "Cycle through the three sources: broad background, magnified doublet and narrow line."],
    why: ["纵轴分别归一化，峰宽也作了示意放大；本图没有相同标度的谱功率密度，不能积分比较总功率。", "The plots are normalized separately and line widths are exaggerated. There is no common spectral-power scale from which to integrate total power."]
  },
  "1.4.2": {
    ask: ["辐射远场的偶极轴上 ψ=0°，光强与侧向 ψ=90° 相比怎样？", "On the dipole axis ψ=0° in the radiation far field, how does intensity compare with ψ=90°?"],
    choices: [["轴上最强", "Strongest on axis"], ["轴上辐射项为零，侧向最强", "Far-field radiation vanishes on axis, strongest sideways"], ["两处相同", "Equal at both directions"]], answer: 1,
    try: ["把方向调到 0° 与 90°，读两条分别归一化的幅度、强度条。", "Compare 0° and 90° with separately normalized amplitude and intensity bars."],
    why: ["远场强度 ∝sin²ψ；轴向零点不代表偶极子的所有近场项都消失。", "Far-field intensity is proportional to sin²ψ. The axial radiation null does not erase every near-field term."]
  },
  "1.4.3": {
    ask: ["真空单色平面波的 E₀ 加倍，平均能流 I 会变成几倍？", "Double E₀ for a monochromatic plane wave in vacuum. How does mean energy flux I change?"],
    choices: [["两倍", "Twice"], ["不变", "Unchanged"], ["四倍", "Four times"]], answer: 2,
    try: ["将 E₀ 从 5 调到 10 V/m，比较显示的 I；不要拿归一化曲线高度读物理单位。", "Change E₀ from 5 to 10 V/m and compare the displayed I; normalized curve heights are not physical units."],
    why: ["I=E₀²/(2Z₀)；瞬时 S 与 cos² 同号，周期平均为峰值的一半。", "I=E₀²/(2Z₀). Instantaneous S follows cos² and the cycle mean is half the peak."]
  },
  "1.4.4": {
    ask: ["把假定相干时间 τc 调大，在固定真空速度下，相干长度估计怎样？", "Increase assumed coherence time τc at fixed vacuum speed. What happens to the coherence-length estimate?"],
    choices: [["变短", "It decreases"], ["按 cτc 变长", "It grows as cτc"], ["这个图直接测出了真实线宽", "The plot measures a real linewidth"]], answer: 1,
    try: ["调 τc 和相位扰动，比较波列的平滑包络；它们是人为设定的示意参数。", "Adjust τc and phase disturbance and inspect the train envelopes; both are assumed schematic parameters."],
    why: ["在给定传播速度下，相关持续越久，对应的传播距离估计越长。图未从真实随机场拟合 τc，也不测线宽。", "At fixed speed a longer assumed correlation time means a longer propagation distance. The diagram neither fits τc from a stochastic field nor measures linewidth."]
  },
  "1.5": {
    ask: ["无自由面电荷时，ε₂/ε₁ 增大，法向 E₂ 相对 E₁ 怎样？", "With no free surface charge, increase ε₂/ε₁. How does normal E₂ compare with E₁?"],
    choices: [["E₂ 不变", "E₂ stays fixed"], ["E₂ 更大", "E₂ grows"], ["E₂ 更小，但法向 D 连续", "E₂ shrinks while normal D remains continuous"]], answer: 2,
    try: ["调介电常数比，读 E₁ₙ、E₂ₙ；再看小柱和小回路各约束哪个分量。", "Change permittivity ratio and read E₁ₙ and E₂ₙ; compare the pillbox and loop constraints."],
    why: ["σf=0 给 ε₁E₁ₙ=ε₂E₂ₙ，而切向 E 才连续；不意味着整个 E 向量连续。", "For σf=0, ε₁E₁ₙ=ε₂E₂ₙ, while tangential E is continuous; the entire E vector need not be."]
  },
  "1.6.1": {
    ask: ["固定 n₁=1，令 n₂>1 并增大入射角，折射角相对入射角怎样？", "With n₁=1 and n₂>1, raise incidence. How does refraction angle compare with incidence?"],
    choices: [["更小、更靠近法线", "Smaller, closer to the normal"], ["更大、更远离法线", "Larger, farther from the normal"], ["两角恒等", "Always equal"]], answer: 0,
    try: ["保持 n₂=1.5 调入射角；然后调 n₂<1，观察有实传播折射角的边界。", "Hold n₂=1.5 and vary incidence; then try n₂<1 and locate the real-refraction boundary."],
    why: ["界面切向波数匹配：n₁sinθ₁=n₂sinθ₂。n₂ 较大时 θ₂ 较小；全反射时不能画实传播折射光线。", "Tangential wavevector matching gives n₁sinθ₁=n₂sinθ₂. Larger n₂ gives smaller θ₂; in total internal reflection there is no real propagating refracted ray."]
  },
  "1.6.2": {
    ask: ["菲涅耳曲线的负 rₛ 是负反射功率吗？", "Does a negative Fresnel rₛ represent negative reflected power?"],
    choices: [["是，能量从界面倒流", "Yes, energy flows backward through the surface"], ["是，说明光强被抵消", "Yes, intensity is cancelled"], ["不是，它是带基底约定的场振幅符号", "No, it is a signed field amplitude in a specified basis"]], answer: 2,
    try: ["调角度与 n₂，分开追踪四条 r/t 场系数曲线。", "Change angle and n₂, tracing the four r/t field-coefficient curves separately."],
    why: ["r、t 是场振幅比；正负要与 s/p 箭头基底一起读。能量比还需平方及法向能流因子。", "r and t are field-amplitude ratios; signs depend on s/p basis arrows. Power ratios additionally require squares and normal-flux factors."]
  },
  "1.6.3": {
    ask: ["高折射率到低折射率时，临界角外的阴影区能继续用实数 r 曲线解释吗？", "From high to low index, can the shaded region beyond the critical angle be interpreted by real-valued r curves?"],
    choices: [["不能；反射有复相移", "No; reflection involves complex phase"], ["能，直接令所有 r=+1", "Yes; set every r=+1"], ["能，把折射角画到 100°", "Yes; draw a 100° refracted ray"]], answer: 0,
    try: ["先选 1→1.5 找 p 零点，再选 1.5→1 找临界边界；不要混为一个角。", "First find the p zero for 1→1.5, then the critical boundary for 1.5→1; they differ."],
    why: ["布儒斯特零点与全反射边界来源不同。临界角以上无实传播折射角；反射系数模为 1，但相位不能硬写为 +1。", "The Brewster zero and total-reflection boundary have different causes. Above critical angle there is no real propagating refracted angle; reflection has unit magnitude but nontrivial phase."]
  },
  "1.6.4": {
    ask: ["在无吸收界面，s 与 p 各自的 R+T 应怎样？", "At a lossless interface, what should R+T be for each of s and p?"],
    choices: [["等于场系数 r+t", "Equal the field-coefficient sum r+t"], ["各自等于 1", "Equal 1 for each channel"], ["随角度可大于 1", "Can exceed 1 with angle"]], answer: 1,
    try: ["拖动角度，分别读 s、p 两行能量账本；每行用本通道入射功率归一。", "Vary angle; inspect both s and p budgets, each normalized to its own incident-channel power."],
    why: ["无吸收时同一界面上的法向功率守恒。透射 T 含折射率与 cosθ 的通量因子，不等于 t 或 t²。", "Mean normal power is conserved across the same lossless surface. T contains refractive-index and cosθ flux factors; it is not simply t or t²."]
  },
  "1.6.5": {
    ask: ["自然光在布儒斯特角反射光完全 s 偏振，是否意味着全部入射能量反回？", "At Brewster incidence, unpolarized light reflects as pure s. Does all incident power return?"],
    choices: [["不；方向纯度与返回比例不同", "No; polarization purity differs from returned power"], ["是；完全偏振就是 100% 反射", "Yes; full polarization means 100% reflection"], ["s 与 p 都必须消失", "Both s and p must vanish"]], answer: 0,
    try: ["在 θB≈56.31° 附近读 Rp、Rs、Dᵣ 与总 R，再偏离这个角度比较。", "Near θB≈56.31°, compare Rp, Rs, Dᵣ and total R, then move away."],
    why: ["此处 Rp=0 而 Rs>0；反回的部分只有 s，所以偏振度可为 1，但总返回功率仅约 7.40%。纯 p 入射时零反射光没有偏振方向。", "Here Rp=0 while Rs>0. The returned portion is pure s, yet total reflected power is only about 7.40%. For pure-p incidence, a zero reflected beam has no polarization direction."]
  }
};

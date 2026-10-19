/* English companion to chapter-01.js. Keep the same section/block/question order. */
(() => {
  const translations = [
    {
      title: "The electromagnetic nature of light",
      overview: "Start with Maxwell's four equations, constitutive relations, and the source-free wave equation. Distinguish E, B, D, and H before interpreting light as an electromagnetic wave.",
      bridge: { previous: "This is the starting point: learn the fields used to describe light.", current: "Combine Maxwell's equations with material assumptions to obtain a wave equation and a propagation speed.", next: "With that equation in hand, §1.2.1 examines plane-wave solutions and their directions." },
      goals: ["Explain the role of each Maxwell equation", "Derive the electric-field wave equation from curl equations", "Distinguish vacuum speed c from medium speed v"],
      symbols: [["E", "electric field intensity", "V/m"], ["B", "magnetic flux density", "T"], ["D", "electric displacement field", "C/m²"], ["H", "magnetic field intensity", "A/m"], ["ε, μ", "absolute permittivity and permeability", "F/m, H/m", "Example: εᵣ=2.25, μᵣ=1"], ["ρ, J", "free-charge and free-current densities", "C/m³, A/m²", "Derivation: ρ=0, J=0"], ["c, v", "vacuum and medium phase speeds", "m/s", "c≈3.00×10⁸; example v≈2.00×10⁸"]],
      blocks: [
        { label: "Build the language", title: "Four equations, not four independent waves", text: [
          "∇·D=ρ identifies sources of electric flux; ∇·B=0 rules out isolated magnetic charge. Faraday's law, ∇×E=−∂B/∂t, relates a changing magnetic flux to a circulating electric field. The Ampère–Maxwell law, ∇×H=J+∂D/∂t, includes both conduction current and displacement current.",
          "Integral forms concern flux through a closed surface or circulation around a closed curve; differential forms state local relations near a point. Both appear on book pp. 3–4. E and B are fields, whereas D and H also encode a medium's response: do not interchange them."
        ], note: "Orient a closed contour and its spanning surface by the right-hand rule. The figure illustrates coupled curls, not a time-ordered cycle in which E first creates B and B then creates E." },
        { label: "State the assumptions", title: "Constitutive relations close the system", text: [
          "For an ideal linear, homogeneous, isotropic medium, D=εE and B=μH. Here ε and μ are material parameters; in vacuum they become ε₀ and μ₀. A conducting material is often modeled by J=σE, but the lossless-wave derivation below takes ρ=0 and J=0.",
          "If ε or μ varies with position or frequency, or if the medium is anisotropic or appreciably absorbing, the scalar parameters and simple speed relation below cannot be used unchanged."
        ] },
        { label: "Derivation 01", title: "From curl equations to the wave equation", steps: [
          ["Assume", "A homogeneous, source-free, nonconducting medium: ρ=0, J=0, with constant ε and μ. Thus ∇×H=ε∂E/∂t and ∇·E=0."],
          ["Take another curl", "Apply curl to ∇×E=−∂B/∂t and use B=μH to obtain ∇×(∇×E)=−με∂²E/∂t²."],
          ["Simplify", "The vector identity ∇×(∇×E)=∇(∇·E)−∇²E, together with ∇·E=0, reduces the left side to −∇²E."],
          ["Result and coefficient", "Both sides carry a minus sign; cancelling gives ∇²E−εμ∂²E/∂t²=0. Write the coefficient of the second time derivative as 1/v²: define 1/v²=εμ. With positive ε, μ and positive speed, v=1/√(εμ). This speed follows from the coefficient, not from the ∇² symbol alone."],
          ["Restrict to one axis", "For one component of E, ∇²E adds its second spatial derivatives in x, y and z. If that component does not vary with x or y, those terms vanish and only ∂²E/∂z² remains. The next section tests a shape moving along z."]
        ] },
        { label: "Worked example", title: "How fast does one frequency travel in another medium?", text: [
          "Let an ideal, nonmagnetic, nondispersive medium have εᵣ=2.25 and μᵣ=1. Then v=c/√(εᵣμᵣ)=c/1.5≈2.00×10⁸ m/s, and n=c/v=1.5. Light does not always travel at c inside matter.",
          "Visible light is only one part of the electromagnetic spectrum. The wave equation permits electromagnetic disturbances to propagate; it does not make all electromagnetic waves identical in color, frequency, or material response."
        ], note: "This example assumes parameters independent of frequency. Real materials may disperse or absorb light." }
      ],
      questions: [
        { stem: "In a homogeneous source-free medium, which term remains in the Ampère–Maxwell law after J=0?", choices: ["Displacement-current term ∂D/∂t", "Free current J", "Magnetic-charge density"], explain: "The original equation is ∇×H=J+∂D/∂t. Setting J=0 removes conduction current only. Time-varying D still contributes to the curl; together with Faraday's law, it enables the propagating wave equation.", whyOther: "J was explicitly set to zero, while magnetic-charge density is not a term in this equation. 'Source-free' does not mean every field or time derivative vanishes." },
        { stem: "Why does ∇×(∇×E) reduce to −∇²E in this derivation?", choices: ["Because ∇·E=0 and the vector identity applies", "Because E itself must vanish", "Because every medium has ε=ε₀"], explain: "Use ∇×(∇×E)=∇(∇·E)−∇²E. With D=εE, ∇·D=0 and a constant nonzero ε in a homogeneous source-free medium, ∇·E=0. Only −∇²E remains.", whyOther: "Zero divergence does not imply a zero field: a transverse plane wave is a counterexample. ε may be the medium's value, not ε₀; being a nonzero constant is what matters here." },
        { stem: "For an ideal nonmagnetic medium with εᵣ=4 and μᵣ=1, what is the approximate propagation speed?", choices: ["c", "c/2", "2c"], explain: "v=1/√(εμ)=c/√(εᵣμᵣ)=c/√4=c/2. Since c=1/√(ε₀μ₀), relative material parameters give a quick speed comparison.", whyOther: "c treats the medium as vacuum; 2c incorrectly places the square root in the numerator. The result assumes a homogeneous, linear, lossless, nondispersive model." }
      ]
    },
    {
      title: "Plane-wave solutions of the wave equation",
      overview: "Reduce the three-dimensional problem to propagation along z. Identify right- and left-traveling waves and the harmonic special case. The sign in z−vt determines the direction.",
      bridge: { previous: "§1.1 produced a wave equation and speed v, but not a particular waveform.", current: "Solve the one-dimensional equation and use z−vt and z+vt to identify traveling-wave directions.", next: "§1.2.2 selects periodic harmonic waves from these solutions and defines wavelength and period." },
      goals: ["Explain the directions of f(z−vt) and g(z+vt)", "Verify a cosine solution by substitution", "Explain why equal-phase surfaces are planes"],
      symbols: [["z, t", "position and time", "m, s"], ["v", "phase speed in this ideal medium", "m/s"], ["E₀, B₀", "electric and magnetic amplitudes", "V/m, T"], ["k, ω", "wavenumber and angular frequency", "rad/m, rad/s"]],
      blocks: [
        { label: "Start in one dimension", title: "Why z−vt?", text: [
          "The one-dimensional wave equation admits a right-traveling shape f(z−vt) and a left-traveling shape g(z+vt). Track a marked point on the right-traveling pulse: z−vt=C. After Δt, its position increases by vΔt, so it moves toward +z.",
          "Because the equation is linear, the two traveling waves can be superposed. The diagram first uses a localized pulse to show direction; the monochromatic cosine wave in the book is a special right-traveling shape."
        ] },
        { label: "Derivation 02", title: "Verify that a cosine is a solution", steps: [
          ["State the equation", "The vector wave equation derived in §1.1 reduces, for an electric-field component varying only with z, to ⟦∂²E/∂z²−(1/v²)∂²E/∂t²=0⟧. Here v is the phase speed in this ideal medium; we do not differentiate v."],
          ["Propose a field", "Let φ=kz−ωt and ⟦E(z,t)=E₀cosφ⟧, with constant nonzero E₀ and k>0, ω>0. We now check it against the equation above."],
          ["Differentiate twice in z", "Hold t fixed: ⟦∂E/∂z=−kE₀sinφ⟧; differentiating again gives ⟦∂²E/∂z²=−k²E₀cosφ=−k²E⟧."],
          ["Differentiate twice in t", "Hold z fixed: ⟦∂E/∂t=+ωE₀sinφ⟧; differentiating again gives ⟦∂²E/∂t²=−ω²E₀cosφ=−ω²E⟧."],
          ["Substitute and cancel", "Put both second derivatives back into the first equation: ⟦−k²E−(1/v²)(−ω²E)=(−k²+ω²/v²)E=0⟧. For a nonzero wave to satisfy it at every point and time, ⟦ω²=v²k²⟧; because k, ω and v are positive, ⟦ω/k=v⟧."],
          ["Read the wavefront", "At fixed time, fixed phase ⟦kz−ωt=C⟧ gives constant z. In three dimensions this is an entire plane perpendicular to the z-axis."]
        ] },
        { label: "Avoid a misconception", title: "'Plane' describes the wavefront, not a field confined to a sheet", text: [
          "An ideal plane wave has the same phase everywhere on each plane perpendicular to propagation. It extends infinitely in the mathematical model. The diagram shows a local cross-section, not a physical beam with infinite energy.",
          "Later Maxwell's equations constrain E₀ and B₀. Writing cosines with matching phases here does not mean their amplitudes are freely independent."
        ] }
      ],
      questions: [
        { stem: "A pulse keeps the shape f(z−vt). Where does a marked point move after Δt?", choices: ["Toward +z by vΔt", "Toward −z by vΔt", "It stays fixed"], explain: "Follow a fixed feature of the pulse: z−vt=C, or z=C+vt. Increasing t by Δt increases z by vΔt.", whyOther: "Motion toward −z corresponds to z+vt=C. 'Fixed' confuses a stationary observation point with a feature moving with the waveform. Here v>0." },
        { stem: "Substituting E₀cos(kz−ωt) into the one-dimensional wave equation gives which relation?", choices: ["ω=vk", "ω=k/v", "ω is independent of k"], explain: "The second derivatives are −k²E and −ω²E. Substitution into ∂²E/∂z²−(1/v²)∂²E/∂t²=0 yields −k²+ω²/v²=0; for positive k and ω, ω=vk.", whyOther: "ω=k/v moves the speed incorrectly and has the wrong units. Independent ω and k would not generally satisfy the wave equation in this medium." },
        { stem: "At fixed time, what is an equal-phase surface of a plane wave traveling along +z?", choices: ["A plane with constant z", "A single point on the z-axis", "A plane necessarily parallel to the z-axis"], explain: "Set kz−ωt=C. For fixed t, z=(C+ωt)/k is constant while x and y can vary, forming a plane perpendicular to z.", whyOther: "A single point ignores all transverse x,y positions. A plane parallel to z reverses the relation between wavefront and propagation direction. A line in a diagram is only a section of the full plane." }
      ]
    },
    {
      title: "Harmonic plane waves",
      overview: "A cosine wave has a spatial scale λ and a temporal scale T. The quantities k and ω express those scales in angular units. Compare space and time plots rather than confusing wavelength with period.",
      bridge: { previous: "§1.2.1 established the cosine as a traveling-wave solution; now give it exact spatial and temporal scales.", current: "Relate λ, T, ν, k, and ω, and find propagation speed by following a fixed phase.", next: "§1.2.3 generalizes kz for propagation in any direction to k·r." },
      goals: ["Distinguish the units of λ, T, ν, k, and ω", "Derive v=λν from a fixed phase", "Work through a numerical example with physical units"],
      symbols: [["λ", "distance between adjacent in-phase points", "m", "Example: λ₀=600 nm"], ["T", "time for one cycle at a fixed point", "s", "Example: ≈2.00×10⁻¹⁵"], ["ν", "frequency, 1/T", "Hz", "Example: ≈5.00×10¹⁴"], ["k", "wavenumber 2π/λ", "rad/m", "Example: k₀≈1.05×10⁷"], ["ω", "angular frequency 2π/T", "rad/s", "Example: ≈3.14×10¹⁵"]],
      blocks: [
        { label: "Two views", title: "One wave, two ways to sample it", text: [
          "At fixed t, observe E as z varies: after a distance λ the phase advances by 2π. At fixed z, observe E as t varies: after T the phase decreases by 2π and the field returns to the same state. The two small plots illustrate these respective samples.",
          "λ measures length; T measures time. Peak separation in a still spatial picture does not by itself reveal frequency unless propagation speed is also known."
        ] },
        { label: "Derivation 03", title: "Why is v=λ/T?", steps: [
          ["Choose a crest", "Keep its phase φ=kz−ωt constant."],
          ["Follow it", "Differentiation gives k dz−ω dt=0, hence dz/dt=ω/k."],
          ["Use definitions", "ω/k=(2π/T)/(2π/λ)=λ/T=λν."]
        ] },
        { label: "Example with units", title: "Monochromatic 600 nm light in vacuum", text: [
          "λ₀=600 nm=6.00×10⁻⁷ m. Take c≈3.00×10⁸ m/s. Then ν=c/λ₀≈5.00×10¹⁴ Hz and T=1/ν≈2.00×10⁻¹⁵ s.",
          "Also ⟦k₀=2π/λ₀≈1.05×10⁷⟧ rad/m and ⟦ω=2πν≈3.14×10¹⁵⟧ rad/s. Angular frequency differs from ordinary frequency by 2π: do not label rad/s as Hz."
        ] },
        { label: "Scope", title: "What changes on entering another medium?", text: [
          "At an ideal stationary interface, the transmitted frequency normally equals the incident frequency. If speed changes to v, wavelength changes to λ=v/ν. In a dispersive medium, v can depend on frequency.",
          "The diagram illustrates λ and T using scaled model units, not a real-time animation of approximately 10¹⁴ cycles per second."
        ] }
      ],
      questions: [
        { stem: "If λ doubles while propagation speed v stays fixed, what happens to frequency ν?", choices: ["It doubles", "It halves", "It stays unchanged"], explain: "From v=λν, with fixed v we have ν=v/λ. Doubling λ halves ν, while T=1/ν doubles. There are fewer crests per unit length, but the propagation direction does not change.", whyOther: "Doubling confuses direct and inverse proportionality. 'Unchanged' would require v also to change in just the right way, contrary to the stated fixed-v condition." },
        { stem: "For vacuum light with λ₀=500 nm, which frequency is closest?", choices: ["6×10¹⁴ Hz", "6×10⁸ Hz", "6×10⁻¹⁴ Hz"], explain: "Convert first: 500 nm=5×10⁻⁷ m. Then ν=c/λ₀≈(3×10⁸)/(5×10⁻⁷)=6×10¹⁴ Hz. The exponent follows from 8−(−7)=15 before dividing 3 by 5.", whyOther: "6×10⁸ resembles the order of the speed, not the frequency. 6×10⁻¹⁴ mistakenly treats division by 10⁻⁷ as multiplication by 10⁻⁷. Convert everything to meters and seconds first." },
        { stem: "At a stationary medium interface, frequency stays fixed but speed falls. What happens to wavelength inside?", choices: ["It gets shorter", "It gets longer", "It must remain unchanged"], explain: "At the same frequency ν, λ=v/ν. A smaller v therefore means a shorter λ; a changing wavelength does not require the light source to change its frequency at the interface.", whyOther: "Longer reverses the proportionality between v and λ. Unchanged wavelength confuses frequency continuity with wavelength continuity. This describes the usual stationary-interface case." }
      ]
    },
    {
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
    },
    {
      title: "Complex representation of the wave function",
      overview: "Complex notation packages sine and cosine together, but the physical electric field remains the real part. A rotating phasor and its horizontal projection make Euler's formula tangible.",
      bridge: { previous: "§1.2.3 supplied the phase k·r−ωt for any direction, but differentiating trigonometric functions repeatedly is cumbersome.", current: "Represent the real field as the real part of a complex exponential to simplify phase and derivatives.", next: "§1.2.5 separates the complex wave into a spatial amplitude and a shared time factor." },
      goals: ["Recover the physical electric field using Euler's formula", "Recognize the exp[i(k·r−ωt)] sign convention used here", "Understand why derivatives become factors ik or −iω"],
      symbols: [["i", "imaginary unit, i²=−1", "dimensionless"], ["Ẽ", "complex representation, not directly measurable", "V/m", "Example: 2 exp(iπ/3)"], ["Re", "real-part operator", "operator", "Example: Re(Ẽ)=1 V/m"], ["φ", "phase k·r−ωt", "rad", "Example: π/3"]],
      blocks: [
        { label: "Principle", title: "The phasor's projection is a cosine", text: [
          "Euler's formula is exp(iφ)=cosφ+i sinφ. For a real amplitude vector A, Re[A exp(iφ)]=A cosφ. The imaginary part helps calculations but is not a second physical electric field.",
          "Our convention uses the spatial factor exp(i k·r) and time factor exp(−iωt). The opposite overall convention is also valid if used consistently; do not mix the two."
        ] },
        { label: "Derivation 05", title: "Why does complex notation save work?", steps: [
          ["Differentiate in space", "The gradient of exp[i(k·r−ωt)] is i k exp[i(k·r−ωt)]."],
          ["Differentiate in time", "The time derivative of the same factor is −iω exp[i(k·r−ωt)]."],
          ["Return to a physical quantity", "Solve linear differential equations using complex quantities, then take Re to recover the time-dependent physical field."]
        ], note: "Here φ=k·r−ωt. For a vector field, write ∇×Ẽ=i k×Ẽ for the curl; do not treat the vector-field gradient as an ordinary vector." },
        { label: "Worked example", title: "What is the field at phase φ=π/3?", text: [
          "For a scalar component with amplitude 2 V/m, the complex expression is ⟦2 exp(iπ/3)=1+i√3⟧ V/m. Its real part is the physical component 1 V/m.",
          "A complex representation is not an extra physical light beam. Whenever a physical field is requested, take the real part."
        ] }
      ],
      questions: [
        { stem: "If Ẽ=2 exp(iπ/3) V/m, what is the corresponding physical field component?", choices: ["1 V/m", "2 V/m", "√3 V/m"], explain: "Expand exp(iπ/3)=cos(π/3)+i sin(π/3)=1/2+i√3/2. Multiplying by 2 gives a real part of 1 V/m.", whyOther: "2 is the magnitude of the complex amplitude, not the instantaneous real field at this phase. √3 is the imaginary part. Phasor length and its horizontal and vertical projections differ." },
        { stem: "With the convention exp[i(kz−ωt)], what factor does time differentiation produce?", choices: ["+iω", "−iω", "+k"], explain: "The time-dependent exponent is −iωt. By the chain rule, ∂exp[i(kz−ωt)]/∂t=−iω exp[i(kz−ωt)].", whyOther: "+iω comes from the alternate exp(+iωt) time convention. k is a spatial wavenumber; it appears with spatial derivatives, not in place of ω for a time derivative." },
        { stem: "How should the imaginary part of a complex electric field Ẽ be understood?", choices: ["As another magnetic field", "As part of the calculation; the physical E is the real part", "It must always be zero"], explain: "The complex exponential stores cosine and sine together, simplifying derivatives and phase operations. Its imaginary part is generally nonzero; in this convention the physical field is Re(Ẽ).", whyOther: "B is a separate physical field constrained by Maxwell's equations, not the imaginary part of Ẽ. Nonzero imaginary components are useful for representing sine-phase behavior." }
      ]
    },
    {
      title: "Complex amplitude of a harmonic plane wave",
      overview: "Factor out the common time dependence and gather spatial phase and amplitude in A(r). Watch phasors at different positions rotate to understand what spatially varying complex amplitude means.",
      bridge: { previous: "§1.2.4 introduced complex waves whose exponential still contains both space and time.", current: "Extract exp(−iωt) so that A(r) carries spatial amplitude and phase.", next: "§1.2.6 substitutes the complex plane wave into Maxwell's equations to constrain field direction and magnitude." },
      goals: ["Distinguish constant A from spatial complex amplitude A(r)", "Separate space and time factors", "Compute the phase difference between points λ/4 apart"],
      symbols: [["A", "constant complex amplitude vector", "V/m"], ["A(r)", "complex amplitude including spatial phase", "V/m", "Phase difference π/2 over λ/4"], ["φ₀", "optional initial phase", "rad"], ["exp(−iωt)", "shared time factor", "dimensionless"]],
      blocks: [
        { label: "Separate variables", title: "An 'amplitude' may contain phase", text: [
          "Rewrite Ẽ=A exp[i(k·r−ωt)] as A(r)exp(−iωt), defining A(r)=A exp(i k·r). Constant A describes polarization and reference amplitude; A(r) also records phase arising from position.",
          "For one component, if A=A₀ exp(iφ₀), the physical field is A₀ cos(k·r−ωt+φ₀). The magnitude of a complex amplitude sets amplitude and its argument sets initial phase. Its magnitude does not decay along z in this ideal homogeneous lossless plane wave."
        ] },
        { label: "Derivation 06", title: "What happens a quarter-wavelength away?", steps: [
          ["Pick two points", "At the same time, choose z₁ and z₂=z₁+λ/4 along propagation."],
          ["Find phase difference", "Δφ=k(z₂−z₁)=(2π/λ)(λ/4)=π/2."],
          ["Compare phasors", "A(z₂)=A(z₁)exp(iπ/2)=iA(z₁), a 90° rotation in the complex plane."],
          ["Recover real fields", "One instantaneous real field is not automatically larger than the other. Insert the phase at that time, then take the real part."]
        ] },
        { label: "Common confusion", title: "Phase rotation is not amplitude growth", text: [
          "Multiplication by i rotates phase without changing magnitude. Absorption in a real material needs another model, such as a complex wavenumber; this ideal lossless model has no such decay.",
          "Complex amplitude is a tool for harmonic waves. It will be especially useful for superposition and interference."
        ] }
      ],
      questions: [
        { stem: "In Ẽ(r,t)=A(r)exp(−iωt), what does A(r) contain?", choices: ["The spatial factor exp(i k·r)", "The entire time factor exp(−iωt)", "All material boundary conditions"], explain: "By definition A(r)=A exp(i k·r); it collects spatial phase and a constant amplitude. The time factor exp(−iωt) has been factored out separately.", whyOther: "Including the time factor would make A(r) depend on time rather than position alone. One plane-wave expression does not automatically satisfy all specified boundary conditions." },
        { stem: "At the same time, how much does spatial phase change between two points λ/4 apart along propagation?", choices: ["π/2", "π", "2π"], explain: "Δφ=kΔz=(2π/λ)(λ/4)=π/2 rad, or 90°. The displacement is parallel to the wavevector; motion within an equal-phase plane would instead give zero phase difference.", whyOther: "π corresponds to λ/2; 2π to λ. Write k=2π/λ and multiply by the actual displacement rather than estimating from a sketch." },
        { stem: "What does A(z+λ/4)=iA(z) mean for an ideal lossless plane wave?", choices: ["Its magnitude grows fourfold", "Its phase rotates 90° while magnitude stays fixed", "Time runs backward"], explain: "i=exp(iπ/2) has magnitude one. Multiplication by i therefore rotates a complex phasor 90° but does not increase its magnitude. The real field varies with position after taking the real part.", whyOther: "Amplitude growth requires a factor whose magnitude exceeds one. The time direction is represented by exp(−iωt); shifting z by λ/4 is not reversing time." }
      ]
    },
    {
      title: "Properties of plane electromagnetic waves",
      overview: "Return to Maxwell's equations to show that E and B are transverse, mutually perpendicular, and in phase. Then use the medium speed to relate their amplitudes. Every perpendicularity has assumptions and a derivation.",
      bridge: { previous: "§1.2.5 constructed a complex plane wave; physics must still constrain field directions and amplitudes.", current: "Use Maxwell's equations to derive transversality, orientation, phase, and E₀/B₀=v.", next: "When studying superposition, polarization, or interference later, carry along the conditions under which these plane-wave results hold." },
      goals: ["Prove k·E=0 and k·B=0 separately", "Derive B=(1/ω)k×E from Faraday's law", "Distinguish E₀/B₀=v from the vacuum special case c"],
      symbols: [["k̂", "unit vector along propagation", "dimensionless"], ["E₀, B₀", "electric and magnetic amplitudes", "V/m, T", "Example: E₀=3; B₀≈1.00×10⁻⁸ (vacuum)"], ["v", "phase speed in this medium", "m/s", "Example: vacuum c≈3.00×10⁸; medium c/2"], ["H", "magnetic field intensity B/μ", "A/m"]],
      blocks: [
        { label: "Derivation 07", title: "Why are E and B transverse?", steps: [
          ["Insert a plane wave", "For exp[i(k·r−ωt)], the spatial ∇ in a divergence acts like i k."],
          ["Electric field", "With ∇·D=0, D=εE, and constant nonzero ε, we get iε k·E=0, hence k·E=0."],
          ["Magnetic field", "The equation ∇·B=0 similarly yields i k·B=0, or k·B=0."],
          ["Interpret", "Both E and B are perpendicular to the propagation direction k: the transverse-wave property of this ideal plane wave."]
        ] },
        { label: "Derivation 08", title: "Mutual perpendicularity, handedness, and phase", steps: [
          ["Start with curl", "Insert a complex plane wave into ∇×E=−∂B/∂t to get i k×E=iωB."],
          ["Cancel i", "B=(1/ω)k×E=(1/v)k̂×E, because |k|/ω=1/v."],
          ["Read direction", "The cross product makes B perpendicular to E and k. For E along +x and k along +z, z×x=y, so B is along +y."],
          ["Read phase", "Since 1/v is positive and real, corresponding physical fields reverse sign together and reach zero or extrema together: they are in phase."]
        ] },
        { label: "Derivation 09", title: "Amplitude ratio and energy-flow direction", text: [
          "Since E⊥k, |k̂×E|=|E|. Therefore B₀=E₀/v, or E₀/B₀=v. Only in vacuum, where v=c, may we write E₀=cB₀; do not insert c unchanged for a medium.",
          "For energy direction, H=B/μ, and E×H points along +k in this model. At a node where the instantaneous field vanishes, a zero vector has no defined direction. Use a nonzero location, the wavevector, or time-averaged energy flux to describe propagation."
        ] },
        { label: "Example with units", title: "What B corresponds to a 3 V/m electric amplitude?", text: [
          "In vacuum, B₀=E₀/c≈3/(3.00×10⁸)=1.00×10⁻⁸ T. In an ideal nonmagnetic medium with εᵣ=4 and μᵣ=1, v=c/2, so the same E₀=3 V/m gives B₀≈2.00×10⁻⁸ T.",
          "For comparable drawn lengths, the diagram shows vB rather than the numerical magnitude of B. Values measured in V/m and T cannot be drawn using a shared numerical scale."
        ], note: "These results assume a homogeneous, isotropic, linear, source-free, lossless monochromatic plane wave. Do not transfer every conclusion directly to inhomogeneous or absorbing media or to near fields." }
      ],
      questions: [
        { stem: "At a nonzero-field point, k points along +z and E along +x. Which way does B point?", choices: ["+y", "−y", "+z"], explain: "B=(1/v)k̂×E, with v>0. The right-handed cross product z×x=y, so B points +y, and E×B points +z. Half a cycle later E and B both reverse, without reversing propagation.", whyOther: "−y would make E×B point −z. +z would put B parallel to k and violate k·B=0. First use k×E, then check E×B." },
        { stem: "An ideal medium has v=c/2 and E₀=3 V/m. Which B₀ is closest?", choices: ["1×10⁻⁸ T", "2×10⁻⁸ T", "3 T"], explain: "Use B₀=E₀/v. With v≈1.50×10⁸ m/s, B₀≈3/(1.50×10⁸)=2×10⁻⁸ T.", whyOther: "1×10⁻⁸ T mistakenly uses vacuum speed c for this medium. 3 T copies the numerical value in V/m into tesla without accounting for dimensions or the speed factor." },
        { stem: "At a node where instantaneous E=B=0, can E×B be normalized to define a direction?", choices: ["Yes, it always equals +k̂", "No, the zero vector has no direction", "It can only equal −k̂"], explain: "At the node E×B=0, and the zero vector cannot be normalized. This does not prevent determining the wave's overall propagation from k, the moving phase, or E×H at nonzero points.", whyOther: "+k̂ ignores division by zero during normalization. −k̂ additionally confuses a field node with reverse propagation. The whole-wave model supplies a direction, not the zero vector at that instant." }
      ]
    }
  ];
/* CONTINUATION START */
translations.push(...[
  {
    "code": "1.3.1",
    "title": "The spherical-wave function",
    "pages": "12–13",
    "pdf": 22,
    "visual": "spherical",
    "overview": "Move from parallel wavefronts to a point source: phase travels radially, but amplitude cannot stay constant. Conservation of energy separates the 1/r and 1/r² laws.",
    "bridge": {
      "previous": "The ideal plane wave in §1.2 has no geometric spreading.",
      "current": "Build an outgoing scalar spherical wave and verify its three-dimensional wave equation.",
      "next": "§1.3.2 factors out time and studies complex amplitude on a plane."
    },
    "goals": [
      "Distinguish amplitude and intensity distance laws",
      "Identify outgoing spherical phase",
      "Recognize the source singularity and scalar-model limits"
    ],
    "symbols": [
      [
        "r",
        "radial distance from source",
        "m",
        "Example: 2 → 4"
      ],
      [
        "C",
        "radial amplitude constant",
        "V",
        "Example: 6 V; not itself a field amplitude"
      ],
      [
        "k, ω",
        "wavenumber, angular frequency",
        "rad/m, rad/s"
      ],
      [
        "P, I",
        "total power, intensity",
        "W, W/m²",
        "Example: P=1 W"
      ]
    ],
    "blocks": [
      {
        "label": "Geometry and model",
        "title": "Spherical phase does not imply isotropic amplitude",
        "eq": [
          {
            "text": "u(r,t)=\\frac{C}{r}\\cos(kr-\\omega t),\\qquad k=\\frac{\\omega}{v}",
            "tex": true
          }
        ],
        "text": [
          "Place the point source at the origin. A constant value of kr−ωt moves outward; at fixed time a continuous wavefront is a concentric sphere. Here u models a scalar field component, not a full vector electromagnetic solution.",
          "A real oscillating dipole radiates anisotropically; §1.4.2 introduces a sinψ factor. Spherical wavefronts alone do not imply an isotropic source."
        ],
        "note": "Scalar outgoing wave in a homogeneous isotropic nonabsorbing medium, for r>0. The origin contains the source and is excluded."
      },
      {
        "label": "Conservation derivation",
        "title": "The same power crosses a larger sphere",
        "eq": [
          {
            "text": "I=\\frac{P}{4\\pi r^2}",
            "tex": true,
            "ref": "isotropic-intensity"
          },
          {
            "text": "A(r)=\\frac{C}{r},\\qquad \\frac{I(r_2)}{I(r_1)}=\\left(\\frac{r_1}{r_2}\\right)^2",
            "tex": true
          }
        ],
        "steps": [
          [
            "Law used",
            "For steady isotropic radiation without absorption, the time-averaged outward power P through any sphere is equal: P=4πr²I."
          ],
          [
            "Find intensity first",
            "Quadrupling sphere area quarters the power per unit area, hence I is proportional to 1/r²."
          ],
          [
            "Then find amplitude",
            "At a fixed frequency in one medium, I is proportional to A². The positive envelope therefore scales as 1/r. Writing C/r keeps dimensions explicit rather than treating a unit distance as dimensionless."
          ]
        ]
      },
      {
        "label": "Term-by-term verification",
        "title": "Why the one-dimensional equation is insufficient",
        "eq": [
          {
            "text": "\\frac{1}{r^2}\\frac{\\partial}{\\partial r}\\left(r^2\\frac{\\partial u}{\\partial r}\\right)-\\frac{1}{v^2}\\frac{\\partial^2u}{\\partial t^2}=0",
            "tex": true
          }
        ],
        "steps": [
          [
            "Equation and conditions",
            "Use the three-dimensional scalar wave equation from §1.1. Under spherical symmetry for r>0, its Laplacian is radial, not simply a second radial derivative. Set φ=kr−ωt."
          ],
          [
            "First and second radial derivatives",
            "$u_r=-\\frac{C\\cos\\phi}{r^2}-\\frac{Ck\\sin\\phi}{r}$; $u_{rr}=\\frac{2C\\cos\\phi}{r^3}+\\frac{2Ck\\sin\\phi}{r^2}-\\frac{Ck^2\\cos\\phi}{r}$."
          ],
          [
            "First and second time derivatives",
            "$u_t=\\frac{C\\omega}{r}\\sin\\phi$ and $u_{tt}=-\\frac{C\\omega^2}{r}\\cos\\phi=-\\omega^2u$."
          ],
          [
            "Substitute each term",
            "The radial term is uᵣᵣ+(2/r)uᵣ. Its r⁻³ and r⁻²sinφ terms cancel, leaving −k²u. The equation becomes (−k²+ω²/v²)u=0, which holds for k=ω/v."
          ]
        ]
      },
      {
        "label": "Worked example",
        "title": "When distance doubles, what halves?",
        "text": [
          "For C=6 V, A=3 V/m at r=2 m and 1.5 V/m at r=4 m. In a separate isotropic-source example with P=1 W, the intensities are 0.01989 and 0.004974 W/m², a ratio of 1/4. C and P are independently specified examples, not parameters asserted to describe the same source."
        ]
      }
    ],
    "questions": [
      {
        "stem": "An ideal isotropic spherical wave travels from r to 3r. What are its amplitude and intensity ratios?",
        "choices": [
          "$\\frac{1}{3}$ and $\\frac{1}{9}$",
          "$\\frac{1}{9}$ and $\\frac{1}{3}$",
          "Both $\\frac{1}{3}$"
        ],
        "answer": 0,
        "explain": "Conservation of P=4πr²I gives an intensity ratio of 1/9. Since I is proportional to A² in the same medium, the amplitude ratio is 1/3. This is geometric spreading without absorption.",
        "whyOther": "The second choice swaps field and energy laws. The third forgets the amplitude square. A plane wave lacking geometric spreading does not justify constant amplitude for a point source.",
        "id": "1.3.1:q1"
      },
      {
        "stem": "Can the C/r solution be used directly at the source r=0?",
        "choices": [
          "Yes; the field is zero",
          "No; the source-free model is singular there",
          "Yes; change metres to centimetres"
        ],
        "answer": 1,
        "explain": "The derivation applies only in the source-free region r>0. The expression diverges at r=0; source size and source-field structure need separate treatment, rather than interpreting the singularity as a real infinite field.",
        "whyOther": "Zero field contradicts the C/r limit. Unit conversion cannot remove division by zero. The mathematical expression must be used within its stated domain.",
        "id": "1.3.1:q2"
      },
      {
        "stem": "How does a continuous equal-phase sphere of u=(C/r)cos(kr−ωt) move?",
        "choices": [
          "Inward at v",
          "It stays fixed",
          "Outward at ω/k"
        ],
        "answer": 2,
        "explain": "Track kr−ωt=constant. Differentiation gives k dr/dt−ω=0, so dr/dt=ω/k=v>0. The decreasing amplitude does not reverse phase propagation.",
        "whyOther": "An inward wave uses kr+ωt or an equivalent consistent convention. A stationary sphere confuses a fixed-time snapshot with following the same phase over time.",
        "id": "1.3.1:q3"
      }
    ]
  },
  {
    "code": "1.3.2",
    "title": "Complex amplitude of a spherical wave",
    "pages": "13–14",
    "pdf": 23,
    "visual": "sphericalPhase",
    "overview": "A complex amplitude stores both magnitude and spatial phase. Off-axis points on a receiving plane are farther from the source: they are weaker and have accumulated more phase.",
    "bridge": {
      "previous": "§1.3.1 supplies C/r and radial phase kr−ωt.",
      "current": "Write the exact distance on a plane and separate paraxial and local-plane approximations.",
      "next": "§1.3.3 turns to a line source and a different spreading dimension."
    },
    "goals": [
      "Factor spatial dependence out of the time-harmonic field",
      "Calculate distance to any point on a plane",
      "Interpret conjugated phase and convergence"
    ],
    "symbols": [
      [
        "U",
        "spatial complex amplitude",
        "V/m"
      ],
      [
        "z₀",
        "axial source-to-plane distance",
        "m",
        "Example: 1 m"
      ],
      [
        "ρ",
        "transverse distance from axis",
        "m",
        "Example: 1 mm"
      ],
      [
        "λ",
        "wavelength in medium",
        "nm",
        "Example: 500 nm"
      ]
    ],
    "blocks": [
      {
        "label": "Factor out time",
        "title": "Field, complex amplitude, and real quantity",
        "eq": [
          {
            "text": "\\widetilde u=U(\\mathbf r)e^{-i\\omega t},\\qquad U(\\mathbf r)=\\frac{C}{r}e^{ikr}",
            "tex": true
          }
        ],
        "text": [
          "Keep the exp(−iωt) convention. The magnitude of U is |C|/r, while its argument includes kr and the phase of C. Take Re at the end for the real field. Intensity uses a modulus square and a medium factor, not the square of a complex field."
        ]
      },
      {
        "label": "Distribution on a plane",
        "title": "Find the path before amplitude and phase",
        "eq": [
          {
            "text": "r=\\sqrt{(x-x_0)^2+(y-y_0)^2+z_0^2},\\qquad U(x,y)=\\frac{C}{r}e^{ikr}",
            "tex": true
          }
        ],
        "steps": [
          [
            "Geometry",
            "The source is at (x₀,y₀,−z₀), with z₀>0, and the receiving plane is z=0. The Euclidean distance gives r, a compact version of book Eq. (1.45)."
          ],
          [
            "Phase difference",
            "On axis r=z₀. At transverse distance ρ, r=√(z₀²+ρ²), so Δφ=k(r−z₀), not kρ."
          ],
          [
            "Paraxial expansion",
            "Only for $\\rho/z_0\\ll1$, $r\\approx z_0+\\rho^2/(2z_0)$. Phase is then a constant plus a quadratic term. Check that neglected path terms remain small after multiplication by k."
          ],
          [
            "Do not conflate",
            "Almost constant magnitude does not imply almost constant phase. At short wavelengths or across a large aperture, a small path difference can accumulate substantial optical phase."
          ]
        ]
      },
      {
        "label": "Example and conjugation",
        "title": "A 1 mm offset can already add a full phase cycle",
        "eq": [
          {
            "text": "\\Delta r\\approx\\frac{\\rho^2}{2z_0}=0.5\\,\\mathrm{\\mu m},\\qquad \\Delta\\phi\\approx2\\pi",
            "tex": true
          }
        ],
        "text": [
          "With z₀=1 m, ρ=1 mm and λ=500 nm, Δr≈0.5 μm and Δφ≈2π rad. The magnitude ratio is z₀/r≈0.9999995. A difference near one full cycle does not mean every intervening point is in phase.",
          "Conjugating U on the plane changes kr to −kr. Retaining exp(−iωt) and propagation into the +z half-space gives convergence toward the mirror point (x₀,y₀,+z₀). This is a wavefront statement, not a claim that taking a conjugate on paper physically creates a lens."
        ],
        "note": "The paraxial quadratic approximation needs transverse dimensions much smaller than axial distance. Treating the wave as a plane wave additionally needs acceptably small phase error over the observation region."
      }
    ],
    "questions": [
      {
        "stem": "For U=(C/r)exp(ikr), how much does spatial phase increase when r increases by λ/4?",
        "choices": [
          "π/2, with a slightly smaller magnitude",
          "π, unchanged magnitude",
          "0; only time phase changes"
        ],
        "answer": 0,
        "explain": "k=2π/λ gives Δφ=π/2. The envelope C/r also decreases. Unlike an ideal plane wave, this wave carries a distance-dependent magnitude as well as a phase factor.",
        "whyOther": "π corresponds to half a wavelength; zero ignores the spatial factor. Constant magnitude applies to an ideal homogeneous plane wave without geometric spreading.",
        "id": "1.3.2:q1"
      },
      {
        "stem": "A source is at (0,0,−1 m). On z=0, what is the extra path at ρ=1 mm?",
        "choices": [
          "1 mm",
          "0.5 μm",
          "1 m"
        ],
        "answer": 1,
        "explain": "Δr≈ρ²/(2z₀)=(10⁻³)²/(2×1)=5×10⁻⁷ m=0.5 μm. The transverse offset is not itself the extra path; distance is the hypotenuse.",
        "whyOther": "1 mm mistakes transverse offset for path difference. 1 m is axial distance rather than the extra path relative to the on-axis point.",
        "id": "1.3.2:q2"
      },
      {
        "stem": "With exp(−iωt) fixed, what does conjugating the complex amplitude on a plane change?",
        "choices": [
          "The measured frequency becomes negative",
          "The magnitude doubles",
          "The spatial phase reverses sign; magnitude is unchanged"
        ],
        "answer": 2,
        "explain": "Complex conjugation preserves magnitude and reverses argument. The time convention is unchanged. Selecting the solution propagating toward the mirror point describes a converging spherical wave; the half-space must also be stated.",
        "whyOther": "The field still uses the same positive ω. Conjugation cannot double a complex magnitude or automatically double field energy.",
        "id": "1.3.2:q3"
      }
    ]
  },
  {
    "code": "1.3.3",
    "title": "The cylindrical-wave function",
    "pages": "14–15",
    "pdf": 24,
    "visual": "cylindrical",
    "overview": "Stretch a point source into an ideal line source. Power spreads over a cylindrical side surface and amplitude scales as 1/√r. Separate the textbook expression from an exact cylindrical-wave solution.",
    "bridge": {
      "previous": "Spherical spreading area grows as r².",
      "current": "Power per unit source length spreads over circumference 2πr, giving a cylindrical far-field model.",
      "next": "§1.4 turns to the source itself and energy flow."
    },
    "goals": [
      "Distinguish perpendicular distance to a line from spherical radius",
      "Compare amplitude and intensity spreading",
      "Identify the kr≫1 far-field condition"
    ],
    "symbols": [
      [
        "r",
        "perpendicular distance to an infinite line source",
        "m"
      ],
      [
        "pℓ",
        "outward power per unit axial length",
        "W/m",
        "Example: 1 W/m"
      ],
      [
        "Cℓ",
        "cylindrical amplitude coefficient",
        "V/√m"
      ],
      [
        "k",
        "wavenumber in medium",
        "rad/m",
        "Far field: kr≫1"
      ]
    ],
    "blocks": [
      {
        "label": "Line-source geometry",
        "title": "One fewer power of r",
        "eq": [
          {
            "text": "I(r)=\\frac{p_\\ell}{2\\pi r},\\qquad A(r)\\propto r^{-1/2}",
            "tex": true
          },
          {
            "text": "\\widetilde u\\approx\\frac{C_\\ell}{\\sqrt r}e^{i(kr-\\omega t)}",
            "tex": true
          }
        ],
        "text": [
          "An ideal infinite uniform line source gives coaxial cylindrical wavefronts. A side surface of length L has area 2πrL. With no net axial flow through the ends, conservation gives I·2πrL=pℓL.",
          "Intensity scales as 1/r and amplitude as 1/√r. A long narrow slit can approximate this over a limited region. Finite end effects eventually invalidate the infinite-line model."
        ]
      },
      {
        "label": "Accuracy check",
        "title": "The textbook form is not exact at every radius",
        "eq": [
          {
            "text": "f(r)=r^{-1/2}e^{ikr},\\qquad f^{\\prime\\prime}+\\frac{f^\\prime}{r}+k^2f=\\frac{f}{4r^2}",
            "tex": true
          }
        ],
        "steps": [
          [
            "State the equation",
            "For a scalar harmonic field with no axial or angular dependence, the wave equation becomes $f^{\\prime\\prime}+f^\\prime/r+k^2f=0$, the cylindrical radial Helmholtz equation, not its spherical counterpart."
          ],
          [
            "First derivative",
            "Before substituting the textbook far-field factor $f=r^{-1/2}e^{ikr}$, compute $f^\\prime=f(ik-1/(2r))$."
          ],
          [
            "Second derivative",
            "Differentiating again gives $f^{\\prime\\prime}=f[-k^2-ik/r+3/(4r^2)]$."
          ],
          [
            "Substitution and error",
            "Substitution leaves f/(4r²), of relative size 1/(4k²r²) against k²f. It is negligible only for kr≫1. The exact outgoing solution is the order-zero Hankel function H₀⁽¹⁾(kr); its far-field constant phase and factor can be absorbed into Cℓ."
          ]
        ],
        "note": "Book Eqs. (1.47)–(1.48) express geometric spreading. This course explicitly treats them as far-field approximations, not exact solutions near r=0."
      },
      {
        "label": "Distance comparison",
        "title": "From r to 4r, which model decays more slowly?",
        "text": [
          "For a cylindrical wave the amplitude ratio is 1/2 and intensity ratio 1/4; for a spherical wave they are 1/4 and 1/16. With pℓ=1 W/m, intensities at 1 m and 4 m are approximately 0.1592 and 0.03979 W/m²."
        ]
      }
    ],
    "questions": [
      {
        "stem": "From r to 4r in a cylindrical far field, what is the amplitude ratio?",
        "choices": [
          "$\\frac{1}{4}$",
          "$\\frac{1}{2}$",
          "$\\frac{1}{16}$"
        ],
        "answer": 1,
        "explain": "Cylindrical intensity scales as 1/r, so the intensity ratio is 1/4 and its square-root amplitude ratio is 1/2, comparing radii for the same source and medium.",
        "whyOther": "1/4 is the spherical amplitude ratio or cylindrical intensity ratio. 1/16 is the spherical intensity ratio. Identify the spreading geometry before using a power law.",
        "id": "1.3.3:q1"
      },
      {
        "stem": "Where is r measured from in a cylindrical wave?",
        "choices": [
          "Perpendicular distance to the line source",
          "Axial distance along the source",
          "Always the distance to one endpoint"
        ],
        "answer": 0,
        "explain": "An infinite uniform line source is invariant under axial translation, so the field depends on perpendicular radial distance. Wavefronts are cylindrical side surfaces, not spheres about an endpoint.",
        "whyOther": "Axial distance is not the spreading radius. Endpoints introduce finite-source effects outside the infinite-line assumptions.",
        "id": "1.3.3:q2"
      },
      {
        "stem": "Substituting r⁻¹ᐟ²exp(ikr) leaves a residual in the radial Helmholtz equation. How should it be used?",
        "choices": [
          "As exact at every r",
          "Only at r=0",
          "As a far-field approximation for kr≫1"
        ],
        "answer": 2,
        "explain": "The residual is f/(4r²), with relative size 1/(4k²r²) against k²f, negligible for kr≫1. This defines the accuracy boundary rather than invalidating the far-field spreading law.",
        "whyOther": "Exactness at every r ignores the computed nonzero residual. r=0 is precisely where the far-field expression is unusable.",
        "id": "1.3.3:q3"
      }
    ]
  },
  {
    "code": "1.4.1",
    "title": "Light sources",
    "pages": "15",
    "pdf": 25,
    "visual": "sources",
    "overview": "Thermal sources, gas discharge sources, and lasers differ in more than brightness. Compare spectra and coherence without treating line spectra, monochromaticity, and coherence as synonyms.",
    "bridge": {
      "previous": "§1.3 studies ideal waves emitted by a specified source.",
      "current": "Identify the three source classes and spectral properties in the book.",
      "next": "§1.4.2 introduces the classical oscillating-dipole model."
    },
    "goals": [
      "Identify three source classes by mechanism",
      "Separate spectral width from coherence",
      "Explain why the sodium doublet is not strictly single-frequency"
    ],
    "symbols": [
      [
        "λ",
        "wavelength",
        "nm",
        "Sodium doublet: about 589 and 589.6 nm"
      ],
      [
        "ν",
        "optical frequency",
        "Hz"
      ],
      [
        "Δν",
        "spectral width; depends on the width convention",
        "Hz"
      ],
      [
        "T",
        "thermal-source temperature, not wave period",
        "K",
        "No value specified here"
      ]
    ],
    "blocks": [
      {
        "label": "Comparison framework",
        "title": "Different emission mechanisms, different spectra",
        "text": [
          "Thermal sources radiate because of temperature. The book uses incandescent lamps and the Sun as examples, generally with broad continuous spectra. Temperature and emissivity shape the spectrum; intensity is not equal at every wavelength.",
          "Gas discharge sources excite atoms or ions that emit characteristic lines. The book gives sodium and mercury lamps. Lines have finite widths and may be numerous: one prominent yellow feature is not a mathematically monochromatic wave.",
          "Lasers use stimulated emission and feedback. They often provide good directionality and coherence, but real lasers can have multiple longitudinal modes and finite linewidth; not every laser is strictly single-frequency."
        ]
      },
      {
        "label": "Reasoning workflow",
        "title": "From a pure-looking color to stable interference",
        "steps": [
          [
            "Inspect the spectrum",
            "Distinguish continuous background from discrete lines, then inspect linewidth and multiple lines. The figure illustrates spectral shapes; areas do not compare actual source powers."
          ],
          [
            "Then inspect correlations",
            "Coherence describes field correlations between spacetime points. Narrow spectra help temporal coherence, while spatial coherence also depends on source size and propagation geometry; color alone is insufficient."
          ],
          [
            "Choose a model last",
            "Only approximate a real source by a monochromatic plane wave or point source when observation time, bandwidth, and geometry justify it."
          ]
        ]
      },
      {
        "label": "Worked example",
        "title": "How far apart in frequency are 589 and 589.6 nm?",
        "eq": [
          {
            "text": "\\Delta\\nu=c\\left|\\frac{1}{\\lambda_1}-\\frac{1}{\\lambda_2}\\right|\\approx5.18\\times10^{11}\\,\\mathrm{Hz}",
            "tex": true
          }
        ],
        "text": [
          "Using c≈3.00×10⁸ m/s, convert both wavelengths to metres and compute ν=c/λ. Their separation is about 5.18×10¹¹ Hz. This is the distance between line centers, not the linewidth of either line or a measured coherence time."
        ]
      }
    ],
    "questions": [
      {
        "stem": "Which source usually has a broad continuous spectrum?",
        "choices": [
          "Thermal source",
          "Ideal single-frequency laser model",
          "A model with exactly two discrete lines"
        ],
        "answer": 0,
        "explain": "Thermal radiation depends on temperature and emissivity and is generally spread continuously over a broad band. The Sun and incandescent lamps are examples, though real spectra can contain absorption or other structure.",
        "whyOther": "A single ideal frequency and two discrete lines are not broad continuous spectra. Continuous also does not mean equal intensity at every wavelength.",
        "id": "1.4.1:q1"
      },
      {
        "stem": "What is it incorrect to identify directly with the separation of the 589 and 589.6 nm lines?",
        "choices": [
          "The wavelength difference between line centers",
          "The linewidth of each individual line",
          "A basis for computing the center-frequency difference"
        ],
        "answer": 1,
        "explain": "0.6 nm separates the centers. Each line has its own locally measured width. c|1/λ₁−1/λ₂| gives center-frequency separation, not either linewidth.",
        "whyOther": "The first and third statements are valid, so they are not the requested incorrect identification. Distinguish line separation from linewidth before discussing temporal coherence.",
        "id": "1.4.1:q2"
      },
      {
        "stem": "Are all lasers infinite-duration, strictly single-frequency, and perfectly coherent?",
        "choices": [
          "Yes, because lasers always have one frequency",
          "No, therefore lasers have no coherence",
          "No; real lasers have finite bandwidth and may be multimode"
        ],
        "answer": 2,
        "explain": "A perfect single frequency is a model. Cavity modes, noise, and operating state affect real lasers. Many have excellent coherence, but excellent does not mean infinite coherence time or fully ideal parameters.",
        "whyOther": "The first treats an idealization as universal. The second wrongly turns not perfectly coherent into no coherence at all.",
        "id": "1.4.1:q3"
      }
    ]
  },
  {
    "code": "1.4.2",
    "title": "Classical model of optical radiation",
    "pages": "16–17",
    "pdf": 26,
    "visual": "dipole",
    "overview": "Temporarily model atomic radiation by an oscillating electric dipole. The aim is not a literal electron-orbit picture, but radiation directionality, distance scaling, and polarization from p(t).",
    "bridge": {
      "previous": "§1.4.1 distinguishes experimental source classes.",
      "current": "Relate an oscillating dipole moment to electromagnetic radiation in the far field.",
      "next": "§1.4.3 computes energy flow and intensity from E and B."
    },
    "goals": [
      "Identify dipole-moment direction and units",
      "Explain the axial null and side-on maximum",
      "Distinguish near fields from radiation far fields"
    ],
    "symbols": [
      [
        "p₀",
        "dipole-moment amplitude",
        "C·m"
      ],
      [
        "ψ",
        "angle between observation direction and dipole axis",
        "°",
        "Example: 30° and 90°"
      ],
      [
        "r",
        "source-to-observer distance",
        "m",
        "Radiation far field kr≫1"
      ],
      [
        "v, ε",
        "medium phase speed and permittivity",
        "m/s, F/m"
      ]
    ],
    "blocks": [
      {
        "label": "Source model",
        "title": "Dipole moment is not electric field",
        "eq": [
          {
            "text": "\\mathbf p=q\\boldsymbol\\ell,\\qquad\\mathbf p(t)=\\operatorname{Re}\\left[\\mathbf p_0e^{-i\\omega t}\\right]",
            "tex": true
          }
        ],
        "text": [
          "The separation vector ℓ points from negative to positive charge, giving p units of C·m. The classical model summarizes periodic relative charge-center motion by a time-varying dipole moment.",
          "This effective classical picture does not explain discrete energy levels, transition probabilities, or the quantum origin of spontaneous emission. The far-field results assume a specified p(t), not a literal mechanical electron orbit."
        ]
      },
      {
        "label": "Reading the far-field result",
        "title": "sinψ makes a spherical wave anisotropic",
        "eq": [
          {
            "text": "E_0=\\frac{\\omega^2p_0\\sin\\psi}{4\\pi\\varepsilon v^2r},\\qquad B_0=\\frac{E_0}{v}",
            "tex": true
          },
          {
            "text": "I=\\frac{\\omega^4p_0^2}{32\\pi^2\\varepsilon v^3r^2}\\sin^2\\psi",
            "tex": true
          }
        ],
        "steps": [
          [
            "Result used",
            "Book Eqs. (1.51)–(1.52) give the far-zone harmonic dipole field. Above are amplitudes; the real time factor is cos(kr−ωt). The medium is homogeneous, linear, isotropic, and nonabsorbing."
          ],
          [
            "Direction",
            "E lies in the plane containing the dipole axis and observation direction, perpendicular to radial propagation. B is perpendicular to both, with B=(1/v)r̂×E."
          ],
          [
            "Angular distribution",
            "At ψ=0° or 180°, sinψ=0 and the far radiation vanishes; ψ=90° maximizes it. This concerns the 1/r radiation term, not every near-field component on the axis."
          ],
          [
            "Energy flow and squaring",
            "Substitute E₀ into I=(εv/2)E₀² from the next section. This gives sin²ψ, ω⁴ and 1/r². Here p₀ and medium parameters are fixed; real dispersion cannot be ignored across arbitrary frequency ranges."
          ]
        ]
      },
      {
        "label": "Ratio example",
        "title": "Separate field amplitude from energy first",
        "text": [
          "At fixed r, ω, p₀ and medium, ψ=30° gives half the amplitude at 90°, but one-quarter of the intensity. Doubling r at a fixed direction again halves amplitude and quarters intensity."
        ],
        "note": "The radiation zone is far from the finite source and requires kr≫1. The figure omits 1/r² and 1/r³ near-field terms and does not simulate a quantum emission event."
      }
    ],
    "questions": [
      {
        "stem": "At fixed distance, what is dipole intensity at ψ=30° relative to 90°?",
        "choices": [
          "$\\frac{1}{2}$",
          "$\\frac{1}{4}$",
          "2"
        ],
        "answer": 1,
        "explain": "Amplitude contains sinψ, intensity sin²ψ. Since sin30°=1/2, the intensity ratio is 1/4. The comparison fixes ω, p₀, r, and the medium.",
        "whyOther": "1/2 is the amplitude ratio, not intensity. 2 also reverses which direction is weaker.",
        "id": "1.4.2:q1"
      },
      {
        "stem": "Does zero radiation far field on the dipole axis mean the entire electric field there is zero?",
        "choices": [
          "No; near-field terms are outside this radiation model",
          "Yes, at every distance",
          "Yes, including a static dipole field"
        ],
        "answer": 0,
        "explain": "sinψ=0 removes the 1/r radiation term. The full dipole field can also have 1/r² and 1/r³ terms, especially important near the source. A far-field pattern does not determine the entire field.",
        "whyOther": "The other options extend a radiation-zone result to arbitrary distances and static fields, violating the model assumptions.",
        "id": "1.4.2:q2"
      },
      {
        "stem": "With p₀ and medium parameters fixed, what happens to radiation intensity when ω doubles?",
        "choices": [
          "2 times",
          "4 times",
          "16 times"
        ],
        "answer": 2,
        "explain": "E₀ scales as ω², so I scales as ω⁴. Doubling gives 2⁴=16. Direction and distance are also fixed, and the comparison stays within this classical model.",
        "whyOther": "2 assumes linear scaling; 4 is the field-amplitude factor. Real transitions need not share p₀, so this is not a universal empirical law for all emitters.",
        "id": "1.4.2:q3"
      }
    ]
  },
  {
    "code": "1.4.3",
    "title": "Radiant energy",
    "pages": "17–19",
    "pdf": 27,
    "visual": "energy",
    "overview": "Fields carry energy, and detectors usually register time-averaged energy flux. Connect field amplitude to W/m² through energy density, the Poynting vector, and cycle averaging.",
    "bridge": {
      "previous": "§1.4.2 provides radiation-field amplitudes and directions.",
      "current": "Distinguish instantaneous energy density, energy flux, and average intensity.",
      "next": "§1.4.4 uses averages to understand nonideal monochromatic light."
    },
    "goals": [
      "Write S=E×H correctly",
      "Derive the factor 1/2 from cycle averaging",
      "Calculate field amplitude from power and area"
    ],
    "symbols": [
      [
        "w",
        "electromagnetic energy density",
        "J/m³"
      ],
      [
        "S",
        "instantaneous Poynting vector",
        "W/m²"
      ],
      [
        "I",
        "time-averaged radiant flux density",
        "W/m²",
        "Example: 0.07958 W/m²"
      ],
      [
        "E₀",
        "peak electric amplitude, not RMS",
        "V/m",
        "Example: 7.74 V/m"
      ],
      [
        "Z",
        "wave impedance √(μ/ε)",
        "Ω",
        "Vacuum: about 376.7 Ω"
      ]
    ],
    "blocks": [
      {
        "label": "From stored energy to flow",
        "title": "Energy density times speed gives flux density",
        "eq": [
          {
            "text": "w=\\frac12\\left(\\varepsilon E^2+\\frac{B^2}{\\mu}\\right),\\qquad \\mathbf S=\\mathbf E\\times\\mathbf H=\\frac1\\mu\\mathbf E\\times\\mathbf B",
            "tex": true
          }
        ],
        "text": [
          "w is field energy per unit volume; S is directed energy per unit area per unit time. For this forward lossless plane wave, electric and magnetic energies are equal and the magnitude of S is vw.",
          "This simple energy-density expression also assumes a linear nondispersive medium. Significant dispersion or absorption requires a different treatment."
        ]
      },
      {
        "label": "Averaging derivation",
        "title": "Why does peak amplitude squared need a factor 1/2?",
        "eq": [
          {
            "text": "I=\\langle S\\rangle=\\frac12\\varepsilon v E_0^2=\\frac{E_0^2}{2Z},\\qquad Z=\\sqrt{\\frac\\mu\\varepsilon}",
            "tex": true,
            "ref": "plane-intensity"
          }
        ],
        "steps": [
          [
            "Model and source",
            "Use B=E/v and v=1/√(εμ) from §1.2.6, together with S=EB/μ above. The real fields are E=E₀cosφ and H=E/Z, in phase."
          ],
          [
            "Find the instantaneous value",
            "S=E²/Z=(E₀²/Z)cos²φ. Squaring a complex field directly does not give physical instantaneous energy and can produce complex or incorrect negative values."
          ],
          [
            "Integrate over a period",
            "Use $\\cos^2\\phi=(1+\\cos2\\phi)/2$ and average over $T=2\\pi/\\omega$. The oscillatory term integrates to zero, leaving $\\langle\\cos^2\\phi\\rangle=1/2$."
          ],
          [
            "Peak and RMS",
            "Thus I=E₀²/(2Z). With RMS value Eᵣₘₛ=E₀/√2, use I=Eᵣₘₛ²/Z without another division by 2."
          ]
        ]
      },
      {
        "label": "Dimensions and phasors",
        "title": "I=A² is a normalized shorthand",
        "eq": [
          {
            "text": "\\langle\\mathbf S\\rangle=\\frac12\\operatorname{Re}(\\mathbf E_0\\times\\mathbf H_0^*)",
            "tex": true
          }
        ],
        "text": [
          "Book Eq. (1.58b) drops the factor for relative-intensity calculations. If A still has units of V/m, A² alone is not an absolute intensity in W/m²; keep the medium factor.",
          "For peak complex phasors use the conjugated cross product above. A single lossless traveling plane wave reduces it to E₀²/(2Z). Arbitrary superposed fields need not transport energy in one common direction."
        ]
      },
      {
        "label": "Worked example",
        "title": "From 100 W radiant power to 7.74 V/m",
        "eq": [
          {
            "text": "I=\\frac{P}{4\\pi r^2}",
            "tex": true,
            "ref": "isotropic-intensity"
          },
          {
            "text": "E_0=\\sqrt{2ZI}",
            "tex": true
          }
        ],
        "text": [
          "Assume isotropic outward optical radiant power P=100 W, r=10 m, and no absorption. I=100/(4π×10²)≈0.07958 W/m². Approximating air by vacuum with Z≈376.7 Ω gives E₀≈7.74 V/m. The 100 W is radiant output, not a lamp electrical-input rating."
        ]
      }
    ],
    "questions": [
      {
        "stem": "For a lossless plane wave of peak electric amplitude E₀, what is average intensity?",
        "choices": [
          "$\\frac{E_0^2}{Z}$",
          "$\\frac{E_0^2}{2Z}$",
          "$2ZE_0^2$"
        ],
        "answer": 1,
        "explain": "Instantaneous S=(E₀²/Z)cos²φ and the cycle average of cos²φ is 1/2, giving I=E₀²/(2Z) in W/m² for Z in ohms.",
        "whyOther": "The first works for an RMS amplitude, not the specified peak value. The third puts impedance in the numerator and has the wrong dimensions.",
        "id": "1.4.3:q1"
      },
      {
        "stem": "If peak electric amplitude doubles in the same medium, how does intensity change?",
        "choices": [
          "2 times",
          "Unchanged",
          "4 times"
        ],
        "answer": 2,
        "explain": "With Z fixed, I=E₀²/(2Z), hence the intensity ratio is 2²=4. This compares average energy flow, not the sign of the instantaneous field.",
        "whyOther": "2 mistakes a quadratic law for a linear one. Unchanged ignores amplitude dependence. If the medium changes, impedance must be considered too.",
        "id": "1.4.3:q2"
      },
      {
        "stem": "Can a 100 W electrical lamp rating be used directly as 100 W of visible radiant power?",
        "choices": [
          "No; efficiency and spectral-band information are needed",
          "Yes; conservation makes all input visible light",
          "Yes, if r is in metres"
        ],
        "answer": 0,
        "explain": "Input can become heat, infrared, and other losses; visible output is only part. The example explicitly assumes optical radiant power before using P/(4πr²).",
        "whyOther": "Conservation concerns total energy, not conversion entirely to visible light. Correct units cannot supply missing efficiency or spectral information.",
        "id": "1.4.3:q3"
      },
      {
        "stem": "Which expression gives average Poynting vector using peak complex phasors?",
        "choices": [
          "$\\operatorname{Re}(\\mathbf E_0\\times\\mathbf H_0)$",
          "$\\frac12\\operatorname{Re}(\\mathbf E_0\\times\\mathbf H_0^*)$",
          "$E_0^2$"
        ],
        "answer": 1,
        "explain": "The conjugated product preserves relative phase, its real part gives physical mean power flow, and peak phasors require 1/2. A scalar plane-wave expression follows only in the in-phase special case.",
        "whyOther": "The first omits conjugation and the factor 1/2. The third has no direction and lacks impedance factors, so is not general mean energy flow.",
        "id": "1.4.3:q4"
      }
    ]
  },
  {
    "code": "1.4.4",
    "title": "Understanding real optical waves",
    "pages": "19",
    "pdf": 29,
    "visual": "packets",
    "overview": "An infinite monochromatic wave is convenient, but real light has finite bandwidth and statistical fluctuations. Finite wave trains and changing transverse directions motivate coherence time, unpolarized light, and detector averaging.",
    "bridge": {
      "previous": "§1.4.3 distinguishes instantaneous fields from average intensity.",
      "current": "Understand the wave-train picture and the statistical meaning of unpolarized light.",
      "next": "§1.5 treats the encounter of fields and media through macroscopic boundary relations."
    },
    "goals": [
      "Contrast monochromatic models and finite wave trains",
      "Estimate coherence length from a specified coherence time",
      "Avoid interpreting unpolarized light as longitudinal"
    ],
    "symbols": [
      [
        "τc",
        "coherence time; depends on definition and spectral shape",
        "s",
        "Example assumption: 1 ns, not universal"
      ],
      [
        "ℓc",
        "coherence-length estimate vτc",
        "m",
        "Vacuum example: 0.30 m"
      ],
      [
        "Δν",
        "spectral width",
        "Hz"
      ],
      [
        "Eₓ, Eᵧ",
        "two field components transverse to propagation",
        "V/m"
      ]
    ],
    "blocks": [
      {
        "label": "Real versus ideal",
        "title": "Wave trains are a picture, not a universal microscopic clock",
        "text": [
          "The book uses finite wave trains to illustrate changing amplitude, phase, and vibration direction in ordinary sources. Real fields need not jump at literal joins between trains; smooth envelopes and correlation functions are more general.",
          "A monochromatic approximation describes a portion of the field whose phase is sufficiently predictable over the observation interval. Coherence time depends on source and spectrum, not a universal atomic emission duration."
        ]
      },
      {
        "label": "Statistical meaning",
        "title": "Unpolarized light has no preferred transverse direction",
        "steps": [
          [
            "Still transverse instantaneously",
            "For a specified propagation direction, the field varies in the transverse plane. Random direction does not mean arbitrary longitudinal electric oscillation."
          ],
          [
            "Average in time or over an ensemble",
            "Ideal unpolarized light has equal average intensities on any orthogonal transverse axes and no stable mutual phase correlation. One instantaneous arrow cannot establish its polarization state."
          ],
          [
            "Separate coherence from polarization",
            "Linear polarization concerns direction statistics; temporal coherence concerns correlations at a delay. A polarizer selects directions but does not automatically turn broadband thermal light into a single-frequency laser."
          ]
        ]
      },
      {
        "label": "Estimate and limits",
        "title": "What distance corresponds to 1 ns?",
        "eq": [
          {
            "text": "\\ell_c\\sim v\\tau_c,\\qquad \\tau_c\\sim\\frac1{\\Delta\\nu}",
            "tex": true
          }
        ],
        "text": [
          "If τc=1 ns is specified in vacuum, ℓc≈cτc=3.00×10⁸×10⁻⁹=0.30 m. This estimates distance from a given coherence time, not a claim that all ordinary light interferes stably to 0.30 m.",
          "The relation to 1/Δν is order-of-magnitude: exact factors depend on spectral shape, width convention, and correlation criterion. The figure uses smooth finite envelopes and deterministic phase changes to show a trend, not statistical samples of a real source."
        ],
        "note": "The example uses vacuum. The simple estimate assumes negligible dispersion. For envelopes in dispersive media, check group velocity and the coherence-length definition rather than automatically substituting phase velocity."
      }
    ],
    "questions": [
      {
        "stem": "Given τc=1 ns in vacuum, estimate ℓc.",
        "choices": [
          "0.30 m",
          "3×10⁸ m",
          "1 nm"
        ],
        "answer": 0,
        "explain": "Convert 1 ns to 10⁻⁹ s and multiply by c≈3×10⁸ m/s to get 0.30 m. This depends on the specified coherence time, not a fixed coherence length for all sources.",
        "whyOther": "3×10⁸ m omits the nanosecond conversion. 1 nm copies the nano prefix into a length without multiplying by propagation speed.",
        "id": "1.4.4:q1"
      },
      {
        "stem": "What does no preferred vibration direction mean for unpolarized light?",
        "choices": [
          "E is zero at every instant",
          "No preferred transverse direction statistically",
          "Longitudinal and transverse fields must be equally strong"
        ],
        "answer": 1,
        "explain": "Unpolarized is a statistical polarization property: no preferred direction in the transverse plane. The instantaneous field need not vanish; averaging varying directions and phases yields the property.",
        "whyOther": "Zero instantaneous field is not the definition of unpolarized light. An equally strong longitudinal field violates the transverse-wave model here.",
        "id": "1.4.4:q2"
      },
      {
        "stem": "After a polarizer selects broadband thermal light, what must not be asserted automatically?",
        "choices": [
          "Transverse direction statistics change",
          "The output can be linearly polarized",
          "The output must be strictly single-frequency with infinite coherence"
        ],
        "answer": 2,
        "explain": "Direction selection changes polarization, but does not automatically reduce the spectrum to one exact frequency or produce infinite coherence time. Polarization and temporal coherence require separate characterization.",
        "whyOther": "The first two are valid effects of an ideal polarizer. They do not confer all the ideal properties of a monochromatic laser on its output.",
        "id": "1.4.4:q3"
      }
    ]
  },
  {
    "code": "1.5",
    "title": "Electromagnetic boundary relations",
    "pages": "19–21",
    "pdf": 29,
    "visual": "boundary",
    "overview": "Not every field component is continuous across an interface. A pillbox and a shrinking loop convert Maxwell integral equations into constraints on normal B,D and tangential E,H.",
    "bridge": {
      "previous": "Earlier sections treated fields inside a homogeneous medium, not across material jumps.",
      "current": "Identify continuous components when free surface charge and current vanish.",
      "next": "§1.6 applies these conditions to total fields to find reflection and refraction."
    },
    "goals": [
      "Separate tangential and normal components",
      "Explain continuity from integral laws",
      "Avoid assuming all of E or B is continuous"
    ],
    "symbols": [
      [
        "n̂",
        "interface normal pointing from medium 1 to 2 here",
        "1"
      ],
      [
        "ε₁, ε₂",
        "permittivities on either side",
        "F/m",
        "Example: ε₂=4ε₁"
      ],
      [
        "σf",
        "free surface-charge density",
        "C/m²",
        "Main model: 0"
      ],
      [
        "Kf",
        "free surface-current density",
        "A/m",
        "Main model: 0"
      ],
      [
        "E₁ₙ, E₂ₙ",
        "normal electric components",
        "V/m",
        "Example: 100 and 25"
      ]
    ],
    "blocks": [
      {
        "label": "Boundary reference",
        "title": "Specified components are continuous, not entire vectors",
        "eq": [
          {
            "text": "\\hat{\\mathbf n}\\cdot(\\mathbf B_2-\\mathbf B_1)=0,\\qquad\\hat{\\mathbf n}\\cdot(\\mathbf D_2-\\mathbf D_1)=\\sigma_f",
            "tex": true
          },
          {
            "text": "\\hat{\\mathbf n}\\times(\\mathbf E_2-\\mathbf E_1)=0,\\qquad\\hat{\\mathbf n}\\times(\\mathbf H_2-\\mathbf H_1)=\\mathbf K_f",
            "tex": true
          }
        ],
        "text": [
          "For σf=0 and Kf=0, Bₙ,Dₙ,Eₜ,Hₜ are continuous. The book takes its normal from medium 2 to 1. In the source-inclusive forms here the normal and field difference are both reversed, leaving the physical relation unchanged.",
          "No free surface charge does not mean no bound charge. Polarization commonly changes the normal component of E, while D accounts for the material response."
        ]
      },
      {
        "label": "Pillbox derivation",
        "title": "Divergence laws constrain normal flux",
        "eq": [
          {
            "text": "\\oint\\mathbf B\\cdot d\\mathbf A=0,\\qquad\\oint\\mathbf D\\cdot d\\mathbf A=Q_f",
            "tex": true
          }
        ],
        "steps": [
          [
            "Laws and geometry",
            "Use the Gauss laws from §1.1 with a thin pillbox crossing the interface, top in medium 2 and bottom in medium 1, each area ΔA, with opposite outward normals."
          ],
          [
            "Shrink the height",
            "For bounded fields the side flux vanishes with pillbox height. The B flux leaves (B₂ₙ−B₁ₙ)ΔA=0, hence B₁ₙ=B₂ₙ."
          ],
          [
            "Include free charge",
            "D flux equals σfΔA, so D₂ₙ−D₁ₙ=σf. Without free surface charge normal D is continuous, but replacing D by E is invalid."
          ]
        ]
      },
      {
        "label": "Loop derivation",
        "title": "Curl laws constrain tangential circulation",
        "eq": [
          {
            "text": "\\oint\\mathbf E\\cdot d\\mathbf l=-\\frac{d}{dt}\\int\\mathbf B\\cdot d\\mathbf A",
            "tex": true
          },
          {
            "text": "\\oint\\mathbf H\\cdot d\\mathbf l=I_f+\\frac{d}{dt}\\int\\mathbf D\\cdot d\\mathbf A",
            "tex": true
          }
        ],
        "steps": [
          [
            "Source and conditions",
            "Use Faraday and Ampère–Maxwell laws on a rectangular loop with long sides parallel to the interface. Fields and time derivatives are bounded, with no singular magnetic sheet source."
          ],
          [
            "Flatten the loop",
            "Shrink the short sides normal to the interface. Enclosed area vanishes, removing the magnetic-flux and displacement-current area terms. The long sides leave the tangential E difference, so E₁ₜ=E₂ₜ."
          ],
          [
            "Check surface current",
            "If free surface current exists, Kf determines the tangential H jump. This batch takes Kf=0 for an insulating source-free interface, giving H₁ₜ=H₂ₜ."
          ]
        ]
      },
      {
        "label": "Worked example",
        "title": "A normal E jump is expected",
        "eq": [
          {
            "text": "\\varepsilon_1E_{1n}=\\varepsilon_2E_{2n},\\qquad E_{2n}=\\frac{\\varepsilon_1}{\\varepsilon_2}E_{1n}",
            "tex": true
          }
        ],
        "text": [
          "At a linear isotropic interface without free surface charge, ε₂=4ε₁ and E₁ₙ=100 V/m give E₂ₙ=25 V/m. Separately specifying E₁ₜ=20 V/m gives E₂ₜ=20 V/m. A changed normal component does not contradict tangential continuity."
        ]
      }
    ],
    "questions": [
      {
        "stem": "Which components are continuous when σf=Kf=0?",
        "choices": [
          "$E_n,H_n,D_t,B_t$",
          "$B_n,D_n,E_t,H_t$",
          "All of E, B, D, H"
        ],
        "answer": 1,
        "explain": "Gauss laws constrain normal B and D fluxes; loop laws constrain tangential E and H. With free sheet sources absent, these four specified components are continuous, not every component of every vector.",
        "whyOther": "The first swaps normal and tangential roles. The third ignores different material parameters and incorrectly promotes component constraints to full-vector continuity.",
        "id": "1.5:q1"
      },
      {
        "stem": "For ε₂=4ε₁, σf=0 and E₁ₙ=100 V/m, what is E₂ₙ?",
        "choices": [
          "400 V/m",
          "100 V/m",
          "25 V/m"
        ],
        "answer": 2,
        "explain": "D₁ₙ=D₂ₙ and D=εE give ε₁×100=4ε₁E₂ₙ, so E₂ₙ=25 V/m. Normal D, not normal E, is continuous.",
        "whyOther": "400 reverses the permittivity ratio; 100 incorrectly assumes Eₙ continuity. The answer retains V/m units, not the C/m² units of D.",
        "id": "1.5:q2"
      },
      {
        "stem": "Does absence of free surface charge imply absence of bound surface charge?",
        "choices": [
          "No; they have different origins",
          "Yes; free and bound are synonyms",
          "Yes; D and E are the same quantity"
        ],
        "answer": 0,
        "explain": "Polarization can produce bound charge, accounted for in the constitutive relation between D and E. σf=0 yields normal D continuity while normal E can change with permittivity.",
        "whyOther": "Free and bound are not synonyms. D is measured in C/m², E in V/m; the fields are not interchangeable.",
        "id": "1.5:q3"
      },
      {
        "stem": "What field on the medium-1 side enters the boundary relations in a reflection problem?",
        "choices": [
          "Incident field only",
          "Sum of incident and reflected fields",
          "Reflected field only"
        ],
        "answer": 1,
        "explain": "Maxwell boundary conditions constrain the actual total fields on each side. Medium 1 has Eᵢ+Eᵣ and Hᵢ+Hᵣ, while medium 2 has the transmitted field. Vector directions and phases must be retained.",
        "whyOther": "Either single field omits part of the physical field, generally failing the two tangential conditions and giving incorrect Fresnel coefficients.",
        "id": "1.5:q4"
      }
    ]
  },
  {
    "code": "1.6.1",
    "title": "Laws of reflection and refraction",
    "pages": "21–22",
    "pdf": 31,
    "visual": "snell",
    "overview": "Equal incidence and reflection angles follow from more than ray sketches. At a stationary planar interface, three waves share frequency and tangential wavevector, which determines their directions.",
    "bridge": {
      "previous": "§1.5 supplies tangential continuity of total fields.",
      "current": "Use phase matching everywhere and at all times on the interface.",
      "next": "§1.6.2 finds amplitude ratios once directions are known."
    },
    "goals": [
      "Measure all angles from the normal",
      "Derive Snell law from tangential phase matching",
      "Distinguish conserved frequency from changed wavelength"
    ],
    "symbols": [
      [
        "n₁, n₂",
        "incident and transmitted refractive indices",
        "1",
        "Example: 1 and 1.5"
      ],
      [
        "θ₁, θᵣ, θ₂",
        "incidence, reflection, refraction angles from the normal",
        "°",
        "Example: 30°, 30°, 19.47°"
      ],
      [
        "ω",
        "shared angular frequency",
        "rad/s"
      ],
      [
        "k∥",
        "tangential wavevector component",
        "rad/m"
      ]
    ],
    "blocks": [
      {
        "label": "Phase matching",
        "title": "One interface cannot impose different temporal frequencies",
        "eq": [
          {
            "text": "\\omega_i=\\omega_r=\\omega_t,\\qquad\\mathbf k_{i\\parallel}=\\mathbf k_{r\\parallel}=\\mathbf k_{t\\parallel}",
            "tex": true
          }
        ],
        "text": [
          "Write each wave as A exp[i(k·r−ωt)] and insert it into tangential continuity without sheet sources. Equality holds for every interface position r∥ and all t, requiring equal temporal and tangential spatial frequencies for the participating nonzero waves.",
          "The interface is stationary, planar, and not time modulated. Moving or time-varying boundaries can change frequency matching and are excluded."
        ]
      },
      {
        "label": "Direction derivation",
        "title": "From k∥ to reflection and refraction angles",
        "eq": [
          {
            "text": "\\theta_r=\\theta_1",
            "tex": true
          },
          {
            "text": "n_1\\sin\\theta_1=n_2\\sin\\theta_2",
            "tex": true,
            "ref": "snell-law"
          }
        ],
        "steps": [
          [
            "Relations used",
            "Use tangential matching above, k=nω/c, and k∥=k sinθ. The normal-component sign is selected by propagation toward or away from the interface."
          ],
          [
            "Reflection stays in one medium",
            "Incident and reflected waves share n₁ and ω, hence the same k magnitude. Equal tangential components give sinθ₁=sinθᵣ and θᵣ=θ₁ for angles between 0° and 90°."
          ],
          [
            "Transmission enters a different medium",
            "Cancel the common ω/c in kᵢsinθ₁=kₜsinθ₂ to obtain n₁sinθ₁=n₂sinθ₂. The shared tangential direction and normal establish coplanarity."
          ]
        ]
      },
      {
        "label": "Worked example",
        "title": "Frequency stays fixed while wavelength and angle change",
        "eq": [
          {
            "text": "\\theta_2=\\arcsin\\left(\\frac{n_1}{n_2}\\sin\\theta_1\\right),\\qquad\\lambda_2=\\lambda_1\\frac{n_1}{n_2}",
            "tex": true
          }
        ],
        "text": [
          "From air n₁=1 to glass n₂=1.5 with θ₁=30°, sinθ₂=1/3 and θ₂≈19.47°. An air wavelength of about 600 nm becomes about 400 nm in glass, with frequency about 5.00×10¹⁴ Hz unchanged."
        ],
        "note": "If n₁>n₂ and sinθ₂>1, there is no real propagating refraction angle. The figure flags this boundary; evanescent fields and phase shifts belong to §1.7."
      }
    ],
    "questions": [
      {
        "stem": "From air to n=1.5 glass at 30° incidence, what is the refraction angle?",
        "choices": [
          "19.47°",
          "45°",
          "30°"
        ],
        "answer": 0,
        "explain": "All angles are from the normal. Snell law gives sinθ₂=(1/1.5)sin30°=1/3, hence θ₂≈19.47°. The transmitted ray bends toward the normal.",
        "whyOther": "45° reverses the ratio or multiplies angles directly. 30° requires special conditions such as matched indices. Snell law matches sines, not angles themselves.",
        "id": "1.6.1:q1"
      },
      {
        "stem": "Which quantity is shared by the three waves at a stationary interface?",
        "choices": [
          "Wavelength",
          "Frequency",
          "Speed"
        ],
        "answer": 1,
        "explain": "Boundary equality holds for every t, requiring matching ω. Frequency is shared, while v=c/n and λ=v/ν generally change between media.",
        "whyOther": "Wavelength and speed may change. Equal frequency does not imply equal spatial period. A stationary, unmodulated boundary is essential here.",
        "id": "1.6.1:q2"
      },
      {
        "stem": "How should n₁sinθ₁/n₂>1 be interpreted?",
        "choices": [
          "Set the refraction angle to 100°",
          "Ignore it and set θ₂=0°",
          "No real propagating refraction angle; total internal reflection applies"
        ],
        "answer": 2,
        "explain": "A real sine cannot exceed 1. There is no ordinary propagating transmitted ray into medium 2. The total-reflection and evanescent-field model in §1.7 is needed.",
        "whyOther": "The sine of 100° still cannot exceed 1. Setting 0° violates the prescribed tangential phase matching.",
        "id": "1.6.1:q3"
      }
    ]
  },
  {
    "code": "1.6.2",
    "title": "Fresnel formulas",
    "pages": "22–24",
    "pdf": 32,
    "visual": "fresnel",
    "overview": "Snell law fixes directions; Fresnel formulas fix field-amplitude ratios. Choose s and p basis directions first, then solve two tangential boundary equations without confusing signs and energy.",
    "bridge": {
      "previous": "§1.6.1 has matched frequency and tangential wavevector.",
      "current": "Derive s and p amplitude coefficients for a nonabsorbing nonmagnetic interface.",
      "next": "§1.6.3 interprets signs, special angles, and model limits."
    },
    "goals": [
      "Identify s and p components",
      "Solve two equations for r and t",
      "Interpret signs using a specified p basis"
    ],
    "symbols": [
      [
        "rₛ, rₚ",
        "reflected/incident electric amplitude",
        "1"
      ],
      [
        "tₛ, tₚ",
        "transmitted/incident electric amplitude",
        "1"
      ],
      [
        "s, p",
        "E perpendicular, parallel to incidence plane",
        "1"
      ],
      [
        "n₁, n₂",
        "real positive indices, μ₁≈μ₂",
        "1",
        "Example: 1 and 1.5"
      ]
    ],
    "blocks": [
      {
        "label": "Define directions first",
        "title": "Signs belong to basis amplitudes, not negative power",
        "eq": [
          {
            "text": "r_s=\\frac{n_1\\cos\\theta_1-n_2\\cos\\theta_2}{n_1\\cos\\theta_1+n_2\\cos\\theta_2}",
            "tex": true,
            "ref": "fresnel-rs"
          },
          {
            "text": "r_p=\\frac{n_2\\cos\\theta_1-n_1\\cos\\theta_2}{n_2\\cos\\theta_1+n_1\\cos\\theta_2}",
            "tex": true,
            "ref": "fresnel-rp"
          }
        ],
        "text": [
          "The incidence plane contains the incident wavevector and interface normal. The three waves share the same s direction perpendicular to that plane. Choose p̂=ŝ×k̂ for each wave, so p̂ᵢ,p̂ᵣ,p̂ₜ change with propagation direction, consistent with book Fig. 1.20.",
          "r=Eᵣ/Eᵢ and t=Eₜ/Eᵢ are electric coefficients, not power ratios. The cosine forms remain usable at normal incidence, avoiding removable 0/0 forms in the book sine/tangent expressions."
        ]
      },
      {
        "label": "s-polarization derivation",
        "title": "Common E basis, reversed reflected tangential H",
        "eq": [
          {
            "text": "1+r_s=t_s",
            "tex": true
          },
          {
            "text": "n_1\\cos\\theta_1(1-r_s)=n_2\\cos\\theta_2t_s",
            "tex": true
          },
          {
            "text": "t_s=\\frac{2n_1\\cos\\theta_1}{n_1\\cos\\theta_1+n_2\\cos\\theta_2}",
            "tex": true
          }
        ],
        "steps": [
          [
            "Equations and assumptions",
            "Use tangential continuity of total E,H from §1.5. Media are homogeneous, isotropic, linear, nonabsorbing, nonmagnetic, with no free sheet sources. §1.2.6 gives H₀=nE₀/Z₀."
          ],
          [
            "Normalize",
            "Divide by nonzero incident s amplitude. E continuity gives 1+rₛ=tₛ. Reflected tangential H reverses, giving n₁cosθ₁(1−rₛ)=n₂cosθ₂tₛ."
          ],
          [
            "Eliminate",
            "Set a=n₁cosθ₁ and b=n₂cosθ₂. Substitute tₛ=1+rₛ into a(1−rₛ)=btₛ. Then a−b=(a+b)rₛ, so rₛ=(a−b)/(a+b), tₛ=2a/(a+b)."
          ]
        ]
      },
      {
        "label": "p-polarization derivation",
        "title": "Project E before matching H",
        "eq": [
          {
            "text": "\\cos\\theta_1(1-r_p)=t_p\\cos\\theta_2",
            "tex": true
          },
          {
            "text": "n_1(1+r_p)=n_2t_p",
            "tex": true
          },
          {
            "text": "t_p=\\frac{2n_1\\cos\\theta_1}{n_2\\cos\\theta_1+n_1\\cos\\theta_2}",
            "tex": true
          }
        ],
        "steps": [
          [
            "Same boundary laws",
            "Use the same conditions and H₀=nE₀/Z₀. Since p fields lie in the incidence plane, project onto the interface tangent first. The selected reflected p basis has opposite tangential projection to the incident one."
          ],
          [
            "Write two equations",
            "Tangential E gives cosθ₁(1−rₚ)=tₚcosθ₂. The common s direction of H gives n₁(1+rₚ)=n₂tₚ. Do not copy the s relation 1+r=t."
          ],
          [
            "Eliminate tₚ",
            "Substitute tₚ=n₁(1+rₚ)/n₂ into the first equation. Rearranging gives (n₂cosθ₁−n₁cosθ₂)=(n₂cosθ₁+n₁cosθ₂)rₚ. Back-substitution gives tₚ."
          ]
        ]
      },
      {
        "label": "Normal-incidence check",
        "title": "rₛ=−0.2 and rₚ=+0.2 are consistent",
        "eq": [
          {
            "text": "\\theta_1=0:\\quad r_s=\\frac{n_1-n_2}{n_1+n_2},\\quad r_p=-r_s,\\quad t_s=t_p=\\frac{2n_1}{n_1+n_2}",
            "tex": true
          }
        ],
        "text": [
          "For n₁=1 and n₂=1.5, rₛ=−0.2, rₚ=+0.2 and tₛ=tₚ=0.8. In the normal-incidence limit p̂ᵣ=−p̂ᵢ, so the reflected electric vector is still reversed on a fixed lab axis. Both polarizations have reflectance 0.04."
        ]
      }
    ],
    "questions": [
      {
        "stem": "What defines s polarization?",
        "choices": [
          "E perpendicular to the incidence plane",
          "E parallel to the wavevector",
          "E parallel to the incidence plane"
        ],
        "answer": 0,
        "explain": "The incidence plane is spanned by kᵢ and the interface normal. s electric field is perpendicular to it and to kᵢ; p electric field lies in it but remains transverse.",
        "whyOther": "The second is longitudinal, excluded here. The third defines p. s/p are not merely horizontal/vertical screen directions.",
        "id": "1.6.2:q1"
      },
      {
        "stem": "With this p-basis convention, what are rₛ,rₚ at normal incidence from 1 to 1.5?",
        "choices": [
          "+0.2, +0.2",
          "−0.2, +0.2",
          "−0.04, +0.04"
        ],
        "answer": 1,
        "explain": "Set both cosines to 1: rₛ=(1−1.5)/2.5=−0.2 and rₚ=(1.5−1)/2.5=+0.2. The reflected p basis reverses, so scalar signs alone do not compare lab-frame vectors.",
        "whyOther": "Both positive misses the s reversal. 0.04 is a squared amplitude, a power reflectance, not a signed field coefficient.",
        "id": "1.6.2:q2"
      },
      {
        "stem": "Which is the normalized tangential electric condition for s?",
        "choices": [
          "$1-r_s=t_s$",
          "$r_s=t_s$",
          "$1+r_s=t_s$"
        ],
        "answer": 2,
        "explain": "All s bases point the same way. Total E in medium 1 is incident plus reflected and equals transmitted E, giving 1+rₛ=tₛ after normalization.",
        "whyOther": "1−rₛ occurs in the s magnetic condition with index and cosine factors. rₛ=tₛ omits the incident field entirely.",
        "id": "1.6.2:q3"
      },
      {
        "stem": "Does tₛ=0.8 mean transmitted power is 80% of incident power?",
        "choices": [
          "No; square it and include the normal-flux factor",
          "Yes; field coefficient equals power ratio",
          "No; transmitted power must be 64%"
        ],
        "answer": 0,
        "explain": "t is an electric amplitude ratio. T=[n₂cosθ₂/(n₁cosθ₁)]|t|². At normal incidence from 1 to 1.5, T=1.5×0.8²=0.96, neither 0.8 nor 0.64.",
        "whyOther": "80% omits squaring. 64% squares but omits the impedance/index and projection factor.",
        "id": "1.6.2:q4"
      }
    ]
  },
  {
    "code": "1.6.3",
    "title": "Interpreting Fresnel formulas",
    "pages": "24–26",
    "pdf": 34,
    "visual": "fresnelDiscussion",
    "overview": "Plot coefficients against angle to reveal normal incidence, Brewster incidence, grazing incidence, and the critical angle. Negative amplitude is not negative energy, and p signs must be interpreted with their bases.",
    "bridge": {
      "previous": "§1.6.2 gives s,p field coefficients and their basis convention.",
      "current": "Compare lower-to-higher and higher-to-lower index cases and special angles.",
      "next": "§1.6.4 converts amplitudes into power ratios."
    },
    "goals": [
      "Distinguish scalar sign from vector-phase interpretation",
      "Identify Brewster zero and critical angle",
      "Stop using real transmitted-ray angles beyond critical incidence"
    ],
    "symbols": [
      [
        "θB",
        "Brewster angle at which p reflection vanishes",
        "°",
        "1→1.5: 56.31°"
      ],
      [
        "θc",
        "critical angle for higher-to-lower index",
        "°",
        "1.5→1: 41.81°"
      ],
      [
        "rₛ, rₚ",
        "signed amplitudes in specified bases",
        "1"
      ],
      [
        "φ",
        "phase; negative real coefficient means π modulo 2π",
        "rad"
      ]
    ],
    "blocks": [
      {
        "label": "Sign map",
        "title": "Read signs from the specified formulas",
        "eq": [
          {
            "text": "r_s=\\frac{n_1\\cos\\theta_1-n_2\\cos\\theta_2}{n_1\\cos\\theta_1+n_2\\cos\\theta_2}",
            "tex": true,
            "ref": "fresnel-rs"
          },
          {
            "text": "r_p=\\frac{n_2\\cos\\theta_1-n_1\\cos\\theta_2}{n_2\\cos\\theta_1+n_1\\cos\\theta_2}",
            "tex": true,
            "ref": "fresnel-rp"
          }
        ],
        "text": [
          "For n₁<n₂, rₛ<0 for 0≤θ₁<90°. rₚ starts positive and becomes negative after θB. Because p̂ᵣ and p̂ᵢ differ, positive rₚ alone does not imply aligned reflected and incident lab-frame electric vectors.",
          "A negative real coefficient is |r|exp(iπ), a phase difference in that basis. Near normal incidence from lower to higher index the reflected lab-axis electric field reverses, often called half-wave loss. It is not literal energy loss of half a wavelength."
        ]
      },
      {
        "label": "Special-angle derivation",
        "title": "Zero p reflection and no real refraction angle are different",
        "eq": [
          {
            "text": "\\tan\\theta_B=\\frac{n_2}{n_1}",
            "tex": true,
            "ref": "brewster-law"
          },
          {
            "text": "\\sin\\theta_c=\\frac{n_2}{n_1}\\quad(n_1>n_2)",
            "tex": true
          }
        ],
        "steps": [
          [
            "The p zero",
            "Set the numerator of rₚ from §1.6.2 to zero: n₂cosθ₁=n₁cosθ₂. Together with Snell law, a non-index-matched nondegenerate interface gives θ₁+θ₂=90°."
          ],
          [
            "Obtain θB",
            "Substitute θ₂=90°−θB into n₁sinθB=n₂sinθ₂ to get tanθB=n₂/n₁. This removes p reflection, not reflection of every polarization."
          ],
          [
            "Origin of the critical angle",
            "Set θ₂=90° in §1.6.1 to obtain sinθc=n₂/n₁, possible only for n₁>n₂. Above θc the transmitted angle cannot remain real."
          ],
          [
            "Keep them distinct",
            "In lossless total internal reflection |rₛ|=|rₚ|=1, but r is generally complex with phase, not identically +1. Here only energy ratios are reported; detailed phase shifts are left to §1.7."
          ]
        ]
      },
      {
        "label": "Numbers and limits",
        "title": "One zero, one propagation boundary",
        "text": [
          "Air to n=1.5 glass: θB≈56.31°, with no total reflection from the air side. Reversing to 1.5→1 gives θB≈33.69° and θc≈41.81°. Both are measured from the normal but have different values and meanings.",
          "For a non-index-matched lower-to-higher interface, grazing incidence gives rₛ,rₚ→−1 and transmission amplitudes→0. These are θ₁→90° limits: exactly tangential incidence has zero normal incident power, so one cannot silently divide zero by zero."
        ],
        "note": "The plot marks the total-reflection domain without forcing complex field coefficients to real 1. An index-matched interface has no distinguished polarization-selective Brewster angle."
      }
    ],
    "questions": [
      {
        "stem": "At normal incidence from 1 to 1.5, does rₚ>0 alone imply aligned reflected and incident E vectors?",
        "choices": [
          "No; include the reflected p basis",
          "Yes; positive always means aligned lab axes",
          "Yes; therefore there is no reflection"
        ],
        "answer": 0,
        "explain": "With p̂=ŝ×k̂, normal reflection reverses k and the p basis. Although scalar rₚ=+0.2, its reflected basis gives a reversed electric vector on a fixed transverse lab axis.",
        "whyOther": "A sign depends on basis definitions. A positive coefficient is not zero amplitude and does not imply no reflection.",
        "id": "1.6.3:q1"
      },
      {
        "stem": "From air to n=1.5, where is the p-reflection zero?",
        "choices": [
          "41.81°",
          "56.31°",
          "90°"
        ],
        "answer": 1,
        "explain": "tanθB=n₂/n₁=1.5 gives θB≈56.31°. The p component vanishes in reflection while s generally remains.",
        "whyOther": "41.81° is the critical angle for the reverse 1.5→1 direction. 90° is the grazing limit, not the Brewster zero for this interface.",
        "id": "1.6.3:q2"
      },
      {
        "stem": "Which statement is correct in lossless total internal reflection?",
        "choices": [
          "rₛ=rₚ=+1 always",
          "Reflectance exceeds 1 and energy increases",
          "|rₛ|=|rₚ|=1, but phases need not vanish"
        ],
        "answer": 2,
        "explain": "Total reflection returns all normal net power, so R=|r|²=1. Field coefficients can still be complex phase factors; unit magnitude does not mean the positive real number one.",
        "whyOther": "The first confuses a modulus with the complex number. The second violates energy conservation at this passive lossless interface.",
        "id": "1.6.3:q3"
      },
      {
        "stem": "What does half-wave loss mean here?",
        "choices": [
          "A π reflected-field reversal on an appropriate fixed axis",
          "Exactly half of incident energy is lost",
          "Optical frequency halves"
        ],
        "answer": 0,
        "explain": "The term denotes a phase reversal under specified reflection conditions: −1=exp(iπ). It neither halves energy nor changes the common frequency at a stationary interface. Oblique p reflection also requires attention to differing bases.",
        "whyOther": "Energy ratios come from R,T, not the literal words half-wave. Temporal phase matching preserves frequency; a negative coefficient cannot halve it.",
        "id": "1.6.3:q4"
      }
    ]
  },
  {
    "code": "1.6.4",
    "title": "Reflectance and transmittance",
    "pages": "26–27",
    "pdf": 36,
    "visual": "power",
    "overview": "Move from field amplitudes to an energy budget. Reflection stays in the same medium, while transmission changes impedance and beam projection. The n cosθ factor is essential.",
    "bridge": {
      "previous": "The r,t in §§1.6.2–1.6.3 are field coefficients with signs or phases.",
      "current": "Compare mean normal power flow through the same interface area to obtain R,T.",
      "next": "§1.6.5 explains polarization through unequal s,p energy fractions."
    },
    "goals": [
      "Distinguish amplitude ratios from power ratios",
      "Explain cosine factors as projection",
      "Independently check R+T=1"
    ],
    "symbols": [
      [
        "R, T",
        "reflected and transmitted normal power ratios",
        "1",
        "Normal 1→1.5: 0.04, 0.96"
      ],
      [
        "Iᵢ, Iᵣ, Iₜ",
        "intensities normal to each beam direction",
        "W/m²"
      ],
      [
        "ΔA",
        "common interface area",
        "m²"
      ],
      [
        "Z",
        "wave impedance",
        "Ω"
      ],
      [
        "Rn",
        "total reflectance of unpolarized light",
        "1"
      ]
    ],
    "blocks": [
      {
        "label": "Energy-flow relation",
        "title": "Compare through the same area first",
        "eq": [
          {
            "text": "I=\\langle S\\rangle=\\frac12\\varepsilon v E_0^2=\\frac{E_0^2}{2Z},\\qquad Z=\\sqrt{\\frac\\mu\\varepsilon}",
            "tex": true,
            "ref": "plane-intensity"
          },
          {
            "text": "P_i=I_i\\cos\\theta_1\\,\\Delta A,\\qquad P_t=I_t\\cos\\theta_2\\,\\Delta A",
            "tex": true
          }
        ],
        "text": [
          "I is mean power per area perpendicular to each beam. Boundary conservation compares a common interface area ΔA, introducing cosθ. The reflected and incident angles match, so their cosine factors cancel."
        ]
      },
      {
        "label": "Power-ratio derivation",
        "title": "Transmittance is not simply |t|²",
        "eq": [
          {
            "text": "R=|r|^2",
            "tex": true
          },
          {
            "text": "T=\\frac{n_2\\cos\\theta_2}{n_1\\cos\\theta_1}|t|^2",
            "tex": true
          },
          {
            "text": "R_s+T_s=1,\\qquad R_p+T_p=1",
            "tex": true
          }
        ],
        "steps": [
          [
            "Conditions and source",
            "Use mean intensity and area projection above. Both media are nonmagnetic and lossless with real indices and a propagating transmitted wave. Z=Z₀/n gives I=nE₀²/(2Z₀)."
          ],
          [
            "Reflected power",
            "R=Pᵣ/Pᵢ. The common n₁ and cosine cancel, leaving |Eᵣ/Eᵢ|²=|r|². A negative amplitude does not produce negative reflected power."
          ],
          [
            "Transmitted power",
            "For T=Pₜ/Pᵢ, indices and cosines differ, giving [n₂cosθ₂/(n₁cosθ₁)]|t|². Different permeabilities require the impedance ratio Z₁/Z₂, not automatically n₂/n₁."
          ],
          [
            "Check conservation algebraically",
            "For s set a=n₁cosθ₁, b=n₂cosθ₂. R=(a−b)²/(a+b)² and T=4ab/(a+b)². Their numerator sums to (a+b)², hence R+T=1. p follows analogously."
          ]
        ]
      },
      {
        "label": "Unpolarized light and multiple surfaces",
        "title": "Add powers, not reflection amplitudes",
        "eq": [
          {
            "text": "R_n=\\frac{R_s+R_p}{2},\\qquad T_n=\\frac{T_s+T_p}{2}",
            "tex": true
          }
        ],
        "text": [
          "Unpolarized incident power splits equally between orthogonal s,p channels, so total power ratios are their averages. Do not average rₛ,rₚ and then square; compute each orthogonal energy contribution separately.",
          "Tracking only the primary transmitted beam through 12 identical nearly normal air–glass interfaces of n=1.52 gives (1−R)¹²≈0.593. This one-pass estimate omits absorption, coatings, and returned secondary beams; it is not a coherent thin-film or complete multiple-reflection calculation."
        ]
      },
      {
        "label": "Numerical check",
        "title": "Not 64%, but 96%",
        "text": [
          "At normal incidence n₁=1,n₂=1.5, |r|=0.2 and t=0.8. R=0.04, T=1.5×0.64=0.96, summing to 1. For 10 W incident power this is 0.4 W reflected and 9.6 W transmitted.",
          "At θ₁=45°, Rs≈0.09201 and Rp≈0.008466, giving unpolarized Rn≈0.05024 and Tn≈0.94976. Each polarization conserves its own reflected plus transmitted power."
        ]
      }
    ],
    "questions": [
      {
        "stem": "At normal incidence from 1 to 1.5 with t=0.8, what is T?",
        "choices": [
          "0.64",
          "0.80",
          "0.96"
        ],
        "answer": 2,
        "explain": "T=(n₂/n₁)|t|²=1.5×0.8²=0.96. With R=0.04, conservation holds. A smaller transmitted field alone does not determine power without the medium factor.",
        "whyOther": "0.64 omits the index/impedance factor. 0.80 treats field amplitude as power. Both break energy conservation here.",
        "id": "1.6.4:q1"
      },
      {
        "stem": "Where does cosθ₂/cosθ₁ in T come from?",
        "choices": [
          "Normal-flux projection through a common interface area",
          "Frequency changes at the interface",
          "Two polarizations require division by two"
        ],
        "answer": 0,
        "explain": "Intensity uses beam-normal area, while conservation compares the same interface area. P=IcosθΔA introduces the cosine ratio between transmitted and incident powers.",
        "whyOther": "Frequency is conserved at a stationary interface. The unpolarized average factor 1/2 is a different statistical factor, unrelated to geometric projection.",
        "id": "1.6.4:q2"
      },
      {
        "stem": "For unpolarized light with Rs=0.10,Rp=0.02, what is Rn?",
        "choices": [
          "0.12",
          "0.06",
          "0.04"
        ],
        "answer": 1,
        "explain": "Each orthogonal channel carries half the incident power, so Rn=(0.10+0.02)/2=0.06, or 6% of incident power.",
        "whyOther": "0.12 omits the half weights of the incident channels. 0.04 is not the weighted power average. Do not average amplitudes first.",
        "id": "1.6.4:q3"
      },
      {
        "stem": "At this lossless passive interface, if R+T≠1, what should be checked first?",
        "choices": [
          "Assume the interface creates energy",
          "Divide arbitrarily by two",
          "Check amplitude squares, impedance, projection, and assumptions"
        ],
        "answer": 2,
        "explain": "Energy conservation must hold under the stated conditions. Common errors are t=T, omitted index ratio, or omitted cosine ratio. Also check whether absorption or extra channels invalidate the model.",
        "whyOther": "A nonconserving calculation does not prove energy creation. Arbitrary rescaling conceals mistakes instead of checking the formula.",
        "id": "1.6.4:q4"
      }
    ]
  },
  {
    "code": "1.6.5",
    "title": "Polarization produced by reflection and refraction",
    "pages": "27–29",
    "pdf": 37,
    "visual": "brewster",
    "overview": "Unequal s,p reflection changes polarization. Brewster incidence removes reflected p, but transmission generally retains both components. Fully polarized does not mean all energy is reflected.",
    "bridge": {
      "previous": "§1.6.4 gives power ratios for each polarization.",
      "current": "Connect Brewster incidence to reflected polarization and changes in linear-polarization direction.",
      "next": "Next, §1.7 studies total-reflection phase shifts; this batch does not count it as completed."
    },
    "goals": [
      "Derive tanθB=n₂/n₁",
      "Explain pure reflected s and partial transmitted polarization",
      "Weight s,p powers for arbitrary linear incidence"
    ],
    "symbols": [
      [
        "θB",
        "Brewster angle from the normal",
        "°",
        "1→1.5: 56.31°"
      ],
      [
        "α",
        "incident E angle from incidence plane, p toward s",
        "°",
        "Example: 45°"
      ],
      [
        "Dᵣ",
        "linear polarization degree of reflected unpolarized input",
        "1"
      ],
      [
        "Rs, Rp",
        "channel power reflectances",
        "1",
        "At θB: about 0.14793, 0"
      ]
    ],
    "blocks": [
      {
        "label": "Key condition",
        "title": "Perpendicular outgoing rays remove reflected p",
        "eq": [
          {
            "text": "n_1\\sin\\theta_1=n_2\\sin\\theta_2",
            "tex": true,
            "ref": "snell-law"
          },
          {
            "text": "\\tan\\theta_B=\\frac{n_2}{n_1}",
            "tex": true,
            "ref": "brewster-law"
          }
        ],
        "text": [
          "At a nonmagnetic lossless non-index-matched interface, θ₁+θ₂=90° gives rₚ=0. For unpolarized input containing both channels, the reflected field is pure s, perpendicular to the incidence plane. Pure p input instead gives no reflected field; a zero beam has no polarization direction."
        ]
      },
      {
        "label": "Brewster derivation",
        "title": "From phase matching to a measurable angle",
        "steps": [
          [
            "Source and conditions",
            "Use rₚ from §1.6.2 and Snell law above, with positive real indices and equal permeabilities, excluding the degenerate matched-index case."
          ],
          [
            "Set reflection to zero",
            "rₚ=0 gives n₂cosθB=n₁cosθ₂. Together with n₁sinθB=n₂sinθ₂, this gives sin2θB=sin2θ₂. For unequal indices choose the branch θB+θ₂=90°."
          ],
          [
            "Solve the angle",
            "Substitute to obtain n₁sinθB=n₂cosθB and divide by nonzero cosθB. Then tanθB=n₂/n₁, giving 56.31° from air to glass of index 1.5."
          ],
          [
            "Link to the dipole picture",
            "Under the Brewster condition, dipoles driven by transmitted p oscillate parallel to the reflected ray. The axial radiation null of §1.4.2 gives intuition; boundary conditions supply the quantitative result."
          ]
        ]
      },
      {
        "label": "Energy and polarization",
        "title": "100% polarization can carry only 7.40% of incident power",
        "eq": [
          {
            "text": "D_r=\\frac{|R_s-R_p|}{R_s+R_p}\\quad(R_s+R_p>0)",
            "tex": true
          },
          {
            "text": "R(\\alpha)=R_s\\sin^2\\alpha+R_p\\cos^2\\alpha",
            "tex": true
          }
        ],
        "text": [
          "At θB for n₁=1,n₂=1.5, Rs≈0.14793 and Rp=0. Unpolarized total reflectance is Rs/2≈0.07396, or 7.40%, while Dᵣ=1. The remaining 92.60% is transmitted; fully polarized does not mean fully reflected.",
          "Here Ts≈0.85207 and Tp=1, so transmitted unpolarized input still has both components, with polarization degree about 0.07987 and a slight p preference. For linear input at α, incident weights are sin²α,cos²α, not the fixed half weights of unpolarized light."
        ]
      },
      {
        "label": "Direction-change example",
        "title": "Reflection stays linear here, but generally rotates",
        "eq": [
          {
            "text": "E_{rs}=r_sE_0\\sin\\alpha,\\qquad E_{rp}=r_pE_0\\cos\\alpha",
            "tex": true
          }
        ],
        "text": [
          "For α=45°, n₁=1,n₂=1.5 and θ₁=50°, rₛ≈−0.33474,rₚ≈+0.05725. The angle in the reflected basis is αᵣ=atan2(rₛsinα,rₚcosα)≈−80.29°. A polarization axis is periodic in 180°, so unsigned magnitudes alone omit direction information.",
          "With a real propagating transmitted angle under these conditions, real coefficients introduce only 0 or π relative phase, so linear input remains linear in reflection. Complex total-reflection phase shifts can produce ellipticity, addressed next."
        ]
      }
    ],
    "questions": [
      {
        "stem": "What is the Brewster angle from the normal for air to n=1.5?",
        "choices": [
          "33.69°",
          "56.31°",
          "41.81°"
        ],
        "answer": 1,
        "explain": "tanθB=1.5 gives θB≈56.31°, with refraction angle 33.69°. The two are complementary. Measure from the normal, not the surface.",
        "whyOther": "33.69° is the transmitted angle here or Brewster angle in reverse. 41.81° is the reverse critical angle, a different condition.",
        "id": "1.6.5:q1"
      },
      {
        "stem": "What is the nonzero reflected polarization for unpolarized input at Brewster incidence?",
        "choices": [
          "Pure s, perpendicular to the incidence plane",
          "Pure p, parallel to the incidence plane",
          "No polarization change"
        ],
        "answer": 0,
        "explain": "Brewster incidence gives Rp=0 while Rs generally remains nonzero. Of the two incident unpolarized channels, only s survives reflection, giving unit polarization degree.",
        "whyOther": "Pure p selects the removed channel. No change ignores unequal reflectances. If the input were pure p instead, the reflected beam would be zero.",
        "id": "1.6.5:q2"
      },
      {
        "stem": "Why is transmitted unpolarized input generally not fully polarized at Brewster incidence?",
        "choices": [
          "Because its frequency changes",
          "Because transmission becomes longitudinal",
          "Because both Ts and Tp remain nonzero"
        ],
        "answer": 2,
        "explain": "Rp=0 means p does not reflect and is fully transmitted. s partly reflects but also partly transmits. Both remain in transmission with unequal weights, producing partial polarization.",
        "whyOther": "Frequency stays matched at a stationary interface. Transmission remains a transverse electromagnetic wave. Unequal polarization weights require neither changed frequency nor a longitudinal field.",
        "id": "1.6.5:q3"
      },
      {
        "stem": "For linear input α=45° with Rs=0.10,Rp=0.02, what is total reflectance?",
        "choices": [
          "0.12",
          "0.06",
          "0.08"
        ],
        "answer": 1,
        "explain": "Eₛ=E₀sinα and Eₚ=E₀cosα. At 45° each channel carries half the power, so R=0.10/2+0.02/2=0.06. It matches the unpolarized value here, but not its polarization statistics.",
        "whyOther": "0.12 omits weights; 0.08 is not the weighted energy result. Add orthogonal powers rather than summing signed amplitudes and squaring.",
        "id": "1.6.5:q4"
      }
    ]
  }
]);
/* CONTINUATION END */
  const equationTerms = [
    ["微分式：", "Differential: "], ["积分式：", "Integral: "], ["Q_{自由}", "Q_{free}"], ["I_{自由}", "I_{free}"], ["E_{物理}", "E_{physical}"],
    ["（导电时）", "(if conducting)"], ["（沿 +z，固定约定）", "(along +z, with this convention)"],
    ["（无耗散均匀平面波）", "(homogeneous lossless plane wave)"], ["（真空）", "(vacuum)"], ["(真空)", "(vacuum)"],
    ["真空中", "in vacuum: "], ["真空内", "in vacuum: "], ["介质内", "in medium: "],
    ["常数", "constant"], ["右行", "right-going"], ["左行", "left-going"]
  ];
  const translateEquation = (formula) => equationTerms.reduce((value, [source, target]) => value.replaceAll(source, target), formula);
  const original = window.OpticsChapter01;
  if (original.length !== translations.length) throw new Error("English section count differs from Chinese source");
  const lessons = original.map((section, index) => {
    const translated = translations[index];
    if (section.blocks.length !== translated.blocks.length || section.questions.length !== translated.questions.length) throw new Error(`English content mismatch in ${section.code}`);
    return {
      ...section, ...translated,
      blocks: section.blocks.map((block, i) => ({ ...block, ...translated.blocks[i], eq: block.eq?.map((formula) => typeof formula === "string" ? translateEquation(formula) : { ...formula, text: translateEquation(formula.text) }) })),
      questions: section.questions.map((question, i) => ({ ...question, ...translated.questions[i] }))
    };
  });
  window.OpticsCourseChaptersEn = [{ code: "1", title: "Electromagnetic Theory of Light", sectionTitles: { "1.2": "Plane electromagnetic waves", "1.3": "Spherical and cylindrical waves", "1.4": "Light sources and optical radiation", "1.6": "Reflection and refraction at a two-medium interface" }, pdf: "物理光学（第5版）.pdf", lessons }];
})();

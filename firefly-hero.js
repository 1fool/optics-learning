(function () {
  "use strict";

  const CONFIG = {
    duration: 19.6,
    phaseDurations: {
      intro: 1.45,
      reflection: 3.75,
      refraction: 2.5,
      interference: 2.7,
      diffraction: 2.3,
      gather: 2.5,
      hold: 3.2,
      fade: 1.2
    },
    phases: {
      intro: 0,
      reflection: 1.45,
      refraction: 5.2,
      interference: 7.7,
      diffraction: 10.4,
      gather: 12.7,
      hold: 15.2,
      fade: 18.4
    },
    colors: {
      head: "#fffbe6",
      abdomen: "#e8ffb0",
      abdomenCore: "#b8ff6a",
      trail: "#d8ff9e",
      interface: "#8fd8cf",
      fringe: "#e8ffb0",
      night: "#091524"
    },
    abdomenPulseRange: [0.35, 1],
    glowTremorHz: 10,
    trailDotCount: 8,
    syncPeriod: 2,
    autoLoop: true,
    showPauseButton: true,
    maxDPR: 2,
    smallFlyCount: { wide: 48, narrow: 30 },
    trailDotCountNarrow: 4,
    particleCap: 100
  };

  const stage = document.querySelector("[data-firefly-hero]");
  if (!stage) return;

  const canvas = stage.querySelector(".firefly-canvas");
  const toggle = stage.querySelector(".firefly-toggle");
  const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
  if (!ctx) return;

  const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  let width = 1;
  let height = 1;
  let sceneHeight = 1;
  let sceneTop = 0;
  let dpr = 1;
  let unit = 1;
  let glyphUnit = 1;
  let bgCanvas = document.createElement("canvas");
  let sprites = null;
  let bandSprite = null;
  let interfaceLayers = [];
  let smallFlies = [];
  let letterTargets = [];
  let trail = [];
  let trailCursor = 0;
  let trailNextAt = 0;
  let trailSerial = 0;
  let elapsed = 0;
  let lastFrame = 0;
  let rafId = 0;
  let running = false;
  let paused = false;
  let destroyed = false;
  const lastDir = { x: 1, y: 0 };
  let directionTime = -1;
  let resizeTimer = 0;
  let resizeObserver = null;

  const STORY_DURATION = 19.6;
  const narrowScreen = () => window.innerWidth < 768;

  // Stage durations are weights within CONFIG.duration; story coordinates stay fixed.
  function storyTime(seconds) {
    const names = phaseNames;
    const total = names.reduce((sum, name) => sum + CONFIG.phaseDurations[name], 0);
    let time = seconds / CONFIG.duration * total;
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const length = CONFIG.phaseDurations[name];
      const from = CONFIG.phases[name];
      const to = i + 1 < names.length ? CONFIG.phases[names[i + 1]] : STORY_DURATION;
      if (time <= length) return from + (to - from) * time / length;
      time -= length;
    }
    return STORY_DURATION;
  }

  const TAU = Math.PI * 2;
  const phaseNames = Object.keys(CONFIG.phaseDurations);
  const pulsePeriods = [1.7, 0.9, 2.3, 1.2, 2.0];
  const pathNow = {};
  const motion = { x: 0, y: 0, dir: lastDir, speed: 0 };
  const mainFly = { m: motion, dir: lastDir, hover: 0, head: {}, abdomen: {} };
  const abdomenState = { intensity: 1, shrink: 0 };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function hash01(n) {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  function px(n) {
    return n * width;
  }

  function py(n) {
    return sceneTop + n * sceneHeight;
  }

  function windowAlpha(t, start, end, fadeIn, fadeOut) {
    if (t < start || t > end) return 0;
    const inA = clamp((t - start) / (fadeIn || 0.3), 0, 1);
    const outA = clamp((end - t) / (fadeOut || 0.5), 0, 1);
    return Math.min(inA, outA);
  }

  /* ------------------------------------------------------------------ */
  /* Path                                                               */
  /* ------------------------------------------------------------------ */

  const ROUTE = [
    { t0: 0.00, t1: 0.75, p0: [0.045, 0.735], c1: [0.055, 0.660], c2: [0.075, 0.625], p1: [0.095, 0.600] },
    { t0: 0.75, t1: 1.15, p0: [0.095, 0.600], c1: [0.095, 0.600], c2: [0.095, 0.600], p1: [0.095, 0.600] },
    { t0: 1.15, t1: 1.45, p0: [0.095, 0.600], c1: [0.110, 0.575], c2: [0.125, 0.550], p1: [0.145, 0.535] },
    { t0: 1.45, t1: 2.05, p0: [0.145, 0.535], c1: [0.168, 0.505], c2: [0.183, 0.468], p1: [0.194, 0.445] },
    { t0: 2.05, t1: 2.55, p0: [0.194, 0.445], c1: [0.194, 0.445], c2: [0.194, 0.445], p1: [0.194, 0.445] },
    { t0: 2.55, t1: 2.90, p0: [0.194, 0.445], c1: [0.200, 0.435], c2: [0.213, 0.414], p1: [0.220, 0.400] },
    { t0: 2.90, t1: 3.35, p0: [0.220, 0.400], c1: [0.227, 0.414], c2: [0.270, 0.482], p1: [0.282, 0.490] },
    { t0: 3.35, t1: 3.75, p0: [0.282, 0.490], c1: [0.282, 0.490], c2: [0.282, 0.490], p1: [0.282, 0.490] },
    { t0: 3.75, t1: 4.10, p0: [0.282, 0.490], c1: [0.260, 0.475], c2: [0.250, 0.450], p1: [0.260, 0.430] },
    { t0: 4.10, t1: 4.45, p0: [0.260, 0.430], c1: [0.270, 0.413], c2: [0.295, 0.403], p1: [0.315, 0.400] },
    { t0: 4.45, t1: 4.95, p0: [0.315, 0.400], c1: [0.335, 0.403], c2: [0.375, 0.414], p1: [0.400, 0.414] },
    { t0: 4.95, t1: 5.20, p0: [0.400, 0.414], c1: [0.400, 0.380], c2: [0.410, 0.352], p1: [0.418, 0.342] },
    { t0: 5.20, t1: 5.60, p0: [0.418, 0.342], c1: [0.418, 0.342], c2: [0.418, 0.342], p1: [0.418, 0.342] },
    { t0: 5.60, t1: 5.95, p0: [0.418, 0.342], c1: [0.424, 0.338], c2: [0.435, 0.331], p1: [0.440, 0.327] },
    { t0: 5.95, t1: 6.45, p0: [0.440, 0.327], c1: [0.448, 0.324], c2: [0.505, 0.312], p1: [0.535, 0.303] },
    { t0: 6.45, t1: 7.05, p0: [0.535, 0.303], c1: [0.560, 0.290], c2: [0.570, 0.260], p1: [0.558, 0.240] },
    { t0: 7.05, t1: 7.60, p0: [0.558, 0.240], c1: [0.548, 0.255], c2: [0.552, 0.315], p1: [0.575, 0.365] },
    { t0: 7.60, t1: 8.10, p0: [0.575, 0.365], c1: [0.575, 0.365], c2: [0.575, 0.365], p1: [0.575, 0.365] },
    { t0: 8.10, t1: 8.55, p0: [0.575, 0.365], c1: [0.570, 0.450], c2: [0.555, 0.505], p1: [0.550, 0.552] },
    { t0: 8.55, t1: 9.05, p0: [0.550, 0.552], c1: [0.552, 0.615], c2: [0.570, 0.670], p1: [0.605, 0.700] },
    { t0: 9.05, t1: 9.65, p0: [0.605, 0.700], c1: [0.640, 0.712], c2: [0.678, 0.680], p1: [0.700, 0.640] },
    { t0: 9.65, t1: 10.45, p0: [0.700, 0.640], c1: [0.725, 0.580], c2: [0.760, 0.400], p1: [0.770, 0.300] },
    { t0: 10.45, t1: 10.90, p0: [0.770, 0.300], c1: [0.770, 0.300], c2: [0.770, 0.300], p1: [0.770, 0.300] },
    { t0: 10.90, t1: 11.15, p0: [0.770, 0.300], c1: [0.774, 0.286], c2: [0.777, 0.276], p1: [0.780, 0.268] },
    { t0: 11.15, t1: 11.55, p0: [0.780, 0.268], c1: [0.805, 0.268], c2: [0.840, 0.270], p1: [0.870, 0.286] },
    { t0: 11.55, t1: 12.30, p0: [0.870, 0.286], c1: [0.880, 0.400], c2: [0.825, 0.470], p1: [0.795, 0.515] },
    { t0: 12.30, t1: 12.90, p0: [0.795, 0.515], c1: [0.780, 0.548], c2: [0.795, 0.600], p1: [0.830, 0.625] },
    { t0: 12.90, t1: 15.20, p0: [0.830, 0.625], c1: [0.880, 0.580], c2: [0.920, 0.430], p1: [0.930, 0.380] },
    { t0: 15.20, t1: 19.60, p0: [0.930, 0.380], c1: [0.930, 0.380], c2: [0.930, 0.380], p1: [0.930, 0.380] }
  ];

  // Share time-based tangents across ordinary joins. Only a surface interaction
  // can change direction instantly; only an explicit observing pause reaches zero.
  function prepareRoute() {
    ROUTE.forEach((segment) => {
      const duration = segment.t1 - segment.t0;
      segment.hover = segment.p0[0] === segment.p1[0] && segment.p0[1] === segment.p1[1];
      segment.v0 = segment.p0.map((value, axis) => 3 * (segment.c1[axis] - value) / duration);
      segment.v1 = segment.p1.map((value, axis) => 3 * (value - segment.c2[axis]) / duration);
    });
    for (let i = 1; i < ROUTE.length; i++) {
      const before = ROUTE[i - 1];
      const after = ROUTE[i];
      if (before.hover || after.hover) {
        before.v1 = [0, 0];
        after.v0 = [0, 0];
      } else if ([2.90, 4.45, 5.95].includes(after.t0)) {
        const inSpeed = Math.hypot(...before.v1);
        const outSpeed = Math.hypot(...after.v0);
        const speed = Math.min(inSpeed, outSpeed);
        before.v1 = before.v1.map(value => value * speed / inSpeed);
        after.v0 = after.v0.map(value => value * speed / outSpeed);
      } else {
        const duration = after.t1 - before.t0;
        const velocity = before.p0.map((value, axis) => (after.p1[axis] - value) / duration);
        before.v1 = velocity;
        after.v0 = velocity;
      }
    }
  }

  prepareRoute();

  function pathAt(t, out = {}) {
    let seg = ROUTE[ROUTE.length - 1];
    for (let i = 0; i < ROUTE.length; i++) {
      if (t <= ROUTE[i].t1) {
        seg = ROUTE[i];
        break;
      }
    }
    const duration = seg.t1 - seg.t0;
    const u = clamp((t - seg.t0) / duration, 0, 1);
    const u2 = u * u;
    const u3 = u2 * u;
    const a = 2 * u3 - 3 * u2 + 1;
    const b = u3 - 2 * u2 + u;
    const c = -2 * u3 + 3 * u2;
    const d = u3 - u2;
    out.x = a * seg.p0[0] + b * duration * seg.v0[0] + c * seg.p1[0] + d * duration * seg.v1[0];
    out.y = a * seg.p0[1] + b * duration * seg.v0[1] + c * seg.p1[1] + d * duration * seg.v1[1];
    out.vx = ((6 * u2 - 6 * u) * seg.p0[0] + (3 * u2 - 4 * u + 1) * duration * seg.v0[0] + (-6 * u2 + 6 * u) * seg.p1[0] + (3 * u2 - 2 * u) * duration * seg.v1[0]) / duration;
    out.vy = ((6 * u2 - 6 * u) * seg.p0[1] + (3 * u2 - 4 * u + 1) * duration * seg.v0[1] + (-6 * u2 + 6 * u) * seg.p1[1] + (3 * u2 - 2 * u) * duration * seg.v1[1]) / duration;
    // Keep a reflected path on the incident side, including its tiny flight wobble.
    const surfaceClearance = t < 4.95 ? clamp(Math.abs(out.y - 0.4) * sceneHeight / 8, 0, 1) : 1;
    const flight = clamp(Math.hypot(out.vx, out.vy) / 0.06, 0, 1);
    const bob = Math.sin(TAU * 1.5 * t) * 2.4 * (0.2 + flight * 0.8) * surfaceClearance;
    out.baseY = out.y;
    out.y += bob / sceneHeight;
    return out;
  }

  function motionAt(t) {
    const p = pathAt(t, pathNow);
    const speed = Math.hypot(p.vx, p.vy);
    if (speed > 0.004 && t !== directionTime) {
      const angle = Math.atan2(p.vy * sceneHeight, p.vx * width);
      const old = Math.atan2(lastDir.y, lastDir.x);
      const delta = Math.atan2(Math.sin(angle - old), Math.cos(angle - old));
      const dt = directionTime < 0 || t < directionTime ? 1 : Math.min(t - directionTime, 0.1);
      const heading = old + delta * (1 - Math.exp(-dt * 18));
      lastDir.x = Math.cos(heading);
      lastDir.y = Math.sin(heading);
    }
    directionTime = t;
    motion.x = p.x;
    motion.y = p.y;
    motion.speed = speed;
    return motion;
  }

  /* ------------------------------------------------------------------ */
  /* Small fireflies and letter targets                                 */
  /* ------------------------------------------------------------------ */

  // A fixed 5x7 optical grid: identical cap height, baseline and cell spacing.
  // No font rasterization or text drawing; every occupied cell is a light particle.
  const GLYPHS = [
    ["01110", "10001", "10001", "10001", "10001", "10001", "01110"], // O
    ["11110", "10001", "10001", "11110", "10000", "10000", "10000"], // P
    ["11111", "00100", "00100", "00100", "00100", "00100", "00100"], // T
    ["01110", "00100", "00100", "00100", "00100", "00100", "01110"], // I
    ["01111", "10000", "10000", "10000", "10000", "10000", "01111"], // C
    ["01111", "10000", "10000", "01110", "00001", "00001", "11110"]  // S
  ];

  function buildLetterTargets() {
    const stepX = 0.86 / 34;
    const stepY = stepX * width / sceneHeight;
    const top = 0.5 - 3 * stepY;
    const targets = [];
    GLYPHS.forEach((rows, letter) => {
      rows.forEach((row, y) => {
        for (let x = 0; x < row.length; x++) {
          if (row[x] === "1") {
            targets.push({ x: 0.07 + (letter * 6 + x) * stepX, y: top + y * stepY, letter, row: y, column: x });
          }
        }
      });
    });
    return targets;
  }

  function buildSmallFlies() {
    const count = narrowScreen() ? CONFIG.smallFlyCount.narrow : CONFIG.smallFlyCount.wide;
    letterTargets = buildLetterTargets();
    const n = letterTargets.length;
    const flies = [];
    const stations = [
      [0.220, 0.400],
      [0.440, 0.327],
      [0.605, 0.552],
      [0.780, 0.268]
    ];

    for (let i = 0; i < n; i++) {
      const target = letterTargets[i];
      const r1 = hash01(i * 3.17 + 1.3);
      const r2 = hash01(i * 5.71 + 7.1);
      const r3 = hash01(i * 8.13 + 2.9);
      let sx;
      let sy;
      if (i < 4) {
        const s = stations[i % 4];
        sx = s[0] + (r1 - 0.5) * 0.03;
        sy = s[1] + (r2 - 0.5) * 0.03;
      } else {
        const side = i % 4;
        if (side === 0) {
          sx = r1;
          sy = -0.06 - r2 * 0.05;
        } else if (side === 1) {
          sx = 1.06 + r2 * 0.05;
          sy = 0.08 + r1 * 0.78;
        } else if (side === 2) {
          sx = r1;
          sy = 1.07 + r2 * 0.05;
        } else {
          sx = -0.06 - r2 * 0.05;
          sy = 0.10 + r1 * 0.78;
        }
      }

      // Keep the same legible grid on phones, but only 30 dots fly in from outside.
      const moving = i < 4 || Math.floor((i - 3) * (count - 4) / (n - 4)) > Math.floor((i - 4) * (count - 4) / (n - 4));
      const start = CONFIG.phases.gather + r1 * 0.30;
      const cloudAngle = r3 * TAU + Math.PI * 1.4;
      const cloudRadius = 0.025 + r2 * 0.065;
      flies.push({
        sx,
        sy,
        tx: target.x,
        ty: target.y,
        start,
        dur: CONFIG.phases.hold - start,
        cloudAngle,
        cloudRadius,
        cloudX: 0.5 + Math.cos(cloudAngle) * cloudRadius,
        cloudY: 0.5 + Math.sin(cloudAngle) * cloudRadius * width / sceneHeight,
        seed: r3,
        size: 0.86 + r3 * 0.34,
        moving,
        position: { x: 0, y: 0 }
      });
    }
    smallFlies = flies;
  }

  /* ------------------------------------------------------------------ */
  /* Sprites and static background                                      */
  /* ------------------------------------------------------------------ */

  function makeSprite(stops, size) {
    const s = size || 128;
    const c = document.createElement("canvas");
    c.width = s;
    c.height = s;
    const g = c.getContext("2d");
    const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    stops.forEach(([at, color]) => grd.addColorStop(at, color));
    g.fillStyle = grd;
    g.fillRect(0, 0, s, s);
    return c;
  }

  function makeFireflyBody() {
    const c = document.createElement("canvas");
    c.width = 160;
    c.height = 96;
    const g = c.getContext("2d");
    g.translate(80, 48);
    g.scale(4, 4);
    const shell = g.createLinearGradient(0, -5, 0, 5);
    shell.addColorStop(0, "#739c80");
    shell.addColorStop(0.24, "#304f4b");
    shell.addColorStop(0.70, "#152a2c");
    shell.addColorStop(1, "#08171e");
    g.fillStyle = shell;
    g.strokeStyle = "#a4ccb561";
    g.lineWidth = 0.45;
    g.beginPath(); g.ellipse(-4.6, 0, 6.2, 4.4, 0, 0, TAU); g.fill(); g.stroke();
    g.save();
    g.beginPath(); g.ellipse(-4.6, 0, 6.2, 4.4, 0, 0, TAU); g.clip();
    g.strokeStyle = "#0c212d99";
    g.lineWidth = 0.6;
    [-8, -5, -2].forEach(x => {
      g.beginPath(); g.ellipse(x, 0, 1.2, 4.5, 0, -Math.PI / 2, Math.PI / 2); g.stroke();
    });
    g.restore();
    const thorax = g.createLinearGradient(0, -3, 0, 3);
    thorax.addColorStop(0, "#658b77");
    thorax.addColorStop(0.45, "#244239");
    thorax.addColorStop(1, "#0a191d");
    g.fillStyle = thorax;
    g.beginPath(); g.ellipse(0.2, 0, 2.9, 3.0, 0, 0, TAU); g.fill();
    const face = g.createRadialGradient(2.3, -1.6, 0, 3, 0, 4.5);
    face.addColorStop(0, "#fffde7");
    face.addColorStop(0.58, "#e9e6b8");
    face.addColorStop(1, "#6b8563");
    g.fillStyle = face;
    g.beginPath(); g.ellipse(3, 0, 3.6, 3.25, 0, 0, TAU); g.fill();
    g.strokeStyle = "#f1ffce80";
    g.lineWidth = 0.45;
    g.beginPath(); g.ellipse(-4.6, -0.7, 5.7, 3.2, 0, Math.PI * 1.1, Math.PI * 1.7); g.stroke();
    return c;
  }

  function buildSprites() {
    sprites = {
      body: makeFireflyBody(),
      head: makeSprite([
        [0, "rgba(255,253,238,1)"],
        [0.14, "rgba(255,251,230,0.95)"],
        [0.34, "rgba(255,242,188,0.34)"],
        [0.7, "rgba(255,232,160,0.06)"],
        [1, "rgba(255,232,160,0)"]
      ]),
      abdomen: makeSprite([
        [0, "rgba(250,255,224,1)"],
        [0.10, "rgba(232,255,176,0.98)"],
        [0.24, "rgba(184,255,106,0.72)"],
        [0.52, "rgba(150,240,90,0.16)"],
        [1, "rgba(140,235,80,0)"]
      ]),
      small: makeSprite([
        [0, "rgba(240,255,205,0.95)"],
        [0.16, "rgba(232,255,176,0.86)"],
        [0.4, "rgba(184,255,106,0.22)"],
        [1, "rgba(160,245,100,0)"]
      ]),
      finale: makeSprite([
        [0, "rgba(227,255,188,0.64)"],
        [0.15, "rgba(164,236,163,0.32)"],
        [0.42, "rgba(67,166,166,0.18)"],
        [0.72, "rgba(37,108,148,0.08)"],
        [1, "rgba(26,70,114,0)"]
      ])
    };

    const s = 560;
    const c = document.createElement("canvas");
    c.width = s;
    c.height = 128;
    const g = c.getContext("2d");
    // Small-angle double slit: I(x) = envelope * cos²(pi * d*x/(lambda*L)).
    // Seven maxima, with a gentle aperture envelope, are cached at resize only.
    for (let x = 0; x < s; x++) {
      const phase = (x / (s - 1) - 0.5) * 7;
      const intensity = Math.exp(-Math.pow(phase / 2.55, 2)) * Math.pow(Math.cos(Math.PI * phase), 2);
      g.globalAlpha = intensity;
      g.fillStyle = CONFIG.colors.fringe;
      g.fillRect(x, 0, 1, 128);
    }
    g.globalAlpha = 1;
    g.globalCompositeOperation = "destination-in";
    const vg = g.createLinearGradient(0, 0, 0, 128);
    vg.addColorStop(0, "rgba(0,0,0,0)");
    vg.addColorStop(0.18, "rgba(0,0,0,0.65)");
    vg.addColorStop(0.55, "rgba(0,0,0,1)");
    vg.addColorStop(0.86, "rgba(0,0,0,0.55)");
    vg.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = vg;
    g.fillRect(0, 0, s, 128);
    bandSprite = c;
  }

  function buildBackground() {
    bgCanvas = document.createElement("canvas");
    bgCanvas.width = Math.max(1, Math.round(width * dpr));
    bgCanvas.height = Math.max(1, Math.round(height * dpr));
    const g = bgCanvas.getContext("2d");
    g.scale(dpr, dpr);

    const base = g.createLinearGradient(0, 0, width * 0.7, height);
    base.addColorStop(0, "#07111d");
    base.addColorStop(0.52, CONFIG.colors.night);
    base.addColorStop(1, "#08131e");
    g.fillStyle = base;
    g.fillRect(0, 0, width, height);

    const teal = g.createRadialGradient(width * 0.18, height * 0.12, 0, width * 0.18, height * 0.12, width * 0.72);
    teal.addColorStop(0, "rgba(52,128,124,0.17)");
    teal.addColorStop(1, "rgba(52,128,124,0)");
    g.fillStyle = teal;
    g.fillRect(0, 0, width, height);

    const warm = g.createRadialGradient(width * 0.82, height * 0.78, 0, width * 0.82, height * 0.78, width * 0.55);
    warm.addColorStop(0, "rgba(150,180,95,0.10)");
    warm.addColorStop(1, "rgba(150,180,95,0)");
    g.fillStyle = warm;
    g.fillRect(0, 0, width, height);

    for (let i = 0; i < 58; i++) {
      const x = hash01(i * 2.13 + 0.7) * width;
      const y = hash01(i * 4.37 + 2.1) * height;
      const r = 0.45 + hash01(i * 7.91 + 5.2) * 1.05;
      const a = 0.05 + hash01(i * 3.31 + 8.4) * 0.20;
      g.fillStyle = i % 7 === 0 ? "rgba(226,240,190," + a + ")" : "rgba(190,225,225," + a + ")";
      g.beginPath();
      g.arc(x, y, r, 0, TAU);
      g.fill();
    }

    g.strokeStyle = "rgba(150,205,195,0.055)";
    g.lineWidth = 1;
    g.beginPath();
    g.arc(width * 0.02, height * 0.96, width * 0.34, -Math.PI * 0.42, Math.PI * 0.12);
    g.stroke();
    g.beginPath();
    g.arc(width * 0.98, height * 0.06, width * 0.30, Math.PI * 0.58, Math.PI * 1.12);
    g.stroke();

    const vignette = g.createRadialGradient(width * 0.5, height * 0.48, width * 0.18, width * 0.5, height * 0.5, width * 0.82);
    vignette.addColorStop(0, "rgba(4,10,16,0)");
    vignette.addColorStop(1, "rgba(3,8,13,0.48)");
    g.fillStyle = vignette;
    g.fillRect(0, 0, width, height);
  }

  /* ------------------------------------------------------------------ */
  /* Light state                                                        */
  /* ------------------------------------------------------------------ */

  function flashTrain(t, start, count, gap, widthS) {
    let v = 0;
    for (let i = 0; i < count; i++) {
      const d = t - (start + i * gap);
      if (d >= 0) {
        const e = Math.exp(-(d * d) / (2 * widthS * widthS));
        if (e > v) v = e;
      }
    }
    return v;
  }

  function abdomenLight(t) {
    const lo = CONFIG.abdomenPulseRange[0];
    const hi = CONFIG.abdomenPulseRange[1];
    let phase = t % 8.1;
    let period = pulsePeriods[0];
    for (let i = 0; i < pulsePeriods.length; i++) {
      period = pulsePeriods[i];
      if (phase < period) break;
      phase -= period;
    }
    const base = lo + (hi - lo) * Math.pow(Math.sin(Math.PI * phase / period), 2);
    let extra = 0;
    extra = Math.max(extra, flashTrain(t, 2.90, 1, 0, 0.035));
    extra = Math.max(extra, flashTrain(t, 3.04, 2, 0.19, 0.055));
    extra = Math.max(extra, flashTrain(t, 3.52, 2, 0.30, 0.085) * 0.55);
    if (t >= 4.55 && t < 5.55) {
      const u = t - 4.55;
      extra = Math.max(extra, u < 0.26 ? 1 : Math.max(0, 1 - (u - 0.26) / 1.15));
    }
    extra = Math.max(extra, flashTrain(t, 5.95, 1, 0, 0.035));
    extra = Math.max(extra, flashTrain(t, 6.10, 1, 0, 0.17) * 0.86);
    extra = Math.max(extra, flashTrain(t, 8.55, 1, 0, 0.035));
    extra = Math.max(extra, flashTrain(t, 8.70, 2, 0.22, 0.06));
    extra = Math.max(extra, flashTrain(t, 11.15, 1, 0, 0.035));
    extra = Math.max(extra, flashTrain(t, 11.28, 3, 0.115, 0.048));
    const intensity = clamp(Math.max(base, extra), lo, hi);
    const shrink =
      0.40 * Math.exp(-Math.pow((t - 2.94) / 0.08, 2)) +
      0.34 * Math.exp(-Math.pow((t - 11.19) / 0.08, 2));
    abdomenState.intensity = intensity;
    abdomenState.shrink = shrink;
    return abdomenState;
  }

  function headLight(t) {
    let v = 0.94 + 0.05 * Math.sin(TAU * 0.9 * t);
    if (t > 5.88 && t < 6.32) {
      const u = (t - 5.88) / 0.44;
      v += 0.55 * Math.sin(Math.PI * clamp(u, 0, 1));
    }
    return clamp(v, 0.8, 1.55);
  }

  function sceneFade(t) {
    if (t < CONFIG.phases.fade) return 1;
    return clamp(1 - (t - CONFIG.phases.fade) / (STORY_DURATION - CONFIG.phases.fade), 0, 1);
  }

  function drawSprite(sprite, x, y, radius, alpha) {
    if (alpha <= 0.003 || radius <= 0) return;
    ctx.globalAlpha = clamp(alpha, 0, 1);
    ctx.drawImage(sprite, x - radius, y - radius, radius * 2, radius * 2);
  }

  /* ------------------------------------------------------------------ */
  /* Scene layers                                                       */
  /* ------------------------------------------------------------------ */

  function buildInterfaceLayers() {
    interfaceLayers = [];
    function layer(start, end, fadeIn, fadeOut, bounds, paint) {
      const x = Math.floor(px(bounds[0]));
      const y = Math.floor(py(bounds[1]));
      const w = Math.ceil(px(bounds[2] - bounds[0]));
      const h = Math.ceil((bounds[3] - bounds[1]) * sceneHeight);
      const c = document.createElement("canvas");
      c.width = Math.ceil(w * dpr);
      c.height = Math.ceil(h * dpr);
      const g = c.getContext("2d");
      g.scale(dpr, dpr);
      g.translate(-x, -y);
      paint(g);
      interfaceLayers.push({ canvas: c, x, y, width: w, height: h, start, end, fadeIn, fadeOut });
    }
    function metal(g, x, y, w, h, vertical) {
      const finish = g.createLinearGradient(x, y, vertical ? x + w : x, vertical ? y : y + h);
      finish.addColorStop(0, "#99b1bd");
      finish.addColorStop(0.10, "#4b6b7d");
      finish.addColorStop(0.50, "#263e50");
      finish.addColorStop(0.80, "#142737");
      finish.addColorStop(1, "#06121d");
      g.fillStyle = finish;
      g.beginPath();
      g.roundRect(x, y, w, h, 3 * unit);
      g.fill();
      g.strokeStyle = "rgba(194,229,229,0.55)";
      g.lineWidth = Math.max(0.8, unit * 0.6);
      g.stroke();
      g.strokeStyle = "rgba(4,13,22,0.75)";
      g.beginPath();
      if (vertical) { g.moveTo(x + w * 0.7, y + 4 * unit); g.lineTo(x + w * 0.7, y + h - 4 * unit); }
      else { g.moveTo(x + 4 * unit, y + h * 0.72); g.lineTo(x + w - 4 * unit, y + h * 0.72); }
      g.stroke();
    }
    function screw(g, x, y) {
      g.fillStyle = "#a2b3b9";
      g.beginPath(); g.arc(x, y, 1.9 * unit, 0, TAU); g.fill();
      g.strokeStyle = "#182f3c";
      g.lineWidth = unit * 0.7;
      g.beginPath(); g.moveTo(x - unit, y); g.lineTo(x + unit, y); g.stroke();
    }
    layer(1.30, 5.65, 0.45, 0.55, [0.035, 0.345, 0.40, 0.44], (g) => {
      const x = px(0.06), right = px(0.375), y = py(0.40);
      const thickness = Math.min(sceneHeight * 0.035, 15 * unit);
      const silver = g.createLinearGradient(0, y - thickness, 0, y);
      silver.addColorStop(0, "#344f61");
      silver.addColorStop(0.45, "#b1dcde");
      silver.addColorStop(0.72, "#426f80");
      silver.addColorStop(1, "#d9fdf3");
      g.fillStyle = silver;
      g.beginPath();
      g.roundRect(x, y - thickness, right - x, thickness, 3 * unit);
      g.fill();
      g.strokeStyle = "#d8fff2";
      g.lineWidth = 1.1 * unit;
      g.beginPath(); g.moveTo(x, y); g.lineTo(right, y); g.stroke();
      g.save();
      g.beginPath(); g.rect(x, y - thickness, right - x, thickness); g.clip();
      const shine = g.createLinearGradient(x, 0, right, 0);
      shine.addColorStop(0, "rgba(255,255,255,0)");
      shine.addColorStop(0.25, "rgba(255,255,255,0.6)");
      shine.addColorStop(0.45, "rgba(255,255,255,0)");
      shine.addColorStop(0.80, "rgba(255,255,255,0.35)");
      shine.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = shine; g.fillRect(x, y - thickness, right - x, thickness * 0.65);
      g.restore();
      [x, right - 5 * unit].forEach(edge => {
        metal(g, edge, y - thickness - 2 * unit, 5 * unit, thickness + 4 * unit, true);
      });
    });
    layer(4.90, 7.65, 0.5, 0.6, [0.42, 0.10, 0.77, 0.48], (g) => {
      const x = px(0.44), right = px(0.71), top = py(0.14), bottom = py(0.44);
      const depth = 10 * unit;
      const glass = g.createLinearGradient(x, top, right, bottom);
      glass.addColorStop(0, "rgba(155,237,235,0.27)");
      glass.addColorStop(0.35, "rgba(60,153,175,0.10)");
      glass.addColorStop(1, "rgba(89,205,195,0.23)");
      g.fillStyle = glass;
      g.strokeStyle = "rgba(184,244,237,0.60)";
      g.lineWidth = unit * 0.8;
      g.beginPath(); g.roundRect(x, top, right - x, bottom - top, 4 * unit); g.fill(); g.stroke();
      g.fillStyle = "rgba(143,217,225,0.17)";
      g.beginPath(); g.moveTo(x, top); g.lineTo(x + depth, top - depth * 0.7);
      g.lineTo(right + depth, top - depth * 0.7); g.lineTo(right, top); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = "rgba(31,92,117,0.43)";
      g.beginPath(); g.moveTo(right, top); g.lineTo(right + depth, top - depth * 0.7);
      g.lineTo(right + depth, bottom - depth * 0.7); g.lineTo(right, bottom); g.closePath(); g.fill(); g.stroke();
      g.strokeStyle = "rgba(235,255,242,0.91)";
      g.lineWidth = 1.4 * unit;
      g.beginPath(); g.moveTo(x, top + 4 * unit); g.lineTo(x, bottom - 4 * unit); g.stroke();
      g.save();
      g.beginPath(); g.rect(x + 2 * unit, top + 2 * unit, right - x - 4 * unit, bottom - top - 4 * unit); g.clip();
      const gloss = g.createLinearGradient(x, 0, right, 0);
      gloss.addColorStop(0, "rgba(227,255,248,0)");
      gloss.addColorStop(0.45, "rgba(227,255,248,0.12)");
      gloss.addColorStop(0.55, "rgba(227,255,248,0)");
      g.fillStyle = gloss;
      g.translate(px(0.02), 0); g.transform(1, 0, -0.25, 1, 0, 0);
      g.fillRect(x, top, right - x, bottom - top);
      g.restore();
    });
    layer(7.50, 11.70, 0.45, 0.7, [0.365, 0.50, 0.815, 0.60], (g) => {
      const y = py(0.552), gap = Math.max(px(0.007), 6 * unit);
      [[px(0.38), px(0.55) - gap], [px(0.55) + gap, px(0.66) - gap], [px(0.66) + gap, px(0.80)]].forEach(([a, b]) => {
        metal(g, a, y - 8 * unit, b - a, 16 * unit, false);
      });
      screw(g, px(0.395), y); screw(g, px(0.785), y);
    });
    layer(10.30, 14.00, 0.4, 0.75, [0.72, 0.115, 0.84, 0.445], (g) => {
      const x = px(0.78), y = py(0.268), gap = Math.max(sceneHeight * 0.016, 7 * unit);
      metal(g, x - 8 * unit, py(0.14), 16 * unit, y - gap - py(0.14), true);
      metal(g, x - 8 * unit, y + gap, 16 * unit, py(0.42) - y - gap, true);
      screw(g, x, py(0.16)); screw(g, x, py(0.40));
    });
  }

  function drawInterfaces(t, fade) {
    ctx.save();
    interfaceLayers.forEach((layer) => {
      const a = windowAlpha(t, layer.start, layer.end, layer.fadeIn, layer.fadeOut);
      if (a <= 0) return;
      ctx.globalAlpha = a * fade;
      ctx.drawImage(layer.canvas, layer.x, layer.y, layer.width, layer.height);
    });
    ctx.strokeStyle = CONFIG.colors.interface;
    ctx.lineWidth = Math.max(1, unit);
    ctx.setLineDash([3, 6]);
    const ghost = windowAlpha(t, 2.90, 3.95, 0.06, 0.75);
    if (ghost > 0) {
      ctx.globalAlpha = ghost * fade * 0.5;
      ctx.beginPath();
      ctx.moveTo(px(0.22), py(0.40));
      ctx.lineTo(px(0.286), py(0.268));
      ctx.stroke();
    }
    const normal = windowAlpha(t, 5.95, 6.95, 0.15, 0.6);
    if (normal > 0) {
      ctx.globalAlpha = normal * fade * 0.5;
      ctx.beginPath();
      ctx.moveTo(px(0.390), py(0.327));
      ctx.lineTo(px(0.490), py(0.327));
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawInterferenceLight(t, fade) {
    if (t < 8.05 || t > 12.25) return;
    const appear = windowAlpha(t, 8.05, 12.25, 0.3, 0.6);
    const boost = Math.exp(-Math.pow((t - 8.75) / 0.42, 2));
    const breathe = 0.82 + 0.18 * Math.sin(t * 2.2);
    const a = appear * fade;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = a * 0.18;
    ctx.fillStyle = "rgba(160,225,180,0.5)";
    ctx.beginPath();
    ctx.moveTo(px(0.55), py(0.552));
    ctx.lineTo(px(0.43), py(0.83));
    ctx.lineTo(px(0.74), py(0.83));
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(px(0.66), py(0.552));
    ctx.lineTo(px(0.52), py(0.83));
    ctx.lineTo(px(0.80), py(0.83));
    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = a * (0.42 + 0.38 * boost) * breathe;
    ctx.drawImage(bandSprite, px(0.605 - 0.161), py(0.565), px(0.322), sceneHeight * 0.255);
    ctx.restore();
  }

  function drawSplitTrail(t, fade) {
    trail.forEach((dot) => {
      if (!dot.active || dot.branch < 0) return;
      const age = t - dot.born;
      if (age < 0 || age > 1.4) return;
      const slitX = dot.branch === 0 ? 0.55 : 0.66;
      const u = clamp(age / 1.4, 0, 1);
      const x = u < 0.35
        ? lerp(dot.x / width, slitX, u / 0.35)
        : lerp(slitX, dot.branch === 0 ? 0.592 : 0.63, (u - 0.35) / 0.65);
      const y = u < 0.35
        ? lerp(Math.min((dot.y - sceneTop) / sceneHeight, 0.50), 0.552, u / 0.35)
        : lerp(0.552, 0.775, (u - 0.35) / 0.65);
      drawSprite(sprites.small, px(x), py(y), 4 * unit, 0.8 * (1 - u) * fade);
    });
  }

  function drawDiffraction(t, fade) {
    if (t < 11.15 || t > 14.1) return;
    const grow = easeOut(clamp((t - 11.15) / 0.55, 0, 1));
    const a = windowAlpha(t, 11.15, 14.1, 0.12, 0.75) * fade;
    const cx = px(0.78);
    const cy = py(0.268);
    const radius = Math.min(width, sceneHeight) * 0.31 * grow;
    const spread = Math.PI / 6;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = a;
    const fan = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    fan.addColorStop(0, "rgba(238,255,200,0.30)");
    fan.addColorStop(0.35, "rgba(220,255,170,0.10)");
    fan.addColorStop(1, "rgba(210,255,160,0)");
    ctx.fillStyle = fan;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, -spread, spread);
    ctx.closePath();
    ctx.fill();

    for (let i = 1; i <= 4; i++) {
      const rr = radius * (i / 4.7);
      ctx.globalAlpha = a * (0.34 - i * 0.055);
      ctx.strokeStyle = "rgba(232,255,190,0.9)";
      ctx.lineWidth = Math.max(0.8, 1.0 * unit);
      ctx.beginPath();
      ctx.arc(cx, cy, rr, -spread, spread);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawStationGlows(t, fade) {
    if (t < 2.8) return;
    const stations = [
      [0.220, 0.400, 2.86],
      [0.440, 0.327, 5.95],
      [0.605, 0.552, 8.55],
      [0.780, 0.268, 11.15]
    ];
    stations.forEach(([x, y, born], i) => {
      const a = clamp((t - born) / 1.2, 0, 1);
      if (a <= 0) return;
      const pulse = 0.55 + 0.45 * Math.sin(t * 1.7 + i * 1.9);
      const gatherFade = t > CONFIG.phases.gather ? clamp(1 - (t - CONFIG.phases.gather) / 2.4, 0, 1) : 1;
      drawSprite(sprites.small, px(x), py(y), (3.4 + pulse * 1.1) * unit, 0.22 * a * pulse * gatherFade * fade);
    });
  }

  function drawReflectionSpark(t, fade) {
    const a = windowAlpha(t, 2.86, 3.75, 0.05, 0.7);
    if (a <= 0) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 3; i++) {
      const u = clamp((t - 2.86 - i * 0.05) / 0.55, 0, 1);
      if (u <= 0 || u >= 1) continue;
      ctx.globalAlpha = a * (1 - u) * 0.5 * fade;
      ctx.strokeStyle = "rgba(210,245,225,0.9)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(px(0.22), py(0.40), (4 + u * 16) * unit, Math.PI * 0.9, Math.PI * 1.85);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawRefractionSpark(t, fade) {
    const a = windowAlpha(t, 5.88, 6.6, 0.08, 0.5);
    if (a <= 0) return;
    const u = clamp((t - 5.88) / 0.5, 0, 1);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = a * (1 - u) * 0.45 * fade;
    ctx.strokeStyle = "rgba(220,250,235,0.9)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(px(0.441), py(0.327), (3 + u * 12) * unit, 0, TAU);
    ctx.stroke();
    ctx.restore();
  }

  /* ------------------------------------------------------------------ */
  /* Firefly                                                            */
  /* ------------------------------------------------------------------ */

  function fireflyParts(t) {
    const m = motionAt(t);
    const dir = m.dir;
    const hover = clamp(1 - m.speed / 0.05, 0, 1);
    mainFly.hover = hover;
    mainFly.head.x = px(m.x) + dir.x * 3.0 * unit;
    mainFly.head.y = py(m.y) + dir.y * 3.0 * unit;
    mainFly.abdomen.x = px(m.x) - dir.x * 4.6 * unit;
    mainFly.abdomen.y = py(m.y) - dir.y * 4.6 * unit;
    return mainFly;
  }

  function drawHeadGlow(parts, scale, intensity, fade) {
    drawSprite(sprites.head, parts.head.x, parts.head.y, 13 * unit * scale, intensity * 0.9 * fade);
    ctx.globalAlpha = Math.min(1, intensity) * fade;
    ctx.fillStyle = CONFIG.colors.head;
    ctx.beginPath();
    ctx.arc(parts.head.x, parts.head.y, 2.7 * unit, 0, TAU);
    ctx.fill();
  }

  function drawAbdomenGlow(parts, scale, intensity, fade) {
    drawSprite(sprites.abdomen, parts.abdomen.x, parts.abdomen.y, 21 * unit * scale, intensity * fade);
    ctx.save();
    ctx.globalAlpha = intensity * fade;
    ctx.fillStyle = CONFIG.colors.abdomenCore;
    ctx.translate(parts.abdomen.x, parts.abdomen.y);
    ctx.rotate(Math.atan2(parts.dir.y, parts.dir.x));
    ctx.beginPath();
    ctx.ellipse(0, 0, 4.7 * unit * scale, 3.2 * unit * scale, 0, 0, TAU);
    ctx.fill();
    ctx.globalAlpha = intensity * 0.75 * fade;
    ctx.fillStyle = "#f4ffcf";
    ctx.beginPath(); ctx.ellipse(-0.6 * unit, -0.8 * unit, 2.8 * unit * scale, 1.4 * unit * scale, -0.12, 0, TAU); ctx.fill();
    ctx.restore();
  }

  function drawFirefly(t, fade, staticMode) {
    const parts = fireflyParts(t);
    const tremorHz = CONFIG.glowTremorHz * (0.83 + clamp(parts.m.speed / 0.1, 0, 1) * 0.26);
    const tremor = staticMode ? 1 : 1 + 0.03 * Math.sin(t * TAU * tremorHz);
    const light = staticMode ? { intensity: 0.95, shrink: 0 } : abdomenLight(t);
    const abdomenScale = (1 + 0.14 * parts.hover) * (1 - light.shrink) * tremor;
    const headScale = (1 + 0.06 * parts.hover) * tremor;
    const headI = staticMode ? 1 : headLight(t);

    ctx.save();
    ctx.globalAlpha = fade;
    ctx.translate(px(parts.m.x), py(parts.m.y));
    ctx.rotate(Math.atan2(parts.dir.y, parts.dir.x));
    ctx.drawImage(sprites.body, -20 * unit, -12 * unit, 40 * unit, 24 * unit);
    ctx.restore();
    ctx.save();
    drawHeadGlow(parts, headScale, headI, fade);
    drawAbdomenGlow(parts, abdomenScale, light.intensity, fade);
    ctx.restore();

    let lookX = 0.55 * clamp(parts.m.speed / 0.08, 0, 1);
    let lookY = 0;
    if (t > 6.25 && t < 7.25) lookX = -1.1;
    if (t < 1.45) lookX = 0.45 * Math.sin(t * 2.2);
    if (t > 3.4 && t < 3.95) lookX = -0.45;
    if (staticMode) lookX = 0.4;
    const eyeGap = 1.25 * unit;
    const eyeR = 0.92 * unit;
    const ex = parts.head.x + lookX * unit;
    const ey = parts.head.y + lookY * unit;
    const proud = t > 4.58 && t < 5.08;

    ctx.save();
    ctx.globalAlpha = 0.78 * fade;
    ctx.strokeStyle = "#0b1a18";
    ctx.fillStyle = "#0b1a18";
    if (proud && !staticMode) {
      ctx.lineWidth = Math.max(0.9, 1.15 * unit);
      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.arc(ex + side * eyeGap, ey + 1.1 * unit, 1.35 * unit, Math.PI * 1.08, Math.PI * 1.92);
        ctx.stroke();
      });
    } else {
      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.arc(ex + side * eyeGap, ey, eyeR, 0, TAU);
        ctx.fill();
        ctx.fillStyle = "#fffbe6";
        ctx.beginPath(); ctx.arc(ex + side * eyeGap - 0.2 * unit, ey - 0.2 * unit, 0.22 * unit, 0, TAU); ctx.fill();
        ctx.fillStyle = "#0b1a18";
      });
    }
    ctx.restore();
  }

  function emitTrail(t) {
    if (t > CONFIG.phases.fade) return;
    const parts = fireflyParts(t);
    const limit = trail.length;
    if (!limit) return;
    if (t < trailNextAt) return;
    const dot = trail[trailCursor % limit];
    trailCursor += 1;
    dot.active = true;
    dot.x = parts.abdomen.x;
    dot.y = parts.abdomen.y;
    dot.born = t;
    dot.branch = t >= 7.9 && t < 9.4 ? trailSerial % 2 : -1;
    const gap = 0.10 + 0.20 * hash01(trailSerial * 2.7 + 0.9);
    trailSerial += 1;
    trailNextAt = t + gap;
  }

  function drawTrail(t, fade) {
    const life = 0.95;
    trail.forEach((dot) => {
      if (!dot.active) return;
      const age = t - dot.born;
      if (age < 0 || age > (dot.branch < 0 ? life : 1.4)) {
        dot.active = false;
        return;
      }
      if (dot.branch >= 0) return;
      const k = 1 - age / life;
      drawSprite(sprites.small, dot.x, dot.y, (1.9 + 1.1 * k) * unit, 0.5 * k * k * fade);
    });
  }

  /* ------------------------------------------------------------------ */
  /* OPTICS assemble                                                    */
  /* ------------------------------------------------------------------ */

  function drawGather(t, fade, staticMode) {
    const gather = CONFIG.phases.gather;
    if (t < gather && !staticMode) return;
    const syncPhase = ((t % CONFIG.syncPeriod) + CONFIG.syncPeriod) % CONFIG.syncPeriod / CONFIG.syncPeriod;
    const sync = staticMode ? 0.92 : 0.4 + 0.6 * Math.pow(Math.sin(Math.PI * syncPhase), 2);

    const gathering = staticMode ? 1 : clamp((t - gather) / (CONFIG.phases.hold - gather), 0, 1);
    const arrival = staticMode ? 0 : Math.exp(-Math.pow((t - CONFIG.phases.hold) / 0.3, 2));
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = fade * gathering * (0.28 + 0.18 * sync + 0.24 * arrival);
    ctx.drawImage(sprites.finale, px(0.015), py(0.27), px(0.97), sceneHeight * 0.46);

    // One soft arrival wave, not a strobe; the held word stays still and breathes.
    if (!staticMode && t >= CONFIG.phases.hold - 0.15 && t < CONFIG.phases.hold + 1.0) {
      const wave = clamp((t - CONFIG.phases.hold + 0.15) / 1.15, 0, 1);
      ctx.globalAlpha = 0.32 * Math.sin(Math.PI * wave) * (1 - wave) * fade;
      ctx.strokeStyle = CONFIG.colors.interface;
      ctx.lineWidth = Math.max(1, unit);
      ctx.beginPath();
      ctx.ellipse(px(0.5), py(0.5), px(0.10 + wave * 0.48), sceneHeight * (0.035 + wave * 0.18), 0, 0, TAU);
      ctx.stroke();
    }
    ctx.restore();

    smallFlies.forEach((fly) => {
      const localT = staticMode ? fly.start + fly.dur + 0.2 : t;
      if (localT < fly.start) return;
      const u = clamp((localT - fly.start) / fly.dur, 0, 1);
      const p = fly.position;
      if (u < 0.58) {
        const approach = easeInOut(u / 0.58);
        const angle = fly.cloudAngle - (1 - approach) * Math.PI * 1.4;
        const cloudX = 0.5 + Math.cos(angle) * fly.cloudRadius;
        const cloudY = 0.5 + Math.sin(angle) * fly.cloudRadius * width / sceneHeight;
        p.x = fly.moving ? lerp(fly.sx, cloudX, approach) : cloudX;
        p.y = fly.moving ? lerp(fly.sy, cloudY, approach) : cloudY;
      } else {
        const release = easeOut(clamp((u - 0.58) / 0.42, 0, 1));
        p.x = lerp(fly.cloudX, fly.tx, release);
        p.y = lerp(fly.cloudY, fly.ty, release);
      }
      const lockScale = 1 + 0.045 * arrival;
      p.x = 0.5 + (p.x - 0.5) * lockScale;
      p.y = 0.5 + (p.y - 0.5) * lockScale;
      const scatter = staticMode ? 0 : easeOut(clamp((t - CONFIG.phases.fade) / (STORY_DURATION - CONFIG.phases.fade), 0, 1));
      p.x += Math.cos(fly.seed * TAU) * 0.16 * scatter;
      p.y += Math.sin(fly.seed * TAU) * 0.12 * scatter;
      const alphaIn = clamp(u * 5, 0, 1);
      const bright = u >= 1 ? sync : 0.65 + 0.35 * Math.pow(Math.sin(t * 3.2 + fly.seed * 8), 2);
      const size = u >= 1 ? 1 : fly.size;
      drawSprite(
        sprites.small,
        px(p.x),
        py(p.y),
        (10.5 + 3.2 * bright + 4 * arrival) * glyphUnit * size,
        bright * alphaIn * fade
      );
      ctx.globalAlpha = bright * alphaIn * fade;
      ctx.fillStyle = CONFIG.colors.head;
      ctx.beginPath();
      ctx.arc(px(p.x), py(p.y), (2.05 + 0.3 * arrival) * glyphUnit * size, 0, TAU);
      ctx.fill();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Frame                                                              */
  /* ------------------------------------------------------------------ */

  function drawStaticFrame() {
    ctx.globalAlpha = 1;
    ctx.drawImage(bgCanvas, 0, 0, width, height);
    const t = CONFIG.phases.hold + 0.9;
    drawStationGlows(t, 1);
    drawGather(t, 1, true);
    drawFirefly(t, 1, true);
  }

  function drawFrame(t) {
    ctx.globalAlpha = 1;
    ctx.drawImage(bgCanvas, 0, 0, width, height);
    const fade = sceneFade(t);

    drawStationGlows(t, fade);
    drawInterfaces(t, fade);
    drawInterferenceLight(t, fade);
    drawSplitTrail(t, fade);
    drawDiffraction(t, fade);
    drawReflectionSpark(t, fade);
    drawRefractionSpark(t, fade);
    drawTrail(t, fade);
    drawFirefly(t, fade, false);
    drawGather(t, fade, false);

    if (fade < 1) {
      ctx.save();
      ctx.globalAlpha = 1 - fade;
      ctx.fillStyle = "#08131e";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
  }

  function tick(now) {
    rafId = 0;
    if (!running || destroyed) return;
    if (!lastFrame) lastFrame = now;
    const dt = Math.min(0.05, Math.max(0, (now - lastFrame) / 1000));
    lastFrame = now;
    if (!paused && !document.hidden) {
      elapsed += dt;
      if (elapsed >= CONFIG.duration) {
        if (!CONFIG.autoLoop) {
          elapsed = CONFIG.duration;
          running = false;
          paused = true;
          syncToggle();
          drawStaticFrame();
          return;
        }
        elapsed %= CONFIG.duration;
        trailNextAt = 0;
        trailCursor = 0;
        trailSerial += 7;
        trail.forEach((dot) => { dot.active = false; });
      }
      emitTrail(storyTime(elapsed));
    }
    drawFrame(storyTime(elapsed));
    rafId = requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------ */
  /* Lifecycle                                                          */
  /* ------------------------------------------------------------------ */

  function resize() {
    if (destroyed) return;
    width = Math.max(1, stage.clientWidth);
    height = Math.max(1, stage.clientHeight);
    sceneTop = 0;
    sceneHeight = height;
    if (window.innerWidth <= 650) {
      // Reframe the scene above the copy, without squashing the fly or its glow.
      const copy = document.querySelector(".hero-copy");
      sceneTop = 76;
      sceneHeight = Math.max(1, copy.getBoundingClientRect().top - stage.getBoundingClientRect().top - sceneTop - 24);
    }
    // A full-screen canvas must not multiply into an unbounded HiDPI bitmap.
    dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxDPR, Math.sqrt(4000000 / (width * height)));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    unit = narrowScreen() ? 1.35 : clamp(Math.min(width, height) / 480, 1.4, 2.25);
    glyphUnit = clamp(width * 0.86 / 34 / 13.5, 0.75, 4);
    buildBackground();
    buildSprites();
    buildInterfaceLayers();
    buildSmallFlies();
    const trailCount = narrowScreen() ? CONFIG.trailDotCountNarrow : CONFIG.trailDotCount;
    trail = Array.from({ length: trailCount }, () => ({ active: false, x: 0, y: 0, born: 0, branch: -1 }));
    trailCursor = 0;
    trailNextAt = storyTime(elapsed);
    if (reduceQuery.matches) drawStaticFrame();
    else drawFrame(storyTime(elapsed));
  }

  function scheduleResize() {
    if (destroyed) return;
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 90);
  }

  function syncToggle() {
    if (!toggle) return;
    toggle.classList.toggle("is-paused", paused);
    toggle.setAttribute("aria-pressed", paused ? "true" : "false");
    toggle.setAttribute("aria-label", paused ? "播放动画" : "暂停动画");
  }

  function start() {
    if (destroyed) return;
    if (reduceQuery.matches) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      paused = false;
      running = false;
      if (toggle) toggle.hidden = true;
      drawStaticFrame();
      return;
    }
    if (toggle) toggle.hidden = !CONFIG.showPauseButton;
    paused = false;
    syncToggle();
    if (running || document.hidden) return;
    if (elapsed >= CONFIG.duration) {
      elapsed = 0;
      trailNextAt = 0;
      trail.forEach((dot) => { dot.active = false; });
    }
    running = true;
    lastFrame = 0;
    rafId = requestAnimationFrame(tick);
  }

  function pause() {
    if (destroyed) return;
    paused = true;
    syncToggle();
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    running = false;
  }

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    clearTimeout(resizeTimer);
    if (resizeObserver) resizeObserver.disconnect();
    window.removeEventListener("resize", scheduleResize);
    document.removeEventListener("visibilitychange", onVisibility);
    if (toggle) toggle.removeEventListener("click", onToggle);
    if (reduceQuery.removeEventListener) reduceQuery.removeEventListener("change", onMotionPreference);
    smallFlies = [];
    letterTargets = [];
    trail = [];
    interfaceLayers = [];
    sprites = null;
    bandSprite = null;
    bgCanvas.width = bgCanvas.height = 0;
    if (toggle) toggle.hidden = true;
    ctx.clearRect(0, 0, width, height);
  }

  function onToggle() {
    if (paused) start();
    else pause();
  }

  function onVisibility() {
    if (document.hidden) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      running = false;
      lastFrame = 0;
    } else if (!paused && !reduceQuery.matches) start();
  }

  function onMotionPreference() {
    if (reduceQuery.matches) {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      running = false;
      lastFrame = 0;
      if (toggle) toggle.hidden = true;
      drawStaticFrame();
    } else {
      if (toggle) toggle.hidden = !CONFIG.showPauseButton;
      if (!paused) start();
      else {
        drawFrame(storyTime(elapsed));
        syncToggle();
      }
    }
  }

  if (toggle) {
    toggle.hidden = !CONFIG.showPauseButton;
    toggle.addEventListener("click", onToggle);
  }
  window.addEventListener("resize", scheduleResize);
  document.addEventListener("visibilitychange", onVisibility);
  if (reduceQuery.addEventListener) reduceQuery.addEventListener("change", onMotionPreference);

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(scheduleResize);
    resizeObserver.observe(stage);
  }

  resize();
  start();

  window.FireflyHero = {
    start,
    pause,
    destroy,
    CONFIG
  };
})();

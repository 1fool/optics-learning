// A sampled scalar, paraxial Fourier-optics preview. Not a measurement or a general-purpose diffraction solver.
(() => {
  const N = 128, dx = 8e-6, lambda = 532e-9, length = N * dx;
  const size = N * N;
  const index = (x, y) => y * N + x;
  const signed = x => x < N / 2 ? x : x - N;
  const copy = field => ({ re: Float64Array.from(field.re), im: Float64Array.from(field.im) });

  function fftLine(re, im, inverse) {
    for (let i = 1, j = 0; i < N; i++) {
      let bit = N >> 1;
      for (; j & bit; bit >>= 1) j ^= bit;
      j ^= bit;
      if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; }
    }
    for (let len = 2; len <= N; len <<= 1) {
      const angle = (inverse ? 2 : -2) * Math.PI / len;
      const wr = Math.cos(angle), wi = Math.sin(angle);
      for (let i = 0; i < N; i += len) {
        let ur = 1, ui = 0;
        for (let j = 0; j < len / 2; j++) {
          const a = i + j, b = a + len / 2;
          const vr = re[b] * ur - im[b] * ui, vi = re[b] * ui + im[b] * ur;
          re[b] = re[a] - vr; im[b] = im[a] - vi;
          re[a] += vr; im[a] += vi;
          [ur, ui] = [ur * wr - ui * wi, ur * wi + ui * wr];
        }
      }
    }
    if (inverse) for (let i = 0; i < N; i++) { re[i] /= N; im[i] /= N; }
  }
  function fft2(field, inverse = false) {
    const output = copy(field), r = new Float64Array(N), m = new Float64Array(N);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) { r[x] = output.re[index(x, y)]; m[x] = output.im[index(x, y)]; }
      fftLine(r, m, inverse);
      for (let x = 0; x < N; x++) { output.re[index(x, y)] = r[x]; output.im[index(x, y)] = m[x]; }
    }
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) { r[y] = output.re[index(x, y)]; m[y] = output.im[index(x, y)]; }
      fftLine(r, m, inverse);
      for (let y = 0; y < N; y++) { output.re[index(x, y)] = r[y]; output.im[index(x, y)] = m[y]; }
    }
    return output;
  }
  function object() {
    const re = new Float64Array(size), im = new Float64Array(size);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const letter = (x >= 45 && x <= 51 && y >= 35 && y <= 92) ||
        (y >= 35 && y <= 41 && x >= 45 && x <= 87) ||
        (y >= 58 && y <= 64 && x >= 45 && x <= 78);
      re[index(x, y)] = .65 * Number(letter);
    }
    return { re, im };
  }
  function applyTransfer(spectrum, z) {
    const out = copy(spectrum);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const id = index(x, y), fx = signed(x) / length, fy = signed(y) / length;
      // Global exp(ikz) is omitted: it cannot change the displayed intensity.
      const phase = -Math.PI * lambda * z * (fx * fx + fy * fy);
      const c = Math.cos(phase), s = Math.sin(phase), r = out.re[id], i = out.im[id];
      out.re[id] = r * c - i * s; out.im[id] = r * s + i * c;
    }
    return out;
  }
  const source = object(), sourceSpectrum = fft2(source);
  const hologramObject = source, hologramSpectrum = sourceSpectrum;
  const propagationCache = new Map(), hologramCache = new Map();
  function propagation(mm) {
    const rounded = Math.round(mm);
    if (!propagationCache.has(rounded)) {
      const transfer = applyTransfer(sourceSpectrum, rounded / 1000);
      propagationCache.set(rounded, { transfer, field: fft2(transfer, true) });
    }
    return propagationCache.get(rounded);
  }
  function holography(carrier) {
    const fc = Math.round(carrier);
    if (!hologramCache.has(fc)) {
      const sensor = fft2(applyTransfer(hologramSpectrum, .03), true);
      const recorded = { re: new Float64Array(size), im: new Float64Array(size) };
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const id = index(x, y), phase = 2 * Math.PI * fc * x / N;
        const r = sensor.re[id] + Math.cos(phase), i = sensor.im[id] + Math.sin(phase);
        recorded.re[id] = r * r + i * i; // sensor intensity |O + R|², not a complex-field measurement.
      }
      const frequency = fft2(recorded);
      const filtered = { re: new Float64Array(size), im: new Float64Array(size) };
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const radius = Math.hypot(signed(x) + fc, signed(y));
        if (radius >= 15) continue; // sideband O R* centered at -fc; taper reduces edge ringing.
        const window = .5 * (1 + Math.cos(Math.PI * radius / 15));
        const id = index(x, y);
        filtered.re[id] = frequency.re[id] * window;
        filtered.im[id] = frequency.im[id] * window;
      }
      const band = fft2(filtered, true);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const id = index(x, y), phase = 2 * Math.PI * fc * x / N;
        const c = Math.cos(phase), s = Math.sin(phase), r = band.re[id], i = band.im[id];
        band.re[id] = r * c - i * s; band.im[id] = r * s + i * c;
      }
      const back = fft2(applyTransfer(fft2(band), -.03), true);
      hologramCache.set(fc, { recorded, back });
    }
    return hologramCache.get(fc);
  }
  function image(field, mode, shift = false) {
    const values = new Float64Array(size);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const from = index(shift ? (x + N / 2) % N : x, shift ? (y + N / 2) % N : y);
      const id = index(x, y), energy = field.re[from] ** 2 + field.im[from] ** 2;
      values[id] = mode === "amplitude" ? Math.sqrt(energy) : mode === "log" ? Math.log1p(Math.sqrt(energy)) : energy;
    }
    const max = Math.max(...values) || 1;
    const offscreen = document.createElement("canvas"); offscreen.width = N; offscreen.height = N;
    const data = offscreen.getContext("2d").createImageData(N, N);
    for (let id = 0; id < size; id++) {
      const v = Math.max(0, Math.min(1, values[id] / max)) ** (mode === "intensity" ? .55 : .8);
      data.data[4 * id] = 25 + Math.round(210 * v);
      data.data[4 * id + 1] = 33 + Math.round(168 * v);
      data.data[4 * id + 2] = 38 + Math.round(105 * v);
      data.data[4 * id + 3] = 255;
    }
    offscreen.getContext("2d").putImageData(data, 0, 0);
    return offscreen;
  }
  const inputImage = image(source, "amplitude"), spectrumImage = image(sourceSpectrum, "log", true);
  const letterImage = inputImage;
  function propagatedImage(mm) {
    const item = propagation(mm);
    return item.picture ||= image(item.field, "intensity");
  }
  function hologramImages(carrier) {
    const item = holography(carrier);
    item.recordingImage ||= image(item.recorded, "intensity");
    item.backImage ||= image(item.back, "amplitude");
    return item;
  }
  function transferImage(mm) {
    const offscreen = document.createElement("canvas"); offscreen.width = N; offscreen.height = N;
    const pixels = offscreen.getContext("2d").createImageData(N, N);
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const fx = signed(x) / length, fy = signed(y) / length;
      const phase = -Math.PI * lambda * mm / 1000 * (fx * fx + fy * fy);
      const id = index((x + N / 2) % N, (y + N / 2) % N) * 4;
      pixels.data[id] = 130 + 100 * Math.cos(phase);
      pixels.data[id + 1] = 122 + 90 * Math.cos(phase + 2);
      pixels.data[id + 2] = 130 + 100 * Math.sin(phase);
      pixels.data[id + 3] = 255;
    }
    offscreen.getContext("2d").putImageData(pixels, 0, 0);
    return offscreen;
  }
  function pane(ctx, img, x, y, width, height, label, number) {
    ctx.fillStyle = "#28312f"; ctx.fillRect(x - 2, y - 2, width + 4, height + 4);
    ctx.imageSmoothingEnabled = true; ctx.drawImage(img, x, y, width, height);
    ctx.fillStyle = "#262b29"; ctx.font = "bold 15px Consolas, sans-serif";
    ctx.fillText(`${number}  ${label}`, x, y + height + 29);
  }
  function compactPaint(ctx, act, mm, carrier, stage, zh) {
    ctx.fillStyle = "#faf5e9"; ctx.fillRect(0, 0, 480, ctx.canvas.height);
    const holo = act === 2 ? hologramImages(carrier) : null;
    const pictures = act === 2 ? [letterImage, holo.recordingImage, holo.backImage] :
      act === 1 ? [inputImage, spectrumImage, transferImage(mm), propagatedImage(mm)] :
        [inputImage, spectrumImage, propagatedImage(mm)];
    const names = act === 2 ? (zh ? ["物光目标", "全息记录", "反传重建"] : ["OBJECT", "HOLOGRAM", "RECONSTRUCTION"]) :
      act === 1 ? (zh ? ["初始光场", "FFT 光谱", "传播相位", "逆变换强度"] : ["INITIAL FIELD", "FFT SPECTRUM", "TRANSFER PHASE", "INVERSE FFT"]) :
        (zh ? ["F 形透射物", "空间频谱", "传播后强度"] : ["F APERTURE", "SPECTRUM", "INTENSITY"]);
    const rowHeight = act === 1 ? 169 : 214, size = act === 1 ? 136 : 177;
    pictures.forEach((picture, i) => {
      const y = 64 + i * rowHeight;
      ctx.fillStyle = "#28312f"; ctx.fillRect(25, y, size, size);
      ctx.drawImage(picture, 27, y + 2, size - 4, size - 4);
      ctx.fillStyle = "#873c2d"; ctx.font = "bold 22px Consolas, sans-serif";
      ctx.fillText(`0${i + 1}`, 224, y + 44);
      ctx.fillStyle = "#262b29"; ctx.font = 'bold 22px "Microsoft YaHei", sans-serif';
      ctx.fillText(names[i], 224, y + 83);
      if (i === stage && act !== 0) {
        ctx.strokeStyle = "#b53e2a"; ctx.lineWidth = 4; ctx.strokeRect(21, y - 4, size + 8, size + 8);
      }
      if (i < pictures.length - 1) {
        ctx.fillStyle = "#873c2d"; ctx.font = "bold 18px Consolas, sans-serif";
        ctx.fillText(act === 2 ? (i === 0 ? "O + R ↓" : "FFT / IFFT ↓") : (i === 0 ? "FFT ↓" : "H · IFFT ↓"), 224, y + 125);
      }
    });
  }
  function paint(ctx, act, mm, carrier, stage, lang) {
    const zh = lang === "zh";
    if (ctx.canvas.width === 480) { compactPaint(ctx, act, mm, carrier, stage, zh); return; }
    ctx.fillStyle = "#faf5e9"; ctx.fillRect(0, 0, 960, 540);
    ctx.strokeStyle = "#e5dfd1"; ctx.lineWidth = 1;
    for (let x = 0; x <= 960; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 540); ctx.stroke(); }
    for (let y = 0; y <= 540; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(960, y); ctx.stroke(); }
    if (act === 0) {
      pane(ctx, inputImage, 38, 111, 262, 262, zh ? "F 形物光 U₀" : "F OBJECT U₀", "01");
      pane(ctx, spectrumImage, 349, 111, 262, 262, zh ? "空间频谱" : "SPECTRUM", "02");
      pane(ctx, propagatedImage(mm), 660, 111, 262, 262, zh ? "传播后强度" : "INTENSITY", "03");
    } else if (act === 1) {
      const panes = [inputImage, spectrumImage, transferImage(mm), propagatedImage(mm)];
      const names = zh ? ["初始光场", "FFT 光谱", "传播相位 H", "逆变换强度"] : ["INITIAL FIELD", "FFT SPECTRUM", "TRANSFER PHASE", "INVERSE FFT"];
      for (let i = 0; i < 4; i++) {
        const x = 38 + i * 232, width = 194;
        pane(ctx, panes[i], x, 129, width, 255, names[i], `0${i + 1}`);
        if (i === stage) { ctx.strokeStyle = "#b53e2a"; ctx.lineWidth = 6; ctx.strokeRect(x - 7, 122, width + 14, 269); }
      }
    } else {
      const result = hologramImages(carrier);
      pane(ctx, letterImage, 38, 111, 262, 262, zh ? "物光目标" : "OBJECT", "01");
      pane(ctx, result.recordingImage, 349, 111, 262, 262, zh ? "离轴干涉记录" : "HOLOGRAM", "02");
      pane(ctx, result.backImage, 660, 111, 262, 262, zh ? "滤波与反传重建" : "RECONSTRUCTION", "03");
      const x = [38, 349, 660][Math.min(2, stage)];
      ctx.strokeStyle = "#b53e2a"; ctx.lineWidth = 6; ctx.strokeRect(x - 7, 104, 276, 276);
    }
  }
  function energy(field) { let sum = 0; for (let i = 0; i < size; i++) sum += field.re[i] ** 2 + field.im[i] ** 2; return sum; }
  function reconstructionCorrelation() {
    const field = holography(24).back;
    let sx = 0, sy = 0, sxx = 0, syy = 0, sxy = 0;
    for (let i = 0; i < size; i++) {
      const x = source.re[i], y = Math.hypot(field.re[i], field.im[i]);
      sx += x; sy += y; sxx += x * x; syy += y * y; sxy += x * y;
    }
    return (size * sxy - sx * sy) / Math.sqrt((size * sxx - sx * sx) * (size * syy - sy * sy));
  }
  window.FourierCoverPhysics = {
    paint,
    energyCheck: () => ({ initial: energy(source), propagated: energy(propagation(30).field) }),
    hologramCheck: () => ({ object: energy(source), reconstructed: energy(holography(24).back), correlation: reconstructionCorrelation() }),
  };
})();

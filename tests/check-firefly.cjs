"use strict";
// Developer-only: provide Playwright via NODE_PATH; the website has no dependencies.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "tmp", "hero-check");
fs.mkdirSync(output, { recursive: true });
const source = fs.readFileSync(path.join(root, "firefly-hero.js"), "utf8");
// Test instrumentation stays out of the shipped animation and its public API.
const instrumented = source.replace("  window.FireflyHero = {", `
  window.__heroDebug = {
    pathAt, abdomenLight, headLight, storyTime, ROUTE,
    snapshot: () => ({ elapsed, running, paused, destroyed, width, height, sceneTop, sceneHeight, dpr,
      heading: { ...lastDir },
      trails: trail.length, activeTrail: trail.filter(dot => dot.active).length,
      branches: trail.filter(dot => dot.active && dot.branch >= 0).map(dot => dot.branch),
      flies: smallFlies.length, moving: smallFlies.filter(fly => fly.moving).length,
      targets: letterTargets, layers: interfaceLayers.length,
      particleCount: 2 + trail.length + smallFlies.length + 4 }),
    refs: () => [mainFly, ...trail, ...smallFlies],
  };
  window.FireflyHero = {`);
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };
const server = http.createServer((request, response) => {
  const name = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const file = path.resolve(root, "." + (name.endsWith("/") ? name + "index.html" : name));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) {
    response.writeHead(404).end();
    return;
  }
  response.setHeader("Content-Type", mime[path.extname(file)] || "application/octet-stream");
  response.end(file.endsWith("firefly-hero.js") ? instrumented : fs.readFileSync(file));
});

function installFrameDriver() {
  let now = 1000;
  let next = 0;
  let hidden = false;
  const callbacks = new Map();
  window.requestAnimationFrame = callback => { callbacks.set(++next, callback); return next; };
  window.cancelAnimationFrame = id => callbacks.delete(id);
  Object.defineProperty(document, "hidden", { get: () => hidden });
  window.__draws = 0;
  const original = CanvasRenderingContext2D.prototype.drawImage;
  CanvasRenderingContext2D.prototype.drawImage = function (...args) {
    window.__draws++;
    return original.apply(this, args);
  };
  window.__frames = {
    pending: () => callbacks.size,
    advance(seconds, step = 0.05) {
      const frames = Math.ceil(seconds / step);
      for (let i = 0; i < frames; i++) {
        now += seconds / frames * 1000;
        const work = Array.from(callbacks.values());
        callbacks.clear();
        for (const callback of work) callback(now);
      }
    },
    hidden(value) {
      hidden = value;
      document.dispatchEvent(new Event("visibilitychange"));
    },
  };
}

(async () => {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const results = [];
  const errors = [];
  function pass(name, details = {}) {
    results.push({ name, ...details });
    console.log("PASS", name, JSON.stringify(details));
  }
  async function open(options = {}) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...options });
    await context.addInitScript(installFrameDriver);
    const page = await context.newPage();
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    page.on("requestfailed", request => errors.push(request.failure().errorText));
    await page.goto(base);
    await page.waitForTimeout(200); // Allow the resize observer's single debounced refresh.
    await page.evaluate(() => window.__frames.advance(0.05));
    return { context, page };
  }
  async function advance(page, seconds, step) {
    await page.evaluate(([seconds, step]) => window.__frames.advance(seconds, step), [seconds, step]);
  }
  async function state(page) {
    return page.evaluate(() => window.__heroDebug.snapshot());
  }
  async function layout(page) {
    return page.evaluate(() => {
      const stage = document.querySelector("[data-firefly-hero]");
      const canvas = stage.querySelector("canvas");
      const box = stage.getBoundingClientRect();
      const style = getComputedStyle(stage);
      return { overflow: document.documentElement.scrollWidth > innerWidth,
        left: box.left, top: box.top, viewportWidth: innerWidth, viewportHeight: innerHeight,
        border: style.borderTopWidth, radius: style.borderTopLeftRadius,
        width: stage.clientWidth, height: stage.clientHeight,
        canvasWidth: canvas.clientWidth, canvasHeight: canvas.clientHeight,
        bitmapPixels: canvas.width * canvas.height };
    });
  }
  try {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 1920, height: 1080 }, { width: 390, height: 844 }, { width: 320, height: 568 }, { width: 844, height: 390 }, { width: 568, height: 320 }]) {
      const { context, page } = await open({ viewport, deviceScaleFactor: 3 });
      const initial = await layout(page);
      assert.equal(initial.overflow, false);
      assert.equal(initial.width, initial.canvasWidth);
      assert.equal(initial.height, initial.canvasHeight);
      assert.equal(initial.left, 0);
      assert.equal(initial.top, 0);
      assert.equal(initial.width, viewport.width);
      assert.equal(initial.height, viewport.height);
      assert.equal(initial.border, "0px");
      assert.equal(initial.radius, "0px");
      assert.ok(initial.bitmapPixels <= 4000000 + viewport.width + viewport.height);
      const snapshot = await state(page);
      assert.equal(snapshot.dpr, Math.min(2, Math.sqrt(4000000 / (viewport.width * viewport.height))));
      assert.equal(snapshot.trails, viewport.width < 768 ? 4 : 8);
      assert.equal(snapshot.moving, viewport.width < 768 ? 30 : 48);
      assert.equal(snapshot.flies, 81);
      assert.equal(snapshot.particleCount <= 100, true);
      assert.equal(snapshot.targets.every(point => point.x > 0 && point.x < 1 && point.y > 0 && point.y < 1), true);
      assert.deepEqual(Array.from({ length: 6 }, (_, letter) => snapshot.targets.filter(point => point.letter === letter).length), [16, 15, 11, 11, 13, 15]);
      assert.ok(Math.abs((Math.min(...snapshot.targets.map(point => point.y)) + Math.max(...snapshot.targets.map(point => point.y))) / 2 - 0.5) < 1e-9);
      assert.equal(new Set(snapshot.targets.map(point => `${point.x},${point.y}`)).size, 81, "Glyph cells must not overlap");
      if (viewport.width <= 650) {
        const copyTop = await page.locator(".hero-copy").evaluate(element => element.getBoundingClientRect().top);
        assert.ok(snapshot.sceneTop + snapshot.sceneHeight * 0.85 + 20 < copyTop, "Mobile optical scene must clear the copy");
      }
      for (const selector of [".hero-copy .button-primary", ".hero-copy .button-text", ".firefly-toggle"]) {
        const target = page.locator(selector);
        assert.ok(await target.evaluate(element => {
          const box = element.getBoundingClientRect();
          return box.left >= 0 && box.right <= innerWidth && box.top >= 0 && box.bottom <= innerHeight && box.height >= 44 && element.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
        }), `${selector} must remain visible, unobscured and usable`);
        await target.click({ trial: true });
      }
      let previous = snapshot.elapsed;
      for (const [time, name] of [[2.9, "reflection"], [6.1, "refraction"], [8.9, "interference"], [11.7, "diffraction"], [16.0, "optics"]]) {
        await advance(page, time - previous, 1 / 60);
        previous = (await state(page)).elapsed;
        await page.locator("[data-firefly-hero]").screenshot({ scale: "css", path: path.join(output, `${viewport.width}-${name}.png`) });
        if (name === "interference") {
          const branches = (await state(page)).branches;
          assert.ok(branches.includes(0) && branches.includes(1), "Both slit branches must use the trail ring");
        }
      }
      await advance(page, 17 - previous);
      await page.locator("[data-firefly-hero]").screenshot({ scale: "css", path: path.join(output, `${viewport.width}-optics-peak.png`) });
      await page.screenshot({ scale: "css", path: path.join(output, `${viewport.width}-page.png`), fullPage: true });
      assert.deepEqual(await layout(page), initial, "Stage must not grow in response to its canvas resizing");
      await advance(page, 2.9);
      assert.ok((await state(page)).elapsed < 1, "Animation did not loop");
      await page.locator(".hero-scroll").evaluate(element => element.click());
      await page.waitForFunction(() => location.hash === "#approach");
      assert.ok(await page.locator("#approach h2").isVisible());
      assert.equal(await page.locator(".hero-copy .button-primary").getAttribute("href"), "course/");
      const { targets, ...summary } = snapshot;
      pass(`responsive full cycle ${viewport.width}x${viewport.height}`, summary);
      await context.close();
    }

    const { context, page } = await open();
    const model = await page.evaluate(() => {
      const debug = window.__heroDebug;
      const route = debug.ROUTE;
      const reflected = [2.9, 4.45].map(time => {
        const incoming = route.find(segment => segment.t1 === time);
        const outgoing = route.find(segment => segment.t0 === time);
        return {
          inX: incoming.v1[0], inY: incoming.v1[1],
          outX: outgoing.v0[0], outY: outgoing.v0[1],
        };
      });
      let crossesMirror = false;
      for (let t = 1.45; t < 4.95; t += 0.01) if (debug.pathAt(t).y < 0.4 - 1e-8) crossesMirror = true;
      const incoming = route.find(segment => segment.t1 === 5.95);
      const outgoing = route.find(segment => segment.t0 === 5.95);
      const pulse = Array.from({ length: 810 }, (_, i) => debug.abdomenLight(i / 100).intensity);
      return { reflected, crossesMirror,
        refractionIn: Math.abs(incoming.v1[1] / incoming.v1[0]),
        refractionOut: Math.abs(outgoing.v0[1] / outgoing.v0[0]),
        minPulse: Math.min(...pulse), maxPulse: Math.max(...pulse),
        hovers: route.filter(segment => segment.p0[0] === segment.p1[0] && segment.p0[1] === segment.p1[1]).map(segment => ({ from: segment.t0, duration: segment.t1 - segment.t0 })),
      };
    });
    assert.equal(model.crossesMirror, false);
    for (const reflection of model.reflected) {
      assert.ok(Math.abs(reflection.inX - reflection.outX) < 1e-9);
      assert.ok(Math.abs(reflection.inY + reflection.outY) < 1e-9);
    }
    assert.ok(model.refractionOut < model.refractionIn);
    assert.ok(model.minPulse >= 0.35 && model.minPulse <= 0.4 && model.maxPulse >= 0.99);
    assert.ok(model.hovers.filter(hover => hover.from < 15).length >= 5 && model.hovers.filter(hover => hover.from < 15).every(hover => hover.duration >= 0.3 && hover.duration <= 0.51));
    assert.equal(/\b(?:fillText|strokeText)\s*\(/.test(source), false);
    pass("optical directions, asymmetric pulse, explicit hovers, particle-only word", model);

    const joins = await page.evaluate(() => window.__heroDebug.ROUTE.slice(1).map((after, index) => {
      const before = window.__heroDebug.ROUTE[index];
      const a = window.__heroDebug.pathAt(after.t0 - 1e-6);
      const b = window.__heroDebug.pathAt(after.t0 + 1e-6);
      return { time: after.t0, hover: before.hover || after.hover,
        interaction: [2.9, 4.45, 5.95].includes(after.t0),
        a: before.v1, b: after.v0,
        measuredDifference: Math.hypot(a.vx - b.vx, a.vy - b.vy) };
    }));
    for (const join of joins) {
      if (join.hover) {
        assert.deepEqual(join.a, [0, 0]);
        assert.deepEqual(join.b, [0, 0]);
      } else if (join.interaction) {
        assert.ok(Math.abs(Math.hypot(...join.a) - Math.hypot(...join.b)) < 1e-9);
      } else {
        assert.deepEqual(join.a, join.b);
        assert.ok(Math.hypot(...join.a) > 0.01, `Unintended stop at ${join.time}s`);
        assert.ok(join.measuredDifference < 0.0001, `Velocity discontinuity at ${join.time}s`);
      }
    }
    pass("continuous analytic flight velocity; only explicit hovers stop", { joins: joins.length });

    const headings = [];
    for (const hz of [60, 120]) {
      const refresh = await open();
      await advance(refresh.page, 6.45, 1 / hz);
      const snapshot = await state(refresh.page);
      headings.push(Math.atan2(snapshot.heading.y, snapshot.heading.x));
      await refresh.context.close();
    }
    assert.ok(Math.abs(headings[0] - headings[1]) < 0.04);
    pass("time-based heading remains consistent at 60Hz and 120Hz", { headings });

    const button = page.locator(".firefly-toggle");
    await button.focus();
    await page.keyboard.press("Enter");
    const pausedAt = (await state(page)).elapsed;
    assert.equal(await page.evaluate(() => window.__frames.pending()), 0);
    await advance(page, 2);
    assert.equal((await state(page)).elapsed, pausedAt);
    assert.equal(await button.getAttribute("aria-label"), "播放动画");
    assert.ok(await button.evaluate(element => parseFloat(getComputedStyle(element).outlineWidth) >= 2));
    assert.equal(await page.locator('canvas[role="img"]').getAttribute("aria-label"), "一只萤火虫飞过反射、折射、干涉、衍射，最后与其他萤火虫汇聚成 OPTICS");
    await page.keyboard.press("Space");
    await page.evaluate(() => { window.FireflyHero.start(); window.FireflyHero.start(); });
    assert.equal(await page.evaluate(() => window.__frames.pending()), 1);
    await advance(page, 0.2);
    assert.ok((await state(page)).elapsed > pausedAt);
    pass("keyboard pause, focus ring, aria label, idempotent start");

    await page.evaluate(() => window.__frames.hidden(true));
    const hiddenAt = (await state(page)).elapsed;
    assert.equal(await page.evaluate(() => window.__frames.pending()), 0);
    await page.evaluate(() => window.FireflyHero.start());
    await advance(page, 120);
    assert.equal((await state(page)).elapsed, hiddenAt);
    await page.evaluate(() => { window.__frames.hidden(false); window.__frames.hidden(false); });
    assert.equal(await page.evaluate(() => window.__frames.pending()), 1);
    await advance(page, 0.05);
    assert.equal((await state(page)).elapsed, hiddenAt, "Resume must reset its delta timestamp");
    await advance(page, 0.2);
    assert.ok((await state(page)).elapsed <= hiddenAt + 0.21);
    pass("simulated visibility change freezes time and never duplicates RAF");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(50);
    assert.equal(await page.evaluate(() => window.__frames.pending()), 0);
    assert.equal(await button.isVisible(), false);
    const staticBefore = await page.locator("canvas").screenshot();
    await advance(page, 5);
    const staticAfter = await page.locator("canvas").screenshot();
    assert.ok(staticBefore.equals(staticAfter), "Reduced motion must be pixel-identical, not a slower animation");
    await page.locator("[data-firefly-hero]").screenshot({ path: path.join(output, "reduced-motion.png") });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.waitForTimeout(50);
    assert.equal(await page.evaluate(() => window.__frames.pending()), 1);
    pass("live reduced-motion change renders a stable static finale");

    // Warm up two cycles before measuring retained JS heap, not transient allocations.
    await advance(page, 39.2);
    const cdp = await context.newCDPSession(page);
    await cdp.send("HeapProfiler.collectGarbage");
    const heapBefore = await cdp.send("Runtime.getHeapUsage");
    await page.evaluate(() => { window.__savedRefs = window.__heroDebug.refs(); });
    const heapSamples = [];
    for (let loop = 0; loop < 10; loop++) {
      await advance(page, 19.6);
      assert.equal(await page.evaluate(() => window.__heroDebug.refs().every((object, i) => object === window.__savedRefs[i])), true);
      assert.equal((await state(page)).particleCount, 95);
      assert.equal(await page.evaluate(() => window.__frames.pending()), 1);
      await cdp.send("HeapProfiler.collectGarbage");
      heapSamples.push((await cdp.send("Runtime.getHeapUsage")).usedSize);
    }
    const retainedGrowth = heapSamples.at(-1) - heapBefore.usedSize;
    assert.ok(retainedGrowth < 256 * 1024, `Retained heap grew by ${retainedGrowth} bytes`);
    pass("ten full cycles reuse particle identities with bounded retained JS heap", { heapBefore: heapBefore.usedSize, heapSamples, retainedGrowth });

    await page.evaluate(() => { window.FireflyHero.CONFIG.autoLoop = false; });
    await advance(page, 20);
    assert.equal((await state(page)).running, false);
    assert.equal(await page.evaluate(() => window.__frames.pending()), 0);
    await page.evaluate(() => window.FireflyHero.start());
    await advance(page, 0.2);
    assert.ok((await state(page)).elapsed < 1);
    await page.evaluate(() => { window.FireflyHero.CONFIG.showPauseButton = false; window.FireflyHero.start(); });
    assert.equal(await button.isVisible(), false);
    pass("autoLoop false stops at a static finale; start replays; hidden-button config");

    await page.evaluate(() => { window.FireflyHero.destroy(); window.FireflyHero.destroy(); window.__draws = 0; });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width: 1000, height: 800 });
    await page.evaluate(() => { window.FireflyHero.start(); window.__frames.hidden(true); window.__frames.hidden(false); });
    await page.waitForTimeout(200);
    await advance(page, 1);
    assert.equal(await page.evaluate(() => window.__draws), 0);
    assert.equal(await page.evaluate(() => window.__frames.pending()), 0);
    pass("destroy removes media, visibility and resize callbacks and prevents restart");
    await context.close();

    const reduced = await open({ reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
    assert.equal(await reduced.page.evaluate(() => window.__frames.pending()), 0);
    const firstStatic = await reduced.page.locator("canvas").screenshot();
    await advance(reduced.page, 20);
    assert.ok(firstStatic.equals(await reduced.page.locator("canvas").screenshot()));
    await reduced.context.close();
    pass("initial mobile reduced-motion starts with zero animation frames");

    // Uninstrumented file:// smoke test uses the browser's real RAF and local assets.
    const local = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    local.on("pageerror", error => errors.push(error.message));
    await local.goto(pathToFileURL(path.join(root, "index.html")).href);
    assert.equal(await local.evaluate(() => typeof window.FireflyHero?.start), "function");
    await local.waitForTimeout(300);
    await local.locator(".firefly-toggle").click();
    assert.equal(await local.locator(".firefly-toggle").getAttribute("aria-label"), "播放动画");
    await local.waitForTimeout(250); // The separate button's hover transition must settle before a screenshot.
    const localFrame = await local.locator("canvas").screenshot();
    await local.waitForTimeout(150);
    assert.ok(localFrame.equals(await local.locator("canvas").screenshot()));
    await local.close();
    assert.deepEqual(errors, []);
    pass("file:// local assets, real RAF and pause, zero browser errors");
    if (process.argv.includes("--preview")) {
      const preview = await open({ deviceScaleFactor: 1 });
      const frames = path.join(output, "finale-frames");
      fs.mkdirSync(frames, { recursive: true });
      await advance(preview.page, 12.4);
      for (let i = 0; i < 87; i++) {
        await preview.page.locator("[data-firefly-hero]").screenshot({ path: path.join(frames, `${String(i).padStart(3, "0")}.png`) });
        await advance(preview.page, 1 / 12, 1 / 60);
      }
      await preview.context.close();
      pass("finale preview frames exported at 12 fps", { frames: 87 });
    }
    fs.writeFileSync(path.join(output, "results.json"), JSON.stringify({ results, errors }, null, 2));
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

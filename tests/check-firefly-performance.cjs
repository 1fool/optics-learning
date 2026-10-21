"use strict";
// Developer-only: provide Playwright via NODE_PATH; no screenshots during sampling.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");

(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const results = [];
  try {
    for (const viewport of [{ width: 1920, height: 1080 }, { width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport, deviceScaleFactor: 3 });
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.addInitScript(() => {
        const raf = window.requestAnimationFrame.bind(window);
        const samples = [];
        let previous = 0;
        window.__frameSamples = samples;
        window.requestAnimationFrame = callback => raf(now => {
          if (callback.name !== "tick") {
            callback(now);
            return;
          }
          const start = performance.now();
          callback(now);
          samples.push({ interval: previous ? now - previous : 0, duration: performance.now() - start });
          previous = now;
        });
      });
      await page.goto(pathToFileURL(path.join(root, "course", "start.html")).href);
      await page.waitForTimeout(600); // Exclude initialization and the debounced resize.
      await page.evaluate(() => { window.__frameSamples.length = 0; });
      await page.waitForTimeout(21000); // Includes every phase and one loop boundary.
      await page.evaluate(() => window.FireflyHero.pause());
      const samples = await page.evaluate(() => window.__frameSamples);
      const percentile = (values, fraction) => {
        const sorted = values.slice().sort((a, b) => a - b);
        return sorted[Math.floor((sorted.length - 1) * fraction)];
      };
      assert.deepEqual(errors, []);
      assert.ok(samples.length >= 100, "Animation did not keep scheduling real frames");
      const report = {
        viewport,
        sampledFrames: samples.length,
        medianIntervalMs: percentile(samples.map(sample => sample.interval), 0.5),
        p95IntervalMs: percentile(samples.map(sample => sample.interval), 0.95),
        p95CallbackMs: percentile(samples.map(sample => sample.duration), 0.95),
        maxCallbackMs: Math.max(...samples.map(sample => sample.duration)),
        intervalsAbove34ms: samples.filter(sample => sample.interval > 34).length,
        intervalsAbove50ms: samples.filter(sample => sample.interval > 50).length,
      };
      results.push(report);
      console.log("PASS real RAF sampling", JSON.stringify(report));
      await page.close();
    }
    const output = path.join(root, "tmp", "hero-check");
    fs.mkdirSync(output, { recursive: true });
    fs.writeFileSync(path.join(output, "real-raf-results.json"), JSON.stringify({
      environment: "Local headless Chrome, real RAF, no screenshots, DPR 3 with bitmap cap",
      note: "Timing is diagnostic, not a universal FPS guarantee; includes browser and host scheduling.",
      results,
    }, null, 2));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

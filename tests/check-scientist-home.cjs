"use strict";
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const portraits = [
  ["Albert Einstein", "scientist-einstein-cutout.webp"],
  ["Isaac Newton", "scientist-newton.webp"],
  ["Max Planck", "scientist-planck.webp"],
  ["James Clerk Maxwell", "scientist-maxwell.webp"],
];

(async () => {
  const server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const file = path.resolve(root, "." + (pathname === "/" ? "/index.html" : pathname));
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) {
      response.writeHead(404).end();
      return;
    }
    const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp" };
    response.setHeader("Content-Type", mime[path.extname(file)] || "application/octet-stream");
    response.end(fs.readFileSync(file));
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    for (const width of [390, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      let releaseNewton;
      const holdNewton = new Promise(resolve => { releaseNewton = resolve; });
      await page.route("**/scientist-newton.webp", async route => {
        await holdNewton;
        await route.continue();
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      const portrait = page.locator("#scientist-portrait");
      const next = page.getByRole("button", { name: "下一位科学家" });
      await next.click();
      assert.equal(await page.locator("#scientist-index").textContent(), "01 / 04");
      assert.equal(await page.locator("#portrait-status").textContent(), "正在切换到 Isaac Newton…");
      assert.equal(await page.locator("#portrait-stage").evaluate(element => element.classList.contains("is-loading")), true);
      assert.equal(await portrait.evaluate(element => getComputedStyle(element).visibility), "hidden");
      releaseNewton();
      await page.waitForFunction(() => document.querySelector("#scientist-index").textContent === "02 / 04");
      await page.waitForFunction(() => document.querySelector("#scientist-portrait").naturalWidth === 514);
      assert.match(await portrait.evaluate(element => element.currentSrc), /scientist-newton\.webp$/);

      for (let i = 2; i <= portraits.length; i++) {
        await next.click();
        await page.waitForFunction(expected => document.querySelector("#scientist-index").textContent === expected,
          `${String(i % portraits.length + 1).padStart(2, "0")} / 04`);
        const [name, file] = portraits[i % portraits.length];
        assert.equal(await page.locator("#hero-title").getAttribute("aria-label"), name);
        await page.waitForFunction(expected => {
          const image = document.querySelector("#scientist-portrait");
          return image.currentSrc.endsWith(expected) && image.naturalWidth > 0;
        }, file);
      }
      assert.deepEqual(errors, []);
      await page.close();
      console.log(`PASS scientist portrait switch at ${width}px`);
    }
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    let releaseNewton;
    const holdNewton = new Promise(resolve => { releaseNewton = resolve; });
    await page.route("**/scientist-newton.webp", async route => {
      await holdNewton;
      await route.continue();
    });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "下一位科学家" }).click({ clickCount: 2 });
    await page.waitForFunction(() => document.querySelector("#scientist-index").textContent === "03 / 04");
    assert.match(await page.locator("#scientist-portrait").evaluate(element => element.currentSrc), /scientist-planck\.webp$/);
    releaseNewton();
    await page.waitForTimeout(200);
    assert.equal(await page.locator("#scientist-index").textContent(), "03 / 04");
    await page.close();
    console.log("PASS rapid taps keep the latest portrait");

    const reversePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    let releaseDelayedPortrait;
    const delayedPortrait = new Promise(resolve => { releaseDelayedPortrait = resolve; });
    await reversePage.route("**/scientist-newton.webp", async route => {
      await delayedPortrait;
      await route.continue();
    });
    await reversePage.goto(url, { waitUntil: "domcontentloaded" });
    await reversePage.getByRole("button", { name: "下一位科学家" }).click();
    await reversePage.getByRole("button", { name: "上一位科学家" }).click();
    assert.equal(await reversePage.locator("#scientist-index").textContent(), "01 / 04");
    assert.equal(await reversePage.locator("#portrait-stage").evaluate(element => element.classList.contains("is-loading")), false);
    releaseDelayedPortrait();
    await reversePage.waitForTimeout(200);
    assert.match(await reversePage.locator("#scientist-portrait").evaluate(element => element.currentSrc), /scientist-einstein-cutout\.webp$/);
    await reversePage.close();
    console.log("PASS reversing during load keeps the visible portrait");

    const failurePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    let failOnce = true;
    await failurePage.route("**/scientist-newton.webp", async route => {
      if (failOnce) {
        failOnce = false;
        await route.abort();
      } else {
        await route.continue();
      }
    });
    await failurePage.goto(url, { waitUntil: "domcontentloaded" });
    await failurePage.getByRole("button", { name: "下一位科学家" }).click();
    await failurePage.waitForFunction(() => document.querySelector("#portrait-stage").classList.contains("is-error"));
    assert.equal(await failurePage.locator("#portrait-status").textContent(), "图片加载失败，请重试");
    assert.equal(await failurePage.locator("#scientist-index").textContent(), "01 / 04");
    await failurePage.getByRole("button", { name: "下一位科学家" }).click();
    await failurePage.waitForFunction(() => document.querySelector("#scientist-index").textContent === "02 / 04");
    assert.match(await failurePage.locator("#scientist-portrait").evaluate(element => element.currentSrc), /scientist-newton\.webp$/);
    await failurePage.close();
    console.log("PASS failed portrait load can be retried");

    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
    const touchPage = await mobile.newPage();
    let releasePortrait;
    const holdPortrait = new Promise(resolve => { releasePortrait = resolve; });
    await touchPage.route("**/scientist-newton.webp", async route => {
      await holdPortrait;
      await route.continue();
    });
    await touchPage.goto(url, { waitUntil: "domcontentloaded" });
    const tap = async (name) => {
      const button = touchPage.getByRole("button", { name });
      await button.scrollIntoViewIfNeeded();
      const box = await button.boundingBox();
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      assert.equal(await touchPage.evaluate(([x, y]) =>
        document.elementFromPoint(x, y)?.closest("[data-scientist-step]")?.getAttribute("aria-label"), [x, y]), name);
      await touchPage.touchscreen.tap(x, y);
    };
    await tap("下一位科学家");
    assert.equal(await touchPage.locator("#scientist-index").textContent(), "01 / 04");
    assert.equal(await touchPage.locator("#scientist-portrait").evaluate(element => getComputedStyle(element).visibility), "hidden");
    releasePortrait();
    await touchPage.waitForFunction(() => document.querySelector("#scientist-index").textContent === "02 / 04");
    await touchPage.waitForFunction(() => document.querySelector("#scientist-portrait").naturalWidth === 514);
    await tap("上一位科学家");
    await touchPage.waitForFunction(() => document.querySelector("#scientist-index").textContent === "01 / 04");
    assert.match(await touchPage.locator("#scientist-portrait").getAttribute("src"), /scientist-einstein-cutout\.webp$/);
    await mobile.close();
    console.log("PASS mobile touch next/prev and no stale portrait while loading");
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

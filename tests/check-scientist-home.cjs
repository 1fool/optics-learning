"use strict";
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const portraits = [
  ["Albert Einstein", "scientist-einstein-cutout.png"],
  ["Isaac Newton", "scientist-newton.png"],
  ["Max Planck", "scientist-planck.png"],
  ["James Clerk Maxwell", "scientist-maxwell.png"],
];

(async () => {
  const server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const file = path.resolve(root, "." + (pathname === "/" ? "/index.html" : pathname));
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) {
      response.writeHead(404).end();
      return;
    }
    const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png" };
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
      await page.route("**/scientist-newton.png", async route => {
        await holdNewton;
        await route.continue();
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });
      const portrait = page.locator("#scientist-portrait");
      const next = page.getByRole("button", { name: "下一位科学家" });
      await next.click();
      assert.equal(await page.locator("#scientist-index").textContent(), "02 / 04");
      assert.match(await portrait.evaluate(element => element.getAttribute("src")), /scientist-newton\.png$/);
      releaseNewton();
      await page.waitForFunction(() => document.querySelector("#scientist-portrait").naturalWidth === 514);
      assert.match(await portrait.evaluate(element => element.currentSrc), /scientist-newton\.png$/);

      for (let i = 2; i <= portraits.length; i++) {
        await next.click();
        assert.equal(await page.locator("#scientist-index").textContent(),
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
    await page.route("**/scientist-newton.png", async route => {
      await holdNewton;
      await route.continue();
    });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "下一位科学家" }).click({ clickCount: 2 });
    assert.equal(await page.locator("#scientist-index").textContent(), "03 / 04");
    assert.match(await page.locator("#scientist-portrait").evaluate(element => element.currentSrc), /scientist-planck\.png$/);
    releaseNewton();
    await page.waitForTimeout(200);
    assert.equal(await page.locator("#scientist-index").textContent(), "03 / 04");
    await page.close();
    console.log("PASS rapid taps keep the latest portrait");

    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
    const touchPage = await mobile.newPage();
    let releasePortrait;
    const holdPortrait = new Promise(resolve => { releasePortrait = resolve; });
    await touchPage.route("**/scientist-newton.png", async route => {
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
    assert.equal(await touchPage.locator("#scientist-index").textContent(), "02 / 04");
    assert.match(await touchPage.locator("#scientist-portrait").getAttribute("src"), /scientist-newton\.png$/);
    releasePortrait();
    await touchPage.waitForFunction(() => document.querySelector("#scientist-portrait").naturalWidth === 514);
    await tap("上一位科学家");
    assert.equal(await touchPage.locator("#scientist-index").textContent(), "01 / 04");
    assert.match(await touchPage.locator("#scientist-portrait").getAttribute("src"), /scientist-einstein-cutout\.png$/);
    await mobile.close();
    console.log("PASS mobile touch next/prev and immediate response during image loading");
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

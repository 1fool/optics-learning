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
      assert.equal(await page.locator("#scientist-index").textContent(), "01 / 04");
      assert.equal(await page.locator("#portrait-stage").getAttribute("aria-busy"), "true");
      releaseNewton();
      await page.waitForFunction(() => document.querySelector("#scientist-index").textContent === "02 / 04");
      assert.match(await portrait.evaluate(element => element.currentSrc), /scientist-newton\.png$/);
      assert.equal(await portrait.evaluate(element => element.naturalWidth), 514);
      assert.equal(await page.locator("#portrait-stage").getAttribute("aria-busy"), null);

      for (let i = 2; i <= portraits.length; i++) {
        await next.click();
        await page.waitForFunction(expected => document.querySelector("#scientist-index").textContent === expected,
          `${String(i % portraits.length + 1).padStart(2, "0")} / 04`);
        const [name, file] = portraits[i % portraits.length];
        assert.equal(await page.locator("#hero-title").getAttribute("aria-label"), name);
        assert.match(await portrait.evaluate(element => element.currentSrc), new RegExp(`${file}$`));
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
    await page.waitForFunction(() => document.querySelector("#scientist-index").textContent === "03 / 04");
    assert.match(await page.locator("#scientist-portrait").evaluate(element => element.currentSrc), /scientist-planck\.png$/);
    const newtonResponse = page.waitForResponse(response => response.url().endsWith("scientist-newton.png"));
    releaseNewton();
    await newtonResponse;
    await page.waitForTimeout(100);
    assert.equal(await page.locator("#scientist-index").textContent(), "03 / 04");
    await page.close();
    console.log("PASS rapid taps keep the latest portrait");
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

"use strict";
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const shots = path.join(root, "tmp", "jojo-review");
fs.mkdirSync(shots, { recursive: true });

(async () => {
  const server = http.createServer((request, response) => {
    let pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname.endsWith("/")) pathname += "index.html";
    const file = path.resolve(root, "." + pathname);
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) {
      response.writeHead(404).end();
      return;
    }
    const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".webp": "image/webp" };
    response.setHeader("Content-Type", mime[path.extname(file)] || "application/octet-stream");
    response.end(fs.readFileSync(file));
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}/`;
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    for (const width of [360, 390, 768, 1024, 1440, 1920]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(url, { waitUntil: "networkidle" });
      const collisions = await page.evaluate(() => {
        const nodes = [...document.querySelectorAll(".radar-points circle")];
        return [...document.querySelectorAll(".radar-labels text")].flatMap((label, i) => {
          const a = label.getBoundingClientRect();
          const b = nodes[i].getBoundingClientRect();
          return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top ? [label.textContent] : [];
        });
      });
      assert.deepEqual(collisions, [], `radar labels touch nodes at ${width}px`);
      for (const section of [".facts", "#courses", ".character-interlude", "#approach", "#scope", ".site-footer"]) {
        await page.locator(section).scrollIntoViewIfNeeded();
        await page.waitForTimeout(650);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${width}px overflow at ${section}`);
      }
      const broken = await page.locator("img").evaluateAll(images =>
        images.filter(image => !image.complete || !image.naturalWidth).map(image => image.src));
      assert.deepEqual(broken, [], `broken images at ${width}`);
      assert.deepEqual(errors, [], `page errors at ${width}`);
      if (width === 390 || width === 1440) {
        await page.screenshot({ path: path.join(shots, `${width}-full.png`), fullPage: true });
        for (const [name, selector] of Object.entries({ courses: "#courses", cast: ".character-interlude", approach: "#approach", closing: "#scope" })) {
          await page.locator(selector).screenshot({ path: path.join(shots, `${width}-${name}.png`) });
        }
      }
      await page.close();
      console.log(`PASS ${width}px: all sections, images and no horizontal overflow`);
    }

    const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    await reduced.goto(url);
    assert.equal(await reduced.locator(".course-card").first().evaluate(el => getComputedStyle(el).opacity), "1");
    await reduced.keyboard.press("Tab");
    assert.equal(await reduced.locator(".skip-link").evaluate(el => el === document.activeElement), true);
    await reduced.keyboard.press("Enter");
    await reduced.waitForURL("**/#courses");
    for (const [selector, destination] of [[".course-fourier", "/fourier/"], [".course-physical", "/course/start.html"]]) {
      await reduced.locator(selector).click();
      assert(new URL(reduced.url()).pathname === destination);
      assert.equal((await reduced.request.get(reduced.url())).status(), 200);
      await reduced.goto(url);
    }
    await reduced.locator(".scope-link").click();
    await reduced.waitForURL("**/#courses");
    assert.equal(await reduced.locator("#courses").evaluate(el => el.getBoundingClientRect().top >= 0), true);
    await reduced.close();
    console.log("PASS reduced motion, keyboard skip, both course links and closing arrow");

    const jump = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await jump.goto(url + "#scope", { waitUntil: "networkidle" });
    for (const target of ["#scope", "#courses", "#scope", ".scientist-hero"]) {
      await jump.locator(target).scrollIntoViewIfNeeded();
      for (const selector of [".scope-copy", ".course-card"]) {
        assert.equal(await jump.locator(selector).first().evaluate(el => getComputedStyle(el).opacity), "1");
      }
    }
    await jump.close();
    console.log("PASS direct section entry and fast back-and-forth scrolling keep content visible");

    const noJs = await browser.newPage({ javaScriptEnabled: false });
    await noJs.goto(url);
    assert.equal(await noJs.locator(".course-card").first().evaluate(el => getComputedStyle(el).opacity), "1");
    await noJs.close();
    console.log("PASS content remains visible without JavaScript");
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

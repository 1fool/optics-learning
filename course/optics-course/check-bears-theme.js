"use strict";
// Developer-only browser regression; no runtime package dependency.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const base = process.env.COURSE_URL || "http://127.0.0.1:8765/physical-optics-1-1-1-2.html";
const opening = process.env.START_URL || new URL("physical-optics-start.html", base).href;
const out = path.resolve(__dirname, "../tmp/bears-ui");
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const errors = [], missing = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("requestfailed", request => missing.push(`${request.url()} ${request.failure().errorText}`));
  page.on("response", response => { if (response.status() >= 400 && !response.url().endsWith("favicon.ico")) missing.push(response.url()); });
  let cases = 0;
  try {
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    const episodes = await page.evaluate(() => window.OpticsBearEpisodes);
    const codes = await page.evaluate(() => lessons.map(lesson => lesson.code));
    assert.deepEqual(episodes.map(item => item.code), codes);
    assert.equal(new Set(episodes.flatMap(item => item.art)).size, codes.length * 4);
    const saved = '{"1.1:q1":{"choice":0},"1.3.1:q1":{"choice":2}}';
    await page.evaluate(value => localStorage.setItem("optics-course-answers-v3", value), saved);
    await page.reload();
    const before = await page.evaluate(() => localStorage.getItem("optics-course-answers-v3"));
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
      await page.waitForFunction(target => innerWidth === target
        && getComputedStyle(document.querySelector(".shell")).paddingRight === (target === 390 ? "54px" : "78px"), width);
      for (let index = 0; index < codes.length; index++) {
        await page.evaluate(i => showLesson(i), index);
        const root = codes[index] === "1.3.1" ? "#sphere-lab" : "#deep-lab";
        for (const mode of ["experiment", "recap", "notes", "quiz"]) {
          await page.locator(`${root} [data-lab-mode="${mode}"]`).click();
          await page.waitForFunction(selector => document.querySelector(selector).querySelectorAll(".lab-tab .bears-tab-art").length === 4, root);
          await page.locator(`${root} .bears-tab-art`).evaluateAll(images => Promise.all(images.map(image => image.decode())));
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, `${codes[index]}/${mode}/${width}: overflow`);
          const art = await page.locator(`${root} .bears-tab-art`).evaluateAll(images => images.map(image => image.src));
          assert.equal(new Set(art).size, 4);
          assert(art.every(src => src.includes(`s01e${String(index+1).padStart(2,"0")}-`)));
          const bounds = await page.locator(".quick-tools").evaluate(node => {
            const r = node.getBoundingClientRect();
            const main = document.querySelector(".content").getBoundingClientRect();
            const b = document.getElementById("quick-symbols").getBoundingClientRect();
            return { fixed: getComputedStyle(node).position, right: r.right, left: r.left,
              bottom: r.bottom, mainRight: main.right, width: innerWidth, height: innerHeight,
              hit: !!document.elementFromPoint(b.x+b.width/2,b.y+b.height/2)?.closest("#quick-symbols") };
          });
          assert.equal(bounds.fixed, "fixed");
          assert(bounds.left >= bounds.mainRight && bounds.right <= bounds.width && bounds.bottom <= bounds.height, JSON.stringify(bounds));
          assert(bounds.hit);
          assert.equal(await page.locator("#quiz").isVisible(), mode === "quiz");
          if ([0, 7, 19].includes(index) && (mode === "experiment" || mode === "notes")) {
            await page.evaluate(() => scrollTo(0, 0));
            await page.screenshot({ path: path.join(out, `${width}-${codes[index]}-${mode}.png`), fullPage: mode === "notes" });
          }
          cases++;
        }
        // Theme and episode assignment also follow bilingual rerenders.
        await page.locator("#lang-toggle").click();
        assert.equal(await page.locator("body").getAttribute("data-bear-episode"), String(index+1));
        await page.locator("#lang-toggle").click();
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const index of [0, 7, 19]) {
      await page.evaluate(i => showLesson(i), index);
      const root = codes[index] === "1.3.1" ? "#sphere-lab" : "#deep-lab";
      for (const mode of ["experiment", "recap", "notes", "quiz"]) {
        await page.locator(`${root} [data-lab-mode="${mode}"]`).click();
        assert.equal(await page.locator(".rail").isVisible(), true, `${codes[index]}/${mode}: contents hidden`);
      }
      await page.locator(`${root} [data-lab-mode="notes"]`).click();
      await page.evaluate(() => scrollTo({ top: 320, behavior: "instant" }));
      const rail = await page.locator(".rail").evaluate(node => ({
        top: node.getBoundingClientRect().top, position: getComputedStyle(node).position,
        height: node.getBoundingClientRect().height, viewport: innerHeight, scroll: scrollY,
      }));
      assert(rail.scroll >= 200 && rail.position === "sticky" && Math.abs(rail.top - 20) <= 2
        && rail.height <= rail.viewport - 40 + 1, `${codes[index]}: ${JSON.stringify(rail)}`);
    }
    await page.screenshot({ path: path.join(out, "desktop-sticky-contents.png") });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForFunction(() => getComputedStyle(document.querySelector(".rail")).maxHeight === "340px");
    const mobileRail = await page.locator(".rail").evaluate(node => ({
      visible: node.getBoundingClientRect().height > 0, position: getComputedStyle(node).position,
      height: node.getBoundingClientRect().height, viewport: innerHeight,
    }));
    assert(mobileRail.visible && mobileRail.position === "static" && mobileRail.height <= Math.min(340, mobileRail.viewport * .42) + 1,
      JSON.stringify(mobileRail));
    await page.evaluate(() => showLesson(7));
    const grid = await page.locator("#sphere-lab .lab-scene").evaluate(node => ({
      image: getComputedStyle(node).backgroundImage, size: getComputedStyle(node).backgroundSize,
    }));
    assert(grid.image.includes("linear-gradient") && grid.size === "52px 52px, 52px 52px", JSON.stringify(grid));
    assert.equal(await page.evaluate(() => localStorage.getItem("optics-course-answers-v3")), before, "Theme altered formal answers");
    await page.locator("#quick-symbols").click();
    assert.equal(await page.locator("#symbol-dialog").isVisible(), true);
    await page.locator("#close-symbols").click();
    assert.equal(await page.evaluate(() => document.activeElement.id), "quick-symbols");
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
    await page.waitForFunction(() => !document.getElementById("back-to-top").hidden);
    await page.locator("#back-to-top").click();
    await page.waitForFunction(() => scrollY < 2);
    await page.setViewportSize({ width: 320, height: 740 });
    await page.evaluate(() => showLesson(0));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, "320px overflow");
    await page.setViewportSize({ width: 720, height: 500 });
    await page.screenshot({ path: path.join(out, "200-percent-equivalent.png") });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => showLesson(19));
    await page.locator('#deep-lab [data-lab-mode="notes"]').click();
    const longFormula = page.locator('[id="reading-1.6.5-3"] .equation').first();
    await page.waitForFunction(() => document.querySelector('[id="reading-1.6.5-3"] .equation').dataset.bearScrollable === "true");
    assert.equal(await longFormula.getAttribute("tabindex"), "0");
    await longFormula.focus();
    await page.keyboard.press("ArrowRight");
    await page.waitForFunction(() => document.querySelector('[id="reading-1.6.5-3"] .equation').scrollLeft > 0);
    const scrollEnd = await longFormula.evaluate(node => {
      node.scrollLeft = node.scrollWidth;
      return { atEnd: Math.abs(node.scrollWidth-node.clientWidth-node.scrollLeft) <= 1,
        formulaRight: node.querySelector(".katex-html").getBoundingClientRect().right,
        viewportRight: node.getBoundingClientRect().right };
    });
    assert(scrollEnd.atEnd && scrollEnd.formulaRight <= scrollEnd.viewportRight + 1, JSON.stringify(scrollEnd));
    await longFormula.screenshot({ path: path.join(out, "phone-formula-scrolled-end.png") });
    await page.locator("#lang-toggle").click();
    assert.match(await page.locator(".bears-scroll-hint").first().textContent(), /Scroll sideways/);
    await page.locator("#lang-toggle").click();

    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
      await page.goto(opening);
      await page.locator(".bears-stack img").evaluateAll(images => Promise.all(images.map(image => image.decode())));
      assert.equal(await page.locator("[data-bears-opening]").getAttribute("data-state"), "paused");
      await page.locator("#bears-motion-toggle").click();
      assert.equal(await page.locator("[data-bears-opening]").getAttribute("data-state"), "playing");
      await page.locator("#bears-motion-toggle").click();
      assert.equal(await page.locator("[data-bears-opening]").getAttribute("data-state"), "paused");
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
      await page.screenshot({ path: path.join(out, `${width}-opening.png`), fullPage: true });
      await page.locator(".button-primary").click();
      await page.waitForSelector("body.bears-theme");
      assert.equal(await page.locator("body.bears-theme").count(), 1);
    }
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(opening);
    assert.equal(await page.locator("[data-bears-opening]").getAttribute("data-state"), "playing");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(() => document.querySelector("[data-bears-opening]").dataset.state === "paused");

    // Block HTTP(S), then load the actual file entry: all runtime artwork stays local.
    const offline = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    await offline.route(/^https?:/, route => route.abort());
    const fileEntry = process.env.FILE_ENTRY || path.resolve(__dirname, "../physical-optics-1-1-1-2.html");
    await offline.goto(pathToFileURL(fileEntry).href);
    await offline.locator(".lab-tab .bears-tab-art").evaluateAll(images => Promise.all(images.map(image => image.decode())));
    assert.equal(await offline.locator("body.bears-theme").count(), 1);
    await offline.close();
    assert.deepEqual(errors, []);
    assert.deepEqual(missing, []);
    console.log(`PASS: ${cases} lesson/mode/viewport cases, bilingual mapping, 80 distinct assets, fixed tools, saved answers, opening pause/reduced motion, file/offline.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

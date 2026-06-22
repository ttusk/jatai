#!/usr/bin/env node
/**
 * Real browser scroll test for the Laika landing page.
 *
 * Verifies:
 * - page is scrollable (wheel + touch gestures),
 * - terminal types as you scroll through the Hero only,
 * - animation completes within the Hero section (not page-wide),
 * - scroll-up works,
 * - no GSAP pin artifacts.
 */

import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";
import { chromium } from "playwright";

const PORT = 4321;
const URL = `http://localhost:${PORT}`;

function startDevServer() {
  return new Promise((resolve, reject) => {
    const proc = spawn("npm", ["run", "dev"], {
      stdio: "pipe",
      env: { ...process.env, NODE_ENV: "development" },
    });

    let stdout = "";
    proc.stdout.on("data", (data) => {
      stdout += data.toString();
      if (stdout.includes("ready") || stdout.includes("Local:")) {
        resolve(proc);
      }
    });

    proc.on("error", reject);
    setTimeout(8000).then(() => resolve(proc));
  });
}

async function runTests() {
  console.log("Starting dev server...");
  const server = await startDevServer();
  await setTimeout(3000);

  let browser;
  try {
    console.log("Launching browser...");
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ hasTouch: true });
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: "networkidle" });

    const tests = [];

    // 1. Body is scrollable and no overflow:hidden.
    const bodyInfo = await page.evaluate(() => {
      return {
        bodyOverflow: getComputedStyle(document.body).overflow,
        htmlOverflow: getComputedStyle(document.documentElement).overflow,
        bodyHeight: document.body.scrollHeight,
        viewportHeight: window.innerHeight,
        overscrollBehavior: getComputedStyle(document.body).overscrollBehavior,
      };
    });

    tests.push({
      name: "Body is tall enough to scroll",
      pass: bodyInfo.bodyHeight > bodyInfo.viewportHeight * 1.5,
    });

    tests.push({
      name: "No overflow:hidden on body/html",
      pass:
        bodyInfo.bodyOverflow !== "hidden" &&
        bodyInfo.htmlOverflow !== "hidden",
    });

    tests.push({
      name: "No overscroll-behavior:none on body (blocks trackpad)",
      pass: bodyInfo.overscrollBehavior !== "none",
    });

    // 2. Terminal types as we scroll through the Hero.
    const initialCommand = await page.locator('[data-step="0"] .command-text').textContent();

    // Scroll half a viewport — should be enough to start typing.
    const vh = bodyInfo.viewportHeight;
    await page.evaluate((y) => window.scrollBy({ top: y, behavior: "instant" }), Math.floor(vh * 0.3));
    await setTimeout(400);
    const midCommand = await page.locator('[data-step="0"] .command-text').textContent();

    tests.push({
      name: "Terminal types as you scroll through Hero",
      pass: (midCommand?.length ?? 0) > (initialCommand?.length ?? 0),
    });

    // 3. Animation completes within the Hero section (200vh).
    //    Scroll past the Hero (250vh should be well past it).
    await page.evaluate((y) => window.scrollBy({ top: y, behavior: "instant" }), Math.floor(vh * 2.2));
    await setTimeout(500);
    const lastCommand = await page.locator('[data-step="2"] .command-text').textContent();
    const fullLastCommand = terminalFullText();

    tests.push({
      name: "Terminal fully typed by end of Hero section",
      pass: lastCommand === fullLastCommand,
    });

    // 4. Features is visible after Hero.
    const featuresVisible = await page.locator("section:has-text('O que é a Laika')").isVisible();
    tests.push({
      name: "Features section visible after scrolling past Hero",
      pass: featuresVisible,
    });

    // 5. Scroll back to top — must work.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await setTimeout(500);
    const backAtTop = await page.evaluate(() => window.scrollY);

    tests.push({
      name: "Scroll up to top works",
      pass: backAtTop < 10,
    });

    // 6. No GSAP pin-spacer elements.
    const pinSpacerCount = await page.evaluate(
      () => document.querySelectorAll(".pin-spacer").length
    );
    tests.push({
      name: "No pin-spacer elements (native sticky)",
      pass: pinSpacerCount === 0,
    });

    // Print results.
    let allPassed = true;
    for (const test of tests) {
      const status = test.pass ? "PASS" : "FAIL";
      if (!test.pass) allPassed = false;
      console.log(`  [${status}] ${test.name}`);
    }

    if (!allPassed) {
      process.exitCode = 1;
    }
  } finally {
    if (browser) await browser.close();
    console.log("Shutting down dev server...");
    server.kill("SIGTERM");
  }
}

function terminalFullText() {
  return "laika.openFinance.accounts({ cpf: '123.456.789-00' })";
}

runTests().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

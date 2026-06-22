#!/usr/bin/env node
/**
 * Real browser scroll test for the Laika landing page.
 *
 * This test verifies that:
 * - the page is scrollable,
 * - the pinned Hero terminal reveals commands as the user scrolls,
 * - the Features section becomes reachable,
 * - no global overflow:hidden blocks scrolling.
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

    // Fallback timeout
    setTimeout(8000).then(() => resolve(proc));
  });
}

async function scrollBy(page, deltaY) {
  await page.evaluate((y) => window.scrollBy({ top: y, behavior: "instant" }), deltaY);
  await setTimeout(300);
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

    // 1. Page loads and body is scrollable.
    const bodyInfo = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      return {
        bodyOverflow: getComputedStyle(body).overflow,
        htmlOverflow: getComputedStyle(html).overflow,
        bodyHeight: body.scrollHeight,
        viewportHeight: window.innerHeight,
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

    // 2. Scroll through the pinned Hero and watch the terminal type.
    const initialScroll = await page.evaluate(() => window.scrollY);
    const initialCommand = await page.locator('[data-step="0"] .command-text').textContent();

    // Scroll a bit; the pinned Hero should keep us in place while the timeline advances.
    await scrollBy(page, 400);
    const midCommand = await page.locator('[data-step="0"] .command-text').textContent();

    tests.push({
      name: "Terminal first command types as we scroll",
      pass: (midCommand?.length ?? 0) > (initialCommand?.length ?? 0),
    });

    // 3. Continue scrolling until we reach Features.
    await scrollBy(page, 3000);
    const featuresVisible = await page.locator("section:has-text('O que é a Laika')").isVisible();
    const afterDownScroll = await page.evaluate(() => window.scrollY);

    tests.push({
      name: "Wheel scroll moves the page past the Hero",
      pass: afterDownScroll > initialScroll + 100,
    });

    tests.push({
      name: "Features section becomes visible after scrolling",
      pass: featuresVisible,
    });

    // 4. Scroll back up — must work in both directions.
    await page.evaluate(() => window.scrollBy({ top: -2000, behavior: "instant" }));
    await setTimeout(500);
    const afterUpScroll = await page.evaluate(() => window.scrollY);

    tests.push({
      name: "Scroll up works (page moves back up)",
      pass: afterUpScroll < afterDownScroll - 100,
    });

    // 5. No unexpected pin-spacer blocking the viewport.
    const pinSpacerCount = await page.evaluate(
      () => document.querySelectorAll(".pin-spacer").length
    );
    tests.push({
      name: "No pin-spacer elements (native sticky, no GSAP pin)",
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

runTests().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

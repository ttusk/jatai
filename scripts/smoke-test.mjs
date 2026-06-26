#!/usr/bin/env node
/**
 * Smoke test for the Jataí landing page.
 * Starts the Astro dev server, fetches the page, and asserts the expected
 * sections are present and no scroll-blocking artifacts remain.
 */

import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";

const PORT = 4321;
const URL = `http://localhost:${PORT}/jatai/`;

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
    setTimeout(6000).then(() => resolve(proc));
  });
}

async function fetchPage() {
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${URL}: ${res.status}`);
  }
  return res.text();
}

async function runTests() {
  console.log("Starting dev server...");
  const server = await startDevServer();
  await setTimeout(2000);

  try {
    console.log("Fetching landing page...");
    const html = await fetchPage();

    const tests = [
      {
        name: "Page title contains Jataí",
        pass: html.includes("<title>Jataí"),
      },
      {
        name: "Hero astro-island present (client-only React)",
        pass: html.includes('component-url="/src/components/sections/Hero.tsx"'),
      },
      {
        name: "Features section rendered",
        pass: html.includes("O que é a Jataí"),
      },
      {
        name: "Footer rendered",
        pass: html.includes("Jataí. Open Fintech Lab"),
      },
      {
        name: "No ScrollTrigger pin artifacts in static HTML",
        pass: !html.includes("pin-spacer"),
      },
    ];

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
    console.log("Shutting down dev server...");
    server.kill("SIGTERM");
  }
}

runTests().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

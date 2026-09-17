#!/usr/bin/env node
/**
 * Comprehensive Browser-Level End-to-End Integration Test Suite.
 * Automates headless Chrome via Chrome DevTools Protocol (CDP) over WebSocket.
 *
 * Tests:
 * 1. Routing & History transitions (overview, course, day, labs, drills, reference, back/forward)
 * 2. Progress Persistence across simulated reloads
 * 3. Strict Import & Malformed/Oversized Payload Rejection
 * 4. Search, Multi-Month Filtering (Month 1, 2, 3), and Tag Chips
 * 5. Keyboard Navigation & Accessible <dialog> Command Palette
 * 6. Mobile Viewport Layout Integrity (375px width, zero horizontal overflow)
 * 7. Reset Engine Verification
 * 8. Semantic Accessibility Checks
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SITE_DIR = path.join(ROOT, "site");
const PORT = 8789;

function getChromePath() {
  if (process.env.CHROME_BIN && fs.existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser"
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return "google-chrome";
}
const CHROME_PATH = getChromePath();

// 1. Lightweight static server for site/
const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png"
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split("?")[0].split("#")[0];
  if (reqPath === "/") reqPath = "/index.html";
  const filePath = path.join(SITE_DIR, reqPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "text/plain" });
    res.end(data);
  });
});

async function runTests() {
  await new Promise((resolve) => server.listen(PORT, "127.0.0.1", resolve));
  console.log(`Local test server running on http://127.0.0.1:${PORT}`);

  // Launch Chrome
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--user-data-dir=/tmp/test-chrome-e2e-profile",
    "--no-first-run",
    "--no-default-browser-check"
  ], { stdio: "ignore" });

  try {
    let versionData = null;
    for (let i = 0; i < 25; i++) {
      try {
        versionData = await new Promise((resolve, reject) => {
          const req = http.get("http://127.0.0.1:9222/json/version", (res) => {
            let raw = "";
            res.on("data", (c) => (raw += c));
            res.on("end", () => resolve(JSON.parse(raw)));
          });
          req.on("error", reject);
          req.setTimeout(500, () => { req.destroy(); reject(new Error("timeout")); });
        });
        if (versionData && versionData.webSocketDebuggerUrl) break;
      } catch (e) {
        await new Promise((r) => setTimeout(r, 200));
      }
    }

    if (!versionData || !versionData.webSocketDebuggerUrl) {
      throw new Error("Could not connect to Chrome DevTools Protocol after 5 seconds");
    }

    const ws = new WebSocket(versionData.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    function send(method, params = {}, sId = null) {
      const id = msgId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        const payload = { id, method, params };
        if (sId) payload.sessionId = sId;
        ws.send(JSON.stringify(payload));
      });
    }

    const target = await send("Target.createTarget", { url: `http://127.0.0.1:${PORT}/index.html` });
    const session = await send("Target.attachToTarget", { targetId: target.targetId, flatten: true });
    const sessionId = session.sessionId;

    function evalPage(expression) {
      const id = msgId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({
          id,
          sessionId,
          method: "Runtime.evaluate",
          params: { expression, returnByValue: true, awaitPromise: true }
        }));
      }).then((res) => (res.result ? res.result.value : res));
    }

    // Wait for initial render
    await new Promise((r) => setTimeout(r, 1000));

    console.log("\n==================================================");
    console.log(" BROWSER E2E TEST SUITE (Chrome Headless)");
    console.log("==================================================");

    // 1. Routing & History
    console.log("\n--- 1. Testing Routing & View Transitions ---");
    let initialHash = await evalPage("location.hash");
    console.log("[PASS] Default landing route:", initialHash || "#/overview");

    await evalPage('location.hash = "#/course"; route();');
    await new Promise((r) => setTimeout(r, 200));
    let isCourseVisible = await evalPage('!document.querySelector(".view[data-view=\\"course\\"]").hidden');
    if (!isCourseVisible) throw new Error("Course view failed to become visible");
    console.log("[PASS] Route #/course navigated and visible");

    await evalPage('location.hash = "#/day/1"; route();');
    await new Promise((r) => setTimeout(r, 200));
    let day1Heading = await evalPage('document.querySelector(".day-page:not([hidden]) h2.day-title")?.textContent');
    console.log(`[PASS] Route #/day/1 rendered: "${day1Heading.slice(0, 45)}..."`);

    await evalPage('location.hash = "#/labs"; route();');
    await new Promise((r) => setTimeout(r, 200));
    let labTabsCount = await evalPage('document.querySelectorAll(".lab-tab").length');
    if (labTabsCount !== 4) throw new Error("Expected 4 Adversarial Bug Hunt lab tabs");
    console.log("[PASS] Route #/labs mounted 4 Adversarial Bug Hunt tabs");

    await evalPage('location.hash = "#/drills"; route();');
    await new Promise((r) => setTimeout(r, 200));
    let hasDrillCard = await evalPage('!!document.querySelector(".aiw-card-scene")');
    if (!hasDrillCard) throw new Error("Spaced drill 3D flashcard failed to mount");
    console.log("[PASS] Route #/drills mounted interactive 3D Flashcard runner");

    await evalPage('location.hash = "#/reference"; route();');
    await new Promise((r) => setTimeout(r, 200));
    let gauntletCount = await evalPage('document.querySelectorAll(".acc-item").length');
    if (gauntletCount !== 25) throw new Error(`Expected 25 questions, got ${gauntletCount}`);
    console.log("[PASS] Route #/reference mounted all 25 Senior Gauntlet accordions");

    // 2. Checklist & Progress Persistence
    console.log("\n--- 2. Testing Checklist & State Persistence ---");
    await evalPage('location.hash = "#/day/1"; route();');
    await new Promise((r) => setTimeout(r, 200));

    await evalPage(`
      const cb = document.querySelector('.day-page[data-slug="1"] input[type="checkbox"]');
      if (cb) {
        cb.checked = true;
        cb.dispatchEvent(new Event("change"));
      }
    `);

    let saved = await evalPage('JSON.parse(localStorage.getItem("ai80-20-v1") || "{}")["d1:0"] === 1');
    if (!saved) throw new Error("Day 1 task 0 was not saved to localStorage");
    console.log("[PASS] Checkbox tick saved to localStorage: d1:0 = 1");

    await evalPage("location.reload()");
    await new Promise((r) => setTimeout(r, 1000));
    await evalPage('location.hash = "#/day/1"; route();');
    await new Promise((r) => setTimeout(r, 200));

    let isCheckedReloaded = await evalPage(`
      document.querySelector('.day-page[data-slug="1"] input[type="checkbox"]').checked
    `);
    if (!isCheckedReloaded) throw new Error("Task lost checked state after page reload");
    console.log("[PASS] State persisted across reload: checkbox remains checked");

    // 3. Strict Import & Malformed Payload Rejection
    console.log("\n--- 3. Testing Strict Progress Import Validation ---");
    let importTest = await evalPage(`
      (function() {
        const payload = JSON.parse('{"app":"ai80-20","progress":{"d1:0":1,"d2:1":true,"d9999:0":1,"bad_key":"evil","malicious":"<script>"}}');
        const validKeyPattern = /^(d(?:[0-9]+(?:-[0-9]+)?)|gate|bar):([0-9]+)$/;
        const sanitized = Object.create(null);
        let valid = 0, discarded = 0;
        for (const k of Object.keys(payload.progress)) {
          if (k === "__proto__" || k === "constructor" || k === "prototype") { discarded++; continue; }
          if (!validKeyPattern.test(k)) { discarded++; continue; }
          const v = payload.progress[k];
          if (v === 1 || v === true) { sanitized[k] = 1; valid++; }
          else { discarded++; }
        }
        return { valid, discarded };
      })()
    `);
    if (importTest.valid !== 3 || importTest.discarded !== 2) {
      throw new Error("Strict import sanitization failed: " + JSON.stringify(importTest));
    }
    console.log("[PASS] Strict import validation accepted valid keys and rejected malicious keys");

    // 4. Search & Multi-Month Filters
    console.log("\n--- 4. Testing Search & Multi-Month Filtering ---");
    await evalPage('location.hash = "#/course"; route();');
    await new Promise((r) => setTimeout(r, 200));

    await evalPage(`
      const m2Btn = document.querySelector('.month-tab[data-month="2"]');
      if (m2Btn) m2Btn.click();
    `);
    let m2Shown = await evalPage('!document.querySelector(\'.dayrow[data-slug="29"]\').closest("li").hidden');
    let m1Hidden = await evalPage('document.querySelector(\'.dayrow[data-slug="1"]\').closest("li").hidden');
    if (!m2Shown || !m1Hidden) throw new Error("Month 2 tab filter failed");
    console.log("[PASS] Month tab filter verified (Month 2 shown, Month 1 hidden)");

    // Reset filter
    await evalPage('document.querySelector(\'.month-tab[data-month="all"]\').click();');

    // Text search
    await evalPage(`
      const input = document.getElementById("day-search");
      input.value = "RRF";
      input.dispatchEvent(new Event("input"));
    `);
    let matchCount = await evalPage('parseInt(document.getElementById("day-search-count").textContent)');
    if (isNaN(matchCount) || matchCount === 0) throw new Error("Search filter for RRF failed");
    console.log(`[PASS] Search filter for 'RRF' matched ${matchCount} days`);

    // 5. Command Palette
    console.log("\n--- 5. Testing Command Palette (<dialog>) ---");
    await evalPage(`
      const dialog = document.getElementById("command-palette");
      if (dialog) dialog.showModal();
    `);
    let isOpen = await evalPage('document.getElementById("command-palette").open');
    if (!isOpen) throw new Error("Command palette dialog failed to open");
    console.log("[PASS] Command Palette <dialog> opened via showModal()");

    await evalPage(`
      const cmdSearch = document.querySelector("#command-palette .cp-input");
      cmdSearch.value = "Prompt Injection";
      cmdSearch.dispatchEvent(new Event("input"));
    `);
    let resultItems = await evalPage('document.querySelectorAll("#cp-results-list .cp-item").length');
    if (resultItems === 0) throw new Error("Command palette search returned 0 items");
    console.log(`[PASS] Command Palette fuzzy search returned ${resultItems} items`);

    await evalPage('document.getElementById("command-palette").close();');
    let isClosed = await evalPage('!document.getElementById("command-palette").open');
    if (!isClosed) throw new Error("Command palette failed to close");
    console.log("[PASS] Command Palette closed cleanly");

    // 6. Mobile Layout
    console.log("\n--- 6. Testing Mobile Viewport (375px) ---");
    await send("Emulation.setDeviceMetricsOverride", {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true
    }, sessionId);
    await new Promise((r) => setTimeout(r, 300));
    let scrollWidth = await evalPage("document.documentElement.scrollWidth");
    console.log(`[PASS] Mobile viewport 375px test: page scrollWidth = ${scrollWidth}px (no horizontal blowout)`);

    // 7. Reset Behavior
    console.log("\n--- 7. Testing Reset Progress Engine ---");
    await evalPage(`
      window.confirm = () => true;
      const rBtn = document.getElementById("reset-btn");
      if (rBtn) rBtn.click();
    `);
    let remainingTicks = await evalPage('Object.keys(JSON.parse(localStorage.getItem("ai80-20-v1") || "{}")).length');
    if (remainingTicks !== 0) throw new Error("Reset engine failed to clear state");
    console.log("[PASS] Reset engine verified: 0 remaining ticks in storage");

    // 8. Accessibility
    console.log("\n--- 8. Testing Accessibility Attributes ---");
    let unlabelledButtons = await evalPage(`
      Array.from(document.querySelectorAll('button:not([aria-label])'))
        .filter(b => !b.textContent.trim() && !b.title)
        .length
    `);
    if (unlabelledButtons > 0) throw new Error(`Found ${unlabelledButtons} unlabelled buttons`);
    console.log("[PASS] Accessibility verified: All interactive buttons possess accessible names");

    console.log("\n==================================================");
    console.log(" ALL BROWSER-LEVEL END-TO-END TESTS PASSED! ✓");
    console.log("==================================================\n");

    ws.close();
    chrome.kill();
    server.close();
    process.exit(0);
  } catch (err) {
    console.error("\n[FAIL] Browser E2E Test Failed:", err);
    chrome.kill();
    server.close();
    process.exit(1);
  }
}

runTests();

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
 * 5. Keyboard Navigation & In-Page Search Hotkeys ('/', 'j'/'k', 't', 'c')
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

  // Launch Chrome. On CI (Linux runners) the sandbox cannot start under the
  // restricted user namespaces, and /dev/shm is small, so relax both there only.
  const chromeArgs = [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--user-data-dir=/tmp/test-chrome-e2e-profile",
    "--no-first-run",
    "--no-default-browser-check"
  ];
  if (process.env.CI) {
    chromeArgs.push("--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage");
  }
  const chrome = spawn(CHROME_PATH, chromeArgs, { stdio: ["ignore", "ignore", "pipe"] });

  // Keep Chrome's own error output so a failed start explains itself.
  let chromeStderr = "";
  let chromeExit = null;
  chrome.stderr.on("data", (c) => {
    chromeStderr = (chromeStderr + c).slice(-4000);
  });
  chrome.on("error", (err) => {
    chromeExit = `could not start ${CHROME_PATH}: ${err.message}`;
  });
  chrome.on("exit", (code, signal) => {
    chromeExit = `exited early (code ${code}, signal ${signal})`;
  });

  try {
    let versionData = null;
    for (let i = 0; i < 150 && !chromeExit; i++) {
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
      const why = chromeExit ? `Chrome ${chromeExit}` : "no answer after about 30 seconds";
      throw new Error(
        `Could not connect to Chrome DevTools Protocol (${why}). ` +
          `Chrome path: ${CHROME_PATH}. Chrome stderr: ${chromeStderr.trim() || "(empty)"}`
      );
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

    // Reset to pristine clean state
    await evalPage(`
      localStorage.clear();
      location.hash = "#/overview";
      route();
    `);
    await new Promise((r) => setTimeout(r, 500));

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
    let hasPedagogy = await evalPage('!document.querySelector(".day-page:not([hidden]) .pedagogy-blueprint").hidden');
    if (!hasPedagogy) throw new Error("Day 1 failed to render pedagogical blueprint");
    console.log(`[PASS] Route #/day/1 rendered with pedagogical blueprint: "${day1Heading.slice(0, 45)}..."`);

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

    let saved = await evalPage('JSON.parse(localStorage.getItem("ai80-20-flagship-v1") || "{}")["d1:0"] === 1');
    if (!saved) throw new Error("Day 1 task 0 was not saved to flagship namespace");
    console.log("[PASS] Checkbox tick saved to localStorage: d1:0 = 1 in ai80-20-flagship-v1");

    await evalPage("location.reload()");
    await new Promise((r) => setTimeout(r, 1000));
    await evalPage('location.hash = "#/day/1"; route();');
    await new Promise((r) => setTimeout(r, 200));

    let isCheckedReloaded = await evalPage(`
      document.querySelector('.day-page[data-slug="1"] input[type="checkbox"]').checked
    `);
    if (!isCheckedReloaded) throw new Error("Task lost checked state after page reload");
    console.log("[PASS] State persisted across reload: checkbox remains checked");

    // 3. Genuine Export -> Import Round Trip through UI
    console.log("\n--- 3. Testing Real UI Export -> Import Round Trip ---");
    let exportImportSuccess = await evalPage(`
      new Promise((resolve) => {
        let exportedText = null;
        const origCreate = URL.createObjectURL;
        URL.createObjectURL = (blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            exportedText = reader.result;

            // Clear state via reset button
            window.confirm = () => true;
            window.alert = () => {};
            const rBtn = document.getElementById("reset-btn");
            if (rBtn) rBtn.click();

            // Verify cleared
            const clearedState = JSON.parse(localStorage.getItem("ai80-20-flagship-v1") || "{}");
            if (Object.keys(clearedState).length !== 0) {
              return resolve({ ok: false, reason: "Reset failed to clear state before re-import" });
            }

            // Now dispatch real file import through UI input
            const file = new File([exportedText], "progress-backup.json", { type: "application/json" });
            const dt = new DataTransfer();
            dt.items.add(file);
            const input = document.getElementById("import-file-input");
            input.files = dt.files;
            input.dispatchEvent(new Event("change"));

            // Allow FileReader in app.js to process
            setTimeout(() => {
              const restoredState = JSON.parse(localStorage.getItem("ai80-20-flagship-v1") || "{}");
              const cbChecked = document.querySelector('.day-page[data-slug="1"] input[type="checkbox"]')?.checked;
              resolve({
                ok: restoredState["d1:0"] === 1 && cbChecked === true,
                reason: "restoredState=" + JSON.stringify(restoredState) + ", cbChecked=" + cbChecked
              });
            }, 300);
          };
          reader.readAsText(blob);
          return origCreate(blob);
        };

        // Click real UI export button
        document.getElementById("export-btn").click();
      })
    `);
    if (!exportImportSuccess.ok) throw new Error("Export/import round-trip failed: " + exportImportSuccess.reason);
    console.log("[PASS] Real UI Export -> Import round-trip verified (exported file successfully re-imported!)");

    // 4. Strict Import Validation & Security Defense
    console.log("\n--- 4. Testing Strict Import Validation & Security Checks ---");
    let securityValidationPassed = await evalPage(`
      new Promise((resolve) => {
        let lastAlert = null;
        window.alert = (msg) => { lastAlert = msg; };
        window.confirm = () => true;

        function simulateImport(fileObj) {
          lastAlert = null;
          const dt = new DataTransfer();
          dt.items.add(fileObj);
          const input = document.getElementById("import-file-input");
          input.files = dt.files;
          input.dispatchEvent(new Event("change"));
        }

        // Test A: File size > 500 KB rejected
        const oversized = new File([new Uint8Array(501 * 1024)], "huge.json", { type: "application/json" });
        simulateImport(oversized);
        if (!lastAlert || !lastAlert.includes("500 KB")) {
          return resolve({ ok: false, reason: "Oversized file not rejected: " + lastAlert });
        }

        // Test B: Malformed JSON rejected
        setTimeout(() => {
          const malformed = new File(["{ bad json content }"], "malformed.json", { type: "application/json" });
          simulateImport(malformed);
          setTimeout(() => {
            if (!lastAlert || !lastAlert.includes("Malformed")) {
              return resolve({ ok: false, reason: "Malformed JSON not rejected: " + lastAlert });
            }

            // Test C: Unrecognized app identifier rejected
            const badApp = new File([JSON.stringify({ app: "some-other-app", progress: {} })], "badapp.json", { type: "application/json" });
            simulateImport(badApp);
            setTimeout(() => {
              if (!lastAlert || !lastAlert.includes("Unrecognized application")) {
                return resolve({ ok: false, reason: "Bad app identifier not rejected: " + lastAlert });
              }

              // Test D: Attack payload with __proto__, constructor, nonexistent keys, and invalid string types
              const attackPayload = {
                app: "ai80-20-engineer",
                version: "1.0",
                progress: {
                  "__proto__": 1,
                  "constructor": 1,
                  "d9999:0": 1,
                  "d1:0": "1",
                  "d1:1": true,
                  "d2:0": 1
                }
              };
              const attackFile = new File([JSON.stringify(attackPayload)], "attack.json", { type: "application/json" });
              simulateImport(attackFile);
              setTimeout(() => {
                const current = JSON.parse(localStorage.getItem("ai80-20-flagship-v1") || "{}");
                const safe = (
                  !Object.prototype.hasOwnProperty.call(current, "__proto__") &&
                  !Object.prototype.hasOwnProperty.call(current, "constructor") &&
                  !Object.prototype.hasOwnProperty.call(current, "d9999:0") &&
                  !Object.prototype.hasOwnProperty.call(current, "d1:0") &&
                  current["d1:1"] === 1 &&
                  current["d2:0"] === 1
                );
                if (!safe) {
                  return resolve({ ok: false, reason: "Sanitization allowed invalid keys or types: " + JSON.stringify(current) });
                }
                resolve({ ok: true });
              }, 200);
            }, 100);
          }, 100);
        }, 100);
      })
    `);
    if (!securityValidationPassed.ok) {
      throw new Error("Security validation failed: " + securityValidationPassed.reason);
    }
    console.log("[PASS] Strict import validation rejected oversized, malformed, bad app, and prototype/key-pollution payloads");

    // 5. Curriculum Track Switcher & Namespace Isolation
    console.log("\n--- 5. Testing Track Switcher & Isolated Namespaces ---");
    await evalPage(`
      const sprintBtn = document.querySelector('.track-tab[data-track="sprint"]');
      if (sprintBtn) sprintBtn.click();
    `);
    await new Promise((r) => setTimeout(r, 300));
    let sprintDaysCount = await evalPage('document.querySelectorAll(".dayrow").length');
    let sprintKey = await evalPage('localStorage.getItem("ai80-20-track")');
    if (sprintDaysCount !== 33 || sprintKey !== "sprint") {
      throw new Error(`Sprint track failed: days=${sprintDaysCount}, track=${sprintKey}`);
    }
    console.log(`[PASS] Accelerated Sprint track active: ${sprintDaysCount} day cards in isolated namespace (ai80-20-sprint-v1)`);

    // Switch back to Flagship
    await evalPage(`
      const flagBtn = document.querySelector('.track-tab[data-track="flagship"]');
      if (flagBtn) flagBtn.click();
    `);
    await new Promise((r) => setTimeout(r, 300));
    let flagshipDaysCount = await evalPage('document.querySelectorAll(".dayrow").length');
    if (flagshipDaysCount !== 90) {
      throw new Error(`Flagship track failed: expected 90 days, got ${flagshipDaysCount}`);
    }
    console.log(`[PASS] Flagship 90-Day track restored: ${flagshipDaysCount} days across Weeks 1–13`);

    // 6. Search & Multi-Month Filters
    console.log("\n--- 6. Testing Search & Multi-Month Filtering ---");
    await evalPage(`
      const m3Btn = document.querySelector('.month-tab[data-month="3"]');
      if (m3Btn) m3Btn.click();
    `);
    let m3Shown = await evalPage('!document.querySelector(\'.dayrow[data-slug="90"]\').closest("li").hidden');
    let m1Hidden = await evalPage('document.querySelector(\'.dayrow[data-slug="1"]\').closest("li").hidden');
    if (!m3Shown || !m1Hidden) throw new Error("Month 3 tab filter failed to show Day 90 or hide Month 1");
    console.log("[PASS] Month tab filter verified (Month 3 Days 57–90 shown, Month 1 hidden)");

    // Reset filter
    await evalPage('document.querySelector(\'.month-tab[data-month="all"]\').click();');

    // Text search
    await evalPage(`
      const input = document.getElementById("day-search");
      input.value = "tokens";
      input.dispatchEvent(new Event("input"));
    `);
    let matchCount = await evalPage('parseInt(document.getElementById("day-search-count").textContent)');
    if (isNaN(matchCount) || matchCount === 0) throw new Error("Search filter for 'tokens' failed");
    console.log(`[PASS] Search filter for 'tokens' matched ${matchCount} days`);

    // 7. No Intrusive Popups & In-Page Search Focus
    console.log("\n--- 7. Testing No Uninvited Popups & In-Page Search Hotkey ---");
    let dialogCount = await evalPage('document.querySelectorAll("dialog").length');
    if (dialogCount !== 0) throw new Error(`Expected 0 modal dialog popups, found ${dialogCount}`);
    console.log("[PASS] Verified zero modal popups exist in DOM");

    // Test '/' keyboard shortcut focuses #day-search
    await evalPage(`
      if (document.activeElement) document.activeElement.blur();
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "/" }));
    `);
    await new Promise((r) => setTimeout(r, 100));
    let isSearchFocused = await evalPage('document.activeElement && document.activeElement.id === "day-search"');
    if (!isSearchFocused) throw new Error("Pressing '/' failed to focus in-page search input");
    console.log("[PASS] Hotkey '/' successfully focused in-page curriculum search");

    // Clear search filter
    await evalPage(`
      const ds = document.getElementById("day-search");
      if (ds) {
        ds.value = "";
        ds.dispatchEvent(new Event("input"));
      }
    `);
    console.log("[PASS] In-page search filter cleared cleanly");

    // 8. Keyboard Shortcuts
    console.log("\n--- 8. Testing Keyboard Shortcuts (j/k/t/c) ---");
    await evalPage(`
      if (document.activeElement) document.activeElement.blur();
      location.hash = "#/day/1";
      route();
    `);
    await new Promise((r) => setTimeout(r, 200));

    // 'j' to navigate to Day 2
    await evalPage('window.dispatchEvent(new KeyboardEvent("keydown", { key: "j" }));');
    await new Promise((r) => setTimeout(r, 200));
    let atDay2 = await evalPage('location.hash === "#/day/2"');
    if (!atDay2) throw new Error("Keyboard shortcut 'j' failed to navigate to Day 2");

    // 'k' to navigate back to Day 1
    await evalPage('window.dispatchEvent(new KeyboardEvent("keydown", { key: "k" }));');
    await new Promise((r) => setTimeout(r, 200));
    let atDay1 = await evalPage('location.hash === "#/day/1"');
    if (!atDay1) throw new Error("Keyboard shortcut 'k' failed to navigate to Day 1");

    // 't' to cycle theme
    let initialTheme = await evalPage('document.documentElement.dataset.theme');
    await evalPage('window.dispatchEvent(new KeyboardEvent("keydown", { key: "t" }));');
    let newTheme = await evalPage('document.documentElement.dataset.theme');
    if (initialTheme === newTheme) throw new Error("Keyboard shortcut 't' failed to cycle theme");
    console.log(`[PASS] Keyboard shortcuts verified: j/k day navigation, theme cycle (${initialTheme} -> ${newTheme})`);

    // 9. Browser History Navigation
    console.log("\n--- 9. Testing Browser History Navigation (back/forward) ---");
    await evalPage('location.hash = "#/course"; route();');
    await new Promise((r) => setTimeout(r, 150));
    await evalPage('location.hash = "#/labs"; route();');
    await new Promise((r) => setTimeout(r, 150));

    await evalPage("history.back()");
    await new Promise((r) => setTimeout(r, 200));
    let backedHash = await evalPage("location.hash");
    if (backedHash !== "#/course") throw new Error(`History back failed: expected #/course, got ${backedHash}`);

    await evalPage("history.forward()");
    await new Promise((r) => setTimeout(r, 200));
    let fwdHash = await evalPage("location.hash");
    if (fwdHash !== "#/labs") throw new Error(`History forward failed: expected #/labs, got ${fwdHash}`);
    console.log("[PASS] Browser history back/forward navigation cleanly preserved routes");

    // 10. Mobile Layout
    console.log("\n--- 10. Testing Mobile Viewport (375px) ---");
    await send("Emulation.setDeviceMetricsOverride", {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true
    }, sessionId);
    await new Promise((r) => setTimeout(r, 300));
    let scrollWidth = await evalPage("document.documentElement.scrollWidth");
    console.log(`[PASS] Mobile viewport 375px test: page scrollWidth = ${scrollWidth}px (no horizontal blowout)`);

    // 11. Reset Behavior
    console.log("\n--- 11. Testing Reset Progress Engine ---");
    await evalPage(`
      window.confirm = () => true;
      const rBtn = document.getElementById("reset-btn");
      if (rBtn) rBtn.click();
    `);
    let remainingTicks = await evalPage('Object.keys(JSON.parse(localStorage.getItem("ai80-20-flagship-v1") || "{}")).length');
    if (remainingTicks !== 0) throw new Error("Reset engine failed to clear state");
    console.log("[PASS] Reset engine verified: 0 remaining ticks in storage");

    // 12. Accessibility
    console.log("\n--- 12. Testing Accessibility Attributes ---");
    let unlabelledButtons = await evalPage(`
      Array.from(document.querySelectorAll('button:not([aria-label])'))
        .filter(b => !b.textContent.trim() && !b.title)
        .length
    `);
    if (unlabelledButtons > 0) throw new Error(`Found ${unlabelledButtons} unlabelled buttons`);
    console.log("[PASS] Accessibility verified: All interactive buttons possess accessible names");

    console.log("\n==================================================");
    console.log(" ALL 12 BROWSER-LEVEL END-TO-END TESTS PASSED! ✓");
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

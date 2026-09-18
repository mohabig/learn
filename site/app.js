/* ==========================================================================
   THE 80/20 AI ENGINEER — CORE APPLICATION ARCHITECTURE & ROUTER (site/app.js)
   Universal Hash Router · Progress Engine · Themes · Labs · Drills
   ========================================================================== */

(function () {
  "use strict";

  /* ==========================================================================
     1. Constants & Global State
     ========================================================================== */

  const TRACK_KEY = "ai80-20-track";
  const FLAGSHIP_KEY = "ai80-20-flagship-v1";
  const SPRINT_KEY = "ai80-20-sprint-v1";
  const LEGACY_KEY = "ai80-20-v1";
  const THEME_KEY = "ai80-20-theme";
  const STREAK_KEY = "ai80-20-streak";

  // Migrate legacy single key if present
  try {
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy && !localStorage.getItem(FLAGSHIP_KEY)) {
      localStorage.setItem(FLAGSHIP_KEY, legacy);
    }
  } catch (e) {}

  let currentTrack = "flagship";
  try {
    currentTrack = localStorage.getItem(TRACK_KEY) || "flagship";
  } catch (e) {}

  function getActiveStorageKey() {
    return currentTrack === "sprint" ? SPRINT_KEY : FLAGSHIP_KEY;
  }

  let KEY = getActiveStorageKey();

  function getActiveWeeks() {
    if (currentTrack === "sprint" && window.SPRINT_WEEKS && window.SPRINT_WEEKS.length) {
      return window.SPRINT_WEEKS;
    }
    return window.COURSE_WEEKS || [];
  }

  let WEEKS = getActiveWeeks();
  const LABS = window.LABS_DATA || [];
  const REFERENCE = window.REFERENCE_DATA || { questions: [], rubrics: [], resources: [] };
  const DRILLS = window.DRILLS_DATA || [];

  let state = {};
  function loadState() {
    KEY = getActiveStorageKey();
    try {
      state = JSON.parse(localStorage.getItem(KEY) || "{}") || {};
    } catch (e) {
      state = {};
    }
  }
  loadState();

  function saveState() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  }

  // Flatten days across active weeks and build strict key allowlist
  let DAYS = [];
  const VALID_TASK_KEYS = new Set();
  const slugOf = d => String(d).replace("–", "-").replace(".", "-");

  function buildDaysIndex() {
    DAYS = [];
    VALID_TASK_KEYS.clear();
    WEEKS = getActiveWeeks();

    WEEKS.forEach(w => {
      (w.days || []).forEach(day => {
        const slug = slugOf(day.d);
        DAYS.push({
          w,
          day,
          slug,
          label: (String(day.d).includes("–") ? "Days " : "Day ") + day.d
        });

        // Register valid task indices for this day
        (day.tasks || []).forEach((_, j) => {
          VALID_TASK_KEYS.add(`d${day.d}:${j}`);
          VALID_TASK_KEYS.add(`d${slug}:${j}`);
        });
      });
    });

    // Valid Day 0 prerequisite checks and milestone bars
    for (let i = 0; i < 6; i++) {
      VALID_TASK_KEYS.add(`day0:${i}`);
      VALID_TASK_KEYS.add(`gate:${i}`);
    }
    for (let i = 0; i < 5; i++) {
      VALID_TASK_KEYS.add(`bar:${i}`);
    }
  }

  buildDaysIndex();

  /* ==========================================================================
     2. String & Markdown Utilities
     ========================================================================== */

  const entityDecoder = document.createElement("textarea");
  function decodeEntities(text) {
    entityDecoder.innerHTML = text;
    return entityDecoder.value;
  }

  function stripHtml(text) {
    return decodeEntities(String(text || "").replace(/<[^>]+>/g, ""));
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function markdownish(text) {
    return decodeEntities(String(text || "")
      .replace(/<code>(.*?)<\/code>/g, "`$1`")
      .replace(/<b>(.*?)<\/b>/g, "**$1**")
      .replace(/<(?:i|em)>(.*?)<\/(?:i|em)>/g, "*$1*")
      .replace(/<[^>]+>/g, ""));
  }

  function todayISO() {
    const d = new Date();
    const pad = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  /* ==========================================================================
     3. Theme Switcher (Tri-State: Light -> Dark -> OLED)
     ========================================================================== */

  const THEMES = ["light", "dark", "oled"];

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function currentTheme() {
    return localStorage.getItem(THEME_KEY) || getSystemTheme();
  }

  function applyTheme(theme) {
    if (!THEMES.includes(theme)) theme = "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);

    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      if (theme === "light") {
        themeBtn.innerHTML = "☀️";
        themeBtn.title = "Current: Light (Click to switch to Dark)";
        themeBtn.setAttribute("aria-label", "Switch to Dark theme");
      } else if (theme === "dark") {
        themeBtn.innerHTML = "🌙";
        themeBtn.title = "Current: Dark (Click to switch to OLED Dark)";
        themeBtn.setAttribute("aria-label", "Switch to OLED Dark theme");
      } else {
        themeBtn.innerHTML = "⚡";
        themeBtn.title = "Current: OLED Dark (Click to switch to Light)";
        themeBtn.setAttribute("aria-label", "Switch to Light theme");
      }
    }
  }

  function cycleTheme() {
    const cur = currentTheme();
    const idx = THEMES.indexOf(cur);
    const next = THEMES[(idx + 1) % THEMES.length];
    applyTheme(next);
    flashToast(`Theme: ${next.toUpperCase()}`);
  }

  // Listen to OS theme changes if user hasn't set an explicit preference
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  }

  /* ==========================================================================
     4. Toast Notification
     ========================================================================== */

  let toastTimer = null;
  function flashToast(msg, duration = 2000) {
    let toast = document.getElementById("app-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "app-toast";
      toast.style.cssText = `
        position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        background: var(--surface); color: var(--ink);
        border: 1px solid var(--rule); border-radius: 8px;
        padding: 10px 16px; font-family: var(--font-mono); font-size: 12.5px;
        box-shadow: var(--modal-shadow); display: flex; align-items: center; gap: 8px;
        pointer-events: none; opacity: 0; transform: translateY(8px);
        transition: opacity 0.2s ease, transform 0.2s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
    }, duration);
  }

  /* ==========================================================================
     5. Streak Engine
     ========================================================================== */

  function updateStreak() {
    let streakData = {};
    try {
      streakData = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}") || {};
    } catch (e) {
      streakData = {};
    }

    const today = todayISO();
    if (!streakData.lastActive) {
      streakData = { count: 1, lastActive: today };
    } else if (streakData.lastActive !== today) {
      const last = new Date(streakData.lastActive);
      const now = new Date(today);
      const diffDays = Math.round((now - last) / 86400000);
      if (diffDays === 1) {
        streakData.count = (streakData.count || 0) + 1;
      } else if (diffDays > 1) {
        streakData.count = 1;
      }
      streakData.lastActive = today;
    }

    try {
      localStorage.setItem(STREAK_KEY, JSON.stringify(streakData));
    } catch (e) {}

    const streakEl = document.getElementById("streak-badge");
    if (streakEl) {
      streakEl.innerHTML = `🔥 ${streakData.count || 1}d streak`;
      streakEl.title = `Active ${streakData.count || 1} consecutive days`;
    }
  }

  /* ==========================================================================
     6. Dynamic Curriculum & Day Content Renderer
     ========================================================================== */

  // Helper for Feynman explanations on physical mechanisms
  function getFeynmanExplanation(day, week) {
    const dNum = parseInt(day.d, 10) || 1;
    let focus = "";
    let mechanism = "";
    let pitfall = "";

    if (dNum <= 7) {
      focus = "The Machine Room & The Terminal Wire";
      mechanism = "A shell process creates pipes using file descriptor integers in OS kernel memory. Standard input (0), standard output (1), and standard error (2) transfer raw byte streams without touching disk. Fast package managers like uv utilize hardlink sharing to map compiled wheels into isolated virtual environment prefixes in milliseconds.";
      pitfall = "Do not confuse string flags with language syntax; flags are just argv string arrays passed to main().";
    } else if (dNum <= 14) {
      focus = "Async Event Loops & Network Wire Packets";
      mechanism = "Python asyncio is a single-threaded event loop driven by OS multiplexing (epoll on Linux, kqueue on macOS). Non-blocking socket I/O yields execution control while waiting for TCP packet transit, allowing hundreds of concurrent model requests to progress simultaneously without CPU thread overhead.";
      pitfall = "A synchronous time.sleep() or CPU-bound loop inside a coroutine freezes the entire event loop for all concurrent requests.";
    } else if (dNum <= 28) {
      focus = "Provider SDKs, Token Streams & Constrained Schemas";
      mechanism = "Byte-Pair Encoding (BPE) turns UTF-8 byte sequences into integer tokens. Next-token generation samples logits across a 100,000-word vocabulary. Constrained decoding masks invalid grammar token logits to -inf prior to softmax, mathematically guaranteeing 100% Pydantic schema conformance on first-pass generation.";
      pitfall = "Never use subjective prompt pleading ('please return valid JSON'); always enforce JSON Schema logit masking or structured Pydantic models.";
    } else if (dNum <= 56) {
      focus = "Spatial Vector Geometry, Hybrid Search & MCP";
      mechanism = "Embedding models project text chunks into 1,536-dimensional hyper-spherical coordinates. Bi-encoder cosine distance provides fast ANN index traversal, while BM25 inverted indexes score exact term frequency. Reciprocal Rank Fusion (RRF, k=60) sums rank reciprocals to combine semantic and keyword relevance before cross-encoder reranking.";
      pitfall = "Cosine similarity requires descending sort; cosine distance requires ascending sort. Inverting sort order returns diametrically opposite chunks.";
    } else {
      focus = "Production Hardening, Telemetry & Open Model Serving";
      mechanism = "vLLM PagedAttention dynamically manages Key-Value (KV) cache memory in GPU VRAM like OS virtual memory paging, eliminating memory fragmentation and maximizing continuous batching throughput. Distributed tracing in Langfuse records span latencies, token consumption, and cost attribution per user query.";
      pitfall = "Orphaned async generators leak file descriptors during client disconnects unless resource cleanup is enclosed in try...finally.";
    }

    return { focus, mechanism, pitfall };
  }

  function renderCurriculumIndex() {
    const host = document.getElementById("course-weeks");
    if (!host) return;
    host.innerHTML = "";

    WEEKS.forEach(w => {
      const block = document.createElement("div");
      block.className = "week-block";
      block.dataset.week = String(w.n);

      const rowsHtml = (w.days || []).map(day => {
        const tags = [];
        if (day.lever) tags.push('<span class="badge badge-lever">⚡ High Leverage</span>');
        if (day.ship) tags.push('<span class="badge badge-ship">🚀 Ship Day</span>');

        const label = String(day.d).includes("–") ? "Days " + day.d : "Day " + day.d;
        const haystack = stripHtml([day.t, ...(day.tasks || []), day.done || ""].join(" ")).toLowerCase();
        const slug = slugOf(day.d);

        return `
          <li>
            <a class="dayrow" data-slug="${slug}" data-day="${day.d}" data-search="${escapeHtml(haystack)}" href="#/day/${slug}">
              <span class="dn">${label}</span>
              <span class="dt">${day.t}</span>
              ${tags.join(" ")}
              <span class="day-prog" data-slug="${slug}"></span>
            </a>
          </li>
        `;
      }).join("");

      block.innerHTML = `
        <div class="week-head">
          <h3>Week ${w.n} · ${w.title}</h3>
          <span class="wmeta">${w.range}</span>
        </div>
        <div class="minitrack"><div class="minifill" data-week="${w.n}"></div></div>
        <p class="outcome">“${w.outcome}”</p>
        <ul class="daylist">${rowsHtml}</ul>
      `;

      host.appendChild(block);
    });
  }

  function renderDayPages() {
    const dayHost = document.getElementById("day-host");
    if (!dayHost) return;
    dayHost.innerHTML = "";

    const contentSrc = document.getElementById("content-src");

    DAYS.forEach(({ w, day, slug, label }, i) => {
      const sec = document.createElement("div");
      sec.className = "day-page";
      sec.dataset.slug = slug;
      sec.dataset.day = String(day.d);
      sec.hidden = true;

      const tags = [];
      if (day.lever) tags.push('<span class="badge badge-lever">⚡ High Leverage</span>');
      if (day.ship) tags.push('<span class="badge badge-ship">🚀 Ship Day</span>');

      const itemsHtml = (day.tasks || []).map((t, j) => `
        <li>
          <label class="check">
            <input type="checkbox" data-k="d${day.d}:${j}">
            <span>${t}</span>
          </label>
        </li>
      `).join("");

      const prev = DAYS[i - 1];
      const next = DAYS[i + 1];

      const feynman = getFeynmanExplanation(day, w);

      // Check if authored article exists in window.COURSE_ARTICLES or #content-src
      let authoredHtml = "";
      if (window.COURSE_ARTICLES) {
        authoredHtml = window.COURSE_ARTICLES[slug] || window.COURSE_ARTICLES[String(day.d)] || "";
      }
      if (!authoredHtml && contentSrc) {
        const art = contentSrc.querySelector(`article[data-day="${slug}"]`) ||
                    contentSrc.querySelector(`article[data-day="${day.d}"]`);
        if (art) {
          authoredHtml = art.innerHTML;
        }
      }

      // Pedagogical breakdown helper
      let coreBuildTask = "";
      let depthTask = "";
      (day.tasks || []).forEach(t => {
        if (t.includes("Build:") || t.includes("Drill:") || t.includes("Defense:")) {
          coreBuildTask = t;
        } else if (!depthTask && (t.includes("Profile") || t.includes("Compare") || t.includes("Investigate") || t.includes("Review") || t.includes("Simulate") || t.includes("Explain") || t.includes("Document"))) {
          depthTask = t;
        }
      });
      if (!coreBuildTask && (day.tasks || []).length > 0) {
        coreBuildTask = day.tasks[day.tasks.length - 1];
      }
      if (!depthTask && (day.tasks || []).length > 1) {
        depthTask = day.tasks[0];
      }

      sec.innerHTML = `
        <div class="crumbs">
          <a href="#/course">← All Curriculum Days</a>
          <span style="color:var(--rule)">/</span>
          <span class="eyebrow">Week ${w.n} · ${label}</span>
        </div>

        <div class="day-title-row">
          <h2 class="day-title">${day.t}</h2>
          ${tags.join(" ")}
        </div>

        <div class="day-content">
          ${authoredHtml ? authoredHtml : `
            <p class="day-lede">${day.t} — master the physical mechanics and software boundaries.</p>
            <div class="mechanism-card">
              <h4>Physical Mechanism Under the Hood</h4>
              <p>${feynman.mechanism}</p>
            </div>
            <div class="gotchas-card" style="margin:16px 0; padding:16px 20px; background:var(--surface); border-left:3px solid var(--signal); border-radius:0 8px 8px 0;">
              <h4 style="margin:0 0 6px; font-size:18px;">Senior Trap to Avoid</h4>
              <p style="margin:0; font-size:14.5px; color:var(--ink-2);">${feynman.pitfall}</p>
            </div>
          `}
        </div>

        <div class="pedagogy-blueprint" style="margin:20px 0; padding:18px 20px; background:var(--surface); border:1px solid var(--rule); border-radius:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid var(--rule); padding-bottom:8px;">
            <span style="font-weight:700; font-size:12px; text-transform:uppercase; letter-spacing:0.06em; color:var(--accent);">Pedagogical Blueprint</span>
            <span class="badge" style="font-size:11.5px;">⏱️ Timebox: 60–90 min (45m Core Build)</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:14px; font-size:13.5px;">
            <div>
              <strong style="color:var(--ink); display:block; margin-bottom:3px;">🎯 Required Outcome</strong>
              <span style="color:var(--ink-2);">${day.done || "Working software verified by automated test assertions."}</span>
            </div>
            <div>
              <strong style="color:var(--ink); display:block; margin-bottom:3px;">🔨 45-Min Core Build</strong>
              <span style="color:var(--ink-2);">${coreBuildTask || "Hands-on implementation and test assertion."}</span>
            </div>
            <div>
              <strong style="color:var(--ink); display:block; margin-bottom:3px;">🔬 Depth &amp; Investigation</strong>
              <span style="color:var(--ink-2);">${depthTask || "Physical wire mechanics, memory footprint, and edge-case failure modes."}</span>
            </div>
            <div>
              <strong style="color:var(--ink); display:block; margin-bottom:3px;">📦 Retained Artifact</strong>
              <span style="color:var(--ink-2);">Git commit, benchmark numbers in <code>LOG.md</code>, and passing test suite.</span>
            </div>
          </div>
        </div>

        <div class="day-check">
          <h4>Today's Actionable Checklist</h4>
          <ul class="checks">${itemsHtml}</ul>
          <div class="day-done">
            <b>Done when:</b>
            <span>${day.done || "You can verify correct execution end-to-end with unit assertions."}</span>
          </div>
          <div class="logrow">
            <button class="btn copylog" type="button">Copy log entry</button>
            <span class="note">Formatted LOG.md entry with your completed tasks under "Built:".</span>
          </div>
        </div>

        <nav class="pager">
          ${prev ? `
            <a href="#/day/${prev.slug}">
              <span class="plabel">← Previous Day</span>
              <span class="pname">${prev.day.t}</span>
            </a>
          ` : `<span></span>`}

          ${next ? `
            <a class="next" href="#/day/${next.slug}">
              <span class="plabel">Next Day →</span>
              <span class="pname">${next.day.t}</span>
            </a>
          ` : `
            <a class="next" href="#/reference">
              <span class="plabel">Finish →</span>
              <span class="pname">Senior Interview Gauntlet & Rubrics</span>
            </a>
          `}
        </nav>
      `;

      dayHost.appendChild(sec);
    });
  }

  /* ==========================================================================
     7. Labs View Renderer
     ========================================================================== */

  let activeLabId = "lab-01";

  function renderLabsView() {
    const host = document.getElementById("labs-container");
    if (!host) return;

    if (!LABS.length) {
      host.innerHTML = '<p class="placeholder">No bug hunt labs data available.</p>';
      return;
    }

    const currentLab = LABS.find(l => l.id === activeLabId) || LABS[0];
    const isP0 = String(currentLab.severity || "").includes("P0");
    const testCmd = currentLab.testCommand || (currentLab.directory ? `python3 ${currentLab.directory}/test_${currentLab.id.replace('-', '')}.py` : `python3 labs/${currentLab.id}/test.py`);
    const brokenSnippet = currentLab.brokenCode || (currentLab.failingTrace ? currentLab.failingTrace.split("\n\n# Execution Trace:")[0] : "");
    const fixedSnippet = currentLab.fixCode || currentLab.fixedCode || "";
    const logTrace = currentLab.failingTrace || currentLab.failureLog || "";
    const mechanismText = currentLab.physicalMechanism || currentLab.mechanism || "";

    host.innerHTML = `
      <div class="labs-view">
        <div class="sec-head">
          <div class="eyebrow">Adversarial Engineering</div>
          <h2>Friday Adversarial Bug Hunt Labs</h2>
          <p class="lede">You do not understand a production system until you know how to break it. Study the post-mortems of four critical outages, inspect the raw failure logs, and verify the physical fix.</p>
        </div>

        <div class="labs-nav" role="tablist">
          ${LABS.map((lab, idx) => {
            const labIsP0 = String(lab.severity || "").includes("P0");
            const labelNum = lab.num || String(idx + 1).padStart(2, "0");
            return `
              <button type="button" class="lab-tab ${lab.id === currentLab.id ? 'is-active' : ''}" data-lab="${lab.id}">
                <span class="badge ${labIsP0 ? 'badge-p0' : 'badge-p1'}" style="font-size:10px; padding:1px 5px;">${labIsP0 ? 'P0' : 'P1'}</span>
                <span>Lab ${labelNum}: ${escapeHtml(lab.title.split('&')[0].trim())}</span>
              </button>
            `;
          }).join("")}
        </div>

        <div class="lab-panel">
          <div class="lab-banner">
            <div class="lab-meta-row">
              <span class="badge ${isP0 ? 'badge-p0' : 'badge-p1'}">${escapeHtml(currentLab.severity || "P0")}</span>
              ${currentLab.component ? `<span class="tag">Component: ${escapeHtml(currentLab.component)}</span>` : ''}
              ${currentLab.directory ? `<span class="tag"><code>${escapeHtml(currentLab.directory)}</code></span>` : ''}
            </div>
            <h3>${escapeHtml(currentLab.title)}</h3>
            <p class="lab-summary">${escapeHtml(currentLab.scenario || currentLab.summary || "")}</p>
          </div>

          ${currentLab.mystery ? `
            <div class="mechanism-card" style="border-left-color:var(--signal); background:var(--elevated);">
              <h4 style="color:var(--signal-ink);">The Forensic Investigation Mystery</h4>
              <p>${escapeHtml(currentLab.mystery)}</p>
            </div>
          ` : ''}

          <div class="terminal-box">
            <div class="terminal-header">
              <span class="term-dot red"></span>
              <span class="term-dot yellow"></span>
              <span class="term-dot green"></span>
              <span>Production Incident Crime Scene & Failure Log</span>
            </div>
            <div class="terminal-body">${escapeHtml(logTrace)}</div>
          </div>

          <div class="mechanism-card">
            <h4>The Forensic Physical Mechanism</h4>
            <p>${escapeHtml(mechanismText)}</p>
          </div>

          <div class="diff-grid">
            <div class="diff-col broken">
              <div class="diff-col-head">
                <span>❌ Naive / Broken Implementation</span>
                <span>Produces Incident</span>
              </div>
              <pre><code>${escapeHtml(brokenSnippet)}</code></pre>
            </div>
            <div class="diff-col fixed">
              <div class="diff-col-head">
                <span>✅ Hardened Production Fix</span>
                <span>Mathematically Proven</span>
              </div>
              <pre><code>${escapeHtml(fixedSnippet)}</code></pre>
            </div>
          </div>

          <div class="lab-verify-box" style="margin-top:10px; padding:16px 20px; background:var(--surface); border:1px solid var(--rule); border-radius:8px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
            <div>
              <b style="display:block; font-family:var(--font-mono); font-size:12px; color:var(--ink);">Run Lab Verification Test:</b>
              <code style="font-size:13px;">${escapeHtml(testCmd)}</code>
            </div>
            <button type="button" class="btn btn-sm copy-test-cmd" data-cmd="${escapeHtml(testCmd)}">Copy Command</button>
          </div>
        </div>
      </div>
    `;

    host.querySelectorAll(".lab-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        activeLabId = btn.dataset.lab;
        renderLabsView();
      });
    });

    const copyCmdBtn = host.querySelector(".copy-test-cmd");
    if (copyCmdBtn) {
      copyCmdBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(copyCmdBtn.dataset.cmd).then(() => {
          flashToast("Command copied to clipboard!");
        });
      });
    }
  }

  /* ==========================================================================
     8. Reference View Renderer
     ========================================================================== */

  function renderReferenceView() {
    const qHost = document.getElementById("interview-questions-host");
    const rubricsHost = document.getElementById("rubrics-host");
    const resourcesHost = document.getElementById("resources-host");

    function getTierCriteria(tier) {
      if (!tier) return [];
      if (Array.isArray(tier)) return tier;
      if (Array.isArray(tier.criteria)) return tier.criteria;
      return [];
    }

    if (qHost && REFERENCE.questions) {
      qHost.innerHTML = `
        <div class="accordion-list">
          ${REFERENCE.questions.map((q, idx) => {
            const num = q.num !== undefined ? q.num : (idx + 1);
            const questionText = q.question || q.q || "";
            const answerText = q.answer || q.a || "";
            const categoryTag = q.category ? `<span class="tag" style="margin-left:auto; font-size:10px;">${escapeHtml(q.category)}</span>` : "";

            return `
              <details class="acc-item">
                <summary class="acc-summary">
                  <span class="acc-num">Q${num}.</span>
                  <span>${escapeHtml(questionText)}</span>
                  ${categoryTag}
                  <span class="acc-chevron">▼</span>
                </summary>
                <div class="acc-body">${escapeHtml(answerText)}</div>
              </details>
            `;
          }).join("")}
        </div>
      `;
    }

    if (rubricsHost && REFERENCE.rubrics) {
      rubricsHost.innerHTML = `
        <div class="rubrics-grid">
          ${REFERENCE.rubrics.map((r, idx) => {
            const pNum = r.projectNum || r.number || (idx + 1);
            const pName = r.name || r.title || "";
            const pMilestone = r.milestone || `Project ${pNum}`;
            const pDesc = r.desc || r.description || "";
            const bronzeList = getTierCriteria(r.tiers && r.tiers.bronze);
            const silverList = getTierCriteria(r.tiers && r.tiers.silver);
            const goldList = getTierCriteria(r.tiers && r.tiers.gold);

            return `
              <div class="rubric-card">
                <div>
                  <span class="eyebrow">${escapeHtml(pMilestone)}</span>
                  <h3>Project ${pNum}: ${escapeHtml(pName)}</h3>
                  <p style="font-size:14px; color:var(--muted); margin-top:6px;">${escapeHtml(pDesc)}</p>
                </div>

                <div class="tier-section">
                  <div class="tier-head">
                    <span class="badge badge-bronze">Bronze</span>
                    <span>Junior Baseline</span>
                  </div>
                  <ul class="tier-list">
                    ${bronzeList.map(c => `<li>${escapeHtml(c)}</li>`).join("")}
                  </ul>
                </div>

                <div class="tier-section">
                  <div class="tier-head">
                    <span class="badge badge-silver">Silver</span>
                    <span>Production-Ready</span>
                  </div>
                  <ul class="tier-list">
                    ${silverList.map(c => `<li>${escapeHtml(c)}</li>`).join("")}
                  </ul>
                </div>

                <div class="tier-section">
                  <div class="tier-head">
                    <span class="badge badge-gold">Gold</span>
                    <span>Senior Signal</span>
                  </div>
                  <ul class="tier-list">
                    ${goldList.map(c => `<li>${escapeHtml(c)}</li>`).join("")}
                  </ul>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `;
    }

    if (resourcesHost && REFERENCE.resources) {
      resourcesHost.innerHTML = `
        <ul class="res-list">
          ${REFERENCE.resources.map(res => `
            <li class="res-item">
              <span class="res-cat">${escapeHtml(res.category || "")}</span>
              <div class="res-desc">
                <a href="${escapeHtml(res.url || "#")}" target="_blank" rel="noopener noreferrer">
                  <b>${escapeHtml(res.title || "")}</b>
                </a>
                ${res.author ? `— <i>${escapeHtml(res.author)}</i>` : ""}: ${escapeHtml(res.desc || res.description || "")}
              </div>
            </li>
          `).join("")}
        </ul>
      `;
    }
  }

  /* ==========================================================================
     9. Progress Engine
     ========================================================================== */

  function initCheckboxes() {
    const boxes = Array.from(document.querySelectorAll('input[type="checkbox"][data-k]'));
    boxes.forEach(cb => {
      cb.checked = !!state[cb.dataset.k];
      cb.addEventListener("change", () => {
        if (cb.checked) {
          state[cb.dataset.k] = 1;
        } else {
          delete state[cb.dataset.k];
        }
        saveState();
        refreshProgress();
        updateStreak();
      });
    });
  }

  function refreshProgress() {
    const boxes = Array.from(document.querySelectorAll('input[type="checkbox"][data-k]'));
    const total = boxes.length;
    const done = boxes.filter(b => b.checked).length;
    const pct = total ? Math.round((done / total) * 100) : 0;

    // Progress text & meter
    const pctEl = document.getElementById("progress-text");
    if (pctEl) pctEl.textContent = `${done} / ${total} (${pct}%)`;

    // SVG Ring update (circumference = 2 * PI * r = 2 * 3.14159 * 9 ≈ 56.5)
    const circle = document.getElementById("progress-ring-circle");
    if (circle) {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (pct / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }

    // Per-day completion indicators
    document.querySelectorAll(".day-page").forEach(sec => {
      const dayBoxes = Array.from(sec.querySelectorAll('.day-check input[type="checkbox"]'));
      const dayDone = dayBoxes.filter(c => c.checked).length;
      const allDone = dayDone === dayBoxes.length && dayBoxes.length > 0;
      sec.classList.toggle("all-done", allDone);

      const row = document.querySelector(`.dayrow[data-slug="${sec.dataset.slug}"]`);
      if (row) {
        row.classList.toggle("is-done", allDone);
        const progEl = row.querySelector(".day-prog");
        if (progEl) {
          progEl.textContent = allDone ? "done ✓" : `${dayDone}/${dayBoxes.length}`;
        }
      }
    });

    // Per-week mini tracks
    document.querySelectorAll(".minifill").forEach(el => {
      const wNum = el.dataset.week;
      const w = WEEKS.find(x => String(x.n) === String(wNum));
      if (!w) return;
      let wTotal = 0, wDone = 0;
      (w.days || []).forEach(day => {
        (day.tasks || []).forEach((_, j) => {
          wTotal++;
          if (state[`d${day.d}:${j}`]) wDone++;
        });
      });
      el.style.width = (wTotal ? (wDone / wTotal * 100) : 0) + "%";
    });

    // Month-by-month progress summary bars
    const mConfigs = [
      { id: "m1", start: 1, end: 28 },
      { id: "m2", start: 29, end: 56 },
      { id: "m3", start: 57, end: 90 }
    ];

    mConfigs.forEach(m => {
      let mTotal = 0, mDone = 0;
      DAYS.forEach(entry => {
        const num = parseInt(entry.day.d, 10);
        if (num >= m.start && num <= m.end) {
          (entry.day.tasks || []).forEach((_, j) => {
            mTotal++;
            if (state[`d${entry.day.d}:${j}`]) mDone++;
          });
        }
      });
      const fillEl = document.getElementById(`${m.id}-fill`);
      const textEl = document.getElementById(`${m.id}-pct`);
      if (fillEl) fillEl.style.width = (mTotal ? (mDone / mTotal * 100) : 0) + "%";
      if (textEl) textEl.textContent = `${mDone}/${mTotal}`;
    });
  }

  /* ==========================================================================
     10. Resume Target Finder
     ========================================================================== */

  function resumeTarget() {
    function dayStats(entry) {
      let checked = 0;
      (entry.day.tasks || []).forEach((_, j) => {
        if (state[`d${entry.day.d}:${j}`]) checked++;
      });
      return { checked, total: (entry.day.tasks || []).length };
    }

    const stats = DAYS.map(dayStats);

    // 1. Day you started but did not finish
    for (let i = 0; i < DAYS.length; i++) {
      if (stats[i].checked > 0 && stats[i].checked < stats[i].total) {
        return DAYS[i];
      }
    }

    // 2. Day after the furthest day touched
    let lastTouched = -1;
    for (let i = 0; i < DAYS.length; i++) {
      if (stats[i].checked > 0) lastTouched = i;
    }
    if (lastTouched === -1) return DAYS[0];

    for (let i = lastTouched + 1; i < DAYS.length; i++) {
      if (stats[i].checked < stats[i].total) return DAYS[i];
    }

    return DAYS[0];
  }

  /* ==========================================================================
     11. LOG.md Entry Generator
     ========================================================================== */

  function generateLogEntry(entry) {
    const completedTasks = (entry.day.tasks || [])
      .filter((_, j) => state[`d${entry.day.d}:${j}`])
      .map(t => "  - " + markdownish(t));

    return [
      `## ${entry.label} — ${stripHtml(entry.day.t)}  (${todayISO()}, Xh)`,
      "- Built:",
      ...(completedTasks.length ? completedTasks : ["  - (None yet recorded)"]),
      "- Worked:",
      "- Surprised me:",
      "- Still fuzzy:",
      "- Numbers: cost/request $0.00XX · p95 XXXms · eval score XX.X%",
      ""
    ].join("\n");
  }

  function initLogCopyHandlers() {
    document.querySelectorAll(".copylog").forEach(btn => {
      btn.addEventListener("click", () => {
        const sec = btn.closest(".day-page");
        const entry = DAYS.find(d => d.slug === sec.dataset.slug);
        if (!entry) return;

        const text = generateLogEntry(entry);
        const row = btn.closest(".logrow");

        let ta = row.parentNode.querySelector(".logout");
        if (ta) ta.remove();

        navigator.clipboard.writeText(text).then(
          () => flashToast("Copied to clipboard!"),
          () => {
            // Fallback
            const fallbackTa = document.createElement("textarea");
            fallbackTa.className = "logout";
            fallbackTa.value = text;
            row.parentNode.appendChild(fallbackTa);
            fallbackTa.focus();
            fallbackTa.select();
            flashToast("Select and copy");
          }
        );
      });
    });
  }

  /* ==========================================================================
     12. Export, Import & Reset Progress
     ========================================================================== */

  function initTools() {
    // Resume
    const resumeBtn = document.getElementById("resume-btn");
    if (resumeBtn) {
      resumeBtn.addEventListener("click", () => {
        const target = resumeTarget();
        location.hash = target ? `#/day/${target.slug}` : "#/course";
      });
    }

    // Export
    const exportBtn = document.getElementById("export-btn");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const payload = {
          app: "ai80-20-engineer",
          version: "1.0",
          key: KEY,
          exported: new Date().toISOString(),
          checkedCount: Object.keys(state).length,
          progress: state
        };

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ai80-20-progress-${todayISO()}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        flashToast("Exported progress backup!");
      });
    }

    // Import
    const importBtn = document.getElementById("import-btn");
    const importInput = document.getElementById("import-file-input");
    if (importBtn && importInput) {
      importBtn.addEventListener("click", () => {
        importInput.value = "";
        importInput.click();
      });

      importInput.addEventListener("change", () => {
        const file = importInput.files && importInput.files[0];
        if (!file) return;

        // Hard file size limit: 500 KB
        if (file.size > 500 * 1024) {
          alert("Import rejected: File size exceeds the maximum limit of 500 KB.");
          importInput.value = "";
          return;
        }

        const reader = new FileReader();
        reader.onload = () => {
          let data;
          try {
            data = JSON.parse(reader.result);
          } catch (e) {
            alert("Import rejected: Malformed or unparseable JSON file.");
            importInput.value = "";
            return;
          }

          if (!data || typeof data !== "object" || Array.isArray(data)) {
            alert("Import rejected: Expected a valid JSON object.");
            importInput.value = "";
            return;
          }

          // Schema version check: accept both current and legacy identifiers
          if ("app" in data && data.app !== "ai80-20-engineer" && data.app !== "ai80-20") {
            alert("Import rejected: Unrecognized application identifier.");
            importInput.value = "";
            return;
          }

          if ("version" in data) {
            const vStr = String(data.version);
            if (!vStr.startsWith("1")) {
              alert("Import rejected: Unsupported schema version.");
              importInput.value = "";
              return;
            }
          }

          const rawProgress = (data.progress && typeof data.progress === "object" && !Array.isArray(data.progress))
            ? data.progress
            : data;

          // Strict Allowlist Key Validation:
          // Valid keys: d<day>:<task_index> (e.g. d1:0, d0-1:2) or day0:<index> or gate:<index> or bar:<index>
          const validKeyPattern = /^(d(?:[0-9]+(?:-[0-9]+)?)|day0|gate|bar):([0-9]+)$/;
          const sanitizedState = Object.create(null);
          let validCount = 0;
          let discardedCount = 0;

          for (const key of Object.keys(rawProgress)) {
            // Anti-prototype pollution & length guard
            if (key === "__proto__" || key === "constructor" || key === "prototype" || key.length > 32) {
              discardedCount++;
              continue;
            }

            if (!validKeyPattern.test(key)) {
              discardedCount++;
              continue;
            }

            // Bound validation: Key must exist in current curriculum task index
            if (!VALID_TASK_KEYS.has(key)) {
              discardedCount++;
              continue;
            }

            const val = rawProgress[key];
            // Value must strictly be boolean true/false or number 1/0 (strings like "1" or "0" are strictly rejected)
            if (val === true || val === 1) {
              sanitizedState[key] = 1;
              validCount++;
            } else if (val === false || val === 0) {
              // Explicitly unchecked
            } else {
              discardedCount++;
            }
          }

          if (validCount === 0) {
            alert("Import rejected: File contains 0 valid course progress entries.");
            importInput.value = "";
            return;
          }

          const warnMsg = discardedCount > 0
            ? ` (${discardedCount} unrecognized or invalid entries ignored)`
            : "";

          const confirmed = confirm(
            `Import progress from "${file.name}"?\n` +
            `This will apply ${validCount} valid completed tasks${warnMsg} and replace current ticks.`
          );
          if (!confirmed) {
            importInput.value = "";
            return;
          }

          state = sanitizedState;
          saveState();
          const boxes = Array.from(document.querySelectorAll('input[type="checkbox"][data-k]'));
          boxes.forEach(b => {
            b.checked = !!state[b.dataset.k];
          });
          refreshProgress();
          flashToast(`Imported ${validCount} tasks successfully!`);
          importInput.value = "";
        };
        reader.readAsText(file);
      });
    }

    // Reset
    const resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (!confirm("Reset all 329 task ticks across all 84 days? This cannot be undone.")) return;
        state = {};
        saveState();
        document.querySelectorAll('input[type="checkbox"][data-k]').forEach(b => {
          b.checked = false;
        });
        refreshProgress();
        flashToast("Progress cleared.");
      });
    }
  }

  /* ==========================================================================
     13. Course Filtering (Months, Tags, Search)
     ========================================================================== */

  let activeMonth = "all";
  let activeTag = "all";

  function initCourseFilters() {
    const monthBtns = document.querySelectorAll(".month-tab");
    monthBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        monthBtns.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        activeMonth = btn.dataset.month;
        applyFilters();
      });
    });

    const pillBtns = document.querySelectorAll(".pill-btn");
    pillBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        pillBtns.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        activeTag = btn.dataset.tag;
        applyFilters();
      });
    });

    const searchInput = document.getElementById("day-search");
    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
      searchInput.addEventListener("keydown", e => {
        if (e.key === "Escape") {
          searchInput.value = "";
          applyFilters();
        }
      });
    }
  }

  function applyFilters() {
    const searchInput = document.getElementById("day-search");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const countEl = document.getElementById("day-search-count");

    let visibleCount = 0;
    const dayRows = document.querySelectorAll(".dayrow");

    dayRows.forEach(row => {
      const dayNum = parseInt(row.dataset.day, 10);
      const searchData = row.dataset.search || "";
      const text = row.querySelector(".dt").textContent.toLowerCase();
      const dn = row.querySelector(".dn").textContent.toLowerCase();

      // Month filter
      let monthMatch = true;
      if (activeMonth === "1") monthMatch = dayNum >= 1 && dayNum <= 28;
      else if (activeMonth === "2") monthMatch = dayNum >= 29 && dayNum <= 56;
      else if (activeMonth === "3") monthMatch = dayNum >= 57 && dayNum <= 90;

      // Tag filter
      let tagMatch = true;
      if (activeTag === "lever") tagMatch = !!row.querySelector(".badge-lever");
      else if (activeTag === "ship") tagMatch = !!row.querySelector(".badge-ship");

      // Query filter
      let queryMatch = true;
      if (query) {
        queryMatch = searchData.includes(query) || text.includes(query) || dn.includes(query);
      }

      const isShown = monthMatch && tagMatch && queryMatch;
      row.parentNode.hidden = !isShown;
      if (isShown) visibleCount++;
    });

    // Hide entire week blocks if all child days are hidden
    document.querySelectorAll(".week-block").forEach(block => {
      const hasVisible = !!block.querySelector(".daylist > li:not([hidden])");
      block.hidden = !hasVisible;
    });

    if (countEl) {
      countEl.textContent = `${visibleCount} of ${DAYS.length}`;
      countEl.hidden = !query && activeMonth === "all" && activeTag === "all";
    }
  }

  function initTrackSwitcher() {
    const trackTabs = document.querySelectorAll(".track-tab");
    trackTabs.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTrack = btn.dataset.track;
        if (targetTrack === currentTrack) return;
        setTrack(targetTrack);
      });
    });

    // Sync initial UI state with stored track
    syncTrackUI();
  }

  function syncTrackUI() {
    document.querySelectorAll(".track-tab").forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.track === currentTrack);
    });

    const badge = document.getElementById("brand-track-badge");
    if (badge) badge.textContent = currentTrack === "sprint" ? "30D Sprint" : "90D Flagship";

    const eyebrow = document.getElementById("curriculum-eyebrow");
    if (eyebrow) eyebrow.textContent = currentTrack === "sprint" ? "The 30-Day Accelerated Sprint" : "The 90-Day Production Journey";

    const heading = document.getElementById("curriculum-heading");
    if (heading) heading.textContent = currentTrack === "sprint" ? "All 30 Days & 124 Tasks" : "All 90 Days & 353 Tasks";

    const monthRow = document.querySelector(".month-tabs");
    const mprogRow = document.querySelector(".month-progress-row");
    if (monthRow) monthRow.style.display = currentTrack === "sprint" ? "none" : "flex";
    if (mprogRow) mprogRow.style.display = currentTrack === "sprint" ? "none" : "grid";
  }

  function setTrack(newTrack) {
    if (newTrack !== "flagship" && newTrack !== "sprint") return;
    currentTrack = newTrack;
    try {
      localStorage.setItem(TRACK_KEY, newTrack);
    } catch (e) {}

    loadState();
    buildDaysIndex();
    syncTrackUI();

    // Re-render views
    renderCurriculumIndex();
    renderDayPages();
    initCheckboxes();
    initLogCopyHandlers();
    refreshProgress();
    updateStreak();
    applyFilters();
    flashToast(`Switched to ${currentTrack === "sprint" ? "30-Day Sprint" : "90-Day Flagship"} track!`);
  }

  /* ==========================================================================
     14. Global Keyboard Shortcuts ('j'/'k', 't', 'c', '/')
     ========================================================================== */

  function initKeyboardShortcuts() {
    window.addEventListener("keydown", e => {
      // '/' or Cmd+K / Ctrl+K jumps to and focuses curriculum day search
      if (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
        const activeEl = document.activeElement;
        if (activeEl && ["INPUT", "TEXTAREA", "SELECT"].includes(activeEl.tagName)) {
          return;
        }
        e.preventDefault();
        if (location.hash !== "#/course") {
          location.hash = "#/course";
        }
        setTimeout(() => {
          const searchInput = document.getElementById("day-search");
          if (searchInput) {
            searchInput.focus();
            searchInput.select();
          }
        }, 50);
        return;
      }

      // Ignore single-character hotkeys if typing in inputs
      const activeEl = document.activeElement;
      if (activeEl && ["INPUT", "TEXTAREA", "SELECT"].includes(activeEl.tagName)) {
        return;
      }

      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        cycleTheme();
      } else if (e.key === "j") {
        // Next Day
        navigateRelativeDay(1);
      } else if (e.key === "k") {
        // Previous Day
        navigateRelativeDay(-1);
      } else if (e.key === "c" || e.key === "C") {
        // Copy log for active day
        const activeDaySec = document.querySelector('.day-page:not([hidden])');
        if (activeDaySec) {
          const btn = activeDaySec.querySelector(".copylog");
          if (btn) btn.click();
        }
      }
    });
  }

  function navigateRelativeDay(offset) {
    const h = location.hash || "";
    const m = h.match(/^#\/day\/([\w-]+)/);
    let curIdx = -1;
    if (m) {
      curIdx = DAYS.findIndex(d => d.slug === m[1]);
    }
    if (curIdx === -1) {
      if (offset > 0) location.hash = `#/day/${DAYS[0].slug}`;
      return;
    }

    const nextIdx = curIdx + offset;
    if (nextIdx >= 0 && nextIdx < DAYS.length) {
      location.hash = `#/day/${DAYS[nextIdx].slug}`;
    }
  }

  /* ==========================================================================
     16. Universal Hash Router
     ========================================================================== */

  function route() {
    const hash = location.hash || "#/overview";
    const views = document.querySelectorAll(".view");
    const tabs = document.querySelectorAll(".tab");

    let activeView = "overview";
    let daySlug = null;

    if (hash.startsWith("#/day/")) {
      activeView = "day";
      const m = hash.match(/^#\/day\/([\w-]+)/);
      if (m) daySlug = m[1];
    } else if (hash.startsWith("#/course")) {
      activeView = "course";
    } else if (hash.startsWith("#/labs")) {
      activeView = "labs";
    } else if (hash.startsWith("#/drills")) {
      activeView = "drills";
    } else if (hash.startsWith("#/reference")) {
      activeView = "reference";
    }

    // Toggle views
    views.forEach(v => {
      const isMatch = v.dataset.view === activeView;
      v.hidden = !isMatch;
    });

    // Handle Day page specific sub-routing
    if (activeView === "day") {
      let found = false;
      document.querySelectorAll(".day-page").forEach(sec => {
        const isTarget = sec.dataset.slug === daySlug;
        sec.hidden = !isTarget;
        if (isTarget) {
          found = true;
          if (daySlug === "5") {
            const streamHost = sec.querySelector("#day5-stream-ticker") || sec.querySelector("#stream-ticker-host");
            if (streamHost && typeof window.initStreamTicker === "function") {
              window.initStreamTicker(streamHost);
            }
          } else if (daySlug === "8") {
            const compassHost = sec.querySelector("#day8-vector-compass") || sec.querySelector("#vector-compass-host");
            if (compassHost && typeof window.initVectorCompass === "function") {
              window.initVectorCompass(compassHost);
            }
          }
          if (typeof window.enhanceCodeBlocks === "function") {
            window.enhanceCodeBlocks();
          }
        }
      });
      if (!found) {
        location.hash = "#/course";
        return;
      }
    }

    // Mount Drills if active
    if (activeView === "drills") {
      const drillContainer = document.getElementById("drill-runner-host");
      if (drillContainer && typeof window.initDrillRunner === "function") {
        window.initDrillRunner(drillContainer);
      }
    }

    // Mount Labs if active
    if (activeView === "labs") {
      renderLabsView();
    }

    // Update Tab highlights
    const tabName = activeView === "day" ? "course" : activeView;
    tabs.forEach(t => {
      t.setAttribute("aria-current", t.dataset.tab === tabName ? "true" : "false");
    });

    window.scrollTo(0, 0);
  }

  /* ==========================================================================
     17. Initialization
     ========================================================================== */

  function init() {
    // 1. Theme
    applyTheme(currentTheme());
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", cycleTheme);
    }

    // 2. Render dynamic content
    renderCurriculumIndex();
    renderDayPages();
    renderReferenceView();

    // 3. Setup progress & streak
    initCheckboxes();
    refreshProgress();
    updateStreak();

    // 4. Setup listeners
    initTrackSwitcher();
    initCourseFilters();
    initLogCopyHandlers();
    initTools();
    initKeyboardShortcuts();

    // 5. Router
    window.addEventListener("hashchange", route);
    route();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();

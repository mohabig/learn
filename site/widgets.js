/**
 * site/widgets.js — Interactive Learning Widgets & Visualizers for The 80/20 AI Engineer
 * 
 * Features:
 * 1. 1,536-D Vector Compass Simulator:
 *    - window.initVectorCompass(containerId)
 *    - Interactive SVG unit circle with draggable vectors A and B.
 *    - Real-time calculations: Cosine Angle θ, Cosine Similarity cos(θ),
 *      Cosine Distance (1 - cos θ), Euclidean Distance ||A - B||.
 *    - Continuous semantic color-coding (Green θ=0° -> Amber θ=90° -> Red θ=180°).
 *    - Interactive Feynman explanation of high-dimensional projection and monotonicity.
 * 
 * 2. SSE Ticker-Tape Streamer:
 *    - window.initStreamTicker(containerId)
 *    - Live simulated Server-Sent Events (SSE) HTTP stream.
 *    - Real-time TTFT (Time-to-First-Token in ms) live stopwatch, token pulse animation,
 *      live token counter, cost calculation ($0.00015 / 1k tokens).
 *    - "Disconnect Client" button demonstrating TCP RST & async generator cancellation traps.
 * 
 * 3. In-Browser Active Recall Flashcard Runner:
 *    - window.initDrillRunner(containerId)
 *    - Reads cards from window.DRILLS_DATA (or built-in senior AI engineering dataset).
 *    - 3D flip card with category badges, question prompt, and "Reveal Physical Mechanism".
 *    - Self-assessment rating ("Mastered" vs "Review Again") with localStorage persistence.
 * 
 * 4. Code Block Enhancers:
 *    - window.enhanceCodeBlocks()
 *    - Detects all pre > code elements, adds header with language badge, non-selectable
 *      line numbers gutter, and 1-click 'Copy' button with 'Copied ✓' micro-animation.
 * 
 * Zero external dependencies. Touch-friendly. Flawless on file:// and HTTP servers.
 */

(function () {
  "use strict";

  /* ==========================================================================
     0. CSS INJECTION — DESIGN SYSTEM & RESPONSIVE WIDGET STYLES
     ========================================================================== */
  function injectStyles() {
    if (document.getElementById("aiw-injected-styles")) return;
    const style = document.createElement("style");
    style.id = "aiw-injected-styles";
    style.textContent = `
      /* --- Scoped CSS Variables with Host Fallbacks --- */
      :root {
        --aiw-ground: var(--ground, #edf0ea);
        --aiw-surface: var(--surface, #f8faf6);
        --aiw-raised: var(--raised, #ffffff);
        --aiw-ink: var(--ink, #151915);
        --aiw-ink-2: var(--ink-2, #3b443a);
        --aiw-muted: var(--muted, #69735f);
        --aiw-rule: var(--rule, #d5dacd);
        --aiw-rule-soft: var(--rule-soft, #e4e8de);
        --aiw-accent: var(--accent, #1f45c8);
        --aiw-accent-ink: var(--accent-ink, #1735a0);
        --aiw-accent-wash: var(--accent-wash, #e4e9fa);
        --aiw-signal: var(--signal, #9a5312);
        --aiw-signal-wash: var(--signal-wash, #f6e9da);
        --aiw-good: var(--good, #2c6b3c);
        --aiw-good-wash: var(--good-wash, #deebdf);
        --aiw-danger: #dc2626;
        --aiw-danger-wash: #fee2e2;
        --aiw-shadow: var(--shadow, 0 1px 0 rgba(21,25,21,.04), 0 6px 18px -12px rgba(21,25,21,.30));
        --aiw-font-sans: "Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        --aiw-font-serif: "Newsreader", Georgia, "Times New Roman", serif;
        --aiw-font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
      }

      @media (prefers-color-scheme: dark) {
        :root:not([data-theme="light"]) {
          --aiw-ground: var(--ground, #111412);
          --aiw-surface: var(--surface, #181c19);
          --aiw-raised: var(--raised, #1e2320);
          --aiw-ink: var(--ink, #e7ebe3);
          --aiw-ink-2: var(--ink-2, #c2c9bc);
          --aiw-muted: var(--muted, #8e9789);
          --aiw-rule: var(--rule, #2b322c);
          --aiw-rule-soft: var(--rule-soft, #232926);
          --aiw-accent: var(--accent, #8aa4ff);
          --aiw-accent-ink: var(--accent-ink, #a9bcff);
          --aiw-accent-wash: var(--accent-wash, #1b2340);
          --aiw-signal: var(--signal, #dfa463);
          --aiw-signal-wash: var(--signal-wash, #33261a);
          --aiw-good: var(--good, #7cc48c);
          --aiw-good-wash: var(--good-wash, #1b2c20);
          --aiw-danger: #f87171;
          --aiw-danger-wash: #450a0a;
        }
      }

      /* --- General Widget Wrapper Box --- */
      .aiw-widget-card {
        background: var(--aiw-surface);
        border: 1px solid var(--aiw-rule);
        border-radius: 10px;
        padding: 24px;
        margin: 28px 0;
        box-shadow: var(--aiw-shadow);
        font-family: var(--aiw-font-sans);
        color: var(--aiw-ink);
        box-sizing: border-box;
      }
      .aiw-widget-card * {
        box-sizing: border-box;
      }
      .aiw-header-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 20px;
        padding-bottom: 14px;
        border-bottom: 1px solid var(--aiw-rule-soft);
      }
      .aiw-title-area h3 {
        font-family: var(--aiw-font-serif);
        font-size: 22px;
        font-weight: 600;
        margin: 0 0 4px;
        color: var(--aiw-ink);
      }
      .aiw-title-area p {
        font-size: 13.5px;
        color: var(--aiw-muted);
        margin: 0;
      }
      .aiw-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-family: var(--aiw-font-mono);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .06em;
        text-transform: uppercase;
        padding: 4px 9px;
        border-radius: 5px;
        white-space: nowrap;
      }
      .aiw-badge-blue { background: var(--aiw-accent-wash); color: var(--aiw-accent); }
      .aiw-badge-green { background: var(--aiw-good-wash); color: var(--aiw-good); }
      .aiw-badge-amber { background: var(--aiw-signal-wash); color: var(--aiw-signal); }
      .aiw-badge-red { background: var(--aiw-danger-wash); color: var(--aiw-danger); }

      /* ======================================================================
         1. VECTOR COMPASS SIMULATOR STYLES
         ====================================================================== */
      .aiw-compass-layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
      }
      @media (min-width: 768px) {
        .aiw-compass-layout {
          grid-template-columns: 360px 1fr;
          align-items: start;
        }
      }
      .aiw-svg-container {
        position: relative;
        width: 100%;
        max-width: 360px;
        margin: 0 auto;
        user-select: none;
        -webkit-user-select: none;
        touch-action: none;
      }
      .aiw-compass-svg {
        width: 100%;
        height: auto;
        display: block;
        overflow: visible;
      }
      .aiw-handle {
        cursor: grab;
        transition: transform 0.1s ease;
      }
      .aiw-handle:active, .aiw-handle.is-dragging {
        cursor: grabbing;
      }
      .aiw-handle-circle {
        transition: r 0.15s ease, stroke-width 0.15s ease;
      }
      .aiw-handle:hover .aiw-handle-circle {
        r: 10;
        stroke-width: 3;
      }
      .aiw-compass-stats {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .aiw-metrics-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }
      @media (max-width: 440px) {
        .aiw-metrics-grid {
          grid-template-columns: 1fr;
        }
      }
      .aiw-metric-card {
        background: var(--aiw-raised);
        border: 1px solid var(--aiw-rule-soft);
        border-radius: 8px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .aiw-metric-label {
        font-family: var(--aiw-font-mono);
        font-size: 11px;
        font-weight: 500;
        letter-spacing: .05em;
        text-transform: uppercase;
        color: var(--aiw-muted);
      }
      .aiw-metric-val {
        font-family: var(--aiw-font-mono);
        font-size: 20px;
        font-weight: 700;
        color: var(--aiw-ink);
        font-variant-numeric: tabular-nums;
      }
      .aiw-metric-sub {
        font-size: 12px;
        color: var(--aiw-muted);
      }
      .aiw-bar-track {
        height: 6px;
        background: var(--aiw-rule-soft);
        border-radius: 99px;
        overflow: hidden;
        margin-top: 6px;
        position: relative;
      }
      .aiw-bar-fill {
        height: 100%;
        width: 50%;
        border-radius: 99px;
        transition: width 0.08s linear, background-color 0.1s linear;
      }
      .aiw-presets-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 4px;
      }
      .aiw-btn-preset {
        font-family: var(--aiw-font-mono);
        font-size: 11px;
        background: var(--aiw-raised);
        color: var(--aiw-ink);
        border: 1px solid var(--aiw-rule);
        padding: 6px 10px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .aiw-btn-preset:hover {
        border-color: var(--aiw-accent);
        color: var(--aiw-accent);
        background: var(--aiw-accent-wash);
      }
      .aiw-feynman-box {
        margin-top: 16px;
        background: var(--aiw-raised);
        border-left: 3px solid var(--aiw-accent);
        border-radius: 0 8px 8px 0;
        padding: 14px 18px;
        font-size: 13.5px;
        line-height: 1.55;
        color: var(--aiw-ink-2);
      }
      .aiw-feynman-box b {
        color: var(--aiw-ink);
      }
      .aiw-feynman-box code {
        font-family: var(--aiw-font-mono);
        font-size: 12px;
        background: var(--aiw-rule-soft);
        padding: 2px 5px;
        border-radius: 3px;
      }

      /* ======================================================================
         2. SSE TICKER-TAPE STREAMER STYLES
         ====================================================================== */
      .aiw-stream-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
        margin-bottom: 16px;
      }
      .aiw-btn {
        font-family: var(--aiw-font-mono);
        font-size: 12px;
        font-weight: 500;
        letter-spacing: .04em;
        text-transform: uppercase;
        border: 1px solid var(--aiw-rule);
        background: var(--aiw-raised);
        color: var(--aiw-ink);
        padding: 8px 14px;
        border-radius: 6px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.15s ease;
      }
      .aiw-btn:hover:not(:disabled) {
        border-color: var(--aiw-muted);
        background: var(--aiw-surface);
      }
      .aiw-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .aiw-btn-primary {
        background: var(--aiw-accent);
        color: #ffffff;
        border-color: var(--aiw-accent);
      }
      .aiw-btn-primary:hover:not(:disabled) {
        background: var(--aiw-accent-ink);
        color: #ffffff;
      }
      .aiw-btn-danger {
        background: var(--aiw-danger-wash);
        color: var(--aiw-danger);
        border-color: color-mix(in srgb, var(--aiw-danger) 40%, transparent);
      }
      .aiw-btn-danger:hover:not(:disabled) {
        background: var(--aiw-danger);
        color: #ffffff;
      }
      .aiw-select {
        font-family: var(--aiw-font-mono);
        font-size: 12px;
        padding: 7px 10px;
        background: var(--aiw-raised);
        color: var(--aiw-ink);
        border: 1px solid var(--aiw-rule);
        border-radius: 6px;
        outline: none;
      }
      .aiw-telemetry-strip {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 10px;
        margin-bottom: 16px;
      }
      .aiw-telemetry-box {
        background: var(--aiw-raised);
        border: 1px solid var(--aiw-rule-soft);
        border-radius: 6px;
        padding: 8px 12px;
      }
      .aiw-telemetry-label {
        font-family: var(--aiw-font-mono);
        font-size: 10px;
        letter-spacing: .06em;
        text-transform: uppercase;
        color: var(--aiw-muted);
      }
      .aiw-telemetry-value {
        font-family: var(--aiw-font-mono);
        font-size: 16px;
        font-weight: 700;
        color: var(--aiw-ink);
        margin-top: 2px;
        font-variant-numeric: tabular-nums;
      }
      .aiw-pulse-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 4px;
        background: var(--aiw-muted);
      }
      .aiw-pulse-active {
        background: var(--aiw-good);
        animation: aiw-pulse-anim 1s infinite alternate ease-in-out;
      }
      @keyframes aiw-pulse-anim {
        0% { transform: scale(0.85); opacity: 0.7; }
        100% { transform: scale(1.25); opacity: 1; box-shadow: 0 0 8px var(--aiw-good); }
      }
      .aiw-stream-panes {
        display: grid;
        grid-template-columns: 1fr;
        gap: 14px;
      }
      @media (min-width: 768px) {
        .aiw-stream-panes {
          grid-template-columns: 1.1fr 0.9fr;
        }
      }
      .aiw-pane {
        background: var(--aiw-raised);
        border: 1px solid var(--aiw-rule-soft);
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        height: 240px;
      }
      .aiw-pane-header {
        background: var(--aiw-rule-soft);
        padding: 6px 12px;
        font-family: var(--aiw-font-mono);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .06em;
        text-transform: uppercase;
        color: var(--aiw-muted);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .aiw-pane-body {
        padding: 12px 14px;
        overflow-y: auto;
        font-family: var(--aiw-font-sans);
        font-size: 14px;
        line-height: 1.6;
        color: var(--aiw-ink);
        flex: 1;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .aiw-pane-body-wire {
        font-family: var(--aiw-font-mono);
        font-size: 11.5px;
        line-height: 1.5;
        background: #0d1117;
        color: #e6edf3;
      }
      .aiw-token-chunk {
        display: inline;
        border-radius: 2px;
        transition: background-color 0.4s ease;
      }
      .aiw-token-chunk.is-new {
        background-color: color-mix(in srgb, var(--aiw-accent) 30%, transparent);
      }
      .aiw-cursor-blink {
        display: inline-block;
        width: 7px;
        height: 14px;
        background: var(--aiw-accent);
        margin-left: 2px;
        vertical-align: middle;
        animation: aiw-blink 0.9s infinite;
      }
      @keyframes aiw-blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      .aiw-disconnect-alert {
        margin-top: 14px;
        background: var(--aiw-danger-wash);
        border: 1px solid color-mix(in srgb, var(--aiw-danger) 30%, transparent);
        border-radius: 8px;
        padding: 12px 16px;
        font-size: 13px;
        color: var(--aiw-ink);
        line-height: 1.5;
        display: none;
      }
      .aiw-disconnect-alert.is-visible {
        display: block;
      }

      /* ======================================================================
         3. ACTIVE RECALL DRILL RUNNER STYLES
         ====================================================================== */
      .aiw-drill-meta-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 16px;
      }
      .aiw-progress-container {
        flex: 1 1 200px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .aiw-progress-track {
        flex: 1;
        height: 6px;
        background: var(--aiw-rule-soft);
        border-radius: 99px;
        overflow: hidden;
      }
      .aiw-progress-fill {
        height: 100%;
        background: var(--aiw-good);
        border-radius: 99px;
        transition: width 0.3s ease;
      }
      .aiw-progress-text {
        font-family: var(--aiw-font-mono);
        font-size: 12px;
        color: var(--aiw-muted);
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }
      .aiw-card-scene {
        perspective: 1200px;
        width: 100%;
        min-height: 280px;
        margin-bottom: 16px;
      }
      .aiw-card-3d {
        width: 100%;
        min-height: 280px;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.6s cubic-bezier(0.2, 0.85, 0.32, 1.15);
        cursor: pointer;
      }
      .aiw-card-3d.is-flipped {
        transform: rotateY(180deg);
      }
      .aiw-card-face {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        border-radius: 10px;
        padding: 24px;
        background: var(--aiw-raised);
        border: 1px solid var(--aiw-rule);
        box-shadow: var(--aiw-shadow);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .aiw-card-back {
        transform: rotateY(180deg);
        background: var(--aiw-raised);
        border-color: var(--aiw-accent);
      }
      .aiw-card-category {
        font-family: var(--aiw-font-mono);
        font-size: 11px;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: var(--aiw-muted);
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .aiw-card-question {
        font-family: var(--aiw-font-serif);
        font-size: 20px;
        line-height: 1.45;
        color: var(--aiw-ink);
        margin: 10px 0;
      }
      .aiw-card-feynman-hint {
        font-size: 13px;
        color: var(--aiw-muted);
        font-style: italic;
        margin-top: 8px;
      }
      .aiw-card-answer {
        font-size: 14.5px;
        line-height: 1.6;
        color: var(--aiw-ink-2);
        margin: 10px 0;
        max-height: 180px;
        overflow-y: auto;
      }
      .aiw-card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px solid var(--aiw-rule-soft);
      }
      .aiw-drill-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      .aiw-shortcut-pill {
        font-family: var(--aiw-font-mono);
        font-size: 10px;
        padding: 1px 5px;
        border-radius: 3px;
        background: var(--aiw-rule-soft);
        color: var(--aiw-muted);
        margin-left: 4px;
      }

      /* ======================================================================
         4. CODE BLOCK ENHANCER STYLES
         ====================================================================== */
      .aiw-enhanced-pre {
        position: relative;
        margin: 20px 0;
        border-radius: 8px;
        background: #141816;
        border: 1px solid var(--aiw-rule);
        overflow: hidden;
      }
      .aiw-code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 14px;
        background: #1d221f;
        border-bottom: 1px solid #28302b;
      }
      .aiw-code-lang {
        font-family: var(--aiw-font-mono);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: #8e9789;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .aiw-code-lang-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--aiw-accent);
      }
      .aiw-copy-btn {
        font-family: var(--aiw-font-mono);
        font-size: 11px;
        letter-spacing: .04em;
        color: #c2c9bc;
        background: transparent;
        border: 1px solid #363e38;
        padding: 3px 8px;
        border-radius: 4px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: all 0.15s ease;
      }
      .aiw-copy-btn:hover {
        background: #28302b;
        color: #ffffff;
        border-color: #4a544c;
      }
      .aiw-copy-btn.is-copied {
        background: #1b2c20;
        color: #7cc48c;
        border-color: #2c6b3c;
        transform: scale(1.04);
      }
      .aiw-code-container {
        display: flex;
        overflow-x: auto;
        padding: 12px 0;
      }
      .aiw-code-gutter {
        padding: 0 14px;
        border-right: 1px solid #28302b;
        user-select: none;
        -webkit-user-select: none;
        text-align: right;
        font-family: var(--aiw-font-mono);
        font-size: 12.5px;
        line-height: 1.55;
        color: #4f584e;
      }
      .aiw-code-content {
        padding: 0 16px;
        margin: 0;
        background: transparent !important;
        color: #e7ebe3 !important;
        font-family: var(--aiw-font-mono);
        font-size: 12.5px;
        line-height: 1.55;
        flex: 1;
        overflow: visible;
        white-space: pre;
      }
    `;
    document.head.appendChild(style);
  }

  // Ensure styles are available when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectStyles);
  } else {
    injectStyles();
  }


  /* ==========================================================================
     1. 1,536-D VECTOR COMPASS SIMULATOR
     ========================================================================== */
  /**
   * Helper: maps an angle in degrees [0, 180] to a continuous smooth semantic color.
   * Aligned (0°) -> Green; Orthogonal (90°) -> Amber; Inverted (180°) -> Crimson.
   */
  function getAngleColor(thetaDeg) {
    const deg = Math.max(0, Math.min(180, thetaDeg));
    if (deg <= 90) {
      const ratio = deg / 90; // 0 (green) -> 1 (amber)
      const hue = Math.round(145 - ratio * 105); // 145 (green) -> 40 (amber)
      return `hsl(${hue}, 82%, 42%)`;
    } else {
      const ratio = (deg - 90) / 90; // 0 (amber) -> 1 (red)
      const hue = Math.round(40 - ratio * 40); // 40 (amber) -> 0 (crimson)
      return `hsl(${hue}, 88%, 46%)`;
    }
  }

  window.initVectorCompass = function (containerId) {
    injectStyles();
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) {
      console.warn("initVectorCompass: target container not found:", containerId);
      return;
    }
    if (container.dataset.aiwInitialized === "true") return;
    container.dataset.aiwInitialized = "true";

    // Geometry parameters (SVG 360x360 coordinates)
    const CX = 180;
    const CY = 180;
    const RADIUS = 130;

    // State: angles in radians (0 = along positive X axis)
    let angleA = 0.40; // ~23 deg
    let angleB = 1.25; // ~71.6 deg
    let isDragging = null; // 'A' | 'B' | null

    container.innerHTML = `
      <div class="aiw-widget-card" role="region" aria-label="1,536-D Vector Compass Simulator">
        <div class="aiw-header-row">
          <div class="aiw-title-area">
            <h3>1,536-D Vector Compass Simulator</h3>
            <p>Drag vector handles A and B on the unit circle. Direction carries semantic topic; length is normalized to 1.0.</p>
          </div>
          <span class="aiw-badge aiw-badge-blue" id="aiw-compass-pill">SEMANTIC ALIGNMENT</span>
        </div>

        <div class="aiw-compass-layout">
          <div class="aiw-svg-container" id="aiw-svg-box">
            <svg class="aiw-compass-svg" viewBox="0 0 360 360" role="img" aria-label="Interactive unit circle with vectors A and B">
              <defs>
                <!-- Vector A Arrow Marker -->
                <marker id="aiw-arrow-a" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
                </marker>
                <!-- Vector B Arrow Marker -->
                <marker id="aiw-arrow-b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
                </marker>
              </defs>

              <!-- Outer Guide Ring and Axes -->
              <circle cx="${CX}" cy="${CY}" r="${RADIUS}" fill="none" stroke="var(--aiw-rule)" stroke-width="1.5" stroke-dasharray="3 3"/>
              <line x1="25" y1="${CY}" x2="335" y2="${CY}" stroke="var(--aiw-rule-soft)" stroke-width="1.5"/>
              <line x1="${CX}" y1="25" x2="${CX}" y2="335" stroke="var(--aiw-rule-soft)" stroke-width="1.5"/>
              <circle cx="${CX}" cy="${CY}" r="3.5" fill="var(--aiw-ink)"/>

              <!-- Axis Labels -->
              <text x="345" y="${CY + 4}" font-family="var(--aiw-font-mono)" font-size="10" fill="var(--aiw-muted)" text-anchor="start">+1</text>
              <text x="15" y="${CY + 4}" font-family="var(--aiw-font-mono)" font-size="10" fill="var(--aiw-muted)" text-anchor="end">-1</text>
              <text x="${CX}" y="18" font-family="var(--aiw-font-mono)" font-size="10" fill="var(--aiw-muted)" text-anchor="middle">+1</text>
              <text x="${CX}" y="352" font-family="var(--aiw-font-mono)" font-size="10" fill="var(--aiw-muted)" text-anchor="middle">-1</text>

              <!-- Dynamic Angle Sector Arc -->
              <path id="aiw-angle-arc" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>

              <!-- Euclidean Chord Line (A to B) -->
              <line id="aiw-chord-line" stroke="#8b5cf6" stroke-width="2" stroke-dasharray="4 4"/>

              <!-- Vector A Line -->
              <line id="aiw-vec-a-line" x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY}" stroke="#2563eb" stroke-width="3.5" marker-end="url(#aiw-arrow-a)"/>
              <!-- Vector B Line -->
              <line id="aiw-vec-b-line" x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY}" stroke="#d97706" stroke-width="3.5" marker-end="url(#aiw-arrow-b)"/>

              <!-- Draggable Handle A -->
              <g id="aiw-handle-a" class="aiw-handle" tabindex="0" role="slider" aria-label="Vector A angle">
                <circle cx="0" cy="0" r="26" fill="transparent"/>
                <circle class="aiw-handle-circle" cx="0" cy="0" r="8.5" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>
                <text dx="0" dy="-14" text-anchor="middle" font-family="var(--aiw-font-mono)" font-size="12" font-weight="700" fill="#2563eb">A</text>
              </g>

              <!-- Draggable Handle B -->
              <g id="aiw-handle-b" class="aiw-handle" tabindex="0" role="slider" aria-label="Vector B angle">
                <circle cx="0" cy="0" r="26" fill="transparent"/>
                <circle class="aiw-handle-circle" cx="0" cy="0" r="8.5" fill="#d97706" stroke="#ffffff" stroke-width="2"/>
                <text dx="0" dy="-14" text-anchor="middle" font-family="var(--aiw-font-mono)" font-size="12" font-weight="700" fill="#d97706">B</text>
              </g>
            </svg>
          </div>

          <div class="aiw-compass-stats">
            <div class="aiw-metrics-grid">
              <!-- Metric 1: Cosine Angle -->
              <div class="aiw-metric-card">
                <span class="aiw-metric-label">Cosine Angle (θ)</span>
                <span class="aiw-metric-val" id="aiw-val-theta">45.0°</span>
                <span class="aiw-metric-sub" id="aiw-sub-theta">Separation on unit sphere</span>
                <div class="aiw-bar-track">
                  <div class="aiw-bar-fill" id="aiw-fill-theta"></div>
                </div>
              </div>

              <!-- Metric 2: Cosine Similarity -->
              <div class="aiw-metric-card">
                <span class="aiw-metric-label">Cosine Similarity (cos θ)</span>
                <span class="aiw-metric-val" id="aiw-val-sim">+0.7071</span>
                <span class="aiw-metric-sub">Range: -1.0 (Opposite) to +1.0 (Collinear)</span>
                <div class="aiw-bar-track">
                  <div class="aiw-bar-fill" id="aiw-fill-sim"></div>
                </div>
              </div>

              <!-- Metric 3: Cosine Distance -->
              <div class="aiw-metric-card">
                <span class="aiw-metric-label">Cosine Distance (1 - cos θ)</span>
                <span class="aiw-metric-val" id="aiw-val-dist">0.2929</span>
                <span class="aiw-metric-sub">Range: 0.0 (Identical) to 2.0 (Opposite)</span>
                <div class="aiw-bar-track">
                  <div class="aiw-bar-fill" id="aiw-fill-dist"></div>
                </div>
              </div>

              <!-- Metric 4: Euclidean Distance -->
              <div class="aiw-metric-card">
                <span class="aiw-metric-label">Euclidean Distance ||A - B||</span>
                <span class="aiw-metric-val" id="aiw-val-euc">0.7654</span>
                <span class="aiw-metric-sub">= √(2 · Cosine Distance)</span>
                <div class="aiw-bar-track">
                  <div class="aiw-bar-fill" id="aiw-fill-euc"></div>
                </div>
              </div>
            <!-- Vector Coordinates & Dot Product Inspector -->
            <div class="aiw-metric-card" style="margin-top: 10px; font-family: var(--aiw-font-mono); font-size: 11.5px; line-height: 1.6;">
              <div style="display:flex; justify-content:space-between; flex-wrap:wrap;">
                <span><b style="color:#2563eb;">Vector A:</b> [<span id="aiw-comp-ax">+0.000</span>, <span id="aiw-comp-ay">+0.000</span>]</span>
                <span style="color:var(--aiw-muted);">||A|| = 1.00</span>
              </div>
              <div style="display:flex; justify-content:space-between; flex-wrap:wrap;">
                <span><b style="color:#d97706;">Vector B:</b> [<span id="aiw-comp-bx">+0.000</span>, <span id="aiw-comp-by">+0.000</span>]</span>
                <span style="color:var(--aiw-muted);">||B|| = 1.00</span>
              </div>
              <div style="color:var(--aiw-muted); border-top:1px solid var(--aiw-rule-soft); margin-top:4px; padding-top:4px;">
                <b>Dot Product A · B:</b> <span id="aiw-comp-dot">0.000</span>
              </div>
            </div>

            <!-- Preset Buttons -->
            <div>
              <span class="aiw-metric-label" style="display:block; margin-bottom: 6px;">Presets:</span>
              <div class="aiw-presets-bar">
                <button type="button" class="aiw-btn-preset" data-a="0" data-b="0">Identical (θ=0°)</button>
                <button type="button" class="aiw-btn-preset" data-a="15" data-b="55">Relevant (θ=40°)</button>
                <button type="button" class="aiw-btn-preset" data-a="0" data-b="90">Orthogonal (θ=90°)</button>
                <button type="button" class="aiw-btn-preset" data-a="10" data-b="190">Opposite (θ=180°)</button>
              </div>
            </div>

            <!-- Feynman Physical Explanation Callout -->
            <div class="aiw-feynman-box">
              <b>Feynman Physical Intuition:</b> Any two non-zero vectors in 1,536-dimensional space span a completely flat 2D plane through the origin. When vectors are unit-normalized (<code>||A|| = 1</code>), 
              <code>||A - B||² = 2 - 2(A · B) = 2 · (1 - cos θ)</code>.<br>
              Sorting by <b>Cosine Distance ascending</b> (<code>1 - cos θ</code>) is mathematically identical to sorting by <b>Cosine Similarity descending</b> (<code>cos θ</code>) or <b>Euclidean Distance ascending</b>.
            </div>
          </div>
        </div>
      </div>
    `;

    // Elements
    const svgBox = container.querySelector("#aiw-svg-box");
    const svg = container.querySelector("svg");
    const handleA = container.querySelector("#aiw-handle-a");
    const handleB = container.querySelector("#aiw-handle-b");
    const vecALine = container.querySelector("#aiw-vec-a-line");
    const vecBLine = container.querySelector("#aiw-vec-b-line");
    const chordLine = container.querySelector("#aiw-chord-line");
    const angleArc = container.querySelector("#aiw-angle-arc");

    const valTheta = container.querySelector("#aiw-val-theta");
    const valSim = container.querySelector("#aiw-val-sim");
    const valDist = container.querySelector("#aiw-val-dist");
    const valEuc = container.querySelector("#aiw-val-euc");
    const pill = container.querySelector("#aiw-compass-pill");

    const fillTheta = container.querySelector("#aiw-fill-theta");
    const fillSim = container.querySelector("#aiw-fill-sim");
    const fillDist = container.querySelector("#aiw-fill-dist");
    const fillEuc = container.querySelector("#aiw-fill-euc");

    const compAx = container.querySelector("#aiw-comp-ax");
    const compAy = container.querySelector("#aiw-comp-ay");
    const compBx = container.querySelector("#aiw-comp-bx");
    const compBy = container.querySelector("#aiw-comp-by");
    const compDot = container.querySelector("#aiw-comp-dot");

    function render() {
      // Cartesian tip coordinates in SVG space
      const ax = CX + RADIUS * Math.cos(angleA);
      const ay = CY - RADIUS * Math.sin(angleA); // Invert SVG y
      const bx = CX + RADIUS * Math.cos(angleB);
      const dy = CY - RADIUS * Math.sin(angleB);

      // Position vector lines
      vecALine.setAttribute("x2", ax);
      vecALine.setAttribute("y2", ay);
      vecBLine.setAttribute("x2", bx);
      vecBLine.setAttribute("y2", dy);

      // Position chord line
      chordLine.setAttribute("x1", ax);
      chordLine.setAttribute("y1", ay);
      chordLine.setAttribute("x2", bx);
      chordLine.setAttribute("y2", dy);

      // Position handle transforms
      handleA.setAttribute("transform", `translate(${ax}, ${ay})`);
      handleB.setAttribute("transform", `translate(${bx}, ${dy})`);

      // Calculate unit components and dot product
      const uxA = Math.cos(angleA);
      const uyA = Math.sin(angleA);
      const uxB = Math.cos(angleB);
      const uyB = Math.sin(angleB);

      // Dot product = cos(theta)
      let cosSim = uxA * uxB + uyA * uyB;
      cosSim = Math.max(-1.0, Math.min(1.0, cosSim)); // clamp floating point drift

      // Cosine angle in [0, pi]
      const thetaRad = Math.acos(cosSim);
      const thetaDeg = (thetaRad * 180) / Math.PI;

      // Cosine Distance & Euclidean Distance
      const cosDist = 1.0 - cosSim;
      const eucDist = Math.sqrt(Math.max(0, 2.0 * cosDist));

      // Color coding based on theta
      const liveColor = getAngleColor(thetaDeg);

      // Draw dynamic angle arc
      const arcR = 48; // smaller radius for inner arc
      // Normalize angles into [0, 2pi)
      const normA = (angleA % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const normB = (angleB % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      let diff = (normB - normA + 2 * Math.PI) % (2 * Math.PI);

      let startAng = normA;
      let endAng = normB;
      let sweepFlag = 0; // SVG sweep: 0 is counterclockwise in math coords

      if (diff <= Math.PI) {
        sweepFlag = 0; // Shortest arc goes CCW from A to B
      } else {
        sweepFlag = 1; // Shortest arc goes CW from A to B
      }

      const arcAx = CX + arcR * Math.cos(startAng);
      const arcAy = CY - arcR * Math.sin(startAng);
      const arcBx = CX + arcR * Math.cos(endAng);
      const arcBy = CY - arcR * Math.sin(endAng);

      const largeArcFlag = 0;
      angleArc.setAttribute("d", `M ${arcAx} ${arcAy} A ${arcR} ${arcR} 0 ${largeArcFlag} ${sweepFlag} ${arcBx} ${arcBy}`);
      angleArc.setAttribute("stroke", liveColor);

      // Update Text Displays
      valTheta.textContent = `${thetaDeg.toFixed(1)}°`;
      valTheta.style.color = liveColor;

      const simSign = cosSim >= 0 ? "+" : "";
      valSim.textContent = `${simSign}${cosSim.toFixed(4)}`;
      valSim.style.color = liveColor;

      valDist.textContent = cosDist.toFixed(4);
      valEuc.textContent = eucDist.toFixed(4);

      // Dynamic Badging
      if (thetaDeg < 30) {
        pill.textContent = "ALIGNED (HIGH SIMILARITY)";
        pill.className = "aiw-badge aiw-badge-green";
      } else if (thetaDeg < 80) {
        pill.textContent = "CORRELATED / TOPICAL";
        pill.className = "aiw-badge aiw-badge-blue";
      } else if (thetaDeg < 110) {
        pill.textContent = "ORTHOGONAL / UNRELATED";
        pill.className = "aiw-badge aiw-badge-amber";
      } else {
        pill.textContent = "INVERTED / ANTITHETICAL";
        pill.className = "aiw-badge aiw-badge-red";
      }

      // Bar Fills
      fillTheta.style.width = `${(thetaDeg / 180) * 100}%`;
      fillTheta.style.backgroundColor = liveColor;

      const simPct = ((cosSim + 1) / 2) * 100; // [-1, 1] -> [0, 100%]
      fillSim.style.width = `${simPct}%`;
      fillSim.style.backgroundColor = liveColor;

      const distPct = (cosDist / 2.0) * 100; // [0, 2] -> [0, 100%]
      fillDist.style.width = `${distPct}%`;
      fillDist.style.backgroundColor = liveColor;

      const eucPct = (eucDist / 2.0) * 100; // [0, 2] -> [0, 100%]
      fillEuc.style.width = `${eucPct}%`;
      fillEuc.style.backgroundColor = "#8b5cf6";

      // Coordinate live inspector updates
      if (compAx) {
        compAx.textContent = `${uxA >= 0 ? "+" : ""}${uxA.toFixed(3)}`;
        compAy.textContent = `${uyA >= 0 ? "+" : ""}${uyA.toFixed(3)}`;
        compBx.textContent = `${uxB >= 0 ? "+" : ""}${uxB.toFixed(3)}`;
        compBy.textContent = `${uyB >= 0 ? "+" : ""}${uyB.toFixed(3)}`;
        const prodX = (uxA * uxB).toFixed(3);
        const prodY = (uyA * uyB).toFixed(3);
        const simSign = cosSim >= 0 ? "+" : "";
        compDot.textContent = `(${uxA.toFixed(2)} × ${uxB.toFixed(2)}) + (${uyA.toFixed(2)} × ${uyB.toFixed(2)}) = ${prodX} + ${prodY} = ${simSign}${cosSim.toFixed(4)}`;
      }
    }

    // Coordinate conversion from pointer event to math angle
    function getAngleFromEvent(e) {
      const rect = svg.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      const svgX = ((clientX - rect.left) / rect.width) * 360;
      const svgY = ((clientY - rect.top) / rect.height) * 360;

      const dx = svgX - CX;
      const dy = -(svgY - CY); // Math Y is positive upwards
      return Math.atan2(dy, dx);
    }

    function onPointerDown(e) {
      const target = e.target.closest(".aiw-handle");
      if (target === handleA) {
        isDragging = "A";
        handleA.classList.add("is-dragging");
        e.preventDefault();
      } else if (target === handleB) {
        isDragging = "B";
        handleB.classList.add("is-dragging");
        e.preventDefault();
      } else {
        // Clicking on SVG circle: drag closest vector
        const clickAngle = getAngleFromEvent(e);
        const distA = Math.abs((clickAngle - angleA + 3 * Math.PI) % (2 * Math.PI) - Math.PI);
        const distB = Math.abs((clickAngle - angleB + 3 * Math.PI) % (2 * Math.PI) - Math.PI);
        isDragging = distA <= distB ? "A" : "B";
        if (isDragging === "A") {
          angleA = clickAngle;
          handleA.classList.add("is-dragging");
        } else {
          angleB = clickAngle;
          handleB.classList.add("is-dragging");
        }
        render();
        e.preventDefault();
      }

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const newAngle = getAngleFromEvent(e);
      if (isDragging === "A") {
        angleA = newAngle;
      } else if (isDragging === "B") {
        angleB = newAngle;
      }
      render();
    }

    function onPointerUp() {
      isDragging = null;
      handleA.classList.remove("is-dragging");
      handleB.classList.remove("is-dragging");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    }

    svgBox.addEventListener("pointerdown", onPointerDown);

    // Keyboard accessibility for handles
    handleA.addEventListener("keydown", (e) => {
      const step = (e.shiftKey ? 10 : 2) * (Math.PI / 180);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { angleA += step; render(); e.preventDefault(); }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { angleA -= step; render(); e.preventDefault(); }
    });
    handleB.addEventListener("keydown", (e) => {
      const step = (e.shiftKey ? 10 : 2) * (Math.PI / 180);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { angleB += step; render(); e.preventDefault(); }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { angleB -= step; render(); e.preventDefault(); }
    });

    // Preset Buttons
    container.querySelectorAll(".aiw-btn-preset").forEach((btn) => {
      btn.addEventListener("click", () => {
        const degA = parseFloat(btn.dataset.a);
        const degB = parseFloat(btn.dataset.b);
        angleA = (degA * Math.PI) / 180;
        angleB = (degB * Math.PI) / 180;
        render();
      });
    });

    // Initial paint
    render();
  };


  /* ==========================================================================
     2. SSE TICKER-TAPE STREAMER
     ========================================================================== */
  const STREAM_SAMPLE_PROMPTS = [
    {
      title: "KV Cache Scaling & PagedAttention",
      text: "In autoregressive LLM decoding, producing token N requires self-attention across all N-1 preceding tokens. Storing Key and Value vectors in the KV cache avoids O(N²) recomputation, but dynamic tensor allocation creates 60-80% GPU VRAM waste from memory fragmentation. PagedAttention mirrors OS virtual memory: it partitions the KV cache into fixed-size physical pages mapped via a table, enabling zero fragmentation and copy-on-write branching for speculative decoding."
    },
    {
      title: "Exponential Backoff & Full Jitter",
      text: "Deterministic backoff triggers synchronized retry shockwaves that repeatedly knock down recovering API gateways. Full jitter draws backoff delays uniformly from U(0, min(cap, base * 2^attempt)). This de-correlates worker phases into a smooth Poisson arrival stream, allowing token bucket rate limiters to refill smoothly under load."
    },
    {
      title: "pgvector <=> Cosine Distance Mechanics",
      text: "pgvector defines <=> as Cosine Distance: 1.0 - (A · B) / (||A|| * ||B||). HNSW index search requires a distance metric where 0.0 denotes identity. If embeddings are pre-normalized to ||A||=1 at ingestion, pgvector eliminates the square root and division instructions, reducing index distance loops to a pure SIMD dot product."
    }
  ];

  window.initStreamTicker = function (containerId) {
    injectStyles();
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) {
      console.warn("initStreamTicker: target container not found:", containerId);
      return;
    }
    if (container.dataset.aiwInitialized === "true") return;
    container.dataset.aiwInitialized = "true";

    container.innerHTML = `
      <div class="aiw-widget-card" role="region" aria-label="Server-Sent Events Stream Visualizer">
        <div class="aiw-header-row">
          <div class="aiw-title-area">
            <h3>Server-Sent Events (SSE) Stream Visualizer</h3>
            <p>Simulates real-time HTTP streaming, Time-to-First-Token (TTFT), token emission pulse, and TCP client disconnect cancellation.</p>
          </div>
          <span class="aiw-badge aiw-badge-blue" id="aiw-stream-status-badge">
            <span class="aiw-pulse-dot" id="aiw-stream-dot"></span>
            <span id="aiw-stream-status-text">SOCKET IDLE</span>
          </span>
        </div>

        <!-- Telemetry Strip -->
        <div class="aiw-telemetry-strip">
          <div class="aiw-telemetry-box">
            <div class="aiw-telemetry-label">TTFT (Stopwatch)</div>
            <div class="aiw-telemetry-value" id="aiw-tele-ttft">—</div>
          </div>
          <div class="aiw-telemetry-box">
            <div class="aiw-telemetry-label">Tokens Emitted</div>
            <div class="aiw-telemetry-value" id="aiw-tele-tokens">0</div>
          </div>
          <div class="aiw-telemetry-box">
            <div class="aiw-telemetry-label">Live Speed</div>
            <div class="aiw-telemetry-value" id="aiw-tele-speed">— tok/s</div>
          </div>
          <div class="aiw-telemetry-box">
            <div class="aiw-telemetry-label">Accumulated Cost</div>
            <div class="aiw-telemetry-value" id="aiw-tele-cost">$0.000000</div>
          </div>
        </div>

        <!-- Stream Controls -->
        <div class="aiw-stream-controls">
          <select class="aiw-select" id="aiw-prompt-select">
            ${STREAM_SAMPLE_PROMPTS.map((p, idx) => `<option value="${idx}">${p.title}</option>`).join("")}
          </select>
          <select class="aiw-select" id="aiw-speed-select">
            <option value="35">Normal (35ms / tok)</option>
            <option value="15">Fast (15ms / tok)</option>
            <option value="70">Jittery Network (70ms / tok)</option>
          </select>
          <button type="button" class="aiw-btn aiw-btn-primary" id="aiw-btn-simulate">▶ Simulate Stream</button>
          <button type="button" class="aiw-btn aiw-btn-danger" id="aiw-btn-disconnect" disabled>⏹ Disconnect Client (Abort)</button>
          <button type="button" class="aiw-btn" id="aiw-btn-reset">↺ Reset</button>
        </div>

        <!-- Dual Panes: Rendered Stream vs Raw HTTP Wire Tape -->
        <div class="aiw-stream-panes">
          <div class="aiw-pane">
            <div class="aiw-pane-header">
              <span>Client Rendered Output</span>
              <span id="aiw-pane-tokens-badge">0 tokens</span>
            </div>
            <div class="aiw-pane-body" id="aiw-render-body">
              <span style="color:var(--aiw-muted); font-style:italic;">Click "Simulate Stream" to establish an HTTP text/event-stream connection...</span>
            </div>
          </div>

          <div class="aiw-pane">
            <div class="aiw-pane-header">
              <span>Raw HTTP Wire (text/event-stream)</span>
              <span>Chunk Stream</span>
            </div>
            <div class="aiw-pane-body aiw-pane-body-wire" id="aiw-wire-body"># Socket ready. Waiting for HTTP request...</div>
          </div>
        </div>

        <!-- Disconnect Alert Panel -->
        <div class="aiw-disconnect-alert" id="aiw-disconnect-alert">
          <b>⚠️ Client Disconnected Mid-Stream (TCP RST):</b> The browser dispatched <code>AbortController.abort()</code>, immediately closing the TCP socket. On the server side, FastAPI / ASGI raises <code>asyncio.CancelledError</code> on the next yield. If your backend generator does not clean up inside a <code>finally:</code> block, the upstream LLM API keeps running into the void — leaking money and compute!
        </div>
      </div>
    `;

    // Elements
    const statusBadge = container.querySelector("#aiw-stream-status-badge");
    const statusDot = container.querySelector("#aiw-stream-dot");
    const statusText = container.querySelector("#aiw-stream-status-text");
    const teleTtft = container.querySelector("#aiw-tele-ttft");
    const teleTokens = container.querySelector("#aiw-tele-tokens");
    const teleSpeed = container.querySelector("#aiw-tele-speed");
    const teleCost = container.querySelector("#aiw-tele-cost");

    const promptSelect = container.querySelector("#aiw-prompt-select");
    const speedSelect = container.querySelector("#aiw-speed-select");
    const btnSimulate = container.querySelector("#aiw-btn-simulate");
    const btnDisconnect = container.querySelector("#aiw-btn-disconnect");
    const btnReset = container.querySelector("#aiw-btn-reset");

    const renderBody = container.querySelector("#aiw-render-body");
    const wireBody = container.querySelector("#aiw-wire-body");
    const tokensBadge = container.querySelector("#aiw-pane-tokens-badge");
    const disconnectAlert = container.querySelector("#aiw-disconnect-alert");

    // Internal simulation state
    let isStreaming = false;
    let abortSimulation = false;
    let stopwatchTimer = null;
    let streamStartTime = 0;
    let firstTokenTime = 0;
    let emittedTokens = 0;

    const COST_PER_1K = 0.00015;

    function resetUI() {
      isStreaming = false;
      abortSimulation = false;
      if (stopwatchTimer) cancelAnimationFrame(stopwatchTimer);

      btnSimulate.disabled = false;
      btnDisconnect.disabled = true;
      btnReset.disabled = false;

      statusDot.className = "aiw-pulse-dot";
      statusBadge.className = "aiw-badge aiw-badge-blue";
      statusText.textContent = "SOCKET IDLE";

      teleTtft.textContent = "—";
      teleTokens.textContent = "0";
      teleSpeed.textContent = "— tok/s";
      teleCost.textContent = "$0.000000";
      tokensBadge.textContent = "0 tokens";

      renderBody.innerHTML = '<span style="color:var(--aiw-muted); font-style:italic;">Click "Simulate Stream" to establish an HTTP text/event-stream connection...</span>';
      wireBody.textContent = "# Socket ready. Waiting for HTTP request...";
      disconnectAlert.classList.remove("is-visible");
    }

    async function startSimulation() {
      resetUI();
      isStreaming = true;
      btnSimulate.disabled = true;
      btnDisconnect.disabled = false;
      btnReset.disabled = true;

      const selectedPrompt = STREAM_SAMPLE_PROMPTS[parseInt(promptSelect.value, 10)] || STREAM_SAMPLE_PROMPTS[0];
      const baseDelay = parseInt(speedSelect.value, 10) || 35;

      // Tokenize by word chunks
      const rawWords = selectedPrompt.text.split(/(\s+|[.,;!?—])/).filter(Boolean);
      const tokens = [];
      for (let i = 0; i < rawWords.length; i++) {
        if (/^\s+$/.test(rawWords[i]) && tokens.length > 0) {
          tokens[tokens.length - 1] += rawWords[i];
        } else {
          tokens.push(rawWords[i]);
        }
      }

      // Step 1: TCP Handshake & HTTP POST sent
      statusBadge.className = "aiw-badge aiw-badge-amber";
      statusText.textContent = "TCP SYN / POST";
      wireBody.textContent = `> POST /v1/chat/completions HTTP/1.1\n> Host: api.openai.com\n> Accept: text/event-stream\n> Cache-Control: no-cache\n\n`;

      renderBody.innerHTML = '<div style="color:var(--aiw-muted);">Connecting socket...</div>';

      streamStartTime = performance.now();

      // Step 2: TTFT Live Stopwatch ticker
      const simulatedPrefillMs = 280 + Math.random() * 140; // 280-420ms prefill
      statusText.textContent = "WAITING TTFT (PREFILL)";
      statusDot.className = "aiw-pulse-dot aiw-pulse-active";

      const runStopwatch = () => {
        if (!isStreaming || abortSimulation) return;
        const elapsed = Math.round(performance.now() - streamStartTime);
        teleTtft.textContent = `${elapsed} ms`;
        stopwatchTimer = requestAnimationFrame(runStopwatch);
      };
      stopwatchTimer = requestAnimationFrame(runStopwatch);

      // Wait for TTFT
      await new Promise((resolve) => setTimeout(resolve, simulatedPrefillMs));
      if (abortSimulation) return;

      // TTFT Arrives!
      cancelAnimationFrame(stopwatchTimer);
      firstTokenTime = performance.now();
      const lockedTtft = Math.round(firstTokenTime - streamStartTime);
      teleTtft.textContent = `${lockedTtft} ms`;
      teleTtft.style.color = "var(--aiw-good)";

      // HTTP 200 text/event-stream header arrives
      statusBadge.className = "aiw-badge aiw-badge-green";
      statusText.textContent = "STREAMING (HTTP 200)";
      wireBody.textContent += `< HTTP/1.1 200 OK\n< Content-Type: text/event-stream\n< X-Accel-Buffering: no\n< Transfer-Encoding: chunked\n\n`;

      renderBody.innerHTML = '<div id="aiw-rendered-tokens"></div><span class="aiw-cursor-blink"></span>';
      const tokensContainer = renderBody.querySelector("#aiw-rendered-tokens");

      emittedTokens = 0;
      const genStartTime = performance.now();

      // Step 3: Stream tokens
      for (let i = 0; i < tokens.length; i++) {
        if (abortSimulation) {
          handleAbort();
          return;
        }

        const tok = tokens[i];
        emittedTokens++;

        // Update token counter & cost
        teleTokens.textContent = emittedTokens;
        tokensBadge.textContent = `${emittedTokens} tokens`;
        const cost = (emittedTokens * COST_PER_1K) / 1000;
        teleCost.textContent = `$${cost.toFixed(6)}`;

        // Update live tok/s speed
        const genElapsedSec = Math.max(0.05, (performance.now() - genStartTime) / 1000);
        const liveSpeed = (emittedTokens / genElapsedSec).toFixed(1);
        teleSpeed.textContent = `${liveSpeed} tok/s`;

        // Render token chunk with pulse
        const span = document.createElement("span");
        span.className = "aiw-token-chunk is-new";
        span.textContent = tok;
        tokensContainer.appendChild(span);
        renderBody.scrollTop = renderBody.scrollHeight;
        setTimeout(() => span.classList.remove("is-new"), 200);

        // Append raw wire frame
        const jsonPayload = JSON.stringify({ choices: [{ delta: { content: tok } }] });
        wireBody.textContent += `data: ${jsonPayload}\n\n`;
        wireBody.scrollTop = wireBody.scrollHeight;

        // Sleep with subtle jitter
        const jitter = (Math.random() - 0.5) * (baseDelay * 0.4);
        await new Promise((res) => setTimeout(res, Math.max(5, baseDelay + jitter)));
      }

      // Final completion
      if (!abortSimulation) {
        wireBody.textContent += `data: [DONE]\n\n# Stream finished successfully. TCP socket closed cleanly.\n`;
        wireBody.scrollTop = wireBody.scrollHeight;

        statusBadge.className = "aiw-badge aiw-badge-blue";
        statusText.textContent = "STREAM COMPLETED";
        statusDot.className = "aiw-pulse-dot";
        const cursor = renderBody.querySelector(".aiw-cursor-blink");
        if (cursor) cursor.remove();

        btnSimulate.disabled = false;
        btnDisconnect.disabled = true;
        btnReset.disabled = false;
        isStreaming = false;
      }
    }

    function handleAbort() {
      if (stopwatchTimer) cancelAnimationFrame(stopwatchTimer);
      isStreaming = false;

      statusBadge.className = "aiw-badge aiw-badge-red";
      statusText.textContent = "CLIENT ABORT (TCP RST)";
      statusDot.className = "aiw-pulse-dot";

      wireBody.textContent += `\n[CLIENT_DISCONNECT] AbortController.abort() fired by client\n[TCP_RST] Connection terminated immediately by client peer.\n`;
      wireBody.scrollTop = wireBody.scrollHeight;

      const cursor = renderBody.querySelector(".aiw-cursor-blink");
      if (cursor) cursor.remove();

      disconnectAlert.classList.add("is-visible");

      btnSimulate.disabled = false;
      btnDisconnect.disabled = true;
      btnReset.disabled = false;
    }

    btnSimulate.addEventListener("click", startSimulation);
    btnDisconnect.addEventListener("click", () => {
      if (isStreaming) {
        abortSimulation = true;
        handleAbort();
      }
    });
    btnReset.addEventListener("click", resetUI);

    resetUI();
  };


  /* ==========================================================================
     3. IN-BROWSER ACTIVE RECALL DRILL RUNNER
     ========================================================================== */
  const BUILTIN_DRILLS = [
    {
      id: "drill_01",
      topic: "Python Async & I/O",
      question: "Why does async/await speed up network API calls but NOT CPU-bound mathematical operations?",
      answer: "Network I/O is non-blocking at the OS kernel level via epoll/kqueue. When a coroutine awaits socket I/O, it yields control to the single-threaded event loop. CPU math executes bytecode continuously while holding the Global Interpreter Lock (GIL); without an explicit yield or multiprocessing pool, the main thread blocks."
    },
    {
      id: "drill_02",
      topic: "Tokenization & Character Reasoning",
      question: "Why do LLMs frequently fail at counting characters in a word or reversing a string?",
      answer: "Byte-Pair Encoding (BPE) merges character sequences into multi-character token IDs (e.g. 'strawberry' -> ['str', 'aw', 'berry']). The self-attention matrix and feedforward layers operate exclusively on token vectors; the model has no physical representation or positional indices for individual constituent character glyphs inside a token."
    },
    {
      id: "drill_03",
      topic: "Embedding Geometry & Negation Failure",
      question: "Why does bi-encoder cosine similarity fail on negated queries like 'hotels not in London'?",
      answer: "Bi-encoders encode queries and documents independently via mean pooling over hidden states (u = Enc(q), v = Enc(d)). The semantic vector space captures topical co-occurrence geometry. 'Hotels not in London' and 'hotels in London' share almost identical token distributions and high cosine collinearity (~0.9+). Without joint cross-attention, negation tokens cannot modulate document representations."
    },
    {
      id: "drill_04",
      topic: "Hybrid Search & Reciprocal Rank Fusion",
      question: "What is Reciprocal Rank Fusion (RRF), and why is constant k (typically k=60) added to the denominator?",
      answer: "BM25 produces unbounded TF-IDF scores ([0, inf)), while dense search produces bounded cosine scores ([-1, 1]). Normalizing and interpolating disparate score distributions is mathematically unstable. RRF discards raw scores and sums rank inverses: RRF(d) = sum(1 / (k + rank_i)). Constant k=60 compresses the steep gradient between rank 1 (1/1) and rank 2 (1/2), preventing a single top-ranked outlier in one noisy lane from dominating multi-lane consensus."
    },
    {
      id: "drill_05",
      topic: "Cross-Encoders vs Bi-Encoders",
      question: "What is the physical architectural difference between a bi-encoder and a cross-encoder?",
      answer: "A bi-encoder passes query and document through separate forward passes into independent vectors u, v in R^D (O(N^2 + M^2) attention), enabling pre-computed sub-millisecond ANN index search. A cross-encoder concatenates [CLS] + q + [SEP] + d + [SEP] into a single transformer, computing full all-to-all cross-attention across all N+M tokens at every layer (O((N+M)^2)), enabling direct query-document token interactions at higher computational cost."
    },
    {
      id: "drill_06",
      topic: "RAG Evaluation Metrics",
      question: "What is the mathematical and operational difference between Recall@5 and Mean Reciprocal Rank (MRR)?",
      answer: "Recall@5 is a binary set-membership metric: (1/|Q|) * sum(I(relevant in top 5)), weighting rank 1 and rank 5 identically. MRR is an ordinal position penalty: (1/|Q|) * sum(1 / rank_first). MRR penalizes context stuffing: rank 1 scores 1.0, rank 2 scores 0.5, and rank 5 scores 0.2, reflecting that earlier relevant chunks reduce LLM distraction and generation latency."
    },
    {
      id: "drill_07",
      topic: "Compound AI Architecture",
      question: "Name the 4 primary Compound AI patterns. When should you use a Router vs an Orchestrator?",
      answer: "1. Router (static 1-of-N conditional branch). 2. Orchestrator-Workers (central planner decomposes tasks into dynamic parallel subtasks). 3. Evaluator-Optimizer (iterative generator-critic refinement loop). 4. Parallel Consensus (ensembles N stochastic generations via voting/clustering). Use a Router for predictable, single-step intent classification; use an Orchestrator when multi-step dependency DAGs and state aggregation across tools are required."
    },
    {
      id: "drill_08",
      topic: "Model Context Protocol (MCP)",
      question: "What are the three primary primitives defined in the Model Context Protocol (MCP), and how do they differ in execution?",
      answer: "Over JSON-RPC 2.0: 1. Tools (executable functions with JSON Schema; model generates arguments, host executes side effects, returns output). 2. Resources (read-only passive data payloads addressed by URI like file:// or db://; attached without model execution). 3. Prompts (parameterized interactive templates surfaced to users/clients for workflow orchestration)."
    },
    {
      id: "drill_09",
      topic: "Production Security: Prompt Injection",
      question: "How does an indirect prompt injection attack differ from a direct jailbreak, and why do transformers fail to prevent it natively?",
      answer: "Direct jailbreaks originate in user prompts trying to bypass guardrails. Indirect prompt injection originates from untrusted data (PDFs, web scrapes, tool outputs) containing adversarial directives. Transformers process instructions and data as an undifferentiated, flat token sequence in the same self-attention context window. With no hardware-level separation between instruction pointer and data buffer (no NX/DEP bit), adversarial data tokens hijack attention heads and override system prompts."
    },
    {
      id: "drill_10",
      topic: "Open Model Serving: PagedAttention",
      question: "What physical memory problem does PagedAttention solve in inference engines like vLLM?",
      answer: "In autoregressive decoding, dynamic Key-Value (KV) cache tensors grow per generated token. Traditional engines pre-allocate contiguous GPU VRAM for the maximum context window (e.g. 8k tokens), causing 60-80% memory waste via internal/external fragmentation. PagedAttention mirrors OS virtual memory: it partitions the KV cache into fixed-size physical blocks (e.g. 16 tokens) mapped via a page table, eliminating contiguous allocation constraints and enabling near-zero waste with copy-on-write branching."
    },
    {
      id: "drill_11",
      topic: "Fine-Tuning: LoRA Parameterization",
      question: "In LoRA, what physical mechanisms do the hyperparameters Rank (r) and Alpha (alpha) govern?",
      answer: "LoRA reparameterizes weight updates as delta_W = B * A, where B in R^(d x r) (zero initialized) and A in R^(r x k) (Gaussian initialized). Rank r << min(d, k) defines the dimension of the low-rank update subspace, setting parameter capacity and memory footprint. Alpha is a constant scaling multiplier in the forward pass: W = W0 + (alpha / r) * (B * A). Scaling by (alpha / r) stabilizes gradient updates and activations, decoupling rank changes from learning rate tuning."
    },
    {
      id: "drill_12",
      topic: "Production Resiliency: The Thundering Herd",
      question: "Why is 'full jitter' strictly superior to exponential backoff without jitter during upstream rate-limit events?",
      answer: "Deterministic backoff (delay = base * 2^attempt) lacks phase entropy. N workers failing at time T0 all sleep for the exact same duration and wake up at T0 + delta_t, firing a synchronized shockwave that repeatedly re-exhausts the provider's token bucket. Full jitter draws sleep times uniformly from U(0, min(max_backoff, base * 2^attempt)), de-correlating worker phases into a flat Poisson arrival stream that allows token buckets to refill smoothly."
    },
    {
      id: "drill_13",
      topic: "Vector Space Geometry: Metric Ordering",
      question: "What is the mathematical and operational difference between Cosine Similarity and Cosine Distance, and what happens if their sort orders are inverted?",
      answer: "Cosine Similarity is an inner product metric in [-1.0, 1.0]: cos(theta) = (u · v) / (||u|| * ||v||), where +1.0 represents collinearity (maximum match); it requires descending sort order. Cosine Distance is D_C = 1.0 - cos(theta) in [0.0, 2.0], where 0.0 represents identity; it requires ascending sort order. Inverting the sort order causes the engine to return the most semantically antithetical chunk in the corpus at Rank 1."
    },
    {
      id: "drill_14",
      topic: "Async Generator Lifecycle: Client Disconnects",
      question: "What occurs inside an ASGI server and async generator when a streaming client disconnects mid-response?",
      answer: "When a client terminates the TCP socket, the ASGI server detects socket hangup and calls await generator.aclose(). Python raises asyncio.CancelledError at the generator's active await suspension point. If resource cleanup is placed sequentially after the for/yield loop instead of inside a finally: block, execution halts immediately and the cleanup code never runs, leaking open sockets, file descriptors, and upstream connections."
    },
    {
      id: "drill_15",
      topic: "Attention Dynamics: Lost in the Middle",
      question: "What is the 'Lost in the Middle' phenomenon, and what physical attention dynamics cause it?",
      answer: "In long contexts, LLM recall accuracy forms a U-shaped curve: information placed in the first 10% (primacy) or last 10% (recency) is retrieved with high fidelity, while performance degrades significantly in the middle 80%. This is driven by attention sink dynamics (initial tokens absorb large softmax denominator mass as anchor states) combined with RoPE positional decay and causal attention masking, which biases query-key dot products toward context boundaries."
    },
    {
      id: "drill_16",
      topic: "Structured Outputs: Constrained Decoding",
      question: "How does grammar-constrained decoding physically guarantee valid JSON compared to prompt engineering?",
      answer: "Prompting relies on stochastic token sampling where syntax-violating tokens always have non-zero probability. Constrained decoding compiles a JSON Schema/CFG into a Deterministic Finite Automaton (DFA). At each autoregressive decoding step, the DFA computes the exact set of valid next characters, and a vocabulary trie maps them to valid token IDs. The engine sets invalid token logits to -inf prior to softmax, reducing their sampling probability to absolute zero."
    }
  ];

  // Initialize global DRILLS_DATA if not defined
  if (!window.DRILLS_DATA || !Array.isArray(window.DRILLS_DATA) || window.DRILLS_DATA.length === 0) {
    window.DRILLS_DATA = BUILTIN_DRILLS;
  }

  window.initDrillRunner = function (containerId) {
    injectStyles();
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container) {
      console.warn("initDrillRunner: target container not found:", containerId);
      return;
    }
    if (container.dataset.aiwInitialized === "true") return;
    container.dataset.aiwInitialized = "true";

    const STORAGE_KEY = "ai_drills_mastery_v1";
    let masteryState = {};
    try {
      masteryState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
    } catch (e) {
      masteryState = {};
    }

    function saveMastery() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(masteryState));
      } catch (e) {}
    }

    const drills = (window.DRILLS_DATA && window.DRILLS_DATA.length > 0) ? window.DRILLS_DATA : BUILTIN_DRILLS;
    let currentIndex = 0;
    let isFlipped = false;

    container.innerHTML = `
      <div class="aiw-widget-card" role="region" aria-label="Active Recall Drill Runner">
        <div class="aiw-header-row">
          <div class="aiw-title-area">
            <h3>Active Recall Spaced Retrieval Runner</h3>
            <p>Test your production AI engineering intuition. Formulate the physical mechanism mentally before revealing.</p>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <button type="button" class="aiw-btn" id="aiw-btn-random">🎲 Random Card</button>
            <button type="button" class="aiw-btn" id="aiw-btn-reset-mastery">Reset Progress</button>
          </div>
        </div>

        <!-- Mastery Progress Bar -->
        <div class="aiw-drill-meta-bar">
          <div class="aiw-progress-container">
            <span class="aiw-progress-text" id="aiw-drill-score-text">0 / ${drills.length} Mastered (0%)</span>
            <div class="aiw-progress-track">
              <div class="aiw-progress-fill" id="aiw-drill-progress-fill" style="width:0%"></div>
            </div>
          </div>
          <div class="aiw-drill-actions">
            <button type="button" class="aiw-btn" id="aiw-btn-prev">‹ Prev</button>
            <button type="button" class="aiw-btn" id="aiw-btn-next">Next ›</button>
          </div>
        </div>

        <!-- 3D Flashcard Container -->
        <div class="aiw-card-scene">
          <div class="aiw-card-3d" id="aiw-flashcard" role="button" tabindex="0" aria-label="Flashcard. Click to flip.">
            <!-- Front Face (Question) -->
            <div class="aiw-card-face aiw-card-front">
              <div>
                <div class="aiw-card-category">
                  <span id="aiw-card-topic">TOPIC</span>
                  <span class="aiw-badge" id="aiw-card-status-badge">UNSEEN</span>
                </div>
                <div class="aiw-card-question" id="aiw-card-q">Loading challenge...</div>
                <div class="aiw-card-feynman-hint">💡 Can you describe the physical mechanics down to the memory, network, or matrix level?</div>
              </div>
              <div class="aiw-card-footer">
                <span style="font-size:12px; color:var(--aiw-muted);">Click card or press <kbd class="aiw-shortcut-pill">Space</kbd> to flip</span>
                <button type="button" class="aiw-btn aiw-btn-primary" id="aiw-btn-reveal">Reveal Physical Mechanism</button>
              </div>
            </div>

            <!-- Back Face (Senior Reference Answer) -->
            <div class="aiw-card-face aiw-card-back">
              <div>
                <div class="aiw-card-category">
                  <span>SENIOR REFERENCE MECHANISM</span>
                  <span class="aiw-badge aiw-badge-blue">VERIFIED SOLUTION</span>
                </div>
                <div class="aiw-card-answer" id="aiw-card-a">Loading answer...</div>
              </div>
              <div class="aiw-card-footer">
                <button type="button" class="aiw-btn aiw-btn-danger" id="aiw-btn-review">↺ Review Again <kbd class="aiw-shortcut-pill">1</kbd></button>
                <button type="button" class="aiw-btn aiw-btn-primary" id="aiw-btn-mastered">✓ Mastered <kbd class="aiw-shortcut-pill">2</kbd></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Elements
    const card3d = container.querySelector("#aiw-flashcard");
    const topicSpan = container.querySelector("#aiw-card-topic");
    const statusBadge = container.querySelector("#aiw-card-status-badge");
    const questionDiv = container.querySelector("#aiw-card-q");
    const answerDiv = container.querySelector("#aiw-card-a");

    const scoreText = container.querySelector("#aiw-drill-score-text");
    const progressFill = container.querySelector("#aiw-drill-progress-fill");

    const btnReveal = container.querySelector("#aiw-btn-reveal");
    const btnReview = container.querySelector("#aiw-btn-review");
    const btnMastered = container.querySelector("#aiw-btn-mastered");
    const btnPrev = container.querySelector("#aiw-btn-prev");
    const btnNext = container.querySelector("#aiw-btn-next");
    const btnRandom = container.querySelector("#aiw-btn-random");
    const btnResetMastery = container.querySelector("#aiw-btn-reset-mastery");

    function updateProgress() {
      let masteredCount = 0;
      drills.forEach((d) => {
        if (masteryState[d.id] && masteryState[d.id].status === "mastered") {
          masteredCount++;
        }
      });
      const pct = Math.round((masteredCount / drills.length) * 100);
      scoreText.textContent = `${masteredCount} / ${drills.length} Mastered (${pct}%)`;
      progressFill.style.width = `${pct}%`;
    }

    function renderCard() {
      const card = drills[currentIndex];
      if (!card) return;

      isFlipped = false;
      card3d.classList.remove("is-flipped");

      topicSpan.textContent = card.topic || "AI Engineering Challenge";
      questionDiv.textContent = card.question;
      answerDiv.textContent = card.answer;

      const record = masteryState[card.id];
      if (record && record.status === "mastered") {
        statusBadge.textContent = "MASTERED";
        statusBadge.className = "aiw-badge aiw-badge-green";
      } else if (record && record.status === "review") {
        statusBadge.textContent = "REVIEW NEEDED";
        statusBadge.className = "aiw-badge aiw-badge-amber";
      } else {
        statusBadge.textContent = "UNSEEN";
        statusBadge.className = "aiw-badge";
      }

      updateProgress();
    }

    function flipCard() {
      isFlipped = !isFlipped;
      card3d.classList.toggle("is-flipped", isFlipped);
    }

    // Pick next card: prioritize review needed or unseen
    function pickNextSmartCard() {
      const unmasteredIndices = [];
      drills.forEach((d, idx) => {
        const rec = masteryState[d.id];
        if (!rec || rec.status !== "mastered") {
          unmasteredIndices.push(idx);
        }
      });
      if (unmasteredIndices.length > 0) {
        // Pick one that is different from current
        const candidates = unmasteredIndices.filter(i => i !== currentIndex);
        if (candidates.length > 0) {
          currentIndex = candidates[Math.floor(Math.random() * candidates.length)];
        } else {
          currentIndex = unmasteredIndices[0];
        }
      } else {
        // All mastered! Loop naturally
        currentIndex = (currentIndex + 1) % drills.length;
      }
      renderCard();
    }

    function markMastered() {
      const card = drills[currentIndex];
      if (!card) return;
      masteryState[card.id] = { status: "mastered", timestamp: Date.now() };
      saveMastery();
      pickNextSmartCard();
    }

    function markReview() {
      const card = drills[currentIndex];
      if (!card) return;
      masteryState[card.id] = { status: "review", timestamp: Date.now() };
      saveMastery();
      pickNextSmartCard();
    }

    function nextCard() {
      currentIndex = (currentIndex + 1) % drills.length;
      renderCard();
    }

    function prevCard() {
      currentIndex = (currentIndex - 1 + drills.length) % drills.length;
      renderCard();
    }

    function randomCard() {
      if (drills.length <= 1) return;
      let nextIdx = currentIndex;
      while (nextIdx === currentIndex) {
        nextIdx = Math.floor(Math.random() * drills.length);
      }
      currentIndex = nextIdx;
      renderCard();
    }

    // Event Listeners
    card3d.addEventListener("click", (e) => {
      // Don't double flip if an action button on the card face was clicked
      if (e.target.closest("button")) return;
      flipCard();
    });

    btnReveal.addEventListener("click", (e) => {
      e.stopPropagation();
      flipCard();
    });

    btnMastered.addEventListener("click", (e) => {
      e.stopPropagation();
      markMastered();
    });

    btnReview.addEventListener("click", (e) => {
      e.stopPropagation();
      markReview();
    });

    btnNext.addEventListener("click", nextCard);
    btnPrev.addEventListener("click", prevCard);
    btnRandom.addEventListener("click", randomCard);

    btnResetMastery.addEventListener("click", () => {
      if (confirm("Reset all drill mastery records in localStorage?")) {
        masteryState = {};
        saveMastery();
        renderCard();
      }
    });

    // Keyboard Shortcuts
    card3d.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") {
        flipCard();
        e.preventDefault();
      } else if (e.key === "1" && isFlipped) {
        markReview();
        e.preventDefault();
      } else if (e.key === "2" && isFlipped) {
        markMastered();
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        nextCard();
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        prevCard();
        e.preventDefault();
      }
    });

    renderCard();
  };



  /* ==========================================================================
     4. CODE BLOCK ENHANCER
     ========================================================================== */
  function detectLanguage(codeEl) {
    // 1. Check class list for language-* or lang-*
    const classes = codeEl.className.split(/\s+/);
    for (const c of classes) {
      const m = c.match(/^(?:language|lang)-([a-zA-Z0-9_-]+)$/);
      if (m) return m[1].toLowerCase();
    }

    // 2. Heuristic inspection of content
    const text = codeEl.textContent.trim();
    if (/^\s*(import\s|from\s|def\s|class\s|print\(|@\w+)/m.test(text)) return "python";
    if (/^\s*(curl\s|docker\s|pip\s|uv\s|git\s|npm\s|cd\s|export\s|echo\s|chmod\s)/m.test(text)) return "bash";
    if (/^\s*[{[]/m.test(text) && /:\s*["\d[{]/m.test(text)) return "json";
    if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\s/im.test(text)) return "sql";
    if (/^\s*(const\s|let\s|var\s|function\s|console\.log|=>)/m.test(text)) return "javascript";
    if (/^\s*#\s|^\s*-\s|:\s*$/m.test(text)) return "yaml";

    return "code";
  }

  function copyToClipboard(text, btn) {
    const originalContent = btn.innerHTML;

    function showSuccess() {
      btn.classList.add("is-copied");
      btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied ✓`;
      clearTimeout(btn._aiwTimer);
      btn._aiwTimer = setTimeout(() => {
        btn.classList.remove("is-copied");
        btn.innerHTML = originalContent;
      }, 1800);
    }

    function showFallback() {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (err) {
        ok = false;
      }
      ta.remove();
      if (ok) showSuccess();
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showSuccess, showFallback);
    } else {
      showFallback();
    }
  }

  window.enhanceCodeBlocks = function () {
    injectStyles();
    const codeBlocks = document.querySelectorAll("pre > code");

    codeBlocks.forEach((codeEl) => {
      const preEl = codeEl.parentElement;
      if (!preEl || preEl.dataset.aiwEnhanced === "true") return;
      preEl.dataset.aiwEnhanced = "true";

      const rawCode = codeEl.textContent.replace(/\r\n/g, "\n");
      // Remove single trailing newline if present
      const cleanCode = rawCode.replace(/\n$/, "");
      const lines = cleanCode.split("\n");
      const lang = detectLanguage(codeEl);

      // Create enhanced container
      const wrapper = document.createElement("div");
      wrapper.className = "aiw-enhanced-pre";

      // Create Header Bar
      const header = document.createElement("div");
      header.className = "aiw-code-header";
      header.innerHTML = `
        <span class="aiw-code-lang">
          <span class="aiw-code-lang-dot"></span>
          ${lang}
        </span>
        <button type="button" class="aiw-copy-btn" aria-label="Copy code snippet">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy
        </button>
      `;

      // Copy interaction
      const copyBtn = header.querySelector(".aiw-copy-btn");
      copyBtn.addEventListener("click", () => copyToClipboard(cleanCode, copyBtn));

      // Code body with line number gutter
      const containerDiv = document.createElement("div");
      containerDiv.className = "aiw-code-container";

      const gutter = document.createElement("div");
      gutter.className = "aiw-code-gutter";
      gutter.innerHTML = lines.map((_, i) => i + 1).join("<br>");

      const codeContent = document.createElement("pre");
      codeContent.className = "aiw-code-content";
      const newCode = document.createElement("code");
      newCode.className = codeEl.className;
      newCode.textContent = cleanCode;
      codeContent.appendChild(newCode);

      containerDiv.appendChild(gutter);
      containerDiv.appendChild(codeContent);

      wrapper.appendChild(header);
      wrapper.appendChild(containerDiv);

      preEl.parentNode.replaceChild(wrapper, preEl);
    });
  };

  // Auto-enhance code blocks if document is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.enhanceCodeBlocks);
  } else {
    window.enhanceCodeBlocks();
  }

})();

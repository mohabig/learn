/**
 * Comprehensive automated verification for site/widgets.js
 */
const fs = require('fs');
const path = require('path');

// Mock a lightweight browser environment
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
    _dump: () => store
  };
})();

// Create minimal DOM mocks
class MockElement {
  constructor(tagName) {
    this.tagName = (tagName || 'DIV').toUpperCase();
    this.children = [];
    this.parentElement = null;
    this.parentNode = null;
    this.attributes = {};
    this.dataset = {};
    this.style = {};
    this.classList = new Set();
    this.classList.add = (c) => this.classList[c] = true;
    this.classList.remove = (c) => delete this.classList[c];
    this.classList.contains = (c) => !!this.classList[c];
    this.classList.toggle = (c, force) => {
      if (force === undefined) {
        if (this.classList[c]) delete this.classList[c];
        else this.classList[c] = true;
      } else if (force) {
        this.classList[c] = true;
      } else {
        delete this.classList[c];
      }
    };
    this._listeners = {};
    this._innerHTML = '';
    this.textContent = '';
  }

  get innerHTML() {
    return this._innerHTML;
  }

  set innerHTML(val) {
    this._innerHTML = val;
    // Simple mock parsing for ids and classes in tests
    this.children = [];
    this._parseMockChildren(val);
  }

  _parseMockChildren(html) {
    const tagRegex = /<([a-zA-Z0-9-]+)([^>]*)>/g;
    let match;
    while ((match = tagRegex.exec(html)) !== null) {
      const tag = match[1];
      const attrsStr = match[2];
      const el = new MockElement(tag);
      el.parentElement = this;
      el.parentNode = this;

      const idMatch = attrsStr.match(/id=["']([^"']+)["']/);
      if (idMatch) el.id = idMatch[1];

      const classMatch = attrsStr.match(/class=["']([^"']+)["']/);
      if (classMatch) {
        classMatch[1].split(/\s+/).forEach(c => el.classList.add(c));
      }

      this.children.push(el);
    }
  }

  setAttribute(k, v) {
    this.attributes[k] = v;
    if (k.startsWith('data-')) {
      const camel = k.slice(5).replace(/-([a-z])/g, (_, l) => l.toUpperCase());
      this.dataset[camel] = v;
    }
  }

  getAttribute(k) {
    return this.attributes[k] || null;
  }

  addEventListener(event, fn) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(fn);
  }

  removeEventListener(event, fn) {
    if (!this._listeners[event]) return;
    this._listeners[event] = this._listeners[event].filter(f => f !== fn);
  }

  dispatchEvent(event) {
    const list = this._listeners[event.type] || [];
    list.forEach(fn => fn(event));
  }

  appendChild(child) {
    child.parentElement = this;
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  replaceChild(newChild, oldChild) {
    const idx = this.children.indexOf(oldChild);
    if (idx !== -1) {
      this.children[idx] = newChild;
      newChild.parentElement = this;
      newChild.parentNode = this;
    }
    return oldChild;
  }

  querySelector(sel) {
    if (sel.startsWith('#')) {
      const id = sel.slice(1);
      return this._findChild(el => el.id === id);
    }
    if (sel.startsWith('.')) {
      const cls = sel.slice(1);
      return this._findChild(el => el.classList.contains && el.classList.contains(cls));
    }
    return this._findChild(el => el.tagName.toLowerCase() === sel.toLowerCase());
  }

  querySelectorAll(sel) {
    const results = [];
    this._collectChildren(sel, results);
    return results;
  }

  _findChild(predicate) {
    for (const c of this.children) {
      if (predicate(c)) return c;
      const found = c._findChild(predicate);
      if (found) return found;
    }
    return null;
  }

  _collectChildren(sel, results) {
    for (const c of this.children) {
      if (sel.startsWith('.') && c.classList.contains && c.classList.contains(sel.slice(1))) {
        results.push(c);
      } else if (sel.startsWith('#') && c.id === sel.slice(1)) {
        results.push(c);
      } else if (c.tagName.toLowerCase() === sel.toLowerCase()) {
        results.push(c);
      }
      c._collectChildren(sel, results);
    }
  }

  closest(sel) {
    let curr = this;
    while (curr) {
      if (sel.startsWith('.') && curr.classList.contains && curr.classList.contains(sel.slice(1))) return curr;
      if (sel.startsWith('#') && curr.id === sel.slice(1)) return curr;
      if (curr.tagName && curr.tagName.toLowerCase() === sel.toLowerCase()) return curr;
      curr = curr.parentElement;
    }
    return null;
  }
}

class MockDocument extends MockElement {
  constructor() {
    super('DOCUMENT');
    this.head = new MockElement('HEAD');
    this.body = new MockElement('BODY');
    this.children = [this.head, this.body];
    this.readyState = 'complete';
  }

  getElementById(id) {
    return this.querySelector('#' + id);
  }

  createElement(tag) {
    return new MockElement(tag);
  }
}

// Setup globals
const mockDoc = new MockDocument();
global.document = mockDoc;
global.window = global;
global.window.document = mockDoc;
global.window.localStorage = localStorageMock;
global.localStorage = localStorageMock;
global.requestAnimationFrame = (fn) => setTimeout(fn, 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);
global.performance = { now: () => Date.now() };

console.log("Loading site/widgets.js in test environment...");
require('../site/widgets.js');

// Test 1: Verify all 4 required functions are exported to window
console.log("\n--- Checking Exports ---");
const requiredExports = ['initVectorCompass', 'initStreamTicker', 'initDrillRunner', 'enhanceCodeBlocks'];
requiredExports.forEach(fn => {
  if (typeof window[fn] === 'function') {
    console.log(`[PASS] window.${fn} is a function`);
  } else {
    console.error(`[FAIL] window.${fn} is NOT defined or not a function!`);
    process.exit(1);
  }
});

// Test 2: Verify window.DRILLS_DATA exists and has valid structure
console.log("\n--- Checking window.DRILLS_DATA ---");
if (Array.isArray(window.DRILLS_DATA) && window.DRILLS_DATA.length >= 10) {
  console.log(`[PASS] window.DRILLS_DATA has ${window.DRILLS_DATA.length} senior drill cards`);
  window.DRILLS_DATA.forEach((card, idx) => {
    if (!card.id || !card.topic || !card.question || !card.answer) {
      console.error(`[FAIL] Card #${idx} is missing required fields!`, card);
      process.exit(1);
    }
  });
  console.log(`[PASS] All drill cards have valid schema (id, topic, question, answer)`);
} else {
  console.error(`[FAIL] window.DRILLS_DATA is invalid or empty!`);
  process.exit(1);
}

// Test 3: Initialize Vector Compass
console.log("\n--- Testing initVectorCompass ---");
const compassDiv = mockDoc.createElement('div');
compassDiv.id = 'test-compass-container';
mockDoc.body.appendChild(compassDiv);
window.initVectorCompass('test-compass-container');

const compassSvg = compassDiv.querySelector('svg');
if (compassSvg) {
  console.log("[PASS] initVectorCompass mounted SVG canvas");
} else {
  console.error("[FAIL] initVectorCompass failed to mount SVG!");
  process.exit(1);
}

// Test 4: Initialize Stream Ticker
console.log("\n--- Testing initStreamTicker ---");
const tickerDiv = mockDoc.createElement('div');
tickerDiv.id = 'test-ticker-container';
mockDoc.body.appendChild(tickerDiv);
window.initStreamTicker('test-ticker-container');

const btnSimulate = tickerDiv.querySelector('#aiw-btn-simulate');
const btnDisconnect = tickerDiv.querySelector('#aiw-btn-disconnect');
if (btnSimulate && btnDisconnect) {
  console.log("[PASS] initStreamTicker mounted controls and buttons");
} else {
  console.error("[FAIL] initStreamTicker missing control buttons!");
  process.exit(1);
}

// Test 5: Initialize Drill Runner
console.log("\n--- Testing initDrillRunner ---");
const drillDiv = mockDoc.createElement('div');
drillDiv.id = 'test-drill-container';
mockDoc.body.appendChild(drillDiv);
window.initDrillRunner('test-drill-container');

const flashcard = drillDiv.querySelector('#aiw-flashcard');
if (flashcard) {
  console.log("[PASS] initDrillRunner mounted 3D flashcard");
} else {
  console.error("[FAIL] initDrillRunner missing flashcard element!");
  process.exit(1);
}

// Test 6: Code Block Enhancer
console.log("\n--- Testing enhanceCodeBlocks ---");
const preEl = mockDoc.createElement('pre');
const codeEl = mockDoc.createElement('code');
codeEl.className = 'language-python';
codeEl.textContent = 'import os\nimport sys\n\ndef main():\n    print("hello world")\n';
preEl.appendChild(codeEl);
mockDoc.body.appendChild(preEl);

window.enhanceCodeBlocks();
console.log("[PASS] enhanceCodeBlocks executed successfully");

console.log("\n============================================");
console.log(" ALL AUTOMATED WIDGET UNIT TESTS PASSED! ✓");
console.log("============================================\n");

// ==========================================================================
// PyMaster — Skeuomorphic Challenge Console
// Dual-bay hardware deck: Technical Spec & Oscilloscope Test Terminal
// ==========================================================================

import { createCodeEditor, getEditorValue } from './code-editor.js';
import { runPython, isPyodideReady } from '../engine/pyodide-runner.js';
import { runAllTests } from '../engine/validator.js';
import { gameState } from '../engine/state.js';
import { icon } from './icons.js';
import { playSound } from '../engine/haptics.js';

export function renderChallengeView(container, lesson, section, chapter, callbacks) {
  const { onComplete, onPrevious, onBack, hasPrevious } = callbacks;
  const challenge = lesson.challenge;
  let activeTab = 'testcases'; // 'testcases' | 'console'
  let testResults = null;
  let consoleOutput = '';
  let isRunning = false;
  let hintsOpen = new Set();
  let allTestsPassed = false;
  let isPerfect = false;

  function cleanup() {
    document.removeEventListener('keydown', keydownHandler);
  }

  function handleBack() {
    cleanup();
    onBack();
  }

  function handlePrevious() {
    if (typeof onPrevious === 'function') {
      cleanup();
      onPrevious();
    }
  }

  function handleNext() {
    cleanup();
    onComplete(isPerfect);
  }

  container.innerHTML = `
    <div class="challenge-container">
      <!-- Mobile Bay Switcher (Visible only on mobile <= 768px) -->
      <div class="mobile-bay-switcher segmented-pill-container" role="tablist">
        <button class="segmented-pill-option active" id="btn-bay-spec" role="tab" aria-selected="true">
          <span>SPECIFICATION</span>
        </button>
        <button class="segmented-pill-option" id="btn-bay-editor" role="tab" aria-selected="false">
          <span>CODE & RUN</span>
        </button>
      </div>

      <!-- ── Left Bay: Engineering Brief & Logic Hints ── -->
      <div class="challenge-left hardware-chassis-panel" id="challenge-bay-left">
        <div class="challenge-header hardware-header-bar">
          <div class="header-nav-group">
            <button class="tactile-btn back-btn" id="challenge-back-btn" title="Back to Matrix">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            ${onPrevious ? `
              <button class="tactile-btn nav-prev-btn" id="header-prev-btn" title="Previous Level">
                <span>←&nbsp;PREV</span>
              </button>
            ` : ''}
          </div>
          <div class="challenge-header-info">
            <span class="lesson-breadcrumb">${section.title.toUpperCase()} // ${chapter.title.toUpperCase()}</span>
            <h1 class="lesson-title">${lesson.title}</h1>
          </div>
          <div class="challenge-stats">
            <span class="hardware-pill difficulty-${lesson.difficulty}">${lesson.difficulty.toUpperCase()}</span>
            <span class="hardware-pill xp-badge">+${lesson.xp}&nbsp;XP</span>
          </div>
        </div>

        <div class="challenge-body">
          <!-- Specification Section -->
          <div class="challenge-section skeuo-inset-well">
            <div class="spec-header-row">
              <span class="spec-tag">SYSTEM BRIEF</span>
              <span class="spec-id">TASK-${lesson.id.toUpperCase()}</span>
            </div>
            <div class="challenge-description">
              ${formatDescription(challenge.description)}
            </div>
            <div class="spec-action-row">
              <button class="tactile-btn explain-btn" id="btn-explain">
                ${icon('lightbulb', 14)}
                <span>Technical Overview</span>
              </button>
            </div>
          </div>

          <!-- Hardware Hints Module -->
          <div class="hints-section">
            <div class="hints-module-header">
              <span class="hints-tag">DIAGNOSTIC GUIDES</span>
              <span class="hints-count">${challenge.hints ? challenge.hints.length : 0} AVAILABLE</span>
            </div>
            <div class="hints-list" id="hints-list">
              ${(challenge.hints || []).map((hint, idx) => `
                <div class="hint-item tactile-drawer ${hintsOpen.has(idx) ? 'open' : ''}" data-hint-idx="${idx}">
                  <button class="hint-header">
                    <span class="hint-pip">#0${idx + 1}</span>
                    <span class="hint-label">LOGIC HINT ${idx + 1}</span>
                    <svg class="hint-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  <div class="hint-body">
                    <p>${hint}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Mobile Quick Action to jump to Code Editor -->
          <div class="mobile-code-action-strip">
            <button class="tactile-btn btn-primary" id="mobile-switch-to-editor-btn">
              <span>PROCEED TO CODE & RUN</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ── Right Bay: Code Editor & Oscilloscope Test Harness ── -->
      <div class="challenge-right hardware-chassis-panel" id="challenge-bay-right">
        <!-- Editor Wrapper -->
        <div class="editor-wrapper" id="editor-wrapper"></div>

        <!-- Hardware Test Console / Oscilloscope Display -->
        <div class="test-cases-panel">
          <div class="test-tabs-rack">
            <div class="segmented-pill-container">
              <button class="segmented-pill-option ${activeTab === 'testcases' ? 'active' : ''}" id="tab-testcases">
                <span>TEST SUITE</span>
                ${testResults ? (allTestsPassed
                  ? '<span class="status-diode status-green"></span>'
                  : '<span class="status-diode status-red"></span>')
                : ''}
              </button>
              <button class="segmented-pill-option ${activeTab === 'console' ? 'active' : ''}" id="tab-console">
                <span>TERMINAL LOG</span>
              </button>
            </div>

            <div class="oscilloscope-status-readout">
              <span class="scope-led ${isRunning ? 'pulse-blue status-blue' : (testResults ? (allTestsPassed ? 'status-green' : 'status-red') : 'status-idle')}"></span>
              <span class="scope-state-text">${isRunning ? 'EXEC HARNESS' : (testResults ? (allTestsPassed ? 'PASS: 100%' : 'ASSERT FAIL') : 'STANDBY')}</span>
            </div>
          </div>

          <!-- Recessed Oscilloscope Screen -->
          <div class="oscilloscope-screen skeuo-oscilloscope-display" id="test-content">
            ${activeTab === 'testcases' ? renderTestCases() : renderConsole()}
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize code editor
  const initialCode = gameState.getCode(lesson.id, challenge.starterCode);
  const editorWrapper = container.querySelector('#editor-wrapper');
  createCodeEditor(editorWrapper, initialCode, {
    showAskAI: false,
    onChange: (code) => {
      gameState.saveCode(lesson.id, code);
    }
  });

  function keydownHandler(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunCode();
    }
  }

  setupEventListeners();

  function setupEventListeners() {
    container.querySelector('#challenge-back-btn')?.addEventListener('click', () => {
      playSound('click');
      handleBack();
    });

    container.querySelector('#header-prev-btn')?.addEventListener('click', () => {
      playSound('click');
      handlePrevious();
    });

    container.querySelector('#tab-testcases')?.addEventListener('click', () => {
      playSound('snap');
      activeTab = 'testcases';
      updateTabs();
    });

    container.querySelector('#tab-console')?.addEventListener('click', () => {
      playSound('snap');
      activeTab = 'console';
      updateTabs();
    });

    container.querySelector('#btn-run-code')?.addEventListener('click', handleRunCode);
    container.querySelector('#btn-explain')?.addEventListener('click', handleExplain);

    // Hints accordion
    container.querySelectorAll('.hint-header').forEach(btn => {
      btn.addEventListener('click', () => {
        playSound('click');
        const item = btn.closest('.hint-item');
        const idx = parseInt(item.dataset.hintIdx);
        if (hintsOpen.has(idx)) {
          hintsOpen.delete(idx);
          item.classList.remove('open');
        } else {
          hintsOpen.add(idx);
          item.classList.add('open');
        }
      });
    });

    // Mobile Bay Switcher Logic
    const baySpecBtn = container.querySelector('#btn-bay-spec');
    const bayEditorBtn = container.querySelector('#btn-bay-editor');
    const mobileToEditorBtn = container.querySelector('#mobile-switch-to-editor-btn');
    const challengeContainer = container.querySelector('.challenge-container');

    function setMobileBay(bay) {
      playSound('click');
      if (bay === 'editor') {
        challengeContainer?.classList.add('mobile-show-editor');
        baySpecBtn?.classList.remove('active');
        bayEditorBtn?.classList.add('active');
        baySpecBtn?.setAttribute('aria-selected', 'false');
        bayEditorBtn?.setAttribute('aria-selected', 'true');
        window.dispatchEvent(new Event('resize'));
      } else {
        challengeContainer?.classList.remove('mobile-show-editor');
        bayEditorBtn?.classList.remove('active');
        baySpecBtn?.classList.add('active');
        baySpecBtn?.setAttribute('aria-selected', 'true');
        bayEditorBtn?.setAttribute('aria-selected', 'false');
      }
    }

    baySpecBtn?.addEventListener('click', () => setMobileBay('spec'));
    bayEditorBtn?.addEventListener('click', () => setMobileBay('editor'));
    mobileToEditorBtn?.addEventListener('click', () => setMobileBay('editor'));

    // Keyboard shortcut: Ctrl+Enter
    document.removeEventListener('keydown', keydownHandler);
    document.addEventListener('keydown', keydownHandler);
  }

  async function handleRunCode() {
    if (isRunning) return;

    const runBtn = container.querySelector('#btn-run-code');
    if (!runBtn) return;

    playSound('switch');
    isRunning = true;
    runBtn.classList.add('running');
    const runLed = runBtn.querySelector('.run-led-diode');
    if (runLed) runLed.className = 'run-led-diode pulse-blue status-blue';

    updateTabs();

    const code = getEditorValue();

    try {
      if (!isPyodideReady()) {
        consoleOutput = '[ENGINE ERROR] Python Pyodide runtime initializing... please wait.';
        activeTab = 'console';
        updateTabs();
        return;
      }

      let actualOutputs = [];
      let firstError = null;
      let firstStdout = '';

      if (challenge.testCases && challenge.testCases.length > 0) {
        for (let i = 0; i < challenge.testCases.length; i++) {
          const tc = challenge.testCases[i];
          const tcResult = await runPython(code, tc.input || '');
          if (i === 0) {
            firstError = tcResult.error;
            firstStdout = tcResult.stdout;
          }
          if (tcResult.error) {
            firstError = tcResult.error;
            firstStdout = tcResult.stdout;
            break;
          }
          actualOutputs.push(tcResult.stdout);
        }
      } else {
        const tcResult = await runPython(code, '');
        firstError = tcResult.error;
        firstStdout = tcResult.stdout;
        actualOutputs.push(tcResult.stdout);
      }

      consoleOutput = firstError || firstStdout;

      if (!firstError) {
        testResults = runAllTests(challenge.testCases, actualOutputs);
        allTestsPassed = testResults.every(t => t.passed);
        activeTab = 'testcases';

        if (allTestsPassed) {
          playSound('pass');
          isPerfect = !hintsOpen.size;
          // Mark completed in state immediately, but do NOT pop modal automatically
          gameState.completeLesson(lesson.id, lesson.xp, isPerfect);
        } else {
          playSound('fail');
        }
      } else {
        testResults = null;
        allTestsPassed = false;
        activeTab = 'console';
        playSound('fail');
      }
    } catch (err) {
      consoleOutput = `Unhandled Exception: ${err.message}`;
      testResults = null;
      allTestsPassed = false;
      activeTab = 'console';
      playSound('fail');
    } finally {
      isRunning = false;
      if (runBtn) {
        runBtn.classList.remove('running');
        const led = runBtn.querySelector('.run-led-diode');
        if (led) led.className = 'run-led-diode';
      }
      updateTabs();
      bindPassedActionEvents();
    }
  }

  function handleExplain() {
    consoleOutput = `=== TASK SPECIFICATION // RUNTIME TELEMETRY ===\nModule: ${lesson.title}\nDomain: ${section.title}\nDifficulty: ${lesson.difficulty.toUpperCase()}\nAllocated XP: ${lesson.xp}\nTarget Functionality: Code validation under pyodide WASM environment.`;
    activeTab = 'console';
    updateTabs();
  }

  function updateTabs() {
    const tabCases = container.querySelector('#tab-testcases');
    const tabConsole = container.querySelector('#tab-console');
    if (tabCases && tabConsole) {
      tabCases.classList.toggle('active', activeTab === 'testcases');
      tabConsole.classList.toggle('active', activeTab === 'console');
    }

    const scopeState = container.querySelector('.scope-state-text');
    const scopeLed = container.querySelector('.scope-led');
    if (scopeState && scopeLed) {
      if (isRunning) {
        scopeState.textContent = 'RUNNING...';
        scopeLed.className = 'scope-led status-blue pulse-blue';
      } else if (testResults) {
        scopeState.textContent = allTestsPassed ? 'PASS: 100%' : 'ASSERT FAIL';
        scopeLed.className = `scope-led ${allTestsPassed ? 'status-green' : 'status-red'}`;
      } else {
        scopeState.textContent = 'STANDBY';
        scopeLed.className = 'scope-led status-idle';
      }
    }

    const content = container.querySelector('#test-content');
    if (content) {
      content.innerHTML = activeTab === 'testcases' ? renderTestCases() : renderConsole();
    }

    // Update toolbar with Next/Previous actions when passed
    updateToolbarNavigation();
    bindPassedActionEvents();
  }

  function updateToolbarNavigation() {
    const buttonsRack = container.querySelector('.editor-buttons-rack');
    if (!buttonsRack) return;

    let navRack = buttonsRack.querySelector('.challenge-nav-rack');
    if (allTestsPassed) {
      if (!navRack) {
        navRack = document.createElement('div');
        navRack.className = 'challenge-nav-rack';
        buttonsRack.appendChild(navRack);
      }
      navRack.innerHTML = `
        ${onPrevious ? `
          <button class="tactile-btn btn-secondary nav-btn-prev" id="btn-toolbar-prev" title="Previous Level">
            <span>← PREVIOUS</span>
          </button>
        ` : ''}
        <button class="tactile-btn btn-continue-ready btn-success nav-btn-next" id="btn-toolbar-next" title="Advance to Next Level">
          <span class="btn-led status-green pulse-green"></span>
          <span>GO TO NEXT LEVEL</span>
          <span class="submit-key">→</span>
        </button>
      `;
    } else if (navRack) {
      navRack.remove();
    }
  }

  function bindPassedActionEvents() {
    container.querySelector('#btn-toolbar-prev')?.addEventListener('click', () => {
      playSound('click');
      handlePrevious();
    });

    container.querySelector('#btn-toolbar-next')?.addEventListener('click', () => {
      playSound('click');
      handleNext();
    });

    container.querySelector('#btn-banner-prev')?.addEventListener('click', () => {
      playSound('click');
      handlePrevious();
    });

    container.querySelector('#btn-banner-next')?.addEventListener('click', () => {
      playSound('click');
      handleNext();
    });
  }

  function renderTestCases() {
    if (!testResults) {
      return `
        <div class="oscilloscope-graticule-bg"></div>
        <div class="test-placeholder">
          <div class="scope-crosshairs"></div>
          <span class="placeholder-caption">HARNESS READY // CLICK EXECUTE OR PRESS CTRL+ENTER</span>
        </div>
      `;
    }

    return `
      <div class="oscilloscope-graticule-bg"></div>
      <div class="test-results-rack">
        ${allTestsPassed ? `
          <div class="test-suite-success-strip">
            <div class="success-strip-message">
              <span class="status-diode status-green pulse-green"></span>
              <span class="success-strip-txt">ALL SPECIFICATION CONSTRAINTS VERIFIED (PASS: 100%)</span>
            </div>
            <div class="success-strip-actions">
              ${onPrevious ? `
                <button class="tactile-btn btn-secondary nav-prev-btn" id="btn-banner-prev">
                  <span>← PREVIOUS</span>
                </button>
              ` : ''}
              <button class="tactile-btn btn-continue-ready btn-success nav-next-btn" id="btn-banner-next">
                <span class="btn-led status-green pulse-green"></span>
                <span>GO TO NEXT LEVEL</span>
                <span class="submit-key">→</span>
              </button>
            </div>
          </div>
        ` : ''}

        ${testResults.map((result, idx) => `
          <div class="test-result-card ${result.passed ? 'pass' : 'fail'}">
            <div class="test-card-header">
              <span class="test-diode ${result.passed ? 'status-green' : 'status-red'}"></span>
              <span class="test-card-label">ASSERTION #${idx + 1}</span>
              <span class="test-status-pill ${result.passed ? 'pass' : 'fail'}">${result.passed ? 'PASS' : 'FAIL'}</span>
            </div>
            <div class="test-card-body">
              <div class="test-io-col">
                <span class="io-tag">OUTPUT:</span>
                <pre class="io-val">${escapeHtml(result.actual || '')}</pre>
              </div>
              <div class="test-io-col expected">
                <span class="io-tag">EXPECTED:</span>
                <pre class="io-val">${escapeHtml(result.expected || '')}</pre>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderConsole() {
    return `
      <div class="oscilloscope-graticule-bg"></div>
      <div class="console-output-well">
        <div class="console-term-header">
          <span class="term-status-dot"></span>
          <span class="term-title">TTY // STDOUT & STDERR</span>
        </div>
        <pre class="console-term-body">${consoleOutput ? escapeHtml(consoleOutput) : 'Terminal stdout idle...'}</pre>
      </div>
    `;
  }
}

function formatDescription(desc) {
  if (!desc) return '';
  return desc
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

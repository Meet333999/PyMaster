// ==========================================================================
// PyMaster — Skeuomorphic SQL Challenge Console
// Dual-bay hardware deck: Schema & Database Harness + Query Terminal
// ==========================================================================

import { createCodeEditor, getEditorValue } from './code-editor.js';
import { runSQL, isSQLReady } from '../engine/sql-runner.js';
import { runAllTests } from '../engine/validator.js';
import { gameState } from '../engine/state.js';
import { icon } from './icons.js';
import { playSound } from '../engine/haptics.js';

export function renderSQLChallengeView(container, lesson, section, chapter, callbacks) {
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
          <span>SQL & RUN</span>
        </button>
      </div>

      <!-- ── Left Bay: SQL Schema & Problem Spec ── -->
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
          <div class="challenge-section skeuo-inset-well">
            <div class="spec-header-row">
              <span class="spec-tag">RELATIONAL BRIEF</span>
              <span class="spec-id">SQL-${lesson.id.toUpperCase()}</span>
            </div>
            <div class="challenge-description">
              ${formatDescription(challenge.description)}
            </div>

            ${challenge.setupSQL ? `
              <div class="sql-schema-preview skeuo-terminal-screen">
                <div class="sql-schema-title-bar">
                  <span class="schema-dot"></span>
                  <span class="schema-heading">RELATIONAL DDL SCHEMA</span>
                </div>
                <pre class="sql-schema-code"><code>${escapeHtml(challenge.setupSQL)}</code></pre>
              </div>
            ` : ''}

            <div class="spec-action-row">
              <button class="tactile-btn explain-btn" id="btn-explain">
                ${icon('database', 14)}
                <span>Technical Overview</span>
              </button>
            </div>
          </div>

          <!-- Hints List -->
          <div class="hints-section">
            <div class="hints-module-header">
              <span class="hints-tag">QUERY HINTS</span>
              <span class="hints-count">${challenge.hints ? challenge.hints.length : 0} AVAILABLE</span>
            </div>
            <div class="hints-list" id="hints-list">
              ${(challenge.hints || []).map((hint, idx) => `
                <div class="hint-item tactile-drawer ${hintsOpen.has(idx) ? 'open' : ''}" data-hint-idx="${idx}">
                  <button class="hint-header">
                    <span class="hint-pip">#0${idx + 1}</span>
                    <span class="hint-label">SQL HINT ${idx + 1}</span>
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
              <span>PROCEED TO SQL & RUN</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ── Right Bay: SQL Editor & Test Harness ── -->
      <div class="challenge-right hardware-chassis-panel" id="challenge-bay-right">
        <div class="editor-wrapper" id="editor-wrapper"></div>

        <div class="test-cases-panel">
          <div class="test-tabs-rack">
            <div class="segmented-pill-container">
              <button class="segmented-pill-option ${activeTab === 'testcases' ? 'active' : ''}" id="tab-testcases">
                <span>ROW VERIFICATION</span>
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
              <span class="scope-state-text">${isRunning ? 'RUNNING QUERY...' : (testResults ? (allTestsPassed ? 'QUERY MATCH' : 'ROW MISMATCH') : 'STANDBY')}</span>
            </div>
          </div>

          <div class="oscilloscope-screen skeuo-oscilloscope-display" id="test-content">
            ${activeTab === 'testcases' ? renderTestCases() : renderConsole()}
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize SQL Editor
  const initialCode = gameState.getCode(lesson.id, challenge.starterCode || '-- Write SQL query here\n');
  const editorWrapper = container.querySelector('#editor-wrapper');
  createCodeEditor(editorWrapper, initialCode, {
    language: 'sql',
    tabLabel: 'SQLite',
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

    // Hints
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

    // Keyboard shortcut
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
      if (!isSQLReady()) {
        consoleOutput = '[ENGINE ERROR] SQLite WebAssembly runtime initializing... please wait.';
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
          const setupSql = challenge.setupSQL || '';
          const fullQuery = setupSql ? `${setupSql}\n${code}` : code;
          const tcResult = await runSQL(fullQuery);
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
        const setupSql = challenge.setupSQL || '';
        const fullQuery = setupSql ? `${setupSql}\n${code}` : code;
        const tcResult = await runSQL(fullQuery);
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
      consoleOutput = `Unhandled SQL Exception: ${err.message}`;
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
    playSound('click');
    consoleOutput = `[SQL TECHNICAL SPECIFICATION]\n${challenge.description}\n\n[SCHEMA DEFINITION]\n${challenge.setupSQL || 'No DDL setup provided'}`;
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
        scopeState.textContent = 'RUNNING QUERY...';
        scopeLed.className = 'scope-led status-blue pulse-blue';
      } else if (testResults) {
        scopeState.textContent = allTestsPassed ? 'QUERY MATCH' : 'ROW MISMATCH';
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
          <span class="placeholder-caption">RELATIONAL HARNESS READY // EXECUTE QUERY TO VERIFY ROWS</span>
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
              <span class="success-strip-txt">ALL QUERY ASSERTIONS VERIFIED (PASS: 100%)</span>
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
              <span class="test-card-label">RESULT SET #${idx + 1}</span>
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
          <span class="term-title">SQL RELATIONAL TERMINAL LOG</span>
        </div>
        <pre class="console-term-body">${consoleOutput ? escapeHtml(consoleOutput) : 'SQL stdout idle...'}</pre>
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

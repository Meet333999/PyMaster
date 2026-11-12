// ==========================================================================
// Code Level / PyMaster — Modern Challenge View
// Dual-bay card layout: Task Requirements & Code Editor + Test Runner
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
  let hasFailedAttempt = false;

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
          <span>TASK BRIEF</span>
        </button>
        <button class="segmented-pill-option" id="btn-bay-editor" role="tab" aria-selected="false">
          <span>CODE & RUN</span>
        </button>
      </div>

      <!-- ── Left Bay: Engineering Brief & Logic Hints ── -->
      <div class="challenge-left modern-card-panel" id="challenge-bay-left">
        <div class="challenge-header modern-header-bar">
          <div class="header-nav-group">
            <button class="tactile-btn back-btn" id="challenge-back-btn" title="Back to Curriculum">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            ${onPrevious ? `
              <button class="tactile-btn nav-prev-btn" id="header-prev-btn" title="Previous Level">
                <span>← Prev</span>
              </button>
            ` : ''}
          </div>
          <div class="challenge-header-info">
            <span class="lesson-breadcrumb">${section.title} > ${chapter.title}</span>
            <h1 class="lesson-title">${lesson.title}</h1>
          </div>
          <div class="challenge-stats">
            <span class="difficulty-pill difficulty-${lesson.difficulty}">${lesson.difficulty ? lesson.difficulty.toUpperCase() : 'BEGINNER'}</span>
            <span class="xp-badge">+${lesson.xp} XP</span>
          </div>
        </div>

        <div class="challenge-body">
          <!-- Specification Section -->
          <div class="challenge-section modern-content-card">
            <div class="spec-header-row">
              <span class="spec-tag">Task Overview</span>
              <span class="spec-id">#${lesson.id}</span>
            </div>
            <div class="challenge-description">
              ${formatDescription(challenge.description)}
            </div>
          </div>

          <!-- Logic Hints Module -->
          <div class="hints-section">
            <div class="hints-module-header">
              <span class="hints-tag">HINTS</span>
              <span class="hints-count">${challenge.hints ? challenge.hints.length : 0} Available</span>
            </div>
            <div class="hints-list" id="hints-list">
              ${(challenge.hints || []).map((hint, idx) => `
                <div class="hint-item modern-content-card ${hintsOpen.has(idx) ? 'open' : ''}" data-hint-idx="${idx}">
                  <button class="hint-header">
                    <span class="hint-pip">0${idx + 1}</span>
                    <span class="hint-label">Hint ${idx + 1}</span>
                    <svg class="hint-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
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

      <!-- ── Right Bay: Code Editor & Test Harness ── -->
      <div class="challenge-right modern-card-panel" id="challenge-bay-right">
        <!-- Editor Wrapper -->
        <div class="editor-wrapper" id="editor-wrapper"></div>

        <!-- Test Console & Results Panel -->
        <div class="test-cases-panel">
          <div class="test-tabs-rack">
            <div class="segmented-pill-container">
              <button class="segmented-pill-option ${activeTab === 'testcases' ? 'active' : ''}" id="tab-testcases">
                <span>Test Suite</span>
                ${testResults ? (allTestsPassed
                  ? '<span class="status-indicator pass"></span>'
                  : '<span class="status-indicator fail"></span>')
                : ''}
              </button>
              <button class="segmented-pill-option ${activeTab === 'console' ? 'active' : ''}" id="tab-console">
                <span>Output Log</span>
              </button>
            </div>

            <div class="test-status-readout">
              <span class="scope-status-pill ${isRunning ? 'running' : (testResults ? (allTestsPassed ? 'pass' : 'fail') : 'idle')}">
                ${isRunning ? 'Running...' : (testResults ? (allTestsPassed ? 'Passed 100%' : 'Assert Failed') : 'Ready')}
              </span>
            </div>
          </div>

          <!-- Output Content Screen -->
          <div class="oscilloscope-screen" id="test-content">
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

    if (!isPyodideReady()) {
      alert('Python environment is initializing. Please wait a moment...');
      return;
    }

    isRunning = true;
    updateRunButton(true);
    playSound('compile');

    const userCode = getEditorValue();
    gameState.saveCode(lesson.id, userCode);

    try {
      // 1. Run user code in Pyodide
      const runResult = await runPython(userCode);
      consoleOutput = runResult.stdout || '';
      if (runResult.error) {
        consoleOutput += (consoleOutput ? '\n' : '') + runResult.error;
      }

      // 2. Validate against challenge test cases
      const validationResults = await runAllTests(userCode, challenge.testCases, 'python');
      testResults = validationResults;
      allTestsPassed = validationResults.every(r => r.passed);
      if (!allTestsPassed) {
        hasFailedAttempt = true;
      }
      isPerfect = !hasFailedAttempt && !gameState.isLessonCompleted(lesson.id) && allTestsPassed;

      // 3. Audio & state feedback
      if (allTestsPassed) {
        playSound('pass');
      } else {
        playSound('fail');
      }

      activeTab = 'testcases';
      updateTabs();

    } catch (err) {
      consoleOutput = `Execution Error: ${err.message}`;
      activeTab = 'console';
      updateTabs();
    } finally {
      isRunning = false;
      updateRunButton(false);
    }
  }

  function updateRunButton(running) {
    const runBtn = container.querySelector('#btn-run-code');
    if (!runBtn) return;
    runBtn.disabled = running;
    const label = runBtn.querySelector('.run-btn-label');
    if (label) {
      label.textContent = running ? 'RUNNING...' : 'EXECUTE CODE';
    }
    if (!running) {
      updateToolbarNavigation();
      bindPassedActionEvents();
    }
  }

  function updateTabs() {
    const tabCases = container.querySelector('#tab-testcases');
    const tabConsole = container.querySelector('#tab-console');
    if (tabCases && tabConsole) {
      tabCases.classList.toggle('active', activeTab === 'testcases');
      tabConsole.classList.toggle('active', activeTab === 'console');
    }

    const scopeState = container.querySelector('.scope-status-pill');
    if (scopeState) {
      if (isRunning) {
        scopeState.textContent = 'Running...';
        scopeState.className = 'scope-status-pill running';
      } else if (testResults) {
        scopeState.textContent = allTestsPassed ? 'Passed 100%' : 'Assert Failed';
        scopeState.className = `scope-status-pill ${allTestsPassed ? 'pass' : 'fail'}`;
      } else {
        scopeState.textContent = 'Ready';
        scopeState.className = 'scope-status-pill idle';
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
            <span>← Previous</span>
          </button>
        ` : ''}
        <button class="tactile-btn btn-continue-ready btn-success nav-btn-next" id="btn-toolbar-next" title="Advance to Next Level">
          <span>Go to Next Level</span>
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
        <div class="test-placeholder">
          <span class="placeholder-caption">Click Execute Code or press Ctrl+Enter to test your solution</span>
        </div>
      `;
    }

    return `
      <div class="test-results-rack">
        ${allTestsPassed ? `
          <div class="test-suite-success-strip">
            <div class="success-strip-message">
              <span class="status-indicator pass"></span>
              <span class="success-strip-txt">All test assertions passed successfully!</span>
            </div>
            <div class="success-strip-actions">
              ${onPrevious ? `
                <button class="tactile-btn btn-secondary nav-prev-btn" id="btn-banner-prev">
                  <span>← Previous</span>
                </button>
              ` : ''}
              <button class="tactile-btn btn-continue-ready btn-success nav-next-btn" id="btn-banner-next">
                <span>Go to Next Level</span>
                <span class="submit-key">→</span>
              </button>
            </div>
          </div>
        ` : ''}

        ${testResults.map((result, idx) => `
          <div class="test-result-card ${result.passed ? 'pass' : 'fail'}">
            <div class="test-card-header">
              <span class="test-status-badge ${result.passed ? 'pass' : 'fail'}">
                ${result.passed ? '✓' : '✗'}
              </span>
              <span class="test-card-label">Test Case #${idx + 1}</span>
              <span class="test-status-pill ${result.passed ? 'pass' : 'fail'}">${result.passed ? 'PASSED' : 'FAILED'}</span>
            </div>
            <div class="test-card-body">
              <div class="test-io-col">
                <span class="io-tag">Your Output:</span>
                <pre class="io-val">${escapeHtml(result.actual || '')}</pre>
              </div>
              <div class="test-io-col expected">
                <span class="io-tag">Expected:</span>
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
      <div class="console-output-well">
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

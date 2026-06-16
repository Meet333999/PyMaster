// ========================================
// Challenge View — Code Challenge + Test Cases
// ========================================

import { createCodeEditor, getEditorValue, setEditorValue } from './code-editor.js';
import { runPython, isPyodideReady } from '../engine/pyodide-runner.js';
import { runAllTests } from '../engine/validator.js';
import { gameState } from '../engine/state.js';
import { icon } from './icons.js';

export function renderChallengeView(container, lesson, section, chapter, callbacks) {
  const { onComplete, onBack } = callbacks;
  const challenge = lesson.challenge;
  let activeTab = 'testcases'; // 'testcases' | 'console'
  let testResults = null;
  let consoleOutput = '';
  let isRunning = false;
  let hintsOpen = new Set();
  let allTestsPassed = false;

  container.innerHTML = `
    <div class="challenge-container">
      <!-- Left Panel: Challenge Description -->
      <div class="challenge-left">
        <div class="challenge-header">
          <button class="back-btn" id="challenge-back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div class="challenge-header-info">
            <span class="lesson-breadcrumb">${section.title} › ${chapter.title}</span>
            <h1 class="lesson-title">${lesson.title}</h1>
          </div>
          <div class="challenge-stats">
            <span class="difficulty-badge difficulty-${lesson.difficulty}">${capitalizeFirst(lesson.difficulty)}</span>
            <span class="xp-badge">+${lesson.xp} XP</span>
          </div>
        </div>

        <!-- Challenge Description -->
        <div class="challenge-body">
          <div class="challenge-section">
            <h3 class="challenge-section-title">
              <span class="section-icon">${icon('trophy', 16)}</span> Challenge
            </h3>
            <div class="challenge-description">
              ${formatDescription(challenge.description)}
            </div>
            <button class="explain-btn" id="btn-explain">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Explain challenge
            </button>
          </div>

          <!-- Hints Section -->
          <div class="hints-section">
            <h3 class="challenge-section-title">
              <span class="section-icon">${icon('lightbulb', 16)}</span> Hints
            </h3>
            <div class="hints-list" id="hints-list">
              ${challenge.hints.map((hint, idx) => `
                <div class="hint-item ${hintsOpen.has(idx) ? 'open' : ''}" data-hint-idx="${idx}">
                  <button class="hint-header">
                    <span>Hint ${idx + 1}</span>
                    <svg class="hint-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        </div>
      </div>

      <!-- Right Panel: Code Editor + Test Cases -->
      <div class="challenge-right">
        <!-- Code Editor -->
        <div class="editor-wrapper" id="editor-wrapper"></div>

        <!-- Test Cases Panel -->
        <div class="test-cases-panel">
          <div class="test-tabs">
            <button class="test-tab ${activeTab === 'testcases' ? 'active' : ''}" id="tab-testcases">
              TEST CASES
              ${testResults ? (allTestsPassed
                ? '<span class="test-status-icon pass">✓</span>'
                : '<span class="test-status-icon fail">✗</span>')
              : ''}
            </button>
            <button class="test-tab ${activeTab === 'console' ? 'active' : ''}" id="tab-console">
              CONSOLE
            </button>
          </div>
          <div class="test-content" id="test-content">
            ${activeTab === 'testcases' ? renderTestCases() : renderConsole()}
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize code editor using saved code if available, and autosave on change
  const initialCode = gameState.getCode(lesson.id, challenge.starterCode);
  const editorWrapper = container.querySelector('#editor-wrapper');
  createCodeEditor(editorWrapper, initialCode, {
    showAskAI: true,
    onChange: (code) => {
      gameState.saveCode(lesson.id, code);
    }
  });

  // Event Listeners
  setupEventListeners();

  function setupEventListeners() {
    // Back button
    container.querySelector('#challenge-back-btn')?.addEventListener('click', onBack);

    // Tab switching
    container.querySelector('#tab-testcases')?.addEventListener('click', () => {
      activeTab = 'testcases';
      updateTabs();
    });
    container.querySelector('#tab-console')?.addEventListener('click', () => {
      activeTab = 'console';
      updateTabs();
    });

    // Run code button
    container.querySelector('#btn-run-code')?.addEventListener('click', handleRunCode);

    // Ask AI button
    container.querySelector('#btn-ask-ai')?.addEventListener('click', handleAskAI);

    // Explain button
    container.querySelector('#btn-explain')?.addEventListener('click', handleExplain);

    // Hint toggles
    container.querySelectorAll('.hint-header').forEach(btn => {
      btn.addEventListener('click', () => {
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

    // Keyboard shortcut: Ctrl+Enter to run
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    });
  }

  async function handleRunCode() {
    if (isRunning) return;

    const runBtn = container.querySelector('#btn-run-code');
    if (!runBtn) return;

    isRunning = true;
    runBtn.classList.add('running');
    runBtn.innerHTML = `
      <div class="spinner"></div>
      Running...
    `;

    const code = getEditorValue();

    try {
      if (!isPyodideReady()) {
        consoleOutput = 'Loading Python environment... Please wait and try again.';
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

      // Run test cases
      if (!firstError) {
        testResults = runAllTests(challenge.testCases, actualOutputs);
        allTestsPassed = testResults.every(t => t.passed);

        activeTab = 'testcases';

        if (allTestsPassed) {
          const isPerfect = !hintsOpen.size; // Perfect if no hints used
          setTimeout(() => onComplete(isPerfect), 800);
        }
      } else {
        testResults = null;
        activeTab = 'console';
      }
    } catch (err) {
      consoleOutput = `Error: ${err.message}`;
      activeTab = 'console';
    } finally {
      isRunning = false;
      if (runBtn) {
        runBtn.classList.remove('running');
        runBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Run Code
        `;
      }
      updateTabs();
    }
  }

  function handleAskAI() {
    // Show first unopened hint as AI suggestion
    for (let i = 0; i < challenge.hints.length; i++) {
      if (!hintsOpen.has(i)) {
        hintsOpen.add(i);
        const item = container.querySelector(`.hint-item[data-hint-idx="${i}"]`);
        if (item) {
          item.classList.add('open');
          item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
    }
    // All hints open
    consoleOutput = 'All hints have been revealed. Try using them to solve the challenge!';
    activeTab = 'console';
    updateTabs();
  }

  function handleExplain() {
    consoleOutput = `Challenge Explanation:\n\n${challenge.description}\n\nTip: Check the hints section for step-by-step guidance.`;
    activeTab = 'console';
    updateTabs();
  }

  function updateTabs() {
    const tabs = container.querySelectorAll('.test-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    if (activeTab === 'testcases') {
      container.querySelector('#tab-testcases')?.classList.add('active');
    } else {
      container.querySelector('#tab-console')?.classList.add('active');
    }

    // Update tab badge
    const testTab = container.querySelector('#tab-testcases');
    if (testTab && testResults) {
      const badge = testTab.querySelector('.test-status-icon');
      if (badge) badge.remove();
      testTab.insertAdjacentHTML('beforeend',
        allTestsPassed
          ? '<span class="test-status-icon pass">✓</span>'
          : '<span class="test-status-icon fail">✗</span>'
      );
    }

    const content = container.querySelector('#test-content');
    if (content) {
      content.innerHTML = activeTab === 'testcases' ? renderTestCases() : renderConsole();
    }
  }

  function renderTestCases() {
    if (!testResults) {
      return `
        <div class="test-placeholder">
          <p>Run your code to see test results</p>
        </div>
      `;
    }

    return `
      <div class="test-results">
        ${testResults.map((result, idx) => `
          <div class="test-result ${result.passed ? 'pass' : 'fail'}">
            <div class="test-result-header">
              <span class="test-result-icon">${result.passed ? icon('check-circle', 16) : icon('x-circle', 16)}</span>
              <span class="test-result-label">Test ${idx + 1}</span>
            </div>
            <div class="test-result-body">
              <div class="output-col">
                <span class="col-label">Output</span>
                <pre class="col-value">${escapeHtml(result.actual)}</pre>
              </div>
              <div class="expected-col">
                <span class="col-label">Expected Output</span>
                <pre class="col-value">${escapeHtml(result.expected)}</pre>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderConsole() {
    return `
      <div class="console-output">
        <pre>${consoleOutput ? escapeHtml(consoleOutput) : 'Console output will appear here...'}</pre>
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

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

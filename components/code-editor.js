// ==========================================================================
// PyMaster — Skeuomorphic Code Editor Console
// Monaco wrapper with dual skeuomorphic light/dark themes and tactile controls
// ==========================================================================

import { icon } from './icons.js';
import { getCurrentTheme } from '../engine/theme.js';
import { playSound } from '../engine/haptics.js';

let editorInstance = null;

export function createCodeEditor(container, initialCode = '', options = {}) {
  const editorId = 'monaco-editor-' + Date.now();

  const editorLanguage = options.language || 'python';
  const editorTabLabel = options.tabLabel || (editorLanguage === 'sql' ? 'SQL' : 'Python');
  const editorTabIcon = editorLanguage === 'sql' ? icon('database', 14) : icon('terminal', 14);

  const currentTheme = getCurrentTheme();
  const monacoThemeName = currentTheme === 'light' ? 'pymaster-skeuo-light' : 'pymaster-skeuo-dark';

  container.innerHTML = `
    <div class="editor-container modern-card-panel">
      <!-- Editor Header Strip -->
      <div class="editor-header">
        <div class="editor-tabs-group">
          <div class="editor-tab active">
            <span class="editor-tab-icon">${editorTabIcon}</span>
            <span class="editor-tab-text">${editorLanguage === 'sql' ? 'solution.sql' : 'solution.py'}</span>
          </div>
        </div>

        <div class="editor-actions">
          <button class="tactile-icon-btn" id="btn-copy-code" title="Copy code">
            ${icon('clipboard', 14)}
          </button>
          <button class="tactile-icon-btn" id="btn-reset-code" title="Reset to starter code">
            ${icon('refresh', 14)}
          </button>
        </div>
      </div>

      <!-- Editor Canvas Well -->
      <div class="editor-bezel-well">
        <div class="editor-body" id="${editorId}"></div>
      </div>

      <!-- Bottom Execution Toolbar -->
      <div class="editor-toolbar">
        <div class="editor-specs-pill">
          <span class="spec-dot"></span>
          <span class="spec-txt">${editorLanguage === 'sql' ? 'SQLite 3 (WASM)' : 'Python 3.11 (WASM)'}</span>
        </div>

        <div class="editor-buttons-rack">
          <button class="tactile-run-btn" id="btn-run-code">
            <span class="run-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </span>
            <span class="run-label run-btn-label">${editorLanguage === 'sql' ? 'EXECUTE SQL' : 'EXECUTE CODE'}</span>
            <span class="run-shortcut">Ctrl+↵</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const editorContainer = document.getElementById(editorId);

  if (typeof monaco !== 'undefined') {
    if (editorInstance) {
      editorInstance.dispose();
    }

    editorInstance = monaco.editor.create(editorContainer, {
      value: initialCode,
      language: editorLanguage,
      theme: monacoThemeName,
      minimap: { enabled: false },
      fontSize: 14,
      fontFamily: "'JetBrains Mono', monospace",
      lineHeight: 22,
      padding: { top: 16, bottom: 16 },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      insertSpaces: true,
      wordWrap: 'on',
      lineNumbers: 'on',
      glyphMargin: false,
      folding: false,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
      renderWhitespace: 'none',
      overviewRulerLanes: 0,
      hideCursorInOverviewRuler: true,
      overviewRulerBorder: false,
      scrollbar: {
        vertical: 'auto',
        horizontal: 'hidden',
        verticalScrollbarSize: 8,
      },
    });

    window.__pymaster_editor = editorInstance;

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        if (editorInstance) {
          editorInstance.layout();
        }
      });
      resizeObserver.observe(editorContainer);
      editorInstance._resizeObserver = resizeObserver;
    }

    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (editorInstance) {
          editorInstance.layout();
        }
      });
    }

    editorInstance.onDidChangeModelContent(() => {
      if (typeof options.onChange === 'function') {
        options.onChange(editorInstance.getValue());
      }
    });

    // Theme change listener
    const onThemeChange = (e) => {
      const theme = e.detail?.theme || getCurrentTheme();
      monaco.editor.setTheme(theme === 'light' ? 'pymaster-skeuo-light' : 'pymaster-skeuo-dark');
    };
    window.addEventListener('pymaster-theme-changed', onThemeChange);
    editorInstance._themeListener = onThemeChange;

  } else {
    // Fallback: use textarea
    editorContainer.innerHTML = `
      <textarea class="fallback-editor" id="fallback-textarea"
                spellcheck="false"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off">${escapeHtml(initialCode)}</textarea>
    `;

    const textarea = document.getElementById('fallback-textarea');
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }
    });

    textarea.addEventListener('input', () => {
      if (typeof options.onChange === 'function') {
        options.onChange(textarea.value);
      }
    });
  }

  // Copy button
  const copyBtn = container.querySelector('#btn-copy-code');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      playSound('click');
      const code = getEditorValue();
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.innerHTML = '✓';
        setTimeout(() => {
          copyBtn.innerHTML = icon('clipboard', 14);
        }, 1500);
      });
    });
  }

  // Reset button
  const resetBtn = container.querySelector('#btn-reset-code');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      playSound('switch');
      setEditorValue(initialCode);
    });
  }

  return {
    getValue: getEditorValue,
    setValue: setEditorValue,
    getContainer: () => container,
  };
}

export function getEditorValue() {
  if (editorInstance) {
    return editorInstance.getValue();
  }
  const textarea = document.getElementById('fallback-textarea');
  return textarea ? textarea.value : '';
}

export function setEditorValue(code) {
  if (editorInstance) {
    editorInstance.setValue(code);
  } else {
    const textarea = document.getElementById('fallback-textarea');
    if (textarea) textarea.value = code;
  }
}

export function disposeEditor() {
  if (editorInstance) {
    if (editorInstance._themeListener) {
      window.removeEventListener('pymaster-theme-changed', editorInstance._themeListener);
    }
    if (editorInstance._resizeObserver) {
      editorInstance._resizeObserver.disconnect();
    }
    editorInstance.dispose();
    editorInstance = null;
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

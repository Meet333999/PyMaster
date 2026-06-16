// ========================================
// Code Editor — Monaco Editor Wrapper
// ========================================

import { icon } from './icons.js';

let editorInstance = null;

export function createCodeEditor(container, initialCode = '', options = {}) {
  const editorId = 'monaco-editor-' + Date.now();

  container.innerHTML = `
    <div class="editor-container">
      <div class="editor-header">
        <div class="editor-tab active">
          <span class="editor-tab-icon">${icon('terminal', 14)}</span>
          <span>Python</span>
        </div>
        <div class="editor-actions">
          <button class="editor-action-btn" id="btn-copy-code" title="Copy code">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button class="editor-action-btn" id="btn-reset-code" title="Reset code">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="editor-body" id="${editorId}"></div>
      <div class="editor-toolbar">
        ${options.showAskAI !== false ? `
          <button class="btn-ask-ai" id="btn-ask-ai">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Ask AI
          </button>
        ` : ''}
        <button class="btn-run" id="btn-run-code">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Run Code
        </button>
      </div>
    </div>
  `;

  // Try to create Monaco editor
  const editorContainer = document.getElementById(editorId);

  if (typeof monaco !== 'undefined') {
    // Destroy previous instance
    if (editorInstance) {
      editorInstance.dispose();
    }

    editorInstance = monaco.editor.create(editorContainer, {
      value: initialCode,
      language: 'python',
      theme: 'pymaster-dark',
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

    // Automatically lay out editor when container size changes to prevent misplaced cursor
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        if (editorInstance) {
          editorInstance.layout();
        }
      });
      resizeObserver.observe(editorContainer);
      editorInstance._resizeObserver = resizeObserver;
    }

    // Trigger layout recalculation once web fonts (like JetBrains Mono) are loaded to prevent misplaced cursor
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (editorInstance) {
          editorInstance.layout();
        }
      });
    }

    // Trigger change callback
    editorInstance.onDidChangeModelContent(() => {
      if (typeof options.onChange === 'function') {
        options.onChange(editorInstance.getValue());
      }
    });
  } else {
    // Fallback: use textarea
    editorContainer.innerHTML = `
      <textarea class="fallback-editor" id="fallback-textarea"
                spellcheck="false"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off">${escapeHtml(initialCode)}</textarea>
    `;

    // Handle Tab key in textarea
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

    // Handle typing in textarea
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
      const code = getEditorValue();
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.innerHTML = '✓';
        setTimeout(() => {
          copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
        }, 1500);
      });
    });
  }

  // Reset button
  const resetBtn = container.querySelector('#btn-reset-code');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
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

// ========================================
// Lesson View — Theory + Quiz Panel
// ========================================

export function renderLessonView(container, lesson, section, chapter, callbacks) {
  const { onComplete, onBack } = callbacks;
  let showTldr = false;
  let quizAnswered = false;
  let selectedOption = null;

  function render() {
    const hasQuiz = lesson.quiz;
    const theory = lesson.theory || {};

    container.innerHTML = `
      <div class="lesson-container">
        <!-- Left Panel: Theory -->
        <div class="lesson-left">
          <!-- Header -->
          <div class="lesson-header">
            <button class="back-btn" id="lesson-back-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <div class="lesson-header-info">
              <span class="lesson-breadcrumb">${section.title} › ${chapter.title}</span>
              <h1 class="lesson-title">${lesson.title}</h1>
            </div>
          </div>

          <!-- Theory Content -->
          <div class="theory-section">
            <div class="theory-title-row">
              <h2 class="theory-heading">${lesson.title}</h2>
              <div class="tldr-controls">
                <button class="tldr-btn ${showTldr ? '' : 'active'}" id="btn-show-full">Full</button>
                <button class="tldr-btn ${showTldr ? 'active' : ''}" id="btn-show-tldr">TL;DR</button>
              </div>
            </div>

            <div class="theory-content">
              ${showTldr && theory.tldr
                ? `<div class="tldr-box"><p>${theory.tldr}</p></div>`
                : formatTheoryContent(theory.content || '')}
            </div>

            ${theory.codeExample ? `
              <div class="code-block">
                <div class="code-block-header">
                  <span>Example</span>
                  <button class="code-copy-btn" id="btn-copy-example">Copy</button>
                </div>
                <pre><code>${escapeHtml(theory.codeExample)}</code></pre>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Right Panel: Quiz or Interactive -->
        <div class="lesson-right">
          ${hasQuiz ? renderQuizPanel(lesson.quiz) : renderCompletePanel()}
        </div>
      </div>
    `;

    // Event listeners
    const backBtn = container.querySelector('#lesson-back-btn');
    backBtn?.addEventListener('click', onBack);

    const tldrBtn = container.querySelector('#btn-show-tldr');
    const fullBtn = container.querySelector('#btn-show-full');
    tldrBtn?.addEventListener('click', () => { showTldr = true; render(); });
    fullBtn?.addEventListener('click', () => { showTldr = false; render(); });

    const copyBtn = container.querySelector('#btn-copy-example');
    copyBtn?.addEventListener('click', () => {
      navigator.clipboard.writeText(lesson.theory.codeExample || '');
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
    });

    // Quiz option handlers
    if (hasQuiz) {
      container.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', () => {
          if (quizAnswered) return;
          selectedOption = parseInt(opt.dataset.index);
          container.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');

          // Enable submit button
          const submitBtn = container.querySelector('#quiz-submit-btn');
          if (submitBtn) submitBtn.disabled = false;
        });
      });

      const submitBtn = container.querySelector('#quiz-submit-btn');
      submitBtn?.addEventListener('click', () => {
        if (selectedOption === null || quizAnswered) return;
        quizAnswered = true;

        const correct = lesson.quiz.correct;
        const options = container.querySelectorAll('.quiz-option');

        options.forEach((opt, idx) => {
          if (idx === correct) opt.classList.add('correct');
          if (idx === selectedOption && idx !== correct) opt.classList.add('incorrect');
          opt.style.pointerEvents = 'none';
        });

        // Show explanation
        const explanationEl = container.querySelector('.quiz-explanation');
        if (explanationEl) {
          explanationEl.classList.add('visible');
        }

        // Enable continue after brief delay
        setTimeout(() => {
          onComplete();
        }, 1500);
      });
    }

    // Complete button for non-quiz lessons
    const completeBtn = container.querySelector('#lesson-complete-btn');
    completeBtn?.addEventListener('click', () => {
      onComplete();
    });
  }

  function renderQuizPanel(quiz) {
    return `
      <div class="quiz-container">
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${quizAnswered ? '100' : '50'}%"></div>
        </div>

        <div class="quiz-question-card">
          <p class="quiz-question">${quiz.question}</p>

          <div class="quiz-options">
            ${quiz.options.map((opt, idx) => `
              <div class="quiz-option ${selectedOption === idx ? 'selected' : ''}"
                   data-index="${idx}"
                   role="button" tabindex="0">
                <span class="quiz-option-number">${idx + 1}</span>
                <span class="quiz-option-text">${opt}</span>
              </div>
            `).join('')}
          </div>

          <div class="quiz-explanation ${quizAnswered ? 'visible' : ''}">
            <p>${quiz.explanation || ''}</p>
          </div>
        </div>

        <button class="submit-btn" id="quiz-submit-btn" ${selectedOption === null ? 'disabled' : ''}>
          SUBMIT <span class="submit-key">Enter ↵</span>
        </button>
      </div>
    `;
  }

  function renderCompletePanel() {
    return `
      <div class="complete-panel">
        <div class="complete-icon">📖</div>
        <h3>Theory Lesson</h3>
        <p>Read the theory on the left, then mark this lesson as complete.</p>
        <button class="btn-primary btn-large" id="lesson-complete-btn">
          Mark Complete ✓
        </button>
      </div>
    `;
  }

  render();
}

function formatTheoryContent(content) {
  if (!content) return '';

  // Convert markdown-like content to HTML
  let html = content
    // Code blocks
    .replace(/```python\n([\s\S]*?)```/g, '<pre class="inline-code-block"><code>$1</code></pre>')
    .replace(/```\n([\s\S]*?)```/g, '<pre class="inline-code-block"><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Line breaks to paragraphs
    .split('\n\n').map(p => {
      if (p.startsWith('<pre') || p.startsWith('<div')) return p;
      return `<p>${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');

  return html;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

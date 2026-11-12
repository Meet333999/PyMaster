// ==========================================================================
// Code Level / PyMaster — Modern Lesson View
// Clean dual-panel layout: Structured Learning Manual + Verification Quiz
// ==========================================================================

import { icon } from './icons.js';
import { playSound } from '../engine/haptics.js';

export function renderLessonView(container, lesson, section, chapter, callbacks) {
  const { onComplete, onPrevious, onBack, hasPrevious } = callbacks;
  let showTldr = false;
  let quizAnswered = false;
  let selectedOption = null;

  function cleanup() {
    document.removeEventListener('keydown', keyHandler);
  }

  function handleComplete() {
    cleanup();
    onComplete();
  }

  function handlePrevious() {
    if (typeof onPrevious === 'function') {
      cleanup();
      onPrevious();
    }
  }

  function handleBack() {
    cleanup();
    onBack();
  }

  function keyHandler(e) {
    if (e.key === 'Enter') {
      const continueBtn = container.querySelector('#quiz-continue-btn');
      if (continueBtn) {
        continueBtn.click();
        return;
      }
      const completeBtn = container.querySelector('#lesson-complete-btn');
      if (completeBtn) {
        completeBtn.click();
        return;
      }
      const submitBtn = container.querySelector('#quiz-submit-btn');
      if (submitBtn && !submitBtn.disabled) {
        submitBtn.click();
      }
    }
  }

  function render() {
    const hasQuiz = Boolean(lesson.quiz);
    const theory = lesson.theory || {};

    container.innerHTML = `
      <div class="lesson-container">
        <!-- Mobile Bay Switcher: THEORY vs QUIZ -->
        <div class="mobile-bay-switcher segmented-pill-container" role="tablist">
          <button class="segmented-pill-option active" id="btn-lesson-bay-theory" role="tab" aria-selected="true">
            <span>LESSON CONTENT</span>
          </button>
          <button class="segmented-pill-option" id="btn-lesson-bay-exercise" role="tab" aria-selected="false">
            <span>${hasQuiz ? 'KNOWLEDGE CHECK' : 'VERIFICATION'}</span>
          </button>
        </div>

        <!-- ── Left Panel: Lesson Specification Manual ── -->
        <div class="lesson-left modern-card-panel" id="lesson-bay-left">
          <!-- Lesson Header Bar -->
          <div class="lesson-header modern-header-bar">
            <div class="header-nav-group">
              <button class="tactile-btn back-btn" id="lesson-back-btn" title="Back to Curriculum">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              ${onPrevious ? `
                <button class="tactile-btn nav-prev-btn" id="lesson-header-prev-btn" title="Previous Level">
                  <span>← Prev</span>
                </button>
              ` : ''}
            </div>
            <div class="lesson-header-info">
              <span class="lesson-breadcrumb">${section.title} > ${chapter.title}</span>
              <h1 class="lesson-title">${lesson.title}</h1>
            </div>
            <span class="lesson-type-badge">${lesson.type ? lesson.type.toUpperCase() : 'THEORY'}</span>
          </div>

          <!-- Theory Content Module -->
          <div class="theory-section">
            <div class="theory-title-row">
              <div class="theory-heading-group">
                <h2 class="theory-heading">${lesson.title}</h2>
                <span class="theory-subtag">Concept & Usage</span>
              </div>

              <!-- Segmented Pill Control: Standard | TL;DR -->
              <div class="segmented-pill-container" role="radiogroup" aria-label="Reading Mode">
                <button class="segmented-pill-option ${!showTldr ? 'active' : ''}" id="btn-show-full" role="radio" aria-checked="${!showTldr}">
                  Standard
                </button>
                <button class="segmented-pill-option ${showTldr ? 'active' : ''}" id="btn-show-tldr" role="radio" aria-checked="${showTldr}">
                  TL;DR
                </button>
              </div>
            </div>

            <!-- Theory Content Well -->
            <div class="theory-content modern-content-card">
              ${showTldr && theory.tldr
                ? `<div class="tldr-box"><p>${theory.tldr}</p></div>`
                : formatTheoryContent(theory.content || '')}
            </div>

            ${theory.codeExample ? `
              <!-- Syntax Code Specimen Card -->
              <div class="code-block modern-code-card">
                <div class="code-block-header">
                  <div class="terminal-dots">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                  </div>
                  <span class="terminal-title">example.py</span>
                  <button class="tactile-btn code-copy-btn" id="btn-copy-example" title="Copy code">
                    ${icon('clipboard', 13)}
                    <span>Copy</span>
                  </button>
                </div>
                <pre class="code-block-body"><code>${escapeHtml(theory.codeExample)}</code></pre>
              </div>
            ` : ''}

            <!-- Mobile Quick Action to jump to Quiz -->
            <div class="mobile-code-action-strip">
              <button class="tactile-btn btn-primary" id="mobile-switch-to-exercise-btn">
                <span>PROCEED TO ${hasQuiz ? 'QUIZ' : 'COMPLETION'}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ── Right Panel: Quiz / Verification Console ── -->
        <div class="lesson-right modern-card-panel" id="lesson-bay-right">
          ${hasQuiz ? renderQuizPanel(lesson.quiz) : renderCompletePanel()}
        </div>
      </div>
    `;

    // Mobile Bay Switcher Logic
    const bayTheoryBtn = container.querySelector('#btn-lesson-bay-theory');
    const bayExerciseBtn = container.querySelector('#btn-lesson-bay-exercise');
    const mobileToExerciseBtn = container.querySelector('#mobile-switch-to-exercise-btn');
    const lessonContainer = container.querySelector('.lesson-container');

    function setLessonMobileBay(bay) {
      playSound('click');
      if (bay === 'exercise') {
        lessonContainer?.classList.add('mobile-show-exercise');
        bayTheoryBtn?.classList.remove('active');
        bayExerciseBtn?.classList.add('active');
        bayTheoryBtn?.setAttribute('aria-selected', 'false');
        bayExerciseBtn?.setAttribute('aria-selected', 'true');
      } else {
        lessonContainer?.classList.remove('mobile-show-exercise');
        bayExerciseBtn?.classList.remove('active');
        bayTheoryBtn?.classList.add('active');
        bayTheoryBtn?.setAttribute('aria-selected', 'true');
        bayExerciseBtn?.setAttribute('aria-selected', 'false');
      }
    }

    bayTheoryBtn?.addEventListener('click', () => setLessonMobileBay('theory'));
    bayExerciseBtn?.addEventListener('click', () => setLessonMobileBay('exercise'));
    mobileToExerciseBtn?.addEventListener('click', () => setLessonMobileBay('exercise'));

    // Back & prev button listeners
    container.querySelector('#lesson-back-btn')?.addEventListener('click', () => {
      playSound('click');
      handleBack();
    });

    container.querySelector('#lesson-header-prev-btn')?.addEventListener('click', () => {
      playSound('click');
      handlePrevious();
    });

    // Pill Switcher full / tldr
    container.querySelector('#btn-show-full')?.addEventListener('click', () => {
      if (showTldr) {
        playSound('click');
        showTldr = false;
        render();
      }
    });

    container.querySelector('#btn-show-tldr')?.addEventListener('click', () => {
      if (!showTldr) {
        playSound('click');
        showTldr = true;
        render();
      }
    });

    // Copy example button
    const copyBtn = container.querySelector('#btn-copy-example');
    copyBtn?.addEventListener('click', () => {
      if (theory.codeExample) {
        navigator.clipboard.writeText(theory.codeExample).then(() => {
          playSound('click');
          const span = copyBtn.querySelector('span');
          if (span) span.textContent = 'Copied!';
          setTimeout(() => {
            if (span) span.textContent = 'Copy';
          }, 1800);
        });
      }
    });

    // Quiz options handling
    if (hasQuiz) {
      const options = container.querySelectorAll('.quiz-option');
      options.forEach(opt => {
        opt.addEventListener('click', () => {
          if (quizAnswered) return;
          playSound('click');
          selectedOption = parseInt(opt.dataset.index, 10);
          options.forEach((o, i) => {
            const isSelected = i === selectedOption;
            o.classList.toggle('selected', isSelected);
          });

          const submitBtn = container.querySelector('#quiz-submit-btn');
          if (submitBtn) submitBtn.disabled = false;
        });
      });

      const submitBtn = container.querySelector('#quiz-submit-btn');
      submitBtn?.addEventListener('click', () => {
        if (selectedOption === null || quizAnswered) return;
        quizAnswered = true;

        const correct = lesson.quiz.correct;
        const isRight = selectedOption === correct;

        if (isRight) {
          playSound('pass');
        } else {
          playSound('fail');
        }

        const options = container.querySelectorAll('.quiz-option');
        options.forEach((opt, idx) => {
          if (idx === correct) {
            opt.classList.add('correct');
          }
          if (idx === selectedOption && idx !== correct) {
            opt.classList.add('incorrect');
          }
          opt.style.pointerEvents = 'none';
        });

        // Update progress bar
        const fill = container.querySelector('.quiz-progress-fill');
        if (fill) fill.style.width = '100%';

        const explanationEl = container.querySelector('.quiz-explanation');
        if (explanationEl) {
          explanationEl.classList.add('visible');
        }

        // Render explicit Previous & Continue buttons
        const actionsSlot = container.querySelector('.quiz-actions-container');
        if (actionsSlot) {
          if (isRight) {
            actionsSlot.innerHTML = `
              <div class="quiz-post-actions">
                ${onPrevious ? `
                  <button class="tactile-btn btn-secondary nav-prev-btn" id="quiz-prev-btn">
                    <span>← Previous</span>
                  </button>
                ` : ''}
                <button class="tactile-btn submit-btn btn-continue-ready btn-success" id="quiz-continue-btn">
                  <span>Continue to Next Level</span>
                  <span class="submit-key">→</span>
                </button>
              </div>
            `;
          } else {
            actionsSlot.innerHTML = `
              <div class="quiz-post-actions">
                ${onPrevious ? `
                  <button class="tactile-btn btn-secondary nav-prev-btn" id="quiz-prev-btn">
                    <span>← Previous</span>
                  </button>
                ` : ''}
                <button class="tactile-btn btn-secondary" id="quiz-retry-btn">
                  <span>↺ Retry</span>
                </button>
                <button class="tactile-btn submit-btn btn-continue-ready" id="quiz-continue-btn">
                  <span>Continue Anyway</span>
                  <span class="submit-key">→</span>
                </button>
              </div>
            `;

            const retryBtn = actionsSlot.querySelector('#quiz-retry-btn');
            retryBtn?.addEventListener('click', () => {
              playSound('click');
              quizAnswered = false;
              selectedOption = null;
              render();
            });
          }

          actionsSlot.querySelector('#quiz-prev-btn')?.addEventListener('click', () => {
            playSound('click');
            handlePrevious();
          });

          const continueBtn = actionsSlot.querySelector('#quiz-continue-btn');
          continueBtn?.addEventListener('click', () => {
            playSound('click');
            handleComplete();
          });
          continueBtn?.focus();
        }
      });
    }

    container.querySelector('#lesson-prev-btn')?.addEventListener('click', () => {
      playSound('click');
      handlePrevious();
    });

    const completeBtn = container.querySelector('#lesson-complete-btn');
    completeBtn?.addEventListener('click', () => {
      playSound('pass');
      handleComplete();
    });
  }

  function renderQuizPanel(quiz) {
    return `
      <div class="quiz-container">
        <!-- Progress Bar Header -->
        <div class="quiz-panel-header">
          <div class="quiz-header-tag">KNOWLEDGE CHECK</div>
          <div class="quiz-progress-track">
            <div class="quiz-progress-fill" style="width: ${quizAnswered ? '100' : '50'}%"></div>
          </div>
          <span class="quiz-step-tag">1 Question</span>
        </div>

        <div class="quiz-question-card modern-content-card">
          <p class="quiz-question">${quiz.question}</p>

          <div class="quiz-options">
            ${quiz.options.map((opt, idx) => `
              <div class="quiz-option ${selectedOption === idx ? 'selected' : ''}"
                   data-index="${idx}"
                   role="button" tabindex="0">
                <span class="quiz-option-number">0${idx + 1}</span>
                <span class="quiz-option-text">${opt}</span>
              </div>
            `).join('')}
          </div>

          <div class="quiz-explanation ${quizAnswered ? 'visible' : ''}">
            <div class="explanation-tag">
              <span class="explanation-indicator"></span>
              <span>Explanation</span>
            </div>
            <p>${quiz.explanation || ''}</p>
          </div>
        </div>

        <div class="quiz-actions-container">
          <button class="tactile-btn submit-btn" id="quiz-submit-btn" ${selectedOption === null ? 'disabled' : ''}>
            <span>Submit Answer</span>
            <span class="submit-key">↵</span>
          </button>
        </div>
      </div>
    `;
  }

  function renderCompletePanel() {
    return `
      <div class="complete-panel modern-content-card">
        <div class="complete-icon-box">
          ${icon('book', 36)}
        </div>
        <h3 class="complete-panel-title">Lesson Overview Complete</h3>
        <p class="complete-panel-desc">You have reviewed the key concepts for this topic. Ready to advance to the next step?</p>
        <div class="lesson-complete-actions">
          ${onPrevious ? `
            <button class="tactile-btn btn-secondary nav-prev-btn" id="lesson-prev-btn">
              <span>← Previous</span>
            </button>
          ` : ''}
          <button class="tactile-btn btn-primary btn-large btn-continue-ready btn-success" id="lesson-complete-btn">
            <span>Continue to Next Level</span>
            <span class="submit-key">→</span>
          </button>
        </div>
      </div>
    `;
  }

  // Remove any stale keydown listeners and attach fresh
  document.removeEventListener('keydown', keyHandler);
  document.addEventListener('keydown', keyHandler);

  render();
}

function formatTheoryContent(content) {
  if (!content) return '';

  let html = content
    .replace(/```python\n([\s\S]*?)```/g, '<pre class="inline-code-block"><code>$1</code></pre>')
    .replace(/```\n([\s\S]*?)```/g, '<pre class="inline-code-block"><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
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

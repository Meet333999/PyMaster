// ==========================================================================
// PyMaster — Skeuomorphic Lesson View Deck
// Dual-panel hardware layout: Technical manual + Verification terminal
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
        <!-- Mobile Bay Switcher: THEORY vs EXERCISE/QUIZ -->
        <div class="mobile-bay-switcher segmented-pill-container" role="tablist">
          <button class="segmented-pill-option active" id="btn-lesson-bay-theory" role="tab" aria-selected="true">
            <span>THEORY SPEC</span>
          </button>
          <button class="segmented-pill-option" id="btn-lesson-bay-exercise" role="tab" aria-selected="false">
            <span>${hasQuiz ? 'EVAL QUIZ' : 'VERIFICATION'}</span>
          </button>
        </div>

        <!-- ── Left Panel: Technical Specification Manual ── -->
        <div class="lesson-left hardware-chassis-panel" id="lesson-bay-left">
          <!-- Hardware Header Bar -->
          <div class="lesson-header hardware-header-bar">
            <div class="header-nav-group">
              <button class="tactile-btn back-btn" id="lesson-back-btn" title="Return to Matrix">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              ${onPrevious ? `
                <button class="tactile-btn nav-prev-btn" id="lesson-header-prev-btn" title="Previous Level">
                  <span>←&nbsp;PREV</span>
                </button>
              ` : ''}
            </div>
            <div class="lesson-header-info">
              <span class="lesson-breadcrumb">${section.title.toUpperCase()} // ${chapter.title.toUpperCase()}</span>
              <h1 class="lesson-title">${lesson.title}</h1>
            </div>
            <div class="module-spec-tag">DOC-SPEC</div>
          </div>

          <!-- Theory Content Module -->
          <div class="theory-section">
            <div class="theory-title-row">
              <div class="theory-heading-group">
                <h2 class="theory-heading">${lesson.title}</h2>
                <span class="theory-subtag">SPECIFICATION OVERVIEW</span>
              </div>

              <!-- Segmented Pill Control: Full | TL;DR (Ref Image Style) -->
              <div class="segmented-pill-container" role="radiogroup" aria-label="Documentation Detail">
                <button class="segmented-pill-option ${!showTldr ? 'active' : ''}" id="btn-show-full" role="radio" aria-checked="${!showTldr}">
                  Standard
                </button>
                <button class="segmented-pill-option ${showTldr ? 'active' : ''}" id="btn-show-tldr" role="radio" aria-checked="${showTldr}">
                  TL;DR
                </button>
              </div>
            </div>

            <!-- Recessed Theory Content Cavity -->
            <div class="theory-content skeuo-inset-well">
              ${showTldr && theory.tldr
                ? `<div class="tldr-box"><p>${theory.tldr}</p></div>`
                : formatTheoryContent(theory.content || '')}
            </div>

            ${theory.codeExample ? `
              <!-- Recessed Code Sample Block -->
              <div class="code-block skeuo-terminal-screen">
                <div class="code-block-header">
                  <div class="terminal-dots">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                  </div>
                  <span class="terminal-title">CODE_SPECIMEN.py</span>
                  <button class="tactile-btn code-copy-btn" id="btn-copy-example">
                    ${icon('clipboard', 12)} Copy
                  </button>
                </div>
                <pre class="code-block-body"><code>${escapeHtml(theory.codeExample)}</code></pre>
              </div>
            ` : ''}

            <!-- Mobile Quick Action to jump to Quiz/Workbench -->
            <div class="mobile-code-action-strip">
              <button class="tactile-btn btn-primary" id="mobile-switch-to-exercise-btn">
                <span>PROCEED TO ${hasQuiz ? 'EVAL QUIZ' : 'VERIFICATION'}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ── Right Panel: Hardware Verification & Quiz Console ── -->
        <div class="lesson-right hardware-chassis-panel" id="lesson-bay-right">
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

    // Event listeners
    container.querySelector('#lesson-back-btn')?.addEventListener('click', () => {
      playSound('click');
      handleBack();
    });

    container.querySelector('#lesson-header-prev-btn')?.addEventListener('click', () => {
      playSound('click');
      handlePrevious();
    });

    const tldrBtn = container.querySelector('#btn-show-tldr');
    const fullBtn = container.querySelector('#btn-show-full');
    tldrBtn?.addEventListener('click', () => {
      playSound('snap');
      showTldr = true;
      render();
    });
    fullBtn?.addEventListener('click', () => {
      playSound('snap');
      showTldr = false;
      render();
    });

    const copyBtn = container.querySelector('#btn-copy-example');
    copyBtn?.addEventListener('click', () => {
      playSound('click');
      navigator.clipboard.writeText(lesson.theory.codeExample || '');
      copyBtn.textContent = 'Copied!';
      setTimeout(() => { copyBtn.innerHTML = `${icon('clipboard', 12)} Copy`; }, 1500);
    });

    // Quiz option handlers
    if (hasQuiz) {
      container.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', () => {
          if (quizAnswered) return;
          playSound('click');
          selectedOption = parseInt(opt.dataset.index);
          container.querySelectorAll('.quiz-option').forEach(o => {
            o.classList.remove('selected');
            const led = o.querySelector('.option-status-led');
            if (led) led.className = 'option-status-led status-idle';
          });
          opt.classList.add('selected');
          const myLed = opt.querySelector('.option-status-led');
          if (myLed) myLed.className = 'option-status-led status-blue';

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
          const led = opt.querySelector('.option-status-led');
          if (idx === correct) {
            opt.classList.add('correct');
            if (led) led.className = 'option-status-led status-green';
          }
          if (idx === selectedOption && idx !== correct) {
            opt.classList.add('incorrect');
            if (led) led.className = 'option-status-led status-red';
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

        // Render explicit tactile Previous & Continue buttons
        const actionsSlot = container.querySelector('.quiz-actions-container');
        if (actionsSlot) {
          if (isRight) {
            actionsSlot.innerHTML = `
              <div class="quiz-post-actions">
                ${onPrevious ? `
                  <button class="tactile-btn btn-secondary nav-prev-btn" id="quiz-prev-btn">
                    <span>← PREVIOUS</span>
                  </button>
                ` : ''}
                <button class="tactile-btn submit-btn btn-continue-ready btn-success" id="quiz-continue-btn">
                  <span class="btn-led status-green pulse-green"></span>
                  <span>CONTINUE TO NEXT LEVEL</span>
                  <span class="submit-key">→</span>
                </button>
              </div>
            `;
          } else {
            actionsSlot.innerHTML = `
              <div class="quiz-post-actions">
                ${onPrevious ? `
                  <button class="tactile-btn btn-secondary nav-prev-btn" id="quiz-prev-btn">
                    <span>← PREVIOUS</span>
                  </button>
                ` : ''}
                <button class="tactile-btn btn-secondary" id="quiz-retry-btn">
                  <span>↺ RETRY</span>
                </button>
                <button class="tactile-btn submit-btn btn-continue-ready" id="quiz-continue-btn">
                  <span class="btn-led status-blue"></span>
                  <span>CONTINUE ANYWAY</span>
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
        <!-- Hardware Header Strip with Embedded Progress Bar -->
        <div class="quiz-panel-header">
          <div class="quiz-header-tag">VERIFICATION MATRIX</div>
          <div class="quiz-progress-track">
            <div class="quiz-progress-fill" style="width: ${quizAnswered ? '100' : '50'}%"></div>
          </div>
          <div class="meter-channel-tag">Q-UNIT 01</div>
        </div>

        <div class="quiz-question-card skeuo-inset-well">
          <div class="question-header-row">
            <span class="question-badge">QUERY</span>
            <span class="question-id">VERIFY KNOWLEDGE</span>
          </div>
          <p class="quiz-question">${quiz.question}</p>

          <div class="quiz-options">
            ${quiz.options.map((opt, idx) => `
              <div class="quiz-option tactile-option ${selectedOption === idx ? 'selected' : ''}"
                   data-index="${idx}"
                   role="button" tabindex="0">
                <span class="quiz-option-number">0${idx + 1}</span>
                <span class="quiz-option-text">${opt}</span>
                <span class="option-status-led status-idle"></span>
              </div>
            `).join('')}
          </div>

          <div class="quiz-explanation ${quizAnswered ? 'visible' : ''}">
            <div class="explanation-tag">
              <span class="explanation-diode status-blue"></span>
              <span>TELEMETRY DECODE</span>
            </div>
            <p>${quiz.explanation || ''}</p>
          </div>
        </div>

        <div class="quiz-actions-container">
          <button class="tactile-btn submit-btn" id="quiz-submit-btn" ${selectedOption === null ? 'disabled' : ''}>
            <span>EXECUTE VERIFICATION</span>
            <span class="submit-key">↵</span>
          </button>
        </div>
      </div>
    `;
  }

  function renderCompletePanel() {
    return `
      <div class="complete-panel skeuo-inset-well">
        <div class="complete-icon-box">
          ${icon('book', 36)}
        </div>
        <h3 class="complete-panel-title">SPECIFICATION COMPLETE</h3>
        <p class="complete-panel-desc">All technical parameters for this section have been loaded into runtime memory.</p>
        <div class="lesson-complete-actions">
          ${onPrevious ? `
            <button class="tactile-btn btn-secondary nav-prev-btn" id="lesson-prev-btn">
              <span>← PREVIOUS</span>
            </button>
          ` : ''}
          <button class="tactile-btn btn-primary btn-large btn-continue-ready btn-success" id="lesson-complete-btn">
            <span class="btn-led status-green pulse-green"></span>
            <span>CONTINUE TO NEXT LEVEL</span>
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

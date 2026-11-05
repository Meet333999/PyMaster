// ==========================================================================
// PyMaster — Skeuomorphic Standalone Quiz Terminal
// Hardware evaluation console with mechanical push keys and verification LEDs
// ==========================================================================

import { icon } from './icons.js';
import { playSound } from '../engine/haptics.js';

export function renderQuizView(container, lesson, section, chapter, callbacks) {
  const { onComplete, onPrevious, onBack, hasPrevious } = callbacks;
  const quiz = lesson.quiz;
  let selectedOption = null;
  let quizAnswered = false;

  function cleanup() {
    document.removeEventListener('keydown', keyHandler);
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

  function handleComplete() {
    cleanup();
    onComplete();
  }

  function keyHandler(e) {
    if (e.key === 'Enter') {
      const btn = container.querySelector('#quiz-submit-btn');
      if (btn && !btn.disabled) {
        btn.click();
      }
    }
  }

  function render() {
    container.innerHTML = `
      <div class="quiz-page-container">
        <!-- Hardware Header Bar -->
        <div class="quiz-page-header hardware-header-bar">
          <div class="header-nav-group">
            <button class="tactile-btn back-btn" id="quiz-back-btn" title="Back to Matrix">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            ${onPrevious ? `
              <button class="tactile-btn nav-prev-btn" id="quiz-header-prev-btn" title="Previous Level">
                <span>←&nbsp;PREV</span>
              </button>
            ` : ''}
          </div>
          <div class="quiz-page-header-info">
            <span class="lesson-breadcrumb">${section.title.toUpperCase()} // ${chapter.title.toUpperCase()}</span>
            <h1 class="lesson-title">${lesson.title}</h1>
          </div>
          <span class="hardware-pill xp-badge">+${lesson.xp}&nbsp;XP</span>
        </div>

        <!-- Standalone Hardware Quiz Chassis -->
        <div class="quiz-page-body">
          <div class="quiz-container standalone hardware-chassis-panel">
            <div class="quiz-console-strip">
              <div class="quiz-channel-tag">EVAL-UNIT 01</div>
              <div class="quiz-progress-track">
                <div class="quiz-progress-fill" style="width: ${quizAnswered ? '100' : '50'}%"></div>
              </div>
              <div class="meter-channel-tag">${quizAnswered ? 'COMPLETE' : 'ACTIVE'}</div>
            </div>

            <div class="quiz-question-card skeuo-inset-well">
              <div class="question-header-row">
                <span class="question-badge">INTERROGATION</span>
                <span class="question-id">VERIFY KNOWLEDGE</span>
              </div>
              <p class="quiz-question">${quiz.question}</p>

              <div class="quiz-options">
                ${quiz.options.map((opt, idx) => {
                  let statusClass = '';
                  let diodeClass = 'status-idle';
                  if (selectedOption === idx) {
                    statusClass = 'selected';
                    diodeClass = 'status-blue';
                  }
                  if (quizAnswered) {
                    if (idx === quiz.correct) {
                      statusClass = 'correct';
                      diodeClass = 'status-green';
                    } else if (idx === selectedOption) {
                      statusClass = 'incorrect';
                      diodeClass = 'status-red';
                    }
                  }

                  return `
                    <div class="quiz-option tactile-option ${statusClass}"
                         data-index="${idx}"
                         role="button"
                         tabindex="0">
                      <span class="quiz-option-number">0${idx + 1}</span>
                      <span class="quiz-option-text">${opt}</span>
                      <span class="option-status-led ${diodeClass}"></span>
                    </div>
                  `;
                }).join('')}
              </div>

              ${quizAnswered ? `
                <div class="quiz-explanation visible">
                  <div class="explanation-tag">
                    <span class="explanation-diode ${selectedOption === quiz.correct ? 'status-green' : 'status-red'}"></span>
                    <span>${selectedOption === quiz.correct ? 'ASSERTION VERIFIED' : 'LOGIC CONFLICT DETECTED'}</span>
                  </div>
                  <p>${quiz.explanation || ''}</p>
                </div>
              ` : ''}
            </div>

            ${quizAnswered ? `
              <div class="quiz-post-actions">
                ${onPrevious ? `
                  <button class="tactile-btn btn-secondary nav-prev-btn" id="quiz-btn-prev">
                    <span>← PREVIOUS</span>
                  </button>
                ` : ''}
                <button class="tactile-btn submit-btn btn-continue-ready btn-success" id="quiz-submit-btn">
                  <span class="btn-led status-green pulse-green"></span>
                  <span>CONTINUE TO NEXT LEVEL</span>
                  <span class="submit-key">→</span>
                </button>
              </div>
            ` : `
              <button class="tactile-btn submit-btn" id="quiz-submit-btn"
                      ${selectedOption === null ? 'disabled' : ''}>
                <span>EXECUTE VERIFICATION</span>
                <span class="submit-key">↵</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    setupEventListeners();
  }

  function setupEventListeners() {
    container.querySelector('#quiz-back-btn')?.addEventListener('click', () => {
      playSound('click');
      handleBack();
    });

    container.querySelector('#quiz-header-prev-btn')?.addEventListener('click', () => {
      playSound('click');
      handlePrevious();
    });

    container.querySelector('#quiz-btn-prev')?.addEventListener('click', () => {
      playSound('click');
      handlePrevious();
    });

    container.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (quizAnswered) return;
        playSound('click');
        selectedOption = parseInt(opt.dataset.index);
        render();
      });
    });

    container.querySelector('#quiz-submit-btn')?.addEventListener('click', () => {
      if (quizAnswered) {
        playSound('click');
        handleComplete();
        return;
      }
      if (selectedOption === null) return;
      quizAnswered = true;

      const isCorrect = selectedOption === quiz.correct;
      if (isCorrect) {
        playSound('pass');
      } else {
        playSound('fail');
      }

      render();
    });

    document.removeEventListener('keydown', keyHandler);
    document.addEventListener('keydown', keyHandler);
  }

  render();
}

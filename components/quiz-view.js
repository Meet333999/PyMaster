// ==========================================================================
// Code Level / PyMaster — Modern Standalone Quiz View
// Evaluation card deck with clean question cards, numbered options & CTA
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
        <!-- Header Bar -->
        <div class="quiz-page-header modern-header-bar">
          <div class="header-nav-group">
            <button class="tactile-btn back-btn" id="quiz-back-btn" title="Back to Curriculum">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            ${onPrevious ? `
              <button class="tactile-btn nav-prev-btn" id="quiz-header-prev-btn" title="Previous Level">
                <span>← Prev</span>
              </button>
            ` : ''}
          </div>
          <div class="quiz-page-header-info">
            <span class="lesson-breadcrumb">${section.title} > ${chapter.title}</span>
            <h1 class="lesson-title">${lesson.title}</h1>
          </div>
          <span class="xp-badge">+${lesson.xp} XP</span>
        </div>

        <!-- Standalone Quiz Card -->
        <div class="quiz-page-body">
          <div class="quiz-container standalone modern-card-panel">
            <div class="quiz-panel-header">
              <div class="quiz-header-tag">KNOWLEDGE CHECK</div>
              <div class="quiz-progress-track">
                <div class="quiz-progress-fill" style="width: ${quizAnswered ? '100' : '50'}%"></div>
              </div>
              <span class="quiz-step-tag ${quizAnswered ? 'completed' : ''}">${quizAnswered ? 'Completed' : 'Active'}</span>
            </div>

            <div class="quiz-question-card modern-content-card">
              <p class="quiz-question">${quiz.question}</p>

              <div class="quiz-options">
                ${quiz.options.map((opt, idx) => {
                  let statusClass = '';
                  if (selectedOption === idx) {
                    statusClass = 'selected';
                  }
                  if (quizAnswered) {
                    if (idx === quiz.correct) {
                      statusClass = 'correct';
                    } else if (idx === selectedOption) {
                      statusClass = 'incorrect';
                    }
                  }

                  return `
                    <div class="quiz-option ${statusClass}"
                         data-index="${idx}"
                         role="button"
                         tabindex="0">
                      <span class="quiz-option-number">0${idx + 1}</span>
                      <span class="quiz-option-text">${opt}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              ${quizAnswered ? `
                <div class="quiz-explanation visible ${selectedOption === quiz.correct ? 'pass' : 'fail'}">
                  <div class="explanation-tag">
                    <span class="explanation-indicator ${selectedOption === quiz.correct ? 'pass' : 'fail'}"></span>
                    <span>${selectedOption === quiz.correct ? 'Answer Verified' : 'Incorrect — Review Concept'}</span>
                  </div>
                  <p>${quiz.explanation || ''}</p>
                </div>
              ` : ''}
            </div>

            ${quizAnswered ? `
              <div class="quiz-post-actions">
                ${onPrevious ? `
                  <button class="tactile-btn btn-secondary nav-prev-btn" id="quiz-btn-prev">
                    <span>← Previous</span>
                  </button>
                ` : ''}
                <button class="tactile-btn submit-btn btn-continue-ready btn-success" id="quiz-submit-btn">
                  <span>Continue to Next Level</span>
                  <span class="submit-key">→</span>
                </button>
              </div>
            ` : `
              <button class="tactile-btn submit-btn" id="quiz-submit-btn"
                      ${selectedOption === null ? 'disabled' : ''}>
                <span>Submit Answer</span>
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

    const options = container.querySelectorAll('.quiz-option');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        if (quizAnswered) return;
        playSound('click');
        selectedOption = parseInt(opt.dataset.index, 10);
        render();
      });
    });

    const submitBtn = container.querySelector('#quiz-submit-btn');
    submitBtn?.addEventListener('click', () => {
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

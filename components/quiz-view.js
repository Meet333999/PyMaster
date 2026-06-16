import { icon } from './icons.js';

export function renderQuizView(container, lesson, section, chapter, callbacks) {
  const { onComplete, onBack } = callbacks;
  const quiz = lesson.quiz;
  let selectedOption = null;
  let quizAnswered = false;

  function render() {
    container.innerHTML = `
      <div class="quiz-page-container">
        <!-- Header -->
        <div class="quiz-page-header">
          <button class="back-btn" id="quiz-back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div class="quiz-page-header-info">
            <span class="lesson-breadcrumb">${section.title} › ${chapter.title}</span>
            <h1 class="lesson-title">${lesson.title}</h1>
          </div>
          <span class="xp-badge">+${lesson.xp} XP</span>
        </div>

        <!-- Quiz Card -->
        <div class="quiz-page-body">
          <div class="quiz-container standalone">
            <div class="quiz-progress-bar">
              <div class="quiz-progress-fill" style="width: ${quizAnswered ? '100' : '50'}%"></div>
            </div>

            <div class="quiz-question-card">
              <div class="quiz-question-icon">${icon('terminal', 32)}</div>
              <p class="quiz-question">${quiz.question}</p>

              <div class="quiz-options">
                ${quiz.options.map((opt, idx) => `
                  <div class="quiz-option ${selectedOption === idx ? 'selected' : ''} ${quizAnswered ? (idx === quiz.correct ? 'correct' : (idx === selectedOption ? 'incorrect' : '')) : ''}"
                       data-index="${idx}"
                       role="button"
                       tabindex="0">
                    <span class="quiz-option-number">${idx + 1}</span>
                    <span class="quiz-option-text">${opt}</span>
                    ${quizAnswered && idx === quiz.correct ? '<span class="quiz-check">✓</span>' : ''}
                    ${quizAnswered && idx === selectedOption && idx !== quiz.correct ? '<span class="quiz-cross">✗</span>' : ''}
                  </div>
                `).join('')}
              </div>

              ${quizAnswered ? `
                <div class="quiz-explanation visible">
                  <div class="explanation-icon">${selectedOption === quiz.correct ? icon('award', 18) : icon('lightbulb', 18)}</div>
                  <p>${selectedOption === quiz.correct ? 'Correct! ' : 'Not quite. '}${quiz.explanation || ''}</p>
                </div>
              ` : ''}
            </div>

            <button class="submit-btn" id="quiz-submit-btn"
                    ${selectedOption === null && !quizAnswered ? 'disabled' : ''}>
              ${quizAnswered ? 'CONTINUE' : 'SUBMIT'}
              <span class="submit-key">Enter ↵</span>
            </button>
          </div>
        </div>
      </div>
    `;

    setupEventListeners();
  }

  function setupEventListeners() {
    // Back button
    container.querySelector('#quiz-back-btn')?.addEventListener('click', onBack);

    // Option selection
    container.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        if (quizAnswered) return;
        selectedOption = parseInt(opt.dataset.index);
        render();
      });
    });

    // Submit button
    container.querySelector('#quiz-submit-btn')?.addEventListener('click', () => {
      if (quizAnswered) {
        // Continue to next
        onComplete();
        return;
      }
      if (selectedOption === null) return;
      quizAnswered = true;
      render();
    });

    // Keyboard: Enter to submit
    const keyHandler = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        container.querySelector('#quiz-submit-btn')?.click();
      }
      // Number keys to select options
      if (!quizAnswered && ['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (idx < quiz.options.length) {
          selectedOption = idx;
          render();
        }
      }
    };
    document.addEventListener('keydown', keyHandler);

    // Cleanup on navigation (store reference for potential cleanup)
    container._quizKeyHandler = keyHandler;
  }

  render();
}

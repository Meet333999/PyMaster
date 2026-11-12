/* ==========================================================================
   Code Level / PyMaster — Modern Completion & Achievement Modal
   Clean glassmorphic dialog with XP rewards, continue action,
   and outside-click dismiss.
   ========================================================================== */

import { icon } from './icons.js';
import { playSound } from '../engine/haptics.js';

let _modalRoot = null;
let _escapeHandler = null;

/**
 * Show a lesson completion verification plaque.
 *
 * @param {string}   lessonTitle — the completed lesson's title
 * @param {number}   xpEarned   — XP points awarded
 * @param {Function} onContinue — callback when the user clicks Continue
 */
export function showCompletionModal(lessonTitle, xpEarned, onContinue) {
  playSound('pass');

  const html = `
    <div class="modal-overlay" data-modal-overlay>
      <div class="modal-content modern-modal-card">
        <div class="modal-spark-badge">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>

        <div class="modal-header-group">
          <span class="modal-kicker">LEVEL COMPLETED</span>
          <h2 class="modal-title">${_escapeHtml(lessonTitle)}</h2>
        </div>

        <div class="modal-xp-card">
          <span class="xp-icon-spark">${icon('zap', 18)}</span>
          <span class="xp-value">+${xpEarned} XP</span>
          <span class="xp-label">Reward Added</span>
        </div>

        <button class="tactile-btn btn-modal-continue" data-modal-continue>
          <span>Continue</span>
          <span class="key-indicator">→</span>
        </button>
      </div>
    </div>
  `;

  _showModal(html, onContinue);
}

/**
 * Show an achievement unlock plaque.
 *
 * @param {string} title       — achievement title
 * @param {string} description — achievement description
 * @param {string} [achievementIcon] — SVG icon string for the achievement
 */
export function showAchievementModal(title, description, achievementIcon = '') {
  playSound('pass');
  const displayIcon = achievementIcon || icon('award', 32);

  const html = `
    <div class="modal-overlay" data-modal-overlay>
      <div class="modal-content modern-modal-card">
        <div class="modal-spark-badge trophy-accent">
          ${displayIcon}
        </div>

        <div class="modal-header-group">
          <span class="modal-kicker">ACHIEVEMENT UNLOCKED</span>
          <h2 class="modal-title">${_escapeHtml(title)}</h2>
          <p class="modal-body">${_escapeHtml(description)}</p>
        </div>

        <button class="tactile-btn btn-modal-continue" data-modal-continue>
          <span>Awesome!</span>
          <span class="key-indicator">↵</span>
        </button>
      </div>
    </div>
  `;

  _showModal(html, null);
}

/**
 * Hide and destroy the currently visible modal.
 */
export function hideModal() {
  if (_modalRoot) {
    const root = _modalRoot;
    _modalRoot = null;
    const overlay = root.querySelector('.modal-overlay');
    if (overlay) {
      overlay.style.pointerEvents = 'none';
      overlay.style.opacity = '0';
      overlay.style.display = 'none';
    }
    if (root.parentNode) {
      root.parentNode.removeChild(root);
    }
  }

  if (_escapeHandler) {
    document.removeEventListener('keydown', _escapeHandler);
    _escapeHandler = null;
  }
}

function _showModal(html, onContinue) {
  hideModal();

  _modalRoot = document.createElement('div');
  _modalRoot.innerHTML = html;
  document.body.appendChild(_modalRoot);

  const continueBtn = _modalRoot.querySelector('[data-modal-continue]');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      playSound('click');
      hideModal();
      if (typeof onContinue === 'function') {
        onContinue();
      }
    });
  }

  const overlay = _modalRoot.querySelector('[data-modal-overlay]');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (!e.target.closest('.modern-modal-card')) {
        playSound('click');
        hideModal();
        // Clicking outside popup closes popup and does nothing (no navigation)
      }
    });
  }

  _escapeHandler = (e) => {
    if (e.key === 'Escape') {
      playSound('click');
      hideModal();
      // Escape key closes popup and does nothing
    } else if (e.key === 'Enter') {
      const continueBtn = _modalRoot?.querySelector('[data-modal-continue]');
      if (continueBtn) {
        continueBtn.click();
      }
    }
  };
  document.addEventListener('keydown', _escapeHandler);

  // Focus the continue button for immediate keyboard accessibility
  setTimeout(() => {
    continueBtn?.focus();
  }, 50);
}

function _escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

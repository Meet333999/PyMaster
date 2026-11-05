/* ==========================================================================
   PyMaster — Skeuomorphic Modal & Hardware Verification Stamp
   Presents completion verification with physical stamped plaque aesthetics
   and mechanical tactile feedback.
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
      <div class="modal-content hardware-modal-chassis">
        <div class="mounting-screw top-left" aria-hidden="true"></div>
        <div class="mounting-screw top-right" aria-hidden="true"></div>

        <div class="modal-header-strip">
          <span class="modal-diode status-green pulse-green"></span>
          <span class="modal-system-tag">RUNTIME VERIFICATION // SUCCESS</span>
        </div>

        <div class="modal-plaque skeuo-inset-well">
          <div class="plaque-stamp-badge">
            ${icon('award', 28)}
          </div>
          <div class="modal-title">SPECIFICATION COMPLETED</div>
          <div class="modal-body">${_escapeHtml(lessonTitle)}</div>
        </div>

        <div class="xp-earned-bezel">
          <span class="xp-token-icon">${icon('zap', 16)}</span>
          <span class="xp-token-digits">+${xpEarned} XP</span>
          <span class="xp-token-unit">COMMITTED</span>
        </div>

        <button class="tactile-btn btn-modal-continue" data-modal-continue>
          <span>CONTINUE EXECUTION</span>
          <span class="key-indicator">↵</span>
        </button>

        <div class="mounting-screw bottom-left" aria-hidden="true"></div>
        <div class="mounting-screw bottom-right" aria-hidden="true"></div>
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
  const displayIcon = achievementIcon || icon('award', 36);

  const html = `
    <div class="modal-overlay" data-modal-overlay>
      <div class="modal-content hardware-modal-chassis">
        <div class="mounting-screw top-left" aria-hidden="true"></div>
        <div class="mounting-screw top-right" aria-hidden="true"></div>

        <div class="modal-header-strip">
          <span class="modal-diode status-blue pulse-blue"></span>
          <span class="modal-system-tag">HARDWARE CERTIFICATION // UNLOCKED</span>
        </div>

        <div class="modal-plaque skeuo-inset-well">
          <div class="plaque-stamp-badge trophy-accent">
            ${displayIcon}
          </div>
          <div class="modal-title">${_escapeHtml(title)}</div>
          <div class="modal-body">${_escapeHtml(description)}</div>
        </div>

        <button class="tactile-btn btn-modal-continue" data-modal-continue>
          <span>CONFIRM RECEIPT</span>
          <span class="key-indicator">↵</span>
        </button>

        <div class="mounting-screw bottom-left" aria-hidden="true"></div>
        <div class="mounting-screw bottom-right" aria-hidden="true"></div>
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
      if (!e.target.closest('.hardware-modal-chassis')) {
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

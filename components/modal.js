/* ==========================================================================
   PyMaster — Modal Component
   Shows completion celebrations and achievement notifications with
   confetti effects, animated XP display, and smooth transitions.
   ========================================================================== */

import { icon } from './icons.js';

/** Container element for the modal (appended to body) */
let _modalRoot = null;

/** Current escape-key listener reference */
let _escapeHandler = null;

/* --------------------------------------------------------------------------
   Public API
   -------------------------------------------------------------------------- */

/**
 * Show a lesson completion modal with confetti and XP animation.
 *
 * @param {string}   lessonTitle — the completed lesson's title
 * @param {number}   xpEarned   — XP points awarded
 * @param {Function} onContinue — callback when the user clicks Continue
 */
export function showCompletionModal(lessonTitle, xpEarned, onContinue) {
  const confettiHTML = _generateConfetti(30);

  const html = `
    <div class="modal-overlay" data-modal-overlay>
      <div class="modal-content">
        ${confettiHTML}

        <div class="modal-title">${icon('award', 24)} Lesson Complete!</div>
        <div class="modal-body">${_escapeHtml(lessonTitle)}</div>

        <div class="xp-earned">
          <span>${icon('zap', 18)}</span>
          <span>+${xpEarned} XP</span>
        </div>

        <button class="btn-continue" data-modal-continue>
          Continue →
        </button>
      </div>
    </div>
  `;

  _showModal(html, onContinue);
}

/**
 * Show an achievement unlock modal.
 *
 * @param {string} title       — achievement title
 * @param {string} description — achievement description
 * @param {string} [achievementIcon] — SVG icon string for the achievement
 */
export function showAchievementModal(title, description, achievementIcon = '') {
  const confettiHTML = _generateConfetti(20);
  const displayIcon = achievementIcon || icon('award', 48);

  const html = `
    <div class="modal-overlay" data-modal-overlay>
      <div class="modal-content">
        ${confettiHTML}

        <div style="display: flex; justify-content: center; margin-bottom: 16px; line-height: 1; color: var(--color-warning);">${displayIcon}</div>
        <div class="modal-title">Achievement Unlocked!</div>
        <div class="modal-body">
          <strong>${_escapeHtml(title)}</strong><br>
          ${_escapeHtml(description)}
        </div>

        <button class="btn-continue" data-modal-continue>
          Awesome! →
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
    // Fade out
    const overlay = _modalRoot.querySelector('.modal-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.2s ease';
    }

    setTimeout(() => {
      if (_modalRoot && _modalRoot.parentNode) {
        _modalRoot.parentNode.removeChild(_modalRoot);
      }
      _modalRoot = null;
    }, 200);
  }

  // Remove escape key handler
  if (_escapeHandler) {
    document.removeEventListener('keydown', _escapeHandler);
    _escapeHandler = null;
  }
}

/* --------------------------------------------------------------------------
   Internal Helpers
   -------------------------------------------------------------------------- */

/**
 * Insert the modal HTML into the DOM and wire up event listeners.
 *
 * @param {string}        html       — full modal HTML
 * @param {Function|null} onContinue — callback for the Continue button
 */
function _showModal(html, onContinue) {
  // Remove any existing modal
  hideModal();

  // Create root container
  _modalRoot = document.createElement('div');
  _modalRoot.innerHTML = html;
  document.body.appendChild(_modalRoot);

  // ── Continue button ──
  const continueBtn = _modalRoot.querySelector('[data-modal-continue]');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      hideModal();
      if (typeof onContinue === 'function') {
        onContinue();
      }
    });
  }

  // ── Overlay click to dismiss ──
  const overlay = _modalRoot.querySelector('[data-modal-overlay]');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      // Only dismiss if clicking the overlay itself, not the content
      if (e.target === overlay) {
        hideModal();
        if (typeof onContinue === 'function') {
          onContinue();
        }
      }
    });
  }

  // ── Escape key to dismiss ──
  _escapeHandler = (e) => {
    if (e.key === 'Escape') {
      hideModal();
      if (typeof onContinue === 'function') {
        onContinue();
      }
    }
  };
  document.addEventListener('keydown', _escapeHandler);
}

/**
 * Generate confetti pieces with random positions, colors, sizes, and delays.
 *
 * @param {number} count — number of confetti pieces
 * @returns {string} HTML string of confetti elements
 */
function _generateConfetti(count) {
  const colors = [
    '#00e5ff', '#00e5a0', '#ffb300', '#ff3b5c', '#7b2ff7',
    '#33ecff', '#34d399', '#fbbf24', '#ff6b8a', '#a855f7',
    '#06d6e0', '#f472b6', '#facc15',
  ];

  let html = '';

  for (let i = 0; i < count; i++) {
    const color    = colors[Math.floor(Math.random() * colors.length)];
    const left     = Math.random() * 100;       // % from left
    const top      = 50 + Math.random() * 40;   // start from middle-bottom area
    const size     = 6 + Math.random() * 8;     // px
    const delay    = Math.random() * 0.6;       // seconds
    const duration = 0.8 + Math.random() * 0.8; // seconds
    const rotation = Math.random() * 360;

    html += `
      <div
        class="confetti"
        style="
          left: ${left}%;
          top: ${top}%;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          animation-delay: ${delay}s;
          animation-duration: ${duration}s;
          transform: rotate(${rotation}deg);
          border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        "
      ></div>
    `;
  }

  return html;
}

/**
 * Escape HTML special characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function _escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

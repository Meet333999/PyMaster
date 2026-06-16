/* ==========================================================================
   PyMaster — Topbar Stats Component
   Displays streak, XP, gems, and profile avatar in the top bar.
   ========================================================================== */

/** Element ID used for targeted updates */
const TOPBAR_ID = 'pymaster-topbar';

/**
 * Render the topbar into the given container.
 *
 * @param {HTMLElement} container — DOM element to render the topbar into
 * @param {import('../engine/state.js').GameState} state — game state instance
 */
export function renderTopbar(container, state) {
  if (!container) {
    console.error('[Topbar] Container element is required.');
    return;
  }

  const stats = state.getStats();
  const streak = state.getStreak();
  const xp     = state.getXP();
  const gems   = state.getGems();

  // Derive avatar letter from username
  const rawState = state.getRawState();
  const username = rawState.username || 'Learner';
  const avatarLetter = username.charAt(0).toUpperCase();

  // Apply topbar class
  if (!container.classList.contains('topbar')) {
    container.classList.add('topbar');
  }

  container.id = TOPBAR_ID;
  container.innerHTML = `
    <!-- Streak -->
    <div class="topbar-stat streak-fire" title="Current streak">
      <span class="icon">🔥</span>
      <span class="value" data-stat="streak">${streak}</span>
    </div>

    <!-- XP -->
    <div class="topbar-stat xp-display" title="Total XP earned">
      <span class="icon">💎</span>
      <span class="value" data-stat="xp">${_formatNumber(xp)}</span>
    </div>

    <!-- Gems -->
    <div class="topbar-stat gems-display" title="Gems balance">
      <span class="icon">💰</span>
      <span class="value" data-stat="gems">${_formatNumber(gems)}</span>
    </div>

    <!-- Profile Avatar -->
    <div class="topbar-avatar" title="${username}" data-stat="avatar">
      ${avatarLetter}
    </div>
  `;
}

/**
 * Update the topbar stat values without a full re-render.
 * Falls back to a full re-render if elements aren't found.
 *
 * @param {import('../engine/state.js').GameState} state — game state instance
 */
export function updateTopbar(state) {
  const container = document.getElementById(TOPBAR_ID);
  if (!container) return;

  const streakEl = container.querySelector('[data-stat="streak"]');
  const xpEl     = container.querySelector('[data-stat="xp"]');
  const gemsEl   = container.querySelector('[data-stat="gems"]');

  if (!streakEl || !xpEl || !gemsEl) {
    // Elements missing — do a full re-render
    renderTopbar(container, state);
    return;
  }

  const streak = state.getStreak();
  const xp     = state.getXP();
  const gems   = state.getGems();

  // Only update if values changed
  _updateValue(streakEl, String(streak));
  _updateValue(xpEl, _formatNumber(xp));
  _updateValue(gemsEl, _formatNumber(gems));
}

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */

/**
 * Format a number for display (add commas for thousands).
 * @param {number} n
 * @returns {string}
 */
function _formatNumber(n) {
  if (n >= 1000) {
    return n.toLocaleString('en-US');
  }
  return String(n);
}

/**
 * Update an element's text content only if it changed (avoids unnecessary DOM writes).
 * @param {HTMLElement} el
 * @param {string} newValue
 */
function _updateValue(el, newValue) {
  if (el.textContent !== newValue) {
    el.textContent = newValue;

    // Brief pop animation on change
    el.style.transition = 'transform 0.2s ease';
    el.style.transform = 'scale(1.2)';
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.transform = 'scale(1)';
      }, 200);
    });
  }
}

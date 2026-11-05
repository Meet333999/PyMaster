/* ==========================================================================
   PyMaster — Skeuomorphic Topbar Console Header
   Displays physical hardware counters, rocker switches (Theme, Sound),
   and status LEDs with mechanical tactile feedback.
   ========================================================================== */

import { icon } from './icons.js';
import { getCurrentTheme, toggleTheme } from '../engine/theme.js';
import { isSoundEnabled, toggleSound, playSound } from '../engine/haptics.js';

const TOPBAR_ID = 'pymaster-topbar';

/**
 * Render the topbar into the given container.
 *
 * @param {HTMLElement} container — DOM element to render the topbar into
 * @param {import('../engine/state.js').GameState} state — game state instance
 */
export function renderTopbar(container, state) {
  if (!container) return;

  const streak = state.getStreak();
  const xp     = state.getXP();
  const gems   = state.getGems();

  const rawState = state.getRawState();
  const username = rawState.username || 'Learner';
  const avatarLetter = username.charAt(0).toUpperCase();
  const photoURL = state.getPhotoURL();
  const avatarHTML = photoURL
    ? `<img src="${photoURL}" class="topbar-avatar-img" alt="${username}" referrerpolicy="no-referrer">`
    : `<span class="avatar-letter">${avatarLetter}</span>`;

  const currentTheme = getCurrentTheme();
  const soundActive = isSoundEnabled();

  if (!container.classList.contains('topbar')) {
    container.classList.add('topbar');
  }

  container.id = TOPBAR_ID;
  container.innerHTML = `
    <!-- Left Rack Header: Hardware Identifier -->
    <div class="topbar-unit-id" title="Hardware Diagnostic Console">
      <div class="unit-status-led" title="Power: Online"></div>
      <div class="unit-label-group">
        <span class="unit-brand">PYMASTER</span>
        <span class="unit-model">SYS-9000 // CORE RUNTIME</span>
      </div>
    </div>

    <!-- Center / Right: Hardware Rocker Switches & Recessed Meters -->
    <div class="topbar-controls">
      <!-- Theme Rocker Switch (ADV style from reference image) -->
      <div class="hardware-switch-group" title="Toggle Light / Dark Mode">
        <span class="hardware-switch-label">THEME</span>
        <button class="rocker-switch ${currentTheme === 'light' ? 'on' : ''}" id="topbar-theme-toggle" aria-label="Toggle Theme">
          <span class="rocker-track">
            <span class="rocker-thumb"></span>
          </span>
          <span class="rocker-state-label">${currentTheme === 'light' ? 'LIGHT' : 'DARK'}</span>
        </button>
      </div>

      <!-- Sound FX Rocker Switch -->
      <div class="hardware-switch-group" title="Toggle Mechanical Audio Feedback">
        <span class="hardware-switch-label">HAPTICS</span>
        <button class="rocker-switch ${soundActive ? 'on' : ''}" id="topbar-sound-toggle" aria-label="Toggle Haptics Audio">
          <span class="rocker-track">
            <span class="rocker-thumb"></span>
          </span>
          <span class="rocker-state-label">${soundActive ? 'ON' : 'MUTE'}</span>
        </button>
      </div>

      <!-- Vertical Hardware Separator Screw -->
      <div class="rack-screw-separator" aria-hidden="true"></div>

      <!-- Hardware Digital Counter: Streak -->
      <div class="topbar-meter-bezel" title="Consecutive day streak">
        <div class="meter-channel-tag">STRK</div>
        <div class="meter-lcd-display">
          <span class="meter-led-indicator flame-led">${icon('flame', 14)}</span>
          <span class="meter-lcd-digits" data-stat="streak">${streak}</span>
          <span class="meter-lcd-unit">D</span>
        </div>
      </div>

      <!-- Hardware Digital Counter: Total XP -->
      <div class="topbar-meter-bezel" title="Total XP points accumulated">
        <div class="meter-channel-tag">XP</div>
        <div class="meter-lcd-display">
          <span class="meter-led-indicator gem-led">${icon('gem', 14)}</span>
          <span class="meter-lcd-digits" data-stat="xp">${_formatNumber(xp)}</span>
          <span class="meter-lcd-unit">PTS</span>
        </div>
      </div>

      <!-- Hardware Digital Counter: Gems -->
      <div class="topbar-meter-bezel" title="Earned Gems balance">
        <div class="meter-channel-tag">GEMS</div>
        <div class="meter-lcd-display">
          <span class="meter-led-indicator gems-led">${icon('coins', 14)}</span>
          <span class="meter-lcd-digits" data-stat="gems">${_formatNumber(gems)}</span>
        </div>
      </div>

      <!-- Recessed Circular Avatar Dial -->
      <button class="topbar-avatar-dial" title="User Profile (${username})" data-stat="avatar" aria-label="Profile">
        <div class="avatar-dial-bezel">
          ${avatarHTML}
        </div>
      </button>
    </div>
  `;

  // Attach event listeners
  const themeToggle = container.querySelector('#topbar-theme-toggle');
  themeToggle?.addEventListener('click', () => {
    playSound('switch');
    const newTheme = toggleTheme();
    themeToggle.classList.toggle('on', newTheme === 'light');
    const label = themeToggle.querySelector('.rocker-state-label');
    if (label) label.textContent = newTheme === 'light' ? 'LIGHT' : 'DARK';
  });

  const soundToggle = container.querySelector('#topbar-sound-toggle');
  soundToggle?.addEventListener('click', () => {
    const isNowOn = toggleSound();
    soundToggle.classList.toggle('on', isNowOn);
    const label = soundToggle.querySelector('.rocker-state-label');
    if (label) label.textContent = isNowOn ? 'ON' : 'MUTE';
  });
}

/**
 * Update the topbar stat values without a full re-render.
 * @param {import('../engine/state.js').GameState} state — game state instance
 */
export function updateTopbar(state) {
  const container = document.getElementById(TOPBAR_ID);
  if (!container) return;

  const streakEl = container.querySelector('[data-stat="streak"]');
  const xpEl     = container.querySelector('[data-stat="xp"]');
  const gemsEl   = container.querySelector('[data-stat="gems"]');

  if (!streakEl || !xpEl || !gemsEl) {
    renderTopbar(container, state);
    return;
  }

  const streak = state.getStreak();
  const xp     = state.getXP();
  const gems   = state.getGems();

  _updateValue(streakEl, String(streak));
  _updateValue(xpEl, _formatNumber(xp));
  _updateValue(gemsEl, _formatNumber(gems));

  const avatarEl = container.querySelector('[data-stat="avatar"] .avatar-dial-bezel');
  if (avatarEl) {
    const rawState = state.getRawState();
    const username = rawState.username || 'Learner';
    const avatarLetter = username.charAt(0).toUpperCase();
    const photoURL = state.getPhotoURL();
    const avatarHTML = photoURL
      ? `<img src="${photoURL}" class="topbar-avatar-img" alt="${username}" referrerpolicy="no-referrer">`
      : `<span class="avatar-letter">${avatarLetter}</span>`;

    if (avatarEl.innerHTML.trim() !== avatarHTML.trim()) {
      avatarEl.innerHTML = avatarHTML;
    }
  }
}

function _formatNumber(n) {
  if (n >= 1000) {
    return n.toLocaleString('en-US');
  }
  return String(n);
}

function _updateValue(el, newValue) {
  if (el.textContent !== newValue) {
    el.textContent = newValue;
    el.classList.add('digit-pulse');
    setTimeout(() => el.classList.remove('digit-pulse'), 300);
  }
}

/* ==========================================================================
   Code Level / PyMaster — Modern Topbar Header
   Clean navigation header with real-time stats (Streak, XP, Gems),
   theme switcher (Light / Dark mode), and user profile badge.
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
    <!-- Left Group: Mobile Menu & Clean Branding -->
    <div class="topbar-left-group">
      <button class="tactile-btn mobile-menu-btn" id="mobile-menu-toggle" aria-label="Toggle Navigation" title="Toggle Navigation">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <div class="topbar-mobile-brand">
        <span class="unit-brand">CODE LEVEL</span>
      </div>
    </div>

    <!-- Center / Right: Stats & Controls -->
    <div class="topbar-controls">
      <!-- Streak Pill -->
      <div class="topbar-stat-pill streak-pill" title="${streak} day learning streak">
        <span class="stat-icon-wrapper flame-icon">${icon('flame', 15)}</span>
        <span class="stat-val" data-stat="streak">${streak}</span>
        <span class="stat-unit">d</span>
      </div>

      <!-- XP Pill -->
      <div class="topbar-stat-pill xp-pill" title="${xp} XP earned">
        <span class="stat-icon-wrapper xp-icon">${icon('gem', 15)}</span>
        <span class="stat-val" data-stat="xp">${_formatNumber(xp)}</span>
        <span class="stat-unit">XP</span>
      </div>

      <!-- Gems Pill -->
      <div class="topbar-stat-pill gems-pill" title="${gems} Gems">
        <span class="stat-icon-wrapper gems-icon">${icon('coins', 15)}</span>
        <span class="stat-val" data-stat="gems">${_formatNumber(gems)}</span>
      </div>

      <!-- Theme Switcher Pill -->
      <button class="topbar-action-pill theme-toggle-btn" id="topbar-theme-toggle" aria-label="Toggle Light / Dark Mode" title="Toggle Theme">
        <span class="theme-pill-icon">
          ${currentTheme === 'light'
            ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
            : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
          }
        </span>
        <span class="theme-pill-label">${currentTheme === 'light' ? 'Light' : 'Dark'}</span>
      </button>

      <!-- Sound FX Toggle Pill -->
      <button class="topbar-action-pill sound-toggle-btn ${soundActive ? 'active' : ''}" id="topbar-sound-toggle" aria-label="Toggle Audio" title="Toggle Audio FX">
        <span class="sound-pill-icon">
          ${soundActive
            ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
            : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`
          }
        </span>
        <span class="sound-pill-label">${soundActive ? 'Audio' : 'Mute'}</span>
      </button>

      <!-- Profile Avatar Dial -->
      <a href="#profile" class="topbar-avatar-dial" title="Profile: ${username}" data-stat="avatar" aria-label="Profile">
        <div class="avatar-dial-bezel">
          ${avatarHTML}
        </div>
      </a>
    </div>
  `;

  // Attach event listeners
  const themeToggle = container.querySelector('#topbar-theme-toggle');
  themeToggle?.addEventListener('click', () => {
    playSound('switch');
    const newTheme = toggleTheme();
    renderTopbar(container, state);
  });

  const mobileMenuToggle = container.querySelector('#mobile-menu-toggle');
  mobileMenuToggle?.addEventListener('click', () => {
    playSound('click');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) {
      const isOpen = sidebar.classList.toggle('mobile-open');
      if (backdrop) backdrop.classList.toggle('active', isOpen);
    }
  });

  const soundToggle = container.querySelector('#topbar-sound-toggle');
  soundToggle?.addEventListener('click', () => {
    const isNowOn = toggleSound();
    soundToggle.classList.toggle('active', isNowOn);
    renderTopbar(container, state);
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

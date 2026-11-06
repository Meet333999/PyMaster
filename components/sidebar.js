/* ==========================================================================
   PyMaster — Skeuomorphic Sidebar Hardware Rack
   Renders the left hardware strip with tactile push-buttons, channel LEDs,
   and mechanical depression feedback.
   ========================================================================== */

import { icon } from './icons.js';
import { playSound } from '../engine/haptics.js';

const NAV_ITEMS = [
  { route: 'journey',     icon: icon('terminal', 18),   label: 'Python',    tag: 'CH-1' },
  { route: 'sql-journey', icon: icon('database', 18),   label: 'SQL',       tag: 'CH-2' },
  { route: 'dsa-journey', icon: icon('git-branch', 18), label: 'DSA',       tag: 'CH-3' },
  { route: 'practice',    icon: icon('code', 18),       label: 'Practice',  tag: 'PRAC' },
  { route: 'goals',       icon: icon('target', 18),     label: 'Goals',     tag: 'GOAL' },
  { route: 'leaderboard', icon: icon('activity', 18),   label: 'Telemetry', tag: 'DIAG' },
  { route: 'profile',     icon: icon('user', 18),       label: 'Profile',   tag: 'USER' },
];

/**
 * Render the sidebar navigation into the given container.
 *
 * @param {HTMLElement} container   — DOM element to render the sidebar into
 * @param {string}     currentRoute — the currently active route name
 * @param {Function}   onNavigate   — callback invoked with the route string on click
 */
export function renderSidebar(container, currentRoute, onNavigate) {
  if (!container) return;

  const navItemsHTML = NAV_ITEMS.map((item) => {
    const isActive = currentRoute === item.route;
    return `
      <button
        class="sidebar-item ${isActive ? 'active' : ''}"
        data-route="${item.route}"
        aria-label="${item.label}"
        title="${item.label} (${item.tag})"
      >
        <span class="channel-status-led ${isActive ? 'active' : ''}"></span>
        <span class="sidebar-icon">${item.icon}</span>
        <span class="sidebar-label">${item.label}</span>
        <span class="sidebar-tag">${item.tag}</span>
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <!-- Top Faceplate with Screws -->
    <div class="sidebar-rack-head">
      <div class="mounting-screw top-left" aria-hidden="true"></div>
      <a href="#" class="sidebar-logo" aria-label="PyMaster Console">
        <span class="logo-icon-box">
          ${icon('power', 18)}
        </span>
        <div class="logo-text-group">
          <span class="logo-text">PYMASTER</span>
          <span class="logo-subtext">CONSOLE DECK</span>
        </div>
      </a>
      <button class="tactile-btn mobile-close-btn" id="sidebar-close-btn" aria-label="Close Routing Matrix" title="Close">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="mounting-screw top-right" aria-hidden="true"></div>
    </div>

    <!-- Recessed Channel Strip -->
    <nav class="sidebar-nav" aria-label="Hardware Channel Selectors">
      <div class="rack-channel-header">ROUTING MATRIX</div>
      ${navItemsHTML}
    </nav>

    <!-- Bottom Chassis Plate -->
    <div class="sidebar-rack-foot">
      <div class="mounting-screw bottom-left" aria-hidden="true"></div>
      <div class="chassis-spec-label">REV 2.4 // 64-BIT WASM</div>
      <div class="mounting-screw bottom-right" aria-hidden="true"></div>
    </div>
  `;

  if (!container.classList.contains('sidebar')) {
    container.classList.add('sidebar');
  }

  function closeDrawer() {
    container.classList.remove('mobile-open');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (backdrop) backdrop.classList.remove('active');
  }

  // Close drawer button
  const closeBtn = container.querySelector('#sidebar-close-btn');
  closeBtn?.addEventListener('click', () => {
    playSound('click');
    closeDrawer();
  });

  // Close drawer on backdrop click
  const backdrop = document.getElementById('sidebar-backdrop');
  if (backdrop && !backdrop._hasListener) {
    backdrop.addEventListener('click', () => {
      playSound('click');
      closeDrawer();
    });
    backdrop._hasListener = true;
  }

  // Event delegation for nav clicks with audio click feedback
  const nav = container.querySelector('.sidebar-nav');
  if (nav) {
    nav.addEventListener('click', (e) => {
      const item = e.target.closest('.sidebar-item');
      if (!item) return;

      const route = item.dataset.route;
      if (!route) return;

      playSound('click');
      closeDrawer();

      nav.querySelectorAll('.sidebar-item').forEach((el) => {
        el.classList.toggle('active', el === item);
        const led = el.querySelector('.channel-status-led');
        if (led) led.classList.toggle('active', el === item);
      });

      if (typeof onNavigate === 'function') {
        onNavigate(route);
      }
    });
  }

  const logo = container.querySelector('.sidebar-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      playSound('click');
      closeDrawer();
      if (typeof onNavigate === 'function') {
        onNavigate('journey');
      }
    });
  }
}

/**
 * Render or update the mobile bottom navigation dock.
 *
 * @param {HTMLElement} container   — DOM element for bottom nav
 * @param {string}     currentRoute — active route
 * @param {Function}   onNavigate   — navigation callback
 */
export function renderMobileBottomNav(container, currentRoute, onNavigate) {
  if (!container) return;

  const isChallengeOrLesson = currentRoute.startsWith('lesson/') ||
                              currentRoute.startsWith('sql-lesson/') ||
                              currentRoute.startsWith('quiz/');

  if (isChallengeOrLesson) {
    container.classList.add('hidden');
    return;
  } else {
    container.classList.remove('hidden');
  }

  const BOTTOM_TABS = [
    { route: 'journey',     icon: icon('terminal', 18),   label: 'Python' },
    { route: 'sql-journey', icon: icon('database', 18),   label: 'SQL' },
    { route: 'dsa-journey', icon: icon('git-branch', 18), label: 'DSA' },
    { route: 'practice',    icon: icon('code', 18),       label: 'Practice' },
    { route: '__menu__',    icon: icon('layers', 18),     label: 'Matrix' },
  ];

  container.innerHTML = BOTTOM_TABS.map((tab) => {
    const isActive = currentRoute === tab.route;
    return `
      <button class="mobile-nav-btn ${isActive ? 'active' : ''}" data-route="${tab.route}" aria-label="${tab.label}">
        <span class="mobile-nav-led ${isActive ? 'active' : ''}"></span>
        <span class="mobile-nav-icon">${tab.icon}</span>
        <span class="mobile-nav-label">${tab.label}</span>
      </button>
    `;
  }).join('');

  container.onclick = (e) => {
    const btn = e.target.closest('.mobile-nav-btn');
    if (!btn) return;
    const route = btn.dataset.route;
    if (!route) return;

    playSound('click');

    if (route === '__menu__') {
      const sidebar = document.getElementById('sidebar');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (sidebar) {
        const isOpen = sidebar.classList.toggle('mobile-open');
        if (backdrop) backdrop.classList.toggle('active', isOpen);
      }
    } else {
      if (typeof onNavigate === 'function') {
        onNavigate(route);
      }
    }
  };
}

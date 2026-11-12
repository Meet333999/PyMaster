/* ==========================================================================
   Code Level / PyMaster — Modern Navigation Rail
   Combines Code Level's minimalist icon rail with sleek card-based styling,
   tactile pill indicators, and floating mobile capsule dock.
   ========================================================================== */

import { icon } from './icons.js';
import { playSound } from '../engine/haptics.js';

const NAV_ITEMS = [
  { route: 'journey',     icon: icon('terminal', 18),   label: 'Python',    badge: '134' },
  { route: 'sql-journey', icon: icon('database', 18),   label: 'SQL',       badge: '133' },
  { route: 'dsa-journey', icon: icon('git-branch', 18), label: 'DSA',       badge: '110' },
  { route: 'practice',    icon: icon('code', 18),       label: 'Practice' },
  { route: 'goals',       icon: icon('target', 18),     label: 'Goals' },
  { route: 'leaderboard', icon: icon('activity', 18),   label: 'Telemetry' },
  { route: 'profile',     icon: icon('user', 18),       label: 'Profile' },
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
        title="${item.label}"
      >
        <span class="sidebar-item-pill ${isActive ? 'active' : ''}"></span>
        <span class="sidebar-icon">${item.icon}</span>
        <span class="sidebar-label">${item.label}</span>
        ${item.badge ? `<span class="sidebar-badge">${item.badge}</span>` : ''}
      </button>
    `;
  }).join('');

  container.innerHTML = `
    <!-- Brand Header -->
    <div class="sidebar-head">
      <a href="#" class="sidebar-logo" aria-label="Code Level">
        <span class="logo-icon-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
        </span>
        <div class="logo-text-group">
          <span class="logo-text">CODE LEVEL</span>
          <span class="logo-subtext">MASTER CODE</span>
        </div>
      </a>
      <button class="tactile-btn mobile-close-btn" id="sidebar-close-btn" aria-label="Close Navigation" title="Close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Navigation List -->
    <nav class="sidebar-nav" aria-label="Main Navigation">
      <div class="sidebar-section-title">CURRICULUM</div>
      ${navItemsHTML}
    </nav>

    <!-- Bottom Engine Status -->
    <div class="sidebar-foot">
      <div class="engine-status-pill" title="Pyodide & SQLite Engine Ready">
        <span class="engine-status-dot"></span>
        <span class="engine-status-text">Engine Ready</span>
      </div>
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

  // Event delegation for nav clicks with audio feedback
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
        const pill = el.querySelector('.sidebar-item-pill');
        if (pill) pill.classList.toggle('active', el === item);
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
                              currentRoute.startsWith('dsa-lesson/') ||
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
    { route: '__menu__',    icon: icon('layers', 18),     label: 'Menu' },
  ];

  container.innerHTML = BOTTOM_TABS.map((tab) => {
    const isActive = currentRoute === tab.route;
    return `
      <button class="mobile-nav-btn ${isActive ? 'active' : ''}" data-route="${tab.route}" aria-label="${tab.label}">
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

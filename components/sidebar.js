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

  // Event delegation for nav clicks with audio click feedback
  const nav = container.querySelector('.sidebar-nav');
  if (nav) {
    nav.addEventListener('click', (e) => {
      const item = e.target.closest('.sidebar-item');
      if (!item) return;

      const route = item.dataset.route;
      if (!route) return;

      playSound('click');

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
      if (typeof onNavigate === 'function') {
        onNavigate('journey');
      }
    });
  }
}

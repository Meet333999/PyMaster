/* ==========================================================================
   PyMaster — Sidebar Navigation Component
   Renders the left sidebar with logo and navigation items.
   ========================================================================== */

/**
 * Navigation items configuration.
 * Each entry defines a route, icon, and label for the sidebar.
 */
const NAV_ITEMS = [
  { route: 'journey',     icon: '🗺️', label: 'Journey' },
  { route: 'practice',    icon: '💻', label: 'Practice' },
  { route: 'goals',       icon: '🎯', label: 'Goals' },
  { route: 'leaderboard', icon: '🏆', label: 'Leaderboard' },
  { route: 'profile',     icon: '👤', label: 'Profile' },
];

/**
 * Render the sidebar navigation into the given container.
 *
 * @param {HTMLElement} container   — DOM element to render the sidebar into
 * @param {string}     currentRoute — the currently active route name
 * @param {Function}   onNavigate   — callback invoked with the route string on click
 */
export function renderSidebar(container, currentRoute, onNavigate) {
  if (!container) {
    console.error('[Sidebar] Container element is required.');
    return;
  }

  // Build nav items HTML
  const navItemsHTML = NAV_ITEMS.map((item) => {
    const isActive = currentRoute === item.route;
    return `
      <button
        class="sidebar-item ${isActive ? 'active' : ''}"
        data-route="${item.route}"
        aria-label="${item.label}"
        title="${item.label}"
      >
        <span class="sidebar-icon">${item.icon}</span>
        <span class="sidebar-label">${item.label}</span>
      </button>
    `;
  }).join('');

  // Render full sidebar
  container.innerHTML = `
    <a href="#" class="sidebar-logo" aria-label="PyMaster Home">
      <span class="logo-icon">🐍</span>
      <span class="logo-text">PyMaster</span>
    </a>

    <nav class="sidebar-nav" aria-label="Main navigation">
      ${navItemsHTML}
    </nav>
  `;

  // Apply sidebar class if not already present
  if (!container.classList.contains('sidebar')) {
    container.classList.add('sidebar');
  }

  // ── Event delegation for nav clicks ──
  const nav = container.querySelector('.sidebar-nav');
  if (nav) {
    nav.addEventListener('click', (e) => {
      // Find the closest sidebar-item from the click target
      const item = e.target.closest('.sidebar-item');
      if (!item) return;

      const route = item.dataset.route;
      if (!route) return;

      // Update active state visually
      nav.querySelectorAll('.sidebar-item').forEach((el) => {
        el.classList.toggle('active', el === item);
      });

      // Notify the app
      if (typeof onNavigate === 'function') {
        onNavigate(route);
      }
    });
  }

  // ── Logo click → navigate to journey ──
  const logo = container.querySelector('.sidebar-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof onNavigate === 'function') {
        onNavigate('journey');
      }
    });
  }
}

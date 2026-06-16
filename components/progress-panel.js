/* ==========================================================================
   PyMaster — Right Sidebar Progress Panel
   Displays promo card, leaderboard preview, and daily goals.
   ========================================================================== */

/** Element ID for targeted updates */
const PANEL_ID = 'pymaster-progress-panel';

/**
 * Fake leaderboard data for the preview.
 */
const LEADERBOARD_DATA = [
  { name: 'AlexPython',   xp: 12_450, avatar: 'A' },
  { name: 'CodeNinja42',  xp: 10_280, avatar: 'C' },
  { name: 'PySherlock',   xp: 9_730,  avatar: 'P' },
  { name: 'DevDynamo',    xp: 8_510,  avatar: 'D' },
  { name: 'ByteMaster',   xp: 7_920,  avatar: 'B' },
];

/**
 * Render the progress panel into the given container.
 *
 * @param {HTMLElement} container — DOM element to render into
 * @param {import('../engine/state.js').GameState} state — game state instance
 */
export function renderProgressPanel(container, state) {
  if (!container) {
    console.error('[ProgressPanel] Container element is required.');
    return;
  }

  if (!container.classList.contains('right-panel')) {
    container.classList.add('right-panel');
  }

  container.id = PANEL_ID;

  const dailyGoals = state.getDailyGoals();

  container.innerHTML = `
    <div class="progress-panel">
      <!-- ── Promo Card ── -->
      ${_renderPromoCard()}

      <!-- ── Leaderboard ── -->
      ${_renderLeaderboard()}

      <!-- ── Daily Goals ── -->
      ${_renderDailyGoals(dailyGoals)}
    </div>
  `;
}

/**
 * Update the progress panel without a full re-render.
 * Currently re-renders the daily goals section only.
 *
 * @param {import('../engine/state.js').GameState} state
 */
export function updateProgressPanel(state) {
  const panel = document.getElementById(PANEL_ID);
  if (!panel) return;

  const goalsCard = panel.querySelector('.daily-goals-card');
  if (!goalsCard) {
    // Fallback to full re-render
    renderProgressPanel(panel, state);
    return;
  }

  const dailyGoals = state.getDailyGoals();

  // Update each goal's progress bar and counter
  _updateGoalItem(goalsCard, 'perfect', dailyGoals.perfectCompletions);
  _updateGoalItem(goalsCard, 'exercise', dailyGoals.exercises);
  _updateGoalItem(goalsCard, 'xp', dailyGoals.xp);
}

/* --------------------------------------------------------------------------
   Sub-Renderers
   -------------------------------------------------------------------------- */

/**
 * Render the GO PRO promo card.
 * @returns {string} HTML
 */
function _renderPromoCard() {
  return `
    <div class="promo-card">
      <div class="promo-title">🚀 Get More</div>
      <div class="promo-desc">Unlock all lessons, remove ads, and get unlimited hints.</div>
      <button class="btn-pro" aria-label="Upgrade to Pro">
        ⭐ GO PRO
      </button>
    </div>
  `;
}

/**
 * Render the leaderboard preview card.
 * @returns {string} HTML
 */
function _renderLeaderboard() {
  const entriesHTML = LEADERBOARD_DATA.map((entry, i) => {
    const rankDisplay = i + 1;
    return `
      <div class="leaderboard-entry">
        <span class="rank">${rankDisplay}</span>
        <div class="lb-avatar">${entry.avatar}</div>
        <span class="lb-name">${entry.name}</span>
        <span class="lb-xp">${entry.xp.toLocaleString()} XP</span>
      </div>
    `;
  }).join('');

  return `
    <div class="leaderboard-card">
      <div class="card-title">🏆 Leaderboard</div>
      ${entriesHTML}
    </div>
  `;
}

/**
 * Render the daily goals card with progress bars.
 * @param {{ perfectCompletions: {current:number,target:number}, exercises: {current:number,target:number}, xp: {current:number,target:number} }} goals
 * @returns {string} HTML
 */
function _renderDailyGoals(goals) {
  return `
    <div class="daily-goals-card">
      <div class="card-title">📋 Daily Goals</div>

      ${_renderGoalItem('perfect', '🎯 Get 2 perfect completions', goals.perfectCompletions)}
      ${_renderGoalItem('exercise', '💻 Complete 4 exercises', goals.exercises)}
      ${_renderGoalItem('xp', '⚡ Earn 60 XP', goals.xp)}
    </div>
  `;
}

/**
 * Render a single goal item with a progress bar.
 * @param {string} type
 * @param {string} label
 * @param {{ current: number, target: number }} goal
 * @returns {string} HTML
 */
function _renderGoalItem(type, label, goal) {
  const percent = Math.min((goal.current / goal.target) * 100, 100);
  const isComplete = goal.current >= goal.target;

  return `
    <div class="goal-item" data-goal-type="${type}">
      <div class="goal-header">
        <span class="goal-label">${label}</span>
        <span class="goal-count" data-goal-count="${type}">${goal.current}/${goal.target}</span>
      </div>
      <div class="goal-progress">
        <div
          class="goal-progress-fill ${isComplete ? 'complete' : ''}"
          data-goal-fill="${type}"
          style="width: ${percent}%"
        ></div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   Update Helpers
   -------------------------------------------------------------------------- */

/**
 * Update a single goal item's progress bar and count text.
 * @param {HTMLElement} container
 * @param {string} type
 * @param {{ current: number, target: number }} goal
 */
function _updateGoalItem(container, type, goal) {
  const countEl = container.querySelector(`[data-goal-count="${type}"]`);
  const fillEl  = container.querySelector(`[data-goal-fill="${type}"]`);

  if (countEl) {
    countEl.textContent = `${goal.current}/${goal.target}`;
  }

  if (fillEl) {
    const percent = Math.min((goal.current / goal.target) * 100, 100);
    fillEl.style.width = `${percent}%`;

    if (goal.current >= goal.target) {
      fillEl.classList.add('complete');
    } else {
      fillEl.classList.remove('complete');
    }
  }
}

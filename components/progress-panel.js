/* ==========================================================================
   PyMaster — Right Sidebar Progress Panel
   Displays promo card, leaderboard preview, and daily goals.
   ========================================================================== */

import { icon } from './icons.js';
import { getAllLessons } from '../data/curriculum.js';
import { getAllSQLLessons } from '../data/sql-curriculum.js';

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
  const completedLessonsSet = state.getCompletedLessons();
  const completedPython = [...completedLessonsSet].filter(id => !id.startsWith('sql_')).length;
  const completedSQL = [...completedLessonsSet].filter(id => id.startsWith('sql_')).length;

  const totalPython = getAllLessons().length;
  const totalSQL = getAllSQLLessons().length;

  const pythonPercent = totalPython > 0 ? Math.round((completedPython / totalPython) * 100) : 0;
  const sqlPercent = totalSQL > 0 ? Math.round((completedSQL / totalSQL) * 100) : 0;

  container.innerHTML = `
    <div class="progress-panel">
      <!-- ── Promo Card ── -->
      ${_renderPromoCard()}

      <!-- ── Course Progress ── -->
      <div class="progress-card course-progress-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
        <div class="card-title" style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.95rem; color: var(--color-text-muted);">
          ${icon('bar-chart', 16)} Course Progress
        </div>
        
        <!-- Python -->
        <div style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
            <span style="color: var(--color-primary); display: flex; align-items: center; gap: 4px; font-weight: 500;">
              ${icon('terminal', 12)} Python
            </span>
            <span style="color: var(--color-text-muted); font-size: 0.8rem;">${completedPython}/${totalPython} (${pythonPercent}%)</span>
          </div>
          <div style="background: var(--color-background); border-radius: 4px; height: 6px; overflow: hidden; width: 100%;">
            <div style="background: var(--color-primary); height: 100%; border-radius: 4px; width: ${pythonPercent}%;"></div>
          </div>
        </div>

        <!-- SQL -->
        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 0.85rem;">
            <span style="color: #00e5ff; display: flex; align-items: center; gap: 4px; font-weight: 500;">
              ${icon('database', 12)} SQL
            </span>
            <span style="color: var(--color-text-muted); font-size: 0.8rem;">${completedSQL}/${totalSQL} (${sqlPercent}%)</span>
          </div>
          <div style="background: var(--color-background); border-radius: 4px; height: 6px; overflow: hidden; width: 100%;">
            <div style="background: #00e5ff; height: 100%; border-radius: 4px; width: ${sqlPercent}%;"></div>
          </div>
        </div>
      </div>

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
      <div class="promo-title">${icon('rocket', 16)} Get More</div>
      <div class="promo-desc">Unlock all lessons, remove ads, and get unlimited hints.</div>
      <button class="btn-pro" aria-label="Upgrade to Pro">
        ${icon('star', 16)} GO PRO
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
      <div class="card-title">${icon('trophy', 16)} Leaderboard</div>
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
      <div class="card-title">${icon('clipboard', 16)} Daily Goals</div>

      ${_renderGoalItem('perfect', `${icon('target', 14)} Get 2 perfect completions`, goals.perfectCompletions)}
      ${_renderGoalItem('exercise', `${icon('code', 14)} Complete 4 exercises`, goals.exercises)}
      ${_renderGoalItem('xp', `${icon('zap', 14)} Earn 60 XP`, goals.xp)}
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

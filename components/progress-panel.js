/* ==========================================================================
   Code Level / PyMaster — Modern Right Progress Deck & Analytics
   Blends Code Level's course progress indicators with the reference image's
   glassmorphic analytics cards, circular completion gauge, and daily benchmarks.
   ========================================================================== */

import { icon } from './icons.js';
import { getAllLessons } from '../data/curriculum.js';
import { getAllSQLLessons } from '../data/sql-curriculum.js';
import { getAllDSALessons } from '../data/dsa-curriculum.js';
import { playSound } from '../engine/haptics.js';

const PANEL_ID = 'pymaster-progress-panel';

/**
 * Render the progress panel into the given container.
 *
 * @param {HTMLElement} container — DOM element to render into
 * @param {import('../engine/state.js').GameState} state — game state instance
 */
export function renderProgressPanel(container, state) {
  if (!container) return;

  if (!container.classList.contains('right-panel')) {
    container.classList.add('right-panel');
  }

  container.id = PANEL_ID;

  const dailyGoals = state.getDailyGoals();
  const completedLessonsSet = state.getCompletedLessons();
  const completedPython = [...completedLessonsSet].filter(id => !id.startsWith('sql_') && !id.startsWith('dsa_')).length;
  const completedSQL = [...completedLessonsSet].filter(id => id.startsWith('sql_')).length;
  const completedDSA = [...completedLessonsSet].filter(id => id.startsWith('dsa_')).length;

  const totalPython = getAllLessons().length || 1;
  const totalSQL = getAllSQLLessons().length || 1;
  const totalDSA = getAllDSALessons().length || 1;

  const totalLessons = totalPython + totalSQL + totalDSA;
  const totalCompleted = completedPython + completedSQL + completedDSA;
  const masterPercent = Math.min(100, Math.round((totalCompleted / totalLessons) * 100));

  const pythonPercent = Math.min(100, Math.round((completedPython / totalPython) * 100));
  const sqlPercent = Math.min(100, Math.round((completedSQL / totalSQL) * 100));
  const dsaPercent = Math.min(100, Math.round((completedDSA / totalDSA) * 100));

  // Circular gauge circumference for r=38
  const circumference = 2 * Math.PI * 38;
  const strokeDashoffset = circumference - (masterPercent / 100) * circumference;

  container.innerHTML = `
    <div class="progress-panel-rack">
      <!-- ── Panel Header ── -->
      <div class="analytics-deck-header">
        <div class="deck-title-group">
          <span class="deck-tag">ANALYTICS</span>
          <h3 class="deck-heading">Course Mastery</h3>
        </div>
      </div>

      <!-- ── Card 1: Circular Progress Mastery ── -->
      <div class="modern-card-panel mastery-card">
        <div class="mastery-gauge-wrap">
          <svg class="mastery-gauge-svg" width="100" height="100" viewBox="0 0 100 100">
            <circle class="gauge-bg" cx="50" cy="50" r="38" />
            <circle class="gauge-fill" cx="50" cy="50" r="38"
              style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${strokeDashoffset};" />
          </svg>
          <div class="mastery-gauge-center">
            <span class="mastery-val">${masterPercent}%</span>
          </div>
        </div>
        <div class="mastery-info-col">
          <span class="mastery-subtag">TOTAL PROGRESS</span>
          <span class="mastery-count">${totalCompleted} of ${totalLessons} Lessons</span>
          <span class="mastery-status-pill">${masterPercent >= 100 ? 'Mastered' : 'In Progress'}</span>
        </div>
      </div>

      <!-- ── Card 2: Course Progress (Code Level Style) ── -->
      <div class="modern-card-panel course-progress-card">
        <div class="card-title-bar">
          <span class="card-section-tag">TRACKS</span>
          <span class="card-section-heading">Curriculum Progress</span>
        </div>

        <div class="course-track-list">
          <!-- Python Track -->
          <div class="course-track-item">
            <div class="track-info-row">
              <span class="track-name">Python</span>
              <span class="track-numbers">${completedPython} / ${totalPython}</span>
            </div>
            <div class="track-bar-track">
              <div class="track-bar-fill" style="width: ${pythonPercent}%;"></div>
            </div>
          </div>

          <!-- SQL Track -->
          <div class="course-track-item">
            <div class="track-info-row">
              <span class="track-name">SQL</span>
              <span class="track-numbers">${completedSQL} / ${totalSQL}</span>
            </div>
            <div class="track-bar-track">
              <div class="track-bar-fill" style="width: ${sqlPercent}%;"></div>
            </div>
          </div>

          <!-- DSA Track -->
          <div class="course-track-item">
            <div class="track-info-row">
              <span class="track-name">DSA</span>
              <span class="track-numbers">${completedDSA} / ${totalDSA}</span>
            </div>
            <div class="track-bar-track">
              <div class="track-bar-fill" style="width: ${dsaPercent}%;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Card 3: Daily Objectives ── -->
      <div class="modern-card-panel daily-goals-card">
        <div class="card-title-bar">
          <span class="card-section-tag">OBJECTIVES</span>
          <span class="card-section-heading">Daily Benchmarks</span>
        </div>

        <div class="daily-goals-list">
          ${_renderGoalItem('perfect', 'Perfect Executions (1st Try)', dailyGoals.perfectCompletions)}
          ${_renderGoalItem('exercise', 'Challenges Solved Today', dailyGoals.exercises)}
          ${_renderGoalItem('xp', 'Target Daily XP Points', dailyGoals.xp)}
        </div>
      </div>

      <!-- ── Card 4: Runtime Environment ── -->
      <div class="modern-card-panel engine-diag-card">
        <div class="card-title-bar">
          <span class="card-section-tag">ENVIRONMENT</span>
          <span class="card-section-heading">Runtime Engines</span>
        </div>

        <div class="runtime-specs-grid">
          <div class="spec-row">
            <span class="spec-name">Pyodide Python 3.11</span>
            <span class="spec-status-ok">WASM Ready</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">SQLite In-Memory</span>
            <span class="spec-status-ok">Active</span>
          </div>
          <div class="spec-row">
            <span class="spec-name">State Storage</span>
            <span class="spec-status-ok">Synced</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Update the progress panel without full re-render.
 * @param {import('../engine/state.js').GameState} state
 */
export function updateProgressPanel(state) {
  const panel = document.getElementById(PANEL_ID);
  if (!panel) return;

  renderProgressPanel(panel, state);
}

function _renderGoalItem(id, title, goal) {
  const current = goal.current || 0;
  const target = goal.target || 1;
  const isComplete = current >= target;
  const percent = Math.min(100, Math.round((current / target) * 100));

  return `
    <div class="goal-item ${isComplete ? 'completed' : ''}" data-goal="${id}">
      <div class="goal-header-row">
        <span class="goal-check-circle ${isComplete ? 'done' : ''}">
          ${isComplete ? '✓' : ''}
        </span>
        <span class="goal-title">${title}</span>
        <span class="goal-numbers">${current}/${target}</span>
      </div>
      <div class="goal-bar-track">
        <div class="goal-bar-fill" style="width: ${percent}%;"></div>
      </div>
    </div>
  `;
}

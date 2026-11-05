/* ==========================================================================
   PyMaster — Skeuomorphic Right Progress Deck & Hardware Telemetry
   Features realistic rotary dials, vertical meters, engine diagnostics,
   and daily objectives. Zero fake bots or marketing promo cards.
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

  // Calculate knob rotation angle (-135deg to +135deg)
  const knobAngle = -135 + (masterPercent / 100) * 270;

  container.innerHTML = `
    <div class="progress-panel-rack">
      <!-- ── Hardware Header Faceplate ── -->
      <div class="rack-unit-header">
        <div class="mounting-screw top-left" aria-hidden="true"></div>
        <div class="rack-unit-title">
          <span class="rack-unit-id-badge">TELEMETRY</span>
          <span class="rack-unit-name">SYSTEM DIAGNOSTICS</span>
        </div>
        <div class="mounting-screw top-right" aria-hidden="true"></div>
      </div>

      <!-- ── Module 1: Rotary Master Progress Dial (Like the LEVEL knob in ref image) ── -->
      <div class="hardware-module-card rotary-master-module">
        <div class="module-title-bar">
          <span class="module-tag">SYS-LVL</span>
          <span class="module-heading">CURRICULUM MASTERY</span>
        </div>

        <div class="knob-assembly">
          <!-- Stepped Radial Tick Marks -->
          <div class="knob-ticks-ring" aria-hidden="true">
            <span class="tick tick-min">0%</span>
            <span class="tick tick-mid">50%</span>
            <span class="tick tick-max">100%</span>
          </div>

          <!-- Rotary Knob Body -->
          <div class="skeuo-knob knob-large" id="master-progress-knob" style="--rotation: ${knobAngle}deg;" title="Overall Mastery: ${masterPercent}%">
            <div class="knob-face">
              <div class="knob-notch"></div>
            </div>
          </div>

          <!-- Readout Bezel -->
          <div class="knob-readout-bezel">
            <span class="knob-readout-val">${masterPercent}</span>
            <span class="knob-readout-unit">%</span>
          </div>
          <div class="knob-label-sub">TOTAL COMPLETION</div>
        </div>
      </div>

      <!-- ── Module 2: Channel Level Faders / VU Meters (Python, SQL, DSA) ── -->
      <div class="hardware-module-card channel-meters-module">
        <div class="module-title-bar">
          <span class="module-tag">CH-METERS</span>
          <span class="module-heading">MODULE PROGRESS</span>
        </div>

        <div class="channel-strips-rack">
          <!-- Channel 1: Python -->
          <div class="channel-strip">
            <div class="strip-header">
              <span class="strip-channel-name">CH 1: PYTHON</span>
              <span class="strip-val">${completedPython}/${totalPython}</span>
            </div>
            <div class="strip-vu-track">
              <div class="strip-vu-fill" style="width: ${pythonPercent}%;"></div>
            </div>
            <div class="strip-scale">
              <span>-24</span><span>-12</span><span>-6</span><span>0dB</span>
            </div>
          </div>

          <!-- Channel 2: SQL -->
          <div class="channel-strip">
            <div class="strip-header">
              <span class="strip-channel-name">CH 2: SQL</span>
              <span class="strip-val">${completedSQL}/${totalSQL}</span>
            </div>
            <div class="strip-vu-track">
              <div class="strip-vu-fill" style="width: ${sqlPercent}%;"></div>
            </div>
            <div class="strip-scale">
              <span>-24</span><span>-12</span><span>-6</span><span>0dB</span>
            </div>
          </div>

          <!-- Channel 3: DSA -->
          <div class="channel-strip">
            <div class="strip-header">
              <span class="strip-channel-name">CH 3: DSA</span>
              <span class="strip-val">${completedDSA}/${totalDSA}</span>
            </div>
            <div class="strip-vu-track">
              <div class="strip-vu-fill" style="width: ${dsaPercent}%;"></div>
            </div>
            <div class="strip-scale">
              <span>-24</span><span>-12</span><span>-6</span><span>0dB</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Module 3: Daily Objectives (Real State) ── -->
      <div class="hardware-module-card daily-goals-module">
        <div class="module-title-bar">
          <span class="module-tag">OBJECTIVES</span>
          <span class="module-heading">DAILY BENCHMARKS</span>
        </div>

        <div class="daily-goals-rack">
          ${_renderGoalItem('perfect', 'Perfect Executions (1st Try)', dailyGoals.perfectCompletions)}
          ${_renderGoalItem('exercise', 'Challenges Solved Today', dailyGoals.exercises)}
          ${_renderGoalItem('xp', 'Target Daily XP Points', dailyGoals.xp)}
        </div>
      </div>

      <!-- ── Module 4: Engine Status Diagnostics ── -->
      <div class="hardware-module-card engine-diag-module">
        <div class="module-title-bar">
          <span class="module-tag">RUNTIME</span>
          <span class="module-heading">ENGINE STATUS</span>
        </div>

        <div class="runtime-specs-grid">
          <div class="spec-row">
            <span class="spec-led status-green" title="Active"></span>
            <span class="spec-name">Pyodide 0.24.1</span>
            <span class="spec-value">WASM // OK</span>
          </div>
          <div class="spec-row">
            <span class="spec-led status-green" title="Active"></span>
            <span class="spec-name">SQLite3 Core</span>
            <span class="spec-value">IN-MEMORY</span>
          </div>
          <div class="spec-row">
            <span class="spec-led status-green" title="Active"></span>
            <span class="spec-name">State Storage</span>
            <span class="spec-value">SYNC ACTIVE</span>
          </div>
        </div>
      </div>

      <!-- ── Rack Footplate ── -->
      <div class="rack-unit-footer">
        <div class="mounting-screw bottom-left" aria-hidden="true"></div>
        <div class="rack-unit-serial">UNIT S/N: PM-9082-HW</div>
        <div class="mounting-screw bottom-right" aria-hidden="true"></div>
      </div>
    </div>
  `;

  // Attach interactive click on master knob
  const knob = container.querySelector('#master-progress-knob');
  if (knob) {
    knob.addEventListener('click', () => {
      playSound('knob');
      knob.classList.add('knob-spin-pulse');
      setTimeout(() => knob.classList.remove('knob-spin-pulse'), 400);
    });
  }
}

/**
 * Update the progress panel without full re-render.
 * @param {import('../engine/state.js').GameState} state
 */
export function updateProgressPanel(state) {
  const panel = document.getElementById(PANEL_ID);
  if (!panel) return;

  // Perform full re-render to keep all dials, meters, and goals in sync
  renderProgressPanel(panel, state);
}

function _renderGoalItem(id, title, goal) {
  const current = goal.current || 0;
  const target = goal.target || 1;
  const isComplete = current >= target;
  const percent = Math.min(100, Math.round((current / target) * 100));

  return `
    <div class="hardware-goal-item ${isComplete ? 'completed' : ''}" data-goal="${id}">
      <div class="goal-header-row">
        <span class="goal-led ${isComplete ? 'status-green' : 'status-idle'}"></span>
        <span class="goal-title">${title}</span>
        <span class="goal-numbers">${current}/${target}</span>
      </div>
      <div class="goal-slot-track">
        <div class="goal-slot-fill" style="width: ${percent}%;"></div>
      </div>
    </div>
  `;
}

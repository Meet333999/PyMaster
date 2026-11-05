// ==========================================================================
// PyMaster — Skeuomorphic Goals & Daily Objectives Console
// Physical objectives rack, weekly chronometer calendar, and milestone meters
// ==========================================================================

import { icon } from './icons.js';
import { playSound } from '../engine/haptics.js';

export function renderGoalsPage(container, gameState) {
  const goals = gameState.getDailyGoals();
  const stats = gameState.getStats();

  container.innerHTML = `
    <div class="page-container hardware-deck-layout">
      <!-- Hardware Stamped Faceplate -->
      <div class="page-header hardware-faceplate">
        <div class="faceplate-screw screw-left" aria-hidden="true"></div>
        <div class="page-header-content">
          <div class="unit-brand">OPERATIONAL OBJECTIVES // DAILY TELEMETRY</div>
          <h1 class="page-title">${icon('target', 20)} DAILY OBJECTIVES</h1>
          <p class="page-subtitle">Complete calibrated daily targets to earn gem reserves and maintain runtime continuity</p>
        </div>
        <div class="faceplate-screw screw-right" aria-hidden="true"></div>
      </div>

      <!-- Today's Objectives Rack -->
      <div class="section-card hardware-chassis-panel">
        <div class="section-card-header">
          <div class="section-title-group">
            <span class="header-led status-blue"></span>
            <h2 class="section-card-title">ACTIVE 24-HOUR TARGETS</h2>
          </div>
          <span class="channel-tag">RESET: 00:00 UTC</span>
        </div>

        <div class="goals-list-rack">
          ${_renderGoalCard('perfect', 'Perfect Executions', `Pass ${goals.perfectCompletions.target} challenges on initial submission without hints`, goals.perfectCompletions, 5)}
          ${_renderGoalCard('exercise', 'Routine Completions', `Complete ${goals.exercises.target} technical exercises or challenges`, goals.exercises, 3)}
          ${_renderGoalCard('xp', 'XP Yield Target', `Accumulate at least ${goals.xp.target} XP points during current cycle`, goals.xp, 2)}
        </div>
      </div>

      <!-- Streak Chronometer -->
      <div class="section-card hardware-chassis-panel">
        <div class="section-card-header">
          <div class="section-title-group">
            <span class="header-led status-green"></span>
            <h2 class="section-card-title">CHRONOMETER CONTINUITY (STREAK)</h2>
          </div>
        </div>

        <div class="streak-instrument-deck">
          <div class="streak-counter-bezel">
            <div class="streak-flame-led">${icon('flame', 24)}</div>
            <div class="streak-digits">${stats.currentStreak}</div>
            <div class="streak-unit-label">CONSECUTIVE DAYS ACTIVE</div>
          </div>

          <div class="streak-week-rack">
            ${renderStreakWeek(stats.currentStreak)}
          </div>

          <div class="streak-telemetry-note">
            <span class="note-dot"></span>
            <span>SYSTEM DIRECTIVE: Minimum 1 unit execution required every 24 hours to prevent continuity reset.</span>
          </div>
        </div>
      </div>

      <!-- Real Lifetime Benchmarks -->
      <div class="section-card hardware-chassis-panel">
        <div class="section-card-header">
          <div class="section-title-group">
            <span class="header-led status-idle"></span>
            <h2 class="section-card-title">LIFETIME RUNTIME TELEMETRY</h2>
          </div>
        </div>

        <div class="weekly-stats-strip">
          <div class="hardware-gauge-card">
            <span class="gauge-tag">TOTAL UNITS SOLVED</span>
            <span class="gauge-digits">${stats.completedLessons}</span>
            <span class="gauge-unit">ROUTINES</span>
          </div>
          <div class="hardware-gauge-card">
            <span class="gauge-tag">ACCUMULATED XP</span>
            <span class="gauge-digits status-blue-text">${stats.totalXP}</span>
            <span class="gauge-unit">POINTS</span>
          </div>
          <div class="hardware-gauge-card">
            <span class="gauge-tag">PERFECT RUN RATIO</span>
            <span class="gauge-digits status-green-text">${stats.perfectCount}</span>
            <span class="gauge-unit">FIRST-TRY</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function _renderGoalCard(id, title, desc, goal, reward) {
  const current = goal.current || 0;
  const target = goal.target || 1;
  const isDone = current >= target;
  const pct = Math.min(100, Math.round((current / target) * 100));

  return `
    <div class="goal-card-hardware ${isDone ? 'completed' : ''}" data-goal="${id}">
      <div class="goal-card-left">
        <span class="goal-diode ${isDone ? 'status-green' : 'status-idle'}"></span>
        <div class="goal-text-group">
          <h3 class="goal-card-title">${title}</h3>
          <p class="goal-card-desc">${desc}</p>
          <div class="strip-vu-track" style="margin-top: 8px;">
            <div class="strip-vu-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      </div>

      <div class="goal-card-right">
        <div class="goal-count-display">${current}/${target}</div>
        <div class="goal-reward-pill">
          <span class="reward-icon">${icon('coins', 12)}</span>
          <span>+${reward} GEMS</span>
        </div>
      </div>
    </div>
  `;
}

function renderStreakWeek(currentStreak) {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1; // Monday = 0

  return days.map((day, idx) => {
    const isActive = idx <= adjustedToday && idx >= adjustedToday - Math.min(currentStreak - 1, adjustedToday);
    const isToday = idx === adjustedToday;
    return `
      <div class="streak-peg-socket ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}">
        <div class="peg-indicator">
          <span class="peg-diode ${isActive ? 'status-green' : 'status-idle'}"></span>
        </div>
        <span class="peg-label">${day}</span>
      </div>
    `;
  }).join('');
}

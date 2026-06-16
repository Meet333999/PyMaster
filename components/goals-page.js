// ========================================
// Goals Page — Daily Goals Tracker
// ========================================

import { icon } from './icons.js';

export function renderGoalsPage(container, gameState) {
  const goals = gameState.getDailyGoals();
  const stats = gameState.getStats();

  container.innerHTML = `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">${icon('target', 20)} Daily Goals</h1>
        <p class="page-subtitle">Complete daily goals to earn bonus gems and keep your streak!</p>
      </div>

      <!-- Today's Goals -->
      <div class="section-card">
        <h2 class="section-card-title">${icon('clipboard', 18)} Today's Goals</h2>
        <div class="goals-list">
          <div class="goal-card ${goals.perfectCompletions.current >= goals.perfectCompletions.target ? 'completed' : ''}">
            <div class="goal-card-icon">${icon('star', 24)}</div>
            <div class="goal-card-info">
              <h3 class="goal-card-title">Perfect Completions</h3>
              <p class="goal-card-desc">Get ${goals.perfectCompletions.target} perfect completions (all tests pass on first try)</p>
              <div class="goal-progress">
                <div class="goal-progress-fill" style="width: ${Math.min(100, (goals.perfectCompletions.current / goals.perfectCompletions.target) * 100)}%"></div>
              </div>
              <span class="goal-count">${goals.perfectCompletions.current}/${goals.perfectCompletions.target}</span>
            </div>
            <div class="goal-reward">
              <span class="goal-reward-icon">${icon('coins', 14)}</span>
              <span>+5 gems</span>
            </div>
          </div>

          <div class="goal-card ${goals.exercises.current >= goals.exercises.target ? 'completed' : ''}">
            <div class="goal-card-icon">${icon('edit', 24)}</div>
            <div class="goal-card-info">
              <h3 class="goal-card-title">Complete Exercises</h3>
              <p class="goal-card-desc">Complete ${goals.exercises.target} exercises today</p>
              <div class="goal-progress">
                <div class="goal-progress-fill" style="width: ${Math.min(100, (goals.exercises.current / goals.exercises.target) * 100)}%"></div>
              </div>
              <span class="goal-count">${goals.exercises.current}/${goals.exercises.target}</span>
            </div>
            <div class="goal-reward">
              <span class="goal-reward-icon">${icon('coins', 14)}</span>
              <span>+3 gems</span>
            </div>
          </div>

          <div class="goal-card ${goals.xp.current >= goals.xp.target ? 'completed' : ''}">
            <div class="goal-card-icon">${icon('gem', 24)}</div>
            <div class="goal-card-info">
              <h3 class="goal-card-title">Earn XP</h3>
              <p class="goal-card-desc">Earn ${goals.xp.target} XP today</p>
              <div class="goal-progress">
                <div class="goal-progress-fill" style="width: ${Math.min(100, (goals.xp.current / goals.xp.target) * 100)}%"></div>
              </div>
              <span class="goal-count">${goals.xp.current}/${goals.xp.target}</span>
            </div>
            <div class="goal-reward">
              <span class="goal-reward-icon">${icon('coins', 14)}</span>
              <span>+2 gems</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Streak Info -->
      <div class="section-card">
        <h2 class="section-card-title">${icon('flame', 18)} Streak</h2>
        <div class="streak-display">
          <div class="streak-number">${stats.currentStreak}</div>
          <div class="streak-label">Day Streak</div>
          <div class="streak-week">
            ${renderStreakWeek(stats.currentStreak)}
          </div>
          <p class="streak-tip">Complete at least one lesson every day to keep your streak alive!</p>
        </div>
      </div>

      <!-- Weekly Summary -->
      <div class="section-card">
        <h2 class="section-card-title">${icon('bar-chart', 18)} This Week</h2>
        <div class="weekly-stats">
          <div class="weekly-stat">
            <span class="weekly-stat-value">${stats.completedLessons}</span>
            <span class="weekly-stat-label">Total Lessons</span>
          </div>
          <div class="weekly-stat">
            <span class="weekly-stat-value">${stats.totalXP}</span>
            <span class="weekly-stat-label">Total XP</span>
          </div>
          <div class="weekly-stat">
            <span class="weekly-stat-value">${stats.perfectCount}</span>
            <span class="weekly-stat-label">Perfect Runs</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStreakWeek(currentStreak) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1; // Monday = 0

  return days.map((day, idx) => {
    const isActive = idx <= adjustedToday && idx >= adjustedToday - Math.min(currentStreak - 1, adjustedToday);
    const isToday = idx === adjustedToday;
    return `
      <div class="streak-day ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}">
        <div class="streak-day-dot">${isActive ? icon('flame', 14) : icon('circle', 14)}</div>
        <span class="streak-day-label">${day}</span>
      </div>
    `;
  }).join('');
}

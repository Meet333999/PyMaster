// ========================================
// Practice Page — Random Challenges
// ========================================

import { getAllLessons } from '../data/curriculum.js';
import { getAllSQLLessons } from '../data/sql-curriculum.js';
import { icon } from './icons.js';

let activeTab = 'python'; // 'python' | 'sql'

export function renderPracticePage(container, curriculum, gameState, onLessonClick) {
  const pythonLessons = getAllLessons();
  const sqlLessons = getAllSQLLessons();

  const allLessons = activeTab === 'sql' ? sqlLessons : pythonLessons;
  const challenges = allLessons.filter(l => l.type === 'challenge');
  const completedLessons = gameState.getCompletedLessons();

  // Separate into completed and uncompleted
  const uncompletedChallenges = challenges.filter(c => !completedLessons.has(c.id));
  const completedChallenges = challenges.filter(c => completedLessons.has(c.id));

  // Pick random challenges for practice
  const practiceSet = [
    ...shuffleArray(uncompletedChallenges).slice(0, 5),
    ...shuffleArray(completedChallenges).slice(0, 3),
  ];

  const handleChallengeClick = (lessonId) => {
    const isSql = lessonId.startsWith('sql_');
    onLessonClick(lessonId, isSql);
  };

  container.innerHTML = `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">${icon('code', 20)} Practice</h1>
        <p class="page-subtitle">Sharpen your ${activeTab === 'sql' ? 'SQL' : 'Python'} skills with random challenges</p>
      </div>

      <!-- Tab Switcher -->
      <div class="practice-tabs-container">
        <div class="practice-tabs">
          <button class="practice-tab ${activeTab === 'python' ? 'active' : ''}" id="tab-practice-python">
            <span class="tab-icon">${icon('terminal', 14)}</span> Python
          </button>
          <button class="practice-tab ${activeTab === 'sql' ? 'active' : ''}" id="tab-practice-sql">
            <span class="tab-icon">${icon('database', 14)}</span> SQL
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="practice-stats">
        <div class="practice-stat">
          <span class="practice-stat-value">${challenges.length}</span>
          <span class="practice-stat-label">Total Challenges</span>
        </div>
        <div class="practice-stat">
          <span class="practice-stat-value">${completedChallenges.length}</span>
          <span class="practice-stat-label">Completed</span>
        </div>
        <div class="practice-stat">
          <span class="practice-stat-value">${uncompletedChallenges.length}</span>
          <span class="practice-stat-label">Remaining</span>
        </div>
      </div>

      <!-- Practice Challenges -->
      <div class="section-card">
        <div class="section-card-header">
          <h2 class="section-card-title">${icon('zap', 18)} Recommended Challenges</h2>
          <button class="btn-secondary" id="btn-refresh-practice">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            Refresh
          </button>
        </div>
        <div class="practice-list">
          ${practiceSet.length > 0 ? practiceSet.map(challenge => {
            const isCompleted = completedLessons.has(challenge.id);
            return `
              <div class="practice-card ${isCompleted ? 'completed' : ''}" data-lesson-id="${challenge.id}">
                <div class="practice-card-left">
                  <div class="practice-card-icon">${isCompleted ? icon('check-circle', 16) : icon('zap', 16)}</div>
                  <div class="practice-card-info">
                    <h3 class="practice-card-title">${challenge.title}</h3>
                    <p class="practice-card-desc">${truncate(challenge.challenge?.description || '', 80)}</p>
                  </div>
                </div>
                <div class="practice-card-right">
                  <span class="difficulty-badge difficulty-${challenge.difficulty}">${capitalizeFirst(challenge.difficulty)}</span>
                  <span class="xp-badge">+${challenge.xp} XP</span>
                </div>
              </div>
            `;
          }).join('') : '<p class="empty-state">No challenges available yet. Start your journey first!</p>'}
        </div>
      </div>

      <!-- By Difficulty -->
      <div class="section-card">
        <h2 class="section-card-title">${icon('bar-chart', 18)} By Difficulty</h2>
        <div class="difficulty-breakdown">
          ${['easy', 'medium', 'hard'].map(diff => {
            const total = challenges.filter(c => c.difficulty === diff).length;
            const done = challenges.filter(c => c.difficulty === diff && completedLessons.has(c.id)).length;
            return `
              <div class="difficulty-row">
                <span class="difficulty-badge difficulty-${diff}">${capitalizeFirst(diff)}</span>
                <div class="goal-progress" style="flex: 1; margin: 0 12px;">
                  <div class="goal-progress-fill" style="width: ${total > 0 ? (done/total*100) : 0}%"></div>
                </div>
                <span class="difficulty-count">${done}/${total}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  // Event listeners
  container.querySelectorAll('.practice-card').forEach(card => {
    card.addEventListener('click', () => {
      const lessonId = card.dataset.lessonId;
      if (lessonId) handleChallengeClick(lessonId);
    });
  });

  container.querySelector('#tab-practice-python')?.addEventListener('click', () => {
    activeTab = 'python';
    renderPracticePage(container, curriculum, gameState, onLessonClick);
  });

  container.querySelector('#tab-practice-sql')?.addEventListener('click', () => {
    activeTab = 'sql';
    renderPracticePage(container, curriculum, gameState, onLessonClick);
  });

  container.querySelector('#btn-refresh-practice')?.addEventListener('click', () => {
    renderPracticePage(container, curriculum, gameState, onLessonClick);
  });
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function truncate(str, len) {
  if (str.length <= len) return str;
  return str.slice(0, len) + '...';
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

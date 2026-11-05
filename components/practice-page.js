// ==========================================================================
// PyMaster — Skeuomorphic Practice Deck
// Channel matrix with hardware filters, digital gauges, and tactile cards
// ==========================================================================

import { getAllLessons } from '../data/curriculum.js';
import { getAllSQLLessons } from '../data/sql-curriculum.js';
import { getAllDSALessons } from '../data/dsa-curriculum.js';
import { icon } from './icons.js';
import { playSound } from '../engine/haptics.js';

let activeTab = 'python'; // 'python' | 'sql' | 'dsa'

export function renderPracticePage(container, curriculum, gameState, onLessonClick) {
  const pythonLessons = getAllLessons();
  const sqlLessons = getAllSQLLessons();
  const dsaLessons = getAllDSALessons();

  let allLessons;
  if (activeTab === 'sql') {
    allLessons = sqlLessons;
  } else if (activeTab === 'dsa') {
    allLessons = dsaLessons;
  } else {
    allLessons = pythonLessons;
  }
  const challenges = allLessons.filter(l => l.type === 'challenge');
  const completedLessons = gameState.getCompletedLessons();

  const uncompletedChallenges = challenges.filter(c => !completedLessons.has(c.id));
  const completedChallenges = challenges.filter(c => completedLessons.has(c.id));

  const practiceSet = [
    ...shuffleArray(uncompletedChallenges).slice(0, 5),
    ...shuffleArray(completedChallenges).slice(0, 3),
  ];

  const handleChallengeClick = (lessonId) => {
    playSound('click');
    const isSql = lessonId.startsWith('sql_');
    const isDsa = lessonId.startsWith('dsa_');
    onLessonClick(lessonId, isSql, isDsa);
  };

  container.innerHTML = `
    <div class="page-container hardware-deck-layout">
      <!-- Stamped Header Plate -->
      <div class="page-header hardware-faceplate">
        <div class="faceplate-screw screw-left" aria-hidden="true"></div>
        <div class="page-header-content">
          <div class="unit-brand">PRACTICE HARNESS // ON-DEMAND EVALUATION</div>
          <h1 class="page-title">${icon('code', 20)} WORKBENCH</h1>
          <p class="page-subtitle">Selective stress-testing on isolated algorithmic and database routines</p>
        </div>
        <div class="faceplate-screw screw-right" aria-hidden="true"></div>
      </div>

      <!-- Segmented Pill Switcher (Ref Image Style) -->
      <div class="practice-tabs-container">
        <div class="segmented-pill-container" role="tablist">
          <button class="segmented-pill-option ${activeTab === 'python' ? 'active' : ''}" id="tab-practice-python" role="tab">
            <span class="tab-icon">${icon('terminal', 14)}</span>
            <span>PYTHON CORE</span>
          </button>
          <button class="segmented-pill-option ${activeTab === 'sql' ? 'active' : ''}" id="tab-practice-sql" role="tab">
            <span class="tab-icon">${icon('database', 14)}</span>
            <span>SQL RELATIONAL</span>
          </button>
          <button class="segmented-pill-option ${activeTab === 'dsa' ? 'active' : ''}" id="tab-practice-dsa" role="tab">
            <span class="tab-icon">${icon('git-branch', 14)}</span>
            <span>DSA STRUCTURES</span>
          </button>
        </div>
      </div>

      <!-- Hardware Digital Gauge Strip -->
      <div class="practice-stats-strip">
        <div class="hardware-gauge-card">
          <span class="gauge-tag">TOTAL SUITE</span>
          <span class="gauge-digits">${challenges.length}</span>
          <span class="gauge-unit">ROUTINES</span>
        </div>
        <div class="hardware-gauge-card">
          <span class="gauge-tag">VERIFIED</span>
          <span class="gauge-digits status-green-text">${completedChallenges.length}</span>
          <span class="gauge-unit">SOLVED</span>
        </div>
        <div class="hardware-gauge-card">
          <span class="gauge-tag">REMAINING</span>
          <span class="gauge-digits">${uncompletedChallenges.length}</span>
          <span class="gauge-unit">UNSOLVED</span>
        </div>
      </div>

      <!-- Recommended Practice Challenges Grid -->
      <div class="section-card hardware-chassis-panel">
        <div class="section-card-header">
          <div class="section-title-group">
            <span class="header-led status-blue"></span>
            <h2 class="section-card-title">RECOMMENDED CHALLENGE VECTORS</h2>
          </div>
          <button class="tactile-btn btn-secondary" id="btn-refresh-practice">
            ${icon('refresh', 14)}
            <span>Reshuffle Deck</span>
          </button>
        </div>

        <div class="practice-list">
          ${practiceSet.length > 0 ? practiceSet.map(challenge => {
            const isCompleted = completedLessons.has(challenge.id);
            return `
              <div class="practice-card tactile-practice-item ${isCompleted ? 'completed' : ''}" data-lesson-id="${challenge.id}">
                <div class="practice-card-left">
                  <span class="practice-diode ${isCompleted ? 'status-green' : 'status-idle'}"></span>
                  <div class="practice-card-info">
                    <h3 class="practice-card-title">${challenge.title}</h3>
                    <p class="practice-card-desc">${truncate(challenge.challenge?.description || '', 95)}</p>
                  </div>
                </div>
                <div class="practice-card-right">
                  <span class="hardware-pill difficulty-${challenge.difficulty}">${challenge.difficulty.toUpperCase()}</span>
                  <span class="hardware-pill xp-badge">+${challenge.xp} XP</span>
                  <button class="tactile-btn launch-btn">RUN →</button>
                </div>
              </div>
            `;
          }).join('') : '<p class="empty-state">No routines registered in this domain.</p>'}
        </div>
      </div>

      <!-- Difficulty Spectrum -->
      <div class="section-card hardware-chassis-panel">
        <div class="section-card-header">
          <div class="section-title-group">
            <span class="header-led status-green"></span>
            <h2 class="section-card-title">DIFFICULTY SPECTRUM DISTRIBUTION</h2>
          </div>
        </div>

        <div class="difficulty-breakdown-rack">
          ${['easy', 'medium', 'hard'].map(diff => {
            const total = challenges.filter(c => c.difficulty === diff).length;
            const done = challenges.filter(c => c.difficulty === diff && completedLessons.has(c.id)).length;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            return `
              <div class="difficulty-channel-strip">
                <span class="difficulty-label difficulty-${diff}">${diff.toUpperCase()}</span>
                <div class="strip-vu-track" style="flex: 1; margin: 0 16px;">
                  <div class="strip-vu-fill" style="width: ${pct}%;"></div>
                </div>
                <span class="difficulty-readout">${done}/${total} (${pct}%)</span>
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
    playSound('snap');
    activeTab = 'python';
    renderPracticePage(container, curriculum, gameState, onLessonClick);
  });

  container.querySelector('#tab-practice-sql')?.addEventListener('click', () => {
    playSound('snap');
    activeTab = 'sql';
    renderPracticePage(container, curriculum, gameState, onLessonClick);
  });

  container.querySelector('#tab-practice-dsa')?.addEventListener('click', () => {
    playSound('snap');
    activeTab = 'dsa';
    renderPracticePage(container, curriculum, gameState, onLessonClick);
  });

  container.querySelector('#btn-refresh-practice')?.addEventListener('click', () => {
    playSound('click');
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

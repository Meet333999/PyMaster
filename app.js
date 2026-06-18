// ========================================
// PyMaster — Main App Router & Controller
// ========================================

import { gameState } from './engine/state.js';
import { initPyodide } from './engine/pyodide-runner.js';
import { initSQL } from './engine/sql-runner.js';
import { curriculum, getAllLessons, getLessonById, getChapterForLesson, getSectionForLesson } from './data/curriculum.js';
import { sqlCurriculum, getAllSQLLessons, getSQLLessonById, getSQLChapterForLesson, getSQLSectionForLesson } from './data/sql-curriculum.js';
import { renderSidebar } from './components/sidebar.js';
import { renderTopbar, updateTopbar } from './components/topbar.js';
import { renderJourneyMap } from './components/journey-map.js';
import { renderLessonView } from './components/lesson-view.js';
import { renderChallengeView } from './components/challenge-view.js';
import { renderSQLChallengeView } from './components/sql-challenge-view.js';
import { renderQuizView } from './components/quiz-view.js';
import { renderProgressPanel, updateProgressPanel } from './components/progress-panel.js';
import { renderProfilePage } from './components/profile-page.js';
import { renderGoalsPage } from './components/goals-page.js';
import { renderPracticePage } from './components/practice-page.js';
import { showCompletionModal } from './components/modal.js';
import { auth } from './engine/firebase-init.js';
import { onAuthStateChanged } from 'firebase/auth';
import { icon } from './components/icons.js';

// ---- App State ----
const app = {
  currentRoute: 'journey',
  currentLesson: null,
  monacoReady: false,
  pyodideReady: false,
  navId: 0,
};

// ---- Route Parser ----
function parseRoute() {
  const hash = window.location.hash.slice(1) || 'journey';
  const parts = hash.split('/');
  return {
    page: parts[0],
    param: parts[1] || null,
  };
}

// ---- Router ----
async function navigate(route) {
  if (typeof route === 'string') {
    // Update the hash
    window.location.hash = route;
    // Wait for any pending game state sync to complete before reloading!
    if (gameState.isSyncing()) {
      await gameState.waitForSync();
    }
    window.location.reload();
    return;
  }

  // Increment navigation ID and capture a local snapshot of this active navigation task
  app.navId++;
  const currentNavId = app.navId;

  try {
    const { page, param } = route || parseRoute();
    app.currentRoute = page;

    const mainContent = document.getElementById('main-content');
    const rightPanel = document.getElementById('right-panel');

    // Update sidebar active state
    renderSidebar(document.getElementById('sidebar'), page, (r) => navigate(r));

    // Show/hide right panel based on route and collapse grid column
    const showRightPanel = page === 'journey' || page === 'sql-journey';
    const appContainer = document.getElementById('app');
    if (appContainer) {
      if (showRightPanel) {
        appContainer.classList.remove('no-right-panel');
      } else {
        appContainer.classList.add('no-right-panel');
      }
    }
    rightPanel.style.display = showRightPanel ? 'block' : 'none';
    if (showRightPanel) {
      renderProgressPanel(rightPanel, gameState);
    }

    // Clear main content with fade transition
    mainContent.classList.add('fade-out');
    await new Promise((r) => setTimeout(r, 150));

    // If a newer navigation was requested while we were waiting for the fade-out, abort this one!
    if (currentNavId !== app.navId) {
      return;
    }

    mainContent.classList.remove('fade-out');

    // Render the right view
    switch (page) {
      case 'journey':
        renderJourneyMap(mainContent, curriculum, gameState, (lessonId) => {
          navigate(`lesson/${lessonId}`);
        });
        break;

      case 'sql-journey':
        renderJourneyMap(mainContent, sqlCurriculum, gameState, (lessonId) => {
          navigate(`sql-lesson/${lessonId}`);
        });
        break;

      case 'lesson': {
        if (!param) {
          window.location.hash = 'journey';
          return;
        }
        const lesson = getLessonById(param);
        if (!lesson) {
          window.location.hash = 'journey';
          return;
        }

        const chapter = getChapterForLesson(param);
        const section = getSectionForLesson(param);

        if (lesson.type === 'theory') {
          renderLessonView(mainContent, lesson, section, chapter, {
            onComplete: () => handleLessonComplete(lesson),
            onBack: () => navigate('journey'),
          });
        } else if (lesson.type === 'challenge') {
          renderChallengeView(mainContent, lesson, section, chapter, {
            onComplete: (isPerfect) => handleLessonComplete(lesson, isPerfect),
            onBack: () => navigate('journey'),
          });
        } else if (lesson.type === 'quiz') {
          renderQuizView(mainContent, lesson, section, chapter, {
            onComplete: () => handleLessonComplete(lesson),
            onBack: () => navigate('journey'),
          });
        }
        break;
      }

      case 'sql-lesson': {
        if (!param) {
          window.location.hash = 'sql-journey';
          return;
        }
        const lesson = getSQLLessonById(param);
        if (!lesson) {
          window.location.hash = 'sql-journey';
          return;
        }

        const chapter = getSQLChapterForLesson(param);
        const section = getSQLSectionForLesson(param);

        if (lesson.type === 'theory') {
          renderLessonView(mainContent, lesson, section, chapter, {
            onComplete: () => handleLessonComplete(lesson),
            onBack: () => navigate('sql-journey'),
          });
        } else if (lesson.type === 'challenge') {
          renderSQLChallengeView(mainContent, lesson, section, chapter, {
            onComplete: (isPerfect) => handleLessonComplete(lesson, isPerfect),
            onBack: () => navigate('sql-journey'),
          });
        } else if (lesson.type === 'quiz') {
          renderQuizView(mainContent, lesson, section, chapter, {
            onComplete: () => handleLessonComplete(lesson),
            onBack: () => navigate('sql-journey'),
          });
        }
        break;
      }

      case 'practice':
        renderPracticePage(mainContent, curriculum, gameState, (lessonId, isSql) => {
          if (isSql) {
            navigate(`sql-lesson/${lessonId}`);
          } else {
            navigate(`lesson/${lessonId}`);
          }
        });
        break;

      case 'goals':
        renderGoalsPage(mainContent, gameState);
        break;

      case 'leaderboard':
        renderLeaderboardPage(mainContent);
        break;

      case 'profile':
        renderProfilePage(mainContent, gameState, curriculum);
        break;

      default:
        window.location.hash = 'journey';
        return;
    }

    // Update topbar
    updateTopbar(gameState);

  } catch (err) {
    console.error('[PyMaster] Navigation error:', err);
  }
}

// ---- Lesson Complete Handler ----
function handleLessonComplete(lesson, isPerfect = false) {
  const isSql = lesson.id.startsWith('sql_');
  const wasAlreadyCompleted = gameState.isLessonCompleted(lesson.id);

  const allLessons = isSql ? getAllSQLLessons() : getAllLessons();
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = allLessons[currentIndex + 1];

  const handleNextNavigation = () => {
    if (nextLesson) {
      navigate(isSql ? `sql-lesson/${nextLesson.id}` : `lesson/${nextLesson.id}`);
    } else {
      navigate(isSql ? 'sql-journey' : 'journey');
    }
  };

  if (!wasAlreadyCompleted) {
    gameState.completeLesson(lesson.id, lesson.xp, isPerfect);

    showCompletionModal(
      lesson.title,
      lesson.xp,
      handleNextNavigation
    );
  } else {
    // Already completed — just go to next
    handleNextNavigation();
  }

  // Update right panel and topbar
  updateTopbar(gameState);
}

// ---- Leaderboard Page (simulated) ----
function renderLeaderboardPage(container) {
  const photoURL = gameState.getPhotoURL();
  const username = gameState.getRawState().username || 'Learner';
  const youAvatar = photoURL
    ? `<img src="${photoURL}" class="topbar-avatar-img" alt="${username}" referrerpolicy="no-referrer">`
    : username.charAt(0).toUpperCase();

  const leaderboardData = [
    { rank: 1, name: 'PythonWizard', xp: 12450, avatar: 'P' },
    { rank: 2, name: 'CodeNinja', xp: 11200, avatar: 'C' },
    { rank: 3, name: 'ByteMaster', xp: 10800, avatar: 'B' },
    { rank: 4, name: 'AlgoQueen', xp: 9500, avatar: 'A' },
    { rank: 5, name: 'DebugHero', xp: 8900, avatar: 'D' },
    { rank: 6, name: 'LoopLord', xp: 8200, avatar: 'L' },
    { rank: 7, name: 'SyntaxStar', xp: 7600, avatar: 'S' },
    { rank: 8, name: 'DataDragon', xp: 7100, avatar: 'D' },
    { rank: 9, name: 'FuncFox', xp: 6500, avatar: 'F' },
    { rank: 10, name: 'You', xp: gameState.getXP(), avatar: youAvatar, isUser: true },
  ].sort((a, b) => b.xp - a.xp).map((e, i) => ({ ...e, rank: i + 1 }));

  container.innerHTML = `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">${icon('trophy', 20)} Leaderboard</h1>
        <p class="page-subtitle">This week's top Python learners</p>
      </div>

      <div class="leaderboard-full">
        <div class="leaderboard-podium">
          ${leaderboardData.slice(0, 3).map((entry, i) => `
            <div class="podium-entry podium-${i + 1} ${entry.isUser ? 'is-user' : ''}">
              <div class="podium-avatar">${entry.avatar}</div>
              <div class="podium-name">${entry.name}</div>
              <div class="podium-xp">${entry.xp.toLocaleString()} XP</div>
              <div class="podium-rank">#${entry.rank}</div>
            </div>
          `).join('')}
        </div>

        <div class="leaderboard-list">
          ${leaderboardData.slice(3).map((entry) => `
            <div class="leaderboard-row ${entry.isUser ? 'is-user' : ''}">
              <span class="lb-rank">${entry.rank}</span>
              <span class="lb-avatar">${entry.avatar}</span>
              <span class="lb-name">${entry.name}</span>
              <span class="lb-xp">${entry.xp.toLocaleString()} XP</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ---- Monaco Editor Init ----
function initMonaco() {
  return new Promise((resolve) => {
    if (typeof require === 'undefined') {
      console.warn('Monaco loader not found, will use fallback editor');
      resolve(false);
      return;
    }

    require.config({
      paths: {
        vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs',
      },
    });

    require(['vs/editor/editor.main'], function () {
      // Define custom dark theme matching our design
      monaco.editor.defineTheme('pymaster-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6A737D', fontStyle: 'italic' },
          { token: 'keyword', foreground: 'C678DD' },
          { token: 'string', foreground: '98C379' },
          { token: 'number', foreground: 'D19A66' },
          { token: 'type', foreground: 'E5C07B' },
          { token: 'function', foreground: '61AFEF' },
          { token: 'variable', foreground: 'E06C75' },
          { token: 'operator', foreground: '56B6C2' },
        ],
        colors: {
          'editor.background': '#0a0a1a',
          'editor.foreground': '#e0e6f0',
          'editorLineNumber.foreground': '#3a4058',
          'editorLineNumber.activeForeground': '#00e5ff',
          'editor.lineHighlightBackground': '#1a1a35',
          'editor.selectionBackground': '#00e5ff44',
          'editorCursor.foreground': '#00e5ff',
          'editorWidget.background': '#111125',
        },
      });

      app.monacoReady = true;
      resolve(true);
    });
  });
}

// ---- App Init ----
async function init() {
  // Load state
  gameState.load();
  gameState.checkStreak();
  gameState.resetDailyGoalsIfNewDay();

  // Subscribe to state changes
  gameState.onChange(() => {
    updateTopbar(gameState);
    if (app.currentRoute === 'profile') {
      const mainContent = document.getElementById('main-content');
      renderProfilePage(mainContent, gameState, curriculum);
    }
  });

  // Listen for auth state changes
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log('👤 User logged in:', user.email);
      const displayName = user.displayName || user.email.split('@')[0];
      const photoURL = user.photoURL || null;
      await gameState.setUserId(user.uid, displayName, photoURL);
    } else {
      console.log('👤 User logged out');
      await gameState.setUserId(null);
    }
  });

  // Delegate avatar click to navigate to profile page
  document.getElementById('topbar')?.addEventListener('click', (e) => {
    const avatar = e.target.closest('.topbar-avatar');
    if (avatar) {
      navigate('profile');
    }
  });

  // Render initial shell
  renderSidebar(document.getElementById('sidebar'), 'journey', (r) => navigate(r));
  renderTopbar(document.getElementById('topbar'), gameState);

  // Init Monaco Editor
  initMonaco().then((ready) => {
    if (ready) console.log('✅ Monaco Editor ready');
  });

  // Init Pyodide in background
  initPyodide().then(() => {
    app.pyodideReady = true;
    console.log('✅ Pyodide ready');
  });

  // Init SQL in background
  initSQL().then(() => {
    console.log('✅ SQL ready');
  });

  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    navigate(parseRoute());
  });

  // Generate loading particles for depth
  const particlesContainer = document.getElementById('loading-particles');
  if (particlesContainer) {
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'loading-particle';
      p.style.left = `${Math.random() * 100}vw`;
      p.style.top = `${Math.random() * 100}vh`;
      p.style.animationDelay = `${Math.random() * 4}s`;
      p.style.animationDuration = `${3 + Math.random() * 3}s`;
      particlesContainer.appendChild(p);
    }
  }

  // Hide loading screen and render initial route
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    await new Promise((r) => setTimeout(r, 1200));
    loadingScreen.classList.add('fade-out');
    await new Promise((r) => setTimeout(r, 300));
  }

  navigate(parseRoute());
}

// ---- Start App ----
document.addEventListener('DOMContentLoaded', init);

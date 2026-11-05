// ========================================
// PyMaster — Main App Router & Controller
// Skeuomorphic Dual-Mode System Engine
// ========================================

import { gameState } from './engine/state.js';
import { initPyodide } from './engine/pyodide-runner.js';
import { initSQL } from './engine/sql-runner.js';
import { getInitialTheme, getCurrentTheme, setTheme } from './engine/theme.js';
import { getAllLessons } from './data/curriculum.js';
import { getAllSQLLessons } from './data/sql-curriculum.js';
import { getAllDSALessons } from './data/dsa-curriculum.js';

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
import { renderTelemetryPage } from './components/telemetry-page.js';
import { showCompletionModal, hideModal } from './components/modal.js';
import { auth } from './engine/firebase-init.js';
import { onAuthStateChanged } from 'firebase/auth';
import { icon } from './components/icons.js';
import lottie from 'lottie-web/build/player/lottie_light.js';
import loadingAnimData from './data/loading-animation.json';

// ---- App State ----
const app = {
  currentRoute: 'journey',
  currentLesson: null,
  monacoReady: false,
  pyodideReady: false,
  navId: 0,
};
window.__app = app;

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
    window.location.hash = route;
    if (gameState.isSyncing()) {
      await gameState.waitForSync();
    }
    window.location.reload();
    return;
  }

  app.navId++;
  const currentNavId = app.navId;
  hideModal();

  try {
    const { page, param } = route || parseRoute();
    app.currentRoute = page;

    const mainContent = document.getElementById('main-content');
    const rightPanel = document.getElementById('right-panel');

    // Update sidebar active state
    renderSidebar(document.getElementById('sidebar'), page, (r) => navigate(r));

    // Show/hide right panel based on route and collapse grid column
    const showRightPanel = page === 'journey' || page === 'sql-journey' || page === 'dsa-journey';
    const appContainer = document.getElementById('app');
    if (appContainer) {
      if (showRightPanel) {
        appContainer.classList.remove('no-right-panel');
      } else {
        appContainer.classList.add('no-right-panel');
      }
    }
    if (rightPanel) {
      rightPanel.style.display = showRightPanel ? 'block' : 'none';
      if (showRightPanel) {
        renderProgressPanel(rightPanel, gameState);
      }
    }

    // Clear main content with fade transition
    mainContent.classList.add('fade-out');
    await new Promise((r) => setTimeout(r, 120));

    if (currentNavId !== app.navId) {
      return;
    }

    mainContent.classList.remove('fade-out');

    // Render the right view
    switch (page) {
      case 'journey': {
        const { curriculum } = await import('./data/curriculum.js');
        renderJourneyMap(mainContent, curriculum, gameState, (lessonId) => {
          navigate(`lesson/${lessonId}`);
        });
        break;
      }

      case 'sql-journey': {
        const { sqlCurriculum } = await import('./data/sql-curriculum.js');
        renderJourneyMap(mainContent, sqlCurriculum, gameState, (lessonId) => {
          navigate(`sql-lesson/${lessonId}`);
        });
        break;
      }

      case 'dsa-journey': {
        const { dsaCurriculum } = await import('./data/dsa-curriculum.js');
        renderJourneyMap(mainContent, dsaCurriculum, gameState, (lessonId) => {
          navigate(`dsa-lesson/${lessonId}`);
        });
        break;
      }

      case 'lesson': {
        if (!param) {
          window.location.hash = 'journey';
          return;
        }
        const { getLessonById, getChapterForLesson, getSectionForLesson } = await import('./data/curriculum.js');
        const lesson = getLessonById(param);
        if (!lesson) {
          window.location.hash = 'journey';
          return;
        }

        const chapter = getChapterForLesson(param);
        const section = getSectionForLesson(param);

        const allLessons = getAllLessons();
        const currentIndex = allLessons.findIndex((l) => l.id === param);
        const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

        const callbacks = {
          onComplete: (isPerfect) => handleLessonComplete(lesson, isPerfect),
          onPrevious: prevLesson ? () => navigate(`lesson/${prevLesson.id}`) : null,
          onBack: () => navigate('journey'),
          hasPrevious: Boolean(prevLesson),
        };

        if (lesson.type === 'theory') {
          renderLessonView(mainContent, lesson, section, chapter, callbacks);
        } else if (lesson.type === 'challenge') {
          renderChallengeView(mainContent, lesson, section, chapter, callbacks);
        } else if (lesson.type === 'quiz') {
          renderQuizView(mainContent, lesson, section, chapter, callbacks);
        }
        break;
      }

      case 'sql-lesson': {
        if (!param) {
          window.location.hash = 'sql-journey';
          return;
        }
        const { getSQLLessonById, getSQLChapterForLesson, getSQLSectionForLesson } = await import('./data/sql-curriculum.js');
        const lesson = getSQLLessonById(param);
        if (!lesson) {
          window.location.hash = 'sql-journey';
          return;
        }

        const chapter = getSQLChapterForLesson(param);
        const section = getSQLSectionForLesson(param);

        const allLessons = getAllSQLLessons();
        const currentIndex = allLessons.findIndex((l) => l.id === param);
        const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

        const callbacks = {
          onComplete: (isPerfect) => handleLessonComplete(lesson, isPerfect),
          onPrevious: prevLesson ? () => navigate(`sql-lesson/${prevLesson.id}`) : null,
          onBack: () => navigate('sql-journey'),
          hasPrevious: Boolean(prevLesson),
        };

        if (lesson.type === 'theory') {
          renderLessonView(mainContent, lesson, section, chapter, callbacks);
        } else if (lesson.type === 'challenge') {
          renderSQLChallengeView(mainContent, lesson, section, chapter, callbacks);
        } else if (lesson.type === 'quiz') {
          renderQuizView(mainContent, lesson, section, chapter, callbacks);
        }
        break;
      }

      case 'dsa-lesson': {
        if (!param) {
          window.location.hash = 'dsa-journey';
          return;
        }
        const { getDSALessonById, getDSAChapterForLesson, getDSASectionForLesson } = await import('./data/dsa-curriculum.js');
        const lesson = getDSALessonById(param);
        if (!lesson) {
          window.location.hash = 'dsa-journey';
          return;
        }

        const chapter = getDSAChapterForLesson(param);
        const section = getDSASectionForLesson(param);

        const allLessons = getAllDSALessons();
        const currentIndex = allLessons.findIndex((l) => l.id === param);
        const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;

        const callbacks = {
          onComplete: (isPerfect) => handleLessonComplete(lesson, isPerfect),
          onPrevious: prevLesson ? () => navigate(`dsa-lesson/${prevLesson.id}`) : null,
          onBack: () => navigate('dsa-journey'),
          hasPrevious: Boolean(prevLesson),
        };

        if (lesson.type === 'theory') {
          renderLessonView(mainContent, lesson, section, chapter, callbacks);
        } else if (lesson.type === 'challenge') {
          renderChallengeView(mainContent, lesson, section, chapter, callbacks);
        } else if (lesson.type === 'quiz') {
          renderQuizView(mainContent, lesson, section, chapter, callbacks);
        }
        break;
      }

      case 'practice': {
        const { curriculum } = await import('./data/curriculum.js');
        renderPracticePage(mainContent, curriculum, gameState, (lessonId, isSql, isDsa) => {
          if (isDsa) navigate(`dsa-lesson/${lessonId}`);
          else if (isSql) navigate(`sql-lesson/${lessonId}`);
          else navigate(`lesson/${lessonId}`);
        });
        break;
      }

      case 'goals':
        renderGoalsPage(mainContent, gameState);
        break;

      case 'leaderboard':
        // Routed to authentic Hardware Telemetry & Performance Benchmarks
        renderTelemetryPage(mainContent, gameState);
        break;

      case 'profile': {
        const { curriculum } = await import('./data/curriculum.js');
        renderProfilePage(mainContent, gameState, curriculum);
        break;
      }

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
  const isDsa = lesson.id.startsWith('dsa_');
  const wasAlreadyCompleted = gameState.isLessonCompleted(lesson.id);

  const allLessons = isDsa ? getAllDSALessons() : (isSql ? getAllSQLLessons() : getAllLessons());
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = allLessons[currentIndex + 1];

  const handleNextNavigation = () => {
    if (nextLesson) {
      if (isDsa) {
        navigate(`dsa-lesson/${nextLesson.id}`);
      } else if (isSql) {
        navigate(`sql-lesson/${nextLesson.id}`);
      } else {
        navigate(`lesson/${nextLesson.id}`);
      }
    } else {
      if (isDsa) {
        navigate('dsa-journey');
      } else if (isSql) {
        navigate('sql-journey');
      } else {
        navigate('journey');
      }
    }
  };

  if (!wasAlreadyCompleted) {
    gameState.completeLesson(lesson.id, lesson.xp, isPerfect);
  }

  showCompletionModal(
    lesson.title,
    lesson.xp,
    handleNextNavigation
  );

  updateTopbar(gameState);
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
      // 1. Skeuomorphic Dark Theme (Matte Obsidian)
      monaco.editor.defineTheme('pymaster-skeuo-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '606977', fontStyle: 'italic' },
          { token: 'keyword', foreground: 'f0f3f6', fontStyle: 'bold' },
          { token: 'string', foreground: '10b981' },
          { token: 'number', foreground: '38bdf8' },
          { token: 'type', foreground: 'cbd5e1' },
          { token: 'function', foreground: 'ffffff', fontStyle: 'bold' },
          { token: 'variable', foreground: 'e2e8f0' },
          { token: 'operator', foreground: '94a3b8' },
        ],
        colors: {
          'editor.background': '#131518',
          'editor.foreground': '#f0f3f6',
          'editorLineNumber.foreground': '#404652',
          'editorLineNumber.activeForeground': '#38bdf8',
          'editor.lineHighlightBackground': '#1b1e24',
          'editor.selectionBackground': '#2563eb44',
          'editorCursor.foreground': '#38bdf8',
          'editorWidget.background': '#181b20',
          'editorWidget.border': '#2a303c',
        },
      });

      // 2. Skeuomorphic Light Theme (Matte Studio White)
      monaco.editor.defineTheme('pymaster-skeuo-light', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
          { token: 'keyword', foreground: '0f172a', fontStyle: 'bold' },
          { token: 'string', foreground: '047857' },
          { token: 'number', foreground: '1d4ed8' },
          { token: 'type', foreground: '334155' },
          { token: 'function', foreground: '111827', fontStyle: 'bold' },
          { token: 'variable', foreground: '1f2937' },
          { token: 'operator', foreground: '475569' },
        ],
        colors: {
          'editor.background': '#f4f6fa',
          'editor.foreground': '#111827',
          'editorLineNumber.foreground': '#94a3b8',
          'editorLineNumber.activeForeground': '#1d4ed8',
          'editor.lineHighlightBackground': '#e8edf5',
          'editor.selectionBackground': '#2563eb25',
          'editorCursor.foreground': '#1d4ed8',
          'editorWidget.background': '#eef1f6',
          'editorWidget.border': '#cbd5e1',
        },
      });

      const currentTheme = getCurrentTheme();
      monaco.editor.setTheme(currentTheme === 'light' ? 'pymaster-skeuo-light' : 'pymaster-skeuo-dark');

      app.monacoReady = true;
      resolve(true);
    });
  });
}

// ---- App Init ----
async function init() {
  // Sync theme
  const initialTheme = getInitialTheme();
  setTheme(initialTheme);

  // Load state
  gameState.load();
  gameState.checkStreak();
  gameState.resetDailyGoalsIfNewDay();

  // Subscribe to state changes
  gameState.onChange(() => {
    updateTopbar(gameState);
    if (app.currentRoute === 'profile') {
      const mainContent = document.getElementById('main-content');
      import('./data/curriculum.js').then(({ curriculum }) => {
        renderProfilePage(mainContent, gameState, curriculum);
      });
    }
  });

  // Listen for auth state changes
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const displayName = user.displayName || user.email.split('@')[0];
      const photoURL = user.photoURL || null;
      await gameState.setUserId(user.uid, displayName, photoURL);
    } else {
      await gameState.setUserId(null);
    }
  });

  // Delegate avatar click to navigate to profile page
  document.getElementById('topbar')?.addEventListener('click', (e) => {
    const avatar = e.target.closest('.topbar-avatar-dial');
    if (avatar) {
      navigate('profile');
    }
  });

  // Render initial shell
  renderSidebar(document.getElementById('sidebar'), 'journey', (r) => navigate(r));
  renderTopbar(document.getElementById('topbar'), gameState);

  // Init Monaco Editor
  initMonaco().then((ready) => {
    if (ready) console.log('✅ Monaco Skeuomorphic Editor ready');
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

  // Initialize simple black and white Lottie loading animation
  const lottieContainer = document.getElementById('lottie-loader');
  let animInstance = null;
  if (lottieContainer) {
    animInstance = lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loadingAnimData,
    });
  }

  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    navigate(parseRoute());
  });

  // Hide loading screen smoothly
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    await new Promise((r) => setTimeout(r, 1200));
    loadingScreen.style.opacity = '0';
    await new Promise((r) => setTimeout(r, 300));
    loadingScreen.style.display = 'none';
    if (animInstance) {
      animInstance.destroy();
    }
  }

  navigate(parseRoute());
}

// Start App
document.addEventListener('DOMContentLoaded', init);

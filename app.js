// ========================================
// PyMaster — Main App Router & Controller
// Skeuomorphic Dual-Mode System Engine
// ========================================

import { gameState } from './engine/state.js';
import { initPyodide } from './engine/pyodide-runner.js';
import { initSQL } from './engine/sql-runner.js';
import { getInitialTheme, getCurrentTheme, setTheme } from './engine/theme.js';
import { curriculum, getAllLessons, getLessonById, getChapterForLesson, getSectionForLesson } from './data/curriculum.js';
import { sqlCurriculum, getAllSQLLessons, getSQLLessonById, getSQLChapterForLesson, getSQLSectionForLesson } from './data/sql-curriculum.js';
import { dsaCurriculum, getAllDSALessons, getDSALessonById, getDSAChapterForLesson, getDSASectionForLesson } from './data/dsa-curriculum.js';

import { renderSidebar, renderMobileBottomNav } from './components/sidebar.js';
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
    const cleanRoute = route.startsWith('#') ? route.slice(1) : route;
    if (window.location.hash.slice(1) === cleanRoute) {
      navigate(parseRoute());
    } else {
      window.location.hash = cleanRoute;
    }
    return;
  }

  app.navId++;
  const currentNavId = app.navId;
  hideModal();

  const mainContent = document.getElementById('main-content');
  const rightPanel = document.getElementById('right-panel');

  try {
    const { page, param } = route || parseRoute();
    app.currentRoute = page;

    // Update sidebar & mobile bottom nav active state
    renderSidebar(document.getElementById('sidebar'), page, (r) => navigate(r));
    const fullRouteStr = param ? `${page}/${param}` : page;
    renderMobileBottomNav(document.getElementById('mobile-bottom-nav'), fullRouteStr, (r) => navigate(r));

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

    if (currentNavId !== app.navId) {
      return;
    }

    // Render the right view
    switch (page) {
      case 'journey': {
        renderJourneyMap(mainContent, curriculum, gameState, (lessonId) => {
          navigate(`lesson/${lessonId}`);
        });
        break;
      }

      case 'sql-journey': {
        renderJourneyMap(mainContent, sqlCurriculum, gameState, (lessonId) => {
          navigate(`sql-lesson/${lessonId}`);
        });
        break;
      }

      case 'dsa-journey': {
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
  } finally {
    if (mainContent) {
      mainContent.classList.remove('fade-out');
    }
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
      // 1. Midnight Navy & Warm Cream Dark Theme with Coral accents
      monaco.editor.defineTheme('pymaster-skeuo-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
          { token: 'keyword', foreground: 'ff6b6b', fontStyle: 'bold' },
          { token: 'string', foreground: '34d399' },
          { token: 'number', foreground: '38bdf8' },
          { token: 'type', foreground: 'f8f6f0' },
          { token: 'function', foreground: 'f8f6f0', fontStyle: 'bold' },
          { token: 'variable', foreground: 'e2e8f0' },
          { token: 'operator', foreground: '94a3b8' },
        ],
        colors: {
          'editor.background': '#0a0e1a',
          'editor.foreground': '#f8f6f0',
          'editorLineNumber.foreground': '#475569',
          'editorLineNumber.activeForeground': '#ff6b6b',
          'editor.lineHighlightBackground': '#131c2e',
          'editor.selectionBackground': '#ff6b6b33',
          'editorCursor.foreground': '#ff6b6b',
          'editorWidget.background': '#0f172a',
          'editorWidget.border': '#1e293b',
        },
      });

      // 2. Warm Cream & Deep Navy Light Theme with Coral accents
      monaco.editor.defineTheme('pymaster-skeuo-light', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '788699', fontStyle: 'italic' },
          { token: 'keyword', foreground: 'ff5a5f', fontStyle: 'bold' },
          { token: 'string', foreground: '059669' },
          { token: 'number', foreground: '2563eb' },
          { token: 'type', foreground: '0b192c' },
          { token: 'function', foreground: '0b192c', fontStyle: 'bold' },
          { token: 'variable', foreground: '1e293b' },
          { token: 'operator', foreground: '475569' },
        ],
        colors: {
          'editor.background': '#ffffff',
          'editor.foreground': '#0b192c',
          'editorLineNumber.foreground': '#94a3b8',
          'editorLineNumber.activeForeground': '#ff5a5f',
          'editor.lineHighlightBackground': '#f4efe6',
          'editor.selectionBackground': '#ff5a5f28',
          'editorCursor.foreground': '#ff5a5f',
          'editorWidget.background': '#faf7f2',
          'editorWidget.border': '#e2dcd2',
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
      renderProfilePage(mainContent, gameState, curriculum);
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

  // Start route navigation immediately so views mount behind loading animation
  const navPromise = navigate(parseRoute());

  // Hide loading screen smoothly
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    await Promise.all([
      navPromise,
      new Promise((r) => setTimeout(r, 700))
    ]);
    loadingScreen.style.opacity = '0';
    await new Promise((r) => setTimeout(r, 320));
    loadingScreen.style.display = 'none';
    if (animInstance) {
      animInstance.destroy();
    }
  }
}

// Start App
document.addEventListener('DOMContentLoaded', init);

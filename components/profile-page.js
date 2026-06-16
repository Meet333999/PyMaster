// ==========================================================================
// Profile Page — User Auth & Achievements Panel
// ==========================================================================

import { getAllLessons } from '../data/curriculum.js';
import { auth, googleProvider } from '../engine/firebase-init.js';
import { icon } from './icons.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  signOut,
  updateProfile 
} from 'firebase/auth';

/**
 * Render the Profile page. If the user is logged in, displays their stats,
 * progress, and achievements. Otherwise, renders a premium Sign In / Sign Up portal.
 *
 * @param {HTMLElement} container — DOM element to render into
 * @param {import('../engine/state.js').GameState} gameState — game state instance
 * @param {object} curriculum — curriculum data
 */
export function renderProfilePage(container, gameState, curriculum) {
  const userId = gameState.getUserId();

  if (!userId) {
    renderAuthForm(container);
  } else {
    renderStatsPanel(container, gameState, curriculum);
  }
}

/* ──────────────────────────────────────────────────────────────────────────
   1. Auth Form Rendering & Events
   ────────────────────────────────────────────────────────────────────────── */

function renderAuthForm(container) {
  container.innerHTML = `
    <div class="page-container auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo">${icon('terminal', 48)}</div>
          <h1 class="auth-title">Welcome to PyMaster</h1>
          <p class="auth-subtitle">Sign in to save your progress and sync it across devices.</p>
        </div>
        
        <div class="auth-tabs">
          <button class="auth-tab active" id="tab-login">Sign In</button>
          <button class="auth-tab" id="tab-register">Sign Up</button>
        </div>
        
        <div class="auth-error-container hidden" id="auth-error"></div>
        
        <!-- Sign In Form -->
        <form class="auth-form" id="form-login">
          <div class="form-group">
            <label class="form-label" for="login-email">Email Address</label>
            <input class="form-input" type="email" id="login-email" placeholder="you@example.com" required autocomplete="email">
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <input class="form-input" type="password" id="login-password" placeholder="••••••••" required autocomplete="current-password">
          </div>
          <button class="btn-auth-submit" type="submit" id="btn-login-submit">
            <span>Sign In</span>
          </button>
        </form>
        
        <!-- Sign Up Form (hidden by default) -->
        <form class="auth-form hidden" id="form-register">
          <div class="form-group">
            <label class="form-label" for="register-username">Username</label>
            <input class="form-input" type="text" id="register-username" placeholder="PythonCoder" required autocomplete="username">
          </div>
          <div class="form-group">
            <label class="form-label" for="register-email">Email Address</label>
            <input class="form-input" type="email" id="register-email" placeholder="you@example.com" required autocomplete="email">
          </div>
          <div class="form-group">
            <label class="form-label" for="register-password">Password</label>
            <input class="form-input" type="password" id="register-password" placeholder="••••••••" minlength="6" required autocomplete="new-password">
          </div>
          <button class="btn-auth-submit" type="submit" id="btn-register-submit">
            <span>Create Account</span>
          </button>
        </form>
        
        <div class="auth-divider">
          <span>or</span>
        </div>
        
        <!-- Google Sign In -->
        <button class="btn-google-auth" id="btn-google-auth">
          <svg class="google-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.1.14-.14 3.01l3.01 2.33c1.76-1.61 2.78-3.98 2.78-6.69z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96L1.29 17.37C3.26 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.29 6.7C.46 8.35 0 10.12 0 12s.46 3.65 1.29 5.3l3.98-3.01z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.93 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.7l3.98 3.01C6.22 6.86 8.87 4.75 12 4.75z"/>
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  `;

  // ---- Form Element Selection ----
  const tabLogin = container.querySelector('#tab-login');
  const tabRegister = container.querySelector('#tab-register');
  const formLogin = container.querySelector('#form-login');
  const formRegister = container.querySelector('#form-register');
  const authError = container.querySelector('#auth-error');
  const btnGoogle = container.querySelector('#btn-google-auth');

  // ---- Form Helper Functions ----
  const showError = (message) => {
    if (authError) {
      authError.textContent = message;
      authError.classList.remove('hidden');
    }
  };

  const clearError = () => {
    if (authError) {
      authError.textContent = '';
      authError.classList.add('hidden');
    }
  };

  // ---- Tab Swapping Events ----
  tabLogin?.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister?.classList.remove('active');
    formLogin?.classList.remove('hidden');
    formRegister?.classList.add('hidden');
    clearError();
  });

  tabRegister?.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin?.classList.remove('active');
    formRegister?.classList.remove('hidden');
    formLogin?.classList.add('hidden');
    clearError();
  });

  // ---- Form Submission (Email/Password Login) ----
  formLogin?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const email = container.querySelector('#login-email').value;
    const password = container.querySelector('#login-password').value;
    const submitBtn = container.querySelector('#btn-login-submit');

    try {
      if (submitBtn) submitBtn.disabled = true;
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (submitBtn) submitBtn.disabled = false;
      showError(_translateFirebaseError(err.code || err.message));
    }
  });

  // ---- Form Submission (Email/Password Register) ----
  formRegister?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const username = container.querySelector('#register-username').value;
    const email = container.querySelector('#register-email').value;
    const password = container.querySelector('#register-password').value;
    const submitBtn = container.querySelector('#btn-register-submit');

    try {
      if (submitBtn) submitBtn.disabled = true;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set user display name
      await updateProfile(userCredential.user, { displayName: username });
    } catch (err) {
      if (submitBtn) submitBtn.disabled = false;
      showError(_translateFirebaseError(err.code || err.message));
    }
  });

  // ---- Google Auth Event ----
  btnGoogle?.addEventListener('click', async () => {
    clearError();
    try {
      btnGoogle.disabled = true;
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      btnGoogle.disabled = false;
      if (err.code !== 'auth/popup-closed-by-user') {
        showError(_translateFirebaseError(err.code || err.message));
      }
    }
  });
}

/* ──────────────────────────────────────────────────────────────────────────
   2. Stats Panel Rendering & Events
   ────────────────────────────────────────────────────────────────────────── */

function renderStatsPanel(container, gameState, curriculum) {
  const stats = gameState.getStats();
  const allLessons = getAllLessons();
  const totalLessons = allLessons.length;
  const completionPercent = totalLessons > 0 ? Math.round((stats.completedLessons / totalLessons) * 100) : 0;
  const username = gameState.getRawState().username || 'Learner';

  const photoURL = gameState.getPhotoURL();
  const avatarHTML = photoURL
    ? `<img src="${photoURL}" class="profile-avatar-large-img" alt="${username}" referrerpolicy="no-referrer">`
    : `<span>${icon('terminal', 48)}</span>`;

  const achievements = getAchievements(stats);

  container.innerHTML = `
    <div class="page-container profile-page">
      <!-- Profile Header -->
      <div class="profile-header-card">
        <div class="profile-avatar-large">
          ${avatarHTML}
        </div>
        <div class="profile-info">
          <h1 class="profile-name">${username}</h1>
          <p class="profile-subtitle">Learning Python since ${getJoinDate()}</p>
          <div class="profile-badges">
            <span class="profile-level">Level ${Math.floor(stats.totalXP / 100) + 1}</span>
            <span class="profile-rank">${getRank(stats.totalXP)}</span>
          </div>
        </div>
        <button class="btn-logout" id="btn-logout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Log Out
        </button>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">${icon('flame', 22)}</div>
          <div class="stat-value">${stats.currentStreak}</div>
          <div class="stat-label">Day Streak</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">${icon('gem', 22)}</div>
          <div class="stat-value">${stats.totalXP.toLocaleString()}</div>
          <div class="stat-label">Total XP</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">${icon('book', 22)}</div>
          <div class="stat-value">${stats.completedLessons}</div>
          <div class="stat-label">Lessons Done</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">${icon('coins', 22)}</div>
          <div class="stat-value">${stats.gems}</div>
          <div class="stat-label">Gems</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">${icon('star', 22)}</div>
          <div class="stat-value">${stats.perfectCount}</div>
          <div class="stat-label">Perfect Runs</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">${icon('trending-up', 22)}</div>
          <div class="stat-value">${stats.longestStreak}</div>
          <div class="stat-label">Best Streak</div>
        </div>
      </div>

      <!-- Progress Overview -->
      <div class="section-card">
        <h2 class="section-card-title">${icon('bar-chart', 18)} Course Progress</h2>
        <div class="overall-progress">
          <div class="progress-circle-container">
            <svg class="progress-circle" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-surface)" stroke-width="10"/>
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-primary)" stroke-width="10"
                      stroke-dasharray="${2 * Math.PI * 52}"
                      stroke-dashoffset="${2 * Math.PI * 52 * (1 - completionPercent / 100)}"
                      stroke-linecap="round" transform="rotate(-90 60 60)"/>
            </svg>
            <span class="progress-circle-text">${completionPercent}%</span>
          </div>
          <div class="progress-details">
            <p><strong>${stats.completedLessons}</strong> of <strong>${totalLessons}</strong> lessons completed</p>
          </div>
        </div>

        <!-- Per-section progress bars -->
        <div class="section-progress-list">
          ${curriculum.sections.map((section, idx) => {
            const sectionLessons = section.chapters.reduce((acc, ch) => acc.concat(ch.lessons), []);
            const sectionCompleted = sectionLessons.filter(l => gameState.isLessonCompleted(l.id)).length;
            const sectionPercent = sectionLessons.length > 0 ? Math.round((sectionCompleted / sectionLessons.length) * 100) : 0;
            return `
              <div class="section-progress-item">
                <div class="section-progress-header">
                  <span class="section-progress-name">${icon(section.icon, 16)} ${section.title}</span>
                  <span class="section-progress-count">${sectionCompleted}/${sectionLessons.length}</span>
                </div>
                <div class="goal-progress">
                  <div class="goal-progress-fill" style="width: ${sectionPercent}%"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Achievements -->
      <div class="section-card">
        <h2 class="section-card-title">${icon('award', 18)} Achievements</h2>
        <div class="achievements-grid">
          ${achievements.map(a => `
            <div class="achievement-badge ${a.unlocked ? '' : 'locked'}">
              <div class="achievement-icon">${a.icon}</div>
              <div class="achievement-name">${a.name}</div>
              <div class="achievement-desc">${a.description}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // ---- Log Out Event Listener ----
  container.querySelector('#btn-logout')?.addEventListener('click', async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('[PyMaster] Failed to sign out:', err);
    }
  });
}

/* ──────────────────────────────────────────────────────────────────────────
   3. Helpers & Calculators
   ────────────────────────────────────────────────────────────────────────── */

function getAchievements(stats) {
  return [
    { icon: icon('target', 24), name: 'First Step', description: 'Complete your first lesson', unlocked: stats.completedLessons >= 1 },
    { icon: icon('flame', 24), name: 'On Fire', description: '3-day streak', unlocked: stats.longestStreak >= 3 },
    { icon: icon('zap', 24), name: 'Week Warrior', description: '7-day streak', unlocked: stats.longestStreak >= 7 },
    { icon: icon('check-circle', 24), name: 'Perfectionist', description: '5 perfect completions', unlocked: stats.perfectCount >= 5 },
    { icon: icon('book', 24), name: 'Bookworm', description: 'Complete 10 lessons', unlocked: stats.completedLessons >= 10 },
    { icon: icon('trophy', 24), name: 'Half Way', description: 'Complete 50 lessons', unlocked: stats.completedLessons >= 50 },
    { icon: icon('gem', 24), name: 'XP Hunter', description: 'Earn 500 XP', unlocked: stats.totalXP >= 500 },
    { icon: icon('sparkle', 24), name: 'Rising Star', description: 'Earn 1000 XP', unlocked: stats.totalXP >= 1000 },
    { icon: icon('crown', 24), name: 'Python Master', description: 'Complete 100 lessons', unlocked: stats.completedLessons >= 100 },
    { icon: icon('dragon', 24), name: 'Legendary', description: 'Earn 5000 XP', unlocked: stats.totalXP >= 5000 },
    { icon: icon('coins', 24), name: 'Gem Collector', description: 'Collect 50 gems', unlocked: stats.gems >= 50 },
    { icon: icon('flame', 24), name: 'Unstoppable', description: '30-day streak', unlocked: stats.longestStreak >= 30 },
  ];
}

function getRank(xp) {
  if (xp >= 5000) return 'Dragon';
  if (xp >= 3000) return 'Master';
  if (xp >= 1500) return 'Expert';
  if (xp >= 500) return 'Advanced';
  if (xp >= 100) return 'Intermediate';
  return 'Beginner';
}

function getJoinDate() {
  const stored = localStorage.getItem('pymaster_join_date');
  if (stored) return stored;
  const today = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  localStorage.setItem('pymaster_join_date', today);
  return today;
}

/**
 * Translate Firebase Auth error codes into reader-friendly messages.
 *
 * @param {string} code
 * @returns {string}
 */
function _translateFirebaseError(code) {
  switch (code) {
    case 'auth/invalid-email':
      return 'The email address is badly formatted.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'There is no user record corresponding to this identifier.';
    case 'auth/wrong-password':
      return 'The password entered is incorrect.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email address.';
    case 'auth/weak-password':
      return 'The password must be at least 6 characters long.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled in this project.';
    case 'auth/popup-blocked':
      return 'The sign-in popup was blocked by the browser. Please allow popups for this site.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for Google Sign-In. Please add this Vercel domain (py-master-by-meet.vercel.app) to the "Authorized domains" list in your Firebase Console (Authentication > Settings).';
    default:
      return code || 'An error occurred during authentication. Please try again.';
  }
}

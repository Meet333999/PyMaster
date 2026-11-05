// ==========================================================================
// PyMaster — Skeuomorphic Profile Deck & Engineering Identity
// Physical user credential plate, rotary curriculum dials, and stamped plaques
// ==========================================================================

import { getAllLessons } from '../data/curriculum.js';
import { sqlCurriculum, getAllSQLLessons } from '../data/sql-curriculum.js';
import { dsaCurriculum, getAllDSALessons } from '../data/dsa-curriculum.js';
import { auth, googleProvider } from '../engine/firebase-init.js';
import { icon } from './icons.js';
import { playSound } from '../engine/haptics.js';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  signOut,
  updateProfile 
} from 'firebase/auth';

export function renderProfilePage(container, gameState, curriculum) {
  const userId = gameState.getUserId();

  if (!userId) {
    renderAuthForm(container);
  } else {
    renderStatsPanel(container, gameState, curriculum);
  }
}

/* ──────────────────────────────────────────────────────────────────────────
   1. Skeuomorphic Auth Console
   ────────────────────────────────────────────────────────────────────────── */

function renderAuthForm(container) {
  container.innerHTML = `
    <div class="page-container auth-page hardware-deck-layout">
      <div class="auth-card hardware-chassis-panel">
        <div class="mounting-screw top-left" aria-hidden="true"></div>
        <div class="mounting-screw top-right" aria-hidden="true"></div>

        <div class="auth-header hardware-header-bar">
          <div class="unit-status-led" title="Security Subsystem Ready"></div>
          <div class="auth-title-group">
            <h1 class="auth-title">OPERATOR ACCESS PORTAL</h1>
            <p class="auth-subtitle">Synchronize local runtime memory and telemetry records across terminals</p>
          </div>
        </div>

        <div class="segmented-pill-container auth-segmented-pill" role="tablist">
          <button class="segmented-pill-option active" id="tab-login" role="tab">SIGN IN</button>
          <button class="segmented-pill-option" id="tab-register" role="tab">CREATE OPERATOR</button>
        </div>

        <div class="auth-error-container hidden" id="auth-error"></div>

        <!-- Sign In Form -->
        <form class="auth-form skeuo-inset-well" id="form-login">
          <div class="form-group">
            <label class="form-label" for="login-email">OPERATOR EMAIL</label>
            <input class="form-input skeuo-field" type="email" id="login-email" placeholder="engineer@domain.com" required autocomplete="email">
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">ACCESS KEY / PASSWORD</label>
            <input class="form-input skeuo-field" type="password" id="login-password" placeholder="••••••••" required autocomplete="current-password">
          </div>
          <button class="tactile-btn btn-auth-submit" type="submit" id="btn-login-submit">
            <span>AUTHENTICATE OPERATOR</span>
            <span class="btn-check-icon">→</span>
          </button>
        </form>

        <!-- Sign Up Form -->
        <form class="auth-form skeuo-inset-well hidden" id="form-register">
          <div class="form-group">
            <label class="form-label" for="register-username">OPERATOR CALLSIGN / HANDLE</label>
            <input class="form-input skeuo-field" type="text" id="register-username" placeholder="Developer01" required autocomplete="username">
          </div>
          <div class="form-group">
            <label class="form-label" for="register-email">OPERATOR EMAIL</label>
            <input class="form-input skeuo-field" type="email" id="register-email" placeholder="engineer@domain.com" required autocomplete="email">
          </div>
          <div class="form-group">
            <label class="form-label" for="register-password">MASTER KEY (6+ CHARS)</label>
            <input class="form-input skeuo-field" type="password" id="register-password" placeholder="••••••••" minlength="6" required autocomplete="new-password">
          </div>
          <button class="tactile-btn btn-auth-submit" type="submit" id="btn-register-submit">
            <span>PROVISION RECORD</span>
            <span class="btn-check-icon">→</span>
          </button>
        </form>

        <div class="auth-divider">
          <span>FEDERATED AUTH</span>
        </div>

        <button class="tactile-btn btn-google-auth" id="btn-google-auth">
          <svg class="google-icon" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.1.14-.14 3.01l3.01 2.33c1.76-1.61 2.78-3.98 2.78-6.69z"/>
            <path fill="currentColor" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96L1.29 17.37C3.26 21.3 7.31 24 12 24z"/>
            <path fill="currentColor" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.29 6.7C.46 8.35 0 10.12 0 12s.46 3.65 1.29 5.3l3.98-3.01z"/>
            <path fill="currentColor" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.93 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.7l3.98 3.01C6.22 6.86 8.87 4.75 12 4.75z"/>
          </svg>
          <span>Continue via Google SSO</span>
        </button>

        <div class="mounting-screw bottom-left" aria-hidden="true"></div>
        <div class="mounting-screw bottom-right" aria-hidden="true"></div>
      </div>
    </div>
  `;

  const tabLogin = container.querySelector('#tab-login');
  const tabRegister = container.querySelector('#tab-register');
  const formLogin = container.querySelector('#form-login');
  const formRegister = container.querySelector('#form-register');
  const authError = container.querySelector('#auth-error');
  const btnGoogle = container.querySelector('#btn-google-auth');

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

  tabLogin?.addEventListener('click', () => {
    playSound('snap');
    tabLogin.classList.add('active');
    tabRegister?.classList.remove('active');
    formLogin?.classList.remove('hidden');
    formRegister?.classList.add('hidden');
    clearError();
  });

  tabRegister?.addEventListener('click', () => {
    playSound('snap');
    tabRegister.classList.add('active');
    tabLogin?.classList.remove('active');
    formRegister?.classList.remove('hidden');
    formLogin?.classList.add('hidden');
    clearError();
  });

  formLogin?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();
    playSound('click');

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

  formRegister?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();
    playSound('click');

    const username = container.querySelector('#register-username').value;
    const email = container.querySelector('#register-email').value;
    const password = container.querySelector('#register-password').value;
    const submitBtn = container.querySelector('#btn-register-submit');

    try {
      if (submitBtn) submitBtn.disabled = true;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
    } catch (err) {
      if (submitBtn) submitBtn.disabled = false;
      showError(_translateFirebaseError(err.code || err.message));
    }
  });

  btnGoogle?.addEventListener('click', async () => {
    clearError();
    playSound('click');
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
   2. Skeuomorphic Stats & Operator Dossier
   ────────────────────────────────────────────────────────────────────────── */

function renderStatsPanel(container, gameState, curriculum) {
  const stats = gameState.getStats();

  const allPythonLessons = getAllLessons();
  const totalPythonLessons = allPythonLessons.length || 1;
  const allSQLLessons = getAllSQLLessons();
  const totalSQLLessons = allSQLLessons.length || 1;
  const allDSALessons = getAllDSALessons();
  const totalDSALessons = allDSALessons.length || 1;

  const completedLessonsSet = gameState.getCompletedLessons();
  const completedPythonLessons = [...completedLessonsSet].filter(id => !id.startsWith('sql_') && !id.startsWith('dsa_')).length;
  const completedSQLLessons = [...completedLessonsSet].filter(id => id.startsWith('sql_')).length;
  const completedDSALessons = [...completedLessonsSet].filter(id => id.startsWith('dsa_')).length;

  const pythonPct = Math.min(100, Math.round((completedPythonLessons / totalPythonLessons) * 100));
  const sqlPct = Math.min(100, Math.round((completedSQLLessons / totalSQLLessons) * 100));
  const dsaPct = Math.min(100, Math.round((completedDSALessons / totalDSALessons) * 100));

  const username = gameState.getRawState().username || 'Learner';
  const photoURL = gameState.getPhotoURL();
  const avatarHTML = photoURL
    ? `<img src="${photoURL}" class="profile-avatar-large-img" alt="${username}" referrerpolicy="no-referrer">`
    : `<div class="avatar-letter-large">${username.charAt(0).toUpperCase()}</div>`;

  const achievements = getAchievements(stats);

  container.innerHTML = `
    <div class="page-container profile-page hardware-deck-layout">
      <!-- Stamped Operator Identification Plate -->
      <div class="profile-header-card hardware-chassis-panel">
        <div class="mounting-screw top-left" aria-hidden="true"></div>
        <div class="mounting-screw top-right" aria-hidden="true"></div>

        <div class="profile-avatar-bezel">
          ${avatarHTML}
        </div>

        <div class="profile-info-col">
          <div class="operator-badge-tag">AUTHENTICATED OPERATOR // ID-${stats.userId ? stats.userId.slice(0, 8).toUpperCase() : 'LOCAL'}</div>
          <h1 class="profile-name">${username}</h1>
          <p class="profile-subtitle">RUNTIME COMMISSIONED: ${getJoinDate()}</p>
          <div class="profile-badges-row">
            <span class="hardware-pill">LEVEL ${Math.floor(stats.totalXP / 100) + 1}</span>
            <span class="hardware-pill rank-pill">${getRank(stats.totalXP).toUpperCase()}</span>
          </div>
        </div>

        <button class="tactile-btn btn-logout" id="btn-logout" title="Terminate current session">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>LOGOUT</span>
        </button>

        <div class="mounting-screw bottom-left" aria-hidden="true"></div>
        <div class="mounting-screw bottom-right" aria-hidden="true"></div>
      </div>

      <!-- Hardware Digital Gauge Array -->
      <div class="profile-stats-grid">
        <div class="hardware-gauge-card">
          <span class="gauge-tag">ACTIVE STREAK</span>
          <span class="gauge-digits">${stats.currentStreak}</span>
          <span class="gauge-unit">DAYS</span>
        </div>
        <div class="hardware-gauge-card">
          <span class="gauge-tag">LIFETIME XP</span>
          <span class="gauge-digits status-blue-text">${stats.totalXP.toLocaleString()}</span>
          <span class="gauge-unit">POINTS</span>
        </div>
        <div class="hardware-gauge-card">
          <span class="gauge-tag">COMPLETED ROUTINES</span>
          <span class="gauge-digits">${stats.completedLessons}</span>
          <span class="gauge-unit">MODULES</span>
        </div>
        <div class="hardware-gauge-card">
          <span class="gauge-tag">GEMS RESERVE</span>
          <span class="gauge-digits">${stats.gems}</span>
          <span class="gauge-unit">TOKENS</span>
        </div>
        <div class="hardware-gauge-card">
          <span class="gauge-tag">PERFECT RUNS</span>
          <span class="gauge-digits status-green-text">${stats.perfectCount}</span>
          <span class="gauge-unit">VERIFIED</span>
        </div>
        <div class="hardware-gauge-card">
          <span class="gauge-tag">MAX STREAK RECORD</span>
          <span class="gauge-digits">${stats.longestStreak}</span>
          <span class="gauge-unit">DAYS</span>
        </div>
      </div>

      <!-- Rotary Mastery Dials (Ref image style) -->
      <div class="section-card hardware-chassis-panel">
        <div class="section-card-header">
          <div class="section-title-group">
            <span class="header-led status-blue"></span>
            <h2 class="section-card-title">CURRICULUM CHANNEL MASTERY DIALS</h2>
          </div>
        </div>

        <div class="dials-row">
          <!-- Python Dial -->
          <div class="knob-assembly mini-assembly">
            <div class="skeuo-knob knob-medium" style="--rotation: ${-135 + (pythonPct/100)*270}deg;">
              <div class="knob-face"><div class="knob-notch"></div></div>
            </div>
            <div class="knob-readout-bezel">
              <span class="knob-readout-val">${pythonPct}</span>
              <span class="knob-readout-unit">%</span>
            </div>
            <div class="knob-label-sub">CH 1: PYTHON (${completedPythonLessons}/${totalPythonLessons})</div>
          </div>

          <!-- SQL Dial -->
          <div class="knob-assembly mini-assembly">
            <div class="skeuo-knob knob-medium" style="--rotation: ${-135 + (sqlPct/100)*270}deg;">
              <div class="knob-face"><div class="knob-notch"></div></div>
            </div>
            <div class="knob-readout-bezel">
              <span class="knob-readout-val">${sqlPct}</span>
              <span class="knob-readout-unit">%</span>
            </div>
            <div class="knob-label-sub">CH 2: SQL (${completedSQLLessons}/${totalSQLLessons})</div>
          </div>

          <!-- DSA Dial -->
          <div class="knob-assembly mini-assembly">
            <div class="skeuo-knob knob-medium" style="--rotation: ${-135 + (dsaPct/100)*270}deg;">
              <div class="knob-face"><div class="knob-notch"></div></div>
            </div>
            <div class="knob-readout-bezel">
              <span class="knob-readout-val">${dsaPct}</span>
              <span class="knob-readout-unit">%</span>
            </div>
            <div class="knob-label-sub">CH 3: DSA (${completedDSALessons}/${totalDSALessons})</div>
          </div>
        </div>
      </div>

      <!-- Stamped Achievements Plaque Matrix -->
      <div class="section-card hardware-chassis-panel">
        <div class="section-card-header">
          <div class="section-title-group">
            <span class="header-led status-green"></span>
            <h2 class="section-card-title">CERTIFIED OPERATOR BADGES</h2>
          </div>
        </div>

        <div class="achievements-matrix-grid">
          ${achievements.map(a => `
            <div class="achievement-plaque tactile-practice-item ${a.unlocked ? 'unlocked' : 'locked'}">
              <span class="plaque-diode ${a.unlocked ? 'status-green' : 'status-idle'}"></span>
              <div class="plaque-icon-box">${a.icon}</div>
              <div class="plaque-info">
                <div class="plaque-name">${a.name}</div>
                <div class="plaque-desc">${a.description}</div>
              </div>
              <span class="plaque-status-tag">${a.unlocked ? 'COMMITTED' : 'LOCKED'}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-logout')?.addEventListener('click', async () => {
    playSound('switch');
    try {
      await signOut(auth);
    } catch (err) {
      console.error('[PyMaster] Logout error:', err);
    }
  });
}

function getAchievements(stats) {
  return [
    { icon: icon('target', 20), name: 'First Trace', description: 'Commit first lesson', unlocked: stats.completedLessons >= 1 },
    { icon: icon('flame', 20), name: 'Thermistor Active', description: '3-day continuity streak', unlocked: stats.longestStreak >= 3 },
    { icon: icon('zap', 20), name: 'Weekly Waveform', description: '7-day continuity streak', unlocked: stats.longestStreak >= 7 },
    { icon: icon('check-circle', 20), name: 'Zero Fault Run', description: '5 perfect submissions', unlocked: stats.perfectCount >= 5 },
    { icon: icon('book', 20), name: 'Architecture 10', description: 'Complete 10 modules', unlocked: stats.completedLessons >= 10 },
    { icon: icon('trophy', 20), name: 'Milestone 50', description: 'Complete 50 modules', unlocked: stats.completedLessons >= 50 },
    { icon: icon('gem', 20), name: 'Bus Yield 500', description: 'Accumulate 500 XP', unlocked: stats.totalXP >= 500 },
    { icon: icon('sparkle', 20), name: 'Core Yield 1000', description: 'Accumulate 1000 XP', unlocked: stats.totalXP >= 1000 },
    { icon: icon('crown', 20), name: 'Hardware Master', description: 'Complete 100 modules', unlocked: stats.completedLessons >= 100 },
    { icon: icon('dragon', 20), name: 'Apex Spectrum', description: 'Accumulate 5000 XP', unlocked: stats.totalXP >= 5000 },
    { icon: icon('coins', 20), name: 'Gem Reserve 50', description: 'Bank 50 gems', unlocked: stats.gems >= 50 },
    { icon: icon('flame', 20), name: 'Unbroken Continuity', description: '30-day streak record', unlocked: stats.longestStreak >= 30 },
  ];
}

function getRank(xp) {
  if (xp >= 5000) return 'Principal System Architect';
  if (xp >= 3000) return 'Lead Runtime Engineer';
  if (xp >= 1500) return 'Senior Systems Analyst';
  if (xp >= 500) return 'Intermediate Operator';
  if (xp >= 100) return 'Junior Technician';
  return 'Trainee Operator';
}

function getJoinDate() {
  const stored = localStorage.getItem('pymaster_join_date');
  if (stored) return stored;
  const today = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  localStorage.setItem('pymaster_join_date', today);
  return today;
}

function _translateFirebaseError(code) {
  switch (code) {
    case 'auth/invalid-email':
      return 'The email address is improperly structured.';
    case 'auth/user-disabled':
      return 'This operator profile has been disabled.';
    case 'auth/user-not-found':
      return 'No operator record matches these credentials.';
    case 'auth/wrong-password':
      return 'Access key mismatch. Access denied.';
    case 'auth/email-already-in-use':
      return 'Operator record already provisioned for this address.';
    case 'auth/weak-password':
      return 'Key length must meet minimum 6-character entropy threshold.';
    default:
      return code || 'Authentication subsystem error. Retry momentarily.';
  }
}

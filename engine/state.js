import { db } from './firebase-init.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const STORAGE_KEY = 'pymaster_state';

/**
 * Default state shape — used on first launch or after a reset.
 */
function createDefaultState() {
  return {
    // Progress tracking
    completedLessons: [],       // Array of lesson IDs
    lessonResults: {},          // { lessonId: { xp, isPerfect, completedAt } }
    savedCode: {},              // { lessonId: codeString }

    // XP & Currency
    totalXP: 0,
    gems: 50,                  // Start with 50 gems

    // Streaks
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,      // ISO date string (YYYY-MM-DD)

    // Daily goals
    dailyGoals: {
      date: null,              // ISO date string for current day
      perfectCompletions: { current: 0, target: 2 },
      exercises:           { current: 0, target: 4 },
      xp:                  { current: 0, target: 60 },
    },

    // Profile
    username: 'Learner',
    joinedDate: new Date().toISOString(),

    // Stats
    perfectCount: 0,
  };
}

/**
 * Get today's date as YYYY-MM-DD string.
 */
function getTodayString() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

/**
 * Get yesterday's date as YYYY-MM-DD string.
 */
function getYesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/* --------------------------------------------------------------------------
   GameState Class
   -------------------------------------------------------------------------- */
class GameState {
  constructor() {
    /** @type {ReturnType<typeof createDefaultState>} */
    this._state = createDefaultState();

    /** @type {Set<Function>} */
    this._listeners = new Set();

    /** @type {string|null} */
    this._userId = null;
    this._isSyncing = false;

    // Load persisted state
    this.load();

    // Check streak on initialization
    this.checkStreak();

    // Reset daily goals if it's a new day
    this.resetDailyGoalsIfNewDay();
  }

  /* ── Persistence ── */

  /**
   * Load state from localStorage. Merges with defaults so new fields
   * are always present even if the stored state is from an older version.
   */
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Deep merge: defaults ← stored
        this._state = { ...createDefaultState(), ...parsed };

        // Merge nested objects
        if (parsed.dailyGoals) {
          this._state.dailyGoals = {
            ...createDefaultState().dailyGoals,
            ...parsed.dailyGoals,
          };
        }
      }
    } catch (err) {
      console.warn('[PyMaster] Failed to load state, using defaults:', err);
      this._state = createDefaultState();
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state));
      // Sync to Firestore if logged in
      if (this._userId) {
        this.syncToFirebase();
      }
    } catch (err) {
      console.error('[PyMaster] Failed to save state:', err);
    }
  }

  /**
   * Set user ID on Auth change. If logging in, triggers sync from Firebase.
   * If logging out, resets to default state.
   * @param {string | null} userId
   * @param {string | null} [username]
   */
  async setUserId(userId, username = null) {
    if (this._userId === userId) {
      if (userId && username && this._state.username !== username) {
        this._state.username = username;
        this.save();
        this.emit();
      }
      return;
    }

    this._userId = userId;

    if (userId) {
      if (username) {
        this._state.username = username;
      }
      await this.syncFromFirebase();
    } else {
      // User logged out — reset state to clear user data
      this._state = createDefaultState();
      this.save();
      this.emit();
    }
  }

  /**
   * Fetch progress from Firestore and merge with local progress.
   */
  async syncFromFirebase() {
    if (!this._userId) return;

    try {
      const docRef = doc(db, 'users', this._userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const remoteState = docSnap.data();
        this._mergeState(remoteState);
      } else {
        // No remote document yet — create it using current local state
        await this.syncToFirebase();
      }
    } catch (err) {
      console.error('[PyMaster] Error syncing from Firebase:', err);
    }
  }

  /**
   * Push current state to Firebase.
   */
  async syncToFirebase() {
    if (!this._userId || this._isSyncing) return;

    this._isSyncing = true;
    try {
      const docRef = doc(db, 'users', this._userId);
      await setDoc(docRef, this._state);
    } catch (err) {
      console.error('[PyMaster] Error syncing to Firebase:', err);
    } finally {
      this._isSyncing = false;
    }
  }

  /**
   * Merge remote Firestore state into current state using safe strategies:
   * - completedLessons: Union of remote and local
   * - totalXP / gems / streaks / perfectCount: Maximums of remote and local
   * - lessonResults: Union (keep higher XP / perfect status on collision)
   * - savedCode: Union (keep longer code string on collision)
   * @param {object} remote
   */
  _mergeState(remote) {
    if (!remote) return;

    // Completed Lessons (Union)
    const localLessons = new Set(this._state.completedLessons);
    const remoteLessons = remote.completedLessons || [];
    remoteLessons.forEach(id => localLessons.add(id));
    this._state.completedLessons = Array.from(localLessons);

    // Lesson Results (Merge)
    const remoteResults = remote.lessonResults || {};
    for (const id in remoteResults) {
      const localRes = this._state.lessonResults[id];
      const remoteRes = remoteResults[id];
      if (!localRes) {
        this._state.lessonResults[id] = remoteRes;
      } else {
        // Keep the one with higher XP or perfect completion
        if (remoteRes.xp > localRes.xp || (remoteRes.isPerfect && !localRes.isPerfect)) {
          this._state.lessonResults[id] = remoteRes;
        }
      }
    }

    // Saved Code (Merge)
    const remoteCode = remote.savedCode || {};
    for (const id in remoteCode) {
      if (!this._state.savedCode[id] || remoteCode[id].length > this._state.savedCode[id].length) {
        this._state.savedCode[id] = remoteCode[id];
      }
    }

    // XP & Gems (Max)
    this._state.totalXP = Math.max(this._state.totalXP, remote.totalXP || 0);
    this._state.gems = Math.max(this._state.gems, remote.gems || 50);

    // Streaks & Stats (Max)
    this._state.currentStreak = Math.max(this._state.currentStreak, remote.currentStreak || 0);
    this._state.longestStreak = Math.max(this._state.longestStreak, remote.longestStreak || 0);
    this._state.perfectCount = Math.max(this._state.perfectCount, remote.perfectCount || 0);

    if (remote.lastActiveDate) {
      if (!this._state.lastActiveDate || remote.lastActiveDate > this._state.lastActiveDate) {
        this._state.lastActiveDate = remote.lastActiveDate;
      }
    }

    // Username & Date
    if (remote.username && remote.username !== 'Learner') {
      this._state.username = remote.username;
    }
    if (remote.joinedDate) {
      this._state.joinedDate = remote.joinedDate;
    }

    // Save locally and emit changes
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state));
    } catch (err) {
      console.error('[PyMaster] Failed to save state locally:', err);
    }
    this.emit();

    // Push merged state back to Firebase
    this.syncToFirebase();
  }

  /**
   * Get the current authenticated user's ID.
   * @returns {string|null}
   */
  getUserId() {
    return this._userId;
  }

  /* ── Progress ── */

  /**
   * Mark a lesson as completed, award XP, and update daily goals.
   * @param {string} lessonId
   * @param {number} xpEarned
   * @param {boolean} isPerfect — all test cases passed on first try
   */
  completeLesson(lessonId, xpEarned, isPerfect = false) {
    // Avoid duplicate completions (but still allow re-earning XP)
    if (!this._state.completedLessons.includes(lessonId)) {
      this._state.completedLessons.push(lessonId);
    }

    // Store result details
    this._state.lessonResults[lessonId] = {
      xp: xpEarned,
      isPerfect,
      completedAt: new Date().toISOString(),
    };

    // Award XP
    this._state.totalXP += xpEarned;

    // Award bonus gems for perfect completion
    if (isPerfect) {
      this._state.gems += 5;
      this._state.perfectCount += 1;
      this.updateDailyGoal('perfect');
    }

    // Update daily goals
    this.updateDailyGoal('exercise');
    this._addDailyXP(xpEarned);

    // Update last active date for streak tracking
    this._state.lastActiveDate = getTodayString();

    this.save();
    this.emit();
  }

  /**
   * Check if a lesson has been completed.
   * @param {string} lessonId
   * @returns {boolean}
   */
  isLessonCompleted(lessonId) {
    return this._state.completedLessons.includes(lessonId);
  }

  /**
   * Get all completed lesson IDs as a Set.
   * @returns {Set<string>}
   */
  getCompletedLessons() {
    return new Set(this._state.completedLessons);
  }

  /**
   * Calculate completion percentage for a section.
   * @param {string} sectionId
   * @param {string[]} sectionLessonIds — all lesson IDs in this section
   * @returns {number} 0-100
   */
  getCompletionPercentage(sectionId, sectionLessonIds = []) {
    if (!sectionLessonIds.length) return 0;
    const completed = sectionLessonIds.filter(id => this.isLessonCompleted(id));
    return Math.round((completed.length / sectionLessonIds.length) * 100);
  }

  /* ── XP & Gems ── */

  /**
   * @returns {number} Total accumulated XP.
   */
  getXP() {
    return this._state.totalXP;
  }

  /**
   * @returns {number} Current gem balance.
   */
  getGems() {
    return this._state.gems;
  }

  /**
   * Add gems to the balance.
   * @param {number} amount
   */
  addGems(amount) {
    this._state.gems += amount;
    this.save();
    this.emit();
  }

  /* ── Streak ── */

  /**
   * @returns {number} Current consecutive-day streak.
   */
  getStreak() {
    return this._state.currentStreak;
  }

  /**
   * Called on app load — updates streak based on date continuity.
   * - Same day  → no change
   * - Yesterday → streak continues (incremented)
   * - Older     → streak resets to 0
   */
  checkStreak() {
    const today = getTodayString();
    const lastActive = this._state.lastActiveDate;

    if (!lastActive) {
      // First ever session
      this._state.currentStreak = 1;
      this._state.lastActiveDate = today;
    } else if (lastActive === today) {
      // Already active today — no change
    } else if (lastActive === getYesterdayString()) {
      // Continued streak
      this._state.currentStreak += 1;
      this._state.lastActiveDate = today;
    } else {
      // Streak broken
      this._state.currentStreak = 1;
      this._state.lastActiveDate = today;
    }

    // Track longest streak
    if (this._state.currentStreak > this._state.longestStreak) {
      this._state.longestStreak = this._state.currentStreak;
    }

    this.save();
  }

  /* ── Daily Goals ── */

  /**
   * Get current daily goals state.
   * @returns {{ perfectCompletions: {current:number,target:number}, exercises: {current:number,target:number}, xp: {current:number,target:number} }}
   */
  getDailyGoals() {
    return {
      perfectCompletions: { ...this._state.dailyGoals.perfectCompletions },
      exercises:          { ...this._state.dailyGoals.exercises },
      xp:                 { ...this._state.dailyGoals.xp },
    };
  }

  /**
   * Increment a daily goal counter.
   * @param {'perfect' | 'exercise' | 'xp'} type
   */
  updateDailyGoal(type) {
    this.resetDailyGoalsIfNewDay();

    switch (type) {
      case 'perfect':
        this._state.dailyGoals.perfectCompletions.current += 1;
        break;
      case 'exercise':
        this._state.dailyGoals.exercises.current += 1;
        break;
      case 'xp':
        // XP is handled via _addDailyXP — this is a manual override entry
        break;
    }

    this.save();
    this.emit();
  }

  /**
   * Internal: add XP to the daily goal tracker.
   * @param {number} amount
   */
  _addDailyXP(amount) {
    this.resetDailyGoalsIfNewDay();
    this._state.dailyGoals.xp.current += amount;
    this.save();
  }

  /**
   * If today's date differs from the stored goals date, reset counters.
   */
  resetDailyGoalsIfNewDay() {
    const today = getTodayString();
    if (this._state.dailyGoals.date !== today) {
      this._state.dailyGoals = {
        date: today,
        perfectCompletions: { current: 0, target: 2 },
        exercises:          { current: 0, target: 4 },
        xp:                 { current: 0, target: 60 },
      };
      this.save();
    }
  }

  /* ── Event System ── */

  /**
   * Subscribe to state changes.
   * @param {Function} callback — called with no arguments on every change.
   * @returns {Function} Unsubscribe function.
   */
  onChange(callback) {
    this._listeners.add(callback);
    return () => this._listeners.delete(callback);
  }

  /**
   * Notify all subscribers of a state change.
   */
  emit() {
    for (const cb of this._listeners) {
      try {
        cb();
      } catch (err) {
        console.error('[PyMaster] Listener error:', err);
      }
    }
  }

  /* ── Stats ── */

  /**
   * Get aggregated statistics.
   * @returns {{
   *   totalLessons: number,
   *   completedLessons: number,
   *   totalXP: number,
   *   currentStreak: number,
   *   longestStreak: number,
   *   perfectCount: number,
   *   gems: number,
   * }}
   */
  getStats() {
    return {
      totalLessons: 0,         // Set by the app when curriculum is loaded
      completedLessons: this._state.completedLessons.length,
      totalXP: this._state.totalXP,
      currentStreak: this._state.currentStreak,
      longestStreak: this._state.longestStreak,
      perfectCount: this._state.perfectCount,
      gems: this._state.gems,
    };
  }

  /**
   * Save the code for a specific challenge.
   * @param {string} lessonId
   * @param {string} code
   */
  saveCode(lessonId, code) {
    this._state.savedCode[lessonId] = code;
    this.save();
  }

  /**
   * Get the saved code for a specific challenge, falling back to starterCode if none.
   * @param {string} lessonId
   * @param {string} starterCode
   * @returns {string}
   */
  getCode(lessonId, starterCode) {
    return this._state.savedCode[lessonId] ?? starterCode;
  }

  /* ── Utility ── */

  /**
   * Completely reset all state (used for debugging / testing).
   */
  reset() {
    this._state = createDefaultState();
    this.save();
    this.emit();
  }

  /**
   * Get the raw state object (read-only snapshot).
   */
  getRawState() {
    return structuredClone(this._state);
  }
}

/* --------------------------------------------------------------------------
   Singleton Export
   -------------------------------------------------------------------------- */
export const gameState = new GameState();

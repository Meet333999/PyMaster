/* ==========================================================================
   PyMaster — sql.js SQL Execution Engine
   Runs SQL queries in-browser via sql.js (SQLite compiled to WebAssembly)
   with output formatting, timeout enforcement, and clean environment resets.
   ========================================================================== */

/** @type {any} sql.js Database instance */
let db = null;

/** @type {any} sql.js SQL module */
let SQL = null;

/** True while sql.js is being loaded */
let isLoading = false;

/** True once sql.js is fully initialized and ready */
let isReady = false;

/** Max execution time in milliseconds */
const EXEC_TIMEOUT_MS = 5000;

/* --------------------------------------------------------------------------
   Initialization
   -------------------------------------------------------------------------- */

/**
 * Load and initialize sql.js from the global `initSqlJs` function
 * (expected to be available via a <script> tag in the HTML).
 *
 * @param {Function} [onProgress] — optional callback for loading status updates
 * @returns {Promise<void>}
 */
export async function initSQL(onProgress) {
  if (isReady || isLoading) return;

  isLoading = true;
  _notify(onProgress, 'Loading SQL runtime...');

  try {
    // initSqlJs is expected on the global scope (window)
    if (typeof initSqlJs !== 'function') {
      throw new Error(
        'initSqlJs is not available. Make sure the sql.js CDN script is loaded in your HTML.'
      );
    }

    SQL = await initSqlJs({
      locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`,
    });

    // Create an in-memory database
    db = new SQL.Database();

    isReady = true;
    isLoading = false;
    _notify(onProgress, 'SQL runtime ready ✓');
    console.log('[PyMaster] sql.js initialized successfully.');
  } catch (err) {
    isLoading = false;
    isReady = false;
    console.error('[PyMaster] Failed to initialize sql.js:', err);
    throw err;
  }
}

/**
 * Check if sql.js is loaded and ready to execute queries.
 * @returns {boolean}
 */
export function isSQLReady() {
  return isReady;
}

/* --------------------------------------------------------------------------
   Query Execution
   -------------------------------------------------------------------------- */

/**
 * Execute an SQL query string and capture its output.
 *
 * @param {string} code — SQL source code to execute
 * @param {string} [setupSQL=''] — SQL to run first to set up tables/data
 * @returns {Promise<{ output: string, error: string | null }>}
 */
export async function runSQL(code, setupSQL = '') {
  if (!isReady || !SQL) {
    return {
      output: '',
      error: 'SQL runtime is not loaded. Please wait for initialization.',
    };
  }

  try {
    // Create a fresh database for each run to avoid state leaks
    if (db) {
      db.close();
    }
    db = new SQL.Database();

    // Run setup SQL (create tables, insert data) if provided
    if (setupSQL && setupSQL.trim()) {
      db.run(setupSQL);
    }

    // Execute with timeout
    const result = await _executeWithTimeout(code, EXEC_TIMEOUT_MS);
    return result;
  } catch (err) {
    return {
      output: '',
      error: _formatError(err),
    };
  }
}

/* --------------------------------------------------------------------------
   Internal Helpers
   -------------------------------------------------------------------------- */

/**
 * Execute user SQL code with a timeout.
 * @param {string} code
 * @param {number} timeoutMs
 * @returns {Promise<{ output: string, error: string | null }>}
 */
async function _executeWithTimeout(code, timeoutMs) {
  return new Promise((resolve) => {
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      resolve({
        output: '',
        error: `Execution timed out after ${timeoutMs / 1000} seconds. Check for infinite loops or recursive CTEs without limits.`,
      });
    }, timeoutMs);

    try {
      // Execute the SQL and get results
      const results = db.exec(code);

      if (timedOut) return;
      clearTimeout(timer);

      // Format results as pipe-separated text
      const output = _formatResults(results);

      resolve({
        output,
        error: null,
      });
    } catch (err) {
      if (timedOut) return;
      clearTimeout(timer);

      resolve({
        output: '',
        error: _formatError(err),
      });
    }
  });
}

/**
 * Format sql.js query results into pipe-separated text output.
 * Format: column headers on first line, then data rows.
 * Columns separated by |, rows separated by \n.
 *
 * @param {Array<{ columns: string[], values: any[][] }>} results
 * @returns {string}
 */
function _formatResults(results) {
  if (!results || results.length === 0) {
    return '';
  }

  // Take the last result set (in case of multiple statements)
  const lastResult = results[results.length - 1];

  if (!lastResult.columns || lastResult.columns.length === 0) {
    return '';
  }

  // Build header row
  const header = lastResult.columns.join('|');

  // Build data rows
  const rows = lastResult.values.map(row =>
    row.map(val => {
      if (val === null) return 'NULL';
      return String(val);
    }).join('|')
  );

  return [header, ...rows].join('\n');
}

/**
 * Format a SQL error into a clean string.
 * @param {Error | any} err
 * @returns {string}
 */
function _formatError(err) {
  if (!err) return 'Unknown error';

  const msg = err.message || String(err);

  // Clean up sql.js error messages
  if (msg.includes('SQLite')) {
    return msg.replace(/^Error:\s*/, '');
  }

  return msg;
}

/**
 * Call an optional progress callback.
 * @param {Function | undefined} cb
 * @param {string} message
 */
function _notify(cb, message) {
  if (typeof cb === 'function') cb(message);
}

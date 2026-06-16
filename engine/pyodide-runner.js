/* ==========================================================================
   PyMaster — Pyodide Code Execution Engine
   Runs Python code in-browser via Pyodide with stdout/stderr capture,
   stdin mocking, timeout enforcement, and clean environment resets.
   ========================================================================== */

/** @type {any} Pyodide runtime instance */
let pyodide = null;

/** True while Pyodide is being loaded */
let isLoading = false;

/** True once Pyodide is fully initialized and ready */
let isReady = false;

/** Max execution time in milliseconds */
const EXEC_TIMEOUT_MS = 5000;

/* --------------------------------------------------------------------------
   Initialization
   -------------------------------------------------------------------------- */

/**
 * Load and initialize Pyodide from the global `loadPyodide` function
 * (expected to be available via a <script> tag in the HTML).
 *
 * @param {Function} [onProgress] — optional callback for loading status updates
 * @returns {Promise<void>}
 */
export async function initPyodide(onProgress) {
  if (isReady || isLoading) return;

  isLoading = true;
  _notify(onProgress, 'Loading Python runtime...');

  try {
    // loadPyodide is expected on the global scope (window)
    if (typeof loadPyodide !== 'function') {
      throw new Error(
        'loadPyodide is not available. Make sure the Pyodide CDN script is loaded in your HTML.'
      );
    }

    pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
    });

    isReady = true;
    isLoading = false;
    _notify(onProgress, 'Python runtime ready ✓');
    console.log('[PyMaster] Pyodide initialized successfully.');
  } catch (err) {
    isLoading = false;
    isReady = false;
    console.error('[PyMaster] Failed to initialize Pyodide:', err);
    throw err;
  }
}

/**
 * Check if Pyodide is loaded and ready to execute code.
 * @returns {boolean}
 */
export function isPyodideReady() {
  return isReady;
}

/* --------------------------------------------------------------------------
   Code Execution
   -------------------------------------------------------------------------- */

/**
 * Execute a Python code string and capture its output.
 *
 * @param {string} code — Python source code to execute
 * @param {string} [stdinInput=''] — simulated stdin input (newline-separated lines)
 * @returns {Promise<{ stdout: string, stderr: string, error: string | null }>}
 */
export async function runPython(code, stdinInput = '') {
  if (!isReady || !pyodide) {
    return {
      stdout: '',
      stderr: '',
      error: 'Python runtime is not loaded. Please wait for initialization.',
    };
  }

  // Reset the Python environment before each run
  _resetEnvironment();

  // Set up stdout/stderr capture and stdin mocking
  const setupCode = _buildSetupCode(stdinInput);

  try {
    // Run the setup (redirect IO)
    await pyodide.runPythonAsync(setupCode);

    // Execute the user's code with a timeout
    const result = await _executeWithTimeout(code, EXEC_TIMEOUT_MS);

    return result;
  } catch (err) {
    return {
      stdout: _captureOutput('stdout'),
      stderr: _captureOutput('stderr'),
      error: _formatError(err),
    };
  }
}

/* --------------------------------------------------------------------------
   Internal Helpers
   -------------------------------------------------------------------------- */

/**
 * Build the Python setup code that redirects stdout/stderr to StringIO
 * and mocks stdin with the provided input string.
 * @param {string} stdinInput
 * @returns {string}
 */
function _buildSetupCode(stdinInput) {
  // Escape backticks and backslashes in the stdin input for embedding in Python
  const escapedInput = stdinInput
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n');

  return `
import sys
from io import StringIO

# Capture stdout
sys.stdout = StringIO()

# Capture stderr
sys.stderr = StringIO()

# Mock stdin
sys.stdin = StringIO('${escapedInput}')
`;
}

/**
 * Execute user code with a timeout.
 * @param {string} code
 * @param {number} timeoutMs
 * @returns {Promise<{ stdout: string, stderr: string, error: string | null }>}
 */
async function _executeWithTimeout(code, timeoutMs) {
  return new Promise((resolve) => {
    let timedOut = false;

    const timer = setTimeout(() => {
      timedOut = true;
      resolve({
        stdout: _captureOutput('stdout'),
        stderr: _captureOutput('stderr'),
        error: `Execution timed out after ${timeoutMs / 1000} seconds. Check for infinite loops.`,
      });
    }, timeoutMs);

    pyodide
      .runPythonAsync(code)
      .then(() => {
        if (timedOut) return;
        clearTimeout(timer);

        resolve({
          stdout: _captureOutput('stdout'),
          stderr: _captureOutput('stderr'),
          error: null,
        });
      })
      .catch((err) => {
        if (timedOut) return;
        clearTimeout(timer);

        resolve({
          stdout: _captureOutput('stdout'),
          stderr: _captureOutput('stderr'),
          error: _formatError(err),
        });
      });
  });
}

/**
 * Read captured output from the Python StringIO buffer.
 * @param {'stdout' | 'stderr'} stream
 * @returns {string}
 */
function _captureOutput(stream) {
  try {
    const target = stream === 'stdout' ? 'sys.stdout' : 'sys.stderr';
    const output = pyodide.runPython(`${target}.getvalue()`);
    return output || '';
  } catch {
    return '';
  }
}

/**
 * Reset the Python global namespace to avoid variable leaks between runs.
 */
function _resetEnvironment() {
  try {
    pyodide.runPython(`
import sys

# Clear user-defined globals (keep builtins and sys)
_keep = set(dir(__builtins__)) | {'__builtins__', '__name__', '__doc__', '__package__', '__loader__', '__spec__', 'sys'}
for _name in list(globals()):
    if _name not in _keep and not _name.startswith('_'):
        del globals()[_name]
`);
  } catch {
    // Non-critical — continue even if reset fails
  }
}

/**
 * Format a Python error into a clean string.
 * @param {Error | any} err
 * @returns {string}
 */
function _formatError(err) {
  if (!err) return 'Unknown error';

  const msg = err.message || String(err);

  // Extract the last meaningful Python traceback line
  const lines = msg.split('\n');
  const pyLines = lines.filter(
    (l) => !l.includes('pyodide') && !l.includes('wasm') && l.trim()
  );

  if (pyLines.length) {
    return pyLines.join('\n');
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

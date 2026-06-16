/* ==========================================================================
   PyMaster — Test Case Validator
   Compares actual program output against expected output with
   normalization, and runs full test suites returning detailed results.
   ========================================================================== */

/**
 * Normalize output for comparison:
 *  - Trim leading/trailing whitespace
 *  - Normalize line endings (CRLF → LF)
 *  - Remove trailing newline
 *  - Collapse multiple trailing blank lines into none
 *
 * @param {string} output — raw output string
 * @returns {string} normalized output
 */
export function normalizeOutput(output) {
  if (typeof output !== 'string') {
    return String(output ?? '');
  }

  return output
    .replace(/\r\n/g, '\n')   // CRLF → LF
    .replace(/\r/g, '\n')     // lone CR → LF
    .replace(/\n+$/, '')      // strip trailing newlines
    .trim();                   // trim whitespace
}

/**
 * Compare a single actual output against the expected output.
 * Both values are normalized before comparison.
 *
 * @param {string} actualOutput   — the stdout produced by the user's code
 * @param {string} expectedOutput — the expected correct output
 * @returns {boolean} true if they match after normalization
 */
export function validateTestCase(actualOutput, expectedOutput) {
  const normalizedActual   = normalizeOutput(actualOutput);
  const normalizedExpected = normalizeOutput(expectedOutput);

  return normalizedActual === normalizedExpected;
}

/**
 * Run all test cases against the actual output produced by a single run,
 * or against outputs from multiple runs (one per test case).
 *
 * Supports two modes:
 *  1. **Single output mode** — `actualOutput` is a string.  Every test case
 *     is compared against the same output (useful for exercises without stdin).
 *  2. **Per-test output mode** — `actualOutput` is an array of strings,
 *     one per test case.
 *
 * @param {Array<{ input?: string, expected: string }>} testCases
 * @param {string | string[]} actualOutput
 * @returns {Array<{ passed: boolean, expected: string, actual: string, input: string }>}
 */
export function runAllTests(testCases, actualOutput) {
  if (!Array.isArray(testCases) || testCases.length === 0) {
    return [];
  }

  const isMultiple = Array.isArray(actualOutput);

  return testCases.map((testCase, index) => {
    const expected = testCase.expected ?? testCase.expectedOutput ?? '';
    const input    = testCase.input ?? '';
    const actual   = isMultiple
      ? (actualOutput[index] ?? '')
      : (actualOutput ?? '');

    const passed = validateTestCase(actual, expected);

    return {
      passed,
      expected: normalizeOutput(expected),
      actual:   normalizeOutput(actual),
      input,
    };
  });
}

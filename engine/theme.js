// ==========================================================================
// PyMaster — Dual Skeuomorphic Theme Manager (Dark & Light)
// ==========================================================================

const THEME_STORAGE_KEY = 'pymaster_theme';

export function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch (e) {}

  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

export function setTheme(theme) {
  const newTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  } catch (e) {}

  // Update Monaco Editor theme if Monaco is ready
  if (typeof monaco !== 'undefined' && monaco.editor) {
    monaco.editor.setTheme(newTheme === 'light' ? 'pymaster-skeuo-light' : 'pymaster-skeuo-dark');
  }

  // Dispatch custom event for any listeners (e.g., oscilloscope canvas)
  window.dispatchEvent(new CustomEvent('pymaster-theme-changed', { detail: { theme: newTheme } }));

  return newTheme;
}

export function toggleTheme() {
  const current = getCurrentTheme();
  return setTheme(current === 'dark' ? 'light' : 'dark');
}

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'snappyledger-theme'
const THEME_COLOR_META: Record<Theme, string> = {
  dark: '#05080c',
  light: '#fcfcfd',
}

export function getStoredTheme(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme

  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute('content', THEME_COLOR_META[theme])

  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Private browsing / storage restrictions — theme just won't persist.
  }
}

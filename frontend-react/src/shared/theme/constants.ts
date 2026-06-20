export const THEME_STORAGE_KEY = 'app-theme';
export const THEME_MODE_DARK = 'dark';
export const THEME_MODE_LIGHT = 'light';

export function readStoredIsDark(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return localStorage.getItem(THEME_STORAGE_KEY) === THEME_MODE_DARK;
}

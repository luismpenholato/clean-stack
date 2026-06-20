'use client';

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react';

import { applyAppTokens } from '@/shared/theme/apply-tokens';
import {
  THEME_MODE_DARK,
  THEME_MODE_LIGHT,
  THEME_STORAGE_KEY,
  readStoredIsDark,
} from '@/shared/theme/constants';

type ThemeContextValue = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeMode(isDark: boolean) {
  applyAppTokens(isDark);
  document.body.classList.toggle('theme-dark', isDark);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(readStoredIsDark);

  useLayoutEffect(() => {
    applyThemeMode(isDark);
    localStorage.setItem(
      THEME_STORAGE_KEY,
      isDark ? THEME_MODE_DARK : THEME_MODE_LIGHT,
    );
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((current) => !current);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider.');
  }

  return context;
}

/**
 * Fonte única de verdade para cores do produto.
 * Consumido por apply-tokens.ts (--app-*) e antd-config.ts (ConfigProvider).
 */

export type AppPalette = {
  primary: string;
  primaryHover: string;
  headerBg: string;
  contentBg: string;
  cardBg: string;
  inputBg: string;
  text: string;
  textSecondary: string;
  border: string;
  inputBorder: string;
  cardShadow: string;
  headerShadow: string;
  hoverBg: string;
  tableHeaderBg: string;
  tableRowHover: string;
  selectOptionHover: string;
  menuItemHover: string;
  statusSuccessBg: string;
  statusSuccessText: string;
  statusErrorBg: string;
  statusErrorText: string;
  metricBlueBg: string;
  metricBlueText: string;
  metricGreenBg: string;
  metricGreenText: string;
  metricRedBg: string;
  metricRedText: string;
  metricYellowBg: string;
  metricYellowText: string;
};

export const lightPalette: AppPalette = {
  primary: '#4f46e5',
  primaryHover: '#6366f1',
  headerBg: '#ffffff',
  contentBg: '#ffffff',
  cardBg: '#ffffff',
  inputBg: 'transparent',
  text: 'rgba(15, 23, 42, 0.92)',
  textSecondary: 'rgba(15, 23, 42, 0.6)',
  border: 'rgba(15, 23, 42, 0.08)',
  inputBorder: 'rgba(15, 23, 42, 0.12)',
  cardShadow: '0 6px 16px rgba(15, 23, 42, 0.08)',
  headerShadow: '0 6px 16px rgba(15, 23, 42, 0.08)',
  hoverBg: 'rgba(15, 23, 42, 0.04)',
  tableHeaderBg: 'rgba(15, 23, 42, 0.06)',
  tableRowHover: 'rgba(15, 23, 42, 0.03)',
  selectOptionHover: 'rgba(15, 23, 42, 0.06)',
  menuItemHover: 'rgba(79, 70, 229, 0.08)',
  statusSuccessBg: 'rgba(16, 185, 129, 0.12)',
  statusSuccessText: '#047857',
  statusErrorBg: 'rgba(239, 68, 68, 0.1)',
  statusErrorText: '#b91c1c',
  metricBlueBg: 'rgba(99, 102, 241, 0.1)',
  metricBlueText: '#6366f1',
  metricGreenBg: 'rgba(16, 185, 129, 0.12)',
  metricGreenText: '#059669',
  metricRedBg: 'rgba(239, 68, 68, 0.1)',
  metricRedText: '#dc2626',
  metricYellowBg: 'rgba(245, 158, 11, 0.12)',
  metricYellowText: '#d97706',
};

export const darkPalette: AppPalette = {
  primary: '#818cf8',
  primaryHover: '#a5b4fc',
  headerBg: '#1e1b4b',
  contentBg: '#0f172a',
  cardBg: '#1e293b',
  inputBg: 'transparent',
  text: 'rgba(255, 255, 255, 0.9)',
  textSecondary: 'rgba(255, 255, 255, 0.6)',
  border: 'rgba(255, 255, 255, 0.08)',
  inputBorder: 'rgba(255, 255, 255, 0.08)',
  cardShadow: '0 4px 10px rgba(0, 0, 0, 0.35)',
  headerShadow: '0 4px 10px rgba(0, 0, 0, 0.35)',
  hoverBg: 'rgba(255, 255, 255, 0.08)',
  tableHeaderBg: 'rgba(0, 0, 0, 0.2)',
  tableRowHover: 'rgba(255, 255, 255, 0.04)',
  selectOptionHover: 'rgba(255, 255, 255, 0.08)',
  menuItemHover: 'rgba(129, 140, 248, 0.12)',
  statusSuccessBg: 'rgba(52, 211, 153, 0.15)',
  statusSuccessText: '#6ee7b7',
  statusErrorBg: 'rgba(248, 113, 113, 0.15)',
  statusErrorText: '#fca5a5',
  metricBlueBg: 'rgba(129, 140, 248, 0.15)',
  metricBlueText: '#a5b4fc',
  metricGreenBg: 'rgba(52, 211, 153, 0.15)',
  metricGreenText: '#6ee7b7',
  metricRedBg: 'rgba(248, 113, 113, 0.15)',
  metricRedText: '#fca5a5',
  metricYellowBg: 'rgba(252, 211, 77, 0.15)',
  metricYellowText: '#fcd34d',
};

export function getPalette(isDark: boolean): AppPalette {
  return isDark ? darkPalette : lightPalette;
}

/** Tokens semânticos compartilhados (Ant Design + produto) */
export const semanticColors = {
  success: '#34d399',
  error: '#f87171',
  warning: '#fbbf24',
} as const;

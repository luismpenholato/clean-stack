import { getPalette, type AppPalette } from './palette';

export const PALETTE_CSS_VAR_MAP: Record<keyof AppPalette, `--${string}`> = {
  primary: '--app-primary',
  primaryHover: '--app-primary-hover',
  headerBg: '--app-header-bg',
  contentBg: '--app-content-bg',
  cardBg: '--app-card-bg',
  inputBg: '--app-input-bg',
  text: '--app-text',
  textSecondary: '--app-text-secondary',
  border: '--app-border-color',
  inputBorder: '--app-input-border',
  cardShadow: '--app-card-shadow',
  headerShadow: '--app-header-shadow',
  hoverBg: '--app-hover-bg',
  tableHeaderBg: '--app-table-header-bg',
  tableRowHover: '--app-table-row-hover',
  selectOptionHover: '--app-select-option-hover',
  menuItemHover: '--app-menu-item-hover',
  statusSuccessBg: '--app-status-success-bg',
  statusSuccessText: '--app-status-success-text',
  statusErrorBg: '--app-status-error-bg',
  statusErrorText: '--app-status-error-text',
  metricBlueBg: '--app-metric-blue-bg',
  metricBlueText: '--app-metric-blue-text',
  metricGreenBg: '--app-metric-green-bg',
  metricGreenText: '--app-metric-green-text',
  metricRedBg: '--app-metric-red-bg',
  metricRedText: '--app-metric-red-text',
  metricYellowBg: '--app-metric-yellow-bg',
  metricYellowText: '--app-metric-yellow-text',
};

export function applyPaletteToRoot(
  palette: AppPalette,
  root: HTMLElement = document.documentElement,
): void {
  for (const [key, cssVar] of Object.entries(PALETTE_CSS_VAR_MAP) as [
    keyof AppPalette,
    `--${string}`,
  ][]) {
    root.style.setProperty(cssVar, palette[key]);
  }

  root.style.setProperty('--app-input-focus-border', palette.primary);
}

/** Sincroniza --app-* no :root a partir da paleta única. */
export function applyAppTokens(isDark: boolean): void {
  if (typeof document === 'undefined') {
    return;
  }

  applyPaletteToRoot(getPalette(isDark));
}

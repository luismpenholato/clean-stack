/**
 * Bridge entre tokens Ant Design e variáveis CSS do produto (--app-*).
 * Valores são injetados em runtime por apply-tokens.ts / init-script.ts.
 */
export const appCssVar = {
  primary: 'var(--app-primary)',
  primaryHover: 'var(--app-primary-hover)',
  headerBg: 'var(--app-header-bg)',
  contentBg: 'var(--app-content-bg)',
  cardBg: 'var(--app-card-bg)',
  inputBg: 'var(--app-input-bg)',
  text: 'var(--app-text)',
  textSecondary: 'var(--app-text-secondary)',
  border: 'var(--app-border-color)',
  inputBorder: 'var(--app-input-border)',
  tableHeaderBg: 'var(--app-table-header-bg)',
  tableRowHover: 'var(--app-table-row-hover)',
  selectOptionHover: 'var(--app-select-option-hover)',
  menuItemHover: 'var(--app-menu-item-hover)',
} as const;

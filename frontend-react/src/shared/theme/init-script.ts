import { PALETTE_CSS_VAR_MAP } from './apply-tokens';
import { THEME_STORAGE_KEY } from './constants';
import { darkPalette, lightPalette } from './palette';

/** Mapa invertido: nome da CSS var → chave da paleta (serializado no script inline). */
const CSS_VAR_TO_PALETTE_KEY = Object.fromEntries(
  Object.entries(PALETTE_CSS_VAR_MAP).map(([paletteKey, cssVar]) => [
    cssVar,
    paletteKey,
  ]),
);

/**
 * Script síncrono executado antes da hidratação React.
 * Evita flash de tema claro quando o usuário preferiu dark mode.
 */
export function buildThemeInitScript(): string {
  const lightJson = JSON.stringify(lightPalette);
  const darkJson = JSON.stringify(darkPalette);
  const varMapJson = JSON.stringify(CSS_VAR_TO_PALETTE_KEY);

  return `(function(){try{var isDark=localStorage.getItem('${THEME_STORAGE_KEY}')==='dark';var palette=isDark?${darkJson}:${lightJson};var map=${varMapJson};var root=document.documentElement;for(var cssVar in map){root.style.setProperty(cssVar,palette[map[cssVar]]);}root.style.setProperty('--app-input-focus-border',palette.primary);if(isDark&&document.body){document.body.classList.add('theme-dark');}}catch(e){}})();`;
}

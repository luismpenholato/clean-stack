import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

import { getPalette, semanticColors } from './palette';

/**
 * Identificador do tema Ant Design (cssVar.key).
 * Isola variáveis geradas pelo Ant Design (--ant-* internamente, escopadas por key).
 *
 * Tokens de cor usam hex da paleta — Ant Design precisa calcular derivadas (primary-1…7).
 * CSS customizado continua usando var(--app-*) injetadas em runtime.
 */
export const ANT_CSS_VAR_KEY = 'app';

export function getAntdTheme(isDark: boolean): ThemeConfig {
  const colors = getPalette(isDark);

  return {
    cssVar: {
      key: ANT_CSS_VAR_KEY,
    },
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      borderRadius: 10,
      colorPrimary: colors.primary,
      colorPrimaryHover: colors.primaryHover,
      colorPrimaryActive: colors.primary,
      colorSuccess: semanticColors.success,
      colorError: semanticColors.error,
      colorWarning: semanticColors.warning,
      colorBgContainer: colors.cardBg,
      colorBgElevated: colors.cardBg,
      colorBgLayout: colors.contentBg,
      colorText: colors.text,
      colorTextSecondary: colors.textSecondary,
      colorBorder: colors.border,
      colorLink: colors.primary,
      colorLinkHover: colors.primaryHover,
    },
    components: {
      Layout: {
        headerBg: colors.headerBg,
        bodyBg: colors.contentBg,
        headerHeight: 64,
      },
      Menu: {
        itemBg: 'transparent',
        subMenuItemBg: 'transparent',
        itemBorderRadius: 8,
        itemColor: colors.text,
        itemHoverColor: colors.text,
        itemSelectedColor: '#ffffff',
        itemSelectedBg: colors.primary,
        itemHoverBg: colors.menuItemHover,
      },
      Button: {
        borderRadius: 8,
        primaryColor: '#ffffff',
        colorPrimary: colors.primary,
        colorPrimaryHover: colors.primaryHover,
        colorPrimaryActive: colors.primary,
        defaultBg: 'transparent',
        defaultBorderColor: colors.inputBorder,
        defaultColor: colors.text,
        defaultHoverBorderColor: colors.primary,
        defaultHoverColor: colors.primary,
      },
      Table: {
        headerBg: colors.tableHeaderBg,
        headerColor: colors.text,
        rowHoverBg: colors.tableRowHover,
        borderColor: colors.border,
        colorBgContainer: colors.cardBg,
      },
      Card: {
        colorBgContainer: colors.cardBg,
        colorBorderSecondary: colors.border,
      },
      Drawer: {
        colorBgElevated: colors.headerBg,
        colorText: colors.text,
      },
      Input: {
        colorBgContainer: colors.inputBg,
        colorBorder: colors.inputBorder,
        activeBorderColor: colors.primary,
        hoverBorderColor: colors.inputBorder,
        colorText: colors.text,
        colorTextPlaceholder: colors.textSecondary,
        activeShadow: 'none',
        warningActiveShadow: 'none',
        errorActiveShadow: 'none',
      },
      InputNumber: {
        colorBgContainer: colors.inputBg,
        colorBorder: colors.inputBorder,
        activeBorderColor: colors.primary,
        hoverBorderColor: colors.inputBorder,
        colorText: colors.text,
        handleBg: colors.cardBg,
      },
      Select: {
        colorBgContainer: colors.inputBg,
        colorBorder: colors.inputBorder,
        optionSelectedBg: colors.selectOptionHover,
        optionActiveBg: colors.selectOptionHover,
        colorText: colors.text,
        colorTextPlaceholder: colors.textSecondary,
        selectorBg: colors.inputBg,
      },
      Form: {
        labelColor: colors.text,
      },
      Modal: {
        contentBg: colors.cardBg,
        headerBg: colors.cardBg,
        titleColor: colors.text,
        colorIcon: colors.textSecondary,
      },
      Tag: {
        defaultBg: colors.cardBg,
      },
      Pagination: {
        itemBg: colors.cardBg,
        itemActiveBg: colors.primary,
        colorText: colors.text,
        colorPrimary: colors.primary,
      },
      DatePicker: {
        colorBgContainer: colors.inputBg,
        colorBorder: colors.inputBorder,
        colorText: colors.text,
      },
      Notification: {
        colorBgElevated: colors.cardBg,
        colorText: colors.text,
      },
      Message: {
        contentBg: colors.cardBg,
        colorText: colors.text,
      },
      Popover: {
        colorBgElevated: colors.cardBg,
        colorText: colors.text,
      },
    },
  };
}

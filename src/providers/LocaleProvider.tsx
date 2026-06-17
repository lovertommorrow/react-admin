import { theme as antdTheme, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { SupportedLocale } from '../i18n'
import { usePreferences } from '@/hooks/use-preferences'
import { customAntdDarkTheme, customAntdLightTheme } from '@/styles/theme/antd-theme'

const antdLocales: Record<SupportedLocale, typeof enUS> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  const { isDark, themeRadius, themeColorPrimary, sideCollapsedWidth } = usePreferences();
  const locale =
    antdLocales[i18n.language as SupportedLocale] ?? enUS

  return <ConfigProvider
    theme={{
      cssVar: {},
      hashed: false,
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        ...(isDark ? customAntdDarkTheme.token : customAntdLightTheme.token),
        borderRadius: themeRadius,
        colorPrimary: themeColorPrimary,
      },
      components: {
        ...(isDark ? customAntdDarkTheme.components : customAntdLightTheme.components),
        Menu: {
          darkItemBg: "#141414",
          itemBg: "#fff",
          ...(isDark
            ? customAntdDarkTheme.components?.Menu
            : customAntdLightTheme.components?.Menu),
          collapsedWidth: sideCollapsedWidth,
        },
      },
    }}
    locale={locale}
  >
    {children}
  </ConfigProvider>
}

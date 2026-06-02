import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { SupportedLocale } from '../i18n'

const antdLocales: Record<SupportedLocale, typeof enUS> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

export default function LocaleProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  const locale =
    antdLocales[i18n.language as SupportedLocale] ?? enUS

  return <ConfigProvider locale={locale}>{children}</ConfigProvider>
}

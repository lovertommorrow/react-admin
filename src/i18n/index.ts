import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getEnUsLang, getZhCnLang } from "./helper";
export const i18nResources = {
  "zh-CN": {
    translation: getZhCnLang(),
  },
  "en-US": {
    translation: getEnUsLang(),
  },
};

export const LOCALE_STORAGE_KEY = 'locale'

export const SUPPORTED_LOCALES = ['zh-CN', 'en-US'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

function getDefaultLocale(): SupportedLocale {
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (saved && SUPPORTED_LOCALES.includes(saved as SupportedLocale)) {
    return saved as SupportedLocale
  }
  return navigator.language.startsWith('zh') ? 'zh-CN' : 'en-US'
}

const defaultLocale = getDefaultLocale()

i18n.use(initReactI18next).init({
  resources: i18nResources,
  lng: defaultLocale,
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LOCALE_STORAGE_KEY, lng)
  document.documentElement.lang = lng
})

document.documentElement.lang = defaultLocale

export default i18n

import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return <footer className="px-4 py-3 border-t border-gray-200">{t('common.footer')}</footer>
}

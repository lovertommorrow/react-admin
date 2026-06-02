import { useTranslation } from 'react-i18next'

export default function Content() {
  const { t } = useTranslation()

  return <main className="px-4 py-3">{t('common.content')}</main>
}

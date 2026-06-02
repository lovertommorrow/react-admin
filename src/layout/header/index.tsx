import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import LanguageSwitcher from '../../components/LanguageSwitcher'
import { useAuthStore } from '../../stores/auth'

export default function Header() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="flex w-full items-center justify-between px-4 py-3 border-b border-gray-200">
      <span className="font-medium">{t('common.header')}</span>
      <div className="ml-auto flex shrink-0 items-center gap-3">
        <LanguageSwitcher />
        <Button icon={<LogoutOutlined />} onClick={handleLogout}>
          {t('common.logout')}
        </Button>
      </div>
    </header>
  )
}

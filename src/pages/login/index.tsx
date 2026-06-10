import { Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../../components/languageSwitcher'

import Banner from "../../assets/banner.svg"
import logo from "../../assets/logo.svg"

export default function LoginPage() {
  const { t } = useTranslation()

  return (
    <div className="h-full w-full">
      <header className="z-10 absolute flex items-center right-3 top-3 left-3">
        <div className="text-colorText flex flex-1 items-center">
          <img alt="App Logo" src={logo} className="mr-2 w-11" />
          <h1 className="m-0 text-xl font-medium">
            {import.meta.env.VITE_GLOB_APP_TITLE}
          </h1>
        </div>
        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </header>
      <div className="flex items-center overflow-hidden h-full">
        <Row className="h-screen w-full">
          <Col xs={0} sm={0} lg={15}>
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <img alt="banner" src={Banner} className="h-64 motion-safe:animate-bounce-in-down-out-up" />
              <div className="text-xl text-colorTextSecondary mt-6 font-sans lg:text-2xl">
                {t("authority.pageTitle")}
              </div>
              <div className="text-colorTextTertiary mt-2">
                {t("authority.pageDescription")}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div >
  )
}

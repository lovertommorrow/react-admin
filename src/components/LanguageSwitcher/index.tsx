import { GlobalOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LOCALES, type SupportedLocale } from "@/i18n";

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  return (
    <Select
      value={i18n.language as SupportedLocale}
      onChange={(value) => i18n.changeLanguage(value)}
      options={SUPPORTED_LOCALES.map((locale) => ({
        value: locale,
        label: t(`language.${locale}`),
      }))}
      prefix={<GlobalOutlined />}
      style={{ width: 120 }}
      aria-label={t("language.label")}
    />
  );
}

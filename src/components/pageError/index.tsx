import type { FallbackProps } from "react-error-boundary";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Result, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const { VITE_BASE_HOME_PATH } = import.meta.env;

export function PageError({ error, resetErrorBoundary }: FallbackProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const goHome = () => {
    resetErrorBoundary();
    navigate(VITE_BASE_HOME_PATH);
  };
  const refresh = () => {
    location.reload();
  };

  return (
    <Result
      status="error"
      title={(error as Error)?.message ?? t("exception.pageErrorTitle")}
      extra={
        <Space size={20}>
          <Button icon={<ArrowLeftOutlined />} type="primary" onClick={goHome}>
            {t("common.backHome")}
          </Button>
          <Button icon={<ReloadOutlined rotate={90} />} onClick={refresh}>
            {t("common.refresh")}
          </Button>
        </Space>
      }
    >
      <Typography.Paragraph type="warning" className="text-center">
        {(error as Error)?.stack}
      </Typography.Paragraph>
    </Result>
  );
}

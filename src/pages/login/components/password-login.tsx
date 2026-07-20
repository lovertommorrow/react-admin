import { PASSWORD_RULES, USERNAME_RULES } from "../../../constants/rules";
import type { LoginInfo } from "../../../api/user/types";
import { useAuthStore } from "../../../stores/auth";

import { Button, Form, Input, Space } from "antd";
import { use, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router";
import { BasicButton } from "@/components/basicButton";
import { FormModeContext } from "../form-mode-context";

const FORM_INITIAL_VALUES: LoginInfo = {
  username: "admin",
  password: "lh_DEV_2026!@",
};

export default function PasswordLogin() {
  const [loading, setLoading] = useState(false);
  const [passwordLoginForm] = Form.useForm();
  const { t } = useTranslation();
  const { setFormMode } = use(FormModeContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleFinish = async (values: LoginInfo) => {
    setLoading(true);
    try {
      await login(values);
    } finally {
      setLoading(false);
    }
    const redirect = searchParams.get("redirect");
    const url = redirect
      ? `/${redirect.slice(1)}`
      : import.meta.env.VITE_BASE_HOME_PATH;
    navigate(url);
  };

  return (
    <>
      <Space orientation="vertical">
        <h2 className="text-colorText mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl">
          {t("authority.title")}
        </h2>
      </Space>

      <Form
        name="passwordLoginForm"
        form={passwordLoginForm}
        layout="vertical"
        initialValues={FORM_INITIAL_VALUES}
        onFinish={handleFinish}
      >
        <Form.Item
          label={t("authority.username")}
          name="username"
          rules={USERNAME_RULES(t)}
        >
          <Input placeholder={t("form.username.required")} />
        </Form.Item>

        <Form.Item
          label={t("authority.password")}
          name="password"
          rules={PASSWORD_RULES(t)}
        >
          <Input.Password placeholder={t("form.password.required")} />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-between mb-5 -mt-1 text-sm">
            <BasicButton
              type="link"
              className="p-0"
              onPointerDown={() => {
                setFormMode("codeLogin");
              }}
            >
              {t("authority.codeLogin")}
            </BasicButton>
            <BasicButton
              type="link"
              className="p-0"
              onPointerDown={() => {
                setFormMode("forgotPassword");
              }}
            >
              {t("authority.forgotPassword")}
            </BasicButton>
          </div>
          <Button block type="primary" htmlType="submit" loading={loading}>
            {t("authority.login")}
          </Button>
        </Form.Item>

        <div className="text-sm text-center">
          {t("authority.noAccountYet")}
          <BasicButton
            type="link"
            className="px-1"
            onPointerDown={() => {
              setFormMode("register");
            }}
          >
            {t("authority.goToRegister")}
          </BasicButton>
        </div>
      </Form>
    </>
  );
}

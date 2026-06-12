import { LeftOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Space, Typography } from "antd";
import { use, useState } from "react";
import { useTranslation } from "react-i18next";

import { FormModeContext } from "../form-mode-context";
import { MOBILE_PHONE_RULES } from "../../../constants/rules";
import { BasicButton } from "../../../components/basicButton";

const { Title } = Typography;

const FORM_INITIAL_VALUES = {
  phoneNumber: "",
  captcha: "",
};

export type CodeLoginFormType = typeof FORM_INITIAL_VALUES;

export default function CodeLogin() {
  const [loading, setLoading] = useState(false);
  const [codeLoginForm] = Form.useForm();
  const { t } = useTranslation();
  const { setFormMode } = use(FormModeContext);

  const handleFinish = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // window.$message?.success(t("common.success"));
    }, 1000);
  };

  return (
    <>
      <Space orientation="vertical">
        <Title level={3}>{t("authority.codeLogin")}</Title>
      </Space>

      <Form
        name="codeLoginForm"
        form={codeLoginForm}
        layout="vertical"
        initialValues={FORM_INITIAL_VALUES}
        onFinish={handleFinish}
      >
        <Form.Item
          label={t("authority.mobile")}
          name="phoneNumber"
          rules={MOBILE_PHONE_RULES(t)}
        >
          <InputNumber
            controls={false}
            style={{ width: "100%" }}
            placeholder={t("form.mobile.required")}
          />
        </Form.Item>
        <Form.Item label={t("authority.code")} name="captcha">
          <div className="w-full flex justify-between">
            <InputNumber
              controls={false}
              style={{ width: "75%" }}
              placeholder={t("form.code.required")}
            />
            <BasicButton
              type="default"
              onPointerDown={() => {
                console.log("send code");
              }}
            >
              {t("authority.sendCode")}
            </BasicButton>
          </div>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={loading}>
            {t("authority.login")}
          </Button>
        </Form.Item>

        <div className="text-sm text-center">
          <BasicButton
            type="link"
            icon={<LeftOutlined />}
            className="px-1"
            onPointerDown={() => {
              setFormMode("login");
            }}
          >
            {t("common.back")}
          </BasicButton>
        </div>
      </Form>
    </>
  );
}

import type { MenuProps } from "antd";
import { Avatar, Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

export function UserMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const avatar = useUserStore(state => state.avatar);
  const logout = useAuthStore(state => state.logout);
  // 处理点击事件
  const onClick: MenuProps["onClick"] = async ({ key }) => {
    if (key === "logout") {
      await logout();
      navigate("/login");
    }
    if (key === "personal-center") {
      navigate("/personal-center/my-profile");
    }
  };
  // 菜单项
  const items: MenuProps["items"] = [
    {
      label: t("common.menu.personalCenter"),
      key: "personal-center",
      icon: <UserOutlined />,
    },
    {
      label: t("authority.logout"),
      key: "logout",
      icon: <LogoutOutlined />,
    }
  ];
  // 渲染用户菜单
  return (
    <Dropdown
      menu={{ items, onClick }}
      arrow={false}
      placement="bottomRight"
      trigger={["click"]}
    >
      <Avatar src={avatar} className="shadow hover:shadow-lg hover:shadow-slate-200" />
    </Dropdown>
  );
}
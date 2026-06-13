import type { ButtonProps } from "antd";
import type { ReactNode } from "react";
import { Button } from "antd";

interface BasicButtonProps extends ButtonProps {
  children?: ReactNode;
}

export function BasicButton(props: BasicButtonProps) {
  const { children, ...restProps } = props;

  // 清除自定义属性，将所有属性传递给antd的Button组件
  // 所有属性变成可选属性
  const antdButtonProps: Partial<BasicButtonProps> = { ...restProps };

  return (
    <Button type="primary" {...antdButtonProps}>
      {children}
    </Button>
  );
}

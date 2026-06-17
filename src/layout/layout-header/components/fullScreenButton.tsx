import { BasicButton } from "@/components/basicButton";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import { useFullscreen } from "ahooks";
import type { RefObject } from "react";


interface FullscreenButtonProps {
  target?: HTMLElement | (() => Element) | RefObject<Element>;
}

export function FullScreenButton({ target, ...restProps }: FullscreenButtonProps) {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(target);
  return (
    <BasicButton
      {...restProps}
      type="text"
      icon={!isFullscreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
      onClick={toggleFullscreen}
    />
  )
}
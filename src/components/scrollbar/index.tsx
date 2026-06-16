import type { Props as SimplebarProps } from "simplebar-react";
import { forwardRef } from "react";
import SimpleBar from "simplebar-react";
import { cn } from "@/utils/cn";

export const Scrollbar = forwardRef<HTMLElement, SimplebarProps>(
  ({ children, ...other }, ref) => {
    return (
      <SimpleBar
        autoHide={true}
        scrollableNodeProps={{ ref }}
        clickOnTrack={false}
        {...other}
        className={cn("h-full", other.className)}
      >
        {children}
      </SimpleBar>
    );
  },
);

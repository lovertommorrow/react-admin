import { Scrollbar } from "@/components/scrollbar";
import {
  CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT,
  ELEMENT_ID_MAIN_CONTENT,
} from "@/layout/constants";

import { theme } from "antd";
import { KeepAlive, useKeepAliveRef } from "keepalive-for-react";
import { useMemo } from "react";

import { useLocation, useOutlet } from "react-router";

export default function LayoutContent() {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  const { pathname, search } = useLocation();
  const outlet = useOutlet();
  const aliveRef = useKeepAliveRef();

  /**
   * to distinguish different pages to cache
   */
  const cacheKey = useMemo(() => {
    return pathname + search;
  }, [pathname, search]);

  return (
    <main
      id={ELEMENT_ID_MAIN_CONTENT}
      className="relative overflow-y-auto overflow-x-hidden grow"
      style={{
        backgroundColor: colorBgLayout,
      }}
    >
      <Scrollbar>
        <div className="flex flex-col h-full p-4">
          <div
            style={{
              height: `var(${CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT})`,
            }}
          >
            <KeepAlive
              max={20}
              transition
              duration={300}
              activeCacheKey={cacheKey}
              aliveRef={aliveRef}
            >
              {outlet}
            </KeepAlive>
          </div>
        </div>
      </Scrollbar>
    </main>
  );
}

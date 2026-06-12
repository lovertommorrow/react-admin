import { Watermark } from "antd";

import LayoutHeader from "../layout-header";
import LayoutContent from "../layout-content";

export default function Container() {
  return (
    <Watermark>
      <section className="transition-all flex flex-col h-screen">
        <LayoutHeader />
        <LayoutContent />
      </section>
    </Watermark>
  );
}

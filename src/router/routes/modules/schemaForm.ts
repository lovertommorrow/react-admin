import { FormOutlined } from "@ant-design/icons";
import { createElement, lazy } from "react";
import { $t } from "@/i18n/t";
import Container from "@/layout/container";
import type { AppRouteRecordRaw } from "@/router/types";
import { home } from "@/router/extra-info/order";


const SchemaFormPage = lazy(() => import("@/pages/schemaForm"));

const routes: AppRouteRecordRaw[] = [
  {
    path: "/schemaForm",
    Component: Container,
    handle: {
      order: home,
      title: $t("common.menu.schemaForm"),
      icon: createElement(FormOutlined),
    },
    children: [
      {
        index: true,
        Component: SchemaFormPage,
        handle: {
          title: $t("common.menu.schemaForm"),
          icon: createElement(FormOutlined),
        },
      },
    ],
  },
];

export default routes;

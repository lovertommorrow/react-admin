import type { RouteMeta } from "@/router/types";
import { isString } from "@/utils/tools";
import type { BreadcrumbProps } from "antd";
import { Breadcrumb } from "antd";
import { useTranslation } from "react-i18next";
import { useMatches } from "react-router";

interface MatchItem {
  pathname: string;
  handle: RouteMeta;
}

const itemRender: BreadcrumbProps["itemRender"] = (route, params, routes) => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last || !route.path
    ? (
      <span>{route.title}</span>
    )
    : (
      <span>{route.title}</span>
    );
};

export function BreadcrumbViews() {
  const { t } = useTranslation();
  const matches = useMatches() as MatchItem[];

  return (
    <Breadcrumb
      className="hidden md:block"
      separator="->"
      itemRender={itemRender}
      items={matches
        .filter(match => match.handle && !match.pathname.endsWith("/"))
        .map((match) => {
          return {
            title: isString(match.handle?.title) ? t(match.handle?.title) : match.handle?.title,
            path: match.pathname,
          };
        })
      }
    />
  );
}

import {
  createElement,
  memo,
  useMemo,
  useCallback,
  useState,
  FC,
  useEffect,
} from "react";

import { RouterProvider, RouterContextValue } from "./context";
import { RouteAbstract } from "./route";

export const Router = memo(
  <RoutesEntries extends RouteEntry[]>({
    routes,
  }: RouterProps<RoutesEntries>) => {
    const routesMap = useMemo(() => new Map(routes), [routes]);

    const [, updateState] = useState<object>();
    const forceUpdate = useCallback(() => updateState({}), []);

    const { pathname, search, hash } = window.location;

    const getRouteFromPath = useCallback<
      RouterContextValue["getRouteFromPath"]
    >(
      (path: string) => {
        for (const [route] of routesMap)
          if (route.pattern.test(path)) return route;
      },
      [routesMap],
    );

    const route = useMemo(
      () => getRouteFromPath(pathname),
      [getRouteFromPath, pathname],
    );

    const pathParams = useMemo(
      () => (route && pathname.match(route.pattern)?.groups) || {},
      [pathname, route],
    );

    const component = useMemo(
      () => (route && routesMap.get(route)) || NotFound,
      [route, routesMap],
    );

    const navigate = useCallback<RouterContextValue["navigate"]>(
      to => {
        history.pushState(null, "", to);

        forceUpdate();
      },
      [forceUpdate],
    );

    const anchor = hash ? parseRawAnchor(hash) : null;

    const setAnchor = useCallback<RouterContextValue["setAnchor"]>(
      anchor => {
        if (anchor === null) {
          history.pushState(null, "", pathname + search);

          return forceUpdate();
        }

        window.location.hash = `#${parseRawAnchor(anchor)}`;
      },
      [forceUpdate, pathname, search],
    );

    const value = useMemo(
      () => ({ getRouteFromPath, navigate, pathParams, anchor, setAnchor }),
      [anchor, getRouteFromPath, navigate, pathParams, setAnchor],
    );

    useEffect(() => {
      window.addEventListener("popstate", forceUpdate);
      window.addEventListener("hashchange", forceUpdate);

      return () => {
        window.removeEventListener("popstate", forceUpdate);
        window.removeEventListener("hashchange", forceUpdate);
      };
    }, [forceUpdate]);

    return createElement(RouterProvider, { value }, createElement(component));
  },
);

const parseRawAnchor = (rawAnchor: string) => {
  const anchorParts = rawAnchor.split("#");

  return anchorParts[anchorParts.length - 1];
};

const NotFound: FC = () => "Not found";

type RouteEntry = readonly [RouteAbstract, FC];

interface RouterProps<RoutesEntries extends RouteEntry[]> {
  routes: RoutesEntries;
}

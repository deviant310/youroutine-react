import { Route } from "./route";

export function initHomeRoute<RouteTemplate extends string>(
  route: Route<RouteTemplate>,
  ...params: Parameters<Route<RouteTemplate>["build"]>
) {
  if (window.location.pathname === "/") {
    const pathname = route.build(...params);

    history.replaceState(params[0] ?? null, "", pathname);
  }
}

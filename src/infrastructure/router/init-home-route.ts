import { RouteAbstract } from "./route";

export function initHomeRoute<Route extends RouteAbstract>(
  route: Route,
  ...params: Parameters<Route>
) {
  if (window.location.pathname === "/") {
    const [routeParams] = params;
    const pathname = route(routeParams);

    history.replaceState(routeParams ?? null, "", pathname);
  }
}

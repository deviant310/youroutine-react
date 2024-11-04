import { useContext } from "react";

import { context } from "./context";
import { Route } from "./route";

export const useNavigator = () => {
  const { navigate } = useContext(context);

  return navigate;
};

export const usePathParams = <R>() => {
  type RouteTemplate = R extends Route<infer Template> ? Template : never;
  type RouteParams = Parameters<Route<RouteTemplate>["build"]>[0];
  type RouteStringParams = { [K in keyof RouteParams]?: string };

  const { pathParams } = useContext(context);

  return (pathParams ?? {}) satisfies RouteStringParams as RouteStringParams;
};

export const useAnchor = () => {
  const { anchor, setAnchor } = useContext(context);

  return <const>[anchor, setAnchor];
};

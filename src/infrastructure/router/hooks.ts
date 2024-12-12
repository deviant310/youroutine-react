import { useRouter } from "./context";
import { Route } from "./route";

export const useNavigator = () => {
  const { navigate } = useRouter();

  return navigate;
};

export const usePathParams = <R>() => {
  type RouteTemplate = R extends Route<infer Template> ? Template : never;
  type RouteParams = Parameters<Route<RouteTemplate>["build"]>[0];
  type RouteStringParams = { [K in keyof RouteParams]?: string };

  const { pathParams } = useRouter();

  return (pathParams ?? {}) satisfies RouteStringParams as RouteStringParams;
};

export const useAnchor = () => {
  const { anchor, setAnchor } = useRouter();

  return <const>[anchor, setAnchor];
};

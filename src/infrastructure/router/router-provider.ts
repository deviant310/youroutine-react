import {
  createContext,
  createElement,
  memo,
  useMemo,
  useCallback,
  useState,
  FC,
  useContext,
  useEffect,
} from "react";

import { RouteAbstract } from "./route";

const context = createContext<Router>({} as Router);
const { Provider } = context;

export const RouterProvider = memo<RouterProviderProps>(props => {
  const { routesEntries } = props;

  const [locationPathname, setLocationPathname] = useState(
    window.location.pathname,
  );

  const componentPatternToComponentMap = useMemo(() => {
    const map = new Map<RegExp, FC>();

    for (const [route, component] of routesEntries) {
      const pathPattern = new RegExp(
        route.parsed
          .filter(({ value }) => value)
          .map(({ type, value }) => {
            if (type === "param")
              return new RegExp(`/(?<${value}>\\w+)/?`).source;

            return new RegExp(`/?${value}/?`).source;
          })
          .join("") + "$",
      );

      map.set(pathPattern, component);
    }

    return map;
  }, [routesEntries]);

  const { component, routeParams } = useMemo(() => {
    for (const [
      componentPattern,
      component,
    ] of componentPatternToComponentMap) {
      if (componentPattern.test(locationPathname)) {
        const routeParams = locationPathname.match(componentPattern)?.groups;

        return { component, routeParams };
      }
    }

    return { component: NotFound };
  }, [componentPatternToComponentMap, locationPathname]);

  const navigate = useCallback<Router["navigate"]>((route, ...params) => {
    const [routeParams] = params;
    const pathname = route(routeParams);

    history.pushState(routeParams ?? null, "", pathname);

    setLocationPathname(pathname);
  }, []);

  const value = useMemo(
    () => ({ navigate, routeParams }),
    [navigate, routeParams],
  );

  const onPopState = useCallback(() => {
    setLocationPathname(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, [onPopState]);

  return createElement(Provider, { value }, createElement(component));
});

export const useNavigator = () => useContext(context).navigate;

export const useParams = <Route extends RouteAbstract = never>() => {
  type RouteParams = Parameters<Route>[0];
  type RouteStringParams = { [K in keyof RouteParams]?: string };

  const { routeParams } = useContext(context);

  return (routeParams ?? {}) satisfies RouteStringParams as RouteStringParams;
};

const NotFound: FC = () => {
  return "Not found";
};

interface Router {
  routeParams?: Record<string, string>;
  navigate<Route extends RouteAbstract>(
    route: Route,
    ...params: Parameters<Route>
  ): void;
}

interface RouterProviderProps {
  routesEntries: Array<readonly [RouteAbstract, FC]>;
}
